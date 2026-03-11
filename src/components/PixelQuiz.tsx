import { useState, useEffect } from "react";

// Pixel art sprite animation using React + CSS
// Frames are in a horizontal sprite sheet. e.g. Idle_4 = 4 frames wide.

type CharState = "idle"|"jump"|"hurt"|"run"|"attack";

interface SpriteProps { character?: 0|1|2; state?: CharState; scale?: number; }

const CHARS = ["Pink_Monster","Owlet_Monster","Dude_Monster"] as const;

const STATE_MAP: Record<CharState, { file: string; frames: number; fps: number }> = {
  idle:   { file:"Idle_4",   frames:4,  fps:6  },
  jump:   { file:"Jump_8",   frames:8,  fps:10 },
  hurt:   { file:"Hurt_4",   frames:4,  fps:8  },
  run:    { file:"Run_6",    frames:6,  fps:10 },
  attack: { file:"Attack1_4",frames:4,  fps:8  },
};

export function Sprite({ character=0, state="idle", scale=3 }: SpriteProps) {
  const [frame, setFrame] = useState(0);
  const cfg = STATE_MAP[state];
  const char = CHARS[character];

  useEffect(() => {
    setFrame(0);
    const id = setInterval(() => setFrame(f => (f+1) % cfg.frames), 1000/cfg.fps);
    return () => clearInterval(id);
  }, [state, cfg.frames, cfg.fps]);

  const frameW = 32; const frameH = 32;
  const src = `/sprites/${character+1} ${char}/${char}_${cfg.file}.png`;

  return (
    <div style={{
      width: frameW*scale,
      height: frameH*scale,
      backgroundImage:`url('${src}')`,
      backgroundPosition:`-${frame*frameW*scale}px 0`,
      backgroundSize:`${cfg.frames*frameW*scale}px ${frameH*scale}px`,
      imageRendering:"pixelated",
      display:"inline-block",
    }} />
  );
}

// ── PixelQuiz: personagem que reage às respostas ──────────────────────────────
interface PQQuestion {
  q: string;
  opts: string[];
  correct: number;
  explanation: string;
}

interface PixelQuizProps {
  questions: PQQuestion[];
  character?: 0|1|2;
  title?: string;
  subtitle?: string;
}

export function PixelQuiz({ questions, character=0, title="🎮 Dinâmica com o Professor Pixel", subtitle="Responda e veja a reação do personagem!" }: PixelQuizProps) {
  const [qIdx, setQIdx] = useState(0);
  const [charState, setCharState] = useState<CharState>("idle");
  const [ans, setAns] = useState<number|null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [bubble, setBubble] = useState(questions[0].q);

  const q = questions[qIdx];

  function handleAnswer(i: number) {
    if (ans !== null) return;
    setAns(i);
    const ok = i === q.correct;
    if (ok) {
      setScore(s => s+1);
      setCharState("attack");
      setBubble("✅ Isso aí! " + q.explanation);
      setTimeout(() => setCharState("jump"), 600);
      setTimeout(() => setCharState("idle"), 1600);
    } else {
      setCharState("hurt");
      setBubble("❌ " + q.explanation);
      setTimeout(() => setCharState("idle"), 1200);
    }
  }

  function nextQ() {
    if (qIdx + 1 >= questions.length) { setFinished(true); return; }
    const next = qIdx + 1;
    setQIdx(next);
    setAns(null);
    setCharState("run");
    setBubble(questions[next].q);
    setTimeout(() => setCharState("idle"), 800);
  }

  if (finished) {
    const pct = Math.round((score/questions.length)*100);
    return (
      <div className="max-w-3xl mx-auto bg-slate-950 border-2 border-amber-500/30 rounded-3xl p-8 text-center animate-in fade-in">
        <Sprite character={character} state={score===questions.length?"jump":"idle"} scale={4} />
        <h2 className="text-3xl font-black text-white mt-4 mb-2">Resultado Final 🎮</h2>
        <div className="text-6xl font-black text-amber-400 mb-2">{score}/{questions.length}</div>
        <div className="text-slate-400 mb-4">{pct}% de acertos</div>
        <div className={`text-lg font-bold ${pct===100?"text-emerald-300":pct>=60?"text-amber-300":"text-rose-300"}`}>
          {pct===100?"🤩 Perfeito! Mestre da Física!":pct>=60?"😊 Muito bem! Revise os erros.":"😅 Bora revisar o conteúdo!"}
        </div>
        <button onClick={()=>{setFinished(false);setQIdx(0);setAns(null);setScore(0);setCharState("idle");setBubble(questions[0].q);}}
          className="mt-5 px-6 py-2 bg-amber-600 hover:bg-amber-500 text-white font-black rounded-xl transition-all text-sm">
          Jogar Novamente 🔄
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-3xl font-black text-slate-100 mb-1">{title}</h2>
      <p className="text-slate-500 text-sm mb-5">{subtitle}</p>

      <div className="bg-slate-950 border-2 border-amber-500/30 rounded-3xl p-6 mb-5">
        {/* Character + bubble */}
        <div className="flex items-start gap-5 mb-5">
          <div className="shrink-0 flex flex-col items-center gap-2">
            <Sprite character={character} state={charState} scale={4} />
            <div className="flex gap-1">
              {questions.map((_,i) => (
                <div key={i} className={`w-2 h-2 rounded-full ${i<qIdx?"bg-emerald-500":i===qIdx?"bg-amber-400":"bg-slate-700"}`}/>
              ))}
            </div>
          </div>
          <div className="flex-1 bg-slate-900 border border-slate-700 rounded-2xl rounded-tl-none p-4 relative">
            <div className="absolute -left-3 top-4 w-3 h-3 bg-slate-900 border-l border-b border-slate-700 rotate-45"/>
            <p className="text-slate-200 font-semibold text-sm leading-relaxed">{bubble}</p>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-2">
          {q.opts.map((opt,i) => {
            const base = "w-full text-left p-3 rounded-xl border-2 transition-all text-sm font-medium flex gap-3 items-start";
            const cls = ans===null
              ? `${base} border-slate-700 bg-slate-900 hover:border-amber-500/50 hover:bg-slate-800`
              : i===q.correct
                ? `${base} border-emerald-500 bg-emerald-950/30 text-emerald-200 scale-[1.01]`
                : ans===i
                  ? `${base} border-rose-500 bg-rose-950/30 text-rose-200 opacity-70`
                  : `${base} border-slate-800 opacity-20`;
            return (
              <button key={i} disabled={ans!==null} onClick={()=>handleAnswer(i)} className={cls}>
                <span className="font-black text-slate-500 shrink-0 w-5">{["A","B","C","D"][i]})</span>
                <span>{opt}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Next button */}
      {ans !== null && (
        <div className="flex justify-between items-center animate-in slide-in-from-bottom-4">
          <span className="text-slate-500 text-sm">Questão {qIdx+1}/{questions.length} · Acertos: {score}</span>
          <button onClick={nextQ} className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white font-black rounded-xl text-sm transition-all">
            {qIdx+1 < questions.length ? "Próxima →" : "Ver Resultado 🏆"}
          </button>
        </div>
      )}
    </div>
  );
}
