import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Home, Shield, Circle, PenTool, Zap, Target, Book, Beaker, GraduationCap } from "lucide-react";
import { VectorSim } from "../components/f1/VectorSim";

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
        <div className="mb-6 px-4 py-1 bg-rose-500/10 border border-rose-500/20 rounded-full text-rose-400 text-xs font-black tracking-widest uppercase">
            Início da Jornada · Física 1
        </div>
        <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">Mecânica e<br/><span className="text-rose-400 italic">Grandezas</span></h1>
        <p className="max-w-xl text-slate-400 text-xl leading-relaxed">
            Bem-vindo ao estudo do movimento. Hoje vamos entender como a Física descreve o mundo real através de números e setas.
        </p>
        <div className="mt-12 flex gap-4">
            <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-2"><PenTool className="w-6 h-6 text-slate-500" /></div>
                <span className="text-[10px] font-bold text-slate-600 uppercase">Teoria</span>
            </div>
            <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-2"><Zap className="w-6 h-6 text-rose-500" /></div>
                <span className="text-[10px] font-bold text-slate-600 uppercase">Ação</span>
            </div>
        </div>
    </div>
);

const S2 = () => (
    <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-black mb-8 flex items-center gap-4">
            <Shield className="text-amber-500" /> Segurança em Primeiro Lugar
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                <h3 className="text-amber-400 font-bold mb-2 flex items-center gap-2"><Beaker className="w-4 h-4" /> No Laboratório</h3>
                <ul className="text-sm text-slate-400 space-y-3">
                    <li className="flex gap-2"><span>1.</span> Jamais corra ou brinque com equipamentos.</li>
                    <li className="flex gap-2"><span>2.</span> Use o jaleco e EPIs conforme instruído.</li>
                    <li className="flex gap-2"><span>3.</span> Relate qualquer quebra imediatamente.</li>
                </ul>
            </div>
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                <h3 className="text-blue-400 font-bold mb-2 flex items-center gap-2"><GraduationCap className="w-4 h-4" /> Comportamento</h3>
                <ul className="text-sm text-slate-400 space-y-3">
                    <li className="flex gap-2"><span>1.</span> Celular apenas para fins educacionais.</li>
                    <li className="flex gap-2"><span>2.</span> Resiliência com exercícios difíceis.</li>
                    <li className="flex gap-2"><span>3.</span> Dúvida? Pergunte! Não leve "medo" para casa.</li>
                </ul>
            </div>
        </div>
    </div>
);

const S3 = () => (
    <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-rose-400">
            A Divisão da Mecânica
        </h2>
        <p className="text-lg text-slate-400">A Mecânica é o ramo da física que estuda o movimento e o repouso dos corpos sob a ação de forças.</p>
        <div className="grid md:grid-cols-3 gap-4">
            <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl">
                <h4 className="text-rose-400 font-black mb-2 uppercase tracking-tighter">Cinemática</h4>
                <p className="text-xs text-slate-500">Descreve o movimento sem se preocupar com as causas (forças).</p>
            </div>
            <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl">
                <h4 className="text-blue-400 font-black mb-2 uppercase tracking-tighter">Dinâmica</h4>
                <p className="text-xs text-slate-500">Estuda o movimento e o que o causou (Leis de Newton).</p>
            </div>
            <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl">
                <h4 className="text-emerald-400 font-black mb-2 uppercase tracking-tighter">Estática</h4>
                <p className="text-xs text-slate-500">Estuda corpos em equilíbrio e forças que o mantém.</p>
            </div>
        </div>
    </div>
);

const S4 = () => (
    <div className="max-w-3xl mx-auto text-center py-10">
        <h2 className="text-4xl font-black mb-6">O que é uma Grandeza Física?</h2>
        <div className="p-8 bg-blue-600/10 border border-blue-500/30 rounded-3xl">
            <p className="text-2xl text-blue-200 italic leading-snug">
                "Grandeza é tudo aquilo que pode ser medido, comparado e quantificado."
            </p>
        </div>
        <p className="mt-8 text-slate-400">
            Exemplos: Tempo, Massa, Velocidade, Força, Temperatura.
        </p>
    </div>
);

