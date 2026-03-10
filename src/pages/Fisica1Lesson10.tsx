import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";

function Shell({ title, aula, total, current, onPrev, onNext, children }: {
    title: string; aula: string; total: number; current: number;
    onPrev: () => void; onNext: () => void; children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-50 flex flex-col">
            <nav className="flex items-center justify-between px-6 py-3 border-b border-slate-800 bg-slate-950/80 backdrop-blur shrink-0">
                <Link to="/fisica1" className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium"><Home className="w-4 h-4" /> Física 1</Link>
                <div className="flex items-center gap-2">{Array.from({ length: total }).map((_, i) => <div key={i} className={`h-1.5 rounded-full transition-all ${i === current ? "w-6 bg-rose-400" : i < current ? "w-3 bg-slate-600" : "w-3 bg-slate-800"}`} />)}</div>
                <span className="text-slate-500 text-xs font-mono">{aula} · {current + 1}/{total}</span>
            </nav>
            <div className="flex-1 overflow-y-auto px-4 sm:px-8 md:px-16 py-8">{children}</div>
            <div className="flex justify-between items-center px-6 py-4 border-t border-slate-800 bg-slate-950/80 backdrop-blur shrink-0">
                <button onClick={onPrev} disabled={current === 0} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-700 text-slate-400 hover:border-slate-500 disabled:opacity-30 transition-all font-semibold text-sm"><ChevronLeft className="w-4 h-4" /> Anterior</button>
                <span className="text-slate-600 text-xs truncate max-w-xs">{title}</span>
                <button onClick={onNext} disabled={current === total - 1} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-30 text-white font-bold transition-all text-sm">Próximo <ChevronRight className="w-4 h-4" /></button>
            </div>
        </div>
    );
}

function S1() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center animate-in fade-in zoom-in duration-700 relative">
            <div className="absolute inset-0 opacity-10 rounded-3xl" style={{ backgroundImage: "url('/sprites/backgrounds/10/2304x1296.png')", backgroundSize: "cover", imageRendering: "pixelated" }} />
            <div className="relative z-10">
                <img src="/sprites/2 Owlet_Monster/Owlet_Monster_Idle_4.png" alt="" className="w-16 h-16 mx-auto mb-6 object-contain" style={{ imageRendering: "pixelated" }} />
                <span className="bg-rose-500/20 text-rose-400 font-bold px-3 py-1 rounded-full text-xs tracking-widest border border-rose-500/30">FÍSICA 1 · AULA 10</span>
                <h1 className="text-4xl md:text-6xl font-black text-white my-4 leading-none">Gráficos de<br /><span className="text-purple-400">Movimento</span></h1>
                <p className="text-xl text-slate-400 max-w-xl mx-auto">Como ler e interpretar os gráficos s×t e v×t — as "impressões digitais" de qualquer movimento.</p>
            </div>
        </div>
    );
}

