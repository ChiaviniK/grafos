import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, History, GitBranch, Share2, Layers, AlertTriangle, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

import { VersionVisualizer } from '../components/data/aula3-2/VersionVisualizer';

const SLIDES = [
  {
    id: '1',
    title: 'Adeus, "Trabalho_v2_Final_Final2_AgoraVai.docx"',
    subtitle: 'Por que precisamos do Controle de Versões?',
    tag: 'O PROBLEMA',
    accent: 'emerald',
    content: (
      <div className="space-y-6">
        <p className="text-2xl font-light text-slate-300 leading-relaxed text-center sm:text-left">
           Você já passou pelo desespero de apagar algo importante por acidente e <span className="text-emerald-400 font-bold underline decoration-emerald-500/50 underline-offset-8">não conseguir desfazer</span>?
        </p>
        <div className="h-px w-full bg-gradient-to-r from-emerald-500/50 to-transparent my-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
              <div className="w-12 h-12 bg-rose-500/10 rounded-2xl flex items-center justify-center border border-rose-500/20">
                 <AlertTriangle className="w-6 h-6 text-rose-500" />
              </div>
              <h4 className="text-white font-bold">O Método Amador</h4>
              <p className="text-xs text-slate-500 italic">"Vou salvar uma cópia com a data de hoje. E outra com 'Final'. E outra com 'Revisado'."</p>
              <div className="text-[10px] font-black text-rose-400 uppercase tracking-widest mt-4">Risco: Confusão e Perda de Dados.</div>
           </div>
           <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20">
                 <ShieldCheck className="w-6 h-6 text-emerald-500" />
              </div>
              <h4 className="text-white font-bold">O Método Profissional</h4>
              <p className="text-xs text-slate-500 italic text-emerald-200/60">"Cada alteração é um 'Snapshot' imutável no tempo. Posso voltar, comparar e fundir trabalhos simultâneos."</p>
              <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mt-4">Vantagem: Segurança e Colaboração.</div>
           </div>
        </div>
      </div>
    )
  },
  {
    id: '2',
    title: 'Conceitos Fundamentais',
    subtitle: 'Os pilares do Versionamento',
    tag: 'TEORIA 02',
    accent: 'emerald',
    content: (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center border-2 border-emerald-500/20">
               <Layers className="w-8 h-8 text-emerald-400" />
            </div>
            <h4 className="text-white font-bold">snapshot</h4>
            <p className="text-xs text-slate-500 leading-relaxed">Uma fotografia exata de todos os seus arquivos em um determinado momento. Não é só o que mudou, é o estado total do projeto.</p>
         </div>
         <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center border-2 border-emerald-500/20">
               <History className="w-8 h-8 text-emerald-400" />
            </div>
            <h4 className="text-white font-bold">commit</h4>
            <p className="text-xs text-slate-500 leading-relaxed">É o nome dado ao ato de salvar um snapshot. Cada commit tem um ID único e uma mensagem explicando o que foi feito.</p>
         </div>
         <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center border-2 border-emerald-500/20">
               <Share2 className="w-8 h-8 text-emerald-400" />
            </div>
            <h4 className="text-white font-bold">repository</h4>
            <p className="text-xs text-slate-500 leading-relaxed">O contêiner (a pasta "mágica") que guarda todo o histórico de snapshots e versões de um projeto.</p>
         </div>
      </div>
    )
  },
  {
    id: '3',
    title: 'Linha do Tempo Interativa',
    subtitle: 'Navegue pelo histórico do projeto',
    tag: 'EXPLORAÇÃO',
    accent: 'emerald',
    content: (
       <div className="space-y-8">
          <p className="text-slate-400 text-sm text-center max-w-xl mx-auto px-4">
            Clique nas versões abaixo para ver como o arquivo evolui e como é fácil <span className="text-emerald-400 font-bold">reverter</span> um erro catastrófico.
          </p>
          <VersionVisualizer />
       </div>
    )
  },
  {
    id: '4',
    title: 'A Máquina do Tempo dos Dados',
    subtitle: 'Por que o Analista de Dados ama o Git?',
    tag: 'MERCADO',
    accent: 'emerald',
    content: (
      <div className="space-y-6">
         <div className="flex flex-col md:flex-row gap-8 items-center bg-emerald-500/5 p-8 rounded-[3rem] border border-emerald-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-5">
               <GitBranch className="w-48 h-48 text-emerald-400 transform -rotate-12" />
            </div>
            <div className="flex-1 space-y-4 z-10">
               <div className="p-4 bg-emerald-950/40 rounded-2xl inline-block">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
               </div>
               <h3 className="text-2xl font-black text-white">Reproduzibilidade</h3>
               <p className="text-slate-400 text-sm leading-relaxed">
                  Na ciência de dados, precisamos saber exatamente qual versão do script gerou aquele gráfico para o CEO. Sem Git, a ciência se torna suposição. 
               </p>
               <ul className="grid grid-cols-2 gap-4 pt-4">
                  <li className="flex items-center gap-2 text-[10px] font-black text-emerald-400 uppercase tracking-widest"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Auditoria</li>
                  <li className="flex items-center gap-2 text-[10px] font-black text-emerald-400 uppercase tracking-widest"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Peer Review</li>
                  <li className="flex items-center gap-2 text-[10px] font-black text-emerald-400 uppercase tracking-widest"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Rollback</li>
                  <li className="flex items-center gap-2 text-[10px] font-black text-emerald-400 uppercase tracking-widest"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Colaboração</li>
               </ul>
            </div>
         </div>
      </div>
    )
  },
  {
    id: '5',
    title: 'Fim da Aula 3.2',
    subtitle: 'Próximo: Git na linha de comando!',
    tag: 'ENCERRAMENTO',
    accent: 'emerald',
    content: (
      <div className="text-center space-y-8 py-12">
         <div className="w-24 h-24 bg-emerald-500/10 rounded-full border-2 border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-emerald-400" />
         </div>
         <div className="space-y-4">
            <h3 className="text-3xl md:text-5xl font-black text-white">Versão Final (Desta Vez!)</h3>
            <p className="text-lg text-slate-400 max-w-lg mx-auto">
               Você dominou a teoria. Agora é hora de colocar a mão na massa com as ferramentas que os profissionais usam: **Git e GitHub**.
            </p>
         </div>
         <div className="pt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/data" className="inline-flex items-center gap-3 bg-slate-900 text-white border border-slate-700 px-8 py-4 rounded-2xl hover:bg-slate-800 transition-all font-bold">
               VOLTAR AO SYLLABUS
            </Link>
            <Link to="/data/aula3-3" className="inline-flex items-center gap-3 bg-emerald-600 text-white font-black px-10 py-5 rounded-2xl hover:scale-105 transition-transform shadow-2xl shadow-emerald-900/40 group">
               INICIAR LABORATÓRIO GIT
               <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
         </div>
      </div>
    )
  }
];

