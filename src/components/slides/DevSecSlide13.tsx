import { useState } from "react";
import { CheckCircle2, XCircle, HelpCircle } from "lucide-react";

export function DevSecSlide13() {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const question = {
    title: "Engenharia de Prompt",
    question: "No contexto de ferramentas como o Antigravity, qual argumento é essencial em um prompt para garantir que o código gerado seja o mais seguro possível?",
    options: [
      { text: "Pedir para a IA escrever o código o mais rápido possível.", isCorrect: false },
      { text: "Não fornecer o código anterior, para que a IA crie algo totalmente novo.", isCorrect: false },
      { text: "Escrever o prompt em letras maiúsculas para dar ênfase.", isCorrect: false },
      { text: "Fornecer o contexto do papel (ex: 'Atue como DevSec') e restrições explícitas de segurança.", isCorrect: true }
    ],
    explanation: "A opção correta é D. Este é o pilar estrutural que vimos no construtor de Prompts."
  };

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);
  };

  return (
    <div className="flex flex-col  min-min-h-[100%] flex-1 flex-1  animate-in fade-in duration-500 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between mb-8">
         <div className="flex items-center gap-3">
            <span className="bg-blue-500/20 text-blue-400 font-bold px-3 py-1 rounded-full text-xs tracking-wider border border-blue-500/30 flex items-center gap-1.5"><HelpCircle className="w-3.5 h-3.5"/> FIXAÇÃO</span>
            <span className="text-slate-400 font-semibold">{question.title}</span>
         </div>
         <div className="text-slate-500 font-bold">Questão 2 de 3</div>
      </div>

      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl p-6 md:p-10 flex-1 flex flex-col shadow-2xl relative overflow-hidden">
         
         <h3 className="text-3xl text-slate-100 font-bold mb-10 leading-relaxed relative z-10">
            {question.question}
         </h3>

         <div className="space-y-4 flex-1 relative z-10">
            {question.options.map((option, idx) => {
               let buttonClass = "bg-slate-800/80 border-slate-700 hover:bg-slate-700/80 text-slate-300";
               let Icon = null;

               if (isAnswered) {
                  if (option.isCorrect) {
                     buttonClass = "bg-emerald-950/60 border-emerald-500 focus:ring-emerald-500 z-10 text-emerald-100 shadow-[0_0_30px_rgba(16,185,129,0.2)] scale-[1.02]";
                     Icon = <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />;
                  } else if (idx === selectedAnswer) {
                     buttonClass = "bg-rose-950/40 border-rose-500 z-10 text-rose-200 opacity-80";
                     Icon = <XCircle className="w-8 h-8 text-rose-500 shrink-0" />;
                  } else {
                     buttonClass = "bg-slate-900 border-slate-800 opacity-30";
                  }
               }

               return (
                 <button
                   key={idx}
                   disabled={isAnswered}
                   onClick={() => handleSelectOption(idx)}
                   className={`w-full text-left p-5 md:p-6 rounded-2xl border-2 transition-all duration-500 flex items-center justify-between gap-4 ${buttonClass}`}
                 >
                    <span className="font-medium text-xl leading-snug">{option.text}</span>
                    {Icon}
                 </button>
               );
            })}
         </div>

         {isAnswered && (
            <div className="mt-8 animate-in slide-in-from-bottom-8 duration-500 relative z-10">
               <div className={`p-6 rounded-2xl border ${selectedAnswer !== null && question.options[selectedAnswer].isCorrect ? 'bg-emerald-900/30 border-emerald-500/50 text-emerald-200' : 'bg-rose-900/30 border-rose-500/50 text-rose-200'}`}>
                  <strong className="text-xl block mb-2">Gabarito: Alternativa D</strong> 
                  <span className="text-lg opacity-90">{question.explanation} Definir o <strong className="text-amber-400">Papel</strong> e engessar a IA com <strong className="text-rose-400">Restrições de Segurança</strong> é a única forma de evitar execuções cegas que abrem portas para vulnerabilidades Críticas.</span>
               </div>
            </div>
         )}
      </div>
    </div>
  );
}
