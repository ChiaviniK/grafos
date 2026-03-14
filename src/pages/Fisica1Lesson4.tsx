import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Home, Zap, Target, TrendingUp, Maximize2, BarChart3, Clock, Info } from "lucide-react";
import { MUVSimulator } from "../components/f1/MUVSimulator";

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
            Semana 04 · Física 1
        </div>
        <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">Movimento<br/><span className="text-emerald-400 italic">Variado (M.U.V.)</span></h1>
        <p className="max-w-xl text-slate-400 text-xl leading-relaxed">
            Agora a velocidade muda. O corpo acelera ou freia. Bem-vindo ao mundo real da aceleração constante.
        </p>
        <div className="mt-12 flex gap-4">
             <div className="px-6 py-3 bg-slate-900 border border-slate-800 rounded-2xl font-mono text-xl text-emerald-300">s = s₀ + v₀t + (at²)/2</div>
        </div>
    </div>
);

const S2 = () => (
    <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-3xl font-black flex items-center gap-4">
            <Zap className="text-amber-500" /> A alma do M.U.V.
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-950/60 border-2 border-slate-800 rounded-3xl space-y-3">
                <div className="w-10 h-10 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center font-black">v</div>
                <h4 className="font-bold text-slate-200">Velocidade Variável</h4>
                <p className="text-xs text-slate-500">A velocidade muda de forma uniforme ao longo do tempo. O móvel ganha ou perde m/s a cada segundo.</p>
            </div>
            <div className="p-6 bg-slate-950/60 border-2 border-slate-800 rounded-3xl space-y-3 border-emerald-500/30">
                <div className="w-10 h-10 bg-violet-500/10 text-violet-500 rounded-full flex items-center justify-center font-black">a</div>
                <h4 className="font-bold text-slate-200">Aceleração Constante</h4>
                <p className="text-xs text-slate-500">A aceleração ($\neq 0$) é a taxa fixa de mudança da velocidade. Ela não muda!</p>
            </div>
        </div>
        <div className="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl text-center">
            <p className="text-sm text-slate-300 italic">"No M.U.V., a velocidade varia em progressão aritmética."</p>
        </div>
    </div>
);

const S3 = () => (
    <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-3xl font-black">As Três Equações Sagradas</h2>
        <p className="text-slate-400 text-sm">Para dominar o M.U.V. você precisa dessas três ferramentas no seu cinto:</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-center space-y-3">
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Velocidade</span>
                 <div className="text-2xl font-black text-white">v = v₀ + a.t</div>
                 <p className="text-[10px] text-slate-500 italic">"Vi Vovô Até tarde"</p>
             </div>
             <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-center space-y-3 border-violet-500/30">
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Posição</span>
                 <div className="text-2xl font-black text-white">s = s₀ + v₀t + (at²)/2</div>
                 <p className="text-[10px] text-slate-500 italic">"Sorvetão"</p>
             </div>
             <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-center space-y-3">
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Sem Tempo</span>
                 <div className="text-2xl font-black text-white">v² = v₀² + 2a.Δs</div>
                 <p className="text-[10px] text-slate-500 italic">"Torricelli"</p>
             </div>
        </div>
    </div>
);

const S4 = () => (
    <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-3xl font-black">Aceleração Escalar Média ($a_m$)</h2>
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl text-center space-y-4">
             <div className="text-slate-400 text-lg">É a variação da velocidade dividido pelo tempo:</div>
             <div className="text-5xl font-black text-white font-mono">am = Δv / Δt</div>
             <div className="w-fit mx-auto px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-emerald-400 font-bold">Unidade: m/s²</div>
        </div>
        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/10 flex gap-3 text-xs text-slate-400 leading-relaxed">
             <Info className="w-4 h-4 text-blue-400 shrink-0" />
             Se uma aceleração é de 2 m/s², significa que a cada segundo a velocidade do objeto aumenta em 2 m/s.
        </div>
    </div>
);

