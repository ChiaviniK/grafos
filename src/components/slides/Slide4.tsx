import { useState } from "react";
import { GraphCanvas } from "../GraphCanvas";
import type { NodeData, EdgeData } from "../../types";
import { RadioTower } from "lucide-react";

// --- STATE MACHINE: LEADER (Owlet) ---
const LEADER_NODES: NodeData[] = [
  { id: "L0", label: "Descansando", x: 100, y: 150 },
  { id: "L1", label: "Alerta", x: 350, y: 150 },
  { id: "L2", label: "Lutando", x: 600, y: 150 },
];

const LEADER_EDGES: EdgeData[] = [
  { id: "le1", source: "L0", target: "L1", directed: true, label: "barulho" },
  { id: "le2", source: "L1", target: "L2", directed: true, label: "ver herói" },
  { id: "le3", source: "L2", target: "L0", directed: true, label: "herói foge" },
];

// --- STATE MACHINE: MINION (Pink) ---
const MINION_NODES: NodeData[] = [
  { id: "M0", label: "Trabalhando", x: 100, y: 150 },
  { id: "M1", label: "Atenção", x: 350, y: 150 },
  { id: "M2", label: "Protegendo Lider", x: 600, y: 150 },
];

const MINION_EDGES: EdgeData[] = [
  { id: "me1", source: "M0", target: "M1", directed: true, label: "grito (Alerta)" },
  { id: "me2", source: "M1", target: "M2", directed: true, label: "grito (Lutando)" },
  { id: "me3", source: "M2", target: "M0", directed: true, label: "grito (Descansando)" },
];

