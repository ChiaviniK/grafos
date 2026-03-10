import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Home, BarChart2 } from "lucide-react";

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
            <div className="absolute inset-0 opacity-10 rounded-3xl" style={{ backgroundImage: "url('/sprites/backgrounds/4/2304x1296.png')", backgroundSize: "cover", imageRendering: "pixelated" }} />
            <div className="relative z-10">
                <img src="/sprites/1 Pink_Monster/Pink_Monster_Idle_4.png" alt="" className="w-16 h-16 mx-auto mb-6 object-contain" style={{ imageRendering: "pixelated" }} />
                <span className="bg-rose-500/20 text-rose-400 font-bold px-3 py-1 rounded-full text-xs tracking-widest border border-rose-500/30">FÍSICA 1 · AULA 04</span>
                <h1 className="text-5xl md:text-6xl font-black text-white my-4 leading-none">Gráficos &<br /><span className="text-cyan-400">Tabelas</span></h1>
                <p className="text-xl text-slate-400 max-w-xl mx-auto">A linguagem visual da Física. Como ler, interpretar e construir representações de dados científicos.</p>
            </div>
        </div>
    );
}

function S2() {
    const [hover, setHover] = useState<number | null>(null);
    const pts = [
        { x: 1, y: 2, label: "t=1s, d=2m" },
        { x: 2, y: 4, label: "t=2s, d=4m" },
        { x: 3, y: 6, label: "t=3s, d=6m" },
        { x: 4, y: 8, label: "t=4s, d=8m" },
        { x: 5, y: 10, label: "t=5s, d=10m" },
    ];
    const W = 280, H = 200, pad = 40;
    const xScale = (x: number) => pad + (x / 5) * (W - pad * 2);
    const yScale = (y: number) => H - pad - (y / 10) * (H - pad * 2);
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <div className="flex items-center gap-3 mb-3"><BarChart2 className="w-8 h-8 text-cyan-400" /><h2 className="text-4xl font-black text-slate-100">Lendo um Gráfico</h2></div>
            <p className="text-slate-400 text-xl mb-6">Passe o mouse sobre os pontos para ver os valores. O que este gráfico representa?</p>
            <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="bg-slate-950 border border-slate-700 rounded-2xl p-6">
                    <svg width={W} height={H} className="overflow-visible">
                        {/* Grid */}
                        {[2, 4, 6, 8, 10].map(v => <line key={v} x1={pad} x2={W - pad} y1={yScale(v)} y2={yScale(v)} stroke="#1e293b" strokeWidth="1" />)}
                        {[1, 2, 3, 4, 5].map(v => <line key={v} x1={xScale(v)} x2={xScale(v)} y1={pad} y2={H - pad} stroke="#1e293b" strokeWidth="1" />)}
                        {/* Axes */}
                        <line x1={pad} x2={W - pad} y1={H - pad} y2={H - pad} stroke="#475569" strokeWidth="2" />
                        <line x1={pad} x2={pad} y1={pad} y2={H - pad} stroke="#475569" strokeWidth="2" />
                        {/* Labels */}
                        <text x={W / 2} y={H - 5} fill="#64748b" fontSize="11" textAnchor="middle">Tempo (s)</text>
                        <text x={12} y={H / 2} fill="#64748b" fontSize="11" textAnchor="middle" transform={`rotate(-90,12,${H / 2})`}>Distância (m)</text>
                        {/* Line */}
                        <polyline points={pts.map(p => `${xScale(p.x)},${yScale(p.y)}`).join(" ")} fill="none" stroke="#22d3ee" strokeWidth="2" strokeDasharray="4 2" />
                        {/* Points */}
                        {pts.map((p, i) => (
                            <circle key={i} cx={xScale(p.x)} cy={yScale(p.y)} r={hover === i ? 8 : 5} fill={hover === i ? "#22d3ee" : "#0e7490"} stroke="#22d3ee" strokeWidth="2" className="cursor-pointer transition-all" onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} />
                        ))}
                        {/* Tooltip */}
                        {hover !== null && (
                            <text x={xScale(pts[hover].x)} y={yScale(pts[hover].y) - 12} fill="#22d3ee" fontSize="10" textAnchor="middle">{pts[hover].label}</text>
                        )}
                    </svg>
                </div>
                <div className="flex-1 space-y-3">
                    {[
                        { q: "O que o eixo X representa?", a: "Tempo (em segundos)" },
                        { q: "O que o eixo Y representa?", a: "Distância percorrida (em metros)" },
                        { q: "A linha reta indica que...?", a: "O objeto se move com velocidade constante (MRU)" },
                        { q: "A inclinação da reta é...?", a: "A velocidade média: 2 m/s" },
                    ].map((item, i) => (
                        <div key={i} className="bg-slate-900 border border-slate-700 rounded-xl p-3">
                            <p className="text-xs text-cyan-400 font-bold">{item.q}</p>
                            <p className="text-slate-300 text-sm mt-1">{item.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function S3() {
    const data = [
        { mes: "Jan", temp: 28 }, { mes: "Fev", temp: 29 }, { mes: "Mar", temp: 27 },
        { mes: "Abr", temp: 24 }, { mes: "Mai", temp: 21 }, { mes: "Jun", temp: 18 },
    ];
    const max = 30;
    const [selected, setSelected] = useState<number | null>(null);
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-3">📊 Lendo uma Tabela e seu Gráfico</h2>
            <p className="text-slate-400 text-xl mb-6">Dados de temperatura média em SP. Clique na barra para ver o valor:</p>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-950 border border-slate-700 rounded-2xl p-5">
                    <p className="text-xs font-bold text-slate-500 tracking-widest mb-3">TABELA — Temperatura Média (°C)</p>
                    <table className="w-full text-sm">
                        <thead><tr><th className="text-left text-slate-500 pb-2">Mês</th><th className="text-right text-slate-500 pb-2">Temp (°C)</th></tr></thead>
                        <tbody>{data.map((d, i) => <tr key={i} onClick={() => setSelected(i)} className={`cursor-pointer transition-all ${selected === i ? "text-amber-300" : "text-slate-300 hover:text-white"}`}><td className="py-1">{d.mes}</td><td className="text-right">{d.temp}</td></tr>)}</tbody>
                    </table>
                </div>
                <div className="bg-slate-950 border border-slate-700 rounded-2xl p-5 flex flex-col justify-end">
                    <p className="text-xs font-bold text-slate-500 tracking-widest mb-3">GRÁFICO DE BARRAS</p>
                    <div className="flex items-end gap-2 h-32">
                        {data.map((d, i) => (
                            <div key={i} onClick={() => setSelected(i)} className="flex-1 flex flex-col items-center gap-1 cursor-pointer">
                                <span className={`text-xs font-bold transition-all ${selected === i ? "text-amber-300" : "text-slate-600"}`}>{selected === i ? d.temp : ""}</span>
                                <div className="w-full rounded-t-lg transition-all duration-500" style={{ height: `${(d.temp / max) * 100}%`, background: selected === i ? "#f59e0b" : "#1d4ed8" }} />
                                <span className="text-xs text-slate-500">{d.mes}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {selected !== null && <div className="mt-4 bg-amber-950/30 border border-amber-500/30 rounded-xl p-3 text-amber-200 animate-in fade-in">Em {data[selected].mes}, a temperatura média em SP foi de <strong>{data[selected].temp}°C</strong>.</div>}
        </div>
    );
}

function S4() {
    const [ans, setAns] = useState<number | null>(null);
    const correct = 1;
    const opts = ["A temperatura subiu ao longo do tempo.", "A temperatura é constante, pois os pontos formam uma linha horizontal.", "Não é possível saber sem mais dados.", "O corpo está perdendo energia."];
    return (
        <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
            <span className="text-xs font-black tracking-widest text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">QUIZ</span>
            <h2 className="text-2xl font-black text-slate-100 mt-4 mb-2">Em um gráfico de Temperatura × Tempo, os pontos formam uma linha reta horizontal. Isso significa que:</h2>
            <div className="space-y-3 my-6">
                {opts.map((o, i) => {
                    const cls = ans === null ? "border-slate-700 hover:border-slate-500 bg-slate-900" : i === correct ? "border-emerald-500 bg-emerald-950/30 text-emerald-100 scale-[1.01]" : ans === i ? "border-rose-500 bg-rose-950/30 opacity-70" : "border-slate-800 opacity-25";
                    return <button key={i} disabled={ans !== null} onClick={() => setAns(i)} className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex gap-3 ${cls}`}><span className="font-black">{["A", "B", "C", "D"][i]})</span><span>{o}</span></button>;
                })}
            </div>
            {ans !== null && <div className={`p-4 rounded-2xl animate-in slide-in-from-bottom-4 ${ans === correct ? "bg-emerald-900/30 border border-emerald-500/40 text-emerald-200" : "bg-rose-900/30 border border-rose-500/40 text-rose-200"}`}><strong>B ✅</strong> — Um gráfico horizontal indica que a grandeza no eixo Y não muda com o tempo. Temperatura constante = equilíbrio térmico!</div>}
        </div>
    );
}

function S5() {
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-6">📝 Resumo da Aula 04</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
                {[
                    { icon: "📈", t: "Gráfico de Linha", b: "Mostra tendências ao longo do tempo. Inclinação = taxa de variação." },
                    { icon: "📊", t: "Gráfico de Barras", b: "Compara categorias. Ótimo para dados discretos como meses, grupos." },
                    { icon: "📋", t: "Tabela", b: "Apresenta valores exatos e organizados. Base para construir gráficos." },
                    { icon: "🔍", t: "Interpretação", b: "Linha reta horizontal: valor constante. Subindo: crescimento. Descendo: redução." },
                ].map((c, i) => (
                    <div key={i} className="bg-slate-900 border border-slate-700 rounded-2xl p-5 hover:border-cyan-500/30 transition-all">
                        <span className="text-3xl">{c.icon}</span>
                        <h3 className="font-bold text-slate-100 my-1">{c.t}</h3>
                        <p className="text-slate-400 text-sm">{c.b}</p>
                    </div>
                ))}
            </div>
            <div className="flex justify-center"><img src="/sprites/2 Owlet_Monster/Owlet_Monster_Run_6.png" alt="" className="h-20 object-contain" style={{ imageRendering: "pixelated" }} /></div>
            <p className="text-center text-slate-500 mt-4">Próxima aula: Unidades de Medida e o Sistema Internacional (SI) 📏</p>
        </div>
    );
}

const SLIDES = [S1, S2, S3, S4, S5];
export function Fisica1Lesson4() {
    const [cur, setCur] = useState(0);
    const next = useCallback(() => setCur(p => Math.min(p + 1, SLIDES.length - 1)), []);
    const prev = useCallback(() => setCur(p => Math.max(p - 1, 0)), []);
    useEffect(() => {
        const h = (e: KeyboardEvent) => { if (e.key === "ArrowRight") next(); if (e.key === "ArrowLeft") prev(); };
        window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
    }, [next, prev]);
    const C = SLIDES[cur];
    return <Shell title="Aula 04 — Gráficos e Tabelas" aula="Aula 04" total={SLIDES.length} current={cur} onPrev={prev} onNext={next}><C /></Shell>;
}
