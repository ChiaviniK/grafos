import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Terminal, Home, Code2, AlertTriangle, Monitor, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

import { ColabSimulator } from '../components/data/aula3-1/ColabSimulator';
import { PolyglotHello } from '../components/data/aula3-1/PolyglotHello';

const SLIDES = [
  {
    id: '1',
    title: 'Hello, World!',
    subtitle: 'A Lógica por trás dos Programas',
    tag: 'INTRODUÇÃO',
    accent: 'blue',
    content: (
      <div className="space-y-6">
        <p className="text-2xl font-light text-slate-300 leading-relaxed text-center sm:text-left">
          Como dizemos a um computador <span className="text-blue-400 font-bold italic">exatamente</span> o que fazer?
        </p>
        <div className="h-px w-full bg-gradient-to-r from-blue-500/50 to-transparent my-6" />
        <p className="text-slate-400">
           Um computador não entende intenções ou sugestões. Ele entende <span className="text-white font-bold underline decoration-blue-500/50">Instruções Literais</span>. Hoje vamos desbravar o primeiro passo de todo desenvolvedor e analista: o "Hello World", enquanto entendemos como as linguagens de programação funcionam.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
           <div className="p-4 bg-slate-900/80 rounded-2xl border border-blue-500/20">
              <Code2 className="w-6 h-6 text-blue-400 mb-2" />
              <div className="text-sm font-bold text-white uppercase tracking-tighter">O que é um Programa?</div>
              <p className="text-xs text-slate-500 mt-1">Uma série de instruções formais que um computador pode executar.</p>
           </div>
           <div className="p-4 bg-slate-900/80 rounded-2xl border border-blue-500/20">
              <Terminal className="w-6 h-6 text-blue-400 mb-2" />
              <div className="text-sm font-bold text-white uppercase tracking-tighter">Linguagem</div>
              <p className="text-xs text-slate-500 mt-1">Um conjunto formal de regras (sintaxe) para falar com a máquina.</p>
           </div>
        </div>
      </div>
    )
  },
  {
    id: '2',
    title: 'Desafio: Programa o Instrutor',
    subtitle: 'O Perigo da Ambiguidade',
    tag: 'DINÂMICA',
    accent: 'amber',
    content: (
      <div className="flex flex-col md:flex-row gap-8 items-center">
         <div className="flex-1 space-y-6">
            <p className="text-slate-300 italic border-l-4 border-amber-500 pl-6 py-2 bg-amber-500/5 rounded-r-xl">
               "Escreva uma série de etapas que qualquer um possa usar para construir uma casa, mesmo que nunca tenha visto uma casa antes."
            </p>
            <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-3">
               <div className="text-xs font-black text-rose-400 uppercase tracking-[0.2em]">O Grande Problema:</div>
               <p className="text-sm text-slate-200 font-medium">Os seres humanos lidam bem com a <span className="text-amber-400 font-bold">ambiguidade</span>. Os computadores, não. Se você diz "Desenhe a base", um computador pode desenhar um triângulo, um círculo ou nada.</p>
            </div>
            <p className="text-slate-400 text-sm italic">
               "Olhe para o cachorro com um olho só." → O cachorro tem um olho? Ou você está olhando com um olho só?
            </p>
         </div>
         <div className="w-full md:w-64 aspect-square bg-amber-500/10 rounded-full border-4 border-amber-500/20 flex flex-col items-center justify-center relative group overflow-hidden">
             <Home className="w-20 h-20 text-amber-500/40 group-hover:scale-110 transition-transform duration-500" />
             <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 to-transparent" />
             <span className="mt-4 text-[10px] font-black tracking-widest text-amber-500 uppercase">TIRE A AMBIGUIDADE</span>
         </div>
      </div>
    )
  },
  {
    id: '3',
    title: 'Sintaxe: As Regras do Jogo',
    subtitle: 'Como as Linguagens se Estruturam',
    tag: 'TEORIA 01',
    accent: 'indigo',
    content: (
      <div className="space-y-6">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3 p-4 bg-slate-900/60 rounded-2xl border border-indigo-500/10">
               <AlertTriangle className="w-8 h-8 text-indigo-400" />
               <h4 className="text-white font-bold leading-tight">Rigor Matemático</h4>
               <p className="text-xs text-slate-500">Computadores usam regras rigorosas para dar significado à linguagem. Uma vírgula fora do lugar pode quebrar tudo.</p>
            </div>
            <div className="space-y-3 p-4 bg-slate-900/60 rounded-2xl border border-indigo-500/10">
               <Code2 className="w-8 h-8 text-indigo-400" />
               <h4 className="text-white font-bold leading-tight">Recursos Compartilhados</h4>
               <p className="text-xs text-slate-500">Apesar de nomes diferentes, quase todas as linguagens têm conceitos comuns: variáveis, loops, funções.</p>
            </div>
            <div className="space-y-3 p-4 bg-slate-900/60 rounded-2xl border border-indigo-500/10">
               <Monitor className="w-8 h-8 text-indigo-400" />
               <h4 className="text-white font-bold leading-tight">Propósito Específico</h4>
               <p className="text-xs text-slate-500">Python para dados, C# para Games, JS para Web. Escolher a ferramenta certa é metade do trabalho.</p>
            </div>
         </div>
         <div className="mt-8 p-6 bg-slate-950 rounded-2xl border border-slate-800 text-center">
            <p className="text-slate-400 text-sm italic">"Aprender a programar é, acima de tudo, aprender a organizar o pensamento de forma lógica e sequencial."</p>
         </div>
      </div>
    )
  },
  {
    id: '4',
    title: 'O Código de Mil Faces',
    subtitle: 'Comparando o "Hello World" em diferentes linguagens',
    tag: 'CURIOSIDADE',
    accent: 'emerald',
    content: <PolyglotHello />
  },
  {
    id: '5',
    title: 'Mão na Massa: Python',
    subtitle: 'Sua primeira linha de código no simulador',
    tag: 'PRÁTICA',
    accent: 'blue',
    content: (
       <div className="space-y-8">
          <p className="text-slate-400 text-sm text-center max-w-xl mx-auto">
             No mundo da Análise de Dados, o <span className="text-blue-400 font-bold">Python</span> manda. Tente executar o comando clássico abaixo para ver como ele responde.
          </p>
          <ColabSimulator />
          <div className="bg-blue-500/5 border border-blue-500/20 p-4 rounded-xl max-w-xl mx-auto">
             <div className="flex gap-3">
                <AlertTriangle className="w-5 h-5 text-blue-400 shrink-0" />
                <p className="text-xs text-slate-400">
                   <strong>Dica:</strong> Se você remover as aspas ou os parênteses, o Python vai te dar um <span className="text-rose-400">SyntaxError</span>. Isso prova como o computador é literal!
                </p>
             </div>
          </div>
       </div>
    )
  },
  {
    id: '6',
    title: 'Fim da Aula 3.1',
    subtitle: 'Próximo passo: Controle de Versão',
    tag: 'ENCERRAMENTO',
    accent: 'blue',
    content: (
      <div className="text-center space-y-8 py-12">
         <div className="w-24 h-24 bg-blue-500/10 rounded-full border-2 border-blue-500/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-blue-400" />
         </div>
         <div className="space-y-4">
            <h3 className="text-3xl md:text-5xl font-black text-white">Hello, Future.</h3>
            <p className="text-lg text-slate-400 max-w-lg mx-auto">
               Você agora entende que programar é dar ordens exatas e que cada linguagem tem seu jeitinho. 
            </p>
         </div>
         <div className="pt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/data" className="inline-flex items-center gap-3 bg-slate-900 text-white border border-slate-700 px-8 py-4 rounded-2xl hover:bg-slate-800 transition-all font-bold">
               VOLTAR AO SYLLABUS
            </Link>
            <Link to="/data/aula3-2" className="inline-flex items-center gap-3 bg-white text-slate-950 font-black px-10 py-5 rounded-2xl hover:scale-105 transition-transform shadow-2xl shadow-white/10 group">
               PRÓXIMA AULA: GIT
               <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
         </div>
      </div>
    )
  }
];

