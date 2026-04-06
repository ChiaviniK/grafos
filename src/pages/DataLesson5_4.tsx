import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Users, ShieldAlert, CheckCircle2, LayoutGrid, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { CommunityWall } from '../components/data/aula5/CommunityWall';

const SLIDES = [
  {
    id: '1',
    title: 'Comunidade: Nossa rede de apoio',
    subtitle: 'Navegando juntos no aprendizado digital',
    tag: 'CULTURA & COMUNIDADE',
    accent: 'rose',
    content: (
      <div className="space-y-6">
        <p className="text-2xl font-light text-slate-300 leading-relaxed text-center sm:text-left">
           Participar de um programa online exige mais do que apenas ter internet; exige <span className="text-rose-400 font-bold underline decoration-rose-500/50 underline-offset-8">comprometimento mútuo</span>.
        </p>
        <div className="h-px w-full bg-gradient-to-r from-rose-500/50 to-transparent my-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
           <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
              <div className="w-12 h-12 bg-rose-500/10 rounded-2xl flex items-center justify-center border border-rose-500/20">
                 <Globe className="w-6 h-6 text-rose-500" />
              </div>
              <h4 className="text-white font-bold">Alfabetização Digital</h4>
              <p className="text-xs text-slate-500 italic">Sua capacidade de navegar e participar efetivamente de experiências de aprendizagem digital.</p>
           </div>
           <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20">
                 <Users className="w-6 h-6 text-blue-400" />
              </div>
              <h4 className="text-white font-bold">Comunidade de Membros</h4>
              <p className="text-xs text-slate-500 italic">Chegar no horário, estar presente e participar com gentileza e respeito.</p>
           </div>
        </div>
      </div>
    )
  },
  {
    id: '2',
    title: 'Mural de Compromissos',
    subtitle: 'O que você se compromete a fazer?',
    tag: 'ATIVIDADE FINAL',
    accent: 'rose',
    content: (
       <div className="space-y-8">
          <div className="flex items-start gap-4 p-6 bg-slate-950 border border-white/5 rounded-3xl max-w-3xl mx-auto shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 left-0 w-2 h-full bg-rose-500 opacity-30 group-hover:opacity-100 transition-opacity" />
             <ShieldAlert className="w-12 h-12 text-rose-500 shrink-0" />
             <div className="space-y-1">
                <h4 className="text-sm font-black text-white uppercase tracking-widest leading-none">Desafio de Cidadania Digital</h4>
                <p className="text-xs text-slate-500 leading-relaxed italic">
                  "Para ser um membro forte de nossa comunidade de aprendizagem digital, eu me comprometo a..." 
                  Escreva abaixo o seu compromisso e fixe no mural coletivo desta aula.
                </p>
             </div>
          </div>
          <CommunityWall />
       </div>
    )
  },
  {
    id: '3',
    title: 'Recursos Adicionais',
    subtitle: 'Nossas Ferramentas Digitais',
    tag: 'RECURSOS',
    accent: 'rose',
    content: (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { title: "LinkedIn Learning", text: "Cursos extras de Python e Data Analysis.", icon: <LayoutGrid className="w-4 h-4" /> },
           { title: "Mural/Jamboard", text: "Espaço para brainstorming e quadros brancos.", icon: <LayoutGrid className="w-4 h-4" /> },
           { title: "Microsoft Teams", text: "Salas de aula virtuais e chats de grupo.", icon: <LayoutGrid className="w-4 h-4" /> }
         ].map((r, i) => (
           <div key={i} className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col gap-3">
              <div className="w-8 h-8 bg-slate-950 rounded-xl flex items-center justify-center border border-white/5">{r.icon}</div>
              <h5 className="text-[10px] font-black text-rose-400 uppercase tracking-widest">{r.title}</h5>
              <p className="text-[10px] text-slate-500 leading-relaxed font-bold italic">{r.text}</p>
           </div>
         ))}
      </div>
    )
  },
  {
    id: '4',
    title: 'Módulo 5 Concluído!',
    subtitle: 'Você está no caminho certo!',
    tag: 'FINALIZAÇÃO',
    accent: 'rose',
    content: (
      <div className="text-center space-y-10 py-12">
         <div className="w-32 h-32 bg-rose-500/10 rounded-full border-4 border-rose-500/20 flex items-center justify-center mx-auto mb-6 shadow-[0_0_50px_rgba(244,63,94,0.15)]">
            <CheckCircle2 className="w-16 h-16 text-rose-400" />
         </div>
         <div className="space-y-4">
            <h3 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase leading-none">Aula 5 Finalizada.</h3>
            <p className="text-xl text-slate-400 max-w-xl mx-auto leading-relaxed">
               Parabéns por completar as lições de Lógica, Variáveis, Comunicação e Cidadania Digital. O próximo módulo espera por você! 👏
            </p>
         </div>
         <div className="pt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/data" className="inline-flex items-center gap-3 bg-white text-slate-950 font-black px-12 py-5 rounded-3xl hover:scale-105 transition-transform shadow-2xl shadow-rose-900/40 group">
               VOLTAR AO CURRÍCULO
            </Link>
         </div>
      </div>
    )
  }
];

