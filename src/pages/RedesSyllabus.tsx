import { Network, Calendar, PlayCircle, Lock, Coffee } from "lucide-react";
import { Link } from "react-router-dom";

const SYLLABUS = [
  { date: "03/02", title: "Aula 01", status: "completed" },
  { date: "10/02", title: "Aula 02", status: "completed" },
  { date: "17/02", title: "Feriado / Recesso", status: "holiday" },
  { date: "24/02", title: "Aula 03", status: "completed" },
  { date: "03/03", title: "Aula 04", status: "completed" },
  { date: "10/03", title: "Aula 05", status: "unlocked", path: "/redes/aula5" },
  { date: "17/03", title: "Aula 06", status: "locked" },
  { date: "24/03", title: "Aula 07", status: "locked" },
  { date: "31/03", title: "Aula 08", status: "locked" },
  { date: "07/04", title: "Aula 09", status: "locked" },
  { date: "14/04", title: "Aula 10", status: "locked" },
  { date: "21/04", title: "Feriado / Recesso", status: "holiday" },
  { date: "28/04", title: "Aula 11", status: "locked" },
  { date: "05/05", title: "Aula 12", status: "locked" },
  { date: "12/05", title: "Aula 13", status: "locked" },
  { date: "19/05", title: "Aula 14", status: "locked" },
  { date: "26/05", title: "Aula 15", status: "locked" },
  { date: "02/06", title: "Aula 16", status: "locked" },
  { date: "09/06", title: "Aula 17", status: "locked" },
  { date: "16/06", title: "Aula 18", status: "locked" },
  { date: "23/06", title: "Aula 19 - Fechamento", status: "locked" },
];

export function RedesSyllabus() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 border-b border-slate-800 pb-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
               <Network className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                 <Link to="/" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Portal</Link>
                 <span className="text-slate-600">/</span>
                 <span className="text-blue-400 font-medium text-sm">Syllabus</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-100">
                Redes Convergentes
              </h1>
            </div>
          </div>
          <div className="text-right hidden sm:block">
             <div className="text-slate-400 text-sm font-medium">Carga Horária</div>
             <div className="text-xl font-bold text-slate-200">60h</div>
          </div>
        </header>

        <div className="space-y-4">
          {SYLLABUS.map((item, index) => {
            const isCompleted = item.status === "completed";
            const isUnlocked = item.status === "unlocked";
            const isHoliday = item.status === "holiday";
            const isLocked = item.status === "locked";

            return (
              <div 
                key={index}
                className={`flex gap-4 p-4 rounded-xl border transition-all ${
                  isUnlocked 
                    ? "bg-slate-900 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.1)] scale-[1.02]" 
                    : isHoliday
                    ? "bg-slate-900/30 border-slate-800/50 opacity-60"
                    : "bg-slate-900/50 border-slate-800"
                }`}
              >
                <div className={`w-24 shrink-0 flex items-center gap-2 font-mono text-sm ${
                  isUnlocked ? "text-blue-400" : isHoliday ? "text-slate-500" : "text-slate-400"
                }`}>
                  <Calendar className="w-4 h-4" />
                  {item.date}
                </div>
                
                <div className="flex-1 flex items-center justify-between">
                  <span className={`font-semibold ${
                    isUnlocked ? "text-slate-100 text-lg" : 
                    isCompleted ? "text-slate-300" : 
                    isHoliday ? "text-slate-500 line-through decoration-slate-600" : "text-slate-500"
                  }`}>
                    {item.title}
                  </span>
                  
                  {isUnlocked && item.path && (
                     <Link 
                       to={item.path}
                       className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg shadow-blue-500/20 transition-all"
                     >
                        <PlayCircle className="w-4 h-4"/>
                        Iniciar Aula
                     </Link>
                  )}

                  {isHoliday && (
                     <div className="flex items-center gap-2 text-slate-500 text-sm font-medium px-3 py-1 bg-slate-800/50 rounded-full border border-slate-700/50">
                        <Coffee className="w-4 h-4"/>
                        Sem Aula
                     </div>
                  )}

                  {isLocked && (
                     <div className="flex items-center gap-2 text-slate-600 text-sm">
                        <Lock className="w-4 h-4"/>
                        Acesso Bloqueado
                     </div>
                  )}
                  
                  {isCompleted && (
                     <div className="text-emerald-500/70 text-sm font-medium">
                        ✓ Ministrada
                     </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
