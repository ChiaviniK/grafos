import { useState } from "react";
import { MessageSquare, User, Ear, Smartphone, CheckCircle2, AlertCircle, RefreshCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Scene {
  id: number;
  situation: string;
  sender: string;
  options: {
    text: string;
    type: "assertive" | "aggressive" | "passive";
    feedback: string;
    isCorrect: boolean;
  }[];
}

const SCENES: Scene[] = [
  {
    id: 1,
    situation: "Seu colega de equipe entregou um relatório com vários erros de digitação e dados trocados. Você precisa falar com ele sobre isso.",
    sender: "Colega de Equipe",
    options: [
      {
        text: "Você não presta atenção em nada? Esse relatório está um lixo e eu tive que refazer tudo!",
        type: "aggressive",
        feedback: "A agressividade fecha portas e cria um ambiente defensivo. O problema não foi resolvido, apenas escalado.",
        isCorrect: false
      },
      {
        text: "Notei alguns pontos no relatório que podem ser melhorados para ficarem mais precisos. Podemos revisar juntos?",
        type: "assertive",
        feedback: "Excelente! Você focou no problema (os dados) e não na pessoa, oferecendo colaboração.",
        isCorrect: true
      },
      {
        text: "(Não diz nada e corrige os erros sozinho, ficando sobrecarregado e com raiva em silêncio).",
        type: "passive",
        feedback: "A passividade gera ressentimento e não ajuda o colega a aprender com o erro. Você acaba sobrecarregado.",
        isCorrect: false
      }
    ]
  },
  {
    id: 2,
    situation: "Você está em uma reunião virtual e a conexão do instrutor cai. O chat começa a ficar caótico.",
    sender: "Chat da Reunião",
    options: [
      {
        text: "Mandar um meme e começar a conversar sobre o final de semana enquanto ninguém está vendo.",
        type: "passive",
        feedback: "Isso desvia o foco e torna mais difícil retomar a aula quando a conexão voltar.",
        isCorrect: false
      },
      {
        text: "Sugerir que todos aguardem 5 minutos em silêncio ou revisem as notas da aula anterior enquanto a conexão volta.",
        type: "assertive",
        feedback: "Liderança e comunicação assertiva! Você ajudou a manter a ordem e a produtividade do grupo.",
        isCorrect: true
      },
      {
        text: "Digitar 'QUE ABSURDO! PAGAMOS POR ISSO E NÃO FUNCIONA!' repetidamente no chat.",
        type: "aggressive",
        feedback: "Problemas técnicos acontecem. Reagir com raiva não conserta o Wi-Fi de ninguém.",
        isCorrect: false
      }
    ]
  }
];

export function CommunicationSim() {
  const [currentScene, setCurrentScene] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const scene = SCENES[currentScene];

  const handleSelect = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    if (scene.options[idx].isCorrect) setScore(s => s + 1);
  };

  const next = () => {
    setSelectedOption(null);
    setCurrentScene(s => s + 1);
  };

  const reset = () => {
    setCurrentScene(0);
    setSelectedOption(null);
    setScore(0);
  };

  if (currentScene >= SCENES.length) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-12 text-center space-y-6 shadow-2xl animate-in zoom-in duration-500">
         <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-500/20">
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
         </div>
         <h3 className="text-3xl font-black text-white italic tracking-tighter">SIMULAÇÃO CONCLUÍDA</h3>
         <p className="text-slate-400">Sua pontuação de asertividade: <span className="text-emerald-400 font-bold">{score}/{SCENES.length}</span></p>
         <button onClick={reset} className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-bold flex items-center gap-2 mx-auto transition-all">
            <RefreshCcw className="w-4 h-4" /> Tentar Novamente
         </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 font-sans">
      {/* Simulation Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[450px]">
         {/* Left: Scenario info */}
         <div className="md:w-1/3 bg-slate-950 p-8 border-r border-slate-800 flex flex-col gap-6">
            <div className="px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-xl w-fit">
               <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">Cenário {scene.id}</span>
            </div>
            <div className="space-y-4">
               <div className="flex items-center gap-3 text-slate-500">
                  <User className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-widest">{scene.sender}</span>
               </div>
               <p className="text-slate-300 text-sm leading-relaxed italic">
                  "{scene.situation}"
               </p>
            </div>
            <div className="mt-auto pt-6 border-t border-slate-800">
               <div className="flex items-center gap-2 text-slate-600">
                  <Smartphone className="w-4 h-4" />
                  <span className="text-[10px] font-bold">Simulação de Diálogo Ativa</span>
               </div>
            </div>
         </div>

         {/* Right: Interaction */}
         <div className="flex-1 p-10 flex flex-col">
            <h4 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
               <MessageSquare className="w-6 h-6 text-amber-500" />
               Como você responde?
            </h4>
            
            <div className="space-y-4 flex-1">
               {scene.options.map((opt, i) => (
                 <button
                   key={i}
                   disabled={selectedOption !== null}
                   onClick={() => handleSelect(i)}
                   className={`w-full text-left p-5 rounded-[2rem] border-2 transition-all flex items-start gap-4 group
                     ${selectedOption === null 
                        ? 'bg-slate-800/40 border-slate-700 hover:border-amber-500/50 hover:bg-slate-800 scale-100' 
                        : selectedOption === i 
                           ? opt.isCorrect ? 'bg-emerald-500/10 border-emerald-500 scale-[1.02]' : 'bg-rose-500/10 border-rose-500 opacity-80'
                           : 'bg-slate-900 border-slate-800 opacity-20 scale-95'
                     }`}
                 >
                    <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center font-black text-xs
                       ${selectedOption === null ? 'bg-slate-700 text-slate-400 group-hover:bg-amber-500 group-hover:text-amber-950' : 'bg-slate-800 text-slate-500'}`}>
                       {i + 1}
                    </div>
                    <span className="text-sm font-medium text-slate-200 leading-snug">{opt.text}</span>
                 </button>
               ))}
            </div>

            <AnimatePresence>
               {selectedOption !== null && (
                 <motion.div
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="mt-6 p-6 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start gap-4"
                 >
                    {scene.options[selectedOption].isCorrect ? (
                       <Ear className="w-6 h-6 text-emerald-400 shrink-0" />
                    ) : (
                       <AlertCircle className="w-6 h-6 text-rose-400 shrink-0" />
                    )}
                    <div className="space-y-2">
                       <span className={`text-[10px] font-black uppercase tracking-widest ${scene.options[selectedOption].isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {scene.options[selectedOption].isCorrect ? 'Excelente Escolha' : 'Ponto de Atenção'}
                       </span>
                       <p className="text-xs text-slate-400 leading-relaxed font-medium">
                          {scene.options[selectedOption].feedback}
                       </p>
                       <button onClick={next} className="mt-4 px-6 py-2 bg-amber-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-500 transition-all">
                          Próximo Desafio →
                       </button>
                    </div>
                 </motion.div>
               )}
            </AnimatePresence>
         </div>
      </div>

      <div className="text-center text-slate-600 text-[10px] font-bold uppercase tracking-[0.3em]">
         Foque na assertividade: Firmeza no que diz, gentileza na forma de dizer.
      </div>
    </div>
  );
}
