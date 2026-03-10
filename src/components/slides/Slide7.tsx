import { GraphCanvas } from "../GraphCanvas";
import type { NodeData, EdgeData } from "../../types";

const INITIAL_NODES: NodeData[] = [
  { id: "q0", label: "q0 (Inicial)", x: 200, y: 200 },
  { id: "q1", label: "q1", x: 400, y: 200 },
  { id: "q2", label: "q2 (Final)", x: 600, y: 200, highlighted: true },
];

const INITIAL_EDGES: EdgeData[] = [
  { id: "e1", source: "q0", target: "q1", directed: true, label: "a" },
  { id: "e2", source: "q1", target: "q2", directed: true, label: "b" },
];

export function Slide7() {
  return (
    <div className="flex flex-col min-h-[100%] flex-1 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
        <div>
           <h2 className="text-3xl font-bold mb-4 tracking-tight">7. Conceito Formal Formal de Grafo</h2>
           <p className="text-slate-300 text-lg mb-6">
            A Teoria dos Grafos fornece a base matemática para desenharmos autômatos. 
            Um grafo é formalmente definido como <strong className="text-blue-400">G = (V, E)</strong>.
          </p>

          <div className="overflow-x-auto bg-slate-800/80 rounded-xl border border-slate-700/80 mb-6">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-900/50 font-semibold border-b border-slate-700/80">
                <tr>
                  <th className="px-4 py-3 text-slate-200">Elemento em Grafo</th>
                  <th className="px-4 py-3 text-slate-200">Significado em Autômatos</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                <tr className="hover:bg-slate-800 transition-colors">
                  <td className="px-4 py-3 text-blue-400 font-mono font-bold">V (Vértices/Nós)</td>
                  <td className="px-4 py-3 text-slate-300">Estados (q0, q1, ...)</td>
                </tr>
                <tr className="hover:bg-slate-800 transition-colors">
                  <td className="px-4 py-3 text-emerald-400 font-mono font-bold">E (Arestas)</td>
                  <td className="px-4 py-3 text-slate-300">Transições</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700 shadow-sm">
             <h3 className="font-semibold text-slate-200 mb-3">Conceitos Visuais Chaves:</h3>
             <ul className="space-y-2 text-slate-300 text-sm list-disc list-inside">
                <li><strong className="text-white">Estado Inicial:</strong> Por onde o fluxo começa (q0). Geralmente apontado por uma seta que vem do nada.</li>
                <li><strong className="text-white">Estado Final / Aceitação:</strong> Indica que a palavra obedeceu a regra (q2). Representado por círculo duplo ou cor destaque (verde).</li>
                <li><strong className="text-white">Rótulos das Arestas:</strong> A letra/símbolo que consumimos da palavra para pular de um estado para o outro.</li>
             </ul>
          </div>

        </div>

        <div className="flex flex-col">
          <h3 className="text-xl font-semibold text-slate-100 mb-3 border-b border-slate-700 pb-2">Exemplo Simples (q0 → q1 → q2)</h3>
          <div className="flex-1 min-h-[400px] w-full bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden relative shadow-inner">
            <GraphCanvas initialNodes={INITIAL_NODES} initialEdges={INITIAL_EDGES} />
          </div>
        </div>
      </div>
    </div>
  );
}
