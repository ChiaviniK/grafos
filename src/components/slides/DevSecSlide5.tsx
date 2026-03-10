import { useState } from "react";
import { CheckCircle2, XCircle, ChevronRight, HelpCircle, Trophy } from "lucide-react";

const QUIZ_QUESTIONS = [
  {
    id: 1,
    title: "IA e Segurança (DevSecOps)",
    question: "Ao utilizar uma IA para gerar a interface web de um scanner, o desenvolvedor nota que a IA sugeriu o uso de uma biblioteca desconhecida. Qual deve ser a conduta correta conforme as boas práticas de DevSecOps?",
    options: [
      { text: "Confiar na sugestão da IA, pois ela tem acesso a uma base maior que a humana.", isCorrect: false },
      { text: "Pesquisar a reputação da biblioteca, verificar CVEs e analisar o código antes de implementar.", isCorrect: true },
      { text: "Rejeitar qualquer código vindo de IA, pois agências de segurança proíbem.", isCorrect: false },
      { text: "Usar a biblioteca apenas se ela for escrita em Python.", isCorrect: false }
    ],
    explanation: "A opção correta é B. O desenvolvedor é quem valida a segurança do código (Human-in-the-loop)."
  },
  {
    id: 2,
    title: "Engenharia de Prompt",
    question: "No contexto de ferramentas como o Antigravity, qual argumento é essencial em um prompt para tentar garantir que o código gerado seja o mais seguro possível?",
    options: [
      { text: "Pedir para a IA escrever o código o mais rápido possível.", isCorrect: false },
      { text: "Não fornecer o código anterior, para que a IA crie algo totalmente novo.", isCorrect: false },
      { text: "Fornecer o contexto do papel (ex: 'Atue como DevSec') e restrições explícitas de segurança.", isCorrect: true },
      { text: "Escrever o prompt em letras maiúsculas para dar ênfase.", isCorrect: false }
    ],
    explanation: "A opção correta é C. Contexto e restrições guiam a IA a evitar vulnerabilidades comuns."
  },
  {
    id: 3,
    title: "Conceito de Agente",
    question: "O que diferencia um 'Agente Automonômo de IA' de um modelo de linguagem (LLM) comum?",
    options: [
      { text: "Não há diferença, são apenas nomes comerciais diferentes.", isCorrect: false },
      { text: "O Agente só fala sobre cibersegurança, enquanto a LLM fala sobre tudo.", isCorrect: false },
      { text: "O Agente é mais rápido e confiável para responder.", isCorrect: false },
      { text: "O Agente consegue interagir com o ambiente (ler/escrever, rodar scripts) e tem ciclo de raciocínio lógico.", isCorrect: true }
    ],
    explanation: "A opção correta é D. Agentes possuem autonomia de tomar ações usando Tools."
  }
];

export function DevSecSlide5() {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const question = QUIZ_QUESTIONS[currentQuestionIdx];
  const isFinished = currentQuestionIdx >= QUIZ_QUESTIONS.length;

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);
    
    if (question.options[index].isCorrect) {
       setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCurrentQuestionIdx(idx => idx + 1);
  };

  if (isFinished) {
     return (
        <div className="flex flex-col items-center justify-center h-full animate-in zoom-in duration-500">
           <div className="w-32 h-32 rounded-full bg-emerald-500/20 flex items-center justify-center border-4 border-emerald-500/40 shadow-[0_0_50px_rgba(16,185,129,0.3)] mb-8">
               <Trophy className="w-16 h-16 text-emerald-400" />
           </div>
           <h2 className="text-4xl font-black mb-4">Módulo Concluído!</h2>
           <p className="text-2xl text-slate-300 mb-8">Você acertou <strong className="text-emerald-400">{score}</strong> de {QUIZ_QUESTIONS.length} questões.</p>
           
           <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 text-center max-w-lg">
             <p className="text-slate-400">Excelente trabalho. Relembre sempre: a inteligência artificial acelera o desenvolvimento, mas a validação humana é a base da Segurança da Informação!</p>
           </div>
        </div>
     );
  }

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-300 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between mb-8">
         <div className="flex items-center gap-3">
            <span className="bg-blue-500/20 text-blue-400 font-bold px-3 py-1 rounded-full text-xs tracking-wider border border-blue-500/30 flex items-center gap-1.5"><HelpCircle className="w-3.5 h-3.5"/> FIXAÇÃO</span>
            <span className="text-slate-400 font-semibold">{question.title}</span>
         </div>
         <div className="text-slate-500 font-bold">
            Questão {currentQuestionIdx + 1}/{QUIZ_QUESTIONS.length}
         </div>
      </div>

      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl p-6 md:p-8 flex-1 flex flex-col shadow-xl">
         
         <h3 className="text-2xl text-slate-100 font-bold mb-8 leading-relaxed">
            {question.question}
         </h3>

         <div className="space-y-4 flex-1">
            {question.options.map((option, idx) => {
               
               let buttonClass = "bg-slate-800/80 border-slate-700 hover:bg-slate-700/80 text-slate-300";
               let Icon = null;

               if (isAnswered) {
                  if (option.isCorrect) {
                     buttonClass = "bg-emerald-950/40 border-emerald-500 focus:ring-emerald-500 z-10 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.2)]";
                     Icon = <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />;
                  } else if (idx === selectedAnswer) {
                     buttonClass = "bg-rose-950/40 border-rose-500 z-10 text-rose-200 opacity-80";
                     Icon = <XCircle className="w-6 h-6 text-rose-500 shrink-0" />;
                  } else {
                     buttonClass = "bg-slate-900 border-slate-800 opacity-40";
                  }
               }

               return (
                 <button
                   key={idx}
                   disabled={isAnswered}
                   onClick={() => handleSelectOption(idx)}
                   className={`w-full text-left p-4 md:p-5 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between gap-4 ${buttonClass}`}
                 >
                    <span className="font-medium text-lg leading-snug">{option.text}</span>
                    {Icon}
                 </button>
               );
            })}
         </div>

         {isAnswered && (
            <div className="mt-8 animate-in slide-in-from-bottom-4 duration-300">
               <div className={`p-4 rounded-xl border mb-6 ${selectedAnswer !== null && question.options[selectedAnswer].isCorrect ? 'bg-emerald-950/30 border-emerald-900/50 text-emerald-200' : 'bg-rose-950/30 border-rose-900/50 text-rose-200'}`}>
                  <strong>Explicação:</strong> {question.explanation}
               </div>
               <button 
                  onClick={nextQuestion}
                  className="bg-blue-600 text-white font-bold py-3.5 px-8 rounded-xl flex items-center gap-2 hover:bg-blue-500 transition-colors mx-auto"
               >
                  Continuar <ChevronRight className="w-5 h-5" />
               </button>
            </div>
         )}

      </div>
    </div>
  );
}
