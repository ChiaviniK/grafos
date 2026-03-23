import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, MonitorPlay, Zap, XCircle } from 'lucide-react';

interface Packet {
  id: number;
  status: 'flying' | 'lost' | 'arrived';
  yOffset: number;
}

export function UdpCannon() {
  const [packets, setPackets] = useState<Packet[]>([]);
  const [receivedCount, setReceivedCount] = useState(0);
  const [lostCount, setLostCount] = useState(0);
  const [isStreaming, setIsStreaming] = useState(false);
  const packetIdCounter = useRef(0);
  const streamInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const firePacket = () => {
    const id = packetIdCounter.current++;
    // 25% chance of packet loss
    const willLose = Math.random() < 0.25;
    const yOffset = (Math.random() - 0.5) * 60; // Spread out visually

    setPackets(prev => [...prev, { id, status: willLose ? 'lost' : 'flying', yOffset }]);

    // Resolve packet fate after animation
    if (willLose) {
      setTimeout(() => {
        setLostCount(prev => prev + 1);
        setPackets(prev => prev.filter(p => p.id !== id));
      }, 800); // Dies halfway
    } else {
      setTimeout(() => {
        setReceivedCount(prev => prev + 1);
        setPackets(prev => prev.map(p => p.id === id ? { ...p, status: 'arrived' } : p));
        // Remove after hit effect
        setTimeout(() => setPackets(prev => prev.filter(p => p.id !== id)), 200);
      }, 1500); // Full journey time
    }
  };

  const toggleStream = () => {
    if (isStreaming) {
      clearInterval(streamInterval.current!);
      setIsStreaming(false);
    } else {
      setIsStreaming(true);
      streamInterval.current = setInterval(() => {
        firePacket();
      }, 150); // Ratatatata
    }
  };

  useEffect(() => {
    return () => {
      if (streamInterval.current) clearInterval(streamInterval.current);
    };
  }, []);

  // Calculate generic streaming quality based on recent packet loss
  const total = receivedCount + lostCount;
  const quality = total > 0 ? Math.round((receivedCount / total) * 100) : 100;

  return (
    <div className="w-full flex flex-col gap-6 items-center">
      <div className="w-full bg-slate-900 border border-slate-700/50 rounded-3xl p-6 shadow-2xl relative overflow-hidden flex flex-col pt-8">
         
         <div className="flex justify-between items-center mb-12 relative z-10 px-4">
             <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-orange-950/50 border border-orange-500/50 rounded-2xl flex items-center justify-center relative z-10 shadow-[0_0_30px_rgba(249,115,22,0.2)]">
                   <Server className="w-10 h-10 text-orange-400" />
                   <div className="absolute -bottom-6 text-xs font-bold font-mono text-orange-400 text-center w-32">Twitch Server</div>
                </div>
                <button 
                  onMouseDown={toggleStream}
                  onMouseUp={toggleStream}
                  onMouseLeave={() => isStreaming && toggleStream()}
                  onClick={() => !isStreaming && firePacket()} // Single click support
                  className={`mt-10 px-6 py-3 rounded-full font-black flex items-center gap-2 transition-all ${isStreaming ? 'bg-orange-600 text-white scale-95 shadow-inner' : 'bg-orange-500/20 text-orange-400 border border-orange-500/50 hover:bg-orange-500 hover:text-white'}`}
                >
                  <Zap className={`w-5 h-5 ${isStreaming ? 'animate-pulse' : ''}`} />
                  {isStreaming ? 'CANNON ONLINE!' : 'SEGURE PARA ATIRAR'}
                </button>
             </div>

             {/* The Void (Network Path) */}
             <div className="flex-1 h-32 relative mx-4 border-y border-slate-800/50 flex items-center justify-center">
                 <div className="text-slate-700 font-mono tracking-widest text-xs uppercase opacity-50">Rotas IP Congestionadas</div>
                 
                 <AnimatePresence>
                   {packets.map(packet => (
                      <motion.div
                         key={packet.id}
                         initial={{ left: '0%', opacity: 1, y: packet.yOffset, scale: 0.5 }}
                         animate={{ 
                            left: packet.status === 'lost' ? '50%' : '100%', 
                            opacity: packet.status === 'lost' ? 0 : 1,
                            scale: packet.status === 'lost' ? 2 : 1,
                            backgroundColor: packet.status === 'lost' ? '#ef4444' : '#f97316' // red if lost
                         }}
                         transition={{ duration: packet.status === 'lost' ? 0.8 : 1.5, ease: "linear" }}
                         className={`absolute w-3 h-3 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.8)] z-0 ${packet.status === 'lost' ? 'border border-red-500' : 'bg-orange-500'}`}
                      >
                         {packet.status === 'lost' && <XCircle className="w-8 h-8 text-red-500/50 absolute -top-2 -left-2 animate-ping" />}
                      </motion.div>
                   ))}
                 </AnimatePresence>
             </div>

             <div className="flex flex-col items-center">
                <div className={`w-20 h-20 border rounded-2xl flex items-center justify-center relative z-10 transition-colors ${quality < 70 ? 'bg-amber-950/50 border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.2)]' : 'bg-blue-950/50 border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.2)]'}`}>
                   <MonitorPlay className={`w-10 h-10 ${quality < 70 ? 'text-amber-400' : 'text-blue-400'}`} />
                   <div className="absolute -bottom-6 text-xs font-bold font-mono text-slate-400 text-center w-32">Viewer (You)</div>
                </div>
                
                {/* Stats */}
                <div className="mt-8 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono space-y-1 min-w-[140px]">
                   <div className="flex justify-between text-emerald-400"><span>Frames:</span> <span>{receivedCount}</span></div>
                   <div className="flex justify-between text-rose-500"><span>Perdidos:</span> <span>{lostCount}</span></div>
                   <div className="h-px w-full bg-slate-800 my-1" />
                   <div className={`flex justify-between font-bold ${quality < 70 ? 'text-amber-400' : 'text-blue-400'}`}>
                      <span>Qualidade:</span> <span>{quality}%</span>
                   </div>
                </div>
             </div>
         </div>

         <div className="bg-slate-950/50 p-4 rounded-xl text-center text-sm text-slate-400 border border-slate-800/50 mx-4">
             Mesmo perdendo dezenas de pacotes, a transmissão do vídeo nunca para por causa do UDP.<br/>A qualidade gráfica do filme cai momentaneamente (artefatos na tela), mas <b>o show tem que continuar!</b>
         </div>

      </div>
    </div>
  );
}
