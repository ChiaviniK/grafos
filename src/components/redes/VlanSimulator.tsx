import { useState, useEffect } from 'react';
import { Network, Monitor, AlertTriangle, CheckCircle2, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VlanSimulatorProps {
  onComplete?: (score: number) => void;
}

const DEPARTMENTS = [
  { id: 'port1', name: 'Vendas A', vlanTarget: 10, type: 'sales' },
  { id: 'port2', name: 'Vendas B', vlanTarget: 10, type: 'sales'},
  { id: 'port3', name: 'Engenharia A', vlanTarget: 20, type: 'eng' },
  { id: 'port4', name: 'Engenharia B', vlanTarget: 20, type: 'eng' },
];

export function VlanSimulator({ onComplete }: VlanSimulatorProps) {
  // Mapping port ID to configured VLAN
  const [portConfigs, setPortConfigs] = useState<Record<string, number>>({
    port1: 1, // default Native VLAN 1
    port2: 1,
    port3: 1,
    port4: 1
  });

  const [status, setStatus] = useState<'idle' | 'testing' | 'success' | 'fail'>('idle');
  const [activeBroadcast, setActiveBroadcast] = useState<string | null>(null);

  const handleVlanChange = (portId: string, vlan: number) => {
    if (status === 'testing' || status === 'success') return;
    setPortConfigs(prev => ({ ...prev, [portId]: vlan }));
  };

  const testConfig = () => {
    setStatus('testing');
    setActiveBroadcast('port1'); // Vendas A sends a broadcast

    setTimeout(() => {
       const isCorrect = 
          portConfigs.port1 === 10 && 
          portConfigs.port2 === 10 && 
          portConfigs.port3 === 20 && 
          portConfigs.port4 === 20;

       if (isCorrect) {
          setStatus('success');
          if (onComplete) onComplete(20);
       } else {
          setStatus('fail');
       }
       setActiveBroadcast(null);
    }, 2500);
  };

  const reset = () => {
     setStatus('idle');
     setPortConfigs({ port1: 1, port2: 1, port3: 1, port4: 1 });
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-[2rem] p-8 shadow-2xl relative">
       
       <div className="text-center mb-10">
          <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2 flex items-center justify-center gap-3">
             <Network className="w-6 h-6 text-blue-400" /> Layer 2: Segmentação VLAN
          </h3>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
             Todos os departamentos estão no mesmo domínio de broadcast (VLAN 1). 
             <strong className="text-white"> Atribua a VLAN 10 para Vendas e a VLAN 20 para Engenharia </strong> 
             para isolar o tráfego e clicar em Testar Rede.
          </p>
       </div>

       {/* Switch Graphic */}
       <div className="bg-slate-950 border-2 border-slate-800 rounded-2xl p-6 mb-12 relative shadow-inner">
          <div className="absolute top-2 left-4 text-[10px] font-mono text-slate-500 font-bold uppercase">Cisco Catalyst 2960</div>
          
          <div className="flex justify-center gap-4 mt-4">
             {DEPARTMENTS.map((dept, i) => {
                const configVlan = portConfigs[dept.id];
                const isTarget = activeBroadcast === dept.id; // Sender
                const receivesBroadcast = status === 'testing' && portConfigs[activeBroadcast!] === configVlan && !isTarget;
                const isWrongBroadcast = status === 'fail' && portConfigs[dept.id] === 1 && !isTarget; // showing traffic leaking

                return (
                  <div key={dept.id} className="flex flex-col items-center">
                     
                     {/* Port Interface */}
                     <div className="w-16 h-16 bg-slate-900 border-2 border-slate-700 rounded-xl relative flex justify-center items-end pb-2 overflow-hidden">
                        <div className={`w-8 h-8 opacity-20 ${configVlan === 10 ? 'bg-amber-400' : configVlan === 20 ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                        <div className="absolute top-1 flex gap-1">
                           <div className={`w-1.5 h-1.5 rounded-full ${configVlan !== 1 ? 'bg-emerald-500 shadow-[0_0_5px_#10b981]' : 'bg-slate-600'}`} />
                           <div className={`w-1.5 h-1.5 rounded-full ${receivesBroadcast || isWrongBroadcast || isTarget ? 'bg-blue-500 shadow-[0_0_8px_#3b82f6] animate-pulse' : 'bg-slate-600'}`} />
                        </div>
                     </div>

                     {/* The Wire */}
                     <div className="h-10 w-1 bg-slate-800 relative">
                        <AnimatePresence>
                          {(receivesBroadcast || isWrongBroadcast || isTarget) && (
                             <motion.div 
                               initial={{ top: isTarget ? '100%' : '0%', opacity: 1 }}
                               animate={{ top: isTarget ? '0%' : '100%', opacity: 0 }}
                               transition={{ duration: 1, repeat: Infinity }}
                               className="absolute left-[-2px] w-2 h-4 bg-blue-400 rounded-full shadow-[0_0_10px_#3b82f6]" 
                             />
                          )}
                        </AnimatePresence>
                     </div>

                     {/* PC Node */}
                     <div className={`mt-2 p-3 rounded-xl border-2 transition-colors w-28 text-center flex flex-col items-center gap-2 ${
                       configVlan === 10 ? 'bg-amber-500/10 border-amber-500/30' : 
                       configVlan === 20 ? 'bg-emerald-500/10 border-emerald-500/30' : 
                       'bg-slate-800 border-slate-700'
                     }`}>
                        <Monitor className={`w-6 h-6 ${
                          configVlan === 10 ? 'text-amber-400' : 
                          configVlan === 20 ? 'text-emerald-400' : 
                          'text-slate-500'
                        }`} />
                        <div className="text-[10px] font-bold text-white uppercase">{dept.name}</div>
                        
                        <select 
                           value={configVlan} 
                           onChange={(e) => handleVlanChange(dept.id, Number(e.target.value))}
                           disabled={status === 'testing' || status === 'success'}
                           className="w-full bg-slate-950 border border-slate-700 rounded text-xs text-center py-1 font-mono text-slate-300 focus:outline-none"
                        >
                           <option value={1}>VLAN 1</option>
                           <option value={10}>VLAN 10</option>
                           <option value={20}>VLAN 20</option>
                        </select>
                     </div>
                  </div>
                );
             })}
          </div>
       </div>

       {/* Feedback & Actions */}
       <div className="flex items-center justify-between border-t border-slate-800 pt-6">
          <div className="flex-1">
             {status === 'idle' && <span className="text-slate-500 text-sm">Aguardando configuração das portas L2...</span>}
             {status === 'testing' && <span className="text-blue-400 text-sm font-bold animate-pulse">Enviando Frame de Broadcast ARP...</span>}
             {status === 'success' && (
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                   <CheckCircle2 className="w-5 h-5" /> Isolamento perfeito! Segmentação de Domínio concluída.
                </div>
             )}
             {status === 'fail' && (
                <div className="flex items-center gap-2 text-rose-400 font-bold">
                   <AlertTriangle className="w-5 h-5" /> Falha: O Broadcast cruzou departamentos errados!
                </div>
             )}
          </div>

          <div className="flex gap-3">
             {status === 'fail' && (
                <button onClick={reset} className="px-5 py-3 rounded-xl border border-slate-700 text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                   <RefreshCw className="w-4 h-4" /> Resetar
                </button>
             )}
             <button 
                onClick={testConfig}
                disabled={status === 'testing' || status === 'success'}
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(59,130,246,0.3)]"
             >
                {status === 'success' ? 'VALIDADO (20 pts)' : 'TESTAR REDE'}
             </button>
          </div>
       </div>
    </div>
  );
}
