import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Thermometer, Zap, Wind, AlertTriangle, RefreshCcw, Power } from 'lucide-react';

export const CoolingChallenge: React.FC = () => {
  const [temp, setTemp] = useState(35); // Celsius
  const [load, setLoad] = useState(50); // %
  const [cooling, setCooling] = useState(50); // %
  const [status, setStatus] = useState<'stable' | 'warning' | 'critical' | 'meltdown'>('stable');
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameState, setGameState] = useState<'start' | 'playing' | 'ended'>('start');

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const interval = setInterval(() => {
        // Temperature logic
        setTemp(prev => {
          const delta = (load * 0.15) - (cooling * 0.12);
          const next = Math.max(20, Math.min(100, prev + delta));
          
          if (next < 60) setStatus('stable');
          else if (next < 80) setStatus('warning');
          else if (next < 95) setStatus('critical');
          else setStatus('meltdown');
          
          return next;
        });
        
        setTimeLeft(prev => prev - 1);
      }, 1000);
      
      return () => clearInterval(interval);
    } else if (timeLeft === 0 || status === 'meltdown') {
        setGameState('ended');
    }
  }, [gameState, timeLeft, load, cooling, status]);

  const startGame = () => {
    setTemp(35);
    setLoad(50);
    setCooling(50);
    setStatus('stable');
    setTimeLeft(30);
    setGameState('playing');
  };

  return (
    <div className="flex flex-col h-[400px] relative">
      <AnimatePresence mode="wait">
        {gameState === 'start' && (
          <motion.div 
            key="start"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-900/90 rounded-xl backdrop-blur-sm p-8 text-center"
          >
            <Thermometer className="w-16 h-16 text-blue-500 mb-4 animate-pulse" />
            <h3 className="text-2xl font-black mb-2 uppercase tracking-tighter">Missão: Resfriamento Crítico</h3>
            <p className="text-sm text-slate-400 max-w-sm mb-6">
              Mantenha o sistema abaixo de 95°C enquanto as requisições de IA aumentam. Ajuste o cooler e a carga de trabalho.
            </p>
            <button 
              onClick={startGame}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all"
            >
              INICIAR PROTOCOLO
            </button>
          </motion.div>
        )}

        {gameState === 'ended' && (
          <motion.div 
            key="ended"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/95 rounded-xl backdrop-blur-md p-8 text-center"
          >
            {status === 'meltdown' ? (
              <>
                <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
                <h3 className="text-3xl font-black mb-2 text-red-500">MELTDOWN DETECTADO</h3>
                <p className="text-slate-400 mb-6">O data center superaqueceu. Hardware danificado.</p>
              </>
            ) : (
              <>
                <ShieldCheck className="w-16 h-16 text-emerald-500 mb-4" />
                <h3 className="text-3xl font-black mb-2 text-emerald-500">SISTEMA ESTAVEL</h3>
                <p className="text-slate-400 mb-6">Você sobreviveu ao pico de demanda.</p>
              </>
            )}
            <button 
              onClick={startGame}
              className="flex items-center gap-2 px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg transition-all"
            >
              <RefreshCcw className="w-4 h-4" /> REINICIAR
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-8 flex flex-col justify-center">
            <div className="space-y-2">
                <div className="flex justify-between text-[10px] uppercase font-black text-slate-500 px-1">
                    <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-yellow-500" /> Carga de Trabalho (Workload)</span>
                    <span className="text-white">{load}%</span>
                </div>
                <input 
                    type="range" min="0" max="100" value={load} 
                    onChange={(e) => setLoad(parseInt(e.target.value))}
                    className="w-full accent-blue-500"
                />
            </div>

            <div className="space-y-2">
                <div className="flex justify-between text-[10px] uppercase font-black text-slate-500 px-1">
                    <span className="flex items-center gap-1"><Wind className="w-3 h-3 text-blue-400" /> Potência dos Coolers</span>
                    <span className="text-white">{cooling}%</span>
                </div>
                <input 
                    type="range" min="0" max="100" value={cooling} 
                    onChange={(e) => setCooling(parseInt(e.target.value))}
                    className="w-full accent-emerald-500"
                />
            </div>

            <div className="pt-4 border-t border-slate-800">
                <div className="flex justify-between items-center bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                    <span className="text-xs font-bold text-slate-400 flex items-center gap-2"><Power className="w-3 h-3" /> Tempo Operacional</span>
                    <span className="font-mono text-xl">{timeLeft}s</span>
                </div>
            </div>
        </div>

        {/* Visualization */}
        <div className="relative bg-black/40 rounded-2xl border border-slate-800 overflow-hidden flex items-center justify-center p-8">
            {/* Background Heat Glow */}
            <motion.div 
                animate={{ 
                    opacity: temp > 60 ? (temp - 60) / 40 : 0,
                    scale: 1 + (temp / 100)
                }}
                className="absolute inset-0 bg-red-600/20 blur-[60px] pointer-events-none"
            />
            
            <div className="relative text-center z-10">
                <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className={`text-7xl font-black font-mono transition-colors duration-500 ${
                        status === 'meltdown' || status === 'critical' ? 'text-red-500' : 
                        status === 'warning' ? 'text-amber-500' : 'text-blue-400'
                    }`}
                >
                    {Math.round(temp)}°C
                </motion.div>
                <div className={`text-[10px] uppercase font-black tracking-[0.4em] mt-2 transition-colors ${
                    status === 'meltdown' || status === 'critical' ? 'text-red-400' : 
                    status === 'warning' ? 'text-amber-400' : 'text-blue-300'
                }`}>
                    {status === 'meltdown' ? 'CRITICAL SYSTEM FAILURE' : `STATUS: ${status.toUpperCase()}`}
                </div>
            </div>

            {/* Dynamic Alerts */}
            {status === 'critical' && (
                <motion.div 
                   animate={{ opacity: [0, 1, 0] }} 
                   transition={{ repeat: Infinity, duration: 0.5 }}
                   className="absolute top-4 left-4 right-4 bg-red-500/20 border border-red-500/50 text-red-500 text-[8px] font-black p-1 text-center"
                >
                    PERIGO: ALTA TEMPERATURA - REDUZA CARGA IMEDIATAMENTE
                </motion.div>
            )}
        </div>
      </div>
    </div>
  );
};

const ShieldCheck = ({ ...props }) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
);
