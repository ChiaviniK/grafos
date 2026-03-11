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
                <Link to="/fisica3" className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium"><Home className="w-4 h-4" /> Física 3</Link>
                <div className="flex items-center gap-2">{Array.from({ length: total }).map((_, i) => <div key={i} className={`h-1.5 rounded-full transition-all ${i === current ? "w-6 bg-amber-400" : i < current ? "w-3 bg-slate-600" : "w-3 bg-slate-800"}`} />)}</div>
                <span className="text-slate-500 text-xs font-mono">{aula} · {current + 1}/{total}</span>
            </nav>
            <div className="flex-1 overflow-y-auto px-4 sm:px-8 md:px-16 py-8">{children}</div>
            <div className="flex justify-between items-center px-6 py-4 border-t border-slate-800 bg-slate-950/80 backdrop-blur shrink-0">
                <button onClick={onPrev} disabled={current === 0} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-700 text-slate-400 hover:border-slate-500 disabled:opacity-30 transition-all font-semibold text-sm"><ChevronLeft className="w-4 h-4" /> Anterior</button>
                <span className="text-slate-600 text-xs truncate max-w-xs">{title}</span>
                <button onClick={onNext} disabled={current === total - 1} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-30 text-white font-bold transition-all text-sm">Próximo <ChevronRight className="w-4 h-4" /></button>
            </div>
        </div>
    );
}

// ── SEM 3: Campo Elétrico Geométrico ────────────────────────────────────────
function A3S1() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center animate-in fade-in zoom-in duration-700 relative">
            <div className="absolute inset-0 opacity-10 rounded-3xl" style={{ backgroundImage: "url('/sprites/backgrounds/3/2304x1296.png')", backgroundSize: "cover", imageRendering: "pixelated" }} />
            <div className="relative z-10">
                <div className="text-7xl mb-4">🌀</div>
                <span className="bg-amber-500/20 text-amber-400 font-bold px-3 py-1 rounded-full text-xs tracking-widest border border-amber-500/30">FÍSICA 3 · SEMANA 3</span>
                <h1 className="text-4xl md:text-6xl font-black text-white my-4 leading-none">Campo Elétrico<br /><span className="text-yellow-400">Geométrico</span></h1>
                <p className="text-xl text-slate-400 max-w-xl mx-auto">Como visualizar campos elétricos através das linhas de campo e entender superposição de cargas.</p>
            </div>
        </div>
    );
}

