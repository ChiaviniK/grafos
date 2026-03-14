import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, Timer, Info, Settings2, BarChart3, Calculator } from 'lucide-react';

interface State {
  s: number;
  v: number;
  a: number;
  t: number;
}

export const MUVSimulator: React.FC = () => {
  const [initial, setInitial] = useState({ s0: 0, v0: 0, a: 2 });
  const [current, setCurrent] = useState<State>({ s: 0, v: 0, a: 2, t: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const [history, setHistory] = useState<{ t: number, s: number, v: number }[]>([]);
  
  const requestRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const maxTime = 10; // seconds

  const animate = (timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const t = (timestamp - startTimeRef.current) / 1000;
    
    if (t > maxTime) {
      setIsRunning(false);
      return;
    }

    const { s0, v0, a } = initial;
    // s = s0 + v0*t + 0.5*a*t^2
    // v = v0 + a*t
    const s = s0 + v0 * t + 0.5 * a * t * t;
    const v = v0 + a * t;

    setCurrent({ s, v, a, t });
    setHistory(prev => [...prev, { t, s, v }].slice(-100)); // Keep last 100 pts for Sparklines

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isRunning) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isRunning]);

  const reset = () => {
    setIsRunning(false);
    startTimeRef.current = null;
    setCurrent({ s: initial.s0, v: initial.v0, a: initial.a, t: 0 });
    setHistory([]);
  };

  const handleInitialChange = (field: string, val: number) => {
    setInitial(prev => ({ ...prev, [field]: val }));
    if (!isRunning) {
      setCurrent(prev => ({ ...prev, [field === 'a' ? 'a' : field === 's0' ? 's' : 'v']: val, t: 0 }));
    }
  };

  // Torricelli Calculator
  const [torr, setTorr] = useState({ v0: 0, a: 2, ds: 100 });
  const torrV = Math.sqrt(Math.max(0, torr.v0 ** 2 + 2 * torr.a * torr.ds));

  return (
    <div className="flex flex-col gap-6 bg-slate-900/40 p-6 rounded-3xl border border-slate-800">
      <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-violet-400" />
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Laboratório de M.U.V.</h3>
          </div>
          <div className="text-[10px] font-bold text-violet-400 bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20 uppercase tracking-tighter">
              Aceleração Constante
          </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {/* Controls */}
        <div className="md:col-span-1 space-y-4 p-4 bg-slate-950/40 border border-slate-800 rounded-2xl">
            <div className="flex items-center gap-2 mb-2 text-slate-300">
                <Settings2 className="w-3 h-3" />
                <span className="text-[10px] font-black uppercase tracking-widest">Parâmetros</span>
            </div>
            
            <div className="space-y-3">
                <div className="space-y-1">
                    <div className="flex justify-between text-[9px] text-slate-500 font-bold">
                        <span>POSIÇÃO INICIAL (s₀)</span>
                        <span className="text-white">{initial.s0}m</span>
                    </div>
                    <input type="range" min="0" max="100" step="1" value={initial.s0} 
                        onChange={(e) => handleInitialChange('s0', parseInt(e.target.value))}
                        disabled={isRunning} className="w-full accent-violet-500" />
                </div>
                <div className="space-y-1">
                    <div className="flex justify-between text-[9px] text-slate-500 font-bold">
                        <span>VELOCIDADE INICIAL (v₀)</span>
                        <span className="text-white">{initial.v0} m/s</span>
                    </div>
                    <input type="range" min="-20" max="20" step="1" value={initial.v0} 
                        onChange={(e) => handleInitialChange('v0', parseInt(e.target.value))}
                        disabled={isRunning} className="w-full accent-violet-500" />
                </div>
                <div className="space-y-1">
                    <div className="flex justify-between text-[9px] text-slate-500 font-bold">
                        <span>ACELERAÇÃO (a)</span>
                        <span className="text-white">{initial.a} m/s²</span>
                    </div>
                    <input type="range" min="-10" max="10" step="0.5" value={initial.a} 
                        onChange={(e) => handleInitialChange('a', parseFloat(e.target.value))}
                        disabled={isRunning} className="w-full accent-violet-500" />
                </div>
            </div>
            
            <div className="pt-4 flex gap-2">
                <button onClick={() => setIsRunning(!isRunning)} 
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl font-black text-[10px] uppercase transition-all ${
                    isRunning ? 'bg-rose-500 text-white' : 'bg-emerald-600 text-white'
                  }`}>
                    {isRunning ? <Timer className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                    {isRunning ? 'Parar' : 'Simular'}
                </button>
                <button onClick={reset} className="p-2 bg-slate-800 text-slate-400 rounded-xl hover:bg-slate-700">
                    <RotateCcw className="w-4 h-4" />
                </button>
            </div>
        </div>

        {/* Real-time Display/Graphs */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
             <div className="p-4 bg-slate-950/40 border border-slate-800 rounded-2xl flex flex-col justify-between">
                  <div>
                      <span className="text-[9px] font-black text-slate-500 uppercase block mb-1">Velocidade Atual</span>
                      <span className="text-3xl font-black font-mono text-emerald-400">{current.v.toFixed(1)} <span className="text-xs text-slate-600">m/s</span></span>
                  </div>
                  <div className="h-12 flex items-end gap-0.5 mt-2">
                      {history.slice(-20).map((h, i) => (
                          <div key={i} className="flex-1 bg-emerald-500/30 rounded-t-sm" style={{ height: `${Math.abs(h.v) * 2}%` }} />
                      ))}
                  </div>
             </div>
             <div className="p-4 bg-slate-950/40 border border-slate-800 rounded-2xl flex flex-col justify-between">
                  <div>
                      <span className="text-[9px] font-black text-slate-500 uppercase block mb-1">Posição</span>
                      <span className="text-3xl font-black font-mono text-blue-400">{current.s.toFixed(1)} <span className="text-xs text-slate-600">m</span></span>
                  </div>
                  <div className="h-12 flex items-end gap-0.5 mt-2">
                      {history.slice(-20).map((h, i) => (
                          <div key={i} className="flex-1 bg-blue-500/30 rounded-t-sm" style={{ height: `${Math.min(100, Math.abs(h.s) / 2)}%` }} />
                      ))}
                  </div>
             </div>

             <div className="sm:col-span-2 p-4 bg-violet-500/5 border border-violet-500/20 rounded-2xl">
                  <div className="flex items-center gap-2 mb-3">
                      <Calculator className="w-3 h-3 text-violet-400" />
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Calculadora Torricelli</span>
                  </div>
                  <div className="flex flex-wrap gap-4 items-end">
                       <div className="space-y-1">
                           <span className="text-[8px] text-slate-500 block">v₀</span>
                           <input type="number" value={torr.v0} onChange={e => setTorr(p => ({ ...p, v0: parseFloat(e.target.value) || 0 }))} className="w-16 bg-slate-900 border border-slate-700 rounded p-1 text-xs" />
                       </div>
                       <div className="space-y-1">
                           <span className="text-[8px] text-slate-500 block">a</span>
                           <input type="number" value={torr.a} onChange={e => setTorr(p => ({ ...p, a: parseFloat(e.target.value) || 0 }))} className="w-16 bg-slate-900 border border-slate-700 rounded p-1 text-xs" />
                       </div>
                       <div className="space-y-1">
                           <span className="text-[8px] text-slate-500 block">Δs</span>
                           <input type="number" value={torr.ds} onChange={e => setTorr(p => ({ ...p, ds: parseFloat(e.target.value) || 0 }))} className="w-16 bg-slate-900 border border-slate-700 rounded p-1 text-xs" />
                       </div>
                       <div className="flex-1 text-right">
                           <span className="text-[8px] text-slate-500 block">v FINAL</span>
                           <span className="text-xl font-black text-white">{torrV.toFixed(2)} m/s</span>
                       </div>
                  </div>
             </div>
        </div>
      </div>

      <div className="relative h-20 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden px-8">
          <div className="absolute inset-x-0 bottom-4 border-b border-slate-800 flex justify-between px-8">
              {[0, 50, 100, 150, 200, 250, 300].map(m => (
                  <div key={m} className="flex flex-col items-center">
                      <div className="h-1.5 w-px bg-slate-700" />
                      <span className="text-[7px] text-slate-600 font-mono mt-1">{m}m</span>
                  </div>
              ))}
          </div>
          
          <motion.div 
            className="absolute bottom-6 left-8"
            style={{ 
                x: `${(current.s / 300) * (300)}%`, // Simplified scaling for visualization
                transition: isRunning ? 'none' : 'x 0.2s ease-out'
            }}
          >
              <img src="/sprites/2 Owlet_Monster/Owlet_Monster_Run_6.png" className={`w-10 h-10 object-contain ${isRunning ? 'animate-pulse' : ''}`} style={{ imageRendering: 'pixelated' }} />
          </motion.div>
      </div>

      <div className="flex items-center gap-3 p-3 bg-violet-500/5 rounded-xl border border-violet-500/10">
          <Info className="w-4 h-4 text-violet-400 shrink-0" />
          <p className="text-[9px] text-slate-500 leading-tight">No M.U.V., a velocidade muda uniformemente. O gráfico da posição é uma **parábola** e o da velocidade é uma **reta inclinada**. Observe como os valores sobem mais rápido conforme a aceleração aumenta!</p>
      </div>
    </div>
  );
};
