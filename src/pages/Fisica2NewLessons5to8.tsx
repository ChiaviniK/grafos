import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import { PixelQuiz } from "../components/PixelQuiz";

function Shell({ title, aula, total, current, onPrev, onNext, children }: {
  title: string; aula: string; total: number; current: number;
  onPrev: () => void; onNext: () => void; children: React.ReactNode;
}) {
  const pct = Math.round(((current + 1) / total) * 100);
  return (
    <div className="text-slate-50 flex flex-col min-h-[calc(100vh-3.5rem)]">
      <nav className="flex items-center justify-between px-6 py-3 border-b border-slate-800 bg-slate-950/80 backdrop-blur shrink-0">
        <Link to="/fisica2" className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium"><Home className="w-4 h-4" /> Física 2</Link>
        <div className="flex-1 mx-6 bg-slate-800 rounded-full h-1.5"><div className="bg-orange-400 h-1.5 rounded-full transition-all" style={{ width: `${pct}%` }} /></div>
        <span className="text-slate-500 text-xs font-mono shrink-0">{aula} · {current + 1}/{total}</span>
      </nav>
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 md:px-16 py-8">{children}</div>
      <div className="flex justify-between items-center px-6 py-4 border-t border-slate-800 bg-slate-950/80 backdrop-blur shrink-0">
        <button onClick={onPrev} disabled={current === 0} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-700 text-slate-400 hover:border-slate-500 disabled:opacity-30 transition-all font-semibold text-sm"><ChevronLeft className="w-4 h-4" /> Anterior</button>
        <span className="text-slate-600 text-xs hidden sm:block truncate max-w-xs">{title}</span>
        <button onClick={onNext} disabled={current === total - 1} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 disabled:opacity-30 text-white font-bold transition-all text-sm">Próximo <ChevronRight className="w-4 h-4" /></button>
      </div>
    </div>
  );
}

