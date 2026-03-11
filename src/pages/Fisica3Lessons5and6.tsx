import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import { CircuitSimulator } from "../components/CircuitSimulator";
import { PixelQuiz } from "../components/PixelQuiz";

function Shell({ title, aula, total, current, onPrev, onNext, children }: {
  title: string; aula: string; total: number; current: number;
  onPrev: () => void; onNext: () => void; children: React.ReactNode;
}) {
  const pct = Math.round(((current + 1) / total) * 100);
  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 flex flex-col">
      <nav className="flex items-center justify-between px-6 py-3 border-b border-slate-800 bg-slate-950/80 backdrop-blur shrink-0">
        <Link to="/fisica3" className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium"><Home className="w-4 h-4" /> Física 3</Link>
        <div className="flex-1 mx-6 bg-slate-800 rounded-full h-1.5"><div className="bg-amber-400 h-1.5 rounded-full transition-all" style={{ width: `${pct}%` }} /></div>
        <span className="text-slate-500 text-xs font-mono shrink-0">{aula} · {current + 1}/{total}</span>
      </nav>
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 md:px-16 py-8">{children}</div>
      <div className="flex justify-between items-center px-6 py-4 border-t border-slate-800 bg-slate-950/80 backdrop-blur shrink-0">
        <button onClick={onPrev} disabled={current === 0} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-700 text-slate-400 hover:border-slate-500 disabled:opacity-30 transition-all font-semibold text-sm"><ChevronLeft className="w-4 h-4" /> Anterior</button>
        <span className="text-slate-600 text-xs hidden sm:block truncate max-w-xs">{title}</span>
        <button onClick={onNext} disabled={current === total - 1} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-30 text-white font-bold transition-all text-sm">Próximo <ChevronRight className="w-4 h-4" /></button>
      </div>
    </div>
  );
}

