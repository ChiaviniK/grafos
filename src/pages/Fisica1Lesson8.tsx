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
            <div className="absolute inset-0 opacity-10 rounded-3xl" style={{ backgroundImage: "url('/sprites/backgrounds/8/2304x1296.png')", backgroundSize: "cover", imageRendering: "pixelated" }} />
            <div className="relative z-10">
                <img src="/sprites/1 Pink_Monster/Pink_Monster_Run_6.png" alt="" className="w-20 h-16 mx-auto mb-6 object-contain" style={{ imageRendering: "pixelated" }} />
                <span className="bg-rose-500/20 text-rose-400 font-bold px-3 py-1 rounded-full text-xs tracking-widest border border-rose-500/30">FÍSICA 1 · AULA 08</span>
                <h1 className="text-4xl md:text-6xl font-black text-white my-4 leading-none">Velocidade<br /><span className="text-yellow-400">Média & Instantânea</span></h1>
                <p className="text-xl text-slate-400 max-w-xl mx-auto">Qual a diferença entre o que o velocímetro mostra agora e a sua média numa viagem?</p>
            </div>
        </div>
    );
}

function S2() {
    const [dist, setDist] = useState(100);
    const [time, setTime] = useState(2);
    const vm = (dist / time).toFixed(2);
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-3">📊 Velocidade Média</h2>
            <p className="text-slate-400 text-xl mb-2">A velocidade média é o quanto de deslocamento ocorre por unidade de tempo:</p>
            <div className="bg-slate-950 border border-yellow-500/20 rounded-2xl px-6 py-3 mb-6 text-center">
                <code className="text-2xl font-mono text-yellow-300">V_m = Δs / Δt</code>
                <p className="text-slate-500 text-sm mt-1">(deslocamento dividido pelo intervalo de tempo)</p>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div><label className="text-xs text-yellow-400 font-bold tracking-widest">Deslocamento: {dist} m</label><input type="range" min={10} max={500} value={dist} onChange={e => setDist(+e.target.value)} className="w-full mt-1 accent-yellow-400" /></div>
                    <div><label className="text-xs text-sky-400 font-bold tracking-widest">Tempo: {time} s</label><input type="range" min={1} max={20} value={time} onChange={e => setTime(+e.target.value)} className="w-full mt-1 accent-sky-400" /></div>
                </div>
                <div className="text-center bg-yellow-950/30 border border-yellow-500/30 rounded-2xl px-6 py-4">
                    <span className="text-lg font-mono text-slate-400">V_m = {dist} / {time} = </span>
                    <span className="text-5xl font-black text-yellow-300"> {vm} m/s</span>
                    <p className="text-slate-500 text-sm mt-1">= {(+vm * 3.6).toFixed(2)} km/h</p>
                </div>
            </div>
        </div>
    );
}

function S3() {
    const [open, setOpen] = useState(false);
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-3">⚡ Velocidade Instantânea</h2>
            <p className="text-slate-400 text-xl mb-6">A velocidade num instante específico — o que o velocímetro mostra agora.</p>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-slate-900 border border-yellow-500/30 rounded-2xl p-6">
                    <div className="text-yellow-400 font-black text-xs tracking-widest mb-2">VELOCIDADE MÉDIA</div>
                    <h3 className="font-bold text-slate-100 text-xl mb-2">Viagem SP → RJ</h3>
                    <p className="text-slate-400">Distância: 430 km<br />Tempo: 5 horas<br /><strong className="text-yellow-300">V_m = 86 km/h</strong></p>
                    <p className="text-slate-600 text-sm mt-2">Mas será que o carro andou a 86 km/h o tempo todo?</p>
                </div>
                <div className="bg-slate-900 border border-orange-500/30 rounded-2xl p-6">
                    <div className="text-orange-400 font-black text-xs tracking-widest mb-2">VELOCIDADE INSTANTÂNEA</div>
                    <h3 className="font-bold text-slate-100 text-xl mb-2">No velocímetro</h3>
                    <p className="text-slate-400">Estrada: 110 km/h<br />Cidade: 60 km/h<br />Engarrafamento: 0 km/h</p>
                    <p className="text-slate-600 text-sm mt-2">O velocímetro mostra a velocidade neste instante.</p>
                </div>
            </div>
            <button onClick={() => setOpen(o => !o)} className="text-yellow-400 font-bold hover:text-yellow-300">
                {open ? "▼ Ocultar" : "▶ Definição matemática da velocidade instantânea"}
            </button>
            {open && <div className="mt-3 bg-slate-900 border border-slate-700 rounded-xl p-4 animate-in fade-in"><p className="text-slate-300">Vi = lim(Δt→0) Δs/Δt — limite da velocidade média quando o intervalo de tempo tende a zero. É a derivada da posição em relação ao tempo: <code className="text-yellow-300 font-mono">v = ds/dt</code></p></div>}
        </div>
    );
}

