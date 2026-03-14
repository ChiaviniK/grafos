import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Home, Zap, Target, Book, Info, Gauge, Trophy, AlertCircle } from "lucide-react";
import { VelocityRace } from "../components/f1/VelocityRace";

// ─── Shared lesson shell ───────────────────────────────────────────────────
function Shell({ title, aula, total, current, onPrev, onNext, children }: {
    title: string; aula: string; total: number; current: number;
    onPrev: () => void; onNext: () => void; children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-50 flex flex-col">
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
            <div className="flex-1 overflow-y-auto px-4 sm:px-8 md:px-16 py-8">
                {children}
            </div>
            <div className="flex justify-between items-center px-6 py-4 border-t border-slate-800 bg-slate-950/80 backdrop-blur shrink-0">
                <button onClick={onPrev} disabled={current === 0} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-700 text-slate-400 hover:border-slate-500 disabled:opacity-30 transition-all font-semibold text-sm">
                    <ChevronLeft className="w-4 h-4" /> Anterior
                </button>
                <span className="text-slate-600 text-[10px] uppercase font-bold tracking-widest hidden md:inline">{title}</span>
                <button onClick={onNext} disabled={current === total - 1} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-30 text-white font-bold transition-all text-sm">
                    Próximo <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}

// ─── SLIDES ────────────────────────────────────────────────────────────────

const S1 = () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="mb-6 px-4 py-1 bg-rose-500/10 border border-rose-500/20 rounded-full text-rose-400 text-xs font-black tracking-widest uppercase text-center">
            Semana 02 · Física 1
        </div>
        <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">Cinemática<br/><span className="text-emerald-400 italic">Escalar</span></h1>
        <p className="max-w-xl text-slate-400 text-xl leading-relaxed">
            Como descrever o movimento dos corpos sem se preocupar com o porquê eles se movem.
        </p>
        <div className="mt-12 flex gap-4">
             <div className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm font-bold text-slate-300">Δs · v · a · t</div>
        </div>
    </div>
);

const S2 = () => (
    <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-4xl font-black flex items-center gap-4">
            <Target className="text-rose-500" /> Repouso ou Movimento?
        </h2>
        <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-3xl">
            <p className="text-xl text-slate-300 italic mb-6">
                "Um corpo está em movimento quando sua posição muda em relação a um referencial ao longo do tempo."
            </p>
            <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl">
                    <h4 className="font-bold text-rose-400 mb-1">Passageiro no Ônibus</h4>
                    <p className="text-xs text-slate-500">Em repouso em relação ao motorista. Em movimento em relação a um poste na calçada.</p>
                </div>
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                    <h4 className="font-bold text-emerald-400 mb-1">Terra</h4>
                    <p className="text-xs text-slate-500">Você está parado agora? Em relação à Terra, sim. Em relação ao Sol, você voa a 30 km/s.</p>
                </div>
            </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-blue-500/10 rounded-2xl text-blue-400 text-sm">
            <Info className="shrink-0" />
            <p><strong>Conclusão:</strong> Movimento e repouso são conceitos **relativos**.</p>
        </div>
    </div>
);

const S3 = () => (
    <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-3xl font-black">Posição e Trajetória</h2>
        <p className="text-slate-400">Trajetória é o caminho percorrido por um móvel. Ela também depende do referencial.</p>
        <div className="grid md:grid-cols-2 gap-8">
            <div className="aspect-video bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center">
                 <div className="text-center">
                     <div className="w-4 h-4 bg-rose-500 rounded-full mx-auto mb-2 animate-bounce" />
                     <p className="text-[10px] text-slate-500 uppercase font-bold">Objeto caindo de um avião</p>
                     <p className="text-[8px] text-slate-600 mt-1">Piloto vê: Linha Reta | Solo vê: Parábola</p>
                 </div>
            </div>
            <div className="flex flex-col justify-center space-y-4">
                <div className="p-4 bg-slate-800/30 border border-slate-700 rounded-xl">
                    <h4 className="text-rose-400 font-bold">Ponto Material</h4>
                    <p className="text-xs text-slate-500">Dimensões desprezíveis para o cálculo (ex: um carro numa estrada de 500km).</p>
                </div>
                <div className="p-4 bg-slate-800/30 border border-slate-700 rounded-xl">
                    <h4 className="text-blue-400 font-bold">Corpo Extenso</h4>
                    <p className="text-xs text-slate-500">Dimensões importantes (ex: um trem atravessando uma ponte curta).</p>
                </div>
            </div>
        </div>
    </div>
);