function A3S2() {
    const [type, setType] = useState<"pos" | "neg" | "par">("pos");
    const W = 240, H = 240, cx = 120, cy = 120;
    const arrows = (angle: number, rx: number, ry: number) => {
        const x = cx + rx * Math.cos(angle);
        const y = cy + ry * Math.sin(angle);
        const dx = 16 * Math.cos(angle), dy = 16 * Math.sin(angle);
        const sign = type === "neg" ? -1 : 1;
        return { x1: x - sign * dx / 2, y1: y - sign * dy / 2, x2: x + sign * dx / 2, y2: y + sign * dy / 2 };
    };
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-4">📐 Linhas de Campo Elétrico</h2>
            <div className="flex gap-3 mb-6">
                {(["pos", "neg", "par"] as const).map(t => (
                    <button key={t} onClick={() => setType(t)} className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all ${type === t ? "border-amber-500 bg-amber-950/40 text-amber-300" : "border-slate-700 text-slate-400 hover:border-slate-500"}`}>{t === "pos" ? "⊕ Carga +" : t === "neg" ? "⊖ Carga -" : "⊕⊖ Par"}</button>
                ))}
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="bg-slate-950 border border-slate-700 rounded-2xl p-4">
                    <svg width={W} height={H}>
                        {type !== "par" && [0, 1, 2, 3, 4, 5, 6, 7].map(k => {
                            const angle = k * Math.PI / 4;
                            return [40, 70, 100].map(r => {
                                const { x1, y1, x2, y2 } = arrows(angle, r, r);
                                return <line key={`${k}-${r}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#f59e0b" strokeWidth="1.5" markerEnd={"url(#arr)"} />;
                            });
                        })}
                        {type === "par" && (
                            <>
                                {[60, 80, 100, 120, 140, 160].map(y => <line key={y} x1={40} x2={200} y1={y} y2={y} stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arr)" />)}
                                <rect x={28} y={50} width={8} height={140} fill="#60a5fa" rx={2} />
                                <text x={32} y={165} fill="#60a5fa" fontSize="10" textAnchor="middle">+</text>
                                <rect x={204} y={50} width={8} height={140} fill="#f87171" rx={2} />
                                <text x={208} y={165} fill="#f87171" fontSize="10" textAnchor="middle">-</text>
                            </>
                        )}
                        {type !== "par" && (
                            <circle cx={cx} cy={cy} r={14} fill={type === "pos" ? "#f59e0b" : "#818cf8"} />
                        )}
                        {type !== "par" && <text x={cx} y={cy + 5} textAnchor="middle" fontSize="16" fill="white" fontWeight="bold">{type === "pos" ? "+" : "−"}</text>}
                        <defs><marker id="arr" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto"><path d="M0,0 L0,4 L4,2 z" fill="#f59e0b" /></marker></defs>
                    </svg>
                </div>
                <div className="flex-1 space-y-3">
                    {type === "pos" && <>
                        <div className="bg-amber-950/30 border border-amber-500/30 rounded-xl p-4"><p className="text-amber-200 font-bold">Carga Positiva</p><p className="text-slate-400 text-sm">Linhas saem da carga e vão ao infinito (ou para cargas negativas). Campo aponta para FORA.</p></div>
                    </>}
                    {type === "neg" && <>
                        <div className="bg-blue-950/30 border border-blue-500/30 rounded-xl p-4"><p className="text-blue-200 font-bold">Carga Negativa</p><p className="text-slate-400 text-sm">Linhas chegam na carga vindo do infinito (ou de cargas positivas). Campo aponta para DENTRO.</p></div>
                    </>}
                    {type === "par" && <>
                        <div className="bg-slate-900 border border-slate-700 rounded-xl p-4"><p className="text-slate-200 font-bold">Campo Uniforme (Placas Paralelas)</p><p className="text-slate-400 text-sm">Entre placas, o campo é uniforme (paralelo, equidistante). Usado em capacitores. E = V/d.</p></div>
                    </>}
                </div>
            </div>
        </div>
    );
}

