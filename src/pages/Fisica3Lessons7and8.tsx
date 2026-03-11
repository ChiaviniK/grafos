import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Home, CheckCircle2 } from "lucide-react";

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
      <span className="text-xs font-black tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">QUIZ {n}/{total}</span>
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
// SEMANA 7 — 2ª Lei de Ohm & Multímetro
// ═══════════════════════════════════════════════════════════════════════════════
const SEM7: React.FC[] = [
  // S1 Capa
  () => (
    <div className="flex flex-col items-center justify-center min-h-[72vh] text-center animate-in fade-in zoom-in duration-700 relative">
      <div className="absolute inset-0 opacity-10 rounded-3xl" style={{ backgroundImage:"url('/sprites/backgrounds/7/2304x1296.png')", backgroundSize:"cover", imageRendering:"pixelated" }} />
      <div className="relative z-10 max-w-2xl">
        <span className="bg-amber-500/20 text-amber-400 font-bold px-4 py-1.5 rounded-full text-xs tracking-widest border border-amber-500/30">FÍSICA 3 · SEMANA 7</span>
        <div className="text-8xl my-6">🔬</div>
        <h1 className="text-5xl md:text-6xl font-black text-white leading-none mb-4">2ª Lei de Ohm<br /><span className="text-violet-400">& Medição</span></h1>
        <p className="text-xl text-slate-400 mb-6">A resistência não é apenas uma constante — ela depende do material, do comprimento e da seção. E aprendemos a medir tudo com o multímetro.</p>
        <div className="flex gap-3 flex-wrap justify-center text-sm">
          {["R = ρ·L/A","🧪 Resistividade","🌡️ Temperatura","🔌 Multímetro"].map(t => (
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
        <h2 className="text-3xl font-black text-slate-100 mt-5 mb-5">Por que fio grosso conduz melhor que fio fino? 🤔</h2>
        <div className="space-y-3 mb-5">
          {["Por que linhas de transmissão de alta tensão usam fios tão grossos?","Por que chuveiro elétrico usa fio de seção diferente do de uma lâmpada?","Um fio de 10m tem mais resistência que um de 1m mesmo sendo igual?","Por que tungstênio é usado no filamento de lâmpada, não cobre?"].map((s,i) => (
            <div key={i} className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-slate-300 text-sm">{s}</div>
          ))}
        </div>
        <button onClick={()=>setRev(true)} className={`w-full py-4 rounded-2xl font-bold border-2 transition-all ${rev?"border-violet-500 bg-violet-950/20 text-violet-200":"border-slate-600 text-slate-400 hover:border-violet-500"}`}>
          {rev ? "✅ R depende de ρ (material), L (comprimento) e A (seção)!" : "👆 O que determina a resistência de um fio?"}
        </button>
        {rev && <div className="mt-4 bg-violet-950/20 border border-violet-500/30 rounded-2xl p-5 animate-in fade-in text-violet-200">A 2ª Lei de Ohm revela: R = ρ·L/A. Mais comprimento → mais R. Seção maior → menos R (mais caminho para elétrons). E ρ é propriedade do material.</div>}
      </div>
    );
  },
  // S3 2ª Lei de Ohm
  () => (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-4xl font-black text-slate-100 mb-5">📐 2ª Lei de Ohm</h2>
      <div className="bg-slate-950 border-2 border-violet-500/30 rounded-3xl p-6 text-center mb-5">
        <code className="text-3xl font-mono font-black text-violet-300">R = ρ · L / A</code>
      </div>
      <div className="grid md:grid-cols-3 gap-4 mb-4">
        {[
          {sym:"ρ",name:"Resistividade",unit:"Ω·m",color:"text-violet-300 border-violet-500/30 bg-violet-950/20",desc:"Propriedade intrínseca do material. Quanto menor ρ, melhor a condução. Varia com temperatura."},
          {sym:"L",name:"Comprimento",unit:"metros (m)",color:"text-amber-300 border-amber-500/30 bg-amber-950/20",desc:"Mais longo = mais R. Elétrons percorrem mais caminho, colidindo mais com a rede cristalina."},
          {sym:"A",name:"Seção Transversal",unit:"m² (ou mm²)",color:"text-emerald-300 border-emerald-500/30 bg-emerald-950/20",desc:"Maior seção = mais 'corredores' para os elétrons = menos R. Fio grosso conduz melhor."},
        ].map((t,i) => (
          <div key={i} className={`rounded-2xl border p-5 text-center ${t.color}`}>
            <code className="text-4xl font-black">{t.sym}</code>
            <div className="font-bold my-1">{t.name}</div>
            <div className="text-xs opacity-70 mb-2">{t.unit}</div>
            <p className="text-sm opacity-80 text-left">{t.desc}</p>
          </div>
        ))}
      </div>
    </div>
  ),
  // S4 Calculadora ρLA
  () => {
    const materials = [{n:"Cobre",r:1.7},{n:"Alumínio",r:2.8},{n:"Ferro",r:10.6},{n:"Nicromo",r:100}];
    const [mat, setMat] = useState(0); const [L, setL] = useState(10); const [A, setA] = useState(1);
    const R = (materials[mat].r * 1e-8 * L / (A * 1e-6)).toFixed(4);
    return (
      <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
        <h2 className="text-4xl font-black text-slate-100 mb-4">🧮 Calculadora — 2ª Lei de Ohm</h2>
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 space-y-4 mb-4">
          <div>
            <label className="text-xs font-bold text-slate-400 block mb-2">Material:</label>
            <div className="flex gap-2 flex-wrap">
              {materials.map((m,i) => <button key={i} onClick={()=>setMat(i)} className={`px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition-all ${mat===i?"border-violet-500 bg-violet-950/30 text-violet-300":"border-slate-700 text-slate-400"}`}>{m.n} (ρ={m.r}×10⁻⁸)</button>)}
            </div>
          </div>
          <div><label className="text-xs font-bold text-slate-400 block mb-1">Comprimento L: <span className="text-violet-300">{L} m</span></label><input type="range" min={0.1} max={1000} step={0.5} value={L} onChange={e=>setL(+e.target.value)} className="w-full accent-violet-400" /></div>
          <div><label className="text-xs font-bold text-slate-400 block mb-1">Seção A: <span className="text-amber-300">{A} mm²</span></label><input type="range" min={0.5} max={25} step={0.5} value={A} onChange={e=>setA(+e.target.value)} className="w-full accent-amber-400" /></div>
        </div>
        <div className="bg-violet-950/30 border border-violet-500/40 rounded-2xl p-5 text-center">
          <div className="text-xs font-black text-violet-400 mb-1">RESISTÊNCIA</div>
          <div className="text-5xl font-black text-violet-300">{R} Ω</div>
          <div className="text-slate-500 text-xs mt-2">ρ={materials[mat].r}×10⁻⁸ × {L} / {A}×10⁻⁶</div>
        </div>
      </div>
    );
  },
  // S5 Resistividade e Temperatura
  () => (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-4xl font-black text-slate-100 mb-5">🌡️ Resistividade & Temperatura</h2>
      <div className="grid md:grid-cols-2 gap-4 mb-5">
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
          <h3 className="font-black text-slate-100 mb-3">Metais: ρ aumenta com T</h3>
          <p className="text-slate-400 text-sm mb-3">À medida que a temperatura sobe, a rede cristalina vibra mais → mais colisões com elétrons → maior resistividade. ρ(T) ≈ ρ₀·(1 + α·ΔT)</p>
          <div className="bg-amber-950/20 border border-amber-500/20 rounded-xl p-3 text-sm text-amber-200">Lâmpada incandescente: filamento de tungstênio a 2700°C tem ρ muito maior que temperatura ambiente. Por isso R a quente {">>"} R a frio.</div>
        </div>
        <div className="space-y-3">
          {[{i:"❄️",t:"Supercondutores",d:"Abaixo de temperatura crítica (próximo ao zero absoluto, ~4K), ρ cai a ZERO. Usado em aceleradores de partículas e trens Maglev."},
            {i:"🔥",t:"NTC (Termistor)",d:"Negative Temperature Coefficient: ρ cai com T. Semicondutores dopados. Usado em sensor de temperatura de motor, celular."},
            {i:"📉",t:"Cabos de alta tensão",d:"Linhas de transmissão aquecem sob carga → R aumenta → mais perdas. Por isso engenheiros monitoram temperatura e usam cabos de alumínio resfriados."}].map((c,i) => (
            <div key={i} className="bg-slate-900 border border-slate-700 rounded-xl p-3 flex gap-3"><span className="text-xl">{c.i}</span><div><p className="font-bold text-slate-100 text-xs">{c.t}</p><p className="text-slate-400 text-xs mt-1">{c.d}</p></div></div>
          ))}
        </div>
      </div>
    </div>
  ),
  // S6 Multímetro
  () => {
    const [func_, setFunc_] = useState<"V"|"A"|"R">("V");
    const info = {
      V: {t:"🔋 Voltímetro",d:"Mede tensão (ddp) entre dois pontos. Conectar em PARALELO com o componente. Alta resistência interna (~MΩ) para não desviar corrente.",c:"text-yellow-300 border-yellow-500/40 bg-yellow-950/20"},
      A: {t:"⚡ Amperímetro",d:"Mede corrente que passa pelo ponto. Conectar em SÉRIE no circuito. Baixa resistência interna (~mΩ) para não perturbar a corrente.",c:"text-emerald-300 border-emerald-500/40 bg-emerald-950/20"},
      R: {t:"Ω Ohmímetro",d:"Mede resistência de um componente. Usar com CIRCUITO DESLIGADO. O multímetro injeta corrente conhecida e mede a tensão resultante → R = V/i.",c:"text-violet-300 border-violet-500/40 bg-violet-950/20"},
    };
    const d = info[func_];
    return (
      <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
        <h2 className="text-4xl font-black text-slate-100 mb-4">🔬 Multímetro Digital</h2>
        <div className="flex gap-3 mb-5">
          {(["V","A","R"] as const).map(f => <button key={f} onClick={()=>setFunc_(f)} className={`px-4 py-2 rounded-xl font-bold border-2 text-sm transition-all ${func_===f ? info[f].c : "border-slate-700 text-slate-400"}`}>{info[f].t.split(" ")[0]} {f}</button>)}
        </div>
        <div className={`border-2 rounded-3xl p-6 mb-5 animate-in fade-in ${d.c}`}>
          <h3 className={`text-2xl font-black mb-3 ${d.c.split(" ")[0]}`}>{d.t}</h3>
          <p className="text-slate-300 text-lg">{d.d}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-3 text-xs">
          {[["⚠️ NUNCA medir resistência com circuito ligado","Pode queimar o multímetro"],["⚠️ Amperímetro NUNCA em paralelo","Cria curto-circuito"],["✅ Selecionar a faixa certa","Comece pela faixa maior e vá reduzindo"]].map(([t,d2],i) => (
            <div key={i} className={`rounded-xl p-3 ${i<2?"bg-rose-950/20 border border-rose-500/20 text-rose-200":"bg-emerald-950/20 border border-emerald-500/20 text-emerald-200"}`}><p className="font-bold text-xs">{t}</p><p className="text-xs opacity-70 mt-1">{d2}</p></div>
          ))}
        </div>
      </div>
    );
  },
  // S7 Quiz 1
  () => <Quiz n={1} total={3} q="Um fio de cobre com resistividade ρ = 1,7×10⁻⁸ Ω·m, comprimento L = 100 m e seção A = 1 mm² tem resistência de:" opts={["0,017 Ω","1,7 Ω","17 Ω","170 Ω"]} correct={1} explanation="✅ B — R = ρ·L/A = 1,7×10⁻⁸ × 100 / (1×10⁻⁶) = 1,7×10⁻⁶ / 10⁻⁶ = 1,7 Ω. Atenção: converter mm² para m²!" />,
  // S8 Quiz 2
  () => <Quiz n={2} total={3} q="Mantendo material e seção fixos, triplicar o comprimento do fio causa:" opts={["R fica igual.","R triplica — R ∝ L.","R cai à metade.","R quadruplica."]} correct={1} explanation="✅ B — R = ρ·L/A. Dobrando L → R dobra. Triplicando L → R triplica. Diretamente proporcional." />,
  // S9 Quiz 3
  () => <Quiz n={3} total={3} q="Para medir a resistência de um componente com o multímetro, deve-se:" opts={["Conectar em paralelo com o circuito ligado.","Desligar o circuito e conectar o ohmímetro ao componente isolado.","Medir com corrente contínua alta passando pelo componente.","Conectar em série no circuito ligado."]} correct={1} explanation="✅ B — Circuito DESLIGADO obrigatoriamente. O multímetro injeta sua própria corrente de referência para calcular R = V/i. Com circuito ligado, a medição fica errada e pode danificar o equipamento." />,
  // S10 Mapa Mental
  () => (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-4xl font-black text-slate-100 mb-5">🗺️ Mapa Mental — Sem. 7</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {t:"📐 2ª Lei de Ohm",items:["R = ρ·L/A","R ∝ L (comprimento)","R ∝ 1/A (seção)","R ∝ ρ (material)"],c:"border-violet-500/30 bg-violet-950/10"},
          {t:"🧪 Resistividade ρ",items:["Propriedade do material","Cobre: 1,7×10⁻⁸ Ω·m","Nicromo: 100×10⁻⁸ Ω·m","ρ aumenta com T (metais)"],c:"border-amber-500/30 bg-amber-950/10"},
          {t:"🌡️ Temperatura",items:["Metais: ρ↑ com T","Semicond.: ρ↓ com T","NTC: termistor sensor","Supercondutor: ρ→0"],c:"border-rose-500/30 bg-rose-950/10"},
          {t:"🔬 Multímetro — V",items:["EM PARALELO","Mede ddp (tensão)","Alta R interna","Faixa → começa maior"],c:"border-yellow-500/30 bg-yellow-950/10"},
          {t:"🔬 Multímetro — A",items:["EM SÉRIE","Mede corrente","Baixa R interna","NUNCA em paralelo!"],c:"border-emerald-500/30 bg-emerald-950/10"},
          {t:"🔮 Próximo",items:["Energia elétrica (J e kWh)","Potência P = V·i","Consumo mensal","Conta de luz"],c:"border-slate-600 bg-slate-900/60"},
        ].map((b,i) => (
          <div key={i} className={`rounded-2xl border p-4 ${b.c}`}>
            <h4 className="font-black text-slate-100 mb-2 text-sm">{b.t}</h4>
            <ul className="space-y-1">{b.items.map(s=><li key={s} className="text-slate-400 text-xs">→ {s}</li>)}</ul>
          </div>
        ))}
      </div>
    </div>
  ),
  // S11 Encerramento
  () => {
    const [stars, setStars] = useState(0);
    return (
      <div className="flex flex-col items-center justify-center min-h-[72vh] text-center animate-in fade-in zoom-in">
        <div className="text-7xl mb-4">🏆</div>
        <h1 className="text-4xl font-black text-white mb-3">Semana 7 Concluída!</h1>
        <p className="text-xl text-slate-400 max-w-lg mx-auto mb-6">2ª Lei de Ohm e medição elétrica dominados! Última semana: Energia e Potência.</p>
        <div className="flex gap-2 justify-center mb-4">
          {[1,2,3,4,5].map(n => <button key={n} onClick={()=>setStars(n)} className={`text-3xl hover:scale-125 transition-all ${n<=stars?"text-amber-400":"text-slate-700"}`}>★</button>)}
        </div>
        {stars>0 && <p className="text-amber-300 text-sm mb-4">{["😐 Pode melhorar!","🙂 Razoável!","😊 Bom!","😄 Muito bom!","🤩 Excelente!"][stars-1]}</p>}
        <Link to="/fisica3/sem8" className="px-8 py-3 bg-amber-600 hover:bg-amber-500 text-white font-black rounded-2xl transition-all text-lg">Última Semana →</Link>
      </div>
    );
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// SEMANA 8 — Energia Elétrica & Potência (Fechamento)
// ═══════════════════════════════════════════════════════════════════════════════
const SEM8: React.FC[] = [
  // S1 Capa
  () => (
    <div className="flex flex-col items-center justify-center min-h-[72vh] text-center animate-in fade-in zoom-in duration-700 relative">
      <div className="absolute inset-0 opacity-10 rounded-3xl" style={{ backgroundImage:"url('/sprites/backgrounds/8/2304x1296.png')", backgroundSize:"cover", imageRendering:"pixelated" }} />
      <div className="relative z-10 max-w-2xl">
        <span className="bg-amber-500/20 text-amber-400 font-bold px-4 py-1.5 rounded-full text-xs tracking-widest border border-amber-500/30">FÍSICA 3 · SEMANA 8 · FECHAMENTO</span>
        <div className="text-8xl my-6">💡</div>
        <h1 className="text-5xl md:text-6xl font-black text-white leading-none mb-4">Energia Elétrica<br /><span className="text-green-400">& Potência</span></h1>
        <p className="text-xl text-slate-400 mb-6">Quanto custa acender uma lâmpada por um mês? E um servidor de dados? Revisão completa e fechamento do 1º Bimestre.</p>
        <div className="flex gap-3 flex-wrap justify-center text-sm">
          {["💡 P = V·i","⚡ E = P·t","💰 kWh","📊 Revisão Bimestre"].map(t => (
            <div key={t} className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-xl text-slate-300">{t}</div>
          ))}
        </div>
      </div>
    </div>
  ),
  // S2 Potência Elétrica
  () => (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-4xl font-black text-slate-100 mb-5">💡 Potência Elétrica</h2>
      <div className="bg-slate-950 border-2 border-green-500/30 rounded-3xl p-5 text-center mb-5">
        <code className="text-2xl font-mono font-black text-green-300">P = V · i = V² / R = R · i²</code>
        <p className="text-slate-500 text-sm mt-2">Taxa de conversão de energia elétrica. Unidade: Watt (W = J/s)</p>
      </div>
      <div className="grid md:grid-cols-3 gap-4 mb-4">
        {[{f:"P = V·i",d:"Use quando conhece V e i. Válida para qualquer componente.",c:"border-green-500/30 bg-green-950/20 text-green-300"},
          {f:"P = V²/R",d:"Use quando conhece V e R. Tensão fixada pela fonte.",c:"border-amber-500/30 bg-amber-950/20 text-amber-300"},
          {f:"P = R·i²",d:"Use quando conhece i e R. Corrente igual para componentes em série.",c:"border-sky-500/30 bg-sky-950/20 text-sky-300"}].map((p,i) => (
          <div key={i} className={`border rounded-2xl p-4 text-center ${p.c}`}>
            <code className="text-xl font-black">{p.f}</code>
            <p className="text-slate-400 text-xs mt-2">{p.d}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-2 text-xs text-center">
        {[["LED","0,06 W"],["Celular carga.","18 W"],["Notebook","65 W"],["Ar-condicionado","1500 W"]].map(([n,v])=>(
          <div key={n} className="bg-slate-900 border border-slate-700 rounded-xl p-2"><div className="text-slate-400">{n}</div><div className="font-black text-green-300 mt-1">{v}</div></div>
        ))}
      </div>
    </div>
  ),
  // S3 Energia e kWh
  () => (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-4xl font-black text-slate-100 mb-5">⚡ Energia Elétrica — kWh</h2>
      <div className="grid md:grid-cols-2 gap-4 mb-5">
        <div className="bg-slate-950 border-2 border-amber-500/30 rounded-3xl p-5">
          <code className="text-2xl font-mono font-black text-amber-300 block text-center mb-3">E = P · t</code>
          <div className="space-y-2 text-sm text-slate-400">
            <p>• Em Joules: P(W) × t(s)</p>
            <p>• Em kWh: P(kW) × t(h)</p>
            <p>• 1 kWh = 3.600.000 J = 3,6 MJ</p>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
          <h3 className="font-black text-slate-100 mb-3">💰 Conta de Luz</h3>
          <p className="text-slate-400 text-sm mb-3">A distribuidora cobra por kWh consumido. Tarifa residencial ≈ R$ 0,80–1,20/kWh.</p>
          <div className="font-mono text-xs text-slate-300 space-y-1">
            <p>Chuveiro 5500W × 0,5h/dia × 30 dias</p>
            <p>= 2,75 kW × 15h = 41,25 kWh</p>
            <p className="text-amber-300">Custo: 41,25 × R$0,90 = R$ 37,13</p>
          </div>
        </div>
      </div>
      <div className="bg-green-950/20 border border-green-500/30 rounded-2xl p-4 text-sm text-green-200">
        🌱 <strong>Eficiência energética:</strong> LED de 9W substitui lâmpada incandescente de 60W com mesma luminosidade. Economia: 85% de energia. Em 1000 horas = 51 kWh a menos = ~R$ 45 economizados por lâmpada!
      </div>
    </div>
  ),
  // S4 Calculadora de Consumo
  () => {
    const [P, setP] = useState(100); const [h, setH] = useState(8); const [days, setDays] = useState(30); const [tarifa, setTarifa] = useState(0.9);
    const kWh = (P*h*days/1000).toFixed(2); const custo = (+kWh*tarifa).toFixed(2);
    return (
      <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
        <h2 className="text-4xl font-black text-slate-100 mb-4">💰 Calculadora de Consumo Mensal</h2>
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 space-y-4 mb-4">
          <div><label className="text-xs font-bold text-slate-400 block mb-1">Potência (W): <span className="text-green-300">{P} W</span></label><input type="range" min={5} max={5000} step={5} value={P} onChange={e=>setP(+e.target.value)} className="w-full accent-green-400" /></div>
          <div><label className="text-xs font-bold text-slate-400 block mb-1">Horas/dia: <span className="text-amber-300">{h} h</span></label><input type="range" min={1} max={24} value={h} onChange={e=>setH(+e.target.value)} className="w-full accent-amber-400" /></div>
          <div><label className="text-xs font-bold text-slate-400 block mb-1">Dias no mês: <span className="text-sky-300">{days}</span></label><input type="range" min={1} max={31} value={days} onChange={e=>setDays(+e.target.value)} className="w-full accent-sky-400" /></div>
          <div><label className="text-xs font-bold text-slate-400 block mb-1">Tarifa (R$/kWh): <span className="text-rose-300">R$ {tarifa}</span></label><input type="range" min={0.5} max={2.0} step={0.05} value={tarifa} onChange={e=>setTarifa(+e.target.value)} className="w-full accent-rose-400" /></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-950/30 border border-green-500/30 rounded-2xl p-4 text-center"><div className="text-xs font-black text-green-400 mb-1">ENERGIA CONSUMIDA</div><div className="text-4xl font-black text-green-300">{kWh} kWh</div></div>
          <div className="bg-amber-950/30 border border-amber-500/30 rounded-2xl p-4 text-center"><div className="text-xs font-black text-amber-400 mb-1">CUSTO ESTIMADO</div><div className="text-4xl font-black text-amber-300">R$ {custo}</div></div>
        </div>
      </div>
    );
  },
  // S5 Revisão Bimestre
  () => (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <span className="text-xs font-black tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">FECHAMENTO DO BIMESTRE</span>
      <h2 className="text-4xl font-black text-slate-100 mt-4 mb-5">📊 Todas as Fórmulas do 1º Bimestre</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-slate-700 rounded-2xl overflow-hidden">
          <thead><tr className="bg-slate-800"><th className="p-3 text-left text-slate-300">Fórmula</th><th className="p-3 text-left text-slate-300">Nome</th><th className="p-3 text-left text-slate-300">Unidade</th></tr></thead>
          <tbody>
            {[
              ["F = k·|q₁|·|q₂|/r²","Força de Coulomb","Newton (N)"],
              ["E = k·Q/r²","Campo Elétrico","N/C = V/m"],
              ["V = k·Q/r","Potencial Elétrico","Volt (V)"],
              ["τ = q·ΔV","Trabalho da força elétrica","Joule (J)"],
              ["i = ΔQ/Δt","Corrente Elétrica","Ampere (A)"],
              ["V = R·i","1ª Lei de Ohm","V, Ω, A"],
              ["R = ρ·L/A","2ª Lei de Ohm","Ohm (Ω)"],
              ["P = V·i = V²/R = Ri²","Potência Elétrica","Watt (W)"],
              ["E = P·t","Energia Elétrica","Joule / kWh"],
            ].map((r,i) => (
              <tr key={i} className={i%2===0?"bg-slate-900/60":"bg-slate-900/30"}>
                <td className="p-3 border-t border-slate-800 font-mono text-amber-300 text-xs">{r[0]}</td>
                <td className="p-3 border-t border-slate-800 text-slate-200 text-xs font-semibold">{r[1]}</td>
                <td className="p-3 border-t border-slate-800 text-slate-500 text-xs">{r[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ),
  // S6 Quiz 1
  () => <Quiz n={1} total={3} q="Um aparelho de 750 W funciona 4 horas por dia durante 30 dias. Com tarifa de R$ 0,80/kWh, qual o custo mensal?" opts={["R$ 24,00","R$ 72,00","R$ 36,00","R$ 48,00"]} correct={1} explanation="✅ B — E = 0,75 kW × 4h × 30 = 90 kWh. Custo = 90 × 0,80 = R$ 72,00. Não esqueça de converter W para kW!" />,
  // S7 Quiz 2
  () => <Quiz n={2} total={3} q="Uma resistência dissipa 200 W quando percorrida por 4 A. Qual sua resistência?" opts={["50 Ω","12,5 Ω","800 Ω","0,08 Ω"]} correct={1} explanation="✅ B — P = R·i² → R = P/i² = 200/16 = 12,5 Ω. Alternativa: V = P/i = 200/4 = 50V → R = V/i = 50/4 = 12,5 Ω." />,
  // S8 Quiz 3 — Revisão Geral
  () => <Quiz n={3} total={3} q="Uma carga de 2 μC é colocada num campo elétrico de 5×10⁴ N/C. A força sobre ela é de:" opts={["2,5×10¹⁰ N","0,1 N","10⁻¹ N","B e C são equivalentes (0,1 N = 10⁻¹ N)"]} correct={3} explanation="✅ D — F = q·E = 2×10⁻⁶ × 5×10⁴ = 10⁻¹ N = 0,1 N. As opções B e C dizem a mesma coisa! Fique atento a notação científica em provas." />,
  // S9 Mapa do Bimestre
  () => {
    const [done, setDone] = useState<Record<number,boolean>>({});
    const temas = [
      {t:"⚡ Eletrostática",s:"Carga, eletrização, atração/repulsão"},
      {t:"⚖️ Lei de Coulomb",s:"F = k·|q₁|·|q₂|/r²"},
      {t:"🌐 Campo Elétrico",s:"E = k·Q/r², linhas de campo"},
      {t:"🛡️ Condutores",s:"E interno = 0, gaiola de Faraday"},
      {t:"🔋 Potencial",s:"V = k·Q/r, ddp = tensão, equipotenciais"},
      {t:"⚡ Corrente",s:"i = ΔQ/Δt, 3 tipos de materiais"},
      {t:"🔌 1ª Lei de Ohm",s:"V = R·i, série e paralelo"},
      {t:"📐 2ª Lei de Ohm",s:"R = ρ·L/A, resistividade, multímetro"},
      {t:"💡 Potência e Energia",s:"P = V·i, E = P·t, kWh, conta de luz"},
    ];
    return (
      <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
        <h2 className="text-4xl font-black text-slate-100 mb-4">✅ Checklist do 1º Bimestre</h2>
        <p className="text-slate-500 mb-5">Marque os temas que você se sente seguro:</p>
        <div className="space-y-2">
          {temas.map((t,i) => (
            <button key={i} onClick={()=>setDone(p=>({...p,[i]:!p[i]}))} className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${done[i]?"border-emerald-500/60 bg-emerald-950/20":"border-slate-700 bg-slate-900/60 hover:border-slate-500"}`}>
              <div className="flex-1"><p className={`font-bold text-sm ${done[i]?"text-emerald-300":"text-slate-200"}`}>{t.t}</p><p className="text-slate-500 text-xs">{t.s}</p></div>
              {done[i] ? <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> : <div className="w-5 h-5 rounded-full border-2 border-slate-600 shrink-0" />}
            </button>
          ))}
        </div>
        <div className="mt-4 text-center text-slate-500 text-sm">
          {Object.values(done).filter(Boolean).length} / {temas.length} temas dominados
        </div>
      </div>
    );
  },
  // S10 Encerramento Final
  () => {
    const [stars, setStars] = useState(0);
    return (
      <div className="flex flex-col items-center justify-center min-h-[72vh] text-center animate-in fade-in zoom-in duration-700">
        <div className="text-7xl mb-4">🏆</div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-3">1º Bimestre Concluído!</h1>
        <p className="text-xl text-slate-400 max-w-xl mx-auto mb-6">Parabéns! Você completou todas as 8 semanas de Física 3 — do átomo ao consumo elétrico real.</p>
        <div className="mb-6">
          <p className="text-slate-500 text-sm mb-2">Como foi o bimestre?</p>
          <div className="flex gap-2 justify-center">
            {[1,2,3,4,5].map(n => <button key={n} onClick={()=>setStars(n)} className={`text-3xl hover:scale-125 transition-all ${n<=stars?"text-amber-400":"text-slate-700"}`}>★</button>)}
          </div>
          {stars>0 && <p className="text-amber-300 text-sm mt-2">{["😐 Pode melhorar!","🙂 Razoável!","😊 Bom!","😄 Muito bom!","🤩 Excelente!"][stars-1]}</p>}
        </div>
        <div className="flex flex-wrap gap-2 justify-center mb-6 max-w-xl">
          {["⚡ Eletrost.","⚖️ Coulomb","🌐 Campo E","🛡️ Faraday","🔋 Potencial","⚡ Corrente","🔌 Ohm 1ª","📐 Ohm 2ª","💡 Potência","💰 kWh"].map(t => (
            <span key={t} className="bg-amber-900/30 text-amber-300 text-xs font-bold px-3 py-1.5 rounded-full border border-amber-500/20">{t}</span>
          ))}
        </div>
        <Link to="/fisica3" className="px-8 py-3 bg-amber-600 hover:bg-amber-500 text-white font-black rounded-2xl transition-all text-lg">Voltar ao Programa →</Link>
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

export const Fisica3Lesson7 = makeLesson(SEM7, "Sem. 7 — 2ª Lei de Ohm & Medição", "Sem. 7");
export const Fisica3Lesson8 = makeLesson(SEM8, "Sem. 8 — Energia Elétrica & Fechamento", "Sem. 8");
