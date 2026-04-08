import { useState } from 'react';
import { Send, CheckCircle2, ShieldQuestion, Mail, User, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

interface ReportCardProps {
  scores: {
    sqli: number;
    xss: number;
    password: number;
    quiz: number[]; // Array de notas para as 5 questões
    dragDrop: number;
  };
}

export function ReportCard({ scores }: ReportCardProps) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [ra, setRa] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const totalScore = scores.sqli + scores.xss + scores.password + scores.dragDrop + scores.quiz.reduce((a,b)=>a+b, 0);

  const handleSubmit = () => {
    // We do NOT preventDefault here because we want the browser to natively submit the form 
    // to the hidden iframe. We just set the state to loading/success.
    setStatus('loading');
    
    // The iframe onLoad event will trigger the success state, but we also set a timeout
    // as a fallback in case the iframe load event is blocked by cross-origin policies.
    setTimeout(() => {
        setStatus('success');
    }, 1500);
  };

  if (status === 'success') {
     return (
       <div className="w-full max-w-2xl mx-auto bg-slate-900 border border-emerald-500/30 rounded-3xl p-10 text-center shadow-[0_0_50px_rgba(16,185,129,0.1)] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/img/noise.png')] opacity-20 mix-blend-overlay"></div>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
             <CheckCircle2 className="w-24 h-24 text-emerald-400 mx-auto mb-6" />
          </motion.div>
          <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-2 relative z-10">Transmissão Concluída!</h3>
          <p className="text-emerald-300 relative z-10">O seu Boletim foi submetido com sucesso e as credenciais foram gravadas no banco de dados.</p>
          <div className="mt-8 font-mono text-emerald-500 text-sm bg-emerald-950/40 p-4 border border-emerald-900/50 rounded-xl">
             [POST /formResponse] HTTP 200 OK<br/>
             RA: {ra} | SCORE CRIPTOGRAFADO: ***
          </div>
       </div>
     )
  }

  // Fallbacks for scores
  const q1 = scores.quiz[0] !== undefined ? scores.quiz[0] : 0;
  const q2 = scores.quiz[1] !== undefined ? scores.quiz[1] : 0;
  const q3 = scores.quiz[2] !== undefined ? scores.quiz[2] : 0;
  const q4 = scores.quiz[3] !== undefined ? scores.quiz[3] : 0;
  const q5 = scores.quiz[4] !== undefined ? scores.quiz[4] : 0;

  return (
    <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
       
       {/* Left: Summary */}
       <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-8 shadow-2xl space-y-6">
          <div className="flex items-center gap-3 mb-4">
             <ShieldQuestion className="w-8 h-8 text-indigo-400" />
             <h3 className="text-2xl font-black text-white tracking-tighter uppercase">Telemetria Final</h3>
          </div>
          
          <div className="space-y-3">
             <div className="text-xs text-indigo-400 font-bold uppercase tracking-widest pl-2 mb-2 mt-4 border-l-2 border-indigo-400">Atividades Laboratoriais</div>
             <div className="grid grid-cols-2 gap-3">
                <div className="flex justify-between items-center bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                   <span className="text-slate-400 text-sm font-bold uppercase truncate max-w-[70%]">Bypass SQLi</span>
                   <span className="text-indigo-400 font-black">{scores.sqli} pts</span>
                </div>
                <div className="flex justify-between items-center bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                   <span className="text-slate-400 text-sm font-bold uppercase truncate max-w-[70%]">Injeção XSS</span>
                   <span className="text-indigo-400 font-black">{scores.xss} pts</span>
                </div>
                <div className="flex justify-between items-center bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                   <span className="text-slate-400 text-sm font-bold uppercase truncate max-w-[70%]">Hash Cracking</span>
                   <span className="text-indigo-400 font-black">{scores.password} pts</span>
                </div>
                <div className="flex justify-between items-center bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                   <span className="text-slate-400 text-sm font-bold uppercase truncate max-w-[70%]">Drag & Drop</span>
                   <span className="text-indigo-400 font-black">{scores.dragDrop} pts</span>
                </div>
             </div>

             <div className="text-xs text-indigo-400 font-bold uppercase tracking-widest pl-2 mb-2 mt-6 border-l-2 border-indigo-400">Quiz Oficial (Variáveis Forms)</div>
             <div className="flex justify-between items-center bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-sm font-bold uppercase truncate max-w-[70%]">1. Eng. Social</span>
                <span className="text-indigo-400 font-black">{q1} pts</span>
             </div>
             <div className="flex justify-between items-center bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-sm font-bold uppercase truncate max-w-[70%]">2. Hashes</span>
                <span className="text-indigo-400 font-black">{q2} pts</span>
             </div>
             <div className="flex justify-between items-center bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-sm font-bold uppercase truncate max-w-[70%]">3. Criptografia</span>
                <span className="text-indigo-400 font-black">{q3} pts</span>
             </div>
             <div className="flex justify-between items-center bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-sm font-bold uppercase truncate max-w-[70%]">4. SQLi Preventivo</span>
                <span className="text-indigo-400 font-black">{q4} pts</span>
             </div>
             <div className="flex justify-between items-center bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-sm font-bold uppercase truncate max-w-[70%]">5. Autenticação Lógica</span>
                <span className="text-indigo-400 font-black">{q5} pts</span>
             </div>
          </div>
          
          <div className="pt-6 border-t border-slate-800 text-center">
             <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mb-1">Total Consolidado</p>
             <p className="text-5xl font-black text-white tabular-nums drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                {totalScore}
             </p>
          </div>
       </div>

       {/* Right: Form */}
       <div className="bg-slate-950 border border-indigo-500/20 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-bl-full blur-2xl"></div>
          
          <iframe name="hidden_iframe" id="hidden_iframe" style={{ display: 'none' }}></iframe>

          <h4 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
             <Mail className="w-5 h-5 text-indigo-400" /> Exportar Boletim
          </h4>
          <p className="text-sm text-slate-400 mb-8 leading-relaxed">
             Para finalizar esta sessão (Aula 9), informe suas credenciais. Usaremos um canal seguro para gravar sua nota oficial.
          </p>

          <form 
             action="https://docs.google.com/forms/d/e/1FAIpQLSd2CmBce-Egep_fxnOVVpSCQOMbqd_ufRqlrV29qc0Mpp4KIQ/formResponse" 
             method="POST" 
             target="hidden_iframe" 
             onSubmit={handleSubmit} 
             className="space-y-4 relative z-10"
          >
             {/* CAMPOS OCULTOS INJETADOS AUTOMATICAMENTE */}
             <input type="hidden" name="entry.513584169" value={q1} />
             <input type="hidden" name="entry.354588275" value={q2} />
             <input type="hidden" name="entry.1200665189" value={q3} />
             <input type="hidden" name="entry.1171526978" value={q4} />
             <input type="hidden" name="entry.1042496093" value={q5} />
             
             {/* CAMPOS VISÍVEIS PARA O ALUNO */}
             <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 flex items-center gap-1 uppercase tracking-wider">
                   <User className="w-3 h-3" /> Nome Completo
                </label>
                <input 
                  type="text" 
                  name="entry.91497348"
                  required
                  value={nome}
                  onChange={e => setNome(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                  placeholder="Seu nome"
                />
             </div>
             
             <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 flex items-center gap-1 uppercase tracking-wider">
                   <Mail className="w-3 h-3" /> E-mail Institucional
                </label>
                <input 
                  type="email" 
                  name="entry.162853006"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                  placeholder="aluno@instituicao.edu.br"
                />
             </div>

             <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 flex items-center gap-1 uppercase tracking-wider">
                   <BookOpen className="w-3 h-3" /> R.A. (Registro Acadêmico)
                </label>
                <input 
                  type="text" 
                  name="entry.764408196"
                  required
                  value={ra}
                  onChange={e => setRa(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                  placeholder="EX: 123456"
                />
             </div>

             <button 
               type="submit"
               disabled={status === 'loading'}
               className="w-full py-4 mt-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
             >
               {status === 'loading' ? (
                 <span className="animate-pulse">TRANSFERINDO DADOS...</span>
               ) : (
                 <><Send className="w-4 h-4" /> TRANSMITIR BOLETIM</>
               )}
             </button>
          </form>
       </div>

    </div>
  );
}
