import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

interface Flashcard {
  id: number;
  front: string;
  back: string;
  category: string;
  categoryColor: string;
}

const CARDS: Flashcard[] = [
  {
    id: 1,
    front: 'Qual profissional analisa interações de clientes para identificar padrões e melhorar processos de suporte?',
    back: '📊 Analista de Dados\n\nO analista examina dados existentes (como históricos de compras e feedbacks) para gerar insights acionáveis para as equipes de negócio.',
    category: 'Papéis',
    categoryColor: 'text-pink-400 border-pink-500/40 bg-pink-500/10',
  },
  {
    id: 2,
    front: 'Quem desenvolve algoritmos para analisar tendências de mercado e fornecer insights para investimentos?',
    back: '🤖 Cientista de Dados\n\nO cientista usa modelos preditivos e aprendizado de máquina para extrair conhecimento profundo e prever comportamentos futuros.',
    category: 'Papéis',
    categoryColor: 'text-violet-400 border-violet-500/40 bg-violet-500/10',
  },
  {
    id: 3,
    front: 'Qual perfil projeta e implementa infraestrutura de dados que integra informações de várias fontes?',
    back: '⚙️ Engenheiro de Dados\n\nO engenheiro constrói os pipelines, data lakes e sistemas ETL que garantem que os dados cheguem limpos e disponíveis para os outros profissionais.',
    category: 'Papéis',
    categoryColor: 'text-teal-400 border-teal-500/40 bg-teal-500/10',
  },
  {
    id: 4,
    front: 'Marcar Tendências de Mercado → Segmentar clientes com ML para campanhas de marketing. Qual perfil faz isso?',
    back: '🤖 Cientista de Dados\n\nModelos de aprendizado de máquina que segmentam clientes por preferências e comportamentos são a especialidade do cientista. É uma tarefa de modelagem preditiva, não de análise descritiva.',
    category: 'Estudo de Caso',
    categoryColor: 'text-amber-400 border-amber-500/40 bg-amber-500/10',
  },
  {
    id: 5,
    front: 'Qual é uma tarefa COMUM realizada por Analistas de Dados?',
    back: '🔍 Análise Exploratória de Dados (EDA)\n\nInclui: examinar distribuições, identificar outliers, cruzar variáveis e gerar visualizações para entender a base de dados antes de qualquer modelo.',
    category: 'Teoria',
    categoryColor: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10',
  },
  {
    id: 6,
    front: 'Qual ferramenta é mais associada à VISUALIZAÇÃO de dados em ambientes corporativos?',
    back: '📊 Power BI\n\nÉ a principal ferramenta de Business Intelligence da Microsoft, amplamente usada por analistas para criar dashboards interativos e relatórios gerenciais. Alternativas: Tableau, Looker Studio.',
    category: 'Ferramentas',
    categoryColor: 'text-blue-400 border-blue-500/40 bg-blue-500/10',
  },
  {
    id: 7,
    front: 'Qual linguagem é a mais usada para Análise e Manipulação de Dados?',
    back: '🐍 Python\n\nCom bibliotecas como pandas, numpy e matplotlib, Python é a linguagem dominante em Data Science e Análise de Dados. SQL é também essencial, mas Python domina o ecossistema científico.',
    category: 'Ferramentas',
    categoryColor: 'text-blue-400 border-blue-500/40 bg-blue-500/10',
  },
  {
    id: 8,
    front: 'Qual ferramenta é usada para CONSULTAR e ANALISAR grandes conjuntos de dados?',
    back: '🗄️ SQL (Structured Query Language)\n\nSQL é a língua franca dos dados. Permite filtrar, agrupar, ordenar e combinar tabelas em qualquer banco de dados relacional (PostgreSQL, MySQL, BigQuery, Snowflake).',
    category: 'Ferramentas',
    categoryColor: 'text-blue-400 border-blue-500/40 bg-blue-500/10',
  },
];

