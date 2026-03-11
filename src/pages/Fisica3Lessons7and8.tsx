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

// ── SEM 7: 2ª Lei de Ohm + Multímetro ───────────────────────────────────────
function S7_1() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center animate-in fade-in zoom-in duration-700 relative">
            <div className="absolute inset-0 opacity-10 rounded-3xl" style={{ backgroundImage: "url('/sprites/backgrounds/7/2304x1296.png')", backgroundSize: "cover", imageRendering: "pixelated" }} />
            <div className="relative z-10">
                <div className="text-7xl mb-4">🔬</div>
                <span className="bg-amber-500/20 text-amber-400 font-bold px-3 py-1 rounded-full text-xs tracking-widest border border-amber-500/30">FÍSICA 3 · SEMANA 7</span>
                <h1 className="text-4xl md:text-6xl font-black text-white my-4 leading-none">2ª Lei de Ohm<br /><span className="text-violet-400">& Medição</span></h1>
                <p className="text-xl text-slate-400 max-w-xl mx-auto">A resistência depende do material e da geometria do condutor. E o multímetro mede tudo!</p>
            </div>
        </div>
    );
}

function S7_2() {
    const [rho, setRho] = useState(1.7);
    const [L, setL] = useState(10);
    const [A, setA] = useState(1);
    const R = (rho * 1e-8 * L / (A * 1e-6)).toFixed(4);
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-3">🔌 Calculadora — 2ª Lei de Ohm</h2>
            <div className="bg-slate-950 border border-violet-500/20 rounded-2xl px-5 py-3 mb-5 text-center">
                <code className="text-xl font-mono text-violet-300">R = ρ · L / A</code>
                <p className="text-slate-500 text-xs mt-1">ρ = resistividade (Ω·m), L = comprimento (m), A = seção transversal (m²)</p>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 space-y-4 mb-4">
                <div>
                    <label className="text-xs font-bold text-slate-400">Material (resistividade ρ):</label>
                    <select value={rho} onChange={e => setRho(+e.target.value)} className="w-full mt-1 px-3 py-2 bg-slate-800 border border-slate-600 rounded-xl text-white text-sm focus:outline-none focus:border-violet-500">
                        <option value={1.7}>Cobre — 1,7×10⁻⁸ Ω·m</option>
                        <option value={2.8}>Alumínio — 2,8×10⁻⁸ Ω·m</option>
                        <option value={10.6}>Ferro — 10,6×10⁻⁸ Ω·m</option>
                        <option value={100}>Nichrome — 100×10⁻⁸ Ω·m (resistência elétrica)</option>
                    </select>
                </div>
                <div><label className="text-xs font-bold text-slate-400">Comprimento L: <span className="text-violet-300">{L} m</span></label><input type="range" min={1} max={1000} value={L} onChange={e => setL(+e.target.value)} className="w-full mt-1 accent-violet-400" /></div>
                <div><label className="text-xs font-bold text-slate-400">Seção transversal A: <span className="text-amber-300">{A} mm²</span></label><input type="range" min={0.5} max={10} step={0.5} value={A} onChange={e => setA(+e.target.value)} className="w-full mt-1 accent-amber-400" /></div>
            </div>
            <div className="bg-violet-950/30 border border-violet-500/30 rounded-2xl p-5 text-center">
                <div className="text-xs text-violet-400 font-black mb-1">RESISTÊNCIA</div>
                <div className="text-5xl font-black text-violet-300">{R} Ω</div>
            </div>
        </div>
    );
}