const S4 = () => (
    <div className="max-w-3xl mx-auto text-center py-10">
        <h2 className="text-4xl font-black mb-8">O Espaço ($s$) e Deslocamento ($\Delta s$)</h2>
        <div className="p-8 bg-blue-500/10 border border-blue-500/30 rounded-3xl space-y-6 font-mono">
            <div className="flex justify-around items-center">
                <div>
                   <p className="text-xs text-slate-500 mb-1">Posição Inicial</p>
                   <span className="text-4xl font-black text-rose-400">S₀</span>
                </div>
                <div className="text-2xl text-slate-600">→</div>
                <div>
                   <p className="text-xs text-slate-500 mb-1">Posição Final</p>
                   <span className="text-4xl font-black text-emerald-400">S</span>
                </div>
            </div>
            <div className="pt-6 border-t border-slate-700/50">
                <p className="text-sm text-slate-400 mb-2">A VARIAÇÃO DO ESPAÇO</p>
                <div className="text-5xl font-black text-white">Δs = S - S₀</div>
            </div>
        </div>
    </div>
);

const S5 = () => (
    <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-3xl font-black">Distância Percorrida vs Deslocamento</h2>
        <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
                <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl border-l-4 border-l-rose-500">
                    <h4 className="font-bold text-rose-500">Distância (d)</h4>
                    <p className="text-sm text-slate-400">Total "andado" pelo odômetro. É sempre positiva.</p>
                </div>
                <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl border-l-4 border-l-blue-500">
                    <h4 className="font-bold text-blue-500">Deslocamento (Δs)</h4>
                    <p className="text-sm text-slate-400">Distância em linha reta entre início e fim. Pode ser zero!</p>
                </div>
            </div>
            <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 flex flex-col justify-center">
                <p className="text-sm text-slate-500 mb-4">💡 Exemplo Clássico:</p>
                <p className="text-lg">Se você dá uma volta completa numa pista circular de 400m:</p>
                <div className="mt-4 space-y-2">
                    <p className="text-rose-400 font-bold">Distância = 400m</p>
                    <p className="text-blue-400 font-bold">Deslocamento = 0m</p>
                </div>
            </div>
        </div>
    </div>
);

const S6 = () => (
    <div className="max-w-3xl mx-auto text-center space-y-10">
        <h2 className="text-4xl font-black text-emerald-400">Velocidade Média (Vₘ)</h2>
        <div className="p-10 bg-slate-900 border border-slate-800 rounded-full inline-block aspect-square flex items-center justify-center">
             <div className="flex flex-col items-center gap-1">
                 <span className="text-5xl font-black text-white">Vₘ = <div className="inline-block flex flex-col items-center"><span className="border-b border-white px-2">Δs</span><span>Δt</span></div></span>
             </div>
        </div>
        <p className="text-xl text-slate-400 leading-relaxed">
            É a razão entre a variação do espaço e o intervalo de tempo decorrido.
        </p>
    </div>
);

