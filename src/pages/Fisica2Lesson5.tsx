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

// ── AULA 05: Calor Sensível ───────────────────────────────────────────────────
function S1() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center animate-in fade-in zoom-in duration-700 relative">
            <div className="absolute inset-0 opacity-10 rounded-3xl" style={{ backgroundImage: "url('/sprites/backgrounds/5/2304x1296.png')", backgroundSize: "cover", imageRendering: "pixelated" }} />
            <div className="relative z-10">
                <img src="/sprites/3 Dude_Monster/Dude_Monster_Idle_4.png" alt="" className="w-16 h-16 mx-auto mb-6 object-contain" style={{ imageRendering: "pixelated" }} />
                <span className="bg-orange-500/20 text-orange-400 font-bold px-3 py-1 rounded-full text-xs tracking-widest border border-orange-500/30">FÍSICA 2 · AULA 05</span>
                <h1 className="text-4xl md:text-6xl font-black text-white my-4 leading-none">Calorimetria:<br /><span className="text-amber-400">Calor Sensível</span></h1>
                <p className="text-xl text-slate-400 max-w-xl mx-auto">Calor sensível provoca mudança de temperatura — sem mudar de fase. Fórmula: Q = m·c·ΔT</p>
            </div>
        </div>
    );
}

function S2() {
    const [m, setM] = useState(1);
    const [c, setC] = useState(4186);
    const [dT, setDT] = useState(10);
    const Q = (m * c * dT);
    const Qkcal = (Q / 4186).toFixed(2);
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-3">🧮 Calculadora Q = m·c·ΔT</h2>
            <div className="bg-slate-950 border border-amber-500/20 rounded-2xl px-6 py-3 mb-5 text-center"><code className="text-2xl font-mono text-amber-300">Q = m · c · ΔT</code></div>
            <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 space-y-4 mb-4">
                <div><label className="text-xs font-bold text-slate-400">Massa m: <span className="text-amber-300">{m} kg</span></label><input type="range" min={0.1} max={10} step={0.1} value={m} onChange={e => setM(+e.target.value)} className="w-full mt-1 accent-amber-400" /></div>
                <div>
                    <label className="text-xs font-bold text-slate-400">Calor específico c: <span className="text-orange-300">{c} J/(kg·°C)</span></label>
                    <select value={c} onChange={e => setC(+e.target.value)} className="w-full mt-1 px-3 py-2 bg-slate-800 border border-slate-600 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500">
                        <option value={4186}>Água — 4186 J/(kg·°C)</option>
                        <option value={900}>Alumínio — 900 J/(kg·°C)</option>
                        <option value={385}>Cobre — 385 J/(kg·°C)</option>
                        <option value={490}>Aço — 490 J/(kg·°C)</option>
                        <option value={129}>Ouro — 129 J/(kg·°C)</option>
                    </select>
                </div>
                <div><label className="text-xs font-bold text-slate-400">Variação de temperatura ΔT: <span className="text-rose-300">{dT}°C</span></label><input type="range" min={1} max={200} value={dT} onChange={e => setDT(+e.target.value)} className="w-full mt-1 accent-rose-400" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-amber-950/30 border border-amber-500/30 rounded-2xl p-4 text-center"><div className="text-xs text-amber-400 font-black mb-1">CALOR ABSORVIDO (Q)</div><div className="text-3xl font-black text-amber-300">{(Q / 1000).toFixed(2)} kJ</div></div>
                <div className="bg-orange-950/30 border border-orange-500/30 rounded-2xl p-4 text-center"><div className="text-xs text-orange-400 font-black mb-1">EM KCAL</div><div className="text-3xl font-black text-orange-300">{Qkcal} kcal</div></div>
            </div>
        </div>
    );
}

function S3() {
    const materials = [
        { name: "Água", c: 4186, why: "Maior c = precisa de muito calor para aquecer. Por isso é usada em radiadores e no clima das cidades.", icon: "💧" },
        { name: "Areia", c: 840, why: "c menor que a água. Por isso a praia esquenta e esfria muito mais rápido que o mar.", icon: "🏖️" },
        { name: "Ferro/Aço", c: 490, why: "Baixo c. Frigideiras e panelas de ferro aquecem rápido e mantêm o calor.", icon: "🍳" },
        { name: "Ouro", c: 129, why: "Muito baixo c. Joias de ouro aquecem instantaneamente ao toque.", icon: "🏅" },
    ];
    const [sel, setSel] = useState(0);
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-4">📊 Calor Específico na Prática</h2>
            <p className="text-slate-400 mb-6">O calor específico (c) determina quanto calor cada material precisa absorver por kg para variar 1°C. Clique nos exemplos:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                {materials.map((m, i) => (
                    <button key={i} onClick={() => setSel(i)} className={`p-4 rounded-2xl border-2 transition-all text-center ${sel === i ? "border-amber-500 bg-amber-950/30" : "border-slate-700 bg-slate-900 hover:border-slate-500"}`}>
                        <span className="text-3xl block mb-2">{m.icon}</span>
                        <span className="font-bold text-slate-200 text-sm block">{m.name}</span>
                        <span className="text-amber-300 font-mono text-xs">{m.c} J/(kg·°C)</span>
                    </button>
                ))}
            </div>
            <div className="bg-amber-950/30 border border-amber-500/30 rounded-2xl p-5 animate-in fade-in">
                <h3 className="font-bold text-amber-200 text-xl mb-2">{materials[sel].icon} {materials[sel].name} — c = {materials[sel].c} J/(kg·°C)</h3>
                <p className="text-slate-300">{materials[sel].why}</p>
            </div>
        </div>
    );
}

