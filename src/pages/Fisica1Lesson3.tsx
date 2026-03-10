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

// ── AULA 03 ──────────────────────────────────────────────────────────────────
function A3S1() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center animate-in fade-in zoom-in duration-700 relative">
            <div className="absolute inset-0 opacity-10 rounded-3xl" style={{ backgroundImage: "url('/sprites/backgrounds/3/2304x1296.png')", backgroundSize: "cover", imageRendering: "pixelated" }} />
            <div className="relative z-10">
                <img src="/sprites/3 Dude_Monster/Dude_Monster_Idle_4.png" alt="" className="w-16 h-16 mx-auto mb-6 object-contain" style={{ imageRendering: "pixelated" }} />
                <span className="bg-rose-500/20 text-rose-400 font-bold px-3 py-1 rounded-full text-xs tracking-widest border border-rose-500/30">FÍSICA 1 · AULA 03</span>
                <h1 className="text-5xl md:text-6xl font-black text-white my-4 leading-none">Grandezas<br /><span className="text-violet-400">Escalares & Vetoriais</span></h1>
                <p className="text-xl text-slate-400 max-w-xl mx-auto">Nem toda grandeza física funciona igual. Algumas têm só valor — outras têm valor, direção e sentido.</p>
            </div>
        </div>
    );
}

