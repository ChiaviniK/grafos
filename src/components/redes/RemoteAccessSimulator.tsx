import { useState } from 'react';
import { Terminal, MonitorPlay, Zap, CheckCircle2, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface RemoteAccessSimulatorProps {
  onComplete?: (score: number) => void;
}

const MISSIONS = [
  {
     id: 1,
     title: "Missão Crítica: Manutenção Linux",
     desc: "O Servidor Ubuntu Web01 sofreu um crash no Apache. Como ele não tem interface gráfica instalada por segurança (Headless), qual a única via remota aceita para subir o serviço?",
     correctProtocol: 'SSH',
     port: 22
  },
  {
     id: 2,
     title: "Missão Administrativa: Softwares GUI",
     desc: "O CEO precisa acessar uma aplicação de Contabilidade legada rodando direto na matriz do Windows Server. Ele exige usar o cursor do mouse e ver a área de trabalho da máquina.",
     correctProtocol: 'RDP',
     port: 3389
  }
];

export function RemoteAccessSimulator({ onComplete }: RemoteAccessSimulatorProps) {
  const [missionIndex, setMissionIndex] = useState(0);
  const [status, setStatus] = useState<'idle' | 'success' | 'fail' | 'completed'>('idle');

  const activeMission = MISSIONS[missionIndex];

  const handleChoice = (protocol: string) => {
     if (status !== 'idle') return;

     if (protocol === activeMission.correctProtocol) {
        setStatus('success');
        setTimeout(() => {
           if (missionIndex < MISSIONS.length - 1) {
              setMissionIndex(prev => prev + 1);
              setStatus('idle');
           } else {
              setStatus('completed');
              if (onComplete) onComplete(20);
           }
        }, 2000);
     } else {
        setStatus('fail');
        setTimeout(() => {
           setStatus('idle');
        }, 1500);
     }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
       
       {/* Context header */}
       <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex justify-between items-center shadow-xl">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
               <Zap className="w-5 h-5 text-fuchsia-400" /> Acesso L7: Escolha sua Arma
            </h3>
            <p className="text-slate-400 text-sm mt-1">Ataque o problema escolhendo a porta e o protocolo apropriados para o contexto.</p>
          </div>
       </div>

       {/* Main UI */}
       <div className="bg-slate-950 border border-slate-800 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            {status !== 'completed' ? (
              <motion.div key="mission" exit={{ opacity: 0 }} className="space-y-8">
                 
                 {/* Mission Card */}
                 <div className="bg-slate-900 border border-fuchsia-500/20 p-6 rounded-2xl relative">
                    <div className="absolute top-4 right-4 bg-fuchsia-500/10 text-fuchsia-400 text-[10px] font-bold px-3 py-1 rounded-full border border-fuchsia-500/30">
                       PROTOCOLO {missionIndex + 1}/2
                    </div>
                    <h4 className="text-white font-bold text-lg mb-2">{activeMission.title}</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">{activeMission.desc}</p>
                 </div>

                 {/* Dual Choice */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* SSH Option */}
                    <button 
                       onClick={() => handleChoice('SSH')}
                       className="group relative bg-slate-900 hover:bg-slate-800 border-2 border-slate-800 hover:border-fuchsia-500 rounded-2xl p-6 text-left transition-all hover:-translate-y-1 shadow-lg"
                    >
                       <div className="mb-4 bg-black border border-slate-700 rounded-xl p-4 h-32 flex flex-col justify-end">
                          <code className="text-emerald-500 text-xs font-mono">root@server:~# service apache start</code>
                          <code className="text-slate-500 text-xs font-mono animate-pulse">_</code>
                       </div>
                       <div className="flex items-center gap-3 mb-2">
                          <Terminal className="w-6 h-6 text-fuchsia-400" />
                          <h4 className="text-white font-black text-xl tracking-tight">SSH</h4>
                       </div>
                       <p className="text-slate-400 text-xs">Secure Shell (CLI)</p>
                       <p className="text-slate-500 text-[10px] font-bold uppercase mt-2">Porta 22 / TCP</p>

                       {status === 'fail' && activeMission.correctProtocol === 'RDP' && (
                          <div className="absolute inset-0 bg-rose-500/10 flex items-center justify-center rounded-xl backdrop-blur-sm border-2 border-rose-500">
                             <XCircle className="w-12 h-12 text-rose-500" />
                          </div>
                       )}
                       {status === 'success' && activeMission.correctProtocol === 'SSH' && (
                          <div className="absolute inset-0 bg-emerald-500/10 flex items-center justify-center rounded-xl backdrop-blur-sm border-2 border-emerald-500">
                             <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                          </div>
                       )}
                    </button>

                    {/* RDP Option */}
                    <button 
                       onClick={() => handleChoice('RDP')}
                       className="group relative bg-slate-900 hover:bg-slate-800 border-2 border-slate-800 hover:border-cyan-500 rounded-2xl p-6 text-left transition-all hover:-translate-y-1 shadow-lg"
                    >
                       <div className="mb-4 bg-blue-900 border border-blue-700 rounded-xl p-4 h-32 flex items-center justify-center relative overflow-hidden">
                          <div className="w-10 h-10 border-t-2 border-white rounded-full opacity-50 absolute left-4 top-4" />
                          <div className="bg-white px-3 py-1 text-slate-800 font-bold text-[10px] rounded shadow-sm">Recibos.xlsx</div>
                          <div className="absolute bottom-2 right-2 w-3 h-4 bg-white clip-cursor" />
                       </div>
                       <div className="flex items-center gap-3 mb-2">
                          <MonitorPlay className="w-6 h-6 text-cyan-400" />
                          <h4 className="text-white font-black text-xl tracking-tight">RDP</h4>
                       </div>
                       <p className="text-slate-400 text-xs">Remote Desktop (GUI)</p>
                       <p className="text-slate-500 text-[10px] font-bold uppercase mt-2">Porta 3389 / TCP</p>

                       {status === 'fail' && activeMission.correctProtocol === 'SSH' && (
                          <div className="absolute inset-0 bg-rose-500/10 flex items-center justify-center rounded-xl backdrop-blur-sm border-2 border-rose-500">
                             <XCircle className="w-12 h-12 text-rose-500" />
                          </div>
                       )}
                       {status === 'success' && activeMission.correctProtocol === 'RDP' && (
                          <div className="absolute inset-0 bg-emerald-500/10 flex items-center justify-center rounded-xl backdrop-blur-sm border-2 border-emerald-500">
                             <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                          </div>
                       )}
                    </button>

                 </div>
              </motion.div>
            ) : (
              <motion.div key="completed" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center justify-center py-12 text-center">
                 <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                 </div>
                 <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Engenharia Aprovada</h3>
                 <p className="text-slate-400 mb-6">Você domina os protocolos de acesso superior da Camada 7.</p>
                 <span className="bg-emerald-500/10 text-emerald-400 font-bold px-4 py-2 rounded-lg border border-emerald-500/20">
                    20 PONTOS GARANTIDOS
                 </span>
              </motion.div>
            )}
          </AnimatePresence>

       </div>
    </div>
  );
}
