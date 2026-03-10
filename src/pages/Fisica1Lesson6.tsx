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
            <div className="absolute inset-0 opacity-10 rounded-3xl" style={{ backgroundImage: "url('/sprites/backgrounds/6/2304x1296.png')", backgroundSize: "cover", imageRendering: "pixelated" }} />
            <div className="relative z-10">
                <img src="/sprites/1 Pink_Monster/Pink_Monster_Run_6.png" alt="" className="w-20 h-16 mx-auto mb-6 object-contain" style={{ imageRendering: "pixelated" }} />
                <span className="bg-rose-500/20 text-rose-400 font-bold px-3 py-1 rounded-full text-xs tracking-widest border border-rose-500/30">FÍSICA 1 · AULA 06</span>
                <h1 className="text-5xl md:text-6xl font-black text-white my-4 leading-none">Cinemática:<br /><span className="text-sky-400">Espaço & Tempo</span></h1>
                <p className="text-xl text-slate-400 max-w-xl mx-auto">O estudo do <em>como</em> os objetos se movem — sem se preocupar (ainda) com o <em>porquê</em>.</p>
            </div>
        </div>
    );
}

function S2() {
    const [step, setStep] = useState(0);
    const concepts = [
        { term: "Referencial", def: "Ponto ou objeto escolhido como fixo para descrever o movimento. Sem referencial, não podemos afirmar se algo está em movimento.", ex: "Um passageiro está em repouso em relação ao trem, mas em movimento em relação à plataforma." },
        { term: "Posição (s)", def: "Localização de um objeto em relação ao referencial, medida em metros (m).", ex: "Um carro está na posição s = 200 m do marco zero." },
        { term: "Trajetória", def: "O caminho descrito pelo objeto durante seu movimento. Pode ser reta, curva, circular.", ex: "Uma bola de basquete segue uma trajetória parabólica." },
        { term: "Tempo (t)", def: "Grandeza que mede a duração dos eventos. Medido em segundos (s) no SI.", ex: "A corrida durou t = 9,58 s (recorde de Usain Bolt)." },
    ];
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-3">🔑 Conceitos Fundamentais</h2>
            <p className="text-slate-400 text-xl mb-6">Clique em Próximo para explorar cada conceito:</p>
            <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 min-h-[220px] flex flex-col justify-between">
                <div>
                    <div className="text-xs font-black tracking-widest text-sky-400 mb-2">{step + 1}/{concepts.length} — {concepts[step].term.toUpperCase()}</div>
                    <h3 className="text-3xl font-bold text-slate-100 mb-4">{concepts[step].term}</h3>
                    <p className="text-slate-300 text-lg mb-3">{concepts[step].def}</p>
                    <p className="text-slate-500 text-base italic">💡 {concepts[step].ex}</p>
                </div>
                <div className="flex items-center gap-3 mt-6">
                    <button disabled={step === 0} onClick={() => setStep(p => p - 1)} className="px-4 py-2 rounded-xl border border-slate-700 text-slate-400 hover:border-slate-500 disabled:opacity-30 transition-all text-sm font-bold">← Anterior</button>
                    <div className="flex gap-1 flex-1 justify-center">{concepts.map((_, i) => <div key={i} className={`h-1.5 rounded-full transition-all ${step === i ? "w-8 bg-sky-400" : "w-3 bg-slate-700"}`} />)}</div>
                    <button disabled={step === concepts.length - 1} onClick={() => setStep(p => p + 1)} className="px-4 py-2 rounded-xl bg-sky-700 hover:bg-sky-600 disabled:opacity-30 text-white transition-all text-sm font-bold">Próximo →</button>
                </div>
            </div>
        </div>
    );
}

function S3() {
    const [moving, setMoving] = useState(false);
    const [pos, setPos] = useState(0);
    useEffect(() => {
        if (!moving) return;
        if (pos >= 100) { setMoving(false); return; }
        const t = setTimeout(() => setPos(p => Math.min(p + 2, 100)), 30);
        return () => clearTimeout(t);
    }, [moving, pos]);
    const reset = () => { setMoving(false); setPos(0); };
    const time = (pos / 100 * 5).toFixed(1);
    const dist = (pos / 100 * 100).toFixed(0);
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-3">🚗 Simulação: Objeto em Movimento</h2>
            <p className="text-slate-400 text-xl mb-6">Clique em ▶ e observe como espaço e tempo evoluem juntos:</p>
            <div className="bg-slate-950 border border-slate-700 rounded-3xl p-8 mb-4">
                <div className="relative mb-6 h-16 bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden">
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-slate-600 font-mono">0 m</div>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-600 font-mono">100 m</div>
                    <div className="absolute h-0.5 bg-slate-700 top-1/2 w-full" />
                    <div className="absolute top-1/2 -translate-y-1/2 transition-all" style={{ left: `${pos}%`, transform: "translateX(-50%) translateY(-50%)" }}>
                        <img src="/sprites/3 Dude_Monster/Dude_Monster_Run_6.png" alt="" className="h-10 object-contain" style={{ imageRendering: "pixelated" }} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center mb-6">
                    <div className="bg-slate-900 rounded-2xl p-4 border border-sky-500/30"><div className="text-xs text-sky-400 font-bold tracking-widest mb-1">POSIÇÃO</div><div className="text-4xl font-black text-sky-300">{dist} m</div></div>
                    <div className="bg-slate-900 rounded-2xl p-4 border border-emerald-500/30"><div className="text-xs text-emerald-400 font-bold tracking-widest mb-1">TEMPO</div><div className="text-4xl font-black text-emerald-300">{time} s</div></div>
                </div>
                <div className="flex gap-3 justify-center">
                    <button onClick={() => setMoving(true)} disabled={moving || pos >= 100} className="px-6 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-40 text-white font-bold transition-all">▶ Iniciar</button>
                    <button onClick={reset} className="px-5 py-2 rounded-xl border border-slate-700 text-slate-400 hover:border-slate-500 transition-all font-semibold">↺ Reiniciar</button>
                </div>
            </div>
        </div>
    );
}