function Quiz({ n, total, q, opts, correct, exp }: { n:number; total:number; q:string; opts:string[]; correct:number; exp:string }) {
  const [ans, setAns] = useState<number|null>(null);
  return (
    <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
      <span className="text-xs font-black tracking-widest text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">QUIZ {n}/{total}</span>
      <h2 className="text-xl font-black text-slate-100 mt-4 mb-4">{q}</h2>
      <div className="space-y-3 mb-4">
        {opts.map((o,i) => {
          const cls = ans===null ? "border-slate-700 hover:border-orange-500/50 bg-slate-900" : i===correct ? "border-emerald-500 bg-emerald-950/30 text-emerald-100 scale-[1.01]" : ans===i ? "border-rose-500 bg-rose-950/30 opacity-60" : "border-slate-800 opacity-20";
          return <button key={i} disabled={ans!==null} onClick={()=>setAns(i)} className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex gap-3 text-sm ${cls}`}><span className="font-black text-slate-500 shrink-0">{["A","B","C","D"][i]})</span><span>{o}</span></button>;
        })}
      </div>
      {ans!==null && <div className={`p-4 rounded-2xl text-sm animate-in slide-in-from-bottom-4 ${ans===correct?"bg-emerald-900/30 border border-emerald-500/40 text-emerald-200":"bg-rose-900/30 border border-rose-500/40 text-rose-200"}`}>{exp}</div>}
    </div>
  );
}

// ═════════ SEM 5 — Calor Latente & Mudanças de Estado ═════════
const SEM5: React.FC[] = [
  () => (
    <div className="flex flex-col items-center justify-center min-h-[68vh] text-center animate-in fade-in zoom-in duration-700">
      <span className="bg-orange-500/20 text-orange-400 font-bold px-4 py-1.5 rounded-full text-xs tracking-widest border border-orange-500/30">FÍSICA 2 · SEMANA 5</span>
      <div className="text-8xl my-6">🧊→💧→💨</div>
      <h1 className="text-5xl md:text-6xl font-black text-white leading-none mb-4">Calor Latente<br /><span className="text-sky-400">Mudanças de Estado</span></h1>
      <p className="text-xl text-slate-400 mb-6 max-w-xl">Por que gelo derrete a 0°C mas a água não sobe de temperatura enquanto isso? Esse é o calor latente — energia que muda o estado sem mudar a temperatura.</p>
      <div className="flex gap-3 flex-wrap justify-center text-sm">
        {["Q = m·L","🧊 Fusão","💧 Vaporização","📊 Gráfico de aquecimento"].map(t => (
          <div key={t} className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-xl text-slate-300">{t}</div>
        ))}
      </div>
    </div>
  ),
  () => (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-4xl font-black text-slate-100 mb-5">🔀 Mudanças de Estado da Matéria</h2>
      <div className="bg-slate-950 border-2 border-sky-500/30 rounded-3xl p-6 text-center mb-5">
        <code className="text-3xl font-mono font-black text-sky-300">Q = m · L</code>
        <p className="text-slate-500 text-sm mt-2">Q = calor latente (J) · m = massa (kg) · L = calor latente específico (J/kg) · ΔT = 0 durante a mudança!</p>
      </div>
      <div className="grid md:grid-cols-3 gap-3">
        {[
          {from:"Sólido",to:"Líquido",name:"Fusão",emoji:"🧊→💧",L:"L_fusão",c:"border-blue-500/30 bg-blue-950/10 text-blue-300"},
          {from:"Líquido",to:"Gás",name:"Vaporização",emoji:"💧→💨",L:"L_vap",c:"border-sky-500/30 bg-sky-950/10 text-sky-300"},
          {from:"Sólido",to:"Gás",name:"Sublimação",emoji:"🧊→💨",L:"L_sub",c:"border-violet-500/30 bg-violet-950/10 text-violet-300"},
          {from:"Líquido",to:"Sólido",name:"Solidificação",emoji:"💧→🧊",L:"-L_fusão",c:"border-indigo-500/30 bg-indigo-950/10 text-indigo-300"},
          {from:"Gás",to:"Líquido",name:"Condensação",emoji:"💨→💧",L:"-L_vap",c:"border-teal-500/30 bg-teal-950/10 text-teal-300"},
          {from:"Gás",to:"Sólido",name:"Deposição",emoji:"💨→🧊",L:"-L_sub",c:"border-purple-500/30 bg-purple-950/10 text-purple-300"},
        ].map((s,i)=>(
          <div key={i} className={`border rounded-2xl p-3 text-center ${s.c}`}>
            <div className="text-2xl mb-1">{s.emoji}</div>
            <div className="font-black text-sm">{s.name}</div>
            <div className="text-xs opacity-70 mt-1">{s.from} → {s.to}</div>
          </div>
        ))}
      </div>
    </div>
  ),
  () => {
    const [m, setM] = useState(1);
    const L_fusao = 334000; const L_vap = 2260000;
    const Q_fusao = m * L_fusao; const Q_vap = m * L_vap;
    return (
      <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
        <h2 className="text-4xl font-black text-slate-100 mb-4">🧮 Calculadora de Calor Latente (Água)</h2>
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 mb-4">
          <label className="text-xs font-bold text-slate-400 block mb-1">Massa: <span className="text-sky-300">{m} kg ({m*1000}g)</span></label>
          <input type="range" min={0.1} max={10} step={0.1} value={m} onChange={e=>setM(+e.target.value)} className="w-full accent-sky-400"/>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="bg-blue-950/30 border border-blue-500/30 rounded-2xl p-5 text-center">
            <div className="text-xs font-black text-blue-400 mb-1">🧊 FUSÃO (0°C)</div>
            <div className="text-3xl font-black text-blue-300">{(Q_fusao/1000).toFixed(1)} kJ</div>
            <div className="text-xs text-slate-500 mt-2">L_fusão = 334.000 J/kg</div>
            <div className="text-xs text-slate-500">{m}kg × 334.000 = {Q_fusao.toLocaleString()}J</div>
          </div>
          <div className="bg-sky-950/30 border border-sky-500/30 rounded-2xl p-5 text-center">
            <div className="text-xs font-black text-sky-400 mb-1">💨 VAPORIZAÇÃO (100°C)</div>
            <div className="text-3xl font-black text-sky-300">{(Q_vap/1000).toFixed(0)} kJ</div>
            <div className="text-xs text-slate-500 mt-2">L_vap = 2.260.000 J/kg</div>
            <div className="text-xs text-slate-500">{m}kg × 2.260.000 = {Q_vap.toLocaleString()}J</div>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-slate-400">
          💡 Aquecer {m}kg de água de 0°C a 100°C gasta ≈{(m*4186*100/1000).toFixed(0)}kJ. Vaporizar esse mesmo {m}kg a 100°C gasta <strong className="text-sky-300">{(Q_vap/1000).toFixed(0)}kJ</strong> — {(Q_vap/(m*4186*100)).toFixed(1)}× mais! Por isso queimaduras de vapor são tão perigosas.
        </div>
      </div>
    );
  },
  () => <Quiz n={1} total={2} q="Quantas calorias são necessárias para derreter 500g de gelo a 0°C? (L_fusão água = 80 cal/g)" opts={["160 cal","4000 cal","40.000 cal","80 cal"]} correct={2} exp="✅ C — Q = m × L = 500g × 80 cal/g = 40.000 cal. Atenção: L_fusão = 80 cal/g = 334.000 J/kg. Sempre confira as unidades!" />,
  () => <Quiz n={2} total={2} q="Por que queimadura de vapor a 100°C é mais grave que água a 100°C?" opts={["Vapor está mais quente","Vapor ao condensar libera ALÉM do calor do líquido quente o calor latente de vaporização (~2260 kJ/kg)","Água a 100°C não queima","São igualmente graves"]} correct={1} exp="✅ B — Ao condensar na pele, o vapor libera 2.260.000 J/kg (calor latente) MAIS depois o calor de resfriamento do líquido. Por isso é muito mais lesivo." />,
  () => (
    <PixelQuiz character={0} title="🎮 Desafio: Calor Latente!" subtitle="Pink Monster quer testar seu entendimento!"
      questions={[
        {q:"Durante uma mudança de estado (ex: fusão do gelo), o que acontece com a temperatura?",opts:["Sobe gradualmente","Permanece constante (toda energia vai para a mudança de estado)","Cai temporariamente","Oscila"],correct:1,explanation:"Durante a mudança de estado a temperatura é CONSTANTE. A energia fornecida vai para romper ligações intermoleculares — não para agitar as moléculas. Por isso o gráfico T×Q tem 'patamares'."},
        {q:"Por que suamos para nos resfriar?",opts:["Suor transfere calor por condução","Ao evaporar, o suor absorve calor latente de vaporização da nossa pele","Suor é frio","Suor aumenta a condutividade da pele"],correct:1,explanation:"Vaporização do suor absorve ~2.260 kJ/kg da nossa pele como calor latente — resfriando-a. É o mesmo princípio do resfriamento evaporativo de computadores!"},
      ]}
    />
  ),
  () => {
    const [stars, setStars] = useState(0);
    return (
      <div className="flex flex-col items-center justify-center min-h-[68vh] text-center animate-in fade-in zoom-in">
        <div className="text-7xl mb-4">🏆</div>
        <h1 className="text-4xl font-black text-white mb-3">Semana 5 Concluída!</h1>
        <p className="text-xl text-slate-400 max-w-lg mx-auto mb-5">Calor latente dominado! Próxima: Gases ideais e leis dos gases.</p>
        <div className="flex gap-2 justify-center mb-5">{[1,2,3,4,5].map(n=><button key={n} onClick={()=>setStars(n)} className={`text-3xl hover:scale-125 transition-all ${n<=stars?"text-amber-400":"text-slate-700"}`}>★</button>)}</div>
        <Link to="/fisica2/sem6" className="px-8 py-3 bg-orange-600 hover:bg-orange-500 text-white font-black rounded-2xl transition-all text-lg">Próxima Semana →</Link>
      </div>
    );
  },
];

// ═════════ SEM 6 — Dilatação Térmica ═════════
const SEM6: React.FC[] = [
  () => (
    <div className="flex flex-col items-center justify-center min-h-[68vh] text-center animate-in fade-in zoom-in duration-700">
      <span className="bg-orange-500/20 text-orange-400 font-bold px-4 py-1.5 rounded-full text-xs tracking-widest border border-orange-500/30">FÍSICA 2 · SEMANA 6</span>
      <div className="text-8xl my-6">📏</div>
      <h1 className="text-5xl md:text-6xl font-black text-white leading-none mb-4">Dilatação<br /><span className="text-amber-400">Térmica</span></h1>
      <p className="text-xl text-slate-400 mb-6 max-w-xl">Por que trilhos de trem têm folgas? Por que tampas de potinhos abrem mais fácil em água quente? Dilatação térmica na prática.</p>
      <div className="flex gap-3 flex-wrap justify-center text-sm">
        {["ΔL = α·L₀·ΔT","🔩 Linear","📐 Superficial","🧴 Volumétrica"].map(t => (
          <div key={t} className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-xl text-slate-300">{t}</div>
        ))}
      </div>
    </div>
  ),
  () => (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-4xl font-black text-slate-100 mb-5">📏 Três Tipos de Dilatação</h2>
      <div className="space-y-4 mb-5">
        {[
          {t:"🔩 Linear",f:"ΔL = α · L₀ · ΔT",d:"Uma dimensão. Trilhos, barras, fios. α = coeficiente de dilatação linear (1/°C). Ferro: α ≈ 12×10⁻⁶/°C.",c:"border-amber-500/30 bg-amber-950/10"},
          {t:"📐 Superficial",f:"ΔA = β · A₀ · ΔT",d:"Duas dimensões. Lâminas, chapas. β = 2α. Se comprimento e largura expandem, área cresce com β = 2α.",c:"border-orange-500/30 bg-orange-950/10"},
          {t:"🧴 Volumétrica",f:"ΔV = γ · V₀ · ΔT",d:"Três dimensões. Sólidos, líquidos e gases. γ = 3α para sólidos. Água: anomalia entre 0°C e 4°C (contrai ao aquecer).",c:"border-rose-500/30 bg-rose-950/10"},
        ].map((t,i)=>(
          <div key={i} className={`border-2 rounded-2xl p-5 flex gap-4 ${t.c}`}>
            <div className="shrink-0 text-2xl">{t.t.split(" ")[0]}</div>
            <div>
              <h3 className="font-black text-slate-100 mb-1">{t.t}</h3>
              <code className="text-lg font-mono text-amber-300 block mb-2">{t.f}</code>
              <p className="text-slate-400 text-sm">{t.d}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
  () => {
    const [L0, setL0] = useState(100); const [alpha, setAlpha] = useState(12); const [dT, setDT] = useState(50);
    const dL = alpha * 1e-6 * L0 * dT;
    const L = L0 + dL;
    const materials = [{n:"Ferro",a:12},{n:"Alumínio",a:23},{n:"Cobre",a:17},{n:"Vidro",a:9},{n:"Concreto",a:12}];
    return (
      <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
        <h2 className="text-4xl font-black text-slate-100 mb-4">🧮 Calculadora de Dilatação Linear</h2>
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 space-y-3 mb-4">
          <div><label className="text-xs font-bold text-slate-400 block mb-1">Comprimento inicial L₀: <span className="text-amber-300">{L0} m</span></label><input type="range" min={1} max={1000} value={L0} onChange={e=>setL0(+e.target.value)} className="w-full accent-amber-400"/></div>
          <div><label className="text-xs font-bold text-slate-400 block mb-1">ΔT: <span className="text-rose-300">{dT} °C</span></label><input type="range" min={1} max={300} value={dT} onChange={e=>setDT(+e.target.value)} className="w-full accent-rose-400"/></div>
          <div><label className="text-xs font-bold text-slate-400 block mb-2">Material (α × 10⁻⁶ /°C):</label><div className="flex gap-2 flex-wrap">{materials.map(m=><button key={m.n} onClick={()=>setAlpha(m.a)} className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all ${alpha===m.a?"border-amber-500 bg-amber-950/30 text-amber-300":"border-slate-700 text-slate-400"}`}>{m.n} (α={m.a})</button>)}</div></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-amber-950/30 border border-amber-500/30 rounded-2xl p-4 text-center"><div className="text-xs font-black text-amber-400 mb-1">DILATAÇÃO ΔL</div><div className="text-3xl font-black text-amber-300">{(dL*100).toFixed(4)} cm</div><div className="text-slate-500 text-xs mt-1">{dL.toFixed(6)} m</div></div>
          <div className="bg-orange-950/30 border border-orange-500/30 rounded-2xl p-4 text-center"><div className="text-xs font-black text-orange-400 mb-1">COMPRIMENTO FINAL L</div><div className="text-3xl font-black text-orange-300">{L.toFixed(4)} m</div><div className="text-slate-500 text-xs mt-1">L₀ + ΔL</div></div>
        </div>
      </div>
    );
  },
  () => (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <span className="text-xs font-black tracking-widest text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">CASOS DE USO REAIS</span>
      <h2 className="text-4xl font-black text-slate-100 mt-4 mb-5">🏗️ Dilatação no Cotidiano</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {[
          {i:"🚂",t:"Trilhos de Trem",d:"Deixam folgas de ~1cm a cada 10m de trilho para compensar a dilatação no verão (~50°C de diferença). Sem folga, os trilhos empenariam!"},
          {i:"🌉",t:"Pontes e Viadutos",d:"Têm juntas de dilatação metálicas visíveis. Uma ponte de 1km de aço dilata ≈600mm entre inverno e verão. Engenharia essencial!"},
          {i:"🍯",t:"Tampa de Potinho",d:"Aquece a tampa em água quente → dilatação volumétrica do metal > dilatação do vidro → folga para abrir. Física do lar!"},
          {i:"🌡️",t:"Termostato Bimetálico",d:"Duas lâminas de metais diferentes com α≠. Ao aquecer, a que mais dilata força a curvatura, abrindo ou fechando o contato elétrico."},
        ].map((c,i)=>(
          <div key={i} className="bg-slate-900 border border-slate-700 rounded-2xl p-5 flex gap-3">
            <span className="text-3xl shrink-0">{c.i}</span>
            <div><p className="font-bold text-slate-100 text-sm mb-1">{c.t}</p><p className="text-slate-400 text-xs">{c.d}</p></div>
          </div>
        ))}
      </div>
    </div>
  ),
  () => <Quiz n={1} total={2} q="Uma barra de ferro de 20m a 20°C. α_ferro = 12×10⁻⁶/°C. Quanto dilata ao ser aquecida a 70°C?" opts={["0,012 m = 1,2 cm","1,2 mm","0,12 m = 12 cm","12 mm = 1,2 cm"]} correct={0} exp="✅ A — ΔL = α·L₀·ΔT = 12×10⁻⁶ × 20 × (70−20) = 12×10⁻⁶ × 20 × 50 = 0,012 m = 1,2 cm." />,
  () => (
    <PixelQuiz character={1} title="🎮 Desafio Dilatação!" subtitle="Owlet Monster quer ver você resolver!"
      questions={[
        {q:"Por que a anomalia da água (contração de 0 a 4°C) é vital para a vida aquática?",opts:["Permite que peixes nadem melhor","Gelo flutua (d<água líquida) → isola o lago → a vida sobrevive no fundo","A água mais quente vai para o fundo","Não tem importância biológica"],correct:1,explanation:"De 0°C a 4°C a água se contrai (densidade aumenta). Acima de 4°C ela dilata. Por isso a água mais densa (4°C) fica no fundo. Gelo flutua, formando uma camada isolante que preserva a vida abaixo!"},
        {q:"γ (coeficiente volumétrico) de um sólido relaciona-se com α (linear) por:",opts:["γ = α","γ = 2α","γ = 3α","γ = α²"],correct:2,explanation:"Para sólidos isotrópicos: γ = 3α. Superficial: β = 2α. Lembrete: 1D, 2D, 3D → 1×α, 2×α, 3×α."},
      ]}
    />
  ),
  () => {
    const [stars, setStars] = useState(0);
    return (
      <div className="flex flex-col items-center justify-center min-h-[68vh] text-center animate-in fade-in zoom-in">
        <div className="text-7xl mb-4">🏆</div>
        <h1 className="text-4xl font-black text-white mb-3">Semana 6 Concluída!</h1>
        <p className="text-xl text-slate-400 max-w-lg mx-auto mb-5">Dilatação dominada! Próxima: Leis dos Gases Ideais.</p>
        <div className="flex gap-2 justify-center mb-5">{[1,2,3,4,5].map(n=><button key={n} onClick={()=>setStars(n)} className={`text-3xl hover:scale-125 transition-all ${n<=stars?"text-amber-400":"text-slate-700"}`}>★</button>)}</div>
        <Link to="/fisica2/sem7" className="px-8 py-3 bg-orange-600 hover:bg-orange-500 text-white font-black rounded-2xl transition-all text-lg">Próxima Semana →</Link>
      </div>
    );
  },
];

