import { useState } from "react";
import { GraphCanvas } from "../GraphCanvas";
import type { NodeData, EdgeData } from "../../types";
import { Twitter, Facebook } from "lucide-react";

const INITIAL_NODES: NodeData[] = [
  { id: "A", label: "Alice", x: 350, y: 100 },
  { id: "B", label: "Bob", x: 150, y: 250 },
  { id: "C", label: "Carlos", x: 550, y: 250 },
];

const DIRECTED_EDGES: EdgeData[] = [
  { id: "e1", source: "A", target: "B", directed: true }, // Alice follows Bob
  { id: "e2", source: "B", target: "C", directed: true }, // Bob follows Carol
  { id: "e3", source: "C", target: "A", directed: true }, // Carol follows Alice
];

const UNDIRECTED_EDGES: EdgeData[] = [
  { id: "e1", source: "A", target: "B", directed: false }, // Alice is friends with Bob
  { id: "e2", source: "B", target: "C", directed: false }, // Bob is friends with Carol
];

export function Slide6() {
  const [isDirected, setIsDirected] = useState(true);

  return (
    <div className="flex flex-col min-h-[100%] flex-1 animate-in fade-in duration-500">
      <div className="flex flex-col mb-4">
        <h2 className="text-3xl font-bold mb-2 tracking-tight">6. Redes Sociais e a Direção do Grafo</h2>
        <p className="text-slate-300">
          Grafos servem para modelar <strong>Relações</strong>. Uma das divisões mais importantes dos grafos é se suas arestas/conexões possuem uma "mão única" ou "mão dupla".
        </p>
      </div>

      <div className="flex bg-slate-800/80 p-2 rounded-xl border border-slate-700 w-fit mx-auto mb-8 shadow-sm">
        <button
          onClick={() => setIsDirected(true)}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
            isDirected 
              ? 'bg-blue-600/20 text-blue-400 border border-blue-500/50 shadow-sm' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 border border-transparent'
          }`}
        >
          <Twitter className="w-5 h-5" />
          Twitter / Instagram (Direcionado)
        </button>
        <button
          onClick={() => setIsDirected(false)}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
            !isDirected 
              ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/50 shadow-sm' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 border border-transparent'
          }`}
        >
          <Facebook className="w-5 h-5" />
          Facebook / WhatsApp (Não Direcionado)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 mb-8">
        <div className="bg-slate-800/50 rounded-2xl border border-slate-700/80 p-6 shadow-sm flex flex-col justify-center">
          {isDirected ? (
            <div className="animate-in fade-in slide-in-from-left-4 duration-500">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">Grafo Direcionado</h3>
              <p className="text-slate-300 mb-6 text-lg leading-relaxed">
                As conexões possuem um rumo específico (as setas importam). 
              </p>
              <div className="bg-slate-900/50 p-4 border border-slate-700 rounded-xl space-y-3">
                <p className="text-blue-200 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <strong>Linguagem:</strong> Autômatos são estritamente direcionados. O tempo / palavra flui para frente.
                </p>
                <p className="text-blue-200 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <strong>Rede Social:</strong> Alice segue o Bob inspirada pelos posts dele, mas o Bob não segue Alice de volta.
                </p>
              </div>
            </div>
          ) : (
             <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h3 className="text-2xl font-bold mb-4 text-emerald-400">Grafo Não Direcionado</h3>
              <p className="text-slate-300 mb-6 text-lg leading-relaxed">
                As relações são mutualmente bidirecionais por natureza. É o equivalente a uma "mão dupla" ou "linha reta" sem ponta.
              </p>
              <div className="bg-slate-900/50 p-4 border border-slate-700 rounded-xl space-y-3">
                <p className="text-emerald-200 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <strong>Linguagem:</strong> Raramente usados em Teoria da Computação básica. Mais úteis em roteamento de internet e mapas reais.
                </p>
                <p className="text-emerald-200 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <strong>Rede Social:</strong> Se Alice é amiga de Bob no Facebook, Bob é obrigatoriamente amigo numérico da Alice.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <div className="flex-1 min-h-[400px] w-full bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden relative shadow-inner">
            <GraphCanvas 
               key={isDirected ? "dir" : "undir"} 
               initialNodes={INITIAL_NODES} 
               initialEdges={isDirected ? DIRECTED_EDGES : UNDIRECTED_EDGES} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
