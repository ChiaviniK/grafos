import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Filter } from 'lucide-react';

interface RowParams {
  id: number;
  clie: string;
  estado: string;
  valor: number;
}

export function StructuredPractice({ onComplete }: { onComplete?: () => void }) {
  const [data, setData] = useState<RowParams[]>([
    { id: 1, clie: 'João S.', estado: 'SP', valor: 250 },
    { id: 2, clie: 'Maria A.', estado: 'RJ', valor: 150 },
    { id: 3, clie: 'Carlos P.', estado: 'SP', valor: 800 },
    { id: 4, clie: 'Ana L.', estado: 'MG', valor: 120 },
    { id: 5, clie: 'Pedro T.', estado: 'PR', valor: 400 },
  ]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleFilter = () => {
    setData(data.filter(r => r.estado === 'SP'));
    setIsFiltered(true);
    setCompleted(true);
    if (onComplete) {
      setTimeout(() => onComplete(), 1000);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-6 relative overflow-hidden flex flex-col items-center">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <Filter className="w-5 h-5 text-emerald-400" /> 
          Missão: Filtro SQL Simples
        </h3>
        <p className="text-sm text-slate-400">
          O gerente pediu: <strong className="text-emerald-400">"Quero ver só as vendas de São Paulo (SP)."</strong><br/>
          Clique no botão de Filtro na coluna 'ESTADO' para simular a extração.
        </p>
      </div>

      <div className="w-full max-w-lg bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-800/50 text-slate-200 uppercase font-bold text-xs">
            <tr>
              <th className="px-4 py-3 border-b border-slate-700">ID</th>
              <th className="px-4 py-3 border-b border-slate-700">Cliente</th>
              <th className="px-4 py-3 border-b border-slate-700 flex justify-between items-center group">
                ESTADO
                {!isFiltered && (
                  <button onClick={handleFilter} className="bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-400 p-1 rounded transition-colors group-hover:scale-110">
                    <Filter className="w-3 h-3" />
                  </button>
                )}
              </th>
              <th className="px-4 py-3 border-b border-slate-700">Valor (R$)</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {data.map((row) => (
                <motion.tr 
                  key={row.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50, backgroundColor: 'rgba(239,68,68,0.2)' }}
                  className="border-b border-slate-800/50 hover:bg-slate-800/20"
                >
                  <td className="px-4 py-3 text-slate-500 font-mono">{row.id}</td>
                  <td className="px-4 py-3">{row.clie}</td>
                  <td className="px-4 py-3 font-bold text-emerald-500/80">{row.estado}</td>
                  <td className="px-4 py-3 text-blue-400 font-mono">R$ {row.valor}</td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
      
      {completed && (
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 flex items-center gap-2 text-emerald-400 font-bold bg-emerald-900/20 px-4 py-2 rounded-full border border-emerald-500/30">
          <CheckCircle2 className="w-5 h-5" /> Sucesso! Resultado igual a: `SELECT * FROM Vendas WHERE estado = 'SP'`
        </motion.div>
      )}
    </div>
  );
}
