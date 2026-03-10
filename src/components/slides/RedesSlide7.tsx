import { useState } from "react";
import { Shuffle, XCircle, Trophy } from "lucide-react";

type Packet = { id: string; label: string; type: "voip" | "data" | "backup"; correct: "llq" | "normal" };
type Drop = { id: string; queue: "llq" | "normal" };

const INITIAL_PACKETS: Packet[] = [
    { id: "p1", label: "VoIP 🗣️", type: "voip", correct: "llq" },
    { id: "p2", label: "E-mail 📧", type: "data", correct: "normal" },
    { id: "p3", label: "VoIP 🗣️", type: "voip", correct: "llq" },
    { id: "p4", label: "Download 📦", type: "backup", correct: "normal" },
    { id: "p5", label: "VoIP 🗣️", type: "voip", correct: "llq" },
    { id: "p6", label: "Backup 🗄️", type: "backup", correct: "normal" },
];

export function RedesSlide7() {
    const [packets] = useState<Packet[]>(INITIAL_PACKETS);
    const [dropped, setDropped] = useState<Drop[]>([]);
    const [dragging, setDragging] = useState<string | null>(null);
    const [checked, setChecked] = useState(false);

    const remaining = packets.filter((p) => !dropped.find((d) => d.id === p.id));
    const inQueue = (q: "llq" | "normal") =>
        dropped.filter((d) => d.queue === q).map((d) => packets.find((p) => p.id === d.id)!);

    const handleDrop = (q: "llq" | "normal") => {
        if (!dragging) return;
        setDropped((prev) => [...prev.filter((d) => d.id !== dragging), { id: dragging, queue: q }]);
        setDragging(null);
        setChecked(false);
    };

    const score = dropped.filter((d) => {
        const packet = packets.find((p) => p.id === d.id)!;
        return packet.correct === d.queue;
    }).length;

    const total = packets.length;
    const allPlaced = dropped.length === total;

    const reset = () => { setDropped([]); setChecked(false); };

    return (
        <div className="flex flex-col min-h-[100%] flex-1 animate-in fade-in duration-500 max-w-5xl mx-auto w-full py-4">
            <div className="flex items-center gap-3 mb-2">
                <Shuffle className="w-8 h-8 text-purple-400" />
                <h2 className="text-4xl font-black text-slate-100">
                    Mini-Game — A Fila do Router 🎮
                </h2>
            </div>
            <p className="text-slate-400 text-xl mb-6">
                Arraste cada pacote para a fila correta: <strong className="text-emerald-400">LLQ (Via Verde)</strong> para voz, <strong className="text-slate-300">Normal (FIFO)</strong> para o resto.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                {/* Packet pool */}
                <div className="bg-slate-900 border-2 border-dashed border-slate-700 rounded-2xl p-4 flex flex-col">
                    <span className="text-xs font-bold text-slate-500 tracking-widest mb-3">CHEGANDO NA REDE</span>
                    <div className="space-y-2 flex-1">
                        {remaining.map((p) => (
                            <div
                                key={p.id}
                                draggable
                                onDragStart={() => setDragging(p.id)}
                                className={`px-4 py-2 rounded-xl font-bold text-sm cursor-grab active:cursor-grabbing select-none transition-all border-2 animate-in fade-in ${p.type === "voip"
                                    ? "bg-emerald-900/60 border-emerald-500/60 text-emerald-300"
                                    : p.type === "data"
                                        ? "bg-slate-800 border-slate-600 text-slate-300"
                                        : "bg-purple-900/50 border-purple-600/50 text-purple-300"
                                    }`}
                            >
                                {p.label}
                            </div>
                        ))}
                        {remaining.length === 0 && <p className="text-slate-600 text-xs text-center mt-4">Todos os pacotes foram distribuídos!</p>}
                    </div>
                </div>

                {/* LLQ */}
                <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("llq")}
                    className="bg-emerald-950/30 border-2 border-emerald-500/50 rounded-2xl p-4 flex flex-col min-h-[200px] hover:border-emerald-400 transition-colors"
                >
                    <span className="text-xs font-bold text-emerald-400 tracking-widest mb-1">🚑 LLQ — VIA VERDE</span>
                    <span className="text-xs text-emerald-600 mb-3">Prioridade Estrita · Baixa Latência</span>
                    <div className="space-y-2 flex-1">
                        {inQueue("llq").map((p) => (
                            <div key={p.id} className="px-3 py-2 rounded-lg bg-emerald-800/60 border border-emerald-500/40 text-emerald-200 text-sm font-bold">{p.label}</div>
                        ))}
                    </div>
                </div>

                {/* FIFO */}
                <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop("normal")}
                    className="bg-slate-900/50 border-2 border-slate-600 rounded-2xl p-4 flex flex-col min-h-[200px] hover:border-slate-400 transition-colors"
                >
                    <span className="text-xs font-bold text-slate-400 tracking-widest mb-1">📦 FIFO — NORMAL</span>
                    <span className="text-xs text-slate-600 mb-3">Best-Effort · Descartável em congestionamento</span>
                    <div className="space-y-2 flex-1">
                        {inQueue("normal").map((p) => (
                            <div key={p.id} className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-600 text-slate-300 text-sm font-bold">{p.label}</div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
                <button onClick={reset} className="px-5 py-2 rounded-xl border border-slate-700 text-slate-400 hover:border-slate-500 transition-all font-semibold text-sm">↺ Reiniciar</button>
                {allPlaced && !checked && (
                    <button onClick={() => setChecked(true)} className="px-6 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all animate-in fade-in">
                        Verificar Resultado →
                    </button>
                )}
                {checked && (
                    <div className={`flex items-center gap-3 px-5 py-2 rounded-xl animate-in slide-in-from-right-4 ${score === total ? "bg-emerald-900/40 border border-emerald-500/50 text-emerald-200" : "bg-amber-900/40 border border-amber-500/50 text-amber-200"}`}>
                        {score === total
                            ? <><Trophy className="w-5 h-5 text-amber-400" /> Perfeito! {score}/{total} pacotes corretos!</>
                            : <><XCircle className="w-5 h-5 text-rose-400" /> {score}/{total} corretos. Tente novamente.</>}
                    </div>
                )}
            </div>
        </div>
    );
}
