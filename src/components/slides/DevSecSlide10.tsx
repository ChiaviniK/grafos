import { Bot } from "lucide-react";

export function DevSecSlide10() {
  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500 max-w-5xl mx-auto w-full">
      <div className="flex items-center justify-between mb-8">
         <div className="flex items-center gap-3">
            <span className="bg-purple-500/20 text-purple-400 font-bold px-3 py-1 rounded-full text-xs tracking-wider border border-purple-500/30 flex items-center gap-1.5"><Bot className="w-3.5 h-3.5"/> APS LABORATÓRIO</span>
            <span className="text-slate-400 font-semibold">Parte 2 de 3</span>
         </div>
      </div>
      
      <h2 className="text-4xl font-bold mb-6 tracking-tight text-white flex items-center gap-4">
         <Bot className="w-10 h-10 text-blue-400" />
         A Execução no Antigravity
      </h2>

      <p className="text-xl text-slate-300 mb-8 max-w-4xl">
         O desenvolvimento via Agentes ocorre em um ciclo iterativo. Aqui está o passo-a-passo sugerido para o uso na ferramenta:
      </p>

      <div className="space-y-6 flex-1 relative">
         
         <div className="absolute left-8 top-8 bottom-8 w-1 bg-slate-800 z-0"></div>

         <div className="flex gap-6 relative z-10 items-start">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 border-2 border-blue-500/50 flex flex-col items-center justify-center shrink-0 shadow-[0_0_20px_rgba(59,130,246,0.15)] text-blue-400 font-black text-xl">1</div>
            <div className="bg-slate-900/80 border border-slate-700/80 rounded-3xl p-6 flex-1">
               <h3 className="text-xl font-bold text-slate-200 mb-2 flex items-center gap-2">Importação e Análise</h3>
               <p className="text-slate-400">Abra o seu ambiente local no Cursor/Antigravity com o <code>scanner.py</code>. Insira seu "Prompt Excelente" (Aquele que vimos no Construtor) como primeira interação na Task.</p>
            </div>
         </div>

         <div className="flex gap-6 relative z-10 items-start">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 border-2 border-amber-500/50 flex flex-col items-center justify-center shrink-0 shadow-[0_0_20px_rgba(245,158,11,0.15)] text-amber-400 font-black text-xl">2</div>
            <div className="bg-slate-900/80 border border-slate-700/80 rounded-3xl p-6 flex-1">
               <h3 className="text-xl font-bold text-slate-200 mb-2 flex items-center gap-2">Revisão do Plano (Plan)</h3>
               <p className="text-slate-400">O agente irá gerar um arquivo <code>implementation_plan.md</code>. <strong className="text-amber-400">LEIA ESTE ARQUIVO.</strong> Confirme que ele vai usar Socket/Flask, que incluiu o Banner Grabbing e o Regex para IPv4 antes de autorizar a mudança no código.</p>
            </div>
         </div>

         <div className="flex gap-6 relative z-10 items-start">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 border-2 border-rose-500/50 flex flex-col items-center justify-center shrink-0 shadow-[0_0_20px_rgba(244,63,94,0.15)] text-rose-400 font-black text-xl">3</div>
            <div className="bg-slate-900/80 border border-slate-700/80 rounded-3xl p-6 flex-1 border-rose-900/30">
               <h3 className="text-xl font-bold text-rose-400 mb-2 flex items-center gap-2">Execução Insegura? (Validação)</h3>
               <p className="text-slate-400">Durante a criação do front-end interagindo com a API, <strong>se a IA travar ou cometer o erro das aulas passadas (ex: shell_exec)</strong>, aplique o processo de Human-in-the-Loop: use o terminal da IA para apontar o erro ou corrija você mesmo na IDE e avise o agente para continuar seguro.</p>
            </div>
         </div>

      </div>

    </div>
  );
}
