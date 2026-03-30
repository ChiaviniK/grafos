import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, SplitSquareHorizontal, Layers, Sparkles, Workflow } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MultiverseSimulator } from '../components/lfa/MultiverseSimulator';
import { SubsetConstructionGame } from '../components/lfa/SubsetConstructionGame';

const SLIDES = [
  {
    id: '1',
    title: 'A Quebra da Causalidade',
    subtitle: 'Autômatos Não Determinísticos (AFN)',
    tag: '01. INTRODUÇÃO',
    image: '/assets/lfa_aula7/pixel_nfa_machine.png',
    accent: 'fuchsia',
    content: (
      <div className="space-y-4">
        <p className="text-2xl font-light text-slate-300 leading-relaxed">
          Até hoje, você viveu num mundo matematicamente <span className="text-fuchsia-400 font-bold">Determinístico</span>. Uma escolha, um futuro.
        </p>
        <div className="h-px w-full bg-gradient-to-r from-fuchsia-500/50 to-transparent my-6" />
        <p className="text-slate-400">
          Bem-vindo ao caos. No AFN, o universo se bifurca. Uma mesma letra pode te levar para dois caminhos simultâneos, ou desaparecer no vazio.
        </p>
      </div>
    )
  },
  {
    id: '2',
    title: 'A Metáfora do Labirinto',
    subtitle: 'Ramos Paralelos de Execução',
    tag: 'FUNDAMENTOS',
    image: '',
    accent: 'purple',
    content: (
      <div className="space-y-6">
         <p className="text-slate-300">
            Imagine um labirinto escuro.
         </p>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
             <div className="bg-blue-900/20 p-6 rounded-2xl border border-blue-500/30">
                <Workflow className="w-10 h-10 text-blue-400 mb-4" />
                <h4 className="text-blue-400 font-black text-xl mb-2">Com o AFD</h4>
                <p className="text-sm text-slate-400">Há uma bússola. A placa diz: "Se a letra é '1', vire à esquerda". Você vira à esquerda. É uma jornada solitária e linear.</p>
             </div>
             <div className="bg-fuchsia-900/20 p-6 rounded-2xl border border-fuchsia-500/30 shadow-[0_0_20px_rgba(217,70,239,0.15)]">
                <SplitSquareHorizontal className="w-10 h-10 text-fuchsia-400 mb-4" />
                <h4 className="text-fuchsia-400 font-black text-xl mb-2">Com o AFN</h4>
                <p className="text-sm text-slate-400">A bússola quebra. A placa diz: "Se '1', vire à esquerda, OU vá reto, OU suba". Você não escolhe. Você se clona em três versões e testa tudo simultaneamente!</p>
             </div>
         </div>
      </div>
    )
  },
  {
    id: '3',
    title: 'A Redefinição de Delta (δ)',
    subtitle: 'Conjuntos das Partes (Power Set)',
    tag: 'MATEMÁTICA FORMAL',
    image: '',
    accent: 'indigo',
    content: (
      <div className="space-y-6">
        <p className="text-slate-300">
           A mágica do multiverso acontece inteiramente na função de transição `δ`.
        </p>
        <div className="bg-slate-900 border border-indigo-500/30 rounded-xl p-6 font-mono text-center">
            <span className="text-xl text-slate-400">AFD: </span>
            <span className="text-2xl text-blue-400 font-black">δ: Q × Σ → Q</span>
            <br/><br/>
            <span className="text-xl text-slate-400">AFN: </span>
            <span className="text-2xl text-fuchsia-400 font-black">δ: Q × Σ → P(Q)</span>
        </div>
        <p className="text-sm text-slate-400 italic">
            O `P(Q)` é o "Power Set". Ele significa que a resposta do AFN não é um único estado destino, mas sim um **conjunto** de estados destinos. O conjunto pode ter 1 estado, 5 estados, ou até ser um conjunto VAZIO (o clone morre).
        </p>
      </div>
    )
  },
  {
    id: '4',
    title: '[INTERAÇÃO] Computador Quântico',
    subtitle: 'Múltiplas Fitas. Múltiplos Finais.',
    tag: 'SIMULADOR',
    image: '',
    accent: 'fuchsia',
    content: (
        <MultiverseSimulator />
    )
  },
  {
    id: '5',
    title: 'Transições Espontâneas (ε)',
    subtitle: 'Epsilon: O Teletransporte Lógico',
    tag: '02. O VAZIO E O TODO',
    image: '/assets/lfa_aula7/pixel_nfa_epsilon.png',
    accent: 'violet',
    content: (
      <div className="space-y-6">
         <p className="text-slate-300">
            A forma mais insana de Autômato Não-Determinístico (O AFN-ε) possui setas marcadas com a letra grega <b>Épsilon (ε)</b>, que representa a cadeia vazia.
         </p>
         <div className="bg-violet-900/30 p-5 rounded-xl border-l-4 border-violet-500">
            <p className="text-sm text-slate-300">
              Isso permite que a máquina mude de estado **DE GRAÇA**. Sem ler nenhuma letra da fita! O universo simplesmente decide que um clone aparecerá num estado avançado no meio da computação, criando atalhos lógicos surreais.
            </p>
         </div>
      </div>
    )
  },
  {
    id: '6',
    title: 'Determinístico vs Não-Determinístico',
    subtitle: 'Eles Têm o Mesmo Poder?',
    tag: 'QUESTÃO DE RABIN & SCOTT',
    image: '',
    accent: 'cyan',
    content: (
      <div className="space-y-6">
         <h3 className="text-3xl font-black text-white">SIM.</h3>
         <p className="text-slate-300">
            Este é um dos teoremas mais profundos da computação: <strong className="text-cyan-400">Todo AFN pode ser simulado por um AFD.</strong>
         </p>
         <p className="text-slate-400 mt-4 text-sm">
            Tudo o que um AFN aceita, o AFD também aceita. Nenhuma máquina Mágica Quântica (AFN) te dá poder de calcular o incalculável. Elas apenas tornam muito mais RÁPIDO para NÓS (humanos) desenharmos o diagrama.
         </p>
         <div className="flex items-center gap-4 text-xs font-mono bg-slate-900 p-3 rounded-lg border border-slate-700">
             <span className="text-fuchsia-400">Linguagem {"{ w | termina em 00 }"}</span>
             <ArrowRight className="w-4 h-4 text-slate-500 mx-2" />
             <span className="text-blue-400">AFN: 3 estados</span>
             <span className="text-emerald-400">AFD: 3 estados (Mas tabelas complexas)</span>
         </div>
      </div>
    )
  },
  {
    id: '7',
    title: 'A Mentira Computacional',
    subtitle: 'Como o compilador resolve magia?',
    tag: 'ENGENHARIA REVERSA',
    image: '',
    accent: 'purple',
    content: (
      <div className="space-y-6 flex flex-col items-center text-center">
         <Layers className="w-16 h-16 text-purple-400 mb-2" />
         <p className="text-slate-300 text-lg">
            Um Processador real é 100% Determinístico. Ele precisa de uma tabela exata. 
         </p>
         <p className="text-slate-400">
            Para executar um diagrama AFN dentro da CPU, compiladores utilizam um algoritmo brutal chamado **Subset Construction (Construção de Subconjuntos)**. Ele pega os universos paralelos e os amassa num único estado híbrido, até transformar a máquina de volta num AFD.
         </p>
      </div>
    )
  },
  {
    id: '8',
    title: '[GAME] A Fornalha de Estados',
    subtitle: 'Simulador de Construção de Subconjuntos',
    tag: 'DESAFIO',
    image: '',
    accent: 'indigo',
    content: (
        <SubsetConstructionGame />
    )
  },
  {
    id: '9',
    title: 'A Explosão Combinatória',
    subtitle: 'O perigo real por trás dos subconjuntos',
    tag: 'AVISO DO SISTEMA',
    image: '',
    accent: 'rose',
    content: (
      <div className="space-y-6">
         <p className="text-slate-300">
            Ao fundir conjuntos de estados num AFD equivalente, nós encaramos o <b>Risco Exponencial</b>.
         </p>
         <div className="bg-rose-900/10 border border-rose-500/20 rounded-2xl p-6 text-center">
             <div className="font-mono text-sm text-slate-500 mb-2">Se um AFN tem <span className="text-white">N</span> estados:</div>
             <div className="text-3xl font-black text-rose-400">O AFD pode gerar até 2<sup>N</sup> estados!</div>
         </div>
         <p className="text-sm border-l-2 border-rose-500/50 pl-4 text-slate-400">
             Um diagrama super simples e genérico de 10 círculos desenhado por um programador preguiçoso como AFN, pode forçar a CPU a compilar umAFD massivo de <b>1.024 estados!</b>. Cuidado.
         </p>
      </div>
    )
  },
  {
    id: '10',
    title: 'Conclusão: Convergência',
    subtitle: 'Rumo às Expressões Regulares',
    tag: 'FUTURO',
    image: '',
    accent: 'fuchsia',
    content: (
      <div className="space-y-8 flex flex-col items-center justify-center text-center mt-10">
         <Sparkles className="w-16 h-16 text-fuchsia-400 animate-pulse" />
         <h3 className="text-2xl font-black text-white">Dominamos a Magia.</h3>
         <p className="text-slate-400 max-w-lg">
             AFDs e AFNs são faces da mesma moeda matemática. Uma é eficiente. A outra é flexível. Mas na prática, nós não desenhamos diagramas oca. Nós escrevemos códigos no teclado.
         </p>
         <p className="text-fuchsia-300 font-bold bg-fuchsia-900/30 px-6 py-2 border border-fuchsia-500/20 rounded-full mt-4">
             Próxima Aula: AFN-ε e as poderosas Expressões Regulares (Regex).
         </p>
      </div>
    )
  }
];