// ═════════ SEM 7 — Gases Ideais ═════════
const SEM7: React.FC[] = [
  () => (
    <div className="flex flex-col items-center justify-center min-h-[68vh] text-center animate-in fade-in zoom-in duration-700">
      <span className="bg-orange-500/20 text-orange-400 font-bold px-4 py-1.5 rounded-full text-xs tracking-widest border border-orange-500/30">FÍSICA 2 · SEMANA 7</span>
      <div className="text-8xl my-6">🫧</div>
      <h1 className="text-5xl md:text-6xl font-black text-white leading-none mb-4">Leis dos<br /><span className="text-emerald-400">Gases Ideais</span></h1>
      <p className="text-xl text-slate-400 mb-6 max-w-xl">PV = nRT. De Boyle a Gay-Lussac, entenda como pressão, volume e temperatura de um gás se relacionam — e por que pneus murcham no frio.</p>
      <div className="flex gap-3 flex-wrap justify-center text-sm">
        {["Boyle: PV=cte","Charles: V/T=cte","Gay-Lussac: P/T=cte","PV=nRT"].map(t => (
          <div key={t} className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-xl text-slate-300">{t}</div>
        ))}
      </div>
    </div>
  ),
  () => {
    const [law, setLaw] = useState<"boyle"|"charles"|"gl">("boyle");
    const [P1, setP1] = useState(2); const [V1, setV1] = useState(10);
    const [T1, setT1] = useState(300); const [T2, setT2] = useState(400);
    const [P1g, setP1g] = useState(1);
    const V2_boyle = (P1 * V1) / 2;
    const V2_charles = (V1 * T2) / T1;
    const P2_gl = (P1g * T2) / T1;
    return (
      <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
        <h2 className="text-4xl font-black text-slate-100 mb-4">🧮 Simulador das Leis dos Gases</h2>
        <div className="flex gap-2 mb-5">
          {([["boyle","Boyle (T=cte)"],["charles","Charles (P=cte)"],["gl","Gay-Lussac (V=cte)"]] as const).map(([k,l])=>(
            <button key={k} onClick={()=>setLaw(k)} className={`px-4 py-2 rounded-xl text-xs font-bold border-2 transition-all ${law===k?"border-emerald-500 bg-emerald-950/30 text-emerald-300":"border-slate-700 text-slate-400"}`}>{l}</button>
          ))}
        </div>
        {law==="boyle" && (
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 space-y-3">
            <div className="text-center font-mono text-emerald-300 text-lg font-black mb-3">P₁V₁ = P₂V₂ → V₂ = P₁V₁/P₂</div>
            <div><label className="text-xs font-bold text-slate-400 block mb-1">P₁: <span className="text-emerald-300">{P1} atm</span></label><input type="range" min={0.5} max={10} step={0.5} value={P1} onChange={e=>setP1(+e.target.value)} className="w-full accent-emerald-400"/></div>
            <div><label className="text-xs font-bold text-slate-400 block mb-1">V₁: <span className="text-emerald-300">{V1} L</span></label><input type="range" min={1} max={50} value={V1} onChange={e=>setV1(+e.target.value)} className="w-full accent-emerald-400"/></div>
            <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-3 text-center"><div className="text-xs text-emerald-400 mb-1">V₂ (a P=2atm)</div><div className="text-3xl font-black text-emerald-300">{V2_boyle.toFixed(1)} L</div></div>
          </div>
        )}
        {law==="charles" && (
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 space-y-3">
            <div className="text-center font-mono text-sky-300 text-lg font-black mb-3">V₁/T₁ = V₂/T₂ → V₂ = V₁T₂/T₁</div>
            <div><label className="text-xs font-bold text-slate-400 block mb-1">T₁: <span className="text-sky-300">{T1} K ({T1-273}°C)</span></label><input type="range" min={200} max={600} value={T1} onChange={e=>setT1(+e.target.value)} className="w-full accent-sky-400"/></div>
            <div><label className="text-xs font-bold text-slate-400 block mb-1">T₂: <span className="text-sky-300">{T2} K ({T2-273}°C)</span></label><input type="range" min={200} max={600} value={T2} onChange={e=>setT2(+e.target.value)} className="w-full accent-sky-400"/></div>
            <div className="bg-sky-950/30 border border-sky-500/30 rounded-xl p-3 text-center"><div className="text-xs text-sky-400 mb-1">V₂ (V₁={V1}L)</div><div className="text-3xl font-black text-sky-300">{V2_charles.toFixed(2)} L</div></div>
          </div>
        )}
        {law==="gl" && (
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 space-y-3">
            <div className="text-center font-mono text-amber-300 text-lg font-black mb-3">P₁/T₁ = P₂/T₂ → P₂ = P₁T₂/T₁</div>
            <div><label className="text-xs font-bold text-slate-400 block mb-1">P₁: <span className="text-amber-300">{P1g} atm</span></label><input type="range" min={0.5} max={10} step={0.5} value={P1g} onChange={e=>setP1g(+e.target.value)} className="w-full accent-amber-400"/></div>
            <div><label className="text-xs font-bold text-slate-400 block mb-1">T₁: <span className="text-amber-300">{T1} K</span> / T₂: <span className="text-amber-300">{T2} K</span></label><input type="range" min={200} max={600} value={T2} onChange={e=>setT2(+e.target.value)} className="w-full accent-amber-400"/></div>
            <div className="bg-amber-950/30 border border-amber-500/30 rounded-xl p-3 text-center"><div className="text-xs text-amber-400 mb-1">P₂</div><div className="text-3xl font-black text-amber-300">{P2_gl.toFixed(2)} atm</div></div>
          </div>
        )}
      </div>
    );
  },
  () => <Quiz n={1} total={2} q="Um gás a 27°C e 2 atm ocupa 8L. Mantendo T constante, qual volume ocupa a 4 atm? (Lei de Boyle)" opts={["16L","4L","8L","2L"]} correct={1} exp="✅ B — Boyle: P₁V₁ = P₂V₂ → 2×8 = 4×V₂ → V₂ = 16/4 = 4L. Dobrou a pressão → volume caiu à metade!" />,
  () => (
    <PixelQuiz character={2} title="🎮 Desafio dos Gases!" subtitle="Dude Monster quer ver você no controle!"
      questions={[
        {q:"Por que pneus murcham no inverno?",opts:["Pneus perdem borracha","Lei de Gay-Lussac: temperatura menor → pressão menor (V constante)","O ar some","O pneu dilata"],correct:1,explanation:"Gay-Lussac: P/T = constante (V=cte). No frio, T↓ → P↓. O pneu parece murcho! Solução: calibrar quando frio ou adicionar um pouco mais de pressão."},
        {q:"Um balão de hélio enche na Terra e sobem para altitude maior (P menor). O que acontece?",opts:["Murcha (P menor comprime)","Infla (Boyle: P↓ → V↑ com T≈cte)","Nada muda","Explode imediatamente"],correct:1,explanation:"Lei de Boyle: PV = constante. Com P menor na altitude e T aproxima-constante, V aumenta. O balão fica maior! Se sobe longe demais, pode estourar."},
      ]}
    />
  ),
  () => {
    const [stars, setStars] = useState(0);
    return (
      <div className="flex flex-col items-center justify-center min-h-[68vh] text-center animate-in fade-in zoom-in">
        <div className="text-7xl mb-4">🏆</div>
        <h1 className="text-4xl font-black text-white mb-3">Semana 7 Concluída!</h1>
        <p className="text-xl text-slate-400 max-w-lg mx-auto mb-5">Gases dominados! Próxima e última: Termodinâmica — 1ª e 2ª Leis.</p>
        <div className="flex gap-2 justify-center mb-5">{[1,2,3,4,5].map(n=><button key={n} onClick={()=>setStars(n)} className={`text-3xl hover:scale-125 transition-all ${n<=stars?"text-amber-400":"text-slate-700"}`}>★</button>)}</div>
        <Link to="/fisica2/sem8" className="px-8 py-3 bg-orange-600 hover:bg-orange-500 text-white font-black rounded-2xl transition-all text-lg">Próxima Semana →</Link>
      </div>
    );
  },
];

