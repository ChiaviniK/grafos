import { useState, useEffect } from "react";

interface CircuitSimulatorProps { mini?: boolean; }

export function CircuitSimulator({ mini }: CircuitSimulatorProps) {
  const [mode, setMode] = useState<"serie"|"paralelo">("serie");
  const [V, setV] = useState(12);
  const [R1, setR1] = useState(100);
  const [R2, setR2] = useState(200);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let t = 0;
    let animId: number;
    const run = () => { t++; setTick(t); animId = requestAnimationFrame(run); };
    animId = requestAnimationFrame(run);
    return () => cancelAnimationFrame(animId);
  }, []);

  const Req = mode === "serie" ? R1 + R2 : 1 / (1/R1 + 1/R2);
  const Itotal = V / Req;
  const I1 = mode === "serie" ? Itotal : V / R1;
  const I2 = mode === "serie" ? Itotal : V / R2;
  const V1 = mode === "serie" ? I1 * R1 : V;
  const V2 = mode === "serie" ? I2 * R2 : V;
  const P1 = V1 * I1; const P2 = V2 * I2;
  const Ptotal = P1 + P2;

  const fmt = (n: number) => n >= 1000 ? (n/1000).toFixed(2)+"k" : n >= 1 ? n.toFixed(2) : (n*1000).toFixed(1)+"m";
  const speed = Math.min(Itotal * 50, 3);

  // SVG electron dots
  const numDots = 6;
  const dots = Array.from({ length: numDots }, (_, i) => (tick * speed + i * (100/numDots)) % 100);

  // Circuit paths for drawing
  // Serie: bat → R1 → R2 → back to bat
  // Paralelo: bat → splits to R1 and R2 → rejoins → bat

  return (
    <div className={`bg-slate-950 rounded-3xl border-2 border-amber-500/30 overflow-hidden ${mini ? "p-4" : "p-6"}`}>
      {/* Mode selector */}
      <div className="flex gap-3 mb-5 justify-center">
        {(["serie","paralelo"] as const).map(m => (
          <button key={m} onClick={()=>setMode(m)}
            className={`px-5 py-2 rounded-xl font-black text-sm border-2 transition-all ${mode===m?"border-amber-500 bg-amber-950/40 text-amber-300":"border-slate-700 text-slate-500 hover:border-slate-500"}`}>
            {m==="serie"?"🔗 Série":"⚡ Paralelo"}
          </button>
        ))}
      </div>

      {/* SVG Circuit Diagram */}
      <div className="flex justify-center mb-5">
        <svg width="480" height="220" viewBox="0 0 480 220" className="max-w-full">
          <defs>
            <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#f59e0b" />
            </marker>
          </defs>

          {mode === "serie" ? (
            // SÉRIE: simple loop
            <>
              {/* Wires */}
              <path d="M60,110 L80,110" stroke="#64748b" strokeWidth="2" fill="none"/>
              <path d="M80,110 L80,40 L180,40" stroke="#64748b" strokeWidth="2" fill="none"/>
              <path d="M260,40 L360,40 L360,110" stroke="#64748b" strokeWidth="2" fill="none"/>
              <path d="M440,110 L460,110 L460,180 L80,180 L80,110" stroke="#64748b" strokeWidth="2" fill="none"/>
              {/* Resistors */}
              <rect x="180" y="28" width="80" height="24" rx="4" fill="#1e293b" stroke="#f59e0b" strokeWidth="2"/>
              <text x="220" y="43" textAnchor="middle" fill="#f59e0b" fontSize="10" fontFamily="monospace">R₁={R1}Ω</text>
              <rect x="360" y="98" width="80" height="24" rx="4" fill="#1e293b" stroke="#60a5fa" strokeWidth="2"/>
              <text x="400" y="113" textAnchor="middle" fill="#60a5fa" fontSize="10" fontFamily="monospace">R₂={R2}Ω</text>
              {/* Battery */}
              <line x1="60" y1="90" x2="60" y2="130" stroke="#4ade80" strokeWidth="3"/>
              <line x1="50" y1="100" x2="70" y2="100" stroke="#4ade80" strokeWidth="2"/>
              <line x1="55" y1="120" x2="65" y2="120" stroke="#4ade80" strokeWidth="2"/>
              <text x="60" y="80" textAnchor="middle" fill="#4ade80" fontSize="9" fontFamily="monospace">{V}V</text>
              {/* Ammeter */}
              <circle cx="240" cy="180" r="12" fill="#1e293b" stroke="#e879f9" strokeWidth="2"/>
              <text x="240" y="184" textAnchor="middle" fill="#e879f9" fontSize="9" fontFamily="monospace">A</text>
              {/* Electrons - loop path: top-right then bottom */}
              {dots.map((p,i) => {
                let x: number, y: number;
                const perimeter = 80+180+180+180; // approx path length
                const pos = (p / 100) * perimeter;
                if (pos < 80) { x = 80+(pos/80)*100; y = 110-(pos/80)*70; }
                else if (pos < 260) { x = 180+((pos-80)/180)*180; y = 40; }
                else if (pos < 440) { x = 360; y = 40+((pos-260)/180)*70; }
                else { x = 360-((pos-440)/140)*280; y = 110; }
                return <circle key={i} cx={x} cy={y} r="4" fill="#fbbf24" opacity="0.9" />;
              })}
            </>
          ) : (
            // PARALELO: split paths
            <>
              {/* Main wires */}
              <path d="M60,110 L80,110 L80,60 L140,60" stroke="#64748b" strokeWidth="2" fill="none"/>
              <path d="M60,110 L80,110 L80,160 L140,160" stroke="#64748b" strokeWidth="2" fill="none"/>
              <path d="M300,60 L360,60 L360,110 L440,110" stroke="#64748b" strokeWidth="2" fill="none"/>
              <path d="M300,160 L360,160 L360,110" stroke="#64748b" strokeWidth="2" fill="none"/>
              <path d="M440,110 L460,110 L460,190 L40,190 L40,110 L60,110" stroke="#64748b" strokeWidth="2" fill="none"/>
              {/* Resistors */}
              <rect x="140" y="48" width="160" height="24" rx="4" fill="#1e293b" stroke="#f59e0b" strokeWidth="2"/>
              <text x="220" y="63" textAnchor="middle" fill="#f59e0b" fontSize="10" fontFamily="monospace">R₁={R1}Ω  I₁={fmt(I1)}A</text>
              <rect x="140" y="148" width="160" height="24" rx="4" fill="#1e293b" stroke="#60a5fa" strokeWidth="2"/>
              <text x="220" y="163" textAnchor="middle" fill="#60a5fa" fontSize="10" fontFamily="monospace">R₂={R2}Ω  I₂={fmt(I2)}A</text>
              {/* Battery */}
              <line x1="60" y1="90" x2="60" y2="130" stroke="#4ade80" strokeWidth="3"/>
              <line x1="50" y1="100" x2="70" y2="100" stroke="#4ade80" strokeWidth="2"/>
              <line x1="55" y1="120" x2="65" y2="120" stroke="#4ade80" strokeWidth="2"/>
              <text x="60" y="80" textAnchor="middle" fill="#4ade80" fontSize="9" fontFamily="monospace">{V}V</text>
              {/* Ammeter */}
              <circle cx="250" cy="190" r="12" fill="#1e293b" stroke="#e879f9" strokeWidth="2"/>
              <text x="250" y="194" textAnchor="middle" fill="#e879f9" fontSize="9" fontFamily="monospace">A</text>
              {/* Electrons top branch */}
              {dots.slice(0,3).map((p,i) => {
                const x = 80 + (p/100)*280; const y = 60;
                return <circle key={i} cx={x} cy={y} r="4" fill="#fbbf24" opacity="0.9"/>;
              })}
              {/* Electrons bottom branch */}
              {dots.slice(3).map((p,i) => {
                const x = 80 + (p/100)*280; const y = 160;
                return <circle key={i} cx={x} cy={y} r="4" fill="#38bdf8" opacity="0.9"/>;
              })}
            </>
          )}
        </svg>
      </div>

      {/* Sliders */}
      <div className="grid md:grid-cols-3 gap-4 mb-5">
        <div className="bg-slate-900 rounded-xl p-3">
          <label className="text-xs font-bold text-green-400 block mb-1">🔋 Tensão V: <span className="text-green-300">{V} V</span></label>
          <input type="range" min={1} max={24} value={V} onChange={e=>setV(+e.target.value)} className="w-full accent-green-400"/>
        </div>
        <div className="bg-slate-900 rounded-xl p-3">
          <label className="text-xs font-bold text-amber-400 block mb-1">🟧 R₁: <span className="text-amber-300">{R1} Ω</span></label>
          <input type="range" min={10} max={500} step={10} value={R1} onChange={e=>setR1(+e.target.value)} className="w-full accent-amber-400"/>
        </div>
        <div className="bg-slate-900 rounded-xl p-3">
          <label className="text-xs font-bold text-blue-400 block mb-1">🟦 R₂: <span className="text-blue-300">{R2} Ω</span></label>
          <input type="range" min={10} max={500} step={10} value={R2} onChange={e=>setR2(+e.target.value)} className="w-full accent-blue-400"/>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label:"R_eq", val:`${fmt(Req)} Ω`, color:"text-amber-300 border-amber-500/30 bg-amber-950/20" },
          { label:"I total", val:`${fmt(Itotal)} A`, color:"text-purple-300 border-purple-500/30 bg-purple-950/20" },
          { label:"P total", val:`${fmt(Ptotal)} W`, color:"text-rose-300 border-rose-500/30 bg-rose-950/20" },
          { label:mode==="serie"?"V₁ / V₂":"I₁ / I₂", val:mode==="serie"?`${fmt(V1)}V / ${fmt(V2)}V`:`${fmt(I1)}A / ${fmt(I2)}A`, color:"text-sky-300 border-sky-500/30 bg-sky-950/20" },
        ].map((c,i) => (
          <div key={i} className={`rounded-2xl border p-3 text-center ${c.color}`}>
            <div className="text-xs font-bold opacity-70 mb-1">{c.label}</div>
            <div className="font-black text-base">{c.val}</div>
          </div>
        ))}
      </div>

      {/* Insight */}
      <div className="mt-4 bg-slate-900/60 border border-slate-700 rounded-xl p-3 text-xs text-slate-400">
        {mode === "serie"
          ? `📌 Série: R_eq = R₁+R₂ = ${R1+R2} Ω. Mesma corrente (${fmt(Itotal)}A) em ambos. V₁=${fmt(V1)}V, V₂=${fmt(V2)}V. V₁+V₂=${fmt(V1+V2)}V ≈ ${V}V ✓`
          : `📌 Paralelo: 1/R_eq = 1/${R1}+1/${R2}. R_eq=${fmt(Req)}Ω < menor ramo (${Math.min(R1,R2)}Ω). I total=${fmt(Itotal)}A = I₁+I₂=${fmt(I1+I2)}A ✓`}
      </div>
    </div>
  );
}
