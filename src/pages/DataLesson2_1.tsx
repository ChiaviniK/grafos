import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Database, LayoutGrid, FileJson, FileText, Eraser } from 'lucide-react';
import { Link } from 'react-router-dom';

import { StructuredPractice } from '../components/data/aula2-1/StructuredPractice';
import { SemiStructuredPractice } from '../components/data/aula2-1/SemiStructuredPractice';
import { UnstructuredPractice } from '../components/data/aula2-1/UnstructuredPractice';
import { DataCleaningPractice } from '../components/data/aula2-1/DataCleaningPractice';
import { CosmeticsDatasetExport } from '../components/data/aula2-1/CosmeticsDatasetExport';

const SLIDES = [
  {
    id: '1',
    title: 'Dados Estruturados',
    subtitle: 'A Perfeição Relacional',
    tag: 'TEORIA 01',
    image: '',
    accent: 'blue',
    content: (
      <div className="space-y-6">
        <p className="text-2xl font-light text-slate-300 leading-relaxed">
          O sonho de todo Analista: Dados organizados em <span className="text-blue-400 font-bold">Linhas e Colunas</span> perfeitas.
        </p>
        <div className="h-px w-full bg-gradient-to-r from-blue-500/50 to-transparent my-6" />
        <p className="text-slate-400">
          Dados Estruturados residem em Bancos de Dados Relacionais (SQL). Cada informação pertence a um campo bem definido (Ex: ID, Nome, Idade, Salário). São os dados mais fáceis de filtrar, somar e criar gráficos. Pense neles como planilhas exatas e rígidas do Excel.
        </p>
        <div className="flex gap-4 p-4 mt-6 bg-slate-900 rounded-xl border-l-4 border-blue-500">
           <LayoutGrid className="w-8 h-8 text-blue-400" />
           <p className="text-sm text-slate-300"><strong>Vantagem:</strong> Busca extremamente rápida e precisa.<br/><strong>Desvantagem:</strong> Não aceitam mudanças fáceis. Inserir um novo tipo de dado requer remodelar a tabela inteira.</p>
        </div>
      </div>
    )
  },
  {
    id: '2',
    title: '[GAME] Prática: Filtro Estruturado',
    subtitle: 'Acionando o Banco de Dados',
    tag: 'INTERAÇÃO',
    image: '',
    accent: 'blue',
    content: <StructuredPractice />
  },
  {
    id: '3',
    title: 'Dados Semi-estruturados',
    subtitle: 'Poder e Flexibilidade (JSON/XML)',
    tag: 'TEORIA 02',
    image: '',
    accent: 'emerald',
    content: (
      <div className="space-y-6">
         <p className="text-2xl font-light text-slate-300 leading-relaxed">
           E se a gente não souber quais colunas vamos precisar no futuro? Entra o <span className="text-emerald-400 font-bold">JSON</span>.
         </p>
         <div className="h-px w-full bg-gradient-to-r from-emerald-500/50 to-transparent my-6" />
         <p className="text-slate-400">
           Os dados Semi-estruturados não possuem o formato de tabela estrita. Eles contêm marcadores ou "tags" que separam elementos semânticos. A web moderna respira JSON (JavaScript Object Notation), onde as coisas são guardadas no formato de `Chave: Valor`.
         </p>
         <div className="flex gap-4 p-4 mt-6 bg-slate-900 rounded-xl border-l-4 border-emerald-500">
             <FileJson className="w-8 h-8 text-emerald-400" />
             <p className="text-sm text-slate-300">Se o cliente 1 só tem "Email" e o cliente 2 tem "Email, Telefone, e Endereço", o JSON acomoda ambos perfeitamente, sem precisar criar colunas vazias gigantescas num banco de dados.</p>
         </div>
      </div>
    )
  },
  {
    id: '4',
    title: '[GAME] Navegação em Grafo Semântico',
    subtitle: 'Navegando no Objeto',
    tag: 'INTERAÇÃO',
    image: '',
    accent: 'emerald',
    content: <SemiStructuredPractice />
  },
  {
    id: '5',
    title: 'Dados Não Estruturados',
    subtitle: 'O Caos do Mundo Real',
    tag: 'TEORIA 03',
    image: '',
    accent: 'purple',
    content: (
      <div className="space-y-6">
         <p className="text-2xl font-light text-slate-300 leading-relaxed">
           <strong>80% a 90%</strong> de todos os dados do mundo são <span className="text-purple-400 font-bold">Não Estruturados</span>.
         </p>
         <div className="h-px w-full bg-gradient-to-r from-purple-500/50 to-transparent my-6" />
         <p className="text-slate-400">
           São arquivos pesados ou complexos sem modelo de dados pré-definido: Áudios, Vídeos, Imagens, e principalmente: <strong>Textos em Linguagem Natural (E-mails, PDFs, Reviews, Tweets)</strong>. Para um computador, é um grande bloco binário indigerível sem uso de Inteligência Artificial.
         </p>
         <div className="flex gap-4 p-4 mt-6 bg-slate-900 rounded-xl border-l-4 border-purple-500">
             <FileText className="w-8 h-8 text-purple-400" />
             <p className="text-sm text-slate-300">A mágica da Análise Avançada é usar algoritmos (NLP - Processamento de Linguagem Natural) para ler, por exemplo, 10.000 reclamações de clientes e converter o texto cru num Dado Estruturado do tipo: Problema Principal = X.</p>
         </div>
      </div>
    )
  },
  {
    id: '6',
    title: '[GAME] Você é o Algoritmo NLP',
    subtitle: 'Mineração de Sentimentos',
    tag: 'INTERAÇÃO',
    image: '',
    accent: 'purple',
    content: <UnstructuredPractice />
  },
  {
    id: '7',
    title: 'Garbage In, Garbage Out',
    subtitle: 'O Impacto da Limpeza (Data Cleaning)',
    tag: 'TEORIA 04',
    image: '',
    accent: 'rose',
    content: (
      <div className="space-y-6">
         <p className="text-2xl font-light text-slate-300 leading-relaxed">
           O modelo de predição do Uber não funciona se o cliente digitar <span className="text-rose-400 font-bold">"Rua Abacxtei, 100"</span>.
         </p>
         <div className="h-px w-full bg-gradient-to-r from-rose-500/50 to-transparent my-6" />
         <p className="text-slate-400">
           <strong>GIGO</strong> (Lixo Entra, Lixo Sai). Se o banco de dados tem falhas de preenchimento, datas trocadas ou valores absurdos, os gráficos do seu Dashboard vão contar uma mentira elaborada. O Analista passa até 60% do seu tempo de trabalho limpando e organizando dados antes mesmo de criar o seu primeiro gráfico.
         </p>
         <div className="flex gap-4 p-4 mt-6 bg-slate-900 rounded-xl border-l-4 border-rose-500">
             <Eraser className="w-8 h-8 text-rose-400" />
             <p className="text-sm text-slate-300">Tratar Valores Nulos (`NULL`), remover duplicatas, padronizar formatos de data (`DD/MM/AAAA` vs `MM/DD/AAAA`) e detectar outliers não é perfumaria, é a etapa mais crítica do processo de pipeline de dados.</p>
         </div>
      </div>
    )
  },
  {
    id: '8',
    title: '[GAME] Faxineiro de Dados',
    subtitle: 'Sanitizando a Base',
    tag: 'INTERAÇÃO',
    image: '',
    accent: 'rose',
    content: <DataCleaningPractice />
  },
  {
    id: '9',
    title: 'Projeto Final',
    subtitle: 'Da Teoria à Prática com BeautyData Co.',
    tag: 'LABORATÓRIO',
    image: '',
    accent: 'pink',
    content: <CosmeticsDatasetExport />
  }
];

