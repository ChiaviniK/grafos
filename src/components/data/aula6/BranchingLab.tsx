import { useState, useEffect } from "react";
import { Play, RotateCcw, BrainCircuit, Code, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Sprite Component (Reused logic from ToyCoder) ---
type CharState = "idle" | "jump" | "hurt" | "run" | "attack";
const CHARS = ["Pink_Monster", "Owlet_Monster", "Dude_Monster"] as const;
const STATE_MAP: Record<CharState, { file: string; frames: number; fps: number }> = {
  idle: { file: "Idle_4", frames: 4, fps: 6 },
  jump: { file: "Jump_8", frames: 8, fps: 10 },
  hurt: { file: "Hurt_4", frames: 4, fps: 8 },
  run: { file: "Run_6", frames: 6, fps: 10 },
  attack: { file: "Attack1_4", frames: 4, fps: 8 },
};

function Sprite({ character = 0, state = "idle", scale = 3 }: { character?: 0 | 1 | 2; state?: CharState; scale?: number }) {
  const [frame, setFrame] = useState(0);
  const cfg = STATE_MAP[state];
  const char = CHARS[character];

  useEffect(() => {
    setFrame(0);
    const id = setInterval(() => setFrame(f => (f + 1) % cfg.frames), 1000 / cfg.fps);
    return () => clearInterval(id);
  }, [state, cfg.frames, cfg.fps]);

  const frameW = 32; const frameH = 32;
  const src = `/sprites/${character + 1} ${char}/${char}_${cfg.file}.png`;

  return (
    <div style={{
      width: frameW * scale,
      height: frameH * scale,
      backgroundImage: `url('${src}')`,
      backgroundPosition: `-${frame * frameW * scale}px 0`,
      backgroundSize: `${cfg.frames * frameW * scale}px ${frameH * scale}px`,
      imageRendering: "pixelated",
      display: "inline-block",
    }} />
  );
}

// --- BranchingLab Logic ---
type ObstacleType = "WALL" | "NONE";

export function BranchingLab() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [charState, setCharState] = useState<CharState>("idle");
  const [posX, setPosX] = useState(0);
  const [result, setResult] = useState<"none" | "success" | "fail">("none");
  const [obstacle, setObstacle] = useState<ObstacleType>("WALL");
  
  // Logic selected by user
  const [selectedCondition, setSelectedCondition] = useState<"WALL" | "NONE" | "">("");
  const [selectedAction, setSelectedAction] = useState<"jump" | "run" | "">("");
  const [selectedElseAction, setSelectedElseAction] = useState<"run" | "jump" | "">("");

  const reset = () => {
    setPosX(0);
    setCharState("idle");
    setResult("none");
    setIsPlaying(false);
  };

  const runSimulation = async () => {
    if (!selectedCondition || !selectedAction || !selectedElseAction) return;
    
    setIsPlaying(true);
    setResult("none");
    setPosX(0);
    
    // Stage 1: Run to detection point
    setCharState("run");
    for (let step = 0; step < 40; step++) {
      setPosX(p => p + 3);
      await new Promise(r => setTimeout(r, 20));
      if (step === 20) {
        // Stop at "Sensor" point
        setCharState("idle");
        await new Promise(r => setTimeout(r, 800));
        setCharState("run");
      }
    }

    // Stage 2: Decision
    const conditionMet = obstacle === selectedCondition;
    const actionToTake = conditionMet ? selectedAction : selectedElseAction;

    if (actionToTake === "jump") {
      setCharState("jump");
      // Physical jump movement
      for (let j = 0; j < 20; j++) {
         setPosX(p => p + 5);
         await new Promise(r => setTimeout(r, 40));
      }
    } else {
      setCharState("run");
      for (let j = 0; j < 20; j++) {
        setPosX(p => p + 4);
        await new Promise(r => setTimeout(r, 40));
      }
    }

    setCharState("idle");
    
    // Check Result
    const success = (obstacle === "WALL" && actionToTake === "jump") || (obstacle === "NONE" && actionToTake === "run");
    setResult(success ? "success" : "fail");
    setIsPlaying(false);
  };

  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 font-sans">
      {/* Left: Decision Logic Builder */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10">
              <BrainCircuit className="w-20 h-20 text-emerald-400" />
           </div>
           
           <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Code className="w-5 h-5 text-emerald-400" />
              Construtor de Decisão
           </h3>

           <div className="space-y-6 relative z-10">
              {/* IF Condition */}
              <div className="space-y-3">
                 <div className="flex items-center gap-2">
                    <span className="bg-emerald-600 text-white px-3 py-1 rounded-lg font-black text-sm">SE</span>
                    <span className="text-slate-400 text-sm font-bold">O OBSTÁCULO FOR...</span>
                 </div>
                 <select 
                   value={selectedCondition}
                   onChange={(e) => setSelectedCondition(e.target.value as any)}
                   className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 text-white font-bold outline-none focus:border-emerald-500 transition-colors appearance-none cursor-pointer"
                 >
                   <option value="">Selecione a condição</option>
                   <option value="WALL">EXISTIR UM MURO</option>
                   <option value="NONE">NÃO EXISTIR NADA</option>
                 </select>
              </div>

              {/* THEN Action */}
              <div className="space-y-3 pl-6 border-l-2 border-emerald-500/30">
                 <div className="flex items-center gap-2">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-lg font-black text-sm">ENTÃO</span>
                    <span className="text-slate-400 text-sm font-bold">FAÇA...</span>
                 </div>
                 <select 
                   value={selectedAction}
                   onChange={(e) => setSelectedAction(e.target.value as any)}
                   className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 text-white font-bold outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
                 >
                   <option value="">Selecione a ação</option>
                   <option value="jump">PULAR</option>
                   <option value="run">CORRER</option>
                 </select>
              </div>

              {/* ELSE Action */}
              <div className="space-y-3">
                 <div className="flex items-center gap-2">
                    <span className="bg-rose-600 text-white px-3 py-1 rounded-lg font-black text-sm">SENÃO</span>
                 </div>
                 <select 
                   value={selectedElseAction}
                   onChange={(e) => setSelectedElseAction(e.target.value as any)}
                   className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 text-white font-bold outline-none focus:border-rose-500 transition-colors appearance-none cursor-pointer"
                 >
                   <option value="">Selecione a ação alternativa</option>
                   <option value="run">CORRER</option>
                   <option value="jump">PULAR</option>
                 </select>
              </div>
           </div>

           <button
             onClick={runSimulation}
             disabled={isPlaying || !selectedCondition || !selectedAction || !selectedElseAction}
             className="w-full mt-8 py-5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black rounded-2xl shadow-lg shadow-emerald-900/30 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-30 flex items-center justify-center gap-3"
           >
              {isPlaying ? 'TESTANDO LÓGICA...' : <><Play className="w-5 h-5 fill-white" /> EXECUTAR BRANCH</>}
           </button>
        </div>

        <div className="p-5 bg-slate-900/50 border border-slate-800 rounded-2xl flex gap-3 italic">
           <AlertCircle className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
           <p className="text-xs text-slate-500 leading-relaxed">
              O "Branching" permite que o código mude de direção. Se a condição for VERDADEIRA, ele segue um caminho. Se for FALSA, ele obrigatoriamente segue o "Senão" (Else).
           </p>
        </div>
      </div>

      {/* Right: Simulation Area */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        <div className="bg-slate-950 rounded-[3rem] border-4 border-slate-800 h-[450px] relative overflow-hidden shadow-inner shrink-0 lg:h-full">
           {/* Scene Controls */}
           <div className="absolute top-6 left-6 z-20 flex gap-2">
              <button 
                onClick={() => setObstacle(o => o === "WALL" ? "NONE" : "WALL")}
                className={`px-4 py-2 rounded-xl border text-[10px] font-black transition-all ${
                  obstacle === "WALL" ? "bg-rose-500/10 border-rose-500 text-rose-400" : "bg-slate-900 border-slate-800 text-slate-500"
                }`}
              >
                CENÁRIO: {obstacle === "WALL" ? "COM MURO" : "SEM MURO"}
              </button>
              <button onClick={reset} className="p-2 bg-slate-900 border border-slate-800 text-slate-400 rounded-xl hover:text-white transition-colors">
                 <RotateCcw className="w-4 h-4" />
              </button>
           </div>

           {/* Feedback Badge */}
           <AnimatePresence>
             {result !== "none" && (
                <motion.div 
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  className="absolute top-20 left-1/2 -translate-x-1/2 z-30"
                >
                   <div className={`px-6 py-3 rounded-2xl font-black text-lg border-2 shadow-2xl ${
                     result === "success" ? "bg-emerald-500/20 border-emerald-500 text-emerald-400" : "bg-rose-500/20 border-rose-500 text-rose-400"
                   }`}>
                      {result === "success" ? "LÓGICA CORRETA! ✨" : "CÓDIGO QUEBROU! 💥"}
                   </div>
                </motion.div>
             )}
           </AnimatePresence>

           {/* Sensors Visualizer */}
           <div className="absolute inset-0 pointer-events-none">
              <div className="absolute left-[35%] top-0 bottom-20 w-px bg-cyan-500/20 border-r border-dashed border-cyan-500/30">
                 <div className="absolute top-1/4 left-2 text-[8px] font-mono text-cyan-400 uppercase tracking-tighter">Sensor de Detecção</div>
              </div>
           </div>

           {/* Background Grid */}
           <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
           
           {/* Ground */}
           <div className="absolute bottom-0 left-0 right-0 h-20 bg-slate-900 flex items-center justify-center">
              <div className="h-0.5 w-[90%] bg-white/5" />
           </div>
           
           {/* Obstacle: Wall */}
           <AnimatePresence>
              {obstacle === "WALL" && (
                <motion.div 
                   initial={{ opacity: 0, scale: 0.8 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.8 }}
                   className="absolute bottom-20 left-[60%] w-12 h-32 bg-gradient-to-t from-slate-800 to-slate-700 border-2 border-slate-600 rounded-lg shadow-2xl z-10"
                >
                   <div className="absolute inset-0 flex flex-col justify-around items-center p-2 opacity-30">
                      {[...Array(4)].map((_, i) => <div key={i} className="h-0.5 w-full bg-slate-400" />)}
                   </div>
                </motion.div>
              )}
           </AnimatePresence>

           {/* Character */}
           <div 
             className="absolute bottom-20 transition-all duration-100 transform -translate-x-1/2 z-20"
             style={{ left: `${15 + posX / 10}%` }}
           >
              <Sprite state={charState} character={1} scale={4} />
           </div>

           {/* Fail overlay */}
           {result === "fail" && (
              <div className="absolute inset-0 bg-rose-500/10 pointer-events-none z-40 transition-opacity" />
           )}
        </div>
      </div>
    </div>
  );
}
