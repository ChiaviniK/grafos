import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Router, Server, Smartphone, Laptop, Zap, CheckCircle2, XCircle } from 'lucide-react';

interface Packet {
  id: string;
  sourceIp: string;
  sourcePort: number;
  destUrl: string;
  color: string;
  mappedPort?: number; // Port on the NAT router
  status: 'pending' | 'translating' | 'sent' | 'returned' | 'failed';
}

const DEVICES = [
  { id: 'dev1', ip: '192.168.0.10', icon: Smartphone, color: 'text-sky-400', bg: 'bg-sky-900/40' },
  { id: 'dev2', ip: '192.168.0.11', icon: Laptop, color: 'text-fuchsia-400', bg: 'bg-fuchsia-900/40' },
];

const ROUTER_IP = '203.0.113.5';

export function NatSimulator() {
  const [packets, setPackets] = useState<Packet[]>([]);
  const [natTable, setNatTable] = useState<Record<number, { internalIp: string, internalPort: number }>>({});
  const [score, setScore] = useState(0);

  // Generate a random internal request
  useEffect(() => {
    const interval = setInterval(() => {
      if (packets.filter(p => p.status === 'pending').length < 3) {
        const dev = DEVICES[Math.floor(Math.random() * DEVICES.length)];
        setPackets(prev => [...prev.slice(-4), {
          id: Math.random().toString(36).substring(7),
          sourceIp: dev.ip,
          sourcePort: Math.floor(Math.random() * 10000) + 50000,
          destUrl: ['google.com', 'aws.com', 'cloudflare.com'][Math.floor(Math.random() * 3)],
          color: dev.color,
          status: 'pending'
        }]);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [packets]);

  const mapPort = (packetId: string, natPort: number) => {
    const packet = packets.find(p => p.id === packetId);
    if (!packet) return;

    // Reject if port is already used in NAT table
    if (natTable[natPort]) {
       // Mark failed
       setPackets(prev => prev.map(p => p.id === packetId ? { ...p, status: 'failed' } : p));
       return;
    }

    // Add to NAT Table
    setNatTable(prev => ({
      ...prev,
      [natPort]: { internalIp: packet.sourceIp, internalPort: packet.sourcePort }
    }));

    // Update packet to translating -> sent
    setPackets(prev => prev.map(p => p.id === packetId ? { ...p, status: 'translating', mappedPort: natPort } : p));
    
    setTimeout(() => {
      setPackets(prev => prev.map(p => p.id === packetId ? { ...p, status: 'sent' } : p));
      
      // Simulate web response
      setTimeout(() => {
         setPackets(prev => prev.map(p => p.id === packetId ? { ...p, status: 'returned' } : p));
         setScore(s => s + 10);
      }, 1500);
    }, 1000);
  };

  const handleManualMap = (packetId: string) => {
    const randomOpenPort = Math.floor(Math.random() * 10000) + 20000;
    mapPort(packetId, randomOpenPort);
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 font-mono relative">
      <div className="text-center mb-4">
         <h4 className="text-emerald-400 font-bold flex items-center justify-center gap-2 text-xl">
            <Zap className="w-6 h-6" /> Simulador de NAT (PAT)
         </h4>
         <p className="text-slate-400 text-sm max-w-xl">
            Roteie os pacotes da rede privada (192.168.x.x) mapeando-os para portas únicas no único IP Público do Roteador ({ROUTER_IP}).
         </p>
      </div>

      <div className="w-full max-w-4xl bg-slate-950 border-2 border-slate-800 rounded-3xl p-6 relative overflow-hidden shadow-2xl flex md:flex-row flex-col gap-6">
         
         {/* LAN Side */}
         <div className="flex-1 border-r-2 border-dashed border-slate-700 pr-6 flex flex-col justify-center gap-8 relative">
             <div className="absolute top-0 left-0 text-slate-500 font-black tracking-widest text-[10px]">REDE LOCAL (LAN) - Privada</div>
             
             {DEVICES.map(dev => (
                 <div key={dev.id} className={`${dev.bg} border-2 border-slate-700/50 p-4 rounded-xl flex items-center gap-4`}>
                     <dev.icon className={`w-8 h-8 ${dev.color}`} />
                     <div>
                         <div className={`font-bold ${dev.color} text-sm`}>{dev.ip}</div>
                         <div className="text-xs text-slate-400">Dispositivo Interno</div>
                     </div>
                 </div>
             ))}

             {/* Outgoing LAN Packets */}
             <div className="absolute right-6 top-0 bottom-0 flex flex-col justify-center gap-2">
                 <AnimatePresence>
                     {packets.filter(p => p.status === 'pending').map(p => (
                         <motion.div 
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            key={p.id}
                            className={`border border-slate-700 bg-slate-900 p-2 rounded-lg text-xs flex items-center justify-between gap-2 shadow-lg w-48`}
                         >
                            <span className={p.color}>{p.sourceIp}:{p.sourcePort}</span>
                            <button 
                               onClick={() => handleManualMap(p.id)}
                               className="bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/40 p-1 rounded font-bold transition-colors"
                            >
                                Mappear
                            </button>
                         </motion.div>
                     ))}
                 </AnimatePresence>
             </div>
         </div>

         {/* Router (NAT) */}
         <div className="w-64 flex flex-col items-center justify-center gap-4 relative z-10">
             <div className="w-32 h-32 bg-slate-900 border-4 border-emerald-500 rounded-2xl flex flex-col items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.3)] rotate-45 mb-8">
                 <div className="-rotate-45 flex flex-col items-center">
                     <Router className="w-10 h-10 text-emerald-400 mb-2" />
                     <span className="text-[10px] font-bold text-white uppercase tracking-widest">Router</span>
                     <span className="text-xs text-emerald-500 font-black">{ROUTER_IP}</span>
                 </div>
             </div>

             {/* NAT Table UI */}
             <div className="w-full bg-black/50 border border-slate-700 rounded-lg p-2 max-h-48 overflow-y-auto custom-scrollbar text-[10px]">
                 <div className="text-slate-500 font-bold mb-2 text-center border-b border-slate-700 pb-1">TABELA NAT (Port Address Trans.)</div>
                 <div className="grid grid-cols-2 gap-2 text-slate-400 font-bold mb-1">
                     <div>INTERNO (LAN)</div>
                     <div>TRADUÇÃO (WAN)</div>
                 </div>
                 {Object.entries(natTable).map(([wanPort, internal]) => (
                     <div key={wanPort} className="grid grid-cols-2 gap-2 text-slate-300 py-1 border-b border-slate-800/50">
                         <div className="truncate">{internal.internalIp}:{internal.internalPort}</div>
                         <div className="text-emerald-400">:{wanPort}</div>
                     </div>
                 ))}
                 {Object.keys(natTable).length === 0 && <div className="text-slate-600 text-center py-2 italic text-xs">Tabela Vazia</div>}
             </div>
         </div>

         {/* Internet Side */}
         <div className="flex-1 pl-6 flex flex-col justify-center items-end relative">
             <div className="absolute top-0 right-0 text-slate-500 font-black tracking-widest text-[10px]">INTERNET (WAN) - Pública</div>
             
             <div className="bg-indigo-900/20 border-2 border-indigo-500/30 p-6 rounded-3xl w-full h-full flex flex-col items-center justify-center gap-4 relative overflow-hidden">
                 <Server className="w-12 h-12 text-indigo-400" />
                 <div className="text-indigo-300 font-bold text-sm tracking-widest">WEB SERVERS</div>
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/connected.png')] opacity-10 pointer-events-none" />

                 {/* Traversing Packets */}
                 <AnimatePresence>
                     {packets.filter(p => p.status === 'translating' || p.status === 'sent' || p.status === 'returned').map(p => (
                         <motion.div 
                            key={p.id}
                            initial={{ left: '0%', top: '50%', scale: 0.5, opacity: 0 }}
                            animate={{ 
                                left: p.status === 'returned' ? '0%' : '70%', 
                                top: p.status === 'returned' ? '50%' : `${30 + Math.random() * 40}%`,
                                scale: 1, 
                                opacity: p.status === 'returned' ? 0 : 1 
                            }}
                            transition={{ duration: 1.5, ease: 'easeInOut' }}
                            className={`absolute -ml-10 border border-emerald-500 bg-emerald-950 p-2 rounded-lg text-[10px] flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.5)]`}
                         >
                            <span className="text-emerald-400">{ROUTER_IP}:{p.mappedPort}</span>
                            {p.status === 'sent' && <ArrowRight className="w-3 h-3 text-slate-400" />}
                            {p.status === 'returned' && <ArrowLeft className="w-3 h-3 text-fuchsia-400" />}
                         </motion.div>
                     ))}
                 </AnimatePresence>

             </div>
         </div>
         
      </div>

      <div className="flex justify-between w-full max-w-4xl px-4 text-sm font-bold items-center">
         <div className="text-slate-500 flex items-center gap-2">
             Falhas: {packets.filter(p => p.status === 'failed').length} <XCircle className="w-4 h-4 text-rose-500" />
         </div>
         <div className="text-emerald-400 text-xl tracking-widest flex items-center gap-2">
             SCORE: {score} <CheckCircle2 className="w-5 h-5" />
         </div>
      </div>
      
      {/* Dirty fix to silence unused warning */}
      <span className="hidden"><ArrowRight /><ArrowLeft /></span>
    </div>
  );
}

const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
);
const ArrowLeft = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
);