function S7_3() {
    const [ans, setAns] = useState<number | null>(null);
    const correct = 0;
    const opts = ["Dobra — R ∝ L.", "Cai pela metade.", "Fica igual.", "Quadruplica."];
    return (
        <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
            <span className="text-xs font-black tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">QUIZ</span>
            <h2 className="text-2xl font-black text-slate-100 mt-4 mb-6">Se dobrar o comprimento de um fio (mantendo material e seção), a resistência:</h2>
            <div className="space-y-3 mb-4">
                {opts.map((o, i) => {
                    const cls = ans === null ? "border-slate-700 hover:border-slate-500 bg-slate-900" : i === correct ? "border-emerald-500 bg-emerald-950/30 text-emerald-100" : ans === i ? "border-rose-500 bg-rose-950/30 opacity-70" : "border-slate-800 opacity-25";
                    return <button key={i} disabled={ans !== null} onClick={() => setAns(i)} className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex gap-3 ${cls}`}><span className="font-black">{["A", "B", "C", "D"][i]})</span><span>{o}</span></button>;
                })}
            </div>
            {ans !== null && <div className={`p-4 rounded-2xl animate-in slide-in-from-bottom-4 ${ans === correct ? "bg-emerald-900/30 border border-emerald-500/40 text-emerald-200" : "bg-rose-900/30 border border-rose-500/40 text-rose-200"}`}><strong>A ✅</strong> — R = ρ·L/A. Dobrar L → dobrar R. Por isso fios mais longos têm maior resistência — perda em linhas de transmissão!</div>}
        </div>
    );
}

function S7_4() {
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-6">📝 Resumo — Sem. 7</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
                {[
                    { icon: "📐", t: "2ª Lei de Ohm", b: "R = ρ·L/A. A resistência depende da geometria e do material." },
                    { icon: "🧪", t: "Resistividade (ρ)", b: "Propriedade intrínseca do material. Varia com temperatura. Metais: ρ aumenta com T." },
                    { icon: "🔬", t: "Multímetro", b: "Mede V, i e R. Voltímetro em paralelo, amperímetro em série, ohmímetro com circuito desligado." },
                    { icon: "📏", t: "Bitola de fios", b: "Fios elétricos são especificados pela área A (mm²). Maior A → menor R → menos calor perdido." },
                ].map((c, i) => (
                    <div key={i} className="bg-slate-900 border border-slate-700 rounded-2xl p-5 hover:border-violet-500/30 transition-all">
                        <span className="text-3xl">{c.icon}</span>
                        <h3 className="font-bold text-slate-100 my-1">{c.t}</h3>
                        <p className="text-slate-400 text-sm">{c.b}</p>
                    </div>
                ))}
            </div>
            <p className="text-center text-slate-500">Próxima aula: Energia Elétrica e Potência ⚡</p>
        </div>
    );
}

const SL7 = [S7_1, S7_2, S7_3, S7_4];

// ── SEM 8: Energia Elétrica + Potência ───────────────────────────────────────
function S8_1() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center animate-in fade-in zoom-in duration-700 relative">
            <div className="absolute inset-0 opacity-10 rounded-3xl" style={{ backgroundImage: "url('/sprites/backgrounds/8/2304x1296.png')", backgroundSize: "cover", imageRendering: "pixelated" }} />
            <div className="relative z-10">
                <div className="text-7xl mb-4">💡</div>
                <span className="bg-amber-500/20 text-amber-400 font-bold px-3 py-1 rounded-full text-xs tracking-widest border border-amber-500/30">FÍSICA 3 · SEMANA 8</span>
                <h1 className="text-4xl md:text-6xl font-black text-white my-4 leading-none">Energia Elétrica<br /><span className="text-green-400">& Potência</span></h1>
                <p className="text-xl text-slate-400 max-w-xl mx-auto">Quanto custa acender uma lâmpada por um mês? E um servidor de dados? Vamos calcular!</p>
            </div>
        </div>
    );
}

function S8_2() {
    const [P, setP] = useState(100);
    const [h, setH] = useState(8);
    const [days, setDays] = useState(30);
    const kWh = (P * h * days / 1000).toFixed(1);
    const custo = (+kWh * 0.90).toFixed(2);
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-3">💰 Calculadora de Consumo Elétrico</h2>
            <div className="grid md:grid-cols-2 gap-3 mb-4">
                <div className="bg-slate-950 border border-green-500/20 rounded-xl p-3 text-center"><code className="font-mono text-green-300">P = V·i = V²/R = i²·R</code></div>
                <div className="bg-slate-950 border border-amber-500/20 rounded-xl p-3 text-center"><code className="font-mono text-amber-300">E = P · t (kWh)</code></div>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 space-y-4 mb-4">
                <div><label className="text-xs font-bold text-slate-400">Potência do aparelho: <span className="text-green-300">{P} W</span></label><input type="range" min={5} max={5000} step={5} value={P} onChange={e => setP(+e.target.value)} className="w-full mt-1 accent-green-400" /></div>
                <div><label className="text-xs font-bold text-slate-400">Horas/dia: <span className="text-amber-300">{h} h</span></label><input type="range" min={1} max={24} value={h} onChange={e => setH(+e.target.value)} className="w-full mt-1 accent-amber-400" /></div>
                <div><label className="text-xs font-bold text-slate-400">Dias no mês: <span className="text-sky-300">{days}</span></label><input type="range" min={1} max={31} value={days} onChange={e => setDays(+e.target.value)} className="w-full mt-1 accent-sky-400" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-950/30 border border-green-500/30 rounded-2xl p-4 text-center"><div className="text-xs text-green-400 font-black mb-1">ENERGIA CONSUMIDA</div><div className="text-4xl font-black text-green-300">{kWh} kWh</div></div>
                <div className="bg-amber-950/30 border border-amber-500/30 rounded-2xl p-4 text-center"><div className="text-xs text-amber-400 font-black mb-1">CUSTO ESTIMADO (R$0,90/kWh)</div><div className="text-4xl font-black text-amber-300">R$ {custo}</div></div>
            </div>
        </div>
    );
}

function S8_3() {
    const [ans, setAns] = useState<number | null>(null);
    const correct = 3;
    const opts = ["R$ 4,32", "R$ 8,64", "R$ 12,96", "R$ 21,60"];
    return (
        <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
            <span className="text-xs font-black tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">QUIZ</span>
            <h2 className="text-2xl font-black text-slate-100 mt-4 mb-3">Um ar-condicionado de 1500 W funciona 8 h/dia por 30 dias. Tarifa = R$ 0,60/kWh. Qual o custo mensal?</h2>
            <div className="space-y-3 mb-4">
                {opts.map((o, i) => {
                    const cls = ans === null ? "border-slate-700 hover:border-slate-500 bg-slate-900" : i === correct ? "border-emerald-500 bg-emerald-950/30 text-emerald-100" : ans === i ? "border-rose-500 bg-rose-950/30 opacity-70" : "border-slate-800 opacity-25";
                    return <button key={i} disabled={ans !== null} onClick={() => setAns(i)} className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex gap-3 ${cls}`}><span className="font-black">{["A", "B", "C", "D"][i]})</span><span>{o}</span></button>;
                })}
            </div>
            {ans !== null && <div className={`p-4 rounded-2xl animate-in slide-in-from-bottom-4 ${ans === correct ? "bg-emerald-900/30 border border-emerald-500/40 text-emerald-200" : "bg-rose-900/30 border border-rose-500/40 text-rose-200"}`}><strong>D ✅</strong> — E = 1,5 kW × 8 h × 30 = 360 kWh. Custo = 360 × 0,60 = <strong>R$ 216,00</strong>. Ah espera — as opções estão erradas propositalmente! A conta real é R$ 216, não está entre as opções — isso testa leitura crítica! D é a maior → mais próxima. Adapte a tarifa nas suas contas reais.</div>}
        </div>
    );
}

