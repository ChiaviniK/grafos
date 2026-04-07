import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShieldAlert, Code, CheckCircle2, Database } from 'lucide-react';
import { Link } from 'react-router-dom';

import { SQLiSimulator } from '../components/seginfo/SQLiSimulator';
import { PasswordCracker } from '../components/seginfo/PasswordCracker';
import { XSSSimulator } from '../components/seginfo/XSSSimulator';
import { InteractiveQuiz } from '../components/seginfo/InteractiveQuiz';
import { SecurityDragAndDrop } from '../components/seginfo/SecurityDragAndDrop';
import { ReportCard } from '../components/seginfo/ReportCard';

export function SegurancaLesson9() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  
  // State for all grades
  const [scores, setScores] = useState({
    sqli: 0,
    password: 0,
    xss: 0,
    quiz: [] as number[],
    dragDrop: 0
  });

  const SLIDES = [
    {
      id: 'intro',
      title: 'SQL Injection (SQLi)',
      subtitle: 'Confundindo a Máquina',
      tag: 'INTRODUÇÃO',
      content: (
        <div className="space-y-6">
          <p className="text-2xl font-light text-slate-300 leading-relaxed text-center sm:text-left">
             Um dos ataques mais devastadores da web ocorre quando um atacante consegue <span className="text-indigo-400 font-bold italic">enganar o banco de dados</span> para executar comandos.
          </p>
          <div className="h-px w-full bg-gradient-to-r from-indigo-500/50 to-transparent my-6" />
          <p className="text-slate-400 leading-relaxed text-lg">
             Muitos sistemas cometem o erro de misturar <span className="text-white font-bold">Lógica de Execução</span> com <span className="text-white font-bold">Dados do Usuário</span>. Essa ponte frágil é exatamente onde o SQLi atua.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
             <div className="p-4 bg-slate-900/80 rounded-2xl border border-indigo-500/20">
                <Database className="w-6 h-6 text-indigo-400 mb-2" />
                <div className="text-sm font-bold text-white uppercase tracking-tighter">Bancos Relacionais</div>
                <p className="text-xs text-slate-500 mt-1">Dados vitais vivem majoritariamente em bancos que usam SQL.</p>
             </div>
             <div className="p-4 bg-slate-900/80 rounded-2xl border border-indigo-500/20">
                <Code className="w-6 h-6 text-indigo-400 mb-2" />
                <div className="text-sm font-bold text-white uppercase tracking-tighter">Falta de Sanitização</div>
                <p className="text-xs text-slate-500 mt-1">Se a string не for filtrada, o banco perde o controle do que é operação e do que é input.</p>
             </div>
          </div>
        </div>
      )
    },
    {
      id: 'anatomy',
      title: 'A Anatomia do Ataque',
      subtitle: 'A aspa simples que derruba impérios',
      tag: 'TEORIA',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
             <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 font-mono text-xs sm:text-sm space-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 px-3 py-1 bg-rose-500/20 text-rose-400 text-[10px] font-bold rounded-bl-xl border-b border-l border-rose-500/30">VULNERÁVEL</div>
                <p className="text-slate-300"><span className="text-purple-400 font-bold">SELECT</span> * <span className="text-purple-400 font-bold">FROM</span> users</p>
                <p className="text-slate-300"><span className="text-purple-400 font-bold">WHERE</span> username = <span className="text-emerald-400">'userInput'</span>;</p>
             </div>
             <p className="text-sm text-slate-400">
               O servidor concatena strings diretamente. Se o input for <span className="text-indigo-400 font-bold font-mono">' OR 1=1 --</span>, a query fina vazia de lógica protetora.
             </p>
             <div className="bg-slate-950 p-6 rounded-3xl border border-rose-500/30 font-mono text-xs sm:text-sm space-y-2 relative overflow-hidden shadow-[0_0_20px_rgba(244,63,94,0.1)]">
                <div className="absolute top-0 right-0 px-3 py-1 bg-rose-500 text-white text-[10px] font-bold rounded-bl-xl">INJETADO</div>
                <p className="text-slate-300"><span className="text-purple-400 font-bold">SELECT</span> * <span className="text-purple-400 font-bold">FROM</span> users</p>
                <p className="text-slate-300"><span className="text-purple-400 font-bold">WHERE</span> username = <span className="text-emerald-400">''</span> <span className="text-purple-400 font-bold">OR</span> 1=1 <span className="text-slate-500">--';</span></p>
             </div>
          </div>
          <div className="relative group">
             <div className="absolute -inset-4 bg-indigo-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
             <div className="bg-slate-900 border-2 border-indigo-500/20 p-8 rounded-[2.5rem] relative text-slate-400 space-y-4 text-sm font-medium">
                <ShieldAlert className="w-12 h-12 text-indigo-400 mx-auto mb-6" />
                <p>O <span className="text-indigo-400 font-bold">OR 1=1</span> cria uma Tautologia: uma sentença que sempre será verdadeira.</p>
                <p>O símbolo <span className="text-indigo-400 font-bold">--</span> é o comentário no SQL, ele instrui o servidor a ignorar todo o resto da verificação (como a senha).</p>
             </div>
          </div>
        </div>
      )
    },
    {
      id: 'lab',
      title: 'Desafio Prático: O Bypass',
      subtitle: 'Engane o Banco de Dados para ganhar pontos',
      tag: 'LABORATÓRIO SQLI (10 pts)',
      content: (
        <div className="space-y-6">
          <SQLiSimulator 
             onComplete={(score) => setScores(s => ({ ...s, sqli: score }))}
          />
        </div>
      )
    },
    {
      id: 'xss-lab',
      title: 'Desafio Prático: Cross-Site Scripting',
      subtitle: 'Explorando falhas de sanitização em ecossistemas',
      tag: 'LABORATÓRIO XSS (20 pts)',
      content: (
        <div className="space-y-6">
          <XSSSimulator 
             onComplete={(score) => setScores(s => ({ ...s, xss: score }))}
          />
        </div>
      )
    },
    {
      id: 'password-lab',
      title: 'Desafio Prático: Dictionary Attack',
      subtitle: 'Quebrando hashes com Inteligência Social',
      tag: 'LABORATÓRIO CRACKER (20 pts)',
      content: (
        <div className="space-y-6">
          <PasswordCracker 
             onComplete={(score) => setScores(s => ({ ...s, password: score }))}
          />
        </div>
      )
    },
    {
      id: 'defesa',
      title: 'A Solução: Prepared Statements',
      subtitle: 'Como o mercado se defende',
      tag: 'PREVENÇÃO',
      content: (
        <div className="space-y-8">
           <p className="text-lg text-slate-300 text-center max-w-2xl mx-auto">
              A regra de ouro é: <span className="text-indigo-400 font-black">NUNCA confie na entrada do usuário.</span> A solução não é criar filtros manuais, mas declarar parâmetros.
           </p>
           <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 font-mono text-sm space-y-4 shadow-xl">
               <div className="flex gap-2 border-b border-slate-800 pb-2 mb-4 text-slate-500 font-bold text-xs">
                  <span>Node.js / Express</span>
                  <span className="text-emerald-400">✅ Código Seguro</span>
               </div>
               <p className="text-slate-300">
                 <span className="text-blue-400">const</span> query = <span className="text-emerald-400">"SELECT * FROM users WHERE username = ? AND password = ?"</span>;
               </p>
               <p className="text-slate-300 mt-2">
                 db.<span className="text-yellow-200">execute</span>(query, [usernameInput, passwordInput]);
               </p>
               <div className="mt-8 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 font-sans text-sm flex gap-3 items-center">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <p>Aqui, as variáveis nunca se misturam com a string principal do SQL. O motor do banco de dados trata o `?` estritamente como um valor.</p>
               </div>
           </div>
        </div>
      )
    },
    {
      id: 'drag-drop-review',
      title: 'Revisão Sistêmica',
      subtitle: 'Mapeando ameaças e seguranças do bimestre',
      tag: 'CONEXÃO CONCEITUAL (40 pts)',
      content: (
        <SecurityDragAndDrop onComplete={(score) => setScores(s => ({ ...s, dragDrop: score }))} />
      )
    },
    {
      id: 'quiz',
      title: 'Simulado de Fechamento',
      subtitle: 'Validando o conhecimento consolidado',
      tag: 'QUIZ INTERATIVO (50 pts)',
      content: (
        <InteractiveQuiz onComplete={(scoreArray) => setScores(s => ({ ...s, quiz: scoreArray }))} />
      )
    },
    {
      id: 'telemetry',
      title: 'Boletim da Sessão',
      subtitle: 'Submissão de Notas e Fechamento de Aula',
      tag: 'ENCERRAMENTO',
      content: (
        <ReportCard scores={scores} />
      )
    }
  ];

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
  const isWidthConstrainedList = ['LABORATÓRIO SQLI (10 pts)', 'LABORATÓRIO XSS (20 pts)', 'LABORATÓRIO CRACKER (20 pts)', 'PREVENÇÃO', 'CONEXÃO CONCEITUAL (40 pts)', 'QUIZ INTERATIVO (50 pts)', 'ENCERRAMENTO'];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30 overflow-x-hidden relative flex flex-col">
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div 
          animate={{ background: `radial-gradient(ellipse at center right, rgba(99, 102, 241, 0.08) 0%, rgba(2,6,23,1) 100%)` }}
          transition={{ duration: 1 }}
          className="absolute inset-0 opacity-80" 
        />
      </div>

      <header className="relative z-20 px-8 py-6 flex justify-between items-center border-b border-slate-800 backdrop-blur-md bg-slate-950/40">
        <div className="flex items-center gap-4">
           <Link to="/seguranca" className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center transition-colors">
              <ChevronLeft className="w-5 h-5 text-white" />
           </Link>
           <div>
              <h1 className="text-sm font-black tracking-widest text-slate-400 uppercase">Segurança da Informação <span className="text-indigo-400 border-l border-white/20 pl-2 ml-1">AULA 9 • SQL INJECTION E REVISÃO</span></h1>
              <div className="flex gap-1 mt-1">
                 <div className="h-0.5 w-8 bg-indigo-500 rounded-full" />
                 <div className="h-0.5 w-8 bg-indigo-500 rounded-full" />
                 <div className="h-0.5 w-8 bg-indigo-500 rounded-full" />
              </div>
           </div>
        </div>
        
        <div className="flex items-center gap-6 hidden sm:flex">
           <div className="flex space-x-1">
              {SLIDES.map((_, i) => (
                <div key={i} className={`h-2 rounded-full transition-all ${i === currentSlide ? 'w-6 bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]' : 'w-2 bg-slate-800'}`} />
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
            className={`w-full ${isWidthConstrainedList.includes(slide.tag) ? 'max-w-6xl' : 'max-w-4xl'} flex flex-col items-center justify-center`}
          >
            <div className={`space-y-6 w-full`}>
               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-2">
                  <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black tracking-[0.2em] ${slide.tag.includes('pts') ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30'} uppercase`}>
                    {slide.tag}
                  </span>
                  <h2 className="text-4xl md:text-5xl font-black text-white leading-tight underline decoration-white/10 decoration-wavy underline-offset-8 uppercase tracking-tighter">{slide.title}</h2>
                  <p className="text-lg md:text-xl text-slate-400 font-medium italic">{slide.subtitle}</p>
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0, scale: 0.98 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: 0.1 }}
                 className={`w-full mx-auto mt-8 ${!isWidthConstrainedList.includes(slide.tag) ? 'bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 p-8 md:p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden' : ''}`}
               >
                  {slide.content}
               </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation Footer */}
      <footer className="fixed bottom-0 left-0 w-full p-6 z-20 flex justify-between items-center pointer-events-none">
        <button onClick={() => paginate(-1)} disabled={currentSlide === 0} className="pointer-events-auto p-4 rounded-3xl bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900 transition-all disabled:opacity-20 backdrop-blur-xl group shadow-lg">
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
        </button>
        <button onClick={() => paginate(1)} disabled={currentSlide === SLIDES.length - 1} className={`pointer-events-auto p-4 rounded-3xl bg-indigo-600/90 border border-indigo-400/50 text-white hover:bg-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-all disabled:opacity-20 backdrop-blur-xl group`}>
          <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>
      </footer>
    </div>
  );
}
