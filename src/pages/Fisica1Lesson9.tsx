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

// ── AULA 09: Aceleração e MUV ────────────────────────────────────────────────
function S1() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center animate-in fade-in zoom-in duration-700 relative">
            <div className="absolute inset-0 opacity-10 rounded-3xl" style={{ backgroundImage: "url('/sprites/backgrounds/9/2304x1296.png')", backgroundSize: "cover", imageRendering: "pixelated" }} />
            <div className="relative z-10">
                <img src="/sprites/3 Dude_Monster/Dude_Monster_Run_6.png" alt="" className="w-20 h-16 mx-auto mb-6 object-contain" style={{ imageRendering: "pixelated", animation: "spin 2s linear infinite" }} />
                <span className="bg-rose-500/20 text-rose-400 font-bold px-3 py-1 rounded-full text-xs tracking-widest border border-rose-500/30">FÍSICA 1 · AULA 09</span>
                <h1 className="text-4xl md:text-6xl font-black text-white my-4 leading-none">Aceleração<br /><span className="text-red-400">& MUV</span></h1>
                <p className="text-xl text-slate-400 max-w-xl mx-auto">O que é aceleração? Como calcular o espaço e a velocidade final num Movimento Uniformemente Variado?</p>
            </div>
        </div>
    );
}

function S2() {
    const [v0, setV0] = useState(0);
    const [a, setA] = useState(10);
    const [t, setT] = useState(5);
    const vf = v0 + a * t;
    const ds = v0 * t + 0.5 * a * t * t;
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-3">🚀 Equações do MUV</h2>
            <p className="text-slate-400 text-xl mb-4">Ajuste os sliders e veja as equações em tempo real:</p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-red-950/20 border border-red-500/30 rounded-xl px-4 py-3 text-center">
                    <div className="text-xs text-red-400 font-black tracking-widest mb-1">1ª EQUAÇÃO (VELOCIDADE)</div>
                    <code className="text-xl font-mono text-red-300">v = v₀ + a·t</code>
                    <div className="text-3xl font-black text-white mt-2">{vf} m/s</div>
                </div>
                <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl px-4 py-3 text-center">
                    <div className="text-xs text-amber-400 font-black tracking-widest mb-1">2ª EQUAÇÃO (ESPAÇO)</div>
                    <code className="text-xl font-mono text-amber-300">s = v₀t + ½at²</code>
                    <div className="text-3xl font-black text-white mt-2">{ds.toFixed(1)} m</div>
                </div>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 space-y-4">
                <div><label className="text-xs text-slate-400 font-bold">Velocidade inicial v₀: <span className="text-white">{v0} m/s</span></label><input type="range" min={0} max={50} value={v0} onChange={e => setV0(+e.target.value)} className="w-full mt-1 accent-sky-400" /></div>
                <div><label className="text-xs text-slate-400 font-bold">Aceleração a: <span className="text-red-300">{a} m/s²</span></label><input type="range" min={1} max={30} value={a} onChange={e => setA(+e.target.value)} className="w-full mt-1 accent-red-400" /></div>
                <div><label className="text-xs text-slate-400 font-bold">Tempo t: <span className="text-amber-300">{t} s</span></label><input type="range" min={1} max={20} value={t} onChange={e => setT(+e.target.value)} className="w-full mt-1 accent-amber-400" /></div>
            </div>
        </div>
    );
}

function S3() {
    const [step, setStep] = useState(0);
    const ex = [
        { title: "Carro arrancando do semáforo", init: "v₀ = 0 m/s", acc: "a = 3 m/s²", time: "t = 10 s", vf: "v = 30 m/s (= 108 km/h)", ds: "s = 0·10 + ½·3·100 = 150 m", img: "🚗" },
        { title: "Freagem de emergência", init: "v₀ = 30 m/s", acc: "a = -8 m/s² (desaceleração)", time: "t = 3,75 s (até parar)", vf: "v = 0 m/s", ds: "s = 30·3,75 + ½·(-8)·14,06 = 56,25 m", img: "🛑" },
    ];
    const e = ex[step];
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-4">📖 Exemplos Práticos</h2>
            <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 min-h-[260px] flex flex-col justify-between">
                <div>
                    <div className="text-4xl mb-3">{e.img}</div>
                    <h3 className="text-2xl font-bold text-slate-100 mb-4">{e.title}</h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                        {[["Inicial", e.init], ["Aceleração", e.acc], ["Tempo", e.time], ["v_final", e.vf], ["Δs", e.ds]].map(([k, v]) => (
                            <div key={k} className="bg-slate-800 rounded-xl p-3"><span className="font-bold text-slate-500 text-xs">{k}</span><p className="text-slate-200 font-mono mt-1">{v}</p></div>
                        ))}
                    </div>
                </div>
                <div className="flex gap-2 mt-4 justify-center">
                    {ex.map((_, i) => <button key={i} onClick={() => setStep(i)} className={`px-4 py-1.5 rounded-xl text-sm font-bold border-2 transition-all ${step === i ? "border-red-500 bg-red-950/30 text-red-300" : "border-slate-700 text-slate-400 hover:border-slate-500"}`}>Exemplo {i + 1}</button>)}
                </div>
            </div>
        </div>
    );
}