function Quiz({ n, total, q, opts, correct, explanation }: { n:number; total:number; q:string; opts:string[]; correct:number; explanation:string }) {
  const [ans, setAns] = useState<number|null>(null);
  return (
    <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
      <span className="text-xs font-black tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">QUIZ {n} / {total}</span>
      <h2 className="text-xl font-black text-slate-100 mt-4 mb-4">{q}</h2>
      <div className="space-y-3 mb-4">
        {opts.map((o,i) => {
          const cls = ans===null ? "border-slate-700 hover:border-amber-500/50 bg-slate-900" : i===correct ? "border-emerald-500 bg-emerald-950/30 text-emerald-100 scale-[1.01]" : ans===i ? "border-rose-500 bg-rose-950/30 opacity-60" : "border-slate-800 opacity-20";
          return <button key={i} disabled={ans!==null} onClick={()=>setAns(i)} className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex gap-3 text-sm ${cls}`}><span className="font-black text-slate-500 shrink-0">{["A","B","C","D"][i]})</span><span>{o}</span></button>;
        })}
      </div>
      {ans!==null && <div className={`p-4 rounded-2xl text-sm animate-in slide-in-from-bottom-4 ${ans===correct?"bg-emerald-900/30 border border-emerald-500/40 text-emerald-200":"bg-rose-900/30 border border-rose-500/40 text-rose-200"}`}>{explanation}</div>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SEMANA 5 — Eletrodinâmica: Corrente Elétrica
// ═══════════════════════════════════════════════════════════════════════════════
const SEM5: React.FC[] = [
  // S1 Capa
  () => (
    <div className="flex flex-col items-center justify-center min-h-[72vh] text-center animate-in fade-in zoom-in duration-700 relative">
      <div className="absolute inset-0 opacity-10 rounded-3xl" style={{ backgroundImage:"url('/sprites/backgrounds/5/2304x1296.png')", backgroundSize:"cover", imageRendering:"pixelated" }} />
      <div className="relative z-10 max-w-2xl">
        <span className="bg-amber-500/20 text-amber-400 font-bold px-4 py-1.5 rounded-full text-xs tracking-widest border border-amber-500/30">FÍSICA 3 · SEMANA 5</span>
        <div className="text-8xl my-6">⚡</div>
        <h1 className="text-5xl md:text-6xl font-black text-white leading-none mb-4">Eletrodinâmica:<br /><span className="text-emerald-400">Corrente Elétrica</span></h1>
        <p className="text-xl text-slate-400 mb-6">Do estático ao dinâmico. Quando cargas se movem de forma ordenada, surge a corrente — o que alimenta toda a tecnologia moderna.</p>
        <div className="flex gap-3 flex-wrap justify-center text-sm">
          {["⚡ i = ΔQ/Δt","→ Sentido convencional","🔥 Efeito Joule","💡 Condutores/Isolantes"].map(t => (
            <div key={t} className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-xl text-slate-300">{t}</div>
          ))}
        </div>
      </div>
    </div>
  ),
  // S2 Gancho
  () => {
    const [rev, setRev] = useState(false);
    return (
      <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
        <span className="text-xs font-black tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">PROVOCAÇÃO</span>
        <h2 className="text-3xl font-black text-slate-100 mt-5 mb-5">Por que um relâmpago ilumina e um fio elétrico não? ⚡</h2>
        <div className="space-y-3 mb-5">
          {["Num relâmpago haverá 30.000 A por ~1 ms. Num LED haverá 20 mA por horas.","O que torna o cobre um metal tão especial para fios?","Por que borracha isola e água do mar conduz?","Como funciona um fusível que 'estoura' para proteger o circuito?"].map((s,i)=>(
            <div key={i} className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-slate-300 text-sm">{s}</div>
          ))}
        </div>
        <button onClick={()=>setRev(true)} className={`w-full py-4 rounded-2xl font-bold border-2 transition-all ${rev?"border-emerald-500 bg-emerald-950/20 text-emerald-200":"border-slate-600 text-slate-400 hover:border-emerald-500"}`}>
          {rev ? "✅ É tudo sobre corrente elétrica — fluxo de cargas no tempo!" : "👆 O que essas situações têm em comum?"}
        </button>
        {rev && <div className="mt-4 bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 animate-in fade-in text-emerald-200">Corrente elétrica é o fluxo ordenado de cargas elétricas por um condutor. i = ΔQ/Δt. A intensidade (A), o material, a tensão aplicada — tudo embasa o comportamento de qualquer circuito.</div>}
      </div>
    );
  },
  // S3 Conceito de Corrente
  () => (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-4xl font-black text-slate-100 mb-5">⚡ Corrente Elétrica (i)</h2>
      <div className="bg-slate-950 border-2 border-emerald-500/30 rounded-3xl p-6 text-center mb-5">
        <code className="text-3xl font-mono font-black text-emerald-300">i = ΔQ / Δt</code>
        <p className="text-slate-500 text-sm mt-2">Carga ΔQ que atravessa uma seção por unidade de tempo Δt. Unidade: Ampere = C/s</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        {[
          {i:"→",t:"Sentido Convencional",d:"Positivo → Negativo (histórico). Elétrons vão em sentido contrário (− → +). Em eletrônica, usamos o convencional por padrão.",c:"text-amber-300"},
          {i:"🔥",t:"Efeito Joule",d:"Corrente atravessando resistência gera calor: P = R·i². Chuveiros, torradeiras, fusíveis — tudo usa Joule.",c:"text-rose-300"},
          {i:"💡",t:"Corrente vs Tensão",d:"Tensão (V) é o que EMPURRA a corrente. Corrente (i) é o FLUXO resultante. São coisas diferentes! i = V/R.",c:"text-sky-300"},
          {i:"🌊",t:"Analogia do Rio",d:"ΔV = diferença de altura. Corrente = fluxo de água. Resistência = pedras no fundo. Maior altura → mais fluxo.",c:"text-blue-300"},
        ].map((c,i) => (
          <div key={i} className="bg-slate-900 border border-slate-700 rounded-2xl p-4 flex gap-3">
            <span className={`text-2xl font-black shrink-0 ${c.c}`}>{c.i}</span>
            <div><p className="font-bold text-slate-100 text-sm">{c.t}</p><p className="text-slate-400 text-xs mt-1">{c.d}</p></div>
          </div>
        ))}
      </div>
    </div>
  ),
  // S4 Calculadora de Corrente
  () => {
    const [q, setQ] = useState(10); const [t, setT] = useState(5);
    const I = (q/t);
    return (
      <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
        <h2 className="text-4xl font-black text-slate-100 mb-4">🧮 Calculadora de Corrente</h2>
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 space-y-4 mb-4">
          <div><label className="text-xs font-bold text-slate-400 block mb-1">Carga ΔQ: <span className="text-emerald-300">{q} C</span></label><input type="range" min={1} max={100} value={q} onChange={e=>setQ(+e.target.value)} className="w-full accent-emerald-400" /></div>
          <div><label className="text-xs font-bold text-slate-400 block mb-1">Tempo Δt: <span className="text-amber-300">{t} s</span></label><input type="range" min={1} max={60} value={t} onChange={e=>setT(+e.target.value)} className="w-full accent-amber-400" /></div>
        </div>
        <div className="bg-emerald-950/30 border border-emerald-500/40 rounded-2xl p-5 text-center mb-4">
          <div className="text-xs font-black text-emerald-400 mb-1">CORRENTE (i)</div>
          <div className="text-5xl font-black text-emerald-300">{I.toFixed(2)} A</div>
          <div className="text-slate-500 text-xs mt-2">{I < 0.001 ? "< 1 mA — quase imperceptível" : I < 0.01 ? "mA — eletrônica delicada" : I < 1 ? `${(I*1000).toFixed(0)} mA — nível de ESD` : I < 10 ? "⚠️ Perigoso para humanos" : "⚠️ Alta corrente industrial"}</div>
        </div>
        <div className="grid grid-cols-4 gap-2 text-xs text-center">
          {[["LED","20 mA"],["Celular carregando","2 A"],["Chuveiro","30 A"],["Relâmpago","30.000 A"]].map(([t2,v])=>(
            <div key={t2} className="bg-slate-900 border border-slate-700 rounded-xl p-2"><div className="text-slate-400">{t2}</div><div className="font-black text-emerald-300 mt-1">{v}</div></div>
          ))}
        </div>
      </div>
    );
  },
  // S5 Condutores, Isolantes, Semicondutores
  () => {
    const [active, setActive] = useState(0);
    const types = [
      {t:"🔵 Condutores",d:"Elétrons livres em grande quantidade. Ex: cobre, alumínio, ouro. Fios elétricos usam cobre — boa condutividade + baixo custo. Resistividade ρ ~10⁻⁸ Ω·m.",ex:"Fios, placas de circuito, trilhas de PCB", cor:"border-blue-500 bg-blue-950/30 text-blue-300"},
      {t:"🔴 Isolantes",d:"Sem elétrons livres. Ex: plástico, borracha, vidro, ar seco. Usados para proteção — evitam que corrente flua para lugares indesejados. ρ ~10¹² Ω·m.",ex:"Capa de fios, plugues, capacitor (dielétrico)", cor:"border-rose-500 bg-rose-950/30 text-rose-300"},
      {t:"🟡 Semicondutores",d:"Condutividade intermediária e controlável por temperatura, luz ou dopagem. Si e Ge são os mais usados. Base de transistores e chips. ρ variável.",ex:"Transistores, LEDs, células solares, sensores", cor:"border-yellow-500 bg-yellow-950/30 text-yellow-300"},
    ];
    const m = types[active];
    return (
      <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
        <h2 className="text-4xl font-black text-slate-100 mb-4">🔬 Condutores, Isolantes & Semicondutores</h2>
        <div className="flex gap-3 mb-4">
          {types.map((t,i) => <button key={i} onClick={()=>setActive(i)} className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all ${active===i ? t.cor : "border-slate-700 text-slate-400"}`}>{t.t.split(" ")[0]} {t.t.split(" ")[1]}</button>)}
        </div>
        <div className={`border-2 rounded-3xl p-6 mb-5 animate-in fade-in ${m.cor}`}>
          <h3 className="text-2xl font-black mb-3">{m.t}</h3>
          <p className="text-slate-300 mb-3">{m.d}</p>
          <div className="bg-slate-900/50 rounded-xl p-3"><p className="text-xs font-bold text-slate-400 mb-1">EXEMPLOS DE USO:</p><p className="text-slate-300 text-sm">{m.ex}</p></div>
        </div>
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-sm text-slate-400">
          💡 <strong className="text-slate-200">Semicondutores mudaram o mundo:</strong> o transistor (1947) em silício permitiu chips com bilhões de transistores — cada um controlando minúsculas correntes de forma lógica.
        </div>
      </div>
    );
  },
  // S6 Efeito Joule
  () => (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-4xl font-black text-slate-100 mb-4">🔥 Efeito Joule</h2>
      <div className="bg-slate-950 border-2 border-rose-500/30 rounded-3xl p-5 text-center mb-5">
        <code className="text-2xl font-mono font-black text-rose-300">P = R · i² = V² / R = V · i</code>
        <p className="text-slate-500 text-sm mt-2">Potência dissipada como calor. Unidade: Watt (W)</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
          <h3 className="font-black text-slate-100 mb-3">Por que isso acontece?</h3>
          <p className="text-slate-400 text-sm">Elétrons em movimento colidem com íons da rede cristalina do condutor. Cada colisão transfere energia cinética para a rede → vibração → calor. Quanto maior i ou R, mais colisões por segundo.</p>
        </div>
        <div className="space-y-3">
          {[{i:"🚿",t:"Chuveiro Elétrico",d:"Resistência de Nicromo (~1000 W a 220V). i = P/V = 1000/220 ≈ 4,5 A. A resistência aquece a água pelo efeito Joule."},
            {i:"🔒",t:"Fusível",d:"Fio de liga metálica fina. Corrente excessiva → P = R·i² eleva temperatura acima do ponto de fusão do fio → circuito aberto = proteção."},
            {i:"💻",t:"CPU Aquecendo",d:"Chip moderno dissipa ~100W. Todo o sistema de refrigeração (cooler, pasta térmica, dissipador) existe para remover esse Joule."}].map((c,i) => (
            <div key={i} className="bg-rose-950/20 border border-rose-500/20 rounded-xl p-3 flex gap-3"><span className="text-xl">{c.i}</span><div><p className="font-bold text-rose-200 text-sm">{c.t}</p><p className="text-slate-400 text-xs">{c.d}</p></div></div>
          ))}
        </div>
      </div>
    </div>
  ),
  // S7 Quiz 1
  () => <Quiz n={1} total={3} q="Num fio passam 60 Coulombs em 20 segundos. Qual a corrente elétrica?" opts={["0,3 A","3 A","1200 A","300 mA"]} correct={1} explanation="✅ B — i = ΔQ/Δt = 60/20 = 3 A. Simples e direto. Verifique unidades: C/s = A." />,
  // S8 Quiz 2
  () => <Quiz n={2} total={3} q="Um resistor de 10 Ω conduz corrente de 2 A. Qual a potência dissipada como calor?" opts={["5 W","20 W","40 W","200 W"]} correct={2} explanation="✅ C — P = R·i² = 10 × 2² = 10 × 4 = 40 W. Alternativa: P = V·i = 20 × 2 = 40 W (com V = R·i = 20 V)." />,
  // S9 Quiz 3
  () => <Quiz n={3} total={3} q="O sentido convencional da corrente elétrica é:" opts={["O sentido real do movimento dos elétrons (−→+).","De negativo para positivo, igual aos elétrons.","De positivo para negativo — convenção histórica adotada antes de conhecer elétrons.","Sempre perpendicular ao fio condutor."]} correct={2} explanation="✅ C — Antes de Franklin descobrir que são elétrons (cargas −) que se movem, a convenção já era de + para −. A física funciona dos dois jeitos — a convenção apenas facilita análise de circuitos." />,
  // S10 Mapa Mental
  () => (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-4xl font-black text-slate-100 mb-5">🗺️ Mapa Mental — Sem. 5</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {t:"⚡ Corrente (i)",items:["i = ΔQ/Δt","Unidade: Ampere (A)","i = C/s","Fluxo de cargas"],c:"border-emerald-500/30 bg-emerald-950/10"},
          {t:"→ Sentidos",items:["Convencional: + → −","Elétrons: − → +","Convenção histórica","Em eletrônica: convencional"],c:"border-amber-500/30 bg-amber-950/10"},
          {t:"🔥 Efeito Joule",items:["P = R·i² = V·i","Calor = colisões de e−","Chuveiro, fusível, CPU","P em Watts"],c:"border-rose-500/30 bg-rose-950/10"},
          {t:"🔵 Condutores",items:["e− livres","ρ ~ 10⁻⁸ Ω·m","Cobre, alumínio","Fios e trilhas PCB"],c:"border-blue-500/30 bg-blue-950/10"},
          {t:"🟡 Semicond.",items:["Si, Ge","Dopagem controla ρ","Transistores, LEDs","Base da microeletrônica"],c:"border-yellow-500/30 bg-yellow-950/10"},
          {t:"🔮 Próximo",items:["Resistência (R)","1ª Lei de Ohm","V = R·i","Circuitos simples"],c:"border-slate-600 bg-slate-900/60"},
        ].map((b,i) => (
          <div key={i} className={`rounded-2xl border p-4 ${b.c}`}>
            <h4 className="font-black text-slate-100 mb-2 text-sm">{b.t}</h4>
            <ul className="space-y-1">{b.items.map(s=><li key={s} className="text-slate-400 text-xs">→ {s}</li>)}</ul>
          </div>
        ))}
      </div>
    </div>
  ),
  // S11 Resumo + Encerramento
  () => {
    const [stars, setStars] = useState(0);
    return (
      <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
        <h2 className="text-4xl font-black text-slate-100 mb-5">📋 Resumo — Sem. 5</h2>
        <div className="overflow-x-auto mb-5">
          <table className="w-full text-sm border border-slate-700 rounded-2xl overflow-hidden">
            <thead><tr className="bg-slate-800"><th className="p-3 text-left text-slate-300">Fórmula</th><th className="p-3 text-left text-slate-300">Significado</th><th className="p-3 text-left text-slate-300">Unidade</th></tr></thead>
            <tbody>
              {[["i = ΔQ/Δt","Corrente = Carga / Tempo","Ampere (A)"],["P = R·i²","Potência Joule (resistência)","Watt (W)"],["P = V·i","Potência genérica","Watt (W)"],["P = V²/R","Potência (V fixo)","Watt (W)"]].map((r,i)=>(
                <tr key={i} className={i%2===0?"bg-slate-900/60":"bg-slate-900/30"}>
                  <td className="p-3 border-t border-slate-800 font-mono text-emerald-300 text-xs">{r[0]}</td>
                  <td className="p-3 border-t border-slate-800 text-slate-300 text-xs">{r[1]}</td>
                  <td className="p-3 border-t border-slate-800 text-slate-500 text-xs">{r[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-center">
          <p className="text-slate-500 text-sm mb-3">Como você avalia esta aula?</p>
          <div className="flex gap-2 justify-center mb-4">
            {[1,2,3,4,5].map(n => <button key={n} onClick={()=>setStars(n)} className={`text-3xl hover:scale-125 transition-all ${n<=stars?"text-amber-400":"text-slate-700"}`}>★</button>)}
          </div>
          <Link to="/fisica3/sem6" className="px-8 py-3 bg-amber-600 hover:bg-amber-500 text-white font-black rounded-2xl transition-all text-lg">Próxima Semana →</Link>
        </div>
      </div>
    );
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// SEMANA 6 — Resistores & 1ª Lei de Ohm
// ═══════════════════════════════════════════════════════════════════════════════
const SEM6: React.FC[] = [
  () => (
    <div className="flex flex-col items-center justify-center min-h-[72vh] text-center animate-in fade-in zoom-in duration-700 relative">
      <div className="absolute inset-0 opacity-10 rounded-3xl" style={{ backgroundImage:"url('/sprites/backgrounds/6/2304x1296.png')", backgroundSize:"cover", imageRendering:"pixelated" }} />
      <div className="relative z-10 max-w-2xl">
        <span className="bg-amber-500/20 text-amber-400 font-bold px-4 py-1.5 rounded-full text-xs tracking-widest border border-amber-500/30">FÍSICA 3 · SEMANA 6</span>
        <div className="text-8xl my-6">🔌</div>
        <h1 className="text-5xl md:text-6xl font-black text-white leading-none mb-4">Resistores &<br /><span className="text-sky-400">1ª Lei de Ohm</span></h1>
        <p className="text-xl text-slate-400 mb-6">V = R·i é a fórmula mais usada em eletrônica. Entenda o que é resistência e como ela governa cada circuito do mundo.</p>
        <div className="flex gap-3 flex-wrap justify-center text-sm">
          {["Ω V = R·i","📊 Gráfico V×i","🔗 Séries/Paralelo","🌡️ Temperatura"].map(t => (
            <div key={t} className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-xl text-slate-300">{t}</div>
          ))}
        </div>
      </div>
    </div>
  ),
  // S2 Resistência
  () => (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-4xl font-black text-slate-100 mb-5">Ω Resistência Elétrica</h2>
      <div className="bg-slate-950 border-2 border-sky-500/30 rounded-3xl p-6 text-center mb-5">
        <code className="text-3xl font-mono font-black text-sky-300">V = R · i &nbsp;→&nbsp; R = V / i</code>
        <p className="text-slate-500 text-sm mt-2">Unidade: Ohm (Ω). 1 Ω = 1 V por Ampere</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {[
          {t:"O que é resistência?",d:"Oposição ao fluxo de elétrons. Maior R → mesma V gera menos corrente. É determinada pelo material, comprimento e seção transversal do condutor.",i:"⏸️"},
          {t:"Resistor Ôhmico",d:"R constante independente de V ou i. O gráfico V×i é uma reta passando pela origem. Inclinação = R. Válida para resistores comuns em temperatura fixa.",i:"📏"},
          {t:"Resistor Não-Ôhmico",d:"R varia com i, V ou temperatura. Ex: lâmpada incandescente (R aumenta com T), LEDs, diodos. Gráfico V×i é uma curva.",i:"📈"},
          {t:"Código de Cores",d:"Resistores comerciais têm listras coloradas que indicam o valor em Ohms e a tolerância. Preto=0, Marrom=1, Vermelho=2... Ouro=±5%.",i:"🌈"},
        ].map((c,i) => (
          <div key={i} className="bg-slate-900 border border-slate-700 rounded-2xl p-4 flex gap-3">
            <span className="text-2xl shrink-0">{c.i}</span>
            <div><p className="font-bold text-slate-100 text-sm">{c.t}</p><p className="text-slate-400 text-xs mt-1">{c.d}</p></div>
          </div>
        ))}
      </div>
    </div>
  ),
  // S3 Calculadora V=Ri
  () => {
    const [V, setV_] = useState(12); const [R, setR] = useState(4);
    const I = V/R; const P = V*V/R;
    return (
      <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
        <h2 className="text-4xl font-black text-slate-100 mb-4">🧮 Calculadora de Circuito Simples</h2>
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 space-y-4 mb-4">
          <div><label className="text-xs font-bold text-slate-400 block mb-1">Tensão V: <span className="text-sky-300">{V} V</span></label><input type="range" min={1} max={240} value={V} onChange={e=>setV_(+e.target.value)} className="w-full accent-sky-400" /></div>
          <div><label className="text-xs font-bold text-slate-400 block mb-1">Resistência R: <span className="text-amber-300">{R} Ω</span></label><input type="range" min={1} max={1000} step={1} value={R} onChange={e=>setR(+e.target.value)} className="w-full accent-amber-400" /></div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-sky-950/30 border border-sky-500/30 rounded-2xl p-4 text-center"><div className="text-xs font-black text-sky-400 mb-1">TENSÃO (V)</div><div className="text-3xl font-black text-sky-300">{V} V</div></div>
          <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-2xl p-4 text-center"><div className="text-xs font-black text-emerald-400 mb-1">CORRENTE (i)</div><div className="text-3xl font-black text-emerald-300">{I.toFixed(2)} A</div></div>
          <div className="bg-rose-950/30 border border-rose-500/30 rounded-2xl p-4 text-center"><div className="text-xs font-black text-rose-400 mb-1">POTÊNCIA (P)</div><div className="text-3xl font-black text-rose-300">{P.toFixed(1)} W</div></div>
        </div>
        <div className="mt-4 bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-slate-400">💡 Exemplo real: lâmpada 60W a 127V → R = V²/P = 127²/60 ≈ 269 Ω (a quente). A frio, R é menor — por isso há pico de corrente ao ligar.</div>
      </div>
    );
  },
  // S4 Resistores em Série e Paralelo
  () => {
    const [mode, setMode] = useState<"serie"|"paralelo">("serie");
    const R1=100, R2=200, R3=300;
    const Rs = R1+R2+R3;
    const Rp = 1/(1/R1+1/R2+1/R3);
    return (
      <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
        <h2 className="text-4xl font-black text-slate-100 mb-4">🔗 Resistores em Série & Paralelo</h2>
        <div className="flex gap-3 mb-5">
          {(["serie","paralelo"] as const).map(m => (
            <button key={m} onClick={()=>setMode(m)} className={`px-5 py-2 rounded-xl font-bold border-2 text-sm transition-all ${mode===m?"border-sky-500 bg-sky-950/30 text-sky-300":"border-slate-700 text-slate-400"}`}>{m==="serie"?"🔗 Em Série":"⚡ Em Paralelo"}</button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className={`border-2 rounded-2xl p-5 animate-in fade-in ${mode==="serie"?"border-sky-500/40 bg-sky-950/20":"border-amber-500/40 bg-amber-950/20"}`}>
            {mode==="serie" ? <>
              <h3 className="font-black text-sky-300 text-xl mb-3">Em Série</h3>
              <p className="text-sm text-slate-400 mb-3">Mesma corrente em todos. Tensão se divide. <code className="text-sky-300">R_eq = R₁ + R₂ + R₃</code></p>
              <div className="font-mono text-sky-200 text-sm">R_eq = {R1} + {R2} + {R3} = <strong>{Rs} Ω</strong></div>
            </> : <>
              <h3 className="font-black text-amber-300 text-xl mb-3">Em Paralelo</h3>
              <p className="text-sm text-slate-400 mb-3">Mesma tensão em todos. Corrente se divide. <code className="text-amber-300">1/R_eq = 1/R₁ + 1/R₂ + 1/R₃</code></p>
              <div className="font-mono text-amber-200 text-sm">R_eq ≈ <strong>{Rp.toFixed(1)} Ω</strong> (menor que qualquer ramo!)</div>
            </>}
          </div>
          <div className="space-y-3 text-sm">
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-3"><strong className="text-slate-200">Série:</strong><p className="text-slate-400 mt-1">Pisca-pisca de Natal antigo — um queima, todos apagam. R_eq aumenta com cada resistor adicionado.</p></div>
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-3"><strong className="text-slate-200">Paralelo:</strong><p className="text-slate-400 mt-1">Tomadas da sua casa — cada aparelho recebe 127V independente. R_eq diminui a cada ramo adicionado.</p></div>
          </div>
        </div>
      </div>
    );
  },
  // S5 Analogia
  () => (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <span className="text-xs font-black tracking-widest text-violet-400 bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20">ANALOGIA</span>
      <h2 className="text-4xl font-black text-slate-100 mt-4 mb-5">🚰 Circuito Elétrico = Sistema Hidráulico</h2>
      <div className="grid md:grid-cols-2 gap-5 mb-4">
        <div className="bg-violet-950/20 border border-violet-500/30 rounded-2xl p-5">
          <h3 className="font-black text-violet-200 mb-4">🔌 Elétrico → 🚰 Hidráulico</h3>
          <div className="space-y-2 text-sm">
            {[["Tensão V (Volts)","Pressão da água (Pascal)"],["Corrente i (Amperes)","Vazão (litros/s)"],["Resistência R (Ohms)","Cano estreito (obstáculo)"],["Bateria","Bomba d'água"],["Fio condutor","Cano largo"],["Resistor","Válvula ou restrição"]].map(([e,h])=>(
              <div key={e} className="flex gap-3 items-center"><span className="text-violet-300 font-mono text-xs w-32 shrink-0">{e}</span><span className="text-slate-500">↔</span><span className="text-slate-300 text-xs">{h}</span></div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4">
            <p className="font-bold text-slate-100 mb-2">🎯 Insight chave</p>
            <p className="text-slate-400 text-sm">Maior pressão na bomba → mais vazão. Maior tensão na bateria → mais corrente. Tubo mais estreito = mais resistência = menos fluxo com mesma pressão.</p>
          </div>
          <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-4">
            <p className="font-bold text-amber-200 mb-2">⚠️ Onde a analogia falha</p>
            <p className="text-slate-400 text-sm">Elétrons têm carga. Água não. Fenômenos EM como indução, capacitância e indutância não têm equivalente hidráulico direto.</p>
          </div>
        </div>
      </div>
    </div>
  ),
  // S6 Casos de uso
  () => {
    const [active, setActive] = useState<number|null>(null);
    const cases = [
      {i:"💡",t:"LEDs e resistores limitadores",d:"LEDs precisam de corrente específica (~20mA). Um resistor em série limita a corrente: R = (V_fonte − V_LED)/i_LED. Sem ele, o LED queima instantaneamente."},
      {i:"🔋",t:"Bateria e resistência interna",d:"Toda bateria tem resistência interna r. Quando conectada a carga R: i = ε/(R+r). Por isso baterias 'antigas' aparecem carregadas mas caem ao conectar carga pesada."},
      {i:"🎚️",t:"Potenciômetro (volume)",d:"Volume de som, brilho de tela, velocidade de ventilador — usam potenciômetro: resistor variável que divide a tensão conforme a posição do cursor."},
      {i:"🌡️",t:"Termistor (sensor de T)",d:"Resistência varia muito com temperatura. NTC: R cai com T. PTC: R sobe com T. Usados em termômetros digitais, proteção de motores e baterias de celular."},
    ];
    return (
      <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
        <span className="text-xs font-black tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">CASOS DE USO</span>
        <h2 className="text-4xl font-black text-slate-100 mt-4 mb-5">🔌 Resistência no Cotidiano</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {cases.map((c,i) => (
            <button key={i} onClick={()=>setActive(active===i?null:i)} className={`text-left p-5 rounded-2xl border-2 transition-all ${active===i?"border-sky-500 bg-sky-950/20":"border-slate-700 bg-slate-900/60 hover:border-slate-500"}`}>
              <div className="flex items-center gap-3 mb-2"><span className="text-3xl">{c.i}</span><h3 className="font-black text-lg text-slate-100">{c.t}</h3></div>
              {active===i ? <p className="text-slate-300 text-sm leading-relaxed animate-in fade-in">{c.d}</p> : <p className="text-slate-500 text-sm">Clique para ver →</p>}
            </button>
          ))}
        </div>
      </div>
    );
  },
  // S6b — SIMULADOR INTERATIVO de Circuito
  () => (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <span className="text-xs font-black tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">🔌 SIMULADOR INTERATIVO</span>
      <h2 className="text-3xl font-black text-slate-100 mt-4 mb-2">Circuito em Série vs. Paralelo — ao Vivo!</h2>
      <p className="text-slate-500 text-sm mb-5">Ajuste tensão e resistências e observe os elétrons (pontos amarelos) fluindo. Alterne entre série e paralelo e veja como tudo muda!</p>
      <CircuitSimulator />
    </div>
  ),
  // S6c — PIXEL QUIZ Ohm
  () => (
    <PixelQuiz
      character={0}
      title="🎮 Desafio: 1ª Lei de Ohm"
      subtitle="Responda correto e veja o Pink Monster celebrar!"
      questions={[
        {
          q: "Em um circuito em paralelo com V = 12V, R₁ = 4Ω e R₂ = 6Ω, qual a corrente total?",
          opts: ["1,2 A","2 A — a corrente se divide mas a soma é V/R_eq","5 A","0,4 A"],
          correct: 2,
          explanation: "R_eq = 1/(1/4 + 1/6) = 1/(0,25+0,167) = 2,4Ω. I_total = V/R_eq = 12/2,4 = 5A. Ou: I₁=12/4=3A, I₂=12/6=2A → soma = 5A ✓"
        },
        {
          q: "Dois resistores de 10Ω em série são conectados a uma bateria de 20V. Qual a corrente?",
          opts: ["2 A","1 A","0,5 A","4 A"],
          correct: 1,
          explanation: "Série: R_eq = 10+10 = 20Ω. i = V/R = 20/20 = 1A. Simples! Em série a corrente é a mesma nos dois resistores."
        },
        {
          q: "Um resistor de 50Ω dissipa 200W. Qual tensão está aplicada a ele?",
          opts: ["100 V","31,6 V","10000 V","4 V"],
          correct: 0,
          explanation: "P = V²/R → V² = P·R = 200×50 = 10000 → V = 100V. Conferindo: i = V/R = 100/50 = 2A, P = i²R = 4×50 = 200W ✓"
        },
      ]}
    />
  ),
  // S7 Quiz 1
  () => <Quiz n={1} total={3} q="Uma lâmpada tem resistência de 484 Ω e está ligada a 220 V. Qual a corrente e a potência?" opts={["i=0,45A, P=100W","i=0,45A, P=99W — usa P=V²/R","i=2A, P=440W","i=22mA, P=5W"]} correct={1} explanation="✅ B — i = V/R = 220/484 ≈ 0,455 A. P = V²/R = 220²/484 = 48400/484 = 100 W. Ou P = V·i = 220 × 0,455 ≈ 100 W." />,
  // S8 Quiz 2
  () => <Quiz n={2} total={3} q="Dois resistores de 6 Ω e 3 Ω estão em paralelo. Qual a resistência equivalente?" opts={["9 Ω","2 Ω","4,5 Ω","18 Ω"]} correct={1} explanation="✅ B — 1/R_eq = 1/6 + 1/3 = 1/6 + 2/6 = 3/6 = 1/2 → R_eq = 2 Ω. Em paralelo, R_eq SEMPRE é menor que o menor ramo (3 Ω)!" />,
  // S9 Quiz 3
  () => <Quiz n={3} total={3} q="Ao dobrar a resistência R de um resistor (mantendo V constante), a potência dissipada:" opts={["Dobra — mais resistência, mais calor.","Não muda — potência depende só de V.","Cai à metade — P = V²/R, dobrar R divide P por 2.","Quadruplica — P ∝ R."]} correct={2} explanation="✅ C — P = V²/R. Com V constante, P ∝ 1/R. Dobrar R → P cai pela metade. Intuição: mais resistência → menos corrente → menos calor para a mesma tensão." />,
  // S10 Mapa Mental
  () => (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-4xl font-black text-slate-100 mb-5">🗺️ Mapa Mental — Sem. 6</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {t:"Ω 1ª Lei de Ohm",items:["V = R·i","R = V/i","Unidade: Ohm (Ω)","Resistor ôhmico: R cte"],c:"border-sky-500/30 bg-sky-950/10"},
          {t:"🔗 Série",items:["R_eq = R₁+R₂+...","Mesma corrente","Tensão se divide","Falha 1 → todos param"],c:"border-amber-500/30 bg-amber-950/10"},
          {t:"⚡ Paralelo",items:["1/R_eq = Σ1/Rᵢ","Mesma tensão","Corrente se divide","R_eq < menor ramo"],c:"border-emerald-500/30 bg-emerald-950/10"},
          {t:"📊 Gráfico V×i",items:["Ôhmico: reta (R = inclin.)","Não-ôhmico: curva","LED, lâmpada: curvas","Linear → R constante"],c:"border-violet-500/30 bg-violet-950/10"},
          {t:"🔌 Aplicações",items:["LEDs + resistor limitador","Potenciômetro (volume)","Termistor (sensor T)","Fusível (proteção)"],c:"border-rose-500/30 bg-rose-950/10"},
          {t:"🔮 Próximo",items:["2ª Lei de Ohm (ρ,L,A)","Energia elétrica kWh","Potência e consumo","Conta de luz"],c:"border-slate-600 bg-slate-900/60"},
        ].map((b,i) => (
          <div key={i} className={`rounded-2xl border p-4 ${b.c}`}>
            <h4 className="font-black text-slate-100 mb-2 text-sm">{b.t}</h4>
            <ul className="space-y-1">{b.items.map(s=><li key={s} className="text-slate-400 text-xs">→ {s}</li>)}</ul>
          </div>
        ))}
      </div>
    </div>
  ),
  // S11 Resumo + Encerramento
  () => {
    const [stars, setStars] = useState(0);
    return (
      <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
        <h2 className="text-4xl font-black text-slate-100 mb-5">📋 Resumo — Sem. 6</h2>
        <div className="overflow-x-auto mb-5">
          <table className="w-full text-sm border border-slate-700 rounded-2xl overflow-hidden">
            <thead><tr className="bg-slate-800"><th className="p-3 text-left text-slate-300">Fórmula</th><th className="p-3 text-left text-slate-300">Uso</th></tr></thead>
            <tbody>
              {[["V = R·i","1ª Lei de Ohm — relação V, R, i"],["R_eq (série) = ΣRᵢ","Resistência total em série"],["1/R_eq (paralelo) = Σ1/Rᵢ","Resistência total em paralelo"],["P = V·i = V²/R = R·i²","Potência elétrica (Joule)"],].map((r,i)=>(
                <tr key={i} className={i%2===0?"bg-slate-900/60":"bg-slate-900/30"}>
                  <td className="p-3 border-t border-slate-800 font-mono text-sky-300 text-xs">{r[0]}</td>
                  <td className="p-3 border-t border-slate-800 text-slate-400 text-xs">{r[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-center">
          <p className="text-slate-500 text-sm mb-3">Como você avalia esta aula?</p>
          <div className="flex gap-2 justify-center mb-4">
            {[1,2,3,4,5].map(n => <button key={n} onClick={()=>setStars(n)} className={`text-3xl hover:scale-125 transition-all ${n<=stars?"text-amber-400":"text-slate-700"}`}>★</button>)}
          </div>
          <Link to="/fisica3/sem7" className="px-8 py-3 bg-amber-600 hover:bg-amber-500 text-white font-black rounded-2xl transition-all text-lg">Próxima Semana →</Link>
        </div>
      </div>
    );
  },
];

function makeLesson(slides: React.FC[], title: string, aula: string) {
  return function Lesson() {
    const [cur, setCur] = useState(0);
    const next = useCallback(() => setCur(p => Math.min(p+1, slides.length-1)), []);
    const prev = useCallback(() => setCur(p => Math.max(p-1, 0)), []);
    useEffect(() => {
      const h = (e: KeyboardEvent) => { if (e.key==="ArrowRight") next(); if (e.key==="ArrowLeft") prev(); };
      window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
    }, [next, prev]);
    const C = slides[cur];
    return <Shell title={title} aula={aula} total={slides.length} current={cur} onPrev={prev} onNext={next}><C /></Shell>;
  };
}

export const Fisica3Lesson5 = makeLesson(SEM5, "Sem. 5 — Eletrodinâmica & Corrente Elétrica", "Sem. 5");
export const Fisica3Lesson6 = makeLesson(SEM6, "Sem. 6 — Resistores & 1ª Lei de Ohm", "Sem. 6");
