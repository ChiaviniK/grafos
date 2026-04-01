import { useState, useRef } from 'react';
import { CheckCircle2, XCircle, RotateCcw, Trophy } from 'lucide-react';

interface Task {
  id: number;
  text: string;
  correctRole: 0 | 1 | 2; // 0=Analista, 1=Cientista, 2=Engenheiro
}

const TASKS: Task[] = [
  { id: 1, text: 'Criar dashboards e relatórios visuais no Power BI', correctRole: 0 },
  { id: 2, text: 'Consultar e filtrar dados com SQL', correctRole: 0 },
  { id: 3, text: 'Treinar modelos de Machine Learning com Python', correctRole: 1 },
  { id: 4, text: 'Desenvolver algoritmos de previsão de demanda', correctRole: 1 },
  { id: 5, text: 'Construir pipelines de ingestão de dados (ETL)', correctRole: 2 },
  { id: 6, text: 'Integrar múltiplas fontes de dados em um data lake', correctRole: 2 },
  { id: 7, text: 'Explorar dados para identificar padrões (EDA)', correctRole: 0 },
  { id: 8, text: 'Aplicar modelos de NLP para análise de sentimento', correctRole: 1 },
  { id: 9, text: 'Garantir a disponibilidade e escalabilidade do banco de dados', correctRole: 2 },
];

const ROLES = ['Analista de Dados', 'Cientista de Dados', 'Engenheiro de Dados'];
const ROLE_BORDERS = ['border-pink-500/40', 'border-violet-500/40', 'border-teal-500/40'];
const ROLE_BG = ['bg-pink-500/10', 'bg-violet-500/10', 'bg-teal-500/10'];
const ROLE_TEXT = ['text-pink-400', 'text-violet-400', 'text-teal-400'];

export function RoleSorter() {
  const [placed, setPlaced] = useState<Record<number, number>>({}); // taskId -> roleIdx
  const [dragId, setDragId] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [results, setResults] = useState<Record<number, boolean>>({});
  const dragOverRole = useRef<number | null>(null);

  const unplaced = TASKS.filter(t => !(t.id in placed));
  const score = Object.keys(results).filter(k => results[Number(k)]).length;

  function onDragStart(id: number) { setDragId(id); }
  function onDrop(roleIdx: number) {
    if (dragId === null) return;
    setPlaced(p => ({ ...p, [dragId]: roleIdx }));
    setDragId(null);
    dragOverRole.current = null;
  }

  function check() {
    const r: Record<number, boolean> = {};
    TASKS.forEach(t => {
      if (t.id in placed) r[t.id] = placed[t.id] === t.correctRole;
    });
    setResults(r);
    setChecked(true);
  }

  function reset() {
    setPlaced({});
    setResults({});
    setChecked(false);
    setDragId(null);
  }

  const allPlaced = unplaced.length === 0;

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <p className="text-slate-400 text-sm">
          Arraste cada tarefa para o profissional de dados correto!
        </p>
      </div>

      {/* Task bank — unplaced tasks */}
      {unplaced.length > 0 && (
        <div className="flex flex-wrap gap-3 justify-center p-4 bg-slate-900/40 border border-slate-700/50 rounded-2xl min-h-[72px]">
          {unplaced.map(task => (
            <div
              key={task.id}
              draggable
              onDragStart={() => onDragStart(task.id)}
              className="px-4 py-2 bg-slate-800 border border-slate-600 text-slate-200 text-xs font-semibold rounded-xl cursor-grab active:cursor-grabbing hover:border-amber-500/60 hover:bg-slate-700 transition-all select-none"
            >
              {task.text}
            </div>
          ))}
        </div>
      )}

      {/* Drop zones */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ROLES.map((role, ri) => {
          const tasksHere = TASKS.filter(t => placed[t.id] === ri);
          return (
            <div
              key={ri}
              onDragOver={e => { e.preventDefault(); dragOverRole.current = ri; }}
              onDrop={() => onDrop(ri)}
              className={`min-h-[160px] rounded-2xl border-2 ${ROLE_BORDERS[ri]} ${ROLE_BG[ri]} p-4 transition-all flex flex-col gap-3`}
            >
              <div className={`text-xs font-black uppercase tracking-widest text-center pb-2 border-b ${ROLE_BORDERS[ri]} ${ROLE_TEXT[ri]}`}>
                {role}
              </div>
              <div className="flex flex-col gap-2 flex-1">
                {tasksHere.map(task => {
                  const isCorrect = results[task.id];
                  const _isWrong = checked && results[task.id] === false; void _isWrong;
                  return (
                    <div
                      key={task.id}
                      draggable={!checked}
                      onDragStart={() => !checked && onDragStart(task.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 cursor-grab
                        ${checked
                          ? isCorrect
                            ? 'bg-emerald-950 border border-emerald-500 text-emerald-200'
                            : 'bg-rose-950 border border-rose-500 text-rose-200'
                          : 'bg-slate-700 border border-slate-600 text-slate-200 hover:border-amber-400'
                        }`}
                    >
                      {checked && (isCorrect
                        ? <CheckCircle2 className="w-3 h-3 shrink-0 text-emerald-400" />
                        : <XCircle className="w-3 h-3 shrink-0 text-rose-400" />
                      )}
                      {task.text}
                    </div>
                  );
                })}
                {tasksHere.length === 0 && (
                  <div className={`flex-1 border-2 border-dashed ${ROLE_BORDERS[ri]} rounded-xl flex items-center justify-center text-xs text-slate-600 opacity-60 min-h-[60px]`}>
                    Solte aqui
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        {!checked ? (
          <button
            onClick={check}
            disabled={!allPlaced}
            className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black rounded-2xl disabled:opacity-30 hover:scale-105 transition-all text-sm shadow-lg shadow-amber-500/20"
          >
            Verificar Respostas ✓
          </button>
        ) : (
          <div className="flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center gap-3 bg-slate-900 px-6 py-4 rounded-2xl border border-slate-700">
              <Trophy className="w-6 h-6 text-amber-400" />
              <span className="text-white font-black text-xl">{score}/{TASKS.length}</span>
              <span className="text-slate-400 text-sm">tarefas corretas!</span>
            </div>
            <button
              onClick={reset}
              className="flex items-center gap-2 px-6 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-300 text-sm font-bold rounded-xl transition-all"
            >
              <RotateCcw className="w-4 h-4" /> Tentar Novamente
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
