import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardCheck, Check, Save, RotateCcw } from 'lucide-react';

interface Task {
  id: number;
  label: string;
  description: string;
  isDone: boolean;
}

const INITIAL_TASKS: Task[] = [
  { id: 1, label: 'Consistência de Tipos', description: 'Verificar se colunas numéricas (Preço, Quantidade) não contêm strings ou caracteres especiais.', isDone: false },
  { id: 2, label: 'Padronização de Categorias', description: 'Transformar "São Paulo", "SP", "S. Paulo" em um único padrão único de banco de dados.', isDone: false },
  { id: 3, label: 'Validação de Range', description: 'Garantir que não existam valores bizarros (Preços < 0 ou Datas no futuro distante).', isDone: false },
  { id: 4, label: 'Detecção de Nulos (NULL)', description: 'Identificar campos obrigatórios que estão vazios e decidir: Excluir linha ou Imputar valor médio?', isDone: false },
  { id: 5, label: 'Busca por Duplicatas', description: 'Remover IDs repetidos que geram contagem dupla nas vendas totais.', isDone: false },
  { id: 6, label: 'Check de Encoding', description: 'Verificar se caracteres especiais (ç, á, ã) estão sendo lidos corretamente ou se viraram caracteres estranhos.', isDone: false },
];

export function VerificationChecklist({ onComplete }: { onComplete?: () => void }) {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [saved, setSaved] = useState(false);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, isDone: !t.isDone } : t));
    setSaved(false);
  };

  const allDone = tasks.every(t => t.isDone);

  const handleSave = () => {
    if (allDone) {
      setSaved(true);
      if (onComplete) onComplete();
    }
  };

  const reset = () => {
    setTasks(INITIAL_TASKS);
    setSaved(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
        <ClipboardCheck className="w-48 h-48 text-emerald-500" />
      </div>

      <div className="relative z-10 mb-8 space-y-2">
        <h3 className="text-3xl font-black text-white flex items-center gap-3">
          <div className="p-2 bg-emerald-500/20 rounded-xl">
             <ClipboardCheck className="w-6 h-6 text-emerald-400" />
          </div>
          Checklist de <span className="text-emerald-400">QA</span>
        </h3>
        <p className="text-slate-400 text-sm">Monte seu protocolo de verificação padrão para novos datasets.</p>
      </div>

      <div className="space-y-4 relative z-10">
        {tasks.map((task) => (
          <motion.div 
            key={task.id}
            onClick={() => toggleTask(task.id)}
            whileHover={{ x: 5 }}
            className={`cursor-pointer group flex items-start gap-4 p-4 rounded-2xl border transition-all ${task.isDone ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-slate-950/40 border-slate-800 hover:border-slate-600'}`}
          >
            <div className={`mt-1 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${task.isDone ? 'bg-emerald-500 border-emerald-500 text-slate-950 scale-110 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'border-slate-700 text-transparent'}`}>
               <Check className="w-4 h-4 stroke-[3px]" />
            </div>
            <div>
              <div className={`font-bold text-sm md:text-base transition-colors ${task.isDone ? 'text-emerald-400' : 'text-slate-200'}`}>{task.label}</div>
              <div className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">{task.description}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-between items-center relative z-10">
         <button 
           onClick={reset}
           className="flex items-center gap-2 text-slate-500 hover:text-white text-xs font-bold transition-colors"
         >
           <RotateCcw className="w-4 h-4" /> RESETAR PROTOCOLO
         </button>

         <button 
           disabled={!allDone || saved}
           onClick={handleSave}
           className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-sm transition-all shadow-xl
             ${allDone && !saved 
               ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-emerald-500/20 active:scale-95' 
               : 'bg-slate-800 text-slate-600 cursor-not-allowed opacity-50'}`}
         >
           <Save className="w-4 h-4" /> {saved ? 'PROTOCOLO FINALIZADO' : 'AUTENTICAR RELATÓRIO'}
         </button>
      </div>

      <AnimatePresence>
        {saved && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 bg-gradient-to-br from-emerald-950 to-slate-950 border border-emerald-500/30 rounded-3xl text-center shadow-inner"
          >
            <div className="text-emerald-400 font-black text-xl mb-2 flex items-center justify-center gap-2">
               <Check className="w-6 h-6 border-2 border-emerald-400 rounded-full p-0.5" />
               DATA QUALITY GUARANTEED
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm mx-auto">
              Seu protocolo foi salvo. Aplicar este checklist reduz em até 85% os erros reportados por Stakeholders na ponta final do dashboard.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
