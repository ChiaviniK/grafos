import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Columns, CheckCircle2, AlertCircle, ChevronRight, Hash } from 'lucide-react';

interface DiffCase {
  id: number;
  title: string;
  description: string;
  sideA: string;
  sideB: string;
  bugLine: number;
  explanation: string;
}

const CASES: DiffCase[] = [
  {
    id: 1,
    title: 'Transposição Numérica',
    description: 'Um valor foi digitado incorretamente em um dos sistemas. Identifique a linha com a divergência.',
    sideA: `{
  "tx_id": "A192",
  "valor": 1250.48,
  "status": "PAID"
}`,
    sideB: `{
  "tx_id": "A192",
  "valor": 1250.84,
  "status": "PAID"
}`,
    bugLine: 3,
    explanation: 'Erro de Transposição: 48 centavos vs 84 centavos. Em larga escala, isso gera furos gigantes no caixa.'
  },
  {
    id: 2,
    title: 'Diferença de Caractere',
    description: 'O ID de rastreamento parece idêntico, mas um caractere mudou.',
    sideA: `{
  "tracking": "BR_81902O",
  "dest": "São Paulo",
  "vol": 12
}`,
    sideB: `{
  "tracking": "BR_819020",
  "dest": "São Paulo",
  "vol": 12
}`,
    bugLine: 2,
    explanation: 'Substituição de "O" (letra) por "0" (zero). Isso quebra buscas automáticas em bancos de dados.'
  },
  {
    id: 3,
    title: 'Ponto vs Vírgula',
    description: 'Padrões internacionais vs nacionais costumam causar esse erro de importação.',
    sideA: `ID | Preço | Obs
01 | 1.500 | OK
02 | 2.100 | OK`,
    sideB: `ID | Preço | Obs
01 | 1,500 | OK
02 | 2.100 | OK`,
    bugLine: 2,
    explanation: 'Simbolo decimal incorreto. O sistema pode ler 1.5 (um e meio) como 1500 (mil e quinhentos).'
  }
];

export function DataDiffChallenge({ onComplete }: { onComplete?: () => void }) {
  const [currentCase, setCurrentCase] = useState(0);
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [finished, setFinished] = useState(false);

  const activeCase = CASES[currentCase];

  const handleLineClick = (lineIdx: number) => {
    if (isCorrect) return;
    setSelectedLine(lineIdx);
    if (lineIdx + 1 === activeCase.bugLine) {
      setIsCorrect(true);
    }
  };

  const nextCase = () => {
    if (currentCase < CASES.length - 1) {
      setCurrentCase(currentCase + 1);
      setSelectedLine(null);
      setIsCorrect(false);
    } else {
      setFinished(true);
      if (onComplete) onComplete();
    }
  };

  const renderSide = (content: string, isSideB: boolean) => {
    const lines = content.split('\n');
    return (
      <div className="flex-1 bg-slate-950/80 rounded-xl border border-slate-800 font-mono text-xs md:text-sm overflow-hidden">
        <div className="bg-slate-900 px-4 py-2 text-[10px] uppercase tracking-widest text-slate-500 flex justify-between">
           <span>{isSideB ? 'SISTEMA B (API)' : 'SISTEMA A (ERP)'}</span>
           <span>LN {lines.length}</span>
        </div>
        <div className="p-4 space-y-1">
          {lines.map((line, idx) => (
            <div 
              key={idx}
              onClick={() => isSideB && handleLineClick(idx)}
              className={`group flex items-center gap-4 transition-all ${isSideB ? 'cursor-pointer hover:bg-white/5' : ''} ${isSideB && selectedLine === idx ? (idx + 1 === activeCase.bugLine ? 'bg-emerald-500/20' : 'bg-rose-500/10') : ''} rounded px-2`}
            >
              <span className="w-4 text-slate-700 text-[10px]">{idx + 1}</span>
              <span className={`whitespace-pre ${isSideB && selectedLine === idx ? (idx + 1 === activeCase.bugLine ? 'text-emerald-400' : 'text-rose-400') : 'text-slate-300'}`}>
                {line}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (finished) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full bg-slate-900 border border-emerald-500/30 rounded-3xl p-12 text-center"
      >
        <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400 mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-3xl font-black text-white mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">Visão de Águia!</h3>
        <p className="text-slate-400 max-w-lg mx-auto">
          Você identificou divergências sutis que passariam despercebidas por 90% das pessoas. No mundo dos dados, a diferença entre o sucesso e a multa bilionária está no nível do caractere.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-400 rounded-full text-[10px] font-black border border-amber-500/20">
          <Hash className="w-3 h-3" /> DESAFIO DE CONCILIAÇÃO {currentCase + 1}/{CASES.length}
        </div>
        <h3 className="text-2xl font-bold text-white">{activeCase.title}</h3>
        <p className="text-slate-400 text-sm">{activeCase.description}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center z-10 hidden md:flex">
          <Columns className="w-4 h-4 text-slate-500" />
        </div>
        
        {renderSide(activeCase.sideA, false)}
        {renderSide(activeCase.sideB, true)}
      </div>

      <AnimatePresence mode="wait">
        {isCorrect ? (
          <motion.div 
            key="correct"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex flex-col items-center gap-4 text-center"
          >
            <div className="flex items-center gap-3 text-emerald-400 font-bold">
              <CheckCircle2 className="w-5 h-5" /> 
              Divergência Encontrada!
            </div>
            <p className="text-xs text-slate-300 max-w-md">{activeCase.explanation}</p>
            <button 
              onClick={nextCase}
              className="mt-2 flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 py-2 rounded-full text-xs transition-all shadow-lg shadow-emerald-500/20"
            >
              PRÓXIMO CASO <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        ) : selectedLine !== null && (
          <motion.div 
            key="wrong"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-center justify-center gap-3 text-rose-400 text-xs font-bold"
          >
            <AlertCircle className="w-4 h-4" /> Linhas idênticas nesta posição. Olhe mais de perto.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
