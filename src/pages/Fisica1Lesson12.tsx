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
            <div className="absolute inset-0 opacity-10 rounded-3xl" style={{ backgroundImage: "url('/sprites/backgrounds/12/2304x1296.png')", backgroundSize: "cover", imageRendering: "pixelated" }} />
            <div className="relative z-10">
                <div className="text-7xl mb-4">🍎</div>
                <span className="bg-rose-500/20 text-rose-400 font-bold px-3 py-1 rounded-full text-xs tracking-widest border border-rose-500/30">FÍSICA 1 · AULA 12</span>
                <h1 className="text-4xl md:text-6xl font-black text-white my-4 leading-none">Queda Livre<br /><span className="text-green-400">& Gravidade</span></h1>
                <p className="text-xl text-slate-400 max-w-xl mx-auto">Desde Galileu até a Lua de Armstrong: o que acontece quando um objeto cai sem resistência do ar?</p>
            </div>
        </div>
    );
}

function S2() {
    const [falling, setFalling] = useState(false);
    const [h, setH] = useState(0);
    const [t, setT] = useState(0);
    const g = 9.8;
    const HMAX = 300;
    useEffect(() => {
        if (!falling) return;
        const int = setInterval(() => {
            setT(prevT => {
                const newT = prevT + 0.05;
                const newH = 0.5 * g * newT * newT;
                if (newH >= HMAX) { setFalling(false); return prevT; }
                setH(newH);
                return newT;
            });
        }, 50);
        return () => clearInterval(int);
    }, [falling]);
    const reset = () => { setFalling(false); setH(0); setT(0); };
    const vInst = (g * t).toFixed(1);
    const hReal = h.toFixed(1);
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-3">⬇️ Simulador de Queda Livre</h2>
            <p className="text-slate-400 mb-4">g = 9,8 m/s² (aceleração da gravidade na superfície da Terra). Clique em ▶ para soltar o objeto:</p>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="bg-slate-950 border border-slate-700 rounded-2xl p-4 flex flex-col items-center" style={{ minHeight: 380 }}>
                    <div className="text-xs text-slate-600 font-mono mb-2">0 m</div>
                    <div className="relative w-16 flex-1 flex flex-col items-center">
                        <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-slate-800" />
                        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-50" style={{ top: `${(h / HMAX) * 100}%` }}>
                            <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-green-300 shadow-[0_0_12px_rgba(34,197,94,0.5)]" />
                        </div>
                    </div>
                    <div className="text-xs text-slate-600 font-mono mt-2">{HMAX} m</div>
                </div>
                <div className="flex-1 flex flex-col justify-between">
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-green-950/30 border border-green-500/30 rounded-xl p-3 text-center"><div className="text-xs text-green-400 font-black mb-1">ALTURA</div><div className="text-3xl font-black text-green-300">{hReal} m</div></div>
                        <div className="bg-amber-950/30 border border-amber-500/30 rounded-xl p-3 text-center"><div className="text-xs text-amber-400 font-black mb-1">VELOCIDADE</div><div className="text-3xl font-black text-amber-300">{vInst} m/s</div></div>
                        <div className="bg-slate-900 border border-slate-700 rounded-xl p-3 text-center"><div className="text-xs text-slate-400 font-black mb-1">TEMPO</div><div className="text-3xl font-black text-slate-300">{t.toFixed(2)} s</div></div>
                        <div className="bg-rose-950/30 border border-rose-500/30 rounded-xl p-3 text-center"><div className="text-xs text-rose-400 font-black mb-1">ACEL. (g)</div><div className="text-3xl font-black text-rose-300">9,8 m/s²</div></div>
                    </div>
                    <div className="bg-slate-900 border border-slate-700 rounded-xl p-3 font-mono text-sm text-slate-300 mb-4">
                        h = ½·g·t² = ½ × 9,8 × {t.toFixed(2)}² = {hReal} m
                    </div>
                    <div className="flex gap-3">
                        <button onClick={() => setFalling(true)} disabled={falling || h >= HMAX} className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-500 disabled:opacity-40 text-white font-bold rounded-xl transition-all">▶ Soltar</button>
                        <button onClick={reset} className="px-4 py-2 border border-slate-700 text-slate-400 hover:border-slate-500 rounded-xl font-semibold transition-all">↺</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function S3() {
    const [height, setHeight] = useState(20);
    const g = 9.8;
    const tf = Math.sqrt(2 * height / g).toFixed(2);
    const vf = (g * +tf).toFixed(2);
    return (
        <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-3">🧮 Equações da Queda Livre</h2>
            <div className="bg-slate-950 border border-slate-700 rounded-2xl px-6 py-4 mb-4 space-y-2">
                <code className="block text-lg font-mono text-green-300">h = ½·g·t²</code>
                <code className="block text-lg font-mono text-amber-300">v = g·t</code>
                <code className="block text-lg font-mono text-rose-300">v² = 2·g·h</code>
            </div>
            <p className="text-slate-400 mb-4">Calcule o tempo de queda e velocidade final para um objeto solto de altura h:</p>
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
                <div className="mb-4"><label className="text-xs font-bold text-slate-400">Altura h: <span className="text-green-300">{height} m</span></label><input type="range" min={1} max={200} value={height} onChange={e => setHeight(+e.target.value)} className="w-full mt-1 accent-green-400" /></div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="text-center bg-green-950/30 border border-green-500/20 rounded-xl py-3"><div className="text-xs text-green-400 font-black mb-1">TEMPO DE QUEDA</div><div className="text-3xl font-black text-green-300">{tf} s</div></div>
                    <div className="text-center bg-amber-950/30 border border-amber-500/20 rounded-xl py-3"><div className="text-xs text-amber-400 font-black mb-1">VELOCIDADE FINAL</div><div className="text-3xl font-black text-amber-300">{vf} m/s</div><div className="text-xs text-amber-700">{(+vf * 3.6).toFixed(1)} km/h</div></div>
                </div>
            </div>
        </div>
    );
}

function S4() {
    const [ans, setAns] = useState<number | null>(null);
    const correct = 1;
    const opts = ["A pedra mais pesada chega primeiro, pois tem mais força gravitacional.", "As duas chegam ao mesmo tempo — na ausência de ar, todos os objetos caem com a mesma aceleração.", "A pena chega primeiro pois tem menos resistência.", "Depende da forma do objeto."];
    return (
        <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
            <span className="text-xs font-black tracking-widest text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">QUIZ — CLÁSSICO DE GALILEU</span>
            <h2 className="text-2xl font-black text-slate-100 mt-4 mb-4">Uma pedra de 10 kg e uma pena são soltas do mesmo ponto no vácuo. O que acontece?</h2>
            <div className="space-y-3 mb-4">
                {opts.map((o, i) => {
                    const cls = ans === null ? "border-slate-700 hover:border-slate-500 bg-slate-900" : i === correct ? "border-emerald-500 bg-emerald-950/30 text-emerald-100 scale-[1.01]" : ans === i ? "border-rose-500 bg-rose-950/30 opacity-70" : "border-slate-800 opacity-25";
                    return <button key={i} disabled={ans !== null} onClick={() => setAns(i)} className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex gap-3 ${cls}`}><span className="font-black">{["A", "B", "C", "D"][i]})</span><span>{o}</span></button>;
                })}
            </div>
            {ans !== null && <div className={`p-4 rounded-2xl animate-in slide-in-from-bottom-4 ${ans === correct ? "bg-emerald-900/30 border border-emerald-500/40 text-emerald-200" : "bg-rose-900/30 border border-rose-500/40 text-rose-200"}`}><strong>B ✅</strong> — Galileu provou isso no séc. XVII. Na Lua (sem ar), os astronautas repetiram com um martelo e uma pena: chegaram juntos! A resistência do ar cria a diferença, não a massa.</div>}
        </div>
    );
}

function S5() {
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-4">🎓 Fechamento do 1º Bimestre!</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
                {[
                    { icon: "⬇️", t: "Queda Livre", b: "MUV vertical com a = g = 9,8 m/s². Sem ar, qualquer massa cai igual." },
                    { icon: "🍎", t: "Galileu → Newton", b: "Queda Livre foi a base para Newton formular a Lei da Gravitação Universal." },
                    { icon: "🌙", t: "Na Lua", b: "g_Lua ≈ 1,6 m/s². Você pesaria 1/6 do peso terrestre. Salto de 3 m seria 18 m!" },
                    { icon: "🛡️", t: "Aplicação", b: "Pára-quedas, air bags e sistemas de frenagem usam o entendimento da queda e desaceleração." },
                ].map((c, i) => (
                    <div key={i} className="bg-slate-900 border border-slate-700 rounded-2xl p-5 hover:border-green-500/30 transition-all">
                        <span className="text-3xl">{c.icon}</span>
                        <h3 className="font-bold text-slate-100 my-1">{c.t}</h3>
                        <p className="text-slate-400 text-sm">{c.b}</p>
                    </div>
                ))}
            </div>
            <div className="bg-gradient-to-r from-rose-900/30 to-emerald-900/30 border border-emerald-500/30 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-2">🏆</div>
                <h3 className="text-2xl font-black text-slate-100 mb-2">1º Bimestre Concluído!</h3>
                <p className="text-slate-400">Você explorou: Grandezas, SI, Cinemática, Vetores, MRU, MUV, Gráficos, Circular e Queda Livre. Prepare-se para a avaliação!</p>
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {["✓ Grandezas", "✓ SI", "✓ Vetores", "✓ Cinemática", "✓ Velocidade", "✓ Aceleração", "✓ Gráficos", "✓ MCU", "✓ Queda Livre"].map(t => (
                        <span key={t} className="bg-emerald-900/40 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/20">{t}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}

const SLIDES_A12 = [S1, S2, S3, S4, S5];
export function Fisica1Lesson12() {
    const [cur, setCur] = useState(0);
    const next = useCallback(() => setCur(p => Math.min(p + 1, SLIDES_A12.length - 1)), []);
    const prev = useCallback(() => setCur(p => Math.max(p - 1, 0)), []);
    useEffect(() => {
        const h = (e: KeyboardEvent) => { if (e.key === "ArrowRight") next(); if (e.key === "ArrowLeft") prev(); };
        window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
    }, [next, prev]);
    const C = SLIDES_A12[cur];
    return <Shell title="Aula 12 — Queda Livre e Gravidade" aula="Aula 12" total={SLIDES_A12.length} current={cur} onPrev={prev} onNext={next}><C /></Shell>;
}