function S4() {
    const [ans, setAns] = useState<number | null>(null);
    const correct = 0;
    const opts = ["Um astronauta dentro da ISS, em relação à própria ISS.", "Um trem a 300 km/h em relação à estação.", "Uma pedra caindo em relação ao chão.", "Um pássaro voando em relação à árvore abaixo dele."];
    return (
        <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
            <span className="text-xs font-black tracking-widest text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">QUIZ</span>
            <h2 className="text-2xl font-black text-slate-100 mt-4 mb-6">Qual objeto está em repouso em relação ao referencial mencionado?</h2>
            <div className="space-y-3 mb-4">
                {opts.map((o, i) => {
                    const cls = ans === null ? "border-slate-700 hover:border-slate-500 bg-slate-900" : i === correct ? "border-emerald-500 bg-emerald-950/30 text-emerald-100 scale-[1.01]" : ans === i ? "border-rose-500 bg-rose-950/30 opacity-70" : "border-slate-800 opacity-25";
                    return <button key={i} disabled={ans !== null} onClick={() => setAns(i)} className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex gap-3 ${cls}`}><span className="font-black">{["A", "B", "C", "D"][i]})</span><span>{o}</span></button>;
                })}
            </div>
            {ans !== null && <div className={`p-4 rounded-2xl animate-in slide-in-from-bottom-4 ${ans === correct ? "bg-emerald-900/30 border border-emerald-500/40 text-emerald-200" : "bg-rose-900/30 border border-rose-500/40 text-rose-200"}`}><strong>A ✅</strong> — O astronauta não muda de posição em relação à ISS → está em repouso relativo a ela. Em relação à Terra, ambos se movem a 28.000 km/h!</div>}
        </div>
    );
}

function S5() {
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-6">📝 Resumo — Aula 06</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
                {[
                    { icon: "📍", t: "Referencial", b: "Ponto fixo de referência. Sem ele, não há como afirmar se algo está em movimento." },
                    { icon: "📏", t: "Posição", b: "Localização do objeto em relação ao referencial (em metros)." },
                    { icon: "🛤️", t: "Trajetória", b: "O caminho percorrido. Pode ser retilínea, curvilínea, circular." },
                    { icon: "⏱️", t: "Tempo", b: "Duração dos eventos. Referencial temporal é fundamental para medir variações." },
                ].map((c, i) => (
                    <div key={i} className="bg-slate-900 border border-slate-700 rounded-2xl p-5 hover:border-sky-500/30 transition-all">
                        <span className="text-3xl">{c.icon}</span>
                        <h3 className="font-bold text-slate-100 my-1">{c.t}</h3>
                        <p className="text-slate-400 text-sm">{c.b}</p>
                    </div>
                ))}
            </div>
            <p className="text-center text-slate-500">Próxima aula: Distância percorrida vs. Deslocamento 📍</p>
        </div>
    );
}

const SLIDES_A6 = [S1, S2, S3, S4, S5];
export function Fisica1Lesson6() {
    const [cur, setCur] = useState(0);
    const next = useCallback(() => setCur(p => Math.min(p + 1, SLIDES_A6.length - 1)), []);
    const prev = useCallback(() => setCur(p => Math.max(p - 1, 0)), []);
    useEffect(() => {
        const h = (e: KeyboardEvent) => { if (e.key === "ArrowRight") next(); if (e.key === "ArrowLeft") prev(); };
        window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
    }, [next, prev]);
    const C = SLIDES_A6[cur];
    return <Shell title="Aula 06 — Cinemática: Espaço e Tempo" aula="Aula 06" total={SLIDES_A6.length} current={cur} onPrev={prev} onNext={next}><C /></Shell>;
}
