import { useState } from "react";
import { MessageSquare, Bot, ShieldAlert } from "lucide-react";

export function DevSecSlide4() {
  const [activeTab, setActiveTab] = useState<'llm' | 'agent'>('llm');

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500 max-w-5xl mx-auto w-full">
      <h2 className="text-4xl font-bold mb-4 tracking-tight text-white flex items-center gap-3">
         LLM Tradicional vs Agente Autônomo
      </h2>
      <p className="text-slate-400 text-xl mb-10">
         Selecione um dos modelos abaixo para entender a arquitetura de execução DevSecOps:
      </p>

      {/* Tabs */}
      <div className="flex gap-4 mb-8">
         <button 
            onClick={() => setActiveTab('llm')}
            className={`flex-1 py-4 px-6 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${activeTab === 'llm' ? 'bg-indigo-600 text-white shadow-[0_0_30px_rgba(79,70,229,0.3)]' : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border-2 border-slate-800'}`}
         >
            <MessageSquare className="w-6 h-6" />
            Chatbot Comum (LLM)
         </button>
         <button 
            onClick={() => setActiveTab('agent')}
            className={`flex-1 py-4 px-6 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${activeTab === 'agent' ? 'bg-emerald-600 text-white shadow-[0_0_30px_rgba(16,185,129,0.3)]' : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border-2 border-slate-800'}`}
         >
            <Bot className="w-6 h-6" />
            Agente Autônomo (Antigravity)
         </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-slate-900 border border-slate-700/80 rounded-3xl p-8 relative overflow-hidden transition-all duration-300">
         
         {activeTab === 'llm' && (
            <div className="animate-in fade-in slide-in-from-left-4 h-full flex flex-col justify-center">
               <div className="absolute top-0 right-0 p-8 opacity-5">
                  <MessageSquare className="w-64 h-64 text-indigo-500" />
               </div>
               
               <h3 className="text-3xl font-bold text-indigo-400 mb-6 border-b border-indigo-500/20 pb-4 inline-block">Modelo Reativo Isolado</h3>
               
               <ul className="space-y-6 text-xl text-slate-300 relative z-10 max-w-3xl">
                  <li className="flex items-start gap-4">
                     <span className="bg-indigo-500/20 text-indigo-400 w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 font-black text-lg">-</span>
                     <span><strong>Text-in, Text-out:</strong> Você envia um prompt, ele retorna um bloco de texto ou código. A execução depende 100% de você copiar e colar.</span>
                  </li>
                  <li className="flex items-start gap-4">
                     <span className="bg-indigo-500/20 text-indigo-400 w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 font-black text-lg">-</span>
                     <span><strong>Agnóstico de Contexto Local:</strong> Ele não sabe quais bibliotecas estão instaladas na sua máquina, nem lê o código-fonte inteiro do seu projeto.</span>
                  </li>
                  <li className="flex items-start gap-4">
                     <span className="bg-rose-500/20 text-rose-400 w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 font-black text-lg">!</span>
                     <span><strong>Risco de Cópia Cega:</strong> Promove o péssimo hábito de <em>Copy/Paste Driven Development</em>, sem validação arquitetural.</span>
                  </li>
               </ul>
            </div>
         )}

         {activeTab === 'agent' && (
            <div className="animate-in fade-in slide-in-from-right-4 h-full flex flex-col justify-center">
               <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Bot className="w-64 h-64 text-emerald-500" />
               </div>
               
               <h3 className="text-3xl font-bold text-emerald-400 mb-6 border-b border-emerald-500/20 pb-4 inline-block">Modelo Proativo Integrado</h3>
               
               <ul className="space-y-6 text-xl text-slate-300 relative z-10 max-w-3xl">
                  <li className="flex items-start gap-4">
                     <span className="bg-emerald-500/20 text-emerald-400 w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 font-black text-lg">✓</span>
                     <span><strong>Execução Semântica:</strong> Ele <em className="text-emerald-300 font-medium whitespace-nowrap">lê arquivos → altera código → testa → repara dependências</em> em um fluxo contínuo (Loop ReAct).</span>
                  </li>
                  <li className="flex items-start gap-4">
                     <span className="bg-emerald-500/20 text-emerald-400 w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 font-black text-lg">✓</span>
                     <span><strong>Integração de SO:</strong> Acesso direto para rodar comandos como <code>pip install flask</code> ou <code>npm run build</code>, acelerando a orquestração do ambiente.</span>
                  </li>
                  <li className="flex items-start gap-4">
                     <span className="bg-amber-500/20 text-amber-500 w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 font-black text-lg"><ShieldAlert className="w-4 h-4" /></span>
                     <span><strong>Validador Arquitetural (Human-in-the-Loop):</strong> Sua responsabilidade muda de "escrever ifs" para "validar se a lógica estruturada pelo Agente atende os requisitos de segurança da OWASP".</span>
                  </li>
               </ul>
            </div>
         )}
      </div>

    </div>
  );
}
