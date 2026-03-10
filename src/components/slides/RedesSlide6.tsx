import { useState } from "react";
import { Tag, CheckCircle2 } from "lucide-react";

type DscpLevel = "" | "be" | "af" | "ef";

const DSCP_OPTIONS = [
    { value: "be" as DscpLevel, label: "BE — Best Effort (0)", desc: "Sem prioridade. Padrão para downloads e navegação.", color: "slate", textColor: "text-slate-300" },
    { value: "af" as DscpLevel, label: "AF — Assured Forwarding (34)", desc: "Prioridade média. Para vídeo/streaming não crítico.", color: "blue", textColor: "text-blue-300" },
    { value: "ef" as DscpLevel, label: "EF — Expedited Forwarding (46)", desc: "VIA VERDE: tráfego de voz em tempo real. Latência mínima garantida.", color: "emerald", textColor: "text-emerald-300" },
];

export function RedesSlide6() {
    const [selected, setSelected] = useState<DscpLevel>("");

    const correct = selected === "ef";

    return (
        <div className="flex flex-col min-h-[100%] flex-1 animate-in fade-in duration-500 max-w-5xl mx-auto w-full py-4">
            <div className="flex items-center gap-3 mb-2">
                <Tag className="w-8 h-8 text-blue-400" />
                <h2 className="text-4xl font-black text-slate-100">DiffServ — O Bilhete VIP</h2>
            </div>
            <p className="text-slate-400 text-xl mb-8">No DiffServ, o roteador marca o campo <code className="bg-slate-800 px-1.5 py-0.5 rounded text-blue-300 text-lg">DSCP</code> no cabeçalho IP do pacote. Escolha a marcação correta para o tráfego VoIP:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                {/* Packet visualization */}
                <div className="flex flex-col justify-center">
                    <div className="bg-slate-950 border-2 border-slate-700 rounded-2xl p-6 font-mono text-sm">
                        <div className="text-slate-500 text-xs tracking-widest mb-3">CABEÇALHO IP (pacote de voz RTP)</div>
                        <div className="space-y-2">
                            {[
                                { field: "Versão", value: "IPv4", color: "text-slate-400" },
                                { field: "TTL", value: "64", color: "text-slate-400" },
                                { field: "Protocolo", value: "UDP (0x11)", color: "text-slate-400" },
                                { field: "IP Origem", value: "192.168.1.10", color: "text-slate-400" },
                                { field: "IP Destino", value: "10.0.0.5", color: "text-slate-400" },
                                {
                                    field: "DSCP / ToS",
                                    value: selected === "" ? "???" : selected === "be" ? "0x00 (BE)" : selected === "af" ? "0x22 (AF34)" : "0x2E (EF) ✅",
                                    color: selected === "ef" ? "text-emerald-400 font-black" : selected === "" ? "text-rose-400 animate-pulse" : "text-amber-400",
                                    highlight: true
                                },
                            ].map((row) => (
                                <div key={row.field} className={`flex justify-between py-1 border-b border-slate-800 last:border-0 ${row.highlight ? "rounded bg-slate-900 px-2" : ""}`}>
                                    <span className="text-slate-600">{row.field}</span>
                                    <span className={row.color}>{row.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {correct && (
                        <div className="mt-4 animate-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-emerald-900/40 border border-emerald-500/50 rounded-xl p-4 flex items-center gap-3">
                                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                                <p className="text-emerald-200 font-semibold">Perfeito! O pacote tem a etiqueta EF. Cada roteador no caminho vai colocá-lo na fila LLQ — Low Latency Queuing — com prioridade estrita.</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* DSCP Selection */}
                <div className="flex flex-col justify-center gap-4">
                    <p className="text-slate-300 font-semibold">Qual marcação DSCP aplicar a uma chamada VoIP?</p>
                    {DSCP_OPTIONS.map((opt) => {
                        const isSelected = selected === opt.value;
                        const borderClass = opt.value === "ef"
                            ? isSelected ? "border-emerald-500 bg-emerald-950/50 scale-[1.02]" : "border-slate-700 hover:border-emerald-500/50"
                            : opt.value === "af"
                                ? isSelected ? "border-blue-500 bg-blue-950/40" : "border-slate-700 hover:border-blue-500/30"
                                : isSelected ? "border-slate-500 bg-slate-800" : "border-slate-700 hover:border-slate-500";
                        return (
                            <button
                                key={opt.value}
                                onClick={() => setSelected(opt.value)}
                                className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-300 ${borderClass}`}
                            >
                                <div className={`font-bold text-base ${opt.textColor}`}>{opt.label}</div>
                                <div className="text-slate-400 text-sm mt-1">{opt.desc}</div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
