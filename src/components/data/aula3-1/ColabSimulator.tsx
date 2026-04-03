import { useState } from "react";
import { Play, RotateCcw, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ColabSimulatorProps {
  initialCode?: string;
  expectedOutput?: string;
  onSuccess?: () => void;
}

export function ColabSimulator({
  initialCode = 'print("Hello World")',
  expectedOutput = "Hello World",
  onSuccess
}: ColabSimulatorProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runCode = () => {
    setIsRunning(true);
    setError(null);
    setOutput([]);

    // Simulate execution delay
    setTimeout(() => {
      const trimmedCode = code.trim();
      const printMatch = trimmedCode.match(/^print\((['"])(.*?)\1\)$/);

      if (printMatch) {
         const content = printMatch[2];
         setOutput([content]);
         if (content === expectedOutput) {
            setIsSuccess(true);
            onSuccess?.();
         } else {
            setIsSuccess(false);
         }
      } else if (trimmedCode === "") {
         setOutput([]);
      } else {
         setError("SyntaxError: invalid syntax (Talvez você tenha esquecido as aspas ou parênteses?)");
      }
      setIsRunning(false);
    }, 600);
  };

  const reset = () => {
    setCode(initialCode);
    setOutput([]);
    setIsSuccess(false);
    setError(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#1e1e1e] border border-slate-700 rounded-xl overflow-hidden shadow-2xl font-mono">
      {/* Header */}
      <div className="bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="text-[10px] text-slate-500 uppercase tracking-widest font-black">python-module-colab-sim</div>
      </div>

      <div className="p-4 space-y-4">
        {/* Input Cell */}
        <div className="relative group">
          <div className="absolute -left-12 top-2 flex items-center gap-2 opacity-30 group-hover:opacity-100 transition-opacity">
            <span className="text-blue-500 font-bold">[ ]</span>
          </div>
          
          <div className="flex gap-4">
            <button
               onClick={runCode}
               disabled={isRunning}
               className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  isRunning ? "bg-slate-700 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500 hover:scale-110 shadow-lg shadow-blue-900/20"
               }`}
            >
               {isRunning ? (
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
               ) : (
                  <Play className="w-5 h-5 text-white fill-white" />
               )}
            </button>
            
            <div className="flex-1 bg-[#1e1e1e] border border-slate-800 focus-within:border-blue-500/50 rounded-lg p-3 transition-colors">
               <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-12 bg-transparent text-blue-300 resize-none outline-none text-sm leading-relaxed"
                  spellCheck="false"
               />
            </div>
          </div>
        </div>

        {/* Output Area */}
        <AnimatePresence>
          {(output.length > 0 || error) && (
            <motion.div
               initial={{ opacity: 0, y: -10 }}
               animate={{ opacity: 1, y: 0 }}
               className="ml-14 border-l border-slate-700 pl-6 py-2"
            >
               {error ? (
                  <div className="text-rose-400 text-xs italic">{error}</div>
               ) : (
                  <div className="space-y-2">
                     {output.map((line, i) => (
                        <div key={i} className="text-slate-300 text-sm">{line}</div>
                     ))}
                     {isSuccess && (
                        <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-bold uppercase tracking-tighter mt-4 animate-bounce">
                           <CheckCircle2 className="w-3 h-3" /> Execução concluída com sucesso!
                        </div>
                     )}
                  </div>
               )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer / Controls */}
      <div className="bg-[#191919] px-4 py-2 border-t border-slate-800 flex justify-end gap-3">
         <button 
            onClick={reset}
            className="flex items-center gap-1.5 text-[10px] text-slate-500 hover:text-slate-300 transition-colors uppercase font-bold"
         >
            <RotateCcw className="w-3 h-3" /> Resetar Célula
         </button>
      </div>
    </div>
  );
}
