import { PenTool, Box, ShieldCheck, ChevronRight } from "lucide-react";

export function DevSecSlide6() {
  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500 max-w-5xl mx-auto w-full">
      <h2 className="text-4xl font-bold mb-4 tracking-tight text-white flex items-center gap-3">
         A Tríade do Prompt Perfeito
      </h2>
      <p className="text-slate-400 text-xl mb-12">
         Engenharia de Prompt para Segurança não é adivinhação. É focar em fornecer para a IA três pilares fundamentais: <strong className="text-emerald-400">Papel, Ação e Restrições</strong>.
      </p>

      <div className="flex flex-col md:flex-row gap-6 relative flex-1">
         
         {/* Arrow Connectors (hidden on mobile) */}
         <div className="hidden md:block absolute top-[45%] left-[30%] -translate-y-1/2 z-0 font-bold text-slate-700">
            <ChevronRight className="w-12 h-12" />
         </div>
         <div className="hidden md:block absolute top-[45%] right-[30%] -translate-y-1/2 z-0 font-bold text-slate-700">
            <ChevronRight className="w-12 h-12" />
         </div>

         {/* Pillar 1 */}
         <div className="flex-1 bg-slate-900 border border-slate-700 hover:border-blue-500/50 rounded-3xl p-8 flex flex-col items-center text-center group transition-colors relative z-10 shadow-lg">
            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/30 mb-6 group-hover:scale-110 transition-transform">
               <PenTool className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-blue-400 mb-4">1. O Papel (Contexto)</h3>
            <p className="text-slate-300 mb-6 flex-1">
               Quem a IA deve ser? Isso alinha as respostas às boas práticas de uma profissão específica.
            </p>
            <div className="bg-slate-950 px-4 py-3 rounded-xl border border-blue-900/30 w-full font-mono text-sm text-blue-300">
               "Atue como um Engenheiro DevSecOps Sênior experiente."
            </div>
         </div>

         {/* Pillar 2 */}
         <div className="flex-1 bg-slate-900 border border-slate-700 hover:border-amber-500/50 rounded-3xl p-8 flex flex-col items-center text-center group transition-colors relative z-10 shadow-lg translate-y-0 md:translate-y-6">
            <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center border border-amber-500/30 mb-6 group-hover:scale-110 transition-transform">
               <Box className="w-8 h-8 text-amber-400" />
            </div>
            <h3 className="text-2xl font-bold text-amber-400 mb-4">2. A Ação (Tarefa)</h3>
            <p className="text-slate-300 mb-6 flex-1">
               O que exatamente ela deve fazer e com quais tecnologias / arquivos do sistema?
            </p>
            <div className="bg-slate-950 px-4 py-3 rounded-xl border border-amber-900/30 w-full font-mono text-sm text-amber-300">
               "Refatore o meu scanner.py criando um dashboard web usando React e FASTApi."
            </div>
         </div>

         {/* Pillar 3 */}
         <div className="flex-1 bg-slate-900 border border-slate-700 hover:border-emerald-500/50 rounded-3xl p-8 flex flex-col items-center text-center group transition-colors relative z-10 shadow-lg">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/30 mb-6 group-hover:scale-110 transition-transform">
               <ShieldCheck className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold text-emerald-400 mb-4">3. A Restrição (Segurança)</h3>
            <p className="text-slate-300 mb-6 flex-1">
               O que ela <strong>não</strong> deve fazer? Quais validações estruturais ela deve incluir obrigatoriamente?
            </p>
            <div className="bg-slate-950 px-4 py-3 rounded-xl border border-emerald-900/30 w-full font-mono text-sm text-emerald-300">
               "Adicione sanitização rigorosa nos inputs (IPs) e nunca use funções Inseguras."
            </div>
         </div>

      </div>
    </div>
  );
}
