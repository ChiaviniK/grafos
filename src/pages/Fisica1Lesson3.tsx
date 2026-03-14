import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Home, Zap, Target, TrendingUp, Maximize2 } from "lucide-react";
import { MUSimulator } from "../components/f1/MUSimulator";

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
                <button onClick={onNext} disabled={current === total - 1} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-30 text-white font-bold transition-all text-sm">
                    Próximo <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}

// ─── SLIDES ────────────────────────────────────────────────────────────────

const S1 = () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="mb-6 px-4 py-1 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-400 text-xs font-black tracking-widest uppercase text-center">
            Semana 03 · Física 1
        </div>
        <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">Movimento<br/><span className="text-violet-400 italic">Uniforme</span></h1>
        <p className="max-w-xl text-slate-400 text-xl leading-relaxed">
            Nada de freadas ou aceleradas. Aqui a velocidade é soberana e constante.
        </p>
        <div className="mt-12">
             <div className="px-6 py-3 bg-slate-900 border border-slate-800 rounded-2xl font-mono text-2xl text-violet-300">s = s₀ + v.t</div>
        </div>
    </div>
);

const S2 = () => (
    <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-3xl font-black flex items-center gap-4">
            <Zap className="text-amber-500" /> O que define o M.U.?
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-950/60 border-2 border-slate-800 rounded-3xl space-y-3">
                <div className="w-10 h-10 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center font-black">v</div>
                <h4 className="font-bold text-slate-200">Velocidade Constante</h4>
                <p className="text-xs text-slate-500">O módulo, a direção e o sentido da velocidade não mudam com o tempo.</p>
            </div>
            <div className="p-6 bg-slate-950/60 border-2 border-slate-800 rounded-3xl space-y-3">
                <div className="w-10 h-10 bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center font-black">a</div>
                <h4 className="font-bold text-slate-200">Aceleração Nula</h4>
                <p className="text-xs text-slate-500">Como a velocidade não muda, a aceleração escalar é sempre igual a zero.</p>
            </div>
        </div>
        <div className="p-6 bg-violet-500/5 border border-violet-500/20 rounded-2xl text-center">
            <p className="text-sm text-slate-300">"No Movimento Uniforme, o móvel percorre **distâncias iguais** em **intervalos de tempo iguais**."</p>
        </div>
    </div>
);

const S3 = () => (
    <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-3xl font-black">A Equação Horária: "Sorvete"</h2>
        <p className="text-slate-400">A posição ($s$) do móvel pode ser encontrada em qualquer instante ($t$) se soubermos onde ele começou ($s_0$) e sua velocidade ($v$).</p>
        <div className="p-10 bg-slate-900 border border-slate-800 rounded-[3rem] text-center font-mono relative overflow-hidden group">
            <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-500 via-transparent to-transparent" />
            <span className="text-7xl font-black text-white relative z-10">s = s₀ + v.t</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            <div className="p-3 bg-slate-800/30 rounded-xl"><span className="block font-black text-rose-400">s</span><span className="text-[10px] text-slate-500">Posição Final</span></div>
            <div className="p-3 bg-slate-800/30 rounded-xl"><span className="block font-black text-blue-400">s₀</span><span className="text-[10px] text-slate-500">Posição Inicial</span></div>
            <div className="p-3 bg-slate-800/30 rounded-xl"><span className="block font-black text-emerald-400">v</span><span className="text-[10px] text-slate-500">Velocidade</span></div>
            <div className="p-3 bg-slate-800/30 rounded-xl"><span className="block font-black text-amber-400">t</span><span className="text-[10px] text-slate-500">Tempo</span></div>
        </div>
    </div>
);

const S4 = () => {
    const [t, setT] = useState(0);
    const s0 = 20;
    const v = 5;
    const s = s0 + v * t;
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-3xl font-black">Prática: Calculando s</h2>
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1 space-y-4">
                    <div className="text-sm font-bold text-slate-500 uppercase">Valores Fixos:</div>
                    <div className="flex gap-4">
                        <div className="px-3 py-1 bg-slate-800 rounded border border-slate-700 text-xs">s₀ = 20m</div>
                        <div className="px-3 py-1 bg-slate-800 rounded border border-slate-700 text-xs">v = 5m/s</div>
                    </div>
                    <div className="space-y-2">
                         <div className="flex justify-between text-xs text-slate-400 font-bold"><span>TEMPO (t)</span> <span>{t}s</span></div>
                         <input type="range" min="0" max="10" value={t} onChange={(e) => setT(parseInt(e.target.value))} className="w-full" />
                    </div>
                </div>
                <div className="w-full md:w-64 aspect-square bg-slate-950 border-2 border-violet-500/30 rounded-full flex flex-col items-center justify-center p-6 text-center animate-in zoom-in-50">
                    <span className="text-[10px] font-black uppercase text-violet-400 mb-1">Resultado</span>
                    <span className="text-4xl font-black text-white">{s}m</span>
                    <p className="text-[10px] text-slate-500 mt-2 font-mono">20 + (5 × {t})</p>
                </div>
            </div>
        </div>
    );
};

