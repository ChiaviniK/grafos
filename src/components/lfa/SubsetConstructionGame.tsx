import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Combine, Beaker, CheckCircle2, RotateCcw } from 'lucide-react';

type OrbState = 'q0' | 'q1' | 'q2';

export function SubsetConstructionGame() {
  const [selectedOrbs, setSelectedOrbs] = useState<OrbState[]>([]);
  const [isFused, setIsFused] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'fail'>('idle');

  // Objective: Fuse q0 and q1
  const toggleOrb = (orb: OrbState) => {
    if (isFused || status !== 'idle') return;
    if (selectedOrbs.includes(orb)) {
      setSelectedOrbs(prev => prev.filter(o => o !== orb));
    } else {
      setSelectedOrbs(prev => [...prev, orb]);
    }
  };

  const attemptFusion = () => {
    if (selectedOrbs.length === 0) return;
    setIsFused(true);
    
    // Check if exactly q0 and q1 were selected
    if (selectedOrbs.includes('q0') && selectedOrbs.includes('q1') && !selectedOrbs.includes('q2')) {
       setTimeout(() => setStatus('success'), 1500);
    } else {
       setTimeout(() => setStatus('fail'), 1500);
    }
  };

  const resetGame = () => {
    setSelectedOrbs([]);
    setIsFused(false);
    setStatus('idle');
  };

  return (
    <div className="w-full flex flex-col gap-6 items-center">
      <div className="w-full bg-slate-900 border border-indigo-900/50 rounded-3xl p-6 shadow-[0_0_40px_rgba(99,102,241,0.1)] relative overflow-hidden flex flex-col">
         
         <div className="flex flex-col items-center mb-6 px-4">
             <div className="bg-slate-950 px-6 py-4 rounded-xl border border-slate-800 text-center shadow-inner max-w-lg">
                <p className="text-slate-400 text-sm mb-2 font-mono">Problema de Compilação NFA -{'>'} DFA:</p>
                <div className="text-xl text-indigo-300 font-mono font-bold tracking-wider">
                   O nó principal leu <span className="text-white bg-slate-800 px-2 rounded">0</span>.<br/>O Multiverso se bifurcou em <span className="text-white">q0</span> e <span className="text-white">q1</span>.
                </div>
                <p className="text-slate-500 text-xs mt-3">Para o Processador entender, selecione as esferas corretas e funda-as num único estado determinístico!</p>
             </div>
         </div>

         {/* Alchemist Table */}
         <div className="relative h-72 border border-slate-800 rounded-2xl mx-4 flex flex-col items-center justify-center p-8 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/40 via-slate-900 to-slate-950">
             
             {!isFused ? (
                <div className="flex gap-8 md:gap-16">
                   {['q0', 'q1', 'q2'].map((orb) => {
                      const isSelected = selectedOrbs.includes(orb as OrbState);
                      return (
                         <motion.button 
                           key={orb}
                           whileHover={{ scale: 1.1 }}
                           whileTap={{ scale: 0.95 }}
                           onClick={() => toggleOrb(orb as OrbState)}
                           className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center font-mono font-black text-2xl border-4 transition-all duration-300 ${isSelected ? 'border-indigo-400 bg-indigo-500/20 text-indigo-300 shadow-[0_0_40px_rgba(99,102,241,0.6)]' : 'border-slate-700 bg-slate-800 text-slate-500 hover:border-slate-600'}`}
                         >
                            {orb}
                            {isSelected && (
                               <motion.div 
                                  initial={{ opacity: 0 }} 
                                  animate={{ opacity: 1 }} 
                                  className="absolute inset-x-0 -bottom-8 text-xs text-indigo-400 font-sans tracking-widest text-center"
                               >
                                  PRONTO
                               </motion.div>
                            )}
                         </motion.button>
                      );
                   })}
                </div>
             ) : (
                <div className="flex items-center justify-center w-full h-full relative">
                   <AnimatePresence>
                      {status === 'idle' && (
                         <motion.div
                           initial={{ scale: 0.5, opacity: 0 }}
                           animate={{ scale: [1, 1.2, 1], opacity: 1, rotate: 360 }}
                           transition={{ duration: 1.5, ease: "easeInOut" }}
                           className="w-32 h-32 rounded-full bg-indigo-500 shadow-[0_0_100px_rgba(99,102,241,1)] flex items-center justify-center border-4 border-white/50 blur-[2px]"
                         />
                      )}
                      
                      {status === 'success' && (
                         <motion.div
                           initial={{ scale: 0, opacity: 0 }}
                           animate={{ scale: 1, opacity: 1 }}
                           className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-slate-950 border-8 border-indigo-400 shadow-[0_0_80px_rgba(99,102,241,0.8)] flex flex-col items-center justify-center font-mono z-10"
                         >
                            <span className="text-3xl font-black text-indigo-300">[q0,q1]</span>
                            <span className="text-xs uppercase text-indigo-500 mt-2 font-bold tracking-widest">Macro Estado</span>
                         </motion.div>
                      )}

                      {status === 'fail' && (
                         <motion.div
                           initial={{ scale: 0, opacity: 0 }}
                           animate={{ scale: 1, opacity: 1 }}
                           className="w-40 h-40 rounded-full bg-slate-950 border-8 border-rose-500 shadow-[0_0_80px_rgba(244,63,94,0.8)] flex flex-col items-center justify-center font-mono z-10"
                         >
                            <span className="text-xl font-black text-rose-300">Resíduos Instáveis</span>
                            <span className="text-xs uppercase text-rose-500 mt-2 font-bold">A Fusão Falhou</span>
                         </motion.div>
                      )}
                   </AnimatePresence>
                </div>
             )}
             
         </div>

         {/* Control Panel */}
         <div className="flex justify-center mt-6">
            {status === 'idle' && !isFused && (
               <button 
                 onClick={attemptFusion}
                 disabled={selectedOrbs.length === 0}
                 className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600 text-white font-black px-8 py-4 rounded-2xl flex items-center gap-3 shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all active:scale-95"
               >
                  <Combine className="w-6 h-6" /> FUNDIR SUBCONJUNTO
               </button>
            )}

            {(status === 'success' || status === 'fail') && (
                <div className="flex flex-col items-center gap-4">
                   <div className={`px-6 py-2 rounded-full font-bold text-sm tracking-widest uppercase flex items-center gap-2 ${status === 'success' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' : 'bg-rose-500/20 text-rose-400 border border-rose-500/50'}`}>
                      {status === 'success' ? <CheckCircle2 className="w-5 h-5"/> : <Beaker className="w-5 h-5"/>}
                      {status === 'success' ? 'CPU compilação viavel' : 'Elementos incorretos misturados'}
                   </div>
                   <button onClick={resetGame} className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 shadow-inner transition-colors">
                      <RotateCcw className="w-5 h-5" /> REFAZER FUSÃO
                   </button>
                </div>
            )}
         </div>

      </div>
    </div>
  );
}
