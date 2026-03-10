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
                <Link to="/fisica2" className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium"><Home className="w-4 h-4" /> Física 2</Link>
                <div className="flex items-center gap-2">{Array.from({ length: total }).map((_, i) => <div key={i} className={`h-1.5 rounded-full transition-all ${i === current ? "w-6 bg-orange-400" : i < current ? "w-3 bg-slate-600" : "w-3 bg-slate-800"}`} />)}</div>
                <span className="text-slate-500 text-xs font-mono">{aula} · {current + 1}/{total}</span>
            </nav>
            <div className="flex-1 overflow-y-auto px-4 sm:px-8 md:px-16 py-8">{children}</div>
            <div className="flex justify-between items-center px-6 py-4 border-t border-slate-800 bg-slate-950/80 backdrop-blur shrink-0">
                <button onClick={onPrev} disabled={current === 0} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-700 text-slate-400 hover:border-slate-500 disabled:opacity-30 transition-all font-semibold text-sm"><ChevronLeft className="w-4 h-4" /> Anterior</button>
                <span className="text-slate-600 text-xs truncate max-w-xs">{title}</span>
                <button onClick={onNext} disabled={current === total - 1} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 disabled:opacity-30 text-white font-bold transition-all text-sm">Próximo <ChevronRight className="w-4 h-4" /></button>
            </div>
        </div>
    );
}

// ── AULA 07: Equilíbrio Térmico ───────────────────────────────────────────────
function S1() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center animate-in fade-in zoom-in duration-700 relative">
            <div className="absolute inset-0 opacity-10 rounded-3xl" style={{ backgroundImage: "url('/sprites/backgrounds/7/2304x1296.png')", backgroundSize: "cover", imageRendering: "pixelated" }} />
            <div className="relative z-10">
                <img src="/sprites/2 Owlet_Monster/Owlet_Monster_Idle_4.png" alt="" className="w-16 h-16 mx-auto mb-6 object-contain" style={{ imageRendering: "pixelated" }} />
                <span className="bg-orange-500/20 text-orange-400 font-bold px-3 py-1 rounded-full text-xs tracking-widest border border-orange-500/30">FÍSICA 2 · AULA 07</span>
                <h1 className="text-4xl md:text-6xl font-black text-white my-4 leading-none">Trocas de Calor<br /><span className="text-emerald-400">& Equilíbrio Térmico</span></h1>
                <p className="text-xl text-slate-400 max-w-xl mx-auto">Quando dois corpos trocam calor, o calor cedido por um é absorvido pelo outro: |Q_cedido| = |Q_absorvido|.</p>
            </div>
        </div>
    );
}

function S2() {
    const [m1, setM1] = useState(1);
    const [T1, setT1] = useState(80);
    const [m2, setM2] = useState(2);
    const [T2, setT2] = useState(20);
    const c = 4186;
    const Teq = ((m1 * c * T1 + m2 * c * T2) / ((m1 + m2) * c)).toFixed(1);
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-3">⚖️ Calculadora de Temperatura de Equilíbrio</h2>
            <div className="bg-slate-950 border border-emerald-500/20 rounded-2xl px-5 py-3 mb-5 text-center"><code className="text-lg font-mono text-emerald-300">T_eq = (m₁T₁ + m₂T₂) / (m₁ + m₂)  [mesma substância, mesmo c]</code></div>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-red-950/30 border border-red-500/30 rounded-2xl p-4 space-y-3">
                    <div className="text-xs text-red-400 font-black tracking-widest">CORPO QUENTE</div>
                    <div><label className="text-xs text-slate-400">Massa m₁: <span className="text-red-300">{m1} kg</span></label><input type="range" min={0.1} max={5} step={0.1} value={m1} onChange={e => setM1(+e.target.value)} className="w-full mt-1 accent-red-400" /></div>
                    <div><label className="text-xs text-slate-400">Temperatura T₁: <span className="text-red-300">{T1}°C</span></label><input type="range" min={T2 + 1} max={200} value={T1} onChange={e => setT1(+e.target.value)} className="w-full mt-1 accent-red-400" /></div>
                </div>
                <div className="bg-blue-950/30 border border-blue-500/30 rounded-2xl p-4 space-y-3">
                    <div className="text-xs text-blue-400 font-black tracking-widest">CORPO FRIO</div>
                    <div><label className="text-xs text-slate-400">Massa m₂: <span className="text-blue-300">{m2} kg</span></label><input type="range" min={0.1} max={5} step={0.1} value={m2} onChange={e => setM2(+e.target.value)} className="w-full mt-1 accent-blue-400" /></div>
                    <div><label className="text-xs text-slate-400">Temperatura T₂: <span className="text-blue-300">{T2}°C</span></label><input type="range" min={0} max={T1 - 1} value={T2} onChange={e => setT2(+e.target.value)} className="w-full mt-1 accent-blue-400" /></div>
                </div>
            </div>
            <div className="bg-emerald-950/30 border border-emerald-500/40 rounded-2xl p-5 text-center">
                <div className="text-xs text-emerald-400 font-black tracking-widest mb-2">TEMPERATURA DE EQUILÍBRIO</div>
                <div className="text-5xl font-black text-emerald-300">{Teq}°C</div>
                <p className="text-slate-500 text-sm mt-2">Corpo quente cedeu calor → de {T1}°C para {Teq}°C. Corpo frio absorveu → de {T2}°C para {Teq}°C.</p>
            </div>
        </div>
    );
}

