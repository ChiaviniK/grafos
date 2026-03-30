import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, SplitSquareHorizontal, Ghost } from 'lucide-react';

interface ActiveState {
  id: string; // unique ID to track UI particles
  node: string;
}

export function MultiverseSimulator() {
  const [inputString, setInputString] = useState('001');
  const [activeClones, setActiveClones] = useState<ActiveState[]>([]);
  const [status, setStatus] = useState<'idle' | 'running' | 'accepted' | 'rejected'>('idle');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Hardcoded NFA logic for { w | termina com 01 }
  // q0 --0--> {q0, q1}
  // q0 --1--> {q0}
  // q1 --1--> {q2}
  // q2 = ACCEPT
  const processInput = () => {
    if (currentIndex >= inputString.length) {
       setStatus(activeClones.some(c => c.node === 'q2') ? 'accepted' : 'rejected');
       return;
    }

    const char = inputString[currentIndex];
    const newClones: ActiveState[] = [];

    activeClones.forEach(clone => {
       if (clone.node === 'q0') {
          if (char === '0') {
             newClones.push({ id: Date.now() + Math.random().toString(), node: 'q0' });
             newClones.push({ id: Date.now() + Math.random().toString(), node: 'q1' });
          } else { // '1'
             newClones.push({ id: Date.now() + Math.random().toString(), node: 'q0' });
          }
       } else if (clone.node === 'q1') {
          if (char === '1') {
             newClones.push({ id: Date.now() + Math.random().toString(), node: 'q2' });
          }
          // if '0', this clone dies. No transition exists.
       } else if (clone.node === 'q2') {
          // q2 is dead end (no transitions out)
       }
    });

    setActiveClones(newClones);
    setCurrentIndex(prev => prev + 1);
  };

  useEffect(() => {
     if (status === 'running') {
        const timer = setTimeout(processInput, 1500);
        return () => clearTimeout(timer);
     }
  }, [currentIndex, status, activeClones]);

  const startGame = () => {
    if (inputString.match(/[^01]/)) return;
    setActiveClones([{ id: 'init', node: 'q0' }]);
    setCurrentIndex(0);
    setStatus('running');
  };

  const resetGame = () => {
    setActiveClones([]);
    setCurrentIndex(0);
    setStatus('idle');
  };

  return (
    <div className="w-full flex flex-col gap-6 items-center">
      <div className="w-full bg-slate-900 border border-fuchsia-900/50 rounded-3xl p-6 shadow-[0_0_40px_rgba(217,70,239,0.1)] relative overflow-hidden flex flex-col">
         
         <div className="flex justify-between items-center mb-6 px-4">
             <div className="flex bg-slate-950 rounded-xl overflow-hidden border border-slate-800">
                <input 
                  type="text" 
                  value={inputString}
                  onChange={e => setStatus('idle') || setInputString(e.target.value)}
                  disabled={status === 'running'}
                  className="bg-transparent text-white font-mono text-xl p-3 w-40 text-center outline-none focus:bg-fuchsia-950/20 focus:text-fuchsia-300 transition-colors"
                  placeholder="0 e 1 apenas"
                />
             </div>
             <div>
                {status === 'idle' && (
                  <button onClick={startGame} className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-black px-6 py-3 rounded-xl flex items-center gap-2 shadow-[0_0_20px_rgba(217,70,239,0.3)] transition-transform active:scale-95">
                     <Play className="w-5 h-5 fill-white" /> EXECUTAR
                  </button>
                )}
                {(status === 'running' || status === 'accepted' || status === 'rejected') && (
                  <button onClick={resetGame} className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 shadow-inner transition-transform active:scale-95">
                     <RotateCcw className="w-5 h-5" /> REINICIAR
                  </button>
                )}
             </div>
         </div>

         {/* String progress tape */}
         {(status !== 'idle') && (
            <div className="flex gap-2 justify-center mb-12">
               {inputString.split('').map((char, idx) => (
                  <div key={idx} className={`w-10 h-10 border-2 rounded-lg flex items-center justify-center font-mono font-black text-xl transition-all ${idx < currentIndex ? 'bg-fuchsia-900/50 border-fuchsia-500/50 text-fuchsia-200' : idx === currentIndex && status === 'running' ? 'bg-fuchsia-500 border-fuchsia-300 text-white shadow-[0_0_15px_rgba(217,70,239,0.8)] scale-110' : 'bg-slate-950 border-slate-800 text-slate-600'}`}>
                     {char}
                  </div>
               ))}
            </div>
         )}

         {/* Visual Multiverse Machine */}
         <div className="relative h-64 border border-dashed border-fuchsia-900/40 rounded-2xl mx-4 flex items-center justify-center gap-16 md:gap-32 px-10 bg-[url('https://www.transparenttextures.com/patterns/black-felt.png')]">
             
             {/* Node q0 */}
             <div className="relative">
                <div className={`w-20 h-20 rounded-full border-4 flex flex-col items-center justify-center font-mono text-xl z-20 bg-slate-950 transition-colors ${activeClones.some(c => c.node === 'q0') ? 'border-fuchsia-500 text-fuchsia-300 shadow-[0_0_30px_rgba(217,70,239,0.5)]' : 'border-slate-800 text-slate-500'}`}>
                   q0
                   <span className="text-[10px] uppercase font-sans mt-1 opacity-50">Start</span>
                </div>
                {/* Visual self-loop indication */}
                <svg className="absolute -top-14 left-1/2 -translate-x-1/2 w-16 h-16 pointer-events-none" viewBox="0 0 100 100">
                    <path d="M 30,80 C 10,20 90,20 70,80" fill="none" stroke="rgba(217,70,239,0.3)" strokeWidth="4" className="path-glow"/>
                    <text x="45" y="30" fill="rgba(217,70,239,0.5)" fontSize="20" fontFamily="monospace">0,1</text>
                    <polygon points="65,70 75,70 70,80" fill="rgba(217,70,239,0.3)"/>
                </svg>

                {/* Multiverse Branches indicator (Clones on q0) */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-1">
                   <AnimatePresence>
                     {activeClones.filter(c => c.node === 'q0').map(clone => (
                         <motion.div key={clone.id} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0, opacity: 0 }} className="w-4 h-4 rounded-full bg-fuchsia-400 shadow-[0_0_10px_rgba(217,70,239,0.8)]" />
                     ))}
                   </AnimatePresence>
                </div>
             </div>

             {/* Connection Line */}
             <div className="flex-1 h-1 bg-fuchsia-900/30 relative">
                 <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-slate-950 px-2 text-fuchsia-500/50 font-mono font-bold">0</div>
             </div>

             {/* Node q1 */}
             <div className="relative">
                <div className={`w-20 h-20 rounded-full border-4 flex flex-col items-center justify-center font-mono text-xl z-20 bg-slate-950 transition-colors ${activeClones.some(c => c.node === 'q1') ? 'border-purple-500 text-purple-300 shadow-[0_0_30px_rgba(168,85,247,0.5)]' : 'border-slate-800 text-slate-500'}`}>
                   q1
                </div>

                {/* Clones on q1 */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-1">
                   <AnimatePresence>
                     {activeClones.filter(c => c.node === 'q1').map(clone => (
                         <motion.div key={clone.id} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0, opacity: 0 }} className="w-4 h-4 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
                     ))}
                   </AnimatePresence>
                </div>
             </div>

             {/* Connection Line */}
             <div className="flex-1 h-1 bg-indigo-900/30 relative">
                 <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-slate-950 px-2 text-indigo-500/50 font-mono font-bold">1</div>
             </div>

             {/* Node q2 */}
             <div className="relative">
                <div className={`w-20 h-20 rounded-full border-4 border-double flex flex-col items-center justify-center font-mono text-xl z-20 bg-slate-950 transition-colors ${activeClones.some(c => c.node === 'q2') ? 'border-emerald-500 text-emerald-300 shadow-[0_0_40px_rgba(16,185,129,0.8)]' : 'border-slate-800 text-slate-500'}`}>
                   q2
                   <span className="text-[10px] uppercase font-sans mt-1 opacity-50">Final</span>
                </div>

                {/* Clones on q2 */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-1">
                   <AnimatePresence>
                     {activeClones.filter(c => c.node === 'q2').map(clone => (
                         <motion.div key={clone.id} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0, opacity: 0 }} className="w-4 h-4 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,1)]" />
                     ))}
                   </AnimatePresence>
                </div>
             </div>
         </div>

         {/* Result Banner */}
         <AnimatePresence>
            {status === 'accepted' && (
               <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-emerald-950 border border-emerald-500 px-8 py-3 rounded-xl flex items-center gap-3 shadow-[0_0_30px_rgba(16,185,129,0.5)] z-30">
                   <SplitSquareHorizontal className="w-6 h-6 text-emerald-400" />
                   <span className="font-black text-emerald-400 tracking-widest uppercase">Palavra Aceita! (Pelo menos 1 clone sobreviveu)</span>
               </motion.div>
            )}
            {status === 'rejected' && (
               <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-rose-950 border border-rose-500 px-8 py-3 rounded-xl flex items-center gap-3 shadow-[0_0_30px_rgba(225,29,72,0.5)] z-30">
                   <Ghost className="w-6 h-6 text-rose-400" />
                   <span className="font-black text-rose-400 tracking-widest uppercase">Palavra Rejeitada (Todos os clones morreram)</span>
               </motion.div>
            )}
         </AnimatePresence>

      </div>
    </div>
  );
}
