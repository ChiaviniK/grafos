import { Coffee } from "lucide-react";

export function Slide10() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100%] flex-1 animate-in fade-in zoom-in duration-700">
      <div className="bg-slate-800/50 p-12 rounded-3xl border border-slate-700 shadow-2xl flex flex-col items-center text-center max-w-lg w-full">
        <div className="w-24 h-24 bg-amber-900/40 rounded-full flex items-center justify-center mb-6 animate-pulse">
          <Coffee className="w-12 h-12 text-amber-500" />
        </div>
        
        <h2 className="text-4xl font-bold mb-4 tracking-tight text-white">Intervalo Rápido</h2>
        <div className="text-6xl font-mono font-bold text-blue-400 mb-6 tracking-widest">
          10:00
        </div>
        <p className="text-slate-400 text-lg">
          Respire, tome uma água.
          Na volta, vamos colocar a mão na massa construindo nossos próprios grafos!
        </p>
      </div>
    </div>
  );
}