export function Slide4() {
  const [leaderState, setLeaderState] = useState<string>("L0");
  const [minionState, setMinionState] = useState<string>("M0");
  const [highlightedLeaderEdge, setHighlightedLeaderEdge] = useState<string | null>(null);
  const [highlightedMinionEdge, setHighlightedMinionEdge] = useState<string | null>(null);
  const [signalActive, setSignalActive] = useState(false);

  const triggerLeaderTransition = (trigger: string) => {
    const validEdge = LEADER_EDGES.find(e => e.source === leaderState && e.label === trigger);
    if (validEdge) {
      setHighlightedLeaderEdge(validEdge.id);
      
      setTimeout(() => {
        setLeaderState(validEdge.target);
        setHighlightedLeaderEdge(null);
        setSignalActive(true); // Broadcast signal to minion

        // Logic for minion responding to leader's new state
        let minionTrigger = "";
        if (validEdge.target === "L1") minionTrigger = "grito (Alerta)";
        if (validEdge.target === "L2") minionTrigger = "grito (Lutando)";
        if (validEdge.target === "L0") minionTrigger = "grito (Descansando)";

        setTimeout(() => {
            const validMinionEdge = MINION_EDGES.find(e => e.source === minionState && e.label === minionTrigger);
            if (validMinionEdge) {
                setHighlightedMinionEdge(validMinionEdge.id);
                setTimeout(() => {
                    setMinionState(validMinionEdge.target);
                    setHighlightedMinionEdge(null);
                    setSignalActive(false);
                }, 400);
            } else {
                setSignalActive(false);
            }
        }, 500);

      }, 400);
    }
  };

  const lNodes = LEADER_NODES.map(n => ({ ...n, highlighted: n.id === leaderState }));
  const lEdges = LEADER_EDGES.map(e => ({ ...e, highlighted: e.id === highlightedLeaderEdge }));
  
  const mNodes = MINION_NODES.map(n => ({ ...n, highlighted: n.id === minionState }));
  const mEdges = MINION_EDGES.map(e => ({ ...e, highlighted: e.id === highlightedMinionEdge }));

  return (
    <div className="flex flex-col min-h-[100%] flex-1 animate-in fade-in duration-500">
      <div className="flex flex-col mb-4">
        <h2 className="text-3xl font-bold mb-2 tracking-tight">4. Analogia 2.3: Interação entre Múltiplos Grafos</h2>
        <p className="text-slate-300">
          Problemas complexos (ou jogos) raramente têm um grafo só. Normalmente, temos dezenas de <strong>Máquinas de Estados Operando Paralelamente</strong> 
          que enviam <i>"sinais"</i> umas para as outras. 
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 mb-8">
        
        {/* LEADER COLUMN */}
        <div className="flex flex-col gap-4">
          <div className="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-4 shadow-sm flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-2 text-rose-400 flex items-center gap-2">
               Grafo 1: O Chefe (Owlet)
            </h3>
            
            <div className={`relative h-24 w-full bg-slate-900 rounded-xl overflow-hidden border ${signalActive ? 'border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.5)]' : 'border-slate-700'}`}>
                {/* Sprite */}
                <div className="absolute bottom-2 left-1/2 -ml-8 w-16 h-16 transform scale-150">
                    {leaderState === "L0" && <div className="w-full h-full sprite-4 pixelated" style={{ backgroundImage: "url('/sprites/2 Owlet_Monster/Owlet_Monster_Idle_4.png')" }} />}
                    {leaderState === "L1" && <div className="w-full h-full sprite-6 pixelated" style={{ backgroundImage: "url('/sprites/2 Owlet_Monster/Owlet_Monster_Run_6.png')" }} />}
                    {leaderState === "L2" && <div className="w-full h-full sprite-4 pixelated" style={{ backgroundImage: "url('/sprites/2 Owlet_Monster/Owlet_Monster_Attack1_4.png')" }} />}
                </div>
            </div>

            <div className="flex gap-2 mt-4 w-full justify-center">
                <button onClick={() => triggerLeaderTransition("barulho")} disabled={leaderState !== "L0"} className="bg-rose-900/40 hover:bg-rose-800/60 disabled:opacity-30 border border-rose-500/30 px-3 py-2 rounded text-rose-200 text-sm">Ouvir Barulho</button>
                <button onClick={() => triggerLeaderTransition("ver herói")} disabled={leaderState !== "L1"} className="bg-rose-900/40 hover:bg-rose-800/60 disabled:opacity-30 border border-rose-500/30 px-3 py-2 rounded text-rose-200 text-sm">Ver Herói</button>
                <button onClick={() => triggerLeaderTransition("herói foge")} disabled={leaderState !== "L2"} className="bg-rose-900/40 hover:bg-rose-800/60 disabled:opacity-30 border border-rose-500/30 px-3 py-2 rounded text-rose-200 text-sm">Herói Foge</button>
            </div>
          </div>

          <div className="flex-1 min-h-[220px] w-full bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden relative">
            <GraphCanvas initialNodes={lNodes} initialEdges={lEdges} />
          </div>
        </div>

        {/* MINION COLUMN */}
        <div className="flex flex-col gap-4">
          <div className="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-4 shadow-sm flex flex-col items-center relative">
            
            {/* Communication Arrow */}
            <div className={`absolute top-1/2 -left-10 transform -translate-y-1/2 flex items-center transition-opacity duration-300 ${signalActive ? 'opacity-100' : 'opacity-0'}`}>
               <RadioTower className="w-8 h-8 text-amber-400 animate-pulse" />
            </div>

            <h3 className="text-lg font-semibold mb-2 text-pink-400 flex items-center gap-2">
               Grafo 2: O Lacaio (Pink)
            </h3>
            
            <div className="relative h-24 w-full bg-slate-900 rounded-xl overflow-hidden border border-slate-700">
                {/* Sprite */}
                <div className="absolute bottom-2 left-1/2 -ml-8 w-16 h-16 transform scale-150">
                    {minionState === "M0" && <div className="w-full h-full sprite-6 pixelated" style={{ backgroundImage: "url('/sprites/1 Pink_Monster/Pink_Monster_Push_6.png')" }} />}
                    {minionState === "M1" && <div className="w-full h-full sprite-4 pixelated" style={{ backgroundImage: "url('/sprites/1 Pink_Monster/Pink_Monster_Idle_4.png')" }} />}
                    {minionState === "M2" && <div className="w-full h-full sprite-6 pixelated" style={{ backgroundImage: "url('/sprites/1 Pink_Monster/Pink_Monster_Walk+Attack_6.png')" }} />}
                </div>
            </div>

            <div className="text-center mt-4 text-sm text-slate-400 h-9 flex items-center">
                Este NPC não recebe botões seus. Ele só lê os gatilhos emitidos pela Máquina de Estados do Chefe!
            </div>
          </div>

          <div className="flex-1 min-h-[220px] w-full bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden relative">
            <GraphCanvas initialNodes={mNodes} initialEdges={mEdges} />
          </div>
        </div>
      </div>
    </div>
  );
}
