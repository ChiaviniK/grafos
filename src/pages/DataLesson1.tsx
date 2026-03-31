import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Fingerprint, Search, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import { QualityMatcher } from '../components/data/QualityMatcher';
import { DataCleaner } from '../components/data/DataCleaner';

const SLIDES = [
  {
    id: '1',
    title: 'O Papel do Analista',
    subtitle: 'Nós não fazemos mágica, nós investigamos.',
    tag: '01. INTRODUÇÃO',
    image: '/assets/data_aula1/pixel_data_detective.png',
    accent: 'emerald',
    content: (
      <div className="space-y-6">
        <p className="text-2xl font-light text-slate-300 leading-relaxed">
          As empresas hoje não sofrem por falta de dados. Elas sofrem de <span className="text-emerald-400 font-bold">obesidade de dados</span> (Infoxicação). O seu trabalho é encontrar a agulha no palheiro.
        </p>
        <div className="h-px w-full bg-gradient-to-r from-emerald-500/50 to-transparent my-6" />
        <p className="text-slate-400">
          Você converte números invisíveis em decisões de Negócios. Exemplo: Varejistas usam Análise de Dados para prever pico de vendas no fim do ano baseando-se em tendências climáticas, e times de futebol compram jogadores baseados unicamente em métricas de passe.
        </p>
      </div>
    )
  },
  {
    id: '2',
    title: 'O Triângulo de Ferro',
    subtitle: 'O que te torna um Analista Pro?',
    tag: 'PERFIL',
    image: '',
    accent: 'sky',
    content: (
      <div className="space-y-6">
         <p className="text-slate-300">
            Diferente de um Programador ou Engenheiro puro, o Analista é uma mistura exata de TÉCNICA e FALA.
         </p>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <div className="bg-sky-900/20 p-4 border border-sky-500/30 rounded-xl">
                 <h4 className="text-sky-400 font-bold text-lg mb-2">Curiosidade Criminológica</h4>
                 <p className="text-xs text-slate-400">Não aceite um número. Pergunte de qual sensor/tabela ele veio e sob qual critério estatístico.</p>
             </div>
             <div className="bg-emerald-900/20 p-4 border border-emerald-500/30 rounded-xl">
                 <h4 className="text-emerald-400 font-bold text-lg mb-2">Engenharia Leve</h4>
                 <p className="text-xs text-slate-400">Capacidade de abrir caixas pesadas (Python/SQL) para extrair o petróleo debaixo delas.</p>
             </div>
             <div className="bg-fuchsia-900/20 p-4 border border-fuchsia-500/30 rounded-xl">
                 <h4 className="text-fuchsia-400 font-bold text-lg mb-2">Comunicação Translúcida</h4>
                 <p className="text-xs text-slate-400">O Diretor de Marketing não liga pra SQL. Ele quer ouvir uma História baseada nos dados.</p>
             </div>
         </div>
      </div>
    )
  },
  {
    id: '3',
    title: '[GAME] Resolvendo Crises Corporativas',
    subtitle: 'Ativando a Soft Skill Correta',
    tag: 'INTERAÇÃO',
    image: '',
    accent: 'emerald',
    content: (
        <QualityMatcher />
    )
  },
  {
    id: '4',
    title: 'O Pesadelo: Garbage In',
    subtitle: 'Lixo Entra, Lixo Sai',
    tag: '02. REALIDADE',
    image: '/assets/data_aula1/pixel_garbage_in.png',
    accent: 'rose',
    content: (
      <div className="space-y-6">
         <p className="text-slate-300">
            Ferramentas como PowerBI, Tableau ou Modelos Preditivos e Inteligências Artificiais sofisticadas não têm cérebro.
         </p>
         <div className="flex gap-4 p-4 bg-slate-900 rounded-xl border-l-4 border-rose-500">
             <ShieldAlert className="w-8 h-8 text-rose-400" />
             <p className="text-sm text-slate-300">Se você alimentar a fornalha analítica com planilhas de RH contendo datas de nascimento como "banana", "01/32" e IDs nulos, a máquina cuspirá a pior previsão financeira que a sua empresa já viu. Isso custa milhões para corporações gigantescas (Air France, NASA, Target).</p>
         </div>
         <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Sanitizar Dados é 80% do trabalho.</p>
      </div>
    )
  },
  {
    id: '5',
    title: '[GAME] A Lavanderia',
    subtitle: 'Tratamento de Anomalias',
    tag: 'INTERAÇÃO',
    image: '',
    accent: 'sky',
    content: (
        <DataCleaner />
    )
  },
  {
    id: '6',
    title: 'Conclusão: Fundamentos',
    subtitle: 'O Alicerce de Dados',
    tag: 'EPÍLOGO',
    image: '',
    accent: 'indigo',
    content: (
      <div className="space-y-8 flex flex-col items-center justify-center text-center mt-6">
         <Search className="w-16 h-16 text-indigo-400 animate-bounce" />
         <h3 className="text-2xl font-black text-white">Sede de Respostas.</h3>
         <p className="text-slate-400 max-w-lg">
             O valor principal de um Analista não é saber fazer o SELECT mais complexo de um Banco de Dados. O Seu valor é **O que você pergunta** e como você transmite a história que encontrou para as lideranças mudarem o destino da empresa.
         </p>
         <p className="text-indigo-300 font-bold bg-indigo-900/30 px-6 py-2 border border-indigo-500/20 rounded-full mt-4">
             Fim da Qualificação Base. Próximo Passo: Extração de Dados SQL.
         </p>
      </div>
    )
  }
];