const S5 = () => (
    <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-black mb-8">Tipos de Grandezas (ENEM Impact!)</h2>
        <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
                <div className="flex items-center gap-3 text-rose-400">
                    <Circle className="w-4 h-4 fill-current" />
                    <h3 className="text-xl font-bold">Escalares</h3>
                </div>
                <p className="text-sm text-slate-400">Precisam apenas de um **valor numérico** e uma **unidade**.</p>
                <div className="flex gap-2 flex-wrap">
                    <span className="bg-slate-800 px-3 py-1 rounded-full text-xs">Massa (kg)</span>
                    <span className="bg-slate-800 px-3 py-1 rounded-full text-xs">Tempo (s)</span>
                    <span className="bg-slate-800 px-3 py-1 rounded-full text-xs">Energia (J)</span>
                </div>
            </div>
            <div className="space-y-4">
                <div className="flex items-center gap-3 text-blue-400">
                    <Zap className="w-4 h-4 fill-current" />
                    <h3 className="text-xl font-bold">Vetoriais</h3>
                </div>
                <p className="text-sm text-slate-400">Além de valor, precisam de **Direção** and **Sentido**.</p>
                <div className="flex gap-2 flex-wrap">
                    <span className="bg-slate-800 px-3 py-1 rounded-full text-xs">Velocidade</span>
                    <span className="bg-slate-800 px-3 py-1 rounded-full text-xs">Força</span>
                    <span className="bg-slate-800 px-3 py-1 rounded-full text-xs">Aceleração</span>
                </div>
            </div>
        </div>
    </div>
);

const S6 = () => (
    <div className="max-w-3xl mx-auto space-y-6">
        <h2 className="text-3xl font-black">O que define um Vetor?</h2>
        <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-slate-900 border border-slate-800 rounded-xl">
                <div className="w-12 h-12 bg-rose-500/20 text-rose-400 rounded-full flex items-center justify-center font-black">M</div>
                <div>
                    <h4 className="font-bold">Módulo (Intensidade)</h4>
                    <p className="text-xs text-slate-500">O comprimento da "seta" - o valor numérico.</p>
                </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-slate-900 border border-slate-800 rounded-xl">
                <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center font-black">D</div>
                <div>
                    <h4 className="font-bold">Direção</h4>
                    <p className="text-xs text-slate-500">A reta suporte: Horizontal, Vertical, Inclinada.</p>
                </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-slate-900 border border-slate-800 rounded-xl">
                <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center font-black">S</div>
                <div>
                    <h4 className="font-bold">Sentido</h4>
                    <p className="text-xs text-slate-500">Para onde a ponta da seta aponta: Direita, Esquerda, Cima.</p>
                </div>
            </div>
        </div>
    </div>
);

const S7 = () => (
    <div className="max-w-4xl mx-auto">
        <div className="mb-4 flex items-center gap-3">
            <Target className="text-blue-500" />
            <h2 className="text-2xl font-black uppercase tracking-widest text-slate-400">Lab Interativo: Vetores</h2>
        </div>
        <VectorSim />
        <p className="mt-4 text-xs text-center text-slate-500">Experimente somar os vetores mudando suas posições e clicando em "Calcular Resultante".</p>
    </div>
);

const S8 = () => (
    <div className="max-w-3xl mx-auto text-center pt-10">
        <h2 className="text-4xl font-black mb-6">Regra do Polígono</h2>
        <p className="text-slate-400 mb-8">Para somar dois vetores, colocamos a "origem" do segundo na "extremidade" (ponta) do primeiro.</p>
        <div className="aspect-video bg-slate-900 border border-slate-800 rounded-3xl flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 400 200" className="w-full max-w-sm">
                {/* Visual example of tip-to-tail */}
                <line x1="50" y1="150" x2="150" y2="150" stroke="#3b82f6" strokeWidth="4" markerEnd="url(#arrowhead-blue)" />
                <line x1="150" y1="150" x2="150" y2="50" stroke="#10b981" strokeWidth="4" markerEnd="url(#arrowhead-green)" />
                <line x1="50" y1="150" x2="150" y2="50" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4" />
                <text x="80" y="170" fill="#3b82f6" className="text-[10px] font-bold">Vetor A</text>
                <text x="160" y="100" fill="#10b981" className="text-[10px] font-bold">Vetor B</text>
                <text x="60" y="100" fill="#f59e0b" className="text-[10px] font-bold">Res (A+B)</text>
            </svg>
        </div>
    </div>
);

