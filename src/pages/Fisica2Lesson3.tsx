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

// ── AULA 03: Escalas Termométricas ──────────────────────────────────────────
function A3S1() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center animate-in fade-in zoom-in duration-700 relative">
            <div className="absolute inset-0 opacity-10 rounded-3xl" style={{ backgroundImage: "url('/sprites/backgrounds/3/2304x1296.png')", backgroundSize: "cover", imageRendering: "pixelated" }} />
            <div className="relative z-10">
                <img src="/sprites/1 Pink_Monster/Pink_Monster_Idle_4.png" alt="" className="w-16 h-16 mx-auto mb-6 object-contain" style={{ imageRendering: "pixelated" }} />
                <span className="bg-orange-500/20 text-orange-400 font-bold px-3 py-1 rounded-full text-xs tracking-widest border border-orange-500/30">FÍSICA 2 · AULA 03</span>
                <h1 className="text-4xl md:text-6xl font-black text-white my-4 leading-none">Escalas<br /><span className="text-yellow-400">Termométricas</span></h1>
                <p className="text-xl text-slate-400 max-w-xl mx-auto">Celsius, Fahrenheit e Kelvin — três formas de medir a mesma coisa. Aprenda a converter entre elas.</p>
            </div>
        </div>
    );
}

function A3S2() {
    const [celsius, setCelsius] = useState(25);
    const fahrenheit = (celsius * 9 / 5 + 32).toFixed(1);
    const kelvin = (celsius + 273.15).toFixed(2);
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-3">🔄 Conversor de Escalas (Tempo Real)</h2>
            <p className="text-slate-400 text-xl mb-6">Arraste o slider e veja a conversão instantânea:</p>
            <div className="bg-slate-950 border border-slate-700 rounded-3xl p-8">
                <div className="mb-6">
                    <label className="text-xl text-slate-400 font-bold">Celsius: <span className="text-orange-300">{celsius}°C</span></label>
                    <input type="range" min={-273} max={1000} value={celsius} onChange={e => setCelsius(+e.target.value)} className="w-full mt-2 accent-orange-400" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-blue-950/40 border border-blue-500/30 rounded-2xl p-5 text-center">
                        <div className="text-xs font-black text-blue-400 tracking-widest mb-2">CELSIUS (°C)</div>
                        <div className="text-4xl font-black text-blue-300">{celsius}°C</div>
                        <p className="text-slate-500 text-xs mt-2">Escala europeia. 0°C = gelo, 100°C = vapor</p>
                    </div>
                    <div className="bg-rose-950/40 border border-rose-500/30 rounded-2xl p-5 text-center">
                        <div className="text-xs font-black text-rose-400 tracking-widest mb-2">FAHRENHEIT (°F)</div>
                        <div className="text-4xl font-black text-rose-300">{fahrenheit}°F</div>
                        <p className="text-slate-500 text-xs mt-2">Usada nos EUA. 32°F = gelo, 212°F = vapor</p>
                    </div>
                    <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-5 text-center">
                        <div className="text-xs font-black text-emerald-400 tracking-widest mb-2">KELVIN (K)</div>
                        <div className="text-4xl font-black text-emerald-300">{kelvin} K</div>
                        <p className="text-slate-500 text-xs mt-2">SI. 0 K = zero absoluto (-273,15°C)</p>
                    </div>
                </div>
                <div className="mt-4 bg-slate-900 border border-slate-700 rounded-xl p-3 text-center font-mono text-sm text-slate-400">
                    <span className="text-blue-300">°C → K</span>: K = °C + 273,15 &nbsp;|&nbsp; <span className="text-rose-300">°C → °F</span>: °F = °C × 9/5 + 32
                </div>
            </div>
        </div>
    );
}

