import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Home, CheckCircle2, Circle } from "lucide-react";

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

// ── SLIDE 1: CAPA ─────────────────────────────────────────────────────────────
function S01() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[72vh] text-center animate-in fade-in zoom-in duration-700 relative">
      <div className="absolute inset-0 opacity-10 rounded-3xl" style={{ backgroundImage:"url('/sprites/backgrounds/1/2304x1296.png')", backgroundSize:"cover", imageRendering:"pixelated" }} />
      <div className="relative z-10 max-w-2xl">
        <span className="bg-amber-500/20 text-amber-400 font-bold px-4 py-1.5 rounded-full text-xs tracking-widest border border-amber-500/30">FÍSICA 3 · 3º ANO · SEM. 1</span>
        <div className="text-8xl my-6">⚡</div>
        <h1 className="text-5xl md:text-7xl font-black text-white leading-none mb-4">Eletrostática &<br /><span className="text-amber-400">Eletrização</span></h1>
        <p className="text-xl text-slate-400 mb-8">Tudo começa com uma carga. Descubra por que seu cabelo levanta quando você tira o agasalho — e como isso movimenta o mundo moderno.</p>
        <div className="flex gap-3 flex-wrap justify-center text-sm">
          {["⚡ Carga elétrica","👋 Eletrização","🌩️ Para-raios","📱 Touchscreen"].map(t => (
            <div key={t} className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-xl text-slate-300">{t}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── SLIDE 2: AGENDA ───────────────────────────────────────────────────────────
function S02() {
  const [done, setDone] = useState<Record<number,boolean>>({});
  const items = [
    { i:"⚡", t:"O que é carga elétrica?" },
    { i:"🔬", t:"Prótons, elétrons e nêutrons" },
    { i:"👋", t:"3 formas de eletrizar um corpo" },
    { i:"🧲", t:"Atração e repulsão entre cargas" },
    { i:"🌩️", t:"Como o para-raios funciona?" },
    { i:"📱", t:"Touchscreen e impressora a laser" },
    { i:"🧩", t:"Exercícios práticos + quizzes" },
    { i:"📋", t:"Resumo visual para estudar" },
  ];
  return (
    <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-4xl font-black text-slate-100 mb-2">📋 O que vamos aprender hoje</h2>
      <p className="text-slate-500 mb-6">Clique nos tópicos conforme você for absorvendo cada um:</p>
      <div className="space-y-3">
        {items.map((it, idx) => (
          <button key={idx} onClick={() => setDone(p => ({...p,[idx]:!p[idx]}))} className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${done[idx] ? "border-amber-500/60 bg-amber-950/20" : "border-slate-700 bg-slate-900/60 hover:border-slate-500"}`}>
            <span className="text-2xl">{it.i}</span>
            <span className={`font-semibold flex-1 ${done[idx] ? "text-amber-200 line-through opacity-70" : "text-slate-200"}`}>{it.t}</span>
            {done[idx] ? <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" /> : <Circle className="w-5 h-5 text-slate-600 shrink-0" />}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── SLIDE 3: GANCHO ───────────────────────────────────────────────────────────
function S03() {
  const [rev, setRev] = useState(false);
  return (
    <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
      <span className="text-xs font-black tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">PROVOCAÇÃO</span>
      <h2 className="text-3xl md:text-4xl font-black text-slate-100 mt-5 mb-6">Já sentiu isso? 🤔</h2>
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {["Tomou um choque ao tocar na maçaneta depois de caminhar no tapete 🚪","Tirou o agasalho e o cabelo ficou arrepiado ✨","Aproximou um balão do cabelo e ele foi para o balão 🎈","Viu um raio e ouviu o trovão segundos depois ⚡"].map((s,i) => (
          <div key={i} className="bg-slate-900 border border-slate-700 rounded-2xl p-4 text-slate-300 text-sm">{s}</div>
        ))}
      </div>
      <button onClick={() => setRev(true)} className={`w-full py-4 rounded-2xl font-bold text-lg border-2 transition-all ${rev ? "border-amber-500 bg-amber-950/20 text-amber-200" : "border-slate-600 text-slate-400 hover:border-amber-500 hover:text-amber-300"}`}>
        {rev ? "✅ Tudo isso é Eletrostática!" : "👆 Clique para descobrir o que é"}
      </button>
      {rev && <div className="mt-4 bg-amber-950/20 border border-amber-500/30 rounded-2xl p-5 animate-in fade-in">
        <p className="text-amber-200 text-lg font-semibold">Todos esses fenômenos têm a mesma origem: <strong>o movimento ou acúmulo de cargas elétricas</strong>. A eletrostática estuda as cargas <em>em repouso</em> — antes de virarem corrente elétrica.</p>
      </div>}
    </div>
  );
}

// ── SLIDE 4: O QUE É CARGA ELÉTRICA ──────────────────────────────────────────
function S04() {
  const [tab, setTab] = useState<"proton"|"neutron"|"eletron">("proton");
  const data = {
    proton:  { emoji:"🔴", name:"Próton",   charge:"+1", mass:"1,67×10⁻²⁷ kg", loc:"Núcleo", color:"text-red-300",   bg:"bg-red-950/30",   border:"border-red-500/40" },
    neutron: { emoji:"⚪", name:"Nêutron",  charge:"0",  mass:"1,67×10⁻²⁷ kg", loc:"Núcleo", color:"text-slate-300", bg:"bg-slate-900",     border:"border-slate-600" },
    eletron: { emoji:"🔵", name:"Elétron",  charge:"−1", mass:"9,11×10⁻³¹ kg", loc:"Eletrosfera", color:"text-blue-300", bg:"bg-blue-950/30", border:"border-blue-500/40" },
  };
  const d = data[tab];
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-4xl font-black text-slate-100 mb-2">⚛️ Carga Elétrica</h2>
      <p className="text-slate-400 mb-5 text-lg">A carga elétrica é uma propriedade fundamental da matéria, assim como massa. Ela define como partículas interagem entre si.</p>
      <div className="flex gap-3 mb-5">
        {(["proton","neutron","eletron"] as const).map(k => (
          <button key={k} onClick={() => setTab(k)} className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all ${tab===k ? data[k].border + " " + data[k].bg + " " + data[k].color : "border-slate-700 text-slate-400"}`}>{data[k].emoji} {data[k].name}</button>
        ))}
      </div>
      <div className={`rounded-3xl border-2 p-8 animate-in fade-in ${d.bg} ${d.border}`}>
        <div className="text-6xl mb-4">{d.emoji}</div>
        <h3 className={`text-3xl font-black mb-4 ${d.color}`}>{d.name}</h3>
        <div className="grid grid-cols-3 gap-4">
          {[{l:"Carga",v:d.charge},{l:"Massa",v:d.mass},{l:"Localização",v:d.loc}].map(x => (
            <div key={x.l} className="bg-slate-900/50 rounded-xl p-3 text-center">
              <div className="text-slate-500 text-xs font-bold mb-1">{x.l}</div>
              <div className={`font-black text-lg ${d.color}`}>{x.v}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 bg-slate-900 border border-slate-700 rounded-xl p-4 text-slate-400 text-sm">
        💡 <strong className="text-slate-200">Unidade:</strong> Coulomb (C). A carga do elétron vale −1,6×10⁻¹⁹ C. Um Coulomb equivale a ~6,24×10¹⁸ elétrons.
      </div>
    </div>
  );
}

// ── SLIDE 5: ANALOGIA DE CARGA ────────────────────────────────────────────────
function S05() {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <span className="text-xs font-black tracking-widest text-violet-400 bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20">ANALOGIA</span>
      <h2 className="text-4xl font-black text-slate-100 mt-4 mb-5">🎯 Pense como uma gangorra</h2>
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-red-950/20 border border-red-500/30 rounded-2xl p-5 text-center">
          <div className="text-4xl mb-2">🔴</div>
          <div className="font-black text-red-300 text-xl mb-1">Positivo (+)</div>
          <p className="text-slate-400 text-sm">Faltam elétrons. "Ladinho esquerdo da gangorra levantado." Quer puxar elétrons de volta.</p>
        </div>
        <div className="bg-slate-900 border border-slate-600 rounded-2xl p-5 text-center">
          <div className="text-4xl mb-2">⚖️</div>
          <div className="font-black text-slate-300 text-xl mb-1">Neutro (0)</div>
          <p className="text-slate-400 text-sm">Mesma quantidade de + e −. "Gangorra equilibrada." Não atrai nem repele.</p>
        </div>
        <div className="bg-blue-950/20 border border-blue-500/30 rounded-2xl p-5 text-center">
          <div className="text-4xl mb-2">🔵</div>
          <div className="font-black text-blue-300 text-xl mb-1">Negativo (−)</div>
          <p className="text-slate-400 text-sm">Sobram elétrons. "Ladinho direito da gangorra abaixado." Quer empurrar o excesso.</p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-4 flex gap-3 items-start">
          <span className="text-2xl">🧲</span>
          <div><strong className="text-amber-200">Cargas opostas se atraem</strong><p className="text-slate-400 text-sm mt-1">+ atrai −. Como lados opostos de um imã. A força elétrica é sempre ao longo da linha que une as cargas.</p></div>
        </div>
        <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-4 flex gap-3 items-start">
          <span className="text-2xl">💨</span>
          <div><strong className="text-rose-200">Cargas iguais se repelem</strong><p className="text-slate-400 text-sm mt-1">+ repele +, − repele −. Como tentar juntar dois imãs pelo mesmo pólo.</p></div>
        </div>
      </div>
    </div>
  );
}

// ── SLIDE 6: ELETRIZAÇÃO POR ATRITO ──────────────────────────────────────────
function S06() {
  const [step, setStep] = useState(0);
  const steps = [
    { title:"Estado Inicial", desc:"Balão e lã são neutros — têm o mesmo número de prótons e elétrons.", img:"⚪🟡⚪" },
    { title:"Atrito!", desc:"Ao friccionar, o balão (mais eletronegativo) arranca elétrons da lã.", img:"👋⚡" },
    { title:"Resultado", desc:"Balão fica negativo (ganhou elétrons). Lã fica positiva (perdeu elétrons).", img:"🔵🔴" },
    { title:"Efeito", desc:"O balão negativo induz carga positiva nos papéis e os atrai.", img:"🔵→📄" },
  ];
  const s = steps[step];
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-4xl font-black text-slate-100 mb-2">👋 Eletrização por Atrito</h2>
      <p className="text-slate-400 mb-5">O tipo mais simples e que você certamente já experimentou. Acontece pela transferência de elétrons entre materiais diferentes.</p>
      <div className="bg-amber-950/20 border border-amber-500/30 rounded-3xl p-6 mb-5 min-h-[160px] flex flex-col justify-center animate-in fade-in">
        <div className="text-5xl text-center mb-3">{s.img}</div>
        <h3 className="text-2xl font-black text-amber-200 text-center mb-2">{s.title}</h3>
        <p className="text-slate-300 text-center text-lg">{s.desc}</p>
      </div>
      <div className="flex gap-2 justify-center mb-4">
        {steps.map((_,i) => (
          <button key={i} onClick={() => setStep(i)} className={`w-10 h-10 rounded-xl font-bold text-sm border-2 transition-all ${step===i ? "border-amber-500 bg-amber-950/40 text-amber-300" : "border-slate-700 text-slate-500 hover:border-slate-500"}`}>{i+1}</button>
        ))}
      </div>
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-sm text-slate-400">
        🔑 <strong className="text-slate-200">Regra geral:</strong> quem "ganha" elétrons fica negativo. Quem "perde" fica positivo. A carga total do sistema é sempre conservada.
      </div>
    </div>
  );
}

// ── SLIDE 7: ELETRIZAÇÃO POR CONTATO ─────────────────────────────────────────
function S07() {
  const [step, setStep] = useState(0);
  const steps = [
    { e:"⚡🔵", t:"Corpo A Carregado", d:"O corpo A tem excesso de elétrons (carga −). O corpo B é neutro." },
    { e:"🤝⚡", t:"Contato!", d:"Ao toque, elétrons fluem do corpo com excesso para o neutro até equilibrar." },
    { e:"🔵🔵", t:"Equilíbrio", d:"Ambos ficam com o mesmo sinal (−). A carga total se dividiu entre eles." },
  ];
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-4xl font-black text-slate-100 mb-2">🤝 Eletrização por Contato</h2>
      <p className="text-slate-400 mb-5">Um corpo carregado transfere parte de sua carga ao tocar um corpo neutro. <strong className="text-slate-200">Ambos ficam com o mesmo sinal</strong> após o contato.</p>
      <div className="grid gap-4">
        {steps.map((s,i) => (
          <button key={i} onClick={() => setStep(i)} className={`flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all ${step===i ? "border-sky-500 bg-sky-950/20" : "border-slate-700 bg-slate-900/60 hover:border-slate-500"}`}>
            <span className="text-3xl w-16 text-center shrink-0">{s.e}</span>
            <div><p className="font-black text-lg text-slate-100">{s.t}</p><p className="text-slate-400 text-sm">{s.d}</p></div>
            <span className={`ml-auto font-black text-2xl ${step===i ? "text-sky-400":"text-slate-700"}`}>{i+1}</span>
          </button>
        ))}
      </div>
      <div className="mt-4 bg-slate-900 border border-slate-700 rounded-xl p-4 text-sm">
        💡 <strong className="text-slate-200">Aplicação:</strong> ao tocar em metais sem descarga eletrostática prévia, você pode danificar componentes eletrônicos (chips). Por isso técnicos usam pulseira antiestática!
      </div>
    </div>
  );
}

// ── SLIDE 8: ELETRIZAÇÃO POR INDUÇÃO ─────────────────────────────────────────
function S08() {
  const [dist, setDist] = useState(4);
  const hasEffect = dist <= 3;
  const groundedEffect = dist <= 2;
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-4xl font-black text-slate-100 mb-2">✨ Eletrização por Indução</h2>
      <p className="text-slate-400 mb-5">Sem contato! Uma carga externa <em>redistribui</em> as cargas num condutor neutro próximo. Se aterrarmos e retirarmos o fio, o corpo fica carregado.</p>
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 mb-5">
        <label className="text-xs font-bold text-slate-400 block mb-2">Distância do corpo carregado: <span className={hasEffect ? "text-amber-300" : "text-slate-500"}>{dist} cm</span></label>
        <input type="range" min={1} max={5} value={dist} onChange={e=>setDist(+e.target.value)} className="w-full accent-amber-400 mb-4" />
        <div className="relative h-24 flex items-center justify-around">
          <div className="w-12 h-16 bg-amber-500/20 border-2 border-amber-500/50 rounded-xl flex flex-col items-center justify-center">
            <span className="text-amber-400 font-black text-lg">−</span>
            <span className="text-slate-500 text-xs">Carga</span>
          </div>
          <div className={`flex-1 h-0.5 mx-2 transition-all ${hasEffect ? "bg-amber-400/60" : "bg-slate-700"}`} style={{background: hasEffect ? `linear-gradient(to right, #f59e0b, transparent ${dist*20}%, transparent)` : undefined }} />
          <div className={`w-28 h-16 rounded-xl border-2 flex items-center justify-around transition-all ${hasEffect ? "border-indigo-400/50 bg-indigo-950/20" : "border-slate-600 bg-slate-900"}`}>
            <span className={`font-black text-lg transition-all ${hasEffect ? "text-red-400" : "text-slate-600"}`}>{hasEffect ? "+" : "·"}</span>
            <span className="text-slate-500 text-xs">Neutro</span>
            <span className={`font-black text-lg transition-all ${hasEffect ? "text-blue-400" : "text-slate-600"}`}>{hasEffect ? "−" : "·"}</span>
          </div>
        </div>
        {hasEffect && <p className="text-center text-amber-300 text-sm mt-2 animate-in fade-in">⚡ O campo da carga reorganiza os elétrons do condutor neutro!</p>}
        {groundedEffect && <p className="text-center text-indigo-300 text-sm animate-in fade-in">🌍 Se aterrarmos agora → os elétrons do lado − escapam para a terra → ficará + permanente!</p>}
      </div>
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-sm text-slate-400">🌩️ <strong className="text-slate-200">Para-raios usa indução:</strong> a nuvem carregada induz carga oposta na ponta metálica, criando um caminho preferencial para a descarga — protegendo o edifício.</div>
    </div>
  );
}

// ── SLIDE 9: COMPARAÇÃO DOS 3 TIPOS ──────────────────────────────────────────
function S09() {
  const [hover, setHover] = useState<number|null>(null);
  const rows = [
    { t:"Atrito",  s:"Corpo A",  r:"Diferentes sinais",  ex:"Balão + lã",       need:"Contato + movimento" },
    { t:"Contato", s:"Corpo A",  r:"Mesmo sinal",        ex:"Esfera + esfera",  need:"Contato direto" },
    { t:"Indução", s:"Externo",  r:"Sinal oposto",       ex:"Para-raios",       need:"Apenas proximidade" },
  ];
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-4xl font-black text-slate-100 mb-5">📊 Comparando os 3 Tipos</h2>
      <div className="space-y-3 mb-5">
        {rows.map((r,i) => (
          <div key={i} onMouseEnter={()=>setHover(i)} onMouseLeave={()=>setHover(null)} className={`border-2 rounded-2xl p-4 transition-all cursor-default ${hover===i ? "border-amber-500/60 bg-amber-950/10" : "border-slate-700 bg-slate-900/60"}`}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 items-center">
              <div><div className="text-xs text-slate-500 font-bold mb-1">TIPO</div><div className="font-black text-amber-300 text-lg">{r.t}</div></div>
              <div><div className="text-xs text-slate-500 font-bold mb-1">QUEM FICA CARREGADO</div><div className="text-slate-200 text-sm">{r.s}</div></div>
              <div><div className="text-xs text-slate-500 font-bold mb-1">RESULTADO</div><div className="text-slate-200 text-sm">{r.r}</div></div>
              <div><div className="text-xs text-slate-500 font-bold mb-1">EXEMPLO</div><div className="text-slate-300 text-sm">{r.ex}</div></div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-4 text-sm">
        🔒 <strong className="text-emerald-200">Lei de Conservação da Carga:</strong> em um sistema isolado, a carga total nunca muda. Só se redistribui. É uma das leis fundamentais da física.
      </div>
    </div>
  );
}

// ── SLIDE 10: CASO DE USO — PARA-RAIOS ────────────────────────────────────────
function S10() {
  const [show, setShow] = useState(false);
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <span className="text-xs font-black tracking-widest text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">CASO DE USO REAL</span>
      <h2 className="text-4xl font-black text-slate-100 mt-4 mb-5">🌩️ Para-raios: Física na Prática</h2>
      <div className="grid md:grid-cols-2 gap-4 mb-5">
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 space-y-3">
          {["1️⃣ Nuvem tempestuosa acumula carga negativa na base.","2️⃣ Por indução, o solo fica carregado positivamente.","3️⃣ A ponta metálica do para-raios concentra o campo elétrico (E = k·Q/r² → maior em pontas).","4️⃣ A diferença de potencial cresce até ionizar o ar.","5️⃣ O raio percorre o caminho do condutor: para-raios → fio de cobre → terra."].map((s,i)=>(
            <p key={i} className="text-slate-300 text-sm leading-relaxed">{s}</p>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <div className="bg-sky-950/20 border border-sky-500/30 rounded-2xl p-4 flex-1">
            <div className="text-4xl mb-2">📟</div>
            <p className="font-bold text-sky-200 mb-1">Benjamin Franklin (1752)</p>
            <p className="text-slate-400 text-sm">Inventor do para-raios. Demonstrou com uma pipa + fio condutor que raios são descargas elétricas. (Não tente isso em casa! ⚠️)</p>
          </div>
          <button onClick={()=>setShow(!show)} className={`p-4 rounded-2xl border-2 font-bold transition-all ${show ? "border-amber-500 bg-amber-950/20 text-amber-200" : "border-slate-700 text-slate-400 hover:border-amber-500"}`}>
            {show ? "💡 Edifícios altos são mais vulneráveis porque concentram o campo elétrico na ponta — e o para-raios os protege precisamente por isso!" : "👆 Por que edifícios altos precisam mais de para-raios?"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── SLIDE 11: CASO DE USO — TECH ──────────────────────────────────────────────
function S11() {
  const [active, setActive] = useState<number|null>(null);
  const cases = [
    { i:"📱", t:"Touchscreen", d:"A tela tem uma grade de eletrodos. Seu dedo (condutor) altera a capacitância local por indução → o chip detecta o ponto tocado." },
    { i:"🖨️", t:"Impressora a Laser", d:"Um tambor fotossensível é carregado uniformemente. O laser descarrega pontos seletivos. O toner (pó tinteiro) adere às regiões carregadas — formando a imagem." },
    { i:"🏭", t:"Precipitador Eletrostático", d:"Chaminés industriais usam eletrodos de alta tensão: partículas de fumaça se carregam e são atraídas para placas coletoras — reduzindo poluição." },
    { i:"🚗", t:"Pintura Eletrostática", d:"A tinta é pulverizada com carga oposta à da peça metálica. A atração eletrostática garante cobertura uniforme e sem desperdício." },
  ];
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <span className="text-xs font-black tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">TECNOLOGIAS REAIS</span>
      <h2 className="text-4xl font-black text-slate-100 mt-4 mb-5">💻 Eletrostática nas Suas Mãos</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {cases.map((c,i) => (
          <button key={i} onClick={()=>setActive(active===i?null:i)} className={`text-left p-5 rounded-2xl border-2 transition-all ${active===i ? "border-emerald-500 bg-emerald-950/20" : "border-slate-700 bg-slate-900/60 hover:border-slate-500"}`}>
            <div className="flex items-center gap-3 mb-2"><span className="text-3xl">{c.i}</span><h3 className="font-black text-slate-100 text-lg">{c.t}</h3></div>
            {active===i && <p className="text-slate-300 text-sm leading-relaxed animate-in fade-in">{c.d}</p>}
            {active!==i && <p className="text-slate-500 text-sm">Clique para ver como funciona →</p>}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── SLIDE 12: EXERCÍCIO GUIADO ────────────────────────────────────────────────
function S12() {
  const [step, setStep] = useState(-1);
  const steps = [
    { q:"Qual o tipo de eletrização?", a:"Atrito! Há movimento e contato entre dois materiais diferentes." },
    { q:"Qual material fica negativo?", a:"A régua plástica — plástico tem maior afinidade eletrônica que o cabelo." },
    { q:"Como ela atrai papel?", a:"A régua negativa induz carga + nos pedaços de papel → força atrativa." },
    { q:"Isso viola a conservação de carga?", a:"Não! A carga do cabelo + a da régua = 0 (soma zero, sistema isolado)." },
  ];
  return (
    <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
      <span className="text-xs font-black tracking-widest text-violet-400 bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20">EXERCÍCIO GUIADO</span>
      <h2 className="text-2xl font-black text-slate-100 mt-4 mb-2">Uma régua plástica é esfregada no cabelo e depois aproximada de pedaços de papel picado. Eles se movem em direção à régua.</h2>
      <p className="text-slate-500 mb-5 text-sm">Responda cada pergunta antes de revelar a resposta:</p>
      <div className="space-y-3">
        {steps.map((s,i) => (
          <div key={i} className="rounded-2xl border-2 border-slate-700 bg-slate-900/60 overflow-hidden">
            <div className="p-4 flex justify-between items-center cursor-pointer hover:bg-slate-800/40 transition-all" onClick={()=>setStep(step===i?-1:i)}>
              <p className="font-bold text-slate-200">{i+1}. {s.q}</p>
              <span className={`text-amber-400 font-black transition-all ${step===i ? "rotate-180":""}`}>▼</span>
            </div>
            {step===i && <div className="px-4 pb-4 animate-in fade-in"><div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-3 text-emerald-200 text-sm">✅ {s.a}</div></div>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── SLIDE 13: QUIZ 1 ──────────────────────────────────────────────────────────
function S13() {
  const [ans, setAns] = useState<number|null>(null);
  const correct = 2;
  const opts = ["Eletrização por contato — houve toque entre balão e lã.","Eletrização por indução — a lã induziu carga sem transferência.","Eletrização por atrito — o movimento causa transferência de elétrons.","Não é possível eletrizar balões."];
  return (
    <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
      <span className="text-xs font-black tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">QUIZ 1 / 3</span>
      <h2 className="text-2xl font-black text-slate-100 mt-4 mb-4">Ao esfregar um balão de látex em um suéter de lã e depois aproximá-lo de pequenos pedaços de papel, o tipo de eletrização do balão foi:</h2>
      <div className="space-y-3 mb-4">
        {opts.map((o,i) => {
          const cls = ans===null ? "border-slate-700 hover:border-amber-500/50 bg-slate-900" : i===correct ? "border-emerald-500 bg-emerald-950/30 text-emerald-100 scale-[1.01]" : ans===i ? "border-rose-500 bg-rose-950/30 opacity-60" : "border-slate-800 opacity-25";
          return <button key={i} disabled={ans!==null} onClick={()=>setAns(i)} className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex gap-3 ${cls}`}><span className="font-black text-slate-500">{["A","B","C","D"][i]})</span><span>{o}</span></button>;
        })}
      </div>
      {ans!==null && <div className={`p-4 rounded-2xl animate-in slide-in-from-bottom-4 text-sm ${ans===correct ? "bg-emerald-900/30 border border-emerald-500/40 text-emerald-200" : "bg-rose-900/30 border border-rose-500/40 text-rose-200"}`}><strong>C ✅</strong> — Esfregando há <em>atrito</em> → transferência de elétrons da lã para o balão. O balão fica negativo e depois atrai os papéis por indução secundária.</div>}
    </div>
  );
}

// ── SLIDE 14: QUIZ 2 ──────────────────────────────────────────────────────────
function S14() {
  const [ans, setAns] = useState<number|null>(null);
  const correct = 1;
  const opts = ["Eles ficam com sinais opostos.","Eles ficam com o mesmo sinal (ambos −).","A esfera B fica neutra.","A carga some."];
  return (
    <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
      <span className="text-xs font-black tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">QUIZ 2 / 3</span>
      <h2 className="text-2xl font-black text-slate-100 mt-4 mb-4">Uma esfera metálica A com carga −4 μC toca uma esfera B idêntica e neutra. Após o contato e separação, o que acontece?</h2>
      <p className="text-slate-500 text-sm mb-4 font-mono">Q_total = −4 μC. Como as esferas são idênticas, cada uma fica com metade.</p>
      <div className="space-y-3 mb-4">
        {opts.map((o,i) => {
          const cls = ans===null ? "border-slate-700 hover:border-amber-500/50 bg-slate-900" : i===correct ? "border-emerald-500 bg-emerald-950/30 text-emerald-100 scale-[1.01]" : ans===i ? "border-rose-500 bg-rose-950/30 opacity-60" : "border-slate-800 opacity-25";
          return <button key={i} disabled={ans!==null} onClick={()=>setAns(i)} className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex gap-3 ${cls}`}><span className="font-black text-slate-500">{["A","B","C","D"][i]})</span><span>{o}</span></button>;
        })}
      </div>
      {ans!==null && <div className={`p-4 rounded-2xl animate-in slide-in-from-bottom-4 text-sm ${ans===correct ? "bg-emerald-900/30 border border-emerald-500/40 text-emerald-200" : "bg-rose-900/30 border border-rose-500/40 text-rose-200"}`}><strong>B ✅</strong> — Qᴬ = Qᴮ = −4/2 = <strong>−2 μC cada</strong>. Eletrização por contato → mesmo sinal, carga conservada.</div>}
    </div>
  );
}

// ── SLIDE 15: QUIZ 3 ──────────────────────────────────────────────────────────
function S15() {
  const [ans, setAns] = useState<number|null>(null);
  const correct = 3;
  const opts = ["Eletrização por atrito — há movimento de cargas.","O campo é zero, logo não há efeito.","Eletrização por contato — as nuvens tocam o solo.","Eletrização por indução — nuvem carregada reorganiza cargas no solo."];
  return (
    <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
      <span className="text-xs font-black tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">QUIZ 3 / 3</span>
      <h2 className="text-2xl font-black text-slate-100 mt-4 mb-4">Uma nuvem de tempestade com carga negativa na base causa acúmulo de carga positiva no solo abaixo dela. Qual processo explica o acúmulo no solo?</h2>
      <div className="space-y-3 mb-4">
        {opts.map((o,i) => {
          const cls = ans===null ? "border-slate-700 hover:border-amber-500/50 bg-slate-900" : i===correct ? "border-emerald-500 bg-emerald-950/30 text-emerald-100 scale-[1.01]" : ans===i ? "border-rose-500 bg-rose-950/30 opacity-60" : "border-slate-800 opacity-25";
          return <button key={i} disabled={ans!==null} onClick={()=>setAns(i)} className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex gap-3 ${cls}`}><span className="font-black text-slate-500">{["A","B","C","D"][i]})</span><span>{o}</span></button>;
        })}
      </div>
      {ans!==null && <div className={`p-4 rounded-2xl animate-in slide-in-from-bottom-4 text-sm ${ans===correct ? "bg-emerald-900/30 border border-emerald-500/40 text-emerald-200" : "bg-rose-900/30 border border-rose-500/40 text-rose-200"}`}><strong>D ✅</strong> — Indução! A nuvem (−) repele elétrons do solo para longe → solo próximo fica +. Sem contato. É exatamente o que possibilita o raio.</div>}
    </div>
  );
}

// ── SLIDE 16: MAPA MENTAL ─────────────────────────────────────────────────────
function S16() {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-4xl font-black text-slate-100 mb-5">🗺️ Mapa Mental da Semana 1</h2>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-3 bg-amber-950/20 border border-amber-500/30 rounded-2xl p-4 text-center">
          <span className="text-3xl">⚡</span>
          <h3 className="text-xl font-black text-amber-300 mt-1">CARGA ELÉTRICA</h3>
          <p className="text-slate-400 text-sm">Propriedade fundamental • Unidade: Coulomb (C)</p>
        </div>
        {[
          { bg:"bg-red-950/20 border-red-500/30", t:"Positiva (+)", d:"Faltam elétrons", sub:["Prótons no núcleo","Não se move","Corpo eletrizado (+)"] },
          { bg:"bg-slate-900 border-slate-600", t:"Neutra (0)", d:"Cargas iguais", sub:["Átomos normais","Não atrai/repele","Pode ser induzida"] },
          { bg:"bg-blue-950/20 border-blue-500/30", t:"Negativa (−)", d:"Sobram elétrons", sub:["Elétrons livres","Se move em condutores","Corpo eletrizado (−)"] },
        ].map((b,i) => (
          <div key={i} className={`rounded-2xl border p-4 ${b.bg}`}>
            <h4 className="font-black text-slate-100 mb-1">{b.t}</h4>
            <p className="text-slate-500 text-xs mb-2">{b.d}</p>
            <ul className="space-y-1">{b.sub.map(s => <li key={s} className="text-slate-400 text-xs flex gap-1"><span>•</span>{s}</li>)}</ul>
          </div>
        ))}
        {[
          { bg:"bg-violet-950/20 border-violet-500/30", t:"⚡ Próximos Passos", sub:["Lei de Coulomb (F = k·q₁q₂/r²)","Campo Elétrico (E = k·Q/r²)","Potencial Elétrico (V = k·Q/r)"] },
          { bg:"bg-emerald-950/20 border-emerald-500/30", t:"🔋 Ligação com Futuro", sub:["Corrente: elétrons em movimento","Tensão: diferença de potencial","Resistência e Lei de Ohm"] },
          { bg:"bg-amber-950/20 border-amber-500/30", t:"🔬 3 Tipos de Eletrização", sub:["Atrito → sinais opostos","Contato → mesmo sinal","Indução → sem toque"] },
        ].map((b,i) => (
          <div key={i} className={`rounded-2xl border p-4 ${b.bg}`}>
            <h4 className="font-black text-slate-100 mb-2">{b.t}</h4>
            <ul className="space-y-1">{b.sub.map(s => <li key={s} className="text-slate-400 text-xs flex gap-1"><span>→</span>{s}</li>)}</ul>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── SLIDE 17: RESUMO VISUAL ───────────────────────────────────────────────────
function S17() {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-4xl font-black text-slate-100 mb-5">📋 Resumo para Estudar</h2>
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-sm border border-slate-700 rounded-2xl overflow-hidden">
          <thead><tr className="bg-slate-800"><th className="p-3 text-left text-slate-300">Conceito</th><th className="p-3 text-left text-slate-300">Definição</th><th className="p-3 text-left text-slate-300">Exemplo / Obs.</th></tr></thead>
          <tbody>
            {[
              ["Carga Elétrica","Propriedade que gera/sente força eletromagnética","Unidade: Coulomb (C). e = 1,6×10⁻¹⁹ C"],
              ["Corpo Carregado +","Perdeu elétrons (menos −)","Esfregou lã no plástico → lã fica +"],
              ["Corpo Carregado −","Ganhou elétrons (mais −)","Balão esfregado fica −"],
              ["Atrito","Transferência por movimento entre materiais","Balão + lã, sapato + tapete"],
              ["Contato","Transferência direta por toque","Esferas metálicas → mesmo sinal"],
              ["Indução","Redistribuição sem toque","Para-raios, touchscreen"],
              ["Conservação","Carga total do sistema isolado = constante","Q_antes = Q_depois sempre"],
            ].map((r,i) => (
              <tr key={i} className={i%2===0 ? "bg-slate-900/60" : "bg-slate-900/30"}>
                <td className="p-3 border-t border-slate-800 font-bold text-amber-300 text-xs">{r[0]}</td>
                <td className="p-3 border-t border-slate-800 text-slate-300 text-xs">{r[1]}</td>
                <td className="p-3 border-t border-slate-800 text-slate-500 text-xs">{r[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-sm"><strong className="text-amber-300">⚠️ Cuidados:</strong><ul className="mt-2 space-y-1 text-slate-400"><li>• Prótons não se movem (ficam no núcleo)</li><li>• Isolantes não conduzem carga entre si</li><li>• Indução não transfere carga — só redistribui</li></ul></div>
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-sm"><strong className="text-emerald-300">✅ Lembre-se:</strong><ul className="mt-2 space-y-1 text-slate-400"><li>• Cargas iguais REPELEM</li><li>• Cargas opostas ATRAEM</li><li>• Carga SEMPRE se conserva</li></ul></div>
      </div>
    </div>
  );
}

// ── SLIDE 18: ENCERRAMENTO ────────────────────────────────────────────────────
function S18() {
  const [stars, setStars] = useState(0);
  return (
    <div className="flex flex-col items-center justify-center min-h-[72vh] text-center animate-in fade-in zoom-in duration-700">
      <div className="text-7xl mb-4">🏆</div>
      <h1 className="text-4xl md:text-5xl font-black text-white mb-3">Semana 1 Concluída!</h1>
      <p className="text-xl text-slate-400 max-w-lg mx-auto mb-6">Você cobriu os fundamentos da Eletrostática. Na próxima aula — Lei de Coulomb e Campo Elétrico!</p>
      <div className="mb-6">
        <p className="text-slate-500 text-sm mb-2">Como foi a aula para você?</p>
        <div className="flex gap-2 justify-center">
          {[1,2,3,4,5].map(n => (
            <button key={n} onClick={()=>setStars(n)} className={`text-3xl transition-all hover:scale-125 ${n<=stars ? "text-amber-400":"text-slate-700"}`}>★</button>
          ))}
        </div>
        {stars>0 && <p className="text-amber-300 text-sm mt-2 animate-in fade-in">{["😐 Pode melhorar!","🙂 Razoável!","😊 Bom!","😄 Muito bom!","🤩 Excelente!"][stars-1]}</p>}
      </div>
      <div className="flex flex-wrap gap-3 justify-center">
        {["⚡ Carga","👋 Atrito","🤝 Contato","✨ Indução","🌩️ Para-raios","🔒 Conservação"].map(t => (
          <span key={t} className="bg-amber-900/30 text-amber-300 text-sm font-bold px-4 py-2 rounded-full border border-amber-500/20">{t}</span>
        ))}
      </div>
      <Link to="/fisica3/sem2" className="mt-8 px-8 py-3 bg-amber-600 hover:bg-amber-500 text-white font-black rounded-2xl transition-all text-lg">Próxima Semana →</Link>
    </div>
  );
}

// ── MONTAGEM ──────────────────────────────────────────────────────────────────
const SLIDES = [S01,S02,S03,S04,S05,S06,S07,S08,S09,S10,S11,S12,S13,S14,S15,S16,S17,S18];

export function Fisica3Lesson1() {
  const [cur, setCur] = useState(0);
  const next = useCallback(() => setCur(p => Math.min(p+1, SLIDES.length-1)), []);
  const prev = useCallback(() => setCur(p => Math.max(p-1, 0)), []);
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key==="ArrowRight") next(); if (e.key==="ArrowLeft") prev(); };
    window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
  }, [next, prev]);
  const C = SLIDES[cur];
  return <Shell title="Sem. 1 — Eletrostática & Eletrização" aula="Sem. 1" total={SLIDES.length} current={cur} onPrev={prev} onNext={next}><C /></Shell>;
}
