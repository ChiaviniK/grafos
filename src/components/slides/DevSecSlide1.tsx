import { ShieldCheck, Target, Zap } from "lucide-react";

export function DevSecSlide1() {
  return (
    <div className="flex flex-col items-center justify-center  min-min-h-[100%] flex-1 flex-1  text-center animate-in fade-in zoom-in duration-500">
      
      <div className="relative mb-8">
        <div className="w-40 h-40 bg-emerald-500/10 rounded-full flex items-center justify-center border-4 border-emerald-500/20 shadow-[0_0_80px_rgba(16,185,129,0.2)]">
          <ShieldCheck className="w-20 h-20 text-emerald-400" />
        </div>
        <div className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-3 border-4 border-slate-900 shadow-lg animate-pulse">
           <Zap className="w-8 h-8 text-white" />
        </div>
      </div>

      <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-6 py-2 rounded-full font-bold border border-emerald-500/20 mb-6 tracking-wide shadow-inner">
        <Target className="w-5 h-5" />
        ODS 9 - INOVAÇÃO E INFRAESTRUTURA
      </div>

      <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 drop-shadow-sm">
        Agentes de IA e DevSec
      </h1>
      
      <p className="text-2xl text-slate-300 font-medium max-w-3xl mb-12 leading-relaxed">
        Como utilizar o ecossistema <strong className="text-blue-400">Google Antigravity</strong> para transformar scripts de segurança em soluções Web sofisticadas.
      </p>

      <div className="flex gap-4">
         <div className="bg-slate-800/80 px-4 py-2 rounded-lg border border-slate-700 text-slate-400 text-sm font-semibold tracking-wider">
             PROGRAMAÇÃO POR INTENÇÃO
         </div>
         <div className="bg-slate-800/80 px-4 py-2 rounded-lg border border-slate-700 text-slate-400 text-sm font-semibold tracking-wider">
             HUMAN-IN-THE-LOOP
         </div>
      </div>

    </div>
  );
}
