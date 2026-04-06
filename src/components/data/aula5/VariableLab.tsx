import { useState } from "react";
import { Box, Hash, Type, Layout, Trash2, ArrowRight, Save, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Types ---
type DataType = "number" | "string";

interface DataItem {
  id: string;
  type: DataType;
  value: string | number;
}

interface Variable {
  id: string;
  name: string;
  value: DataItem | null;
}

const DATA_PALETTE: DataItem[] = [
  { id: "d1", type: "number", value: 42 },
  { id: "d2", type: "number", value: 100 },
  { id: "d3", type: "string", value: '"Analista"' },
  { id: "d4", type: "string", value: '"Generation"' },
  { id: "d5", type: "number", value: 7.5 },
  { id: "d6", type: "string", value: '"Sucesso"' },
];

export function VariableLab() {
  const [variables, setVariables] = useState<Variable[]>([
    { id: "v1", name: "pontuacao", value: null },
    { id: "v2", name: "nome_usuario", value: null },
    { id: "v3", name: "meta_diaria", value: null },
  ]);

  const [dragItem, setDragItem] = useState<DataItem | null>(null);

  const assignValue = (varId: string, item: DataItem) => {
    setVariables(vars => vars.map(v => 
      v.id === varId ? { ...v, value: item } : v
    ));
    setDragItem(null);
  };

  const clearVar = (varId: string) => {
    setVariables(vars => vars.map(v => 
      v.id === varId ? { ...v, value: null } : v
    ));
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-10 font-sans">
      {/* Introduction */}
      <div className="text-center space-y-2">
         <p className="text-slate-400 text-sm italic">Imagine que variáveis são gavetas com etiquetas. Para guardar algo nelas, usamos o sinal de <strong>=</strong> (atribuição).</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Left: Data Palette */}
         <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-[2.5rem] p-6 shadow-2xl">
            <h3 className="text-xs font-black text-rose-400 uppercase tracking-widest mb-6 flex items-center gap-2">
               <Layout className="w-4 h-4" /> Valores (Data)
            </h3>
            <div className="grid grid-cols-1 gap-3">
               {DATA_PALETTE.map(item => (
                 <div
                   key={item.id}
                   draggable
                   onDragStart={() => setDragItem(item)}
                   className={`p-4 rounded-2xl border-2 cursor-grab active:cursor-grabbing transition-all flex items-center gap-3 group
                     ${item.type === "number" ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'}
                     hover:scale-105 hover:bg-slate-800`}
                 >
                    {item.type === "number" ? <Hash className="w-4 h-4 opacity-50" /> : <Type className="w-4 h-4 opacity-50" />}
                    <span className="font-mono font-bold text-sm tracking-tighter">{item.value}</span>
                 </div>
               ))}
            </div>
            <div className="mt-8 p-4 bg-slate-950/60 rounded-xl border border-slate-800">
               <p className="text-[10px] text-slate-500 leading-relaxed font-bold">Dica: Arraste os valores para dentro das "caixas" de variáveis ao lado!</p>
            </div>
         </div>

         {/* Middle: Variables Workspace */}
         <div className="lg:col-span-6 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-10 min-h-[400px] shadow-2xl relative overflow-hidden">
               <div className="absolute inset-0 pointer-events-none opacity-5" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
               
               <div className="space-y-8 relative z-10">
                  {variables.map((v) => (
                    <div
                      key={v.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => dragItem && assignValue(v.id, dragItem)}
                      className={`group relative flex items-center gap-6 p-6 rounded-3xl border-2 border-dashed transition-all
                        ${v.value ? 'bg-slate-800/80 border-slate-600' : 'bg-slate-900/40 border-slate-800 hover:border-rose-500/30'}
                        ${dragItem ? 'scale-[1.02] shadow-[0_0_30px_rgba(244,63,94,0.1)]' : ''}`}
                    >
                       {/* Label */}
                       <div className="flex flex-col gap-1 w-32">
                          <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Nome:</span>
                          <span className="text-white font-mono font-black text-base truncate">{v.name}</span>
                       </div>

                       <div className="text-slate-600 font-black text-2xl group-hover:text-rose-500 transition-colors"> = </div>

                       {/* Content Slot / Box */}
                       <div className="flex-1 flex items-center justify-center">
                          <AnimatePresence mode="wait">
                             {v.value ? (
                               <motion.div
                                 key={v.value.id}
                                 initial={{ scale: 0.5, opacity: 0 }}
                                 animate={{ scale: 1, opacity: 1 }}
                                 exit={{ scale: 0.5, opacity: 0 }}
                                 className={`w-full max-w-[200px] p-4 rounded-xl border shadow-lg flex items-center justify-between
                                   ${v.value.type === "number" ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-emerald-600 border-emerald-400 text-white'}`}
                               >
                                  <div className="flex items-center gap-3">
                                     {v.value.type === "number" ? <Hash className="w-5 h-5 opacity-70" /> : <Type className="w-5 h-5 opacity-70" />}
                                     <span className="font-mono font-black">{v.value.value}</span>
                                  </div>
                                  <button onClick={() => clearVar(v.id)} className="text-white/40 hover:text-white transition-colors">
                                     <Trash2 className="w-4 h-4" />
                                  </button>
                               </motion.div>
                             ) : (
                               <div className="flex items-center gap-3 text-slate-700 animate-pulse">
                                  <Box className="w-8 h-8" />
                                  <span className="text-[10px] font-black uppercase tracking-widest">Vazio</span>
                               </div>
                             )}
                          </AnimatePresence>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Right: Output / Inspector */}
         <div className="lg:col-span-3 space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-[2.5rem] p-6 h-full shadow-2xl font-mono flex flex-col">
               <div className="flex items-center gap-2 text-rose-400 mb-6">
                  <Save className="w-4 h-4" />
                  <h3 className="text-xs font-black uppercase tracking-widest">Estado da Memória</h3>
               </div>
               
               <div className="flex-1 space-y-4">
                  {variables.map(v => (
                    <div key={v.id} className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col gap-1">
                       <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{v.name}</span>
                       <div className="flex justify-between items-center">
                          <span className={`${v.value ? 'text-blue-400' : 'text-slate-800'} font-bold`}>
                             {v.value ? v.value.value : 'undefined'}
                          </span>
                          {v.value && (
                             <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-500 uppercase font-black">
                                {v.value.type}
                             </span>
                          )}
                       </div>
                    </div>
                  ))}
               </div>

               <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col gap-4">
                  <button className="w-full py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-xl transition-all">
                     <Play className="w-4 h-4 text-rose-500 fill-rose-500" /> Testar Script
                  </button>
                  <p className="text-[9px] text-slate-500 italic leading-relaxed text-center">
                     (O simulador está rodando no console ảo)
                  </p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
