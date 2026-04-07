import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, ShieldAlert, CheckCircle2, ShieldX, TerminalSquare, SearchCode, Lock, User } from 'lucide-react';

interface SQLiSimulatorProps {
  onComplete?: (score: number) => void;
  hasCompleted?: boolean;
}

export function SQLiSimulator({ onComplete, hasCompleted }: SQLiSimulatorProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'fail' | 'typing'>('idle');

  // Simulated SQL Query construction (VULNERABLE)
  const simulatedQuery = `SELECT * FROM users\nWHERE username = '${username}'\nAND password = '${password}';`;

  // Mini-evaluator for SQLi
  const evaluateInjection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username && !password) return;

    const uInput = username.toLowerCase();
    const pInput = password.toLowerCase().replace(/\s+/g, ''); // strip spaces to simplify matching

    // Payload 1: Admin bypass via comment
    const isAdminCommentBypass = uInput.includes("admin' --") || uInput.includes("admin'#") || uInput.includes("admin'#");
    
    // Payload 2: Tautology in password
    // Looking for things like ' OR '1'='1 or ' OR 1=1
    const isPasswordTautology = pInput.includes("'or'1'='1") || pInput.includes("'or1=1") || pInput.includes('"or"1"="1');

    if (isAdminCommentBypass || isPasswordTautology) {
      setStatus('success');
      if (onComplete) onComplete(10);
    } else if (username === 'admin' && password === 'admin123') {
       // Legitimate login just for fun
       setStatus('success');
       if (onComplete) onComplete(5); // fewer points for guessing
    } else {
      setStatus('fail');
    }
  };

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    if (status !== 'idle' && status !== 'typing') {
      setStatus('typing');
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 font-sans">
      
      {/* Target Application (Vulnerable Login) */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
             <ShieldX className="w-32 h-32 text-rose-500 transform rotate-12" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8 border-b border-slate-800 pb-4">
               <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex flex-shrink-0 items-center justify-center">
                  <Lock className="w-5 h-5 text-indigo-400" />
               </div>
               <div>
                 <h3 className="text-xl font-bold text-white leading-none">Portal Corporativo</h3>
                 <span className="text-xs text-rose-400 font-bold uppercase tracking-wider flex items-center gap-1 mt-1">
                   <ShieldAlert className="w-3 h-3" /> Sistema Vulnerável
                 </span>
               </div>
            </div>

            <form onSubmit={evaluateInjection} className="space-y-5">
               <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-400 flex items-center gap-2">
                     <User className="w-4 h-4" /> Usuário
                  </label>
                  <input 
                    type="text" 
                    value={username}
                    onChange={handleInputChange(setUsername)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-emerald-400 font-mono text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder="Digite admin..."
                  />
               </div>

               <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-400 flex items-center gap-2">
                     <Lock className="w-4 h-4" /> Senha
                  </label>
                  <input 
                    type="text" 
                    value={password}
                    onChange={handleInputChange(setPassword)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-emerald-400 font-mono text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder="Tente injetar código aqui..."
                  />
               </div>

               <button 
                 type="submit"
                 className="w-full py-4 mt-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg active:scale-95"
               >
                 TENTAR LOGIN
               </button>
            </form>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
           <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <SearchCode className="w-4 h-4" /> Dicas de Ataque
           </h4>
           <ul className="space-y-2 text-sm text-slate-400">
             <li className="flex gap-2">
                <span className="text-indigo-400 font-mono bg-indigo-500/10 px-1 rounded">' OR '1'='1</span> 
                <span className="opacity-80">no campo de senha.</span>
             </li>
             <li className="flex gap-2">
                <span className="text-indigo-400 font-mono bg-indigo-500/10 px-1 rounded">admin' --</span> 
                <span className="opacity-80">no campo de usuário.</span>
             </li>
           </ul>
        </div>
      </div>

      {/* Database View (Under the hood) */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        <div className="bg-[#0f172a] rounded-[2rem] border border-slate-800 h-full p-6 md:p-8 flex flex-col relative overflow-hidden">
           
           <div className="flex items-center gap-3 mb-6 relative z-10">
              <Database className="w-6 h-6 text-slate-400" />
              <h3 className="text-lg font-bold text-slate-300">Servidor MySQL (Banco de Dados)</h3>
           </div>

           <div className="flex-1 bg-slate-950 rounded-2xl border border-slate-800 p-6 relative z-10 font-mono text-sm sm:text-base leading-relaxed overflow-x-auto shadow-inner">
              <div className="absolute top-0 right-0 px-4 py-2 bg-slate-900/80 rounded-bl-xl text-xs text-slate-500 font-bold tracking-widest flex items-center gap-2">
                 <TerminalSquare className="w-3 h-3" /> QUERY EM EXECUÇÃO
              </div>
              <div className="mt-4 break-all whitespace-pre-wrap">
                 <span className="text-purple-400 font-bold">SELECT</span> <span className="text-slate-300">*</span> <span className="text-purple-400 font-bold">FROM</span> <span className="text-amber-300">users</span><br/>
                 <span className="text-purple-400 font-bold">WHERE</span> username = <span className="text-emerald-400">'</span><span className="text-emerald-300">{username}</span><span className="text-emerald-400">'</span><br/>
                 <span className="text-purple-400 font-bold">AND</span> password = <span className="text-emerald-400">'</span><span className="text-emerald-300">{password}</span><span className="text-emerald-400">'</span>;
              </div>
           </div>

           {/* Feedback Overlay */}
           <AnimatePresence mode="wait">
             {status === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  className="mt-6 p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-start gap-4 relative z-10"
                >
                   <CheckCircle2 className="w-8 h-8 shrink-0 mt-0.5" />
                   <div>
                      <h4 className="text-lg font-black uppercase tracking-tight mb-1">Acesso Concedido!</h4>
                      <p className="text-sm opacity-90">O banco de dados interpretou sua injenção como um comando real. Como <span className="font-mono bg-emerald-500/20 px-1 rounded">'1'='1'</span> é sempre verdadeiro, a verificação de senha foi neutralizada.</p>
                   </div>
                </motion.div>
             )}
             
             {status === 'fail' && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  className="mt-6 p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-start gap-4 relative z-10"
                >
                   <ShieldX className="w-8 h-8 shrink-0 mt-0.5" />
                   <div>
                      <h4 className="text-lg font-black uppercase tracking-tight mb-1">Acesso Negado</h4>
                      <p className="text-sm opacity-90">A query foi executada, mas a condição não retornou nenhum usuário válido. O banco de dados procurou literalmente por um usuário com a senha informada.</p>
                   </div>
                </motion.div>
             )}
           </AnimatePresence>

        </div>
      </div>

    </div>
  );
}
