import { useState } from "react";
import { CheckCircle2, XCircle, HelpCircle, Trophy } from "lucide-react";

const QUESTION = {
    text: `No planeamento de uma rede convergente, o administrador optou por implementar QoS para proteger as chamadas VoIP (RTP) contra a saturação causada por transferências de ficheiros. Considerando a escalabilidade para milhares de utilizadores, qual é a arquitetura mais recomendada e qual o valor DSCP tipicamente utilizado para marcar a voz?`,
    options: [
        { label: "A", text: "IntServ, utilizando o protocolo RSVP para garantir a banda, e marcação DSCP CS3.", correct: false },
        { label: "B", text: "DiffServ, classificando e marcando os pacotes individualmente na origem, e utilizando a marcação DSCP EF (Expedited Forwarding).", correct: true },
        { label: "C", text: "DiffServ, utilizando o protocolo TCP para garantir a entrega dos pacotes de voz, sem marcação específica de DSCP.", correct: false },
        { label: "D", text: "IntServ, priorizando a fila através do algoritmo FIFO (First In, First Out).", correct: false },
        { label: "E", text: "Best-Effort, aumentando a largura de banda global do link para dispensar o uso de marcação DSCP.", correct: false },
    ],
    explanation: "O DiffServ é escalável, pois atua pacote a pacote sem guardar estados de reserva nos roteadores. O valor EF (Expedited Forwarding, DSCP=46) é o padrão da indústria para tráfego de voz em tempo real — defenido na RFC 3246."
};

export function RedesSlide11() {
    const [selected, setSelected] = useState<string | null>(null);
    const answered = selected !== null;

    return (
        <div className="flex flex-col min-h-[100%] flex-1 animate-in fade-in duration-500 max-w-4xl mx-auto w-full py-4">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <HelpCircle className="w-7 h-7 text-blue-400" />
                    <span className="text-blue-400 font-bold tracking-widest text-sm">FIXAÇÃO — ESTILO CCNA / ENADE</span>
                </div>
                <Trophy className="w-6 h-6 text-amber-400" />
            </div>

            <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 md:p-8 flex-1 flex flex-col shadow-2xl">
                <p className="text-xl md:text-2xl text-slate-100 font-semibold leading-relaxed mb-8">
                    {QUESTION.text}
                </p>

                <div className="space-y-3 flex-1">
                    {QUESTION.options.map((opt) => {
                        let cls = "bg-slate-800/80 border-slate-700 hover:bg-slate-700/80 text-slate-300";
                        let icon = null;
                        if (answered) {
                            if (opt.correct) {
                                cls = "bg-emerald-950/60 border-emerald-500 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.2)] scale-[1.01]";
                                icon = <CheckCircle2 className="w-7 h-7 text-emerald-400 shrink-0" />;
                            } else if (opt.label === selected) {
                                cls = "bg-rose-950/40 border-rose-500 text-rose-200 opacity-80";
                                icon = <XCircle className="w-7 h-7 text-rose-500 shrink-0" />;
                            } else {
                                cls = "bg-slate-900 border-slate-800 opacity-25";
                            }
                        }
                        return (
                            <button
                                key={opt.label}
                                disabled={answered}
                                onClick={() => setSelected(opt.label)}
                                className={`w-full text-left p-4 md:p-5 rounded-2xl border-2 transition-all duration-400 flex items-center justify-between gap-4 ${cls}`}
                            >
                                <div className="flex gap-3 items-start">
                                    <span className="font-black text-lg shrink-0 mt-0.5">{opt.label})</span>
                                    <span className="font-medium text-base leading-snug">{opt.text}</span>
                                </div>
                                {icon}
                            </button>
                        );
                    })}
                </div>

                {answered && (
                    <div className={`mt-6 animate-in slide-in-from-bottom-4 duration-500 p-5 rounded-2xl border ${selected === "B" ? "bg-emerald-900/30 border-emerald-500/50 text-emerald-200" : "bg-rose-900/30 border-rose-500/50 text-rose-200"}`}>
                        <strong className="text-lg block mb-2">Gabarito: Alternativa B ✅</strong>
                        <p className="opacity-90">{QUESTION.explanation}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
