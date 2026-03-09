import { useState } from "react";
import { GraphCanvas } from "../GraphCanvas";
import type { NodeData, EdgeData } from "../../types";
import { MoveRight, ArrowUp, PauseCircle } from "lucide-react";

const INITIAL_NODES: NodeData[] = [
  { id: "s0", label: "Parado", x: 150, y: 150 },
  { id: "s1", label: "Correndo", x: 350, y: 150 },
  { id: "s2", label: "Pulando", x: 250, y: 50 },
  { id: "s3", label: "Atacando", x: 500, y: 150 },
];

const FULL_EDGES: EdgeData[] = [
  { id: "e1", source: "s0", target: "s1", directed: true, label: "pressionar ▶" },
  { id: "e2", source: "s1", target: "s0", directed: true, label: "soltar ▶" },
  { id: "e3", source: "s0", target: "s2", directed: true, label: "apertar ⬆" },
  { id: "e4", source: "s1", target: "s2", directed: true, label: "apertar ⬆" },
  { id: "e5", source: "s2", target: "s0", directed: true, label: "tocar o chão" },
  { id: "e6", source: "s0", target: "s3", directed: true, label: "botão A" },
  { id: "e7", source: "s3", target: "s0", directed: true, label: "fim do ataque" },
];

export function Slide3() {
  const [activeState, setActiveState] = useState<string>("s0");
  const [highlightedEdge, setHighlightedEdge] = useState<string | null>(null);

  const triggerTransition = (trigger: string) => {
    const validEdge = FULL_EDGES.find(e => e.source === activeState && e.label === trigger);
    if (validEdge) {
      setHighlightedEdge(validEdge.id);
      setTimeout(() => {
        setActiveState(validEdge.target);
        setHighlightedEdge(null);
        
        // Auto-return triggers
        if (trigger === "tocar o chão" || trigger === "fim do ataque") {
          // just let it land at s0
        } else if (validEdge.target === "s2") {
             setTimeout(() => triggerTransition("tocar o chão"), 800);
        } else if (validEdge.target === "s3") {
             setTimeout(() => triggerTransition("fim do ataque"), 600);
        }

      }, 300);
    }
  };

  const nodes = INITIAL_NODES.map(n => ({
    ...n,
    highlighted: n.id === activeState
  }));

  const edges = FULL_EDGES.map(e => ({
    ...e,
    highlighted: e.id === highlightedEdge
  }));

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      <div className="flex flex-col mb-4">
        <h2 className="text-3xl font-bold mb-2 tracking-tight">3. Analogia 2.2: Controles do Jogador</h2>
        <p className="text-slate-300">
          Você já parou para pensar em como o jogo sabe o que o herói deve fazer quando você aperta um botão? 
          O herói também é uma enorme <strong>Máquina de Estados</strong>! Diferentes gatilhos levam a diferentes ações.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 mb-8">
        <div className="flex flex-col">
          <div className="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-6 shadow-sm flex-1">
            <h3 className="text-xl font-semibold mb-4 text-slate-100 flex items-center gap-2">
               Controle (Gamepad)
            </h3>
            <p className="text-slate-400 mb-6 text-sm">
              Use os botões de controle abaixo para enviar <strong>gatilhos (inputs)</strong> para a Máquina de Estados do Herói. Tente pular enquanto corre!
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <button 
                onClick={() => triggerTransition("pressionar ▶")}
                disabled={activeState !== "s0"}
                className="flex flex-col items-center justify-center gap-2 bg-blue-900/40 hover:bg-blue-800/60 disabled:opacity-30 disabled:hover:bg-blue-900/40 border border-blue-500/30 p-4 rounded-xl transition-all"
              >
                <div className="bg-blue-500 p-2 rounded-lg text-white"><MoveRight className="w-6 h-6"/></div>
                <strong className="text-blue-200">Andar (▶)</strong>
              </button>
              
              <button 
                onClick={() => triggerTransition("soltar ▶")}
                disabled={activeState !== "s1"}
                className="flex flex-col items-center justify-center gap-2 bg-slate-700/40 hover:bg-slate-600/60 disabled:opacity-30 disabled:hover:bg-slate-700/40 border border-slate-500/30 p-4 rounded-xl transition-all"
              >
                <div className="bg-slate-500 p-2 rounded-lg text-white"><PauseCircle className="w-6 h-6"/></div>
                <strong className="text-slate-200">Parar</strong>
              </button>

              <button 
                onClick={() => triggerTransition("apertar ⬆")}
                disabled={activeState !== "s0" && activeState !== "s1"}
                className="col-span-2 flex items-center justify-center gap-3 bg-emerald-900/40 hover:bg-emerald-800/60 disabled:opacity-30 disabled:hover:bg-emerald-900/40 border border-emerald-500/30 p-4 rounded-xl transition-all"
              >
                <div className="bg-emerald-500 p-2 rounded-lg text-white"><ArrowUp className="w-6 h-6"/></div>
                <strong className="text-emerald-200">Pular Inicial (⬆)</strong>
              </button>
              
              <button 
                onClick={() => triggerTransition("botão A")}
                disabled={activeState !== "s0"}
                className="col-span-2 flex items-center justify-center gap-3 bg-amber-900/40 hover:bg-amber-800/60 disabled:opacity-30 disabled:hover:bg-amber-900/40 border border-amber-500/30 p-4 rounded-xl transition-all"
              >
                <div className="bg-amber-500 p-2 rounded-lg text-white font-bold text-xl w-10 h-10 flex items-center justify-center">A</div>
                <strong className="text-amber-200">Golpe de Espada (A)</strong>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-6 shadow-inner flex flex-col items-center justify-center min-h-[200px] relative overflow-hidden group">
             {/* Scene Background Elements */}
             <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 to-slate-900/80 pointer-events-none"></div>
             
             {/* Status Badge */}
             <div className="absolute top-4 right-4 bg-slate-800 border border-slate-700 text-xs px-2 py-1 rounded text-slate-400 font-mono">
                Player.State = {activeState}
             </div>

             {/* Dynamic Pixel Art Sprite */}
             <div className={`relative z-10 scale-150 transform transition-all duration-300 ${activeState === 's2' ? '-translate-y-8' : ''}`}>
               {activeState === "s0" && <div className="w-16 h-16 sprite-4 pixelated" style={{ backgroundImage: "url('/sprites/3 Dude_Monster/Dude_Monster_Idle_4.png')" }} />}
               {activeState === "s1" && <div className="w-16 h-16 sprite-6 pixelated" style={{ backgroundImage: "url('/sprites/3 Dude_Monster/Dude_Monster_Run_6.png')" }} />}
               {activeState === "s2" && <div className="w-16 h-16 sprite-8 pixelated" style={{ backgroundImage: "url('/sprites/3 Dude_Monster/Dude_Monster_Jump_8.png')" }} />}
               {activeState === "s3" && <div className="w-16 h-16 sprite-4 pixelated" style={{ backgroundImage: "url('/sprites/3 Dude_Monster/Dude_Monster_Attack1_4.png')" }} />}
             </div>
             
             {/* Ground */}
             <div className="absolute bottom-8 w-full h-1 bg-gradient-to-r from-transparent via-slate-600 to-transparent blur-[1px] rounded-full"></div>
          </div>

          <div className="flex-1 min-h-[300px] w-full bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden relative shadow-inner">
            <GraphCanvas initialNodes={nodes} initialEdges={edges} />
          </div>
        </div>
      </div>
    </div>
  );
}
