import { useState } from 'react';
import { CheckCircle2, Link as LinkIcon } from 'lucide-react';

interface DragAndDropProps {
  onComplete: (score: number) => void;
}

const CONCEPTS = [
  {
    id: 'hashing',
    term: 'Hashing',
    definition: 'Algoritmo de via única que transforma dados de tamanho variável em tamanho fixo. Usado para verificar a integridade de senhas.'
  },
  {
    id: 'sqli',
    term: 'SQLi',
    definition: 'Injeção de instrução enganosa que quebra a barreira entre dados e comandos lógicos em um banco.'
  },
  {
    id: 'social',
    term: 'Eng. Social',
    definition: 'Manipulação de pessoas para entregar informações críticas, sendo o elo humano o alvo da operação.'
  },
  {
    id: 'crypto',
    term: 'Criptografia',
    definition: 'Codificação de informações utilizando algoritmos matemáticos, precisando de chaves para reverter o ciframento.'
  }
];

export function SecurityDragAndDrop({ onComplete }: DragAndDropProps) {
  // To avoid complex Drag & Drop lib issues on mobile, we'll use a "Click to Link" mechanic
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({}); // definitionId -> termId
  const [finished, setFinished] = useState(false);

  const handleTermClick = (termId: string) => {
    // If completed or already matched correctly somewhere, don't allow select
    if (finished) return;
    if (Object.values(matches).includes(termId)) {
        // Find if this term is matched correctly. Actually to simplify: a term can only be matched once.
        // If it's already used in ANY match, do not let them select it again, unless they unmatch it. 
        // For simplicity, let's just let them overwrite slots.
    }
    setSelectedTerm(termId === selectedTerm ? null : termId);
  };

  const handleSlotClick = (defId: string) => {
    if (finished) return;
    if (!selectedTerm) {
       // If clicking slot without term, clear slot
       if (matches[defId]) {
          const newMatches = { ...matches };
          delete newMatches[defId];
          setMatches(newMatches);
       }
       return;
    }

    // Assign selected term to this slot
    setMatches(prev => {
       const newMatches = { ...prev };
       // remove this term from any other slot first
       Object.keys(newMatches).forEach(key => {
         if (newMatches[key] === selectedTerm) delete newMatches[key];
       });
       newMatches[defId] = selectedTerm;
       return newMatches;
    });
    setSelectedTerm(null);
  };

  const checkResults = () => {
    let score = 0;
    Object.entries(matches).forEach(([defId, termId]) => {
      if (defId === termId) score += 10;
    });
    setFinished(true);
    // Optional delay to show results visually
    setTimeout(() => {
       onComplete(score);
    }, 2500);
  };

  const allMatched = Object.keys(matches).length === CONCEPTS.length;

  if (finished) {
    let finalScore = 0;
    Object.entries(matches).forEach(([d, t]) => { if(d===t) finalScore+=10; });

    return (
      <div className="w-full max-w-2xl mx-auto bg-indigo-500/10 border border-indigo-500/30 rounded-[2.5rem] p-10 text-center shadow-2xl relative overflow-hidden">
         <CheckCircle2 className="w-20 h-20 text-indigo-400 mx-auto mb-6" />
         <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-2">Conceitos Mapeados!</h3>
         <p className="text-slate-400">Verificando as colisões analíticas na memória.</p>
         <div className="mt-8 text-indigo-400 font-bold bg-indigo-500/20 px-6 py-3 rounded-xl inline-block border border-indigo-500/30">
           Pontuação Adquirida: {finalScore} pontos
         </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative">
      <div className="text-center mb-8">
         <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Conecte os Nós</h2>
         <p className="text-slate-400 text-sm">Selecione um termo do banco e clique em seu respectivo conceito para criar o link.</p>
      </div>

      {/* Terms Bank */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
         {CONCEPTS.map(c => {
           const isUsed = Object.values(matches).includes(c.id);
           const isSelected = selectedTerm === c.id;
           let style = "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-600";
           
           if (isUsed) style = "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 opacity-50 grayscale";
           else if (isSelected) style = "bg-indigo-600 border-indigo-400 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)] scale-105";

           return (
             <button
                key={`term-${c.id}`}
                onClick={() => handleTermClick(c.id)}
                disabled={isUsed || finished}
                className={`px-5 py-3 rounded-xl border-2 font-bold transition-all ${style}`}
             >
                {c.term}
             </button>
           );
         })}
      </div>

      {/* Definitions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         {CONCEPTS.map(c => {
           const matchedTermId = matches[c.id];
           const matchedTermObj = CONCEPTS.find(t => t.id === matchedTermId);
           
           let boxStyle = "border-slate-800 bg-slate-950/50 text-slate-400";
           if (selectedTerm && !matchedTermId) boxStyle = "border-indigo-500/50 bg-indigo-500/5 cursor-pointer hover:bg-indigo-500/10 border-dashed animate-pulse";
           if (matchedTermId) boxStyle = "border-emerald-500 bg-emerald-500/10 cursor-pointer";

           return (
             <div 
               key={`def-${c.id}`}
               onClick={() => handleSlotClick(c.id)}
               className={`p-5 rounded-2xl border-2 transition-all flex flex-col relative h-36 ${boxStyle}`}
             >
               <p className="text-sm font-medium leading-relaxed mb-4">{c.definition}</p>
               
               <div className="mt-auto flex justify-end">
                  {matchedTermObj ? (
                    <div className="bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-lg">
                       <LinkIcon className="w-3 h-3" /> {matchedTermObj.term}
                    </div>
                  ) : (
                    <div className="bg-slate-900 border border-slate-800 text-slate-600 text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider">
                       Slot Vazio
                    </div>
                  )}
               </div>
             </div>
           );
         })}
      </div>

      {/* Submit */}
      <div className="mt-10 pt-6 border-t border-slate-800 flex justify-center">
         <button
            onClick={checkResults}
            disabled={!allMatched || finished}
            className="bg-indigo-600 text-white font-bold px-10 py-4 rounded-xl flex items-center gap-3 hover:bg-indigo-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed group shadow-[0_0_20px_rgba(99,102,241,0.3)] w-full sm:w-auto justify-center"
         >
            {finished ? 'ANALISANDO...' : 'SINTETIZAR RESULTADOS'}
            {!finished && <CheckCircle2 className="w-5 h-5 group-hover:scale-110 transition-transform" />}
         </button>
      </div>

    </div>
  );
}