export function AfnLesson() {
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
    <div className={`relative aspect-video rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(217,70,239,0.1)] border border-${slide.accent}-500/20 bg-slate-950 flex items-center justify-center`}>
        <div className={`absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')]`} />
        
        {/* Multiverse Neon Ring Visuals */}
        <motion.div 
           animate={{ rotate: 360 }} 
           transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
           className={`absolute w-64 h-64 border-2 border-dashed border-${slide.accent}-500/20 rounded-full`}
        />
        <motion.div 
           animate={{ rotate: -360 }} 
           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           className={`absolute w-48 h-48 border border-${slide.accent}-400/30 rounded-full`}
        />
        
        <SplitSquareHorizontal className={`w-20 h-20 text-${slide.accent}-500/50 absolute`} />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-fuchsia-500/30 overflow-x-hidden relative flex flex-col">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(134,25,143,0.1)_0%,rgba(2,6,23,1)_100%)] opacity-80" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/gplay.png')]" />
      </div>

      <header className="relative z-20 px-8 py-6 flex justify-between items-center border-b border-fuchsia-900/30 backdrop-blur-md bg-slate-950/40">
        <div className="flex items-center gap-4">
           <Link to="/lfa" className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center transition-colors">
              <ChevronLeft className="w-5 h-5 text-white" />
           </Link>
           <div>
              <h1 className="text-sm font-black tracking-widest text-fuchsia-500 uppercase">LFA <span className="text-white border-l border-white/20 pl-2 ml-1">AULA_7__AFN</span></h1>
              <div className="h-0.5 w-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 rounded-full mt-0.5" />
           </div>
        </div>
        
        <div className="flex items-center gap-6">
           <div className="flex space-x-1">
              {SLIDES.map((_, i) => (
                <div key={i} className={`h-2 rounded-full transition-all ${i === currentSlide ? `w-6 bg-${slide.accent}-500 shadow-[0_0_10px_rgba(217,70,239,0.5)]` : 'w-2 bg-slate-800'}`} />
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
                 className={`bg-slate-900/60 backdrop-blur-xl border border-fuchsia-500/10 p-6 md:p-10 rounded-[2rem] shadow-[0_0_50px_rgba(134,25,143,0.15)] w-full ${slide.image === '' ? 'max-w-3xl text-left' : ''}`}
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
