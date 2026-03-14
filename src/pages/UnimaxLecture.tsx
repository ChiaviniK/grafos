import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Zap, Thermometer, Cpu, Globe, Battery, Info } from 'lucide-react';
import { DataCenterTycoon } from '../components/unimax/DataCenterTycoon';
import { EnergyImpactSim } from '../components/unimax/EnergyImpactSim';
import { CoolingChallenge } from '../components/unimax/CoolingChallenge';

const SLIDES = [
  {
    id: 'intro',
    title: 'IA e Data Centers: O Gigante Energético',
    type: 'content',
    content: (
      <div className="space-y-6">
        <p className="text-xl text-blue-300">
          A revolução da IA não acontece na "nuvem". Ela acontece em galpões massivos consumindo gigawatts de energia.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div className="bg-slate-800/50 p-6 rounded-xl border border-blue-500/30">
            <h3 className="text-blue-400 font-bold mb-2 flex items-center gap-2">
              <Zap className="w-5 h-5" /> Escala Global
            </h3>
            <p className="text-sm text-slate-300">
              Data centers já consomem ~2% da eletricidade global. Com a IA, esse número pode dobrar até 2026.
            </p>
          </div>
          <div className="bg-slate-800/50 p-6 rounded-xl border border-purple-500/30">
            <h3 className="text-purple-400 font-bold mb-2 flex items-center gap-2">
              <Cpu className="w-5 h-5" /> Poder de Processamento
            </h3>
            <p className="text-sm text-slate-300">
              Um único treinamento de modelo de linguagem consome o equivalente a centenas de casas por um ano.
            </p>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative px-7 py-4 bg-slate-900 ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                    <div className="space-y-2">
                        <p className="text-slate-300 italic">"Não há inteligência artificial sem infraestrutura física."</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  },
  {
    id: 'tycoon',
    title: 'Mini-Game: Data Center Tycoon',
    type: 'interactive',
    component: <DataCenterTycoon />
  },
  {
    id: 'impact',
    title: 'O Custo de um "Prompt"',
    type: 'interactive',
    component: <EnergyImpactSim />
  },
  {
    id: 'cooling',
    title: 'O Desafio do Resfriamento',
    type: 'interactive',
    component: <CoolingChallenge />
  },
  {
    id: 'green',
    title: 'O Caminho da Sustentabilidade',
    type: 'content',
    content: (
      <div className="space-y-6">
        <div className="bg-emerald-900/20 p-6 rounded-xl border border-emerald-500/30">
          <h3 className="text-emerald-400 text-2xl font-bold mb-4 flex items-center gap-2">
            <Globe className="w-6 h-6" /> Soluções Verdes
          </h3>
          <ul className="space-y-4 text-slate-300">
            <li className="flex items-start gap-3">
              <div className="mt-1 bg-emerald-500/20 p-1 rounded-full"><Battery className="w-4 h-4 text-emerald-400" /></div>
              <span><strong>Energia 24/7 Carbon-Free:</strong> Google e Microsoft investindo em nuclear modular e geotérmica.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1 bg-emerald-500/20 p-1 rounded-full"><Thermometer className="w-4 h-4 text-emerald-400" /></div>
              <span><strong>Liquid Cooling:</strong> Substituir ar por líquidos que conduzem calor 25x melhor.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1 bg-emerald-500/20 p-1 rounded-full"><Cpu className="w-4 h-4 text-emerald-400" /></div>
              <span><strong>Chips Especializados:</strong> TPUs e ASICs desenhados para eficiência watt/token.</span>
            </li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 'conclusion',
    title: 'Conclusão: IA vs Planeta',
    type: 'content',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-6 py-10">
        <h2 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
          O Desafio da Nossa Geração
        </h2>
        <p className="max-w-xl text-lg text-slate-400">
          Como balancear o progresso infinito da inteligência com os limites finitos do nosso planeta?
        </p>
        <div className="mt-10 grid grid-cols-3 gap-8 w-full max-w-2xl">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mb-2">
              <Cpu />
            </div>
            <span className="text-xs uppercase tracking-widest text-slate-500">Inovação</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-2">
              <Battery />
            </div>
            <span className="text-xs uppercase tracking-widest text-slate-500">Eficiência</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 mb-2">
              <Globe />
            </div>
            <span className="text-xs uppercase tracking-widest text-slate-500">Responsabilidade</span>
          </div>
        </div>
        <div className="mt-12 p-4 bg-slate-800/30 rounded border border-slate-700 text-sm text-slate-400 max-w-lg">
            <Info className="inline w-4 h-4 mr-2" />
            Esta palestra foi gerada para UNIMAX - Março 2026.
        </div>
      </div>
    )
  }
];

export const UnimaxLecture: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const next = () => setCurrentSlide(prev => Math.min(prev + 1, SLIDES.length - 1));
  const prev = () => setCurrentSlide(prev => Math.max(prev - 1, 0));

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const slide = SLIDES[currentSlide];

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden font-sans selection:bg-blue-500/30">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30 shadow-[0_0_20px_blue]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(15,23,42,0)_0%,rgba(2,6,23,1)_100%)]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      {/* Header */}
      <header className="relative z-10 p-6 flex justify-between items-center border-b border-slate-800 bg-slate-900/50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center font-black text-xl shadow-[0_0_15px_rgba(37,99,235,0.4)]">
            U
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">UNIMAX <span className="text-blue-400">LECTURE</span></h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-semibold">IA e Data Centers: Energia</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">SYSTEM ACTIVE</span>
          </div>
          <div className="text-xs font-mono text-slate-500">
            SLIDE {currentSlide + 1} / {SLIDES.length}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex items-center justify-center min-h-[calc(100vh-160px)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <div className="mb-8">
                <h2 className="text-4xl md:text-5xl font-black mb-2 text-white">
                    {slide.title}
                </h2>
                <div className="h-1 w-20 bg-blue-600 rounded-full" />
            </div>

            <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-2xl backdrop-blur-lg shadow-2xl min-h-[400px]">
              {slide.type === 'content' ? slide.content : slide.component}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation Footer */}
      <footer className="fixed bottom-0 left-0 w-full p-6 z-20 flex justify-between items-center bg-gradient-to-t from-slate-950 to-transparent">
        <button
          onClick={prev}
          disabled={currentSlide === 0}
          className="p-4 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-blue-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
        >
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
        </button>

        <div className="flex gap-2">
          {SLIDES.map((_, idx) => (
            <div
              key={idx}
              className={`h-1 transition-all duration-300 rounded-full ${idx === currentSlide ? 'w-8 bg-blue-500' : 'w-2 bg-slate-800'}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={currentSlide === SLIDES.length - 1}
          className="p-4 rounded-full bg-blue-600 border border-blue-400/30 text-white hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
        >
          <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>
      </footer>

      {/* Scanline Effect */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,118,0.06))] bg-[length:100%_4px,3px_100%]" />
    </div>
  );
};
