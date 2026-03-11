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
                <Link to="/fisica3" className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium"><Home className="w-4 h-4" /> Física 3</Link>
                <div className="flex items-center gap-2">{Array.from({ length: total }).map((_, i) => <div key={i} className={`h-1.5 rounded-full transition-all ${i === current ? "w-6 bg-amber-400" : i < current ? "w-3 bg-slate-600" : "w-3 bg-slate-800"}`} />)}</div>
                <span className="text-slate-500 text-xs font-mono">{aula} · {current + 1}/{total}</span>
            </nav>
            <div className="flex-1 overflow-y-auto px-4 sm:px-8 md:px-16 py-8">{children}</div>
            <div className="flex justify-between items-center px-6 py-4 border-t border-slate-800 bg-slate-950/80 backdrop-blur shrink-0">
                <button onClick={onPrev} disabled={current === 0} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-700 text-slate-400 hover:border-slate-500 disabled:opacity-30 transition-all font-semibold text-sm"><ChevronLeft className="w-4 h-4" /> Anterior</button>
                <span className="text-slate-600 text-xs truncate max-w-xs">{title}</span>
                <button onClick={onNext} disabled={current === total - 1} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-30 text-white font-bold transition-all text-sm">Próximo <ChevronRight className="w-4 h-4" /></button>
            </div>
        </div>
    );
}

// ── SEM 2: Lei de Coulomb + Campo Elétrico ────────────────────────────────────
function S1() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center animate-in fade-in zoom-in duration-700 relative">
            <div className="absolute inset-0 opacity-10 rounded-3xl" style={{ backgroundImage: "url('/sprites/backgrounds/2/2304x1296.png')", backgroundSize: "cover", imageRendering: "pixelated" }} />
            <div className="relative z-10">
                <img src="/sprites/3 Dude_Monster/Dude_Monster_Idle_4.png" alt="" className="w-16 h-16 mx-auto mb-6 object-contain" style={{ imageRendering: "pixelated" }} />
                <span className="bg-amber-500/20 text-amber-400 font-bold px-3 py-1 rounded-full text-xs tracking-widest border border-amber-500/30">FÍSICA 3 · SEMANA 2</span>
                <h1 className="text-4xl md:text-6xl font-black text-white my-4 leading-none">Lei de Coulomb<br /><span className="text-yellow-400">& Campo Elétrico</span></h1>
                <p className="text-xl text-slate-400 max-w-xl mx-auto">Como calcular a força entre cargas e o campo que elas criam ao seu redor.</p>
            </div>
        </div>
    );
}

function S2() {
    const [q1, setQ1] = useState(2);
    const [q2, setQ2] = useState(3);
    const [r, setR] = useState(0.5);
    const k = 9e9;
    const F = (k * (q1 * 1e-6) * (q2 * 1e-6) / (r * r)).toFixed(3);
    const sameSign = (q1 > 0 && q2 > 0) || (q1 < 0 && q2 < 0);
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-3">⚡ Calculadora da Lei de Coulomb</h2>
            <div className="bg-slate-950 border border-yellow-500/20 rounded-2xl px-5 py-3 mb-5 text-center">
                <code className="text-xl font-mono text-yellow-300">F = k · |q₁| · |q₂| / r²</code>
                <p className="text-slate-500 text-xs mt-1">k = 9×10⁹ N·m²/C²</p>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 space-y-4 mb-4">
                <div><label className="text-xs font-bold text-slate-400">Carga q₁: <span className="text-yellow-300">{q1} μC</span></label><input type="range" min={-10} max={10} step={0.5} value={q1} onChange={e => setQ1(+e.target.value)} className="w-full mt-1 accent-yellow-400" /></div>
                <div><label className="text-xs font-bold text-slate-400">Carga q₂: <span className="text-yellow-300">{q2} μC</span></label><input type="range" min={-10} max={10} step={0.5} value={q2} onChange={e => setQ2(+e.target.value)} className="w-full mt-1 accent-yellow-400" /></div>
                <div><label className="text-xs font-bold text-slate-400">Distância r: <span className="text-amber-300">{r} m</span></label><input type="range" min={0.1} max={2} step={0.05} value={r} onChange={e => setR(+e.target.value)} className="w-full mt-1 accent-amber-400" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-yellow-950/30 border border-yellow-500/30 rounded-2xl p-4 text-center">
                    <div className="text-xs text-yellow-400 font-black mb-1">FORÇA (F)</div>
                    <div className="text-4xl font-black text-yellow-300">{F} N</div>
                </div>
                <div className={`rounded-2xl p-4 text-center ${sameSign ? "bg-red-950/30 border border-red-500/30" : "bg-blue-950/30 border border-blue-500/30"}`}>
                    <div className={`text-xs font-black mb-1 ${sameSign ? "text-red-400" : "text-blue-400"}`}>TIPO</div>
                    <div className={`text-2xl font-black ${sameSign ? "text-red-300" : "text-blue-300"}`}>{sameSign ? "↔ Repulsão" : "↕ Atração"}</div>
                </div>
            </div>
        </div>
    );
}