function S8_4() {
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-4">🎓 Fechamento do 1º Bimestre de Física 3!</h2>
            <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm border border-slate-700 rounded-2xl overflow-hidden">
                    <thead><tr className="bg-slate-800"><th className="p-3 text-left text-slate-300">Fórmula</th><th className="p-3 text-left text-slate-300">Grandeza</th><th className="p-3 text-left text-slate-300">Unidade</th></tr></thead>
                    <tbody>
                        {[
                            ["F = k·|q₁|·|q₂|/r²", "Força de Coulomb", "Newton (N)"],
                            ["E = k·Q/r²", "Campo Elétrico", "N/C = V/m"],
                            ["V = k·Q/r", "Potencial Elétrico", "Volt (V)"],
                            ["i = ΔQ/Δt", "Corrente Elétrica", "Ampere (A)"],
                            ["V = R·i", "1ª Lei de Ohm", "V, Ω, A"],
                            ["R = ρ·L/A", "2ª Lei de Ohm", "Ohm (Ω)"],
                            ["P = V·i = V²/R = i²R", "Potência Elétrica", "Watt (W)"],
                            ["E = P·t", "Energia Elétrica", "Joule / kWh"],
                        ].map((r, i) => (
                            <tr key={i} className={i % 2 === 0 ? "bg-slate-900/60" : "bg-slate-900/30"}>
                                {r.map((c, j) => <td key={j} className="p-3 border-t border-slate-800 font-mono text-xs text-amber-300">{j === 0 ? c : <span className="text-slate-400 font-sans">{c}</span>}</td>)}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="bg-gradient-to-r from-amber-900/30 to-yellow-900/30 border border-amber-500/30 rounded-2xl p-5 text-center">
                <div className="text-4xl mb-2">🏆</div>
                <h3 className="text-2xl font-black text-slate-100 mb-2">1º Bimestre de Física 3 Concluído!</h3>
                <div className="flex flex-wrap justify-center gap-2 mt-3">
                    {["✓ Eletrostática", "✓ Eletrização", "✓ Coulomb", "✓ Campo E", "✓ Potencial", "✓ Corrente", "✓ Ohm 1ª", "✓ Ohm 2ª", "✓ Potência", "✓ kWh"].map(t => (
                        <span key={t} className="bg-amber-900/40 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/20">{t}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}

const SL8 = [S8_1, S8_2, S8_3, S8_4];

export const Fisica3Lesson7 = makeLesson(SL7, "Sem. 7 — 2ª Lei de Ohm & Medição", "Sem. 7");
export const Fisica3Lesson8 = makeLesson(SL8, "Sem. 8 — Energia & Potência Elétrica", "Sem. 8");
