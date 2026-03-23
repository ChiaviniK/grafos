import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ShieldAlert, ArrowRight, ArrowLeft } from 'lucide-react';

type Flag = 'SYN' | 'SYN-ACK' | 'ACK' | 'RST';

interface Packet {
  id: string;
  flag: Flag;
  sender: 'cliente' | 'servidor';
}

export function TcpHandshake() {
  const [sequence, setSequence] = useState<Packet[]>([]);
  const [status, setStatus] = useState<'idle' | 'established' | 'reset'>('idle');

  const addPacket = (flag: Flag, sender: 'cliente' | 'servidor') => {
    if (status !== 'idle') return;

    const newSequence = [...sequence, { id: Date.now().toString(), flag, sender }];
    setSequence(newSequence);

    // Validate logic
    if (newSequence.length === 1) {
      if (flag !== 'SYN' || sender !== 'cliente') setStatus('reset');
    } else if (newSequence.length === 2) {
      if (flag !== 'SYN-ACK' || sender !== 'servidor') setStatus('reset');
    } else if (newSequence.length === 3) {
      if (flag === 'ACK' && sender === 'cliente') {
        setStatus('established');
      } else {
        setStatus('reset');
      }
    }
  };

  const resetGame = () => {
    setSequence([]);
    setStatus('idle');
  };

  return (
    <div className="w-full flex flex-col gap-6 items-center">
      <div className="w-full bg-slate-900 border border-slate-700/50 rounded-3xl p-6 shadow-2xl relative overflow-hidden flex flex-col">
         
         <div className="flex justify-between text-xs font-mono font-bold tracking-widest text-slate-500 mb-8 px-4">
             <div className="text-blue-400">HOST A (Cliente Navegador)</div>
             <div className="text-emerald-400">HOST B (Servidor Web)</div>
         </div>

         {/* Visual Timeline (Tunnels) */}
         <div className="relative min-h-[240px] border-l-2 border-r-2 border-slate-800 mx-8 flex flex-col gap-4 py-4 px-2">
            
            <AnimatePresence mode="popLayout">
               {sequence.map((packet) => (
                  <motion.div 
                     key={packet.id}
                     initial={{ opacity: 0, scale: 0.8, y: -20 }}
                     animate={{ opacity: 1, scale: 1, y: 0 }}
                     className={`w-full flex items-center ${packet.sender === 'cliente' ? 'justify-start' : 'justify-end'}`}
                  >
                     <div className={`relative flex items-center w-3/4 ${packet.sender === 'cliente' ? 'flex-row' : 'flex-row-reverse'}`}>
                        {/* The sender dot */}
                        <div className={`w-3 h-3 rounded-full shrink-0 ${packet.sender === 'cliente' ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]' : 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]'}`} />
                        
                        {/* The arrow line */}
                        <div className={`flex-1 h-0.5 relative flex items-center ${packet.sender === 'cliente' ? 'bg-gradient-to-r from-blue-500 to-emerald-500/20' : 'bg-gradient-to-l from-emerald-500 to-blue-500/20'}`}>
                           {packet.sender === 'cliente' ? <ArrowRight className="w-4 h-4 text-emerald-500/60 absolute right-0" /> : <ArrowLeft className="w-4 h-4 text-blue-500/60 absolute left-0" />}
                        </div>

                        {/* The Packet Label */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-950 px-3 py-1 rounded font-black text-xs border border-slate-700 font-mono text-slate-200 uppercase tracking-widest">
                           {packet.flag}
                        </div>
                     </div>
                  </motion.div>
               ))}
            </AnimatePresence>

            {/* Connection Status Modals */}
            <AnimatePresence>
               {status === 'established' && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-x-0 top-1/2 -translate-y-1/2 mx-auto w-64 bg-emerald-950/80 backdrop-blur-md border border-emerald-500 p-4 rounded-2xl flex flex-col items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.3)] z-20"
                  >
                     <ShieldCheck className="w-12 h-12 text-emerald-400 mb-2" />
                     <h3 className="text-emerald-400 font-black text-center mb-1">CONEXÃO ESTABELECIDA</h3>
                     <p className="text-xs text-emerald-500/80 text-center mb-3">Túnel TCP confiável criado.</p>
                     <button onClick={resetGame} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors">
                        Começar de Novo
                     </button>
                  </motion.div>
               )}
               {status === 'reset' && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-x-0 top-1/2 -translate-y-1/2 mx-auto w-64 bg-rose-950/80 backdrop-blur-md border border-rose-500 p-4 rounded-2xl flex flex-col items-center justify-center shadow-[0_0_40px_rgba(225,29,72,0.3)] z-20"
                  >
                     <ShieldAlert className="w-12 h-12 text-rose-400 mb-2" />
                     <h3 className="text-rose-400 font-black text-center mb-1">CONEXÃO REJEITADA (RST)</h3>
                     <p className="text-xs text-rose-500/80 text-center mb-3">Ordem inválida de flags.</p>
                     <button onClick={resetGame} className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-lg transition-colors">
                        Tentar Novamente
                     </button>
                  </motion.div>
               )}
            </AnimatePresence>
         </div>

         {/* Controls Drawer */}
         <div className={`mt-8 bg-slate-950 border border-slate-800 rounded-2xl p-4 transition-opacity ${status !== 'idle' ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
             <h4 className="text-slate-400 text-xs font-bold uppercase text-center mb-4 tracking-widest">Painel de Comandos</h4>
             <div className="flex justify-between items-center gap-4">
                 
                 {/* Client Buttons */}
                 <div className="flex flex-col gap-2 w-1/3">
                    <button onClick={() => addPacket('SYN', 'cliente')} className="bg-blue-900/40 hover:bg-blue-600/60 border border-blue-500/30 text-blue-300 font-mono text-xs py-2 rounded transition-colors uppercase font-bold tracking-wider">Enviar SYN</button>
                    <button onClick={() => addPacket('ACK', 'cliente')} className="bg-blue-900/40 hover:bg-blue-600/60 border border-blue-500/30 text-blue-300 font-mono text-xs py-2 rounded transition-colors uppercase font-bold tracking-wider">Enviar ACK</button>
                 </div>

                 {/* Server Buttons */}
                 <div className="flex flex-col gap-2 w-1/3">
                    <button onClick={() => addPacket('SYN-ACK', 'servidor')} className="bg-emerald-900/40 hover:bg-emerald-600/60 border border-emerald-500/30 text-emerald-300 font-mono text-xs py-2 rounded transition-colors uppercase font-bold tracking-wider">Responder SYN-ACK</button>
                    <button onClick={() => addPacket('RST', 'servidor')} className="bg-rose-900/40 hover:bg-rose-600/60 border border-rose-500/30 text-rose-300 font-mono text-xs py-2 rounded transition-colors uppercase font-bold tracking-wider">Recusar (RST)</button>
                 </div>

             </div>
         </div>

      </div>
    </div>
  );
}
