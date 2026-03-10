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

// ── AULA 09: Condução e Convecção ─────────────────────────────────────────────
function A9S1() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center animate-in fade-in zoom-in duration-700 relative">
            <div className="absolute inset-0 opacity-10 rounded-3xl" style={{ backgroundImage: "url('/sprites/backgrounds/9/2304x1296.png')", backgroundSize: "cover", imageRendering: "pixelated" }} />
            <div className="relative z-10">
                <img src="/sprites/1 Pink_Monster/Pink_Monster_Run_6.png" alt="" className="w-20 h-16 mx-auto mb-6 object-contain" style={{ imageRendering: "pixelated" }} />
                <span className="bg-orange-500/20 text-orange-400 font-bold px-3 py-1 rounded-full text-xs tracking-widest border border-orange-500/30">FÍSICA 2 · AULA 09</span>
                <h1 className="text-4xl md:text-6xl font-black text-white my-4 leading-none">Propagação de Calor:<br /><span className="text-amber-400">Condução & Convecção</span></h1>
                <p className="text-xl text-slate-400 max-w-xl mx-auto">Como o calor viaja pela matéria: por contato (condução) ou por movimento de fluidos (convecção).</p>
            </div>
        </div>
    );
}

function A9S2() {
    const [mode, setMode] = useState<"cond" | "conv">("cond");
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-4">🔥 Condução vs. Convecção</h2>
            <div className="flex gap-3 mb-6">
                <button onClick={() => setMode("cond")} className={`px-5 py-2 rounded-xl text-sm font-bold border-2 transition-all ${mode === "cond" ? "border-red-500 bg-red-950/40 text-red-300" : "border-slate-700 text-slate-400 hover:border-slate-500"}`}>🔩 Condução</button>
                <button onClick={() => setMode("conv")} className={`px-5 py-2 rounded-xl text-sm font-bold border-2 transition-all ${mode === "conv" ? "border-blue-500 bg-blue-950/40 text-blue-300" : "border-slate-700 text-slate-400 hover:border-slate-500"}`}>🌊 Convecção</button>
            </div>
            {mode === "cond" ? (
                <div className="grid md:grid-cols-2 gap-6 animate-in fade-in">
                    <div className="bg-red-950/20 border border-red-500/30 rounded-2xl p-5">
                        <h3 className="font-black text-xl text-red-300 mb-3">🔩 Condução Térmica</h3>
                        <p className="text-slate-300 mb-3">Propagação por contato direto entre partículas vizinhas. Mais energética → vizinha → vizinha... sem deslocamento de matéria.</p>
                        <ul className="text-slate-400 text-sm space-y-1.5 list-disc list-inside">
                            <li>Ocorre principalmente em sólidos</li>
                            <li>Metais são ótimos condutores</li>
                            <li>Madeira e plástico são isolantes</li>
                            <li>Fórmula: Q/t = k·A·ΔT/L</li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        {[
                            { ex: "Colher metálica esquentando no café quente", icon: "🥄" },
                            { ex: "Ferro de passar roupas", icon: "👕" },
                            { ex: "Dissipador de calor do processador", icon: "💻" },
                            { ex: "Mão sentindo frio ao tocar metal", icon: "🖐️" },
                        ].map((e, i) => <div key={i} className="bg-slate-900 border border-slate-700 rounded-xl p-3 flex items-center gap-3"><span className="text-2xl">{e.icon}</span><span className="text-slate-300 text-sm">{e.ex}</span></div>)}
                    </div>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-6 animate-in fade-in">
                    <div className="bg-blue-950/20 border border-blue-500/30 rounded-2xl p-5">
                        <h3 className="font-black text-xl text-blue-300 mb-3">🌊 Convecção Térmica</h3>
                        <p className="text-slate-300 mb-3">Propagação pelo deslocamento de fluido (líquido ou gás). O fluido quente sobe (menos denso), o frio desce — correntes convectivas.</p>
                        <ul className="text-slate-400 text-sm space-y-1.5 list-disc list-inside">
                            <li>Ocorre em líquidos e gases</li>
                            <li>Natural (gravidade) ou forçada (ventilador)</li>
                            <li>Base da circulação oceânica</li>
                            <li>Circulação atmosférica</li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        {[
                            { ex: "Água fervendo: correntes sobem e descem", icon: "🫕" },
                            { ex: "Aquecedor de ambiente — ar quente sobe", icon: "🌬️" },
                            { ex: "Ventos e brisas marítimas", icon: "🌊" },
                            { ex: "Resfriamento a água de data centers", icon: "🖥️" },
                        ].map((e, i) => <div key={i} className="bg-slate-900 border border-slate-700 rounded-xl p-3 flex items-center gap-3"><span className="text-2xl">{e.icon}</span><span className="text-slate-300 text-sm">{e.ex}</span></div>)}
                    </div>
                </div>
            )}
        </div>
    );
}

