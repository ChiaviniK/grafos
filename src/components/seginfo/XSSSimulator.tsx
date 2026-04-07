import { useState } from 'react';
import { Search, Bug, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface XSSSimulatorProps {
  onComplete?: (score: number) => void;
}

export function XSSSimulator({ onComplete }: XSSSimulatorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [submittedTerm, setSubmittedTerm] = useState('');
  const [alertTriggered, setAlertTriggered] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedTerm(searchTerm);
    setAlertTriggered(null);

    // XSS Evaluation logic
    if (searchTerm.includes('<script>') || searchTerm.includes('javascript:')) {
      // Small delay to simulate the "DOM rendering"
      setTimeout(() => {
         setAlertTriggered("Cookie: session_id=abc123hack3d; isAdmin=true; document.cookie");
         setCompleted(true);
         if (onComplete) onComplete(20);
      }, 500);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
       
       <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex justify-between items-center shadow-xl">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
               <Bug className="w-5 h-5 text-indigo-400" /> Reflected XSS
            </h3>
            <p className="text-slate-400 text-sm mt-1">Injete um payload malicioso no campo de busca para disparar um alerta e roubar cookies.</p>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-500 font-mono">
             Dica: <code className="text-rose-400">&lt;script&gt;alert(document.cookie)&lt;/script&gt;</code>
          </div>
       </div>

       {/* "E-commerce" Simulation Panel */}
       <div className="bg-white rounded-3xl overflow-hidden shadow-2xl relative">
          
          {/* Faux Browser Header */}
          <div className="bg-slate-100 border-b border-slate-200 px-4 py-3 flex gap-2 items-center">
             <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
             </div>
             <div className="mx-auto bg-white rounded-md px-3 border border-slate-200 text-[10px] text-slate-500 font-mono w-64 text-center">
                loja-vulneravel.com.br/search?q=
             </div>
          </div>

          {/* Dummy Ecommerce Content */}
          <div className="p-8 bg-slate-50 h-80 relative">
             <div className="max-w-md mx-auto relative z-0">
                 <h1 className="text-2xl font-black text-slate-800 mb-6 text-center tracking-tighter">Buscar Produtos</h1>
                 
                 <form onSubmit={handleSearch} className="flex gap-2">
                    <input 
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-1 bg-white border-2 border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-indigo-500 transition-colors"
                      placeholder="Busque por sapatos, celulares..."
                    />
                    <button type="submit" className="bg-slate-800 hover:bg-slate-700 text-white px-6 rounded-xl font-bold transition-colors shadow-lg">
                       <Search className="w-5 h-5" />
                    </button>
                 </form>

                 <div className="mt-8">
                    {submittedTerm && !alertTriggered && (
                       <p className="text-slate-600 text-sm">
                          {/* Em um cenário real vulnerável, o PHP faz: echo "Resultados para: " . $_GET['q']; */}
                          Resultados da pesquisa para: <span className="font-bold text-rose-500">{submittedTerm}</span>
                       </p>
                    )}
                 </div>
             </div>

             {/* The Fake Javascript Alert */}
             <AnimatePresence>
               {alertTriggered && (
                 <motion.div 
                   initial={{ scale: 0.9, opacity: 0, y: 20 }}
                   animate={{ scale: 1, opacity: 1, y: 0 }}
                   className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md border border-slate-200 shadow-2xl rounded-2xl w-80 overflow-hidden z-50"
                 >
                    <div className="bg-slate-100 p-3 border-b border-slate-200 text-xs font-bold text-slate-700 flex justify-between">
                       loja-vulneravel.com.br diz:
                    </div>
                    <div className="p-6 font-mono text-xs text-rose-600 break-words">
                       {alertTriggered}
                    </div>
                    <div className="p-4 flex justify-end border-t border-slate-100">
                       <button onClick={() => setAlertTriggered(null)} className="bg-indigo-600 text-white px-4 py-1.5 rounded-lg text-sm font-bold shadow-md">OK</button>
                    </div>
                 </motion.div>
               )}
             </AnimatePresence>
             
          </div>
       </div>

       {/* Completion State */}
       {completed && (
         <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold p-4 rounded-xl flex items-center justify-center gap-3">
            <CheckCircle2 className="w-5 h-5" /> EXPLORAÇÃO XSS CONCLUÍDA (20 pts)
         </motion.div>
       )}

    </div>
  );
}