function A3S3() {
    const [ans, setAns] = useState<number | null>(null);
    const correct = 0;
    const opts = ["Sempre perpendiculares à superfície do condutor em equilíbrio.", "Sempre paralelas à superfície do condutor.", "Podem ter qualquer orientação.", "Nunca existem na superfície de condutores."];
    return (
        <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
            <span className="text-xs font-black tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">QUIZ</span>
            <h2 className="text-2xl font-black text-slate-100 mt-4 mb-4">As linhas de campo elétrico na superfície de um condutor em equilíbrio eletrostático são...</h2>
            <div className="space-y-3 mb-4">
                {opts.map((o, i) => {
                    const cls = ans === null ? "border-slate-700 hover:border-slate-500 bg-slate-900" : i === correct ? "border-emerald-500 bg-emerald-950/30 text-emerald-100" : ans === i ? "border-rose-500 bg-rose-950/30 opacity-70" : "border-slate-800 opacity-25";
                    return <button key={i} disabled={ans !== null} onClick={() => setAns(i)} className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex gap-3 ${cls}`}><span className="font-black">{["A", "B", "C", "D"][i]})</span><span>{o}</span></button>;
                })}
            </div>
            {ans !== null && <div className={`p-4 rounded-2xl animate-in slide-in-from-bottom-4 ${ans === correct ? "bg-emerald-900/30 border border-emerald-500/40 text-emerald-200" : "bg-rose-900/30 border border-rose-500/40 text-rose-200"}`}><strong>A ✅</strong> — Em equilíbrio, nenhuma componente tangencial pode existir (senão haveria corrente na superfície). Logo, E é sempre ⊥ à superfície.</div>}
        </div>
    );
}

function A3S4() {
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-6">📝 Resumo — Sem. 3</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
                {[
                    { icon: "📏", t: "Linhas de Campo", b: "Representação visual do campo E. Saem de + e entram em -. Mais densas = mais intenso." },
                    { icon: "⊕⊖", t: "Superposição", b: "Campo de vários cargas = soma vetorial dos campos individuais." },
                    { icon: "📐", t: "Campo Uniforme", b: "Entre placas paralelas: E = V/d. Linhas paralelas e equidistantes." },
                    { icon: "🛡️", t: "Condutor em Equilíbrio", b: "Campo interno = 0. Cargas ficam na superfície. Linhas ⊥ à superfície." },
                ].map((c, i) => (
                    <div key={i} className="bg-slate-900 border border-slate-700 rounded-2xl p-5 hover:border-amber-500/30 transition-all">
                        <span className="text-3xl">{c.icon}</span>
                        <h3 className="font-bold text-slate-100 my-1">{c.t}</h3>
                        <p className="text-slate-400 text-sm">{c.b}</p>
                    </div>
                ))}
            </div>
            <p className="text-center text-slate-500">Próxima aula: Energia Potencial e Tensão Elétrica ⚡</p>
        </div>
    );
}

const SL3 = [A3S1, A3S2, A3S3, A3S4];

// ── SEM 4: Energia Potencial e Potencial Elétrico ────────────────────────────
function B4S1() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center animate-in fade-in zoom-in duration-700 relative">
            <div className="absolute inset-0 opacity-10 rounded-3xl" style={{ backgroundImage: "url('/sprites/backgrounds/4/2304x1296.png')", backgroundSize: "cover", imageRendering: "pixelated" }} />
            <div className="relative z-10">
                <img src="/sprites/2 Owlet_Monster/Owlet_Monster_Idle_4.png" alt="" className="w-16 h-16 mx-auto mb-6 object-contain" style={{ imageRendering: "pixelated" }} />
                <span className="bg-amber-500/20 text-amber-400 font-bold px-3 py-1 rounded-full text-xs tracking-widest border border-amber-500/30">FÍSICA 3 · SEMANA 4</span>
                <h1 className="text-4xl md:text-6xl font-black text-white my-4 leading-none">Potencial Elétrico<br /><span className="text-lime-400">& Tensão</span></h1>
                <p className="text-xl text-slate-400 max-w-xl mx-auto">Potencial é a "altura" elétrica. A diferença de potencial (tensão ou ddp) é o que move as cargas.</p>
            </div>
        </div>
    );
}

function B4S2() {
    const [q, setQ] = useState(5);
    const [r, setR] = useState(1);
    const k = 9e9;
    const V = (k * q * 1e-6 / r).toFixed(0);
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-3">🔋 Potencial e Energia Potencial</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-slate-950 border border-lime-500/20 rounded-2xl p-4 text-center"><code className="text-xl font-mono text-lime-300">V = k·Q / r</code><p className="text-slate-500 text-xs mt-1">Unidade: Volt (V = J/C)</p></div>
                <div className="bg-slate-950 border border-blue-500/20 rounded-2xl p-4 text-center"><code className="text-xl font-mono text-blue-300">Ep = q·V</code><p className="text-slate-500 text-xs mt-1">Energia potencial em Joules</p></div>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 space-y-4 mb-4">
                <div><label className="text-xs font-bold text-slate-400">Carga-fonte Q: <span className="text-lime-300">{q} μC</span></label><input type="range" min={1} max={20} value={q} onChange={e => setQ(+e.target.value)} className="w-full mt-1 accent-lime-400" /></div>
                <div><label className="text-xs font-bold text-slate-400">Distância r: <span className="text-amber-300">{r} m</span></label><input type="range" min={0.1} max={3} step={0.1} value={r} onChange={e => setR(+e.target.value)} className="w-full mt-1 accent-amber-400" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-lime-950/30 border border-lime-500/30 rounded-2xl p-4 text-center"><div className="text-xs text-lime-400 font-black mb-1">POTENCIAL V</div><div className="text-4xl font-black text-lime-300">{parseInt(V).toLocaleString("pt-BR")} V</div></div>
                <div className="bg-blue-950/30 border border-blue-500/30 rounded-2xl p-4 text-center"><div className="text-xs text-blue-400 font-black mb-1">TENSÃO = ddp</div><div className="text-slate-300 font-mono text-sm mt-2">ΔV = V₁ - V₂<br />Unidade: Volt</div></div>
            </div>
        </div>
    );
}

function B4S3() {
    const [ans, setAns] = useState<number | null>(null);
    const correct = 3;
    const opts = ["Volt por Coulomb (V/C)", "Ampere (A)", "Joule (J)", "Volt (V) = Joule por Coulomb (J/C)"];
    return (
        <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
            <span className="text-xs font-black tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">QUIZ</span>
            <h2 className="text-2xl font-black text-slate-100 mt-4 mb-6">A unidade do potencial elétrico é:</h2>
            <div className="space-y-3 mb-4">
                {opts.map((o, i) => {
                    const cls = ans === null ? "border-slate-700 hover:border-slate-500 bg-slate-900" : i === correct ? "border-emerald-500 bg-emerald-950/30 text-emerald-100" : ans === i ? "border-rose-500 bg-rose-950/30 opacity-70" : "border-slate-800 opacity-25";
                    return <button key={i} disabled={ans !== null} onClick={() => setAns(i)} className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex gap-3 ${cls}`}><span className="font-black">{["A", "B", "C", "D"][i]})</span><span>{o}</span></button>;
                })}
            </div>
            {ans !== null && <div className={`p-4 rounded-2xl animate-in slide-in-from-bottom-4 ${ans === correct ? "bg-emerald-900/30 border border-emerald-500/40 text-emerald-200" : "bg-rose-900/30 border border-rose-500/40 text-rose-200"}`}><strong>D ✅</strong> — Volt = Joule por Coulomb. Potencial = energia por carga. V = Ep/q = k·Q/r.</div>}
        </div>
    );
}

