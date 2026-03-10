import { useState } from "react";
import { CheckCircle2, XCircle, HelpCircle, Trophy } from "lucide-react";

export function DevSecSlide14() {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const question = {
    title: "Agentes Autônomos",
    question: "Qual característica diferencia de forma prática um Agente Autônomo (como o Google Antigravity) de um Chatbot LLM convencional (como o ChatGPT base)?",
    options: [
      { text: "Agentes usam apenas textos mais curtos e não podem codar.", isCorrect: false },
      { text: "Chatbots LLM normais têm acesso nativo ao terminal bash e rodam comandos Python sozinhos.", isCorrect: false },
      { text: "Agentes Autônomos interpretam intenções, acessam ferramentas (Tools) e executam comandos diretamente no Sistema Operacional para testar a aplicação.", isCorrect: true },
      { text: "Agentes Autônomos são treinados apenas para gerar imagens e vídeos, nunca códigos.", isCorrect: false }
    ],
    explanation: "A opção C é a correta. Esse é o conceito de Loop ReAct (Reasoning and Acting)."
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
         <div className="text-slate-500 font-bold flex items-center gap-2">Questão 3 de 3 <Trophy className="w-5 h-5 text-amber-500" /></div>
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
                  <strong className="text-xl block mb-2 text-amber-500">Gabarito: Alternativa C</strong> 
                  <span className="text-lg opacity-90">{question.explanation} Por terem poder de ler, reescrever e executar arquivos sem intervenção, o seu foco como engenheiro não é focar na sintaxe pura, mas sim em <strong className="text-white">Arquitertar e Auditar</strong> o agente.</span>
               </div>
            </div>
         )}

         {/* Extra celebration if correct */}
         {isAnswered && selectedAnswer !== null && question.options[selectedAnswer].isCorrect && (
            <div className="absolute inset-0 bg-emerald-900/10 pointer-events-none flex items-center justify-center animate-in fade-in duration-1000">
               <Trophy className="w-[400px] h-[400px] text-amber-500/10" />
            </div>
         )}
      </div>
    </div>
  );
}
