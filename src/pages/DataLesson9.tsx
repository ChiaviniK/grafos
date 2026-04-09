import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Crosshair, Search, Target, CheckCircle2, ArrowRight, LayoutList, Database, BrainCircuit } from 'lucide-react';
import { Link } from 'react-router-dom';

import { ProblemSolvingLab } from '../components/data/aula9/ProblemSolvingLab';
import { SqlExcelLab } from '../components/data/aula9/SqlExcelLab';

const SLIDES = [
  {
    id: 'intro',
    title: 'Resolução de Problemas',
    subtitle: 'Navegando no Caos Organizacional',
    tag: 'INTRODUÇÃO',
    accent: 'emerald',
    content: (
      <div className="space-y-6">
        <p className="text-2xl font-light text-slate-300 leading-relaxed text-center sm:text-left">
           Na vida corporativa e na engenharia de software, problemas são <span className="text-emerald-400 font-bold italic">inevitáveis</span>. A diferença entre um bom profissional e um excelente profissional é o método como eles os resolvem.
        </p>
        <div className="h-px w-full bg-gradient-to-r from-emerald-500/50 to-transparent my-6" />
        <p className="text-slate-400 leading-relaxed text-lg">
           Não confie apenas na intuição. O processo de Resolução de Problemas exige analisar anomalias, organizar dados (SQL, Excel, Python) e implementar soluções precisas.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
           <div className="p-4 bg-slate-900/80 rounded-2xl border border-emerald-500/20">
              <Crosshair className="w-6 h-6 text-emerald-400 mb-2" />
              <div className="text-sm font-bold text-white uppercase tracking-tighter">Foco</div>
              <p className="text-xs text-slate-500 mt-1">Isolar variáveis, como uma lupa sobre o código.</p>
           </div>
           <div className="p-4 bg-slate-900/80 rounded-2xl border border-emerald-500/20">
              <LayoutList className="w-6 h-6 text-emerald-400 mb-2" />
              <div className="text-sm font-bold text-white uppercase tracking-tighter">Processo</div>
              <p className="text-xs text-slate-500 mt-1">Dividir o problema grande em pedaços pequenos e testáveis.</p>
           </div>
        </div>
      </div>
    )
  },
  {
    id: 'stages',
    title: 'As 4 Etapas Cruciais',
    subtitle: 'Uma bússola para a crise',
    tag: 'TEORIA',
    accent: 'emerald',
    content: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
        <div className="bg-slate-900 p-6 rounded-3xl border border-blue-500/20 space-y-3 relative overflow-hidden group hover:border-blue-500/50 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all"><Search className="w-20 h-20 text-blue-500" /></div>
          <div className="text-blue-400 font-black text-2xl">01</div>
          <h4 className="text-white font-bold uppercase tracking-widest text-sm">Identificar</h4>
          <p className="text-slate-400 text-sm leading-relaxed">Qual é exatamente o problema? Localize gargalos, erros ou discrepâncias. Um problema bem definido é um problema metade resolvido.</p>
        </div>
        <div className="bg-slate-900 p-6 rounded-3xl border border-purple-500/20 space-y-3 relative overflow-hidden group hover:border-purple-500/50 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all"><Database className="w-20 h-20 text-purple-500" /></div>
          <div className="text-purple-400 font-black text-2xl">02</div>
          <h4 className="text-white font-bold uppercase tracking-widest text-sm">Coletar Dados</h4>
          <p className="text-slate-400 text-sm leading-relaxed">Use consultas SQL, APIs, converse com equipes de suporte. Entenda as métricas. Como o problema surgiu? Quem é afetado?</p>
        </div>
        <div className="bg-slate-900 p-6 rounded-3xl border border-yellow-500/20 space-y-3 relative overflow-hidden group hover:border-yellow-500/50 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all"><BrainCircuit className="w-20 h-20 text-yellow-500" /></div>
          <div className="text-yellow-400 font-black text-2xl">03</div>
          <h4 className="text-white font-bold uppercase tracking-widest text-sm">Gerar Alternativas</h4>
          <p className="text-slate-400 text-sm leading-relaxed">Pense fora da caixa. Brainstorming contínuo. Existe mais de uma solução? Quais os riscos e custos de cada uma?</p>
        </div>
        <div className="bg-slate-900 p-6 rounded-3xl border border-emerald-500/20 space-y-3 relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all"><Target className="w-20 h-20 text-emerald-500" /></div>
          <div className="text-emerald-400 font-black text-2xl">04</div>
          <h4 className="text-white font-bold uppercase tracking-widest text-sm">Implementar</h4>
          <p className="text-slate-400 text-sm leading-relaxed">Execução técnica. Colocar a arquitetura no ar, aplicar os patches, rodar os pipelines. Resolver.</p>
        </div>
      </div>
    )
  },
  {
    id: 'sql-excel',
    title: 'Extrator & Analisador',
    subtitle: 'Prática: Identificando o problema da GenPhone X',
    tag: 'LABORATÓRIO TÉCNICO',
    accent: 'blue',
    content: (
      <div className="space-y-6">
        <SqlExcelLab />
      </div>
    )
  },
  {
    id: 'mindset',
    title: 'Estratégias Mentais',
    subtitle: 'Superando Obstáculos",',
    tag: 'SOFT SKILLS',
    accent: 'emerald',
    content: (
      <div className="space-y-8">
         <p className="text-lg text-slate-300 text-center max-w-2xl mx-auto">
            A técnica não é nada sem a <span className="text-emerald-400 font-black">mente preparada</span>. Resoluções complexas causam frustração e podem levar ao pânico corporativo.
         </p>
         <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none text-sm text-slate-400 font-medium">
            <li className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex gap-3 items-start">
               <span className="text-emerald-400 font-black text-lg">1.</span>
               <div><strong className="text-white block mb-1">Visualização:</strong> Use gráficos, diagramas UML, fluxogramas. O cérebro processa imagens muito mais rápido que texto.</div>
            </li>
            <li className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex gap-3 items-start">
               <span className="text-emerald-400 font-black text-lg">2.</span>
               <div><strong className="text-white block mb-1">Dividir para Conquistar:</strong> Fatiar um gargalo de sistema monolítico em pequenos microproblemas testáveis.</div>
            </li>
            <li className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex gap-3 items-start">
               <span className="text-emerald-400 font-black text-lg">3.</span>
               <div><strong className="text-white block mb-1">Aceitar Incertezas:</strong> Planejar para o caos (Data Variability). O retorno de uma API de terceiros nem sempre será 200 OK.</div>
            </li>
            <li className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex gap-3 items-start">
               <span className="text-emerald-400 font-black text-lg">4.</span>
               <div><strong className="text-white block mb-1">Gestão Emocional:</strong> Manter o foco quando os dados não batem ou quando o ambiente de produção cai é uma skill sênior.</div>
            </li>
         </ul>
      </div>
    )
  },
  {
    id: 'lab',
    title: 'Estudo de Caso: GenPhone',
    subtitle: 'Aplique as 4 fases aos funcionários',
    tag: 'PRÁTICA INTERATIVA',
    accent: 'emerald',
    content: (
      <div className="space-y-6">
        <ProblemSolvingLab />
      </div>
    )
  },
  {
    id: 'end',
    title: 'Fim da Aula 9',
    subtitle: 'Navegação de Complexidade Completa',
    tag: 'ENCERRAMENTO',
    accent: 'emerald',
    content: (
      <div className="text-center space-y-8 py-12">
         <div className="w-24 h-24 bg-emerald-500/10 rounded-full border-2 border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-emerald-400" />
         </div>
         <div className="space-y-4">
            <h3 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter uppercase">Nível Subiu!</h3>
            <p className="text-lg text-slate-400 max-w-lg mx-auto">
               Problemas são oportunidades disfarçadas. Você agora sabe isolar, extrair com SQL as causas primárias e implementar com calma e estrutura métrica.
            </p>
         </div>
         <div className="pt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/data" className="inline-flex items-center gap-3 bg-slate-900 border border-slate-800 text-white px-8 py-4 rounded-2xl hover:bg-slate-800 transition-all font-bold">
               VOLTAR AO SYLLABUS
            </Link>
            <div className="inline-flex items-center gap-3 bg-emerald-600 border border-emerald-500 text-emerald-50 font-black px-10 py-5 rounded-2xl shadow-[0_0_40px_rgba(16,185,129,0.3)] hover:scale-105 transition-transform cursor-not-allowed">
               PRÓXIMO MÓDULO (EM BREVE)
               <ArrowRight className="w-6 h-6" />
            </div>
         </div>
      </div>
    )
  }
];

