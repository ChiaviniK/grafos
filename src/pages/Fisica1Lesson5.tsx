import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Home, Zap, Target, Maximize2, ArrowDown, MoveUpRight, FastForward } from "lucide-react";
import { ProjectileSim } from "../components/f1/ProjectileSim";

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
                        <div key={i} className={`h-1.5 rounded-full transition-all ${i === current ? "w-6 bg-pink-500" : i < current ? "w-3 bg-slate-600" : "w-3 bg-slate-800"}`} />
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
                <button onClick={onNext} disabled={current === total - 1} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 disabled:opacity-30 text-white font-bold transition-all text-sm">
                    Próximo <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}

// ─── SLIDES ────────────────────────────────────────────────────────────────

const S1 = () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="mb-6 px-4 py-1 bg-pink-500/10 border border-pink-500/20 rounded-full text-pink-400 text-xs font-black tracking-widest uppercase text-center">
            Semana 05 · Física 1
        </div>
        <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">Gravidade e<br/><span className="text-blue-400 italic">Lançamentos</span></h1>
        <p className="max-w-xl text-slate-400 text-xl leading-relaxed">
            De Newton a projéteis balísticos. Como prever onde um objeto vai cair?
        </p>
        <div className="mt-12 flex flex-col items-center gap-2">
             <div className="px-6 py-3 bg-slate-900 border border-slate-800 rounded-2xl font-mono text-xl text-pink-400">g ≈ 10 m/s²</div>
             <p className="text-[10px] text-slate-600 uppercase font-black">A força que nos mantém no chão</p>
        </div>
    </div>
);

const S2 = () => (
    <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-3xl font-black flex items-center gap-4">
            <ArrowDown className="text-blue-400" /> A Queda Livre
        </h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
                <p className="text-slate-400 leading-relaxed">
                    É o movimento de um corpo abandonado de certa altura, onde a única força atuante é o seu **peso**.
                </p>
                <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-4">
                    <h4 className="text-sm font-bold text-pink-500">Regras de Ouro:</h4>
                    <ul className="text-xs text-slate-500 space-y-2">
                        <li className="flex gap-2"><span>-</span> Velocidade inicial ($v_0$) é zero.</li>
                        <li className="flex gap-2"><span>-</span> Desprezamos a resistência do ar.</li>
                        <li className="flex gap-2"><span>-</span> Aceleração = Gravidade ($g$).</li>
                    </ul>
                </div>
            </div>
            <div className="p-8 bg-slate-900 border border-slate-800 rounded-[3rem] text-center">
                 <div className="text-[10px] font-black text-slate-500 uppercase mb-4">Equação da Queda</div>
                 <div className="text-4xl font-black text-white font-mono">h = (gt²)/2</div>
                 <div className="text-[10px] text-slate-600 mt-2">Derivada do "Sorvetão" com v0 = 0</div>
            </div>
        </div>
    </div>
);

const S3 = () => (
    <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-3xl font-black">Lançamento Vertical</h2>
        <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-3xl">
             <p className="text-slate-300 text-lg italic">"Tudo o que sobe, desce."</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
             <div className="p-6 bg-rose-500/5 border border-rose-500/20 rounded-2xl">
                  <h4 className="font-bold text-rose-400 mb-2 flex items-center gap-2"><ArrowDown className="w-4 h-4 rotate-180" /> Subida</h4>
                  <p className="text-slate-500">Movimento Retardado. O objeto perde 10 m/s a cada segundo até parar no topo ($v=0$).</p>
             </div>
             <div className="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
                  <h4 className="font-bold text-emerald-400 mb-2 flex items-center gap-2"><ArrowDown className="w-4 h-4" /> Descida</h4>
                  <p className="text-slate-500">Movimento Acelerado. Após o topo, o objeto ganha 10 m/s a cada segundo.</p>
             </div>
        </div>
    </div>
);

