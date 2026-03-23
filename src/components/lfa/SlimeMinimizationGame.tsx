import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, RotateCcw, Combine } from 'lucide-react';

const SLIMES = ['q0', 'q1', 'q2', 'q3', 'q4', 'q5'];

// The correct equivalence classes
const CORRECT_PARTITIONS = [
  ['q0', 'q5'],
  ['q1', 'q2'],
  ['q3', 'q4']
];

export function SlimeMinimizationGame() {
  // state storing where each slime is. 'pool' or partition index '0', '1', '2'
  const [slimePositions, setSlimePositions] = useState<Record<string, string>>({
    'q0': 'pool', 'q1': 'pool', 'q2': 'pool', 'q3': 'pool', 'q4': 'pool', 'q5': 'pool'
  });

  const [validation, setValidation] = useState<'idle' | 'success' | 'error'>('idle');

  const handleDragStart = (e: React.DragEvent, slimeId: string) => {
    e.dataTransfer.setData('slimeId', slimeId);
  };

  const handleDrop = (e: React.DragEvent, targetZone: string) => {
    e.preventDefault();
    const droppedSlime = e.dataTransfer.getData('slimeId');
    if (SLIMES.includes(droppedSlime)) {
      setSlimePositions(prev => ({
        ...prev,
        [droppedSlime]: targetZone
      }));
      setValidation('idle');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const checkSolution = () => {
    // Collect what the user placed in partitions 0, 1, 2
    const userPartitions: Record<string, string[]> = { '0': [], '1': [], '2': [] };
    
    let isCompletelyFilled = true;
    for (const slime of SLIMES) {
      const pos = slimePositions[slime];
      if (pos === 'pool') {
         isCompletelyFilled = false;
         continue;
      }
      userPartitions[pos].push(slime);
    }

    if (!isCompletelyFilled) {
       setValidation('error');
       return;
    }

    // Check if the user's groups match the CORRECT_PARTITIONS (order of groups doesn't matter)
    const userGroups = Object.values(userPartitions).map(g => g.sort().join(','));
    const correctGroups = CORRECT_PARTITIONS.map(g => [...g].sort().join(','));

    let isCorrect = true;
    for (const cg of correctGroups) {
      if (!userGroups.includes(cg)) {
        isCorrect = false;
        break;
      }
    }

    setValidation(isCorrect ? 'success' : 'error');
  };

  const resetGame = () => {
    setSlimePositions({
      'q0': 'pool', 'q1': 'pool', 'q2': 'pool', 'q3': 'pool', 'q4': 'pool', 'q5': 'pool'
    });
    setValidation('idle');
  };

  // Helper to render a slime
  const renderSlime = (slimeId: string) => (
    <motion.div
      layoutId={`slime-${slimeId}`}
      key={slimeId}
      draggable={validation !== 'success'} // disable drag if won
      onDragStart={(e) => handleDragStart(e as any, slimeId)}
      whileHover={validation !== 'success' ? { scale: 1.1, rotate: [0, -5, 5, 0] } : {}}
      whileTap={validation !== 'success' ? { scale: 0.95 } : {}}
      className={`w-14 h-14 rounded-full flex flex-col items-center justify-center font-bold shadow-xl outline outline-2 outline-offset-2
        ${validation === 'success' 
            ? 'bg-emerald-500 outline-emerald-300 text-emerald-950 shadow-emerald-500/50' 
            : 'bg-emerald-400 outline-emerald-600 text-emerald-950 cursor-grab active:cursor-grabbing hover:bg-emerald-300'
        }
      `}
    >
      <div className="flex gap-1 mb-1">
        <div className="w-1.5 h-1.5 bg-black rounded-full" />
        <div className="w-1.5 h-1.5 bg-black rounded-full" />
      </div>
      <div className="text-xs">{slimeId}</div>
    </motion.div>
  );

  return (
    <div className="w-full flex flex-col gap-6 items-center my-6">
      
      {/* RULES / INSTRUCTIONS */}
      <div className="w-full max-w-4xl bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 shadow-xl flex items-center justify-between gap-6">
         <div>
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">2</span>
              Minimização de Slimes
            </h3>
            <p className="text-slate-400 text-sm">
               Agrupe os estados Equivalentes na mesma "Bolha de Memória" (Partição).
               <br/>Dica Mágica: <strong>q0 com q5</strong>. <strong>q1 com q2</strong>. <strong>q3 com q4</strong>.
            </p>
         </div>
      </div>

      {/* DRAG AND DROP AREA */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* POOL OF SLIMES */}
        <div 
          className="md:col-span-4 bg-slate-800/50 rounded-3xl p-6 border-2 border-dashed border-slate-600 min-h-[300px] flex flex-col"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'pool')}
        >
          <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 text-center">Laboratório (Estoque)</h4>
          <div className="flex-1 flex flex-wrap content-start gap-4">
            <AnimatePresence>
               {SLIMES.filter(s => slimePositions[s] === 'pool').map(renderSlime)}
            </AnimatePresence>
          </div>
        </div>

        {/* PARTITIONS (DROP ZONES) */}
        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
           {['0', '1', '2'].map((zoneIndex) => (
             <div 
               key={`zone-${zoneIndex}`}
               className={`bg-slate-900/80 rounded-[2rem] p-4 border-2 transition-colors min-h-[300px] relative overflow-hidden flex flex-col
                 ${validation === 'success' ? 'border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.2)]' : 'border-slate-700 hover:border-emerald-500/30'}
               `}
               onDragOver={handleDragOver}
               onDrop={(e) => handleDrop(e, zoneIndex)}
             >
                <h4 className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-4 text-center">Partição {parseInt(zoneIndex)+1}</h4>
                <div className="flex-1 flex flex-wrap content-center justify-center gap-2 relative z-10">
                   <AnimatePresence>
                      {SLIMES.filter(s => slimePositions[s] === zoneIndex).map(renderSlime)}
                   </AnimatePresence>
                </div>

                {/* Success Fusion Effect */}
                <AnimatePresence>
                  {validation === 'success' && (
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1.5, opacity: 0.2 }}
                      className="absolute inset-0 bg-emerald-500 rounded-full blur-2xl z-0"
                      transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                    />
                  )}
                </AnimatePresence>
             </div>
           ))}
        </div>
      </div>

      {/* CONTROLS & FEEDBACK */}
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-between gap-4 mt-2">
          <button 
            onClick={resetGame}
            className="px-4 py-2 rounded-xl border border-slate-600 text-slate-400 hover:bg-slate-700 hover:text-white flex items-center gap-2 transition-colors text-sm font-bold"
          >
            <RotateCcw className="w-4 h-4" /> Resetar
          </button>

          <AnimatePresence mode="wait">
            {validation === 'error' && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center gap-2 text-rose-400 bg-rose-500/10 px-4 py-2 rounded-xl border border-rose-500/20"
              >
                  <XCircle className="w-5 h-5 shrink-0" />
                  <span className="text-sm font-bold">Alguns estados não são equivalentes! Revise os grupos.</span>
              </motion.div>
            )}
            
            {validation === 'success' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-2 text-emerald-400 bg-emerald-500/10 px-6 py-3 rounded-2xl border border-emerald-500/30"
              >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 shrink-0" />
                    <span className="text-lg font-black">Minimização Concluída!</span>
                  </div>
                  <span className="text-sm text-emerald-200">Você reduziu o AFD de 6 estados para 3 estados idênticos. (Slimes Fundidos!)</span>
              </motion.div>
            )}
          </AnimatePresence>

          {validation !== 'success' && (
            <button 
              onClick={checkSolution}
              className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white flex items-center gap-2 transition-transform active:scale-95 font-black shadow-lg shadow-purple-900/50"
            >
              <Combine className="w-5 h-5" /> FUNDIR SLIMES
            </button>
          )}
      </div>

    </div>
  );
}
