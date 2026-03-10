import { Bot, Terminal, Blocks, Cpu } from "lucide-react";

export function DevSecSlide3() {
  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      <h2 className="text-4xl font-bold mb-6 tracking-tight text-emerald-400 flex items-center gap-4">
         <Bot className="w-10 h-10" />
         O que é um Agente Autônomo?
      </h2>

      <p className="text-2xl text-slate-300 font-light mb-12 leading-relaxed max-w-4xl">
         Diferente de gerar apenas texto, um Agente de IA (como o Google Antigravity) é desenhado para <strong>agir</strong>. Ele interpreta uma intenção e utiliza ferramentas do sistema para transformar ideias em código executável.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-1">
         
         <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col items-center text-center group hover:bg-slate-800/80 transition-all">
            <div className="w-20 h-20 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 mb-6 group-hover:scale-110 transition-transform">
               <Cpu className="w-10 h-10 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Raciocínio (ReAct)</h3>
            <p className="text-slate-400">
               O agente primeiro cria um plano ("Pensamento"), decide qual ferramenta usar, e analisa o resultado antes de dar o próximo passo.
            </p>
         </div>

         <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col items-center text-center group hover:bg-slate-800/80 transition-all">
            <div className="w-20 h-20 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 mb-6 group-hover:scale-110 transition-transform">
               <Blocks className="w-10 h-10 text-amber-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Acesso a Tools</h3>
            <p className="text-slate-400">
               Pode ler e escrever em arquivos, navegar na hierarquia do projeto e analisar a estrutura de dados (AST) do código.
            </p>
         </div>

         <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col items-center text-center group hover:bg-slate-800/80 transition-all">
            <div className="w-20 h-20 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 mb-6 group-hover:scale-110 transition-transform">
               <Terminal className="w-10 h-10 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Execução (CLI)</h3>
            <p className="text-slate-400">
               Gera comandos de terminal em background para testar builds, rodar scripts ou instalar dependências vitais de segurança.
            </p>
         </div>

      </div>

    </div>
  );
}
