import { GraphCanvas } from "../GraphCanvas";
import type { NodeData, EdgeData } from "../../types";
import { Lock, FileCode, CheckCircle2 } from "lucide-react";

const INITIAL_NODES: NodeData[] = [
  { id: "q0", label: "q0", x: 150, y: 200 },
  { id: "q1", label: "q1", x: 300, y: 100 },
  { id: "q2", label: "q2", x: 450, y: 200, highlighted: true },
];

const INITIAL_EDGES: EdgeData[] = [
  { id: "e1", source: "q0", target: "q1", directed: true, label: "'a'" },
  { id: "e2", source: "q1", target: "q2", directed: true, label: "'b'" },
  { id: "e3", source: "q2", target: "q2", directed: true, label: "0-9" },
];

export function Slide1() {
  return (
    <div className="flex flex-col min-h-[100%] flex-1 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-4 tracking-tight">1. Introdução e Motivação</h2>
          <p className="text-slate-300 text-lg mb-6">
            O que são <strong>Linguagens Formais</strong> e <strong>Máquinas de Estados</strong>? 
            Em Ciência da Computação, precisamos de modelos matemáticos precisos para definir o que um computador pode reconhecer e processar.
          </p>
          
          <h3 className="text-xl font-semibold text-slate-100 mb-3 border-b border-slate-700 pb-2">Onde isso aparece na prática?</h3>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-3 text-slate-300 bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
              <FileCode className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <span><strong>Compiladores:</strong> Analisam o código-fonte (C, Java, Python) e verificam se as regras sintáticas estão corretas.</span>
            </li>
            <li className="flex items-start gap-3 text-slate-300 bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
              <Lock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Validação de Senhas:</strong> Garantem que uma senha segue regras específicas (ex: "tem que ter letra e número").</span>
            </li>
            <li className="flex items-start gap-3 text-slate-300 bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
              <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
              <span><strong>Analisadores de Código:</strong> Ferramentas como Linters que vasculham texto buscando padrões conhecidos.</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col">
          <h3 className="text-xl font-semibold text-slate-100 mb-3 border-b border-slate-700 pb-2">Autômato Finito (Exemplo Simples)</h3>
          <p className="text-slate-300 mb-4 bg-blue-950/30 p-4 rounded-xl border border-blue-900/50">
            Imagine um sistema onde a senha <strong>precisa</strong> ter "a", "b", e terminar com um número. 
            Podemos representar essa regra rígida através de estados e transições (setas).
          </p>
          <div className="flex-1 min-h-[300px] bg-slate-800/80 rounded-2xl border border-slate-700 overflow-hidden relative shadow-inner">
            <GraphCanvas initialNodes={INITIAL_NODES} initialEdges={INITIAL_EDGES} />
          </div>
        </div>
      </div>
    </div>
  );
}
