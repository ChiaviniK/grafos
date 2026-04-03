import { useState } from "react";
import { History, Save, GitBranch } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Version {
  id: string;
  timestamp: string;
  author: string;
  message: string;
  content: string;
  changes: string;
}

const VERSIONS: Version[] = [
  {
    id: "v1",
    timestamp: "10:00",
    author: "Luiz",
    message: "Início do projeto",
    content: "Relatório de Vendas 2024\n\nTotal: 1000",
    changes: "+ Criado arquivo base"
  },
  {
    id: "v2",
    timestamp: "11:30",
    author: "Ana",
    message: "Adicionado dados Regionais",
    content: "Relatório de Vendas 2024\n\nTotal: 1500\n- Sul: 500\n- Norte: 1000",
    changes: "+ Adicionado Sul e Norte"
  },
  {
    id: "v3",
    timestamp: "14:15",
    author: "Carlos",
    message: "Oops! Erro no cálculo",
    content: "Relatório de Vendas 2024\n\nTotal: 500\n- Sul: 200\n- Norte: 300",
    changes: "⚠ Alterado valores (Errado!)"
  },
  {
    id: "v4",
    timestamp: "16:00",
    author: "Luiz",
    message: "Revertendo erro do Carlos",
    content: "Relatório de Vendas 2024\n\nTotal: 1500\n- Sul: 500\n- Norte: 1000",
    changes: "↺ Revertido para v2"
  }
];

export function VersionVisualizer() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const current = VERSIONS[currentIdx];

  return (
    <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-700">
      {/* Sidebar: History */}
      <div className="lg:col-span-4 space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <History className="w-5 h-5 text-emerald-400" />
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-300">Histórico de Versões</h3>
        </div>
        <div className="space-y-2 relative">
           <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-slate-800" />
           {VERSIONS.map((v, i) => (
              <button
                 key={v.id}
                 onClick={() => setCurrentIdx(i)}
                 className={`relative z-10 w-full flex items-center gap-4 p-4 rounded-2xl transition-all border ${
                    currentIdx === i 
                    ? "bg-emerald-500/10 border-emerald-500/50 scale-[1.02]" 
                    : "bg-slate-900/50 border-slate-800 opacity-60 hover:opacity-100"
                 }`}
              >
                 <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-4 border-slate-950 ${
                    currentIdx === i ? "bg-emerald-500 text-slate-950" : "bg-slate-800 text-slate-500"
                 }`}>
                    {currentIdx === i ? <Save className="w-5 h-5" /> : <div className="text-[10px] font-black">{v.timestamp}</div>}
                 </div>
                 <div className="text-left">
                    <div className="text-xs font-bold text-white leading-tight">{v.message}</div>
                    <div className="text-[10px] text-slate-500 mt-1 uppercase tracking-tighter">Por {v.author}</div>
                 </div>
              </button>
           ))}
        </div>
      </div>

      {/* Main: Content Viewer */}
      <div className="lg:col-span-8 flex flex-col gap-4">
        <div className="bg-[#1e1e1e] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex-1 flex flex-col">
           <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex gap-2">
                 <div className="w-3 h-3 rounded-full bg-slate-700" />
                 <div className="w-3 h-3 rounded-full bg-slate-700" />
              </div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Relatorio_Vendas_v{currentIdx + 1}.txt</span>
           </div>
           
           <div className="p-10 font-mono text-sm min-h-[300px] relative overflow-hidden">
              <AnimatePresence mode="wait">
                 <motion.div
                    key={current.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="whitespace-pre-wrap text-emerald-100"
                 >
                    {current.content}
                 </motion.div>
              </AnimatePresence>

              {/* Diff highlight */}
              <div className="absolute bottom-6 left-6 right-6">
                 <div className={`p-4 rounded-xl text-[10px] font-bold uppercase tracking-widest border ${
                    currentIdx === 2 ? "bg-rose-500/10 border-rose-500/30 text-rose-400" : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                 }`}>
                    {current.changes}
                 </div>
              </div>
           </div>
        </div>

        {/* Action / Context */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl">
           <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                 <GitBranch className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                 <h4 className="text-sm font-black text-white uppercase tracking-widest">A Mágica do Tempo</h4>
                 <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Percebeu como o Luiz conseguiu salvar o projeto na versão 4? <span className="text-emerald-400 font-bold">Sem controle de versao</span>, ele teria que torcer para que ninguém tivesse salvado por cima do "Relatorio_v2_FINAL_copia_2.docx".
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
