import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, ShieldCheck, TerminalSquare, AlertTriangle, Cpu } from 'lucide-react';

export function PasswordCracker() {
  const [password, setPassword] = useState('');
  const [entropy, setEntropy] = useState(0);
  const [timeToCrack, setTimeToCrack] = useState('Instantâneo');
  const [strengthLevel, setStrengthLevel] = useState<'weak' | 'medium' | 'strong' | 'unbreakable'>('weak');

  // Calculates Information Entropy: E = L * log2(R)
  // R = Pool of characters used
  useEffect(() => {
    if (!password) {
      setEntropy(0);
      setTimeToCrack('Instantâneo');
      setStrengthLevel('weak');
      return;
    }

    let poolSize = 0;
    if (/[a-z]/.test(password)) poolSize += 26;
    if (/[A-Z]/.test(password)) poolSize += 26;
    if (/[0-9]/.test(password)) poolSize += 10;
    if (/[^a-zA-Z0-9]/.test(password)) poolSize += 32; // basic symbols

    const E = password.length * Math.log2(poolSize || 1);
    setEntropy(E);

    // Assuming a modern GPU fleet doing 100 Billion hashes per second
    // Combinations = 2^E
    const hashesPerSecond = 100_000_000_000; 
    const combinations = Math.pow(2, E);
    const seconds = combinations / hashesPerSecond;

    if (seconds < 1) {
       setTimeToCrack('Instantâneo');
       setStrengthLevel('weak');
    } else if (seconds < 3600) { // 1 hour
       setTimeToCrack(`${Math.round(seconds / 60)} Minutos`);
       setStrengthLevel('weak');
    } else if (seconds < 86400 * 30) { // 30 days
       setTimeToCrack(`${Math.round(seconds / 86400)} Dias`);
       setStrengthLevel('medium');
    } else if (seconds < 86400 * 365 * 100) { // 100 years
       setTimeToCrack(`${Math.round(seconds / (86400 * 365))} Anos`);
       setStrengthLevel('strong');
    } else {
       const millenia = Math.round(seconds / (86400 * 365 * 1000));
       setTimeToCrack(`+ ${millenia.toLocaleString('pt-BR')} Milênios`);
       setStrengthLevel('unbreakable');
    }
  }, [password]);

  const getColor = () => {
     switch(strengthLevel) {
        case 'weak': return 'text-rose-500 border-rose-500 shadow-rose-500';
        case 'medium': return 'text-amber-500 border-amber-500 shadow-amber-500';
        case 'strong': return 'text-emerald-400 border-emerald-400 shadow-emerald-400';
        case 'unbreakable': return 'text-cyan-400 border-cyan-400 shadow-cyan-400';
     }
  };

  const getBgColor = () => {
     switch(strengthLevel) {
        case 'weak': return 'bg-rose-500';
        case 'medium': return 'bg-amber-500';
        case 'strong': return 'bg-emerald-400';
        case 'unbreakable': return 'bg-cyan-400';
     }
  };

  return (
    <div className="w-full flex flex-col gap-6 items-center font-mono">
      <div className={`w-full bg-slate-950 border ${getColor().split(' ')[1]} rounded-3xl p-6 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col transition-colors duration-500`}>
         
         <div className="flex flex-col items-center mb-10 px-4 mt-4">
             <div className="flex items-center gap-3 text-slate-400 mb-6">
                <TerminalSquare className="w-6 h-6" />
                <span className="uppercase tracking-widest text-sm font-bold">Simulador de Força Bruta (100 Bilhões Hashes/s)</span>
             </div>

             <div className="relative w-full max-w-2xl">
                <input 
                  type="text" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className={`w-full bg-slate-900 text-3xl md:text-5xl text-center p-6 rounded-2xl outline-none transition-all duration-300 font-black tracking-widest border-2 ${getColor().split(' ')[1]} text-white`}
                  placeholder="DIGITE A SENHA..."
                />
                <AnimatePresence>
                   {strengthLevel === 'weak' && password.length > 0 && (
                      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute -right-4 -top-4 bg-rose-600 p-2 rounded-full shadow-[0_0_20px_rgba(225,29,72,0.8)]">
                         <AlertTriangle className="w-8 h-8 text-white" />
                      </motion.div>
                   )}
                   {strengthLevel === 'unbreakable' && (
                      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute -right-4 -top-4 bg-cyan-600 p-2 rounded-full shadow-[0_0_30px_rgba(34,211,238,1)]">
                         <ShieldCheck className="w-8 h-8 text-white" />
                      </motion.div>
                   )}
                </AnimatePresence>
             </div>
         </div>

         {/* Stats Panel */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl mx-auto p-6 bg-slate-900 rounded-2xl border border-slate-800">
             
             {/* Left: Entropy */}
             <div className="flex flex-col items-center justify-center p-4 border-r border-slate-800">
                 <div className="text-slate-500 uppercase text-xs font-bold tracking-[0.2em] mb-2 flex items-center gap-2">
                    <Cpu className="w-4 h-4"/> Nível de Entropia (Bits)
                 </div>
                 <div className={`text-5xl font-black ${getColor().split(' ')[0]} transition-colors duration-300 drop-shadow-lg`}>
                    {Math.round(entropy)}
                 </div>
                 <div className="w-full h-2 bg-slate-800 rounded-full mt-4 overflow-hidden">
                    <motion.div 
                      className={`h-full ${getBgColor()}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((entropy / 128) * 100, 100)}%` }}
                    />
                 </div>
             </div>

             {/* Right: Time to Crack */}
             <div className="flex flex-col items-center justify-center p-4">
                 <div className="text-slate-500 uppercase text-xs font-bold tracking-[0.2em] mb-2 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4"/> Tempo de Quebra (GPU Fleet)
                 </div>
                 <div className={`text-4xl text-center md:text-5xl font-black ${getColor().split(' ')[0]} transition-colors duration-300 drop-shadow-[0_0_15px_currentColor]`}>
                    {timeToCrack}
                 </div>
             </div>

         </div>

         {/* Tip */}
         <div className="mt-8 text-center text-sm text-slate-500 bg-slate-900/50 p-4 rounded-xl max-w-3xl mx-auto border border-slate-800">
            Dica: Adicionar uma palavra extra à sua senha (ex: "cavalo bateria grampo") multiplica a entropia exponencialmente melhor do que substituir um 'a' por '@'.
         </div>

      </div>
    </div>
  );
}
