import { useState } from "react";
import { Telescope, Calendar, Lock, BookOpen, Users } from "lucide-react";
import { Link } from "react-router-dom";

type Aula = { week: number; aula1: string; aula2: string; metodologia: string };

const B1_AULAS: Aula[] = [
    { week: 1, aula1: "Apresentação e Introdução à Eletrostática", aula2: "Propriedade elétrica dos materiais (condutores e isolantes)", metodologia: "Experimentos introdutórios de eletrização por atrito, contato e indução." },
    { week: 2, aula1: "Princípios de Força Elétrica", aula2: "Lei de Coulomb", metodologia: "Resolução de problemas e análise vetorial da força entre cargas." },
    { week: 3, aula1: "Campo elétrico geométrico", aula2: "Interação entre cargas no espaço", metodologia: "Discussão com paralelos às habilidades de personagens de histórias em quadrinhos." },
    { week: 4, aula1: "Energia potencial elétrica", aula2: "Potencial elétrico e Tensão", metodologia: "Analogias sobre diferença de potencial e trabalho da força elétrica." },
    { week: 5, aula1: "Eletrodinâmica", aula2: "Corrente elétrica", metodologia: "Modelagem de como o fluxo de elétrons gera efeitos físicos perceptíveis." },
    { week: 6, aula1: "Resistores", aula2: "Primeira Lei de Ohm", metodologia: "Script Python com os alunos para coleta e plotagem de dados de tensão e corrente." },
    { week: 7, aula1: "Segunda Lei de Ohm", aula2: "Equipamentos de medição elétrica", metodologia: "Leitura da resistividade em cabos e uso de voltímetros e amperímetros." },
    { week: 8, aula1: "Energia elétrica", aula2: "Potência elétrica", metodologia: "Cálculo de eficiência e dimensionamento de consumo em equipamentos reais." },
    { week: 9, aula1: "Revisão Geral: Cargas e Forças", aula2: "Revisão Geral: Leis de Ohm e Potência", metodologia: "Competição de resolução de problemas ou mapas mentais colaborativos." },
    { week: 10, aula1: "Avaliação Bimestral", aula2: "Vista de prova e devolutiva", metodologia: "Análise quantitativa dos erros mais comuns da turma." },
];

const B2_AULAS: Aula[] = B1_AULAS; // 2nd bimester mirrors 1st

const B3_AULAS: Aula[] = [
    { week: 21, aula1: "Relação entre campo elétrico e campo magnético", aula2: "Lei de Oersted", metodologia: "Reprodução da experiência de Oersted na bancada." },
    { week: 22, aula1: "Fluxo magnético", aula2: "Lei de Faraday-Neumann", metodologia: "Laboratório de indução: gerando corrente pelo movimento de ímãs em espiras." },
    { week: 23, aula1: "Conservação da energia na indução", aula2: "Lei de Lenz", metodologia: "Análise de frenagem magnética e funcionamento de usinas hidrelétricas/eólicas." },
    { week: 24, aula1: "Ondas eletromagnéticas", aula2: "Espectro eletromagnético", metodologia: "Estudo da relação universal: velocidade da luz, comprimento de onda e frequência." },
    { week: 25, aula1: "Ondas de rádio", aula2: "Micro-ondas", metodologia: "Debate sobre telecomunicações, satélites de GPS e transmissão de dados de radar." },
    { week: 26, aula1: "Radiações infravermelhas", aula2: "Espectroscopia", metodologia: "Estudo de sensoriamento remoto, emissão térmica e identificação de elementos pelo espectro." },
    { week: 27, aula1: "Radiações visíveis e ultravioletas", aula2: "Modelos de radiação na agricultura", metodologia: "Análise da conversão de radiação na fotossíntese e danos da luz UV em culturas." },
    { week: 28, aula1: "Raios X", aula2: "Raios gama", metodologia: "Diferenciação biológica das radiações ionizantes: contrastando com a biofísica das HQs." },
    { week: 29, aula1: "Revisão de Indução Eletromagnética", aula2: "Revisão do Espectro e Aplicações", metodologia: "Foco nos aspectos analíticos da lei de indução e uso das ondas." },
    { week: 30, aula1: "Avaliação Bimestral", aula2: "Vista de prova e devolutiva", metodologia: "Correção das questões dissertativas no quadro." },
];

