import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Home, Shield, BookOpen, CheckCircle2, Circle } from "lucide-react";

// ─── Shared lesson shell ───────────────────────────────────────────────────
function Shell({ title, aula, total, current, onPrev, onNext, children }: {
    title: string; aula: string; total: number; current: number;
    onPrev: () => void; onNext: () => void; children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-50 flex flex-col">
            {/* Top bar */}
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
            {/* Content */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-8 md:px-16 py-8">
                {children}
            </div>
            {/* Prev / Next */}
            <div className="flex justify-between items-center px-6 py-4 border-t border-slate-800 bg-slate-950/80 backdrop-blur shrink-0">
                <button onClick={onPrev} disabled={current === 0} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-700 text-slate-400 hover:border-slate-500 disabled:opacity-30 transition-all font-semibold text-sm">
                    <ChevronLeft className="w-4 h-4" /> Anterior
                </button>
                <span className="text-slate-600 text-xs">{title}</span>
                <button onClick={onNext} disabled={current === total - 1} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-30 text-white font-bold transition-all text-sm">
                    Próximo <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}

// ─── SLIDES ────────────────────────────────────────────────────────────────
function S1() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center animate-in fade-in zoom-in duration-700 relative">
            <div className="absolute inset-0 opacity-10 rounded-3xl" style={{ backgroundImage: "url('/sprites/backgrounds/1/2304x1296.png')", backgroundSize: "cover", imageRendering: "pixelated" }} />
            <div className="relative z-10">
                <img src="/sprites/1 Pink_Monster/Pink_Monster_Idle_4.png" alt="mascote" className="w-16 h-16 mx-auto mb-6 object-contain" style={{ imageRendering: "pixelated" }} />
                <div className="flex items-center gap-2 justify-center mb-4">
                    <span className="bg-rose-500/20 text-rose-400 font-bold px-3 py-1 rounded-full text-xs tracking-widest border border-rose-500/30">FÍSICA 1 · ETEC INFO</span>
                    <span className="text-slate-500 text-xs">Aula 01 · 100 min</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-white mb-4 leading-none">Bem-vindo à<br /><span className="text-rose-400">Física!</span></h1>
                <p className="text-xl text-slate-400 max-w-xl mx-auto mb-8">Apresentação da disciplina, critérios de avaliação e regras de segurança no laboratório.</p>
                <div className="flex gap-4 justify-center flex-wrap text-sm">
                    <div className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-xl text-slate-300">📋 Plano de curso</div>
                    <div className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-xl text-slate-300">🔬 Segurança no lab</div>
                    <div className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-xl text-slate-300">📊 Avaliação</div>
                </div>
                <p className="text-slate-600 text-xs mt-10 font-mono">PROF. LUIZ CHIAVINI · 2026</p>
            </div>
        </div>
    );
}

