import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, MessageSquare, ShieldAlert, Cpu, CheckCircle2 } from 'lucide-react';

interface Scenario {
  id: number;
  title: string;
  description: string;
  correctSkillId: string;
  icon: any;
}

interface Skill {
  id: string;
  name: string;
  color: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 1,
    title: 'A Reunião do Caos',
    description: 'A diretoria não entende a sua planilha financeira cheia de equações complexas e quer cancelar o projeto por não ver os lucros imediatos.',
    correctSkillId: 'comm',
    icon: MessageSquare
  },
  {
    id: 2,
    title: 'O Lago Envenenado',
    description: 'A base de dados de clientes chegou do RH. Metade das idades estão como "Desconhecido" e há CPFs com formatações que quebram o código.',
    correctSkillId: 'clean',
    icon: ShieldAlert
  },
  {
    id: 3,
    title: 'A Agulha no Palheiro',
    description: 'As vendas caíram 30% misteriosamente nesta sexta-feira. Ninguém sabe o porquê e você precisa explorar os logs para formular uma hipótese.',
    correctSkillId: 'curiosity',
    icon: Lightbulb
  }
];

const SKILLS: Skill[] = [
  { id: 'comm', name: 'Comunicação / Data Storytelling', color: 'bg-fuchsia-600' },
  { id: 'curiosity', name: 'Pensamento Crítico / Curiosidade', color: 'bg-emerald-600' },
  { id: 'clean', name: 'Tratamento / Limpeza de Dados', color: 'bg-sky-600' },
];

export function QualityMatcher() {
  const [activeScenario, setActiveScenario] = useState(0);
  const [solved, setSolved] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<'success' | 'error' | null>(null);

  const scenario = SCENARIOS[activeScenario];
  const allSolved = solved.length === SCENARIOS.length;

  const handleApplySkill = (skillId: string) => {
    if (skillId === scenario.correctSkillId) {
      setFeedback('success');
      setTimeout(() => {
        setSolved(prev => [...prev, scenario.id]);
        setFeedback(null);
        if (activeScenario < SCENARIOS.length - 1) setActiveScenario(prev => prev + 1);
      }, 1000);
    } else {
      setFeedback('error');
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 font-mono relative">
      <div className="text-center mb-4">
         <h4 className="text-emerald-400 font-bold flex items-center justify-center gap-2 text-xl">
            <Cpu className="w-6 h-6" /> Quality Matcher
         </h4>
         <p className="text-slate-400 text-sm max-w-xl">
            Conecte a a principal habilidade (Hard ou Soft Skill) à crise gerencial abaixo.
         </p>
      </div>

      <div className="w-full max-w-3xl flex flex-col md:flex-row gap-6">
          {/* Main Monitor */}
          <div className="flex-1 bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 shadow-2xl relative min-h-[300px] flex flex-col">
             <div className="absolute top-0 right-0 p-4">
                 <span className="text-slate-500 font-black tracking-widest text-xs">CASO {activeScenario + 1}/{SCENARIOS.length}</span>
             </div>
             
             {!allSolved ? (
                 <AnimatePresence mode="wait">
                     <motion.div 
                        key={scenario.id} 
                        initial={{ opacity: 0, x: -20 }} 
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex-1 flex flex-col justify-center"
                     >
                         <div className="flex items-center gap-4 mb-4">
                             <div className="bg-slate-800 p-3 justify-center items-center flex rounded-xl border border-slate-600">
                                 <scenario.icon className="w-8 h-8 text-white" />
                             </div>
                             <h3 className="text-xl font-bold text-white">{scenario.title}</h3>
                         </div>
                         <p className="text-slate-400 text-sm leading-relaxed mb-6">"{scenario.description}"</p>
                         
                         <div className="h-12 flex items-center justify-center">
                            <AnimatePresence>
                                {feedback === 'success' && (
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="text-emerald-400 font-bold flex bg-emerald-900/30 px-4 py-2 rounded-full items-center gap-2">
                                        <CheckCircle2 className="w-5 h-5"/> Solução Perfeita!
                                    </motion.div>
                                )}
                                {feedback === 'error' && (
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="text-rose-400 font-bold flex bg-rose-900/30 px-4 py-2 rounded-full items-center gap-2">
                                        Habilidade errada para o escopo!
                                    </motion.div>
                                )}
                            </AnimatePresence>
                         </div>
                     </motion.div>
                 </AnimatePresence>
             ) : (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 border-2 border-emerald-500/50 bg-emerald-900/20 rounded-xl flex flex-col items-center justify-center text-center p-6">
                     <CheckCircle2 className="w-16 h-16 text-emerald-400 mb-4" />
                     <h3 className="text-2xl font-black text-white">Soft/Hard Skills Validadas!</h3>
                     <p className="text-emerald-300/80 text-sm mt-2">Um bom Analista é um canivete suíço entre Código, Estatística e Fala Humana.</p>
                 </motion.div>
             )}
          </div>

          {/* Tools / Skills Palette */}
          <div className="w-full md:w-64 flex flex-col gap-4">
             <div className="text-xs text-slate-500 font-bold tracking-widest text-center border-b border-slate-800 pb-2">FERRAMENTEIRO DE SKILLS</div>
             {SKILLS.map(skill => (
                 <button
                    key={skill.id}
                    onClick={() => handleApplySkill(skill.id)}
                    disabled={allSolved}
                    className={`p-4 rounded-xl text-left border-2 border-transparent transition-all overflow-hidden relative group hover:scale-105 active:scale-95 disabled:scale-100 disabled:opacity-50 ${skill.color} text-white font-bold shadow-lg`}
                 >
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
                    <span className="relative z-10">{skill.name}</span>
                 </button>
             ))}
          </div>
      </div>
    </div>
  );
}