export function DataLesson3_1() {
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
              <h1 className="text-sm font-black tracking-widest text-slate-400 uppercase">Análise de Dados <span className={`text-${slide.accent}-400 border-l border-white/20 pl-2 ml-1`}>AULA 3.1 • HELLO WORLD</span></h1>
              <div className="flex gap-1 mt-1">
                 <div className="h-0.5 w-8 bg-blue-500 rounded-full" />
                 <div className="h-0.5 w-8 bg-amber-500 rounded-full" />
                 <div className="h-0.5 w-8 bg-indigo-500 rounded-full" />
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
            <div className={`space-y-6 w-full ${slide.tag === 'PRÁTICA' || slide.tag === 'CURIOSIDADE' ? 'max-w-5xl' : 'max-w-3xl'}`}>
               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-2">
                  <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black tracking-[0.2em] bg-${slide.accent}-500/10 text-${slide.accent}-400 border border-${slide.accent}-500/30`}>
                    {slide.tag}
                  </span>
                  <h2 className="text-4xl md:text-5xl font-black text-white leading-tight underline decoration-white/10 decoration-wavy underline-offset-8">{slide.title}</h2>
                  <p className="text-lg md:text-xl text-slate-400 font-medium">{slide.subtitle}</p>
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0, scale: 0.98 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: 0.1 }}
                 className={`w-full mx-auto mt-8 ${!['PRÁTICA', 'CURIOSIDADE', 'ENCERRAMENTO'].includes(slide.tag) ? 'bg-slate-900/60 backdrop-blur-xl border border-slate-700 p-8 md:p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden' : ''}`}
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
        <button onClick={() => paginate(1)} disabled={currentSlide === SLIDES.length - 1} className={`pointer-events-auto p-4 rounded-3xl bg-${slide.accent}-600/90 border border-${slide.accent}-400/50 text-white hover:bg-${slide.accent}-500 shadow-[0_0_30px_rgba(var(--tw-colors-${slide.accent}-500),0.5)] transition-all disabled:opacity-20 backdrop-blur-xl group`}>
          <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>
      </footer>
    </div>
  );
}
