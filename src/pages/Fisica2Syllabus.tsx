import { useState } from "react";
import { Telescope, Calendar, Lock, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const S1_AULAS = [
    "Apresentação da Disciplina e Critérios de Avaliação",
    "Introdução à Termometria: Conceito de Temperatura",
    "Escalas Termométricas e Conversões",
    "Calor como Energia em Trânsito",
    "Calorimetria: Calor Sensível",
    "Calorimetria: Calor Latente",
    "Trocas de Calor e Equilíbrio Térmico",
    "Prática: Construção de um Calorímetro Simples",
    "Propagação de Calor: Condução e Convecção",
    "Propagação de Calor: Irradiação Térmica",
    "Dilatação Térmica de Sólidos (Linear)",
    "Dilatação Superficial e Volumétrica",
    "Dilatação dos Líquidos e a Anomalia da Água",
    "Estudo dos Gases: Variáveis de Estado",
    "Leis dos Gases Ideais e Equação de Clapeyron",
    "Primeira Lei da Termodinâmica",
    "Máquinas Térmicas e Ciclos Termodinâmicos",
    "Segunda Lei da Termodinâmica e Ciclo de Carnot",
    "Matriz Energética: Combustíveis Fósseis vs. Renováveis",
    "Fontes Alternativas: Biomassa e Energia Solar no Campo",
];

const S2_AULAS = [
    "Introdução à Eletrostática",
    "Campo Elétrico e Potencial Elétrico",
    "Eletrodinâmica: Corrente Elétrica",
    "Diferença de Potencial (Tensão) e Resistência",
    "Primeira Lei de Ohm",
    "Segunda Lei de Ohm",
    "Prática: Uso do Multímetro (Voltímetro e Amperímetro)",
    "Potência Elétrica e Efeito Joule",
    "Consumo de Energia Elétrica (kWh)",
    "Associação de Resistores em Série",
    "Associação de Resistores em Paralelo",
    "Circuitos Mistos e Dispositivos de Segurança",
    "Introdução ao Magnetismo",
    "Eletromagnetismo: Experiência de Oersted",
    "Indução Eletromagnética e Lei de Faraday",
    "Motores Elétricos na Agropecuária",
    "Introdução às Ondas: Características e Fenômenos",
    "O Espectro Eletromagnético",
    "Radiações na Agricultura e Saúde",
    "Tecnologia, Riscos e Sociedade",
];

const SEMESTERS = [
    { label: "1º Semestre — Termodinâmica e Sustentabilidade", aulas: S1_AULAS },
    { label: "2º Semestre — Eletricidade e Radiações", aulas: S2_AULAS },
];

export function Fisica2Syllabus() {
    const [tab, setTab] = useState(0);
    const current = SEMESTERS[tab];
    const offset = tab === 1 ? 20 : 0;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 font-sans p-8">
            <div className="max-w-4xl mx-auto">
                <header className="mb-10 border-b border-slate-800 pb-8 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-orange-500/20 flex items-center justify-center border border-orange-500/30">
                            <Telescope className="w-8 h-8 text-orange-400" />
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <Link to="/" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Portal</Link>
                                <span className="text-slate-600">/</span>
                                <span className="text-orange-400 font-medium text-sm">Física 2</span>
                            </div>
                            <h1 className="text-3xl font-bold text-slate-100">Física 2 — Ensino Médio</h1>
                            <p className="text-slate-400 text-sm mt-1">AGRO/INFO · ETEC · 40 aulas no ano letivo</p>
                        </div>
                    </div>
                </header>

                <div className="flex gap-3 mb-6 flex-wrap">
                    {SEMESTERS.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setTab(i)}
                            className={`px-5 py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${tab === i ? "border-orange-500 bg-orange-950/50 text-orange-300" : "border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-500"}`}
                        >
                            {i === 0 ? "1º Semestre" : "2º Semestre"}
                        </button>
                    ))}
                </div>

                <div className="mb-4">
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                        <BookOpen className="w-4 h-4 text-orange-400" />
                        <span className="font-semibold text-orange-400">{current.label}</span>
                    </div>
                </div>

                <div className="space-y-2">
                    {current.aulas.map((aula, i) => {
                        const lessonNum = tab === 0 ? i + 1 : null;
                        const hasLesson = lessonNum !== null && lessonNum <= 10;
                        const href = hasLesson ? `/fisica2/aula${lessonNum}` : null;
                        const inner = (
                            <>
                                <div className="flex items-center gap-2 text-slate-500 w-20 shrink-0 font-mono text-sm">
                                    <Calendar className="w-4 h-4" />
                                    Aula {offset + i + 1}
                                </div>
                                <div className="flex-1 flex items-center justify-between">
                                    <span className={hasLesson ? "text-slate-100 font-semibold" : "text-slate-300 font-medium"}>{aula}</span>
                                    {hasLesson
                                        ? <span className="text-orange-400 text-xs font-bold border border-orange-500/30 bg-orange-500/10 px-2 py-0.5 rounded-full ml-4 shrink-0">▶ Abrir</span>
                                        : <Lock className="w-4 h-4 text-slate-700 shrink-0 ml-4" />}
                                </div>
                            </>
                        );
                        return href
                            ? <Link key={i} to={href} className="flex gap-4 p-4 rounded-xl border border-orange-500/30 bg-orange-950/10 transition-all hover:border-orange-500/60 hover:-translate-y-0.5">{inner}</Link>
                            : <div key={i} className="flex gap-4 p-4 rounded-xl border border-slate-800 bg-slate-900/50 transition-all hover:border-slate-600">{inner}</div>;
                    })}
                </div>
            </div>
        </div>
    );
}
