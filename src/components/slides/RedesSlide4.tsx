import { useState } from "react";
import { Car, Siren } from "lucide-react";

const CARDS = [
    {
        id: "intserv",
        label: "IntServ",
        analogy: "🚔 Limpador de Estrada",
        color: "amber",
        shortDesc: "Reserva antecipada via RSVP",
        reveal: {
            how: "Antes da ligação começar, o protocolo RSVP percorre todos os roteadores do caminho A→B e reserva banda.",
            pro: "Garantia total de largura de banda para o tráfego.",
            con: "Não escala! Com milhões de chamadas simultâneas, os roteadores ficam sem memória para armazenar todos os estados de reserva.",
            analogy: "Como chamar a polícia para limpar a rua antes de você sair. Funciona para uma cidade pequena, impossível numa metrópole."
        }
    },
    {
        id: "diffserv",
        label: "DiffServ",
        analogy: "🚑 Sirene Ligada",
        color: "blue",
        shortDesc: "Marcação de pacotes (DSCP EF)",
        reveal: {
            how: "Não há reserva. O pacote de voz recebe uma marcação DSCP=EF no cabeçalho IP. Os roteadores leem a etiqueta e colocam-no na fila de baixa latência (LLQ).",
            pro: "Altamente escalável. O roteador só lê uma etiqueta, sem guardar estado.",
            con: "Não garante banda absoluta; se a rede estiver congestionada, pode haver perda — mas os pacotes de voz serão sempre os últimos a ser descartados.",
            analogy: "Como ligar a sirene da ambulância. Os outros carros afastam-se automaticamente, sem ninguém ter reservado a estrada antes."
        }
    }
];

export function RedesSlide4() {
    const [revealed, setRevealed] = useState<string | null>(null);

    return (
        <div className="flex flex-col min-h-[100%] flex-1 animate-in fade-in duration-500 max-w-5xl mx-auto w-full py-4">
            <h2 className="text-4xl font-black text-slate-100 mb-2 flex items-center gap-3">
                <Car className="w-9 h-9 text-blue-400" />
                IntServ vs DiffServ
            </h2>
            <p className="text-slate-400 text-xl mb-8">Existem duas grandes arquiteturas de QoS. Clique em cada uma para descobrir a analogia e entender quando aplicar cada uma.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                {CARDS.map((card) => {
                    const isOpen = revealed === card.id;
                    const c = card.color === "amber"
                        ? { border: "border-amber-500", bg: "bg-amber-950/40", badge: "bg-amber-500/20 text-amber-300", btn: "bg-amber-600 hover:bg-amber-500", title: "text-amber-400", pro: "text-emerald-400", con: "text-rose-400" }
                        : { border: "border-blue-500", bg: "bg-blue-950/40", badge: "bg-blue-500/20 text-blue-300", btn: "bg-blue-600 hover:bg-blue-500", title: "text-blue-400", pro: "text-emerald-400", con: "text-rose-400" };

                    return (
                        <div
                            key={card.id}
                            onClick={() => setRevealed(isOpen ? null : card.id)}
                            className={`rounded-3xl border-2 p-6 md:p-8 cursor-pointer transition-all duration-500 flex flex-col ${isOpen ? `${c.border} ${c.bg} scale-[1.02]` : "border-slate-700 bg-slate-900 hover:border-slate-500"}`}
                        >
                            <div className={`text-xs font-bold mb-2 px-2 py-0.5 rounded-full w-fit ${c.badge}`}>{card.label}</div>
                            <div className="text-5xl mb-3">{card.analogy}</div>
                            <h3 className={`text-2xl font-bold mb-1 ${c.title}`}>{card.label}</h3>
                            <p className="text-slate-400 text-base mb-4">{card.shortDesc}</p>

                            {isOpen ? (
                                <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-400">
                                    <div className="bg-slate-900/60 rounded-xl p-4 text-sm text-slate-300">
                                        <strong className="text-white block mb-1">Como funciona:</strong>{card.reveal.how}
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="bg-emerald-950/40 rounded-xl p-3 text-sm border border-emerald-500/30">
                                            <strong className={`${c.pro} block mb-1`}>✅ Vantagem</strong>
                                            <span className="text-slate-300">{card.reveal.pro}</span>
                                        </div>
                                        <div className="bg-rose-950/40 rounded-xl p-3 text-sm border border-rose-500/30">
                                            <strong className={`${c.con} block mb-1`}>⚠️ Limitação</strong>
                                            <span className="text-slate-300">{card.reveal.con}</span>
                                        </div>
                                    </div>
                                    <div className="bg-slate-800/50 rounded-xl p-3 text-sm text-slate-400 italic">
                                        💡 {card.reveal.analogy}
                                    </div>
                                </div>
                            ) : (
                                <div className={`mt-auto pt-4 text-sm font-bold ${c.title} flex items-center gap-2`}>
                                    <Siren className="w-4 h-4" /> Clique para revelar
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
