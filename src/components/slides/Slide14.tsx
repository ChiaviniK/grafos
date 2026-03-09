import { CheckCircle, Route, FileJson, Combine } from "lucide-react";

export function Slide14() {
  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      <div className="flex flex-col items-center mb-8 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 tracking-tight">14. Fechamento e Resumo</h2>
        <p className="text-slate-300 text-lg">
          Chegamos ao fim da nossa primeira aula extensa sobre Automatos! Vamos revisar os pontos chave de hoje.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full flex-1 mb-8">
        <div className="bg-slate-800/40 rounded-2xl border border-slate-700/50 p-6 shadow-sm">
           <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-slate-100">
             <CheckCircle className="w-5 h-5 text-blue-400" />
             Revisão dos Conceitos
           </h3>
           <ul className="space-y-4 text-slate-300">
             <li className="flex items-start gap-3">
               <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 shrink-0" />
               <p><strong className="text-white">Grafo:</strong> É apenas a ferramenta de representação (Vértices e Arestas).</p>
             </li>
             <li className="flex items-start gap-3">
               <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 shrink-0" />
               <p><strong className="text-white">Estados e Transições:</strong> Os vértices viram estados da máquina, as arestas viram as transições de leitura de símbolos.</p>
             </li>
             <li className="flex items-start gap-3">
               <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 shrink-0" />
               <p><strong className="text-white">Processamento:</strong> O Autômato lê uma palavra da esquerda para a direita, pulando de estado em estado.</p>
             </li>
             <li className="flex items-start gap-3">
               <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 shrink-0" />
               <p><strong className="text-white">Aceitação:</strong> Se ao ler a última letra o estado atual for Final (duplo ou verde), a palavra pertence à linguagem.</p>
             </li>
           </ul>
        </div>

        <div className="bg-slate-900/60 rounded-2xl border border-slate-700/80 p-6 flex flex-col justify-center">
           <h3 className="text-xl font-semibold mb-6 text-emerald-400 flex items-center gap-2">
             O que vem na próxima aula? 👀
           </h3>
           <div className="space-y-4">
              <div className="flex items-center gap-4 bg-slate-800 p-4 rounded-xl border border-slate-700">
                <Route className="w-8 h-8 text-amber-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-200">Não Determinismo (AFN)</h4>
                  <p className="text-sm text-slate-400">E se existirem várias setas com a mesma letra saindo do mesmo estado? A máquina se divide em clones!</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 bg-slate-800 p-4 rounded-xl border border-slate-700">
                <Combine className="w-8 h-8 text-purple-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-200">Conversão AFN → AFD</h4>
                  <p className="text-sm text-slate-400">Todo não determinismo pode ser transformado em um grafo determinístico (embora muito maior).</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-slate-800 p-4 rounded-xl border border-slate-700">
                <FileJson className="w-8 h-8 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-200">Expressões Regulares (ER)</h4>
                  <p className="text-sm text-slate-400">Escrevendo as mesmas regras que vimos hoje, mas numa notação de texto usada na programação de verdade.</p>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
