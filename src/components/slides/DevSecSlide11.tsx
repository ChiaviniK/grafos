import { Github, FileText, CheckCircle2, Copy } from "lucide-react";
import { useState } from "react";

export function DevSecSlide11() {
  const [copied, setCopied] = useState(false);

  const markdownContent = `# Port Scanner Web
> Um Scanner TCP seguro desenvolvido com assistência de IA Gen.

## Tecnologias
- Python (Flask)
- HTML/CSS Interativo (Tailwind)
- Google Antigravity (AI-Assisted Development)

## Práticas de Segurança Implementadas
1. Validação de IP via Regex para prevenir OS Command Injection.
2. Tratamento de exceções (Timeout) para evitar travamento da API.
3. Banner Grabbing validado sem chamadas shell.`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col  min-min-h-[100%] flex-1 flex-1  animate-in fade-in duration-500 max-w-5xl mx-auto w-full">
      <div className="flex items-center justify-between mb-8">
         <div className="flex items-center gap-3">
            <span className="bg-purple-500/20 text-purple-400 font-bold px-3 py-1 rounded-full text-xs tracking-wider border border-purple-500/30 flex items-center gap-1.5"><Github className="w-3.5 h-3.5"/> APS LABORATÓRIO</span>
            <span className="text-slate-400 font-semibold">Parte 3 de 3</span>
         </div>
      </div>
      
      <h2 className="text-4xl font-bold mb-4 tracking-tight text-white flex items-center gap-4">
         <Github className="w-10 h-10 text-slate-100" />
         Publicação no Portfólio
      </h2>

      <p className="text-lg text-slate-400 mb-8 max-w-3xl">
         Seu projeto "Port Scanner Dashboard" está no ar localmente e validado. Agora você precisa documentar a arquitetura e empacotar isso no GitHub!
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
         
         <div className="bg-slate-900 border border-slate-700/80 rounded-3xl p-6 flex flex-col items-start relative shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-3 mb-6 w-full border-b border-slate-800 pb-4">
                <FileText className="w-6 h-6 text-emerald-400" />
                <h3 className="text-xl font-bold text-emerald-400 flex-1">O README.md Ideal</h3>
                <button onClick={copyToClipboard} className="text-slate-400 hover:text-white flex items-center gap-2 text-sm bg-slate-800 px-3 py-1.5 rounded-lg transition-colors">
                     {copied ? <span className="text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> Copiado</span> : <><Copy className="w-4 h-4"/> Copiar Base</>}
                </button>
            </div>
            
            <p className="text-sm text-slate-400 mb-4 inline-block">
               Use este template para demonstrar clareza sobre o uso da Inteligência Artificial no processo:
            </p>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-sm font-mono text-slate-300 whitespace-pre w-full overflow-x-auto">
               {markdownContent}
            </div>
         </div>

         <div className="flex flex-col gap-6">
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-3xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden flex-1 group hover:border-blue-500/60 transition-colors">
               <h3 className="text-xl font-bold text-blue-400 mb-2">Tire um PrintScreen</h3>
               <p className="text-slate-400 text-sm mb-4">
                  Coloque uma imagem do seu Dashboard funcionando na mesma pasta do repositório para adicionar ao README.
               </p>
               <div className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-lg font-mono text-xs text-slate-500 group-hover:text-blue-300 transition-colors">
                  ![Dashboard Preview](./preview.png)
               </div>
            </div>

            <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-3xl p-6 flex items-center gap-4">
               <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
               </div>
               <div>
                  <h4 className="text-emerald-400 font-bold mb-1">Dever de Casa</h4>
                  <p className="text-emerald-100/70 text-sm line-clamp-2">
                     Subir o projeto completo no GitHub e me enviar o link no canal oficial da turma para nota da APS!
                  </p>
               </div>
            </div>
         </div>

      </div>

    </div>
  );
}
