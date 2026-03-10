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
            <div className="absolute inset-0 opacity-10 rounded-3xl" style={{ backgroundImage: "url('/sprites/backgrounds/4/2304x1296.png')", backgroundSize: "cover", imageRendering: "pixelated" }} />
            <div className="relative z-10">
                <div className="text-7xl mb-4">🔥</div>
                <span className="bg-orange-500/20 text-orange-400 font-bold px-3 py-1 rounded-full text-xs tracking-widest border border-orange-500/30">FÍSICA 2 · AULA 04</span>
                <h1 className="text-4xl md:text-6xl font-black text-white my-4 leading-none">Calor como<br /><span className="text-red-400">Energia em Trânsito</span></h1>
                <p className="text-xl text-slate-400 max-w-xl mx-auto">Calor não é um "fluido misterioso" — é energia se transferindo de corpos mais quentes para mais frios.</p>
            </div>
        </div>
    );
}

function S2() {
    const [step, setStep] = useState(0);
    const steps = [
        { label: "Início: T_quente > T_frio", hotT: 80, coldT: 20, desc: "Há diferença de temperatura → existe transferência de calor (Q > 0). O calor flui do corpo quente para o frio.", arrow: true },
        { label: "Transferência em andamento", hotT: 60, coldT: 40, desc: "A energia flui continuamente. O corpo quente esfria, o frio aquece.", arrow: true },
        { label: "Equilíbrio Térmico: T₁ = T₂", hotT: 50, coldT: 50, desc: "Quando as temperaturas se igualam, a transferência para. Q = 0. Isso é o Equilíbrio Térmico.", arrow: false },
    ];
    const s = steps[step];
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-4">↔️ Fluxo de Calor</h2>
            <p className="text-slate-400 mb-6">O calor sempre flui espontaneamente do corpo de <strong className="text-red-400">maior temperatura</strong> para o de <strong className="text-blue-400">menor temperatura</strong>.</p>
            <div className="bg-slate-950 border border-slate-700 rounded-3xl p-6 mb-4">
                <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="text-center">
                        <div className="w-24 h-24 rounded-2xl border-4 border-red-500/50 bg-red-950/40 flex items-center justify-center text-3xl font-black text-red-300 transition-all duration-700">{s.hotT}°C</div>
                        <p className="text-red-400 text-xs font-bold mt-1">QUENTE</p>
                    </div>
                    <div className="flex flex-col items-center gap-1 w-24">
                        {s.arrow ? (
                            <>
                                <div className="text-2xl text-orange-400 animate-bounce">→</div>
                                <div className="text-xs text-orange-400 font-bold text-center">Q flui</div>
                            </>
                        ) : (
                            <div className="text-xs text-emerald-400 font-bold text-center">⇌ Equilíbrio</div>
                        )}
                    </div>
                    <div className="text-center">
                        <div className="w-24 h-24 rounded-2xl border-4 border-blue-500/50 bg-blue-950/40 flex items-center justify-center text-3xl font-black text-blue-300 transition-all duration-700">{s.coldT}°C</div>
                        <p className="text-blue-400 text-xs font-bold mt-1">FRIO</p>
                    </div>
                </div>
                <p className="text-slate-300 text-center mb-4 text-lg">{s.desc}</p>
                <div className="flex gap-3 justify-center">
                    {steps.map((st, i) => <button key={i} onClick={() => setStep(i)} className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all ${step === i ? "border-orange-500 bg-orange-950/30 text-orange-300" : "border-slate-700 text-slate-400 hover:border-slate-500"}`}>{st.label}</button>)}
                </div>
            </div>
        </div>
    );
}

function S3() {
    const [reveal, setReveal] = useState(false);
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-4">🧠 Calor é Diferente de Temperatura!</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-red-950/20 border border-red-500/30 rounded-2xl p-6">
                    <div className="text-xs font-black text-red-400 tracking-widest mb-2">TEMPERATURA</div>
                    <p className="text-slate-300 font-semibold">Estado do corpo. Medida da agitação média das partículas.</p>
                    <ul className="text-slate-400 text-sm mt-3 space-y-1 list-disc list-inside">
                        <li>É uma grandeza de estado</li>
                        <li>Unidade: °C, K, °F</li>
                        <li>Medida com termômetro</li>
                    </ul>
                </div>
                <div className="bg-orange-950/20 border border-orange-500/30 rounded-2xl p-6">
                    <div className="text-xs font-black text-orange-400 tracking-widest mb-2">CALOR (Q)</div>
                    <p className="text-slate-300 font-semibold">Energia em trânsito. Só existe durante a troca entre corpos.</p>
                    <ul className="text-slate-400 text-sm mt-3 space-y-1 list-disc list-inside">
                        <li>É uma grandeza de processo</li>
                        <li>Unidade: J, cal, kcal</li>
                        <li>Q &gt; 0 → absorve calor</li>
                        <li>Q &lt; 0 → cede calor</li>
                    </ul>
                </div>
            </div>
            <button onClick={() => setReveal(r => !r)} className="text-orange-400 font-bold hover:text-orange-300">{reveal ? "▼" : "▶"} Analogia com dinheiro e saldo bancário</button>
            {reveal && <div className="mt-3 bg-slate-900 border border-slate-700 rounded-xl p-4 text-slate-300 animate-in fade-in">Temperatura = saldo na conta. Calor = dinheiro sendo transferido. O saldo (temperatura) existe sempre. A transferência (calor) só ocorre quando há fluxo de dinheiro (diferença de temperatura).</div>}
        </div>
    );
}

function S4() {
    const [ans, setAns] = useState<number | null>(null);
    const correct = 0;
    const opts = ["De A para B — calor flui do mais quente para o mais frio.", "De B para A — calor flui do mais frio para o mais quente.", "Não há fluxo de calor pois as massas são iguais.", "O calor flui em ambas as direções ao mesmo tempo."];
    return (
        <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
            <span className="text-xs font-black tracking-widest text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">QUIZ</span>
            <h2 className="text-2xl font-black text-slate-100 mt-4 mb-4">Corpo A a 80°C é colocado em contato com Corpo B a 20°C. Em que sentido flui o calor?</h2>
            <div className="space-y-3 mb-4">
                {opts.map((o, i) => {
                    const cls = ans === null ? "border-slate-700 hover:border-slate-500 bg-slate-900" : i === correct ? "border-emerald-500 bg-emerald-950/30 text-emerald-100 scale-[1.01]" : ans === i ? "border-rose-500 bg-rose-950/30 opacity-70" : "border-slate-800 opacity-25";
                    return <button key={i} disabled={ans !== null} onClick={() => setAns(i)} className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex gap-3 ${cls}`}><span className="font-black">{["A", "B", "C", "D"][i]})</span><span>{o}</span></button>;
                })}
            </div>
            {ans !== null && <div className={`p-4 rounded-2xl animate-in slide-in-from-bottom-4 ${ans === correct ? "bg-emerald-900/30 border border-emerald-500/40 text-emerald-200" : "bg-rose-900/30 border border-rose-500/40 text-rose-200"}`}><strong>A ✅</strong> — 2ª Lei da Termodinâmica (forma simplificada): calor flui espontaneamente do mais quente para o mais frio, nunca o contrário.</div>}
        </div>
    );
}

