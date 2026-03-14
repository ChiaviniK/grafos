import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, Activity, Database, Server } from 'lucide-react';

interface Hardware {
  id: string;
  name: string;
  type: 'GPU' | 'CPU';
  power: number; // TFLOPS
  consumption: number; // Watts
  cost: number;
}

const HARDWARE_LIST: Hardware[] = [
  { id: 'a100', name: 'Nvidia A100', type: 'GPU', power: 312, consumption: 400, cost: 10000 },
  { id: 'h100', name: 'Nvidia H100', type: 'GPU', power: 2000, consumption: 700, cost: 30000 },
  { id: 'b200', name: 'Nvidia Blackwell', type: 'GPU', power: 20000, consumption: 1200, cost: 50000 },
  { id: 'epyc', name: 'AMD EPYC 9004', type: 'CPU', power: 5, consumption: 400, cost: 5000 },
];

export const DataCenterTycoon: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [budget, setBudget] = useState(250000);

  const totalPower = selected.reduce((acc, id) => {
    const hw = HARDWARE_LIST.find(h => h.id === id);
    return acc + (hw?.power || 0);
  }, 0);

  const totalConsumption = selected.reduce((acc, id) => {
    const hw = HARDWARE_LIST.find(h => h.id === id);
    return acc + (hw?.consumption || 0);
  }, 0);

  const addHardware = (hw: Hardware) => {
    if (budget >= hw.cost) {
      setSelected([...selected, hw.id]);
      setBudget(prev => prev - hw.cost);
    }
  };

  const removeHardware = (idx: number) => {
    const id = selected[idx];
    const hw = HARDWARE_LIST.find(h => h.id === id);
    if (hw) {
      const newSelected = [...selected];
      newSelected.splice(idx, 1);
      setSelected(newSelected);
      setBudget(prev => prev + hw.cost);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
      {/* Catalog */}
      <div className="lg:col-span-1 space-y-4">
        <h3 className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-4 flex items-center gap-2">
          <Database className="w-4 h-4" /> Catálogo de Hardware
        </h3>
        <div className="space-y-3">
          {HARDWARE_LIST.map(hw => (
            <button
              key={hw.id}
              onClick={() => addHardware(hw)}
              disabled={budget < hw.cost}
              className={`w-full p-4 rounded-xl border text-left transition-all ${
                budget >= hw.cost 
                  ? 'bg-slate-800/50 border-slate-700 hover:border-blue-500 hover:bg-slate-800' 
                  : 'bg-slate-900/50 border-red-900/30 opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-white">{hw.name}</span>
                <span className="text-xs text-blue-400 font-mono">${hw.cost.toLocaleString()}</span>
              </div>
              <div className="flex gap-4 text-[10px] uppercase font-bold">
                <span className="text-emerald-400 flex items-center gap-1">
                  <Activity className="w-3 h-3" /> {hw.power} TFLOPS
                </span>
                <span className="text-amber-400 flex items-center gap-1">
                  <Zap className="w-3 h-3" /> {hw.consumption}W
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Rack Visualization */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        <div className="flex justify-between items-end">
          <div>
            <h3 className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Orçamento Disponível</h3>
            <p className="text-3xl font-black text-white font-mono">${budget.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <h3 className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Total Consumo</h3>
            <p className="text-3xl font-black text-amber-500 font-mono">{(totalConsumption / 1000).toFixed(1)} kW</p>
          </div>
        </div>

        <div className="flex-1 bg-black/40 rounded-2xl border border-slate-800 p-6 relative overflow-hidden">
          {/* Rack Grid */}
          <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
            {selected.map((id, idx) => {
                const hw = HARDWARE_LIST.find(h => h.id === id);
                return (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        key={idx}
                        onClick={() => removeHardware(idx)}
                        className={`aspect-square rounded border flex items-center justify-center cursor-pointer group transition-all ${
                            hw?.type === 'GPU' ? 'bg-blue-600/20 border-blue-500/40 hover:bg-red-500/20 hover:border-red-500/40' : 'bg-purple-600/20 border-purple-500/40 hover:bg-red-500/20 hover:border-red-500/40'
                        }`}
                    >
                        {hw?.type === 'GPU' ? <Cpu className="w-6 h-6 text-blue-400 group-hover:text-red-400" /> : <Server className="w-6 h-6 text-purple-400 group-hover:text-red-400" />}
                    </motion.div>
                );
            })}
            {Array.from({ length: Math.max(0, 18 - selected.length) }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square rounded border border-slate-800/50 bg-slate-900/20" />
            ))}
          </div>

          {!selected.length && (
            <div className="absolute inset-0 flex items-center justify-center text-slate-600 font-bold uppercase tracking-widest text-sm pointer-events-none">
                Selecione hardware para começar
            </div>
          )}
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-600/10 border border-blue-500/30 p-4 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-600/20 rounded-lg text-blue-400"><Activity className="w-5 h-5" /></div>
                    <span className="text-xs font-black uppercase text-blue-400">Poder de Processamento</span>
                </div>
                <p className="text-2xl font-black">{totalPower.toLocaleString()} <span className="text-sm font-normal text-slate-500">TFLOPS</span></p>
            </div>
            <div className="bg-amber-600/10 border border-amber-500/30 p-4 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-amber-600/20 rounded-lg text-amber-400"><Zap className="w-5 h-5" /></div>
                    <span className="text-xs font-black uppercase text-amber-400">Eficiência Energética</span>
                </div>
                <p className="text-2xl font-black">
                    {totalPower > 0 ? (totalPower / (totalConsumption / 1000)).toFixed(1) : 0} 
                    <span className="text-sm font-normal text-slate-500"> TFLOPS/kW</span>
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};