const B4_AULAS: Aula[] = [
    { week: 31, aula1: "Radiação do corpo negro e a crise da física clássica", aula2: "Quantização de energia", metodologia: "A hipótese de Planck e os primórdios da quebra de paradigma na física." },
    { week: 32, aula1: "Espectros de emissão atômica", aula2: "Modelo de Bohr", metodologia: "A matemática dos saltos quânticos e a emissão de fótons específicos." },
    { week: 33, aula1: "Natureza corpuscular da luz", aula2: "Efeito Fotoelétrico", metodologia: "Princípios de funcionamento de painéis solares para eficiência energética no agro." },
    { week: 34, aula1: "Hipótese de De Broglie", aula2: "Dualidade onda-partícula", metodologia: "Discussão sobre o clássico experimento da dupla fenda e o impacto do observador." },
    { week: 35, aula1: "Princípio da Incerteza de Heisenberg", aula2: "Introdução à física de sistemas dinâmicos", metodologia: "Desmistificar ideias pseudo-quânticas com foco em rigor matemático e estatístico." },
    { week: 36, aula1: "Modelagem de dados", aula2: "Software e física climática", metodologia: "Alunos criam lógica de app (Streamlit) para dados climáticos ou índices de vegetação." },
    { week: 37, aula1: "Preparação ENEM: Eletricidade e Magnetismo", aula2: "Preparação ENEM: Termologia e Cinemática", metodologia: "Resolução intensiva focada nos principais exames de vestibular do país." },
    { week: 38, aula1: "Aulão de resolução de provas anteriores", aula2: "Plantão tira-dúvidas de encerramento", metodologia: "Simulado em grupo com rotatividade de questões." },
    { week: 39, aula1: "Avaliação Final (Bimestral)", aula2: "Correção e divulgação de médias", metodologia: "Fechamento das menções e orientação para casos de recuperação contínua." },
    { week: 40, aula1: "O impacto da IA e Ciência de Dados na Física", aula2: "Encerramento do ano letivo", metodologia: "Debate aberto sobre o futuro da IA e aprendizado de máquina no avanço científico." },
];

const BIMESTERS = [
    { label: "1º Bimestre — Eletrostática e Eletrodinâmica", aulas: B1_AULAS, aulaStart: 1 },
    { label: "2º Bimestre — Consolidação", aulas: B2_AULAS, aulaStart: 21 },
    { label: "3º Bimestre — Eletromagnetismo e Ondas", aulas: B3_AULAS, aulaStart: 41 },
    { label: "4º Bimestre — Física Quântica e Encerramento", aulas: B4_AULAS, aulaStart: 61 },
];

export function Fisica3Syllabus() {
    const [tab, setTab] = useState(0);
    const current = BIMESTERS[tab];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 font-sans p-8">
            <div className="max-w-5xl mx-auto">
                <header className="mb-10 border-b border-slate-800 pb-8 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-amber-500/20 flex items-center justify-center border border-amber-500/30">
                            <Telescope className="w-8 h-8 text-amber-400" />
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <Link to="/" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Portal</Link>
                                <span className="text-slate-600">/</span>
                                <span className="text-amber-400 font-medium text-sm">Física 3</span>
                            </div>
                            <h1 className="text-3xl font-bold text-slate-100">Física 3 — Ensino Médio</h1>
                            <p className="text-slate-400 text-sm mt-1">AGRO · ETEC · 4 Bimestres · 80 aulas no ano letivo</p>
                        </div>
                    </div>
                </header>

                {/* Bimester tabs */}
                <div className="flex gap-2 mb-6 flex-wrap">
                    {BIMESTERS.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setTab(i)}
                            className={`px-4 py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${tab === i ? "border-amber-500 bg-amber-950/50 text-amber-300" : "border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-500"}`}
                        >
                            {i + 1}º Bimestre
                        </button>
                    ))}
                </div>

                <div className="mb-5 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-amber-400" />
                    <span className="font-semibold text-amber-400 text-sm">{current.label}</span>
                </div>

                <div className="space-y-3">
                    {current.aulas.map((row, i) => {
                        const semNum = tab === 0 ? i + 1 : null;
                        const hasLesson = semNum !== null && semNum <= 8;
                        const href = hasLesson ? `/fisica3/sem${semNum}` : null;
                        const inner = (
                            <>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="flex items-center gap-1.5 bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full border border-amber-500/20 text-xs font-bold">
                                        <Calendar className="w-3 h-3" />
                                        Semana {row.week}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                                        <Users className="w-3 h-3" />
                                        Aulas {current.aulaStart + i * 2 - 1} e {current.aulaStart + i * 2}
                                    </div>
                                    {hasLesson && <span className="ml-auto text-amber-400 text-xs font-bold border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 rounded-full">▶ Abrir</span>}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                                    <div className={`rounded-xl p-3 border ${hasLesson ? "bg-amber-950/20 border-amber-500/20" : "bg-slate-800/60 border-slate-700/50"}`}>
                                        <div className="text-xs font-bold text-slate-500 mb-1">Aula {current.aulaStart + i * 2 - 1}</div>
                                        <p className="text-slate-200 text-sm font-semibold">{row.aula1}</p>
                                    </div>
                                    <div className={`rounded-xl p-3 border ${hasLesson ? "bg-amber-950/20 border-amber-500/20" : "bg-slate-800/60 border-slate-700/50"}`}>
                                        <div className="text-xs font-bold text-slate-500 mb-1">Aula {current.aulaStart + i * 2}</div>
                                        <p className="text-slate-200 text-sm font-semibold">{row.aula2}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-xs font-bold text-slate-600 shrink-0 mt-0.5">🔬</span>
                                    <p className="text-slate-500 text-xs leading-relaxed">{row.metodologia}</p>
                                    {!hasLesson && <Lock className="w-3.5 h-3.5 text-slate-700 shrink-0 mt-0.5 ml-auto" />}
                                </div>
                            </>
                        );
                        return href
                            ? <Link key={i} to={href} className="block bg-amber-950/10 border border-amber-500/30 rounded-2xl p-4 md:p-5 hover:border-amber-500/60 transition-all hover:-translate-y-0.5">{inner}</Link>
                            : <div key={i} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 md:p-5 hover:border-slate-600 transition-all">{inner}</div>;
                    })}
                </div>
            </div>
        </div>
    );
}