function S2() {
    const [checked, setChecked] = useState<Record<number, boolean>>({});
    const rules = [
        { rule: "Use óculos de proteção sempre que houver risco de projeção.", icon: "🥽" },
        { rule: "Jamais prove, cheire ou toque substâncias desconhecidas.", icon: "🚫" },
        { rule: "Cabelos longos devem ser presos. Nada de bolsas sobre as bancadas.", icon: "💈" },
        { rule: "Relate acidentes ao professor imediatamente, mesmo que pequenos.", icon: "🚨" },
        { rule: "Leia o procedimento completo antes de começar qualquer experimento.", icon: "📖" },
        { rule: "Ao sair, lave as mãos. Descarte resíduos corretamente.", icon: "🧼" },
    ];
    const all = rules.every((_, i) => checked[i]);
    return (
        <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
            <div className="flex items-center gap-3 mb-3"><Shield className="w-8 h-8 text-amber-400" /><h2 className="text-4xl font-black text-slate-100">Segurança no Laboratório</h2></div>
            <p className="text-slate-400 text-xl mb-8">Antes de qualquer experimento, estas regras são obrigatórias. Clique em cada uma para confirmar que entendeu 👇</p>
            <div className="space-y-3 mb-8">
                {rules.map((r, i) => {
                    const done = !!checked[i];
                    return (
                        <button key={i} onClick={() => setChecked(p => ({ ...p, [i]: !p[i] }))} className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${done ? "border-amber-500 bg-amber-950/30 scale-[1.01]" : "border-slate-700 bg-slate-900/60 hover:border-slate-500"}`}>
                            <span className="text-2xl">{r.icon}</span>
                            <span className={`flex-1 font-medium ${done ? "text-slate-100" : "text-slate-400"}`}>{r.rule}</span>
                            {done ? <CheckCircle2 className="w-6 h-6 text-amber-400 shrink-0" /> : <Circle className="w-6 h-6 text-slate-600 shrink-0" />}
                        </button>
                    );
                })}
            </div>
            {all && <div className="p-4 bg-emerald-900/30 border border-emerald-500/40 rounded-2xl text-center text-emerald-300 font-bold text-xl animate-in slide-in-from-bottom-4 duration-500">✅ Ótimo! Agora você está autorizado a entrar no laboratório.</div>}
        </div>
    );
}

function S3() {
    const [show, setShow] = useState(false);
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <div className="flex items-center gap-3 mb-3"><BookOpen className="w-8 h-8 text-blue-400" /><h2 className="text-4xl font-black text-slate-100">Como Funciona a Disciplina?</h2></div>
            <p className="text-slate-400 text-xl mb-8">Conheça a estrutura da disciplina, como você será avaliado e o que esperar de cada aula.</p>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
                {[
                    { title: "📅 Carga Horária", body: "24 aulas por semestre, 100 min cada. Total: 40h/semestre.", color: "blue" },
                    { title: "📝 Avaliações", body: "2 provas bimestrais (AP1 e AP2) + Atividades Práticas (APS). Não há prova surpresa.", color: "emerald" },
                    { title: "🔬 Metodologia", body: "Teoria + prática laboratorial. Você aprenderá fazendo: experimentos, simulações e desafios.", color: "purple" },
                    { title: "💻 Recursos", body: "Planilhas digitais, simuladores PhET, Python para gráficos. Traga o notebook sempre que possível.", color: "amber" },
                ].map((c, i) => (
                    <div key={i} className="bg-slate-900 border border-slate-700 rounded-2xl p-6 hover:border-slate-500 transition-all">
                        <h3 className="font-bold text-lg text-slate-100 mb-2">{c.title}</h3>
                        <p className="text-slate-400">{c.body}</p>
                    </div>
                ))}
            </div>
            <button onClick={() => setShow(s => !s)} className="text-blue-400 font-bold flex items-center gap-2 hover:text-blue-300 transition-colors">
                {show ? "▼ Ocultar" : "▶ Ver cálculo da média final"}
            </button>
            {show && (
                <div className="mt-3 bg-blue-950/30 border border-blue-500/30 rounded-2xl p-5 animate-in slide-in-from-top-2 duration-300">
                    <p className="text-slate-300 text-lg font-mono">Média = (AP1 × 0,4) + (AP2 × 0,4) + (APS × 0,2)</p>
                    <p className="text-slate-500 mt-2">Para aprovação direta: média ≥ 5,0. Abaixo disso, você vai para a Recuperação Contínua.</p>
                </div>
            )}
        </div>
    );
}

function S4() {
    const [step, setStep] = useState(-1);
    const steps = [
        { q: "O que é Física?", a: "Física é a ciência que estuda a natureza e seus fenômenos: movimento, energia, calor, luz, eletricidade. Ela descreve o universo com matemática e experimentos." },
        { q: "Por que estudar Física numa escola de TI?", a: "Todo sistema computacional existe no mundo físico. Semicondutores, redes sem fio, telas, processadores — tudo é governado pelas leis da Física." },
        { q: "Como funciona o método científico?", a: "Observação → Hipótese → Experimento → Análise → Conclusão. A Física não aceita 'porque sim' — toda lei precisa de evidências repetíveis." },
    ];
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-3 flex items-center gap-3">🤔 Perguntas Iniciais</h2>
            <p className="text-slate-400 text-xl mb-8">Antes de começar, vamos alinhar o que cada um já sabe. Clique na pergunta para revelar a resposta.</p>
            <div className="space-y-4">
                {steps.map((s, i) => (
                    <div key={i} onClick={() => setStep(step === i ? -1 : i)} className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${step === i ? "border-rose-500 bg-rose-950/30 scale-[1.01]" : "border-slate-700 bg-slate-900/60 hover:border-slate-500"}`}>
                        <h3 className="text-xl font-bold text-slate-100 mb-0">{i + 1}. {s.q}</h3>
                        {step === i && <p className="text-slate-300 mt-3 text-lg leading-relaxed animate-in fade-in duration-300">{s.a}</p>}
                    </div>
                ))}
            </div>
            <div className="mt-8 flex justify-center">
                <img src="/sprites/3 Dude_Monster/Dude_Monster_Idle_4.png" alt="mascote" className="h-24 object-contain" style={{ imageRendering: "pixelated" }} />
            </div>
        </div>
    );
}

