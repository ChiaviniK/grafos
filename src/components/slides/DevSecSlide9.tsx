import { Briefcase, Target, Clock, Terminal } from "lucide-react";

export function DevSecSlide9() {
  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500 max-w-5xl mx-auto w-full">
      <div className="flex items-center justify-between mb-8">
         <div className="flex items-center gap-3">
            <span className="bg-purple-500/20 text-purple-400 font-bold px-3 py-1 rounded-full text-xs tracking-wider border border-purple-500/30 flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5"/> APS LABORATÓRIO</span>
            <span className="text-slate-400 font-semibold">Parte 1 de 3</span>
         </div>
      </div>
      
      <h2 className="text-5xl font-black mb-6 tracking-tight text-white flex items-center gap-4">
         <Target className="w-12 h-12 text-purple-400" />
         O Desafio: Port Scanner Web
      </h2>

      <p className="text-2xl text-slate-300 font-light mb-12 max-w-4xl leading-relaxed">
         Sua missão é importar o script CLI criado na Aula 04 e utilizar o <strong>Google Antigravity</strong> para transformá-arlo numa ferramenta Web de segurança documentada para o seu portfólio.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
         
         <div className="bg-slate-900 border border-slate-700/80 rounded-3xl p-8 flex flex-col items-start relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5">
               <Terminal className="w-32 h-32 text-slate-500" />
            </div>
            <h3 className="text-2xl font-bold text-slate-200 mb-4 relative z-10">Ponto de Partida</h3>
            <ul className="text-slate-400 space-y-4 text-lg relative z-10">
               <li className="flex gap-3"><span className="text-purple-400 mt-1">✓</span> Seu arquivo <code>scanner.py</code> antigo.</li>
               <li className="flex gap-3"><span className="text-purple-400 mt-1">✓</span> Ele só verifica portas TCP abertas via terminal.</li>
               <li className="flex gap-3"><span className="text-purple-400 mt-1">✓</span> Nenhuma validação rigorosa de rede tratada.</li>
            </ul>
         </div>

         <div className="bg-purple-900/20 border-2 border-purple-500/30 rounded-3xl p-8 flex flex-col items-start relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5">
               <Target className="w-32 h-32 text-purple-500" />
            </div>
            <h3 className="text-2xl font-bold text-purple-400 mb-4 relative z-10">A Meta Final</h3>
            <ul className="text-purple-200/80 space-y-4 text-lg relative z-10">
               <li className="flex gap-3"><span className="text-purple-400 mt-1">✓</span> <strong>Front-end Web:</strong> Gráfico visual de portas scaneadas.</li>
               <li className="flex gap-3"><span className="text-purple-400 mt-1">✓</span> <strong>Backend Seguro:</strong> Flask lidando com a rede e validando inputs via Regex.</li>
               <li className="flex gap-3"><span className="text-purple-400 mt-1">✓</span> <strong>Banner Grabbing:</strong> O código deve tentar descobrir qual serviço roda na porta!</li>
            </ul>
         </div>

      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mt-8 flex items-center justify-center gap-2 text-slate-400">
         <Clock className="w-5 h-5 text-purple-400" />
         <span>Alocaremos os próximos <strong>40 minutos</strong> de sala para este projeto prático.</span>
      </div>

    </div>
  );
}
