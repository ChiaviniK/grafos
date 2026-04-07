import { Beaker, Dna, ShieldAlert } from "lucide-react";

export function LFASlide8_Topics1to3() {
  const topics = [
    {
      id: 1,
      title: "Análise Léxica em Compiladores Modernos",
      desc: "Como o algoritmo de Thompson permite que compiladores (GCC, LLVM) transformem gramáticas de linguagens em scanners ultra-rápidos.",
      icon: <Beaker className="w-5 h-5 text-blue-400" />,
      color: "border-blue-500/30 bg-blue-500/5",
      badge: "Compidadores"
    },
    {
      id: 2,
      title: "Bioinformática: Alinhamento de DNA com Gaps",
      desc: "Modelagem de deleções (gaps) em sequências genéticas usando transições-ε para encontrar similaridades funcionais entre genomas.",
      icon: <Dna className="w-5 h-5 text-emerald-400" />,
      color: "border-emerald-500/30 bg-emerald-500/5",
      badge: "Saúde / Bio"
    },
    {
      id: 3,
      title: "Deep Packet Inspection (DPI) em Firewalls",
      desc: "Uso do motor de Thompson para identificar assinaturas de malware (Snort/Suricata) em pacotes de rede em tempo real sem perda de pacotes.",
      icon: <ShieldAlert className="w-5 h-5 text-rose-400" />,
      color: "border-rose-500/30 bg-rose-500/5",
      badge: "Cybersec"
    }
  ];

  return (
    <div className="flex flex-col min-h-[100%] flex-1 animate-in fade-in duration-500">
      <div className="mb-6">
        <div className="inline-block px-3 py-1 bg-fuchsia-500/10 text-fuchsia-400 text-xs font-black tracking-widest uppercase rounded-full border border-fuchsia-500/30 mb-2">
            PESQUISA DISRUPTIVA — TEMAS 01 A 03
        </div>
        <h2 className="text-3xl font-extrabold text-slate-100">Exploração de <span className="text-fuchsia-400">Fronteira</span></h2>
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