const S4 = () => (
    <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-3xl font-black">Propriedades Simétricas</h2>
        <div className="bg-slate-950 border border-slate-800 p-8 rounded-3xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
             <div className="space-y-6 relative z-10">
                  <div className="flex gap-4">
                      <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center font-black text-pink-500 border border-slate-800">1</div>
                      <p className="text-slate-400"><strong className="text-white">Tempo de Voo:</strong> O tempo que leva para subir é o mesmo que leva para voltar ao ponto de partida.</p>
                  </div>
                  <div className="flex gap-4">
                      <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center font-black text-pink-500 border border-slate-800">2</div>
                      <p className="text-slate-400"><strong className="text-white">Velocidade:</strong> Em uma mesma altura, a velocidade de subida é igual (em módulo) à velocidade de descida.</p>
                  </div>
             </div>
        </div>
    </div>
);

const S5 = () => (
    <div className="max-w-4xl mx-auto space-y-8 text-center px-4">
        <div className="w-20 h-20 bg-blue-500/10 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <MoveUpRight className="w-10 h-10" />
        </div>
        <h2 className="text-4xl font-black">Lançamento Oblíquo</h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A união perfeita: Um projétil lançado com ângulo faz dois movimentos ao mesmo tempo.
        </p>
        <div className="flex justify-center gap-8 mt-12 font-black">
             <div className="text-center group">
                 <div className="w-32 h-32 bg-slate-900 border-2 border-slate-800 rounded-3xl flex flex-col items-center justify-center group-hover:border-blue-500 transition-all">
                    <span className="text-2xl text-blue-400">M.U.</span>
                    <span className="text-[10px] text-slate-600 uppercase">Eixo X</span>
                 </div>
                 <p className="mt-2 text-xs text-slate-500">Horizontal</p>
             </div>
             <div className="flex items-center text-slate-800 text-2xl">+</div>
             <div className="text-center group">
                 <div className="w-32 h-32 bg-slate-900 border-2 border-slate-800 rounded-3xl flex flex-col items-center justify-center group-hover:border-pink-500 transition-all">
                    <span className="text-2xl text-pink-500">M.U.V.</span>
                    <span className="text-[10px] text-slate-600 uppercase">Eixo Y</span>
                 </div>
                 <p className="mt-2 text-xs text-slate-500">Vertical</p>
             </div>
        </div>
    </div>
);

const S6 = () => (
    <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-3xl font-black">Decomposição de Velocidade</h2>
        <p className="text-slate-400">Antes de resolver, "quebre" a velocidade inicial ($v_0$):</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl text-center space-y-2">
                  <div className="text-2xl font-black text-blue-400">v₀x = v₀ . cos(θ)</div>
                  <p className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">Nunca muda durante o voo</p>
             </div>
             <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl text-center space-y-2">
                  <div className="text-2xl font-black text-pink-400">v₀y = v₀ . sen(θ)</div>
                  <p className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">Muda 10 m/s a cada segundo</p>
             </div>
        </div>
        <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl text-xs text-amber-200/60 leading-relaxed italic">
            Obs: No topo da trajetória, a velocidade vertical ($v_y$) é zero, mas a velocidade horizontal ($v_x$) continua existindo! O projétil não para no topo.
        </div>
    </div>
);

const S7 = () => (
    <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex items-center gap-3">
             <Maximize2 className="text-pink-500" />
             <h2 className="text-xl font-black uppercase tracking-widest text-slate-400 whitespace-nowrap">Laboratório de Balística</h2>
        </div>
        <ProjectileSim />
    </div>
);

const S8 = () => (
    <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-3xl font-black">Tempo de Subida ($t_s$)</h2>
        <div className="bg-slate-950 border border-slate-800 p-8 rounded-[3rem] text-center">
             <p className="text-slate-400 mb-6 italic">É o tempo para a $v_y$ chegar a zero:</p>
             <div className="text-5xl font-black text-white font-mono">ts = v₀y / g</div>
             <p className="text-xs text-slate-600 mt-4 uppercase font-bold tracking-tighter">Tempo de voo TOTAL = 2 x ts</p>
        </div>
    </div>
);

