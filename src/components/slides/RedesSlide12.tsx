import { GraduationCap, BookOpen, Star } from "lucide-react";

const STUDY_TIPS = [
    { icon: "🌊", title: "Nyquist e Largura de Banda", desc: "Relembrar o Teorema de Nyquist e como ele define a taxa de amostragem mínima de um sinal de voz: 8000 amostras/segundo.", tag: "Aula 03" },
    { icon: "🎙️", title: "Codecs (G.711, G.729)", desc: "Diferença de processamento vs. largura de banda entre os codecs. G.711 usa 64 kbps (sem compressão); G.729 usa 8 kbps (com compressão pesada).", tag: "Aula 04" },
    { icon: "⏱️", title: "Jitter e Packet Loss", desc: "Definições exatas: Jitter é a variação do atraso; Packet Loss é a percentagem de pacotes perdidos. Limites aceitáveis para VoIP: Jitter < 30ms, Loss < 1%.", tag: "Aula 04" },
    { icon: "🚦", title: "IntServ vs DiffServ", desc: "A diferença principal: IntServ guarda estado (RSVP, não escalável); DiffServ usa etiquetas DSCP (escalável, sem estado). DiffServ é o padrão atual.", tag: "Aula 05 ← HOJE" },
];

export function RedesSlide12() {
    return (
        <div className="flex flex-col min-h-[100%] flex-1 animate-in fade-in duration-500 max-w-5xl mx-auto w-full py-4">
            <div className="flex items-center gap-3 mb-2">
                <GraduationCap className="w-9 h-9 text-amber-400" />
                <h2 className="text-4xl font-black text-slate-100">Até a Próxima, Redes!</h2>
            </div>
            <p className="text-slate-400 text-xl mb-8">
                Na <strong className="text-amber-400">Aula 06</strong> temos a nossa <strong className="text-amber-400">Avaliação N1 (AP1)</strong>. Aqui estão os tópicos-chave para estudar nesta semana:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 mb-6">
                {STUDY_TIPS.map((tip, i) => (
                    <div key={i} className={`bg-slate-900 border rounded-2xl p-5 transition-all hover:scale-[1.01] ${i === 3 ? "border-amber-500/50 bg-amber-950/10 shadow-[0_0_20px_rgba(251,191,36,0.05)]" : "border-slate-700 hover:border-slate-500"}`}>
                        <div className="text-3xl mb-3">{tip.icon}</div>
                        <span className={`text-xs font-bold tracking-widest px-2 py-0.5 rounded-full ${i === 3 ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" : "bg-slate-800 text-slate-500"}`}>{tip.tag}</span>
                        <h3 className="font-bold text-slate-100 text-lg mt-2 mb-1">{tip.title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">{tip.desc}</p>
                    </div>
                ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 bg-slate-900 border border-slate-700 rounded-2xl p-6">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="w-5 h-5 text-blue-400" />
                        <span className="font-bold text-slate-200">Referências Principais</span>
                    </div>
                    <p className="text-slate-400 text-sm">Kurose & Ross — <em>Redes de Computadores e a Internet</em>, Cap. Multimídia na Rede</p>
                    <p className="text-slate-400 text-sm mt-1">RFC 2474 — DiffServ Field Definition</p>
                    <p className="text-slate-400 text-sm mt-1">NetworkChuck — <em>"QoS Explained"</em> (YouTube)</p>
                </div>
                <div className="flex items-center justify-center">
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 text-center">
                        <Star className="w-10 h-10 text-amber-400 mx-auto mb-2" />
                        <p className="font-black text-amber-400 text-lg">Boa sorte na N1!</p>
                        <p className="text-slate-500 text-xs mt-1">Prof. Luiz Chiavini</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
