import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

type Op = { id: string; name: string; symbol: string; example: string; meaning: string; regexPy: string; color: string };

const OPS: Op[] = [
  {
    id: "union", name: "União", symbol: "a | b", color: "fuchsia",
    example: "Reconhece 'a' OU 'b'",
    meaning: "L(r₁ | r₂) = L(r₁) ∪ L(r₂)",
    regexPy: "import re\npattern = re.compile(r'a|b')\nprint(pattern.match('a'))  # match\nprint(pattern.match('c'))  # None"
  },
  {
    id: "concat", name: "Concatenação", symbol: "ab", color: "sky",
    example: "Reconhece 'a' SEGUIDO de 'b'",
    meaning: "L(r₁r₂) = {xy | x ∈ L(r₁), y ∈ L(r₂)}",
    regexPy: "import re\npattern = re.compile(r'ab')\nprint(pattern.search('ab'))  # match\nprint(pattern.search('ba'))  # None"
  },
  {
    id: "star", name: "Estrela de Kleene", symbol: "a*", color: "amber",
    example: "Reconhece '' ou 'a' ou 'aa' ou 'aaa'...",
    meaning: "L(r*) = {ε} ∪ L(r) ∪ L(r)L(r) ∪ ...",
    regexPy: "import re\npattern = re.compile(r'^a*$')\nprint(pattern.match(''))    # match\nprint(pattern.match('aaa')) # match\nprint(pattern.match('ab'))  # None"
  },
  {
    id: "plus", name: "Mais (r+)", symbol: "a+", color: "emerald",
    example: "Reconhece 'a', 'aa', 'aaa'... (min. 1)",
    meaning: "r+ = rr* (Açúcar sintático)",
    regexPy: "import re\npattern = re.compile(r'^a+$')\nprint(pattern.match('a'))   # match\nprint(pattern.match(''))    # None\nprint(pattern.match('aaa')) # match"
  },
];

const colorMap: Record<string, string> = {
  fuchsia: "border-fuchsia-500/50 bg-fuchsia-500/10 text-fuchsia-400",
  sky: "border-sky-500/50 bg-sky-500/10 text-sky-400",
  amber: "border-amber-500/50 bg-amber-500/10 text-amber-400",
  emerald: "border-emerald-500/50 bg-emerald-500/10 text-emerald-400",
};

export function LFASlide8_4() {
  const [selected, setSelected] = useState<string>("union");
  const op = OPS.find(o => o.id === selected)!;

  return (
    <div className="flex flex-col min-h-[100%] flex-1 animate-in fade-in duration-500">
      <h2 className="text-3xl font-extrabold tracking-tight mb-2 text-slate-100">
        Expressões Regulares: <span className="text-fuchsia-400">Operações Fundamentais</span>
      </h2>
      <p className="text-slate-400 text-base mb-6">
        Toda Expressão Regular é construída combinando <strong className="text-white">três operações primitivas</strong> sobre linguagens regulares.
        Clique em cada operação para ver a definição formal e o código Python equivalente.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 flex-1">
        <div className="lg:col-span-2 flex flex-col gap-3">
          {OPS.map(o => (
            <button
              key={o.id}
              onClick={() => setSelected(o.id)}
              className={`text-left p-4 rounded-2xl border-2 transition-all ${selected === o.id ? colorMap[o.color] : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-600'}`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-black text-sm uppercase tracking-wider">{o.name}</span>
                <code className="text-lg font-mono font-black">{o.symbol}</code>
              </div>
              <p className="text-xs opacity-70">{o.example}</p>
            </button>
          ))}
        </div>

        <div className="lg:col-span-3 flex flex-col gap-4">
          <div className={`p-5 rounded-2xl border-2 ${colorMap[op.color]}`}>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">Definição Formal</p>
            <p className="font-mono text-base font-bold">{op.meaning}</p>
          </div>
          <div className="flex-1 bg-slate-950 rounded-2xl border border-slate-800 p-5">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 text-xs font-black uppercase tracking-widest">Código Python Equivalente</span>
            </div>
            <pre className="text-sm font-mono text-slate-300 leading-relaxed">{op.regexPy}</pre>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
            <p className="text-xs text-slate-500 italic">
              <strong className="text-slate-400">Nota:</strong> Em Python, o módulo <code>re</code> usa Regex baseadas em
              NFA internamente. O interpretador converte automaticamente a expressão para um autômato otimizado.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