function Card({ card, flipped, onFlip }: { card: Flashcard; flipped: boolean; onFlip: () => void }) {
  return (
    <div
      className="w-full max-w-xl mx-auto cursor-pointer"
      style={{ perspective: '1200px', height: '280px' }}
      onClick={onFlip}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        style={{ transformStyle: 'preserve-3d', position: 'relative', width: '100%', height: '100%' }}
      >
        {/* FRONT */}
        <div
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          className="absolute inset-0 bg-slate-900 border-2 border-slate-700 rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-4"
        >
          <span className={`text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full border ${card.categoryColor}`}>
            {card.category}
          </span>
          <p className="text-white font-semibold text-base leading-relaxed">{card.front}</p>
          <span className="text-xs text-slate-500 mt-2">Clique para revelar a resposta</span>
        </div>

        {/* BACK */}
        <div
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          className={`absolute inset-0 rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-3 border-2 ${card.categoryColor.includes('pink') ? 'bg-pink-950/30 border-pink-500/40' : card.categoryColor.includes('violet') ? 'bg-violet-950/30 border-violet-500/40' : card.categoryColor.includes('teal') ? 'bg-teal-950/30 border-teal-500/40' : card.categoryColor.includes('amber') ? 'bg-amber-950/30 border-amber-500/40' : card.categoryColor.includes('emerald') ? 'bg-emerald-950/30 border-emerald-500/40' : 'bg-blue-950/30 border-blue-500/40'}`}
        >
          {card.back.split('\n').map((line, i) => (
            <p key={i} className={i === 0 ? 'text-xl font-black text-white' : i === 1 ? 'text-xs text-slate-400 mt-1' : 'text-slate-300 text-sm leading-relaxed'}>
              {line}
            </p>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export function Flashcards() {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [seen, setSeen] = useState<Set<number>>(new Set());
  const [direction, setDirection] = useState(0);

  function go(dir: number) {
    const next = idx + dir;
    if (next < 0 || next >= CARDS.length) return;
    setDirection(dir);
    setFlipped(false);
    setTimeout(() => setIdx(next), 100);
  }

  function handleFlip() {
    if (!flipped) setSeen(s => new Set([...s, idx]));
    setFlipped(f => !f);
  }

  function reset() {
    setIdx(0);
    setFlipped(false);
    setSeen(new Set());
    setDirection(0);
  }

  const card = CARDS[idx];
  const progress = (seen.size / CARDS.length) * 100;

  return (
    <div className="w-full space-y-6">
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-slate-500">
          <span>{seen.size} de {CARDS.length} cards revisados</span>
          <span className="text-amber-400 font-bold">{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-500 to-orange-400 rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          />
        </div>
      </div>

      {/* Card dots */}
      <div className="flex justify-center gap-1.5">
        {CARDS.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDirection(i > idx ? 1 : -1); setFlipped(false); setTimeout(() => setIdx(i), 100); }}
            className={`w-2.5 h-2.5 rounded-full transition-all ${i === idx ? 'bg-amber-400 w-6' : seen.has(i) ? 'bg-emerald-500' : 'bg-slate-700'}`}
          />
        ))}
      </div>

      {/* Card */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={idx}
          custom={direction}
          initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? -60 : 60 }}
          transition={{ type: 'spring', stiffness: 250, damping: 30 }}
        >
          <Card card={card} flipped={flipped} onFlip={handleFlip} />
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between max-w-xl mx-auto">
        <button
          onClick={() => go(-1)}
          disabled={idx === 0}
          className="p-3 rounded-2xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 transition-all disabled:opacity-20 group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        </button>
        <span className="text-slate-500 text-sm font-mono font-bold">{idx + 1} / {CARDS.length}</span>
        <button
          onClick={() => go(1)}
          disabled={idx === CARDS.length - 1}
          className="p-3 rounded-2xl bg-amber-600 border border-amber-500/50 text-white hover:bg-amber-500 transition-all disabled:opacity-20 group"
        >
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {seen.size === CARDS.length && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <button
            onClick={reset}
            className="flex items-center gap-2 mx-auto px-6 py-3 bg-emerald-800 hover:bg-emerald-700 border border-emerald-500/40 text-emerald-200 font-bold text-sm rounded-2xl transition-all"
          >
            <RotateCcw className="w-4 h-4" /> Revisar do início
          </button>
        </motion.div>
      )}
    </div>
  );
}
