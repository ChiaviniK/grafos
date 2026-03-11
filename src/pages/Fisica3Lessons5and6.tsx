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

function makeLesson(slides: React.FC[], title: string, aula: string) {
    return function Lesson() {
        const [cur, setCur] = useState(0);
        const next = useCallback(() => setCur(p => Math.min(p + 1, slides.length - 1)), []);
        const prev = useCallback(() => setCur(p => Math.max(p - 1, 0)), []);
        useEffect(() => {
            const h = (e: KeyboardEvent) => { if (e.key === "ArrowRight") next(); if (e.key === "ArrowLeft") prev(); };
            window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
        }, [next, prev]);
        const C = slides[cur];
        return <Shell title={title} aula={aula} total={slides.length} current={cur} onPrev={prev} onNext={next}><C /></Shell>;
    };
}

// ── SEM 5: Eletrodinâmica — Corrente Elétrica ────────────────────────────────
function C5S1() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center animate-in fade-in zoom-in duration-700 relative">
            <div className="absolute inset-0 opacity-10 rounded-3xl" style={{ backgroundImage: "url('/sprites/backgrounds/5/2304x1296.png')", backgroundSize: "cover", imageRendering: "pixelated" }} />
            <div className="relative z-10">
                <div className="text-7xl mb-4">🔋</div>
                <span className="bg-amber-500/20 text-amber-400 font-bold px-3 py-1 rounded-full text-xs tracking-widest border border-amber-500/30">FÍSICA 3 · SEMANA 5</span>
                <h1 className="text-4xl md:text-6xl font-black text-white my-4 leading-none">Eletrodinâmica:<br /><span className="text-emerald-400">Corrente Elétrica</span></h1>
                <p className="text-xl text-slate-400 max-w-xl mx-auto">Do estático ao dinâmico: o que faz os elétrons se mover e criar a corrente elétrica que alimenta tudo.</p>
            </div>
        </div>
    );
}

function C5S2() {
    const [q, setQ] = useState(10);
    const [t, setT] = useState(5);
    const I = (q / t).toFixed(2);
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-3">⚡ Corrente Elétrica (i)</h2>
            <p className="text-slate-400 text-xl mb-4">Corrente = quantidade de carga que passa por uma seção por unidade de tempo.</p>
            <div className="bg-slate-950 border border-emerald-500/20 rounded-2xl px-5 py-3 mb-5 text-center">
                <code className="text-2xl font-mono text-emerald-300">i = ΔQ / Δt</code>
                <p className="text-slate-500 text-xs mt-1">Unidade: Ampere (A) = C/s</p>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 space-y-4 mb-4">
                <div><label className="text-xs font-bold text-slate-400">Carga ΔQ: <span className="text-emerald-300">{q} C</span></label><input type="range" min={1} max={100} value={q} onChange={e => setQ(+e.target.value)} className="w-full mt-1 accent-emerald-400" /></div>
                <div><label className="text-xs font-bold text-slate-400">Tempo Δt: <span className="text-amber-300">{t} s</span></label><input type="range" min={1} max={60} value={t} onChange={e => setT(+e.target.value)} className="w-full mt-1 accent-amber-400" /></div>
            </div>
            <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-2xl p-5 text-center mb-4">
                <div className="text-xs text-emerald-400 font-black mb-1">CORRENTE ELÉTRICA</div>
                <div className="text-5xl font-black text-emerald-300">{I} A</div>
                <p className="text-slate-500 text-sm mt-2">{+I < 0.001 ? "μA" : +I < 1 ? "mA" : "A"} — {+I > 50 ? "⚠️ Perigoso!" : +I > 5 ? "⚠️ Alta tensão" : "✅ Seguro para análise"}</p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-xs text-center text-slate-400">
                <div className="bg-slate-900 border border-slate-700 rounded-xl p-2">LED típico<br /><strong className="text-emerald-400">20 mA</strong></div>
                <div className="bg-slate-900 border border-slate-700 rounded-xl p-2">Tomada 127V<br /><strong className="text-emerald-400">≈10 A</strong></div>
                <div className="bg-slate-900 border border-slate-700 rounded-xl p-2">Raio<br /><strong className="text-emerald-400">≈30.000 A</strong></div>
            </div>
        </div>
    );
}

