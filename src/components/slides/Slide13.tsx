import { useState, useRef } from "react";
import { GraphCanvas } from "../GraphCanvas";
import type { NodeData, EdgeData } from "../../types";
import { Play, RotateCcw } from "lucide-react";

const INITIAL_NODES: NodeData[] = [
  { id: "q0", label: "Aguardando", x: 150, y: 150 },
  { id: "q1", label: "Ação: Herói", x: 350, y: 50 },
  { id: "q2", label: "Ação: Monstro", x: 350, y: 250 },
  { id: "q3", label: "Fim do Combate", x: 550, y: 150 },
];

const BASE_EDGES: EdgeData[] = [
  { id: "e1", source: "q0", target: "q1", directed: true, label: "a" },
  { id: "e2", source: "q0", target: "q2", directed: true, label: "b" },
  { id: "e3", source: "q1", target: "q1", directed: true, label: "a" },
  { id: "e4", source: "q1", target: "q2", directed: true, label: "b" },
  { id: "e5", source: "q2", target: "q1", directed: true, label: "a" },
  { id: "e6", source: "q2", target: "q2", directed: true, label: "b" },
  // Let's assume hitting "c" ends the simulation
  { id: "e7", source: "q1", target: "q3", directed: true, label: "c" },
  { id: "e8", source: "q2", target: "q3", directed: true, label: "c" },
  { id: "e9", source: "q0", target: "q3", directed: true, label: "c" },
];