const S9 = () => {
    const [ans, setAns] = useState<number | null>(null);
    return (
        <div className="max-w-3xl mx-auto">
            <div className="p-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest w-fit rounded-lg mb-4">Quiz Rápido</div>
            <h2 className="text-3xl font-black mb-6">Se um vetor A aponta para cima e o vetor B aponta para a direita, a resultante apontará para:</h2>
            <div className="grid grid-cols-1 gap-3">
                {["Cima", "Baixo", "Diagonal Superior Direita", "Esquerda"].map((opt, i) => (
                    <button key={i} onClick={() => setAns(i)} className={`p-4 rounded-xl border-2 text-left transition-all ${ans === i ? (i === 2 ? 'border-emerald-500 bg-emerald-950/20' : 'border-rose-500 bg-rose-950/20') : 'border-slate-800 bg-slate-900/50 hover:border-slate-600'}`}>
                        {opt}
                    </button>
                ))}
            </div>
            {ans !== null && (
                <div className="mt-4 font-bold text-center">
                    {ans === 2 ? "✅ Exato! A soma cria um vetor inclinado." : "❌ Tente novamente. Lembre-se da regra ponta-calda."}
                </div>
            )}
        </div>
    );
};

const S10 = () => (
    <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-3xl font-black text-rose-400">Notação Vetorial</h2>
        <p className="text-slate-400">Na física, representamos vetores com uma pequena seta em cima da letra.</p>
        <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl flex items-center justify-center font-mono text-3xl italic">
            <span className="text-slate-300">V</span><span className="relative -top-3 -left-3 text-rose-400">→</span>
            <span className="mx-4">=</span>
            <span className="text-slate-500">(Vx, Vy)</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-800/30 rounded-xl">
                <p className="text-[10px] uppercase font-bold text-slate-500">Componente X</p>
                <p className="text-sm">Determina o deslocamento horizontal.</p>
            </div>
            <div className="p-4 bg-slate-800/30 rounded-xl">
                <p className="text-[10px] uppercase font-bold text-slate-500">Componente Y</p>
                <p className="text-sm">Determina o deslocamento vertical.</p>
            </div>
        </div>
    </div>
);

const S11 = () => (
    <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-black mb-6">Casos Especiais de Soma</h2>
        <div className="space-y-4">
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex justify-between items-center">
                <div>
                    <h4 className="font-bold">Mesma Direção e Sentido</h4>
                    <p className="text-xs text-slate-500">Basta somar os módulos (θ = 0°).</p>
                </div>
                <div className="text-emerald-400 font-mono text-xl">R = A + B</div>
            </div>
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex justify-between items-center">
                <div>
                    <h4 className="font-bold">Mesma Direção e Sentidos Opostos</h4>
                    <p className="text-xs text-slate-500">Subtraímos os módulos (θ = 180°).</p>
                </div>
                <div className="text-rose-400 font-mono text-xl">R = A - B</div>
            </div>
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex justify-between items-center">
                <div>
                    <h4 className="font-bold">Direções Perpendiculares</h4>
                    <p className="text-xs text-slate-500">Usamos Pitágoras (θ = 90°).</p>
                </div>
                <div className="text-blue-400 font-mono text-xl">R² = A² + B²</div>
            </div>
        </div>
    </div>
);

const S12 = () => (
    <div className="max-w-3xl mx-auto space-y-6">
        <h2 className="text-3xl font-black flex items-center gap-3">
            <Book className="text-emerald-500" /> Curiosidade: Por que setas?
        </h2>
        <p className="text-slate-400 leading-relaxed">
            As setas são a ferramenta visual perfeita para o cérebro humano entender vetores. Elas mostram onde começa, para onde vai e com que força. No desenvolvimento de jogos, vetores são usados para mover personagens (Velocity Vector) e calcular colisões.
        </p>
        <div className="mt-8 p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
            <p className="text-sm text-emerald-400 italic">"Na Física, sem direção, você é apenas um número perdido no vácuo."</p>
        </div>
    </div>
);