function S3() {
    const [ans, setAns] = useState<number | null>(null);
    const correct = 1;
    const opts = ["120°C", "55°C", "50°C", "40°C"];
    return (
        <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
            <span className="text-xs font-black tracking-widest text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">QUIZ</span>
            <h2 className="text-2xl font-black text-slate-100 mt-4 mb-4">500 g de água a 80°C são misturados com 500 g a 30°C. Qual a temperatura de equilíbrio?</h2>
            <p className="text-slate-500 mb-4 font-mono text-sm">T_eq = (0,5×80 + 0,5×30) / (0,5+0,5)</p>
            <div className="space-y-3 mb-4">
                {opts.map((o, i) => {
                    const cls = ans === null ? "border-slate-700 hover:border-slate-500 bg-slate-900" : i === correct ? "border-emerald-500 bg-emerald-950/30 text-emerald-100 scale-[1.01]" : ans === i ? "border-rose-500 bg-rose-950/30 opacity-70" : "border-slate-800 opacity-25";
                    return <button key={i} disabled={ans !== null} onClick={() => setAns(i)} className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex gap-3 ${cls}`}><span className="font-black">{["A", "B", "C", "D"][i]})</span><span>{o}</span></button>;
                })}
            </div>
            {ans !== null && <div className={`p-4 rounded-2xl animate-in slide-in-from-bottom-4 ${ans === correct ? "bg-emerald-900/30 border border-emerald-500/40 text-emerald-200" : "bg-rose-900/30 border border-rose-500/40 text-rose-200"}`}><strong>B ✅</strong> — T_eq = (40 + 15) = 55°C. Massas iguais → média aritmética simples das temperaturas.</div>}
        </div>
    );
}

function S4() {
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-6">📝 Resumo — Aula 07</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
                {[
                    { icon: "⚖️", t: "Princípio das Trocas", b: "|Q_cedido| = |Q_absorvido|. Energia conservada no sistema isolado." },
                    { icon: "📐", t: "Fórmula T_eq", b: "T_eq = (m₁c₁T₁ + m₂c₂T₂) / (m₁c₁ + m₂c₂). Massas iguais + mesmo c = média aritmética." },
                    { icon: "🧊", t: "Calorímetro", b: "Recipiente isolado termicamente para medir trocas de calor sem perdas para o ambiente." },
                    { icon: "💡", t: "Aplicação real", b: "Termostatos, aquecimento solar de água, mixing de fluidos em engenharia." },
                ].map((c, i) => (
                    <div key={i} className="bg-slate-900 border border-slate-700 rounded-2xl p-5 hover:border-emerald-500/30 transition-all">
                        <span className="text-3xl">{c.icon}</span>
                        <h3 className="font-bold text-slate-100 my-1">{c.t}</h3>
                        <p className="text-slate-400 text-sm">{c.b}</p>
                    </div>
                ))}
            </div>
            <p className="text-center text-slate-500">Próxima aula: Prática — Construindo um Calorímetro 🔬</p>
        </div>
    );
}

const SLIDES_A7 = [S1, S2, S3, S4];
export function Fisica2Lesson7() {
    const [cur, setCur] = useState(0);
    const next = useCallback(() => setCur(p => Math.min(p + 1, SLIDES_A7.length - 1)), []);
    const prev = useCallback(() => setCur(p => Math.max(p - 1, 0)), []);
    useEffect(() => {
        const h = (e: KeyboardEvent) => { if (e.key === "ArrowRight") next(); if (e.key === "ArrowLeft") prev(); };
        window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
    }, [next, prev]);
    const C = SLIDES_A7[cur];
    return <Shell title="Aula 07 — Equilíbrio Térmico" aula="Aula 07" total={SLIDES_A7.length} current={cur} onPrev={prev} onNext={next}><C /></Shell>;
}
