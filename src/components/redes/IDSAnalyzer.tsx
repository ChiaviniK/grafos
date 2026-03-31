import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radar, ZoomIn, Skull, ShieldCheck } from 'lucide-react';

interface Payload {
  id: string;
  source: string;
  isMalicious: boolean;
  hexContent: string[];
  signatureIndex: number; // Where the malicious payload starts
}

const PAYLOAD_DATA: Payload[] = [
  { id: 'p1', source: '200.15.2.1', isMalicious: false, hexContent: ['GET', '/index.html', 'HTTP/1.1', 'Host:', 'unimax.edu'], signatureIndex: -1 },
  { id: 'p2', source: '88.31.2.99', isMalicious: true, hexContent: ['POST', '/login', 'user=admin', '&pass=', '1=1; DROP TABLE'], signatureIndex: 4 },
  { id: 'p3', source: '10.0.0.5', isMalicious: false, hexContent: ['GET', '/style.css', 'Accept:', 'text/css'], signatureIndex: -1 },
  { id: 'p4', source: '104.22.1.2', isMalicious: true, hexContent: ['GET', '/api', 'User-Agent:', 'Nmap Scripting Engine', 'v7.92'], signatureIndex: 3 },
];

export function IDSAnalyzer() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedWord, setSelectedWord] = useState<number | null>(null);
  const [gameState, setGameState] = useState<'scanning' | 'analyzing' | 'resolved' | 'failed'>('scanning');
  const [score, setScore] = useState(0);

  const payload = PAYLOAD_DATA[currentIdx];

  useEffect(() => {
    if (gameState === 'scanning') {
      const timer = setTimeout(() => {
        setGameState('analyzing');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [gameState, currentIdx]);

  const handleWordSelect = (index: number) => {
    if (gameState !== 'analyzing') return;
    setSelectedWord(index);

    if (payload.isMalicious) {
      if (index === payload.signatureIndex) {
        setGameState('resolved');
        setScore(s => s + 1);
      } else {
        setGameState('failed');
      }
    } else {
      setGameState('failed'); // Clicking words on benign payload is a false positive
    }
  };

  const handleClearTraffic = () => {
    if (gameState !== 'analyzing') return;
    if (!payload.isMalicious) {
      setGameState('resolved');
      setScore(s => s + 1);
    } else {
      setGameState('failed'); // Flagging malicious as clear is a false negative
    }
  };

  const nextPayload = () => {
    setSelectedWord(null);
    setGameState('scanning');
    setCurrentIdx((prev) => (prev + 1) % PAYLOAD_DATA.length);
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 font-mono relative">
      <div className="text-center mb-4">
         <h4 className="text-emerald-400 font-bold flex items-center justify-center gap-2 text-xl">
            <Radar className="w-6 h-6" /> IDS: Detecção de Assinaturas (DPI)
         </h4>
         <p className="text-slate-400 text-sm max-w-xl">
            O Intrusion Detection System varre o coração da carga útil (Deep Packet Inspection). Crie uma Assinatura <span className="text-rose-400 font-bold">clicando no trecho suspeito</span>, ou libere se for <span className="text-emerald-400 font-bold">Benigno</span>.
         </p>
      </div>

      <div className="w-full max-w-3xl bg-slate-900 border-2 border-slate-700/50 rounded-2xl p-6 shadow-2xl relative overflow-hidden transition-colors duration-1000">
          
          <div className="flex justify-between items-center mb-6 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center gap-4">
                  <ZoomIn className={`w-8 h-8 ${gameState === 'scanning' ? 'text-emerald-500 animate-spin' : 'text-slate-500'}`} />
                  <div>
                      <div className="text-[10px] text-slate-500 font-black tracking-widest uppercase">Motor Snort IDS</div>
                      <div className="text-sm font-bold text-slate-300">Payload Escaneado: {currentIdx + 1}/4</div>
                  </div>
              </div>
              <div className="text-right">
                  <div className="text-xs text-slate-500 uppercase tracking-widest font-black">Score</div>
                  <div className="text-xl font-bold text-emerald-400">{score}00 <span className="text-xs">PTS</span></div>
              </div>
          </div>

          <div className="bg-[#0f172a] rounded-xl border border-slate-800 shadow-inner relative flex flex-col items-center min-h-[300px] justify-center overflow-hidden">
             
             {gameState === 'scanning' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center text-emerald-500/50">
                   <Radar className="w-24 h-24 animate-ping mb-4" />
                   <p className="font-bold tracking-widest">INTERCEPTANDO PAYLOAD...</p>
                </motion.div>
             )}

             {gameState !== 'scanning' && (
                <div className="w-full h-full p-8 flex flex-col space-y-6">
                    <div className="flex justify-between items-center text-xs tracking-widest font-black text-slate-500 border-b border-slate-800 pb-2">
                        <span>SRC: {payload.source}</span>
                        <span>DPI ENGINE: ENGAGED</span>
                    </div>

                    <div className="flex flex-wrap gap-2 text-sm sm:text-base">
                        {payload.hexContent.map((word, idx) => {
                            const isSelected = selectedWord === idx;
                            return (
                                <motion.button
                                   key={idx}
                                   initial={{ opacity: 0, y: 10 }}
                                   animate={{ opacity: 1, y: 0 }}
                                   transition={{ delay: idx * 0.1 }}
                                   onClick={() => handleWordSelect(idx)}
                                   disabled={gameState === 'resolved' || gameState === 'failed'}
                                   className={`px-3 py-1 rounded transition-colors border ${
                                       isSelected && gameState === 'resolved' ? 'bg-rose-500/20 text-rose-400 border-rose-500/50' :
                                       isSelected && gameState === 'failed' ? 'bg-orange-500/20 text-orange-400 border-orange-500/50' :
                                       'bg-slate-800/50 text-slate-300 border-transparent hover:bg-slate-700 hover:border-slate-600'
                                   }`}
                                >
                                    {word}
                                </motion.button>
                            );
                        })}
                    </div>
                </div>
             )}

             <AnimatePresence>
                 {(gameState === 'resolved' || gameState === 'failed') && (
                     <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`absolute bottom-0 left-0 w-full p-6 backdrop-blur-md border-t flex flex-col sm:flex-row items-center justify-between z-10 ${
                            gameState === 'resolved' ? 'bg-emerald-950/90 border-emerald-500/50' : 'bg-orange-950/90 border-orange-500/50'
                        }`}
                     >
                         <div className="flex items-center gap-4 mb-4 sm:mb-0">
                             {gameState === 'resolved' ? <ShieldCheck className="w-12 h-12 text-emerald-400" /> : <Skull className="w-12 h-12 text-orange-400" />}
                             <div>
                                 <h4 className={`text-xl font-black ${gameState === 'resolved' ? 'text-emerald-400' : 'text-orange-400'}`}>
                                     {gameState === 'resolved' ? 'Avaliação Correta' : 'Falso Positivo/Negativo'}
                                 </h4>
                                 <p className="text-slate-300 text-sm">
                                     {gameState === 'resolved' ? 'Você analisou a carga de forma cirúrgica.' : 'Sua regra prejudicou a estabilidade da DMZ.'}
                                 </p>
                             </div>
                         </div>
                         <button onClick={nextPayload} className="px-6 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-bold hover:bg-slate-800 transition-colors">
                             Próximo Flow
                         </button>
                     </motion.div>
                 )}
             </AnimatePresence>
          </div>

          {gameState === 'analyzing' && (
             <div className="flex justify-center mt-6">
                 <button 
                  onClick={handleClearTraffic}
                  className="px-8 py-3 bg-slate-800 border-2 border-slate-700 rounded-xl text-slate-300 font-bold flex items-center gap-2 hover:bg-slate-700 hover:text-white transition-all shadow-lg"
                 >
                   <ShieldCheck className="w-5 h-5"/> CLASSIFICAR COMO BENIGNO
                 </button>
             </div>
          )}
      </div>
    </div>
  );
}
