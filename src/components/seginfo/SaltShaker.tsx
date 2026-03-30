import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, TestTube2, ArrowDown, Hash, AlertOctagon } from 'lucide-react';

// Falso MD5 apenas para demonstração visual
const fakeHash = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; 
  }
  // Convert to positive hex and pad
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  // Make it look like a 32 char md5 by repeating and scrambling
  return (hex + hex + hex + hex).substring(0, 32).split('').reverse().join('');
};

const generateSalt = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

export function SaltShaker() {
  const [password, setPassword] = useState('admin123');
  const [salt, setSalt] = useState('');
  const [isSalted, setIsSalted] = useState(false);
  const [currentHash, setCurrentHash] = useState('');

  useEffect(() => {
     if (isSalted && salt) {
        setCurrentHash(fakeHash(password + salt));
     } else {
        setCurrentHash(fakeHash(password));
     }
  }, [password, salt, isSalted]);

  const applySalt = () => {
    setSalt(generateSalt());
    setIsSalted(true);
  };

  const removeSalt = () => {
    setSalt('');
    setIsSalted(false);
  };

  return (
    <div className="w-full flex flex-col gap-6 items-center font-mono">
      <div className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden flex flex-col items-center">
         
         <div className="text-center mb-6">
            <h3 className="text-emerald-400 font-bold text-xl uppercase tracking-widest flex items-center justify-center gap-2">
               <Database className="w-6 h-6" /> Simulador Rainbow Table
            </h3>
            <p className="text-slate-400 text-sm mt-2">Veja como o <i>Salting</i> altera a assinatura digital e destrói o arquivo do Hacker.</p>
         </div>

         {/* Interactive Area */}
         <div className="flex flex-col md:flex-row items-center gap-8 w-full max-w-4xl bg-slate-950 p-8 rounded-2xl border border-slate-800">
             
             {/* Left Box: User Input */}
             <div className="flex-1 flex flex-col items-center gap-4 w-full">
                <div className="text-slate-500 text-sm font-bold tracking-widest uppercase">Senha do Usuário</div>
                <input 
                  type="text" 
                  value={password}
                  onChange={e => { setPassword(e.target.value); setIsSalted(false); }}
                  className="w-full bg-slate-900 border border-slate-700 text-white p-4 rounded-xl text-center text-2xl font-black outline-none focus:border-emerald-500"
                />

                <ArrowDown className="w-8 h-8 text-slate-700 mt-2" />

                <div className="relative w-full h-24 bg-slate-900 border-2 border-dashed border-slate-700 rounded-xl flex items-center justify-center">
                   <AnimatePresence>
                      {isSalted ? (
                         <motion.div 
                           initial={{ opacity: 0, scale: 0.5, y: -20 }} 
                           animate={{ opacity: 1, scale: 1, y: 0 }} 
                           className="flex flex-col items-center"
                         >
                            <span className="text-sky-400 font-bold mb-1">SALT INJETADO</span>
                            <span className="bg-sky-500/20 text-sky-300 px-4 py-1 rounded-full text-xl font-black border border-sky-500/50">+{salt}</span>
                         </motion.div>
                      ) : (
                         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-slate-600 font-bold uppercase tracking-widest text-sm">
                            [ Sem Salt (Inseguro) ]
                         </motion.div>
                      )}
                   </AnimatePresence>
                </div>
             </div>

             {/* Center Action */}
             <div className="flex flex-col items-center justify-center gap-4 min-w-[150px]">
                {!isSalted ? (
                   <button onClick={applySalt} className="bg-sky-600 hover:bg-sky-500 text-white font-black px-6 py-4 rounded-2xl flex flex-col items-center gap-2 shadow-[0_0_30px_rgba(14,165,233,0.4)] transition-all active:scale-95 border border-sky-400">
                      <TestTube2 className="w-8 h-8" /> 
                      <span>ADICIONAR<br/>SALT</span>
                   </button>
                ) : (
                   <button onClick={removeSalt} className="bg-rose-900 hover:bg-rose-800 text-rose-300 font-bold px-6 py-4 rounded-2xl flex flex-col items-center gap-2 border border-rose-500/50 transition-all active:scale-95">
                      <AlertOctagon className="w-8 h-8" /> 
                      <span>REMOVER<br/>SALT</span>
                   </button>
                )}
             </div>

             {/* Right Box: Hash Output */}
             <div className="flex-1 flex flex-col items-center w-full">
                <div className="text-slate-500 text-sm font-bold tracking-widest uppercase mb-4 flex items-center gap-2">
                   <Hash className="w-4 h-4"/> Hash Salvo no Banco
                </div>
                
                <div className={`w-full p-6 flex items-center justify-center break-all text-center rounded-2xl border-4 transition-all duration-500 ${isSalted ? 'bg-emerald-950/50 border-emerald-500 text-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.3)]' : 'bg-rose-950/50 border-rose-500 text-rose-400 shadow-[0_0_40px_rgba(225,29,72,0.3)]'}`}>
                   <motion.span 
                      key={currentHash}
                      initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      className="text-2xl font-medium tracking-wider leading-relaxed"
                   >
                     {currentHash}
                   </motion.span>
                </div>

                <div className={`mt-6 text-sm font-bold uppercase tracking-widest p-3 rounded-lg w-full text-center border ${isSalted ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500' : 'bg-rose-500/10 border-rose-500/30 text-rose-500'}`}>
                   {isSalted ? 'Rainbow Table Inutilizada' : 'Vulnerável à Rainbow Table'}
                </div>
             </div>

         </div>
      </div>
    </div>
  );
}
