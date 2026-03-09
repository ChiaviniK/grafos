import { useState } from "react";
import { GraphCanvas } from "../GraphCanvas";
import type { NodeData, EdgeData } from "../../types";
import { Eye, EyeOff } from "lucide-react";

const INITIAL_NODES: NodeData[] = [
  { id: "q0", label: "q0", x: 150, y: 150 },
  { id: "q1", label: "q1", x: 350, y: 100 },
  { id: "q2", label: "q2", x: 350, y: 250 },
];

const INITIAL_EDGES: EdgeData[] = [
  { id: "e1", source: "q0", target: "q1", directed: true, label: "a" },
  { id: "e2", source: "q0", target: "q0", directed: true, label: "b" },
  { id: "e3", source: "q1", target: "q1", directed: true, label: "a" },
  { id: "e4", source: "q1", target: "q2", directed: true, label: "b" },
  { id: "e5", source: "q2", target: "q1", directed: true, label: "a" },
  { id: "e6", source: "q2", target: "q0", directed: true, label: "b" },
];

export function Slide12() {
  const [showGraph, setShowGraph] = useState(false);

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      <div className="flex flex-col mb-6">
         <h2 className="text-3xl font-bold mb-4 tracking-tight">12. Tabela de Transição ↔ Grafo</h2>
         <p className="text-slate-300 text-lg max-w-4xl">
           Outra forma de representar a função de transição <strong className="text-amber-400">δ</strong> é usando uma <strong>Tabela</strong>. 
           Os computadores preferem tabelas (matrizes), enquanto nós humanos preferimos o grafo visual. 
           Eles são perfeitamente equivalentes.
         </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
        {/* Tabela View */}
        <div className="flex flex-col items-center justify-center bg-slate-800/40 rounded-2xl border border-slate-700/50 p-6 shadow-inner">
           <h3 className="text-xl font-semibold text-slate-100 mb-6">Tabela δ (Delta)</h3>
           <div className="w-full max-w-sm rounded-xl overflow-hidden border border-slate-600 shadow-xl">
              <table className="w-full text-center">
                <thead className="bg-slate-700 text-white font-bold text-lg">
                  <tr>
                    <th className="py-4 border-r border-slate-600/50">Estado</th>
                    <th className="py-4 text-emerald-400">a</th>
                    <th className="py-4 text-blue-400">b</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-600/50 text-slate-200 bg-slate-800">
                  <tr className="hover:bg-slate-700 transition-colors">
                    <td className="py-4 font-mono font-bold border-r border-slate-600/50">→ q0</td>
                    <td className="py-4">q1</td>
                    <td className="py-4">q0</td>
                  </tr>
                  <tr className="hover:bg-slate-700 transition-colors bg-slate-800/50">
                    <td className="py-4 font-mono font-bold border-r border-slate-600/50">q1</td>
                    <td className="py-4">q1</td>
                    <td className="py-4">q2</td>
                  </tr>
                  <tr className="hover:bg-slate-700 transition-colors">
                    <td className="py-4 font-mono font-bold border-r border-slate-600/50">* q2</td>
                    <td className="py-4">q1</td>
                    <td className="py-4">q0</td>
                  </tr>
                </tbody>
              </table>
           </div>
           
           <div className="mt-8 bg-blue-900/20 p-4 border border-blue-500/20 rounded-xl text-blue-200 text-sm max-w-sm">
             <strong>Exercício (20 min):</strong> Olhando apenas para a tabela acima, pegue papel e caneta e tente desenhar o grafo correspondente!
           </div>
        </div>

        {/* Graph Result */}
        <div className="flex flex-col min-h-[400px]">
          <div className="flex justify-between items-center mb-4">
             <h3 className="text-xl font-semibold text-slate-100">Grafo Resultante</h3>
             <button
                onClick={() => setShowGraph(!showGraph)}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-md active:scale-95"
             >
                {showGraph ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showGraph ? "Ocultar Resposta" : "Revelar Resposta"}
             </button>
          </div>
          
          <div className={`flex-1 w-full bg-slate-800/80 rounded-2xl border ${showGraph ? 'border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.1)]' : 'border-slate-700/50'} overflow-hidden relative transition-all duration-700`}>
            {showGraph ? (
              <div className="absolute inset-0 animate-in zoom-in-95 duration-500">
                 <GraphCanvas initialNodes={INITIAL_NODES} initialEdges={INITIAL_EDGES} />
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="text-slate-500 font-medium flex flex-col items-center gap-3">
                   <EyeOff className="w-10 h-10 opacity-50" />
                   <span>O grafo está oculto para a turma tentar resolver.</span>
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
