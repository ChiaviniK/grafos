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

// ── AULA 05: Unidades SI ─────────────────────────────────────────────────────
function A5S1() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center animate-in fade-in zoom-in duration-700 relative">
            <div className="absolute inset-0 opacity-10 rounded-3xl" style={{ backgroundImage: "url('/sprites/backgrounds/5/2304x1296.png')", backgroundSize: "cover", imageRendering: "pixelated" }} />
            <div className="relative z-10">
                <img src="/sprites/3 Dude_Monster/Dude_Monster_Idle_4.png" alt="" className="w-16 h-16 mx-auto mb-6 object-contain" style={{ imageRendering: "pixelated" }} />
                <span className="bg-rose-500/20 text-rose-400 font-bold px-3 py-1 rounded-full text-xs tracking-widest border border-rose-500/30">FÍSICA 1 · AULA 05</span>
                <h1 className="text-5xl md:text-6xl font-black text-white my-4 leading-none">Unidades de<br /><span className="text-green-400">Medida & SI</span></h1>
                <p className="text-xl text-slate-400 max-w-xl mx-auto">Sistema Internacional — a língua universal da ciência e da engenharia.</p>
            </div>
        </div>
    );
}

function A5S2() {
    const units = [
        { qty: "Comprimento", unit: "metro", sym: "m", icon: "📏" },
        { qty: "Massa", unit: "quilograma", sym: "kg", icon: "⚖️" },
        { qty: "Tempo", unit: "segundo", sym: "s", icon: "⏱️" },
        { qty: "Temperatura", unit: "kelvin", sym: "K", icon: "🌡️" },
        { qty: "Corrente Elétrica", unit: "ampere", sym: "A", icon: "⚡" },
        { qty: "Intensidade Luminosa", unit: "candela", sym: "cd", icon: "💡" },
        { qty: "Quantidade de Matéria", unit: "mol", sym: "mol", icon: "⚗️" },
    ];
    const [revealed, setRevealed] = useState<Record<number, boolean>>({});
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-3">As 7 Grandezas Fundamentais do SI</h2>
            <p className="text-slate-400 text-xl mb-6">Clique em cada grandeza para revelar sua unidade e símbolo:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {units.map((u, i) => (
                    <button key={i} onClick={() => setRevealed(p => ({ ...p, [i]: !p[i] }))} className={`p-4 rounded-2xl border-2 text-left transition-all ${revealed[i] ? "border-green-500 bg-green-950/30" : "border-slate-700 bg-slate-900 hover:border-slate-500"}`}>
                        <div className="flex items-center gap-3 mb-1"><span className="text-2xl">{u.icon}</span><span className="font-bold text-slate-200">{u.qty}</span></div>
                        {revealed[i] && <div className="mt-2 animate-in fade-in"><span className="text-green-400 font-black text-lg">{u.sym}</span><span className="text-slate-400 text-sm"> = {u.unit}</span></div>}
                    </button>
                ))}
            </div>
        </div>
    );
}

