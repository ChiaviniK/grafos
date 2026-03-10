import { ShieldCheck, ArrowRight, BookOpen, Rocket } from "lucide-react";

export function DevSecSlide15() {
  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500 max-w-5xl mx-auto w-full">
      <div className="flex flex-col items-center justify-center text-center flex-1">
         
         <div className="relative mb-8">
           <div className="w-32 h-32 bg-slate-900 rounded-[2rem] flex items-center justify-center border border-slate-700 shadow-2xl relative z-10">
             <ShieldCheck className="w-16 h-16 text-emerald-400" />
           </div>
           
           {/* Decorative orbital elements */}
           <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full scale-150 z-0"></div>
         </div>

         <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tight text-white drop-shadow-lg">
            Laboratório Concluído!
         </h2>
         
         <p className="text-2xl text-slate-300 font-light max-w-3xl mb-12 leading-relaxed">
            Parabéns! Na aula de hoje você deixou de ser apenas um "Gerador" de códigos para se tornar um verdadeiro <strong className="text-emerald-400">Validador Arquitetural DevSecOps.</strong>
         </p>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl text-left">
            
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 hover:border-blue-500/50 transition-colors p-8 rounded-3xl">
               <div className="bg-blue-500/20 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                  <Rocket className="w-6 h-6 text-blue-400" />
               </div>
               <h3 className="text-2xl font-bold text-slate-200 mb-3">Próximos Passos</h3>
               <p className="text-slate-400 mb-6">
                  Aplique o framework "Human-in-the-Loop" também nos projetos das outras disciplinas (LFA, Redes Convergentes).
               </p>
               <div className="flex items-center text-blue-400 text-sm font-bold gap-2">
                  Construa. Valide. Entregue. <ArrowRight className="w-4 h-4"/>
               </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 hover:border-emerald-500/50 transition-colors p-8 rounded-3xl">
               <div className="bg-emerald-500/20 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                  <BookOpen className="w-6 h-6 text-emerald-400" />
               </div>
               <h3 className="text-2xl font-bold text-slate-200 mb-3">Material de Apoio</h3>
               <p className="text-slate-400 mb-6">
                  Os painéis Web desenvolvidos hoje servirão como base de escopo para nossa <strong>Avaliação Parcial 1</strong> que se aproxima.
               </p>
               <div className="flex items-center text-emerald-400 text-sm font-bold gap-2">
                  Revise seu Repositório <ArrowRight className="w-4 h-4"/>
               </div>
            </div>

         </div>

         <div className="mt-16 text-slate-500 text-sm tracking-widest font-mono">
             PROF. LUIZ CHIAVINI • UNIMAX CYBERSECURITY
         </div>
      </div>
    </div>
  );
}