function A9S3() {
    const [ans, setAns] = useState<number | null>(null);
    const correct = 2;
    const opts = ["Condução — as partículas da sopa colidem com os pés.", "Irradiação — o calor é emitido como luz.", "Convecção — o ar quente sobe do chão aquecido e circula pelo ambiente.", "Condução — o calor passa diretamente pelo ar parado."];
    return (
        <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
            <span className="text-xs font-black tracking-widest text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">QUIZ</span>
            <h2 className="text-2xl font-black text-slate-100 mt-4 mb-4">O aquecimento de um quarto por um aquecedor de piso quente que esquenta o ar do ambiente é um exemplo de:</h2>
            <div className="space-y-3 mb-4">
                {opts.map((o, i) => {
                    const cls = ans === null ? "border-slate-700 hover:border-slate-500 bg-slate-900" : i === correct ? "border-emerald-500 bg-emerald-950/30 text-emerald-100 scale-[1.01]" : ans === i ? "border-rose-500 bg-rose-950/30 opacity-70" : "border-slate-800 opacity-25";
                    return <button key={i} disabled={ans !== null} onClick={() => setAns(i)} className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex gap-3 ${cls}`}><span className="font-black">{["A", "B", "C", "D"][i]})</span><span>{o}</span></button>;
                })}
            </div>
            {ans !== null && <div className={`p-4 rounded-2xl animate-in slide-in-from-bottom-4 ${ans === correct ? "bg-emerald-900/30 border border-emerald-500/40 text-emerald-200" : "bg-rose-900/30 border border-rose-500/40 text-rose-200"}`}><strong>C ✅</strong> — O ar quente (menos denso) sobe, o frio desce, criando correntes de convecção naturais no cômodo.</div>}
        </div>
    );
}

function A9S4() {
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-6">📝 Resumo — Aula 09</h2>
            <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border border-slate-700 rounded-2xl overflow-hidden">
                    <thead><tr className="bg-slate-800"><th className="p-3 text-left text-slate-300">Mecanismo</th><th className="p-3 text-left text-slate-300">Meio</th><th className="p-3 text-left text-slate-300">Matéria se move?</th><th className="p-3 text-left text-slate-300">Exemplo</th></tr></thead>
                    <tbody>
                        {[
                            ["Condução", "Sólidos (e fluidos parados)", "Não", "Colher metálica no café"],
                            ["Convecção", "Líquidos e gases", "Sim (correntes)", "Água fervendo, brisa marítima"],
                        ].map((r, i) => (
                            <tr key={i} className={i % 2 === 0 ? "bg-slate-900/60" : "bg-slate-900/30"}>
                                {r.map((c, j) => <td key={j} className="p-3 text-slate-400 border-t border-slate-800">{c}</td>)}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="text-center text-slate-500">Próxima aula: Irradiação Térmica — O calor que viaja pelo vácuo 🌞</p>
        </div>
    );
}

const SLIDES_A9 = [A9S1, A9S2, A9S3, A9S4];
export function Fisica2Lesson9() {
    const [cur, setCur] = useState(0);
    const next = useCallback(() => setCur(p => Math.min(p + 1, SLIDES_A9.length - 1)), []);
    const prev = useCallback(() => setCur(p => Math.max(p - 1, 0)), []);
    useEffect(() => {
        const h = (e: KeyboardEvent) => { if (e.key === "ArrowRight") next(); if (e.key === "ArrowLeft") prev(); };
        window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
    }, [next, prev]);
    const C = SLIDES_A9[cur];
    return <Shell title="Aula 09 — Condução e Convecção" aula="Aula 09" total={SLIDES_A9.length} current={cur} onPrev={prev} onNext={next}><C /></Shell>;
}

// ── AULA 10: Irradiação Térmica ───────────────────────────────────────────────
function A10S1() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center animate-in fade-in zoom-in duration-700 relative">
            <div className="absolute inset-0 opacity-10 rounded-3xl" style={{ backgroundImage: "url('/sprites/backgrounds/10/2304x1296.png')", backgroundSize: "cover", imageRendering: "pixelated" }} />
            <div className="relative z-10">
                <div className="text-7xl mb-4">☀️</div>
                <span className="bg-orange-500/20 text-orange-400 font-bold px-3 py-1 rounded-full text-xs tracking-widest border border-orange-500/30">FÍSICA 2 · AULA 10</span>
                <h1 className="text-4xl md:text-6xl font-black text-white my-4 leading-none">Irradiação<br /><span className="text-yellow-400">Térmica</span></h1>
                <p className="text-xl text-slate-400 max-w-xl mx-auto">O calor que viaja pelo vácuo como ondas eletromagnéticas. 150 milhões de km do Sol até a Terra — sem nenhuma matéria no caminho.</p>
            </div>
        </div>
    );
}

function A10S2() {
    const [open, setOpen] = useState<number | null>(null);
    const topics = [
        { t: "O que é irradiação?", body: "Transferência de calor por ondas eletromagnéticas (especialmente infravermelhos). Não precisa de meio material — funciona no vácuo.", icon: "📡" },
        { t: "Corpo Negro", body: "Corpo ideal que absorve 100% da radiação incidente. Em equilíbrio, emitiria a maior potência possível para sua temperatura. Estrelas são aproximações de corpos negros.", icon: "⚫" },
        { t: "Lei de Stefan-Boltzmann", body: "P = σ·e·A·T⁴. A potência irradiada cresce com a quarta potência da temperatura. Quanto mais quente, muito mais radiation.", icon: "📐" },
        { t: "Absortividade e Emissividade", body: "Superfícies escuras absorvem e emitem mais (e ≈ 1). Superfícies brilhantes refletem mais (e ≈ 0). Por isso roupas brancas no sol quente!", icon: "🌑🌕" },
    ];
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-4">☀️ Conceitos da Irradiação</h2>
            <div className="space-y-3">
                {topics.map((t, i) => (
                    <div key={i} onClick={() => setOpen(open === i ? null : i)} className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${open === i ? "border-yellow-500 bg-yellow-950/30 scale-[1.01]" : "border-slate-700 bg-slate-900/60 hover:border-slate-500"}`}>
                        <div className="flex items-center gap-3"><span className="text-2xl">{t.icon}</span><h3 className="font-bold text-slate-100 text-xl">{t.t}</h3></div>
                        {open === i && <p className="text-slate-300 mt-3 animate-in fade-in leading-relaxed">{t.body}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
}

function A10S3() {
    const [ans, setAns] = useState<number | null>(null);
    const correct = 3;
    const opts = ["Condução — as partículas do sol chegam até nós.", "Convecção — correntes de ar quente do sol nos aquecem.", "Condução e convecção juntas.", "Irradiação — ondas eletromagnéticas percorrem o vácuo."];
    return (
        <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
            <span className="text-xs font-black tracking-widest text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">QUIZ</span>
            <h2 className="text-2xl font-black text-slate-100 mt-4 mb-6">Por qual mecanismo o calor do Sol chega à Terra?</h2>
            <div className="space-y-3 mb-4">
                {opts.map((o, i) => {
                    const cls = ans === null ? "border-slate-700 hover:border-slate-500 bg-slate-900" : i === correct ? "border-emerald-500 bg-emerald-950/30 text-emerald-100 scale-[1.01]" : ans === i ? "border-rose-500 bg-rose-950/30 opacity-70" : "border-slate-800 opacity-25";
                    return <button key={i} disabled={ans !== null} onClick={() => setAns(i)} className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex gap-3 ${cls}`}><span className="font-black">{["A", "B", "C", "D"][i]})</span><span>{o}</span></button>;
                })}
            </div>
            {ans !== null && <div className={`p-4 rounded-2xl animate-in slide-in-from-bottom-4 ${ans === correct ? "bg-emerald-900/30 border border-emerald-500/40 text-emerald-200" : "bg-rose-900/30 border border-rose-500/40 text-rose-200"}`}><strong>D ✅</strong> — O espaço entre o Sol e a Terra é vácuo. Condução e convecção precisam de matéria. Apenas a irradiação (ondas EM) atravessa o vácuo.</div>}
        </div>
    );
}

function A10S4() {
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-4">🎓 Fechamento do 1º Bimestre de Física 2!</h2>
            <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border border-slate-700 rounded-2xl overflow-hidden">
                    <thead><tr className="bg-slate-800"><th className="p-3 text-left text-slate-300">Mecanismo</th><th className="p-3 text-left text-slate-300">Meio</th><th className="p-3 text-left text-slate-300">Matéria se move?</th><th className="p-3 text-left text-slate-300">Vácuo?</th></tr></thead>
                    <tbody>
                        {[
                            ["Condução", "Sólidos principalmente", "Não", "Não"],
                            ["Convecção", "Líquidos e gases", "Sim", "Não"],
                            ["Irradiação", "Qualquer / Vácuo", "Não", "Sim ✅"],
                        ].map((r, i) => (
                            <tr key={i} className={i % 2 === 0 ? "bg-slate-900/60" : "bg-slate-900/30"}>
                                {r.map((c, j) => <td key={j} className="p-3 text-slate-400 border-t border-slate-800">{c}</td>)}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="bg-gradient-to-r from-orange-900/30 to-amber-900/30 border border-amber-500/30 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-2">🏆</div>
                <h3 className="text-2xl font-black text-slate-100 mb-2">1º Bimestre de Física 2 Concluído!</h3>
                <p className="text-slate-400">Termometria, Escalas, Calor Sensível/Latente, Equilíbrio Térmico, Calorímetro e Propagação.</p>
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {["✓ Termometria", "✓ Escalas", "✓ Calor Sensível", "✓ Calor Latente", "✓ Equilíbrio", "✓ Calorímetro", "✓ Condução", "✓ Convecção", "✓ Irradiação"].map(t => (
                        <span key={t} className="bg-amber-900/40 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/20">{t}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}

const SLIDES_A10 = [A10S1, A10S2, A10S3, A10S4];
export function Fisica2Lesson10() {
    const [cur, setCur] = useState(0);
    const next = useCallback(() => setCur(p => Math.min(p + 1, SLIDES_A10.length - 1)), []);
    const prev = useCallback(() => setCur(p => Math.max(p - 1, 0)), []);
    useEffect(() => {
        const h = (e: KeyboardEvent) => { if (e.key === "ArrowRight") next(); if (e.key === "ArrowLeft") prev(); };
        window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
    }, [next, prev]);
    const C = SLIDES_A10[cur];
    return <Shell title="Aula 10 — Irradiação Térmica" aula="Aula 10" total={SLIDES_A10.length} current={cur} onPrev={prev} onNext={next}><C /></Shell>;
}