function A5S3() {
    const [val, setVal] = useState("");
    const [from, setFrom] = useState("km");
    const [to, setTo] = useState("m");
    const toMeters: Record<string, number> = { km: 1000, m: 1, cm: 0.01, mm: 0.001 };
    const result = val ? (parseFloat(val) * toMeters[from] / toMeters[to]).toFixed(4) : "";
    return (
        <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-3">🔄 Conversor de Unidades</h2>
            <p className="text-slate-400 text-xl mb-8">Pratique a conversão de unidades de comprimento:</p>
            <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8">
                <div className="flex flex-wrap gap-4 items-center justify-center mb-6">
                    <input type="number" value={val} onChange={e => setVal(e.target.value)} placeholder="Digite o valor" className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-600 text-white text-lg w-48 focus:outline-none focus:border-green-500 transition-colors" />
                    <select value={from} onChange={e => setFrom(e.target.value)} className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-600 text-white text-lg focus:outline-none focus:border-green-500">
                        {Object.keys(toMeters).map(k => <option key={k} value={k}>{k}</option>)}
                    </select>
                    <span className="text-slate-400 text-2xl">→</span>
                    <select value={to} onChange={e => setTo(e.target.value)} className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-600 text-white text-lg focus:outline-none focus:border-green-500">
                        {Object.keys(toMeters).map(k => <option key={k} value={k}>{k}</option>)}
                    </select>
                </div>
                {result && (
                    <div className="text-center animate-in fade-in"><span className="text-5xl font-black text-green-400">{result} {to}</span></div>
                )}
                <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                    {["1 km = 1.000 m", "1 m = 100 cm", "1 cm = 10 mm", "1 km = 1.000.000 mm"].map((r, i) => (
                        <div key={i} className="bg-slate-800 rounded-xl px-3 py-2 text-slate-400 text-center font-mono">{r}</div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function A5S4() {
    const [ans, setAns] = useState<number | null>(null);
    const correct = 2;
    const opts = ["°C (graus Celsius).", "°F (graus Fahrenheit).", "K (kelvin).", "J (joule)."];
    return (
        <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
            <span className="text-xs font-black tracking-widest text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">QUIZ</span>
            <h2 className="text-2xl font-black text-slate-100 mt-4 mb-6">Qual é a unidade de temperatura no Sistema Internacional (SI)?</h2>
            <div className="space-y-3 mb-4">
                {opts.map((o, i) => {
                    const cls = ans === null ? "border-slate-700 hover:border-slate-500 bg-slate-900" : i === correct ? "border-emerald-500 bg-emerald-950/30 text-emerald-100 scale-[1.01]" : ans === i ? "border-rose-500 bg-rose-950/30 opacity-70" : "border-slate-800 opacity-25";
                    return <button key={i} disabled={ans !== null} onClick={() => setAns(i)} className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex gap-3 ${cls}`}><span className="font-black">{["A", "B", "C", "D"][i]})</span><span>{o}</span></button>;
                })}
            </div>
            {ans !== null && <div className={`p-4 rounded-2xl animate-in slide-in-from-bottom-4 ${ans === correct ? "bg-emerald-900/30 border border-emerald-500/40 text-emerald-200" : "bg-rose-900/30 border border-rose-500/40 text-rose-200"}`}><strong>C ✅</strong> — O SI usa Kelvin (K). 0 K = -273,15°C (zero absoluto). Para converter: K = °C + 273,15.</div>}
        </div>
    );
}

function A5S5() {
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-100 mb-6">📝 Resumo — Aula 05</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
                {[
                    { icon: "🌍", t: "O que é o SI?", b: "Sistema Internacional de Unidades — padrão global adotado por países e ciência." },
                    { icon: "7️⃣", t: "7 Grandezas Base", b: "Comprimento (m), Massa (kg), Tempo (s), Temperatura (K), Corrente (A), Luminosidade (cd), Quantidade (mol)." },
                    { icon: "🔄", t: "Conversão", b: "Entre unidades dentro do mesmo sistema. Use fatores de conversão (× ou ÷ por potências de 10)." },
                    { icon: "💻", t: "Conexão com TI", b: "Bits, bytes, Hertz, Watts — todas as unidades da tecnologia seguem o SI ou são derivadas dele." },
                ].map((c, i) => (
                    <div key={i} className="bg-slate-900 border border-slate-700 rounded-2xl p-5 hover:border-green-500/30 transition-all">
                        <span className="text-3xl">{c.icon}</span>
                        <h3 className="font-bold text-slate-100 my-1">{c.t}</h3>
                        <p className="text-slate-400 text-sm">{c.b}</p>
                    </div>
                ))}
            </div>
            <p className="text-center text-slate-500">Próxima aula: Cinemática — Espaço e Tempo ⏱️</p>
        </div>
    );
}

const SLIDES_A5 = [A5S1, A5S2, A5S3, A5S4, A5S5];
export function Fisica1Lesson5() {
    const [cur, setCur] = useState(0);
    const next = useCallback(() => setCur(p => Math.min(p + 1, SLIDES_A5.length - 1)), []);
    const prev = useCallback(() => setCur(p => Math.max(p - 1, 0)), []);
    useEffect(() => {
        const h = (e: KeyboardEvent) => { if (e.key === "ArrowRight") next(); if (e.key === "ArrowLeft") prev(); };
        window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
    }, [next, prev]);
    const C = SLIDES_A5[cur];
    return <Shell title="Aula 05 — Unidades de Medida e SI" aula="Aula 05" total={SLIDES_A5.length} current={cur} onPrev={prev} onNext={next}><C /></Shell>;
}