function C5S3() {
    const [open, setOpen] = useState<number | null>(null);
    const concepts = [
        { t: "Sentido da Corrente Convencional", body: "Convenção histórica: sentido+ → -. Na prática os elétrons vão no sentido oposto (- → +). Em fios metálicos.", icon: "→" },
        { t: "Condutores, Isolantes e Semicondutores", body: "Condutores (metais): elétrons livres. Isolantes (plástico, borracha): sem livres. Semicondutores (silício): conduz sob certas condições — base dos chips!", icon: "💡" },
        { t: "Efeito Joule", body: "Corrente esquenta condutor: P = R·i². Base dos chuveiros, resistências, fusíveis e processadores que aquecem.", icon: "🔥" },
    ];
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-4">🔑 Conceitos-Chave</h2>
            <div className="space-y-3">
                {concepts.map((c, i) => (
                    <div key={i} onClick={() => setOpen(open === i ? null : i)} className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${open === i ? "border-emerald-500 bg-emerald-950/20" : "border-slate-700 bg-slate-900/60 hover:border-slate-500"}`}>
                        <div className="flex items-center gap-3"><span className="text-2xl font-black text-emerald-300">{c.icon}</span><h3 className="font-bold text-xl text-slate-100">{c.t}</h3></div>
                        {open === i && <p className="text-slate-300 mt-3 animate-in fade-in leading-relaxed">{c.body}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
}

function C5S4() {
    const [ans, setAns] = useState<number | null>(null);
    const correct = 2;
    const opts = ["0,1 A", "0,5 A", "2 A", "10 A"];
    return (
        <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
            <span className="text-xs font-black tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">QUIZ</span>
            <h2 className="text-2xl font-black text-slate-100 mt-4 mb-3">Num fio passam 40 Coulombs em 20 segundos. Qual a corrente elétrica?</h2>
            <p className="text-slate-500 mb-4 text-sm font-mono">i = ΔQ / Δt = 40 / 20 = ?</p>
            <div className="space-y-3 mb-4">
                {opts.map((o, i) => {
                    const cls = ans === null ? "border-slate-700 hover:border-slate-500 bg-slate-900" : i === correct ? "border-emerald-500 bg-emerald-950/30 text-emerald-100" : ans === i ? "border-rose-500 bg-rose-950/30 opacity-70" : "border-slate-800 opacity-25";
                    return <button key={i} disabled={ans !== null} onClick={() => setAns(i)} className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex gap-3 ${cls}`}><span className="font-black">{["A", "B", "C", "D"][i]})</span><span>{o}</span></button>;
                })}
            </div>
            {ans !== null && <div className={`p-4 rounded-2xl animate-in slide-in-from-bottom-4 ${ans === correct ? "bg-emerald-900/30 border border-emerald-500/40 text-emerald-200" : "bg-rose-900/30 border border-rose-500/40 text-rose-200"}`}><strong>C ✅</strong> — i = 40/20 = <strong>2 A</strong>. No efeito Joule: P = R·(2)² = 4R watts de calor gerado.</div>}
        </div>
    );
}

function C5S5() {
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-6">📝 Resumo — Sem. 5</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
                {[
                    { icon: "⚡", t: "Corrente (i)", b: "i = ΔQ/Δt. Amperes (A). Fluxo de cargas por seção transversal." },
                    { icon: "→", t: "Sentido Convencional", b: "Positivo → Negativo. Elétrons na direção oposta." },
                    { icon: "🔥", t: "Efeito Joule", b: "P = R·i². Corrente gera calor. Base de resistências e fusíveis." },
                    { icon: "💡", t: "Semicondutores", b: "Silício: base dos transistores e chips. Conduz sob controle de gate." },
                ].map((c, i) => (
                    <div key={i} className="bg-slate-900 border border-slate-700 rounded-2xl p-5 hover:border-emerald-500/30 transition-all">
                        <span className="text-3xl">{c.icon}</span>
                        <h3 className="font-bold text-slate-100 my-1">{c.t}</h3>
                        <p className="text-slate-400 text-sm">{c.b}</p>
                    </div>
                ))}
            </div>
            <p className="text-center text-slate-500">Próxima aula: Resistores e 1ª Lei de Ohm 🔌</p>
        </div>
    );
}

const SL5 = [C5S1, C5S2, C5S3, C5S4, C5S5];

// ── SEM 6: Resistores + 1ª Lei de Ohm ────────────────────────────────────────
function D6S1() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center animate-in fade-in zoom-in duration-700 relative">
            <div className="absolute inset-0 opacity-10 rounded-3xl" style={{ backgroundImage: "url('/sprites/backgrounds/6/2304x1296.png')", backgroundSize: "cover", imageRendering: "pixelated" }} />
            <div className="relative z-10">
                <img src="/sprites/1 Pink_Monster/Pink_Monster_Idle_4.png" alt="" className="w-16 h-16 mx-auto mb-6 object-contain" style={{ imageRendering: "pixelated" }} />
                <span className="bg-amber-500/20 text-amber-400 font-bold px-3 py-1 rounded-full text-xs tracking-widest border border-amber-500/30">FÍSICA 3 · SEMANA 6</span>
                <h1 className="text-4xl md:text-6xl font-black text-white my-4 leading-none">Resistores &<br /><span className="text-sky-400">1ª Lei de Ohm</span></h1>
                <p className="text-xl text-slate-400 max-w-xl mx-auto">V = R·i — a relação fundamental que governa circuitos elétricos ao redor do mundo.</p>
            </div>
        </div>
    );
}

