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

function S1() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center animate-in fade-in zoom-in duration-700 relative">
            <div className="absolute inset-0 opacity-10 rounded-3xl" style={{ backgroundImage: "url('/sprites/backgrounds/2/2304x1296.png')", backgroundSize: "cover", imageRendering: "pixelated" }} />
            <div className="relative z-10">
                <div className="text-7xl mb-4">🌡️</div>
                <span className="bg-orange-500/20 text-orange-400 font-bold px-3 py-1 rounded-full text-xs tracking-widest border border-orange-500/30">FÍSICA 2 · AULA 02</span>
                <h1 className="text-4xl md:text-6xl font-black text-white my-4 leading-none">Termometria:<br /><span className="text-orange-400">O que é Temperatura?</span></h1>
                <p className="text-xl text-slate-400 max-w-xl mx-auto">Temperatura não é calor. Ela mede a agitação das partículas — um dos conceitos mais fundamentais da física moderna.</p>
            </div>
        </div>
    );
}

function S2() {
    const [level, setLevel] = useState(50);
    const color = level < 30 ? "#38bdf8" : level < 60 ? "#f59e0b" : "#ef4444";
    const label = level < 30 ? "Frio ❄️" : level < 60 ? "Morno 🌤️" : "Quente 🔥";
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-3">🌡️ O que é Temperatura?</h2>
            <p className="text-slate-400 text-xl mb-6">Temperatura é uma <strong className="text-white">medida da energia cinética média</strong> das partículas de um corpo. Quanto mais agitadas, maior a temperatura.</p>
            <div className="bg-slate-950 border border-slate-700 rounded-3xl p-8 mb-4">
                <div className="flex flex-col items-center mb-6">
                    <div className="relative w-12 h-48 bg-slate-900 rounded-full border-2 border-slate-600 overflow-hidden mb-3">
                        <div className="absolute bottom-0 w-full rounded-full transition-all duration-300" style={{ height: `${level}%`, background: color }} />
                    </div>
                    <div className="text-4xl font-black" style={{ color }}>{Math.round(level) - 50 + 20}°C</div>
                    <div className="text-slate-400 text-lg mt-1">{label}</div>
                </div>
                <input type="range" min={0} max={100} value={level} onChange={e => setLevel(+e.target.value)} className="w-full" style={{ accentColor: color }} />
                <div className="grid grid-cols-3 gap-3 mt-4 text-xs text-center">
                    <div className="bg-blue-950/40 border border-blue-500/20 rounded-xl p-2 text-blue-300">❄️ Partículas lentas<br />T baixa</div>
                    <div className="bg-amber-950/40 border border-amber-500/20 rounded-xl p-2 text-amber-300">🌤️ Agitação média<br />T morna</div>
                    <div className="bg-red-950/40 border border-red-500/20 rounded-xl p-2 text-red-300">🔥 Partículas rápidas<br />T alta</div>
                </div>
            </div>
        </div>
    );
}