export function DataLesson2_1() {
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-emerald-500/30 overflow-x-hidden relative flex flex-col">
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Dynamic global background tint based on slide accent */}
        <motion.div 
          animate={{ background: `radial-gradient(ellipse at top right, rgba(var(--tw-colors-${slide.accent}-500), 0.1) 0%, rgba(2,6,23,1) 100%)` }}
          transition={{ duration: 1 }}
          className="absolute inset-0 opacity-80" 
        />
      </div>

      <header className="relative z-20 px-8 py-6 flex justify-between items-center border-b border-slate-800 backdrop-blur-md bg-slate-950/40">
        <div className="flex items-center gap-4">
           <Link to="/data" className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center transition-colors">
              <ChevronLeft className="w-5 h-5 text-white" />
           </Link>
           <div>
              <h1 className="text-sm font-black tracking-widest text-slate-400 uppercase">Análise de Dados <span className={`text-${slide.accent}-400 border-l border-white/20 pl-2 ml-1`}>AULA 2.1 • LAB PRACTICES</span></h1>
              <div className="flex gap-1 mt-1">
                 <div className="h-0.5 w-8 bg-blue-500 rounded-full" />
                 <div className="h-0.5 w-8 bg-emerald-500 rounded-full" />
                 <div className="h-0.5 w-8 bg-purple-500 rounded-full" />
                 <div className="h-0.5 w-8 bg-rose-500 rounded-full" />
              </div>
           </div>
        </div>
        
        <div className="flex items-center gap-6 hidden sm:flex">
           <div className="flex space-x-1">
              {SLIDES.map((_, i) => (
                <div key={i} className={`h-2 rounded-full transition-all ${i === currentSlide ? `w-6 bg-${slide.accent}-500 shadow-[0_0_10px_rgba(var(--tw-colors-${slide.accent}-500),0.5)]` : 'w-2 bg-slate-800'}`} />
              ))}
           </div>
           <div className="text-[10px] font-mono text-slate-500 font-bold tracking-tighter w-12 text-right">
             {currentSlide + 1} / {SLIDES.length}
           </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12 flex items-center justify-center flex-1 pb-32">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 50 : -50, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: direction > 0 ? -50 : 50, filter: 'blur(10px)' }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className={`w-full max-w-7xl flex flex-col items-center justify-center`}
          >
            <div className={`space-y-6 w-full ${slide.tag === 'INTERAÇÃO' || slide.tag === 'LABORATÓRIO' ? 'max-w-4xl' : 'max-w-3xl'}`}>
               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-2">
                  <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black tracking-[0.2em] bg-${slide.accent}-500/10 text-${slide.accent}-400 border border-${slide.accent}-500/30`}>
                    {slide.tag}
                  </span>
                  <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">{slide.title}</h2>
                  <p className="text-lg md:text-xl text-slate-400 font-medium">{slide.subtitle}</p>
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0, scale: 0.98 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: 0.1 }}
                 className={`w-full mx-auto mt-8 ${slide.tag.includes('TEORIA') ? 'bg-slate-900/60 backdrop-blur-xl border border-slate-700 p-8 md:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden' : ''}`}
               >
                  {slide.tag.includes('TEORIA') && (
                     <Database className={`absolute -bottom-10 -right-10 w-64 h-64 text-${slide.accent}-500/5 rotate-12 pointer-events-none`} />
                  )}
                  {slide.content}
               </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="fixed bottom-0 left-0 w-full p-6 z-20 flex justify-between items-center pointer-events-none">
        <button onClick={() => paginate(-1)} disabled={currentSlide === 0} className="pointer-events-auto p-4 rounded-full bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900 transition-all disabled:opacity-20 backdrop-blur-xl group shadow-lg">
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
        </button>
        <button onClick={() => paginate(1)} disabled={currentSlide === SLIDES.length - 1} className={`pointer-events-auto p-4 rounded-full bg-${slide.accent}-600/90 border border-${slide.accent}-400/50 text-white hover:bg-${slide.accent}-500 shadow-[0_0_30px_rgba(var(--tw-colors-${slide.accent}-500),0.5)] transition-all disabled:opacity-20 backdrop-blur-xl group`}>
          <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>
      </footer>
    </div>
  );
}
