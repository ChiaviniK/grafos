import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sprite } from '../../PixelQuiz';

interface Question {
  q: string;
  opts: string[];
  points: [number, number, number]; // [analista, cientista, engenheiro]
}

const QUESTIONS: Question[] = [
  {
    q: 'Quando você recebe um problema complexo, sua primeira reação é…',
    opts: [
      'Montar uma planilha ou gráfico para entender os dados disponíveis',
      'Pensar em como criar um modelo para prever o resultado',
      'Planejar como organizar e integrar os dados de forma escalável',
    ],
    points: [[3, 0, 0], [0, 3, 0], [0, 0, 3]][0] as [number, number, number],
  },
  {
    q: 'Qual dessas atividades você mais curtiu ou curtiria fazer?',
    opts: [
      'Criar um dashboard bonito com insights visuais para a diretoria',
      'Treinar uma IA para reconhecer padrões em textos ou imagens',
      'Construir um sistema robusto que processa milhões de registros por segundo',
    ],
    points: [3, 0, 0] as [number, number, number],
  },
  {
    q: 'Seu chefe te pede um relatório urgente. Como você reage?',
    opts: [
      'Abro o Excel ou Power BI e entrego em horas',
      'Peço mais contexto — quero entender o "porquê" por trás do pedido',
      'Pergunto de onde vêm os dados e se a infraestrutura está confiável',
    ],
    points: [0, 0, 0] as [number, number, number], // placeholder, will be interpreted per question below
  },
  {
    q: 'Qual linguagem ou ferramenta você mais quer dominar?',
    opts: [
      'SQL + Power BI / Tableau',
      'Python (pandas, scikit-learn, TensorFlow)',
      'Apache Spark, Kafka, dbt, Airflow',
    ],
    points: [0, 0, 0] as [number, number, number],
  },
  {
    q: 'Você se define mais como…',
    opts: [
      'Comunicador de insights — transformo números em histórias',
      'Pesquisador — amo descobrir o que os dados escondidos revelam',
      'Construtor — prefiro criar a infraestrutura que sustenta tudo',
    ],
    points: [0, 0, 0] as [number, number, number],
  },
];

// Points per question per option
const POINTS_TABLE: [number, number, number][][] = [
  [[3, 0, 0], [0, 3, 0], [0, 0, 3]],
  [[3, 0, 0], [0, 3, 0], [0, 0, 3]],
  [[3, 0, 0], [0, 2, 1], [0, 1, 2]],
  [[3, 0, 0], [0, 3, 0], [0, 0, 3]],
  [[3, 0, 0], [0, 3, 0], [0, 0, 3]],
];

const PROFILES = [
  {
    name: 'Analista de Dados',
    emoji: '📊',
    char: 0 as const,
    color: 'from-pink-600 to-rose-600',
    border: 'border-pink-500/50',
    bg: 'bg-pink-500/10',
    text: 'text-pink-400',
    desc: 'Você tem olho afiado para padrões e adora transformar números em histórias visuais! Ferramentas como SQL, Power BI e Excel são suas aliadas. Empresas como TechZone precisam de pessoas como você para entender o comportamento dos clientes.',
  },
  {
    name: 'Cientista de Dados',
    emoji: '🤖',
    char: 2 as const,
    color: 'from-violet-600 to-purple-600',
    border: 'border-violet-500/50',
    bg: 'bg-violet-500/10',
    text: 'text-violet-400',
    desc: 'Você pensa grande! Adora criar modelos matemáticos e algoritmos que preveem o futuro. Python, scikit-learn e redes neurais são seu terreno. Empresas como Global Investments Inc. precisam de você para prever tendências de mercado.',
  },
  {
    name: 'Engenheiro de Dados',
    emoji: '⚙️',
    char: 1 as const,
    color: 'from-teal-600 to-cyan-600',
    border: 'border-teal-500/50',
    bg: 'bg-teal-500/10',
    text: 'text-teal-400',
    desc: 'Você é o arquiteto! Garante que os dados cheguem limpos, organizados e em escala para toda a equipe. Spark, Kafka e pipelines ETL são seu dia a dia. GreenGrocers Co. precisaria de você para integrar o supply chain.',
  },
];

