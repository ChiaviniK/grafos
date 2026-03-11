import { useState } from "react";

// ── Heating Curve — Animated graph of temperature vs heat for water ──
export function HeatingCurve() {
  const [Q, setQ] = useState(0); // 0..100 slider value

  // Breakpoints (normalized 0-100)
  // 0-10: solid heating  (-20→0°C)
  // 10-25: fusion plateau (0°C)
  // 25-60: liquid heating (0→100°C)
  // 60-80: vaporization plateau (100°C)
  // 80-100: steam heating (100→150°C)

  function getTemp(q: number): number {
    if (q <= 10)  return -20 + q * 2;          // -20 to 0°C
    if (q <= 25)  return 0;                     // fusion plateau
    if (q <= 60)  return ((q - 25) / 35) * 100; // 0 to 100°C
    if (q <= 80)  return 100;                   // vaporization plateau
    return 100 + ((q - 80) / 20) * 50;          // 100 to 150°C
  }

  function getState(q: number): { label: string; emoji: string; color: string } {
    if (q < 10)  return { label: "Sólido (Gelo)", emoji: "🧊", color: "text-blue-300" };
    if (q <= 25) return { label: "Fusão (0°C constante)", emoji: "🧊→💧", color: "text-cyan-300" };
    if (q < 60)  return { label: "Líquido (Água)", emoji: "💧", color: "text-sky-300" };
    if (q <= 80) return { label: "Vaporização (100°C constante)", emoji: "💧→💨", color: "text-orange-300" };
    return { label: "Vapor (Gás)", emoji: "💨", color: "text-rose-300" };
  }

  const temp = getTemp(Q);
  const state = getState(Q);

  // Build SVG path points
  const points: [number, number][] = [];
  const W = 440, H = 180;
  const pad = { l: 50, r: 20, t: 15, b: 30 };
  for (let q = 0; q <= 100; q += 2) {
    const x = pad.l + (q / 100) * (W - pad.l - pad.r);
    const t = getTemp(q);
    const y = H - pad.b - ((t + 20) / 170) * (H - pad.t - pad.b);
    points.push([x, y]);
  }
  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");

  const curX = pad.l + (Q / 100) * (W - pad.l - pad.r);
  const curY = H - pad.b - ((temp + 20) / 170) * (H - pad.t - pad.b);

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <span className="text-xs font-black tracking-widest text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">SIMULADOR</span>
      <h2 className="text-3xl font-black text-slate-100 mt-3 mb-2">📊 Curva de Aquecimento da Água</h2>
      <p className="text-slate-500 text-sm mb-4">Arraste o slider e observe como a temperatura e o estado da água mudam com o calor fornecido.</p>

      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 mb-4">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 180 }}>
          {/* Grid */}
          {[-20, 0, 50, 100, 150].map(t => {
            const y = H - pad.b - ((t + 20) / 170) * (H - pad.t - pad.b);
            return (
              <g key={t}>
                <line x1={pad.l} y1={y} x2={W - pad.r} y2={y} stroke="#334155" strokeWidth="1" strokeDasharray="3,3" />
                <text x={pad.l - 5} y={y + 4} fontSize="9" fill="#64748b" textAnchor="end">{t}°C</text>
              </g>
            );
          })}
          {/* Axes */}
          <line x1={pad.l} y1={pad.t} x2={pad.l} y2={H - pad.b} stroke="#475569" strokeWidth="1.5" />
          <line x1={pad.l} y1={H - pad.b} x2={W - pad.r} y2={H - pad.b} stroke="#475569" strokeWidth="1.5" />
          <text x={W / 2} y={H - 5} fontSize="10" fill="#64748b" textAnchor="middle">Calor fornecido (Q) →</text>
          <text x={10} y={H / 2} fontSize="10" fill="#64748b" textAnchor="middle" transform={`rotate(-90, 10, ${H / 2})`}>Temperatura →</text>
          {/* Path */}
          <path d={pathD} stroke="url(#grad)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="30%" stopColor="#38bdf8" />
              <stop offset="65%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>
          </defs>
          {/* Current point */}
          <circle cx={curX} cy={curY} r="6" fill="#fbbf24" stroke="#92400e" strokeWidth="1.5" />
          <line x1={curX} y1={curY} x2={curX} y2={H - pad.b} stroke="#fbbf24" strokeWidth="1" strokeDasharray="3,3" />
        </svg>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <label className="text-xs font-bold text-slate-400 shrink-0">Calor Q:</label>
        <input type="range" min={0} max={100} value={Q} onChange={e => setQ(+e.target.value)} className="flex-1 accent-sky-400" />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-3 text-center">
          <div className="text-xs text-slate-500 mb-1">TEMPERATURA</div>
          <div className="text-2xl font-black text-amber-300">{temp.toFixed(1)} °C</div>
        </div>
        <div className={`bg-slate-900 border border-slate-700 rounded-xl p-3 text-center ${state.color}`}>
          <div className="text-xs text-slate-500 mb-1">ESTADO</div>
          <div className="text-xl">{state.emoji}</div>
        </div>
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-3 text-center">
          <div className="text-xs text-slate-500 mb-1">FASE</div>
          <div className={`text-xs font-bold ${state.color}`}>{state.label}</div>
        </div>
      </div>

      <div className="mt-3 bg-amber-950/20 border border-amber-500/20 rounded-xl p-3 text-xs text-amber-200">
        💡 <strong>Observe os patamares!</strong> Durante a fusão (0°C) e vaporização (100°C), o calor fornecido NÃO aumenta a temperatura — vai para romper ligações intermoleculares. Isso é o calor latente!
      </div>
    </div>
  );
}

