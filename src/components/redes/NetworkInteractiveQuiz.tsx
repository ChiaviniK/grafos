import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ShieldX, HelpCircle, ArrowRight } from 'lucide-react';

interface NetworkInteractiveQuizProps {
  onComplete: (scores: number[]) => void;
}

const QUESTIONS = [
  {
    id: 1,
    question: "O que é uma VLAN (Virtual Local Area Network)?",
    options: [
      "Uma rede mundial de computadores criptografada (VPN).",
      "Uma divisão lógica de um switch físico criando múltiplos domínios de broadcast independentes.",
      "Um algoritmo de roteamento que encontra o menor caminho BGP.",
      "Uma rede sem fio baseada no padrão 802.11ax."
    ],
    correctOption: 1
  },
  {
    id: 2,
    question: "Qual protocolo é responsável por inserir o tagueamento de VLAN (VLAN Tag) no cabeçalho Ethernet?",
    options: [
      "IEEE 802.1Q",
      "IPv4 / IPv6",
      "Spanning Tree Protocol (STP)",
      "CSMA/CD"
    ],
    correctOption: 0
  },
  {
    id: 3,
    question: "O que acontece se ligarmos as duas portas Vendas (VLAN 10) e RH (VLAN 20) no mesmo switch sem um roteador?",
    options: [
      "Os pacotes viajam normalmente pois estão no mesmo switch físico.",
      "As VLANs causam colisão e a porta do switch desarma.",
      "O tráfego de broadcast do RH atinge Vendas, mas unicast não.",
      "Eles não conseguem se comunicar, pois estão em domínios lógicos diferentes (Layer 2 isolado)."
    ],
    correctOption: 3
  },
  {
    id: 4,
    question: "Qual o benefício de segurança primário ao usar VLANs?",
    options: [
      "Filtra ataques de Injeção de SQL nas portas 80 e 443.",
      "Aumenta o throughput (velocidade) criptografando dados com AES-256.",
      "Estreita o domínio de broadcast, impedindo que um malware/sniff numa subrede contamine o resto da empresa nativamente.",
      "Evita que cabos coaxiais precisem ser trocados fisicamente."
    ],
    correctOption: 2
  },
  {
    id: 5,
    question: "Em uma topologia Trunk (Tronco), como o switch identifica a qual VLAN o pacote pertence ao enviá-lo para outro switch?",
    options: [
      "Lendo o endereço de IP de Destino no Cabeçalho de Camada 3.",
      "Usando o endereço MAC de origem no ARP Table.",
      "Através da TAG de 4 bytes inserida no meio do cabeçalho Ethernet daquele frame.",
      "Enviando em Broadcast para todas as VLANs e esperando a VLAN correta responder DACK."
    ],
    correctOption: 2
  }
];

export function NetworkInteractiveQuiz({ onComplete }: NetworkInteractiveQuizProps) {
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

    // Call instantly so skip-to-end users don't get 0s for answered ones
    onComplete(newScoresArray);

    setTimeout(() => {
      if (currentIdx < QUESTIONS.length - 1) {
        setCurrentIdx(prev => prev + 1);
        setSelectedOption(null);
        setIsRevealed(false);
      } else {
        setFinished(true);
      }
    }, 2000);
  };

  if (finished) {
    const totalScore = questionScores.reduce((a, b) => a + b, 0);
    return (
      <div className="w-full max-w-2xl mx-auto bg-blue-500/10 border border-blue-500/30 rounded-[2.5rem] p-10 text-center shadow-2xl relative overflow-hidden">
         <CheckCircle2 className="w-20 h-20 text-blue-400 mx-auto mb-6" />
         <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-2">Quiz Concluído!</h3>
         <p className="text-slate-400">Suas respostas de Network Layer 2 foram computadas.</p>
         <div className="mt-8 text-blue-400 font-bold bg-blue-500/20 px-6 py-3 rounded-xl inline-block border border-blue-500/30">
           Pontuação Adquirida: {totalScore} de 50 pontos
         </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
         
         <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3 text-blue-400 font-bold tracking-widest text-sm uppercase">
               <HelpCircle className="w-5 h-5" /> Fundamentos {currentIdx + 1}/5
            </div>
            <div className="flex gap-2">
               {QUESTIONS.map((q, i) => (
                 <div key={q.id} className={`w-3 h-3 rounded-full transition-colors ${
                   i === currentIdx ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' 
                   : i < currentIdx ? 'bg-blue-900' : 'bg-slate-800'
                 }`} />
               ))}
            </div>
         </div>

         <h2 className="text-2xl text-white font-bold leading-tight mb-8">
            <span className="text-blue-500 mr-2">Q{currentIdx + 1}.</span>
            {currentQ.question}
         </h2>

         <div className="space-y-4">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctOption;
              const showSuccess = isRevealed && isCorrect;
              const showFail = isRevealed && isSelected && !isCorrect;

              let style = "bg-slate-950 border-slate-800 hover:border-slate-600 text-slate-300";
              if (isSelected) style = "bg-blue-600/20 border-blue-500 text-blue-100";
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
                       isSelected ? 'border-blue-400 bg-blue-500/30' : 'border-slate-700'
                     }`}>
                       {isSelected && <div className="w-2.5 h-2.5 bg-blue-400 rounded-full" />}
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

         <div className="mt-8 pt-6 border-t border-slate-800 flex justify-end">
            <button
               onClick={handleConfirm}
               disabled={selectedOption === null || isRevealed}
               className="bg-blue-600 text-white font-bold px-8 py-4 rounded-xl flex items-center gap-3 hover:bg-blue-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed group shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            >
               {isRevealed ? 'AVALIANDO...' : 'CONFIRMAR RESPOSTA'}
               <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
         </div>

      </div>
    </div>
  );
}
