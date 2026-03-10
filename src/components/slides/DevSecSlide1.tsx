import { ShieldCheck, Target, Zap } from "lucide-react";

export function DevSecSlide1() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center animate-in fade-in zoom-in duration-500">
      
      <div className="relative mb-8">
        <div className="w-32 h-32 bg-emerald-500/10 rounded-full flex items-center justify-center border-4 border-emerald-500/20 shadow-[0_0_50px_rgba(16,185,129,0.2)]">
          <ShieldCheck className="w-16 h-16 text-emerald-400" />
        </div>
        <div className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-2 border-4 border-slate-900 shadow-lg animate-pulse">
           <Zap className="w-6 h-6 text-white" />
        </div>
      </div>

      <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-1.5 rounded-full text-sm font-bold border border-emerald-500/20 mb-6 tracking-wide">
        <Target className="w-4 h-4" />
        OBJETIVO: ODS 9 - INOVAÇÃO E INFRAESTRUTURA
      </div>

      <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
        Agentes de IA e DevSec
      </h1>
      
      <p className="text-xl md:text-2xl text-slate-300 font-medium max-w-2xl mb-8 leading-relaxed">
        Como utilizar o ecossistema <strong className="text-blue-400">Google Antigravity</strong> para transformar scripts simples em aplicações seguras.
      </p>

      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 max-w-xl text-left shadow-inner">
         <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Competências da Aula</h3>
         <ul className="space-y-3 text-slate-300">
            <li className="flex items-start gap-3">
               <span className="text-emerald-400 mt-0.5">✓</span>
               <span>Modelar sistemas computacionais e de segurança.</span>
            </li>
            <li className="flex items-start gap-3">
               <span className="text-emerald-400 mt-0.5">✓</span>
               <span>Desenvolver com novas tecnologias generativas.</span>
            </li>
            <li className="flex items-start gap-3">
               <span className="text-emerald-400 mt-0.5">✓</span>
               <span>Reconhecer a necessidade de atualização constante.</span>
            </li>
         </ul>
      </div>

    </div>
  );
}
