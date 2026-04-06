import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Box, Type, Hash, ArrowRight, CheckCircle2, FlaskConical } from 'lucide-react';
import { Link } from 'react-router-dom';

import { VariableLab } from '../components/data/aula5/VariableLab';

const SLIDES = [
  {
    id: '1',
    title: 'Variáveis: Gavetas Digitais',
    subtitle: 'Guardando Informação na Memória',
    tag: 'CONCEITO',
    accent: 'indigo',
    content: (
      <div className="space-y-6">
        <p className="text-2xl font-light text-slate-300 leading-relaxed text-center sm:text-left">
           Uma variável é apenas um nome que aponta para um <span className="text-indigo-400 font-bold underline decoration-indigo-500/50 underline-offset-8">valor na memória</span> do computador.
        </p>
        <div className="h-px w-full bg-gradient-to-r from-indigo-500/50 to-transparent my-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
           <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center border border-indigo-500/20">
                 <Type className="w-6 h-6 text-indigo-400" />
              </div>
              <h4 className="text-white font-bold">Strings (Texto)</h4>
              <p className="text-xs text-slate-500 italic">Palavras, nomes ou frases. Sempre entre aspas.</p>
              <code className="text-[10px] text-indigo-300 font-black px-2 py-1 bg-indigo-500/10 rounded">nome = "Alice"</code>
           </div>
           <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20">
                 <Hash className="w-6 h-6 text-emerald-400" />
              </div>
              <h4 className="text-white font-bold">Inteiros e Floats (Números)</h4>
              <p className="text-xs text-slate-500 italic">Valores matemáticos. Sem aspas.</p>
              <code className="text-[10px] text-emerald-300 font-black px-2 py-1 bg-emerald-500/10 rounded">idade = 25</code>
           </div>
        </div>
      </div>
    )
  },
  {
    id: '2',
    title: 'O Laboratório de Variáveis',
    subtitle: 'Arraste os dados para as caixas corretas',
    tag: 'EXPERIMENTAÇÃO',
    accent: 'indigo',
    content: (
       <div className="space-y-8">
          <div className="flex items-center gap-4 bg-indigo-500/5 border border-indigo-500/10 p-6 rounded-[2rem] max-w-2xl mx-auto shadow-inner">
             <FlaskConical className="w-10 h-10 text-indigo-400 shrink-0" />
             <p className="text-sm text-slate-400 leading-relaxed">
               <strong>Instrução:</strong> Preencha as variáveis de acordo com suas etiquetas. Note como o valor da memória é atualizado à medida que você altera os contêineres!
             </p>
          </div>
          <VariableLab />
       </div>
    )
  },
  {
    id: '3',
    title: 'Por que isso importa?',
    subtitle: 'Contexto no Mundo dos Dados',
    tag: 'MERCADO',
    accent: 'indigo',
    content: (
      <div className="space-y-8">
         <p className="text-xl text-slate-300 text-center max-w-2xl mx-auto leading-relaxed">
            Na análise de dados, usamos variáveis para guardar o resultado de cálculos complexos, nomes de colunas de tabelas e filtros de busca.
         </p>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl">
               <h4 className="text-indigo-400 font-black text-xs uppercase tracking-[0.2em] mb-4">Exemplo Prático</h4>
               <p className="font-mono text-xs text-slate-500 bg-slate-950 p-4 rounded-xl border border-white/5">
                 preco_unitario = 50.00<br/>
                 quantidade = 10<br/>
                 total_vendas = preco_unitario * quantidade
               </p>
            </div>
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl flex flex-col justify-center">
               <p className="text-xs text-slate-500 italic">"Ao mudar apenas o valor de `quantidade`, o `total_vendas` se atualiza automaticamente em sistemas bem programados."</p>
            </div>
         </div>
      </div>
    )
  },
  {
    id: '4',
    title: 'Fim da Aula 5.2',
    subtitle: 'Próxima etapa: BSM - Comunicação',
    tag: 'ENCERRAMENTO',
    accent: 'indigo',
    content: (
      <div className="text-center space-y-8 py-12">
         <div className="w-24 h-24 bg-indigo-500/10 rounded-full border-2 border-indigo-500/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-indigo-400" />
         </div>
         <div className="space-y-4">
            <h3 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter uppercase">Dados Armazenados.</h3>
            <p className="text-lg text-slate-400 max-w-lg mx-auto leading-relaxed">
               Agora que sabemos como o computador guarda informações, precisamos aprender como ns, humanos, as transmitimos.
            </p>
         </div>
         <div className="pt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/data" className="inline-flex items-center gap-3 bg-slate-900 border border-slate-800 text-white px-8 py-4 rounded-2xl hover:bg-slate-800 transition-all font-bold">
               VOLTAR AO SYLLABUS
            </Link>
            <Link to="/data/aula5-3" className="inline-flex items-center gap-3 bg-indigo-600 text-white font-black px-10 py-5 rounded-2xl hover:scale-105 transition-transform shadow-2xl shadow-indigo-900/40 group">
               AULA 5.3: COMUNICAÇÃO
               <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
         </div>
      </div>
    )
  }
];

