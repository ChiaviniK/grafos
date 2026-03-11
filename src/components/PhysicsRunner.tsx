import { useState, useEffect, useRef, useCallback } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────
interface QuizItem {
  question: string;
  correct: string;   // text of the correct answer
  wrongs: string[];  // 2 wrong answers (shown as obstacles)
}

interface PhysicsRunnerProps {
  questions: QuizItem[];
  character?: 0 | 1 | 2;   // 0=Pink, 1=Owlet, 2=Dude
  title?: string;
}

// ── Sprite config ─────────────────────────────────────────────────────────────
const CHARS = ["Pink_Monster", "Owlet_Monster", "Dude_Monster"] as const;
const FRAME_W = 32;
const FRAME_H = 32;
const SCALE   = 3;
const W = FRAME_W * SCALE; // 96px
const H = FRAME_H * SCALE; // 96px

type SprState = "run" | "jump" | "hurt" | "idle" | "attack";
const ANIM: Record<SprState, { file: string; frames: number; fps: number }> = {
  run:    { file: "Run_6",     frames: 6, fps: 10 },
  jump:   { file: "Jump_8",    frames: 8, fps: 14 },
  hurt:   { file: "Hurt_4",    frames: 4, fps: 8  },
  idle:   { file: "Idle_4",    frames: 4, fps: 6  },
  attack: { file: "Attack1_4", frames: 4, fps: 8  },
};

function SpriteDiv({ character, state }: { character: 0|1|2; state: SprState }) {
  const [frame, setFrame] = useState(0);
  const cfg = ANIM[state];
  useEffect(() => {
    setFrame(0);
    const id = setInterval(() => setFrame(f => (f + 1) % cfg.frames), 1000 / cfg.fps);
    return () => clearInterval(id);
  }, [state, cfg.frames, cfg.fps]);
  const char = CHARS[character];
  const src = `/sprites/${character + 1} ${char}/${char}_${cfg.file}.png`;
  return (
    <div style={{
      width: W, height: H,
      backgroundImage: `url('${src}')`,
      backgroundPosition: `-${frame * W}px 0`,
      backgroundSize: `${cfg.frames * W}px ${H}px`,
      imageRendering: "pixelated",
      display: "inline-block",
    }} />
  );
}

// ── Game constants ─────────────────────────────────────────────────────────────
const GROUND_Y    = 60;   // px from bottom where character stands
const JUMP_V      = -14;  // jump velocity
const GRAVITY     = 0.7;
const ITEM_SPEED  = 3.5;
const CANVAS_W    = 560;
const CANVAS_H    = 200;

interface Item {
  id: number;
  x: number;
  y: number;
  text: string;
  isCorrect: boolean;
  hit: boolean;
}