const S7 = () => (
    <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-black mb-8 flex items-center gap-4">
            <Gauge className="text-amber-500" /> Conversão de Unidades
        </h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
                <div className="p-6 bg-slate-900 border-2 border-slate-800 rounded-3xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10"><Zap className="w-16 h-16" /></div>
                    <div className="flex justify-between items-center font-black text-3xl">
                        <span className="text-rose-400">km/h</span>
                        <div className="flex flex-col items-center">
                             <div className="w-12 h-px bg-slate-700" />
                             <span className="text-xs text-slate-500 font-mono">÷ 3,6</span>
                             <div className="w-12 h-px bg-slate-700" />
                        </div>
                        <span className="text-emerald-400">m/s</span>
                    </div>
                </div>
                <div className="p-6 bg-slate-900 border-2 border-slate-800 rounded-3xl relative overflow-hidden group">
                     <div className="flex justify-between items-center font-black text-3xl">
                        <span className="text-emerald-400">m/s</span>
                        <div className="flex flex-col items-center">
                             <div className="w-12 h-px bg-slate-700" />
                             <span className="text-xs text-slate-500 font-mono">× 3,6</span>
                             <div className="w-12 h-px bg-slate-700" />
                        </div>
                        <span className="text-rose-400">km/h</span>
                    </div>
                </div>
            </div>
            <div className="p-6 bg-amber-500/5 border border-amber-500/20 rounded-2xl">
                 <h4 className="text-amber-500 font-bold mb-4 uppercase tracking-widest text-xs">Memorize estes:</h4>
                 <ul className="space-y-2 font-mono text-sm text-slate-400">
                     <li className="flex justify-between"><span>36 km/h</span> <span>= 10 m/s</span></li>
                     <li className="flex justify-between"><span>72 km/h</span> <span>= 20 m/s</span></li>
                     <li className="flex justify-between"><span>90 km/h</span> <span>= 25 m/s</span></li>
                     <li className="flex justify-between border-t border-slate-800 pt-2 font-black text-slate-200"><span>108 km/h</span> <span>= 30 m/s</span></li>
                 </ul>
            </div>
        </div>
    </div>
);

const S8 = () => (
    <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-3xl font-black">Velocidade Instantânea</h2>
        <p className="text-slate-400">Diferente da média, é a velocidade em um instante exato ($t$). É o que você vê no velocímetro do carro.</p>
        <div className="flex justify-center flex-wrap gap-8">
            <div className="w-48 h-48 rounded-full border-8 border-slate-800 bg-slate-950 flex flex-col items-center justify-center p-6 relative">
                 <div className="w-full h-1 bg-rose-500 absolute top-1/2 left-1/2 -translate-y-1/2 origin-left rotate-[45deg]" />
                 <span className="text-3xl font-black mt-10">120</span>
                 <span className="text-[10px] text-slate-500 uppercase font-black">km/h</span>
            </div>
            <div className="max-w-xs space-y-4">
                 <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <h4 className="font-bold text-rose-400 text-sm">Ponto Chave</h4>
                    <p className="text-xs text-slate-500 mt-1">Se a velocidade instantânea é constante, a velocidade média será igual à instantânea em qualquer intervalo.</p>
                 </div>
            </div>
        </div>
    </div>
);

const S9 = () => (
    <div className="max-w-4xl mx-auto">
        <div className="mb-4 flex items-center gap-3">
            <Trophy className="text-amber-500" />
            <h2 className="text-2xl font-black uppercase tracking-widest text-slate-400">Lab: Corrida de Velocidade</h2>
        </div>
        <VelocityRace />
    </div>
);

const S10 = () => (
    <div className="max-w-3xl mx-auto text-center space-y-8">
        <h2 className="text-4xl font-black text-rose-400">Aceleração Escalar Média (aₘ)</h2>
        <p className="text-slate-400 text-xl font-medium leading-relaxed">
            Indica o quanto a velocidade muda com o passar do tempo.
        </p>
        <div className="p-10 bg-slate-950 border border-slate-800 rounded-3xl inline-block">
             <span className="text-5xl font-black text-white">aₘ = <div className="inline-block flex flex-col items-center"><span className="border-b border-white px-2">Δv</span><span>Δt</span></div></span>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
                 <span className="text-xs text-slate-500 uppercase font-bold">Unidade SI</span>
                 <p className="text-xl font-black text-rose-400">m/s²</p>
            </div>
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center">
                 <p className="text-xs text-slate-400 italic">"Ganha-se X metros por segundo a cada segundo."</p>
            </div>
        </div>
    </div>
);