export function DataLesson5_2() {
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
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30 overflow-x-hidden relative flex flex-col">
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div 
          animate={{ background: `radial-gradient(ellipse at center left, rgba(79, 70, 229, 0.1) 0%, rgba(2,6,23,1) 100%)` }}
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
              <h1 className="text-sm font-black tracking-widest text-slate-400 uppercase">Análise de Dados <span className="text-indigo-400 border-l border-white/20 pl-2 ml-1">AULA 5.2 • VARIÁVEIS</span></h1>
              <div className="flex gap-1 mt-1">
                 <div className="h-0.5 w-8 bg-indigo-500/40 rounded-full" />
                 <div className="h-0.5 w-8 bg-indigo-500 rounded-full" />
                 <div className="h-0.5 w-4 bg-slate-800 rounded-full" />
              </div>
           </div>
        </div>
        
        <div className="flex items-center gap-6 hidden sm:flex">
           <div className="flex space-x-1">
              {SLIDES.map((_, i) => (
                <div key={i} className={`h-2 rounded-full transition-all ${i === currentSlide ? 'w-6 bg-indigo-500 shadow-[0_0_10px_rgba(79,70,229,0.5)]' : 'w-2 bg-slate-800'}`} />
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
            <div className={`space-y-6 w-full ${slide.tag === 'EXPERIMENTAÇÃO' ? 'max-w-6xl' : 'max-w-4xl'}`}>
               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-2">
                  <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black tracking-[0.2em] bg-indigo-500/10 text-indigo-400 border border-indigo-500/30`}>
                    {slide.tag}
                  </span>
                  <h2 className="text-4xl md:text-5xl font-black text-white leading-tight underline decoration-white/10 decoration-wavy underline-offset-8 uppercase tracking-tighter">{slide.title}</h2>
                  <p className="text-lg md:text-xl text-slate-400 font-medium italic">{slide.subtitle}</p>
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0, scale: 0.98 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: 0.1 }}
                 className={`w-full mx-auto mt-8 ${!['EXPERIMENTAÇÃO', 'ENCERRAMENTO'].includes(slide.tag) ? 'bg-slate-900/60 backdrop-blur-xl border border-slate-700 p-8 md:p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden' : ''}`}
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
        <button onClick={() => paginate(1)} disabled={currentSlide === SLIDES.length - 1} className={`pointer-events-auto p-4 rounded-3xl bg-indigo-600/90 border border-indigo-400/50 text-white hover:bg-indigo-500 shadow-[0_0_30px_rgba(79,70,229,0.5)] transition-all disabled:opacity-20 backdrop-blur-xl group`}>
          <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>
      </footer>
    </div>
  );
}