function S2() {
    const [type, setType] = useState<"mru" | "muv">("mru");
    const W = 300, H = 180, pad = 40;
    const pts_mru = [0, 1, 2, 3, 4, 5].map(t => ({ t, s: t * 20 }));
    const pts_muv = [0, 1, 2, 3, 4, 5].map(t => ({ t, s: 0 + 0.5 * 5 * t * t }));
    const pts = type === "mru" ? pts_mru : pts_muv;
    const xS = (t: number) => pad + (t / 5) * (W - pad * 2);
    const maxS = Math.max(...pts.map(p => p.s));
    const yS = (s: number) => H - pad - (s / maxS) * (H - pad * 2);
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-3">📈 Gráfico Posição × Tempo (s×t)</h2>
            <p className="text-slate-400 mb-4">Selecione o tipo de movimento e observe o formato do gráfico:</p>
            <div className="flex gap-3 mb-6">
                <button onClick={() => setType("mru")} className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all ${type === "mru" ? "border-purple-500 bg-purple-950/40 text-purple-300" : "border-slate-700 text-slate-400 hover:border-slate-500"}`}>MRU (velocidade constante)</button>
                <button onClick={() => setType("muv")} className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all ${type === "muv" ? "border-rose-500 bg-rose-950/40 text-rose-300" : "border-slate-700 text-slate-400 hover:border-slate-500"}`}>MUV (acelerado)</button>
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="bg-slate-950 border border-slate-700 rounded-2xl p-4">
                    <svg width={W} height={H}>
                        {[0, 25, 50, 75, 100].map(v => <line key={v} x1={pad} x2={W - pad} y1={yS(v * maxS / 100)} y2={yS(v * maxS / 100)} stroke="#1e293b" strokeWidth="1" />)}
                        <line x1={pad} x2={W - pad} y1={H - pad} y2={H - pad} stroke="#475569" strokeWidth="2" />
                        <line x1={pad} x2={pad} y1={pad} y2={H - pad} stroke="#475569" strokeWidth="2" />
                        <text x={W / 2} y={H - 6} fill="#64748b" fontSize="11" textAnchor="middle">Tempo (s)</text>
                        <text x={14} y={H / 2} fill="#64748b" fontSize="11" textAnchor="middle" transform={`rotate(-90,14,${H / 2})`}>Posição (m)</text>
                        <polyline points={pts.map(p => `${xS(p.t)},${yS(p.s)}`).join(" ")} fill="none" stroke={type === "mru" ? "#a855f7" : "#f43f5e"} strokeWidth="2.5" />
                        {pts.map((p, i) => <circle key={i} cx={xS(p.t)} cy={yS(p.s)} r="4" fill={type === "mru" ? "#a855f7" : "#f43f5e"} />)}
                    </svg>
                </div>
                <div className="flex-1">
                    {type === "mru" ? (
                        <div className="space-y-3">
                            <div className="bg-purple-950/30 border border-purple-500/30 rounded-xl p-4"><p className="text-purple-300 font-bold">MRU → Reta inclinada</p><p className="text-slate-400 text-sm mt-1">A inclinação da reta = velocidade constante. Quanto mais inclinada, maior a velocidade.</p></div>
                            <div className="bg-slate-900 border border-slate-700 rounded-xl p-3 font-mono text-sm text-slate-300">s = s₀ + v·t</div>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <div className="bg-rose-950/30 border border-rose-500/30 rounded-xl p-4"><p className="text-rose-300 font-bold">MUV → Parábola</p><p className="text-slate-400 text-sm mt-1">A curva parabólica indica aceleração. Quanto mais abrupta a curva, maior a aceleração.</p></div>
                            <div className="bg-slate-900 border border-slate-700 rounded-xl p-3 font-mono text-sm text-slate-300">s = s₀ + v₀t + ½at²</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function S3() {
    const [type, setType] = useState<"mru" | "muv">("mru");
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-3">📉 Gráfico Velocidade × Tempo (v×t)</h2>
            <p className="text-slate-400 mb-4">A área sob a curva v×t = distância percorrida. Selecione:</p>
            <div className="flex gap-3 mb-6">
                <button onClick={() => setType("mru")} className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all ${type === "mru" ? "border-sky-500 bg-sky-950/40 text-sky-300" : "border-slate-700 text-slate-400 hover:border-slate-500"}`}>MRU</button>
                <button onClick={() => setType("muv")} className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all ${type === "muv" ? "border-pink-500 bg-pink-950/40 text-pink-300" : "border-slate-700 text-slate-400 hover:border-slate-500"}`}>MUV</button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-950 border border-slate-700 rounded-2xl p-4">
                    {type === "mru" ? (
                        <svg width={260} height={160}>
                            <line x1={40} x2={220} y1={130} y2={130} stroke="#475569" strokeWidth="2" />
                            <line x1={40} x2={40} y1={30} y2={130} stroke="#475569" strokeWidth="2" />
                            <text x={130} y={150} fill="#64748b" fontSize="10" textAnchor="middle">Tempo (s)</text>
                            <text x={14} y={80} fill="#64748b" fontSize="10" textAnchor="middle" transform="rotate(-90,14,80)">v (m/s)</text>
                            <line x1={40} x2={220} y1={70} y2={70} stroke="#38bdf8" strokeWidth="2.5" />
                            <polygon points="40,70 220,70 220,130 40,130" fill="#38bdf8" fillOpacity="0.15" />
                            <text x={130} y={105} fill="#38bdf8" fontSize="11" textAnchor="middle">Área = distância</text>
                        </svg>
                    ) : (
                        <svg width={260} height={160}>
                            <line x1={40} x2={220} y1={130} y2={130} stroke="#475569" strokeWidth="2" />
                            <line x1={40} x2={40} y1={30} y2={130} stroke="#475569" strokeWidth="2" />
                            <text x={130} y={150} fill="#64748b" fontSize="10" textAnchor="middle">Tempo (s)</text>
                            <text x={14} y={80} fill="#64748b" fontSize="10" textAnchor="middle" transform="rotate(-90,14,80)">v (m/s)</text>
                            <line x1={40} x2={220} y1={130} y2={30} stroke="#ec4899" strokeWidth="2.5" />
                            <polygon points="40,130 220,130 220,30 40,130" fill="#ec4899" fillOpacity="0.15" />
                            <text x={150} y={110} fill="#ec4899" fontSize="10">Inclinação = a</text>
                        </svg>
                    )}
                </div>
                <div className="space-y-3">
                    {type === "mru" ? (
                        <>
                            <div className="bg-sky-950/30 border border-sky-500/30 rounded-xl p-4"><p className="text-sky-300 font-bold">MRU → Linha Horizontal</p><p className="text-slate-400 text-sm mt-1">Velocidade constante. Área = retângulo = v·t = distância.</p></div>
                        </>
                    ) : (
                        <>
                            <div className="bg-pink-950/30 border border-pink-500/30 rounded-xl p-4"><p className="text-pink-300 font-bold">MUV → Linha Inclinada</p><p className="text-slate-400 text-sm mt-1">A inclinação = aceleração. Área = triângulo = distância percorrida.</p></div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

function S4() {
    const [ans, setAns] = useState<number | null>(null);
    const correct = 1;
    const opts = ["Velocidade constante e positiva.", "Aceleração positiva (velocidade crescente).", "Aceleração negativa (velocidade decrescente).", "O objeto está parado."];
    return (
        <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
            <span className="text-xs font-black tracking-widest text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">QUIZ</span>
            <h2 className="text-2xl font-black text-slate-100 mt-4 mb-4">Em um gráfico v×t, a reta sobe da esquerda para a direita (coeficiente angular positivo). O que isso indica?</h2>
            <div className="space-y-3 mb-4">
                {opts.map((o, i) => {
                    const cls = ans === null ? "border-slate-700 hover:border-slate-500 bg-slate-900" : i === correct ? "border-emerald-500 bg-emerald-950/30 text-emerald-100 scale-[1.01]" : ans === i ? "border-rose-500 bg-rose-950/30 opacity-70" : "border-slate-800 opacity-25";
                    return <button key={i} disabled={ans !== null} onClick={() => setAns(i)} className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex gap-3 ${cls}`}><span className="font-black">{["A", "B", "C", "D"][i]})</span><span>{o}</span></button>;
                })}
            </div>
            {ans !== null && <div className={`p-4 rounded-2xl animate-in slide-in-from-bottom-4 ${ans === correct ? "bg-emerald-900/30 border border-emerald-500/40 text-emerald-200" : "bg-rose-900/30 border border-rose-500/40 text-rose-200"}`}><strong>B ✅</strong> — Inclinação positiva no v×t = velocidade aumentando = aceleração positiva (MUV acelerado).</div>}
        </div>
    );
}

function S5() {
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-6">📝 Resumo — Aula 10</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-sm border border-slate-700 rounded-2xl overflow-hidden">
                    <thead><tr className="bg-slate-800"><th className="p-3 text-left text-slate-300">Gráfico</th><th className="p-3 text-left text-slate-300">MRU</th><th className="p-3 text-left text-slate-300">MUV (acelerado)</th></tr></thead>
                    <tbody>
                        {[
                            ["s×t", "Reta inclinada (linear)", "Parábola (curva)"],
                            ["v×t", "Reta horizontal", "Reta inclinada"],
                            ["Inclinação s×t", "Velocidade", "—"],
                            ["Inclinação v×t", "= 0 (MRU)", "Aceleração"],
                            ["Área v×t", "Distância = v·t", "Distância = triângulo"],
                        ].map((r, i) => (
                            <tr key={i} className={i % 2 === 0 ? "bg-slate-900/60" : "bg-slate-900/30"}>
                                {r.map((c, j) => <td key={j} className="p-3 text-slate-400 border-t border-slate-800">{c}</td>)}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="text-center text-slate-500 mt-6">Próxima aula: Movimento Circular 🔄</p>
        </div>
    );
}

const SLIDES_A10 = [S1, S2, S3, S4, S5];
export function Fisica1Lesson10() {
    const [cur, setCur] = useState(0);
    const next = useCallback(() => setCur(p => Math.min(p + 1, SLIDES_A10.length - 1)), []);
    const prev = useCallback(() => setCur(p => Math.max(p - 1, 0)), []);
    useEffect(() => {
        const h = (e: KeyboardEvent) => { if (e.key === "ArrowRight") next(); if (e.key === "ArrowLeft") prev(); };
        window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
    }, [next, prev]);
    const C = SLIDES_A10[cur];
    return <Shell title="Aula 10 — Gráficos de Movimento" aula="Aula 10" total={SLIDES_A10.length} current={cur} onPrev={prev} onNext={next}><C /></Shell>;
}
