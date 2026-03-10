import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Home, CheckCircle2, Circle } from "lucide-react";

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

function S1() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center animate-in fade-in zoom-in duration-700 relative">
            <div className="absolute inset-0 opacity-10 rounded-3xl" style={{ backgroundImage: "url('/sprites/backgrounds/8/2304x1296.png')", backgroundSize: "cover", imageRendering: "pixelated" }} />
            <div className="relative z-10">
                <div className="text-6xl mb-4">🧪</div>
                <span className="bg-orange-500/20 text-orange-400 font-bold px-3 py-1 rounded-full text-xs tracking-widest border border-orange-500/30">FÍSICA 2 · AULA 08 — PRÁTICA</span>
                <h1 className="text-4xl md:text-6xl font-black text-white my-4 leading-none">Construindo um<br /><span className="text-teal-400">Calorímetro Simples</span></h1>
                <p className="text-xl text-slate-400 max-w-xl mx-auto">Hoje vamos construir um calorímetro usando copos de isopor e medir trocas de calor experimentalmente.</p>
            </div>
        </div>
    );
}

function S2() {
    const [checked, setChecked] = useState<Record<number, boolean>>({});
    const steps = [
        { s: "Obtenha 2 copos de isopor grandes (500 ml cada).", icon: "☕" },
        { s: "Encaixe um dentro do outro (dupla parede = melhor isolamento).", icon: "🥤" },
        { s: "Coloque uma tampa de papelão com 2 furos: um para termômetro, um para mexer.", icon: "📦" },
        { s: "Meça 200 mL de água fria (temperatura T_fria) com thermômetro.", icon: "🌡️" },
        { s: "Aqueça 100 mL de água quente (temperatura T_quente ≈ 70-80°C).", icon: "🔥" },
        { s: "Despeje a água quente no calorímetro com a fria. Tampe imediatamente.", icon: "💧" },
        { s: "Mexa levemente e leia a temperatura de equilíbrio T_eq a cada 30s.", icon: "⏱️" },
        { s: "Calcule o calor cedido e absorvido com Q = m·c·ΔT. Compare os valores!", icon: "📊" },
    ];
    const allDone = steps.every((_, i) => checked[i]);
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-4">🔬 Procedimento — Calorímetro de Isopor</h2>
            <p className="text-slate-400 mb-5">Siga os passos conforme o professor instruir. Clique em cada etapa ao concluí-la:</p>
            <div className="space-y-2 mb-4">
                {steps.map((st, i) => {
                    const done = !!checked[i];
                    return (
                        <button key={i} onClick={() => setChecked(p => ({ ...p, [i]: !p[i] }))} className={`w-full flex items-center gap-4 p-3 rounded-xl border-2 text-left transition-all ${done ? "border-teal-500 bg-teal-950/30" : "border-slate-700 bg-slate-900/60 hover:border-slate-500"}`}>
                            <span className="text-xl">{st.icon}</span>
                            <span className={`flex-1 font-medium text-sm ${done ? "text-teal-200 line-through opacity-70" : "text-slate-300"}`}>{i + 1}. {st.s}</span>
                            {done ? <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" /> : <Circle className="w-5 h-5 text-slate-600 shrink-0" />}
                        </button>
                    );
                })}
            </div>
            {allDone && <div className="bg-teal-900/30 border border-teal-500/40 rounded-2xl p-4 text-teal-200 text-center font-bold animate-in slide-in-from-bottom-4">✅ Experimento concluído! Registre os dados no relatório.</div>}
        </div>
    );
}

