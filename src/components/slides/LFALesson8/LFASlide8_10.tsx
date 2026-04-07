import { ShieldAlert, Trophy, Gavel } from "lucide-react";

export function LFASlide8_Topics7to9() {
  const topics = [
    {
      id: 7,
      title: "Segurança de LLM: Detecção de Jailbreak",
      desc: "Uso de AFN-ε para identificar padrões de 'Prompt Injection' que tentam burlar camadas de segurança de modelos como GPT-4/Claude.",
      icon: <ShieldAlert className="w-5 h-5 text-fuchsia-400" />,
      color: "border-fuchsia-500/30 bg-fuchsia-500/5",
      badge: "Inteligência Artificial"
    },
    {
      id: 8,
      title: "Sports Analytics: Táticas em Tempo Real",
      desc: "Convertendo movimentos de jogadores e bola em strings (P=Passe, D=Drible, S=Chute) e reconhecendo jogadas como 'Contra-ataque' ou 'Tiki-taka'.",
      icon: <Trophy className="w-5 h-5 text-amber-400" />,
      color: "border-amber-500/30 bg-amber-500/5",
      badge: "Sports Tech"
    },
    {
      id: 9,
      title: "Smart Contracts: Verificação de Reentrância",
      desc: "Análise formal de contratos na rede Ethereum. Usar autômatos para detectar ciclos de vunerabilidade de reentrância em chamadas externas (Evitando Hacks).",
      icon: <Gavel className="w-5 h-5 text-blue-400" />,
      color: "border-blue-500/30 bg-blue-500/5",
      badge: "Blockchain / Web3"
    }
  ];

  return (
    <div className="flex flex-col min-h-[100%] flex-1 animate-in fade-in duration-500">
      <div className="mb-6">
        <div className="inline-block px-3 py-1 bg-fuchsia-500/10 text-fuchsia-400 text-xs font-black tracking-widest uppercase rounded-full border border-fuchsia-500/30 mb-2">
            PESQUISA DISRUPTIVA — TEMAS 07 A 09
        </div>
        <h2 className="text-3xl font-extrabold text-slate-100">Exploração de <span className="text-fuchsia-400">Sociedade</span></h2>
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