export function DataLesson9() {
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
        <motion.div 
          animate={{ background: `radial-gradient(ellipse at center right, rgba(16, 185, 129, 0.08) 0%, rgba(2,6,23,1) 100%)` }}
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
              <h1 className="text-sm font-black tracking-widest text-slate-400 uppercase">Análise de Dados <span className="text-emerald-400 border-l border-white/20 pl-2 ml-1">AULA 9 • RESOLUÇÃO DE PROBLEMAS</span></h1>
              <div className="flex gap-1 mt-1">
                 <div className="h-0.5 w-8 bg-emerald-500 rounded-full" />
                 <div className="h-0.5 w-8 bg-emerald-500 rounded-full" />
                 <div className="h-0.5 w-4 bg-slate-800 rounded-full" />
              </div>
           </div>
        </div>
        
        <div className="flex items-center gap-6 hidden sm:flex">
           <div className="flex space-x-1">
              {SLIDES.map((_, i) => (
                <div key={i} className={`h-2 rounded-full transition-all ${i === currentSlide ? 'w-6 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'w-2 bg-slate-800'}`} />
              ))}
           </div>
           <div className="text-[10px] font-mono text-slate-500 font-bold tracking-tighter w-12 text-right">
             {currentSlide + 1} / {SLIDES.length}
           </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12 flex items-center justify-center flex-1 pb-32 font-sans">
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
            <div className={`space-y-6 w-full ${['PRÁTICA INTERATIVA', 'TEORIA', 'LABORATÓRIO TÉCNICO'].includes(slide.tag) ? 'max-w-5xl' : 'max-w-4xl'}`}>
               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-2">
                  <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black tracking-[0.2em] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase`}>
                    {slide.tag}
                  </span>
                  <h2 className="text-4xl md:text-6xl font-black text-white leading-tight underline decoration-white/10 decoration-wavy underline-offset-8 uppercase tracking-tighter">{slide.title}</h2>
                  <p className="text-lg md:text-xl text-slate-400 font-medium italic">{slide.subtitle}</p>
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0, scale: 0.98 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: 0.1 }}
                 className={`w-full mx-auto mt-8 ${!['PRÁTICA INTERATIVA', 'ENCERRAMENTO'].includes(slide.tag) ? 'bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 p-6 md:p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden' : ''}`}
               >
                  {slide.content}
               </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="fixed bottom-0 left-0 w-full p-6 z-20 flex justify-between items-center pointer-events-none">
        <button onClick={() => paginate(-1)} disabled={currentSlide === 0} className="pointer-events-auto p-4 rounded-3xl bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900 transition-all disabled:opacity-20 backdrop-blur-xl group shadow-lg">
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
        </button>
        <button onClick={() => paginate(1)} disabled={currentSlide === SLIDES.length - 1} className={`pointer-events-auto p-4 rounded-3xl bg-emerald-600/90 border border-emerald-400/50 text-white hover:bg-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all disabled:opacity-20 backdrop-blur-xl group`}>
          <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>
      </footer>
    </div>
  );
}
