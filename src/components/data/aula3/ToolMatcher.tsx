import { useState } from 'react';
import { CheckCircle2, XCircle, Zap, RotateCcw } from 'lucide-react';

interface Tool {
  id: number;
  name: string;
  icon: string;
  correctRole: number; // 0=Analista, 1=Cientista, 2=Engenheiro
}

const TOOLS: Tool[] = [
  { id: 0, name: 'Power BI', icon: '📊', correctRole: 0 },
  { id: 1, name: 'SQL', icon: '🗄️', correctRole: 0 },
  { id: 2, name: 'Excel Avançado', icon: '📑', correctRole: 0 },
  { id: 3, name: 'Python (scikit-learn)', icon: '🐍', correctRole: 1 },
  { id: 4, name: 'TensorFlow / PyTorch', icon: '🤖', correctRole: 1 },
  { id: 5, name: 'R / Jupyter', icon: '📓', correctRole: 1 },
  { id: 6, name: 'Apache Spark', icon: '⚡', correctRole: 2 },
  { id: 7, name: 'Apache Kafka', icon: '🌊', correctRole: 2 },
  { id: 8, name: 'dbt / Airflow', icon: '🔄', correctRole: 2 },
];

const ROLES = ['Analista de Dados', 'Cientista de Dados', 'Engenheiro de Dados'];
const ROLE_COLORS = [
  { border: 'border-pink-500/50', bg: 'bg-pink-500/10', text: 'text-pink-400', active: 'ring-2 ring-pink-400 bg-pink-500/20', btn: 'bg-pink-600 hover:bg-pink-500' },
  { border: 'border-violet-500/50', bg: 'bg-violet-500/10', text: 'text-violet-400', active: 'ring-2 ring-violet-400 bg-violet-500/20', btn: 'bg-violet-600 hover:bg-violet-500' },
  { border: 'border-teal-500/50', bg: 'bg-teal-500/10', text: 'text-teal-400', active: 'ring-2 ring-teal-400 bg-teal-500/20', btn: 'bg-teal-600 hover:bg-teal-500' },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function ToolMatcher() {
  const [tools] = useState<Tool[]>(() => shuffle(TOOLS));
  const [selected, setSelected] = useState<number | null>(null); // tool id
  const [matched, setMatched] = useState<Record<number, boolean>>({}); // toolId -> correct
  const [attempts, setAttempts] = useState(0);
  const [flash, setFlash] = useState<{ roleIdx: number; correct: boolean } | null>(null);

  const correctCount = Object.values(matched).filter(Boolean).length;
  const totalTools = TOOLS.length;
  const finished = correctCount === totalTools;

  function handleToolClick(toolId: number) {
    if (toolId in matched) return; // already matched
    setSelected(toolId === selected ? null : toolId);
  }

  function handleRoleClick(roleIdx: number) {
    if (selected === null) return;
    const tool = TOOLS.find(t => t.id === selected)!;
    const isCorrect = tool.correctRole === roleIdx;
    setAttempts(a => a + 1);
    setFlash({ roleIdx, correct: isCorrect });

    if (isCorrect) {
      setMatched(m => ({ ...m, [selected]: true }));
    } else {
      // wrong — show error flash then clear
      setTimeout(() => {}, 0);
    }
    setTimeout(() => setFlash(null), 700);
    setSelected(null);
  }

  function reset() {
    setSelected(null);
    setMatched({});
    setAttempts(0);
    setFlash(null);
  }

  const accuracy = attempts > 0 ? Math.round((correctCount / attempts) * 100) : 0;

  return (
    <div className="w-full space-y-6">
      <p className="text-slate-400 text-sm text-center">
        Selecione uma ferramenta, depois clique no profissional que a usa!
      </p>

      {/* Tool Grid */}
      <div className="grid grid-cols-3 gap-3">
        {tools.map(tool => {
          const isMatched = tool.id in matched;
          const isSelected = selected === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => handleToolClick(tool.id)}
              disabled={isMatched}
              className={`p-4 rounded-2xl border-2 text-center transition-all font-bold text-sm
                ${isMatched
                  ? 'border-emerald-500/30 bg-emerald-950/20 text-emerald-400 opacity-50 cursor-default'
                  : isSelected
                    ? 'border-amber-400 bg-amber-500/15 text-amber-200 scale-105 shadow-lg shadow-amber-500/20'
                    : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500 hover:bg-slate-800'
                }`}
            >
              <div className="text-2xl mb-1">{tool.icon}</div>
              <div className="text-xs leading-tight">{tool.name}</div>
              {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto mt-1" />}
            </button>
          );
        })}
      </div>

      {/* Role targets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ROLES.map((role, ri) => {
          const isFlashing = flash?.roleIdx === ri;
          return (
            <button
              key={ri}
              onClick={() => handleRoleClick(ri)}
              className={`p-6 rounded-2xl border-2 transition-all text-center font-bold
                ${isFlashing
                  ? flash!.correct
                    ? 'border-emerald-400 bg-emerald-950 scale-105 shadow-lg shadow-emerald-400/20'
                    : 'border-rose-400 bg-rose-950 scale-95'
                  : selected !== null
                    ? `${ROLE_COLORS[ri].border} ${ROLE_COLORS[ri].active} cursor-pointer hover:scale-105`
                    : `${ROLE_COLORS[ri].border} ${ROLE_COLORS[ri].bg} cursor-default`
                }`}
            >
              {isFlashing ? (
                flash!.correct
                  ? <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  : <XCircle className="w-8 h-8 text-rose-400 mx-auto mb-2" />
              ) : (
                <Zap className={`w-6 h-6 mx-auto mb-2 ${ROLE_COLORS[ri].text}`} />
              )}
              <div className={`text-sm ${ROLE_COLORS[ri].text}`}>{role}</div>

              {/* Matched tools badges */}
              <div className="mt-3 flex flex-wrap gap-1 justify-center">
                {TOOLS.filter(t => t.correctRole === ri && t.id in matched).map(t => (
                  <span key={t.id} className="text-xs bg-slate-800 border border-slate-700 text-slate-300 px-2 py-0.5 rounded-lg">
                    {t.icon} {t.name}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      {/* Score + reset */}
      <div className="flex items-center justify-between bg-slate-900/60 border border-slate-800 rounded-2xl px-6 py-4">
        <div className="text-sm text-slate-400">
          <span className="text-white font-bold">{correctCount}</span>/<span>{totalTools}</span> ferramentas alocadas
          {attempts > 0 && <span className="ml-3 text-slate-500">Precisão: <span className={accuracy >= 80 ? 'text-emerald-400' : 'text-amber-400'}>{accuracy}%</span></span>}
        </div>
        <button onClick={reset} className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300 transition-colors">
          <RotateCcw className="w-3 h-3" /> Resetar
        </button>
      </div>

      {finished && (
        <div className="text-center animate-in fade-in slide-in-from-bottom-4 p-6 bg-gradient-to-r from-emerald-950 to-teal-950 border border-emerald-500/30 rounded-3xl">
          <div className="text-4xl mb-2">🎉</div>
          <h3 className="text-2xl font-black text-emerald-400 mb-1">Perfeito!</h3>
          <p className="text-slate-300 text-sm">Você alocou todas as ferramentas corretamente com {accuracy}% de precisão!</p>
        </div>
      )}
    </div>
  );
}
