import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, Droplets, Zap, Wind } from 'lucide-react';

export const EnergyImpactSim: React.FC = () => {
  const [active, setActive] = useState<'search' | 'ai'>('search');

  const stats = {
    search: {
      energy: 0.0003, // kWh
      water: 0.001, // liters (cooling)
      co2: 0.2, // grams
      desc: 'Um simples indexamento e recuperação de dados.'
    },
    ai: {
      energy: 0.003, // kWh (10x search)
      water: 0.5, // liters (1/2 cup of water per 20-50 prompts)
      co2: 2.5, // grams
      desc: 'Processamento massivo em GPUs de alta performance para inferência.'
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setActive('search')}
          className={`flex-1 py-4 px-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
            active === 'search' 
              ? 'bg-blue-600/20 border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.2)]' 
              : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700'
          }`}
        >
          <Search className={active === 'search' ? 'text-blue-400' : ''} />
          <span className="font-bold uppercase tracking-widest text-xs">Busca Tradicional</span>
        </button>
        <button
          onClick={() => setActive('ai')}
          className={`flex-1 py-4 px-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
            active === 'ai' 
              ? 'bg-purple-600/20 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.2)]' 
              : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700'
          }`}
        >
          <Sparkles className={active === 'ai' ? 'text-purple-400' : ''} />
          <span className="font-bold uppercase tracking-widest text-xs">Resposta via IA</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-500/20 rounded-lg text-amber-500"><Zap className="w-5 h-5" /></div>
            <span className="text-[10px] uppercase font-black text-slate-400">Eletricidade</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black">{stats[active].energy}</span>
            <span className="text-slate-500 font-mono text-sm">kWh</span>
          </div>
          <p className="mt-4 text-xs text-slate-500 leading-relaxed">
            Consumo direto das GPUs e hardware para processar a requisição.
          </p>
        </div>

        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg text-blue-500"><Droplets className="w-5 h-5" /></div>
            <span className="text-[10px] uppercase font-black text-slate-400">Água (Cooling)</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-blue-400">{stats[active].water}</span>
            <span className="text-slate-500 font-mono text-sm">Litros</span>
          </div>
          <p className="mt-4 text-xs text-slate-500 leading-relaxed">
            Água evaporada em torres de resfriamento para manter o sistema estável.
          </p>
        </div>

        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-slate-500/20 rounded-lg text-slate-500"><Wind className="w-5 h-5" /></div>
            <span className="text-[10px] uppercase font-black text-slate-400">Emissão CO2</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-slate-300">{stats[active].co2}</span>
            <span className="text-slate-500 font-mono text-sm">Gramas</span>
          </div>
          <p className="mt-4 text-xs text-slate-500 leading-relaxed">
            Estimativa de pegada de carbono baseada no mix energético médio.
          </p>
        </div>
      </div>

      <div className="mt-4 p-6 bg-slate-800/30 rounded-2xl border border-slate-700/50 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500" />
        <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-wide">Por que a diferença?</h4>
        <p className="text-slate-400 text-sm italic">
          "{stats[active].desc}"
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 mt-6">
          <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: active === 'search' ? '10%' : '100%' }}
                className={`h-full ${active === 'search' ? 'bg-blue-500' : 'bg-purple-500 blur-[1px]'}`}
              />
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-500">Escala de Comparação de Custo Energético</span>
      </div>
    </div>
  );
};
