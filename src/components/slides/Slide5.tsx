import { useState } from "react";
import { GraphCanvas } from "../GraphCanvas";
import type { NodeData, EdgeData } from "../../types";
import { Swords, Target } from "lucide-react";

// The Final State (q2) usually has a double circle in formal automata.
// For now, we visually distinguish it in the GraphCanvas via CSS.
const INITIAL_NODES: NodeData[] = [
  { id: "e0", label: "Vida 2/2", x: 150, y: 150 },
  { id: "e1", label: "Vida 1/2", x: 350, y: 150 },
  { id: "e2", label: "Morto (F)", x: 550, y: 150 },
];

const FULL_EDGES: EdgeData[] = [
  { id: "e1", source: "e0", target: "e1", directed: true, label: "recebe [Golpe]" },
  { id: "e2", source: "e1", target: "e2", directed: true, label: "recebe [Golpe]" },
];

export function Slide5() {
  const [activeState, setActiveState] = useState<string>("e0");
  const [highlightedEdge, setHighlightedEdge] = useState<string | null>(null);

  const triggerAttack = () => {
    const validEdge = FULL_EDGES.find(e => e.source === activeState && e.label === "recebe [Golpe]");
    if (validEdge) {
      setHighlightedEdge(validEdge.id);
      setTimeout(() => {
        setActiveState(validEdge.target);
        setHighlightedEdge(null);
      }, 500);
    }
  };

  const resetFight = () => {
      setActiveState("e0");
  };

  const nodes = INITIAL_NODES.map(n => ({
    ...n,
    highlighted: n.id === activeState || n.id === "e2" // Highlight final state to show it's special
  }));

  const edges = FULL_EDGES.map(e => ({
    ...e,
    highlighted: e.id === highlightedEdge
  }));

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      <div className="flex flex-col mb-4">
        <h2 className="text-3xl font-bold mb-2 tracking-tight">5. Analogia 2.4: O Estado de Aceitação</h2>
        <p className="text-slate-300">
          Quando programamos uma máquina ou linguagem, ela precisa ter um <strong>Fim</strong>. 
          Na teoria de autômatos chamamos de <strong>Estado Final (ou de Aceitação)</strong>, geralmente desenhado com dois círculos. No jogo, é alcançar o objetivo (matar o chefe!).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 mb-8">
        
        {/* GAME COLUMN */}
        <div className="flex flex-col gap-4">
          <div className="bg-slate-900 border-2 border-slate-700 rounded-2xl p-6 shadow-inner flex flex-col items-center justify-center min-h-[220px] relative overflow-hidden group">
             {/* Scene Background */}
             <div className="absolute inset-0 bg-gradient-to-b from-red-950/20 to-slate-900/80 pointer-events-none"></div>
             
             {/* Boss HP Bar */}
             <div className="absolute top-4 left-0 right-0 flex justify-center">
                 <div className="w-1/2 h-4 bg-slate-800 border border-slate-600 rounded-full overflow-hidden">
                     <div className={`h-full transition-all duration-300 ${activeState === 'e0' ? 'w-full bg-emerald-500' : activeState === 'e1' ? 'w-1/2 bg-amber-500' : 'w-0 bg-red-500'}`}></div>
                 </div>
             </div>

             {/* Dynamic Pixel Art Sprite (Boss) */}
             <div className={`relative z-10 scale-150 transform transition-transform`}>
               {activeState === "e0" && <div className="w-16 h-16 sprite-4 pixelated" style={{ backgroundImage: "url('/sprites/2 Owlet_Monster/Owlet_Monster_Idle_4.png')" }} />}
               {activeState === "e1" && <div className="w-16 h-16 sprite-4 pixelated drop-shadow-md" style={{ backgroundImage: "url('/sprites/2 Owlet_Monster/Owlet_Monster_Hurt_4.png')" }} />}
               {activeState === "e2" && <div className="w-16 h-16 sprite-8 pixelated opacity-50 grayscale" style={{ backgroundImage: "url('/sprites/2 Owlet_Monster/Owlet_Monster_Death_8.png')" }} />}
             </div>
             
             {/* Floor */}
             <div className="absolute bottom-8 w-64 h-2 bg-gradient-to-r from-transparent via-red-900/50 to-transparent blur-[2px] rounded-full"></div>
          </div>

          <div className="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-6 shadow-sm flex flex-col items-center flex-1 justify-center relative">
            
            {activeState === "e2" && (
                <div className="absolute inset-0 bg-emerald-900/30 flex items-center justify-center rounded-2xl z-20 backdrop-blur-sm animate-in fade-in zoom-in">
                    <div className="text-center">
                        <h2 className="text-4xl text-emerald-400 font-bold mb-4 drop-shadow-lg">PALAVRA ACEITA!</h2>
                        <button onClick={resetFight} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-full font-bold shadow-lg">Reiniciar Nível</button>
                    </div>
                </div>
            )}

            <h3 className="text-xl font-semibold mb-4 text-slate-100 flex items-center gap-2">
               O Herói ataca com a string: `[Golpe, Golpe]`
            </h3>
            
            <button 
              onClick={triggerAttack}
              disabled={activeState === "e2"}
              className={`flex items-center gap-3 bg-red-900/40 hover:bg-red-800/60 disabled:opacity-0 disabled:hover:bg-red-900/40 border-2 border-red-500/50 p-4 rounded-xl text-left transition-all group scale-110 active:scale-95`}
            >
              <div className="bg-red-500 group-hover:bg-red-400 p-3 rounded-lg text-white group-hover:animate-pulse transition-colors"><Swords className="w-8 h-8"/></div>
              <div>
                <strong className="block text-red-100 text-xl font-black tracker-wider uppercase">Atacar Chefe</strong>
              </div>
            </button>
          </div>
        </div>

        {/* GRAPH COLUMN */}
        <div className="flex flex-col gap-4">
           <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6">
                <h3 className="text-xl font-bold text-emerald-400 mb-2 flex items-center gap-2"><Target className="w-5 h-5"/> Objetivo da Máquina</h3>
                <p className="text-slate-300">
                    Na linguagem dos videogames, vencer a fase é chegar na "tela de vitória". Na teoria de autômatos, dizemos que a <i>máquina consumiu as entradas e parou em um <strong>estado de aceitação</strong>.</i>
                </p>
           </div>
           
           <div className="flex-1 min-h-[300px] w-full bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden relative shadow-inner">
            <GraphCanvas initialNodes={nodes} initialEdges={edges} />
          </div>
        </div>
        
      </div>
    </div>
  );
}
