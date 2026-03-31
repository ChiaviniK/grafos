import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bug, Search, CheckCircle2, ShieldAlert, Heart } from 'lucide-react';

interface CodeLine {
  id: number;
  text: string;
  isBug: boolean;
}

const SNIPPET: CodeLine[] = [
  { id: 1, text: "SELECT", isBug: false },
  { id: 2, text: "  customer_id,", isBug: false },
  { id: 3, text: "  COUNT(transaction_date) AS total_purchases,", isBug: false },
  { id: 4, text: "  SUM(amount) AS revenue", isBug: false },
  { id: 5, text: "FROM sales", isBug: false },
  { id: 6, text: "WHERE status = 'COMPLETED'", isBug: false },
  { id: 7, text: "GROUP BY customer_id", isBug: false },
  { id: 8, text: "ODRER BY revenue DESC;", isBug: true } // intentional typo: ODRER instead of ORDER
];

export function BugHunt() {
  const [hp, setHp] = useState(3);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [clickedLines, setClickedLines] = useState<number[]>([]);

  const handleLineClick = (line: CodeLine) => {
    if (gameState !== 'playing' || clickedLines.includes(line.id)) return;

    setClickedLines(prev => [...prev, line.id]);

    if (line.isBug) {
      setGameState('won');
    } else {
      const newHp = hp - 1;
      setHp(newHp);
      if (newHp <= 0) {
        setGameState('lost');
      }
    }
  };

  const resetGame = () => {
    setHp(3);
    setGameState('playing');
    setClickedLines([]);
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 font-mono relative">
      <div className="text-center mb-4">
         <h4 className="text-sky-400 font-bold flex items-center justify-center gap-2 text-xl">
            <Search className="w-6 h-6" /> The Bug Hunt (Orientação a Detalhe)
         </h4>
         <p className="text-slate-400 text-sm max-w-xl">
            O Painel Financeiro Diretor travou durante a reunião. O log de erro indica apenas "Syntax Error". Encontre a <strong className="text-rose-400">única linha com erro de digitação</strong> antes que suas tentativas se esgotem.
         </p>
      </div>

      <div className="w-full max-w-2xl bg-slate-900 border-2 border-slate-700/50 rounded-2xl p-6 shadow-2xl relative overflow-hidden transition-colors duration-1000">
          
          {/* Header Dashboard */}
          <div className="flex justify-between items-center mb-6 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center gap-4">
                  <Bug className="w-8 h-8 text-rose-500 animate-pulse" />
                  <div>
                      <div className="text-[10px] text-slate-500 font-black tracking-widest uppercase">Sistema Analítico</div>
                      <div className="text-sm font-bold text-slate-300">Consulta SQL: finance_monthly_v2.sql</div>
                  </div>
              </div>
              <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                  <div className="flex gap-1">
                      {[...Array(3)].map((_, i) => (
                          <Heart key={i} className={`w-5 h-5 transition-all ${i < hp ? 'text-rose-500 fill-rose-500' : 'text-slate-700 fill-slate-800'}`} />
                      ))}
                  </div>
              </div>
          </div>

          {/* IDE Area */}
          <div className="bg-[#0d1117] rounded-xl border border-slate-800 p-4 overflow-hidden shadow-inner font-mono text-sm sm:text-base relative">
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-slate-900/50 border-r border-slate-800 flex flex-col items-center py-4 text-slate-600 select-none">
                 {SNIPPET.map(line => (
                     <div key={line.id} className="h-8 flex items-center">{line.id}</div>
                 ))}
              </div>

              <div className="pl-14 py-2">
                 {SNIPPET.map(line => {
                     const isClicked = clickedLines.includes(line.id);
                     const isWrongClick = isClicked && !line.isBug;
                     const isRightClick = isClicked && line.isBug;

                     return (
                         <div 
                            key={line.id}
                            onClick={() => handleLineClick(line)}
                            className={`h-8 flex items-center px-4 rounded transition-colors group cursor-crosshair
                                ${isWrongClick ? 'bg-rose-500/20' : ''}
                                ${isRightClick ? 'bg-emerald-500/20' : ''}
                                ${!isClicked && gameState === 'playing' ? 'hover:bg-sky-500/10' : ''}
                            `}
                         >
                             <span className={`transition-colors whitespace-pre
                                 ${isWrongClick ? 'text-rose-400 line-through opacity-50' : ''}
                                 ${isRightClick ? 'text-emerald-400 font-bold' : 'text-slate-300'}
                             `}>
                                 {line.text}
                             </span>

                             {Math.random() > 0.95 && gameState === 'playing' && !isClicked && (
                                <span className="absolute right-4 text-rose-500 opacity-20 group-hover:opacity-100 transition-opacity pointer-events-none">
                                    <Bug className="w-4 h-4" />
                                </span>
                             )}
                         </div>
                     );
                 })}
              </div>
              
              <AnimatePresence>
                  {gameState !== 'playing' && (
                      <motion.div 
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-center p-6"
                      >
                          {gameState === 'won' ? (
                              <div className="space-y-4 max-w-md bg-emerald-950/40 p-6 border border-emerald-500/30 rounded-2xl shadow-2xl">
                                  <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
                                  <h3 className="text-2xl font-black text-white">Syntax Error Neutralizado</h3>
                                  <p className="text-slate-300 text-sm">
                                      Você encontrou <strong className="text-emerald-400">ODRER BY</strong>. Orientação a Detalhes é a capacidade de re-ler milhares de linhas e encontrar a letra que está roubando milhões da empresa. O Painel está no ar!
                                  </p>
                              </div>
                          ) : (
                              <div className="space-y-4 max-w-md bg-rose-950/40 p-6 border border-rose-500/30 rounded-2xl shadow-2xl">
                                  <ShieldAlert className="w-16 h-16 text-rose-400 mx-auto" />
                                  <h3 className="text-2xl font-black text-white">Sistema Crashado</h3>
                                  <p className="text-slate-300 text-sm">
                                      Você atirou no escuro, fez alterações sem saber onde estava o erro e derrubou o banco de dados principal de Vendas.
                                  </p>
                                  <button onClick={resetGame} className="mt-4 px-6 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg font-bold transition-all shadow-lg active:scale-95">
                                      Restaurar Backup e Tentar Novamente
                                  </button>
                              </div>
                          )}
                      </motion.div>
                  )}
              </AnimatePresence>
          </div>
      </div>
    </div>
  );
}
