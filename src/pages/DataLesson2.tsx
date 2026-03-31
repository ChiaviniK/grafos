import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Fingerprint, Search, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MindsetSorter } from '../components/data/MindsetSorter';
import { BugHunt } from '../components/data/BugHunt';

const SLIDES = [
  {
    id: '1',
    title: 'O Algoritmo Humano',
    subtitle: '50% Hard Skill, 50% Soft Skill.',
    tag: '01. INTRODUÇÃO',
    image: '',
    accent: 'blue',
    content: (
      <div className="space-y-6">
        <p className="text-2xl font-light text-slate-300 leading-relaxed">
          Antes de configurar o seu banco de dados, você precisa <span className="text-blue-400 font-bold">configurar a sua mente</span>.
        </p>
        <div className="h-px w-full bg-gradient-to-r from-blue-500/50 to-transparent my-6" />
        <p className="text-slate-400">
          Você enfrentará incertezas diárias. Tecnologias que atualizam, códigos que quebram sem motivo, e Chefes que não sabem o que querem. O seu Sucesso depende puramente do seu <strong>Mindset de Resolução de Problemas</strong> e <strong>Orientação aos Detalhes</strong>.
        </p>
      </div>
    )
  },
  {
    id: '2',
    title: 'Growth Mindset',
    subtitle: 'A Bússola Cognitiva',
    tag: 'TIFC-01',
    image: '/assets/data_aula2/pixel_brain_growth.png',
    accent: 'emerald',
    content: (
      <div className="space-y-6">
         <p className="text-slate-300">
            A dor e a frustração de um código que não compila é fisiologicamente real. O <strong>Growth Mindset</strong> (Mentalidade de Crescimento) é a chave.
         </p>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="bg-rose-900/20 p-4 border border-rose-500/30 rounded-xl">
                 <h4 className="text-rose-400 font-bold text-lg mb-2">Mindset Fixo</h4>
                 <p className="text-xs text-slate-400">Foge de desafios. Culpabiliza o "dom". Acha que Inteligência é fixa desde o nascimento.</p>
             </div>
             <div className="bg-emerald-900/20 p-4 border border-emerald-500/30 rounded-xl">
                 <h4 className="text-emerald-400 font-bold text-lg mb-2">Growth Mindset</h4>
                 <p className="text-xs text-slate-400">Ama a tentativa empírica. Sabe que o cérebro cria novas sinapses a cada linha de código que quebra.</p>
             </div>
         </div>
      </div>
    )
  },
  {
    id: '3',
    title: '[GAME] A Bússola Comportamental',
    subtitle: 'Treinamento de Mindset',
    tag: 'INTERAÇÃO',
    image: '',
    accent: 'emerald',
    content: (
        <MindsetSorter />
    )
  },
  {
    id: '4',
    title: 'O Caminho do Aprendizado',
    subtitle: 'Os Momentos de Ruptura',
    tag: 'DATA-INTRO',
    image: '',
    accent: 'purple',
    content: (
      <div className="space-y-6">
         <p className="text-slate-300">
            Durante sua jornada como Analista, você não irá apenas aprender botões e sintaxes. Especialistas da indústria identificaram 3 momentos críticos ("Breakout Moments") onde a maioria dos profissionais júnior trava:
         </p>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
             <div className="bg-purple-900/10 p-4 border border-purple-500/20 rounded-xl relative overflow-hidden group hover:border-purple-500/50 transition-colors">
                 <div className="absolute top-0 right-0 p-2 text-purple-900 font-black text-4xl opacity-20 group-hover:opacity-40 transition-opacity">1</div>
                 <h4 className="text-purple-400 font-bold mb-2 z-10 relative">O que eles realmente querem?</h4>
                 <p className="text-sm text-slate-400 relative z-10">Quando um gestor pede "Me dê os dados de vendas", o analista precisa investigar: O que você vai decidir com isso? Que recorte de tempo importa?</p>
             </div>
             <div className="bg-fuchsia-900/10 p-4 border border-fuchsia-500/20 rounded-xl relative overflow-hidden group hover:border-fuchsia-500/50 transition-colors">
                 <div className="absolute top-0 right-0 p-2 text-fuchsia-900 font-black text-4xl opacity-20 group-hover:opacity-40 transition-opacity">2</div>
                 <h4 className="text-fuchsia-400 font-bold mb-2 z-10 relative">O Caos das Prioridades</h4>
                 <p className="text-sm text-slate-400 relative z-10">Você terá 5 departamentos diferentes exigindo relatórios para "ontem". Saber categorizar urgência vs esforço é sobrevivência.</p>
             </div>
             <div className="bg-pink-900/10 p-4 border border-pink-500/20 rounded-xl relative overflow-hidden group hover:border-pink-500/50 transition-colors">
                 <div className="absolute top-0 right-0 p-2 text-pink-900 font-black text-4xl opacity-20 group-hover:opacity-40 transition-opacity">3</div>
                 <h4 className="text-pink-400 font-bold mb-2 z-10 relative">Traduzir o Tecniquês</h4>
                 <p className="text-sm text-slate-400 relative z-10">Como comunicar que a variância estatística indica um risco sem usar palavras que assustem a diretoria comercial?</p>
             </div>
         </div>
      </div>
    )
  },
  {
    id: '5',
    title: 'A Lógica Investigativa',
    subtitle: 'Resolução de Problemas Passo-a-Passo',
    tag: 'TIFC1-00',
    image: '',
    accent: 'sky',
    content: (
      <div className="space-y-6">
         <p className="text-slate-300">
            A Resolução de Problemas é um esporte de estrutura. Profissionais avançados não "adivinham" respostas, eles seguem um método lógico quando o sistema falha:
         </p>
         <ul className="space-y-4">
             <li className="flex gap-4 items-start bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                 <div className="w-8 h-8 shrink-0 bg-sky-500/20 rounded-full flex items-center justify-center text-sky-400 font-black">1</div>
                 <div>
                    <strong className="text-white block mb-1">Reconhecer e Definir</strong>
                    <span className="text-sm text-slate-400">Qual é exatamente o erro que estou recebendo? Isolá-lo mentalmente do resto do sistema.</span>
                 </div>
             </li>
             <li className="flex gap-4 items-start bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                 <div className="w-8 h-8 shrink-0 bg-sky-500/20 rounded-full flex items-center justify-center text-sky-400 font-black">2</div>
                 <div>
                    <strong className="text-white block mb-1">Pesquisar de forma Independente</strong>
                    <span className="text-sm text-slate-400">O Google não é cola, é ferramenta de trabalho. Como formatar a pergunta certa no buscador?</span>
                 </div>
             </li>
             <li className="flex gap-4 items-start bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                 <div className="w-8 h-8 shrink-0 bg-sky-500/20 rounded-full flex items-center justify-center text-sky-400 font-black">3</div>
                 <div>
                    <strong className="text-white block mb-1">Testar uma Hipótese Solitária</strong>
                    <span className="text-sm text-slate-400">Mude apenas UMA variável por vez e rode o relatório de novo. Se mudar cinco coisas juntas, nunca saberá o que consertou.</span>
                 </div>
             </li>
         </ul>
      </div>
    )
  },
  {
    id: '6',
    title: 'Orientação a Detalhes',
    subtitle: 'O Analista Paranoico',
    tag: 'BSM-OD',
    image: '',
    accent: 'amber',
    content: (
      <div className="space-y-6">
         <p className="text-slate-300">
            Máquinas são implacavelmente lógicas e estúpidas. Elas não inferem significado. Uma vírgula fora do lugar pode custar milhões.
         </p>
         <div className="flex gap-4 p-4 bg-slate-900 rounded-xl border-l-4 border-amber-500">
             <ShieldAlert className="w-8 h-8 text-amber-400" />
             <p className="text-sm text-slate-300">"Orientação a Detalhes" significa validar meticulosamente suas fontes, caçar "Garbage In" e assumir uma postura de Revisão Contínua (Double-check). Você é a última barreira antes do dado chegar ao Diretor.</p>
         </div>
      </div>
    )
  },
  {
    id: '7',
    title: '[GAME] Criptografia Oculta',
    subtitle: 'The Bug Hunt',
    tag: 'INTERAÇÃO',
    image: '/assets/data_aula2/pixel_bug_hunt.png',
    accent: 'sky',
    content: (
        <BugHunt />
    )
  },
  {
    id: '8',
    title: 'Conclusão: Resolução de Problemas',
    subtitle: 'Abraçando a Incerteza',
    tag: 'EPÍLOGO',
    image: '',
    accent: 'indigo',
    content: (
      <div className="space-y-8 flex flex-col items-center justify-center text-center mt-6">
         <Search className="w-16 h-16 text-indigo-400 animate-bounce" />
         <h3 className="text-2xl font-black text-white">Google as a Service.</h3>
         <p className="text-slate-400 max-w-lg">
             A incerteza será sua companheira de trabalho diária. <strong>Você será pago para descobrir a resposta</strong> que ninguém sabe ainda. Acostume-se a cavar documentações, vasculhar o StackOverflow e explorar bases desconhecidas de forma autônoma.
         </p>
      </div>
    )
  }
];

