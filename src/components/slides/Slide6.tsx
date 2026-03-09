import { useState, useRef } from "react";
import { GraphCanvas } from "../GraphCanvas";
import type { NodeData, EdgeData } from "../../types";
import { Play, RotateCcw, CheckCircle, XCircle } from "lucide-react";

// Same Automaton as Slide 3: Ends in "ab"
const INITIAL_NODES: NodeData[] = [
  { id: "q0", label: "q0", x: 150, y: 200 },
  { id: "q1", label: "q1", x: 350, y: 150 },
  { id: "q2", label: "q2", x: 550, y: 200 },
];

const BASE_EDGES: EdgeData[] = [
  { id: "e1", source: "q0", target: "q0", directed: true, label: "b" },
  { id: "e2", source: "q0", target: "q1", directed: true, label: "a" },
  { id: "e3", source: "q1", target: "q1", directed: true, label: "a" },
  { id: "e4", source: "q1", target: "q2", directed: true, label: "b" },
  { id: "e5", source: "q2", target: "q1", directed: true, label: "a" },
  { id: "e6", source: "q2", target: "q0", directed: true, label: "b" },
];

export function Slide6() {
  const [activeState, setActiveState] = useState<string>("q0");
  const [highlightedEdge, setHighlightedEdge] = useState<string | null>(null);
  
  const [wordInput, setWordInput] = useState("abb");
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
  };

  const advanceStep = (currentState: string, index: number) => {
    if (index >= wordInput.length) {
      // Word finished, check if in final state
      setSimulationResult(currentState === "q2" ? "accepted" : "rejected");
      setIsPlaying(false);
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
        
        timeoutRef.current = window.setTimeout(() => {
          advanceStep(validTransition.target, index + 1);
          setCurrentIndex(index + 1);
        }, 600);
      }, 400);
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
    highlighted: n.id === activeState || n.id === "q2" // Keep q2 visually distinct as final
  }));

  const edges = BASE_EDGES.map(e => ({
    ...e,
    highlighted: e.id === highlightedEdge
  }));

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      <div className="flex flex-col mb-4">
        <h2 className="text-3xl font-bold mb-2 tracking-tight">6. Simulação de Cadeias (Palavras)</h2>
        <p className="text-slate-300">
          Vamos testar palavras no Autômato que <strong className="text-white">termina em "ab"</strong>. 
          O autômato aceita a palavra se, ao fim da fita, ele parar no estado <strong>q2</strong>.
        </p>
      </div>

      <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 shadow-sm mb-6 flex flex-col md:flex-row gap-6 items-center">
        <div className="flex-1 w-full">
          <label className="block text-sm font-medium text-slate-400 mb-2">Digite uma palavra (apenas a, b):</label>
          <div className="flex gap-3">
            <input 
              type="text" 
              value={wordInput}
              onChange={(e) => { setWordInput(e.target.value.toLowerCase().replace(/[^ab]/g, '')); resetSimulation(); }}
              className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white font-mono tracking-widest focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="Ex: abba"
              disabled={isPlaying}
            />
            <button
              onClick={startSimulation}
              disabled={isPlaying || wordInput.length === 0}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-all"
            >
              <Play className="w-4 h-4" />
              Simular
            </button>
            <button
              onClick={resetSimulation}
              className="bg-slate-700 hover:bg-slate-600 text-slate-300 px-4 py-2 rounded-lg font-medium transition-all"
              title="Resetar"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 w-full shrink-0 flex items-center justify-center">
          <div className="bg-slate-900 w-full p-4 rounded-lg border border-slate-700 flex flex-col items-center">
             <span className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-2">Fita de Entrada:</span>
             <div className="flex gap-1 justify-center flex-wrap">
               {wordInput.split('').map((char, i) => (
                 <div 
                   key={i} 
                   className={`w-10 h-12 flex flex-col items-center justify-center text-xl font-bold font-mono rounded border transition-all duration-300
                    ${i < currentIndex ? 'bg-slate-800 text-slate-600 border-slate-700 opacity-50' : 
                      i === currentIndex ? 'bg-blue-500/20 text-blue-400 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)] scale-110' : 
                      'bg-slate-800 text-slate-300 border-slate-600'}
                   `}
                 >
                   {char}
                 </div>
               ))}
               {wordInput.length === 0 && <span className="text-slate-600 animate-pulse text-sm my-3">Digite algo...</span>}
             </div>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-[300px] w-full bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden relative shadow-inner">
        <GraphCanvas initialNodes={nodes} initialEdges={edges} />
        
        {simulationResult && (
          <div className="absolute inset-x-0 bottom-8 flex justify-center animate-in slide-in-from-bottom-5">
            <div className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-md border ${
              simulationResult === 'accepted' 
                ? 'bg-emerald-900/80 border-emerald-500/50 text-emerald-100' 
                : 'bg-rose-900/80 border-rose-500/50 text-rose-100'
            }`}>
              {simulationResult === 'accepted' ? <CheckCircle className="w-8 h-8 text-emerald-400" /> : <XCircle className="w-8 h-8 text-rose-400" />}
              <div className="flex flex-col">
                <span className="font-bold text-lg">
                  {simulationResult === 'accepted' ? "Palavra Aceita!" : "Palavra Rejeitada!"}
                </span>
                <span className="text-sm opacity-80">
                  {simulationResult === 'accepted' 
                    ? "O autômato parou num estado final (q2)." 
                    : `O autômato parou em ${activeState}, que não é final.`}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