export function Slide13() {
  const [activeState, setActiveState] = useState<string>("q0");
  const [highlightedEdge, setHighlightedEdge] = useState<string | null>(null);
  
  const [spriteHeroState, setSpriteHeroState] = useState<"idle" | "attack">("idle");
  const [spriteMonsterState, setSpriteMonsterState] = useState<"idle" | "attack" | "hurt" | "death">("idle");

  const [wordInput, setWordInput] = useState("aababc");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [simulationResult, setSimulationResult] = useState<"accepted" | "rejected" | null>(null);

  const timeoutRef = useRef<number | null>(null);

  const resetSimulation = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveState("q0");
    setCurrentIndex(0);
    setHighlightedEdge(null);
    setSimulationResult(null);
    setIsPlaying(false);
    setSpriteHeroState("idle");
    setSpriteMonsterState("idle");
  };

  const advanceStep = (currentState: string, index: number) => {
    if (index >= wordInput.length) {
      setSimulationResult(currentState === "q3" ? "accepted" : "rejected");
      setIsPlaying(false);
      
      // If accepted/finished, the monster dies for dramatic effect
      if (currentState === "q3") {
          setSpriteHeroState("idle");
          setSpriteMonsterState("death");
      }
      return;
    }

    const currentLetter = wordInput[index];
    const validTransition = BASE_EDGES.find(
      e => e.source === currentState && e.label === currentLetter
    );

    if (validTransition) {
      setHighlightedEdge(validTransition.id);

      // Flash then transition state
      timeoutRef.current = window.setTimeout(() => {
        setActiveState(validTransition.target);
        setHighlightedEdge(null);
        
        // Trigger Animations based on the input letter
        if (currentLetter === 'a') {
            setSpriteHeroState("attack");
            setSpriteMonsterState("hurt");
        } else if (currentLetter === 'b') {
            setSpriteMonsterState("attack");
            setSpriteHeroState("idle"); // just take the hit
        } else {
            setSpriteHeroState("idle");
            setSpriteMonsterState("idle");
        }
        
        timeoutRef.current = window.setTimeout(() => {
          // Reset sprites briefly before next move if not ending
          if (index + 1 < wordInput.length && wordInput[index+1] !== 'c') {
              setSpriteHeroState("idle");
              setSpriteMonsterState("idle");
          }
          advanceStep(validTransition.target, index + 1);
          setCurrentIndex(index + 1);
        }, 800);
      }, 500);
    } else {
        // Validation failed
        setSimulationResult("rejected");
        setIsPlaying(false);
        setSpriteHeroState("idle");
        setSpriteMonsterState("idle");
    }
  };

  const startSimulation = () => {
    if (wordInput.trim() === "") return;
    resetSimulation();
    setIsPlaying(true);
    advanceStep("q0", 0);
  };

  const nodes = INITIAL_NODES.map(n => ({
    ...n,
    highlighted: n.id === activeState || n.id === "q3"
  }));

  const edges = BASE_EDGES.map(e => ({
    ...e,
    highlighted: e.id === highlightedEdge
  }));

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      <div className="flex flex-col mb-4">
        <h2 className="text-3xl font-bold mb-2 tracking-tight">13. Simulação Gamificada</h2>
        <p className="text-slate-300">
          Vamos unir a <strong>Teoria (Fita de Palavras)</strong> com a <strong>Prática (O Jogo)</strong>! 
          Neste autômato de combate, <strong className="text-blue-400">a = Herói Ataca</strong>, <strong className="text-rose-400">b = Inimigo Ataca</strong> e <strong className="text-amber-400">c = Fim de Combate</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 mb-8">
        
        {/* GAME SCREEN COLUMN */}
        <div className="flex flex-col">
          <div 
            className="flex-1 min-h-[400px] w-full bg-slate-900 rounded-2xl border-4 border-slate-700 overflow-hidden relative shadow-inner group"
            style={{
                backgroundImage: "url('/sprites/backgrounds/8/1.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
          >
             {/* Scene Lighting/Overlay */}
             <div className="absolute inset-0 bg-blue-950/40 pointer-events-none mix-blend-multiply"></div>
             
             {/* Top Bar Tape Simulator */}
             <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-900/80 backdrop-blur border border-slate-600 rounded-xl p-3 flex shadow-xl z-20">
                 {wordInput.split('').map((char, idx) => (
                    <div 
                      key={idx} 
                      className={`w-10 h-10 flex items-center justify-center text-xl font-bold rounded-lg mx-1 transition-all duration-300 border-2
                        ${idx === currentIndex && isPlaying 
                            ? 'bg-primary text-white border-primary shadow-[0_0_15px_rgba(59,130,246,0.6)] scale-110 -translate-y-2' 
                            : idx < currentIndex 
                                ? 'bg-slate-700/50 text-slate-400 border-slate-600 scale-95 opacity-50' 
                                : 'bg-slate-800 text-slate-200 border-slate-600'
                        }`}
                    >
                      {char}
                    </div>
                  ))}
             </div>

             {/* Scene Actors */}
             <div className="absolute bottom-12 w-full flex justify-between px-16 z-10">
                 
                 {/* Hero Sprite */}
                 <div className="relative scale-[2.5] transform origin-bottom">
                   {spriteHeroState === "idle" && <div className="w-16 h-16 sprite-4 pixelated" style={{ backgroundImage: "url('/sprites/3 Dude_Monster/Dude_Monster_Idle_4.png')" }} />}
                   {spriteHeroState === "attack" && <div className="w-16 h-16 sprite-4 pixelated drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]" style={{ backgroundImage: "url('/sprites/3 Dude_Monster/Dude_Monster_Attack1_4.png')" }} />}
                 </div>

                 {/* Enemy Sprite (Flipped) */}
                 <div className="relative scale-[2.5] transform origin-bottom -scale-x-[2.5]">
                   {spriteMonsterState === "idle" && <div className="w-16 h-16 sprite-4 pixelated" style={{ backgroundImage: "url('/sprites/1 Pink_Monster/Pink_Monster_Idle_4.png')" }} />}
                   {spriteMonsterState === "hurt" && <div className="w-16 h-16 sprite-4 pixelated" style={{ backgroundImage: "url('/sprites/1 Pink_Monster/Pink_Monster_Hurt_4.png')" }} />}
                   {spriteMonsterState === "attack" && <div className="w-16 h-16 sprite-6 pixelated drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]" style={{ backgroundImage: "url('/sprites/1 Pink_Monster/Pink_Monster_Attack2_6.png')" }} />}
                   {spriteMonsterState === "death" && <div className="w-16 h-16 sprite-8 pixelated grayscale" style={{ backgroundImage: "url('/sprites/1 Pink_Monster/Pink_Monster_Death_8.png')" }} />}
                 </div>
             </div>

             {/* Simulation Result Overlay */}
             {simulationResult && (
                <div className={`absolute inset-0 flex flex-col items-center justify-center backdrop-blur-sm z-30 transition-all duration-500
                    ${simulationResult === 'accepted' ? 'bg-emerald-900/40' : 'bg-rose-900/40'}
                `}>
                    <div className="text-6xl font-black mb-4 drop-shadow-xl tracker-widest text-[#fff] animate-in zoom-in spin-in-12">
                         {simulationResult === 'accepted' ? 'VITÓRIA (ACEITO!)' : 'GAME OVER (REJEITADO)'}
                    </div>
                </div>
             )}
          </div>
        </div>

        {/* CONTROLS & GRAPH COLUMN */}
        <div className="flex flex-col gap-6">
            <div className="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-6 shadow-sm flex flex-col">
                <label className="text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wider">Fita de Ações (Palavra)</label>
                <div className="flex gap-4">
                  <input 
                    type="text" 
                    value={wordInput}
                    onChange={(e) => setWordInput(e.target.value.toLowerCase().replace(/[^abc]/g, ''))}
                    disabled={isPlaying}
                    className="flex-1 bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-2xl font-mono text-slate-100 focus:outline-none focus:border-primary disabled:opacity-50"
                    placeholder="ex: ababc"
                  />
                  
                  {isPlaying ? (
                    <button 
                      onClick={resetSimulation}
                      className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-colors border border-slate-500"
                    >
                      <RotateCcw className="w-5 h-5" /> Reset
                    </button>
                  ) : (
                    <button 
                      onClick={startSimulation}
                      disabled={wordInput.length === 0}
                      className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(59,130,246,0.5)] disabled:opacity-50 disabled:shadow-none"
                    >
                      <Play className="w-5 h-5" fill="currentColor" /> Simular Jogo
                    </button>
                  )}
                </div>
                <span className="text-xs text-slate-500 mt-2">Dica: Forme cadeias com 'a' e 'b'. Finalize com 'c' para atingir o Estado Final.</span>
            </div>

            <div className="flex-1 min-h-[220px] w-full bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden relative shadow-inner">
                <GraphCanvas initialNodes={nodes} initialEdges={edges} />
            </div>
        </div>

      </div>
    </div>
  );
}
