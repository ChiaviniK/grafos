import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, CloudUpload, HardDrive, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { GitGithubSimulator } from '../components/data/aula3-3/GitGithubSimulator';

const SLIDES = [
  {
    id: '1',
    title: 'Laboratório: Git & GitHub',
    subtitle: 'Do seu computador para o mundo',
    tag: 'BOAS-VINDAS',
    accent: 'blue',
    content: (
      <div className="space-y-6">
        <p className="text-2xl font-light text-slate-300 leading-relaxed text-center sm:text-left">
           Agora que você entende o conceito de versionamento, vamos praticar a <span className="text-blue-400 font-bold uppercase tracking-tighter italic underline decoration-blue-500/50 underline-offset-8 decoration-wavy">Ponte entre o Local e o Remoto</span>.
        </p>
        <div className="h-px w-full bg-gradient-to-r from-blue-500/50 to-transparent my-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
           <div className="p-6 bg-slate-900 border border-slate-700 rounded-3xl space-y-3">
              <HardDrive className="w-8 h-8 text-blue-400" />
              <div className="text-sm font-bold text-white uppercase tracking-tighter">O Repositório Local</div>
              <p className="text-xs text-slate-500 italic">"Sua pasta no computador, controlada pelo Git."</p>
           </div>
           <div className="p-6 bg-slate-900 border border-slate-700 rounded-3xl space-y-3">
              <CloudUpload className="w-8 h-8 text-emerald-400" />
              <div className="text-sm font-bold text-white uppercase tracking-tighter">O Repositório Remoto</div>
              <p className="text-xs text-slate-500 italic">"O servidor na nuvem (GitHub), acessível de qualquer lugar."</p>
           </div>
        </div>
      </div>
    )
  },
  {
    id: '2',
    title: 'O Ciclo de Vida do Arquivo',
    subtitle: 'Adicionar, Salvar e Publicar',
    tag: 'OS COMANDOS',
    accent: 'emerald',
    content: (
      <div className="space-y-4">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-900 rounded-2xl border-l-4 border-emerald-500">
               <code className="text-emerald-400 font-black">git init</code>
               <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-bold">Inicia o rastreio na pasta atual.</p>
            </div>
            <div className="p-4 bg-slate-900 rounded-2xl border-l-4 border-emerald-500">
               <code className="text-emerald-400 font-black">git add</code>
               <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-bold">Escolhe quais arquivos 'preparar'.</p>
            </div>
            <div className="p-4 bg-slate-900 rounded-2xl border-l-4 border-emerald-500">
               <code className="text-emerald-400 font-black">git commit</code>
               <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-bold">Cria uma versão definitiva no histórico.</p>
            </div>
         </div>
         <div className="p-4 bg-blue-500/10 border-l-4 border-blue-500 rounded-r-2xl mt-4">
            <code className="text-blue-400 font-black">git push</code>
            <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-bold">Envia local para remoto.</p>
         </div>
      </div>
    )
  },
  {
    id: '3',
    title: 'Simulador: Seu Primeiro Repo',
    subtitle: 'Use o terminal para enviar para o GitHub',
    tag: 'SIMULAÇÃO',
    accent: 'emerald',
    content: (
       <div className="space-y-4">
          <p className="text-[10px] text-center font-bold text-slate-500 uppercase tracking-[0.3em]">Ambiente de Desenvolvimento Ativo</p>
          <GitGithubSimulator />
       </div>
    )
  },
  {
    id: '4',
    title: 'Missão Cumprida',
    subtitle: 'Você é um Analista Versionado!',
    tag: 'ENCERRAMENTO',
    accent: 'emerald',
    content: (
      <div className="text-center space-y-8 py-12">
         <div className="w-24 h-24 bg-blue-500/10 rounded-full border-2 border-blue-500/30 flex items-center justify-center mx-auto mb-6">
            <Github className="w-12 h-12 text-blue-400" />
         </div>
         <div className="space-y-4">
            <h3 className="text-3xl md:text-5xl font-black text-white">Parabéns!</h3>
            <p className="text-lg text-slate-400 max-w-lg mx-auto leading-relaxed">
               Você aprendeu a programar o seu primeiro "Hello World" em Python e a gerenciar suas mudanças como um profissional.
            </p>
         </div>
         <div className="pt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/data" className="inline-flex items-center gap-3 bg-white text-slate-950 font-black px-10 py-5 rounded-2xl hover:scale-105 transition-transform shadow-2xl shadow-blue-900/40 group">
               VOLTAR AO CURRÍCULO
            </Link>
         </div>
      </div>
    )
  }
];

export function DataLesson3_3() {
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
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-blue-500/30 overflow-x-hidden relative flex flex-col">
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div 
          animate={{ background: `radial-gradient(ellipse at bottom, rgba(30, 64, 175, 0.1) 0%, rgba(2,6,23,1) 100%)` }}
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
              <h1 className="text-sm font-black tracking-widest text-slate-400 uppercase">Análise de Dados <span className="text-blue-400 border-l border-white/20 pl-2 ml-1">AULA 3.3 • LAB GIT & GITHUB</span></h1>
              <div className="flex gap-1 mt-1">
                 <div className="h-0.5 w-8 bg-blue-500 rounded-full" />
                 <div className="h-0.5 w-4 bg-slate-700 rounded-full" />
                 <div className="h-0.5 w-4 bg-slate-700 rounded-full" />
              </div>
           </div>
        </div>
        
        <div className="flex items-center gap-6 hidden sm:flex">
           <div className="flex space-x-1">
              {SLIDES.map((_, i) => (
                <div key={i} className={`h-2 rounded-full transition-all ${i === currentSlide ? 'w-6 bg-blue-500 shadow-[0_0_10px_rgba(30,64,175,0.5)]' : 'w-2 bg-slate-800'}`} />
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
            <div className={`space-y-6 w-full ${slide.tag === 'SIMULAÇÃO' ? 'max-w-6xl' : 'max-w-4xl'}`}>
               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-2">
                  <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black tracking-[0.2em] bg-blue-500/10 text-blue-400 border border-blue-500/30`}>
                    {slide.tag}
                  </span>
                  <h2 className="text-4xl md:text-5xl font-black text-white leading-tight underline decoration-white/10 decoration-wavy underline-offset-8">{slide.title}</h2>
                  <p className="text-lg md:text-xl text-slate-400 font-medium">{slide.subtitle}</p>
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0, scale: 0.98 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: 0.1 }}
                 className={`w-full mx-auto mt-8 ${!['SIMULAÇÃO', 'ENCERRAMENTO'].includes(slide.tag) ? 'bg-slate-900/60 backdrop-blur-xl border border-slate-700 p-8 md:p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden' : ''}`}
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
        <button onClick={() => paginate(1)} disabled={currentSlide === SLIDES.length - 1} className={`pointer-events-auto p-4 rounded-3xl bg-blue-600/90 border border-blue-400/50 text-white hover:bg-blue-500 shadow-[0_0_30px_rgba(30,64,175,0.5)] transition-all disabled:opacity-20 backdrop-blur-xl group`}>
          <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>
      </footer>
    </div>
  );
}
