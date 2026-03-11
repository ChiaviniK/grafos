import { useState } from "react";

interface Flashcard { front: string; back: string; example?: string; unit?: string; }

interface FormulaFlashcardProps {
  cards: Flashcard[];
  title?: string;
  color?: string; // tailwind color name e.g. "amber"
}

export function FormulaFlashcard({ cards, title = "📋 Fórmulas do ENEM", color = "amber" }: FormulaFlashcardProps) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<Set<number>>(new Set());
  const [review, setReview] = useState<Set<number>>(new Set());

  const card = cards[idx];
  const total = cards.length;

  function next() { setIdx(i => (i + 1) % total); setFlipped(false); }
  function prev() { setIdx(i => (i - 1 + total) % total); setFlipped(false); }
  function markKnown() { setKnown(s => new Set([...s, idx])); setReview(s => { const n = new Set(s); n.delete(idx); return n; }); next(); }
  function markReview() { setReview(s => new Set([...s, idx])); setKnown(s => { const n = new Set(s); n.delete(idx); return n; }); next(); }

  const pct = Math.round((known.size / total) * 100);

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-black text-slate-100">{title}</h2>
        <span className="text-xs text-slate-500 font-mono">{idx + 1}/{total}</span>
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 bg-slate-800 rounded-full h-2">
          <div className={`bg-${color}-400 h-2 rounded-full transition-all`} style={{ width: `${pct}%` }} />
        </div>
        <span className="text-xs text-slate-500">{known.size} memorizados</span>
      </div>

      {/* Dot indicators */}
      <div className="flex gap-1.5 justify-center mb-4">
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={() => { setIdx(i); setFlipped(false); }}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === idx ? `bg-${color}-400 scale-125` :
              known.has(i) ? "bg-emerald-500" :
              review.has(i) ? "bg-rose-500" : "bg-slate-700"
            }`}
          />
        ))}
      </div>

      {/* Card flip */}
      <div
        className="cursor-pointer select-none"
        onClick={() => setFlipped(f => !f)}
        style={{ perspective: "1000px" }}
      >
        <div className={`relative transition-all duration-500`} style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0)" }}>
          {/* Front */}
          <div className={`bg-slate-950 border-2 border-${color}-500/30 rounded-3xl p-8 min-h-[200px] flex flex-col items-center justify-center text-center`}
            style={{ backfaceVisibility: "hidden" }}>
            <p className="text-xs font-black tracking-widest text-slate-500 mb-4">FÓRMULA — toque para virar</p>
            <code className={`text-3xl font-black text-${color}-300 font-mono`}>{card.front}</code>
            {card.unit && <p className="text-slate-500 text-sm mt-2">Unidade: {card.unit}</p>}
          </div>
          {/* Back */}
          <div className="absolute inset-0 bg-slate-950 border-2 border-emerald-500/30 rounded-3xl p-8 flex flex-col items-center justify-center text-center"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
            <p className="text-xs font-black tracking-widest text-slate-500 mb-3">SIGNIFICADO</p>
            <p className="text-slate-100 font-bold text-lg mb-3">{card.back}</p>
            {card.example && (
              <div className="bg-slate-900 rounded-xl px-4 py-2 text-sm text-slate-400 border border-slate-700">
                💡 {card.example}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 mt-5 justify-center">
        <button onClick={prev} className="px-4 py-2 rounded-xl border border-slate-700 text-slate-400 hover:border-slate-500 text-sm transition-all">← Anterior</button>
        {flipped && (
          <>
            <button onClick={markReview} className="px-4 py-2 rounded-xl bg-rose-900/30 border border-rose-500/40 text-rose-300 text-sm font-bold hover:bg-rose-900/50 transition-all">😅 Revisar</button>
            <button onClick={markKnown} className="px-4 py-2 rounded-xl bg-emerald-900/30 border border-emerald-500/40 text-emerald-300 text-sm font-bold hover:bg-emerald-900/50 transition-all">✅ Sei!</button>
          </>
        )}
        <button onClick={next} className="px-4 py-2 rounded-xl border border-slate-700 text-slate-400 hover:border-slate-500 text-sm transition-all">Próximo →</button>
      </div>

      <p className="text-center text-slate-600 text-xs mt-3">Clique no card para ver o significado · Marque se memorizou</p>
    </div>
  );
}
