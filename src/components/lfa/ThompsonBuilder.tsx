import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Maximize, RotateCcw, Puzzle, Combine } from 'lucide-react';

type Operation = 'concat' | 'union' | 'star' | null;

export function ThompsonBuilder() {
  const [operation, setOperation] = useState<Operation>(null);

  const reset = () => setOperation(null);

  return (
    <div className="w-full flex flex-col items-center gap-6 font-mono">
      <div className="text-center">
         <h4 className="text-fuchsia-400 font-bold mb-2 flex items-center justify-center gap-2">
            <Puzzle className="w-5 h-5" /> Lego Computation: Algoritmo de Thompson
         </h4>
         <p className="text-slate-400 text-sm max-w-xl">
             Selecione uma Operação Regular para ver como o compilador usa transições vazias (&epsilon;) para colar as caixas-pretas de autômatos menores e construir Regex complexos.
         </p>
      </div>

      {/* Control Panel */}
      <div className="flex gap-4">
          <button 
             onClick={() => setOperation('concat')}
             className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors ${operation === 'concat' ? 'bg-sky-600 text-white shadow-[0_0_20px_rgba(2,132,199,0.5)]' : 'bg-slate-900 text-sky-400 border border-sky-900 hover:bg-slate-800'}`}
          >
              <Combine className="w-5 h-5" /> Concatenação (A • B)
          </button>
          <button 
             onClick={() => setOperation('union')}
             className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors ${operation === 'union' ? 'bg-fuchsia-600 text-white shadow-[0_0_20px_rgba(217,70,239,0.5)]' : 'bg-slate-900 text-fuchsia-400 border border-fuchsia-900 hover:bg-slate-800'}`}
          >
              <Plus className="w-5 h-5" /> União (A &cup; B)
          </button>
          <button 
             onClick={() => setOperation('star')}
             className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors ${operation === 'star' ? 'bg-amber-500 text-slate-900 shadow-[0_0_20px_rgba(245,158,11,0.5)]' : 'bg-slate-900 text-amber-500 border border-amber-900 hover:bg-slate-800'}`}
          >
              <Maximize className="w-5 h-5" /> Estrela de Kleene (A*)
          </button>
      </div>

      <div className="w-full max-w-3xl aspect-[16/7] bg-slate-950 border-2 border-slate-800 rounded-3xl relative overflow-hidden shadow-2xl flex items-center justify-center">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />

         <AnimatePresence mode="wait">
            {!operation && (
                <motion.div 
                   key="idle"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   className="text-slate-600 font-bold uppercase tracking-widest text-sm text-center"
                >
                    [ Aguardando Engenharia ]
                    <div className="flex gap-4 items-center justify-center mt-6">
                        <div className="w-24 h-16 bg-slate-800 rounded-lg border-2 border-slate-700 flex items-center justify-center text-slate-500 shadow-inner">AFN A</div>
                        <div className="w-24 h-16 bg-slate-800 rounded-lg border-2 border-slate-700 flex items-center justify-center text-slate-500 shadow-inner">AFN B</div>
                    </div>
                </motion.div>
            )}

            {operation === 'concat' && (
                <motion.div 
                   key="concat"
                   initial={{ opacity: 0, scale: 0.8 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.8 }}
                   className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                    <div className="flex items-center">
                        <div className="w-32 h-20 bg-sky-900/40 border-2 border-sky-500 rounded-xl flex items-center justify-center text-sky-400 font-bold shadow-[0_0_30px_rgba(14,165,233,0.3)] relative group">
                            <span className="absolute -left-3 w-6 h-6 rounded-full bg-slate-900 border-2 border-sky-500 flex items-center justify-center text-[10px]">&gt;</span>
                            AFN A
                            <span className="absolute -right-3 w-6 h-6 rounded-full bg-slate-900 border-2 border-sky-500 flex items-center justify-center text-[10px]">◎</span>
                        </div>

                        {/* Connection */}
                        <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: 100 }}
                           transition={{ duration: 0.8 }}
                           className="h-1 bg-fuchsia-500/80 relative flex items-center justify-center overflow-hidden"
                        >
                            <span className="text-fuchsia-200 text-[10px] absolute -top-4 font-bold bg-slate-900 px-1 rounded">&epsilon;</span>
                            <div className="w-2 h-2 border-r-2 border-t-2 border-fuchsia-200 transform rotate-45" />
                        </motion.div>

                        <div className="w-32 h-20 bg-emerald-900/40 border-2 border-emerald-500 rounded-xl flex items-center justify-center text-emerald-400 font-bold shadow-[0_0_30px_rgba(16,185,129,0.3)] relative">
                            <span className="absolute -left-3 w-6 h-6 rounded-full bg-slate-900 border-2 border-emerald-500 flex items-center justify-center text-[10px]">&gt;</span>
                            AFN B
                            <span className="absolute -right-3 w-6 h-6 rounded-full bg-slate-900 border-2 border-emerald-500 flex items-center justify-center text-[10px]">◎</span>
                        </div>
                    </div>
                    
                    <div className="absolute top-8 text-sky-300 text-xs font-bold text-center w-full">O estado final de A se funde com Epsilon ao inicial de B.</div>
                </motion.div>
            )}

            {operation === 'union' && (
                <motion.div 
                   key="union"
                   initial={{ opacity: 0, scale: 0.8 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.8 }}
                   className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                >
                   <div className="relative w-full h-full flex items-center justify-center">
                        {/* Start Node */}
                        <div className="absolute left-10 w-8 h-8 rounded-full bg-slate-900 border-2 border-fuchsia-500 flex items-center justify-center shadow-[0_0_20px_rgba(217,70,239,0.5)] z-10 text-[10px] text-fuchsia-300">&gt;</div>
                        
                        {/* Upper AFN */}
                        <div className="absolute top-[20%] w-32 h-16 bg-sky-900/40 border-2 border-sky-500 rounded-xl flex items-center justify-center text-sky-400 font-bold shadow-[0_0_20px_rgba(14,165,233,0.3)] z-10 relative">AFN A</div>
                        
                        {/* Lower AFN */}
                        <div className="absolute bottom-[20%] w-32 h-16 bg-emerald-900/40 border-2 border-emerald-500 rounded-xl flex items-center justify-center text-emerald-400 font-bold shadow-[0_0_20px_rgba(16,185,129,0.3)] z-10 relative">AFN B</div>

                        {/* End Node */}
                        <div className="absolute right-10 w-8 h-8 rounded-full bg-slate-900 border-4 double border-fuchsia-500 flex items-center justify-center shadow-[0_0_20px_rgba(217,70,239,0.5)] z-10 text-[10px] text-fuchsia-300">◎</div>

                        {/* SVG Connections generated by Framer Motion path */}
                        <svg className="absolute inset-0 w-full h-full">
                            <motion.path d="M 70 50 L 150 25" stroke="#d946ef" strokeWidth="2" strokeDasharray="5,5" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
                            <motion.path d="M 70 50 L 150 75" stroke="#d946ef" strokeWidth="2" strokeDasharray="5,5" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
                            
                            <motion.path d="M 270 25 L 350 50" stroke="#d946ef" strokeWidth="2" strokeDasharray="5,5" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.5 }} />
                            <motion.path d="M 270 75 L 350 50" stroke="#d946ef" strokeWidth="2" strokeDasharray="5,5" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.5 }} />
                        </svg>
                        
                        <div className="absolute top-6 text-fuchsia-300 text-xs font-bold text-center w-full">Um novo estado inicial dispara &epsilon; para A ou B simulaneamente em ramos paralelos.</div>
                   </div>
                </motion.div>
            )}

            {operation === 'star' && (
                <motion.div 
                   key="star"
                   initial={{ opacity: 0, scale: 0.8 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.8 }}
                   className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                   <div className="relative w-full h-full flex flex-col items-center justify-center">
                        <div className="flex items-center gap-12 z-10 relative">
                             <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-amber-500 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.5)] text-[10px] text-amber-300">&gt;</div>
                             
                             <div className="w-32 h-20 bg-indigo-900/40 border-2 border-indigo-500 rounded-xl flex items-center justify-center text-indigo-400 font-bold shadow-[0_0_30px_rgba(99,102,241,0.3)]">
                                 AFN A
                             </div>

                             <div className="w-8 h-8 rounded-full bg-slate-900 border-4 double border-amber-500 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.5)] text-[10px] text-amber-300">◎</div>
                        </div>

                        {/* Back Loop Arc */}
                        <svg className="absolute inset-0 w-full h-full">
                            {/* In to Out (Skip) */}
                            <motion.path d="M 120 40 Q 200 10 280 40" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }} />
                            <text x="50%" y="22%" fill="#fcd34d" fontSize="10" textAnchor="middle">&epsilon; (Vazio)</text>
                            
                            {/* AFN End to Start (Repeat) */}
                            <motion.path d="M 270 50 Q 200 90 130 50" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.5 }} />
                            <text x="50%" y="78%" fill="#fcd34d" fontSize="10" textAnchor="middle">&epsilon; (Reset)</text>
                            
                            {/* Start to AFN start */}
                            <motion.path d="M 120 50 L 140 50" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" fill="none" />
                            <motion.path d="M 260 50 L 280 50" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" fill="none" />
                        </svg>

                        <div className="absolute top-2 text-amber-300 text-xs font-bold text-center w-full z-20">Um bypass &epsilon; para zero repetições, e um loop &epsilon; para voltar ao início (Loop infinito).</div>
                   </div>
                </motion.div>
            )}
         </AnimatePresence>
      </div>

      <div className="flex gap-4 items-center">
         <button onClick={reset} className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <RotateCcw className="w-4 h-4" /> Limpar Laboratório
         </button>
      </div>
    </div>
  );
}
