import { useState } from 'react';
import { ArrowDownUp, CheckCircle2, Server, Smartphone, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TcpHandshakeSimulatorProps {
  onComplete?: (score: number) => void;
}

type PacketType = 'SYN' | 'SYN-ACK' | 'ACK' | 'RST' | 'FIN';

interface Packet {
  type: PacketType;
  direction: 'client-to-server' | 'server-to-client';
  id: number;
}

export function TcpHandshakeSimulator({ onComplete }: TcpHandshakeSimulatorProps) {
  const [step, setStep] = useState(0); 
  // 0: Start, 1: SYN Sent waiting SYN-ACK, 2: SYN-ACK received waiting ACK, 3: Established
  const [packets, setPackets] = useState<Packet[]>([]);
  const [status, setStatus] = useState<'idle' | 'failed' | 'success'>('idle');

  const sendClientPacket = (type: PacketType) => {
    if (status === 'success' || status === 'failed') return;
    
    // Add client packet
    setPackets(prev => [...prev, { type, direction: 'client-to-server', id: Date.now() }]);

    if (step === 0 && type === 'SYN') {
       // Correct first step
       setStep(1);
       setTimeout(() => {
          setPackets(prev => [...prev, { type: 'SYN-ACK', direction: 'server-to-client', id: Date.now() }]);
          setStep(2);
       }, 1500);
    } 
    else if (step === 2 && type === 'ACK') {
       // Correct third step
       setStep(3);
       setTimeout(() => {
          setStatus('success');
          if (onComplete) onComplete(20);
       }, 1000);
    } 
    else {
       // Wrong button pressed
       setTimeout(() => {
          setPackets(prev => [...prev, { type: 'RST', direction: 'server-to-client', id: Date.now() }]);
          setStatus('failed');
       }, 800);
    }
  };

  const reset = () => {
    setStep(0);
    setStatus('idle');
    setPackets([]);
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
       
       {/* Instruction Banner */}
       <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row justify-between items-center shadow-xl gap-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
               <ArrowDownUp className="w-5 h-5 text-indigo-400" /> Camada 4: Fechamento de Socket (TCP)
            </h3>
            <p className="text-slate-400 text-sm mt-1">
               O protocolo TCP garante entrega enviando um <strong>aperto de mãos triplo</strong> antes de transferir dados reais na web.
            </p>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-500 font-mono shrink-0">
             Alvo: Servidor Web (Porta 443)
          </div>
       </div>

       {/* Simulation Area */}
       <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 relative min-h-[400px] flex flex-col">
          
          <div className="flex justify-between items-center px-10 mb-8 relative z-10">
             <div className="flex flex-col items-center gap-3">
                <div className={`p-4 rounded-full border-2 transition-colors ${status === 'success' ? 'bg-indigo-500/20 border-indigo-400' : 'bg-slate-900 border-slate-700'}`}>
                   <Smartphone className={`w-8 h-8 ${status === 'success' ? 'text-indigo-400' : 'text-slate-400'}`} />
                </div>
                <span className="font-bold text-white text-sm">Cliente (Você)</span>
                <span className="text-[10px] text-slate-500 font-mono">Porta Random: 54123</span>
             </div>

             <div className="flex flex-col items-center gap-3">
                <div className={`p-4 rounded-full border-2 transition-colors ${status === 'success' ? 'bg-emerald-500/20 border-emerald-400' : 'bg-slate-900 border-slate-700'}`}>
                   <Server className={`w-8 h-8 ${status === 'success' ? 'text-emerald-400' : 'text-slate-400'}`} />
                </div>
                <span className="font-bold text-white text-sm">Servidor Linux</span>
                <span className="text-[10px] text-slate-500 font-mono">Porta Alvo: 443 (HTTPS)</span>
             </div>
          </div>

          <div className="flex-1 relative border-l-2 border-r-2 border-slate-800 mx-16 mb-8 flex flex-col justify-start pt-4 gap-6 bg-[url('/img/noise.png')] bg-repeat opacity-80 mix-blend-screen">
             
             <AnimatePresence>
                {packets.map((pkt) => (
                   <motion.div 
                      key={pkt.id}
                      initial={{ opacity: 0, x: pkt.direction === 'client-to-server' ? -50 : 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex w-full ${pkt.direction === 'client-to-server' ? 'justify-start pl-8' : 'justify-end pr-8'}`}
                   >
                     <div className="relative w-3/4">
                       {/* The arrow line */}
                       <div className={`absolute top-1/2 -translate-y-1/2 w-full h-0.5 ${pkt.direction === 'client-to-server' ? 'bg-gradient-to-r from-indigo-500 to-transparent' : 'bg-gradient-to-l from-emerald-500 to-transparent'}`} />
                       
                       {/* The packet label */}
                       <div className={`absolute top-1/2 -translate-y-1/2 px-3 py-1 pb-1.5 rounded text-[10px] font-bold tracking-widest ${
                          pkt.type === 'RST' ? 'bg-rose-500 text-white left-1/2 -translate-x-1/2' :
                          pkt.direction === 'client-to-server' ? 'bg-indigo-900 text-indigo-200 left-10' : 'bg-emerald-900 border border-emerald-700 text-emerald-200 right-10'
                       }`}>
                          {pkt.type}
                       </div>
                     </div>
                   </motion.div>
                ))}
             </AnimatePresence>
             
             {step === 1 && status === 'idle' && (
                <div className="text-center text-xs text-slate-500 font-bold mt-4 animate-pulse flex items-center justify-center gap-2">
                   <Loader2 className="w-3 h-3 animate-spin"/> Servidor processando SYN...
                </div>
             )}

          </div>

          {/* Action Keyboard */}
          <div className="border-t border-slate-800 pt-6">
             {status === 'success' ? (
                <div className="bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-bold p-4 rounded-xl flex items-center justify-center gap-3">
                   <CheckCircle2 className="w-5 h-5" /> SOCKET ESTABELECIDO - ROTA L4 OTIMIZADA (20 pts)
                </div>
             ) : status === 'failed' ? (
                <div className="flex flex-col items-center gap-3">
                   <div className="text-rose-400 font-bold text-sm">O Servidor enviou um Reset (RST). Pacto quebrado por requisição fútil.</div>
                   <button onClick={reset} className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm transition-colors">Reiniciar Negociação</button>
                </div>
             ) : (
                <div className="flex items-center justify-between">
                   <span className="text-slate-400 text-sm font-bold uppercase tracking-wider">Enviar Pacote:</span>
                   <div className="flex gap-2">
                      <button onClick={() => sendClientPacket('SYN')} disabled={step !== 0} className={`px-6 py-3 rounded-xl font-bold transition-all border-b-4 ${step === 0 ? 'bg-indigo-600 border-indigo-900 text-white hover:bg-indigo-500 hover:-translate-y-1' : 'bg-slate-800 border-slate-900 text-slate-600 cursor-not-allowed'}`}>
                         1. SYN
                      </button>
                      <button onClick={() => sendClientPacket('SYN-ACK')} className="px-6 py-3 rounded-xl font-bold transition-all border-b-4 bg-slate-800 border-slate-900 text-slate-600 hover:bg-slate-700 active:translate-y-1">
                         * SYN-ACK
                      </button>
                      <button onClick={() => sendClientPacket('ACK')} disabled={step !== 2} className={`px-6 py-3 rounded-xl font-bold transition-all border-b-4 ${step === 2 ? 'bg-indigo-600 border-indigo-900 text-white hover:bg-indigo-500 hover:-translate-y-1' : 'bg-slate-800 border-slate-900 text-slate-600 cursor-not-allowed'}`}>
                         3. ACK
                      </button>
                   </div>
                </div>
             )}
          </div>
       </div>

    </div>
  );
}
