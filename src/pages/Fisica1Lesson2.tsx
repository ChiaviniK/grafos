import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Home, Atom, Zap } from "lucide-react";

function Shell({ title, aula, total, current, onPrev, onNext, children }: {
    title: string; aula: string; total: number; current: number;
    onPrev: () => void; onNext: () => void; children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-50 flex flex-col">
            <nav className="flex items-center justify-between px-6 py-3 border-b border-slate-800 bg-slate-950/80 backdrop-blur shrink-0">
                <Link to="/fisica1" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium">
                    <Home className="w-4 h-4" /> Física 1
                </Link>
                <div className="flex items-center gap-2">
                    {Array.from({ length: total }).map((_, i) => (
                        <div key={i} className={`h-1.5 rounded-full transition-all ${i === current ? "w-6 bg-rose-400" : i < current ? "w-3 bg-slate-600" : "w-3 bg-slate-800"}`} />
                    ))}
                </div>
                <span className="text-slate-500 text-xs font-mono">{aula} · {current + 1}/{total}</span>
            </nav>
            <div className="flex-1 overflow-y-auto px-4 sm:px-8 md:px-16 py-8">{children}</div>
            <div className="flex justify-between items-center px-6 py-4 border-t border-slate-800 bg-slate-950/80 backdrop-blur shrink-0">
                <button onClick={onPrev} disabled={current === 0} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-700 text-slate-400 hover:border-slate-500 disabled:opacity-30 transition-all font-semibold text-sm"><ChevronLeft className="w-4 h-4" /> Anterior</button>
                <span className="text-slate-600 text-xs">{title}</span>
                <button onClick={onNext} disabled={current === total - 1} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-30 text-white font-bold transition-all text-sm">Próximo <ChevronRight className="w-4 h-4" /></button>
            </div>
        </div>
    );
}

function S1() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center animate-in fade-in zoom-in duration-700 relative">
            <div className="absolute inset-0 opacity-10 rounded-3xl" style={{ backgroundImage: "url('/sprites/backgrounds/2/2304x1296.png')", backgroundSize: "cover", imageRendering: "pixelated" }} />
            <div className="relative z-10">
                <img src="/sprites/2 Owlet_Monster/Owlet_Monster_Idle_4.png" alt="" className="w-16 h-16 mx-auto mb-6 object-contain" style={{ imageRendering: "pixelated" }} />
                <span className="bg-rose-500/20 text-rose-400 font-bold px-3 py-1 rounded-full text-xs tracking-widest border border-rose-500/30">FÍSICA 1 · AULA 02</span>
                <h1 className="text-5xl md:text-7xl font-black text-white my-4 leading-none">Matéria &<br /><span className="text-emerald-400">Energia</span></h1>
                <p className="text-xl text-slate-400 max-w-xl mx-auto">O que é matéria? O que é energia? Como eles se relacionam? Fundamentos das Ciências da Natureza.</p>
            </div>
        </div>
    );
}

function S2() {
    const [selected, setSelected] = useState<string[]>([]);
    const items = [
        { label: "Água 💧", isMateria: true }, { label: "Calor 🔥", isMateria: false },
        { label: "Pedra 🪨", isMateria: true }, { label: "Luz 💡", isMateria: false },
        { label: "Ar 🌬️", isMateria: true }, { label: "Som 🎵", isMateria: false },
        { label: "Ferro ⛓️", isMateria: true }, { label: "Gravidade ⬇️", isMateria: false },
    ];
    const toggle = (l: string) => setSelected(p => p.includes(l) ? p.filter(x => x !== l) : [...p, l]);
    const allCorrect = selected.length === items.filter(i => i.isMateria).length && items.every(it => it.isMateria === selected.includes(it.label));
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <div className="flex items-center gap-3 mb-3"><Atom className="w-8 h-8 text-emerald-400" /><h2 className="text-4xl font-black text-slate-100">O que é Matéria?</h2></div>
            <p className="text-slate-400 text-xl mb-3">Matéria é tudo que tem <strong className="text-white">massa</strong> e ocupa <strong className="text-white">espaço</strong>. Selecione abaixo apenas exemplos de matéria:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {items.map(it => {
                    const sel = selected.includes(it.label);
                    return (
                        <button key={it.label} onClick={() => toggle(it.label)} className={`p-4 rounded-2xl border-2 font-bold text-sm transition-all ${sel ? "border-emerald-500 bg-emerald-950/40 text-emerald-200 scale-105" : "border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-500"}`}>{it.label}</button>
                    );
                })}
            </div>
            {allCorrect && <div className="bg-emerald-900/30 border border-emerald-500/40 rounded-2xl p-4 text-emerald-200 font-semibold animate-in slide-in-from-bottom-4 duration-400">✅ Correto! Água, pedra, ar e ferro têm massa e ocupam espaço. Calor, luz, som e gravidade são formas de energia ou interações — não são matéria.</div>}
        </div>
    );
}

