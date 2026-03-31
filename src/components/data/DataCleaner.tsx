import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, ShieldCheck, CheckCircle2, ShieldAlert, Sparkles } from 'lucide-react';

interface Cell {
  id: string;
  value: string;
  isError: boolean;
  fixedValue: string;
  cleaned: boolean;
}

interface Row {
  id: number;
  cells: Cell[];
}

const INITIAL_DATA: Row[] = [
  {
    id: 1,
    cells: [
      { id: '1a', value: '1', isError: false, fixedValue: '1', cleaned: true },
      { id: '1b', value: 'João Silva', isError: false, fixedValue: 'João Silva', cleaned: true },
      { id: '1c', value: '25', isError: false, fixedValue: '25', cleaned: true },
      { id: '1d', value: 'joao@email.com', isError: false, fixedValue: 'joao@email.com', cleaned: true },
    ]
  },
  {
    id: 2,
    cells: [
      { id: '2a', value: '2', isError: false, fixedValue: '2', cleaned: true },
      { id: '2b', value: 'Maria', isError: false, fixedValue: 'Maria', cleaned: true },
      { id: '2c', value: 'banana', isError: true, fixedValue: 'NaN', cleaned: false },
      { id: '2d', value: 'maria@b', isError: true, fixedValue: 'maria@b.com', cleaned: false },
    ]
  },
  {
    id: 3,
    cells: [
      { id: '3a', value: '3', isError: false, fixedValue: '3', cleaned: true },
      { id: '3b', value: 'Pedro', isError: false, fixedValue: 'Pedro', cleaned: true },
      { id: '3c', value: '-15', isError: true, fixedValue: '15', cleaned: false },
      { id: '3d', value: 'pedro@email.com', isError: false, fixedValue: 'pedro@email.com', cleaned: true },
    ]
  },
  {
    id: 4,
    cells: [
      { id: '4a', value: '4', isError: false, fixedValue: '4', cleaned: true },
      { id: '4b', value: 'Ana Souza', isError: false, fixedValue: 'Ana Souza', cleaned: true },
      { id: '4c', value: '30', isError: false, fixedValue: '30', cleaned: true },
      { id: '4d', value: 'null', isError: true, fixedValue: 'ana@email.com', cleaned: false },
    ]
  }
];

export function DataCleaner() {
  const [data, setData] = useState<Row[]>(INITIAL_DATA);
  const [score, setScore] = useState(0);

  const totalErrors = 4;
  const isDataClean = score === totalErrors;

  const handleClean = (rowId: number, cellId: string) => {
    setData(prev => prev.map(row => {
      if (row.id === rowId) {
        return {
          ...row,
          cells: row.cells.map(cell => {
            if (cell.id === cellId && cell.isError && !cell.cleaned) {
              setScore(s => s + 1);
              return { ...cell, cleaned: true, value: cell.fixedValue };
            }
            return cell;
          })
        };
      }
      return row;
    }));
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 font-mono relative">
      <div className="text-center mb-4">
         <h4 className="text-sky-400 font-bold flex items-center justify-center gap-2 text-xl">
            <Database className="w-6 h-6" /> Lavanderia de Dados
         </h4>
         <p className="text-slate-400 text-sm max-w-xl">
            A Inteligência Artificial da empresa vai enlouquecer com a sujeira desta tabela. Olhe atenciosamente para cada registro e clique nos "Lixos" para limpar a base de dados!
         </p>
      </div>

      <div className="w-full max-w-3xl bg-slate-900 border-2 border-slate-700/50 rounded-2xl p-6 shadow-2xl relative overflow-hidden transition-colors duration-1000">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                 <div className={`p-3 rounded-xl transition-all ${isDataClean ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                    {isDataClean ? <ShieldCheck className="w-8 h-8" /> : <ShieldAlert className="w-8 h-8 animate-pulse" />}
                 </div>
                 <div>
                    <div className="text-xs text-slate-500 tracking-widest font-black uppercase">Saúde do Dataset</div>
                    <div className={`text-xl font-black ${isDataClean ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {isDataClean ? '100% LIMPO' : 'CONTAMINADO'}
                    </div>
                 </div>
              </div>
              <div className="text-slate-400 text-sm font-bold">
                  Bugs Encontrados: <span className="text-sky-400">{score}/{totalErrors}</span>
              </div>
          </div>

          {/* Spreadsheet */}
          <div className="border border-slate-700 rounded-lg overflow-hidden bg-slate-950/50">
              {/* Table Header */}
              <div className="grid grid-cols-4 bg-slate-800 border-b border-slate-700">
                 <div className="p-3 text-xs text-slate-400 font-black tracking-widest">ID</div>
                 <div className="p-3 text-xs text-slate-400 font-black tracking-widest">NOME</div>
                 <div className="p-3 text-xs text-slate-400 font-black tracking-widest">IDADE</div>
                 <div className="p-3 text-xs text-slate-400 font-black tracking-widest">EMAIL</div>
              </div>
              
              {/* Table Body */}
              <div>
                 {data.map(row => (
                    <div key={row.id} className="grid grid-cols-4 border-b border-slate-800/50 last:border-0 hover:bg-white/5 transition-colors">
                        {row.cells.map(cell => (
                            <button
                               key={cell.id}
                               onClick={() => handleClean(row.id, cell.id)}
                               disabled={cell.cleaned}
                               className={`p-3 text-left border-r border-slate-800/50 last:border-0 transition-all font-mono text-sm relative group
                                 ${!cell.cleaned ? 'text-rose-400 font-bold bg-rose-[500]/10 hover:bg-rose-[500]/20 cursor-pointer shadow-[inset_0_0_10px_rgba(225,29,72,0.2)]' : 'text-slate-300 cursor-default'}
                               `}
                            >
                                <motion.span
                                   initial={false}
                                   animate={{ color: cell.cleaned ? (cell.isError ? '#34d399' : '#cbd5e1') : '#fb7185' }} // text-emerald-400 via hex
                                >
                                   {cell.value}
                                </motion.span>
                                
                                {!cell.cleaned && cell.isError && (
                                   <div className="absolute inset-0 bg-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                       <span className="text-[10px] text-white bg-rose-600 px-2 py-1 rounded shadow-lg">Limpar!</span>
                                   </div>
                                )}
                            </button>
                        ))}
                    </div>
                 ))}
              </div>
          </div>

          <AnimatePresence>
             {isDataClean && (
                 <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 bg-slate-900/95 backdrop-blur-sm z-10 flex flex-col items-center justify-center border-4 border-emerald-500/50 rounded-xl"
                 >
                     <Sparkles className="w-16 h-16 text-sky-400 mb-4 animate-bounce" />
                     <h3 className="text-3xl font-black text-white mb-2">Dados Higienizados!</h3>
                     <p className="text-emerald-400 font-bold bg-emerald-900/40 px-6 py-2 rounded-full flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5"/> Perfeito para o Modelo de Machine Learning.
                     </p>
                 </motion.div>
             )}
          </AnimatePresence>
      </div>

    </div>
  );
}
