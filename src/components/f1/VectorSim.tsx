import React, { useState, useRef } from 'react';
import { Plus, Info, RotateCcw } from 'lucide-react';

interface Vector {
  id: string;
  x: number;
  y: number;
  color: string;
  label: string;
}

export const VectorSim: React.FC = () => {
  const [vectors, setVectors] = useState<Vector[]>([
    { id: 'a', x: 100, y: 0, color: '#3b82f6', label: 'A' },
    { id: 'b', x: 0, y: -100, color: '#10b981', label: 'B' },
  ]);
  const [showResultant, setShowResultant] = useState(false);
  const [isDragging, setIsDragging] = useState<string | null>(null);
  
  const canvasRef = useRef<HTMLDivElement>(null);
  const centerX = 150;
  const centerY = 150;
  const scale = 1;

  const resultant = vectors.reduce(
    (acc, v) => ({ x: acc.x + v.x, y: acc.y + v.y }),
    { x: 0, y: 0 }
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const nx = (e.clientX - rect.left - centerX) / scale;
      const ny = (e.clientY - rect.top - centerY) / scale;
      
      setVectors(prev => prev.map(v => 
        v.id === isDragging ? { ...v, x: Math.round(nx), y: Math.round(ny) } : v
      ));
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
      {/* Canvas Area */}
      <div className="flex-1">
        <div 
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseUp={() => setIsDragging(null)}
          onMouseLeave={() => setIsDragging(null)}
          className="relative w-full aspect-square bg-slate-950 rounded-xl border border-slate-800 overflow-hidden cursor-crosshair select-none"
          style={{ maxWidth: '400px', margin: '0 auto' }}
        >
          {/* Grid Lines */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <React.Fragment key={i}>
                <div className="absolute w-full h-px bg-slate-500" style={{ top: `${i * 10}%` }} />
                <div className="absolute h-full w-px bg-slate-500" style={{ left: `${i * 10}%` }} />
              </React.Fragment>
            ))}
            {/* Axis */}
            <div className="absolute top-1/2 w-full h-0.5 bg-slate-400 opacity-50" />
            <div className="absolute left-1/2 h-full w-0.5 bg-slate-400 opacity-50" />
          </div>

          {/* Vectors */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <marker id="arrowhead-blue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
              </marker>
              <marker id="arrowhead-green" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
              </marker>
              <marker id="arrowhead-result" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                <polygon points="0 0, 10 5, 0 10" fill="#f59e0b" />
              </marker>
            </defs>

            {/* Individual Vectors */}
            {vectors.map(v => (
              <line
                key={v.id}
                x1={centerX} y1={centerY}
                x2={centerX + v.x} y2={centerY + v.y}
                stroke={v.color} strokeWidth="3"
                markerEnd={`url(#arrowhead-${v.color === '#3b82f6' ? 'blue' : 'green'})`}
              />
            ))}

            {/* Resultant Component (Tip-to-Tail Visualization) */}
            {showResultant && (
              <>
                <line
                  x1={centerX + vectors[0].x} y1={centerY + vectors[0].y}
                  x2={centerX + resultant.x} y2={centerY + resultant.y}
                  stroke={vectors[1].color} strokeWidth="2" strokeDasharray="4"
                  opacity="0.5"
                />
                <line
                  x1={centerX} y1={centerY}
                  x2={centerX + resultant.x} y2={centerY + resultant.y}
                  stroke="#f59e0b" strokeWidth="4"
                  markerEnd="url(#arrowhead-result)"
                />
              </>
            )}
          </svg>

          {/* Grabbable points at the tips */}
          {vectors.map(v => (
            <div
              key={v.id}
              onMouseDown={() => setIsDragging(v.id)}
              className="absolute w-6 h-6 -ml-3 -mt-3 rounded-full cursor-grab active:cursor-grabbing z-20"
              style={{ 
                left: `${centerX + v.x}px`, 
                top: `${centerY + v.y}px`,
                backgroundColor: `${v.color}44`,
                border: `2px solid ${v.color}`
              }}
            />
          ))}

          {/* Labels */}
          {vectors.map(v => (
            <div 
              key={`label-${v.id}`}
              className="absolute text-xs font-bold pointer-events-none"
              style={{ left: centerX + v.x + 10, top: centerY + v.y - 10, color: v.color }}
            >
              vec({v.label})
            </div>
          ))}
          {showResultant && (
            <div 
              className="absolute text-xs font-bold text-amber-500 pointer-events-none"
              style={{ left: centerX + resultant.x + 10, top: centerY + resultant.y + 10 }}
            >
              vec(R)
            </div>
          )}
        </div>
      </div>

      {/* Info Panel */}
      <div className="w-full lg:w-64 space-y-6">
        <div>
           <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
            <Plus className="w-4 h-4" /> Componentes
           </h3>
           <div className="space-y-4">
              {vectors.map(v => (
                <div key={v.id} className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold" style={{ color: v.color }}>Vetor {v.label}</span>
                    <span className="text-[10px] text-slate-500 font-mono">Mod: {Math.round(Math.sqrt(v.x**2 + v.y**2))}</span>
                  </div>
                  <div className="flex gap-2 text-[10px] font-mono">
                    <span className="bg-slate-900 px-2 py-1 rounded">X: {v.x}</span>
                    <span className="bg-slate-900 px-2 py-1 rounded">Y: {v.y}</span>
                  </div>
                </div>
              ))}
           </div>
        </div>

        <div className="pt-4 border-t border-slate-800">
          <button 
            onClick={() => setShowResultant(!showResultant)}
            className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${
              showResultant ? 'bg-amber-600 text-white shadow-[0_0_15px_rgba(245,158,11,0.3)]' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            {showResultant ? 'Ocultar Resultante' : 'Calcular Resultante'}
          </button>
          
          <button 
            onClick={() => {
              setVectors([
                { id: 'a', x: 100, y: 0, color: '#3b82f6', label: 'A' },
                { id: 'b', x: 0, y: -100, color: '#10b981', label: 'B' },
              ]);
              setShowResultant(false);
            }}
            className="w-full mt-2 py-2 text-[10px] uppercase font-bold text-slate-500 hover:text-slate-300 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-3 h-3" /> Resetar Simulação
          </button>
        </div>

        <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
          <p className="text-[10px] text-blue-400 leading-relaxed italic">
            <Info className="inline w-3 h-3 mr-1" />
            Arraste as extremidades dos vetores para alterar as componentes X e Y. A resultante é a soma vetorial (A + B).
          </p>
        </div>
      </div>
    </div>
  );
};
