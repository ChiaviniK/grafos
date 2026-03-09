import { useState } from "react";
import { GraphCanvas } from "../GraphCanvas";
import type { NodeData, EdgeData } from "../../types";
import { Gamepad2, Eye, Footprints, Skull, HeartPulse } from "lucide-react";

const INITIAL_NODES: NodeData[] = [
  { id: "q0", label: "Patrulhando", x: 150, y: 150 },
  { id: "q1", label: "Perseguindo", x: 350, y: 250 },
  { id: "q2", label: "Atacando", x: 550, y: 150 },
];

const FULL_EDGES: EdgeData[] = [
  { id: "e1", source: "q0", target: "q0", directed: true, label: "nada acontece" },
  { id: "e2", source: "q0", target: "q1", directed: true, label: "ver jogador" },
  { id: "e3", source: "q1", target: "q0", directed: true, label: "perder de vista" },
  { id: "e4", source: "q1", target: "q2", directed: true, label: "perto do jogador" },
  { id: "e5", source: "q2", target: "q1", directed: true, label: "jogador foge" },
  { id: "e6", source: "q2", target: "q0", directed: true, label: "jogador derrotado" },
];

export function Slide2() {
  const [activeState, setActiveState] = useState<string>("q0");
  const [highlightedEdge, setHighlightedEdge] = useState<string | null>(null);

  const triggerTransition = (trigger: string) => {
    const validEdge = FULL_EDGES.find(e => e.source === activeState && e.label === trigger);
    if (validEdge) {
      setHighlightedEdge(validEdge.id);
      setTimeout(() => {
        setActiveState(validEdge.target);
        setHighlightedEdge(null);
      }, 500);
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
        <h2 className="text-3xl font-bold mb-2 tracking-tight">2. Máquinas de Estado em Videogames</h2>
        <p className="text-slate-300">
          Antes de entrarmos na matemática, como programas "tomam decisões"? 
          Em jogos, a Inteligência Artificial dos inimigos (NPCs) é controlada por uma <strong>Máquina de Estados</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 mb-8">
        <div className="flex flex-col">
          <div className="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-6 shadow-sm flex-1">
            <h3 className="text-xl font-semibold mb-4 text-slate-100 flex items-center gap-2">
              <Gamepad2 className="w-6 h-6 text-purple-400" />
              IA do NPC (Inimigo)
            </h3>
            <p className="text-slate-400 mb-6 text-sm">
              O inimigo começa no estado inicial <strong>Patrulhando</strong>. Clique nos gatilhos abaixo para simular o que o NPC enxerga e veja como ele muda de estado.
            </p>

            <div className="grid grid-cols-1 gap-3">
              <button 
                onClick={() => triggerTransition("ver jogador")}
                disabled={activeState !== "q0"}
                className="flex items-center gap-3 bg-blue-900/40 hover:bg-blue-800/60 disabled:opacity-30 disabled:hover:bg-blue-900/40 border border-blue-500/30 p-4 rounded-xl text-left transition-all"
              >
                <div className="bg-blue-500 p-2 rounded-lg text-white"><Eye className="w-5 h-5"/></div>
                <div>
                  <strong className="block text-blue-200">Gatilho: Ver Jogador</strong>
                  <span className="text-xs text-blue-400">Faz o NPC começar a perseguir.</span>
                </div>
              </button>
              
              <button 
                onClick={() => triggerTransition("perto do jogador")}
                disabled={activeState !== "q1"}
                className="flex items-center gap-3 bg-rose-900/40 hover:bg-rose-800/60 disabled:opacity-30 disabled:hover:bg-rose-900/40 border border-rose-500/30 p-4 rounded-xl text-left transition-all"
              >
                <div className="bg-rose-500 p-2 rounded-lg text-white"><HeartPulse className="w-5 h-5"/></div>
                <div>
                  <strong className="block text-rose-200">Gatilho: Alcançar Jogador</strong>
                  <span className="text-xs text-rose-400">NPC se aproxima para atacar.</span>
                </div>
              </button>

              <button 
                onClick={() => triggerTransition("jogador foge")}
                disabled={activeState !== "q2"}
                className="flex items-center gap-3 bg-amber-900/40 hover:bg-amber-800/60 disabled:opacity-30 disabled:hover:bg-amber-900/40 border border-amber-500/30 p-4 rounded-xl text-left transition-all"
              >
                <div className="bg-amber-500 p-2 rounded-lg text-white"><Footprints className="w-5 h-5"/></div>
                <div>
                  <strong className="block text-amber-200">Gatilho: Jogador Foge</strong>
                  <span className="text-xs text-amber-400">Volta a perseguir se distanciar.</span>
                </div>
              </button>

              <button 
                onClick={() => triggerTransition("perder de vista")}
                disabled={activeState !== "q1"}
                className="flex items-center gap-3 bg-emerald-900/40 hover:bg-emerald-800/60 disabled:opacity-30 disabled:hover:bg-emerald-900/40 border border-emerald-500/30 p-4 rounded-xl text-left transition-all"
              >
                <div className="bg-emerald-500 p-2 rounded-lg text-white"><Footprints className="w-5 h-5"/></div>
                <div>
                  <strong className="block text-emerald-200">Gatilho: Perder de vista</strong>
                  <span className="text-xs text-emerald-400">Volta para o posto de Patrulha.</span>
                </div>
              </button>
              
              <button 
                onClick={() => triggerTransition("jogador derrotado")}
                disabled={activeState !== "q2"}
                className="flex items-center gap-3 bg-slate-700/40 hover:bg-slate-700/60 disabled:opacity-30 disabled:hover:bg-slate-700/40 border border-slate-500/30 p-4 rounded-xl text-left transition-all"
              >
                <div className="bg-slate-500 p-2 rounded-lg text-white"><Skull className="w-5 h-5"/></div>
                <div>
                  <strong className="block text-slate-200">Gatilho: Jogador morre</strong>
                  <span className="text-xs text-slate-400">Vitória do inimigo, volta à patrulha.</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-6 shadow-inner flex flex-col items-center justify-center min-h-[200px] relative overflow-hidden group">
             {/* Scene Background Elements */}
             <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 to-slate-900/80 pointer-events-none"></div>
             
             {/* Status Badge */}
             <div className="absolute top-4 left-4 bg-slate-800 border border-slate-700 text-xs px-2 py-1 rounded text-slate-400 font-mono">
                System.AI.State = {activeState}
             </div>

             {/* Dynamic Pixel Art Sprite */}
             <div className="relative z-10 scale-150 transform transition-transform group-hover:scale-125">
               {activeState === "q0" && <div className="w-16 h-16 sprite-6 pixelated" style={{ backgroundImage: "url('/sprites/1 Pink_Monster/Pink_Monster_Walk_6.png')" }} />}
               {activeState === "q1" && <div className="w-16 h-16 sprite-6 pixelated" style={{ backgroundImage: "url('/sprites/1 Pink_Monster/Pink_Monster_Run_6.png')" }} />}
               {activeState === "q2" && <div className="w-16 h-16 sprite-4 pixelated" style={{ backgroundImage: "url('/sprites/1 Pink_Monster/Pink_Monster_Attack1_4.png')" }} />}
             </div>
             
             {/* Ground */}
             <div className="absolute bottom-8 w-64 h-2 bg-gradient-to-r from-transparent via-slate-800 to-transparent blur-sm rounded-full"></div>
          </div>

          <div className="flex-1 min-h-[300px] w-full bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden relative shadow-inner">
            <GraphCanvas initialNodes={nodes} initialEdges={edges} />
          </div>
        </div>
      </div>
    </div>
  );
}