function A3S2() {
    const [selected, setSelected] = useState<Record<string, "scalar" | "vector" | null>>({});
    const items: { label: string; type: "scalar" | "vector"; hint: string }[] = [
        { label: "Temperatura 🌡️", type: "scalar", hint: "Basta saber '37°C'. Não faz sentido perguntar 'em que direção?'" },
        { label: "Velocidade 🚗", type: "vector", hint: "Precisa de valor E direção: '100 km/h para o norte.'" },
        { label: "Massa ⚖️", type: "scalar", hint: "70 kg é 70 kg em qualquer direção." },
        { label: "Força 💪", type: "vector", hint: "Empurrar para cima tem efeito diferente de empurrar para o lado." },
        { label: "Tempo ⏱️", type: "scalar", hint: "10 segundos é 10 segundos — sem direção." },
        { label: "Deslocamento 📍", type: "vector", hint: "Andar 5 m para o leste ≠ andar 5 m para o norte." },
    ];
    const [feedback, setFeedback] = useState<Record<string, boolean>>({});
    const guess = (label: string, type: "scalar" | "vector") => {
        const correct = items.find(i => i.label === label)!.type === type;
        setSelected(p => ({ ...p, [label]: type }));
        setFeedback(p => ({ ...p, [label]: correct }));
    };
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-2">Escalar ou Vetorial?</h2>
            <p className="text-slate-400 text-xl mb-6">Para cada grandeza, clique se ela é <strong className="text-blue-400">Escalar</strong> (só valor) ou <strong className="text-violet-400">Vetorial</strong> (valor + direção + sentido):</p>
            <div className="space-y-3">
                {items.map(it => {
                    const sel = selected[it.label];
                    const ok = feedback[it.label];
                    return (
                        <div key={it.label} className={`p-4 rounded-2xl border-2 transition-all ${sel ? (ok ? "border-emerald-500 bg-emerald-950/30" : "border-rose-500 bg-rose-950/20") : "border-slate-700 bg-slate-900/60"}`}>
                            <div className="flex items-center justify-between flex-wrap gap-3">
                                <span className="font-bold text-lg text-slate-200">{it.label}</span>
                                <div className="flex gap-2">
                                    <button onClick={() => guess(it.label, "scalar")} disabled={!!sel} className={`px-4 py-1.5 rounded-xl text-sm font-bold border-2 transition-all ${sel === "scalar" ? (ok ? "border-emerald-500 bg-emerald-800 text-emerald-100" : "border-rose-500 bg-rose-800 text-rose-100") : "border-blue-500/50 text-blue-400 hover:bg-blue-500/10"}`}>Escalar</button>
                                    <button onClick={() => guess(it.label, "vector")} disabled={!!sel} className={`px-4 py-1.5 rounded-xl text-sm font-bold border-2 transition-all ${sel === "vector" ? (ok ? "border-emerald-500 bg-emerald-800 text-emerald-100" : "border-rose-500 bg-rose-800 text-rose-100") : "border-violet-500/50 text-violet-400 hover:bg-violet-500/10"}`}>Vetorial</button>
                                </div>
                            </div>
                            {sel && <p className="text-slate-400 text-sm mt-2 animate-in fade-in">{it.hint}</p>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function A3S3() {
    const [show, setShow] = useState(false);
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-4">📐 Representando Vetores</h2>
            <p className="text-slate-400 text-xl mb-6">Um vetor é desenhado como uma <strong className="text-white">seta</strong>. A seta tem três propriedades:</p>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
                {[
                    { prop: "Módulo (intensidade)", desc: "O comprimento da seta. Quanto maior, mais intenso o vetor.", color: "blue", ex: "Uma força de 100 N tem seta maior que uma de 10 N." },
                    { prop: "Direção", desc: "O ângulo da seta em relação a um eixo de referência.", color: "violet", ex: "Horizontal, vertical, 45°..." },
                    { prop: "Sentido", desc: "Para onde a ponta da seta aponta.", color: "rose", ex: "Para cima, para baixo, para a esquerda..." },
                ].map((c, i) => (
                    <div key={i} className="bg-slate-900 border border-slate-700 rounded-2xl p-5 hover:border-slate-500 transition-all">
                        <div className={`text-xs font-black tracking-widest mb-2 ${c.color === "blue" ? "text-blue-400" : c.color === "violet" ? "text-violet-400" : "text-rose-400"}`}>{["MÓDULO", "DIREÇÃO", "SENTIDO"][i]}</div>
                        <h3 className="font-bold text-slate-100 mb-1">{c.prop}</h3>
                        <p className="text-slate-400 text-sm">{c.desc}</p>
                        <p className="text-slate-600 text-xs mt-2 italic">{c.ex}</p>
                    </div>
                ))}
            </div>
            <button onClick={() => setShow(s => !s)} className="text-violet-400 font-bold hover:text-violet-300 transition-colors">
                {show ? "▼ Ocultar" : "▶ Por que isso importa para tecnologia?"}
            </button>
            {show && <div className="mt-3 bg-violet-950/30 border border-violet-500/30 rounded-xl p-4 text-slate-300 animate-in fade-in">Em jogos digitais, física de motores e robótica, todo movimento é calculado com vetores. Um personagem de videogame se move somando vetores de velocidade, gravidade e inputs do jogador.</div>}
        </div>
    );
}

function A3S4() {
    const [ans, setAns] = useState<number | null>(null);
    const correct = 2;
    const opts = ["Apenas seu valor numérico e uma unidade.", "Apenas sua direção — o valor não importa.", "Valor (módulo), direção e sentido.", "Somente a direção e o sentido, sem valor."];
    return (
        <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
            <span className="text-xs font-black tracking-widest text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">QUIZ</span>
            <h2 className="text-2xl font-black text-slate-100 mt-4 mb-6">Para representar completamente um vetor, são necessários:</h2>
            <div className="space-y-3 mb-4">
                {opts.map((o, i) => {
                    const cls = ans === null ? "border-slate-700 hover:border-slate-500 bg-slate-900" : i === correct ? "border-emerald-500 bg-emerald-950/30 text-emerald-100 scale-[1.01]" : ans === i ? "border-rose-500 bg-rose-950/30 opacity-70" : "border-slate-800 opacity-25";
                    return <button key={i} disabled={ans !== null} onClick={() => setAns(i)} className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex gap-3 ${cls}`}><span className="font-black">{["A", "B", "C", "D"][i]})</span><span>{o}</span></button>;
                })}
            </div>
            {ans !== null && <div className={`p-4 rounded-2xl animate-in slide-in-from-bottom-4 ${ans === correct ? "bg-emerald-900/30 border border-emerald-500/40 text-emerald-200" : "bg-rose-900/30 border border-rose-500/40 text-rose-200"}`}><strong>C ✅</strong> — Um vetor exige módulo (quanto), direção (eixo) e sentido (para onde).</div>}
        </div>
    );
}

function A3S5() {
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-6">📝 Resumo da Aula 03</h2>
            <div className="grid md:grid-cols-2 gap-4">
                {[
                    { t: "Grandeza Escalar", b: "Descrita apenas pelo valor e unidade. Ex: temperatura, massa, tempo, energia.", icon: "🔢" },
                    { t: "Grandeza Vetorial", b: "Precisa de módulo, direção e sentido. Ex: força, velocidade, deslocamento, aceleração.", icon: "➡️" },
                    { t: "Representação", b: "Vetores são desenhados como setas. Comprimento = módulo. Ângulo = direção. Ponta = sentido.", icon: "📐" },
                    { t: "Na Tecnologia", b: "Gráficos, motores de jogo, robótica e visão computacional usam vetores o tempo todo.", icon: "💻" },
                ].map((c, i) => (
                    <div key={i} className="bg-slate-900 border border-slate-700 rounded-2xl p-5 hover:border-violet-500/30 transition-all">
                        <span className="text-3xl">{c.icon}</span>
                        <h3 className="font-bold text-slate-100 my-1">{c.t}</h3>
                        <p className="text-slate-400 text-sm">{c.b}</p>
                    </div>
                ))}
            </div>
            <p className="text-center text-slate-500 mt-8">Próxima aula: Leitura de Gráficos e Tabelas 📊</p>
        </div>
    );
}

const SLIDES_A3 = [A3S1, A3S2, A3S3, A3S4, A3S5];
export function Fisica1Lesson3() {
    const [cur, setCur] = useState(0);
    const next = useCallback(() => setCur(p => Math.min(p + 1, SLIDES_A3.length - 1)), []);
    const prev = useCallback(() => setCur(p => Math.max(p - 1, 0)), []);
    useEffect(() => {
        const h = (e: KeyboardEvent) => { if (e.key === "ArrowRight") next(); if (e.key === "ArrowLeft") prev(); };
        window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
    }, [next, prev]);
    const C = SLIDES_A3[cur];
    return <Shell title="Aula 03 — Grandezas Escalares e Vetoriais" aula="Aula 03" total={SLIDES_A3.length} current={cur} onPrev={prev} onNext={next}><C /></Shell>;
}
