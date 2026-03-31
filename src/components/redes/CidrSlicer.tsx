import { useState } from 'react';
import { Network, Trash2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TOTAL_IPS = 256; // a /24 network
const BASE_IP = '192.168.10';

interface Department {
  name: string;
  requiredIps: number;
  color: string;
  assignedPrefix: number | null;
  startIndex: number | null;
}

const DEPARTMENTS: Department[] = [
  { name: 'TI', requiredIps: 60, color: 'bg-emerald-500', assignedPrefix: null, startIndex: null },
  { name: 'RH', requiredIps: 30, color: 'bg-fuchsia-500', assignedPrefix: null, startIndex: null },
  { name: 'P2P Link', requiredIps: 2, color: 'bg-amber-500', assignedPrefix: null, startIndex: null }
];

export function CidrSlicer() {
  const [departments, setDepartments] = useState<Department[]>(DEPARTMENTS);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const getSubnetSize = (prefix: number) => Math.pow(2, 32 - prefix);

  // Calculates which blocks are taken by scanning the `departments` state
  const getTakenBlocks = () => {
    const taken: { start: number, end: number, dept: Department }[] = [];
    departments.forEach(d => {
       if (d.startIndex !== null && d.assignedPrefix !== null) {
           const size = getSubnetSize(d.assignedPrefix);
           taken.push({ start: d.startIndex, end: d.startIndex + size - 1, dept: d });
       }
    });
    return taken;
  };

  const assignBlock = (deptIndex: number, prefix: number) => {
    const size = getSubnetSize(prefix);
    const taken = getTakenBlocks();
    
    // Find first available slot
    let foundStart = -1;
    for (let i = 0; i <= TOTAL_IPS - size; i += size) { // Must align to chunk boundary
       const overlap = taken.some(t => Math.max(i, t.start) <= Math.min(i + size - 1, t.end));
       if (!overlap) {
          foundStart = i;
          break;
       }
    }

    if (foundStart !== -1) {
       const newDepts = [...departments];
       newDepts[deptIndex] = { ...newDepts[deptIndex], startIndex: foundStart, assignedPrefix: prefix };
       setDepartments(newDepts);
    } else {
       alert("Espaço insuficiente na rede /24 para este bloco! Limpe algum departamento ou tente um bloco menor.");
    }
  };

  const removeBlock = (deptIndex: number) => {
    const newDepts = [...departments];
    newDepts[deptIndex] = { ...newDepts[deptIndex], startIndex: null, assignedPrefix: null };
    setDepartments(newDepts);
  };

  const isCompleted = departments.every(d => {
     if (d.assignedPrefix === null) return false;
     const size = getSubnetSize(d.assignedPrefix);
     // Network id + broadcast address take 2 IPs.
     const usable = size - 2;
     return usable >= d.requiredIps;
  });

  return (
    <div className="w-full flex flex-col items-center gap-6 font-mono relative">
      <div className="text-center mb-4">
         <h4 className="text-sky-400 font-bold flex items-center justify-center gap-2 text-xl">
            <Network className="w-6 h-6" /> The CIDR Slicer
         </h4>
         <p className="text-slate-400 text-sm max-w-xl">
            Você recebeu o bloco <b>192.168.10.0/24</b> (256 Endereços). Os gerentes pediram IPs específicos para seus setores. <br/>Não desperdice alocando barras /24 pra todo mundo! Use VLSM.
         </p>
      </div>

      {/* Control Panel */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-4">
          {departments.map((dept, idx) => {
              const assigned = dept.assignedPrefix !== null;
              const usable = assigned ? getSubnetSize(dept.assignedPrefix!) - 2 : 0;
              const valid = usable >= dept.requiredIps;
              
              return (
                  <div key={dept.name} className={`bg-slate-900 border-2 rounded-xl p-4 transition-colors ${assigned ? (valid ? 'border-emerald-500/50' : 'border-rose-500/50') : 'border-slate-800'}`}>
                      <div className="flex justify-between items-start mb-2">
                          <div className="font-black text-lg text-white flex items-center gap-2">
                              <span className={`w-3 h-3 rounded-full ${dept.color}`} />
                              {dept.name}
                          </div>
                          {assigned && (
                              <button onClick={() => removeBlock(idx)} className="text-slate-500 hover:text-rose-400">
                                  <Trash2 className="w-4 h-4" />
                              </button>
                          )}
                      </div>
                      <div className="text-sm text-slate-400 mb-4">Requer: <b className="text-white">{dept.requiredIps}</b> IPs úteis</div>
                      
                      {!assigned ? (
                          <div className="grid grid-cols-2 gap-2 text-xs">
                              <button onClick={() => assignBlock(idx, 26)} className="bg-slate-800 hover:bg-slate-700 p-2 rounded text-slate-300">/26 (64 IPs)</button>
                              <button onClick={() => assignBlock(idx, 27)} className="bg-slate-800 hover:bg-slate-700 p-2 rounded text-slate-300">/27 (32 IPs)</button>
                              <button onClick={() => assignBlock(idx, 28)} className="bg-slate-800 hover:bg-slate-700 p-2 rounded text-slate-300">/28 (16 IPs)</button>
                              <button onClick={() => assignBlock(idx, 30)} className="bg-slate-800 hover:bg-slate-700 p-2 rounded text-slate-300">/30 (4 IPs)</button>
                          </div>
                      ) : (
                          <div className={`p-2 rounded text-center text-sm font-bold ${valid ? 'bg-emerald-900/30 text-emerald-400' : 'bg-rose-900/30 text-rose-400'}`}>
                              Sub-rede /{dept.assignedPrefix} alocada.
                              <div className="text-xs font-normal opacity-80 mt-1">
                                  ({usable} úteis) {valid ? '✓ Suficiente' : '✗ Insuficiente'}
                              </div>
                          </div>
                      )}
                  </div>
              )
          })}
      </div>

      {/* The Slicer Visualization */}
      <div className="w-full max-w-4xl bg-slate-950 border-2 border-slate-800 rounded-3xl p-6 relative overflow-hidden shadow-2xl">
          <div className="flex justify-between text-xs text-slate-500 font-bold tracking-widest mb-2 px-1">
              <span>{BASE_IP}.0</span>
              <span>Bloco /24</span>
              <span>{BASE_IP}.255</span>
          </div>
          
          <div className="w-full h-32 bg-slate-900 flex relative border border-slate-700 shadow-inner overflow-hidden">
               {/* Grid markings */}
               <div className="absolute inset-0 w-full h-full flex opacity-20 pointer-events-none">
                    {Array.from({ length: 16 }).map((_, i) => (
                        <div key={i} className="flex-1 border-r border-slate-500 h-full" />
                    ))}
               </div>

               <AnimatePresence>
                   {departments.map(dept => {
                       if (dept.startIndex === null || dept.assignedPrefix === null) return null;
                       const size = getSubnetSize(dept.assignedPrefix);
                       const leftPercent = (dept.startIndex / TOTAL_IPS) * 100;
                       const widthPercent = (size / TOTAL_IPS) * 100;

                       return (
                           <motion.div
                               key={dept.name}
                               initial={{ opacity: 0, scale: 0.9, y: 20 }}
                               animate={{ opacity: 1, scale: 1, y: 0 }}
                               exit={{ opacity: 0, scale: 0.9, y: 20 }}
                               className={`absolute h-full ${dept.color} opacity-80 border-2 border-white/20 shadow-lg flex flex-col items-center justify-center`}
                               style={{ left: `${leftPercent}%`, width: `${widthPercent}%` }}
                               onMouseEnter={() => setHoveredIdx(dept.startIndex)}
                               onMouseLeave={() => setHoveredIdx(null)}
                           >
                                <div className="bg-black/50 px-2 py-1 rounded text-white font-black text-xs md:text-sm">
                                    /{dept.assignedPrefix}
                                </div>
                                <div className="text-[10px] text-white/80 font-bold mt-1 max-w-full truncate px-1">
                                    {size} IPs
                                </div>
                           </motion.div>
                       )
                   })}
               </AnimatePresence>
          </div>
          
          <div className="mt-4 text-center h-6 text-sm text-slate-400 font-bold">
              {hoveredIdx !== null && (() => {
                  const dept = departments.find(d => d.startIndex === hoveredIdx);
                  if (!dept) return null;
                  const size = getSubnetSize(dept.assignedPrefix!);
                  return (
                      <span>Range: <span className="text-white">{BASE_IP}.{dept.startIndex!}</span> até <span className="text-white">{BASE_IP}.{dept.startIndex! + size - 1}</span></span>
                  );
              })()}
          </div>
      </div>

      <AnimatePresence>
         {isCompleted && (
             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-emerald-900/40 border-2 border-emerald-500 text-emerald-400 text-xl tracking-widest font-black uppercase px-10 py-4 rounded-2xl shadow-[0_0_40px_rgba(16,185,129,0.3)] flex items-center gap-3"
             >
                 <CheckCircle2 className="w-8 h-8" /> Rede Cingida com Sucesso!
             </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
}