function S4() {
    const [ans, setAns] = useState<number | null>(null);
    const correct = 2;
    const opts = ["20 m/s.", "60 m/s.", "40 m/s.", "30 m/s."];
    return (
        <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
            <span className="text-xs font-black tracking-widest text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">QUIZ</span>
            <h2 className="text-2xl font-black text-slate-100 mt-4 mb-4">Um carro parte do repouso (v₀=0) com aceleração constante de 4 m/s². Qual sua velocidade após 10 segundos?</h2>
            <div className="space-y-3 mb-4">
                {opts.map((o, i) => {
                    const cls = ans === null ? "border-slate-700 hover:border-slate-500 bg-slate-900" : i === correct ? "border-emerald-500 bg-emerald-950/30 text-emerald-100 scale-[1.01]" : ans === i ? "border-rose-500 bg-rose-950/30 opacity-70" : "border-slate-800 opacity-25";
                    return <button key={i} disabled={ans !== null} onClick={() => setAns(i)} className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex gap-3 ${cls}`}><span className="font-black">{["A", "B", "C", "D"][i]})</span><span>{o}</span></button>;
                })}
            </div>
            {ans !== null && <div className={`p-4 rounded-2xl animate-in slide-in-from-bottom-4 ${ans === correct ? "bg-emerald-900/30 border border-emerald-500/40 text-emerald-200" : "bg-rose-900/30 border border-rose-500/40 text-rose-200"}`}><strong>C ✅</strong> — v = v₀ + a·t = 0 + 4·10 = <strong>40 m/s</strong> (= 144 km/h!)</div>}
        </div>
    );
}

function S5() {
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-6">📝 Resumo — Aula 09</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
                {[
                    { icon: "📈", t: "Aceleração", b: "Taxa de variação da velocidade. a = Δv/Δt. Unidade: m/s². Pode ser positiva (acelera) ou negativa (desacelera)." },
                    { icon: "🔢", t: "1ª Equação", b: "v = v₀ + a·t. Calcula a velocidade final em qualquer instante." },
                    { icon: "📐", t: "2ª Equação", b: "s = v₀t + ½at². Calcula o espaço percorrido durante o MUV." },
                    { icon: "📊", t: "3ª Equação (Torricelli)", b: "v² = v₀² + 2·a·Δs. Relaciona velocidades sem usar o tempo." },
                ].map((c, i) => (
                    <div key={i} className="bg-slate-900 border border-slate-700 rounded-2xl p-5 hover:border-red-500/30 transition-all">
                        <span className="text-3xl">{c.icon}</span>
                        <h3 className="font-bold text-slate-100 my-1">{c.t}</h3>
                        <p className="text-slate-400 text-sm">{c.b}</p>
                    </div>
                ))}
            </div>
            <p className="text-center text-slate-500">Próxima aula: Representação Gráfica de Movimentos 📊</p>
        </div>
    );
}

const SLIDES_A9 = [S1, S2, S3, S4, S5];
export function Fisica1Lesson9() {
    const [cur, setCur] = useState(0);
    const next = useCallback(() => setCur(p => Math.min(p + 1, SLIDES_A9.length - 1)), []);
    const prev = useCallback(() => setCur(p => Math.max(p - 1, 0)), []);
    useEffect(() => {
        const h = (e: KeyboardEvent) => { if (e.key === "ArrowRight") next(); if (e.key === "ArrowLeft") prev(); };
        window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
    }, [next, prev]);
    const C = SLIDES_A9[cur];
    return <Shell title="Aula 09 — Aceleração e MUV" aula="Aula 09" total={SLIDES_A9.length} current={cur} onPrev={prev} onNext={next}><C /></Shell>;
}