export function DataLesson5_4() {
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
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-rose-500/30 overflow-x-hidden relative flex flex-col">
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div 
          animate={{ background: `radial-gradient(circle at top, rgba(244, 63, 94, 0.08) 0%, rgba(2,6,23,1) 100%)` }}
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
              <h1 className="text-sm font-black tracking-widest text-slate-400 uppercase">Análise de Dados <span className="text-rose-400 border-l border-white/20 pl-2 ml-1">AULA 5.4 • COMUNIDADE DIGITAL</span></h1>
              <div className="flex gap-1 mt-1">
                 <div className="h-0.5 w-8 bg-rose-500/20 rounded-full" />
                 <div className="h-0.5 w-8 bg-rose-500/20 rounded-full" />
                 <div className="h-0.5 w-8 bg-rose-500/20 rounded-full" />
                 <div className="h-0.5 w-8 bg-rose-500 rounded-full" />
              </div>
           </div>
        </div>
        
        <div className="flex items-center gap-6 hidden sm:flex">
           <div className="flex space-x-1">
              {SLIDES.map((_, i) => (
                <div key={i} className={`h-2 rounded-full transition-all ${i === currentSlide ? 'w-6 bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]' : 'w-2 bg-slate-800'}`} />
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
            <div className={`space-y-6 w-full ${slide.tag === 'ATIVIDADE FINAL' ? 'max-w-6xl' : 'max-w-4xl'}`}>
               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-2">
                  <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black tracking-[0.2em] bg-rose-500/10 text-rose-400 border border-rose-500/30`}>
                    {slide.tag}
                  </span>
                  <h2 className="text-3xl md:text-5xl font-black text-white leading-tight underline decoration-white/10 decoration-wavy underline-offset-8 uppercase tracking-tighter">{slide.title}</h2>
                  <p className="text-lg md:text-xl text-slate-400 font-medium italic">{slide.subtitle}</p>
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0, scale: 0.98 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: 0.1 }}
                 className={`w-full mx-auto mt-8 ${!['ATIVIDADE FINAL', 'RECURSOS', 'FINALIZAÇÃO'].includes(slide.tag) ? 'bg-slate-900/60 backdrop-blur-xl border border-slate-700 p-8 md:p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden' : ''}`}
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
        <button onClick={() => paginate(1)} disabled={currentSlide === SLIDES.length - 1} className={`pointer-events-auto p-4 rounded-3xl bg-rose-600/90 border border-rose-400/50 text-white hover:bg-rose-500 shadow-[0_0_30px_rgba(244,63,94,0.5)] transition-all disabled:opacity-20 backdrop-blur-xl group`}>
          <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>
      </footer>
    </div>
  );
}