const S5 = () => (
    <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-3xl font-black flex items-center gap-3">
            <TrendingUp className="text-emerald-500" /> Análise Gráfica: $s \times t$
        </h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="aspect-square bg-slate-900 border border-slate-800 rounded-2xl p-6 relative">
                 {/* CSS Based Graph */}
                 <div className="absolute left-10 bottom-10 w-px h-64 bg-slate-700" /> {/* y axis */}
                 <div className="absolute left-10 bottom-10 h-px w-64 bg-slate-700" /> {/* x axis */}
                 <div className="absolute left-10 bottom-24 w-64 h-px border-t border-dashed border-slate-800" />
                 <div className="absolute left-10 bottom-10 w-64 h-32 border-t-2 border-emerald-500 origin-bottom-left rotate-[-25deg]" />
                 <div className="absolute left-6 bottom-10 -translate-y-1/2 text-[10px] font-bold text-emerald-400">s₀</div>
                 <div className="absolute right-6 bottom-4 text-[10px] text-slate-600 font-mono">Tempo (t)</div>
                 <div className="absolute left-4 top-4 text-[10px] text-slate-600 font-mono">Espaço (s)</div>
            </div>
            <div className="space-y-6">
                 <p className="text-slate-400 text-lg">O gráfico da posição pelo tempo é sempre uma **RETA INCLINADA**.</p>
                 <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                    <h4 className="font-bold text-emerald-400">Inclinação da Reta</h4>
                    <p className="text-xs text-slate-500 mt-1">Quanto mais inclinada for a reta, **maior** é a velocidade do móvel.</p>
                 </div>
                 <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl">
                    <h4 className="font-bold text-rose-400">Reta Descendente?</h4>
                    <p className="text-xs text-slate-500 mt-1">Se a reta desce, a velocidade é **negativa** (movimento retrógrado).</p>
                 </div>
            </div>
        </div>
    </div>
);

const S6 = () => (
    <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-3xl font-black">O Gráfico $v \times t$</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="aspect-square bg-slate-900 border border-slate-800 rounded-2xl p-6 relative">
                 <div className="absolute left-10 bottom-10 w-px h-64 bg-slate-700" />
                 <div className="absolute left-10 bottom-10 h-px w-64 bg-slate-700" />
                 {/* Constant v line */}
                 <div className="absolute left-10 bottom-40 w-52 h-[30px] bg-sky-500/20" />
                 <div className="absolute left-10 bottom-40 w-52 h-px border-t-4 border-sky-400" />
                 <div className="absolute text-center" style={{ left: '100px', bottom: '25px' }}>
                      <span className="text-[10px] font-black text-sky-400">ÁREA = Δs</span>
                 </div>
            </div>
            <div className="space-y-4">
                <p className="text-slate-400">No M.U., a velocidade não muda, então o gráfico é uma **RETA HORIZONTAL**.</p>
                <div className="p-6 bg-sky-500/10 border border-sky-500/30 rounded-3xl">
                     <p className="text-sm font-bold text-sky-300">Propriedade Importante:</p>
                     <p className="text-xs text-slate-500 mt-2">A **ÁREA** sob o gráfico de velocidade versus tempo é numericamente igual ao **DESLOCAMENTO ($\Delta s$)** do móvel.</p>
                </div>
            </div>
        </div>
    </div>
);

const S7 = () => (
    <div className="max-w-4xl mx-auto">
        <div className="mb-4 flex items-center gap-3">
            <Maximize2 className="text-violet-500" />
            <h2 className="text-2xl font-black uppercase tracking-widest text-slate-400">Lab: Encontro de Móveis</h2>
        </div>
        <MUSimulator />
    </div>
);

