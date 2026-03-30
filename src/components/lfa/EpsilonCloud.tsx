import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, Zap, RotateCcw } from 'lucide-react';

interface NodeDef {
  id: string;
  x: number;
  y: number;
  label: string;
  epsilonPaths: string[]; // IDs of nodes reachable via epsilon
}

const NODES: NodeDef[] = [
  { id: 'q0', x: 20, y: 50, label: 'q0', epsilonPaths: ['q1', 'q4'] },
  { id: 'q1', x: 40, y: 20, label: 'q1', epsilonPaths: ['q2'] },
  { id: 'q2', x: 60, y: 20, label: 'q2', epsilonPaths: ['q3'] },
  { id: 'q3', x: 80, y: 20, label: 'q3 (F)', epsilonPaths: [] },
  { id: 'q4', x: 40, y: 80, label: 'q4', epsilonPaths: ['q5'] },
  { id: 'q5', x: 60, y: 80, label: 'q5', epsilonPaths: [] },
  { id: 'q6', x: 80, y: 80, label: 'q6 (F)', epsilonPaths: [] },
];

export function EpsilonCloud() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [cloudSet, setCloudSet] = useState<Set<string>>(new Set());

  // Calculates epsilon closure using BFS
  const triggerClosure = (startNodeId: string) => {
    setActiveNode(startNodeId);
    
    setTimeout(() => {
        const closure = new Set<string>();
        const queue = [startNodeId];
        
        while (queue.length > 0) {
            const current = queue.shift()!;
            if (!closure.has(current)) {
                closure.add(current);
                const node = NODES.find(n => n.id === current);
                if (node) {
                    node.epsilonPaths.forEach(neighbor => {
                        if (!closure.has(neighbor)) {
                            queue.push(neighbor);
                        }
                    });
                }
            }
        }
        
        setCloudSet(closure);
    }, 400); // Small visual delay to show the spark first
  };

  const reset = () => {
    setActiveNode(null);
    setCloudSet(new Set());
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 font-mono">
      <div className="text-center">
         <h4 className="text-fuchsia-400 font-bold mb-2 flex items-center justify-center gap-2">
            <Cloud className="w-5 h-5" /> Simulador de Fecho-&epsilon; (Epsilon Closure)
         </h4>
         <p className="text-slate-400 text-sm max-w-xl">
             Clique em um estado para ver como a "Nuvem de Probabilidade" se expande instantaneamente por todas as setas &epsilon; <b>sem ler nenhuma letra da fita</b>.
         </p>
      </div>

      <div className="w-full max-w-2xl aspect-video bg-slate-950 border-2 border-slate-800 rounded-3xl relative overflow-hidden shadow-2xl">
         
         {/* Background Grid */}
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />

         {/* Edges */}
         <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Draw lines for epsilon paths */}
            {NODES.map(node => (
                node.epsilonPaths.map(targetId => {
                    const target = NODES.find(n => n.id === targetId);
                    if (!target) return null;
                    
                    const isHighlighted = cloudSet.has(node.id) && cloudSet.has(targetId);
                    
                    return (
                        <g key={`${node.id}-${targetId}`}>
                            <line 
                                x1={`${node.x}%`} y1={`${node.y}%`} 
                                x2={`${target.x}%`} y2={`${target.y}%`} 
                                stroke={isHighlighted ? '#d946ef' : '#334155'} 
                                strokeWidth="3" 
                                strokeDasharray="5,5"
                                className={isHighlighted ? 'animate-pulse' : ''}
                            />
                            {/* Midpoint arrow label */}
                            <text 
                                x={`${(node.x + target.x) / 2}%`} 
                                y={`${(node.y + target.y) / 2 - 2}%`} 
                                fill={isHighlighted ? '#f0abfc' : '#475569'}
                                fontSize="14"
                                textAnchor="middle"
                                className="font-bold"
                            >
                                &epsilon;
                            </text>
                        </g>
                    )
                })
            ))}
            
            {/* Draw one NON-epsilon edge just to prove the cloud stops there */}
            <g>
                <line x1="60%" y1="80%" x2="80%" y2="80%" stroke="#334155" strokeWidth="2" />
                <text x="70%" y="78%" fill="#64748b" fontSize="12" textAnchor="middle">letra 'A'</text>
            </g>
         </svg>

         {/* Nodes */}
         {NODES.map(node => {
             const isInCloud = cloudSet.has(node.id);
             const isStart = activeNode === node.id;
             
             return (
                 <motion.button
                     key={node.id}
                     onClick={() => triggerClosure(node.id)}
                     className={`absolute w-12 h-12 -ml-6 -mt-6 rounded-full flex items-center justify-center font-bold text-sm z-10 transition-colors duration-500 shadow-lg border-2 ${isInCloud ? 'bg-fuchsia-600 border-fuchsia-300 text-white shadow-[0_0_30px_rgba(217,70,239,0.8)]' : 'bg-slate-800 border-slate-600 text-slate-400 hover:border-slate-400'}`}
                     style={{ left: `${node.x}%`, top: `${node.y}%` }}
                     whileHover={{ scale: 1.1 }}
                     whileTap={{ scale: 0.9 }}
                 >
                     {node.label}
                     
                     {/* Cloud Wave Animation */}
                     <AnimatePresence>
                         {isInCloud && (
                             <motion.div 
                                initial={{ scale: 0, opacity: 0.8 }}
                                animate={{ scale: 3, opacity: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1, ease: 'easeOut' }}
                                className="absolute inset-0 bg-fuchsia-500 rounded-full pointer-events-none"
                             />
                         )}
                     </AnimatePresence>
                     
                     {/* Origin Spark */}
                     {isStart && (
                         <div className="absolute -top-6 text-fuchsia-300 animate-bounce">
                             <Zap className="w-5 h-5" fill="currentColor" />
                         </div>
                     )}
                 </motion.button>
             )
         })}
      </div>

      <div className="flex gap-4 items-center">
         <button onClick={reset} className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <RotateCcw className="w-4 h-4" /> Resetar
         </button>
         
         <div className="bg-fuchsia-950/30 border border-fuchsia-500/30 px-6 py-2 rounded-xl text-fuchsia-300">
             Fecho-&epsilon; = {'{'} {Array.from(cloudSet).join(', ')} {'}'}
         </div>
      </div>
    </div>
  );
}