function D6S2() {
    const [V, setV] = useState(12);
    const [R, setR] = useState(4);
    const I = (V / R).toFixed(2);
    const P = (V * V / R).toFixed(1);
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-3">🔌 Calculadora de Circuito Simples</h2>
            <div className="bg-slate-950 border border-sky-500/20 rounded-2xl px-5 py-3 mb-5 text-center"><code className="text-2xl font-mono text-sky-300">V = R · i</code></div>
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 space-y-4 mb-4">
                <div><label className="text-xs font-bold text-slate-400">Tensão V: <span className="text-sky-300">{V} V</span></label><input type="range" min={1} max={240} value={V} onChange={e => setV(+e.target.value)} className="w-full mt-1 accent-sky-400" /></div>
                <div><label className="text-xs font-bold text-slate-400">Resistência R: <span className="text-amber-300">{R} Ω</span></label><input type="range" min={1} max={100} value={R} onChange={e => setR(+e.target.value)} className="w-full mt-1 accent-amber-400" /></div>
            </div>
            <div className="grid grid-cols-3 gap-3">
                <div className="bg-sky-950/30 border border-sky-500/30 rounded-2xl p-4 text-center"><div className="text-xs text-sky-400 font-black mb-1">TENSÃO (V)</div><div className="text-3xl font-black text-sky-300">{V} V</div></div>
                <div className="bg-amber-950/30 border border-amber-500/30 rounded-2xl p-4 text-center"><div className="text-xs text-amber-400 font-black mb-1">CORRENTE (i)</div><div className="text-3xl font-black text-amber-300">{I} A</div></div>
                <div className="bg-rose-950/30 border border-rose-500/30 rounded-2xl p-4 text-center"><div className="text-xs text-rose-400 font-black mb-1">POTÊNCIA (P)</div><div className="text-3xl font-black text-rose-300">{P} W</div></div>
            </div>
        </div>
    );
}

function D6S3() {
    const [ans, setAns] = useState<number | null>(null);
    const correct = 1;
    const opts = ["50 Ω", "20 Ω", "200 Ω", "0,02 Ω"];
    return (
        <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
            <span className="text-xs font-black tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">QUIZ</span>
            <h2 className="text-2xl font-black text-slate-100 mt-4 mb-3">Uma lâmpada opera a 220 V e consome 11 A de corrente. Qual sua resistência?</h2>
            <p className="text-slate-500 mb-4 text-sm font-mono">R = V / i = 220 / 11 = ?</p>
            <div className="space-y-3 mb-4">
                {opts.map((o, i) => {
                    const cls = ans === null ? "border-slate-700 hover:border-slate-500 bg-slate-900" : i === correct ? "border-emerald-500 bg-emerald-950/30 text-emerald-100" : ans === i ? "border-rose-500 bg-rose-950/30 opacity-70" : "border-slate-800 opacity-25";
                    return <button key={i} disabled={ans !== null} onClick={() => setAns(i)} className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex gap-3 ${cls}`}><span className="font-black">{["A", "B", "C", "D"][i]})</span><span>{o}</span></button>;
                })}
            </div>
            {ans !== null && <div className={`p-4 rounded-2xl animate-in slide-in-from-bottom-4 ${ans === correct ? "bg-emerald-900/30 border border-emerald-500/40 text-emerald-200" : "bg-rose-900/30 border border-rose-500/40 text-rose-200"}`}><strong>B ✅</strong> — R = V/i = 220/11 = <strong>20 Ω</strong>. Potência: P = V·i = 220×11 = 2420 W ≈ 2,4 kW.</div>}
        </div>
    );
}

function D6S4() {
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-6">📝 Resumo — Sem. 6</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
                {[
                    { icon: "🔌", t: "1ª Lei de Ohm", b: "V = R·i. Válida para resistores ôhmicos (R constante). V vs i é uma reta." },
                    { icon: "Ω", t: "Resistência (R)", b: "Medida em Ohm (Ω). Oposição ao fluxo de corrente. Dissipa energia como calor." },
                    { icon: "📊", t: "Gráfico V×i", b: "Resistor ôhmico: reta passando pela origem. Inclinação = R. Resistor não-ôhmico: curva." },
                    { icon: "💡", t: "Ponto de Operação", b: "Interseção da curva V×i do componente com a curva da fonte = ponto de trabalho real." },
                ].map((c, i) => (
                    <div key={i} className="bg-slate-900 border border-slate-700 rounded-2xl p-5 hover:border-sky-500/30 transition-all">
                        <span className="text-3xl font-black">{c.icon}</span>
                        <h3 className="font-bold text-slate-100 my-1">{c.t}</h3>
                        <p className="text-slate-400 text-sm">{c.b}</p>
                    </div>
                ))}
            </div>
            <p className="text-center text-slate-500">Próxima aula: 2ª Lei de Ohm e Medição Elétrica 🔬</p>
        </div>
    );
}

const SL6 = [D6S1, D6S2, D6S3, D6S4];

export const Fisica3Lesson5 = makeLesson(SL5, "Sem. 5 — Eletrodinâmica & Corrente Elétrica", "Sem. 5");
export const Fisica3Lesson6 = makeLesson(SL6, "Sem. 6 — Resistores & 1ª Lei de Ohm", "Sem. 6");
