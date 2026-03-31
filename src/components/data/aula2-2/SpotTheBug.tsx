import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bug, CheckCircle2, Search } from 'lucide-react';

interface DataRow {
  id: number;
  product: string;
  category: string;
  price: string | number;
  date: string;
  stock: string | number;
  bugType?: string;
  isBug: boolean;
}

const INITIAL_DATA: DataRow[] = [
  { id: 101, product: 'Teclado Gamer', category: 'Periféricos', price: -45.00, date: '12/03/2024', stock: 15, isBug: true, bugType: 'Valor Negativo' },
  { id: 102, product: 'Mouse sem fio', category: 'Eletronicos', price: 89.90, date: '13/03/2024', stock: 42, isBug: true, bugType: 'Erro de Grafia' },
  { id: 103, product: 'Monitor 4K', category: 'Monitores', price: 2499.00, date: '31/02/2024', stock: 8, isBug: true, bugType: 'Data Inválida' },
  { id: 104, product: 'Cabo HDMI', category: 'Acessórios', price: 29.90, date: '15/03/2024', stock: 'abc', isBug: true, bugType: 'Tipo de Dado Incorreto' },
  { id: 105, product: 'Notebook Pro', category: 'Computadores', price: 9999999.00, date: '16/03/2024', stock: 3, isBug: true, bugType: 'Outlier (Valor Absurdo)' },
  { id: 106, product: 'NULL', category: 'Periféricos', price: 150.00, date: '17/03/2024', stock: 20, isBug: true, bugType: 'Valor Nulo/Ausente' },
  { id: 107, product: 'Smartphone X', category: 'Smart fone', price: 1200.00, date: '18/03/2024', stock: 12, isBug: true, bugType: 'Inconsistência de Categoria' },
  { id: 108, product: 'Headset RGB', category: 'Áudio', price: 350.00, date: '19/03/2024', stock: 1.5, isBug: true, bugType: 'Valor Decimal em Inteiro' },
  { id: 109, product: 'Webcam HD', category: 'Vídeo', price: 250.00, date: '20/03/2024', stock: 5, isBug: false },
  { id: 110, product: 'Suporte Articulado', category: 'Acessórios', price: 180.00, date: '21/03/2024', stock: 10, isBug: false },
];