function S5() {
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-6">📝 Resumo — Aula 04</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
                {[
                    { icon: "🔥", t: "Calor (Q)", b: "Energia em transferência. Existe apenas durante a troca entre corpos de temperaturas diferentes." },
                    { icon: "→", t: "Sentido", b: "Sempre do corpo mais quente ao mais frio espontaneamente." },
                    { icon: "⚖️", t: "Equilíbrio Térmico", b: "Quando T₁ = T₂, a transferência cessa. Q = 0." },
                    { icon: "📏", t: "Unidades", b: "Joule (J) no SI. Também: cal (1 cal = 4,186 J). Kcal = kilocaloria (dieta)." },
                ].map((c, i) => (
                    <div key={i} className="bg-slate-900 border border-slate-700 rounded-2xl p-5 hover:border-orange-500/30 transition-all">
                        <span className="text-3xl font-black">{c.icon}</span>
                        <h3 className="font-bold text-slate-100 my-1">{c.t}</h3>
                        <p className="text-slate-400 text-sm">{c.b}</p>
                    </div>
                ))}
            </div>
            <p className="text-center text-slate-500">Próxima aula: Calorimetria — Calor Sensível 🧪</p>
        </div>
    );
}

const SLIDES = [S1, S2, S3, S4, S5];
export function Fisica2Lesson4() {
    const [cur, setCur] = useState(0);
    const next = useCallback(() => setCur(p => Math.min(p + 1, SLIDES.length - 1)), []);
    const prev = useCallback(() => setCur(p => Math.max(p - 1, 0)), []);
    useEffect(() => {
        const h = (e: KeyboardEvent) => { if (e.key === "ArrowRight") next(); if (e.key === "ArrowLeft") prev(); };
        window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
    }, [next, prev]);
    const C = SLIDES[cur];
    return <Shell title="Aula 04 — Calor como Energia em Trânsito" aula="Aula 04" total={SLIDES.length} current={cur} onPrev={prev} onNext={next}><C /></Shell>;
}
