import { useState } from "react";
import { Telescope, Calendar, Lock, BookOpen, Zap } from "lucide-react";
import { Link } from "react-router-dom";

// Semana expandida → nova rota /fisica2/semN
const SEM1_EXPANDED: { aula: string; route: string | null }[] = [
  { aula: "Introdução à Termometria: Conceito de Temperatura", route: "/fisica2/sem1" },
  { aula: "Escalas Termométricas e Conversões", route: "/fisica2/sem2" },
  { aula: "Calor como Energia em Trânsito", route: "/fisica2/sem3" },
  { aula: "Calorimetria: Calor Sensível (Q = m·c·ΔT)", route: "/fisica2/sem4" },
  { aula: "Calorimetria: Calor Latente (Q = m·L)", route: "/fisica2/sem5" },
  { aula: "Dilatação Térmica de Sólidos e Líquidos", route: "/fisica2/sem6" },
  { aula: "Leis dos Gases Ideais (Boyle, Charles, Gay-Lussac)", route: "/fisica2/sem7" },
  { aula: "Termodinâmica: 1ª e 2ª Leis + Máquinas Térmicas", route: "/fisica2/sem8" },
  { aula: "Apresentação da Disciplina e Critérios de Avaliação", route: null },
  { aula: "Trocas de Calor e Equilíbrio Térmico", route: null },
  { aula: "Prática: Construção de um Calorímetro Simples", route: null },
  { aula: "Propagação de Calor: Condução e Convecção", route: null },
  { aula: "Propagação de Calor: Irradiação Térmica", route: null },
  { aula: "Dilatação Superficial e Volumétrica", route: null },
  { aula: "Dilatação dos Líquidos e a Anomalia da Água", route: null },
  { aula: "Estudo dos Gases: Variáveis de Estado", route: null },
  { aula: "Primeira Lei da Termodinâmica", route: null },
  { aula: "Máquinas Térmicas e Ciclos Termodinâmicos", route: null },
  { aula: "Segunda Lei da Termodinâmica e Ciclo de Carnot", route: null },
  { aula: "Matriz Energética: Combustíveis Fósseis vs. Renováveis", route: null },
];

const SEM2_AULAS = [
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

export function Fisica2Syllabus() {
  const [tab, setTab] = useState(0);

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
          {["1º Semestre — Termodinâmica", "2º Semestre — Eletricidade e Radiações"].map((_, i) => (
            <button key={i} onClick={() => setTab(i)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${tab === i ? "border-orange-500 bg-orange-950/50 text-orange-300" : "border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-500"}`}>
              {i === 0 ? "1º Semestre" : "2º Semestre"}
            </button>
          ))}
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <BookOpen className="w-4 h-4 text-orange-400" />
            <span className="font-semibold text-orange-400">
              {tab === 0 ? "1º Semestre — Termodinâmica e Sustentabilidade" : "2º Semestre — Eletricidade e Radiações"}
            </span>
          </div>
        </div>

        {/* 1º SEMESTRE — aulas expandidas com rotas sem1-8 */}
        {tab === 0 && (
          <div className="space-y-2">
            {/* Banner de destaque das aulas expandidas */}
            <div className="flex items-center gap-2 mb-3 p-3 bg-orange-950/20 border border-orange-500/20 rounded-xl">
              <Zap className="w-4 h-4 text-orange-400 shrink-0" />
              <span className="text-orange-300 text-xs font-bold">8 aulas expandidas com slides interativos, quizzes e calculadoras!</span>
            </div>
            {SEM1_EXPANDED.map((item, i) => {
              const hasLesson = item.route !== null;
              const inner = (
                <>
                  <div className="flex items-center gap-2 text-slate-500 w-20 shrink-0 font-mono text-sm">
                    <Calendar className="w-4 h-4" />
                    Aula {i + 1}
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <span className={hasLesson ? "text-slate-100 font-semibold" : "text-slate-300 font-medium"}>{item.aula}</span>
                    {hasLesson
                      ? <span className="text-orange-400 text-xs font-bold border border-orange-500/30 bg-orange-500/10 px-2 py-0.5 rounded-full ml-4 shrink-0">▶ Abrir</span>
                      : <Lock className="w-4 h-4 text-slate-700 shrink-0 ml-4" />}
                  </div>
                </>
              );
              return hasLesson
                ? <Link key={i} to={item.route!} className="flex gap-4 p-4 rounded-xl border border-orange-500/30 bg-orange-950/10 transition-all hover:border-orange-500/60 hover:-translate-y-0.5">{inner}</Link>
                : <div key={i} className="flex gap-4 p-4 rounded-xl border border-slate-800 bg-slate-900/50">{inner}</div>;
            })}
          </div>
        )}

        {/* 2º SEMESTRE */}
        {tab === 1 && (
          <div className="space-y-2">
            {SEM2_AULAS.map((aula, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl border border-slate-800 bg-slate-900/50">
                <div className="flex items-center gap-2 text-slate-500 w-20 shrink-0 font-mono text-sm">
                  <Calendar className="w-4 h-4" />
                  Aula {20 + i + 1}
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <span className="text-slate-300 font-medium">{aula}</span>
                  <Lock className="w-4 h-4 text-slate-700 shrink-0 ml-4" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
