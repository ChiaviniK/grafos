import { useState } from 'react';
import { Shield, Plus, Play, CheckCircle2, ShieldAlert, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FirewallSimulatorProps {
  onComplete?: (score: number) => void;
}

interface Rule {
  id: number;
  action: 'ALLOW' | 'DENY';
  port: number;
}

export function FirewallSimulator({ onComplete }: FirewallSimulatorProps) {
  const [rules, setRules] = useState<Rule[]>([]);
  const [status, setStatus] = useState<'idle' | 'simulating' | 'success' | 'fail'>('idle');
  
  // Rule builder state
  const [actionDraft, setActionDraft] = useState<'ALLOW' | 'DENY'>('ALLOW');
  const [portDraft, setPortDraft] = useState<number>(80);

  const addRule = () => {
     setRules(prev => [...prev, { id: Date.now(), action: actionDraft, port: portDraft }]);
  };

  const removeRule = (id: number) => {
     setRules(prev => prev.filter(r => r.id !== id));
  };

  const applyFirewall = () => {
     setStatus('simulating');

     setTimeout(() => {
        // Condition to win:
        // Must explicitly DENY 21 and explicitly ALLOW 443
        const hasDeny21 = rules.some(r => r.action === 'DENY' && r.port === 21);
        const hasAllow443 = rules.some(r => r.action === 'ALLOW' && r.port === 443);

        if (hasDeny21 && hasAllow443) {
           setStatus('success');
           if (onComplete) onComplete(20);
        } else {
           setStatus('fail');
        }
     }, 2000);
  };

  const reset = () => {
     setStatus('idle');
     setRules([]);
  };

  return (
    <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
       
       {/* Left: ACL Configurator */}
       <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-8 shadow-2xl flex flex-col">
          <div className="flex justify-between items-center mb-6">
             <div className="flex items-center gap-3 text-rose-500">
                <Shield className="w-8 h-8" />
                <h3 className="text-2xl font-black uppercase tracking-tighter">pfSense Demo</h3>
             </div>
          </div>
          
          <p className="text-slate-400 text-sm mb-6">
             Nossos sensores detectaram tráfego FTP não criptografado tentando invadir. Mas precisamos que os clientes continuem acessando o portal HTTPS.<br/><br/>
             Sua missão: <strong>Bloqueie a porta 21</strong> e <strong>Libere a porta 443</strong> explícitas na ACL abaixo.
          </p>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 mb-6">
             <div className="flex gap-2">
                <select 
                   value={actionDraft}
                   onChange={e => setActionDraft(e.target.value as 'ALLOW' | 'DENY')}
                   className="bg-slate-900 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-rose-500 font-bold"
                >
                   <option value="ALLOW">ALLOW</option>
                   <option value="DENY">DENY</option>
                </select>
                <div className="flex items-center text-slate-500 text-sm font-bold">ANY <ArrowRight className="w-3 h-3 mx-2" /> PORT:</div>
                <input 
                   type="number"
                   value={portDraft}
                   onChange={e => setPortDraft(parseInt(e.target.value) || 80)}
                   className="w-20 bg-slate-900 border border-slate-700 text-white rounded-lg px-2 py-2 text-center font-mono text-sm focus:outline-none focus:border-rose-500"
                />
                <button onClick={addRule} className="ml-auto bg-rose-600 hover:bg-rose-500 text-white p-2 rounded-lg transition-colors">
                   <Plus className="w-5 h-5" />
                </button>
             </div>
          </div>

          {/* Rules Table */}
          <div className="flex-1 bg-black/40 border border-slate-800 rounded-xl overflow-hidden mb-6 flex flex-col pt-2">
             <div className="px-4 pb-2 border-b border-slate-800 text-[10px] text-slate-500 font-bold tracking-widest grid grid-cols-4 gap-2">
                <div>AÇÃO</div>
                <div>ORIGEM</div>
                <div>DEST/PORTA</div>
                <div className="text-right">APAGAR</div>
             </div>
             <div className="flex-1 overflow-y-auto p-2 space-y-2">
                <AnimatePresence>
                   {rules.map(r => (
                      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.9 }} key={r.id} className="grid grid-cols-4 gap-2 items-center bg-slate-900 p-2 rounded-lg border border-slate-800 text-sm">
                         <div className={`font-bold text-[10px] uppercase w-fit px-2 py-1 rounded ${r.action === 'ALLOW' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                            {r.action}
                         </div>
                         <div className="font-mono text-slate-400 text-xs">ANY</div>
                         <div className="font-mono text-white text-xs">{r.port}</div>
                         <div className="text-right">
                           <button onClick={() => removeRule(r.id)} className="text-slate-600 hover:text-rose-400 p-1"><X className="w-4 h-4"/></button>
                         </div>
                      </motion.div>
                   ))}
                </AnimatePresence>
                {rules.length === 0 && <div className="text-center text-slate-600 text-xs mt-8">Nenhuma regra Customizada. Default = Drop.</div>}
             </div>
          </div>

          <button onClick={applyFirewall} disabled={status === 'simulating' || status === 'success'} className="w-full py-4 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(225,29,72,0.3)] disabled:opacity-50">
             <Play className="w-5 h-5 fill-current" /> APLICAR & SIMULAR TRÁFEGO
          </button>
       </div>

       {/* Right: Network Stream Animation */}
       <div className="bg-slate-950 border border-slate-800 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -right-[20%] top-[10%] w-[50%] h-[50%] rounded-full bg-rose-900/10 blur-[120px] pointer-events-none" />

          {/* Incoming Traffic Source */}
          <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-4">
             <h4 className="font-bold text-white uppercase text-sm tracking-widest flex items-center gap-2">WAN</h4>
             <h4 className="font-bold text-white uppercase text-sm tracking-widest flex items-center gap-2">FIREWALL</h4>
             <h4 className="font-bold text-white uppercase text-sm tracking-widest flex items-center gap-2">LAN</h4>
          </div>

          <div className="flex-1 relative border-x-4 border-dashed border-slate-800/50 mx-[10%] rounded flex flex-col gap-8 py-8 justify-center items-center">
             
             {/* The Firewall "Wall" Line */}
             <div className={`absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1.5 transition-colors ${status === 'success' ? 'bg-emerald-500 shadow-[0_0_15px_#10b981]' : status === 'simulating' ? 'bg-cyan-500 shadow-[0_0_15px_#06b6d4] animate-pulse' : 'bg-slate-700'}`} />

             {/* Packet: FTP Malignant */}
             <div className="w-full relative h-10 flex">
                <AnimatePresence>
                   {status === 'simulating' && (
                      <motion.div initial={{ left: '0%' }} animate={{ left: rules.some(r => r.action === 'DENY' && r.port === 21) ? '40%' : '100%' }} transition={{ duration: rules.some(r => r.action === 'DENY' && r.port === 21) ? 1 : 2, ease: 'linear' }} className="absolute -top-2 flex flex-col items-center">
                         <div className="text-[10px] font-bold text-rose-400 mb-1">REQ: 21 (FTP)</div>
                         <div className="w-8 h-4 rounded bg-rose-500 shadow-[0_0_10px_#f43f5e]" />
                      </motion.div>
                   )}
                </AnimatePresence>
             </div>

             {/* Packet: HTTPS Benign */}
             <div className="w-full relative h-10 flex">
                <AnimatePresence>
                   {status === 'simulating' && (
                      <motion.div initial={{ left: '0%' }} animate={{ left: rules.some(r => r.action === 'ALLOW' && r.port === 443) ? '100%' : '40%' }} transition={{ duration: rules.some(r => r.action === 'ALLOW' && r.port === 443) ? 2 : 1, ease: 'linear' }} className="absolute -top-2 flex flex-col items-center">
                         <div className="text-[10px] font-bold text-emerald-400 mb-1">REQ: 443 (WEB)</div>
                         <div className="w-8 h-4 rounded bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                      </motion.div>
                   )}
                </AnimatePresence>
             </div>
          </div>

          <div className="h-16 flex items-center justify-center mt-6">
             {status === 'success' && (
                <div className="flex items-center gap-2 text-emerald-400 font-bold mt-2">
                   <CheckCircle2 className="w-6 h-6" /> INFRESTRUTURA DEFENDIDA (20 pts)
                </div>
             )}
             {status === 'fail' && (
                <div className="flex flex-col items-center gap-2">
                   <div className="flex items-center gap-2 text-rose-400 font-bold">
                      <ShieldAlert className="w-5 h-5" /> Falha: Tráfego perigoso vazou ou serviço lícito foi bloqueado!
                   </div>
                   <button onClick={reset} className="text-xs border-b border-slate-600 text-slate-400 hover:text-white pb-1">Refazer Regras</button>
                </div>
             )}
          </div>

       </div>
    </div>
  );
}
