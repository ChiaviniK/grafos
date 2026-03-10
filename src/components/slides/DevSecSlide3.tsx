import { Terminal, Lightbulb, AlertCircle, CheckCircle2 } from "lucide-react";

export function DevSecSlide3() {
  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      <h2 className="text-3xl font-bold mb-6 tracking-tight text-amber-400 flex items-center gap-3">
         <Lightbulb className="w-8 h-8" />
         Engenharia de Prompt para Segurança
      </h2>

      <p className="text-slate-300 text-lg mb-8">
         Programação por Intenção não é apenas "pedir para a máquina fazer algo". É fornecer <strong className="text-amber-400">Contexto, Papel e Restrição</strong>.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
         
         {/* Bad Prompt */}
         <div className="bg-slate-900/50 border border-slate-700 rounded-3xl p-6 flex flex-col relative overflow-hidden group">
            <div className="flex items-center gap-3 mb-4 text-rose-400">
               <AlertCircle className="w-6 h-6" />
               <h3 className="text-xl font-bold">Prompt Ruim (Vago)</h3>
            </div>
            
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-sm text-slate-300 mb-6 flex-1">
                "Faz um site para o meu scanner."
            </div>
            
            <div className="bg-rose-950/20 rounded-xl p-4 border border-rose-900/50">
               <h4 className="text-sm font-bold text-rose-400 mb-2 uppercase tracking-wider">Por que falha?</h4>
               <ul className="text-rose-200/70 text-sm space-y-2">
                  <li>• A IA não sabe qual framework você quer usar.</li>
                  <li>• Ela pode usar funções obsoletas ou inseguras (ex: <code>eval()</code>).</li>
                  <li>• Falta de validação de input (Portas abertas para Injection).</li>
               </ul>
            </div>
         </div>

         {/* Good Prompt */}
         <div className="bg-slate-900 border-2 border-amber-500/30 hover:border-amber-500/60 transition-colors rounded-3xl p-6 flex flex-col relative overflow-hidden group shadow-[0_0_30px_rgba(245,158,11,0.05)]">
            <div className="flex items-center gap-3 mb-4 text-emerald-400">
               <CheckCircle2 className="w-6 h-6" />
               <h3 className="text-xl font-bold">Prompt Excelente (DevSecOps)</h3>
            </div>
            
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-sm text-slate-300 mb-6 flex-1 leading-relaxed">
                "Atue como um Engenheiro DevSecOps. Analise meu script <code>scanner.py</code> que usa a lib <code>socket</code>. Crie uma interface Web em Flask que tenha um <strong>input sanitizado</strong> para IP e apresente o resultado em um gráfico estilizado. <strong>Certifique-se de tratar exceções de rede.</strong>"
            </div>
            
            <div className="bg-amber-950/20 rounded-xl p-4 border border-amber-900/50 flex items-start gap-4">
               <div className="bg-amber-500/20 p-2 rounded-lg text-amber-400 shrink-0 mt-1">
                  <Terminal className="w-5 h-5" />
               </div>
               <div>
                  <h4 className="text-sm font-bold text-amber-400 mb-1 uppercase tracking-wider">A Estrutura do Prompt</h4>
                  <p className="text-amber-200/70 text-sm">
                     Ele define o <strong>Papel</strong> (Engenheiro DevSec), a <strong>Ferramenta</strong> (Flask/Socket) e as <strong>Restrições de Segurança</strong> (Sanitizar Input e Tratar Exceções).
                  </p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
