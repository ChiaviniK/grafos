import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, XCircle, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';

interface Statement {
  id: number;
  text: string;
  isGrowth: boolean;
  explanation: string;
}

const STATEMENTS: Statement[] = [
  {
    id: 1,
    text: '"Meu script SQL deu erro 5 vezes seguidas. Claramente eu não nasci para exatas."',
    isGrowth: false,
    explanation: 'Mentalidade Fixa: Você está atribuindo a dificuldade a um "dom" não possuído, em vez de ver o erro como degrau de aprendizado.'
  },
  {
    id: 2,
    text: '"O erro de compilação me mostra exatamente em qual linha eu preciso ler a documentação."',
    isGrowth: true,
    explanation: 'Mentalidade de Crescimento: O erro é visto como uma bússola direcional e não como um muro intransponível.'
  },
  {
    id: 3,
    text: '"Estatística é muito difícil. Pessoas Inteligentes pegam isso de primeira."',
    isGrowth: false,
    explanation: 'Mentalidade Fixa: O aprendizado de ferramentas complexas exige tempo e esforço. "Inteligência" é um músculo treinável, não um estado fixo.'
  },
  {
    id: 4,
    text: '"O Diretor rejeitou meu painel (Dashboard). Vou perguntar qual métrica ele sentiu falta para iterarmos a versão 2."',
    isGrowth: true,
    explanation: 'Mentalidade de Crescimento: O feedback negativo é interpretado como coleta de requisitos para evolução, sem levar para o lado pessoal.'
  }
];

export function MindsetSorter() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const statement = STATEMENTS[currentIndex];

  const handleSwipe = (choiceIsGrowth: boolean) => {
    if (completed || showFeedback) return;
    
    // Animate exit path
    setDirection(choiceIsGrowth ? 1 : -1);
    
    const correct = choiceIsGrowth === statement.isGrowth;
    setIsCorrect(correct);
    if (correct) setScore(s => s + 1);
    
    setShowFeedback(true);
  };

  const handleNext = () => {
    setShowFeedback(false);
    if (currentIndex < STATEMENTS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCompleted(true);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 font-mono relative">
      <div className="text-center mb-4">
         <h4 className="text-fuchsia-400 font-bold flex items-center justify-center gap-2 text-xl">
            <BrainCircuit className="w-6 h-6" /> A Bússola Cognitiva
         </h4>
         <p className="text-slate-400 text-sm max-w-xl">
            Leia a afirmação de um Analista Júnior e decida se essa é uma postura de <strong>Mindset Fixo</strong> (Esquerda) ou <strong>Growth Mindset</strong> (Direita).
         </p>
      </div>

      <div className="w-full max-w-2xl bg-slate-900 border-2 border-slate-700/50 rounded-3xl p-6 shadow-2xl relative min-h-[400px] flex flex-col items-center justify-center overflow-hidden">
         
         {!completed ? (
            <>
               <div className="absolute top-4 left-0 w-full px-6 flex justify-between items-center text-xs font-bold tracking-widest text-slate-500">
                   <div className="text-rose-400 flex items-center gap-1"><ChevronLeft className="w-4 h-4"/> FIXO</div>
                   <div>{currentIndex + 1} / {STATEMENTS.length}</div>
                   <div className="text-emerald-400 flex items-center gap-1">CRESCIMENTO <ChevronRight className="w-4 h-4"/></div>
               </div>

               <AnimatePresence mode="wait">
                  {!showFeedback ? (
                     <motion.div
                       key={`card-${statement.id}`}
                       initial={{ scale: 0.8, opacity: 0, y: 50 }}
                       animate={{ scale: 1, opacity: 1, y: 0 }}
                       exit={{ x: direction * 200, opacity: 0, rotate: direction * 10 }}
                       className="w-full max-w-md bg-slate-800 border border-slate-600 rounded-2xl p-8 shadow-xl relative z-10 cursor-grab active:cursor-grabbing hover:border-slate-500 transition-colors"
                     >
                        <p className="text-xl md:text-2xl font-bold text-white text-center leading-relaxed italic">
                            {statement.text}
                        </p>
                     </motion.div>
                  ) : (
                     <motion.div
                       key={`feedback-${statement.id}`}
                       initial={{ scale: 0.8, opacity: 0 }}
                       animate={{ scale: 1, opacity: 1 }}
                       className="w-full max-w-md bg-slate-800 border-2 rounded-2xl p-6 relative z-10 flex flex-col items-center text-center"
                       style={{ borderColor: isCorrect ? '#10b981' : '#f43f5e' }}
                     >
                        <div className={`p-4 rounded-full mb-4 ${isCorrect ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                           {isCorrect ? <CheckCircle2 className="w-12 h-12" /> : <XCircle className="w-12 h-12" />}
                        </div>
                        <h3 className={`text-2xl font-black mb-2 ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                           {isCorrect ? 'Visão Perfeita!' : 'Classificação Incorreta'}
                        </h3>
                        <p className="text-slate-300 mb-6 text-sm">{statement.explanation}</p>
                        
                        <button 
                            onClick={handleNext}
                            className="w-full py-3 bg-slate-700 hover:bg-slate-600 border border-slate-500 rounded-xl text-white font-bold transition-all"
                        >
                            Próxima Fita
                        </button>
                     </motion.div>
                  )}
               </AnimatePresence>

               {/* Manual Buttons For Desktop (if they don't drag) */}
               {!showFeedback && (
                   <div className="absolute bottom-6 w-full flex justify-center gap-8 px-8">
                       <button onClick={() => handleSwipe(false)} className="px-6 py-3 rounded-xl border-2 border-rose-500/50 text-rose-400 font-black hover:bg-rose-500/20 transition-colors flex items-center gap-2">
                           <XCircle className="w-5 h-5"/> FIXO
                       </button>
                       <button onClick={() => handleSwipe(true)} className="px-6 py-3 rounded-xl border-2 border-emerald-500/50 text-emerald-400 font-black hover:bg-emerald-500/20 transition-colors flex items-center gap-2">
                           GROWTH <CheckCircle2 className="w-5 h-5"/>
                       </button>
                   </div>
               )}
            </>
         ) : (
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }} 
               animate={{ opacity: 1, scale: 1 }} 
               className="text-center"
            >
               <div className="w-24 h-24 bg-fuchsia-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-fuchsia-500/50">
                  <BrainCircuit className="w-12 h-12 text-fuchsia-400" />
               </div>
               <h3 className="text-4xl font-black text-white mb-2">Treinamento Concluído</h3>
               <p className="text-fuchsia-400 font-black tracking-widest mb-6">TAXA DE SUCESSO: <span className="text-white">{score}/{STATEMENTS.length}</span></p>
               <p className="text-slate-400 max-w-sm text-sm mx-auto">
                  A ferramenta mais poderosa no arsenal de um Cientista de Dados não é o Python. É a capacidade de ser espancado pela incerteza e voltar para a tela preta no dia seguinte.
               </p>
            </motion.div>
         )}
      </div>
    </div>
  );
}
