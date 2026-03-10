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

// ── AULA 06: Calor Latente ────────────────────────────────────────────────────
function S1() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center animate-in fade-in zoom-in duration-700 relative">
            <div className="absolute inset-0 opacity-10 rounded-3xl" style={{ backgroundImage: "url('/sprites/backgrounds/6/2304x1296.png')", backgroundSize: "cover", imageRendering: "pixelated" }} />
            <div className="relative z-10">
                <div className="text-6xl mb-4">❄️💧🔥</div>
                <span className="bg-orange-500/20 text-orange-400 font-bold px-3 py-1 rounded-full text-xs tracking-widest border border-orange-500/30">FÍSICA 2 · AULA 06</span>
                <h1 className="text-4xl md:text-6xl font-black text-white my-4 leading-none">Calor Latente:<br /><span className="text-cyan-400">Mudanças de Fase</span></h1>
                <p className="text-xl text-slate-400 max-w-xl mx-auto">Quando temperatura não muda, mas a matéria se transforma. O calor "escondido" nas mudanças de estado.</p>
            </div>
        </div>
    );
}

function S2() {
    const [heat, setHeat] = useState(0);
    // Water heating curve simulation
    // 0-100: -20 to 0 (ice)
    // 100-200: melting plateau at 0°C
    // 200-400: 0 to 100°C (liquid)
    // 400-600: boiling plateau at 100°C
    // 600-700: 100 to 120°C (vapor)
    const getTemp = (h: number) => {
        if (h <= 100) return -20 + h * 0.2;
        if (h <= 200) return 0;
        if (h <= 400) return (h - 200) * 0.5;
        if (h <= 600) return 100;
        return 100 + (h - 600) * 0.2;
    };
    const getPhase = (h: number) => {
        if (h <= 100) return { phase: "Gelo ❄️", color: "#38bdf8", icon: "❄️" };
        if (h <= 200) return { phase: "Derretendo 🌊", color: "#818cf8", icon: "🌊" };
        if (h <= 400) return { phase: "Água líquida 💧", color: "#22d3ee", icon: "💧" };
        if (h <= 600) return { phase: "Evaporando ♨️", color: "#f59e0b", icon: "♨️" };
        return { phase: "Vapor 🌫️", color: "#f87171", icon: "🌫️" };
    };
    const T = getTemp(heat).toFixed(1);
    const { phase, color } = getPhase(heat);
    const W = 300, H = 160, pad = 30;
    const pts = Array.from({ length: 70 }, (_, i) => ({ h: i * 10, t: getTemp(i * 10) }));
    const xS = (h: number) => pad + (h / 700) * (W - pad * 2);
    const yS = (t: number) => H - pad - ((t + 20) / 140) * (H - pad * 2);
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-3">📈 Curva de Aquecimento da Água</h2>
            <p className="text-slate-400 mb-4">Arraste o slider de calor adicionado e observe o gráfico Temperatura × Calor:</p>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="bg-slate-950 border border-slate-700 rounded-2xl p-4">
                    <svg width={W} height={H}>
                        <line x1={pad} x2={W - pad} y1={H - pad} y2={H - pad} stroke="#475569" strokeWidth="1.5" />
                        <line x1={pad} x2={pad} y1={pad} y2={H - pad} stroke="#475569" strokeWidth="1.5" />
                        <text x={W / 2} y={H - 5} fill="#64748b" fontSize="9" textAnchor="middle">Calor adicionado →</text>
                        <text x={12} y={H / 2} fill="#64748b" fontSize="9" textAnchor="middle" transform={`rotate(-90,12,${H / 2})`}>Temperatura (°C)</text>
                        {[0, 100].map(tv => <line key={tv} x1={pad} x2={W - pad} y1={yS(tv)} y2={yS(tv)} stroke="#1e293b" strokeWidth="1" strokeDasharray="3 2" />)}
                        <polyline points={pts.filter(p => p.h <= heat).map(p => `${xS(p.h)},${yS(p.t)}`).join(" ")} fill="none" stroke={color} strokeWidth="2.5" />
                        {heat > 0 && <circle cx={xS(heat)} cy={yS(+T)} r={5} fill={color} />}
                    </svg>
                </div>
                <div className="flex-1">
                    <div className="text-center mb-4 p-4 rounded-2xl border-2 transition-all" style={{ borderColor: color + "60", background: color + "15" }}>
                        <div className="text-3xl mb-1">{getPhase(heat).icon}</div>
                        <div className="font-bold text-xl" style={{ color }}>{phase}</div>
                        <div className="text-4xl font-black text-white">{T}°C</div>
                    </div>
                    <div className="space-y-2 text-xs">
                        {[
                            { r: [0, 100], label: "Aquece o gelo", c: "#38bdf8" },
                            { r: [100, 200], label: "Fusão — T = 0°C constante", c: "#818cf8" },
                            { r: [200, 400], label: "Aquece a água", c: "#22d3ee" },
                            { r: [400, 600], label: "Ebulição — T = 100°C constante", c: "#f59e0b" },
                            { r: [600, 700], label: "Aquece o vapor", c: "#f87171" },
                        ].map((s, i) => <div key={i} className={`px-3 py-1.5 rounded-lg border ${heat >= s.r[0] && heat < s.r[1] ? "border-opacity-60 bg-opacity-20" : "border-slate-800"}`} style={{ borderColor: heat >= s.r[0] && heat <= s.r[1] ? s.c : undefined }}><span style={{ color: s.c }} className="font-bold">●</span> {s.label}</div>)}
                    </div>
                </div>
            </div>
            <input type="range" min={0} max={700} value={heat} onChange={e => setHeat(+e.target.value)} className="w-full mt-4 accent-orange-400" />
        </div>
    );
}

