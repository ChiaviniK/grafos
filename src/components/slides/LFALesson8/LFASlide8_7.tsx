import { Layers, Shuffle, Repeat } from "lucide-react";

export function LFASlide8_7() {
  return (
    <div className="flex flex-col min-h-[100%] flex-1 animate-in fade-in duration-500">
      <div className="mb-6">
        <h2 className="text-3xl font-extrabold tracking-tight mb-2 text-slate-100">
          Propriedades de <span className="text-fuchsia-400">Fechamento</span>
        </h2>
        <p className="text-slate-400 text-base leading-relaxed">
          As Linguagens Regulares são extremamente robustas. Isso significa que, se aplicarmos certas operações em linguagens regulares, o 
          <strong className="text-white"> resultado continuará sendo uma linguagem regular</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-fuchsia-500/10 flex items-center justify-center mb-4 border border-fuchsia-500/20">
             <Layers className="w-8 h-8 text-fuchsia-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">União</h3>
          <p className="text-slate-400 text-sm">Se L1 e L2 são regulares, L1 ∪ L2 também é. Provado facilmente via Thompson construindo um AFN-ε.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-sky-500/10 flex items-center justify-center mb-4 border border-sky-500/20">
             <Shuffle className="w-8 h-8 text-sky-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Concatenação</h3>
          <p className="text-slate-400 text-sm">L1 · L2 é regular. Basta conectar os estados finais de L1 aos iniciais de L2 usando ε.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mb-4 border border-amber-500/20">
             <Repeat className="w-8 h-8 text-amber-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Estrela (Kleene)</h3>
          <p className="text-slate-400 text-sm">L* é regular. O AFN-ε permite modelar o loop de volta ao início e a palavra vazia (zero ocorrências).</p>
        </div>
      </div>

      <div className="mt-8 bg-blue-500/10 border border-blue-500/30 rounded-2xl p-5 text-center">
        <p className="text-blue-300 font-bold italic text-sm">
          "A classe das linguagens regulares é a menor classe que contém os conjuntos unitários e é fechada sob união, concatenação e estrela."
        </p>
      </div>
    </div>
  );
}
