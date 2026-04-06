import { useState, useEffect } from "react";
import { Play, RotateCcw, CheckCircle2, XCircle, ArrowRight, MousePointer2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Sprite Component (Integrated) ---
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

// --- ToyCoder Logic ---
type BlockType = "move" | "jump" | "attack";

interface Block {
  id: string;
  type: BlockType;
  label: string;
}

const AVAILABLE_BLOCKS: Block[] = [
  { id: "b1", type: "move", label: "Mover Direita" },
  { id: "b2", type: "jump", label: "Pular" },
  { id: "b3", type: "attack", label: "Atacar" },
];

export function ToyCoder() {
  const [sequence, setSequence] = useState<Block[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [charState, setCharState] = useState<CharState>("idle");
  const [posX, setPosX] = useState(0);
  const [result, setResult] = useState<"none" | "success" | "fail">("none");
  const [currentBlockIdx, setCurrentBlockIdx] = useState(-1);

  // Challenge: Move -> Jump -> Move -> Attack
  const target = ["move", "jump", "move", "attack"];

  const addBlock = (block: Block) => {
    if (isPlaying) return;
    setSequence([...sequence, { ...block, id: Math.random().toString() }]);
    setResult("none");
  };

  const removeBlock = (idx: number) => {
    if (isPlaying) return;
    const next = [...sequence];
    next.splice(idx, 1);
    setSequence(next);
  };

  const runSequence = async () => {
    if (sequence.length === 0) return;
    setIsPlaying(true);
    setPosX(0);
    setResult("none");

    for (let i = 0; i < sequence.length; i++) {
      setCurrentBlockIdx(i);
      const block = sequence[i];

      if (block.type === "move") {
        setCharState("run");
        for (let step = 0; step < 20; step++) {
          setPosX(p => p + 3);
          await new Promise(r => setTimeout(r, 20));
        }
      } else if (block.type === "jump") {
        setCharState("jump");
        await new Promise(r => setTimeout(r, 800));
      } else if (block.type === "attack") {
        setCharState("attack");
        await new Promise(r => setTimeout(r, 600));
      }
      setCharState("idle");
      await new Promise(r => setTimeout(r, 200));
    }

    const seqTypes = sequence.map(b => b.type);
    const isOk = seqTypes.length === target.length && seqTypes.every((t, i) => t === target[i]);

    setResult(isOk ? "success" : "fail");
    setIsPlaying(false);
    setCurrentBlockIdx(-1);
  };

  const reset = () => {
    setSequence([]);
    setPosX(0);
    setCharState("idle");
    setResult("none");
    setCurrentBlockIdx(-1);
  };

  return (
    <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 font-sans selection:bg-rose-500/30">
      {/* Left: Logic Construction */}
      <div className="md:col-span-5 space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
           <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <MousePointer2 className="w-5 h-5 text-rose-400" />
              Banco de Comandos
           </h3>
           <div className="flex flex-col gap-3">
              {AVAILABLE_BLOCKS.map(b => (
                <button
                  key={b.id}
                  onClick={() => addBlock(b)}
                  disabled={isPlaying}
                  className="w-full text-left p-3 rounded-2xl bg-slate-800 border border-slate-700 hover:border-rose-500/50 hover:bg-slate-700 transition-all text-slate-200 font-bold flex items-center justify-between group disabled:opacity-50"
                >
                  {b.label}
                  <span className="p-1 bg-slate-900 rounded-lg group-hover:bg-rose-500/20 text-slate-500 group-hover:text-rose-400 transition-colors">
                     <ArrowRight className="w-4 h-4" />
                  </span>
                </button>
              ))}
           </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 min-h-[200px] flex flex-col shadow-xl">
           <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Sua Sequência</h3>
              <button onClick={reset} disabled={isPlaying} className="text-slate-500 hover:text-rose-400 transition-colors">
                 <RotateCcw className="w-5 h-5" />
              </button>
           </div>
           <div className="flex-1 space-y-2">
              {sequence.length === 0 && (
                <div className="h-full flex items-center justify-center text-slate-600 text-sm italic py-10">
                   Clique nos comandos acima para começar a programar!
                </div>
              )}
              {sequence.map((b, i) => (
                <motion.div
                  key={b.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`p-3 rounded-xl border flex items-center justify-between ${
                    currentBlockIdx === i ? 'bg-rose-500/20 border-rose-500 font-black text-rose-200' : 'bg-slate-800 border-slate-700 text-slate-300'
                  }`}
                >
                  <span className="text-xs">{i + 1}. {b.label}</span>
                  <button onClick={() => removeBlock(i)} disabled={isPlaying} className="text-slate-600 hover:text-rose-500">×</button>
                </motion.div>
              ))}
           </div>
           <button
             onClick={runSequence}
             disabled={isPlaying || sequence.length === 0}
             className="w-full mt-6 py-4 bg-gradient-to-r from-rose-600 to-orange-600 text-white font-black rounded-2xl shadow-lg shadow-rose-900/30 hover:scale-105 transition-all disabled:opacity-30 flex items-center justify-center gap-2"
           >
              {isPlaying ? 'EXECUTANDO...' : <><Play className="w-5 h-5 fill-white" /> EXECUTAR CÓDIGO</>}
           </button>
        </div>
      </div>

      {/* Right: Simulation Area */}
      <div className="md:col-span-7 flex flex-col gap-6">
        <div className="bg-[#1a1a1a] rounded-[3rem] border-4 border-slate-800 h-[400px] relative overflow-hidden shadow-inner flex flex-col">
           {/* Background Grid */}
           <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
           
           {/* Ground */}
           <div className="absolute bottom-0 left-0 right-0 h-20 bg-slate-800" />
           
           {/* Goal visualizer */}
           <div className="absolute top-6 left-6 right-6 flex flex-col items-center gap-2">
              <div className="text-[10px] font-black tracking-widest text-slate-500 uppercase">Destaque do Desafio:</div>
              <div className="flex gap-2 bg-slate-950/80 px-4 py-2 rounded-2xl border border-slate-800">
                  {target.map((t, i) => (
                    <div key={i} className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                       sequence[i]?.type === t ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-900 text-slate-600'
                    }`}>
                       {t === "move" ? "MOVER" : t === "jump" ? "PULAR" : "ATACAR"}
                    </div>
                  ))}
              </div>
           </div>

           {/* Sprite Container */}
           <div 
             className="absolute bottom-20 transition-all duration-300 transform -translate-x-1/2"
             style={{ left: `${20 + posX / 5}%` }}
           >
              <Sprite state={charState} character={0} scale={4} />
           </div>

           {/* Feedback Overlay */}
           <AnimatePresence>
              {result !== "none" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className={`absolute inset-0 flex items-center justify-center bg-slate-950/60 backdrop-blur-md z-20`}
                >
                   <div className="text-center space-y-4">
                      {result === "success" ? (
                        <div className="space-y-4 animate-bounce">
                           <CheckCircle2 className="w-20 h-20 text-emerald-400 mx-auto" />
                           <h4 className="text-3xl font-black text-white">LÓGICA PERFEITA!</h4>
                        </div>
                      ) : (
                        <div className="space-y-4">
                           <XCircle className="w-20 h-20 text-rose-500 mx-auto" />
                           <h4 className="text-3xl font-black text-white">OPS! ERRO DE LÓGICA</h4>
                           <p className="text-slate-400 text-sm">O computador fez exatamente o que você pediu.<br/>Tente ajustar a ordem dos comandos.</p>
                           <button onClick={reset} className="px-6 py-2 bg-slate-800 text-white rounded-xl font-bold">Tentar De Novo</button>
                        </div>
                      )}
                   </div>
                </motion.div>
              )}
           </AnimatePresence>
        </div>

        <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl">
           <h4 className="text-sm font-black text-rose-400 uppercase tracking-widest mb-2 italic">Dica do Professor Pixel:</h4>
           <p className="text-slate-400 text-xs leading-relaxed">
              Programar é traduzir seus pensamentos para uma sequência de ações que a máquina entende. Se a sequência estiver errada, o "brinquedo" não chega ao objetivo. O computador não adivinha, ele apenas obedece!
           </p>
        </div>
      </div>
    </div>
  );
}