function S3() {
    const [open, setOpen] = useState<number | null>(null);
    const concepts = [
        { t: "Termômetro", d: "Instrumento que mede temperatura aproveitando uma propriedade termométrica (ex: dilatação do mercúrio, resistência elétrica).", icon: "🌡️" },
        { t: "Propriedade Termométrica", d: "Qualquer propriedade que varia linearmente com a temperatura. Ex: volume do líquido, resistência elétrica, pressão de gás.", icon: "📊" },
        { t: "Padrão de referência", d: "Pontos fixos usados para calibrar termômetros: ponto de fusão do gelo (0°C) e ebulição da água (100°C) a 1 atm.", icon: "🔧" },
        { t: "Zero absoluto", d: "Menor temperatura possível: 0 K = -273,15°C. As partículas param de se mover (cessação da agitação térmica).", icon: "🧊" },
    ];
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-4">🔑 Conceitos-chave</h2>
            <div className="space-y-3">
                {concepts.map((c, i) => (
                    <div key={i} onClick={() => setOpen(open === i ? null : i)} className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${open === i ? "border-orange-500 bg-orange-950/30 scale-[1.01]" : "border-slate-700 bg-slate-900/60 hover:border-slate-500"}`}>
                        <div className="flex items-center gap-3"><span className="text-2xl">{c.icon}</span><h3 className="font-bold text-xl text-slate-100">{c.t}</h3></div>
                        {open === i && <p className="text-slate-300 mt-3 animate-in fade-in">{c.d}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
}

function S4() {
    const [ans, setAns] = useState<number | null>(null);
    const correct = 2;
    const opts = ["A quantidade de calor que o objeto possui.", "O volume do objeto aquecido.", "A energia cinética média das partículas que compõem o objeto.", "A massa total do objeto."];
    return (
        <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
            <span className="text-xs font-black tracking-widest text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">QUIZ</span>
            <h2 className="text-2xl font-black text-slate-100 mt-4 mb-6">Em nível microscópico, a temperatura de um objeto representa:</h2>
            <div className="space-y-3 mb-4">
                {opts.map((o, i) => {
                    const cls = ans === null ? "border-slate-700 hover:border-slate-500 bg-slate-900" : i === correct ? "border-emerald-500 bg-emerald-950/30 text-emerald-100 scale-[1.01]" : ans === i ? "border-rose-500 bg-rose-950/30 opacity-70" : "border-slate-800 opacity-25";
                    return <button key={i} disabled={ans !== null} onClick={() => setAns(i)} className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex gap-3 ${cls}`}><span className="font-black">{["A", "B", "C", "D"][i]})</span><span>{o}</span></button>;
                })}
            </div>
            {ans !== null && <div className={`p-4 rounded-2xl animate-in slide-in-from-bottom-4 ${ans === correct ? "bg-emerald-900/30 border border-emerald-500/40 text-emerald-200" : "bg-rose-900/30 border border-rose-500/40 text-rose-200"}`}><strong>C ✅</strong> — Temperatura = medida da Ec_média das partículas. Quanto mais rápidas se movem, maior a temperatura.</div>}
        </div>
    );
}

function S5() {
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-6">📝 Resumo — Aula 02</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
                {[
                    { icon: "🌡️", t: "Temperatura", b: "Medida da agitação das partículas. Estado do sistema." },
                    { icon: "🔥", t: "≠ Calor", b: "Calor é energia em trânsito. Temperatura é estado." },
                    { icon: "0 K", t: "Zero Absoluto", b: "-273,15°C. Menor temperatura possível. Partículas param." },
                    { icon: "📏", t: "Termômetro", b: "Usa propriedade termométrica linear para medir T." },
                ].map((c, i) => (
                    <div key={i} className="bg-slate-900 border border-slate-700 rounded-2xl p-5 hover:border-orange-500/30 transition-all">
                        <span className="text-3xl font-black">{c.icon}</span>
                        <h3 className="font-bold text-slate-100 my-1">{c.t}</h3>
                        <p className="text-slate-400 text-sm">{c.b}</p>
                    </div>
                ))}
            </div>
            <p className="text-center text-slate-500">Próxima aula: Escalas Termométricas e Conversões 📐</p>
        </div>
    );
}

const SLIDES = [S1, S2, S3, S4, S5];
export function Fisica2Lesson2() {
    const [cur, setCur] = useState(0);
    const next = useCallback(() => setCur(p => Math.min(p + 1, SLIDES.length - 1)), []);
    const prev = useCallback(() => setCur(p => Math.max(p - 1, 0)), []);
    useEffect(() => {
        const h = (e: KeyboardEvent) => { if (e.key === "ArrowRight") next(); if (e.key === "ArrowLeft") prev(); };
        window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
    }, [next, prev]);
    const C = SLIDES[cur];
    return <Shell title="Aula 02 — Termometria: Conceito de Temperatura" aula="Aula 02" total={SLIDES.length} current={cur} onPrev={prev} onNext={next}><C /></Shell>;
}
