import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Table, Play, TrendingDown, FileSpreadsheet, Lock, CheckCircle2 } from 'lucide-react';

export function SqlExcelLab() {
  const [activeTab, setActiveTab] = useState<'sql' | 'excel'>('sql');
  const [queryRun, setQueryRun] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const mockData = [
    { id: 1, month: 'Jan', region: 'North', product: 'GenPhone X', units: 1200, status: 'OK' },
    { id: 2, month: 'Feb', region: 'North', product: 'GenPhone X', units: 1350, status: 'OK' },
    { id: 3, month: 'Mar', region: 'North', product: 'GenPhone X', units: 1100, status: 'OK' },
    { id: 4, month: 'Apr', region: 'North', product: 'GenPhone X', units: 400, status: 'DROP' },
    { id: 5, month: 'May', region: 'North', product: 'GenPhone X', units: 350, status: 'DROP' },
  ];

  const handleRunQuery = () => {
    setQueryRun(true);
    setTimeout(() => setActiveTab('excel'), 1500);
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl font-sans">
      <div className="flex border-b border-slate-800 bg-slate-950/50">
        <button
          onClick={() => setActiveTab('sql')}
          className={`flex items-center gap-2 px-6 py-4 font-bold text-sm tracking-wide transition-colors ${activeTab === 'sql' ? 'text-blue-400 border-b-2 border-blue-400 bg-blue-400/5' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <Database className="w-4 h-4" /> SQL Engine
        </button>
        <button
          onClick={() => {
            if (queryRun) setActiveTab('excel');
          }}
          className={`flex items-center gap-2 px-6 py-4 font-bold text-sm tracking-wide transition-colors ${activeTab === 'excel' ? 'text-emerald-400 border-b-2 border-emerald-400 bg-emerald-400/5' : 'text-slate-500 hover:text-slate-300'} ${!queryRun && 'cursor-not-allowed opacity-50'}`}
        >
          {queryRun ? <FileSpreadsheet className="w-4 h-4" /> : <Lock className="w-4 h-4" />} Analisador Excel
        </button>
      </div>

      <div className="p-6 md:p-8 min-h-[400px] relative">
        <AnimatePresence mode="wait">
          {activeTab === 'sql' ? (
            <motion.div
              key="sql"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 font-mono text-sm shadow-inner relative group">
                <div className="absolute top-4 right-4 text-slate-500 text-xs">query.sql</div>
                <div className="text-blue-400">SELECT</div>
                <div className="text-white ml-4">month, region, units</div>
                <div className="text-blue-400">FROM</div>
                <div className="text-emerald-300 ml-4">sales_data</div>
                <div className="text-blue-400">WHERE</div>
                <div className="text-yellow-300 ml-4">product = <span className="text-orange-300">'GenPhone X'</span></div>
                <div className="text-yellow-300 ml-4">AND region = <span className="text-orange-300">'North'</span></div>
                <div className="text-blue-400">ORDER BY</div>
                <div className="text-white ml-4">month ASC;</div>
              </div>

              <div className="flex justify-between items-center bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl">
                <p className="text-blue-200 text-sm">Passo 1: Extrair dados do banco corporativo para isolar o problema da região Norte.</p>
                <button
                  onClick={handleRunQuery}
                  disabled={queryRun}
                  className="bg-blue-500 hover:bg-blue-400 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {queryRun ? 'EXTRAÍDO ✓' : <><Play className="w-4 h-4" /> RUN QUERY</>}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="excel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl overflow-hidden border border-slate-300 shadow-sm text-slate-800">
                <div className="bg-emerald-600 text-white p-2 flex items-center gap-2 text-xs font-bold font-sans">
                  <Table className="w-4 h-4" /> NORTH_REGION_SALES.xlsx
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-100 text-slate-600 border-b border-slate-300 font-bold uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="px-4 py-3 border-r border-slate-200 w-12 text-center text-slate-400 bg-slate-50">#</th>
                        <th className="px-4 py-3 border-r border-slate-200">Month</th>
                        <th className="px-4 py-3 border-r border-slate-200">Product</th>
                        <th className="px-4 py-3 border-r border-slate-200 text-right">Units Sold</th>
                        <th className="px-4 py-3">Trend</th>
                      </tr>
                    </thead>
                    <tbody className="font-mono">
                      {mockData.map((row, idx) => (
                        <tr key={row.id} className="border-b border-slate-200 hover:bg-emerald-50">
                          <td className="px-4 py-2 border-r border-slate-200 text-center text-slate-400 bg-slate-50 font-sans text-xs">{idx + 1}</td>
                          <td className="px-4 py-2 border-r border-slate-200">{row.month}</td>
                          <td className="px-4 py-2 border-r border-slate-200">{row.product}</td>
                          <td className={`px-4 py-2 border-r border-slate-200 text-right ${analyzed && row.status === 'DROP' ? 'text-red-600 font-bold bg-red-50' : ''}`}>
                            {row.units}
                          </td>
                          <td className="px-4 py-2">
                             {analyzed && row.status === 'DROP' ? <span className="text-red-500 font-bold flex items-center gap-1"><TrendingDown className="w-4 h-4" /> Queda drástica</span> : <span className="text-slate-400">-</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {!analyzed ? (
                <div className="flex justify-center mt-6">
                   <button 
                     onClick={() => setAnalyzed(true)}
                     className="bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-3 rounded-full font-bold shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all flex items-center gap-2"
                   >
                     APLICAR FORMATAÇÃO CONDICIONAL (ENCONTRAR PADRÃO)
                   </button>
                </div>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-emerald-800 font-bold mb-1">Problema Identificado (Etapa 1)</h4>
                    <p className="text-emerald-700 text-sm">A partir de Abril, as vendas na região Norte despencaram de 1100 para 400. O SQL extraiu os dados brutos e o Excel permitiu visualizar o problema rapidamente!</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