function S5() {
    const [ans, setAns] = useState<number | null>(null);
    const opts = [
        { label: "A", text: "Estudar a vida e os seres vivos.", correct: false },
        { label: "B", text: "Descrever os fenômenos da natureza com linguagem matemática.", correct: true },
        { label: "C", text: "Programar computadores usando lógica formal.", correct: false },
        { label: "D", text: "Analisar documentos históricos de civilizações antigas.", correct: false },
    ];
    return (
        <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
            <span className="text-xs font-black tracking-widest text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">VERIFICAÇÃO DE APRENDIZAGEM</span>
            <h2 className="text-3xl font-black text-slate-100 mt-4 mb-2">Qual melhor define a Física enquanto ciência?</h2>
            <p className="text-slate-400 mb-8">Selecione a alternativa correta antes de avançar.</p>
            <div className="space-y-3">
                {opts.map((o, i) => {
                    const selected = ans === i;
                    const cls = ans === null ? "border-slate-700 hover:border-slate-500 bg-slate-900" :
                        o.correct ? "border-emerald-500 bg-emerald-950/30 text-emerald-100 scale-[1.01]" :
                            selected ? "border-rose-500 bg-rose-950/30 opacity-70" : "border-slate-800 opacity-25";
                    return (
                        <button key={i} disabled={ans !== null} onClick={() => setAns(i)} className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex gap-3 items-start ${cls}`}>
                            <span className="font-black text-lg">{o.label})</span><span className="font-medium text-base">{o.text}</span>
                        </button>
                    );
                })}
            </div>
            {ans !== null && (
                <div className={`mt-5 p-4 rounded-2xl animate-in slide-in-from-bottom-4 duration-400 font-semibold ${opts[ans].correct ? "bg-emerald-900/30 border border-emerald-500/40 text-emerald-200" : "bg-rose-900/30 border border-rose-500/40 text-rose-200"}`}>
                    {opts[ans].correct ? "✅ Correto! A Física usa matemática para descrever e prever fenômenos da natureza." : "❌ Resposta B é a correta. A Física descreve fenômenos naturais com linguagem matemática."}
                </div>
            )}
        </div>
    );
}

function S6() {
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-3">🗓️ O Que Vem Por Aí?</h2>
            <p className="text-slate-400 text-xl mb-8">Visão geral do 1º Bimestre — as 12 aulas que vamos explorar juntos.</p>
            <div className="grid md:grid-cols-2 gap-3">
                {[
                    { n: 1, t: "Apresentação e Segurança", done: true },
                    { n: 2, t: "Matéria e Energia" },
                    { n: 3, t: "Grandezas Escalares e Vetoriais" },
                    { n: 4, t: "Gráficos e Tabelas" },
                    { n: 5, t: "Unidades SI" },
                    { n: 6, t: "Espaço e Tempo / Cinemática" },
                    { n: 7, t: "Distância vs. Deslocamento" },
                    { n: 8, t: "Velocidade Média e Instantânea" },
                    { n: 9, t: "Aceleração e MUV" },
                    { n: 10, t: "Gráficos de Movimento" },
                    { n: 11, t: "Movimento Circular" },
                    { n: 12, t: "Queda Livre" },
                ].map(a => (
                    <div key={a.n} className={`flex items-center gap-3 p-3 rounded-xl border ${a.done ? "border-rose-500/50 bg-rose-950/20" : "border-slate-800 bg-slate-900/40"}`}>
                        <span className={`w-8 h-8 rounded-full font-black text-sm flex items-center justify-center shrink-0 ${a.done ? "bg-rose-500 text-white" : "bg-slate-800 text-slate-500"}`}>{a.n}</span>
                        <span className={a.done ? "text-rose-200 font-semibold" : "text-slate-400"}>{a.t}</span>
                        {a.done && <span className="ml-auto text-xs text-rose-400 font-bold">✓ HOJE</span>}
                    </div>
                ))}
            </div>
        </div>
    );
}

const SLIDES = [S1, S2, S3, S4, S5, S6];

export function Fisica1Lesson1() {
    const [cur, setCur] = useState(0);
    const next = useCallback(() => setCur(p => Math.min(p + 1, SLIDES.length - 1)), []);
    const prev = useCallback(() => setCur(p => Math.max(p - 1, 0)), []);
    useEffect(() => {
        const h = (e: KeyboardEvent) => { if (e.key === "ArrowRight") next(); if (e.key === "ArrowLeft") prev(); };
        window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
    }, [next, prev]);
    const C = SLIDES[cur];
    return <Shell title="Aula 01 — Apresentação e Segurança no Lab" aula="Aula 01" total={SLIDES.length} current={cur} onPrev={prev} onNext={next}><C /></Shell>;
}
