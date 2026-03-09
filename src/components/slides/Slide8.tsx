import { GraphCanvas } from "../GraphCanvas";
import type { NodeData, EdgeData } from "../../types";

// Automaton that accepts words ending in "ab"
const INITIAL_NODES: NodeData[] = [
  { id: "q0", label: "q0 (-)", x: 150, y: 200 },
  { id: "q1", label: "q1", x: 350, y: 150 },
  { id: "q2", label: "q2 (+)", x: 550, y: 200, highlighted: true },
];

const INITIAL_EDGES: EdgeData[] = [
  { id: "e1", source: "q0", target: "q0", directed: true, label: "b" },
  { id: "e2", source: "q0", target: "q1", directed: true, label: "a" },
  { id: "e3", source: "q1", target: "q1", directed: true, label: "a" },
  { id: "e4", source: "q1", target: "q2", directed: true, label: "b" },
  { id: "e5", source: "q2", target: "q1", directed: true, label: "a" },
  { id: "e6", source: "q2", target: "q0", directed: true, label: "b" },
];

export function Slide8() {
  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      <div className="flex flex-col mb-6">
        <h2 className="text-3xl font-bold mb-4 tracking-tight">5. Autômatos como Grafos (AFD)</h2>
        <p className="text-slate-300 text-lg mb-6 max-w-4xl">
          Um <strong>Autômato Finito Determinístico (AFD)</strong> é a representação matemática de uma máquina de estados simples. 
          Formalmente, é definido por 5 elementos: <strong className="text-purple-400 font-mono text-xl bg-purple-900/20 px-2 py-0.5 rounded">M = (Q, Σ, δ, q0, F)</strong>.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-slate-800/50 rounded-xl border border-slate-700 p-4 shadow-sm flex flex-col justify-center">
             <h3 className="text-lg font-semibold text-slate-100 mb-4 border-b border-slate-700 pb-2">Os 5 Elementos Formais:</h3>
             <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-blue-900/50 text-blue-400 flex items-center justify-center font-bold font-mono border border-blue-700/50">Q</div>
                  <span className="text-slate-300">Conjunto finito de <strong>Estados</strong>. (Ex: q0, q1, q2)</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-emerald-900/50 text-emerald-400 flex items-center justify-center font-bold font-serif border border-emerald-700/50 text-xl">Σ</div>
                  <span className="text-slate-300"><strong>Alfabeto</strong> (símbolos de entrada). (Ex: a, b)</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-amber-900/50 text-amber-400 flex items-center justify-center font-bold font-serif border border-amber-700/50 text-xl">δ</div>
                  <span className="text-slate-300">Função de <strong>Transição</strong> (As setas/arestas).</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-slate-700 text-slate-200 flex items-center justify-center font-bold font-mono border border-slate-600">q0</div>
                  <span className="text-slate-300">Estado <strong>Inicial</strong> por onde começamos.</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-purple-900/50 text-purple-400 flex items-center justify-center font-bold font-mono border border-purple-700/50">F</div>
                  <span className="text-slate-300">Conjunto de estados <strong>Finais</strong> (de aceitação).</span>
                </li>
             </ul>
          </div>
          
          <div className="lg:col-span-7 flex flex-col">
            <h3 className="text-lg font-semibold text-slate-100 mb-2">Exemplo: Linguagem que termina com "ab"</h3>
            <p className="text-slate-400 text-sm mb-4">Veja como a função de transição δ mapeia exatamente os caminhos do grafo para cada letra (a,b).</p>
            <div className="flex-1 min-h-[350px] w-full bg-slate-800/80 rounded-2xl border border-slate-700/50 overflow-hidden relative shadow-inner">
              <GraphCanvas initialNodes={INITIAL_NODES} initialEdges={INITIAL_EDGES} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
