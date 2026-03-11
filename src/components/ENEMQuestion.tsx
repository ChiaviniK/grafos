import { useState } from "react";

interface ENEMOption { letter: "A"|"B"|"C"|"D"|"E"; text: string; }

interface ENEMQuestionProps {
  year?: number;
  subject?: string;
  context: string; // texto de contexto (notícia, situação real, dado científico)
  question: string;
  options: ENEMOption[];
  correct: "A"|"B"|"C"|"D"|"E";
  resolution: string; // gabarito comentado passo a passo
  difficulty?: "fácil"|"médio"|"difícil";
}

const DIFF_COLORS = {
  fácil: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  médio: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  difícil: "bg-rose-500/10 text-rose-400 border-rose-500/30",
};

export function ENEMQuestion({
  year, subject = "Ciências da Natureza",
  context, question, options, correct, resolution,
  difficulty = "médio",
}: ENEMQuestionProps) {
  const [chosen, setChosen] = useState<"A"|"B"|"C"|"D"|"E"|null>(null);
  const [showRes, setShowRes] = useState(false);

  const answered = chosen !== null;
  const isRight = chosen === correct;

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
      {/* Header ENEM */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <span className="bg-blue-600/20 text-blue-300 font-black px-3 py-1 rounded-xl border border-blue-500/30 text-xs tracking-widest">
          📋 ENEM{year ? ` ${year}` : ""} — {subject}
        </span>
        <span className={`text-xs font-bold px-3 py-1 rounded-xl border ${DIFF_COLORS[difficulty]}`}>
          {difficulty === "fácil" ? "⭐" : difficulty === "médio" ? "⭐⭐" : "⭐⭐⭐"} {difficulty}
        </span>
      </div>

      {/* Context box */}
      <div className="bg-slate-900 border-l-4 border-blue-500 rounded-r-2xl p-5 mb-4 text-slate-300 text-sm leading-relaxed">
        <p className="text-xs font-black text-blue-400 mb-2 tracking-widest">TEXTO DE APOIO</p>
        {context}
      </div>

      {/* Question */}
      <p className="font-bold text-slate-100 text-base mb-4 leading-relaxed">{question}</p>

      {/* Options A-E */}
      <div className="space-y-2 mb-4">
        {options.map(opt => {
          let cls = "border-slate-700 bg-slate-900/60 hover:border-blue-500/40 text-slate-200";
          if (answered) {
            if (opt.letter === correct) cls = "border-emerald-500 bg-emerald-950/30 text-emerald-100 scale-[1.01]";
            else if (opt.letter === chosen) cls = "border-rose-500 bg-rose-950/30 text-rose-300 opacity-70";
            else cls = "border-slate-800 opacity-20";
          }
          return (
            <button
              key={opt.letter}
              disabled={answered}
              onClick={() => { setChosen(opt.letter); setShowRes(false); }}
              className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex gap-3 text-sm ${cls}`}
            >
              <span className="font-black text-slate-400 w-6 shrink-0">{opt.letter})</span>
              <span>{opt.text}</span>
            </button>
          );
        })}
      </div>

      {/* Feedback after answer */}
      {answered && (
        <div className={`rounded-2xl p-4 mb-3 animate-in slide-in-from-bottom-3 text-sm ${isRight ? "bg-emerald-900/30 border border-emerald-500/40" : "bg-rose-900/30 border border-rose-500/40"}`}>
          <p className={`font-black mb-1 ${isRight ? "text-emerald-300" : "text-rose-300"}`}>
            {isRight ? "✅ Correto! Gabarito: " : "❌ Incorreto. Gabarito: "}<strong>{correct}</strong>
          </p>
          <button
            onClick={() => setShowRes(!showRes)}
            className={`text-xs font-bold underline ${isRight ? "text-emerald-400" : "text-rose-400"}`}
          >
            {showRes ? "▲ Ocultar resolução" : "▼ Ver resolução passo a passo"}
          </button>
          {showRes && (
            <div className="mt-3 bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-slate-300 leading-relaxed animate-in fade-in">
              <p className="text-xs font-black text-slate-400 mb-2 tracking-widest">RESOLUÇÃO</p>
              {resolution}
            </div>
          )}
        </div>
      )}

      {/* Reset */}
      {answered && (
        <button
          onClick={() => { setChosen(null); setShowRes(false); }}
          className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
        >
          🔄 Tentar novamente
        </button>
      )}
    </div>
  );
}
