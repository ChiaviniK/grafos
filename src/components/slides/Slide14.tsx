import { Trophy } from "lucide-react";

export function Slide14() {
  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      <div className="flex flex-col mb-8 items-center text-center">
        <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mb-4 ring-4 ring-amber-500/30">
          <Trophy className="w-8 h-8 text-amber-500" />
        </div>
        <h2 className="text-4xl font-bold mb-4 tracking-tight text-white">14. Desafio Final (Valendo Ponto!)</h2>
        <p className="text-slate-300 text-xl max-w-2xl">
          Construa um Autômato Finito Determinístico que aceite todas as palavras (formadas por <code className="text-blue-400 font-bold">a</code>, <code className="text-emerald-400 font-bold">b</code>) 
          que <strong className="text-white underline decoration-amber-500 decoration-4 underline-offset-4">CONTENHAM a substring "ab"</strong>.
        </p>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full mx-auto pb-8">
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 flex flex-col shadow-lg">
          <h3 className="text-2xl font-semibold mb-6 text-blue-400">Passo a Passo</h3>
          <ul className="space-y-6 text-slate-300">
            <li className="flex gap-4">
              <span className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-white shrink-0">1</span>
              <div>
                <strong className="block text-white mb-1">Pense nos Estados:</strong>
                Quantos estados precisamos para "lembrar" que o 'a' apareceu antes do 'b'?
              </div>
            </li>
            <li className="flex gap-4">
              <span className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-white shrink-0">2</span>
              <div>
                <strong className="block text-white mb-1">Caminho do Sucesso:</strong>
                Qual estado é o final? O que acontece depois que chegamos nele? (Dica: é um poço de aceitação!)
              </div>
            </li>
            <li className="flex gap-4">
              <span className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-white shrink-0">3</span>
              <div>
                <strong className="block text-emerald-400 mb-1">Como entregar:</strong>
                Teste as palavras abaixo. Tire um print do grafo funcionando (pode ser no papel, no JFLAP ou ferramenta online) e me envie!
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-8 flex flex-col shadow-inner">
           <h3 className="text-xl font-semibold mb-4 text-slate-200 border-b border-slate-700 pb-2">Bateria de Testes</h3>
           <div className="space-y-4">
              <div className="bg-emerald-900/20 border border-emerald-500/20 p-4 rounded-xl">
                 <span className="text-emerald-400 font-bold mb-2 block">Deverão ser Aceitas:</span>
                 <div className="font-mono text-slate-300 space-y-1">
                   <div>ab</div>
                   <div>aaab</div>
                   <div>bbabab</div>
                 </div>
              </div>
              
              <div className="bg-rose-900/20 border border-rose-500/20 p-4 rounded-xl">
                 <span className="text-rose-400 font-bold mb-2 block">Deverão ser Rejeitadas:</span>
                 <div className="font-mono text-slate-300 space-y-1">
                   <div>b</div>
                   <div>ba</div>
                   <div>aaaa</div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