function A3S3() {
    const [open, setOpen] = useState<number | null>(null);
    const scales = [
        { name: "Anders Celsius (1742)", flag: "🇸🇪", desc: "Astrônomo sueco. Definiu 0°C para o ponto de fusão do gelo e 100°C para a ebulição da água (originalmente invertido).", curiosity: "O zero de Celsius foi originalmente a ebulição. Após a morte de Celsius, o colega Linnaeus inverteu a escala." },
        { name: "Daniel Fahrenheit (1724)", flag: "🇩🇪", desc: "Físico alemão. Definiu 0°F como a menor temperatura que conseguiu produzir (mistura gelo + sal) e 96°F como temperatura corporal humana.", curiosity: "Por isso 32°F = gelo e 212°F = vapor. 180 divisões entre eles = 18 × 10." },
        { name: "William Thomson (Lord Kelvin, 1848)", flag: "🇬🇧", desc: "Físico britânico. Criou a escala absoluta baseada no zero termodinâmico, sem valores negativos.", curiosity: "Na escala Kelvin não existem temperaturas negativas — 0 K é o mínimo absoluto possível no universo." },
    ];
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-4">🏛️ A História das Escalas</h2>
            <div className="space-y-3">
                {scales.map((s, i) => (
                    <div key={i} onClick={() => setOpen(open === i ? null : i)} className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${open === i ? "border-yellow-500 bg-yellow-950/30 scale-[1.01]" : "border-slate-700 bg-slate-900/60 hover:border-slate-500"}`}>
                        <div className="flex items-center gap-3"><span className="text-2xl">{s.flag}</span><h3 className="font-bold text-xl text-slate-100">{s.name}</h3></div>
                        {open === i && (
                            <div className="mt-3 animate-in fade-in space-y-2">
                                <p className="text-slate-300">{s.desc}</p>
                                <p className="text-yellow-300/80 text-sm italic">💡 Curiosidade: {s.curiosity}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

function A3S4() {
    const [ans, setAns] = useState<number | null>(null);
    const correct = 3;
    const opts = ["-56,85 K.", "56,85 K.", "216,15 K.", "216,85 K."];
    return (
        <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
            <span className="text-xs font-black tracking-widest text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">QUIZ</span>
            <h2 className="text-2xl font-black text-slate-100 mt-4 mb-6">A temperatura de -56,3°C (ponto triplo do CO₂) corresponde a quantos Kelvin?</h2>
            <p className="text-slate-500 mb-4 font-mono text-sm">K = °C + 273,15</p>
            <div className="space-y-3 mb-4">
                {opts.map((o, i) => {
                    const cls = ans === null ? "border-slate-700 hover:border-slate-500 bg-slate-900" : i === correct ? "border-emerald-500 bg-emerald-950/30 text-emerald-100 scale-[1.01]" : ans === i ? "border-rose-500 bg-rose-950/30 opacity-70" : "border-slate-800 opacity-25";
                    return <button key={i} disabled={ans !== null} onClick={() => setAns(i)} className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex gap-3 ${cls}`}><span className="font-black">{["A", "B", "C", "D"][i]})</span><span>{o}</span></button>;
                })}
            </div>
            {ans !== null && <div className={`p-4 rounded-2xl animate-in slide-in-from-bottom-4 ${ans === correct ? "bg-emerald-900/30 border border-emerald-500/40 text-emerald-200" : "bg-rose-900/30 border border-rose-500/40 text-rose-200"}`}><strong>D ✅</strong> — K = -56,3 + 273,15 = <strong>216,85 K</strong>. O ponto triplo do CO₂ é a base para o extinguidor de incêndio!</div>}
        </div>
    );
}

function A3S5() {
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-6">📝 Resumo — Aula 03</h2>
            <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border border-slate-700 rounded-2xl overflow-hidden">
                    <thead><tr className="bg-slate-800"><th className="p-3 text-left text-slate-300">Escala</th><th className="p-3 text-left text-slate-300">Gelo</th><th className="p-3 text-left text-slate-300">Vapor</th><th className="p-3 text-left text-slate-300">Zero Abs.</th><th className="p-3 text-left text-slate-300">Uso</th></tr></thead>
                    <tbody>
                        {[
                            ["Celsius (°C)", "0°C", "100°C", "-273,15°C", "Cotidiano BR/EU"],
                            ["Fahrenheit (°F)", "32°F", "212°F", "-459,67°F", "EUA"],
                            ["Kelvin (K)", "273,15 K", "373,15 K", "0 K", "SI / Ciência"],
                        ].map((r, i) => (
                            <tr key={i} className={i % 2 === 0 ? "bg-slate-900/60" : "bg-slate-900/30"}>
                                {r.map((c, j) => <td key={j} className="p-3 text-slate-400 border-t border-slate-800">{c}</td>)}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="text-center text-slate-500">Próxima aula: Calor como Energia em Trânsito 🔥</p>
        </div>
    );
}

const SLIDES_A3 = [A3S1, A3S2, A3S3, A3S4, A3S5];
export function Fisica2Lesson3() {
    const [cur, setCur] = useState(0);
    const next = useCallback(() => setCur(p => Math.min(p + 1, SLIDES_A3.length - 1)), []);
    const prev = useCallback(() => setCur(p => Math.max(p - 1, 0)), []);
    useEffect(() => {
        const h = (e: KeyboardEvent) => { if (e.key === "ArrowRight") next(); if (e.key === "ArrowLeft") prev(); };
        window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
    }, [next, prev]);
    const C = SLIDES_A3[cur];
    return <Shell title="Aula 03 — Escalas Termométricas" aula="Aula 03" total={SLIDES_A3.length} current={cur} onPrev={prev} onNext={next}><C /></Shell>;
}
