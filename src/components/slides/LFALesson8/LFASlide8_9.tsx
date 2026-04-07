import { Settings, Telescope, Milestone } from "lucide-react";

export function LFASlide8_Topics4to6() {
  const topics = [
    {
      id: 4,
      title: "Manutenção Preditiva com Logs de Sensores",
      desc: "Capturar precursores de falha (vibração, calor) como strings simbólicas e usar AFN-ε para disparar alertas antes da quebra de robôs industriais.",
      icon: <Settings className="w-5 h-5 text-emerald-400" />,
      color: "border-emerald-500/30 bg-emerald-500/5",
      badge: "Indústria 4.0"
    },
    {
      id: 5,
      title: "Astronomia: Trânsito de Exoplanetas",
      desc: "Análise de curvas de luz estelar discretizadas. Identificação de padrões periódicos de queda de luminosidade (Kepler/TESS) via Thompson.",
      icon: <Telescope className="w-5 h-5 text-orange-400" />,
      color: "border-orange-500/30 bg-orange-500/5",
      badge: "Espacial"
    },
    {
      id: 6,
      title: "Controle de Tráfego: Equivalência Petri",
      desc: "Modelagem de semáforos inteligentes. Provar a ausência de deadlocks e estados de perigo em cruzamentos densos via transições silenciosas (τ=ε).",
      icon: <Milestone className="w-5 h-5 text-cyan-400" />,
      color: "border-cyan-500/30 bg-cyan-500/5",
      badge: "Smart Cities"
    }
  ];

  return (
    <div className="flex flex-col min-h-[100%] flex-1 animate-in fade-in duration-500">
      <div className="mb-6">
        <div className="inline-block px-3 py-1 bg-fuchsia-500/10 text-fuchsia-400 text-xs font-black tracking-widest uppercase rounded-full border border-fuchsia-500/30 mb-2">
            PESQUISA DISRUPTIVA — TEMAS 04 A 06
        </div>
        <h2 className="text-3xl font-extrabold text-slate-100">Exploração de <span className="text-fuchsia-400">Sistemas</span></h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 items-stretch">
        {topics.map(t => (
          <div key={t.id} className={`flex flex-col p-6 rounded-2xl border transition-all hover:scale-[1.02] shadow-xl ${t.color}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center">
                {t.icon}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Grupo {t.id}</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2 leading-tight">{t.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">{t.desc}</p>
            <div className="pt-4 border-t border-slate-800 mt-auto">
                <span className="text-[10px] font-black text-fuchsia-400 bg-fuchsia-500/10 px-2 py-1 rounded-md border border-fuchsia-500/20">{t.badge}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