function S3() {
    const [q, setQ] = useState(5);
    const [r2, setR2] = useState(1);
    const k = 9e9;
    const E = (k * Math.abs(q) * 1e-6 / (r2 * r2)).toFixed(0);
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-3">🌐 Campo Elétrico (E)</h2>
            <p className="text-slate-400 text-xl mb-4">O campo elétrico é a influência que uma carga Q exerce no espaço ao seu redor. Uma carga de teste q sente força F = q·E.</p>
            <div className="bg-slate-950 border border-amber-500/20 rounded-2xl px-5 py-3 mb-5 text-center">
                <code className="text-xl font-mono text-amber-300">E = k · |Q| / r²</code>
                <p className="text-slate-500 text-xs mt-1">Unidade: N/C = V/m</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 space-y-4">
                    <div><label className="text-xs font-bold text-slate-400">Carga Q: <span className="text-amber-300">{q} μC</span></label><input type="range" min={1} max={20} value={q} onChange={e => setQ(+e.target.value)} className="w-full mt-1 accent-amber-400" /></div>
                    <div><label className="text-xs font-bold text-slate-400">Distância r: <span className="text-yellow-300">{r2} m</span></label><input type="range" min={0.1} max={3} step={0.1} value={r2} onChange={e => setR2(+e.target.value)} className="w-full mt-1 accent-yellow-400" /></div>
                </div>
                <div className="text-center flex flex-col justify-center">
                    <div className="text-xs text-amber-400 font-black tracking-widest mb-2">MÓDULO DO CAMPO</div>
                    <div className="text-5xl font-black text-amber-300">{parseInt(E).toLocaleString("pt-BR")} N/C</div>
                    <p className="text-slate-500 text-sm mt-2">≈ {(parseInt(E) / 1000).toFixed(1)} kV/m</p>
                </div>
            </div>
            <div className="mt-4 bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-slate-400">
                💡 <strong className="text-slate-200">Campo uniforme:</strong> entre placas paralelas com mesma carga, o campo é constante. E = V/d. Usado em capacitores e telas touch.
            </div>
        </div>
    );
}

function S4() {
    const [ans, setAns] = useState<number | null>(null);
    const correct = 1;
    const opts = ["2 N", "4 N", "8 N", "16 N"];
    return (
        <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
            <span className="text-xs font-black tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">QUIZ</span>
            <h2 className="text-2xl font-black text-slate-100 mt-4 mb-3">Duas cargas de 1 μC cada estão a 1,5 m de distância. Se a distância for reduzida para 0,75 m (metade), a força:</h2>
            <p className="text-slate-500 mb-4 text-sm">F ∝ 1/r². Se r cai na metade, F aumenta?</p>
            <div className="space-y-3 mb-4">
                {opts.map((o, i) => {
                    const cls = ans === null ? "border-slate-700 hover:border-slate-500 bg-slate-900" : i === correct ? "border-emerald-500 bg-emerald-950/30 text-emerald-100" : ans === i ? "border-rose-500 bg-rose-950/30 opacity-70" : "border-slate-800 opacity-25";
                    return <button key={i} disabled={ans !== null} onClick={() => setAns(i)} className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex gap-3 ${cls}`}><span className="font-black">{["A", "B", "C", "D"][i]})</span><span>{o}</span></button>;
                })}
            </div>
            {ans !== null && <div className={`p-4 rounded-2xl animate-in slide-in-from-bottom-4 ${ans === correct ? "bg-emerald-900/30 border border-emerald-500/40 text-emerald-200" : "bg-rose-900/30 border border-rose-500/40 text-rose-200"}`}><strong>B ✅</strong> — F ∝ 1/r². Se r → r/2, então F multiplica por (2)² = 4. A força <strong>quadruplica</strong>.</div>}
        </div>
    );
}

function S5() {
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-6">📝 Resumo — Sem. 2</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
                {[
                    { icon: "⚖️", t: "Lei de Coulomb", b: "F = k·|q₁|·|q₂|/r². Força elétrica entre cargas pontuais. k = 9×10⁹ N·m²/C²." },
                    { icon: "↔️", t: "Sinal da força", b: "Cargas iguais → repulsão. Opostas → atração. F é um vetor!" },
                    { icon: "🌐", t: "Campo Elétrico E", b: "E = k·Q/r². Criado pela carga-fonte Q. Não depende da carga de teste." },
                    { icon: "🔗", t: "Relação F e E", b: "F = q·E. A carga de teste q sente uma força proporcional ao campo local." },
                ].map((c, i) => (
                    <div key={i} className="bg-slate-900 border border-slate-700 rounded-2xl p-5 hover:border-amber-500/30 transition-all">
                        <span className="text-3xl">{c.icon}</span>
                        <h3 className="font-bold text-slate-100 my-1">{c.t}</h3>
                        <p className="text-slate-400 text-sm">{c.b}</p>
                    </div>
                ))}
            </div>
            <p className="text-center text-slate-500">Próxima aula: Energia Potencial e Tensão Elétrica ⚡</p>
        </div>
    );
}

const SLIDES_L2 = [S1, S2, S3, S4, S5];
export function Fisica3Lesson2() {
    const [cur, setCur] = useState(0);
    const next = useCallback(() => setCur(p => Math.min(p + 1, SLIDES_L2.length - 1)), []);
    const prev = useCallback(() => setCur(p => Math.max(p - 1, 0)), []);
    useEffect(() => {
        const h = (e: KeyboardEvent) => { if (e.key === "ArrowRight") next(); if (e.key === "ArrowLeft") prev(); };
        window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
    }, [next, prev]);
    const C = SLIDES_L2[cur];
    return <Shell title="Sem. 2 — Lei de Coulomb & Campo Elétrico" aula="Sem. 2" total={SLIDES_L2.length} current={cur} onPrev={prev} onNext={next}><C /></Shell>;
}