export function DataLesson1() {
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
      className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl group"
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
           className={`absolute w-48 h-48 border-2 border-${slide.accent}-500/10 rounded-full flex flex-col gap-2 items-center justify-center`}
        >
            <div className={`w-3/4 h-8 border border-${slide.accent}-500/30 rounded-full bg-${slide.accent}-900/20`} />
            <div className={`w-3/4 h-8 border border-${slide.accent}-500/30 rounded-full bg-${slide.accent}-900/20 shadow-[0_0_20px_rgba(16,185,129,0.2)]`} />
            <div className={`w-3/4 h-8 border border-${slide.accent}-500/30 rounded-full bg-${slide.accent}-900/20`} />
        </motion.div>
        
        <Fingerprint className={`w-20 h-20 text-${slide.accent}-500/50 absolute`} />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-emerald-500/30 overflow-x-hidden relative flex flex-col">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.05)_0%,rgba(2,6,23,1)_100%)] opacity-80" />
      </div>

      <header className="relative z-20 px-8 py-6 flex justify-between items-center border-b border-emerald-900/30 backdrop-blur-md bg-slate-950/40">
        <div className="flex items-center gap-4">
           <Link to="/data" className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center transition-colors">
              <ChevronLeft className="w-5 h-5 text-white" />
           </Link>
           <div>
              <h1 className="text-sm font-black tracking-widest text-emerald-500 uppercase">Análise de Dados <span className="text-white border-l border-white/20 pl-2 ml-1">AULA_1__PAPEL</span></h1>
              <div className="h-0.5 w-full bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full mt-0.5" />
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

      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12 flex items-center justify-center flex-1 min-h-[calc(100vh-160px)] pb-32">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 50 : -50, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: direction > 0 ? -50 : 50, filter: 'blur(10px)' }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          >
            <div className="order-2 lg:order-1 space-y-4">
              {visualContent}
            </div>

            <div className={`order-1 lg:order-2 space-y-6 ${slide.image === '' ? 'lg:col-span-2 text-center items-center flex flex-col justify-center' : ''}`}>
               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
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
                 className={`bg-slate-900/60 backdrop-blur-xl border border-emerald-500/10 p-6 md:p-10 rounded-[2rem] shadow-[0_0_50px_rgba(16,185,129,0.05)] w-full ${slide.image === '' ? 'max-w-4xl text-left' : ''}`}
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
