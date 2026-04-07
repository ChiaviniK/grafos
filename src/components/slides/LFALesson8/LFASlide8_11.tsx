import { Languages, Cpu, LineChart } from "lucide-react";

export function LFASlide8_Topics10to12() {
  const topics = [
    {
      id: 10,
      title: "NLP: Morfologia de Línguas Complexas",
      desc: "Processamento de línguas aglutinantes (Turco, Finlandês). Usar AFN-ε para decompor palavras longas em seus radicais e sufixos semânticos.",
      icon: <Languages className="w-5 h-5 text-sky-400" />,
      color: "border-sky-500/30 bg-sky-500/5",
      badge: "Linguística"
    },
    {
      id: 11,
      title: "IoT: Protocolos de Ultra-baixo Consumo",
      desc: "Verificação de máquinas de estado para chips de baixo consumo. Modelar handshakes de rádio (LoRa/Zigbee) via Thompson e evitar loops de energia.",
      icon: <Cpu className="w-5 h-5 text-amber-500" />,
      color: "border-amber-500/30 bg-amber-500/5",
      badge: "Hardware / IoT"
    },
    {
      id: 12,
      title: "Finanças: Detecção de Padrões HFT",
      desc: "Monitoramento de High-Frequency Trading. Identificar sinais de 'Spoofing' e manipulação de mercado em microssegundos usando AFN-ε.",
      icon: <LineChart className="w-5 h-5 text-emerald-400" />,
      color: "border-emerald-500/30 bg-emerald-500/5",
      badge: "FinTech"
    }
  ];

  return (
    <div className="flex flex-col min-h-[100%] flex-1 animate-in fade-in duration-500">
      <div className="mb-6">
        <div className="inline-block px-3 py-1 bg-fuchsia-500/10 text-fuchsia-400 text-xs font-black tracking-widest uppercase rounded-full border border-fuchsia-500/30 mb-2">
            PESQUISA DISRUPTIVA — TEMAS 10 A 12
        </div>
        <h2 className="text-3xl font-extrabold text-slate-100">Exploração de <span className="text-fuchsia-400">Eficiência</span></h2>
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
