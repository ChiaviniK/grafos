import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, MessageSquareText } from 'lucide-react';

export function UnstructuredPractice({ onComplete }: { onComplete?: () => void }) {
  const [foundEntity, setFoundEntity] = useState(false);
  const [foundSentiment, setFoundSentiment] = useState(false);

  const checkCompletion = (entity: boolean, sentiment: boolean) => {
    if (entity && sentiment) {
      if (onComplete) {
        setTimeout(() => onComplete(), 1000);
      }
    }
  };

  const handleEntity = () => {
    setFoundEntity(true);
    checkCompletion(true, foundSentiment);
  };

  const handleSentiment = () => {
    setFoundSentiment(true);
    checkCompletion(foundEntity, true);
  };

  return (
    <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-6 relative overflow-hidden flex flex-col items-center">
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <MessageSquareText className="w-5 h-5 text-purple-400" /> 
          Processamento de Linguagem Natural
        </h3>
        <p className="text-sm text-slate-400 max-w-lg">
          O computador vê apenas uma "string" longa caótica. Como analista (e IA), sua missão é extrair estruturação do texto identificando as palavras-chave.<br/>
          Encontre e clique na <strong>Entidade (Produto)</strong> e no <strong>Sentimento (Adjetivo principal)</strong> no texto abaixo.
        </p>
      </div>

      <div className="w-full max-w-2xl bg-slate-950 p-8 rounded-xl border border-slate-800 shadow-inner text-lg md:text-xl leading-relaxed text-slate-300">
        <p>
          "Eu comprei o novo <button 
            onClick={handleEntity} 
            className={`px-1 mx-1 rounded transition-all font-bold ${foundEntity ? 'bg-sky-500/20 text-sky-400 ring-2 ring-sky-500' : 'hover:bg-slate-800'}`}
          >shampoo</button> de hidratação profunda semana passada, mas confesso
          que o resultado foi absolutamente <button 
            onClick={handleSentiment} 
            className={`px-1 mx-1 rounded transition-all font-bold ${foundSentiment ? 'bg-rose-500/20 text-rose-400 ring-2 ring-rose-500' : 'hover:bg-slate-800'}`}
          >horrível</button>. Meu cabelo ficou 
          completamente ressecado e sem vida. Exijo meu dinheiro de volta."
        </p>
      </div>

      <div className="flex gap-6 mt-8">
        <div className={`p-4 rounded-xl border flex flex-col items-center transition-all ${foundEntity ? 'border-sky-500 bg-sky-500/10' : 'border-slate-800 bg-slate-950'}`}>
           <span className="text-xs font-black uppercase text-slate-500 mb-1">Passo 1</span>
           <span className={`font-bold ${foundEntity ? 'text-sky-400' : 'text-slate-400'}`}>Entidade: {foundEntity ? 'Shampoo' : '?????'}</span>
        </div>
        <div className={`p-4 rounded-xl border flex flex-col items-center transition-all ${foundSentiment ? 'border-rose-500 bg-rose-500/10' : 'border-slate-800 bg-slate-950'}`}>
           <span className="text-xs font-black uppercase text-slate-500 mb-1">Passo 2</span>
           <span className={`font-bold ${foundSentiment ? 'text-rose-400' : 'text-slate-400'}`}>Sentimento: {foundSentiment ? 'Negativo' : '?????'}</span>
        </div>
      </div>

      <AnimatePresence>
        {foundEntity && foundSentiment && (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="mt-8 flex items-center gap-2 text-emerald-400 font-bold bg-emerald-900/20 px-4 py-2 rounded-full border border-emerald-500/30">
            <CheckCircle2 className="w-5 h-5" /> Você transformou um dado cruz em Informação Estruturada!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
