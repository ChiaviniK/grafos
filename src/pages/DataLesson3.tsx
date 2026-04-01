import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, BarChart2, Brain, Wrench,
  ArrowRight, CheckCircle2, Users, Layers, Briefcase,
  TrendingUp, Code2, Database, Server, Star
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Sprite } from '../components/PixelQuiz';
import { RoleSorter } from '../components/data/aula3/RoleSorter';
import { ToolMatcher } from '../components/data/aula3/ToolMatcher';
import { ProfileQuiz } from '../components/data/aula3/ProfileQuiz';
import { Flashcards } from '../components/data/aula3/Flashcards';

// ─── Pixel Sprite mini-character float ──────────────────────────────────────
function FloatSprite({ character, state, scale, label, labelColor }: {
  character: 0 | 1 | 2;
  state?: 'idle' | 'jump' | 'run' | 'attack';
  scale?: number;
  label?: string;
  labelColor?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut', delay: character * 0.5 }}
      >
        <Sprite character={character} state={state ?? 'idle'} scale={scale ?? 4} />
      </motion.div>
      {label && (
        <span className={`text-[10px] font-black tracking-widest uppercase ${labelColor ?? 'text-slate-400'}`}>
          {label}
        </span>
      )}
    </div>
  );
}

// ─── Slide definitions ───────────────────────────────────────────────────────
const SLIDES = [
  // 1 — Introdução
  {
    id: '1',
    title: 'O Ecossistema de Dados',
    subtitle: 'Quem são os profissionais que movem o mundo dos dados?',
    tag: 'INTRODUÇÃO',
    accent: 'emerald',
    content: (
      <div className="space-y-10">
        <p className="text-xl text-slate-300 text-center leading-relaxed font-light max-w-2xl mx-auto">
          O mercado de dados não tem <span className="text-emerald-400 font-bold">um único</span> tipo de profissional.
          Existem <span className="text-amber-400 font-bold">três perfis principais</span>, cada um com um papel único no ciclo de vida dos dados.
        </p>

        {/* 3 characters */}
        <div className="flex justify-center gap-12 md:gap-20 flex-wrap">
          <FloatSprite character={0} state="idle" scale={5} label="Analista" labelColor="text-pink-400" />
          <FloatSprite character={2} state="idle" scale={5} label="Cientista" labelColor="text-violet-400" />
          <FloatSprite character={1} state="idle" scale={5} label="Engenheiro" labelColor="text-teal-400" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm">
          <div className="p-4 bg-pink-500/5 border border-pink-500/20 rounded-2xl">
            <BarChart2 className="w-6 h-6 text-pink-400 mx-auto mb-2" />
            <span className="text-pink-300 font-bold">Analista de Dados</span>
            <p className="text-slate-500 text-xs mt-1">Transforma dados em insights visuais</p>
          </div>
          <div className="p-4 bg-violet-500/5 border border-violet-500/20 rounded-2xl">
            <Brain className="w-6 h-6 text-violet-400 mx-auto mb-2" />
            <span className="text-violet-300 font-bold">Cientista de Dados</span>
            <p className="text-slate-500 text-xs mt-1">Cria modelos preditivos e algoritmos de IA</p>
          </div>
          <div className="p-4 bg-teal-500/5 border border-teal-500/20 rounded-2xl">
            <Server className="w-6 h-6 text-teal-400 mx-auto mb-2" />
            <span className="text-teal-300 font-bold">Engenheiro de Dados</span>
            <p className="text-slate-500 text-xs mt-1">Constrói a infraestrutura que sustenta tudo</p>
          </div>
        </div>
      </div>
    ),
  },

  // 2 — Analista de Dados
  {
    id: '2',
    title: 'O Analista de Dados',
    subtitle: 'O contador de histórias com números',
    tag: 'TEORIA 01',
    accent: 'pink',
    content: (
      <div className="flex flex-col md:flex-row gap-10 items-center">
        <div className="flex flex-col items-center gap-3 shrink-0">
          <FloatSprite character={0} state="run" scale={5} />
          <span className="text-xs font-black text-pink-400 tracking-widest">ANALISTA</span>
        </div>
        <div className="flex-1 space-y-6">
          <div className="space-y-2">
            <p className="text-slate-300 leading-relaxed">
              O Analista de Dados é o profissional que <span className="text-pink-400 font-bold">examina, processa e visualiza</span> dados para fornecer insights que guiam decisões de negócio. É a ponte entre os dados brutos e os gestores.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { icon: BarChart2, label: 'Power BI / Tableau', desc: 'Dashboards interativos' },
              { icon: Database, label: 'SQL', desc: 'Consultas e filtros' },
              { icon: Code2, label: 'Excel Avançado', desc: 'Pivot tables, fórmulas' },
              { icon: TrendingUp, label: 'Análise Exploratória', desc: 'EDA e identificação de padrões' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-slate-900/60 border border-pink-500/10 rounded-xl">
                <item.icon className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-white">{item.label}</div>
                  <div className="text-xs text-slate-500">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-pink-950/30 border border-pink-500/20 rounded-2xl">
            <p className="text-xs text-pink-200 italic">
              💬 <strong>Caso real:</strong> A TechZone contratou um Analista para examinar interações e histórico de compras dos clientes — gerando relatórios que reduziram o tempo de atendimento em 30%.
            </p>
          </div>
        </div>
      </div>
    ),
  },

  // 3 — Cientista de Dados
  {
    id: '3',
    title: 'O Cientista de Dados',
    subtitle: 'O alquimista que prevê o futuro',
    tag: 'TEORIA 02',
    accent: 'violet',
    content: (
      <div className="flex flex-col md:flex-row gap-10 items-center">
        <div className="flex flex-col items-center gap-3 shrink-0">
          <FloatSprite character={2} state="attack" scale={5} />
          <span className="text-xs font-black text-violet-400 tracking-widest">CIENTISTA</span>
        </div>
        <div className="flex-1 space-y-6">
          <p className="text-slate-300 leading-relaxed">
            O Cientista de Dados <span className="text-violet-400 font-bold">desenvolve algoritmos e modelos de Machine Learning</span> para extrair conhecimento profundo e prever comportamentos futuros — vai além do descritivo e entra no preditivo.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { icon: Brain, label: 'Python / R', desc: 'scikit-learn, pandas, numpy' },
              { icon: Star, label: 'Machine Learning', desc: 'Modelos preditivos e classificação' },
              { icon: Layers, label: 'Deep Learning', desc: 'TensorFlow / PyTorch' },
              { icon: Code2, label: 'NLP', desc: 'Análise de sentimento, LLMs' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-slate-900/60 border border-violet-500/10 rounded-xl">
                <item.icon className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-white">{item.label}</div>
                  <div className="text-xs text-slate-500">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-violet-950/30 border border-violet-500/20 rounded-2xl">
            <p className="text-xs text-violet-200 italic">
              💬 <strong>Caso real:</strong> A Global Investments Inc. contratou um Cientista para desenvolver algoritmos que analisam tendências de mercado e indicadores econômicos, guiando investimentos multimilionários.
            </p>
          </div>
        </div>
      </div>
    ),
  },

  // 4 — Engenheiro de Dados
  {
    id: '4',
    title: 'O Engenheiro de Dados',
    subtitle: 'O arquiteto invisível dos dados',
    tag: 'TEORIA 03',
    accent: 'teal',
    content: (
      <div className="flex flex-col md:flex-row gap-10 items-center">
        <div className="flex flex-col items-center gap-3 shrink-0">
          <FloatSprite character={1} state="run" scale={5} />
          <span className="text-xs font-black text-teal-400 tracking-widest">ENGENHEIRO</span>
        </div>
        <div className="flex-1 space-y-6">
          <p className="text-slate-300 leading-relaxed">
            O Engenheiro de Dados <span className="text-teal-400 font-bold">projeta e mantém a infraestrutura</span> que coleta, armazena e entrega dados para que analistas e cientistas possam fazer seu trabalho. Sem ele, nada funciona em escala.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { icon: Server, label: 'Apache Spark / Kafka', desc: 'Processamento em larga escala' },
              { icon: Database, label: 'Data Lakes / Warehouses', desc: 'S3, BigQuery, Snowflake' },
              { icon: Wrench, label: 'ETL / ELT Pipelines', desc: 'dbt, Airflow, Luigi' },
              { icon: Layers, label: 'Integração de Fontes', desc: 'APIs, bancos, arquivos flat' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-slate-900/60 border border-teal-500/10 rounded-xl">
                <item.icon className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-white">{item.label}</div>
                  <div className="text-xs text-slate-500">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-teal-950/30 border border-teal-500/20 rounded-2xl">
            <p className="text-xs text-teal-200 italic">
              💬 <strong>Caso real:</strong> A GreenGrocers Co. contratou um Engenheiro para integrar dados de estoque, distribuidoras e fornecedores em um único pipeline — otimizando sua logística de supply chain.
            </p>
          </div>
        </div>
      </div>
    ),
  },

  // 5 — Drag & Drop
  {
    id: '5',
    title: 'Quem Faz o Quê?',
    subtitle: 'Arraste cada tarefa para o profissional correto',
    tag: 'INTERAÇÃO',
    accent: 'amber',
    content: <RoleSorter />,
  },

  // 6 — Estudo de Caso
  {
    id: '6',
    title: 'Missões Reais',
    subtitle: 'Em qual empresa você atuaria?',
    tag: 'ESTUDO DE CASO',
    accent: 'rose',
    content: (
      <div className="space-y-5 max-w-3xl mx-auto">
        <p className="text-slate-400 text-sm text-center">Leia cada cenário e clique na função correta. Depois veja a explicação!</p>
        {[
          {
            company: 'TechZone 🛒',
            scenario: 'Melhorar o suporte ao cliente examinando interações e histórico de compras para identificar padrões.',
            answer: 0,
            options: ['Analista de Dados', 'Cientista de Dados', 'Engenheiro de Dados'],
            explanation: 'É uma tarefa de análise descritiva e EDA — território do Analista!',
          },
          {
            company: 'Global Investments 💹',
            scenario: 'Desenvolver algoritmos para analisar tendências de mercado e indicadores econômicos.',
            answer: 1,
            options: ['Analista de Dados', 'Cientista de Dados', 'Engenheiro de Dados'],
            explanation: 'Algoritmos preditivos e modelos de mercado são domínio do Cientista de Dados.',
          },
          {
            company: 'GreenGrocers 🥦',
            scenario: 'Projetar infraestrutura de dados integrando informações de várias fontes para otimizar estoque.',
            answer: 2,
            options: ['Analista de Dados', 'Cientista de Dados', 'Engenheiro de Dados'],
            explanation: 'Infraestrutura, pipelines e integração de fontes = Engenheiro de Dados!',
          },
        ].map((item, qi) => <CaseQuestion key={qi} {...item} />)}
      </div>
    ),
  },

  // 7 — Ferramentas
  {
    id: '7',
    title: 'O Mapa das Ferramentas',
    subtitle: 'Cada profissional tem seu arsenal tecnológico',
    tag: 'TEORIA 04',
    accent: 'blue',
    content: (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            role: 'Analista',
            color: 'pink',
            border: 'border-pink-500/30',
            bg: 'bg-pink-500/5',
            title: 'text-pink-400',
            char: 0 as const,
            tools: ['SQL', 'Power BI', 'Tableau', 'Excel', 'Google Sheets', 'Looker Studio'],
            skills: ['Storytelling com dados', 'Comunicação executiva', 'EDA'],
          },
          {
            role: 'Cientista',
            color: 'violet',
            border: 'border-violet-500/30',
            bg: 'bg-violet-500/5',
            title: 'text-violet-400',
            char: 2 as const,
            tools: ['Python', 'R', 'Jupyter', 'scikit-learn', 'TensorFlow', 'MLflow'],
            skills: ['Machine Learning', 'Estatística Avançada', 'Feature Engineering'],
          },
          {
            role: 'Engenheiro',
            color: 'teal',
            border: 'border-teal-500/30',
            bg: 'bg-teal-500/5',
            title: 'text-teal-400',
            char: 1 as const,
            tools: ['Apache Spark', 'Kafka', 'Airflow', 'dbt', 'BigQuery', 'Docker/K8s'],
            skills: ['Arquitetura de Dados', 'Engenharia de Software', 'Cloud (AWS/GCP/Azure)'],
          },
        ].map((col, i) => (
          <div key={i} className={`rounded-2xl border ${col.border} ${col.bg} p-5 space-y-4`}>
            <div className="flex items-center gap-3">
              <Sprite character={col.char} state="idle" scale={3} />
              <span className={`text-sm font-black uppercase tracking-wider ${col.title}`}>{col.role}</span>
            </div>
            <div>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Ferramentas</div>
              <div className="flex flex-wrap gap-1.5">
                {col.tools.map(t => (
                  <span key={t} className="text-xs bg-slate-900 border border-slate-700 text-slate-300 px-2 py-0.5 rounded-lg">{t}</span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Competências</div>
              <ul className="space-y-1">
                {col.skills.map(s => (
                  <li key={s} className="text-xs text-slate-400 flex items-center gap-2">
                    <span className={`w-1 h-1 rounded-full bg-${col.color}-400`} />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    ),
  },

  // 8 — Tool Matcher
  {
    id: '8',
    title: 'Match de Ferramentas',
    subtitle: 'Conecte a ferramenta ao profissional que a usa',
    tag: 'INTERAÇÃO',
    accent: 'blue',
    content: <ToolMatcher />,
  },

  // 9 — Trajetórias de Carreira
  {
    id: '9',
    title: 'Trajetórias de Carreira',
    subtitle: 'De onde você parte e para onde pode chegar',
    tag: 'TEORIA 05',
    accent: 'amber',
    content: (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              role: 'Analista de Dados',
              char: 0 as const,
              levels: ['Jr. Analyst → Analyst → Sr. Analyst', 'Data Analyst Manager', 'BI Lead / Director of Analytics'],
              certs: ['Google Data Analytics', 'Microsoft PL-300 (Power BI)', 'Databricks SQL Analyst'],
              salary: 'R$ 4k – 18k',
              color: 'pink',
            },
            {
              role: 'Cientista de Dados',
              char: 2 as const,
              levels: ['Jr. Data Scientist → Data Scientist', 'Sr. Data Scientist / Staff', 'Chief Data Scientist / Head of AI'],
              certs: ['IBM Data Science Professional', 'DeepLearning.AI Specialization', 'Kaggle Competitions'],
              salary: 'R$ 7k – 30k',
              color: 'violet',
            },
            {
              role: 'Engenheiro de Dados',
              char: 1 as const,
              levels: ['Jr. Data Engineer → Data Engineer', 'Sr. Data Engineer / Staff', 'Data Architect / VP Engineering'],
              certs: ['AWS Data Analytics', 'Google Cloud Professional DE', 'Databricks Associate DE'],
              salary: 'R$ 8k – 35k',
              color: 'teal',
            },
          ].map((col, i) => (
            <div key={i} className={`bg-slate-900/60 border border-${col.color}-500/20 rounded-2xl p-5 space-y-4`}>
              <div className="flex items-center gap-3">
                <Sprite character={col.char} state="idle" scale={3} />
                <div>
                  <div className={`text-xs font-black text-${col.color}-400 uppercase tracking-widest`}>{col.role}</div>
                  <div className="text-sm font-bold text-white mt-0.5">{col.salary}</div>
                </div>
              </div>
              <div>
                <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> Progressão
                </div>
                {col.levels.map((l, li) => (
                  <div key={li} className="flex items-center gap-2 mb-1">
                    <div className={`w-1.5 h-1.5 rounded-full bg-${col.color}-400 shrink-0`} />
                    <span className="text-xs text-slate-400">{l}</span>
                  </div>
                ))}
              </div>
              <div>
                <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2 flex items-center gap-1">
                  <Briefcase className="w-3 h-3" /> Certificações
                </div>
                {col.certs.map((c, ci) => (
                  <span key={ci} className={`inline-block text-[10px] bg-${col.color}-500/10 border border-${col.color}-500/20 text-${col.color}-300 px-2 py-0.5 rounded-lg mr-1 mb-1`}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center p-4 bg-slate-900/40 border border-slate-800 rounded-2xl">
          <p className="text-xs text-slate-500 italic">Os salários são estimativas de mercado para profissionais no Brasil. Variam por empresa, cidade e senioridade.</p>
        </div>
      </div>
    ),
  },

  // 10 — Profile Quiz
  {
    id: '10',
    title: 'Qual É o Seu Perfil?',
    subtitle: 'Descubra qual profissional de dados você é!',
    tag: 'LABORATÓRIO',
    accent: 'violet',
    content: <ProfileQuiz />,
  },

  // 11 — Flashcards
  {
    id: '11',
    title: 'Flashcards de Revisão',
    subtitle: 'Fixe os conceitos-chave da aula',
    tag: 'FLASHCARDS',
    accent: 'amber',
    content: <Flashcards />,
  },

  // 12 — Encerramento
  {
    id: '12',
    title: 'Fim da Aula 3',
    subtitle: 'O ecossistema de dados agora faz sentido',
    tag: 'ENCERRAMENTO',
    accent: 'emerald',
    content: (
      <div className="text-center space-y-10 py-8">
        {/* Characters celebrating */}
        <div className="flex justify-center gap-10 md:gap-16 flex-wrap">
          <FloatSprite character={0} state="jump" scale={5} label="Analista" labelColor="text-pink-400" />
          <FloatSprite character={2} state="jump" scale={5} label="Cientista" labelColor="text-violet-400" />
          <FloatSprite character={1} state="jump" scale={5} label="Engenheiro" labelColor="text-teal-400" />
        </div>

        <div className="space-y-4">
          <div className="w-16 h-16 bg-emerald-500/10 rounded-full border-2 border-emerald-500/30 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
          </div>
          <h3 className="text-4xl md:text-5xl font-black text-white">Missão Cumprida!</h3>
          <p className="text-lg text-slate-400 max-w-lg mx-auto leading-relaxed">
            Você agora sabe diferenciar os <span className="text-pink-400 font-bold">3 perfis</span> do mundo de dados,
            conhece as <span className="text-blue-400 font-bold">ferramentas</span> de cada um e descobriu
            <span className="text-violet-400 font-bold"> qual é o seu!</span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto text-left">
          {[
            { icon: Users, label: '3 Perfis', value: 'Analista, Cientista, Engenheiro', color: 'text-pink-400' },
            { icon: Wrench, label: 'Arsenal Tech', value: 'SQL, Python, Spark e muito mais', color: 'text-blue-400' },
            { icon: TrendingUp, label: 'Carreira', value: 'Trajetórias e certificações mapeadas', color: 'text-emerald-400' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-4 bg-slate-900/60 border border-slate-800 rounded-2xl">
              <item.icon className={`w-5 h-5 ${item.color} shrink-0 mt-0.5`} />
              <div>
                <div className={`text-xs font-black uppercase tracking-widest ${item.color}`}>{item.label}</div>
                <div className="text-xs text-slate-400 mt-0.5">{item.value}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4">
          <Link
            to="/data"
            className="inline-flex items-center gap-3 bg-white text-slate-950 font-black px-10 py-5 rounded-2xl hover:scale-105 transition-transform shadow-2xl shadow-white/10 group"
          >
            VOLTAR AO SYLLABUS
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    ),
  },
];

// ─── Case Study Question helper ─────────────────────────────────────────────
function CaseQuestion({
  company, scenario, answer, options, explanation,
}: {
  company: string; scenario: string; answer: number; options: string[]; explanation: string;
}) {
  const [chosen, setChosen] = useState<number | null>(null);

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
      <div className="flex items-start gap-3">
        <Briefcase className="w-4 h-4 text-rose-400 shrink-0 mt-1" />
        <div>
          <div className="text-xs font-black text-rose-400 uppercase tracking-widest">{company}</div>
          <p className="text-sm text-slate-300 mt-1 leading-relaxed">{scenario}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((opt, i) => (
          <button
            key={i}
            disabled={chosen !== null}
            onClick={() => setChosen(i)}
            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all
              ${chosen === null
                ? 'border-slate-700 bg-slate-900 text-slate-400 hover:border-amber-400/60 hover:text-amber-200'
                : i === answer
                  ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300'
                  : chosen === i
                    ? 'border-rose-500 bg-rose-950/40 text-rose-300 line-through opacity-70'
                    : 'border-slate-800 text-slate-600 opacity-40'
              }`}
          >
            {opt}
          </button>
        ))}
      </div>
      {chosen !== null && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-xs p-3 rounded-xl border ${chosen === answer ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300' : 'bg-rose-950/30 border-rose-500/30 text-rose-300'}`}
        >
          {chosen === answer ? '✅' : '❌'} {explanation}
        </motion.div>
      )}
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export function DataLesson3() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number) => {
    const next = currentSlide + newDirection;
    if (next >= 0 && next < SLIDES.length) {
      setDirection(newDirection);
      setCurrentSlide(next);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') paginate(1);
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') paginate(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const slide = SLIDES[currentSlide];
  const isInteractive = ['INTERAÇÃO', 'LABORATÓRIO', 'FLASHCARDS', 'ESTUDO DE CASO'].includes(slide.tag);

  const accentMap: Record<string, string> = {
    emerald: '#10b981', pink: '#ec4899', violet: '#8b5cf6',
    teal: '#14b8a6', amber: '#f59e0b', blue: '#3b82f6', rose: '#f43f5e',
  };
  const accentHex = accentMap[slide.accent] ?? '#10b981';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-emerald-500/30 overflow-x-hidden relative flex flex-col">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          key={slide.accent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(ellipse at top right, ${accentHex}1a 0%, rgba(2,6,23,1) 100%)`,
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-20 px-6 py-5 flex justify-between items-center border-b border-slate-800 backdrop-blur-md bg-slate-950/40">
        <div className="flex items-center gap-4">
          <Link to="/data" className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center transition-colors">
            <ChevronLeft className="w-5 h-5 text-white" />
          </Link>
          <div>
            <h1 className="text-sm font-black tracking-widest text-slate-400 uppercase">
              Análise de Dados <span className="text-emerald-400 border-l border-white/20 pl-2 ml-1">AULA 3 • PAPÉIS & RESPONSABILIDADES</span>
            </h1>
            <div className="flex gap-1 mt-1">
              <div className="h-0.5 w-6 bg-pink-500 rounded-full" />
              <div className="h-0.5 w-6 bg-violet-500 rounded-full" />
              <div className="h-0.5 w-6 bg-teal-500 rounded-full" />
              <div className="h-0.5 w-6 bg-amber-500 rounded-full" />
            </div>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-5">
          <div className="flex space-x-1">
            {SLIDES.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all ${i === currentSlide ? 'w-6 shadow-[0_0_8px_rgba(255,255,255,0.3)]' : 'w-2 bg-slate-800'}`}
                style={i === currentSlide ? { backgroundColor: accentHex } : {}}
              />
            ))}
          </div>
          <div className="text-[10px] font-mono text-slate-500 font-bold tracking-tighter w-12 text-right">
            {currentSlide + 1} / {SLIDES.length}
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 container mx-auto px-4 py-8 md:py-10 flex items-start md:items-center justify-center flex-1 pb-32">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 60 : -60, filter: 'blur(8px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: direction > 0 ? -60 : 60, filter: 'blur(8px)' }}
            transition={{ type: 'spring', stiffness: 220, damping: 28 }}
            className={`w-full ${isInteractive ? 'max-w-5xl' : 'max-w-3xl'} flex flex-col`}
          >
            <div className="space-y-6 w-full">
              {/* Slide header */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-2">
                <span
                  className="inline-block px-3 py-1 rounded-full text-[10px] font-black tracking-[0.2em] border"
                  style={{ color: accentHex, borderColor: `${accentHex}50`, backgroundColor: `${accentHex}10` }}
                >
                  {slide.tag}
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-white leading-tight underline decoration-white/10 decoration-wavy underline-offset-8">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl text-slate-400 font-medium">{slide.subtitle}</p>
              </motion.div>

              {/* Slide content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className={`w-full mx-auto mt-6 ${!isInteractive ? 'bg-slate-900/60 backdrop-blur-xl border border-slate-700 p-8 md:p-12 rounded-[3.5rem] shadow-2xl' : ''}`}
              >
                {slide.content}
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer nav */}
      <footer className="fixed bottom-0 left-0 w-full p-6 z-20 flex justify-between items-center pointer-events-none">
        <button
          onClick={() => paginate(-1)}
          disabled={currentSlide === 0}
          className="pointer-events-auto p-4 rounded-3xl bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900 transition-all disabled:opacity-20 backdrop-blur-xl group shadow-lg"
        >
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
        </button>
        <button
          onClick={() => paginate(1)}
          disabled={currentSlide === SLIDES.length - 1}
          className="pointer-events-auto p-4 rounded-3xl text-white transition-all disabled:opacity-20 backdrop-blur-xl group shadow-lg border"
          style={{
            backgroundColor: `${accentHex}dd`,
            borderColor: `${accentHex}80`,
            boxShadow: `0 0 30px ${accentHex}33`,
          }}
        >
          <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>
      </footer>
    </div>
  );
}