// ── Dilation Bar ─────────────────────────────────────────────────────────────
export function DilationBar() {
  const [dT, setDT] = useState(0);
  const materials = [
    { name: "Ferro", alpha: 12, color: "#94a3b8" },
    { name: "Alumínio", alpha: 23, color: "#fbbf24" },
    { name: "Cobre", alpha: 17, color: "#f97316" },
    { name: "Vidro", alpha: 9, color: "#7dd3fc" },
    { name: "Concreto", alpha: 12, color: "#a8a29e" },
  ];
  const [selMat, setSelMat] = useState(0);
  const L0 = 1; // 1 meter
  const mat = materials[selMat];
  const dL = mat.alpha * 1e-6 * L0 * dT;
  const pctGrow = Math.min(dL / L0 * 100 * 50, 40); // visual scale

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <span className="text-xs font-black tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">SIMULADOR</span>
      <h2 className="text-3xl font-black text-slate-100 mt-3 mb-2">📏 Dilatação Térmica Visual</h2>
      <p className="text-slate-500 text-sm mb-4">Escolha o material e aumente a temperatura para ver a barra dilatar.</p>

      <div className="flex gap-2 flex-wrap mb-4">
        {materials.map((m, i) => (
          <button key={m.name} onClick={() => setSelMat(i)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition-all ${selMat === i ? "border-amber-500 text-amber-300 bg-amber-950/30" : "border-slate-700 text-slate-400"}`}>
            {m.name}
          </button>
        ))}
      </div>

      {/* Visual bar */}
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-slate-500 w-10">0</span>
          <div className="flex-1 relative h-10 bg-slate-800 rounded-lg overflow-visible">
            {/* Base bar */}
            <div className="absolute inset-0 rounded-lg" style={{ background: mat.color + "33", border: `2px solid ${mat.color}66` }} />
            {/* Dilated portion */}
            <div className="absolute top-0 right-0 h-full rounded-l-none rounded-r-lg transition-all duration-300"
              style={{ width: `${pctGrow}%`, background: mat.color, opacity: 0.7 }} />
            {/* Label */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-black" style={{ color: mat.color }}>{mat.name} — L = {(L0 + dL).toFixed(5)} m</span>
            </div>
          </div>
          <span className="text-xs text-slate-500 w-16 text-right">+ ΔL={( dL*1000).toFixed(3)}mm</span>
        </div>
        <p className="text-xs text-slate-600 text-center">Dilatação exagerada para visualização · escala real seria imperceptível ao olho</p>
      </div>

      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 mb-4">
        <label className="text-xs font-bold text-slate-400 block mb-1">ΔT: <span className="text-amber-300">{dT} °C</span></label>
        <input type="range" min={0} max={300} value={dT} onChange={e => setDT(+e.target.value)} className="w-full accent-amber-400" />
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "α", value: `${mat.alpha}×10⁻⁶ /°C`, sub: "coef. linear" },
          { label: "ΔL", value: `${(dL * 1000).toFixed(3)} mm`, sub: "dilatação" },
          { label: "L final", value: `${(L0 + dL).toFixed(6)} m`, sub: "comprimento" },
        ].map((s, i) => (
          <div key={i} className="bg-slate-900 border border-amber-500/20 rounded-xl p-3 text-center">
            <div className="text-xs text-slate-500 mb-1">{s.label}</div>
            <div className="text-lg font-black text-amber-300">{s.value}</div>
            <div className="text-xs text-slate-600">{s.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── PV Diagram ───────────────────────────────────────────────────────────────
export function PVDiagram() {
  const [process, setProcess] = useState<"isothermal"|"isobaric"|"isochoric"|"adiabatic">("isothermal");
  const [T, setT] = useState(300);   // K
  const [P0, setP0] = useState(100); // kPa
  const [V0, setV0] = useState(25);  // L
  const R = 8.314;

  const W = 400, H = 220, pad = { l: 50, r: 20, t: 20, b: 40 };
  const pMax = 400, vMax = 80;

  function toSVG(V: number, P: number) {
    const x = pad.l + (V / vMax) * (W - pad.l - pad.r);
    const y = H - pad.b - (P / pMax) * (H - pad.t - pad.b);
    return [x, y] as [number, number];
  }

  let pathPoints: [number, number][] = [];
  let label = "";
  let color = "#fb923c";

  if (process === "isothermal") {
    // PV = nRT = constant → P = nRT/V, using n=1 mol
    const nRT = 1 * R * T;
    color = "#60a5fa";
    label = `Isotérmica (T=${T}K constante)`;
    for (let v = 5; v <= 75; v += 2) {
      const p = (nRT / (v * 0.001)) / 1000; // kPa
      if (p < pMax) pathPoints.push(toSVG(v, p));
    }
  } else if (process === "isobaric") {
    color = "#4ade80";
    label = `Isobárica (P=${P0}kPa constante)`;
    pathPoints = [toSVG(5, P0), toSVG(75, P0)];
  } else if (process === "isochoric") {
    color = "#f472b6";
    label = `Isocórica (V=${V0}L constante)`;
    pathPoints = [toSVG(V0, 10), toSVG(V0, pMax - 10)];
  } else {
    // Adiabatic: PV^γ = cte, γ=1.4 (diatomic), steeper than isothermal
    color = "#fb923c";
    label = "Adiabática (Q=0, mais íngreme que isotérmica)";
    const gamma = 1.4;
    const C = P0 * Math.pow(V0 * 0.001, gamma);
    for (let v = 5; v <= 75; v += 2) {
      const p = C / Math.pow(v * 0.001, gamma) / 1000;
      if (p > 0 && p < pMax) pathPoints.push(toSVG(v, p));
    }
  }

  const pathD = pathPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");

  const processInfo: Record<string, string> = {
    isothermal: "T constante → PV = nRT = cte. Trabalho W = nRT·ln(V₂/V₁). ΔU = 0.",
    isobaric:   "P constante → V/T = cte (Charles). Trabalho W = PΔV. ΔU = nCᵥΔT.",
    isochoric:  "V constante → P/T = cte (Gay-Lussac). W = 0. ΔU = Q.",
    adiabatic:  "Q = 0 → PVᵞ = cte. Expansão → esfria. Compressão → aquece.",
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <span className="text-xs font-black tracking-widest text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">SIMULADOR</span>
      <h2 className="text-3xl font-black text-slate-100 mt-3 mb-2">📈 Diagrama PV Interativo</h2>

      <div className="flex gap-2 flex-wrap mb-4">
        {(["isothermal","isobaric","isochoric","adiabatic"] as const).map(p => {
          const labels = { isothermal:"🌡️ Isotérmica", isobaric:"📊 Isobárica", isochoric:"📦 Isocórica", adiabatic:"💨 Adiabática" };
          return (
            <button key={p} onClick={() => setProcess(p)}
              className={`px-3 py-2 rounded-xl text-xs font-bold border-2 transition-all ${process === p ? "border-orange-500 bg-orange-950/30 text-orange-300" : "border-slate-700 text-slate-400"}`}>
              {labels[p]}
            </button>
          );
        })}
      </div>

      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 mb-4">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 220 }}>
          {[100, 200, 300, 400].map(p => {
            const [, y] = toSVG(0, p);
            return <g key={p}><line x1={pad.l} y1={y} x2={W - pad.r} y2={y} stroke="#1e293b" strokeWidth="1" /><text x={pad.l - 5} y={y + 4} fontSize="9" fill="#64748b" textAnchor="end">{p}</text></g>;
          })}
          {[20, 40, 60, 80].map(v => {
            const [x] = toSVG(v, 0);
            return <g key={v}><line x1={x} y1={pad.t} x2={x} y2={H - pad.b} stroke="#1e293b" strokeWidth="1" /><text x={x} y={H - pad.b + 14} fontSize="9" fill="#64748b" textAnchor="middle">{v}L</text></g>;
          })}
          <line x1={pad.l} y1={pad.t} x2={pad.l} y2={H - pad.b} stroke="#475569" strokeWidth="1.5" />
          <line x1={pad.l} y1={H - pad.b} x2={W - pad.r} y2={H - pad.b} stroke="#475569" strokeWidth="1.5" />
          <text x={(W - pad.l - pad.r) / 2 + pad.l} y={H - 8} fontSize="10" fill="#64748b" textAnchor="middle">Volume (L) →</text>
          <text x={12} y={H / 2} fontSize="10" fill="#64748b" textAnchor="middle" transform={`rotate(-90,12,${H / 2})`}>Pressão (kPa) →</text>
          {pathPoints.length > 1 && <path d={pathD} stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" />}
          {pathPoints[0] && <circle cx={pathPoints[0][0]} cy={pathPoints[0][1]} r="5" fill={color} opacity="0.8" />}
          {pathPoints.length > 1 && <circle cx={pathPoints[pathPoints.length - 1][0]} cy={pathPoints[pathPoints.length - 1][1]} r="5" fill={color} opacity="0.8" />}
        </svg>
      </div>

      {["isothermal"].includes(process) && (
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4 mb-3 space-y-2">
          <div><label className="text-xs font-bold text-slate-400 block mb-1">T: <span className="text-blue-300">{T} K ({T - 273}°C)</span></label><input type="range" min={200} max={600} value={T} onChange={e => setT(+e.target.value)} className="w-full accent-blue-400"/></div>
        </div>
      )}
      {["isobaric"].includes(process) && (
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4 mb-3">
          <label className="text-xs font-bold text-slate-400 block mb-1">P: <span className="text-green-300">{P0} kPa</span></label><input type="range" min={20} max={350} value={P0} onChange={e => setP0(+e.target.value)} className="w-full accent-green-400"/>
        </div>
      )}
      {["isochoric","adiabatic"].includes(process) && (
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4 mb-3 space-y-2">
          <div><label className="text-xs font-bold text-slate-400 block mb-1">V₀: <span className="text-pink-300">{V0} L</span></label><input type="range" min={5} max={60} value={V0} onChange={e => setV0(+e.target.value)} className="w-full accent-pink-400"/></div>
          <div><label className="text-xs font-bold text-slate-400 block mb-1">P₀: <span className="text-orange-300">{P0} kPa</span></label><input type="range" min={20} max={350} value={P0} onChange={e => setP0(+e.target.value)} className="w-full accent-orange-400"/></div>
        </div>
      )}

      <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-sm">
        <p className="font-bold text-slate-100 mb-1">{label}</p>
        <p className="text-slate-400 text-xs">{processInfo[process]}</p>
      </div>
    </div>
  );
}

// ── Carnot Engine Visualization ───────────────────────────────────────────────
export function CarnotEngine() {
  const [Th, setTh] = useState(600);
  const [Tc, setTc] = useState(300);
  const [Qh_in, setQh] = useState(1000);

  const eta = 1 - Tc / Th;
  const W   = Qh_in * eta;
  const Qc  = Qh_in - W;
  const pctEta = Math.round(eta * 100);

  const flowH  = Math.max(20, (Qh_in / 2000) * 120);
  const flowW  = Math.max(10, W / 2000 * 120);
  const flowC  = Math.max(10, (Qc / 2000) * 120);

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <span className="text-xs font-black tracking-widest text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">SIMULADOR</span>
      <h2 className="text-3xl font-black text-slate-100 mt-3 mb-2">⚙️ Motor de Carnot Animado</h2>
      <p className="text-slate-500 text-sm mb-5">Ajuste Th e Tc para ver como muda o rendimento e o fluxo de calor.</p>

      {/* Visual Engine */}
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 mb-4 flex flex-col items-center gap-3">
        {/* Hot source */}
        <div className="bg-rose-950/40 border-2 border-rose-500/50 rounded-2xl px-8 py-3 text-center w-64">
          <p className="text-xs font-black text-rose-400">FONTE QUENTE (Th)</p>
          <p className="text-2xl font-black text-rose-300">{Th} K</p>
        </div>
        {/* Flow down */}
        <div className="flex flex-col items-center">
          <div className="bg-rose-500/60 rounded-full animate-pulse" style={{ width: Math.max(12, flowH * 0.6), height: 32 }} />
          <p className="text-xs text-rose-400 font-bold">Qh = {Qh_in.toFixed(0)} J ↓</p>
        </div>
        {/* Engine */}
        <div className="bg-slate-800 border-2 border-amber-500/60 rounded-2xl px-8 py-3 text-center w-64 flex flex-col items-center">
          <p className="text-xs font-black text-amber-400">⚙️ MÁQUINA TÉRMICA</p>
          <p className="text-3xl font-black text-amber-300">{pctEta}%</p>
          <p className="text-xs text-slate-500">rendimento η = 1 – Tc/Th</p>
          <div className="flex items-center gap-2 mt-2 text-emerald-300">
            <p className="text-xs font-bold">→ W = {W.toFixed(0)} J</p>
            <div className="bg-emerald-500/60 rounded-full animate-pulse" style={{ width: Math.max(8, flowW * 0.5), height: 12 }} />
          </div>
        </div>
        {/* Flow down */}
        <div className="flex flex-col items-center">
          <p className="text-xs text-blue-400 font-bold">Qc = {Qc.toFixed(0)} J ↓</p>
          <div className="bg-blue-500/60 rounded-full animate-pulse" style={{ width: Math.max(8, flowC * 0.5), height: 24 }} />
        </div>
        {/* Cold sink */}
        <div className="bg-blue-950/40 border-2 border-blue-500/50 rounded-2xl px-8 py-3 text-center w-64">
          <p className="text-xs font-black text-blue-400">FONTE FRIA (Tc)</p>
          <p className="text-2xl font-black text-blue-300">{Tc} K</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 space-y-3 mb-4">
        <div><label className="text-xs font-bold text-slate-400 block mb-1">Th (fonte quente): <span className="text-rose-300">{Th} K ({Th - 273}°C)</span></label><input type="range" min={Tc + 50} max={1200} value={Th} onChange={e => setTh(+e.target.value)} className="w-full accent-rose-400"/></div>
        <div><label className="text-xs font-bold text-slate-400 block mb-1">Tc (fonte fria): <span className="text-blue-300">{Tc} K ({Tc - 273}°C)</span></label><input type="range" min={200} max={Th - 50} value={Tc} onChange={e => setTc(+e.target.value)} className="w-full accent-blue-400"/></div>
        <div><label className="text-xs font-bold text-slate-400 block mb-1">Qh absolvido: <span className="text-amber-300">{Qh_in} J</span></label><input type="range" min={100} max={2000} step={100} value={Qh_in} onChange={e => setQh(+e.target.value)} className="w-full accent-amber-400"/></div>
      </div>

      <div className="bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-slate-400">
        🔑 <strong>2ª Lei:</strong> Nenhuma máquina real supera o rendimento de Carnot. Para maximizar η, maximize Th ou minimize Tc (ou ambos).
      </div>
    </div>
  );
}
