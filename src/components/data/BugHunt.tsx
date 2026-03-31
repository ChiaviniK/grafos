import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bug, Search, CheckCircle2, ShieldAlert, Heart } from 'lucide-react';

interface CodeLine {
  id: number;
  text: string;
  isBug: boolean;
}

const SNIPPET: CodeLine[] = [
  { id: 1, text: "RELATÓRIO DE FECHAMENTO (Q3)", isBug: false },
  { id: 2, text: "----------------------------", isBug: false },
  { id: 3, text: "Receita Bruta:   R$ 500.000,00", isBug: false },
  { id: 4, text: "Impostos (10%):  R$  50.000,00", isBug: false },
  { id: 5, text: "Custos Operac:   R$ 200.000,00", isBug: false },
  { id: 6, text: "----------------------------", isBug: false },
  { id: 7, text: "CÁLCULO DO LUCRO LÍQUIDO:", isBug: false },
  { id: 8, text: "= Receita Bruta - Impostos + Custos", isBug: true }, // The bug is adding costs instead of subtracting
  { id: 9, text: " ", isBug: false },
  { id: 10, text: "LUCRO FINAL: R$ 650.000,00", isBug: false }, // Mathematically wrong result based on the bug
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
            O Diretor Financeiro está prestes a apresentar este relatório de lucros para os investidores, mas os números não batem. Encontre a <strong className="text-rose-400">linha exata com o erro de lógica matemática</strong> antes que ele suba no palco.
         </p>
      </div>

      <div className="w-full max-w-2xl bg-slate-900 border-2 border-slate-700/50 rounded-2xl p-6 shadow-2xl relative overflow-hidden transition-colors duration-1000">
          
          {/* Header Dashboard */}
          <div className="flex justify-between items-center mb-6 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center gap-4">
                  <Bug className="w-8 h-8 text-rose-500 animate-pulse" />
                  <div>
                      <div className="text-[10px] text-slate-500 font-black tracking-widest uppercase">Sistema de Relatórios</div>
                      <div className="text-sm font-bold text-slate-300">Documento: fechamento_q3_draft.txt</div>
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
                                  <h3 className="text-2xl font-black text-white">Erro Lógico Abortado</h3>
                                  <p className="text-slate-300 text-sm">
                                      Você encontrou o sinal de <strong className="text-emerald-400">+ Custos</strong>. Uma Orientação aos Detalhes aguçada impede que a empresa reporte R$ 650.000 de lucro quando, na verdade, teve apenas R$ 250.000. Você salvou os investidores!
                                  </p>
                              </div>
                          ) : (
                              <div className="space-y-4 max-w-md bg-rose-950/40 p-6 border border-rose-500/30 rounded-2xl shadow-2xl">
                                  <ShieldAlert className="w-16 h-16 text-rose-400 mx-auto" />
                                  <h3 className="text-2xl font-black text-white">Relatório Publicado com Erro</h3>
                                  <p className="text-slate-300 text-sm">
                                      Você não encontrou a falha matemática. O Diretor apresentou o lucro inflado e a empresa foi processada por fraude contábil pelos acionistas...
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