const S8 = () => (
    <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-3xl font-black">Velocidade Relativa (v_rel)</h2>
        <p className="text-slate-400">Velocidade de um móvel em relação ao outro. Essencial para ultrapassagens.</p>
        <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
                 <div className="flex gap-2 mb-4">
                     <div className="w-8 h-2 bg-rose-500 rounded" />
                     <div className="w-8 h-2 bg-rose-500 rounded translate-x-4" />
                 </div>
                 <h4 className="font-bold text-rose-400">Mesmo Sentido</h4>
                 <p className="text-xs text-slate-500 mt-2">Subtraímos os módulos:</p>
                 <div className="text-lg font-mono font-black mt-2">v_rel = |vA - vB|</div>
            </div>
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
                 <div className="flex gap-2 mb-4">
                     <div className="w-8 h-2 bg-blue-500 rounded" />
                     <div className="w-8 h-2 bg-blue-500 rounded rotate-180 translate-x-12" />
                 </div>
                 <h4 className="font-bold text-blue-400">Sentidos Opostos</h4>
                 <p className="text-xs text-slate-500 mt-2">Somamos os módulos:</p>
                 <div className="text-lg font-mono font-black mt-2">v_rel = |vA + vB|</div>
            </div>
        </div>
    </div>
);

const S9 = () => {
    const [ans, setAns] = useState<number | null>(null);
    return (
        <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
                <Target className="text-rose-500 w-5 h-5" />
                <span className="text-[10px] font-black tracking-widest uppercase text-slate-500">Desafio de Logística</span>
            </div>
            <h2 className="text-2xl font-bold mb-6">Dois carros, A (80 km/h) e B (110 km/h), viajam no mesmo sentido em uma estrada. Qual a velocidade de B em relação a A?</h2>
            <div className="space-y-3">
                {["190 km/h", "30 km/h", "110 km/h", "80 km/h"].map((opt, i) => (
                    <button key={i} onClick={() => setAns(i)} className={`w-full p-4 rounded-xl border-2 text-left transition-all ${ans === i ? (i === 1 ? 'border-emerald-500 bg-emerald-950/20' : 'border-rose-500 bg-rose-950/20') : 'border-slate-800 hover:border-slate-700'}`}>
                        {opt}
                    </button>
                ))}
            </div>
            {ans !== null && (
                <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-sm italic">
                    {ans === 1 ? "✅ Correto! Como estão no mesmo sentido, subtraímos: 110 - 80 = 30 km/h." : "❌ Quase. Como estão no mesmo sentido, as velocidades 'se descontam'."}
                </div>
            )}
        </div>
    );
};

const S10 = () => (
    <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-3xl font-black text-violet-400">Frenagem Progressiva?</h2>
        <p className="text-slate-400 text-lg">No M.U., não existe frenagem. Se a velocidade é constante, o carro nunca para (até que uma força externa atue).</p>
        <div className="p-8 bg-slate-950 border border-slate-800 rounded-3xl flex items-center justify-center">
             <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center font-black opacity-20">STOP</div>
                  <div className="w-2 h-2 bg-violet-500 rounded-full animate-ping" />
                  <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center font-black">GO</div>
             </div>
        </div>
        <p className="text-xs text-center text-slate-500 italic">"M.U. é ideal para cruzeiros em rodovias ou satélites em órbitas específicas (cinemática escalar)."</p>
    </div>
);

const S11 = () => (
    <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-3xl font-black">Problemas de Encontro</h2>
        <p className="text-slate-400">Para resolver o encontro de dois móveis, você deve:</p>
        <div className="space-y-4">
             <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex gap-4">
                 <div className="text-violet-500 font-black">01</div>
                 <p className="text-sm">Montar a equação de cada móvel ($s_A$ e $s_B$).</p>
             </div>
             <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex gap-4">
                 <div className="text-violet-500 font-black">02</div>
                 <p className="text-sm">Igualar as posições: **$s_A = s_B$**.</p>
             </div>
             <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex gap-4">
                 <div className="text-violet-500 font-black">03</div>
                 <p className="text-sm">Isolar o tempo ($t$) para achar o instante do encontro.</p>
             </div>
             <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex gap-4">
                 <div className="text-violet-500 font-black">04</div>
                 <p className="text-sm">Substituir o $t$ em qualquer uma das equações para achar a posição.</p>
             </div>
        </div>
    </div>
);

const S12 = () => (
    <div className="max-w-3xl mx-auto py-10">
        <h2 className="text-4xl font-black mb-8 text-center text-rose-500">M.U. na Prática: Trens</h2>
        <div className="p-6 bg-slate-900 border-2 border-slate-800 rounded-3xl">
            <p className="text-sm text-slate-400 leading-relaxed">
                Um trem de 100m atravessa um túnel de 400m a uma velocidade constante de 20 m/s. Quanto tempo dura a travessia total?
            </p>
            <div className="mt-6 flex flex-col gap-2">
                 <div className="text-[10px] uppercase font-bold text-slate-600">Dica:</div>
                 <p className="text-xs italic text-slate-500">No M.U., para corpos extensos, o deslocamento total é a soma do corpo + o obstáculo.</p>
                 <div className="mt-4 p-4 bg-slate-950 rounded-xl font-mono text-center">
                      <span className="text-white">Δs = 100 + 400 = 500m</span><br/>
                      <span className="text-violet-400">Δt = 500 / 20 = 25 segundos</span>
                 </div>
            </div>
        </div>
    </div>
);