function S3() {
    const [mq, setMq] = useState(100);
    const [Tq, setTq] = useState(75);
    const [mf, setMf] = useState(200);
    const [Tf, setTf] = useState(20);
    const [Teq, setTeq] = useState("");
    const c = 4.186;
    const Tteor = ((mq * c * Tq + mf * c * Tf) / ((mq + mf) * c)).toFixed(1);
    const diff = Teq && !isNaN(+Teq) ? Math.abs(+Teq - +Tteor).toFixed(1) : null;
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-4">📊 Análise dos Resultados</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 space-y-3">
                    <div className="text-xs font-black text-slate-500 tracking-widest">DADOS DO EXPERIMENTO</div>
                    <div><label className="text-xs text-slate-400">m_quente: <span className="text-red-300">{mq} g</span></label><input type="range" min={50} max={500} value={mq} onChange={e => setMq(+e.target.value)} className="w-full mt-1 accent-red-400" /></div>
                    <div><label className="text-xs text-slate-400">T_quente: <span className="text-red-300">{Tq}°C</span></label><input type="range" min={40} max={100} value={Tq} onChange={e => setTq(+e.target.value)} className="w-full mt-1 accent-red-400" /></div>
                    <div><label className="text-xs text-slate-400">m_fria: <span className="text-blue-300">{mf} g</span></label><input type="range" min={50} max={500} value={mf} onChange={e => setMf(+e.target.value)} className="w-full mt-1 accent-blue-400" /></div>
                    <div><label className="text-xs text-slate-400">T_fria: <span className="text-blue-300">{Tf}°C</span></label><input type="range" min={0} max={40} value={Tf} onChange={e => setTf(+e.target.value)} className="w-full mt-1 accent-blue-400" /></div>
                    <div><label className="text-xs text-slate-400">T_eq medida no experimento:</label><input type="number" value={Teq} onChange={e => setTeq(e.target.value)} placeholder="Ex: 42.5" className="w-full mt-1 px-3 py-2 bg-slate-800 border border-slate-600 rounded-xl text-white text-sm focus:outline-none focus:border-teal-500" /></div>
                </div>
                <div className="space-y-4">
                    <div className="bg-teal-950/30 border border-teal-500/30 rounded-2xl p-4 text-center"><div className="text-xs text-teal-400 font-black mb-1">T_eq TEÓRICA</div><div className="text-4xl font-black text-teal-300">{Tteor}°C</div></div>
                    {Teq && !isNaN(+Teq) && (
                        <div className="bg-amber-950/30 border border-amber-500/30 rounded-2xl p-4 text-center animate-in fade-in"><div className="text-xs text-amber-400 font-black mb-1">ERRO EXPERIMENTAL</div><div className="text-4xl font-black text-amber-300">{diff}°C</div><p className="text-slate-500 text-xs mt-1">{+diff! < 2 ? "✅ Ótimo resultado!" : "⚠️ Houve perda significativa de calor para o ambiente."}</p></div>
                    )}
                </div>
            </div>
        </div>
    );
}

function S4() {
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-6">📝 Resumo — Aula 08 (Prática)</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
                {[
                    { icon: "🥤", t: "Calorímetro", b: "Recipiente de isopor duplo que minimiza perdas de calor para o ambiente." },
                    { icon: "⚖️", t: "Princípio", b: "Q_cedido = Q_absorvido (em sistema isolado). O experimento permite validar isso." },
                    { icon: "📊", t: "Erro Experimental", b: "Diferença entre T_teórica e T_medida indica perda para o ambiente (ΔQ_perdido)." },
                    { icon: "🎯", t: "Habilidade", b: "A experiência desenvolve análise de dados, identificação de variáveis e controle experimental." },
                ].map((c, i) => (
                    <div key={i} className="bg-slate-900 border border-slate-700 rounded-2xl p-5 hover:border-teal-500/30 transition-all">
                        <span className="text-3xl">{c.icon}</span>
                        <h3 className="font-bold text-slate-100 my-1">{c.t}</h3>
                        <p className="text-slate-400 text-sm">{c.b}</p>
                    </div>
                ))}
            </div>
            <p className="text-center text-slate-500">Próxima aula: Propagação de Calor — Condução e Convecção 🌊</p>
        </div>
    );
}

const SLIDES = [S1, S2, S3, S4];
export function Fisica2Lesson8() {
    const [cur, setCur] = useState(0);
    const next = useCallback(() => setCur(p => Math.min(p + 1, SLIDES.length - 1)), []);
    const prev = useCallback(() => setCur(p => Math.max(p - 1, 0)), []);
    useEffect(() => {
        const h = (e: KeyboardEvent) => { if (e.key === "ArrowRight") next(); if (e.key === "ArrowLeft") prev(); };
        window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
    }, [next, prev]);
    const C = SLIDES[cur];
    return <Shell title="Aula 08 — Calorímetro Simples (Prática)" aula="Aula 08" total={SLIDES.length} current={cur} onPrev={prev} onNext={next}><C /></Shell>;
}