const S11 = () => (
    <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-3xl font-black">Classificação do Movimento (Sinal de V)</h2>
        <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl">
                 <h3 className="text-2xl font-bold text-emerald-400 mb-2">Progressivo</h3>
                 <p className="text-sm text-slate-400 mb-4">O móvel caminha no **mesmo sentido** da orientação da trajetória.</p>
                 <div className="font-mono text-xl font-black text-emerald-300">V {">"} 0</div>
            </div>
            <div className="p-6 bg-rose-500/10 border border-rose-500/30 rounded-2xl">
                 <h3 className="text-2xl font-bold text-rose-400 mb-2">Retrógrado</h3>
                 <p className="text-sm text-slate-400 mb-4">O móvel caminha no **sentido oposto** da orientação da trajetória.</p>
                 <div className="font-mono text-xl font-black text-rose-300">V {"<"} 0</div>
            </div>
        </div>
    </div>
);

const S12 = () => (
    <div className="max-w-4xl mx-auto space-y-8 font-sans">
        <h2 className="text-3xl font-black">Classificação por Variação (V vs a)</h2>
        <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl relative overflow-hidden group">
                 <div className="absolute -right-4 -top-4 w-16 h-16 bg-blue-500/20 rotate-12" />
                 <h3 className="text-xl font-bold text-white mb-2">Acelerado</h3>
                 <p className="text-xs text-slate-500 mb-4">O módulo da velocidade **aumenta**. V e "a" têm o mesmo sinal.</p>
                 <div className="flex gap-2 font-mono text-xs">
                     <span className="bg-emerald-900/40 px-2 py-1 rounded">V(+), a(+)</span>
                     <span className="bg-emerald-900/40 px-2 py-1 rounded">V(-), a(-)</span>
                 </div>
            </div>
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl relative overflow-hidden group">
                 <div className="absolute -right-4 -top-4 w-16 h-16 bg-amber-500/20 rotate-12" />
                 <h3 className="text-xl font-bold text-white mb-2">Retardado</h3>
                 <p className="text-xs text-slate-500 mb-4">O módulo da velocidade **diminui**. V e "a" têm sinais opostos.</p>
                 <div className="flex gap-2 font-mono text-xs">
                     <span className="bg-rose-900/40 px-2 py-1 rounded">V(+), a(-)</span>
                     <span className="bg-rose-900/40 px-2 py-1 rounded">V(-), a(+)</span>
                 </div>
            </div>
        </div>
    </div>
);

const S13 = () => (
    <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-3xl font-black flex items-center gap-3">
             <AlertCircle className="text-rose-500" /> Cuidado: Aceleração Negativa
        </h2>
        <div className="p-8 bg-rose-500/5 border border-rose-500/20 rounded-3xl">
            <p className="text-xl leading-relaxed text-slate-300">
                Aceleração negativa nem sempre significa frenagem! 
            </p>
            <div className="mt-6 p-4 bg-slate-950 rounded-xl border border-slate-800">
                <p className="text-sm text-slate-400">
                    Se você está indo para a esquerda (V negativa) e acelera ainda mais para a esquerda (a negativa), o movimento é **Acelerado**.
                </p>
            </div>
        </div>
    </div>
);