// ═════════ SEM 8 — Termodinâmica ═════════
const SEM8: React.FC[] = [
  () => (
    <div className="flex flex-col items-center justify-center min-h-[68vh] text-center animate-in fade-in zoom-in duration-700">
      <span className="bg-orange-500/20 text-orange-400 font-bold px-4 py-1.5 rounded-full text-xs tracking-widest border border-orange-500/30">FÍSICA 2 · SEMANA 8 · FINAL</span>
      <div className="text-8xl my-6">⚙️</div>
      <h1 className="text-5xl md:text-6xl font-black text-white leading-none mb-4">Termodinâmica:<br /><span className="text-emerald-400">1ª e 2ª Leis</span></h1>
      <p className="text-xl text-slate-400 mb-6 max-w-xl">ΔU = Q − W. As leis que governam máquinas a vapor, motores de carro, geladeiras e até o destino do universo.</p>
      <div className="flex gap-3 flex-wrap justify-center text-sm">
        {["ΔU = Q-W","🔄 Ciclos","🚂 Máquinas Térmicas","♻️ Rendimento de Carnot"].map(t => (
          <div key={t} className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-xl text-slate-300">{t}</div>
        ))}
      </div>
    </div>
  ),
  () => (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-4xl font-black text-slate-100 mb-5">⚙️ 1ª Lei da Termodinâmica</h2>
      <div className="bg-slate-950 border-2 border-emerald-500/30 rounded-3xl p-6 text-center mb-5">
        <code className="text-3xl font-mono font-black text-emerald-300">ΔU = Q − W</code>
        <p className="text-slate-500 text-sm mt-2">Variação de energia interna = calor recebido − trabalho realizado pelo gás</p>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {sym:"ΔU",n:"Energia Interna",d:"Soma de toda energia cinética e potencial das moléculas. ΔU > 0: sistema ficou mais energético.",c:"text-emerald-300 border-emerald-500/30 bg-emerald-950/10"},
          {sym:"Q",n:"Calor",d:"Energia recebida (+Q) ou cedida (−Q) pelo sistema. Flui por diferença de temperatura.",c:"text-rose-300 border-rose-500/30 bg-rose-950/10"},
          {sym:"W",n:"Trabalho",d:"Energia cedida (W>0: gás expande) ou recebida (W<0: gás comprimido) por força mecânica.",c:"text-sky-300 border-sky-500/30 bg-sky-950/10"},
        ].map((t,i)=>(
          <div key={i} className={`border rounded-2xl p-5 text-center ${t.c}`}>
            <code className="text-4xl font-black">{t.sym}</code>
            <div className="font-bold my-1">{t.n}</div>
            <p className="text-sm opacity-80 text-left mt-2">{t.d}</p>
          </div>
        ))}
      </div>
    </div>
  ),
  () => {
    const [Q, setQ] = useState(500); const [W, setW] = useState(200);
    const dU = Q - W;
    return (
      <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
        <h2 className="text-4xl font-black text-slate-100 mb-4">🧮 Calculadora da 1ª Lei</h2>
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 space-y-3 mb-4">
          <div><label className="text-xs font-bold text-slate-400 block mb-1">Calor Q recebido: <span className="text-rose-300">{Q} J</span></label><input type="range" min={-500} max={1000} value={Q} onChange={e=>setQ(+e.target.value)} className="w-full accent-rose-400"/></div>
          <div><label className="text-xs font-bold text-slate-400 block mb-1">Trabalho W realizado pelo gás: <span className="text-sky-300">{W} J</span></label><input type="range" min={-500} max={1000} value={W} onChange={e=>setW(+e.target.value)} className="w-full accent-sky-400"/></div>
        </div>
        <div className={`border-2 rounded-2xl p-5 text-center ${dU>0?"border-emerald-500/40 bg-emerald-950/20":dU<0?"border-rose-500/40 bg-rose-950/20":"border-slate-600 bg-slate-900"}`}>
          <div className="text-xs font-black text-slate-400 mb-1">VARIAÇÃO DE ENERGIA INTERNA ΔU</div>
          <div className={`text-4xl font-black ${dU>0?"text-emerald-300":dU<0?"text-rose-300":"text-slate-300"}`}>{dU > 0 ? "+" : ""}{dU} J</div>
          <div className="text-slate-500 text-sm mt-2">{dU>0?"Sistema ganhou energia — ficou mais quente":dU<0?"Sistema perdeu energia — esfriou":"Energia interna não mudou (processo isotérmico)"}</div>
        </div>
      </div>
    );
  },
  () => (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-4xl font-black text-slate-100 mb-5">♻️ Rendimento Máximo — Ciclo de Carnot</h2>
      <div className="bg-slate-950 border-2 border-amber-500/30 rounded-3xl p-6 text-center mb-5">
        <code className="text-3xl font-mono font-black text-amber-300">η_Carnot = 1 − T_fria/T_quente</code>
        <p className="text-slate-500 text-sm mt-2">T em Kelvin! Nenhuma máquina real pode superar o rendimento de Carnot.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
          <h3 className="font-black text-slate-100 mb-3">🚂 Máquina Térmica</h3>
          <p className="text-slate-400 text-sm mb-3">Absorve calor Q_H da fonte quente (T_H), realiza trabalho W, e descarta calor Q_C para a fonte fria (T_C).</p>
          <code className="text-amber-300 text-sm block">W = Q_H − Q_C</code>
          <code className="text-amber-300 text-sm block">η = W/Q_H = 1−Q_C/Q_H</code>
        </div>
        <div className="space-y-3">
          {[{i:"🚗",t:"Motor Otto (carro)",e:"~25−30%"},
            {i:"🚂",t:"Motor a Vapor histórico",e:"~15%"},
            {i:"⚡",t:"Turbina a gás moderna",e:"~40−45%"},
            {i:"🌀",t:"Ciclo combinado (termelétrica)",e:"~60%"}].map((m,i)=>(
            <div key={i} className="bg-slate-900 border border-slate-700 rounded-xl p-3 flex justify-between items-center">
              <span className="text-slate-300 text-sm">{m.i} {m.t}</span>
              <span className="font-black text-amber-300 text-sm">{m.e}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  () => <Quiz n={1} total={2} q="Um sistema recebe 800J de calor e realiza 300J de trabalho. Qual a variação de energia interna?" opts={["1100 J","500 J","300 J","-500 J"]} correct={1} exp="✅ B — ΔU = Q − W = 800 − 300 = 500 J. O sistema ficou com 500J extras de energia interna." />,
  () => <Quiz n={2} total={2} q="Uma máquina de Carnot opera entre 600K e 300K. Qual seu rendimento máximo?" opts={["50%","100%","25%","75%"]} correct={0} exp="✅ A — η = 1 − T_C/T_H = 1 − 300/600 = 1 − 0,5 = 0,5 = 50%. Nenhuma máquina real poderá superar esse valor entre essas temperaturas!" />,
  () => (
    <PixelQuiz character={0} title="🎮 Grand Final — Termodinâmica!" subtitle="Pink Monster em modo hardcore!"
      questions={[
        {q:"A 2ª Lei da Termodinâmica diz que o calor flui espontaneamente:",opts:["Do frio para o quente","Do quente para o frio","Em qualquer direção","Depende da pressão"],correct:1,explanation:"O calor SEMPRE flui espontaneamente do mais quente para o mais frio (gradiente de temperatura). Para fazer o inverso (geladeira), precisamos de trabalho externo — por isso geladeiras consomem energia elétrica!"},
        {q:"Um processo adiabático é aquele onde:",opts:["Temperatura é constante","Volume é constante","Não há troca de calor com o ambiente (Q=0)","Pressão é constante"],correct:2,explanation:"Adiabático: Q=0. Então ΔU = −W. Se o gás se expande (W>0), perde energia interna → esfria. Isso explica por que ar comprimido sai frio de pneus, e por que altitude alta é mais fria."},
      ]}
    />
  ),
  () => {
    const [stars, setStars] = useState(0);
    const topics = ["🌡️ Temperatura e escalas","🔥 Calor e propagação","⚗️ Calorimetria Q=mcΔT","🧊 Calor latente Q=mL","📏 Dilatação ΔL=αL₀ΔT","🫧 Leis dos gases","⚙️ 1ª Lei ΔU=Q−W","♻️ Carnot e 2ª Lei"];
    return (
      <div className="max-w-4xl mx-auto animate-in fade-in duration-500 text-center">
        <div className="text-7xl mb-4">🎓</div>
        <h1 className="text-4xl font-black text-white mb-3">Física 2 — 1º Semestre Concluído!</h1>
        <p className="text-slate-400 mb-6">Você cobriu toda a Termodinâmica do 2º ano!</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
          {topics.map((t,i)=><div key={i} className="bg-slate-900 border border-orange-500/20 rounded-xl p-2 text-xs text-slate-300">{t}</div>)}
        </div>
        <div className="flex gap-2 justify-center mb-5">{[1,2,3,4,5].map(n=><button key={n} onClick={()=>setStars(n)} className={`text-3xl hover:scale-125 transition-all ${n<=stars?"text-amber-400":"text-slate-700"}`}>★</button>)}</div>
        <Link to="/fisica2" className="px-8 py-3 bg-orange-600 hover:bg-orange-500 text-white font-black rounded-2xl transition-all text-lg">Voltar ao Mapa de Física 2 🗺️</Link>
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

export const Fisica2NewLesson5 = makeLesson(SEM5, "Sem. 5 — Calor Latente & Mudanças de Estado", "Sem. 5");
export const Fisica2NewLesson6 = makeLesson(SEM6, "Sem. 6 — Dilatação Térmica", "Sem. 6");
export const Fisica2NewLesson7 = makeLesson(SEM7, "Sem. 7 — Leis dos Gases Ideais", "Sem. 7");
export const Fisica2NewLesson8 = makeLesson(SEM8, "Sem. 8 — Termodinâmica: 1ª e 2ª Leis", "Sem. 8");
