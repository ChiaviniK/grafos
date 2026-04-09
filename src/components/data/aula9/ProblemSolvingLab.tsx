import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Search, Lightbulb, PenTool, BrainCog, RefreshCcw } from 'lucide-react';

const STAGES = [
  { id: 'identificar', label: 'Identificar o Problema', icon: Search, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { id: 'coletar', label: 'Coletar Informações', icon: BrainCog, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  { id: 'alternativas', label: 'Gerar Alternativas', icon: Lightbulb, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  { id: 'implementar', label: 'Implementar a Solução', icon: PenTool, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
];

const SCENARIOS = [
  {
    id: 1,
    character: 'Lucia',
    role: 'Analista de Dados',
    text: 'Lucia analisou diligentemente os números de vendas para detectar discrepâncias em certas regiões em relação ao novo modelo de smartphone na GenPhone.',
    correctStage: 'identificar',
    explanation: 'Ela está mapeando irregularidades para definir melhor qual é exatamente o problema de vendas.'
  },
  {
    id: 2,
    character: 'Roberto',
    role: 'Analista de Dados',
    text: 'Notando atrasos no processamento, Roberto proativamente se engajou com as equipes de suporte ao cliente e vendas da GenPhone para entender de onde vinha o gargalo.',
    correctStage: 'coletar',
    explanation: 'Ao falar com as equipes, Roberto está coletando informações para entender os detalhes do problema.'
  },
  {
    id: 3,
    character: 'Elisa',
    role: 'Engenheira de Dados',
    text: 'Após detectar lentidão no App, Elisa trabalhou com a equipe e instalou uma nova arquitetura de cache no servidor, reduzindo as falhas diárias.',
    correctStage: 'implementar',
    explanation: 'Ela colocou em prática (implementou) a solução baseada na infraestrutura de cache.'
  }
];

export function ProblemSolvingLab() {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const scenario = SCENARIOS[currentScenario];

  const handleAnswer = (stageId: string) => {
    if (showFeedback) return;
    
    setSelectedAnswer(stageId);
    setShowFeedback(true);
    
    if (stageId === scenario.correctStage) {
      setScore(s => s + 1);
    }
  };

  const nextScenario = () => {
    if (currentScenario < SCENARIOS.length - 1) {
      setCurrentScenario(s => s + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  const reset = () => {
    setCurrentScenario(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div>
          <h3 className="text-2xl font-black text-white italic">GenPhone 📱</h3>
          <p className="text-slate-400 text-sm">Case de Resolução de Problemas</p>
        </div>
        <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 text-emerald-400 font-bold whitespace-nowrap">
          Progresso: {currentScenario + 1} / {SCENARIOS.length}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentScenario}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-slate-950/50 p-6 md:p-8 rounded-2xl border border-slate-800/80 mb-8 relative"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center font-bold text-xl text-white shrink-0">
              {scenario.character[0]}
            </div>
            <div>
              <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider mb-1">{scenario.role}</div>
              <p className="text-slate-300 text-lg leading-relaxed">{scenario.text}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STAGES.map((stage) => {
          const isSelected = selectedAnswer === stage.id;
          const isCorrect = stage.id === scenario.correctStage;
          
          let buttonClass = "bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-800";
          
          if (showFeedback) {
            if (isCorrect) {
              buttonClass = "bg-emerald-500/10 border-emerald-500/50 scale-105 shadow-[0_0_20px_rgba(16,185,129,0.2)]";
            } else if (isSelected && !isCorrect) {
              buttonClass = "bg-rose-500/10 border-rose-500/50 opacity-50";
            } else {
              buttonClass = "bg-slate-900 border-slate-800 opacity-30 grayscale";
            }
          }

          return (
            <button
              key={stage.id}
              onClick={() => handleAnswer(stage.id)}
              disabled={showFeedback}
              className={`p-4 rounded-xl border text-left transition-all duration-300 relative overflow-hidden group ${buttonClass}`}
            >
              <div className={`w-10 h-10 rounded-lg ${stage.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <stage.icon className={`w-5 h-5 ${stage.color}`} />
              </div>
              <div className="text-white font-bold text-sm">{stage.label}</div>
              
              {showFeedback && isSelected && isCorrect && (
                <CheckCircle2 className="absolute top-4 right-4 w-5 h-5 text-emerald-400" />
              )}
              {showFeedback && isSelected && !isCorrect && (
                <XCircle className="absolute top-4 right-4 w-5 h-5 text-rose-400" />
              )}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-2xl border ${selectedAnswer === scenario.correctStage ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-rose-500/10 border-rose-500/30'} flex flex-col md:flex-row items-center gap-6`}
          >
            <div className="flex-1 text-center md:text-left">
              <h4 className={`font-bold text-lg mb-2 ${selectedAnswer === scenario.correctStage ? 'text-emerald-400' : 'text-rose-400'}`}>
                {selectedAnswer === scenario.correctStage ? 'Acertou em cheio!' : 'Ainda não é isso...'}
              </h4>
              <p className="text-slate-300 text-sm">
                {scenario.explanation}
              </p>
            </div>
            
            {currentScenario < SCENARIOS.length - 1 ? (
              <button
                onClick={nextScenario}
                className="bg-white text-slate-950 font-bold px-6 py-3 rounded-xl hover:bg-slate-200 transition-colors whitespace-nowrap"
              >
                Próximo Cenário
              </button>
            ) : (
              <div className="text-center bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-slate-400 text-xs mb-1 uppercase font-bold tracking-wider">Pontuação Final</div>
                <div className="text-2xl font-black text-emerald-400">{score} / {SCENARIOS.length}</div>
                <button onClick={reset} className="mt-2 text-xs text-white hover:text-emerald-400 flex items-center justify-center gap-1 mx-auto transition-colors">
                  <RefreshCcw className="w-3 h-3" /> TENTAR NOVAMENTE
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