const S9 = () => (
    <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-3xl font-black">Alcance Máximo ($A$)</h2>
        <div className="bg-slate-950 border border-slate-800 p-8 rounded-[3rem] text-center">
             <p className="text-slate-400 mb-6 italic">Distância horizontal percorrida até atingir o mesmo nível de lançamento:</p>
             <div className="text-5xl font-black text-white font-mono">A = v₀x . t_voo</div>
             <p className="text-xs text-slate-600 mt-4 uppercase font-bold">No eixo X não há aceleração! (v = d/t)</p>
        </div>
        <div className="flex justify-center">
             <div className="px-6 py-3 bg-pink-500/10 border border-pink-500/30 rounded-full flex gap-3 text-xs text-pink-300 items-center">
                <Target className="w-4 h-4" />
                Dica ENEM: O alcance máximo ocorre no ângulo de 45°.
             </div>
        </div>
    </div>
);

const S10 = () => (
    <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-3xl font-black">Ângulos Complementares</h2>
        <div className="p-10 bg-slate-900 border border-slate-800 rounded-3xl flex flex-col md:flex-row gap-10 items-center">
             <div className="flex-1 space-y-4">
                  <p className="text-slate-400 leading-relaxed text-lg">
                    Dois ângulos que somados dão 90° (ex: 30° e 60°) resultam no **MESMO ALCANCE** horizontal.
                  </p>
                  <p className="text-sm text-slate-500">
                    A diferença é que o ângulo maior atinge maior altura, e o menor é mais rápido no horizontal.
                  </p>
             </div>
             <div className="w-48 h-48 bg-slate-950 rounded-2xl p-6 border border-slate-800 relative">
                  <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                       <path d="M 0 100 Q 50 -20 100 100" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4" />
                       <path d="M 0 100 Q 50 60 100 100" fill="none" stroke="#ec4899" strokeWidth="2" strokeDasharray="4 4" />
                       <text x="10" y="80" className="text-[10px] fill-slate-500 font-black">30° e 60°</text>
                  </svg>
             </div>
        </div>
    </div>
);

const S11 = () => (
    <div className="max-w-4xl mx-auto space-y-8 text-center py-10">
        <h2 className="text-3xl font-black text-white">Lançamento Horizontal</h2>
        <p className="text-slate-400 max-w-lg mx-auto">
            Uma bola rolando por uma mesa e caindo. A velocidade inicial é totalmente horizontal (v₀y = 0).
        </p>
        <div className="grid md:grid-cols-3 gap-6 mt-12">
             <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
                  <h5 className="text-[10px] font-black text-blue-400 uppercase mb-2">Horizontal</h5>
                  <p className="font-bold">vₓ = v₀</p>
             </div>
             <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
                  <h5 className="text-[10px] font-black text-pink-400 uppercase mb-2">Vertical</h5>
                  <p className="font-bold">vᵧ = g . t</p>
             </div>
             <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
                  <h5 className="text-[10px] font-black text-slate-500 uppercase mb-2">Tempo queda</h5>
                  <p className="font-bold">t = √(2h/g)</p>
             </div>
        </div>
    </div>
);

const S12 = () => {
    const [ans, setAns] = useState<number | null>(null);
    return (
        <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
                 <Zap className="text-amber-500 w-5 h-5" />
                 <span className="text-[10px] font-black uppercase text-slate-500">Revisão Rápida</span>
            </div>
            <h2 className="text-2xl font-black mb-8">No topo da trajetória de um lançamento oblíquo, qual afirmação é VERDADEIRA?</h2>
            <div className="space-y-3">
                {[
                    "A velocidade total do projétil é zero.",
                    "A aceleração do projétil é zero.",
                    "A velocidade vertical (vy) é zero, mas a horizontal (vx) não.",
                    "A energia potencial é mínima."
                ].map((opt, i) => (
                    <button key={i} onClick={() => setAns(i)} className={`w-full p-5 rounded-2xl border-2 text-left transition-all ${ans === i ? (i === 2 ? 'border-emerald-500 bg-emerald-950/20' : 'border-rose-500 bg-rose-950/20') : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'}`}>
                        {opt}
                    </button>
                ))}
            </div>
            {ans !== null && (
                <div className="mt-8 p-6 bg-slate-900 border border-slate-800 rounded-2xl italic text-sm text-center">
                    {ans === 2 ? "🎯 Perfeito! A gravidade só atua no eixo y. No topo, a subida para e a descida começa, mas o objeto continua se movendo para frente." : "💡 Pense bem: a gravidade para de puxar só porque o objeto está no topo? E ele para de ir para frente?"}
                </div>
            )}
        </div>
    );
};

