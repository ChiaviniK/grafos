import { useState } from "react";

type Step = {
  states: string[];
  input: string;
  closure: string[];
  description: string;
};

const STEPS: Step[] = [
  { states: ["q0"], input: "ab", closure: ["q0", "q1", "q3"], description: 'Inicio: Estado q0. Calculamos Fecho-ε(q0) = {q0, q1, q3} pois há ε de q0→q1 e q0→q3.' },
  { states: ["q1", "q3"], input: "b", closure: ["q2", "q4"], description: 'Lemos "a". δ(q1,a)={q2} e δ(q3,a)={q4}. Aplicamos Fecho-ε nos destinos.' },
  { states: ["q2", "q4"], input: "", closure: ["q2", "q4", "q5"], description: 'Lemos "b". δ(q2,b)={} e δ(q4,b)={q5}. Fecho-ε(q5)={q5}. Estado final q5 ∈ F ✓ ACEITA.' },
];

export function LFASlide8_3() {
  const [step, setStep] = useState(0);
  const s = STEPS[step];
  const isLast = step === STEPS.length - 1;

  return (
    <div className="flex flex-col min-h-[100%] flex-1 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight mb-4 text-slate-100">
            Conversão AFN-ε <span className="text-fuchsia-400">→ AFD</span>
          </h2>
          <p className="text-slate-300 text-base leading-relaxed mb-6">
            Para converter um AFN-ε em AFD, usamos a{" "}
            <strong className="text-fuchsia-300">Construção de Subconjuntos aumentada</strong> com
            Fecho-ε. Cada "macro-estado" do AFD é um conjunto de estados do AFN-ε.
          </p>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-4">
            <h4 className="text-fuchsia-400 font-bold text-sm uppercase tracking-wider mb-3">
              Algoritmo Passo a Passo
            </h4>
            <ol className="space-y-2 text-slate-400 text-sm">
              <li className="flex items-start gap-3">
                <span className="shrink-0 w-6 h-6 bg-fuchsia-600 rounded-full flex items-center justify-center text-white font-bold text-xs">1</span>
                Estado inicial do AFD = Fecho-ε(q₀) do AFN-ε
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 w-6 h-6 bg-fuchsia-600 rounded-full flex items-center justify-center text-white font-bold text-xs">2</span>
                Para cada conjunto S e símbolo a: computar δ'(S,a) = Fecho-ε(⋃ δ(q,a))
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 w-6 h-6 bg-fuchsia-600 rounded-full flex items-center justify-center text-white font-bold text-xs">3</span>
                Repetir para todos os novos conjuntos até não aparecerem novos
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 w-6 h-6 bg-fuchsia-600 rounded-full flex items-center justify-center text-white font-bold text-xs">4</span>
                <span>Um estado do AFD é final se contém ao menos um estado final do AFN-ε</span>
              </li>
            </ol>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold text-slate-100 border-b border-slate-700 pb-2">
            Simulação: processando "ab"
          </h3>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 font-mono">
            <div className="grid grid-cols-2 gap-6 mb-4">
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">Estados Ativos</p>
                <div className="flex flex-wrap gap-2">
                  {s.states.map(q => (
                    <span key={q} className="px-3 py-1 bg-fuchsia-600/30 border border-fuchsia-500/50 rounded-xl text-fuchsia-300 font-bold text-sm">
                      {q}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">Input Restante</p>
                <span className="text-sky-300 font-bold text-lg">
                  {s.input || <span className="text-emerald-400">∅ (aceito!)</span>}
                </span>
              </div>
            </div>
            <div className="border-t border-slate-800 pt-4 mb-4">
              <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">Fecho-ε Resultante</p>
              <div className="flex flex-wrap gap-2">
                {s.closure.map(q => (
                  <span key={q} className={`px-3 py-1 rounded-xl font-bold text-sm border ${isLast && q === 'q5' ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300' : 'bg-slate-800 border-slate-700 text-slate-300'}`}>
                    {q}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed italic border-l-2 border-fuchsia-500/50 pl-4">
              {s.description}
            </p>
          </div>

          <div className="flex gap-3 justify-end">
            <button
              disabled={step === 0}
              onClick={() => setStep(s => s - 1)}
              className="px-5 py-2 bg-slate-800 text-slate-300 rounded-xl border border-slate-700 hover:bg-slate-700 transition-colors disabled:opacity-30 font-bold text-sm"
            >
              ← Anterior
            </button>
            <button
              disabled={isLast}
              onClick={() => setStep(s => s + 1)}
              className="px-5 py-2 bg-fuchsia-600 text-white rounded-xl hover:bg-fuchsia-500 transition-colors disabled:opacity-30 font-bold text-sm"
            >
              Próximo →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
