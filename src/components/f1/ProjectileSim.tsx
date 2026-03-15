import { useState, useRef, useEffect } from 'react';
import { Play, RotateCcw, Info } from 'lucide-react';

interface SimulationState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  time: number;
  isRunning: boolean;
  trail: { x: number; y: number }[];
}

export function ProjectileSim() {
  // Configurable parameters
  const [v0, setV0] = useState(20);
  const [angle, setAngle] = useState(45);
  const [h0, setH0] = useState(0);
  const [g] = useState(10); // Standard for ENEM/tests

  // Animation State
  const [state, setState] = useState<SimulationState>({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    time: 0,
    isRunning: false,
    trail: [],
  });

  const [maxHeight, setMaxHeight] = useState(0);
  const [range, setRange] = useState(0);

  const requestRef = useRef<number>(null);
  const lastUpdateRef = useRef<number>(null);

  const startSim = () => {
    const angleRad = (angle * Math.PI) / 180;
    setState({
      x: 0,
      y: h0,
      vx: v0 * Math.cos(angleRad),
      vy: v0 * Math.sin(angleRad),
      time: 0,
      isRunning: true,
      trail: [{ x: 0, y: h0 }],
    });
    setMaxHeight(h0);
    setRange(0);
  };

  const resetSim = () => {
    setState(p => ({ ...p, isRunning: false, x: 0, y: h0, time: 0, trail: [] }));
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
  };

  const update = (t: number) => {
    if (!lastUpdateRef.current) {
        lastUpdateRef.current = t;
        requestRef.current = requestAnimationFrame(update);
        return;
    }

    const dt = (t - lastUpdateRef.current) / 1000;
    lastUpdateRef.current = t;

    setState(prev => {
      if (!prev.isRunning) return prev;

      const newTime = prev.time + dt;
      // Kinematic equations
      // x = x0 + vx * t
      // y = y0 + vy0 * t - 0.5 * g * t^2
      // v_y = v_y0 - g * t
      
      const angleRad = (angle * Math.PI) / 180;
      const v0y = v0 * Math.sin(angleRad);
      const newX = v0 * Math.cos(angleRad) * newTime;
      const newY = h0 + v0y * newTime - 0.5 * g * (newTime ** 2);
      
      if (newY < 0) {
        // Stop at ground
        setRange(newX);
        return { ...prev, y: 0, isRunning: false };
      }

      if (newY > maxHeight) setMaxHeight(newY);

      // Trail sampling
      const newTrail = [...prev.trail];
      if (Math.floor(newTime * 10) > Math.floor(prev.time * 10)) {
          newTrail.push({ x: newX, y: newY });
      }

      return {
        ...prev,
        x: newX,
        y: newY,
        time: newTime,
        trail: newTrail,
      };
    });

    requestRef.current = requestAnimationFrame(update);
  };

  useEffect(() => {
    if (state.isRunning) {
        lastUpdateRef.current = performance.now();
        requestRef.current = requestAnimationFrame(update);
    }
    return () => {
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [state.isRunning]);

  // Viewport scaling
  const canvasHeight = 300;
  const canvasWidth = 600;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden p-6 shadow-2xl">
      <div className="grid lg:grid-cols-4 gap-6">
        
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6 bg-slate-950/50 p-6 rounded-3xl border border-slate-800">
          <div>
            <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest flex justify-between">
              Velocidade Inicial <span>{v0} m/s</span>
            </label>
            <input 
                type="range" min="0" max="50" value={v0} 
                onChange={(e) => setV0(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-500 mt-2"
            />
          </div>

          <div>
            <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest flex justify-between">
              Ângulo <span>{angle}°</span>
            </label>
            <input 
                type="range" min="0" max="90" value={angle} 
                onChange={(e) => setAngle(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 mt-2"
            />
          </div>

          <div>
            <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest flex justify-between">
              Altura Inicial <span>{h0} m</span>
            </label>
            <input 
                type="range" min="0" max="25" value={h0} 
                onChange={(e) => setH0(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500 mt-2"
            />
          </div>

          <div className="flex gap-2">
            <button 
                onClick={startSim} disabled={state.isRunning}
                className="flex-1 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white py-3 rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" /> Lançar
            </button>
            <button 
                onClick={resetSim}
                className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-2xl transition-all"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-4">
             <div className="flex justify-between items-center px-4 py-3 bg-slate-950 rounded-xl">
                <span className="text-[10px] font-bold text-slate-500">ALTURA MÁX.</span>
                <span className="text-xl font-black text-emerald-400">{maxHeight.toFixed(1)}m</span>
             </div>
             <div className="flex justify-between items-center px-4 py-3 bg-slate-950 rounded-xl">
                <span className="text-[10px] font-bold text-slate-500">ALCANCE HORIZ.</span>
                <span className="text-xl font-black text-blue-400">{range.toFixed(1)}m</span>
             </div>
          </div>
        </div>

        {/* Visualizer */}
        <div className="lg:col-span-3 space-y-4">
          <div className="relative bg-slate-950 rounded-3xl border border-slate-800 h-[400px] overflow-hidden group">
            {/* Grid */}
            <div className="absolute inset-0 opacity-10" style={{ 
                backgroundImage: 'linear-gradient(#475569 1px, transparent 1px), linear-gradient(90deg, #475569 1px, transparent 1px)',
                backgroundSize: '40px 40px'
            }} />
            
            <svg viewBox={`0 0 ${canvasWidth} ${canvasHeight}`} className="absolute inset-0 w-full h-full p-10 overflow-visible">
              {/* Ground */}
              <line x1="-100" y1={canvasHeight} x2={canvasWidth + 100} y2={canvasHeight} stroke="#1e293b" strokeWidth="4" />
              
              {/* Trail */}
              <polyline 
                points={state.trail.map(p => `${p.x * 6}, ${canvasHeight - (p.y * 6)}`).join(' ')}
                fill="none" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="4 4"
                className="opacity-40"
              />

              {/* Projectile */}
              <circle 
                cx={state.x * 6} 
                cy={canvasHeight - (state.y * 6)} 
                r="6" 
                fill="#ec4899" 
                className="shadow-xl"
              />

              {/* Angle Indicator */}
              {!state.isRunning && state.time === 0 && (
                  <line 
                    x1="0" y1={canvasHeight - (h0 * 6)} 
                    x2={40 * Math.cos(angle * Math.PI / 180)} 
                    y2={canvasHeight - (h0 * 6) - 40 * Math.sin(angle * Math.PI / 180)} 
                    stroke="#10b981" strokeWidth="2" strokeDasharray="2 2"
                  />
              )}
            </svg>

            {/* Labels */}
            <div className="absolute top-4 left-4 flex gap-4">
               <div className="px-3 py-1 bg-violet-600/10 border border-violet-500/20 rounded-lg text-[10px] font-black text-violet-400 uppercase tracking-widest">
                  Tempo: {state.time.toFixed(2)}s
               </div>
               <div className="px-3 py-1 bg-emerald-600/10 border border-emerald-500/20 rounded-lg text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                  H: {state.y.toFixed(1)}m
               </div>
            </div>
          </div>

          <div className="flex gap-4 p-4 bg-blue-500/5 rounded-2xl border border-blue-500/10">
            <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-400 leading-relaxed italic">
                O movimento oblíquo é a composição de dois movimentos independentes: um **M.U.** na horizontal (eixo x) e um **M.U.V.** na vertical (eixo y), acelerado pela gravidade.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
