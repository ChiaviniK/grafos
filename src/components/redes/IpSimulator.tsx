import { useState } from 'react';
import { Router, Globe, AlertOctagon, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface IpSimulatorProps {
  onComplete?: (score: number) => void;
}

export function IpSimulator({ onComplete }: IpSimulatorProps) {
  const [octets, setOctets] = useState(['192', '168', '1', '300']);
  const [status, setStatus] = useState<'idle' | 'testing' | 'success' | 'fail'>('idle');

  const handleOctetChange = (index: number, val: string) => {
    // Only numbers max 3 digits
    if (!/^\d{0,3}$/.test(val)) return;
    const newOctets = [...octets];
    newOctets[index] = val;
    setOctets(newOctets);
    if (status !== 'idle') setStatus('idle');
  };

  const testConnection = () => {
    setStatus('testing');

    setTimeout(() => {
       const hostOctet = parseInt(octets[3] || '0', 10);
       
       // Correct condition: Subnet 192.168.1.x, where X is between 1 and 254 (0 is net, 255 is broadcast)
       // And let's assume .1 is the gateway. So valid is 2-254.
       const isValidIp = 
          octets[0] === '192' && 
          octets[1] === '168' && 
          octets[2] === '1' && 
          hostOctet > 1 && hostOctet < 255;

       if (isValidIp) {
          setStatus('success');
          if (onComplete) onComplete(20);
       } else {
          setStatus('fail');
       }
    }, 1500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
       
       {/* Theory / Context */}
       <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-8 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 text-cyan-500 mb-6">
               <Globe className="w-8 h-8" />
               <h3 className="text-2xl font-black uppercase tracking-tighter">Camada 3 (Rede)</h3>
            </div>
            
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
               Um dos computadores do departamento perdeu a conexão com o roteador <strong>192.168.1.1 (Gateway)</strong>. Alguém do RH tentou configurar a rede manualmente e colocou valores impossíveis.
            </p>

            <div className="bg-slate-950 p-4 border border-slate-800 rounded-xl space-y-2 text-sm text-slate-400 font-mono">
               <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span>Rede Local:</span>
                  <span className="text-slate-200 text-right">192.168.1.0/24</span>
               </div>
               <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span>Mascara /24:</span>
                  <span className="text-slate-200 text-right">255.255.255.0</span>
               </div>
               <div className="flex justify-between pb-1 pt-1">
                  <span>Regra OSI:</span>
                  <span className="text-cyan-400 text-right">O último octeto (host) deve estar entre 2 e 254.</span>
               </div>
            </div>
          </div>
       </div>

       {/* Interactive UI */}
       <div className="bg-slate-950 border border-slate-800 rounded-[2rem] p-8 shadow-2xl relative">
          
          <div className="flex items-center justify-between mb-8">
             <h4 className="font-bold text-white uppercase text-sm tracking-widest flex items-center gap-2">
                <Router className="w-4 h-4 text-cyan-400" /> Endereço IPv4
             </h4>
          </div>

          <div className="flex items-end justify-center mb-10">
             <div className="flex gap-2 items-center">
                {octets.map((o, idx) => (
                  <div key={idx} className="flex items-end gap-2">
                    <input 
                       type="text" 
                       value={o}
                       onChange={(e) => handleOctetChange(idx, e.target.value)}
                       disabled={idx < 3 || status === 'testing' || status === 'success'} // Only allow changing the last octet in this specific lab to simplify
                       className="w-16 h-14 bg-slate-900 border-2 border-slate-700 focus:border-cyan-500 rounded-xl text-center text-xl font-mono text-white transition-colors disabled:opacity-50"
                    />
                    {idx < 3 && <span className="text-slate-500 font-black text-2xl pb-1">.</span>}
                  </div>
                ))}
             </div>
          </div>

          {/* Feedback Line */}
          <div className="h-16 flex flex-col justify-center border-t border-slate-800 pt-6 mt-auto">
             <AnimatePresence mode="wait">
                {status === 'testing' && (
                  <motion.div key="testing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-cyan-400 font-bold mb-4 text-center animate-pulse text-sm">
                     Diagnosticando colisão e disparando pings...
                  </motion.div>
                )}
                {status === 'success' && (
                  <motion.div key="success" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex justify-center flex-col gap-2 items-center text-emerald-400 font-bold mb-4 text-sm mt-4">
                     <CheckCircle2 className="w-6 h-6" /> ENDEREÇO VÁLIDO. Conectividade Layer 3 reestabelecida. (20 pts)
                  </motion.div>
                )}
                {status === 'fail' && (
                  <motion.div key="fail" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex justify-center flex-col gap-2 items-center text-rose-400 font-bold mb-4 text-sm mt-4 text-center">
                     <AlertOctagon className="w-6 h-6" /> FALHA: Endereço do host é inválido (maior que 254) ou confita com rede/broadcast.
                  </motion.div>
                )}
             </AnimatePresence>

             {status !== 'success' && (
               <button 
                  onClick={testConnection}
                  disabled={status === 'testing'}
                  className="w-full mt-4 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all active:scale-95 shadow-[0_0_20px_rgba(6,182,212,0.3)] disabled:opacity-50"
               >
                  APLICAR CARTA E PINGAR GATEWAY
               </button>
             )}
          </div>

       </div>

    </div>
  );
}