const S5 = () => (
    <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-3xl font-black flex items-center gap-3">
            <TrendingUp className="text-emerald-500" /> Gráfico $v \times t$
        </h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="aspect-square bg-slate-900 border border-slate-800 rounded-2xl p-6 relative">
                 <div className="absolute left-10 bottom-10 w-px h-64 bg-slate-700" />
                 <div className="absolute left-10 bottom-10 h-px w-64 bg-slate-700" />
                 <div className="absolute left-10 bottom-24 w-60 h-px border-t-2 border-emerald-500 origin-bottom-left rotate-[-35deg]" />
                 <div className="absolute left-6 bottom-24 -translate-y-1/2 text-[10px] font-black text-emerald-400">v₀</div>
                 <div className="absolute right-6 bottom-4 text-[10px] text-slate-600 font-mono">Tempo (t)</div>
                 <div className="absolute left-4 top-4 text-[10px] text-slate-600 font-mono">Velocidade (v)</div>
            </div>
            <div className="space-y-6">
                 <p className="text-slate-400">No M.U.V., a velocidade varia linearmente. O gráfico é uma **RETA INCLINADA**.</p>
                 <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                    <h4 className="font-bold text-emerald-400">Tg(α) = aceleração</h4>
                    <p className="text-xs text-slate-500 mt-1">A inclinação da reta nos dá o valor da aceleração.</p>
                 </div>
                 <div className="p-4 bg-slate-500/10 border border-slate-800 rounded-xl">
                    <h4 className="font-bold text-slate-300">Área = Deslocamento</h4>
                    <p className="text-xs text-slate-500 mt-1">Assim como no M.U., a área sob a reta é o Δs.</p>
                 </div>
            </div>
        </div>
    </div>
);

const S6 = () => (
    <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-3xl font-black flex items-center gap-3">
             <BarChart3 className="text-violet-500" /> Gráfico $s \times t$
        </h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="aspect-square bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
                 <div className="absolute left-10 bottom-10 w-px h-64 bg-slate-700 font-mono" />
                 <div className="absolute left-10 bottom-10 h-px w-64 bg-slate-700" />
                 {/* Parabola approximation */}
                 <svg viewBox="0 0 100 100" className="absolute left-10 bottom-10 w-60 h-60 overflow-visible">
                      <path d="M 0 100 Q 50 100 100 0" fill="none" stroke="#8b5cf6" strokeWidth="2" />
                 </svg>
                 <div className="absolute right-6 bottom-4 text-[10px] text-slate-600 font-mono">t</div>
                 <div className="absolute left-4 top-4 text-[10px] text-slate-600 font-mono">s</div>
            </div>
            <div className="space-y-6">
                 <p className="text-slate-400">Como o tempo está ao quadrado ($t^2$), a posição varia em uma **PARÁBOLA**.</p>
                 <div className="p-4 bg-violet-500/10 border border-violet-500/30 rounded-xl">
                    <h4 className="font-bold text-violet-400">Concavidade</h4>
                    <p className="text-xs text-slate-500 mt-1">Se a parábola sorri (para cima), a {'>'} 0. Se está triste, a {'<'} 0.</p>
                 </div>
                 <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl">
                    <h4 className="font-bold text-rose-400">Vértice</h4>
                    <p className="text-xs text-slate-500 mt-1">Onde a curva muda de direção é onde o móvel para e inverte o sentido.</p>
                 </div>
            </div>
        </div>
    </div>
);

const S7 = () => (
    <div className="max-w-4xl mx-auto">
        <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <Maximize2 className="text-violet-500" />
                <h2 className="text-2xl font-black uppercase tracking-widest text-slate-400">Sandbox de M.U.V.</h2>
            </div>
        </div>
        <MUVSimulator />
    </div>
);

