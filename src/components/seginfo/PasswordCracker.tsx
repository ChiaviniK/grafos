import { useState } from 'react';
import { ShieldAlert, CheckCircle2, Terminal, Key, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PasswordCrackerProps {
  onComplete?: (score: number) => void;
}

export function PasswordCracker({ onComplete }: PasswordCrackerProps) {
  const [guess, setGuess] = useState('');
  const [status, setStatus] = useState<'idle' | 'cracking' | 'success' | 'fail'>('idle');
  const [logs, setLogs] = useState<string[]>([]);

  // The password is 'neo1999' or 'matrix1999'
  const targetHash = "5b8f6c... (MD5)";

  const handleCrack = () => {
    if (!guess) return;
    setStatus('cracking');
    setLogs(['Iniciando Hash Cracker v2.4...', `Calculando MD5 para: "${guess}"`]);

    setTimeout(() => {
       const lower = guess.toLowerCase();
       if (lower === 'neo1999' || lower === 'matrix1999' || lower === 'trinity1999') {
          setLogs(prev => [...prev, '[+] HASH MATCH Encontrado!', 'Extrator de credenciais concluído.']);
          setStatus('success');
          if (onComplete) onComplete(20);
       } else {
          setLogs(prev => [...prev, '[-] Colisão falhou. Hash incompatível.']);
          setStatus('fail');
       }
    }, 1500);
  };

  const handleReset = () => {
    setStatus('idle');
    setGuess('');
    setLogs([]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
      {/* Target Info */}
      <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-8 shadow-2xl flex flex-col justify-between">
         <div>
            <div className="flex items-center gap-3 text-rose-500 mb-6">
               <ShieldAlert className="w-8 h-8" />
               <h3 className="text-2xl font-black uppercase tracking-tighter">Eng. Social Aplicada</h3>
            </div>
            
            <div className="space-y-4 mb-8">
               <div className="bg-slate-950 p-4 rounded-xl border border-rose-500/20">
                  <span className="text-xs text-rose-500 font-bold uppercase tracking-wider block mb-1">Dossiê do Alvo</span>
                  <p className="text-slate-300 text-sm leading-relaxed">
                     O funcionário-alvo é conhecido por ser grande fã do filme <strong>Matrix</strong>. Vazou na rede social dele que seu ano favorito foi <strong>1999</strong> (o lançamento do filme).
                  </p>
               </div>
               
               <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block mb-1">Hash Capturado no Banco</span>
                  <div className="flex items-center gap-2 mt-2">
                     <Database className="w-4 h-4 text-slate-500" />
                     <code className="text-sm text-slate-400">admin: {targetHash}</code>
                  </div>
               </div>
            </div>
         </div>
         
         <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl text-rose-400 text-sm">
            Tente usar ataques de dicionário associando os temas: palavras do filme + data.
         </div>
      </div>

      {/* Cracking Tool */}
      <div className="bg-slate-950 border border-indigo-500/20 rounded-[2rem] p-8 relative overflow-hidden shadow-[0_0_30px_rgba(99,102,241,0.05)] flex flex-col">
         <div className="flex items-center gap-2 mb-6 text-indigo-400">
            <Terminal className="w-5 h-5" />
            <h4 className="font-bold uppercase tracking-widest text-sm">HashCat Console</h4>
         </div>

         <div className="space-y-4 mb-6 relative z-10 flex-1">
            <div className="space-y-2">
               <label className="text-xs font-bold text-slate-500 flex items-center gap-2 uppercase">
                  <Key className="w-3 h-3" /> Input da Força Bruta
               </label>
               <input 
                 type="text" 
                 value={guess}
                 onChange={(e) => setGuess(e.target.value)}
                 disabled={status === 'cracking' || status === 'success'}
                 className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors font-mono text-sm"
                 placeholder="Ex: admin123"
                 onKeyDown={e => e.key === 'Enter' && handleCrack()}
               />
            </div>

            <div className="bg-black/50 border border-slate-800 rounded-xl p-4 h-40 overflow-y-auto font-mono text-[10px] sm:text-xs">
               {logs.length === 0 && <span className="text-slate-600">Aguardando payload para iniciar colisão...</span>}
               {logs.map((log, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    key={i} 
                    className={`mb-1 ${log.includes('[+]') ? 'text-emerald-400' : log.includes('[-]') ? 'text-rose-400' : 'text-slate-400'}`}
                  >
                     <span className="text-slate-600 mr-2">{`>`}</span>
                     {log}
                  </motion.div>
               ))}
               {status === 'cracking' && (
                  <motion.div animate={{ opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity }} className="text-indigo-400 mt-2 flex items-center gap-2">
                     <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" /> Processando hashes...
                  </motion.div>
               )}
            </div>
         </div>

         {status === 'success' ? (
            <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold p-4 rounded-xl flex items-center justify-center gap-3">
               <CheckCircle2 className="w-5 h-5" /> ACESSO LIBERADO (20 pts)
            </div>
         ) : status === 'cracking' ? (
            <button disabled className="w-full py-4 bg-indigo-600/50 text-white font-bold rounded-xl transition-all cursor-not-allowed">
               COMPUTANDO...
            </button>
         ) : (
            <div className="flex gap-2">
              <button 
                onClick={handleCrack}
                className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg active:scale-95"
              >
                TESTAR HASH
              </button>
              {status === 'fail' && (
                 <button onClick={handleReset} className="px-6 border border-slate-700 text-slate-400 hover:text-white rounded-xl transition-colors">
                    Reset
                 </button>
              )}
            </div>
         )}
      </div>
    </div>
  );
}