const S13 = () => (
    <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-3xl font-black text-emerald-400">Dica ENEM: Galileu disse...</h2>
        <div className="bg-slate-950 border border-slate-800 p-8 rounded-[3rem] space-y-6">
             <p className="text-slate-300 leading-relaxed italic">
                "Na ausência de resistência do ar, todos os corpos caem com a mesma aceleração, independentemente da sua massa."
             </p>
             <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-500 text-center uppercase tracking-widest font-bold">
                Uma pena e um martelo cairão juntos no vácuo!
             </div>
        </div>
        <div className="p-4 bg-pink-500/5 border border-pink-500/10 rounded-2xl flex gap-4 items-start">
             <Target className="w-6 h-6 text-pink-500 shrink-0 mt-1" />
             <p className="text-xs text-slate-400 leading-relaxed">
                As questões do ENEM adoram colocar a resistência do ar como "fator desprezível". Se a questão falar "no vácuo" ou não citar ar, a massa do objeto NÃO importa para o tempo de queda.
             </p>
        </div>
    </div>
);

const S14 = () => (
    <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-3xl font-black text-white text-center mb-8">Resumo de Fórmulas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col items-center justify-center">
                  <span className="text-[10px] text-slate-500 font-black mb-1 uppercase">Subida</span>
                  <span className="text-lg font-mono text-pink-400">t = v₀y/g</span>
             </div>
             <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col items-center justify-center">
                  <span className="text-[10px] text-slate-500 font-black mb-1 uppercase">Altura</span>
                  <span className="text-lg font-mono text-emerald-400">h = (gt²)/2</span>
             </div>
             <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col items-center justify-center">
                  <span className="text-[10px] text-slate-500 font-black mb-1 uppercase">Horizontal</span>
                  <span className="text-lg font-mono text-blue-400">x = v₀x . t</span>
             </div>
             <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col items-center justify-center">
                  <span className="text-[10px] text-slate-500 font-black mb-1 uppercase">Veloc. y</span>
                  <span className="text-lg font-mono text-amber-400">vy = v₀y - gt</span>
             </div>
        </div>
        <div className="mt-8 p-6 bg-slate-950 border border-slate-800 rounded-3xl text-center">
             <p className="text-sm text-slate-400 leading-relaxed">
                Dominar a independência dos movimentos (Princípio de Galileu) é a chave para qualquer questão de lançamentos.
             </p>
        </div>
    </div>
);

const S15 = () => (
    <div className="max-w-3xl mx-auto text-center py-20">
        <div className="w-24 h-24 bg-pink-500/10 text-pink-500 rounded-full flex items-center justify-center mx-auto mb-10">
            <FastForward className="w-12 h-12" />
        </div>
        <h2 className="text-5xl font-black mb-4 tracking-tighter">Missão Cumprida!</h2>
        <p className="text-slate-400 mb-10 text-lg">Agora você entende como a gravidade governa o movimento vertical e oblíquo.</p>
        <div className="flex justify-center gap-4">
             <Link to="/fisica1" className="px-8 py-4 bg-slate-900 border border-slate-800 rounded-3xl font-bold hover:bg-slate-800 transition-all text-sm">Voltar ao Menu</Link>
             <button onClick={() => window.location.reload()} className="px-8 py-4 bg-pink-600 text-white rounded-3xl font-bold hover:bg-pink-500 transition-all text-sm shadow-[0_10px_40px_rgba(236,72,153,0.3)]">Reiniciar Aula</button>
        </div>
    </div>
);

const SLIDES = [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, S14, S15];

export function Fisica1Lesson5() {
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
            title="Aula 05 — Lançamentos Vertical, Horizontal e Oblíquo" 
            aula="Semana 05" 
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
