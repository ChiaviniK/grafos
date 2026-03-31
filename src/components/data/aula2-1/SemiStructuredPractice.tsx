import { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, CheckCircle2 } from 'lucide-react';

export function SemiStructuredPractice({ onComplete }: { onComplete?: () => void }) {
  const [completed, setCompleted] = useState(false);

  const handleCorrectClick = () => {
    setCompleted(true);
    if (onComplete) {
      setTimeout(() => onComplete(), 1000);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-6 relative overflow-hidden flex flex-col items-center">
      <div className="absolute top-0 w-full h-8 bg-slate-950 flex items-center px-4 border-b border-slate-800">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500" />
          <div className="w-3 h-3 rounded-full bg-amber-500" />
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
        </div>
        <div className="mx-auto flex items-center gap-2 text-slate-500 text-xs font-mono">
          <Terminal className="w-3 h-3" /> API_Response.json
        </div>
      </div>

      <div className="text-center mt-6 mb-6">
        <h3 className="text-xl font-bold text-white mb-2">
          A Caça ao Valor no JSON
        </h3>
        <p className="text-sm text-slate-400">
          A API retornou este objeto aninhado. Sua missão é extrair o <strong className="text-amber-400">email do contato</strong>.<br/>
          Clique no valor correto diretamente no código abaixo para capturá-lo.
        </p>
      </div>

      <div className="w-full max-w-xl bg-slate-950 rounded-xl p-4 font-mono text-sm sm:text-base text-slate-300 border border-slate-800 shadow-inner overflow-x-auto">
<pre className="text-slate-500">
{`{
  `}<span className="text-sky-400">"status"</span>{`: `}<span className="text-emerald-400">200</span>{`,
  `}<span className="text-sky-400">"data"</span>{`: {
    `}<span className="text-sky-400">"user"</span>{`: {
      `}<span className="text-sky-400">"id"</span>{`: `}<span className="text-emerald-400">4912</span>{`,
      `}<span className="text-sky-400">"name"</span>{`: `}<span className="text-amber-500">"João Silva"</span>{`,
      `}<span className="text-sky-400">"contact"</span>{`: {
        `}<span className="text-sky-400">"phone"</span>{`: `}<button onClick={() => {}} className="text-amber-500 hover:bg-slate-800 px-1 rounded transition-colors cursor-pointer">"+55 11 99999-9999"</button>{`,
        `}<span className="text-sky-400">"email"</span>{`: `}<button onClick={handleCorrectClick} className={`px-1 rounded transition-all cursor-pointer ${completed ? 'bg-emerald-500 text-white font-bold' : 'text-amber-500 hover:bg-slate-800'}`}>"joao@empresa.com"</button>{`
      }
    },
    `}<span className="text-sky-400">"preferences"</span>{`: {
      `}<span className="text-sky-400">"newsletter"</span>{`: `}<span className="text-fuchsia-400">true</span>{`
    }
  }
}`}
</pre>
      </div>

      {completed && (
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 flex items-center gap-2 text-emerald-400 font-bold bg-emerald-900/20 px-4 py-2 rounded-full border border-emerald-500/30">
          <CheckCircle2 className="w-5 h-5" /> Você capturou: data.user.contact.email
        </motion.div>
      )}
    </div>
  );
}
