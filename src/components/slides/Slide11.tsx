import { PenTool, CheckSquare } from "lucide-react";

export function Slide11() {
  return (
    <div className="flex flex-col min-h-[100%] flex-1 animate-in fade-in duration-500">
      <div className="flex flex-col mb-8">
        <h2 className="text-3xl font-bold mb-4 tracking-tight">8. Construção de Grafos (Mão na Massa!)</h2>
        <p className="text-slate-300 text-lg max-w-3xl">
          Fiz bastante no quadro, agora é a vez de vocês criarem autômatos para linguagens variadas!
          Use o caderno e ferramenta <strong className="text-blue-400">JFLAP</strong> (recomendado) para desenhar e simular as palavras.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
        {/* Exercício 1 */}
        <div className="bg-slate-800/60 rounded-2xl border border-slate-700 flex flex-col overflow-hidden relative group hover:border-blue-500/50 transition-colors">
          <div className="bg-slate-900/50 p-4 border-b border-slate-700 flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-blue-900/50 text-blue-400 flex items-center justify-center font-bold">1</div>
            <h3 className="font-semibold text-lg text-slate-200">Termina com "a"</h3>
          </div>
          <div className="p-5 flex-1 flex flex-col">
            <p className="text-slate-400 mb-4 flex-1">
              Construa um AFD que aceita palavras formadas por <code>(a, b)</code> cuja última letra seja <strong>"a"</strong>.
            </p>
            <div className="space-y-2 mt-auto">
              <div className="flex items-center gap-2 text-sm text-slate-500"><PenTool className="w-4 h-4" /> Defina os Estados (Q)</div>
              <div className="flex items-center gap-2 text-sm text-slate-500"><PenTool className="w-4 h-4" /> Desenhe as Transições (δ)</div>
              <div className="flex items-center gap-2 text-sm text-emerald-500"><CheckSquare className="w-4 h-4" /> Teste: "bba", "a", "ab"</div>
            </div>
          </div>
        </div>

        {/* Exercício 2 */}
        <div className="bg-slate-800/60 rounded-2xl border border-slate-700 flex flex-col overflow-hidden relative group hover:border-emerald-500/50 transition-colors">
          <div className="bg-slate-900/50 p-4 border-b border-slate-700 flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-emerald-900/50 text-emerald-400 flex items-center justify-center font-bold">2</div>
            <h3 className="font-semibold text-lg text-slate-200">Número par de "a"</h3>
          </div>
          <div className="p-5 flex-1 flex flex-col">
            <p className="text-slate-400 mb-4 flex-1">
              Construa um AFD que aceita cadeias onde a contagem de letras "a" é um número par (0, 2, 4...).
            </p>
            <div className="space-y-2 mt-auto">
              <div className="flex items-center gap-2 text-sm text-slate-500"><PenTool className="w-4 h-4" /> Quantos estados precisamos?</div>
              <div className="flex items-center gap-2 text-sm text-slate-500"><PenTool className="w-4 h-4" /> Dica: Lembre-se do resto da divisão</div>
              <div className="flex items-center gap-2 text-sm text-emerald-500"><CheckSquare className="w-4 h-4" /> Teste: "bb", "aba", "baa"</div>
            </div>
          </div>
        </div>

        {/* Exercício 3 */}
        <div className="bg-slate-800/60 rounded-2xl border border-slate-700 flex flex-col overflow-hidden relative group hover:border-purple-500/50 transition-colors">
          <div className="bg-slate-900/50 p-4 border-b border-slate-700 flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-purple-900/50 text-purple-400 flex items-center justify-center font-bold">3</div>
            <h3 className="font-semibold text-lg text-slate-200">Começa com "b"</h3>
          </div>
          <div className="p-5 flex-1 flex flex-col">
            <p className="text-slate-400 mb-4 flex-1">
              Construa um AFD que aceita cadeias que **obrigatoriamente** iniciam com a letra "b".
            </p>
            <div className="space-y-2 mt-auto">
              <div className="flex items-center gap-2 text-sm text-slate-500"><PenTool className="w-4 h-4" /> Há um "Caminho da Morte"?</div>
              <div className="flex items-center gap-2 text-sm text-slate-500"><PenTool className="w-4 h-4" /> O que acontece se a 1ª letra for "a"?</div>
              <div className="flex items-center gap-2 text-sm text-emerald-500"><CheckSquare className="w-4 h-4" /> Teste: "b", "baab", "ab"</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
