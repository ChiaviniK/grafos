import { Code, Terminal, Github, Briefcase, FileText } from "lucide-react";

export function DevSecSlide4() {
  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      
      <div className="flex items-center gap-3 mb-6">
         <span className="bg-purple-500/20 text-purple-400 font-bold px-3 py-1 rounded-full text-xs tracking-wider border border-purple-500/30 flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5"/> APS - Atividade Prática</span>
         <h2 className="text-3xl font-bold tracking-tight text-white">
            Dashboard Web para o Scanner
         </h2>
      </div>

      <p className="text-slate-400 text-lg mb-8 max-w-3xl">
         O objetivo deste laboratório é utilizar o <strong>Google Antigravity</strong> para evoluir o nosso script CLI de Port Scanner (Aula 04) para uma ferramenta Web completa e documentada para o seu portfólio.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 mb-4">
         
         {/* Step 1 */}
         <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden flex flex-col">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center border border-slate-700 mb-6 text-xl font-black text-slate-500">1</div>
            <h3 className="text-xl font-bold text-slate-200 mb-3 flex items-center gap-2">
               <Terminal className="w-5 h-5 text-blue-400" /> A Base (CLI)
            </h3>
            <p className="text-slate-400 text-sm flex-1">
               Abra o Antigravity e importe o <code>scanner.py</code>. Primeiramente, peça à IA para adicionar uma funcionalidade de <strong>Banner Grabbing</strong> (Identificar qual serviço exato está rodando na porta aberta, ex: Apache 2.4).
            </p>
         </div>

         {/* Step 2 */}
         <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden flex flex-col">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center border border-slate-700 mb-6 text-xl font-black text-slate-500">2</div>
            <h3 className="text-xl font-bold text-slate-200 mb-3 flex items-center gap-2">
               <Code className="w-5 h-5 text-emerald-400" /> Web (Front-End)
            </h3>
            <p className="text-slate-400 text-sm flex-1">
               Usando a Programação por Intenção, direcione o agente a construir uma interface gráfica usando Flask ou FastAPI com React/Tailwind. Exija que o campo de IP do alvo seja <strong>sanitizado</strong> contra injeções.
            </p>
         </div>

         {/* Step 3 */}
         <div className="bg-slate-900 border-2 border-purple-500/30 hover:border-purple-500/60 rounded-3xl p-6 relative overflow-hidden flex flex-col transition-colors shadow-[0_0_30px_rgba(168,85,247,0.05)]">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30 mb-6 text-xl font-black text-purple-400">3</div>
            <h3 className="text-xl font-bold text-slate-200 mb-3 flex items-center gap-2">
               <Github className="w-5 h-5 text-slate-100" /> Portfólio (GitHub)
            </h3>
            <p className="text-slate-400 text-sm flex-1">
               Revise o código gerado! Se validado, publique no GitHub. Crie um <code>README.md</code> contendo prints da tela e explique <strong>como a Inteligência Artificial foi utilizada como pilar de assistência</strong> neste desenvolvimento.
            </p>
         </div>

      </div>

      {/* Footer warning */}
      <div className="bg-blue-950/30 rounded-2xl p-4 border border-blue-900 sm:flex items-center justify-between">
         <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-blue-400" />
            <span className="text-blue-200 text-sm">Tempo estimado: <strong>40 minutos</strong> de laboratório prático.</span>
         </div>
      </div>
      
    </div>
  );
}