const S13 = () => (
    <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-black mb-6">Unidades de Medida (SI)</h2>
        <p className="mb-8 text-slate-400">O Sistema Internacional padroniza como medimos o mundo.</p>
        <div className="overflow-hidden border border-slate-800 rounded-2xl">
            <table className="w-full text-left bg-slate-900/40">
                <thead>
                    <tr className="border-b border-slate-800 bg-slate-800/50">
                        <th className="px-6 py-4 text-xs font-black uppercase text-slate-400">Grandeza</th>
                        <th className="px-6 py-4 text-xs font-black uppercase text-slate-400">Unidade</th>
                        <th className="px-6 py-4 text-xs font-black uppercase text-slate-400">Símbolo</th>
                    </tr>
                </thead>
                <tbody className="text-sm text-slate-300">
                    <tr className="border-b border-slate-800/50"><td className="px-6 py-4">Comprimento</td><td className="px-6 py-4">Metro</td><td className="px-6 py-4 text-rose-400">m</td></tr>
                    <tr className="border-b border-slate-800/50"><td className="px-6 py-4">Massa</td><td className="px-6 py-4">Quilograma</td><td className="px-6 py-4 text-rose-400">kg</td></tr>
                    <tr className="border-b border-slate-800/50"><td className="px-6 py-4">Tempo</td><td className="px-6 py-4">Segundo</td><td className="px-6 py-4 text-rose-400">s</td></tr>
                    <tr className="border-b border-slate-800/50"><td className="px-6 py-4">Força</td><td className="px-6 py-4">Newton</td><td className="px-6 py-4 text-rose-400">N</td></tr>
                </tbody>
            </table>
        </div>
    </div>
);

const S14 = () => (
    <div className="max-w-3xl mx-auto space-y-8 py-6">
        <div className="inline-block p-1 bg-rose-500/20 rounded border border-rose-500/30 text-[10px] uppercase font-bold text-rose-400 mb-2">Desafio Final</div>
        <h2 className="text-4xl font-black">Missão Vetorial</h2>
        <p className="text-lg text-slate-400 leading-relaxed">
            Considere um drone que voa 30m para o Leste e depois 40m para o Norte. Usando o Lab de Vetores (Slide 7), desenhe essa situação. Qual será o deslocamento total (módulo da resultante)?
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-center">
                <span className="text-3xl font-black text-rose-400 italic">50m?</span>
            </div>
            <div className="flex items-center text-xs text-slate-500 italic">
                Dica: Pitágoras (3² + 4² = 5²).
            </div>
        </div>
    </div>
);

const S15 = () => (
    <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-black mb-8 border-b border-slate-800 pb-4">Resumo da Aula</h2>
        <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
                <div className="flex gap-4">
                    <div className="w-1 bg-rose-500 h-12" />
                    <div>
                        <h4 className="font-bold text-slate-200">Vetores vs Escalares</h4>
                        <p className="text-xs text-slate-500">Diferenciamos o que precisa de direção e o que não precisa.</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="w-1 bg-blue-500 h-12" />
                    <div>
                        <h4 className="font-bold text-slate-200">Soma de Vetores</h4>
                        <p className="text-xs text-slate-500">Tip-to-tail e regra do polígono.</p>
                    </div>
                </div>
            </div>
            <div className="space-y-4">
                <div className="flex gap-4">
                    <div className="w-1 bg-emerald-500 h-12" />
                    <div>
                        <h4 className="font-bold text-slate-200">Sistema Internacional</h4>
                        <p className="text-xs text-slate-500">Padrões de medida: m, kg, s, N.</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="w-1 bg-amber-500 h-12" />
                    <div>
                        <h4 className="font-bold text-slate-200">Segurança</h4>
                        <p className="text-xs text-slate-500">Regras de laboratório revisadas.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const S16 = () => (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <h2 className="text-5xl font-black mb-4">Ótimo Trabalho!</h2>
        <p className="text-slate-400 mb-8 max-w-sm">Semana que vem: Cinemática Escalar e a Mágica das Funções Horárias.</p>
        <div className="flex gap-3">
             <Link to="/fisica1" className="px-6 py-2 bg-slate-900 border border-slate-700 rounded-xl font-bold hover:bg-slate-800 transition-all">Sair da Aula</Link>
             <button onClick={() => window.location.reload()} className="px-6 py-2 bg-rose-600 rounded-xl font-bold hover:bg-rose-500 transition-all shadow-[0_0_15px_rgba(225,29,72,0.3)]">Reiniciar</button>
        </div>
    </div>
);

const SLIDES = [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, S14, S15, S16];

export function Fisica1Lesson1() {
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
            title="Aula 01 — Fundamentos, Vetores e Segurança" 
            aula="Semana 01" 
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