function S4() {
    const [ans, setAns] = useState<number | null>(null);
    const correct = 1;
    const opts = ["A velocidade nunca variou durante o trajeto.", "A distância total dividida pelo tempo total foi 80 km/h.", "O carro estava sempre a 80 km/h.", "A velocidade instantânea sempre foi 80 km/h."];
    return (
        <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
            <span className="text-xs font-black tracking-widest text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">QUIZ</span>
            <h2 className="text-2xl font-black text-slate-100 mt-4 mb-6">Um carro viajou 240 km em 3 horas. Sua velocidade média foi de 80 km/h. O que isso significa?</h2>
            <div className="space-y-3 mb-4">
                {opts.map((o, i) => {
                    const cls = ans === null ? "border-slate-700 hover:border-slate-500 bg-slate-900" : i === correct ? "border-emerald-500 bg-emerald-950/30 text-emerald-100 scale-[1.01]" : ans === i ? "border-rose-500 bg-rose-950/30 opacity-70" : "border-slate-800 opacity-25";
                    return <button key={i} disabled={ans !== null} onClick={() => setAns(i)} className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex gap-3 ${cls}`}><span className="font-black">{["A", "B", "C", "D"][i]})</span><span>{o}</span></button>;
                })}
            </div>
            {ans !== null && <div className={`p-4 rounded-2xl animate-in slide-in-from-bottom-4 ${ans === correct ? "bg-emerald-900/30 border border-emerald-500/40 text-emerald-200" : "bg-rose-900/30 border border-rose-500/40 text-rose-200"}`}><strong>B ✅</strong> — Velocidade média é o total do percurso ÷ tempo total. O carro pode ter acelerado, freado e parado várias vezes.</div>}
        </div>
    );
}

function S5() {
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-6">📝 Resumo — Aula 08</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
                {[
                    { icon: "📈", t: "Velocidade Média", b: "V_m = Δs / Δt. Relação global entre deslocamento e tempo. Escalar (em cinemática) ou vetorial (em física geral).", sym: "V_m = Δs/Δt" },
                    { icon: "⚡", t: "Velocidade Instantânea", b: "Velocidade num instante t específico. É o que o velocímetro indica.", sym: "v = ds/dt" },
                    { icon: "🚗", t: "MRU", b: "Movimento Retilíneo Uniforme: velocidade instantânea = velocidade média = constante.", },
                    { icon: "📱", t: "Aplicação", b: "Apps de navegação calculam V_m da sua rota e estimam hora de chegada: ETA = distância/velocidade_média.", },
                ].map((c, i) => (
                    <div key={i} className="bg-slate-900 border border-slate-700 rounded-2xl p-5 hover:border-yellow-500/30 transition-all">
                        <span className="text-3xl">{c.icon}</span>
                        <h3 className="font-bold text-slate-100 my-1">{c.t}</h3>
                        <p className="text-slate-400 text-sm">{c.b}</p>
                        {c.sym && <code className="text-yellow-300 bg-black/40 px-2 py-0.5 rounded text-xs font-mono mt-1 block">{c.sym}</code>}
                    </div>
                ))}
            </div>
            <p className="text-center text-slate-500">Próxima aula: Aceleração e MUV 🚀</p>
        </div>
    );
}

const SLIDES_A8 = [S1, S2, S3, S4, S5];
export function Fisica1Lesson8() {
    const [cur, setCur] = useState(0);
    const next = useCallback(() => setCur(p => Math.min(p + 1, SLIDES_A8.length - 1)), []);
    const prev = useCallback(() => setCur(p => Math.max(p - 1, 0)), []);
    useEffect(() => {
        const h = (e: KeyboardEvent) => { if (e.key === "ArrowRight") next(); if (e.key === "ArrowLeft") prev(); };
        window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
    }, [next, prev]);
    const C = SLIDES_A8[cur];
    return <Shell title="Aula 08 — Velocidade Média e Instantânea" aula="Aula 08" total={SLIDES_A8.length} current={cur} onPrev={prev} onNext={next}><C /></Shell>;
}
