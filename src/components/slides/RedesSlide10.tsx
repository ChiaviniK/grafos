import { Rocket, Github, Globe, MapPin } from "lucide-react";

const DELIVERABLES = [
    { icon: "🗺️", title: "Identificar o Cenário", desc: "Escolha uma rede real da sua cidade: rede municipal de saúde, sistema de semáforos inteligentes, ou universidade com VoIP." },
    { icon: "📊", title: "Analisar o Tráfego", desc: "Que tipos de dados trafegam na rede? Identifique pelo menos 3 classes: emergências (alto), videoconfêrencia (médio), dados (baixo)." },
    { icon: "🛠️", title: "Projetar a Política QoS", desc: "Defina as classes de tráfego, as marcações DSCP e o percentual de banda reservado para cada classe num Policy-Map (pode ser no Packet Tracer)." },
    { icon: "📝", title: "Documentar no GitHub", desc: "README.md com: cenário escolhido, diagrama da rede, tabela de classes de tráfego e captura de tela da topologia no Packet Tracer." },
];

export function RedesSlide10() {
    return (
        <div className="flex flex-col min-h-[100%] flex-1 animate-in fade-in duration-500 max-w-5xl mx-auto w-full py-4">
            <div className="flex items-center gap-3 mb-2">
                <Rocket className="w-8 h-8 text-purple-400" />
                <h2 className="text-4xl font-black text-slate-100">APS — Cidades Inteligentes e o 112</h2>
            </div>
            <p className="text-slate-400 text-xl mb-8">
                Atividade Prática de Extensão: projetar a política de QoS para uma rede de emergência de uma cidade.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 mb-6">
                {DELIVERABLES.map((d, i) => (
                    <div key={i} className="bg-slate-900 border border-slate-700 rounded-2xl p-5 hover:border-purple-500/40 transition-all hover:scale-[1.01] group">
                        <div className="text-3xl mb-3">{d.icon}</div>
                        <div className="text-xs font-bold text-purple-400 tracking-widest mb-1">ENTREGÁVEL {i + 1}</div>
                        <h3 className="font-bold text-slate-200 text-lg mb-2">{d.title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">{d.desc}</p>
                    </div>
                ))}
            </div>

            <div className="flex flex-wrap gap-4 p-5 bg-purple-950/30 border border-purple-500/30 rounded-2xl">
                <div className="flex items-center gap-2 text-purple-300 text-sm font-semibold">
                    <Globe className="w-4 h-4" /> Pode usar Cisco Packet Tracer ou GNS3
                </div>
                <div className="flex items-center gap-2 text-purple-300 text-sm font-semibold">
                    <Github className="w-4 h-4" /> Entrega via GitHub com README.md estruturado
                </div>
                <div className="flex items-center gap-2 text-purple-300 text-sm font-semibold">
                    <MapPin className="w-4 h-4" /> Escolha uma rede real da sua região
                </div>
            </div>
        </div>
    );
}