const S14 = () => {
    const [ans, setAns] = useState<boolean | null>(null);
    return (
        <div className="max-w-3xl mx-auto">
            <div className="px-4 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-500 text-[10px] font-black uppercase tracking-widest w-fit mb-6">Questão ENEM 2012 (Adaptada)</div>
            <h2 className="text-2xl font-bold mb-6">Uma Ferrari parte do repouso e atinge 108 km/h em 3 segundos. Qual a sua aceleração média?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <button onClick={() => setAns(false)} className={`p-6 rounded-2xl border-2 transition-all ${ans === false ? 'border-rose-500 bg-rose-950/20' : 'border-slate-800 hover:border-slate-700'}`}>
                    <span className="block text-2xl font-black">36 m/s²</span>
                    <span className="text-[10px] text-slate-500 uppercase">Letra A</span>
                </button>
                <button onClick={() => setAns(true)} className={`p-6 rounded-2xl border-2 transition-all ${ans === true ? 'border-emerald-500 bg-emerald-950/20' : 'border-slate-800 hover:border-slate-700'}`}>
                    <span className="block text-2xl font-black">10 m/s²</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest">Letra B</span>
                </button>
            </div>
            {ans !== null && (
                <div className={`p-5 rounded-2xl ${ans ? 'bg-emerald-900/20 border border-emerald-500/30' : 'bg-rose-900/20 border border-rose-500/30'}`}>
                    <p className="text-sm font-medium">
                        {ans 
                            ? "✅ Boa! Primeiro convertemos 108 km/h para 30 m/s. Depois: 30 / 3 = 10 m/s²." 
                            : "❌ Quase! Você esqueceu de converter km/h para m/s primeiro. 108 km/h = 30 m/s."}
                    </p>
                </div>
            )}
        </div>
    );
};

const S15 = () => (
    <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-black mb-10 text-center">Resumo da Unidade</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {[
                 { label: 'Referencial', desc: 'Indispensável' },
                 { label: 'Deslocamento', desc: 'S - S₀' },
                 { label: 'Velocidade', desc: 'Δs / Δt' },
                 { label: 'Aceleração', desc: 'Δv / Δt' }
             ].map((item, i) => (
                 <div key={i} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-center">
                      <div className="text-rose-500 mb-2"><Book className="w-5 h-5 mx-auto" /></div>
                      <h5 className="text-[10px] font-black uppercase text-slate-300">{item.label}</h5>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                 </div>
             ))}
        </div>
    </div>
);

const S16 = () => (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <div className="w-20 h-20 bg-emerald-600/20 text-emerald-500 rounded-full flex items-center justify-center mb-6">
            <Zap className="w-10 h-10" />
        </div>
        <h2 className="text-5xl font-black mb-4 tracking-tighter">Missão Cumprida!</h2>
        <p className="text-slate-400 mb-8 max-w-sm">Você dominou os fundamentos da cinemática escalar. Prepare-se para o Movimento Uniforme (M.U.) na próxima aula.</p>
        <div className="flex gap-4">
             <Link to="/fisica1" className="px-8 py-3 bg-slate-900 border border-slate-700 rounded-2xl font-bold hover:bg-slate-800 transition-all">Sair</Link>
             <button onClick={() => window.location.reload()} className="px-8 py-3 bg-emerald-600 rounded-2xl font-bold hover:bg-emerald-500 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]">Reiniciar Aula</button>
        </div>
    </div>
);

const SLIDES = [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, S14, S15, S16];

export function Fisica1Lesson2() {
    const [cur, setCur] = useState(0);
    const next = useCallback(() => setCur(p => Math.min(p + 1, SLIDES.length - 1)), []);
    const prev = useCallback(() => setCur(p => Math.max(p - 1, 0)), []);
    
    useEffect(() => {
        const h = (e: KeyboardEvent) => { 
            if (e.key === "ArrowRight") next(); 
            if (e.key === "ArrowLeft") prev(); 
        };
        window.addEventListener("keydown", h); 
        return () => window.removeEventListener("keydown", h);
    }, [next, prev]);

    const C = SLIDES[cur];

    return (
        <Shell 
            title="Aula 02 — Cinemática Escalar" 
            aula="Semana 02" 
            total={SLIDES.length} 
            current={cur} 
            onPrev={prev} 
            onNext={next}
        >
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <C />
            </div>
        </Shell>
    );
}