function S3() {
    const [open, setOpen] = useState<number | null>(null);
    const types = [
        { name: "Energia Cinética", icon: "🏃", def: "Energia do movimento. Ec = ½mv²", ex: "Carro em movimento, vento, rio." },
        { name: "Energia Potencial", icon: "⛰️", def: "Energia por posição ou estado. Ep = mgh", ex: "Pedra no alto de um morro, arco esticado." },
        { name: "Energia Térmica", icon: "🌡️", def: "Agitação das partículas. Q = mcΔT", ex: "Água quente, metal aquecido." },
        { name: "Energia Elétrica", icon: "⚡", def: "Movimento de cargas. E = P·t", ex: "Computadores, lâmpadas, motores." },
    ];
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <div className="flex items-center gap-3 mb-3"><Zap className="w-8 h-8 text-amber-400" /><h2 className="text-4xl font-black text-slate-100">Formas de Energia</h2></div>
            <p className="text-slate-400 text-xl mb-8">Energia é a <strong className="text-white">capacidade de realizar trabalho</strong>. Clique em cada tipo:</p>
            <div className="grid md:grid-cols-2 gap-4">
                {types.map((t, i) => (
                    <div key={i} onClick={() => setOpen(open === i ? null : i)} className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${open === i ? "border-amber-500 bg-amber-950/30 scale-[1.01]" : "border-slate-700 bg-slate-900/60 hover:border-slate-500"}`}>
                        <div className="flex items-center gap-3"><span className="text-3xl">{t.icon}</span><h3 className="font-bold text-slate-100 text-xl">{t.name}</h3></div>
                        {open === i && (
                            <div className="mt-3 animate-in fade-in duration-300">
                                <p className="text-slate-300 mb-1">{t.def}</p>
                                <p className="text-slate-500 text-sm">Exemplos: {t.ex}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

function S4() {
    const [step, setStep] = useState(0);
    const steps = [
        { label: "Topo", desc: "Toda a energia é Potencial (Ep máx, Ec = 0). O pêndulo está parado.", epPct: 100, ecPct: 0 },
        { label: "Meio", desc: "A energia se divide. Ep = Ec. Velocidade crescendo.", epPct: 50, ecPct: 50 },
        { label: "Base", desc: "Toda a energia é Cinética (Ec máx, Ep = 0). Velocidade máxima!", epPct: 0, ecPct: 100 },
    ];
    const s = steps[step];
    return (
        <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-3">⚖️ Conservação de Energia</h2>
            <p className="text-slate-400 text-xl mb-6">Energia não some — ela <strong className="text-white">se transforma</strong>. Use o pêndulo abaixo:</p>
            <div className="bg-slate-950 border border-slate-700 rounded-3xl p-6 mb-4">
                <div className="flex gap-4 mb-4 justify-center">
                    <div className="flex-1 text-center"><div className="text-xs text-blue-400 font-bold mb-1">POTENCIAL (Ep)</div><div className="h-3 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-blue-500 rounded-full transition-all duration-700" style={{ width: `${s.epPct}%` }} /></div><span className="text-blue-300 text-sm">{s.epPct}%</span></div>
                    <div className="flex-1 text-center"><div className="text-xs text-emerald-400 font-bold mb-1">CINÉTICA (Ec)</div><div className="h-3 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 rounded-full transition-all duration-700" style={{ width: `${s.ecPct}%` }} /></div><span className="text-emerald-300 text-sm">{s.ecPct}%</span></div>
                </div>
                <p className="text-slate-300 text-center text-lg mb-4">{s.desc}</p>
                <div className="flex gap-3 justify-center">
                    {steps.map((st, i) => (
                        <button key={i} onClick={() => setStep(i)} className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all ${step === i ? "border-blue-500 text-blue-300 bg-blue-950/40" : "border-slate-700 text-slate-400 hover:border-slate-500"}`}>{st.label}</button>
                    ))}
                </div>
            </div>
        </div>
    );
}