export function ProfileQuiz() {
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [profileIdx, setProfileIdx] = useState(0);

  function handleSelect(optIdx: number) {
    if (selected !== null) return;
    setSelected(optIdx);
  }

  function handleNext() {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    if (qIdx + 1 >= QUESTIONS.length) {
      // Tally scores
      const scores = [0, 0, 0];
      newAnswers.forEach((ans, qi) => {
        const pts = POINTS_TABLE[qi][ans];
        scores[0] += pts[0];
        scores[1] += pts[1];
        scores[2] += pts[2];
      });
      const winner = scores.indexOf(Math.max(...scores));
      setProfileIdx(winner);
      setFinished(true);
    } else {
      setAnswers(newAnswers);
      setQIdx(q => q + 1);
      setSelected(null);
    }
  }

  function reset() {
    setQIdx(0);
    setAnswers([]);
    setSelected(null);
    setFinished(false);
  }

  if (finished) {
    const profile = PROFILES[profileIdx];
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="result"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`max-w-2xl mx-auto rounded-3xl border-2 ${profile.border} ${profile.bg} p-8 text-center space-y-6`}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Sprite character={profile.char} state="jump" scale={5} />
              <div className="absolute -top-2 -right-4 text-3xl animate-bounce">{profile.emoji}</div>
            </div>
            <div>
              <div className={`text-xs font-black tracking-widest uppercase ${profile.text} mb-1`}>Seu Perfil é</div>
              <h3 className={`text-3xl md:text-4xl font-black bg-gradient-to-r ${profile.color} bg-clip-text text-transparent`}>
                {profile.name}
              </h3>
            </div>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed max-w-lg mx-auto">{profile.desc}</p>
          <button
            onClick={reset}
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-300 text-sm font-bold rounded-2xl transition-all"
          >
            🔄 Refazer o Quiz
          </button>
        </motion.div>
      </AnimatePresence>
    );
  }

  const q = QUESTIONS[qIdx];
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={qIdx}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        className="max-w-2xl mx-auto space-y-6"
      >
        {/* Progress */}
        <div className="flex gap-2 justify-center">
          {QUESTIONS.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all ${i <= qIdx ? 'bg-amber-400 w-8' : 'bg-slate-700 w-4'}`} />
          ))}
        </div>

        {/* Question */}
        <div className="bg-slate-900/60 backdrop-blur border border-slate-700 rounded-3xl p-8 space-y-6">
          <div className="text-center">
            <span className="text-xs font-black text-amber-400 tracking-widest uppercase">Pergunta {qIdx + 1} de {QUESTIONS.length}</span>
            <p className="text-xl font-bold text-white mt-3 leading-snug">{q.q}</p>
          </div>

          <div className="space-y-3">
            {q.opts.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={selected !== null}
                className={`w-full p-4 rounded-2xl border-2 text-left text-sm font-medium transition-all
                  ${selected === null
                    ? 'border-slate-700 bg-slate-900 text-slate-300 hover:border-amber-400/60 hover:bg-slate-800'
                    : i === selected
                      ? 'border-amber-400 bg-amber-500/10 text-amber-200'
                      : 'border-slate-800 bg-slate-900/30 text-slate-600 opacity-50'
                  }`}
              >
                <span className="font-black text-slate-500 mr-3">{['A', 'B', 'C'][i]})</span>
                {opt}
              </button>
            ))}
          </div>

          {selected !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center"
            >
              <button
                onClick={handleNext}
                className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black rounded-2xl hover:scale-105 transition-all text-sm"
              >
                {qIdx + 1 < QUESTIONS.length ? 'Próxima →' : 'Ver meu perfil! 🎯'}
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
