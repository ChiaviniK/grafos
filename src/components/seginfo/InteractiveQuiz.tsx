import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ShieldX, HelpCircle, ArrowRight } from 'lucide-react';

interface InteractiveQuizProps {
  // Now returns an array of scores, one for each of the 5 questions
  onComplete: (scores: number[]) => void;
}

const QUESTIONS = [
  {
    id: 1,
    question: "O que caracteriza a Engenharia Social em um ataque cibernético?",
    options: [
      "Quebrar senhas usando supercomputadores para explodir hashes.",
      "Manipular psicologicamente as pessoas para que entreguem informações confidenciais.",
      "Interceptar pacotes de rede usando a técnica de Man-In-The-Middle.",
      "Injetar comandos maliciosos em um banco de dados desprotegido."
    ],
    correctOption: 1
  },
  {
    id: 2,
    question: "Qual o principal propósito de uma função de HASH?",
    options: [
      "Permitir que os dados voltem ao formato original se a pessoa tiver a chave correta.",
      "Esconder arquivos maliciosos dentro de imagens e PDFs.",
      "Garantir a integridade do dado iterando-o em um valor único impossível de reverter.",
      "Aumentar a velocidade da conexão mascarando o cabeçalho IP."
    ],
    correctOption: 2
  },
  {
    id: 3,
    question: "Na Criptografia Clássica, qual vulnerabilidade de cifras de substituição (como César) é fatal?",
    options: [
      "O uso do relógio atômico para sincronizar os hashes.",
      "A falta de um algoritmo de curva elíptica para gerar os números aleatórios.",
      "A facilidade do algoritmo ser rodado de trás para frente no servidor de DNS.",
      "A ocorrência das letras no texto cifrado reflete os padrões do idioma humano (Análise de Frequência)."
    ],
    correctOption: 3
  },
  {
    id: 4,
    question: "Qual técnica neutraliza injeções de SQL (SQLi) garantindo que a entrada não seja executada como comando?",
    options: [
      "Filtrar manualmente todas as aspas simples e duplas do input.",
      "Usar apenas bancos de dados NoSQL, pois não sofrem injeção.",
      "Utilizar Prepared Statements (Parâmetros), separando código de dados.",
      "Criptografar o banco de dados inteiro com AES-256."
    ],
    correctOption: 2
  },
  {
    id: 5,
    question: "Por que o Bypass de Autenticação com \"' OR '1'='1\" funciona?",
    options: [
      "Ele força o servidor web a reiniciar, pulando a verificação de senha.",
      "O código cria uma Tautologia matemática, tornando a condicional WHERE sempre verdadeira.",
      "Ele quebra o algoritmo de Hashing permitindo ler a senha em texto claro.",
      "O firewall de borda interpreta o comando como um ping seguro e aprova o login livre."
    ],
    correctOption: 1
  }
];

export function InteractiveQuiz({ onComplete }: InteractiveQuizProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [questionScores, setQuestionScores] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);

  const currentQ = QUESTIONS[currentIdx];

  const handleSelect = (idx: number) => {
    if (isRevealed) return;
    setSelectedOption(idx);
  };

  const handleConfirm = () => {
    if (selectedOption === null) return;
    
    setIsRevealed(true);
    const scoreAchieved = selectedOption === currentQ.correctOption ? 10 : 0;
    const newScoresArray = [...questionScores, scoreAchieved];
    setQuestionScores(newScoresArray);
    
    // Real-time synchronization
    onComplete(newScoresArray);

    setTimeout(() => {
      if (currentIdx < QUESTIONS.length - 1) {
        setCurrentIdx(prev => prev + 1);
        setSelectedOption(null);
        setIsRevealed(false);
      } else {
        setFinished(true);
        // onComplete is already called, but we can do a final validation if needed
      }
    }, 2000);
  };

  if (finished) {
    const totalScore = questionScores.reduce((a, b) => a + b, 0);
    return (
      <div className="w-full max-w-2xl mx-auto bg-indigo-500/10 border border-indigo-500/30 rounded-[2.5rem] p-10 text-center shadow-2xl relative overflow-hidden">
         <CheckCircle2 className="w-20 h-20 text-indigo-400 mx-auto mb-6" />
         <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-2">Quiz Concluído!</h3>
         <p className="text-slate-400">Suas respostas (5 questões) foram gravadas na sessão.</p>
         <div className="mt-8 text-indigo-400 font-bold bg-indigo-500/20 px-6 py-3 rounded-xl inline-block border border-indigo-500/30">
           Pontuação Adquirida: {totalScore} de 50 pontos
         </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
         {/* Headers */}
         <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3 text-indigo-400 font-bold tracking-widest text-sm uppercase">
               <HelpCircle className="w-5 h-5" /> Revisão {currentIdx + 1}/5
            </div>
            <div className="flex gap-2">
               {QUESTIONS.map((q, i) => (
                 <div key={q.id} className={`w-3 h-3 rounded-full transition-colors ${
                   i === currentIdx ? 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]' 
                   : i < currentIdx ? 'bg-indigo-900' : 'bg-slate-800'
                 }`} />
               ))}
            </div>
         </div>

         {/* Question Area */}
         <h2 className="text-2xl text-white font-bold leading-tight mb-8">
            <span className="text-indigo-500 mr-2">Q{currentIdx + 1}.</span>
            {currentQ.question}
         </h2>

         {/* Options */}
         <div className="space-y-4">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctOption;
              const showSuccess = isRevealed && isCorrect;
              const showFail = isRevealed && isSelected && !isCorrect;

              let style = "bg-slate-950 border-slate-800 hover:border-slate-600 text-slate-300";
              if (isSelected) style = "bg-indigo-600/20 border-indigo-500 text-indigo-100";
              if (showSuccess) style = "bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] z-10 scale-[1.02] transition-transform";
              if (showFail) style = "bg-rose-500/20 border-rose-500 text-rose-300 opacity-60";

              return (
                <button
                  key={idx}
                  disabled={isRevealed}
                  onClick={() => handleSelect(idx)}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all block relative ${style}`}
                >
                  <div className="flex items-center gap-4">
                     <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                       isSelected ? 'border-indigo-400 bg-indigo-500/30' : 'border-slate-700'
                     }`}>
                       {isSelected && <div className="w-2.5 h-2.5 bg-indigo-400 rounded-full" />}
                     </div>
                     <span className="font-semibold text-sm leading-relaxed">{opt}</span>
                  </div>
                  
                  <AnimatePresence>
                    {showSuccess && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-4 top-1/2 -translate-y-1/2">
                         <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                      </motion.div>
                    )}
                    {showFail && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-4 top-1/2 -translate-y-1/2">
                         <ShieldX className="w-6 h-6 text-rose-400" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              )
            })}
         </div>

         {/* Actions */}
         <div className="mt-8 pt-6 border-t border-slate-800 flex justify-end">
            <button
               onClick={handleConfirm}
               disabled={selectedOption === null || isRevealed}
               className="bg-indigo-600 text-white font-bold px-8 py-4 rounded-xl flex items-center gap-3 hover:bg-indigo-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed group shadow-[0_0_20px_rgba(99,102,241,0.3)]"
            >
               {isRevealed ? 'AVALIANDO...' : 'CONFIRMAR RESPOSTA'}
               <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
         </div>

      </div>
    </div>
  );
}
