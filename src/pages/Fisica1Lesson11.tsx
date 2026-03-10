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

// ── AULA 11: Movimento Circular ───────────────────────────────────────────────
function S1() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center animate-in fade-in zoom-in duration-700 relative">
            <div className="absolute inset-0 opacity-10 rounded-3xl" style={{ backgroundImage: "url('/sprites/backgrounds/11/2304x1296.png')", backgroundSize: "cover", imageRendering: "pixelated" }} />
            <div className="relative z-10">
                <img src="/sprites/1 Pink_Monster/Pink_Monster_Idle_4.png" alt="" className="w-16 h-16 mx-auto mb-6 object-contain" style={{ imageRendering: "pixelated" }} />
                <span className="bg-rose-500/20 text-rose-400 font-bold px-3 py-1 rounded-full text-xs tracking-widest border border-rose-500/30">FÍSICA 1 · AULA 11</span>
                <h1 className="text-4xl md:text-6xl font-black text-white my-4 leading-none">Movimento<br /><span className="text-cyan-400">Circular</span></h1>
                <p className="text-xl text-slate-400 max-w-xl mx-auto">Rodas, planetas, centrífugas, roda-gigante. Como descrever movimentos em trajetória circular?</p>
            </div>
        </div>
    );
}

function S2() {
    const [angle, setAngle] = useState(0);
    useEffect(() => {
        const int = setInterval(() => setAngle(a => (a + 2) % 360), 30);
        return () => clearInterval(int);
    }, []);
    const rad = (angle * Math.PI) / 180;
    const cx = 100, cy = 100, r = 70;
    const px = cx + r * Math.cos(rad);
    const py = cy + r * Math.sin(rad);
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-4">🔄 Conceitos do MCU</h2>
            <p className="text-slate-400 text-xl mb-6">No Movimento Circular Uniforme (MCU), a velocidade escalar é constante, mas a direção muda continuamente.</p>
            <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="bg-slate-950 border border-slate-700 rounded-2xl p-4">
                    <svg width={200} height={200}>
                        <circle cx={cx} cy={cy} r={r} stroke="#1e40af" strokeWidth="2" fill="none" strokeDasharray="4 3" />
                        <line x1={cx} x2={px} y1={cy} y2={py} stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />
                        <circle cx={px} cy={py} r={8} fill="#38bdf8" />
                        <text x={cx + r / 2 - 5} y={cy - 5} fill="#38bdf8" fontSize="10">r</text>
                        <circle cx={cx} cy={cy} r={3} fill="#64748b" />
                        {/* velocity arrow - tangent */}
                        <line x1={px} x2={px - 20 * Math.sin(rad)} y1={py} y2={py + 20 * Math.cos(rad)} stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)" />
                        <defs><marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="#f59e0b" /></marker></defs>
                        <text x={cx - 15} y={cy + 15} fill="#64748b" fontSize="10">C</text>
                    </svg>
                </div>
                <div className="flex-1 space-y-4">
                    {[
                        { t: "Período (T)", d: "Tempo para completar 1 volta. Unidade: segundos (s).", f: "T = 2πr / v" },
                        { t: "Frequência (f)", d: "Número de voltas por segundo. Unidade: Hz.", f: "f = 1/T" },
                        { t: "Velocidade tangencial (v)", d: "Velocidade ao longo da trajetória circular.", f: "v = 2πr / T = 2πrf" },
                        { t: "Aceleração centrípeta", d: "Aponta para o centro. Muda direção, não rapidez.", f: "a_c = v²/r" },
                    ].map((i, k) => (
                        <div key={k} className="bg-slate-900 border border-slate-700 rounded-xl p-3 flex justify-between items-start">
                            <div><p className="font-bold text-slate-200 text-sm">{i.t}</p><p className="text-slate-500 text-xs">{i.d}</p></div>
                            <code className="text-cyan-300 bg-black/40 px-2 py-0.5 rounded text-xs font-mono ml-3 shrink-0">{i.f}</code>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function S3() {
    const [r, setR] = useState(5);
    const [T, setT] = useState(2);
    const v = (2 * Math.PI * r / T).toFixed(2);
    const ac = (parseFloat(v) ** 2 / r).toFixed(2);
    return (
        <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-3">🧮 Calculadora do MCU</h2>
            <p className="text-slate-400 mb-6">Ajuste os parâmetros e calcule automaticamente:</p>
            <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 space-y-4 mb-6">
                <div><label className="text-xs text-slate-400 font-bold">Raio r: <span className="text-cyan-300">{r} m</span></label><input type="range" min={1} max={20} value={r} onChange={e => setR(+e.target.value)} className="w-full mt-1 accent-cyan-400" /></div>
                <div><label className="text-xs text-slate-400 font-bold">Período T: <span className="text-amber-300">{T} s</span></label><input type="range" min={1} max={10} value={T} onChange={e => setT(+e.target.value)} className="w-full mt-1 accent-amber-400" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-cyan-950/30 border border-cyan-500/30 rounded-2xl p-4 text-center"><div className="text-xs text-cyan-400 font-black tracking-widest mb-1">VELOCIDADE</div><div className="text-4xl font-black text-cyan-300">{v} m/s</div></div>
                <div className="bg-orange-950/30 border border-orange-500/30 rounded-2xl p-4 text-center"><div className="text-xs text-orange-400 font-black tracking-widest mb-1">ACEL. CENTRÍPETA</div><div className="text-4xl font-black text-orange-300">{ac} m/s²</div></div>
            </div>
        </div>
    );
}

function S4() {
    const [ans, setAns] = useState<number | null>(null);
    const correct = 2;
    const opts = ["Para a frente, na direção do movimento.", "Para fora da curva (centrífuga).", "Para o centro da trajetória circular.", "Para cima, contrária à gravidade."];
    return (
        <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
            <span className="text-xs font-black tracking-widest text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">QUIZ</span>
            <h2 className="text-2xl font-black text-slate-100 mt-4 mb-6">Num MCU, a aceleração centrípeta aponta para qual direção?</h2>
            <div className="space-y-3 mb-4">
                {opts.map((o, i) => {
                    const cls = ans === null ? "border-slate-700 hover:border-slate-500 bg-slate-900" : i === correct ? "border-emerald-500 bg-emerald-950/30 text-emerald-100 scale-[1.01]" : ans === i ? "border-rose-500 bg-rose-950/30 opacity-70" : "border-slate-800 opacity-25";
                    return <button key={i} disabled={ans !== null} onClick={() => setAns(i)} className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex gap-3 ${cls}`}><span className="font-black">{["A", "B", "C", "D"][i]})</span><span>{o}</span></button>;
                })}
            </div>
            {ans !== null && <div className={`p-4 rounded-2xl animate-in slide-in-from-bottom-4 ${ans === correct ? "bg-emerald-900/30 border border-emerald-500/40 text-emerald-200" : "bg-rose-900/30 border border-rose-500/40 text-rose-200"}`}><strong>C ✅</strong> — A aceleração centrípeta sempre aponta para o centro. Ela muda a direção da velocidade, não seu módulo. "Centrípeta" vem do latim: "que se dirige ao centro".</div>}
        </div>
    );
}

function S5() {
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-6">📝 Resumo — Aula 11</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
                {[
                    { icon: "🔄", t: "MCU", b: "Velocidade escalar constante, mas direção muda. Trajetória: círculo." },
                    { icon: "⏱️", t: "Período e Frequência", b: "T = 1/f. Período em segundos, frequência em Hz." },
                    { icon: "↩️", t: "Aceleração Centrípeta", b: "Sempre aponta para o centro. a_c = v²/r." },
                    { icon: "🚀", t: "Aplicações", b: "Satélites, rodas, ventiladores, centrífugas de laboratório, aceleradores de partículas." },
                ].map((c, i) => (
                    <div key={i} className="bg-slate-900 border border-slate-700 rounded-2xl p-5 hover:border-cyan-500/30 transition-all">
                        <span className="text-3xl">{c.icon}</span>
                        <h3 className="font-bold text-slate-100 my-1">{c.t}</h3>
                        <p className="text-slate-400 text-sm">{c.b}</p>
                    </div>
                ))}
            </div>
            <p className="text-center text-slate-500">Próxima aula: Queda Livre e Aceleração da Gravidade 🍎</p>
        </div>
    );
}

const SLIDES_A11 = [S1, S2, S3, S4, S5];
export function Fisica1Lesson11() {
    const [cur, setCur] = useState(0);
    const next = useCallback(() => setCur(p => Math.min(p + 1, SLIDES_A11.length - 1)), []);
    const prev = useCallback(() => setCur(p => Math.max(p - 1, 0)), []);
    useEffect(() => {
        const h = (e: KeyboardEvent) => { if (e.key === "ArrowRight") next(); if (e.key === "ArrowLeft") prev(); };
        window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
    }, [next, prev]);
    const C = SLIDES_A11[cur];
    return <Shell title="Aula 11 — Movimento Circular" aula="Aula 11" total={SLIDES_A11.length} current={cur} onPrev={prev} onNext={next}><C /></Shell>;
}
