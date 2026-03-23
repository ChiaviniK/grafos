import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Activity, ShieldCheck, ShieldAlert } from 'lucide-react';

// DFA Definition for Parity (Even 0s, Odd 1s)
// States: 
// q0: Even 0, Even 1 (Start)
// q1: Even 0, Odd 1 (Accept)
// q2: Odd 0, Even 1
// q3: Odd 0, Odd 1

const TRANSITIONS: Record<string, Record<string, string>> = {
  'q0': { '0': 'q2', '1': 'q1' },
  'q1': { '0': 'q3', '1': 'q0' },
  'q2': { '0': 'q0', '1': 'q3' },
  'q3': { '0': 'q1', '1': 'q2' },
};

const INITIAL_STATE = 'q0';
const ACCEPT_STATES = ['q1'];

export function StringTesterGame() {
  const [inputString, setInputString] = useState('10011');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [activeState, setActiveState] = useState(INITIAL_STATE);
  const [validationResult, setValidationResult] = useState<'idle' | 'accepted' | 'rejected'>('idle');
  
  const timerRef = useRef<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow 0s and 1s
    const val = e.target.value.replace(/[^01]/g, '');
    setInputString(val);
    resetSimulation();
  };

  const startSimulation = () => {
    if (inputString.length === 0) return;
    setIsPlaying(true);
    setCurrentIndex(0);
    setActiveState(INITIAL_STATE);
    setValidationResult('idle');
  };

  const resetSimulation = () => {
    setIsPlaying(false);
    setCurrentIndex(-1);
    setActiveState(INITIAL_STATE);
    setValidationResult('idle');
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    if (isPlaying && currentIndex < inputString.length) {
      timerRef.current = window.setTimeout(() => {
        const symbol = inputString[currentIndex];
        const nextState = TRANSITIONS[activeState][symbol];
        setActiveState(nextState);
        setCurrentIndex(prev => prev + 1);
      }, 800); // 800ms per step
    } else if (isPlaying && currentIndex >= inputString.length) {
      setIsPlaying(false);
      setValidationResult(ACCEPT_STATES.includes(activeState) ? 'accepted' : 'rejected');
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentIndex, activeState, inputString]);

  // Helper to render state nodes
  const renderStateNode = (id: string, label: string, isAccepting: boolean = false) => {
    const isActive = activeState === id;
    return (
      <div className="flex flex-col items-center">
         <motion.div
           animate={{
             scale: isActive ? 1.15 : 1,
             boxShadow: isActive ? '0 0 30px rgba(59, 130, 246, 0.6)' : '0 0 0px rgba(0,0,0,0)',
             borderColor: isActive ? '#3b82f6' : isAccepting ? '#10b981' : '#475569',
             backgroundColor: isActive ? '#1e3a8a' : '#0f172a'
           }}
           className={`w-20 h-20 rounded-full flex flex-col items-center justify-center border-[3px] z-10 relative
             ${isAccepting ? 'border-double border-8 border-emerald-500/50' : 'border-slate-600'}
           `}
         >
            {isAccepting && (
                <div className="absolute inset-1 rounded-full border border-emerald-500/50 pointer-events-none" />
            )}
            <span className={`font-black tracking-widest ${isActive ? 'text-white' : 'text-slate-400'}`}>
               {id}
            </span>
            {id === 'q0' && (
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-slate-400" />
            )}
         </motion.div>
         <span className="text-[10px] uppercase font-bold text-slate-500 mt-2 tracking-widest text-center w-24">
             {label}
         </span>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col gap-8 items-center justify-center my-4">
       
       {/* UI Header & Input */}
       <div className="w-full max-w-2xl bg-slate-900 border border-slate-700/50 rounded-[2rem] p-6 md:p-8 flex flex-col items-center shadow-2xl relative overflow-hidden">
         
         {/* Success/Error BG Glow */}
         <div className={`absolute inset-0 z-0 transition-colors duration-1000 ${validationResult === 'accepted' ? 'bg-emerald-500/10' : validationResult === 'rejected' ? 'bg-rose-500/10' : 'bg-transparent'}`} />

         <div className="relative z-10 w-full flex flex-col items-center">
            <h3 className="text-xl md:text-2xl font-black text-white mb-2 flex items-center gap-3">
               <Activity className="w-6 h-6 text-blue-400" /> Testador Léxico do AFD
            </h3>
            <p className="text-sm text-slate-400 text-center max-w-md mb-6">
               Autômato: Paridade Exata. Deve conter número <strong>PAR de 0s</strong> e <strong>ÍMPAR de 1s</strong>.
            </p>

            {/* Input Tape Box */}
            <div className="flex gap-4 items-center w-full max-w-sm mb-6">
               <input 
                 type="text" 
                 value={inputString}
                 onChange={handleInputChange}
                 disabled={isPlaying}
                 placeholder="Digite 01001..."
                 maxLength={15}
                 className="flex-1 bg-slate-950 border-2 border-slate-700 text-white font-mono text-center text-xl tracking-[0.3em] p-4 rounded-xl focus:border-blue-500 outline-none disabled:opacity-50"
               />
               
               {isPlaying ? (
                   <button onClick={resetSimulation} className="bg-slate-800 p-4 rounded-xl text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 transition-colors">
                     <RotateCcw className="w-6 h-6" />
                   </button>
               ) : (
                   <button onClick={startSimulation} disabled={inputString.length === 0} className="bg-blue-600 p-4 rounded-xl text-white hover:bg-blue-500 border border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)] disabled:opacity-30 disabled:shadow-none transition-all active:scale-95">
                     <Play className="w-6 h-6 fill-current" />
                   </button>
               )}
            </div>

            {/* Simulated Tape Display */}
            <div className="flex bg-slate-950 p-3 rounded-xl border border-slate-800 min-w-[200px] h-16 items-center justify-center gap-2 overflow-hidden shadow-inner font-mono text-2xl font-bold relative">
               {inputString.split('').map((char, idx) => (
                   <motion.div
                     key={idx}
                     initial={{ opacity: 0.5, y: 0 }}
                     animate={{ 
                         opacity: idx < currentIndex ? 0.2 : 1,
                         y: idx === currentIndex ? -5 : 0,
                         scale: idx === currentIndex ? 1.2 : 1,
                         color: idx === currentIndex ? '#60a5fa' : '#94a3b8'
                     }}
                     className={`w-8 text-center transition-colors ${idx === currentIndex ? 'text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]' : 'text-slate-500'}`}
                   >
                     {char}
                   </motion.div>
               ))}
               {inputString.length === 0 && <span className="text-slate-700 text-sm italic font-sans font-normal tracking-normal">Aguardando entrada...</span>}
               
               {/* Read Head pointer */}
               {currentIndex >= 0 && currentIndex < inputString.length && (
                   <motion.div 
                     layoutId="readHeader"
                     transition={{ type: "spring", stiffness: 300, damping: 30 }}
                     className="absolute bottom-1 w-6 h-1 bg-blue-500 rounded-full"
                     style={{ left: `calc(50% - ${(inputString.length) * 16}px + ${currentIndex * 32}px + 12px)` }} // Rough manual anchoring logic based on gap-2 (8px), w-8 (32px)
                   />
               )}
            </div>

            {/* Validation Feedback */}
            <AnimatePresence>
               {validationResult !== 'idle' && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    className={`mt-6 px-6 py-3 rounded-2xl flex items-center gap-3 border shadow-2xl ${validationResult === 'accepted' ? 'bg-emerald-900/50 border-emerald-500 text-emerald-400 shadow-emerald-900/50' : 'bg-rose-900/50 border-rose-500 text-rose-400 shadow-rose-900/50'}`}
                  >
                     {validationResult === 'accepted' ? <ShieldCheck className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6" />}
                     <span className="font-black tracking-wider uppercase">
                         {validationResult === 'accepted' ? 'Cadeia Aceita!' : 'Cadeia Rejeitada!'}
                     </span>
                  </motion.div>
               )}
            </AnimatePresence>
         </div>
       </div>

       {/* Visual Grafo Area */}
       <div className="w-full max-w-3xl flex flex-col items-center">
           <h4 className="text-slate-500 text-xs font-black tracking-[0.3em] uppercase mb-8">Máquina de Estados (Boss)</h4>
           
           {/* Visual Diagram 2x2 Grid */}
           <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[300px] scale-75 md:scale-100 origin-top">
               
               {/* Node positions */}
               <div className="absolute top-0 left-0">
                  {renderStateNode('q0', 'Par 0, Par 1')}
               </div>
               <div className="absolute top-0 right-0">
                  {renderStateNode('q2', 'Ímpar 0, Par 1')}
               </div>
               <div className="absolute bottom-0 left-0">
                  {renderStateNode('q1', 'Par 0, Ímpar 1', true)}
               </div>
               <div className="absolute bottom-0 right-0">
                  {renderStateNode('q3', 'Ímpar 0, Ímpar 1')}
               </div>

               {/* Horizontal Top Edges (q0 <-> q2 on 0) */}
               <div className="absolute top-10 left-[80px] right-[80px] h-px border-t-2 border-dashed border-slate-700 flex items-center justify-center">
                  <span className="bg-slate-950 px-2 text-xs font-bold text-slate-500 text-blue-500">lê '0' ↔</span>
               </div>
               
               {/* Horizontal Bottom Edges (q1 <-> q3 on 0) */}
               <div className="absolute bottom-16 left-[80px] right-[80px] h-px border-t-2 border-dashed border-slate-700 flex items-center justify-center">
                  <span className="bg-slate-950 px-2 text-xs font-bold text-slate-500 text-blue-500">lê '0' ↔</span>
               </div>

               {/* Vertical Left Edges (q0 <-> q1 on 1) */}
               <div className="absolute top-[80px] bottom-[100px] left-10 w-px border-l-2 border-dashed border-slate-700 flex items-center justify-center">
                  <span className="bg-slate-950 py-1 text-xs font-bold text-slate-500 text-amber-500 rotate-90">lê '1' ↕</span>
               </div>

               {/* Vertical Right Edges (q2 <-> q3 on 1) */}
               <div className="absolute top-[80px] bottom-[100px] right-10 w-px border-l-2 border-dashed border-slate-700 flex items-center justify-center">
                  <span className="bg-slate-950 py-1 text-xs font-bold text-slate-500 text-amber-500 rotate-90">lê '1' ↕</span>
               </div>

           </div>
       </div>

    </div>
  );
}