// ── Main Component ─────────────────────────────────────────────────────────────
export function PhysicsRunner({ questions, character = 0, title = "🏃 Física Runner" }: PhysicsRunnerProps) {
  const [phase, setPhase] = useState<"start" | "playing" | "gameover" | "win">("start");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [qIdx, setQIdx] = useState(0);
  const [sprState, setSprState] = useState<SprState>("idle");
  const [items, setItems] = useState<Item[]>([]);
  const [charY, setCharY] = useState(GROUND_Y);
  const [feedback, setFeedback] = useState<{ text: string; ok: boolean } | null>(null);

  // Refs for game loop
  const velY     = useRef(0);
  const isJump   = useRef(false);
  const tick     = useRef(0);
  const idCtr    = useRef(0);
  const livesRef = useRef(3);
  const scoreRef = useRef(0);
  const qIdxRef  = useRef(0);
  const phaseRef = useRef<"start"|"playing"|"gameover"|"win">("start");
  const rAF      = useRef<number>(0);

  const currentQ = questions[qIdx] ?? questions[0];

  // ── Jump handler ───────────────────────────────────────────────────────────
  const jump = useCallback(() => {
    if (!isJump.current && phaseRef.current === "playing") {
      velY.current = JUMP_V;
      isJump.current = true;
      setSprState("jump");
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.code === "Space") { e.preventDefault(); jump(); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [jump]);

  // ── Spawn items for current question ──────────────────────────────────────
  function spawnItems() {
    const q = questions[qIdxRef.current] ?? questions[0];
    const all = [
      { text: q.correct, isCorrect: true },
      { text: q.wrongs[0], isCorrect: false },
      { text: q.wrongs[1] ?? "Errado!", isCorrect: false },
    ].sort(() => Math.random() - 0.5);

    return all.map((a, i) => ({
      id: idCtr.current++,
      x: CANVAS_W + i * 180 + 60,
      y: GROUND_Y + 10,
      text: a.text,
      isCorrect: a.isCorrect,
      hit: false,
    }));
  }

  // ── Game loop ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "playing") return;

    phaseRef.current = "playing";
    tick.current = 0;
    setItems(spawnItems());

    const loop = () => {
      tick.current++;

      // Gravity
      velY.current += GRAVITY;
      setCharY(y => {
        const next = y - velY.current;
        if (next <= GROUND_Y) {
          velY.current = 0;
          isJump.current = false;
          setSprState("run");
          return GROUND_Y;
        }
        return next;
      });

      // Move items + collision
      setItems(prev => {
        const next = prev
          .map(it => ({ ...it, x: it.x - ITEM_SPEED }))
          .filter(it => it.x > -80);

        let livesChanged = false;
        let scoreChanged = false;
        let nextQ = false;

        for (const it of next) {
          if (it.hit) continue;
          const charLeft = 40, charRight = charLeft + W;
          const itemLeft = it.x;
          const itemRight = it.x + 100;
          const overlap = charLeft < itemRight && charRight > itemLeft;

          if (overlap) {
            it.hit = true;
            if (it.isCorrect) {
              scoreRef.current++;
              scoreChanged = true;
              setSprState("attack");
              setFeedback({ text: "✅ " + it.text, ok: true });
              nextQ = true;
              setTimeout(() => setSprState("run"), 600);
              setTimeout(() => setFeedback(null), 1500);
            } else {
              livesRef.current--;
              livesChanged = true;
              setSprState("hurt");
              setFeedback({ text: "❌ " + it.text, ok: false });
              setTimeout(() => setSprState("run"), 600);
              setTimeout(() => setFeedback(null), 1500);
            }
          }
        }

        if (scoreChanged) setScore(scoreRef.current);
        if (livesChanged) setLives(livesRef.current);

          if (nextQ) {
            const nq = qIdxRef.current + 1;
            if (nq >= questions.length) {
              phaseRef.current = "win";
              setPhase("win");
              return next;
            }
            qIdxRef.current = nq;
            setQIdx(nq);
            return spawnItems();
          }

        // Game over
        if (livesRef.current <= 0) {
          phaseRef.current = "gameover";
          setPhase("gameover");
        }

        return next;
      });

      if (phaseRef.current === "playing") {
        rAF.current = requestAnimationFrame(loop);
      }
    };

    rAF.current = requestAnimationFrame(loop);
    return () => { if (rAF.current) cancelAnimationFrame(rAF.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  function startGame() {
    livesRef.current = 3; scoreRef.current = 0; qIdxRef.current = 0;
    velY.current = 0; isJump.current = false; tick.current = 0; idCtr.current = 0;
    setLives(3); setScore(0); setQIdx(0); setCharY(GROUND_Y);
    setSprState("run"); setItems([]); setFeedback(null);
    setPhase("playing");
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-3xl font-black text-slate-100 mb-1">{title}</h2>
      <p className="text-slate-500 text-sm mb-4">
        Colete a resposta <span className="text-emerald-400 font-bold">CORRETA</span> e pule as <span className="text-rose-400 font-bold">ERRADAS</span>!
        Tecle <kbd className="bg-slate-700 px-2 py-0.5 rounded text-xs">Espaço</kbd> ou toque na tela para pular.
      </p>

      {/* HUD */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-1">{[0,1,2].map(i => <span key={i} className={`text-xl ${i < lives ? "opacity-100" : "opacity-20"}`}>❤️</span>)}</div>
        <div className="text-amber-300 font-black text-sm">⭐ {score}/{questions.length}</div>
        <div className="text-slate-500 text-xs">Q {qIdx + 1}/{questions.length}</div>
      </div>

      {/* Question bar */}
      <div className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 mb-3 text-sm text-slate-300 text-center font-semibold min-h-[2.5rem] flex items-center justify-center">
        {currentQ.question}
      </div>

      {/* Feedback */}
      {feedback && (
        <div className={`text-center text-sm font-black mb-2 animate-in fade-in ${feedback.ok ? "text-emerald-400" : "text-rose-400"}`}>
          {feedback.text}
        </div>
      )}

      {/* Game canvas */}
      <div
        className="relative bg-slate-950 border-2 border-slate-700 rounded-2xl overflow-hidden cursor-pointer select-none"
        style={{ width: "100%", height: CANVAS_H, maxWidth: CANVAS_W }}
        onClick={jump}
      >
        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-slate-800 border-t border-slate-700" />
        <div className="absolute bottom-8 left-0 right-0 h-px bg-slate-700" />

        {/* Character */}
        <div
          className="absolute transition-none"
          style={{ left: 40, bottom: charY }}
        >
          <SpriteDiv character={character} state={sprState} />
        </div>

        {/* Items */}
        {items.filter(it => !it.hit).map(it => (
          <div
            key={it.id}
            className={`absolute flex items-center justify-center rounded-xl border-2 px-2 py-1 text-xs font-bold text-center max-w-[110px] leading-tight transition-none ${
              it.isCorrect
                ? "border-emerald-500/60 bg-emerald-950/80 text-emerald-300"
                : "border-rose-500/60 bg-rose-950/80 text-rose-300"
            }`}
            style={{ left: it.x, bottom: it.y, width: 110 }}
          >
            {it.isCorrect ? "✅ " : "❌ "}{it.text}
          </div>
        ))}

        {/* Overlays */}
        {phase === "start" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/80">
            <p className="text-slate-300 font-bold mb-3">Pronto para correr? 🏃</p>
            <button onClick={e => { e.stopPropagation(); startGame(); }} className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl text-sm transition-all">
              Iniciar Jogo ▶
            </button>
          </div>
        )}
        {phase === "gameover" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/90">
            <p className="text-3xl mb-1">😵</p>
            <p className="text-rose-300 font-black text-lg mb-1">Game Over!</p>
            <p className="text-slate-400 text-sm mb-3">Você fez {score}/{questions.length} pontos</p>
            <button onClick={e => { e.stopPropagation(); startGame(); }} className="px-6 py-2 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-xl text-sm transition-all">
              Tentar Novamente 🔄
            </button>
          </div>
        )}
        {phase === "win" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/90">
            <p className="text-4xl mb-1">🏆</p>
            <p className="text-amber-300 font-black text-lg mb-1">You Win!</p>
            <p className="text-slate-400 text-sm mb-3">{score}/{questions.length} corretas!</p>
            <button onClick={e => { e.stopPropagation(); startGame(); }} className="px-6 py-2 bg-amber-600 hover:bg-amber-500 text-white font-black rounded-xl text-sm transition-all">
              Jogar Novamente 🎮
            </button>
          </div>
        )}
      </div>

      <p className="text-xs text-slate-600 text-center mt-2">
        Items <span className="text-emerald-600">verdes</span> = corretos → colete! · Items <span className="text-rose-600">vermelhos</span> = errados → pule!
      </p>
    </div>
  );
}
