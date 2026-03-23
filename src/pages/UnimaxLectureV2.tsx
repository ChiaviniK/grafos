import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Zap, Globe, Cpu, Droplets, Leaf, ShieldAlert, FastForward, Home, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const SLIDES = [
  {
    id: 'intro',
    title: 'IA e Data Centers',
    subtitle: 'O Preço Energético da Inteligência',
    tag: '01. CAPA',
    image: '/assets/generated/server_nature.png',
    accent: 'blue',
    content: (
      <div className="space-y-4">
        <p className="text-2xl font-light text-slate-300 leading-relaxed">
          Onde os <span className="text-blue-400 font-bold">bits</span> encontram os <span className="text-amber-400 font-bold">watts</span>.
        </p>
        <div className="h-px w-full bg-gradient-to-r from-blue-500/50 to-transparent my-6" />
        <p className="text-slate-400 italic">
          "Não há inteligência artificial sem infraestrutura física pesada."
        </p>
      </div>
    )
  },
  {
    id: 'demand',
    title: 'A Explosão da Demanda',
    subtitle: 'O salto energético da IA Generativa',
    tag: '02. CONTEXTO',
    image: '/assets/generated/gpu_energy.png',
    accent: 'amber',
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <div className="bg-slate-800/40 p-6 rounded-2xl border border-blue-500/20">
            <h4 className="text-blue-400 font-bold mb-2 flex items-center gap-2">
              <Globe className="w-5 h-5" /> Busca Comum
            </h4>
            <div className="text-4xl font-black text-white">0.3 Wh</div>
            <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest">Google Search</p>
          </div>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-amber-900/20 p-6 rounded-2xl border border-amber-500/40"
          >
            <h4 className="text-amber-400 font-bold mb-2 flex items-center gap-2">
              <Zap className="w-5 h-5" /> Prompt de IA
            </h4>
            <div className="text-4xl font-black text-white">2.9 Wh</div>
            <p className="text-xs text-amber-500/60 mt-1 uppercase tracking-widest">ChatGPT / Claude</p>
          </motion.div>
        </div>
        <div className="p-6 bg-slate-900/80 rounded-3xl border border-slate-700">
           <p className="text-3xl font-black text-white leading-tight">
             A IA consome quase <span className="text-amber-500 underline decoration-2 underline-offset-8">10x MAIS</span> energia por interação.
           </p>
        </div>
      </div>
    )
  },
  {
    id: 'hardware',
    title: 'Por que a IA "bebe" tanto?',
    subtitle: 'O apetite das GPUs e o custo do treino',
    tag: '03. HARDWARE',
    image: '/assets/generated/gpu_energy.png',
    accent: 'purple',
    content: (
      <div className="space-y-8">
        <div className="flex gap-4 items-start">
          <div className="bg-purple-500/20 p-3 rounded-xl"><Cpu className="text-purple-400" /></div>
          <div>
            <h4 className="text-white font-bold text-xl">Das CPUs para as GPUs</h4>
            <p className="text-slate-400">NVIDIA H100 consome até 700W em pico — o equivalente a um micro-ondas ligado 24/7.</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-indigo-900/30 to-slate-900 border border-indigo-500/20 p-6 rounded-2xl">
           <h4 className="text-indigo-300 font-bold mb-4 uppercase text-xs tracking-[0.2em]">Escala de Treinamento</h4>
           <p className="text-slate-300 italic text-lg">
             "Treinar um único modelo de grande porte consome a mesma energia que centenas de casas brasileiras em um ano inteiro."
           </p>
        </div>
      </div>
    )
  },
  {
    id: 'anatomy',
    title: 'Anatomia do Gasto',
    subtitle: 'Processamento vs Refrigeração',
    tag: '04. TÉCNICO',
    image: '/assets/generated/server_nature.png',
    accent: 'rose',
    content: (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700">
             <div className="text-rose-400 font-bold">~60%</div>
             <div className="text-xs text-slate-500 mt-1">TI / Processamento</div>
          </div>
          <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700">
             <div className="text-cyan-400 font-bold">~40%</div>
             <div className="text-xs text-slate-500 mt-1">Cooling / Infra</div>
          </div>
        </div>
        <div className="p-6 bg-slate-900 rounded-2xl border border-rose-500/20">
           <h4 className="text-white font-bold mb-2">Conceito: PUE</h4>
           <p className="text-sm text-slate-400 leading-relaxed">
             Power Usage Effectiveness. Se o PUE é 1.5, para cada 1W usado pelo servidor, 0.5W é desperdiçado em refrigeração e outros.
           </p>
        </div>
      </div>
    )
  },
  {
    id: 'geopolitics',
    title: 'Impacto Ambiental',
    subtitle: 'Água e Geopolítica do Frio',
    tag: '05. AMBIENTE',
    image: '/assets/generated/world_map.png',
    accent: 'cyan',
    content: (
      <div className="space-y-6">
        <div className="flex gap-4 items-center bg-cyan-900/10 p-4 rounded-xl border border-cyan-500/20">
          <Droplets className="text-cyan-400 w-8 h-8" />
          <p className="text-slate-300">Resfriamento evaporativo consome <strong>bilhões</strong> de litros de água anualmente.</p>
        </div>
        <div className="space-y-3">
          <h4 className="text-white font-bold text-sm uppercase tracking-widest text-slate-500">A Fuga para o Norte</h4>
          <p className="text-slate-400 text-sm">Empresas migram para Islândia e países nórdicos para usar o clima a favor do resfriamento passivo.</p>
        </div>
      </div>
    )
  },
  {
    id: 'solutions',
    title: 'Caminhos do Futuro',
    subtitle: 'Energia Limpa e IA para IA',
    tag: '06. SOLUÇÕES',
    image: '/assets/generated/smr_reactor.png',
    accent: 'emerald',
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-emerald-900/10 border border-emerald-500/20 rounded-xl">
          <h5 className="text-emerald-400 font-bold mb-2">Energia 24/7</h5>
          <p className="text-xs text-slate-400">SMRs (Pequenos Reatores Nucleares) e Geotérmica.</p>
        </div>
        <div className="p-4 bg-emerald-900/10 border border-emerald-500/20 rounded-xl">
          <h5 className="text-emerald-400 font-bold mb-2">IA Otimizando</h5>
          <p className="text-xs text-slate-400">Algoritmos que reduzem 40% o consumo de resfriamento.</p>
        </div>
        <div className="col-span-full p-4 bg-slate-800/40 rounded-xl flex items-center gap-3">
          <Leaf className="text-emerald-500 shrink-0" />
          <p className="text-slate-200 text-sm">Big Techs estão se tornando as maiores compradoras de energia limpa do mundo.</p>
        </div>
      </div>
    )
  },
  {
    id: 'ethics',
    title: 'O Dilema Ético',
    subtitle: 'Eficiência vs Demanda Infinita',
    tag: '07. ÉTICA',
    image: '/assets/generated/brain_balance.png',
    accent: 'indigo',
    content: (
      <div className="space-y-6">
        <div className="p-6 bg-slate-900 rounded-3xl border border-indigo-500/30">
           <h4 className="text-indigo-400 font-bold mb-2">Paradoxo de Jevons</h4>
           <p className="text-slate-300 italic">
             "Quanto mais eficiente tornamos o uso da energia, mais demanda criamos para consumi-la."
           </p>
        </div>
        <p className="text-xl font-black text-white text-center px-4">
          Podemos crescer em IA sem colapsar as metas de emissão zero?
        </p>
      </div>
    )
  },
  {
    id: 'conclusion',
    title: 'Conclusão & Q&A',
    subtitle: 'O amanhã depende de hoje',
    tag: '08. FIM',
    image: '/assets/generated/server_nature.png',
    accent: 'blue',
    content: (
      <div className="flex flex-col items-center justify-center space-y-8 text-center">
         <div className="relative">
            <div className="absolute -inset-4 bg-blue-500/20 blur-2xl rounded-full" />
            <h2 className="text-3xl font-black text-white relative">
              "A inteligência do futuro depende da sustentabilidade do presente."
            </h2>
         </div>
         <div className="flex gap-4">
           <div className="bg-slate-800 px-6 py-3 rounded-full border border-slate-700 text-slate-400 text-sm">Luiz Chiavini — Março 2026</div>
         </div>
      </div>
    )
  }
];

