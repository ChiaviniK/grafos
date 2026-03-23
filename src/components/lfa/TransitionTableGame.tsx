import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, RotateCcw, Play } from 'lucide-react';

const STATES = ['q0', 'q1', 'q2', 'q3', 'q4'];
const ALPHABET = ['a', 'b'];

// Correct answer map
const CORRECT_TABLE: Record<string, Record<string, string>> = {
  'q0': { 'a': 'q1', 'b': 'q3' },
  'q1': { 'a': 'q1', 'b': 'q2' },
  'q2': { 'a': 'q1', 'b': 'q2' },
  'q3': { 'a': 'q4', 'b': 'q3' },
  'q4': { 'a': 'q4', 'b': 'q3' },
};

export function TransitionTableGame() {
  // table[state][symbol] = dropped state
  const [table, setTable] = useState<Record<string, Record<string, string | null>>>({
    'q0': { 'a': null, 'b': null },
    'q1': { 'a': null, 'b': null },
    'q2': { 'a': null, 'b': null },
    'q3': { 'a': null, 'b': null },
    'q4': { 'a': null, 'b': null },
  });

  const [validation, setValidation] = useState<'idle' | 'success' | 'error'>('idle');

  const handleDragStart = (e: React.DragEvent, stateId: string) => {
    e.dataTransfer.setData('stateId', stateId);
  };

  const handleDrop = (e: React.DragEvent, row: string, col: string) => {
    e.preventDefault();
    const droppedState = e.dataTransfer.getData('stateId');
    if (STATES.includes(droppedState)) {
      setTable(prev => ({
        ...prev,
        [row]: {
          ...prev[row],
          [col]: droppedState
        }
      }));
      setValidation('idle');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const checkSolution = () => {
    let isCorrect = true;
    for (const state of STATES) {
      for (const symbol of ALPHABET) {
        if (table[state][symbol] !== CORRECT_TABLE[state][symbol]) {
          isCorrect = false;
        }
      }
    }
    setValidation(isCorrect ? 'success' : 'error');
  };

  const resetTable = () => {
    setTable({
      'q0': { 'a': null, 'b': null },
      'q1': { 'a': null, 'b': null },
      'q2': { 'a': null, 'b': null },
      'q3': { 'a': null, 'b': null },
      'q4': { 'a': null, 'b': null },
    });
    setValidation('idle');
  };

  // Remove item dynamically
  const handleRemove = (row: string, col: string) => {
    setTable(prev => ({
      ...prev,
      [row]: {
        ...prev[row],
        [col]: null
      }
    }));
    setValidation('idle');
  };

  return (
    <div className="w-full flex flex-col xl:flex-row gap-8 items-start my-8">
      
      {/* LEFT: Game Graph / Rules */}
      <div className="flex-1 bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-xl w-full">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
           <span className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">1</span>
           O Desafio
        </h3>
        <p className="text-slate-400 mb-6 text-sm">
           Um AFD sobre Σ={'{a,b}'} que aceita palavras que começam e terminam com a mesma letra. Observe as regras e preencha a tabela.
        </p>

        <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300">
           <p className="text-blue-400 font-bold mb-2">// MAPA DE TRANSIÇÕES (Grafo Virtual)</p>
           <p>• <span className="text-white">q0</span>: não leu nada. Se 'a' ➔ <span className="text-emerald-400">q1</span>. Se 'b' ➔ <span className="text-emerald-400">q3</span>.</p>
           <div className="h-px bg-slate-800 my-2" />
           <p>• <span className="text-white">q1</span> (Começou com A): Se 'a', termina em A (Fica no <span className="text-emerald-400">q1</span>). Se 'b', não termina em A (Vai para <span className="text-emerald-400">q2</span>).</p>
           <p>• <span className="text-white">q2</span> (Começou com A, mas último foi B): Se 'a' ➔ Volta para <span className="text-emerald-400">q1</span>. Se 'b' ➔ Fica em <span className="text-emerald-400">q2</span>.</p>
           <div className="h-px bg-slate-800 my-2" />
           <p>• <span className="text-white">q3</span> (Começou com B): Se 'b', termina em B (Fica no <span className="text-emerald-400">q3</span>). Se 'a', não termina em B (Vai para <span className="text-emerald-400">q4</span>).</p>
           <p>• <span className="text-white">q4</span> (Começou com B, mas último foi A): Se 'b' ➔ Volta para <span className="text-emerald-400">q3</span>. Se 'a' ➔ Fica em <span className="text-emerald-400">q4</span>.</p>
           
           <div className="mt-4 flex gap-4 text-[10px] uppercase font-bold">
              <span className="text-slate-500">Início: q0</span>
              <span className="text-emerald-500">Aceitação: q1, q3</span>
           </div>
        </div>

        {/* Draggable States Palette */}
        <div className="mt-8">
           <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">Estoque de Estados (Drag)</h4>
           <div className="flex flex-wrap gap-3">
              {STATES.map(s => (
                <motion.div
                  key={`palette-${s}`}
                  draggable
                  onDragStart={(e) => handleDragStart(e as any, s)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 bg-slate-800 border-2 border-slate-600 rounded-xl flex items-center justify-center font-bold text-slate-200 cursor-grab active:cursor-grabbing shadow-lg hover:border-blue-500 hover:text-blue-400 transition-colors z-10"
                >
                  {s}
                </motion.div>
              ))}
           </div>
        </div>
      </div>

      {/* RIGHT: Transition Table */}
      <div className="flex-1 bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-3xl p-6 shadow-2xl w-full relative overflow-hidden">
        {/* Validation Overlay FX */}
        <div className={`absolute inset-0 z-0 transition-colors duration-500 pointer-events-none ${validation === 'success' ? 'bg-emerald-500/10' : validation === 'error' ? 'bg-rose-500/10' : 'bg-transparent'}`} />

        <div className="relative z-10">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
               <span className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center">2</span>
               Tabela de Transição
            </h3>

            <div className="overflow-x-auto">
               <table className="w-full text-center border-collapse">
                 <thead>
                   <tr>
                     <th className="p-3 border-b-2 border-slate-600 text-slate-400">δ</th>
                     <th className="p-3 border-b-2 border-blue-500/50 text-blue-400 font-bold bg-blue-500/5 rounded-t-xl">Lê 'a'</th>
                     <th className="p-3 border-b-2 border-amber-500/50 text-amber-400 font-bold bg-amber-500/5 rounded-t-xl">Lê 'b'</th>
                   </tr>
                 </thead>
                 <tbody>
                   {STATES.map(state => (
                     <tr key={state} className="border-b border-slate-700/50 group hover:bg-slate-800/50 transition-colors">
                       <td className="p-4 font-bold text-slate-300">
                          {state === 'q0' ? <span className="text-xs text-slate-500 mr-2">▶</span> : null}
                          {state === 'q1' || state === 'q3' ? <span className="text-emerald-400">*{state}</span> : state}
                       </td>
                       {ALPHABET.map(symbol => {
                          const cellValue = table[state][symbol];
                          return (
                            <td key={`${state}-${symbol}`} className="p-2">
                               <div 
                                 onDragOver={handleDragOver}
                                 onDrop={(e) => handleDrop(e, state, symbol)}
                                 className={`w-16 h-12 mx-auto rounded-xl flex items-center justify-center border-2 transition-all 
                                   ${cellValue ? 'bg-blue-600/20 border-blue-500/50 text-blue-300 font-bold shadow-inner' : 'bg-slate-900 border-dashed border-slate-700 text-slate-600'}`
                                 }
                               >
                                  <AnimatePresence mode="popLayout">
                                     {cellValue ? (
                                        <motion.div
                                          key={cellValue}
                                          initial={{ scale: 0, opacity: 0 }}
                                          animate={{ scale: 1, opacity: 1 }}
                                          exit={{ scale: 0, opacity: 0 }}
                                          onClick={() => handleRemove(state, symbol)}
                                          className="w-full h-full flex items-center justify-center cursor-pointer hover:bg-rose-500/20 hover:text-rose-400 rounded-lg transition-colors"
                                          title="Clique para remover"
                                        >
                                           {cellValue}
                                        </motion.div>
                                     ) : (
                                        <span className="text-[10px] uppercase tracking-widest opacity-50">Solte</span>
                                     )}
                                  </AnimatePresence>
                               </div>
                            </td>
                          );
                       })}
                     </tr>
                   ))}
                 </tbody>
               </table>
            </div>

            {/* Controls */}
            <div className="mt-8 flex items-center justify-between gap-4">
                <button 
                  onClick={resetTable}
                  className="px-4 py-2 rounded-xl border border-slate-600 text-slate-400 hover:bg-slate-700 hover:text-white flex items-center gap-2 transition-colors text-sm font-bold"
                >
                  <RotateCcw className="w-4 h-4" /> Resetar
                </button>

                <button 
                  onClick={checkSolution}
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-2 transition-transform active:scale-95 font-black shadow-lg shadow-emerald-900/50"
                >
                  <Play className="w-5 h-5 fill-current" /> VALIDAR TABELA
                </button>
            </div>

            {/* Validation Feedback */}
            <AnimatePresence>
              {validation !== 'idle' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`mt-6 p-4 rounded-xl flex items-center gap-3 border ${validation === 'success' ? 'bg-emerald-900/30 border-emerald-500/50 text-emerald-300' : 'bg-rose-900/30 border-rose-500/50 text-rose-300'}`}
                >
                   {validation === 'success' ? <CheckCircle2 className="w-6 h-6 shrink-0" /> : <XCircle className="w-6 h-6 shrink-0" />}
                   <div>
                      <h4 className="font-bold">{validation === 'success' ? 'Tabela Correta!' : 'Existem Erros na Tabela'}</h4>
                      <p className="text-sm opacity-80">
                         {validation === 'success' 
                           ? 'Você mapeou perfeitamente as transições da memória (começar e terminar igual).'
                           : 'Verifique novamente para onde um estado deve ir ao ler A ou B. (Dica: Clique em um estado dropado para removê-lo).'}
                      </p>
                   </div>
                </motion.div>
              )}
            </AnimatePresence>

        </div>
      </div>

    </div>
  );
}