export function SpotTheBug({ onComplete }: { onComplete?: () => void }) {
  const [foundBugs, setFoundBugs] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState<number | null>(null);
  const [isDone, setIsDone] = useState(false);

  const totalBugs = INITIAL_DATA.filter(d => d.isBug).length;

  const handleCellClick = (rowId: number, field: string) => {
    const row = INITIAL_DATA.find(r => r.id === rowId);
    if (!row) return;

    // Logic to check if the specific field is the bug for that row
    let isCorrectField = false;
    if (rowId === 101 && field === 'price') isCorrectField = true;
    if (rowId === 102 && field === 'category') isCorrectField = true;
    if (rowId === 103 && field === 'date') isCorrectField = true;
    if (rowId === 104 && field === 'stock') isCorrectField = true;
    if (rowId === 105 && field === 'price') isCorrectField = true;
    if (rowId === 106 && field === 'product') isCorrectField = true;
    if (rowId === 107 && field === 'category') isCorrectField = true;
    if (rowId === 108 && field === 'stock') isCorrectField = true;

    if (isCorrectField) {
      if (!foundBugs.includes(rowId)) {
        setFoundBugs([...foundBugs, rowId]);
      }
      setShowFeedback(rowId);
      setTimeout(() => setShowFeedback(null), 2000);
    }
  };

  useEffect(() => {
    if (foundBugs.length === totalBugs && !isDone) {
      setIsDone(true);
      if (onComplete) onComplete();
    }
  }, [foundBugs]);

  return (
    <div className="w-full bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="text-2xl font-black text-white flex items-center gap-3 justify-center md:justify-start">
            <Search className="w-6 h-6 text-amber-400" />
            Caçador de Inconsistências
          </h3>
          <p className="text-slate-400 text-sm">
            Encontre os <span className="text-amber-400 font-bold">{totalBugs} erros</span> de preenchimento na tabela abaixo. Clique na célula incorreta.
          </p>
        </div>
        
        <div className="bg-slate-950/50 px-6 py-3 rounded-2xl border border-slate-800 flex items-center gap-4">
           <div className="text-right">
              <div className="text-[10px] font-black tracking-widest text-slate-500 uppercase">Progresso</div>
              <div className="text-2xl font-mono font-black text-amber-400">{foundBugs.length} / {totalBugs}</div>
           </div>
           <div className="h-10 w-px bg-slate-800" />
           <Bug className={`w-8 h-8 ${foundBugs.length === totalBugs ? 'text-emerald-400' : 'text-amber-500/50'} transition-colors`} />
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/30">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="bg-slate-800/50 text-slate-300 font-bold uppercase text-[10px] tracking-widest">
              <th className="px-4 py-4 border-b border-slate-700">ID</th>
              <th className="px-4 py-4 border-b border-slate-700">Produto</th>
              <th className="px-4 py-4 border-b border-slate-700">Categoria</th>
              <th className="px-4 py-4 border-b border-slate-700">Preço (R$)</th>
              <th className="px-4 py-4 border-b border-slate-700">Data</th>
              <th className="px-4 py-4 border-b border-slate-700">Estoque</th>
            </tr>
          </thead>
          <tbody className="text-slate-300 font-mono">
            {INITIAL_DATA.map((row) => (
              <tr key={row.id} className="group hover:bg-white/5 transition-colors border-b border-slate-800/50">
                <td className="px-4 py-3 text-slate-600 text-xs">{row.id}</td>
                <td 
                  onClick={() => handleCellClick(row.id, 'product')}
                  className={`px-4 py-3 cursor-pointer transition-all ${foundBugs.includes(row.id) && row.id === 106 ? 'bg-emerald-500/10 text-emerald-400 font-bold' : ''} hover:bg-amber-500/10`}
                >
                  {row.product}
                </td>
                <td 
                  onClick={() => handleCellClick(row.id, 'category')}
                  className={`px-4 py-3 cursor-pointer transition-all ${foundBugs.includes(row.id) && (row.id === 102 || row.id === 107) ? 'bg-emerald-500/10 text-emerald-400 font-bold' : ''} hover:bg-amber-500/10`}
                >
                  {row.category}
                </td>
                <td 
                  onClick={() => handleCellClick(row.id, 'price')}
                  className={`px-4 py-3 cursor-pointer transition-all ${foundBugs.includes(row.id) && (row.id === 101 || row.id === 105) ? 'bg-emerald-500/10 text-emerald-400 font-bold' : ''} hover:bg-amber-500/10`}
                >
                  {typeof row.price === 'number' ? row.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : row.price}
                </td>
                <td 
                  onClick={() => handleCellClick(row.id, 'date')}
                  className={`px-4 py-3 cursor-pointer transition-all ${foundBugs.includes(row.id) && row.id === 103 ? 'bg-emerald-500/10 text-emerald-400 font-bold' : ''} hover:bg-amber-500/10`}
                >
                  {row.date}
                </td>
                <td 
                  onClick={() => handleCellClick(row.id, 'stock')}
                  className={`px-4 py-3 cursor-pointer transition-all ${foundBugs.includes(row.id) && (row.id === 104 || row.id === 108) ? 'bg-emerald-500/10 text-emerald-400 font-bold' : ''} hover:bg-amber-500/10`}
                >
                  {row.stock}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {showFeedback && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-4"
          >
            <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-emerald-400 font-bold text-sm">Erro Identificado!</div>
              <div className="text-emerald-200/60 text-xs">Tipo: {INITIAL_DATA.find(r => r.id === showFeedback)?.bugType}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isDone && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-8 p-6 bg-gradient-to-br from-emerald-900/40 to-slate-900 border border-emerald-500/30 rounded-3xl text-center"
        >
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
          <h4 className="text-xl font-bold text-white mb-2">Qualidade Assegurada!</h4>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Excelente! Você identificou todas as falhas críticas que poderiam corromper os relatórios de vendas. A atenção ao detalhe salvou o dashboard do mês.
          </p>
        </motion.div>
      )}

      {!isDone && foundBugs.length > 0 && (
        <div className="mt-6 flex justify-center gap-2 flex-wrap">
          {foundBugs.map(id => (
            <span key={id} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-slate-500 font-mono">
              Bug #{id} Resolvido
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
