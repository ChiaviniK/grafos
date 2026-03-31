import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';

interface Row {
  id: number;
  nome: string;
  data: string;
  idade: string;
  isNuloIdade: boolean;
  isDateWrong: boolean;
  isNameCorrupted: boolean;
}

export function DataCleaningPractice({ onComplete }: { onComplete?: () => void }) {
  const [data, setData] = useState<Row[]>([
    { id: 1, nome: "João Silva", data: "12/05/2023", idade: "28", isNuloIdade: false, isDateWrong: false, isNameCorrupted: false },
    { id: 2, nome: "Maria Souza", data: "2023-05-13", idade: "32", isNuloIdade: false, isDateWrong: true, isNameCorrupted: false },
    { id: 3, nome: "Carlos Pereira", data: "14/05/2023", idade: "NULL", isNuloIdade: true, isDateWrong: false, isNameCorrupted: false },
    { id: 4, nome: "USRQ@!$#X", data: "15/05/2023", idade: "25", isNuloIdade: false, isDateWrong: false, isNameCorrupted: true },
    { id: 5, nome: "Ana Santos", data: "16/05/2023", idade: "29", isNuloIdade: false, isDateWrong: false, isNameCorrupted: false },
  ]);

  const defectsLeft = data.filter(d => d.isNuloIdade || d.isDateWrong || d.isNameCorrupted).length;

  const fixDate = (id: number) => {
    setData(data.map(d => d.id === id ? { ...d, data: "13/05/2023", isDateWrong: false } : d));
    checkCompletion();
  };

  const fixAge = (id: number) => {
    setData(data.map(d => d.id === id ? { ...d, idade: "Mediana (30)", isNuloIdade: false } : d));
    checkCompletion();
  };

  const fixName = (id: number) => {
    setData(data.map(d => d.id === id ? { ...d, nome: "Usuário Excluído", isNameCorrupted: false } : d));
    checkCompletion();
  };

  const checkCompletion = () => {
    setTimeout(() => {
      setData(prevData => {
         const stillDefects = prevData.filter(d => d.isNuloIdade || d.isDateWrong || d.isNameCorrupted).length;
         if (stillDefects === 0 && onComplete) {
           onComplete();
         }
         return prevData;
      });
    }, 100);
  };

  return (
    <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-6 relative overflow-hidden flex flex-col items-center">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" /> 
          O Faxineiro de Dados
        </h3>
        <p className="text-sm text-slate-400">
          Existe 1 Nome Corrompido, 1 Data Despadronizada e 1 Valor Nulo.<br/>
          Clique nos dados sujos (<span className="text-amber-500 font-bold">em laranja</span>) para aplicar algoritmos de limpeza adequados.
        </p>
      </div>

      <div className="w-full max-w-2xl bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
        <table className="w-full text-left font-mono text-sm">
          <thead className="bg-slate-800/50 text-slate-300 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 border-b border-slate-700 w-16">ID</th>
              <th className="px-4 py-3 border-b border-slate-700">Responsável</th>
              <th className="px-4 py-3 border-b border-slate-700">Data Reg.</th>
              <th className="px-4 py-3 border-b border-slate-700 w-32">Idade</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="border-b border-slate-800/50 hover:bg-slate-800/20 text-slate-300">
                <td className="px-4 py-3 text-slate-500">{row.id}</td>
                <td className="px-4 py-3">
                  {row.isNameCorrupted ? (
                    <button onClick={() => fixName(row.id)} className="flex items-center gap-1 text-amber-500 bg-amber-500/10 px-2 py-1 flex items-center justify-center rounded border border-amber-500/30 hover:bg-amber-500 hover:text-white transition-all w-full animate-pulse">
                      <AlertTriangle className="w-3 h-3" /> {row.nome}
                    </button>
                  ) : (
                    <span className={row.nome === "Usuário Excluído" ? "text-slate-500 opacity-50" : ""}>{row.nome}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-slate-400">
                  {row.isDateWrong ? (
                    <button onClick={() => fixDate(row.id)} className="flex items-center gap-1 text-amber-500 bg-amber-500/10 px-2 flex items-center justify-center py-1 rounded border border-amber-500/30 hover:bg-amber-500 hover:text-white transition-all animate-pulse">
                      <AlertTriangle className="w-3 h-3" /> {row.data}
                    </button>
                  ) : (
                    row.data
                  )}
                </td>
                <td className="px-4 py-3 text-blue-400">
                  {row.isNuloIdade ? (
                    <button onClick={() => fixAge(row.id)} className="flex items-center text-rose-400 font-bold bg-rose-500/10 px-2 flex items-center justify-center py-1 rounded border border-rose-500/30 hover:bg-rose-500 hover:text-white transition-all w-full animate-pulse">
                       {row.idade}
                    </button>
                  ) : (
                    <span className={row.idade.includes("Mediana") ? "text-emerald-400 text-xs font-bold" : ""}>{row.idade}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 flex gap-2 w-full max-w-2xl px-4">
         <div className="flex-1 bg-slate-800/30 rounded-full h-2 overflow-hidden">
            <div className="bg-emerald-500 h-full transition-all duration-1000" style={{ width: `${(1 - defectsLeft/3) * 100}%` }} />
         </div>
      </div>

      <AnimatePresence>
        {defectsLeft === 0 && (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 flex items-center gap-2 text-emerald-400 font-bold bg-emerald-900/20 px-4 py-2 rounded-full border border-emerald-500/30">
            <CheckCircle2 className="w-5 h-5" /> Base de Dados Higienizada e Pronta para Análise!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