const S13 = () => (
    <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-emerald-500/10 border border-emerald-500/30 p-2 w-fit rounded text-[10px] uppercase font-black text-emerald-500">ENEM Insight</div>
        <h2 className="text-3xl font-black">Como o M.U. cai na prova?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
                 <h4 className="font-bold mb-2">Leitura de Gráficos</h4>
                 <p className="text-xs text-slate-500">Cuidado com as unidades nos eixos! O gráfico $s \times t$ muitas vezes vem com minutos no tempo para você converter.</p>
             </div>
             <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
                 <h4 className="font-bold mb-2">Simultaneidade</h4>
                 <p className="text-xs text-slate-500">Questões de perseguição policial ou encontro de veículos de carga são muito frequentes.</p>
             </div>
        </div>
    </div>
);

const S14 = () => {
    const [ans, setAns] = useState<number | null>(null);
    return (
        <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-black mb-6">Em um gráfico $s \times t$, se a reta é paralela ao eixo do tempo, o móvel está:</h2>
            <div className="grid grid-cols-1 gap-3">
                {["Em Movimento Acelerado", "Em Repouso", "Em Movimento Retrógrado", "Em Movimento Variado"].map((opt, i) => (
                    <button key={i} onClick={() => setAns(i)} className={`p-4 rounded-xl border-2 text-left transition-all ${ans === i ? (i === 1 ? 'border-emerald-500 bg-emerald-950/20' : 'border-rose-500 bg-rose-950/20') : 'border-slate-800 bg-slate-900/50 hover:border-slate-600'}`}>
                        {opt}
                    </button>
                ))}
            </div>
            {ans !== null && (
                <div className="mt-4 text-center font-bold text-emerald-400">
                    {ans === 1 ? "✅ Correto! Se a posição não muda (reta horizontal no gráfico s x t), o móvel está parado." : "❌ Revise o gráfico s x t. Se a posição é constante, a velocidade é zero."}
                </div>
            )}
        </div>
    );
};

const S15 = () => (
    <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-3xl font-black mb-8">Resumo Visual</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-center">
                  <div className="text-violet-500 text-xl font-black mb-2">M.U.</div>
                  <p className="text-[10px] text-slate-500 uppercase">Velocidade Constante</p>
             </div>
             <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-center">
                  <div className="text-violet-500 text-xl font-black mb-2">a = 0</div>
                  <p className="text-[10px] text-slate-500 uppercase">Aceleração Nula</p>
             </div>
             <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-center">
                  <div className="text-violet-500 text-xl font-black mb-2">Sorvete</div>
                  <p className="text-[10px] text-slate-500 uppercase">s = s₀ + v.t</p>
             </div>
             <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-center">
                  <div className="text-violet-500 text-xl font-black mb-2">Gráfico</div>
                  <p className="text-[10px] text-slate-500 uppercase">Reta Inclinada</p>
             </div>
        </div>
        <div className="mt-10 p-6 bg-slate-900/50 border border-slate-800 rounded-3xl">
             <p className="text-sm text-center text-slate-400">"O domínio do Movimento Uniforme é o primeiro degrau para entender fenômenos mais complexos da mecânica."</p>
        </div>
    </div>
);

const S16 = () => (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <div className="w-20 h-20 bg-violet-600/20 text-violet-500 rounded-full flex items-center justify-center mb-6">
            <TrendingUp className="w-10 h-10" />
        </div>
        <h2 className="text-5xl font-black mb-4 tracking-tighter">Missão Completa!</h2>
        <p className="text-slate-400 mb-8 max-w-sm">Semana que vem, as coisas ficam mais rápidas: **Movimento Uniformemente Variado (M.U.V.)**.</p>
        <div className="flex gap-4">
             <Link to="/fisica1" className="px-8 py-3 bg-slate-900 border border-slate-700 rounded-2xl font-bold hover:bg-slate-800 transition-all">Sair da Aula</Link>
             <button onClick={() => window.location.reload()} className="px-8 py-3 bg-violet-600 rounded-2xl font-bold hover:bg-violet-500 transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)]">Reiniciar</button>
        </div>
    </div>
);

const SLIDES = [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, S14, S15, S16];

export function Fisica1Lesson3() {
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
            title="Aula 03 — Movimento Uniforme (M.U.)" 
            aula="Semana 03" 
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
