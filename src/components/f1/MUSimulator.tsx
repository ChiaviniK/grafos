import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, Timer, Info, Target, Settings2 } from 'lucide-react';

interface Vehicle {
  id: number;
  name: string;
  s0: number; // m
  v: number;  // m/s
  s: number;  // current position
  color: string;
  sprite: string;
  direction: 1 | -1;
}

export const MUSimulator: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    { id: 1, name: 'Veículo A', s0: 0, v: 10, s: 0, color: '#f43f5e', sprite: 'Pink', direction: 1 },
    { id: 2, name: 'Veículo B', s0: 100, v: -5, s: 100, color: '#3b82f6', sprite: 'Dude', direction: -1 },
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const maxDistance = 150; // track length in meters

  const requestRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const animate = (timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const progress = (timestamp - startTimeRef.current) / 1000; // time in seconds
    
    setTime(progress);
    setVehicles(prev => prev.map(v => ({
      ...v,
      // s = s0 + v.t
      s: Math.max(0, Math.min(maxDistance, v.s0 + v.v * progress))
    })));

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
    setTime(0);
    setVehicles(prev => prev.map(v => ({ ...v, s: v.s0 })));
  };

  const updateVehicle = (id: number, field: 's0' | 'v', val: number) => {
    setVehicles(prev => prev.map(v => v.id === id ? { ...v, [field]: val, s: field === 's0' ? val : v.s } : v));
  };

  // Find meeting point if vA != vB
  // s0A + vA*t = s0B + vB*t => t = (s0B - s0A) / (vA - vB)
  const vA = vehicles[0].v;
  const vB = vehicles[1].v;
  const s0A = vehicles[0].s0;
  const s0B = vehicles[1].s0;
  const tEncontro = vA !== vB ? (s0B - s0A) / (vA - vB) : Infinity;
  const sEncontro = s0A + vA * tEncontro;

  return (
    <div className="flex flex-col gap-6 bg-slate-900/40 p-6 rounded-3xl border border-slate-800">
      <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
              <Settings2 className="w-4 h-4 text-slate-500" />
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Configuração do Sistema</h3>
          </div>
          {tEncontro > 0 && tEncontro !== Infinity && (
              <div className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  Previsão de Encontro: {tEncontro.toFixed(2)}s em {sEncontro.toFixed(1)}m
              </div>
          )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {vehicles.map(v => (
          <div key={v.id} className="p-4 bg-slate-950/40 border border-slate-800 rounded-2xl space-y-4">
            <div className="flex justify-between items-center text-[10px] font-bold">
                <span style={{ color: v.color }}>{v.name.toUpperCase()}</span>
                <span className="text-slate-500">POSIÇÃO: {v.s.toFixed(1)}m</span>
            </div>
            <div className="space-y-4">
                <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-500">
                        <span>POSIÇÃO INICIAL (s₀)</span>
                        <span className="text-white">{v.s0}m</span>
                    </div>
                    <input 
                        type="range" min="0" max={maxDistance} step="1" value={v.s0} 
                        onChange={(e) => updateVehicle(v.id, 's0', parseInt(e.target.value))}
                        disabled={isRunning}
                        className="w-full accent-slate-500"
                    />
                </div>
                <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-500">
                        <span>VELOCIDADE (v)</span>
                        <span className="text-white">{v.v} m/s</span>
                    </div>
                    <input 
                        type="range" min="-20" max="20" step="1" value={v.v} 
                        onChange={(e) => updateVehicle(v.id, 'v', parseInt(e.target.value))}
                        disabled={isRunning}
                        className="w-full accent-slate-500"
                    />
                </div>
            </div>
          </div>
        ))}
      </div>

      {/* Track Visualization */}
      <div className="relative h-32 bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 overflow-hidden">
          {/* Ticks */}
          <div className="absolute bottom-2 left-6 right-6 flex justify-between">
              {[0, 25, 50, 75, 100, 125, 150].map(m => (
                  <div key={m} className="flex flex-col items-center gap-1">
                      <div className="h-2 w-px bg-slate-800" />
                      <span className="text-[8px] font-mono text-slate-600">{m}m</span>
                  </div>
              ))}
          </div>

          {/* Vehicles */}
          {vehicles.map((v, i) => (
              <motion.div
                key={v.id}
                className="absolute"
                style={{ 
                    left: `calc(1.5rem + ${(v.s / maxDistance) * 100}% - 1.5rem)`,
                    top: i === 0 ? '20%' : '50%',
                    transition: isRunning ? 'none' : 'left 0.2s ease-out'
                }}
              >
                  <img 
                    src={`/sprites/${v.id === 1 ? '1 Pink_Monster' : '3 Dude_Monster'}/${v.id === 1 ? 'Pink' : 'Dude'}_Monster_Run_6.png`} 
                    alt="runner" 
                    className={`w-12 h-12 object-contain ${isRunning ? 'animate-bounce' : ''}`}
                    style={{ 
                        imageRendering: 'pixelated', 
                        transform: v.v >= 0 ? 'scaleX(1)' : 'scaleX(-1)' 
                    }}
                  />
              </motion.div>
          ))}
          
          {/* Virtual Meeting Indicator */}
          {!isRunning && tEncontro > 0 && tEncontro !== Infinity && sEncontro >= 0 && sEncontro <= maxDistance && (
              <div 
                className="absolute top-0 bottom-0 w-px border-l border-dashed border-emerald-500/40 pointer-events-none"
                style={{ left: `calc(1.5rem + ${(sEncontro / maxDistance) * 100}%)` }}
              >
                  <Target className="w-3 h-3 text-emerald-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50" />
              </div>
          )}
      </div>

      <div className="flex items-center justify-between">
          <div className="flex gap-3">
              <button 
                onClick={() => setIsRunning(!isRunning)}
                className={`flex items-center gap-2 px-6 py-2 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
                    isRunning ? 'bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.3)]' : 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                }`}
              >
                {isRunning ? <Timer className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isRunning ? 'Pausar' : 'Simular'}
              </button>
              <button onClick={reset} className="p-2 bg-slate-800 text-slate-400 rounded-xl hover:bg-slate-700 transition-all">
                  <RotateCcw className="w-5 h-5" />
              </button>
          </div>
          <div className="text-right">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Tempo Crítico (t)</span>
              <span className="text-2xl font-black font-mono text-slate-200">{time.toFixed(2)}s</span>
          </div>
      </div>

      <div className="p-4 bg-blue-500/5 rounded-2xl border border-blue-500/20 text-[10px] text-blue-400 flex gap-3">
          <Info className="w-4 h-4 shrink-0" />
          <p><strong>A Equação Horária:</strong> $s = s_0 + v.t$. No Movimento Uniforme, a velocidade não muda. Se os móveis partem de pontos diferentes com velocidades opostas, eles **sempre** se encontrarão em algum instante $t$.</p>
      </div>
    </div>
  );
};
