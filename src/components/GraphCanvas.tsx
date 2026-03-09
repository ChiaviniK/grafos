import { useState, useRef, useEffect } from "react";
import type { NodeData, EdgeData } from "../types";
import { cn } from "../lib/utils";

interface GraphCanvasProps {
  initialNodes: NodeData[];
  initialEdges: EdgeData[];
  interactive?: boolean;
}

export function GraphCanvas({
  initialNodes,
  initialEdges,
  interactive = true,
}: GraphCanvasProps) {
  const [nodes, setNodes] = useState<NodeData[]>(initialNodes);
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    setNodes(initialNodes);
  }, [initialNodes]);

  const handlePointerDown = (e: React.PointerEvent, id: string) => {
    if (!interactive) return;
    e.stopPropagation();
    setDraggingNodeId(id);
    (e.target as Element).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingNodeId || !interactive || !svgRef.current) return;

    const svg = svgRef.current;
    let point = svg.createSVGPoint();
    point.x = e.clientX;
    point.y = e.clientY;
    
    const CTM = svg.getScreenCTM();
    if (CTM) {
      point = point.matrixTransform(CTM.inverse());
      
      setNodes((prev) =>
        prev.map((n) =>
          n.id === draggingNodeId
            ? { ...n, x: point.x, y: point.y }
            : n
        )
      );
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (draggingNodeId) {
       (e.target as Element).releasePointerCapture(e.pointerId);
       setDraggingNodeId(null);
    }
  };

  return (
    <div className="absolute inset-0 cursor-crosshair touch-none">
      <svg
        ref={svgRef}
        className="w-full h-full absolute inset-0"
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="22" 
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
          </marker>
          <marker
            id="arrowhead-highlight"
            markerWidth="10"
            markerHeight="7"
            refX="22" 
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
          </marker>
        </defs>

        {/* Edges */}
        {initialEdges.map((edge) => {
          const sourceNode = nodes.find((n) => n.id === edge.source);
          const targetNode = nodes.find((n) => n.id === edge.target);

          if (!sourceNode || !targetNode) return null;

          return (
            <g key={edge.id}>
              <line
                x1={sourceNode.x}
                y1={sourceNode.y}
                x2={targetNode.x}
                y2={targetNode.y}
                strokeWidth={edge.highlighted ? 4 : 3}
                className={cn(
                  "transition-all duration-300",
                  edge.highlighted ? "stroke-emerald-500" : "stroke-slate-500"
                )}
                markerEnd={
                  edge.directed
                    ? edge.highlighted
                      ? "url(#arrowhead-highlight)"
                      : "url(#arrowhead)"
                    : undefined
                }
              />
              {edge.label && (
                <text
                  x={(sourceNode.x + targetNode.x) / 2}
                  y={(sourceNode.y + targetNode.y) / 2 - 10}
                  textAnchor="middle"
                  className={cn(
                    "text-sm font-semibold transition-colors duration-300 select-none",
                    edge.highlighted ? "fill-emerald-400" : "fill-slate-300"
                  )}
                >
                  {edge.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => (
          <g
            key={node.id}
            transform={`translate(${node.x}, ${node.y})`}
            onPointerDown={(e) => handlePointerDown(e, node.id)}
            className={cn(
              "transition-transform",
              interactive ? "cursor-grab active:cursor-grabbing" : ""
            )}
            style={{ touchAction: 'none' }}
          >
            <circle
              r="20"
              className={cn(
                "stroke-2 transition-colors duration-300",
                draggingNodeId === node.id 
                  ? "stroke-blue-400 fill-blue-900/50" 
                  : node.highlighted
                    ? "stroke-emerald-500 fill-emerald-900/40"
                    : "stroke-blue-500 fill-slate-800 hover:stroke-blue-400"
              )}
            />
            <text
              textAnchor="middle"
              dominantBaseline="central"
              className="fill-slate-100 font-semibold text-sm select-none"
              pointerEvents="none"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