export function DataLesson2() {
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

  const visualContent = slide.image ? (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group flex justify-center items-center bg-slate-900"
    >
        <img 
        src={slide.image} 
        alt={slide.title}
        className="w-full h-full object-cover pixelated transform group-hover:scale-105 transition-transform duration-1000"
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60`} />
    </motion.div>
  ) : (
    <div className={`relative aspect-video rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.1)] border border-${slide.accent}-500/20 bg-slate-950 flex flex-col items-center justify-center`}>
        <div className={`absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/black-mamba.png')]`} />
        
        {/* Abstract DB visuals */}
        <motion.div 
           animate={{ rotateX: [0, 10, 0], rotateY: [0, 10, 0] }} 
           transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
           className={`absolute w-64 h-64 border border-${slide.accent}-500/10 rounded-[3rem] rotate-45 flex flex-col gap-2 items-center justify-center`}
        >
            <div className={`absolute inset-0 border border-${slide.accent}-500/20 rounded-[3rem] rotate-12`} />
            <div className={`absolute inset-0 border border-${slide.accent}-500/30 rounded-[3rem] -rotate-12`} />
        </motion.div>
        
        <Fingerprint className={`w-24 h-24 text-${slide.accent}-500/50 absolute animate-pulse`} />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-emerald-500/30 overflow-x-hidden relative flex flex-col">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.05)_0%,rgba(2,6,23,1)_100%)] opacity-80" />
      </div>

      <header className="relative z-20 px-8 py-6 flex justify-between items-center border-b border-blue-900/30 backdrop-blur-md bg-slate-950/40">
        <div className="flex items-center gap-4">
           <Link to="/data" className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center transition-colors">
              <ChevronLeft className="w-5 h-5 text-white" />
           </Link>
           <div>
              <h1 className="text-sm font-black tracking-widest text-blue-400 uppercase">Análise de Dados <span className="text-white border-l border-white/20 pl-2 ml-1">AULA_2__MINDSET</span></h1>
              <div className="h-0.5 w-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full mt-0.5" />
           </div>
        </div>
        
        <div className="flex items-center gap-6">
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
            className={`w-full max-w-7xl grid grid-cols-1 ${slide.tag === 'INTERAÇÃO' ? 'lg:grid-cols-1' : 'lg:grid-cols-2'} gap-8 lg:gap-12 items-center`}
          >
            {slide.tag !== 'INTERAÇÃO' && (
              <div className="order-2 lg:order-1 space-y-4">
                {visualContent}
              </div>
            )}

            <div className={`order-1 lg:order-2 space-y-6 ${slide.tag === 'INTERAÇÃO' || !slide.image ? 'w-full' : ''}`}>
               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`space-y-2 ${slide.tag === 'INTERAÇÃO' ? 'text-center' : ''}`}>
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
                 className={`bg-slate-900/60 backdrop-blur-xl border border-blue-500/10 p-6 md:p-10 rounded-[2rem] shadow-[0_0_50px_rgba(59,130,246,0.05)] w-full mx-auto ${slide.tag === 'INTERAÇÃO' ? 'max-w-4xl bg-transparent border-none shadow-none md:p-0' : ''}`}
               >
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
