import { useState, useEffect } from "react";
import { AlertTriangle, Play, RotateCcw } from "lucide-react";

const PACKET_TYPES = [
    { id: "voip1", label: "VoIP 🗣️", color: "bg-emerald-500", size: "w-20 h-8" },
    { id: "video1", label: "Video 🎥", color: "bg-blue-500", size: "w-20 h-8" },
    { id: "email1", label: "E-mail 📧", color: "bg-slate-500", size: "w-24 h-8" },
    { id: "voip2", label: "VoIP 🗣️", color: "bg-emerald-500", size: "w-20 h-8" },
    { id: "torrent", label: "Torrent 📦", color: "bg-red-700", size: "w-32 h-8" },
    { id: "email2", label: "E-mail 📧", color: "bg-slate-500", size: "w-24 h-8" },
    { id: "voip3", label: "VoIP 🗣️", color: "bg-emerald-500", size: "w-20 h-8" },
    { id: "backup", label: "Backup 🗄️", color: "bg-purple-700", size: "w-36 h-8" },
];

export function RedesSlide3() {
    const [running, setRunning] = useState(false);
    const [queue, setQueue] = useState<string[]>([]);

    useEffect(() => {
        if (!running) return;
        let tick = 0;
        const interval = setInterval(() => {
            const next = tick + 1;
            tick = next;
            if (next >= PACKET_TYPES.length) {
                clearInterval(interval);
                setRunning(false);
            }
            setQueue(PACKET_TYPES.slice(0, next + 1).map((p) => p.id));
        }, 600);
        return () => clearInterval(interval);
    }, [running]);

    const reset = () => { setRunning(false); setQueue([]); };

    const jitter = queue.filter((id) => id.startsWith("voip")).length > 1;

    return (
        <div className="flex flex-col min-h-[100%] flex-1 animate-in fade-in duration-500 max-w-5xl mx-auto w-full py-4">
            <h2 className="text-4xl font-black text-slate-100 mb-2 flex items-center gap-3">
                <AlertTriangle className="w-9 h-9 text-amber-400" />
                O Problema do Best-Effort
            </h2>
            <p className="text-slate-400 text-xl mb-8">Na Internet original, todos os pacotes são iguais. Clique em ▶ para ver o caos que isso provoca numa rede VoIP.</p>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Simulation */}
                <div>
                    <div className="bg-slate-950 border border-slate-700 rounded-2xl p-6 h-full flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-slate-300 font-bold text-sm tracking-wider">FILA BEST-EFFORT (FIFO)</span>
                            <div className="flex gap-2">
                                <button onClick={() => setRunning(true)} disabled={running} className="flex items-center gap-1 text-xs bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-3 py-1.5 rounded-lg font-bold transition-colors">
                                    <Play className="w-3 h-3" /> Simular
                                </button>
                                <button onClick={reset} className="flex items-center gap-1 text-xs bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded-lg transition-colors">
                                    <RotateCcw className="w-3 h-3" />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 border-2 border-dashed border-slate-700 rounded-xl p-3 space-y-2 min-h-[280px]">
                            {queue.length === 0 && (
                                <p className="text-slate-600 text-sm text-center mt-10">Aguardando simulação...</p>
                            )}
                            {PACKET_TYPES.filter((p) => queue.includes(p.id)).map((p) => (
                                <div
                                    key={p.id}
                                    className={`${p.color} ${p.size} rounded-lg text-white text-xs font-bold flex items-center justify-center shadow-lg animate-in slide-in-from-right-4 duration-300`}
                                >
                                    {p.label}
                                </div>
                            ))}
                        </div>

                        {jitter && (
                            <div className="mt-4 bg-red-950/50 border border-red-500/50 rounded-xl p-3 animate-in fade-in duration-500">
                                <p className="text-red-300 font-bold text-sm">⚠️ Jitter detectado! O pacote VoIP está preso atrás do Torrent (512 MB). A ligação vai falhar!</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Explanation */}
                <div className="space-y-4">
                    <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-5">
                        <h3 className="font-bold text-amber-400 text-lg mb-2">🚨 O que é o Jitter?</h3>
                        <p className="text-slate-300 text-sm">Variação no atraso de chegada dos pacotes. Para o VoIP, um Jitter &gt; 30ms já torna a voz ininteligível — como falar debaixo d'água.</p>
                    </div>
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
                        <h3 className="font-bold text-slate-200 text-lg mb-2">🧠 A Raiz do Problema</h3>
                        <p className="text-slate-400 text-sm">No modelo <strong className="text-white">Best-Effort</strong>, o router não faz distinção entre um download de torrent e uma ligação de emergência para o 112. A fila é servida por ordem de chegada (FIFO).</p>
                    </div>
                    <div className="bg-slate-900 border border-blue-500/30 rounded-2xl p-5">
                        <h3 className="font-bold text-blue-400 text-lg mb-2">💡 A Solução: QoS</h3>
                        <p className="text-slate-400 text-sm">Quality of Service é o conjunto de técnicas que ensinam a rede a <strong className="text-white">reconhecer e priorizar</strong> o tráfego sensível ao atraso.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