function S3() {
    const [m, setM] = useState(1);
    const L_fus = 334000;
    const L_vap = 2260000;
    const Qfus = (m * L_fus / 1000).toFixed(1);
    const Qvap = (m * L_vap / 1000).toFixed(1);
    return (
        <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-3">🧮 Q = m·L (Calor Latente)</h2>
            <div className="bg-slate-950 border border-cyan-500/20 rounded-xl px-5 py-3 mb-5 text-center"><code className="text-xl font-mono text-cyan-300">Q = m · L</code><p className="text-slate-500 text-xs mt-1">L = calor latente (J/kg) — característico de cada substância e mudança de fase</p></div>
            <div className="mb-4"><label className="text-xs font-bold text-slate-400">Massa de água: <span className="text-cyan-300">{m} kg</span></label><input type="range" min={0.1} max={5} step={0.1} value={m} onChange={e => setM(+e.target.value)} className="w-full mt-1 accent-cyan-400" /></div>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-950/30 border border-blue-500/30 rounded-2xl p-4 text-center">
                    <div className="text-xs text-blue-400 font-black mb-1">FUSÃO (gelo→água)</div>
                    <div className="text-3xl font-black text-blue-300">{Qfus} kJ</div>
                    <p className="text-slate-500 text-xs mt-1">L_fus = 334 kJ/kg</p>
                </div>
                <div className="bg-red-950/30 border border-red-500/30 rounded-2xl p-4 text-center">
                    <div className="text-xs text-red-400 font-black mb-1">VAPORIZAÇÃO (água→vapor)</div>
                    <div className="text-3xl font-black text-red-300">{Qvap} kJ</div>
                    <p className="text-slate-500 text-xs mt-1">L_vap = 2260 kJ/kg</p>
                </div>
            </div>
        </div>
    );
}

function S4() {
    const [ans, setAns] = useState<number | null>(null);
    const correct = 2;
    const opts = ["A temperatura da água dentro da panela continua subindo.", "A temperatura sobe mais devagar.", "A temperatura permanece constante em 100°C até que toda a água evapore.", "A temperatura cai momentaneamente."];
    return (
        <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
            <span className="text-xs font-black tracking-widest text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">QUIZ</span>
            <h2 className="text-2xl font-black text-slate-100 mt-4 mb-6">Quando a água numa panela começa a ferver (ebulição), o que acontece com sua temperatura?</h2>
            <div className="space-y-3 mb-4">
                {opts.map((o, i) => {
                    const cls = ans === null ? "border-slate-700 hover:border-slate-500 bg-slate-900" : i === correct ? "border-emerald-500 bg-emerald-950/30 text-emerald-100 scale-[1.01]" : ans === i ? "border-rose-500 bg-rose-950/30 opacity-70" : "border-slate-800 opacity-25";
                    return <button key={i} disabled={ans !== null} onClick={() => setAns(i)} className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex gap-3 ${cls}`}><span className="font-black">{["A", "B", "C", "D"][i]})</span><span>{o}</span></button>;
                })}
            </div>
            {ans !== null && <div className={`p-4 rounded-2xl animate-in slide-in-from-bottom-4 ${ans === correct ? "bg-emerald-900/30 border border-emerald-500/40 text-emerald-200" : "bg-rose-900/30 border border-rose-500/40 text-rose-200"}`}><strong>C ✅</strong> — Durante a ebulição, todo o calor vai para a mudança de estado (vaporização). A temperatura permanece em 100°C. Isso é o "calor latente de vaporização"!</div>}
        </div>
    );
}

function S5() {
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-6">📝 Resumo — Aula 06</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
                {[
                    { icon: "🔒", t: "Calor Latente", b: "Q que causa mudança de fase SEM variar temperatura. Q = m·L" },
                    { icon: "❄️", t: "Fusão (gelo→água)", b: "L_fusão(água) = 334 kJ/kg, a 0°C." },
                    { icon: "♨️", t: "Vaporização (água→vapor)", b: "L_vap(água) = 2260 kJ/kg, a 100°C — 6,8× maior que a fusão!" },
                    { icon: "🌡️", t: "Platô no gráfico", b: "Temperatura constante durante a mudança de fase = calor latente em ação." },
                ].map((c, i) => (
                    <div key={i} className="bg-slate-900 border border-slate-700 rounded-2xl p-5 hover:border-cyan-500/30 transition-all">
                        <span className="text-3xl">{c.icon}</span>
                        <h3 className="font-bold text-slate-100 my-1">{c.t}</h3>
                        <p className="text-slate-400 text-sm">{c.b}</p>
                    </div>
                ))}
            </div>
            <p className="text-center text-slate-500">Próxima aula: Trocas de Calor e Equilíbrio Térmico ⚖️</p>
        </div>
    );
}

const SLIDES = [S1, S2, S3, S4, S5];
export function Fisica2Lesson6() {
    const [cur, setCur] = useState(0);
    const next = useCallback(() => setCur(p => Math.min(p + 1, SLIDES.length - 1)), []);
    const prev = useCallback(() => setCur(p => Math.max(p - 1, 0)), []);
    useEffect(() => {
        const h = (e: KeyboardEvent) => { if (e.key === "ArrowRight") next(); if (e.key === "ArrowLeft") prev(); };
        window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
    }, [next, prev]);
    const C = SLIDES[cur];
    return <Shell title="Aula 06 — Calor Latente" aula="Aula 06" total={SLIDES.length} current={cur} onPrev={prev} onNext={next}><C /></Shell>;
}
