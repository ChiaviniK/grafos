import { useState } from "react";
import { Copy, CheckCircle2, FlaskConical, PenTool, ShieldCheck, Zap } from "lucide-react";

export function DevSecSlide8() {
  const [copied, setCopied] = useState(false);
  const [selectedRole, setSelectedRole] = useState(0);
  const [selectedAction, setSelectedAction] = useState(0);
  const [selectedConstraint, setSelectedConstraint] = useState(0);

  const roles = [
    { label: "Básico", text: "Atue como um programador web." },
    { label: "Seguro", text: "Atue como um Engenheiro DevSecOps Sênior especialista em cyber-defesa." },
    { label: "Academico", text: "Atue como um professor orientando um código limpo e refatorado." },
  ];

  const actions = [
    { label: "Simples", text: "Crie um site para o scanner.py." },
    { label: "Backend", text: "Analise o arquivo scanner.py e escreva uma API RESTful em Python (FastAPI)." },
    { label: "Fullstack", text: "Crie um dashboard em React e um backend Flask conectando ao scanner.py." },
  ];

  const constraints = [
    { label: "Rápido", text: "Faça funcionar." },
    { label: "Resiliente", text: "Trate todas as exceções de rede e socket (Timeout e ConnectionRefused)." },
    { label: "Blindado", text: "Obrigatório: Sanitize severamente todas as entradas do usuário (IPs) contra injeções. Evite funções OS.system()." },
  ];

  const generatedPrompt = `${roles[selectedRole].text} ${actions[selectedAction].text} ${constraints[selectedConstraint].text}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isPerfectPrompt = selectedRole === 1 && selectedAction === 2 && selectedConstraint === 2;

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500 max-w-6xl mx-auto w-full">
      <h2 className="text-4xl font-bold mb-4 tracking-tight text-emerald-400 flex items-center gap-3">
         Construtor Interativo de Prompt
      </h2>
      <p className="text-slate-400 text-xl mb-8">
         Monte o prompt perfeito selecionando as melhores opções para o nosso Agente de IA (Antigravity). Quando o prompt ficar verde, significa que a Tríade está pronta para produção!
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
         
         {/* Options Panel */}
         <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-slate-900 border border-slate-700/80 rounded-2xl p-5">
               <h3 className="font-bold text-blue-400 flex items-center gap-2 mb-4"><PenTool className="w-4 h-4"/> 1. Escolha o Papel</h3>
               <div className="flex flex-col gap-2">
                  {roles.map((r, i) => (
                     <button key={i} onClick={() => setSelectedRole(i)} className={`text-left px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors ${selectedRole === i ? 'bg-blue-500/20 border-blue-500 text-blue-200' : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-300 hover:border-slate-600'}`}>{r.label}</button>
                  ))}
               </div>
            </div>

            <div className="bg-slate-900 border border-slate-700/80 rounded-2xl p-5">
               <h3 className="font-bold text-amber-400 flex items-center gap-2 mb-4"><FlaskConical className="w-4 h-4"/> 2. Defina a Ação</h3>
               <div className="flex flex-col gap-2">
                  {actions.map((a, i) => (
                     <button key={i} onClick={() => setSelectedAction(i)} className={`text-left px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors ${selectedAction === i ? 'bg-amber-500/20 border-amber-500 text-amber-200' : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-300 hover:border-slate-600'}`}>{a.label}</button>
                  ))}
               </div>
            </div>

            <div className="bg-slate-900 border border-slate-700/80 rounded-2xl p-5">
               <h3 className="font-bold text-rose-400 flex items-center gap-2 mb-4"><ShieldCheck className="w-4 h-4"/> 3. Segurança (Restrição)</h3>
               <div className="flex flex-col gap-2">
                  {constraints.map((c, i) => (
                     <button key={i} onClick={() => setSelectedConstraint(i)} className={`text-left px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors ${selectedConstraint === i ? 'bg-rose-500/20 border-rose-500 text-rose-200' : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-300 hover:border-slate-600'}`}>{c.label}</button>
                  ))}
               </div>
            </div>

         </div>

         {/* Result View */}
         <div className="lg:col-span-7 flex flex-col">
            <div className={`flex-1 rounded-3xl border-2 p-8 transition-all duration-500 relative flex flex-col shadow-2xl overflow-hidden ${isPerfectPrompt ? 'bg-emerald-950/20 border-emerald-500 shadow-[0_0_50px_rgba(16,185,129,0.1)]' : 'bg-slate-950 border-slate-800'}`}>
               
               {isPerfectPrompt && (
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                     <ShieldCheck className="w-48 h-48 text-emerald-500 z-0" />
                  </div>
               )}

               <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4 relative z-10">
                  <h3 className={`font-bold flex items-center gap-2 ${isPerfectPrompt ? 'text-emerald-400' : 'text-slate-400'}`}>
                     {isPerfectPrompt ? <><CheckCircle2 className="w-5 h-5"/> Prompt Nível Produção!</> : "Prompt Resultante:"}
                  </h3>
                  <button onClick={copyToClipboard} className="text-slate-400 hover:text-white flex items-center gap-2 text-sm bg-slate-800 px-3 py-1.5 rounded-lg transition-colors">
                     {copied ? <span className="text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> Copiado</span> : <><Copy className="w-4 h-4"/> Copiar</>}
                  </button>
               </div>

               <div className={`text-2xl lg:text-3xl font-mono leading-relaxed flex-1 relative z-10 ${isPerfectPrompt ? 'text-emerald-100' : 'text-slate-300'}`}>
                  <span className={`transition-colors ${selectedRole === 1 ? 'text-blue-300' : ''}`}>{roles[selectedRole].text}</span>{" "}
                  <span className={`transition-colors ${selectedAction === 2 ? 'text-amber-300' : ''}`}>{actions[selectedAction].text}</span>{" "}
                  <span className={`transition-colors ${selectedConstraint === 2 ? 'text-rose-300 font-bold' : ''}`}>{constraints[selectedConstraint].text}</span>
               </div>
               
               {isPerfectPrompt && (
                  <div className="mt-8 bg-emerald-900/40 border border-emerald-500/50 p-4 rounded-xl text-emerald-200 flex items-center gap-4 animate-in slide-in-from-bottom-4">
                     <Zap className="w-6 h-6 shrink-0" />
                     <span>Excelente! Este é o exato input que você utilizará no laboratório (APS) com o Agente para guiar o seu desenvolvimento de forma segura!</span>
                  </div>
               )}
            </div>
         </div>

      </div>

    </div>
  );
}
