import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, BrainCircuit, GitBranch, Split, CheckCircle2, ArrowRight, Layers, Database } from 'lucide-react';
import { Link } from 'react-router-dom';

import { BranchingLab } from '../components/data/aula6/BranchingLab';

const SLIDES = [
  {
    id: 'intro',
    title: 'Branching: O Poder da Escolha',
    subtitle: 'Ensinando a máquina a decidir',
    tag: 'INTRODUÇÃO',
    accent: 'emerald',
    content: (
      <div className="space-y-6">
        <p className="text-2xl font-light text-slate-300 leading-relaxed text-center sm:text-left">
           Até agora, nossos códigos eram <span className="text-emerald-400 font-bold italic">lineares</span>. Eles seguiam um único trilho. Mas o mundo real é feito de <span className="text-white font-bold underline decoration-emerald-500/50 underline-offset-8">bifurcações</span>.
        </p>
        <div className="h-px w-full bg-gradient-to-r from-emerald-500/50 to-transparent my-6" />
        <p className="text-slate-400 leading-relaxed text-lg">
           Branching (Ramificação) é o que permite que um aplicativo mude de comportamento dependendo das circunstâncias. Sem isso, não existiriam logins, filtros de busca ou recomendações personalizadas. 
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
           <div className="p-4 bg-slate-900/80 rounded-2xl border border-emerald-500/20">
              <Split className="w-6 h-6 text-emerald-400 mb-2" />
              <div className="text-sm font-bold text-white uppercase tracking-tighter">Bifurcação Logica</div>
              <p className="text-xs text-slate-500 mt-1">Se algo for verdade, faça A. Caso contrário, faça B.</p>
           </div>
           <div className="p-4 bg-slate-900/80 rounded-2xl border border-emerald-500/20">
              <BrainCircuit className="w-6 h-6 text-emerald-400 mb-2" />
              <div className="text-sm font-bold text-white uppercase tracking-tighter">Autonomia</div>
              <p className="text-xs text-slate-500 mt-1">Damos ao computador a capacidade de "julgar" uma situação.</p>
           </div>
        </div>
      </div>
    )
  },
  {
    id: 'anatomy',
    title: 'A Anatomia do IF / ELSE',
    subtitle: 'O esqueleto de toda inteligência',
    tag: 'TEORIA',
    accent: 'emerald',
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
           <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 font-mono text-sm space-y-2">
              <p className="text-emerald-500 font-bold"># Estrutura Padrão</p>
              <p className="text-white"><span className="text-pink-500">if</span> (tem_obstaculo):</p>
              <p className="text-slate-300 ml-4">pular()</p>
              <p className="text-white"><span className="text-pink-500">else</span>:</p>
              <p className="text-slate-300 ml-4">correr()</p>
           </div>
           <p className="text-sm text-slate-400">
             O bloco <span className="bg-slate-800 px-2 py-0.5 rounded text-white">if</span> testa uma condição. Se o resultado for <span className="text-emerald-400 font-bold">True</span> (Verdadeiro), o código abaixo dele é executado. Se for <span className="text-rose-400 font-bold">False</span>, ele pula para o <span className="bg-slate-800 px-2 py-0.5 rounded text-white">else</span>.
           </p>
        </div>
        <div className="relative group">
           <div className="absolute -inset-4 bg-emerald-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
           <div className="bg-emerald-950/20 border-2 border-emerald-500/30 p-8 rounded-[2.5rem] relative">
              <GitBranch className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <h4 className="text-center text-white font-black text-xl mb-4 uppercase tracking-tighter">Fluxogramas</h4>
              <p className="text-center text-slate-400 text-xs">Visualize o código como uma estrada que se divide. Você nunca vai para os dois caminhos ao mesmo tempo.</p>
           </div>
        </div>
      </div>
    )
  },
  {
    id: 'lab',
    title: 'Laboratório: Decisão Reativa',
    subtitle: 'Configure a mente do seu robô',
    tag: 'PRÁTICA INTERATIVA',
    accent: 'emerald',
    content: (
      <div className="space-y-6">
        <BranchingLab />
      </div>
    )
  },
  {
    id: 'data-connect',
    title: 'Branching na Análise de Dados',
    subtitle: 'Filtros e Limpeza Inteligente',
    tag: 'APLICAÇÃO',
    accent: 'emerald',
    content: (
      <div className="space-y-8">
         <p className="text-lg text-slate-300 text-center max-w-2xl mx-auto">
            Como um Analista de Dados usa isso? Para criar <span className="text-emerald-400 font-black">regras de negócio</span> automáticas em tabelas gigantescas.
         </p>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans">
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
               <Layers className="w-6 h-6 text-emerald-400" />
               <h4 className="text-white font-bold text-sm uppercase">Segmentação</h4>
               <p className="text-[11px] text-slate-500">Se (idade {'>'} 18) então CATEGORIA = 'ADULTO'.</p>
            </div>
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
               <Database className="w-6 h-6 text-emerald-400" />
               <h4 className="text-white font-bold text-sm uppercase">Tratamento de Erros</h4>
               <p className="text-[11px] text-slate-500">Se (valor == NaN) então SUBSTITUIR POR ZERO.</p>
            </div>
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
               <CheckCircle2 className="w-6 h-6 text-emerald-400" />
               <h4 className="text-white font-bold text-sm uppercase">Validação de KPIs</h4>
               <p className="text-[11px] text-slate-500">Se (vendas {'>'} meta) então STATUS = 'BÔNUS'.</p>
            </div>
         </div>
      </div>
    )
  },
  {
    id: 'end',
    title: 'Fim da Aula 6.1',
    subtitle: 'Próxima Estação: Estruturas de Repetição',
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
               Agora você não apenas dá ordens, você dá <span className="text-emerald-400 font-bold">inteligência</span>. Seu código sabe reagir ao ambiente.
            </p>
         </div>
         <div className="pt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/data" className="inline-flex items-center gap-3 bg-slate-900 border border-slate-800 text-white px-8 py-4 rounded-2xl hover:bg-slate-800 transition-all font-bold">
               VOLTAR AO SYLLABUS
            </Link>
            <div className="inline-flex items-center gap-3 bg-emerald-600/20 text-emerald-400 font-black px-10 py-5 rounded-2xl border border-emerald-500/30 cursor-not-allowed grayscale">
               PRÓXIMA AULA: LOOPS (EM BREVE)
               <ArrowRight className="w-5 h-5 opacity-30" />
            </div>
         </div>
      </div>
    )
  }
];

export function DataLesson6_1() {
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
      {/* Dynamic Background */}
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
              <h1 className="text-sm font-black tracking-widest text-slate-400 uppercase">Análise de Dados <span className="text-emerald-400 border-l border-white/20 pl-2 ml-1">AULA 6.1 • BRANCHING</span></h1>
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
            <div className={`space-y-6 w-full ${['PRÁTICA INTERATIVA', 'TEORIA'].includes(slide.tag) ? 'max-w-6xl' : 'max-w-4xl'}`}>
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
                 className={`w-full mx-auto mt-8 ${!['PRÁTICA INTERATIVA', 'ENCERRAMENTO'].includes(slide.tag) ? 'bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 p-8 md:p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden' : ''}`}
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
