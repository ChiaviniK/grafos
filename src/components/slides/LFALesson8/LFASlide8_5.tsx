import { ThompsonBuilder } from "../../lfa/ThompsonBuilder";
import { ArrowRight } from "lucide-react";

export function LFASlide8_5() {
  return (
    <div className="flex flex-col min-h-[100%] flex-1 animate-in fade-in duration-500">
      <div className="mb-4">
        <h2 className="text-3xl font-extrabold tracking-tight mb-2 text-slate-100">
          Algoritmo de <span className="text-fuchsia-400">Thompson</span>
        </h2>
        <p className="text-slate-400 text-base leading-relaxed">
          O Algoritmo de Thompson (1968) é a ponte definitiva entre{" "}
          <strong className="text-white">Expressões Regulares e AFN-ε</strong>. Dado qualquer Regex,
          ele constrói mecanicamente um autômato equivalente, usando as mesmas três operações fundamentais como "peças de Lego".
        </p>
      </div>

      <div className="flex items-center gap-3 mb-4 text-sm font-bold">
        <div className="px-4 py-2 bg-sky-500/10 border border-sky-500/30 rounded-xl text-sky-400">Regex: (a|b)*c</div>
        <ArrowRight className="w-5 h-5 text-slate-500" />
        <div className="px-4 py-2 bg-fuchsia-500/10 border border-fuchsia-500/30 rounded-xl text-fuchsia-400">AFN-ε equivalente</div>
        <ArrowRight className="w-5 h-5 text-slate-500" />
        <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">Executável em O(n)</div>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <ThompsonBuilder />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="bg-slate-900/80 border border-slate-700 rounded-xl p-3">
          <p className="text-sky-400 font-black text-[10px] uppercase tracking-widest mb-1">Concatenação (A·B)</p>
          <p className="text-slate-500 text-xs">Liga o estado final de A ao inicial de B via transição ε</p>
        </div>
        <div className="bg-slate-900/80 border border-slate-700 rounded-xl p-3">
          <p className="text-fuchsia-400 font-black text-[10px] uppercase tracking-widest mb-1">União (A|B)</p>
          <p className="text-slate-500 text-xs">Novo estado inicial dispara ε para ambos os autômatos em paralelo</p>
        </div>
        <div className="bg-slate-900/80 border border-slate-700 rounded-xl p-3">
          <p className="text-amber-400 font-black text-[10px] uppercase tracking-widest mb-1">Estrela (A*)</p>
          <p className="text-slate-500 text-xs">Loop ε de volta ao início, bypass ε para pular (zero vezes)</p>
        </div>
      </div>
    </div>
  );
}
