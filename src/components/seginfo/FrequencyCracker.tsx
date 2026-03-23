import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, UnlockKeyhole, ShieldAlert, ShieldCheck } from 'lucide-react';

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const PLAINTEXT = "A CRIPTOGRAFIA FOI DECIFRADA PELO AGENTE DE SEGURANCA COM BASE NA ESTATISTICA E FREQUENCIA DE VOGAIS";
const SECRET_KEY = 11; // K = 11

export function FrequencyCracker() {
  const [guessK, setGuessK] = useState<number | ''>('');
  const [validation, setValidation] = useState<'idle' | 'success' | 'error'>('idle');

  // Pre-calculate the ciphertext challenge once
  const challengeCiphertext = useMemo(() => {
    return PLAINTEXT.split('').map(char => {
      const index = ALPHABET.indexOf(char);
      if (index === -1) return char;
      return ALPHABET[(index + SECRET_KEY) % 26];
    }).join('');
  }, []);

  // Calculate frequencies for the bar chart
  const frequencies = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const char of ALPHABET) counts[char] = 0;
    
    for (const char of challengeCiphertext) {
      if (counts[char] !== undefined) {
        counts[char]++;
      }
    }
    
    // Find max for scaling
    const maxCount = Math.max(...Object.values(counts));
    
    return Object.entries(counts).map(([char, count]) => ({
      char,
      count,
      heightPerc: maxCount === 0 ? 0 : (count / maxCount) * 100
    }));
  }, [challengeCiphertext]);

  const handleCrack = () => {
    if (guessK === SECRET_KEY) {
      setValidation('success');
    } else {
      setValidation('error');
    }
  };

  // If success, show plaintext, else show ciphertext
  const displayText = validation === 'success' ? PLAINTEXT : challengeCiphertext;

  return (
    <div className="w-full flex flex-col gap-8 items-center">
      
      <div className="w-full bg-slate-900 border border-slate-700/50 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
         
         <div className="flex items-center justify-between mb-4 relative z-10">
           <h3 className="text-xl font-black text-emerald-400 flex items-center gap-2">
             <BarChart3 className="w-5 h-5" /> Análise de Frequência
           </h3>
         </div>

         <p className="text-slate-400 text-sm mb-6 relative z-10">
            A mensagem abaixo foi interceptada. Note que a letra com a barra mais alta do gráfico deve representar a vogal mais comum ("A"). Use matemática modular para descobrir "K" e quebrar a cifra!
         </p>

         {/* Text Console Display */}
         <div className={`w-full p-4 md:p-6 rounded-2xl mb-8 border relative z-10 font-mono text-lg md:text-xl text-center transition-colors duration-1000 ${validation === 'success' ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
            <AnimatePresence mode="wait">
               <motion.span
                 key={validation === 'success' ? 'plain' : 'cipher'}
                 initial={{ opacity: 0, filter: 'blur(10px)' }}
                 animate={{ opacity: 1, filter: 'blur(0px)' }}
                 transition={{ duration: 1 }}
               >
                 {displayText}
               </motion.span>
            </AnimatePresence>
         </div>

         {/* Frequency Chart */}
         <div className="w-full bg-slate-950 p-4 pt-12 rounded-2xl border border-slate-800 mb-8 relative z-10 flex items-end justify-between h-48 sm:h-64 gap-1 px-4">
             {frequencies.map(({ char, count, heightPerc }) => (
                <div key={char} className="flex flex-col items-center flex-1 group">
                   <div 
                     className="w-full max-w-[12px] md:max-w-[20px] bg-emerald-600/40 border-t-2 border-emerald-500/80 rounded-t-sm group-hover:bg-emerald-400/60 transition-colors relative"
                     style={{ height: `${heightPerc}%`, minHeight: '2px' }}
                   >
                     {/* Tooltip on hover showing exact count */}
                     <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity border border-slate-700">
                        {count}
                     </div>
                   </div>
                   <div className="text-[9px] md:text-xs font-bold text-slate-500 mt-2 font-mono group-hover:text-emerald-400">
                      {char}
                   </div>
                </div>
             ))}
         </div>

         {/* Control Panel */}
         <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-lg mx-auto relative z-10">
            <div className="flex-1 bg-slate-800 p-2 rounded-xl border border-slate-700 flex items-center gap-4 shadow-inner">
               <label className="text-slate-400 text-sm font-bold pl-4">🔑 Descubra o K:</label>
               <input 
                 type="number" 
                 value={guessK}
                 onChange={(e) => setGuessK(e.target.value === '' ? '' : Number(e.target.value))}
                 placeholder="?"
                 className="flex-1 bg-slate-950 text-white font-mono text-xl p-3 rounded-lg border border-slate-700 outline-none text-center focus:border-emerald-500"
                 disabled={validation === 'success'}
               />
            </div>
            {validation !== 'success' && (
                <button 
                  onClick={handleCrack}
                  className="px-6 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black flex items-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-transform active:scale-95 whitespace-nowrap"
                >
                  <UnlockKeyhole className="w-5 h-5" /> CRACKEAR
                </button>
            )}
         </div>

         <AnimatePresence>
            {validation !== 'idle' && (
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className={`w-full max-w-lg mx-auto p-4 rounded-xl mt-6 border flex items-center justify-center gap-3 relative z-10 ${validation === 'success' ? 'bg-emerald-900/30 border-emerald-500/50 text-emerald-400' : 'bg-rose-900/30 border-rose-500/50 text-rose-400'}`}
               >
                  {validation === 'success' ? <ShieldCheck className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6" />}
                  <span className="font-bold">
                     {validation === 'success' ? 'Acesso Concedido. Mensagem Restaurada!' : 'Chave Incorreta. Tente analisar o gráfico novamente.'}
                  </span>
               </motion.div>
            )}
         </AnimatePresence>

         {/* Success Background glow */}
         <AnimatePresence>
           {validation === 'success' && (
             <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-emerald-500/10 pointer-events-none z-0"
             />
           )}
         </AnimatePresence>
      </div>
    </div>
  );
}
