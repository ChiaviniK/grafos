import { Bot, MessageSquare, AlertTriangle, ArrowRight } from "lucide-react";

export function DevSecSlide2() {
  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      <h2 className="text-3xl font-bold mb-8 tracking-tight text-emerald-400 flex items-center gap-3">
         <Bot className="w-8 h-8" />
         O que são Agentes de IA em Segurança?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
         
         {/* LLM Card */}
         <div className="bg-slate-800/40 border border-slate-700/50 rounded-3xl p-8 flex flex-col relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
               <MessageSquare className="w-32 h-32 text-slate-300" />
            </div>
            
            <div className="flex items-center gap-4 mb-6 relative z-10">
               <div className="w-14 h-14 rounded-2xl bg-slate-700 flex items-center justify-center border border-slate-600">
                  <MessageSquare className="w-7 h-7 text-slate-300" />
               </div>
               <h3 className="text-2xl font-bold text-slate-200">Chatbot Comum (LLM)</h3>
            </div>
            
            <ul className="space-y-4 text-slate-300 text-lg flex-1 relative z-10">
               <li className="flex items-start gap-3">
                  <span className="bg-slate-700 text-slate-300 w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-sm font-bold">-</span>
                  <span><strong>Reativo:</strong> Você pergunta, ele responde texto puro.</span>
               </li>
               <li className="flex items-start gap-3">
                  <span className="bg-slate-700 text-slate-300 w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-sm font-bold">-</span>
                  <span><strong>Isolado:</strong> Não tem acesso aos seus arquivos locais ou terminais.</span>
               </li>
            </ul>
         </div>

         {/* Agent Card */}
         <div className="bg-slate-900 border-2 border-emerald-500/30 hover:border-emerald-500/60 rounded-3xl p-8 flex flex-col relative overflow-hidden group shadow-[0_0_30px_rgba(16,185,129,0.05)] transition-colors">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
               <Bot className="w-32 h-32 text-emerald-500" />
            </div>
            
            <div className="flex items-center gap-4 mb-6 relative z-10">
               <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                  <Bot className="w-7 h-7 text-emerald-400" />
               </div>
               <h3 className="text-2xl font-bold text-emerald-400">Agente de IA (Antigravity)</h3>
            </div>
            
            <ul className="space-y-4 text-slate-300 text-lg flex-1 relative z-10">
               <li className="flex items-start gap-3">
                  <span className="bg-emerald-500/20 text-emerald-400 w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-sm font-bold">✓</span>
                  <span><strong>Autônomo:</strong> Executa "Tools" (Lê código, roda scripts bash, usa ferramentas do SO).</span>
               </li>
               <li className="flex items-start gap-3">
                  <span className="bg-emerald-500/20 text-emerald-400 w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-sm font-bold">✓</span>
                  <span><strong>Proativo:</strong> Verifica erros no seu projeto e propõe correções dinâmicas.</span>
               </li>
            </ul>
         </div>
      </div>

      {/* Human in the loop Alert */}
      <div className="mt-8 bg-rose-950/30 border border-rose-500/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6">
         <div className="w-16 h-16 rounded-full bg-rose-500/20 flex items-center justify-center shrink-0">
             <AlertTriangle className="w-8 h-8 text-rose-400 animate-pulse" />
         </div>
         <div>
            <h4 className="text-rose-400 font-bold mb-1 flex items-center gap-2 text-lg">
               O Conceito: Human-in-the-Loop <ArrowRight className="w-4 h-4 inline" />
            </h4>
            <p className="text-rose-200/80">
               Por que nunca devemos apenas "copiar e colar" código gerado por IA? Porque Agentes sofrem de alucinações. O papel do Engenheiro DevSecOps não é escrever código básico, mas ser o <strong>validador arquitetural</strong> dessas ferramentas. A responsabilidade final é <strong>SUA</strong>.
            </p>
         </div>
      </div>

    </div>
  );
}
