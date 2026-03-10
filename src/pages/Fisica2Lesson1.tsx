import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Home, CheckCircle2, Circle, BookOpen } from "lucide-react";

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

// SLIDE 1 — Capa
function S1() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center animate-in fade-in zoom-in duration-700 relative">
            <div className="absolute inset-0 opacity-10 rounded-3xl" style={{ backgroundImage: "url('/sprites/backgrounds/1/2304x1296.png')", backgroundSize: "cover", imageRendering: "pixelated" }} />
            <div className="relative z-10">
                <img src="/sprites/2 Owlet_Monster/Owlet_Monster_Idle_4.png" alt="" className="w-16 h-16 mx-auto mb-6 object-contain" style={{ imageRendering: "pixelated" }} />
                <span className="bg-orange-500/20 text-orange-400 font-bold px-3 py-1 rounded-full text-xs tracking-widest border border-orange-500/30">FÍSICA 2 · ETEC AGRO/INFO</span>
                <h1 className="text-5xl md:text-7xl font-black text-white my-4 leading-none">Bem-vindo à<br /><span className="text-orange-400">Física 2!</span></h1>
                <p className="text-xl text-slate-400 max-w-xl mx-auto">Termodinâmica e Sustentabilidade — você vai entender o calor, a energia e como o mundo se transforma.</p>
                <div className="flex gap-4 justify-center flex-wrap text-sm mt-8">
                    <div className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-xl text-slate-300">🌡️ Termologia</div>
                    <div className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-xl text-slate-300">🔥 Calorimetria</div>
                    <div className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-xl text-slate-300">⚙️ Termodinâmica</div>
                    <div className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-xl text-slate-300">♻️ Energias Renováveis</div>
                </div>
            </div>
        </div>
    );
}