function S5() {
    const [ans, setAns] = useState<number | null>(null);
    const correct = 1;
    const opts = ["Sim, pois parte da energia 'some' como calor.", "Não. Luz + calor = energia elétrica consumida. A soma é conservada.", "Sim, porque luz e calor são formas diferentes.", "Não, mas apenas se for lâmpada LED."];
    return (
        <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
            <span className="text-xs font-black tracking-widest text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">QUIZ</span>
            <h2 className="text-2xl font-black text-slate-100 mt-4 mb-6">Uma lâmpada elétrica converte energia em luz e calor. Isso viola a Conservação de Energia?</h2>
            <div className="space-y-3 mb-6">
                {opts.map((o, i) => {
                    const cls = ans === null ? "border-slate-700 hover:border-slate-500 bg-slate-900" : i === correct ? "border-emerald-500 bg-emerald-950/30 text-emerald-100 scale-[1.01]" : ans === i ? "border-rose-500 bg-rose-950/30 opacity-70" : "border-slate-800 opacity-25";
                    return <button key={i} disabled={ans !== null} onClick={() => setAns(i)} className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex gap-3 ${cls}`}><span className="font-black">{["A", "B", "C", "D"][i]})</span><span>{o}</span></button>;
                })}
            </div>
            {ans !== null && <div className={`p-4 rounded-2xl animate-in slide-in-from-bottom-4 ${ans === correct ? "bg-emerald-900/30 border border-emerald-500/40 text-emerald-200" : "bg-rose-900/30 border border-rose-500/40 text-rose-200"}`}><strong>Gabarito: B ✅</strong> — Energia não some. A lâmpada transforma energia elétrica em luz (~10%) + calor (~90%). A soma é sempre igual à entrada.</div>}
        </div>
    );
}

function S6() {
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-6">📝 Resumo da Aula 02</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
                {[
                    { icon: "⚛️", t: "Matéria", b: "Tem massa e ocupa espaço. Pode ser sólida, líquida ou gasosa." },
                    { icon: "⚡", t: "Energia", b: "Capacidade de realizar trabalho. Transforma-se, nunca desaparece." },
                    { icon: "⚖️", t: "Conservação", b: "Energia total de sistema isolado é constante. 1ª Lei da Termodinâmica." },
                    { icon: "🔗", t: "E = mc²", b: "Einstein: matéria e energia são aspectos da mesma realidade." },
                ].map((c, i) => (
                    <div key={i} className="bg-slate-900 border border-slate-700 rounded-2xl p-5 hover:border-rose-500/30 transition-all">
                        <span className="text-3xl">{c.icon}</span>
                        <h3 className="font-bold text-slate-100 text-lg my-1">{c.t}</h3>
                        <p className="text-slate-400 text-sm">{c.b}</p>
                    </div>
                ))}
            </div>
            <p className="text-center text-slate-500 mt-4">Próxima aula: Grandezas Físicas Escalares e Vetoriais 🎯</p>
        </div>
    );
}

const SLIDES = [S1, S2, S3, S4, S5, S6];
export function Fisica1Lesson2() {
    const [cur, setCur] = useState(0);
    const next = useCallback(() => setCur(p => Math.min(p + 1, SLIDES.length - 1)), []);
    const prev = useCallback(() => setCur(p => Math.max(p - 1, 0)), []);
    useEffect(() => {
        const h = (e: KeyboardEvent) => { if (e.key === "ArrowRight") next(); if (e.key === "ArrowLeft") prev(); };
        window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
    }, [next, prev]);
    const C = SLIDES[cur];
    return <Shell title="Aula 02 — Matéria e Energia" aula="Aula 02" total={SLIDES.length} current={cur} onPrev={prev} onNext={next}><C /></Shell>;
}
