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

// ── AULA 07: Distância vs Deslocamento ──────────────────────────────────────
function A7S1() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center animate-in fade-in zoom-in duration-700 relative">
            <div className="absolute inset-0 opacity-10 rounded-3xl" style={{ backgroundImage: "url('/sprites/backgrounds/7/2304x1296.png')", backgroundSize: "cover", imageRendering: "pixelated" }} />
            <div className="relative z-10">
                <img src="/sprites/2 Owlet_Monster/Owlet_Monster_Walk_6.png" alt="" className="w-20 h-16 mx-auto mb-6 object-contain" style={{ imageRendering: "pixelated" }} />
                <span className="bg-rose-500/20 text-rose-400 font-bold px-3 py-1 rounded-full text-xs tracking-widest border border-rose-500/30">FÍSICA 1 · AULA 07</span>
                <h1 className="text-4xl md:text-6xl font-black text-white my-4 leading-none">Distância<br /><span className="text-orange-400">vs.</span><br />Deslocamento</h1>
                <p className="text-xl text-slate-400 max-w-xl mx-auto">Parece a mesma coisa, mas não é. Esta distinção fundamental muda tudo em cinemática.</p>
            </div>
        </div>
    );
}

function A7S2() {
    const [reveal, setReveal] = useState(false);
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-3">🤔 Um Atleta numa Pista</h2>
            <p className="text-slate-400 text-xl mb-6">Um corredor completa 1 volta numa pista de 400 m e volta ao ponto de partida. Qual foi sua distância percorrida? Qual foi seu deslocamento?</p>
            <div className="bg-slate-950 border border-slate-700 rounded-3xl p-6 mb-4 flex flex-col items-center">
                <div className="w-48 h-28 border-4 border-orange-500/50 rounded-full relative mb-4">
                    <img src="/sprites/3 Dude_Monster/Dude_Monster_Run_6.png" alt="" className="absolute top-1/2 left-0 -translate-y-1/2 h-10 object-contain" style={{ imageRendering: "pixelated" }} />
                    <div className="absolute top-1/2 right-2 -translate-y-1/2 w-3 h-3 bg-emerald-400 rounded-full" />
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-slate-500 whitespace-nowrap">Pista oval 400 m</span>
                </div>
                <button onClick={() => setReveal(r => !r)} className="mt-8 px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold transition-all">
                    {reveal ? "Ocultar resposta" : "Revelar resposta"}
                </button>
                {reveal && (
                    <div className="mt-4 grid md:grid-cols-2 gap-4 w-full animate-in slide-in-from-bottom-4">
                        <div className="bg-orange-950/30 border border-orange-500/40 rounded-2xl p-4 text-center">
                            <div className="text-xs font-black text-orange-400 tracking-widest">DISTÂNCIA PERCORRIDA</div>
                            <div className="text-4xl font-black text-orange-300 my-2">400 m</div>
                            <p className="text-slate-400 text-sm">É grandeza escalar — soma de todos os caminhos. Não tem direção.</p>
                        </div>
                        <div className="bg-sky-950/30 border border-sky-500/40 rounded-2xl p-4 text-center">
                            <div className="text-xs font-black text-sky-400 tracking-widest">DESLOCAMENTO</div>
                            <div className="text-4xl font-black text-sky-300 my-2">0 m</div>
                            <p className="text-slate-400 text-sm">É grandeza vetorial — distância entre posição inicial e final. Começo = fim → Δs = 0.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function A7S3() {
    const [posA, setPosA] = useState(10);
    const [posB, setPosB] = useState(70);
    const desl = posB - posA;
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-3">📐 Calculando o Deslocamento</h2>
            <p className="text-slate-400 text-xl mb-3">Fórmula: <code className="bg-slate-800 text-orange-300 px-2 py-0.5 rounded font-mono">Δs = s_final − s_inicial</code></p>
            <p className="text-slate-500 mb-6">Arraste os controles para ajustar as posições:</p>
            <div className="bg-slate-950 border border-slate-700 rounded-3xl p-6">
                <div className="relative h-16 bg-slate-900 rounded-2xl border border-slate-700 mb-4 overflow-visible">
                    {/* Line */}
                    {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(v => (
                        <div key={v} className="absolute h-full border-l border-slate-800" style={{ left: `${v}%` }}>
                            <span className="absolute bottom-1 -translate-x-1/2 text-[10px] text-slate-600">{v}</span>
                        </div>
                    ))}
                    {/* Arrow from A to B */}
                    <div className="absolute top-3 h-1 bg-orange-500/50 rounded" style={{ left: `${Math.min(posA, posB)}%`, width: `${Math.abs(desl)}%` }} />
                    {/* Marker A */}
                    <div className="absolute top-0 h-full flex flex-col items-center" style={{ left: `${posA}%` }}>
                        <div className="w-3 h-3 bg-emerald-400 rounded-full mt-2" />
                        <span className="text-xs text-emerald-400 font-bold mt-1">A</span>
                    </div>
                    {/* Marker B */}
                    <div className="absolute top-0 h-full flex flex-col items-center" style={{ left: `${posB}%` }}>
                        <div className="w-3 h-3 bg-rose-400 rounded-full mt-2" />
                        <span className="text-xs text-rose-400 font-bold mt-1">B</span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div><label className="text-xs text-emerald-400 font-bold tracking-widest">Posição A (m): {posA}</label><input type="range" min={0} max={90} value={posA} onChange={e => setPosA(+e.target.value)} className="w-full mt-1 accent-emerald-500" /></div>
                    <div><label className="text-xs text-rose-400 font-bold tracking-widest">Posição B (m): {posB}</label><input type="range" min={10} max={100} value={posB} onChange={e => setPosB(+e.target.value)} className="w-full mt-1 accent-rose-500" /></div>
                </div>
                <div className="text-center bg-orange-950/30 border border-orange-500/30 rounded-2xl px-6 py-4">
                    <span className="text-lg font-mono text-slate-400">Δs = {posB} − {posA} = </span>
                    <span className="text-4xl font-black text-orange-300"> {desl} m</span>
                    {desl < 0 && <p className="text-orange-400 text-sm mt-1">Deslocamento negativo → o objeto voltou!</p>}
                </div>
            </div>
        </div>
    );
}

function A7S4() {
    const [ans, setAns] = useState<number | null>(null);
    const correct = 3;
    const opts = ["800 m e 800 m.", "0 m e 0 m.", "800 m e 800 m (positivo).", "800 m e 0 m."];
    return (
        <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
            <span className="text-xs font-black tracking-widest text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">QUIZ</span>
            <h2 className="text-2xl font-black text-slate-100 mt-4 mb-4">Uma pessoa anda 400 m para o norte e depois 400 m de volta para o sul, retornando ao ponto de partida. Qual a distância percorrida e o deslocamento?</h2>
            <div className="space-y-3 mb-4">
                {opts.map((o, i) => {
                    const cls = ans === null ? "border-slate-700 hover:border-slate-500 bg-slate-900" : i === correct ? "border-emerald-500 bg-emerald-950/30 text-emerald-100 scale-[1.01]" : ans === i ? "border-rose-500 bg-rose-950/30 opacity-70" : "border-slate-800 opacity-25";
                    return <button key={i} disabled={ans !== null} onClick={() => setAns(i)} className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex gap-3 ${cls}`}><span className="font-black">{["A", "B", "C", "D"][i]})</span><span>{o}</span></button>;
                })}
            </div>
            {ans !== null && <div className={`p-4 rounded-2xl animate-in slide-in-from-bottom-4 ${ans === correct ? "bg-emerald-900/30 border border-emerald-500/40 text-emerald-200" : "bg-rose-900/30 border border-rose-500/40 text-rose-200"}`}><strong>D ✅</strong> — Distância = 400+400 = 800 m. Deslocamento = posição final − inicial = 0 − 0 = 0 m. A pessoa voltou ao ponto inicial!</div>}
        </div>
    );
}

function A7S5() {
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-6">📝 Resumo — Aula 07</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
                {[
                    { icon: "📐", t: "Distância percorrida", b: "Escalar. Soma total do caminho, independente de direção. Sempre ≥ 0.", sym: "d" },
                    { icon: "➡️", t: "Deslocamento (Δs)", b: "Vetorial. Diferença entre posição final e inicial. Pode ser negativo!", sym: "Δs = s_f − s_i" },
                    { icon: "⚽", t: "Analogia", b: "Num jogo de futebol, a bola pode percorrer 5.000 m mas o deslocamento é 0 se voltou ao ponto inicial." },
                    { icon: "🛰️", t: "Aplicação real", b: "GPS calcula deslocamento (vetor). Odômetro do carro calcula distância percorrida (escalar)." },
                ].map((c, i) => (
                    <div key={i} className="bg-slate-900 border border-slate-700 rounded-2xl p-5 hover:border-orange-500/30 transition-all">
                        <span className="text-3xl">{c.icon}</span>
                        <h3 className="font-bold text-slate-100 my-1">{c.t}</h3>
                        <p className="text-slate-400 text-sm">{c.b}</p>
                        {c.sym && <code className="text-orange-300 bg-black/40 px-2 py-0.5 rounded text-xs font-mono">{c.sym}</code>}
                    </div>
                ))}
            </div>
            <p className="text-center text-slate-500">Próxima aula: Velocidade Média e Instantânea 🚗💨</p>
        </div>
    );
}

const SLIDES_A7 = [A7S1, A7S2, A7S3, A7S4, A7S5];
export function Fisica1Lesson7() {
    const [cur, setCur] = useState(0);
    const next = useCallback(() => setCur(p => Math.min(p + 1, SLIDES_A7.length - 1)), []);
    const prev = useCallback(() => setCur(p => Math.max(p - 1, 0)), []);
    useEffect(() => {
        const h = (e: KeyboardEvent) => { if (e.key === "ArrowRight") next(); if (e.key === "ArrowLeft") prev(); };
        window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
    }, [next, prev]);
    const C = SLIDES_A7[cur];
    return <Shell title="Aula 07 — Distância vs. Deslocamento" aula="Aula 07" total={SLIDES_A7.length} current={cur} onPrev={prev} onNext={next}><C /></Shell>;
}