export function DataLesson3_2() {
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
          animate={{ background: `radial-gradient(ellipse at top left, rgba(16, 185, 129, 0.1) 0%, rgba(2,6,23,1) 100%)` }}
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
              <h1 className="text-sm font-black tracking-widest text-slate-400 uppercase">Análise de Dados <span className="text-emerald-400 border-l border-white/20 pl-2 ml-1">AULA 3.2 • CONTROLE DE VERSÃO</span></h1>
              <div className="flex gap-1 mt-1">
                 <div className="h-0.5 w-8 bg-emerald-500 rounded-full" />
                 <div className="h-0.5 w-8 bg-emerald-500/40 rounded-full" />
                 <div className="h-0.5 w-8 bg-emerald-500/20 rounded-full" />
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
            <div className={`space-y-6 w-full ${slide.tag === 'EXPLORAÇÃO' ? 'max-w-5xl' : 'max-w-3xl'}`}>
               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-2">
                  <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black tracking-[0.2em] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30`}>
                    {slide.tag}
                  </span>
                  <h2 className="text-4xl md:text-5xl font-black text-white leading-tight underline decoration-white/10 decoration-wavy underline-offset-8">{slide.title}</h2>
                  <p className="text-lg md:text-xl text-slate-400 font-medium">{slide.subtitle}</p>
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0, scale: 0.98 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: 0.1 }}
                 className={`w-full mx-auto mt-8 ${!['EXPLORAÇÃO', 'MERCADO', 'ENCERRAMENTO'].includes(slide.tag) ? 'bg-slate-900/60 backdrop-blur-xl border border-slate-700 p-8 md:p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden' : ''}`}
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