const S8 = () => (
    <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-3xl font-black">Classificação do Movimento</h2>
        <p className="text-slate-400">Dependendo se o móvel acelera ou freia:</p>
        <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-emerald-950/20 border border-emerald-500/20 rounded-2xl group hover:border-emerald-500/50 transition-all">
                 <h4 className="font-black text-emerald-400 text-xl mb-2">ACELERADO</h4>
                 <p className="text-xs text-slate-500 leading-relaxed mb-4">A velocidade aumenta em módulo. Os vetores v e a apontam para o **MESMO SENTIDO**.</p>
                 <div className="flex gap-2">
                      <div className="w-12 h-1 bg-emerald-500" />
                      <div className="w-6 h-1 bg-violet-500" />
                 </div>
            </div>
            <div className="p-6 bg-rose-950/20 border border-rose-500/20 rounded-2xl group hover:border-rose-500/50 transition-all">
                 <h4 className="font-black text-rose-400 text-xl mb-2">RETARDADO</h4>
                 <p className="text-xs text-slate-500 leading-relaxed mb-4">O móvel está freando. Os vetores v e a apontam para **SENTIDOS OPOSTOS**.</p>
                 <div className="flex gap-2 items-center">
                      <div className="w-12 h-1 bg-emerald-500" />
                      <div className="w-6 h-1 bg-rose-500 rotate-180" />
                 </div>
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
                <span className="text-[10px] font-black tracking-widest uppercase text-slate-500">Questão Rápida</span>
            </div>
            <h2 className="text-2xl font-bold mb-6">Um carro se move com $v = -10$ m/s e aceleração $a = -2$ m/s². Como esse movimento é classificado?</h2>
            <div className="space-y-3">
                {["Progressivo Acelerado", "Retrógrado Acelerado", "Retrógrado Retardado", "Progressivo Retardado"].map((opt, i) => (
                    <button key={i} onClick={() => setAns(i)} className={`w-full p-4 rounded-xl border-2 text-left transition-all ${ans === i ? (i === 1 ? 'border-emerald-500 bg-emerald-950/20' : 'border-rose-500 bg-rose-950/20') : 'border-slate-800 hover:border-slate-700'}`}>
                        {opt}
                    </button>
                ))}
            </div>
            {ans !== null && (
                <div className="mt-6 p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-xl text-sm italic">
                    {ans === 1 ? "✅ Correto! Retrógrado porque v < 0, e Acelerado porque v e a têm o mesmo sinal!" : "❌ Quase. Olhe os sinais: se v e a têm o mesmo sinal, o módulo da velocidade aumenta (Acelerado)."}
                </div>
            )}
        </div>
    );
};

const S10 = () => (
    <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-3xl font-black text-amber-400">Equação de Torricelli</h2>
        <div className="p-8 bg-slate-900 border-2 border-amber-500/20 rounded-[3rem] text-center space-y-4">
             <p className="text-slate-400">"Quem não tem tempo, usa Torricelli." Use-a quando o problema **não informar o tempo ($t$)**.</p>
             <div className="text-5xl font-black text-white py-4 font-mono">v² = v₀² + 2a.Δs</div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
             <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-1">
                  <span className="text-amber-500 font-bold">EXEMPLO 1:</span>
                  <p>Um carro freia até parar (v=0) em 50m com desaceleração de 4 m/s². Qual era a v₀?</p>
             </div>
             <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-1">
                  <span className="text-amber-500 font-bold">CÁLCULO:</span>
                  <p>0² = v₀² + 2(-4)(50) $\Rightarrow$ v₀² = 400 $\Rightarrow$ v₀ = 20 m/s</p>
             </div>
        </div>
    </div>
);

const S11 = () => (
    <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center gap-3"><Clock className="text-rose-500" /><h2 className="text-3xl font-black">Movimento em Retrocesso</h2></div>
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl relative overflow-hidden">
             <p className="text-slate-400 leading-relaxed max-w-lg relative z-10 text-lg">
                Imagine um objeto lançado para cima. Ele sobe perdendo velocidade (retrógrado retardado), para no topo ($v=0$) e volta caindo e ganhando velocidade (progressivo acelerado).
             </p>
             <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-rose-500/10 to-transparent" />
        </div>
        <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-black tracking-widest">
             <div className="p-3 bg-rose-500/10 rounded-xl">SUBIDA: v e a opostos</div>
             <div className="p-3 bg-slate-800 rounded-xl">TOPO: v = 0</div>
             <div className="p-3 bg-emerald-500/10 rounded-xl">DESCIDA: v e a iguais</div>
        </div>
    </div>
);

const S12 = () => (
    <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-3xl font-black">Velocidade Média no M.U.V.</h2>
        <p className="text-slate-400">Truque ninja para provas de múltipla escolha:</p>
        <div className="p-8 bg-slate-900 border border-emerald-500/20 rounded-3xl text-center">
             <p className="text-lg text-slate-300 mb-4">A velocidade média num intervalo de tempo é a **Média Aritmética** das velocidades inicial e final.</p>
             <div className="text-4xl font-black text-emerald-400 font-mono">Vm = (v₀ + v) / 2</div>
        </div>
        <div className="p-4 bg-slate-500/5 border border-slate-800 rounded-xl text-[10px] text-center text-slate-500 uppercase tracking-widest">
             Apenas válido para Movimento Uniformemente Variado!
        </div>
    </div>
);

