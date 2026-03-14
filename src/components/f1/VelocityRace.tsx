import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, Timer, Trophy, Info } from 'lucide-react';

interface Runner {
  id: number;
  name: string;
  v0: number; // m/s
  a: number; // m/s^2
  x: number; // position in meters
  finished: boolean;
  time?: number;
  sprite: string;
}

export const VelocityRace: React.FC = () => {
  const [runners, setRunners] = useState<Runner[]>([
    { id: 1, name: 'Ligeiro', v0: 5, a: 0, x: 0, finished: false, sprite: 'Pink' },
    { id: 2, name: 'Foguete', v0: 0, a: 2, x: 0, finished: false, sprite: 'Dude' },
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const finishLine = 100; // meters

  const requestRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const updatePosition = (time: number) => {
    setRunners(prev => prev.map(r => {
      if (r.finished) return r;
      // s = s0 + v0t + 1/2at^2
      const newX = r.v0 * time + 0.5 * r.a * Math.pow(time, 2);
      if (newX >= finishLine) {
        return { ...r, x: finishLine, finished: true, time: time };
      }
      return { ...r, x: newX };
    }));
    setElapsed(time);
  };

  const animate = (time: number) => {
    if (!startTimeRef.current) startTimeRef.current = time;
    const progress = (time - startTimeRef.current) / 1000; // in seconds
    updatePosition(progress);

    if (runners.some(r => !r.finished)) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      setIsRunning(false);
    }
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

  useEffect(() => {
      if (runners.every(r => r.finished)) {
          setIsRunning(false);
      }
  }, [runners]);

  const toggleRace = () => {
    if (isRunning) {
      setIsRunning(false);
    } else {
      if (runners.every(r => r.finished)) {
          resetRace();
      }
      startTimeRef.current = null;
      setIsRunning(true);
    }
  };

  const resetRace = () => {
    setIsRunning(false);
    setRunners(prev => prev.map(r => ({ ...r, x: 0, finished: false, time: undefined })));
    setElapsed(0);
    startTimeRef.current = null;
  };

  const updateRunnerConfig = (id: number, field: 'v0' | 'a', val: number) => {
      setRunners(prev => prev.map(r => r.id === id ? { ...r, [field]: val } : r));
  };

  return (
    <div className="flex flex-col gap-6 bg-slate-900/40 p-6 rounded-3xl border border-slate-800">
      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {runners.map(r => (
          <div key={r.id} className={`p-4 rounded-2xl border ${r.id === 1 ? 'border-rose-500/20 bg-rose-500/5' : 'border-blue-500/20 bg-blue-500/5'}`}>
            <div className="flex justify-between items-center mb-4">
                <span className={`text-xs font-black uppercase tracking-widest ${r.id === 1 ? 'text-rose-400' : 'text-blue-400'}`}>Corredor {r.id}: {r.name}</span>
                {r.finished && <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded text-white">{r.time?.toFixed(2)}s</span>}
            </div>
            <div className="space-y-4">
                <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold text-slate-500">
                        <span>VELOCIDADE INICIAL (v₀)</span>
                        <span className="text-slate-300">{r.v0} m/s</span>
                    </div>
                    <input 
                        type="range" min="0" max="20" step="0.5" value={r.v0} 
                        onChange={(e) => updateRunnerConfig(r.id, 'v0', parseFloat(e.target.value))}
                        disabled={isRunning}
                        className="w-full accent-emerald-500"
                    />
                </div>
                <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold text-slate-500">
                        <span>ACELERAÇÃO (a)</span>
                        <span className="text-slate-300">{r.a} m/s²</span>
                    </div>
                    <input 
                        type="range" min="0" max="5" step="0.1" value={r.a} 
                        onChange={(e) => updateRunnerConfig(r.id, 'a', parseFloat(e.target.value))}
                        disabled={isRunning}
                        className="w-full accent-amber-500"
                    />
                </div>
            </div>
          </div>
        ))}
      </div>

      {/* Track */}
      <div className="relative h-48 bg-slate-950 rounded-2xl border border-slate-800 p-8 overflow-hidden">
        {/* Track Lines */}
        <div className="absolute inset-0 flex flex-col justify-around px-8 opacity-20 pointer-events-none">
            <div className="h-px bg-slate-500 w-full" />
            <div className="h-px bg-slate-500 w-full" />
            <div className="h-px bg-slate-500 w-full" />
        </div>
        
        {/* Distance Markers */}
        <div className="absolute bottom-2 left-8 right-8 flex justify-between text-[8px] font-mono text-slate-700">
            <span>0m</span>
            <span>25m</span>
            <span>50m</span>
            <span>75m</span>
            <span>100m</span>
        </div>

        {/* Runners Display */}
        {runners.map((r, i) => (
            <motion.div
                key={r.id}
                className="absolute"
                style={{ 
                    left: `calc(32px + ${(r.x / finishLine) * 100}% - 24px)`,
                    top: i === 0 ? '25%' : '60%',
                    transition: isRunning ? 'none' : 'left 0.3s ease-out'
                }}
            >
                <div className="relative group">
                    <img 
                        src={`/sprites/${r.id === 1 ? '1 Pink_Monster' : '3 Dude_Monster'}/${r.id === 1 ? 'Pink' : 'Dude'}_Monster_Run_6.png`} 
                        alt="runner" 
                        className={`w-12 h-12 object-contain ${isRunning ? 'animate-bounce' : ''}`}
                        style={{ imageRendering: 'pixelated', transform: 'scaleX(1)' }}
                    />
                    {r.finished && (
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                            <Trophy className="w-4 h-4 text-amber-500" />
                        </div>
                    )}
                </div>
            </motion.div>
        ))}

        {/* Finish Line */}
        <div className="absolute top-0 right-8 bottom-0 w-1 bg-gradient-to-b from-transparent via-rose-500 to-transparent opacity-50 shadow-[0_0_10px_red]" />
      </div>

      {/* Footer Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
            <button 
                onClick={toggleRace}
                className={`flex items-center gap-2 px-6 py-2 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
                    isRunning ? 'bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.3)]' : 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                }`}
            >
                {isRunning ? <Timer className="w-4 h-4 animate-spin-slow" /> : <Play className="w-4 h-4" />}
                {isRunning ? 'Correndo...' : 'Largar!'}
            </button>
            <button 
                onClick={resetRace}
                className="p-2 bg-slate-800 text-slate-400 rounded-xl hover:bg-slate-700 transition-all"
            >
                <RotateCcw className="w-5 h-5" />
            </button>
        </div>

        <div className="text-right">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Tempo Decorrido</span>
            <span className="text-2xl font-black font-mono text-slate-200">{elapsed.toFixed(2)}s</span>
        </div>
      </div>

      <div className="p-4 bg-blue-500/5 rounded-2xl border border-blue-500/20 text-[10px] text-blue-400 leading-relaxed italic">
          <Info className="inline w-3 h-3 mr-1" />
          Observe como a velocidade constante (a=0) é linear, enquanto a aceleração faz a velocidade aumentar quadraticamente no tempo (Curva de Galileu).
      </div>
    </div>
  );
};
