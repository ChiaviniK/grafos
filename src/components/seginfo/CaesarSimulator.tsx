import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Lock } from 'lucide-react';

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function CaesarSimulator() {
  const [plaintext, setPlaintext] = useState('CRIPTOGRAFIA CLASSICA');
  const [shift, setShift] = useState(3);

  const ciphertext = useMemo(() => {
    return plaintext.split('').map(char => {
      const upperChar = char.toUpperCase();
      const index = ALPHABET.indexOf(upperChar);
      if (index === -1) return char; // spaces and punctuation
      
      const newIndex = (index + shift) % 26;
      // Handle negative numbers correctly in JS modulo
      const finalIndex = newIndex < 0 ? 26 + newIndex : newIndex;
      return ALPHABET[finalIndex];
    }).join('');
  }, [plaintext, shift]);

  return (
    <div className="w-full flex flex-col gap-6 items-center">
      
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700/50 rounded-3xl p-6 md:p-8 flex flex-col shadow-2xl relative overflow-hidden">
        
        <div className="flex items-center justify-between mb-6">
           <h3 className="text-xl font-black text-rose-400 flex items-center gap-2">
             <Lock className="w-5 h-5" /> Dial de César
           </h3>
           <div className="bg-slate-800 px-3 py-1 rounded-lg text-xs font-mono text-slate-400 border border-slate-700">
             C = (P + K) mod 26
           </div>
        </div>

        {/* Plaintext Input */}
        <div className="space-y-2 mb-6">
           <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Texto Claro (Sua Mensagem)</label>
           <input 
             type="text" 
             value={plaintext}
             onChange={(e) => setPlaintext(e.target.value.toUpperCase())}
             placeholder="Digite uma mensagem secreta..."
             className="w-full bg-slate-950 border-2 border-slate-700 text-white font-mono text-xl p-4 rounded-xl focus:border-rose-500 outline-none transition-colors"
           />
        </div>

        {/* Shift Slider */}
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 mb-6 flex flex-col items-center gap-4">
            <div className="flex justify-between w-full text-sm font-bold text-slate-400">
               <span>-25</span>
               <span className="text-rose-400">CHAVE (K): {shift > 0 ? `+${shift}` : shift}</span>
               <span>+25</span>
            </div>
            <input 
              type="range" 
              min="-25" 
              max="25" 
              value={shift}
              onChange={(e) => setShift(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
            
            {/* Visual Alphabet Shift Viewer */}
            <div className="w-full overflow-hidden flex flex-col items-center mt-4 bg-slate-950 p-3 rounded-lg border border-slate-800">
               <div className="font-mono tracking-[0.2em] md:tracking-[0.5em] text-slate-500 text-xs md:text-sm whitespace-nowrap opacity-50">
                  {ALPHABET}
               </div>
               <div className="h-px w-full bg-slate-800 my-2 relative">
                  <div className="absolute left-1/2 -top-1 w-2 h-2 bg-rose-500 rounded-full -translate-x-1/2" />
               </div>
               <motion.div 
                 animate={{ x: `${(shift) * -14}px` }} // Rough estimation for visual slide
                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
                 className="font-mono tracking-[0.2em] md:tracking-[0.5em] text-rose-400 text-xs md:text-sm font-bold whitespace-nowrap"
               >
                  {ALPHABET}{ALPHABET}{ALPHABET}
               </motion.div>
            </div>
        </div>

        {/* Ciphertext Output */}
        <div className="space-y-2 relative">
           <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex justify-between">
              Texto Cifrado (Interceptado)
              <button onClick={() => setShift(3)} className="text-[10px] text-blue-400 hover:text-blue-300 flex items-center gap-1">
                 <RotateCcw className="w-3 h-3" /> VOLTAR PARA K=3
              </button>
           </label>
           
           <div className="w-full bg-rose-950/30 border-2 border-rose-500/50 text-rose-300 font-mono text-xl p-4 rounded-xl min-h-[60px] break-words shadow-inner-rose">
               <AnimatePresence mode="popLayout">
                  {ciphertext.split('').map((char, i) => (
                    <motion.span
                      key={`${i}-${char}`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="inline-block"
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  ))}
               </AnimatePresence>
           </div>
        </div>

      </div>
    </div>
  );
}
