import { EpsilonCloud } from "../../lfa/EpsilonCloud";

export function LFASlide8_2() {
  return (
    <div className="flex flex-col min-h-[100%] flex-1 animate-in fade-in duration-500">
      <div className="mb-6">
        <h2 className="text-3xl font-extrabold tracking-tight mb-2 text-slate-100">
          Simulador: <span className="text-fuchsia-400">Fecho-ε</span> Interativo
        </h2>
        <p className="text-slate-400 text-base">
          O <strong className="text-white">Fecho-ε(q)</strong> de um estado é o conjunto de todos os
          estados alcançáveis a partir de <em>q</em> usando <strong>somente transições ε</strong>,
          sem consumir nenhuma entrada. Clique nos estados abaixo para visualizar a expansão.
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <EpsilonCloud />
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-4">
          <p className="text-fuchsia-400 font-black text-xs uppercase tracking-widest mb-2">Algoritmo (BFS)</p>
          <p className="text-slate-400 text-xs leading-relaxed font-mono">
            Fecho(q) = {"{"}q{"}"} ∪<br />
            ⋃ Fecho(r) para<br />
            r ∈ δ(q, ε)
          </p>
        </div>
        <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-4">
          <p className="text-sky-400 font-black text-xs uppercase tracking-widest mb-2">Propriedade</p>
          <p className="text-slate-400 text-xs leading-relaxed">
            Todo estado está no seu próprio Fecho-ε.
            A operação é <strong className="text-white">reflexiva</strong> e <strong className="text-white">transitiva</strong>.
          </p>
        </div>
        <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-4">
          <p className="text-amber-400 font-black text-xs uppercase tracking-widest mb-2">Uso Prático</p>
          <p className="text-slate-400 text-xs leading-relaxed">
            Na conversão AFN-ε → AFD, calculamos o Fecho-ε de cada conjunto de estados
            para equivaler os estados do AFD resultante.
          </p>
        </div>
      </div>
    </div>
  );
}