function B4S4() {
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-6">📝 Resumo — Sem. 4</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
                {[
                    { icon: "🔋", t: "Potencial Elétrico V", b: "Energia por unidade de carga. V = k·Q/r. Unidade: Volt = J/C." },
                    { icon: "⚡", t: "Diferença de Potencial (ddp)", b: "ΔV = V₁ - V₂. É o que faz as cargas se moverem. É a tensão elétrica!" },
                    { icon: "💡", t: "Trabalho da Força Elétrica", b: "τ_AB = q·ΔV. A força elétrica realiza trabalho quando a carga se desloca entre pontos." },
                    { icon: "🌐", t: "Superfícies Equipotenciais", b: "Conjunto de pontos com V igual. Perpendicular às linhas de campo. Cargas não fazem trabalho nelas." },
                ].map((c, i) => (
                    <div key={i} className="bg-slate-900 border border-slate-700 rounded-2xl p-5 hover:border-lime-500/30 transition-all">
                        <span className="text-3xl">{c.icon}</span>
                        <h3 className="font-bold text-slate-100 my-1">{c.t}</h3>
                        <p className="text-slate-400 text-sm">{c.b}</p>
                    </div>
                ))}
            </div>
            <p className="text-center text-slate-500">Próxima aula: Eletrodinâmica — Corrente Elétrica ⚡</p>
        </div>
    );
}

const SL4 = [B4S1, B4S2, B4S3, B4S4];

// ── EXPORTS ────────────────────────────────────────────────────────────────────
function makeLesson(slides: React.FC[], title: string, aula: string) {
    return function Lesson() {
        const [cur, setCur] = useState(0);
        const next = useCallback(() => setCur(p => Math.min(p + 1, slides.length - 1)), []);
        const prev = useCallback(() => setCur(p => Math.max(p - 1, 0)), []);
        useEffect(() => {
            const h = (e: KeyboardEvent) => { if (e.key === "ArrowRight") next(); if (e.key === "ArrowLeft") prev(); };
            window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
        }, [next, prev]);
        const C = slides[cur];
        return <Shell title={title} aula={aula} total={slides.length} current={cur} onPrev={prev} onNext={next}><C /></Shell>;
    };
}

export const Fisica3Lesson3 = makeLesson(SL3, "Sem. 3 — Campo Elétrico Geométrico", "Sem. 3");
export const Fisica3Lesson4 = makeLesson(SL4, "Sem. 4 — Potencial Elétrico & Tensão", "Sem. 4");