export function UnimaxLectureV2() {
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
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-blue-500/30 overflow-hidden relative">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(15,23,42,0)_0%,rgba(2,6,23,1)_100%)] opacity-80" />
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <motion.div 
            animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.15, 0.1]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className={`absolute top-1/4 -right-20 w-[600px] h-[600px] rounded-full blur-[120px] bg-${slide.accent}-500/20`}
        />
      </div>

      {/* Header Overlay */}
      <header className="relative z-20 px-8 py-6 flex justify-between items-center border-b border-white/5 backdrop-blur-md bg-slate-950/40">
        <div className="flex items-center gap-4">
           <Link to="/" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors">
              <Home className="w-5 h-5 text-white" />
           </Link>
           <div>
              <h1 className="text-sm font-black tracking-widest text-slate-400 uppercase">UNIMAX <span className="text-white">LECTURE V2</span></h1>
              <div className="h-0.5 w-full bg-blue-500/50 rounded-full mt-0.5" />
           </div>
        </div>
        
        <div className="flex items-center gap-6">
           <a 
             href="/assets/generated/Palestra_IA_Energia_V2.pptx" 
             download 
             className="hidden md:flex items-center gap-2 px-4 py-2 bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 rounded-xl border border-purple-500/30 transition-all text-xs font-bold uppercase tracking-widest"
           >
              <Download className="w-4 h-4" /> Baixar PPT
           </a>
           
           <div className="flex -space-x-2">
              {SLIDES.map((_, i) => (
                <div key={i} className={`w-3 h-3 rounded-full border-2 border-slate-950 ${i === currentSlide ? 'bg-blue-500 scale-125 z-10' : 'bg-slate-800'}`} />
              ))}
           </div>
           <div className="text-[10px] font-mono text-slate-500 font-bold tracking-tighter uppercase whitespace-nowrap">
             {currentSlide + 1} // {SLIDES.length}
           </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 container mx-auto px-6 py-12 flex items-center justify-center h-[calc(100vh-160px)]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 100 : -100, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: direction > 0 ? -100 : 100, filter: "blur(10px)" }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left: Metadata & Illustration */}
            <div className="space-y-6">
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="space-y-2"
               >
                  <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black tracking-[0.2em] bg-${slide.accent}-500/20 text-${slide.accent}-400 border border-${slide.accent}-500/30`}>
                    {slide.tag}
                  </span>
                  <h2 className="text-5xl md:text-6xl font-black text-white leading-tight">
                    {slide.title}
                  </h2>
                  <p className="text-xl md:text-2xl text-slate-400 font-medium">
                    {slide.subtitle}
                  </p>
               </motion.div>

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
            </div>

            {/* Right: Content Cards */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-8 md:p-12 rounded-[2.5rem] shadow-inner-white"
            >
               {slide.content}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Control Bar */}
      <footer className="fixed bottom-0 left-0 w-full p-8 z-20 flex justify-between items-center pointer-events-none">
        <button
          onClick={() => paginate(-1)}
          disabled={currentSlide === 0}
          className="pointer-events-auto p-5 rounded-full bg-slate-900/80 border border-white/5 text-slate-400 hover:text-white hover:border-blue-500/50 hover:bg-slate-800 transition-all disabled:opacity-20 backdrop-blur-xl group"
        >
          <ChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
        </button>

        <div className="pointer-events-auto hidden md:flex items-center gap-4 bg-slate-900/60 backdrop-blur-xl border border-white/5 px-6 py-3 rounded-full">
           <div className="flex items-center gap-3">
              <ShieldAlert className="w-4 h-4 text-slate-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Auto-Transition Mode: Off</span>
           </div>
           <div className="w-px h-4 bg-white/10" />
           <button className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2">
              <FastForward className="w-4 h-4" /> Next Topic
           </button>
        </div>

        <button
          onClick={() => paginate(1)}
          disabled={currentSlide === SLIDES.length - 1}
          className="pointer-events-auto p-5 rounded-full bg-blue-600 border border-blue-400/30 text-white hover:bg-blue-500 shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all disabled:opacity-20 backdrop-blur-xl group"
        >
          <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
        </button>
      </footer>

      {/* Overlay Effects */}
      <div className="fixed inset-0 pointer-events-none z-[60] opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,118,0.06))] bg-[length:100%_4px,3px_100%]" />
       <div className="fixed inset-0 pointer-events-none z-[61] mix-blend-overlay opacity-20 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
    </div>
  );
}
