import { useState } from "react";
import { AlertCircle, Skull, SearchX, MousePointerClick, Box } from "lucide-react";

export function DevSecSlide7() {
  const [revealed, setRevealed] = useState({
     vago: false,
     framework: false,
     risco: false,
  });

  const toggleReveal = (key: keyof typeof revealed) => {
     setRevealed(prev => ({ ...prev, [key]: true }));
  };

  const allRevealed = Object.values(revealed).every(Boolean);

  return (
    <div className="flex flex-col  min-min-h-[100%] flex-1 flex-1  animate-in fade-in duration-500 max-w-5xl mx-auto w-full">
      <h2 className="text-4xl font-bold mb-4 tracking-tight text-rose-400 flex items-center gap-3">
         <AlertCircle className="w-10 h-10" />
         Desconstruindo um Prompt Ruim
      </h2>
      <p className="text-slate-400 text-xl mb-12">
         Clique nas áreas destacadas do prompt abaixo para descobrir por que a intenção falha num ambiente de produção:
      </p>

      {/* Bad Prompt Box */}
      <div className="bg-slate-950 border-2 border-slate-700 hover:border-slate-500 transition-colors rounded-3xl p-8 mb-12 shadow-2xl relative">
         <div className="absolute top-0 right-0 bg-slate-800 text-slate-400 px-4 py-1 rounded-bl-2xl rounded-tr-xl text-sm font-bold flex items-center gap-2">
             <MousePointerClick className="w-4 h-4"/> Clique no texto para analisar
         </div>
         
         <div className="text-3xl md:text-5xl font-mono leading-relaxed mt-4">
            <span 
               onClick={() => toggleReveal('vago')}
               className={`cursor-pointer transition-colors px-2 rounded-lg ${revealed.vago ? 'bg-rose-950/80 text-rose-400 border border-rose-500/50' : 'text-slate-300 hover:bg-slate-800'}`}
            >
               "Faz um site
            </span>
            {" "}
            <span 
               onClick={() => toggleReveal('framework')}
               className={`cursor-pointer transition-colors px-2 rounded-lg ${revealed.framework ? 'bg-amber-950/80 text-amber-400 border border-amber-500/50' : 'text-slate-300 hover:bg-slate-800'}`}
            >
               para o cenário"
            </span>
            <span 
               onClick={() => toggleReveal('risco')}
               className={`cursor-pointer transition-colors px-2 rounded-lg block mt-4 md:inline md:mt-0 ${revealed.risco ? 'bg-red-950/80 text-red-400 border border-red-500/50' : 'text-slate-300 hover:bg-slate-800'}`}
            >
               que funcione rápido."
            </span>
         </div>
      </div>

      {/* Explanations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
         
         {/* Exp 1 */}
         <div className={`rounded-2xl p-6 transition-all duration-500 ${revealed.vago ? 'bg-slate-900 border border-rose-500/30 translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'}`}>
            <h3 className="text-xl font-bold text-rose-400 mb-3 flex items-center gap-2"><SearchX className="w-5 h-5"/> Vago (Sem Papel)</h3>
            <p className="text-slate-400">
               A IA assume uma persona de "Assistente Geral" e vai abstrair os conceitos estruturais, focando apenas num resultado estético temporário, sem arquitetura DevSecOps.
            </p>
         </div>

         {/* Exp 2 */}
         <div className={`rounded-2xl p-6 transition-all duration-500 delay-100 ${revealed.framework ? 'bg-slate-900 border border-amber-500/30 translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'}`}>
            <h3 className="text-xl font-bold text-amber-400 mb-3 flex items-center gap-2"><Box className="w-5 h-5"/> Qual stack? (Sem Ferramenta)</h3>
            <p className="text-slate-400">
               O Agente Antigravity no seu bash vai tentar adivinhar a tecnologia. Pode criar algo em PHP legado, jQuery ou algo inútil para o seu back-end em Python atual.
            </p>
         </div>

         {/* Exp 3 */}
         <div className={`rounded-2xl p-6 transition-all duration-500 delay-200 ${revealed.risco ? 'bg-slate-900 border border-red-500/30 translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'}`}>
            <h3 className="text-xl font-bold text-red-400 mb-3 flex items-center gap-2"><Skull className="w-5 h-5"/> Risco Máximo (Sem Restrições)</h3>
            <p className="text-slate-400">
               Para fazer "funcionar rápido", a IA ignora tratamento de erros e segurança. Códigos assim frequentemente apresentam falhas clássicas do <strong className="text-red-300">OWASP Top 10</strong>, como Injection.
            </p>
         </div>

      </div>
      
      {allRevealed && (
         <div className="mt-8 text-center animate-in fade-in slide-in-from-bottom-4">
            <p className="text-2xl font-bold text-emerald-400 border border-emerald-500/30 bg-emerald-950/20 py-4 px-8 rounded-2xl inline-block shadow-lg">
               Nunca abstraia a Intenção!
            </p>
         </div>
      )}

    </div>
  );
}