// SLIDE 2 — Competências
function S2() {
    const [checked, setChecked] = useState<Record<number, boolean>>({});
    const items = [
        { icon: "🌡️", t: "Termometria", d: "Escalas de temperatura e conversões" },
        { icon: "🔥", t: "Calorimetria", d: "Calor sensível, latente e equilíbrio térmico" },
        { icon: "📡", t: "Propagação de Calor", d: "Condução, convecção e irradiação" },
        { icon: "🔩", t: "Dilatação Térmica", d: "Sólidos, líquidos e a anomalia da água" },
        { icon: "💨", t: "Gases Ideais", d: "Leis de transformação e Clapeyron" },
        { icon: "⚙️", t: "Termodinâmica", d: "1ª e 2ª lei, máquinas térmicas" },
        { icon: "🌿", t: "Sustentabilidade", d: "Fontes renováveis e matriz energética" },
    ];
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <div className="flex items-center gap-3 mb-4"><BookOpen className="w-8 h-8 text-orange-400" /><h2 className="text-4xl font-black text-slate-100">O que veremos neste semestre?</h2></div>
            <p className="text-slate-400 text-xl mb-6">Clique no tema conforme ele for sendo visto em aula:</p>
            <div className="space-y-3">
                {items.map((it, i) => {
                    const done = !!checked[i];
                    return (
                        <button key={i} onClick={() => setChecked(p => ({ ...p, [i]: !p[i] }))} className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${done ? "border-orange-500 bg-orange-950/30 scale-[1.01]" : "border-slate-700 bg-slate-900/60 hover:border-slate-500"}`}>
                            <span className="text-2xl">{it.icon}</span>
                            <div className="flex-1"><p className={`font-bold ${done ? "text-orange-200" : "text-slate-300"}`}>{it.t}</p><p className="text-slate-500 text-sm">{it.d}</p></div>
                            {done ? <CheckCircle2 className="w-6 h-6 text-orange-400 shrink-0" /> : <Circle className="w-6 h-6 text-slate-600 shrink-0" />}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

// SLIDE 3 — Avaliação e metodologia
function S3() {
    const [show, setShow] = useState(false);
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-3">📋 Como Funciona a Avaliação?</h2>
            <div className="grid md:grid-cols-2 gap-5 mb-6">
                {[
                    { icon: "📝", t: "Avaliações Bimestrais", d: "2 provas por semestre (AP1 e AP2). Cada uma vale até 10 pontos." },
                    { icon: "🔬", t: "Práticas de Laboratório", d: "Experimentos realizados em sala/lab com relatório de atividade." },
                    { icon: "🌱", t: "APS (Atividade Prática)", d: "Projeto de extensão envolvendo sustentabilidade e o campo." },
                    { icon: "📊", t: "Média", d: "Média = (AP1×0.4) + (AP2×0.4) + (APS×0.2). Mínimo: 5,0." },
                ].map((c, i) => (
                    <div key={i} className="bg-slate-900 border border-slate-700 rounded-2xl p-5 hover:border-orange-500/30 transition-all">
                        <span className="text-3xl">{c.icon}</span>
                        <h3 className="font-bold text-slate-100 my-1">{c.t}</h3>
                        <p className="text-slate-400 text-sm">{c.d}</p>
                    </div>
                ))}
            </div>
            <button onClick={() => setShow(s => !s)} className="text-orange-400 font-bold hover:text-orange-300">{show ? "▼" : "▶"} Sobre a APS de Física 2</button>
            {show && <div className="mt-3 bg-orange-950/30 border border-orange-500/30 rounded-xl p-4 text-slate-300 animate-in fade-in">A APS terá como foco <strong>soluções de energia sustentável para o campo</strong>. Você irá pesquisar, projetar e apresentar uma proposta de uso de energia solar ou biomassa numa propriedade rural/tecnológica.</div>}
        </div>
    );
}

// SLIDE 4 — Perguntas iniciais
function S4() {
    const [step, setStep] = useState(-1);
    const qs = [
        { q: "Temperatura e calor são a mesma coisa?", a: "Não! Temperatura mede o grau de agitação das partículas (estado). Calor é energia em transferência de um corpo para outro." },
        { q: "Por que sentimos frio ao tocar metal e calor ao tocar madeira na mesma sala?", a: "Temperatura dos dois é a mesma. Mas metal conduz calor muito melhor — drain calor da sua mão mais rápido, sensação de 'frio'." },
        { q: "Qual a relação entre termodinâmica e tecnologia?", a: "Motores de combustão, turbinas, refrigeradores, computadores e data centers são todos sistemas termodinâmicos." },
    ];
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-3">🤔 Provocações Iniciais</h2>
            <p className="text-slate-400 text-xl mb-6">Clique para revelar:</p>
            <div className="space-y-4">
                {qs.map((q, i) => (
                    <div key={i} onClick={() => setStep(step === i ? -1 : i)} className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${step === i ? "border-orange-500 bg-orange-950/30 scale-[1.01]" : "border-slate-700 bg-slate-900/60 hover:border-slate-500"}`}>
                        <h3 className="text-lg font-bold text-slate-100">{i + 1}. {q.q}</h3>
                        {step === i && <p className="text-slate-300 mt-3 animate-in fade-in leading-relaxed">{q.a}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
}

// SLIDE 5 — Quiz
function S5() {
    const [ans, setAns] = useState<number | null>(null);
    const correct = 1;
    const opts = ["São a mesma coisa.", "Temperatura é estado; calor é energia em transferência.", "Calor é sempre maior que a temperatura.", "Temperatura só existe em sólidos."];
    return (
        <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
            <span className="text-xs font-black tracking-widest text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">QUIZ</span>
            <h2 className="text-2xl font-black text-slate-100 mt-4 mb-6">Qual a diferença fundamental entre calor e temperatura?</h2>
            <div className="space-y-3 mb-4">
                {opts.map((o, i) => {
                    const cls = ans === null ? "border-slate-700 hover:border-slate-500 bg-slate-900" : i === correct ? "border-emerald-500 bg-emerald-950/30 text-emerald-100 scale-[1.01]" : ans === i ? "border-rose-500 bg-rose-950/30 opacity-70" : "border-slate-800 opacity-25";
                    return <button key={i} disabled={ans !== null} onClick={() => setAns(i)} className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex gap-3 ${cls}`}><span className="font-black">{["A", "B", "C", "D"][i]})</span><span>{o}</span></button>;
                })}
            </div>
            {ans !== null && <div className={`p-4 rounded-2xl animate-in slide-in-from-bottom-4 ${ans === correct ? "bg-emerald-900/30 border border-emerald-500/40 text-emerald-200" : "bg-rose-900/30 border border-rose-500/40 text-rose-200"}`}><strong>B ✅</strong> — Temperatura é uma propriedade do estado do sistema. Calor é a energia que flui entre corpos em contato devido à diferença de temperatura.</div>}
        </div>
    );
}

function S6() {
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-4">🗓️ Roadmap do 1º Bimestre</h2>
            <div className="grid md:grid-cols-2 gap-2 mb-6">
                {[
                    { n: 1, t: "Apresentação", done: true },
                    { n: 2, t: "Termometria" },
                    { n: 3, t: "Escalas Termométricas" },
                    { n: 4, t: "Calor como Energia" },
                    { n: 5, t: "Calor Sensível" },
                    { n: 6, t: "Calor Latente" },
                    { n: 7, t: "Equilíbrio Térmico" },
                    { n: 8, t: "Calorímetro (Prática)" },
                    { n: 9, t: "Condução e Convecção" },
                    { n: 10, t: "Irradiação Térmica" },
                ].map(a => (
                    <div key={a.n} className={`flex items-center gap-3 p-3 rounded-xl border ${a.done ? "border-orange-500/50 bg-orange-950/20" : "border-slate-800 bg-slate-900/40"}`}>
                        <span className={`w-8 h-8 rounded-full font-black text-sm flex items-center justify-center shrink-0 ${a.done ? "bg-orange-500 text-white" : "bg-slate-800 text-slate-500"}`}>{a.n}</span>
                        <span className={a.done ? "text-orange-200 font-semibold" : "text-slate-400"}>{a.t}</span>
                        {a.done && <span className="ml-auto text-xs text-orange-400 font-bold">✓ HOJE</span>}
                    </div>
                ))}
            </div>
            <p className="text-center text-slate-500">Próxima aula: Termometria — O que é temperatura? 🌡️</p>
        </div>
    );
}

const SLIDES = [S1, S2, S3, S4, S5, S6];
export function Fisica2Lesson1() {
    const [cur, setCur] = useState(0);
    const next = useCallback(() => setCur(p => Math.min(p + 1, SLIDES.length - 1)), []);
    const prev = useCallback(() => setCur(p => Math.max(p - 1, 0)), []);
    useEffect(() => {
        const h = (e: KeyboardEvent) => { if (e.key === "ArrowRight") next(); if (e.key === "ArrowLeft") prev(); };
        window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
    }, [next, prev]);
    const C = SLIDES[cur];
    return <Shell title="Aula 01 — Apresentação da Disciplina" aula="Aula 01" total={SLIDES.length} current={cur} onPrev={prev} onNext={next}><C /></Shell>;
}
