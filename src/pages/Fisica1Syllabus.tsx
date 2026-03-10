import { useState } from "react";
import { Telescope, Calendar, Lock, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const S1 = [
    "Apresentação do curso, critérios de avaliação e segurança no laboratório.",
    "Introdução às Ciências da Natureza: Matéria e Energia.",
    "Grandezas físicas escalares e vetoriais.",
    "Leitura e interpretação de dados estatísticos, gráficos e tabelas.",
    "Unidades de medida e Sistema Internacional (SI).",
    "Conceitos de Espaço e Tempo na Cinemática.",
    "Distância percorrida vs. Deslocamento vetorial.",
    "Velocidade média e velocidade instantânea.",
    "Aceleração e Movimento Uniformemente Variado (MUV).",
    "Representação gráfica de movimentos com suporte digital.",
    "Movimento Circular: conceitos e aplicações.",
    "Queda Livre e aceleração da gravidade.",
    "Lançamento de projéteis (composição de movimentos).",
    "Atividade Prática: Coleta de dados de movimento e análise em planilhas.",
    "Dinâmica: O conceito de Força e as causas do movimento.",
    "1ª Lei de Newton: Inércia e suas aplicações cotidianas.",
    "2ª Lei de Newton: Princípio Fundamental da Dinâmica.",
    "3ª Lei de Newton: Ação e Reação.",
    "Tipos de Forças: Peso, Tração e Normal.",
    "Força de Atrito: conceitos e cálculos.",
    "Dinâmica em Plano Inclinado.",
    "Força Centripeta em trajetórias curvas.",
    "Estudo de Caso: Segurança no transporte e as leis de Newton.",
    "Revisão e Recuperação Contínua de conteúdos de Mecânica.",
];

const S2 = [
    "Trabalho de uma força constante e variável.",
    "Energia Cinética e Teorema Trabalho-Energia.",
    "Energia Potencial Gravitacional e Elástica.",
    "Conservação de Energia Mecânica.",
    "Potência e Rendimento.",
    "Quantidade de Movimento e Impulso.",
    "Conservação do Momento Linear (Colisões).",
    "Temperatura e Termometria: escalas e conversões.",
    "Calor: conceito e propagação (condução, convecção, irradiação).",
    "Calorimetria: calor sensível e latente.",
    "Dilatação Térmica de Sólidos e Líquidos.",
    "Gases Ideais e as Leis de Transformação.",
    "Mecânica dos Fluidos: Pressão e Teorema de Stevin.",
    "Empuxo e Princípio de Arquimedes.",
    "Aplicações dos Fluidos: hidráulica e pneumática.",
    "Astronomia: O Sistema Solar e os movimentos celestes.",
    "Leis de Kepler e Gravitação Universal.",
    "Estações do Ano e Fases da Lua.",
    "Atividade Prática: Planetário virtual e análise de órbitas.",
    "Revisão Geral do 2º Semestre.",
    "Avaliação Bimestral.",
    "Vista de prova e devolutiva.",
    "Preparação para exames e vestibulares.",
    "Encerramento do ano letivo.",
];

const SEMESTERS = [
    { label: "1º Semestre — Cinemática e Dinâmica", aulas: S1, color: "rose" },
    { label: "2º Semestre — Energia, Termologia, Fluidos e Astronomia", aulas: S2, color: "orange" },
];

export function Fisica1Syllabus() {
    const [tab, setTab] = useState(0);
    const current = SEMESTERS[tab];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 font-sans p-8">
            <div className="max-w-4xl mx-auto">
                <header className="mb-10 border-b border-slate-800 pb-8 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-rose-500/20 flex items-center justify-center border border-rose-500/30">
                            <Telescope className="w-8 h-8 text-rose-400" />
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <Link to="/" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Portal</Link>
                                <span className="text-slate-600">/</span>
                                <span className="text-rose-400 font-medium text-sm">Física 1</span>
                            </div>
                            <h1 className="text-3xl font-bold text-slate-100">Física 1 — Ensino Médio</h1>
                            <p className="text-slate-400 text-sm mt-1">INFO · ETEC · 48 aulas no ano letivo</p>
                        </div>
                    </div>
                </header>

                {/* Semester tabs */}
                <div className="flex gap-3 mb-6 flex-wrap">
                    {SEMESTERS.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setTab(i)}
                            className={`px-5 py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${tab === i ? "border-rose-500 bg-rose-950/50 text-rose-300" : "border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-500"}`}
                        >
                            {i === 0 ? "1º Semestre" : "2º Semestre"}
                        </button>
                    ))}
                </div>

                <div className="mb-4">
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                        <BookOpen className="w-4 h-4 text-rose-400" />
                        <span className="font-semibold text-rose-400">{current.label}</span>
                    </div>
                </div>

                <div className="space-y-2">
                    {current.aulas.map((aula, i) => (
                        <div key={i} className="flex gap-4 p-4 rounded-xl border border-slate-800 bg-slate-900/50 transition-all hover:border-slate-600">
                            <div className="flex items-center gap-2 text-slate-500 w-20 shrink-0 font-mono text-sm">
                                <Calendar className="w-4 h-4" />
                                Aula {i + 1}
                            </div>
                            <div className="flex-1 flex items-center justify-between">
                                <span className="text-slate-300 font-medium">{aula}</span>
                                <Lock className="w-4 h-4 text-slate-700 shrink-0 ml-4" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