const S13 = () => (
    <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-emerald-500/10 border border-emerald-500/30 p-2 w-fit rounded text-[10px] uppercase font-black text-emerald-500 tracking-widest">Dicas ENEM</div>
        <h2 className="text-3xl font-black">Armadilhas Comuns</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
             <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl border-l-4 border-l-rose-500">
                  <h4 className="font-bold mb-2">Unidades Misturadas</h4>
                  <p className="text-slate-500">O ENEM adora dar a aceleração em m/s² e o tempo em minutos. **Sempre converta primeiro!**</p>
             </div>
             <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl border-l-4 border-l-emerald-500">
                  <h4 className="font-bold mb-2">Referencial</h4>
                  <p className="text-slate-500">Defina o sentido positivo antes de começar. Se subir é +, a gravidade (que aponta para baixo) será negativa.</p>
             </div>
        </div>
    </div>
);

const S14 = () => {
    const [ans, setAns] = useState<number | null>(null);
    return (
        <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-black mb-6">Em um gráfico $v \times t$, a área sob a curva representa:</h2>
            <div className="grid grid-cols-1 gap-3">
                {["A aceleração", "O deslocamento (Δs)", "A força aplicada", "A posição inicial"].map((opt, i) => (
                    <button key={i} onClick={() => setAns(i)} className={`p-4 rounded-xl border-2 text-left transition-all ${ans === i ? (i === 1 ? 'border-emerald-500 bg-emerald-950/20' : 'border-rose-500 bg-rose-950/20') : 'border-slate-800 bg-slate-900/50 hover:border-slate-600'}`}>
                        {opt}
                    </button>
                ))}
            </div>
            {ans !== null && (
                <div className="mt-4 text-center font-bold text-emerald-400 animate-in fade-in">
                    {ans === 1 ? "✅ Correto! A área do gráfico de velocidade é sempre numericamente igual ao deslocamento." : "❌ Revise as propriedades gráficas. Inclinação = Aceleração, Área = Deslocamento."}
                </div>
            )}
        </div>
    );
};

const S15 = () => (
    <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-3xl font-black mb-8 text-center">Fórmulas Essenciais</h2>
        <div className="flex flex-wrap justify-center gap-4">
             <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-center w-40">
                  <div className="text-violet-500 text-xl font-black mb-2">a</div>
                  <p className="text-[10px] text-slate-500 uppercase">Δv / Δt</p>
             </div>
             <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-center w-40">
                  <div className="text-emerald-500 text-xl font-black mb-2">Vi Vovô</div>
                  <p className="text-[10px] text-slate-500 uppercase">v = v₀ + at</p>
             </div>
             <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-center w-40">
                  <div className="text-rose-500 text-xl font-black mb-2">Sorvetão</div>
                  <p className="text-[10px] text-slate-500 uppercase leading-tight text-center px-2">s = s₀+v₀t+at²/2</p>
             </div>
             <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-center w-40">
                  <div className="text-amber-500 text-xl font-black mb-2">Torricelli</div>
                  <p className="text-[10px] text-slate-500 uppercase">v² = v₀² + 2aΔs</p>
             </div>
        </div>
        <div className="mt-10 p-6 bg-slate-900/50 border border-slate-800 rounded-3xl">
             <p className="text-sm text-center text-slate-400">"Prepare-se: na próxima aula vamos aplicar tudo isso em queda livre e lançamentos."</p>
        </div>
    </div>
);

const S16 = () => (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <div className="w-20 h-20 bg-emerald-600/20 text-emerald-500 rounded-full flex items-center justify-center mb-6">
            <TrendingUp className="w-10 h-10" />
        </div>
        <h2 className="text-5xl font-black mb-4 tracking-tighter text-white">M.U.V. Finalizado!</h2>
        <p className="text-slate-400 mb-8 max-w-sm">Você dominou a arte da aceleração constante. Próximo passo: **Lançamentos e Queda Livre**.</p>
        <div className="flex gap-4">
             <Link to="/fisica1" className="px-8 py-3 bg-slate-900 border border-slate-700 rounded-2xl font-bold hover:bg-slate-800 transition-all">Menu Principal</Link>
             <button onClick={() => window.location.reload()} className="px-8 py-3 bg-emerald-600 rounded-2xl font-bold hover:bg-emerald-500 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]">Reiniciar Aula</button>
        </div>
    </div>
);

const SLIDES = [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, S14, S15, S16];

export function Fisica1Lesson4() {
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
            title="Aula 04 — Movimento Uniformemente Variado (M.U.V.)" 
            aula="Semana 04" 
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