function S4() {
    const [ans, setAns] = useState<number | null>(null);
    const correct = 1;
    const opts = ["Q = 5.000 J", "Q = 12.558 J", "Q = 4.186 J", "Q = 83.720 J"];
    return (
        <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
            <span className="text-xs font-black tracking-widest text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">QUIZ</span>
            <h2 className="text-2xl font-black text-slate-100 mt-4 mb-3">Quantas kJ são necessários para aquecer 300 g de água de 20°C a 30°C? (c_água = 4186 J/kg·°C)</h2>
            <p className="text-slate-500 mb-4 font-mono text-sm">Q = m·c·ΔT → m = 0,3 kg; ΔT = 10°C</p>
            <div className="space-y-3 mb-4">
                {opts.map((o, i) => {
                    const cls = ans === null ? "border-slate-700 hover:border-slate-500 bg-slate-900" : i === correct ? "border-emerald-500 bg-emerald-950/30 text-emerald-100 scale-[1.01]" : ans === i ? "border-rose-500 bg-rose-950/30 opacity-70" : "border-slate-800 opacity-25";
                    return <button key={i} disabled={ans !== null} onClick={() => setAns(i)} className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex gap-3 ${cls}`}><span className="font-black">{["A", "B", "C", "D"][i]})</span><span>{o}</span></button>;
                })}
            </div>
            {ans !== null && <div className={`p-4 rounded-2xl animate-in slide-in-from-bottom-4 ${ans === correct ? "bg-emerald-900/30 border border-emerald-500/40 text-emerald-200" : "bg-rose-900/30 border border-rose-500/40 text-rose-200"}`}><strong>B ✅</strong> — Q = 0,3 × 4186 × 10 = <strong>12.558 J ≈ 12,6 kJ</strong>. Equivale a 3,0 kcal (3 "calorias" da dieta).</div>}
        </div>
    );
}

function S5() {
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-6">📝 Resumo — Aula 05</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
                {[
                    { icon: "🌡️", t: "Calor Sensível", b: "Q que causa variação de temperatura sem mudança de fase." },
                    { icon: "📐", t: "Fórmula", b: "Q = m·c·ΔT. m = massa (kg), c = calor específico, ΔT = variação de T." },
                    { icon: "💧", t: "Calor Específico", b: "Resistência do material ao aquecimento. Água: 4186 J/(kg·°C) — o maior da natureza sólida/líquida." },
                    { icon: "🌊", t: "Efeito climático", b: "O alto c da água regula o clima das cidades litorâneas. Mares aquecem e esfr​iam devagar." },
                ].map((c, i) => (
                    <div key={i} className="bg-slate-900 border border-slate-700 rounded-2xl p-5 hover:border-amber-500/30 transition-all">
                        <span className="text-3xl">{c.icon}</span>
                        <h3 className="font-bold text-slate-100 my-1">{c.t}</h3>
                        <p className="text-slate-400 text-sm">{c.b}</p>
                    </div>
                ))}
            </div>
            <p className="text-center text-slate-500">Próxima aula: Calor Latente — Mudanças de Fase ❄️💧🔥</p>
        </div>
    );
}

const SLIDES = [S1, S2, S3, S4, S5];
export function Fisica2Lesson5() {
    const [cur, setCur] = useState(0);
    const next = useCallback(() => setCur(p => Math.min(p + 1, SLIDES.length - 1)), []);
    const prev = useCallback(() => setCur(p => Math.max(p - 1, 0)), []);
    useEffect(() => {
        const h = (e: KeyboardEvent) => { if (e.key === "ArrowRight") next(); if (e.key === "ArrowLeft") prev(); };
        window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
    }, [next, prev]);
    const C = SLIDES[cur];
    return <Shell title="Aula 05 — Calor Sensível" aula="Aula 05" total={SLIDES.length} current={cur} onPrev={prev} onNext={next}><C /></Shell>;
}
