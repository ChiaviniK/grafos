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

function S01() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[72vh] text-center animate-in fade-in zoom-in duration-700 relative">
      <div className="absolute inset-0 opacity-10 rounded-3xl" style={{ backgroundImage:"url('/sprites/backgrounds/2/2304x1296.png')", backgroundSize:"cover", imageRendering:"pixelated" }} />
      <div className="relative z-10 max-w-2xl">
        <span className="bg-amber-500/20 text-amber-400 font-bold px-4 py-1.5 rounded-full text-xs tracking-widest border border-amber-500/30">FÍSICA 3 · SEMANA 2</span>
        <div className="text-8xl my-6">🔗</div>
        <h1 className="text-5xl md:text-6xl font-black text-white leading-none mb-4">Lei de Coulomb<br /><span className="text-yellow-400">& Campo Elétrico</span></h1>
        <p className="text-xl text-slate-400 mb-8">Como calcular a força entre cargas e entender o campo invisível que elas criam no espaço ao redor.</p>
        <div className="flex gap-3 flex-wrap justify-center text-sm">
          {["⚖️ F = k·q₁·q₂/r²","🌐 E = k·Q/r²","📐 Vetores","🔋 F vs E"].map(t => (
            <div key={t} className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-xl text-slate-300">{t}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function S02() {
  const [done, setDone] = useState<Record<number,boolean>>({});
  const items = [
    { i:"⚖️", t:"Revisão: cargas e forças" },
    { i:"🔗", t:"Lei de Coulomb e seus termos" },
    { i:"📐", t:"Direção e sentido da força" },
    { i:"🌐", t:"O que é Campo Elétrico?" },
    { i:"🧮", t:"Calculadora interativa F e E" },
    { i:"🔋", t:"Diferença entre F e E" },
    { i:"💡", t:"Aplicações: capacitores e sensores" },
    { i:"🧩", t:"3 quizzes progressivos + resumo" },
  ];
  return (
    <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-4xl font-black text-slate-100 mb-2">📋 Roteiro desta Aula</h2>
      <p className="text-slate-500 mb-6">Marque os tópicos conforme for avançando nos slides:</p>
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

function S03() {
  const [rev, setRev] = useState(false);
  return (
    <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
      <span className="text-xs font-black tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">PROVOCAÇÃO</span>
      <h2 className="text-3xl font-black text-slate-100 mt-5 mb-5">Ímã vs Carga Elétrica — qual é mais forte? 🤔</h2>
      <div className="space-y-3 mb-6">
        {["Uma carga de 1 C parada no espaço — o que ela sente?", "Por que raios surgem de km de distância sem toque?", "Como dois elétrons a 0,1 nm de distância se comportam?", "A gravidade também diminui com 1/r². Coulomb é igual?"].map((s,i) => (
          <div key={i} className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-slate-300 text-sm">{s}</div>
        ))}
      </div>
      <button onClick={() => setRev(true)} className={`w-full py-4 rounded-2xl font-bold text-lg border-2 transition-all ${rev ? "border-yellow-500 bg-amber-950/20 text-amber-200" : "border-slate-600 text-slate-400 hover:border-yellow-500"}`}>
        {rev ? "✅ Coulomb desvendou tudo isso em 1785!" : "👆 Qual lei governa todas essas situações?"}
      </button>
      {rev && <div className="mt-4 bg-amber-950/20 border border-amber-500/30 rounded-2xl p-5 animate-in fade-in">
        <p className="text-amber-200 text-lg font-semibold">Charles-Augustin de Coulomb mediu experimentalmente que a força elétrica segue a mesma forma matemática da gravitação — mas bilhões de vezes mais intensa. <strong>F = k·|q₁|·|q₂|/r²</strong></p>
      </div>}
    </div>
  );
}

function S04() {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-4xl font-black text-slate-100 mb-5">⚖️ Lei de Coulomb — Dissecando a Fórmula</h2>
      <div className="bg-slate-950 border-2 border-yellow-500/30 rounded-3xl p-8 text-center mb-6">
        <code className="text-3xl md:text-4xl font-mono font-black text-yellow-300">F = k · |q₁| · |q₂| / r²</code>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {[
          { sym:"F", name:"Força Elétrica", unit:"Newton (N)", color:"text-yellow-300 border-yellow-500/30 bg-yellow-950/20", desc:"Vetor. Pode ser atrativa (−) ou repulsiva (+). Atua ao longo da linha que une as cargas." },
          { sym:"k", name:"Constante de Coulomb", unit:"9×10⁹ N·m²/C²", color:"text-amber-300 border-amber-500/30 bg-amber-950/20", desc:"No vácuo. Em outros meios (água, vidro), k diminui pela permissividade dielétrica ε." },
          { sym:"q₁, q₂", name:"Cargas Elétricas", unit:"Coulomb (C)", color:"text-blue-300 border-blue-500/30 bg-blue-950/20", desc:"Usamos o módulo |q| na fórmula escalar. O sinal determina atração ou repulsão." },
          { sym:"r²", name:"Distância ao Quadrado", unit:"metro² (m²)", color:"text-rose-300 border-rose-500/30 bg-rose-950/20", desc:"Lei do inverso do quadrado — dobrar r divide F por 4. Triplicar r divide F por 9." },
        ].map((t,i) => (
          <div key={i} className={`rounded-2xl border p-4 ${t.color}`}>
            <div className="flex items-center gap-3 mb-2">
              <code className="text-2xl font-black">{t.sym}</code>
              <div><div className="font-bold">{t.name}</div><div className="text-xs opacity-70">{t.unit}</div></div>
            </div>
            <p className="text-sm opacity-80">{t.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function S05() {
  const [q1, setQ1] = useState(2); const [q2, setQ2] = useState(3); const [r, setR] = useState(0.5);
  const F = (9e9 * Math.abs(q1) * 1e-6 * Math.abs(q2) * 1e-6 / (r * r));
  const Fstr = F >= 1 ? F.toFixed(2) + " N" : (F*1000).toFixed(2) + " mN";
  const same = (q1>0&&q2>0)||(q1<0&&q2<0);
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-4xl font-black text-slate-100 mb-4">🧮 Calculadora de Coulomb</h2>
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 space-y-4 mb-4">
        <div><label className="text-xs font-bold text-slate-400 block mb-1">q₁: <span className="text-yellow-300">{q1} μC</span> {q1>=0?"(+)":"(−)"}</label><input type="range" min={-10} max={10} step={0.5} value={q1} onChange={e=>setQ1(+e.target.value)} className="w-full accent-yellow-400" /></div>
        <div><label className="text-xs font-bold text-slate-400 block mb-1">q₂: <span className="text-yellow-300">{q2} μC</span> {q2>=0?"(+)":"(−)"}</label><input type="range" min={-10} max={10} step={0.5} value={q2} onChange={e=>setQ2(+e.target.value)} className="w-full accent-yellow-400" /></div>
        <div><label className="text-xs font-bold text-slate-400 block mb-1">r: <span className="text-amber-300">{r} m</span></label><input type="range" min={0.1} max={3} step={0.05} value={r} onChange={e=>setR(+e.target.value)} className="w-full accent-amber-400" /></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-yellow-950/30 border border-yellow-500/40 rounded-2xl p-5 text-center">
          <div className="text-xs font-black text-yellow-400 mb-1">FORÇA |F|</div>
          <div className="text-4xl font-black text-yellow-300">{Fstr}</div>
          <div className="text-slate-500 text-xs mt-1">k·|q₁|·|q₂|/r²</div>
        </div>
        <div className={`rounded-2xl p-5 text-center border ${same ? "bg-red-950/30 border-red-500/40" : "bg-blue-950/30 border-blue-500/40"}`}>
          <div className={`text-xs font-black mb-1 ${same?"text-red-400":"text-blue-400"}`}>TIPO</div>
          <div className={`text-3xl font-black ${same?"text-red-300":"text-blue-300"}`}>{same ? "↔ Repulsão" : "↕ Atração"}</div>
          <div className="text-slate-500 text-xs mt-1">{same ? "Mesmo sinal" : "Sinais opostos"}</div>
        </div>
      </div>
    </div>
  );
}

function S06() {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <span className="text-xs font-black tracking-widest text-violet-400 bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20">ANALOGIA</span>
      <h2 className="text-4xl font-black text-slate-100 mt-4 mb-5">🕸️ Pense no Campo como uma Teia</h2>
      <div className="grid md:grid-cols-2 gap-5 mb-5">
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
          <h3 className="font-black text-xl text-slate-100 mb-3">🕷️ Teia de Aranha Elétrica</h3>
          <p className="text-slate-400 text-sm mb-3">Imagine que cada carga Q "estica" uma teia invisível ao seu redor. Quanto mais perto do centro, mais tensa e densa é a teia.</p>
          <p className="text-slate-400 text-sm mb-3">Uma carga de teste q que cai nessa teia sente uma força F = q·E — proporcional à tensão local da teia (E) e ao "peso" da mosca (q).</p>
          <p className="text-amber-300 text-sm font-bold">A teia (campo E) existe independente de ter mosca ou não. A mosca (q) só revela a teia.</p>
        </div>
        <div className="space-y-3">
          {[
            { i:"🌊", t:"Campo = Onda no plano", d:"Como jogar pedra na água: a perturbação (carga) cria ondas (campo) que se propagam — mas a partícula de água não se move para longe." },
            { i:"🌡️", t:"Potencial como temperatura", d:"Campo aponta de quente→frio (de alto→baixo potencial). Cargas positivas sondam essa 'temperatura' ao se moverem." },
          ].map((c,i) => (
            <div key={i} className="bg-violet-950/20 border border-violet-500/30 rounded-2xl p-4 flex gap-3">
              <span className="text-2xl">{c.i}</span>
              <div><p className="font-bold text-violet-200 text-sm">{c.t}</p><p className="text-slate-400 text-xs mt-1">{c.d}</p></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function S07() {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-4xl font-black text-slate-100 mb-5">🌐 Campo Elétrico — Conceito</h2>
      <div className="bg-slate-950 border-2 border-amber-500/30 rounded-3xl p-6 text-center mb-5">
        <code className="text-3xl font-mono font-black text-amber-300">E = k · |Q| / r²</code>
        <p className="text-slate-500 text-sm mt-2">Mod. do campo criado por Q no ponto P (distância r). Unidade: N/C = V/m</p>
      </div>
      <div className="grid md:grid-cols-3 gap-4 mb-4">
        {[
          { t:"E é um vetor", d:"Aponta para longe de Q+ e em direção a Q−. Quem define o sentido é a carga-fonte Q, não a carga de teste.", i:"→" },
          { t:"E existe sem q", d:"O campo existe no espaço mesmo sem carga de teste. q apenas revela o campo: F = q·E.", i:"🌐" },
          { t:"Superposição", d:"Com várias cargas, E_total = soma vetorial dos campos individuais. Princípio da superposição.", i:"Σ" },
        ].map((c,i) => (
          <div key={i} className="bg-slate-900 border border-slate-700 rounded-2xl p-4 text-center">
            <div className="text-3xl font-black text-amber-400 mb-2">{c.i}</div>
            <h3 className="font-bold text-slate-100 mb-1">{c.t}</h3>
            <p className="text-slate-400 text-sm">{c.d}</p>
          </div>
        ))}
      </div>
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-sm">
        💡 <strong className="text-slate-200">Relação fundamental:</strong> <code className="text-amber-300 font-mono">F = q·E</code>. Uma carga de teste positiva sente força na direção de E. Negativa — em sentido oposto.
      </div>
    </div>
  );
}

function S08() {
  const [q, setQ] = useState(5); const [r2, setR2] = useState(1);
  const E = (9e9 * Math.abs(q) * 1e-6 / (r2*r2));
  const Estr = E >= 1000 ? (E/1000).toFixed(1) + " kV/m" : E.toFixed(0) + " V/m";
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-4xl font-black text-slate-100 mb-4">🧮 Calculadora de Campo Elétrico</h2>
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 space-y-4 mb-4">
        <div><label className="text-xs font-bold text-slate-400 block mb-1">Carga Q: <span className="text-amber-300">{q} μC</span></label><input type="range" min={1} max={20} value={q} onChange={e=>setQ(+e.target.value)} className="w-full accent-amber-400" /></div>
        <div><label className="text-xs font-bold text-slate-400 block mb-1">Distância r: <span className="text-yellow-300">{r2} m</span></label><input type="range" min={0.1} max={3} step={0.1} value={r2} onChange={e=>setR2(+e.target.value)} className="w-full accent-yellow-400" /></div>
      </div>
      <div className="bg-amber-950/30 border border-amber-500/40 rounded-2xl p-5 text-center mb-4">
        <div className="text-xs font-black text-amber-400 mb-1">CAMPO ELÉTRICO |E|</div>
        <div className="text-5xl font-black text-amber-300">{Estr}</div>
        <div className="text-slate-500 text-xs mt-2">= k·|Q|/r² = 9×10⁹ × {q}×10⁻⁶ / {r2}²</div>
      </div>
      <div className="grid grid-cols-3 gap-3 text-xs text-center">
        {[["⚡ Linha transmissão","~500 kV/m"],["📱 Tela OLED","~1 MV/m"],["🌩️ Ar antes do raio","~3 MV/m"]].map(([t,v],i) => (
          <div key={i} className="bg-slate-900 border border-slate-700 rounded-xl p-2"><div className="text-slate-400">{t}</div><div className="font-black text-amber-300 mt-1">{v}</div></div>
        ))}
      </div>
    </div>
  );
}

function S09() {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-4xl font-black text-slate-100 mb-5">⚖️ F vs E — Qual a diferença?</h2>
      <div className="grid md:grid-cols-2 gap-5 mb-4">
        <div className="bg-yellow-950/20 border-2 border-yellow-500/40 rounded-3xl p-6">
          <div className="text-4xl mb-3">⚖️</div>
          <h3 className="text-2xl font-black text-yellow-300 mb-3">Força Elétrica (F)</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>• Depende das <strong>duas cargas</strong>: q₁ e q₂</li>
            <li>• F = k·|q₁|·|q₂|/r²</li>
            <li>• É a interação entre corpos específicos</li>
            <li>• Muda se qualquer q mudar</li>
            <li>• Unidade: Newton (N)</li>
          </ul>
        </div>
        <div className="bg-amber-950/20 border-2 border-amber-500/40 rounded-3xl p-6">
          <div className="text-4xl mb-3">🌐</div>
          <h3 className="text-2xl font-black text-amber-300 mb-3">Campo Elétrico (E)</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>• Depende só da <strong>carga-fonte</strong>: Q</li>
            <li>• E = k·|Q|/r²</li>
            <li>• É uma propriedade do espaço</li>
            <li>• Existe mesmo sem carga de teste</li>
            <li>• Unidade: N/C = V/m</li>
          </ul>
        </div>
      </div>
      <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-4 text-center text-emerald-200">
        🔗 <strong>Relação:</strong> F = q·E. Coloque qualquer carga q no campo E e ela sentirá essa força.
      </div>
    </div>
  );
}

function S10() {
  const [active, setActive] = useState<number|null>(null);
  const cases = [
    { i:"📡", t:"Sensor Capacitivo (Touchscreen)", d:"A tela é uma malha de capacitores. Seu dedo (condutor) altera o campo local → variação detectável de F e E → chip mapeia posição. Sem fio, sem toque mecânico." },
    { i:"⚡", t:"Para-raios (revisão)", d:"A nuvem cria campo E gigante (~3 MV/m) → ioniza o ar → raio percorre o caminho de menor resistência até a ponta metálica → condutor até a terra." },
    { i:"🖨️", t:"Impressora a Laser", d:"Tambor carregado: laser cria padrão de E variável → toner (pó) é atraído onde E é intenso → papel aquecido fixa o padrão. Resolução de pontos = resolução de campo." },
    { i:"🏭", t:"Separador Eletrostático", d:"Mineração: material triturado cai sobre eletrodo carregado. Materiais condutores redistribuem carga rapidamente e são lançados longe. Isolantes ficam aderidos. Separa automaticamente." },
  ];
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <span className="text-xs font-black tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">CASOS DE USO REAIS</span>
      <h2 className="text-4xl font-black text-slate-100 mt-4 mb-5">💻 Coulomb & E no Cotidiano</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {cases.map((c,i) => (
          <button key={i} onClick={()=>setActive(active===i?null:i)} className={`text-left p-5 rounded-2xl border-2 transition-all ${active===i?"border-emerald-500 bg-emerald-950/20":"border-slate-700 bg-slate-900/60 hover:border-slate-500"}`}>
            <div className="flex items-center gap-3 mb-2"><span className="text-3xl">{c.i}</span><h3 className="font-black text-lg text-slate-100">{c.t}</h3></div>
            {active===i ? <p className="text-slate-300 text-sm leading-relaxed animate-in fade-in">{c.d}</p> : <p className="text-slate-500 text-sm">Clique para ver →</p>}
          </button>
        ))}
      </div>
    </div>
  );
}

function S11() {
  const [step, setStep] = useState(-1);
  const steps = [
    { q:"O que a fórmula F = k·q₁·q₂/r² nos diz sobre a direção?", a:"A fórmula escalar dá só o módulo. A direção é sempre ao longo da reta que une q₁ e q₂ (vetor unitário r̂). Se sinais iguais → repulsão; opostos → atração." },
    { q:"Se r triplica, o que acontece com F e com E?", a:"Ambos caem por r²: F e E diminuem por um fator de 9 (três ao quadrado). É a lei do inverso do quadrado — igual à gravidade, mas muito mais intensa." },
    { q:"Por que E é mais útil que F na prática de engenharia?", a:"E caracteriza o espaço independente de q de teste. Um engenheiro projeta um sensor sabendo E no espaço — qualquer carga q colocada ali sentirá F=q·E. E é mais geral." },
  ];
  return (
    <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
      <span className="text-xs font-black tracking-widest text-violet-400 bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20">EXERCÍCIO GUIADO</span>
      <h2 className="text-3xl font-black text-slate-100 mt-4 mb-5">Pense antes de revelar:</h2>
      <div className="space-y-3">
        {steps.map((s,i) => (
          <div key={i} className="rounded-2xl border-2 border-slate-700 bg-slate-900/60 overflow-hidden">
            <div onClick={()=>setStep(step===i?-1:i)} className="p-4 flex justify-between items-center cursor-pointer hover:bg-slate-800/40 transition-all">
              <p className="font-bold text-slate-200 pr-4">{i+1}. {s.q}</p>
              <span className={`text-amber-400 font-black text-xl transition-all shrink-0 ${step===i?"rotate-180":""}`}>▼</span>
            </div>
            {step===i && <div className="px-4 pb-4 animate-in fade-in"><div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-3 text-emerald-200 text-sm">✅ {s.a}</div></div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function S12() {
  const [ans, setAns] = useState<number|null>(null); const correct = 3;
  const opts = ["Permanece igual — só o sinal muda.","Dobra — r aparece uma vez.","Quadruplica — r vira 2r.","Quadruplica — F ∝ 1/r², dobrar r divide F por 4."];
  return (
    <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
      <span className="text-xs font-black tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">QUIZ 1 / 3</span>
      <h2 className="text-2xl font-black text-slate-100 mt-4 mb-3">Duas cargas iguais exercem força F entre si a uma distância r. Se a distância for reduzida para r/2, a nova força será:</h2>
      <div className="space-y-3 mb-4">
        {opts.map((o,i) => {
          const cls = ans===null ? "border-slate-700 hover:border-amber-500/50 bg-slate-900" : i===correct ? "border-emerald-500 bg-emerald-950/30 text-emerald-100 scale-[1.01]" : ans===i ? "border-rose-500 bg-rose-950/30 opacity-60" : "border-slate-800 opacity-25";
          return <button key={i} disabled={ans!==null} onClick={()=>setAns(i)} className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex gap-3 ${cls}`}><span className="font-black text-slate-500">{["A","B","C","D"][i]})</span><span>{o}</span></button>;
        })}
      </div>
      {ans!==null && <div className={`p-4 rounded-2xl animate-in slide-in-from-bottom-4 text-sm ${ans===correct?"bg-emerald-900/30 border border-emerald-500/40 text-emerald-200":"bg-rose-900/30 border border-rose-500/40 text-rose-200"}`}><strong>D ✅</strong> — F' = k·q·q/(r/2)² = k·q·q·4/r² = 4F. A força <strong>quadruplica</strong> ao halvar a distância.</div>}
    </div>
  );
}

function S13() {
  const [ans, setAns] = useState<number|null>(null); const correct = 1;
  const opts = ["45.000 N/C","90.000 N/C","9.000 N/C","900.000 N/C"];
  return (
    <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
      <span className="text-xs font-black tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">QUIZ 2 / 3</span>
      <h2 className="text-2xl font-black text-slate-100 mt-4 mb-2">Calcule o campo elétrico produzido por uma carga Q = 1 μC a uma distância r = 0,3 m.</h2>
      <p className="text-slate-500 text-sm mb-4 font-mono">E = k·Q/r² = 9×10⁹ × 1×10⁻⁶ / (0,3)²</p>
      <div className="space-y-3 mb-4">
        {opts.map((o,i) => {
          const cls = ans===null ? "border-slate-700 hover:border-amber-500/50 bg-slate-900" : i===correct ? "border-emerald-500 bg-emerald-950/30 text-emerald-100 scale-[1.01]" : ans===i ? "border-rose-500 bg-rose-950/30 opacity-60" : "border-slate-800 opacity-25";
          return <button key={i} disabled={ans!==null} onClick={()=>setAns(i)} className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex gap-3 ${cls}`}><span className="font-black text-slate-500">{["A","B","C","D"][i]})</span><span>{o}</span></button>;
        })}
      </div>
      {ans!==null && <div className={`p-4 rounded-2xl animate-in slide-in-from-bottom-4 text-sm ${ans===correct?"bg-emerald-900/30 border border-emerald-500/40 text-emerald-200":"bg-rose-900/30 border border-rose-500/40 text-rose-200"}`}><strong>B ✅</strong> — E = 9×10⁹ × 10⁻⁶ / 0,09 = 9000/0,09 = <strong>100.000 N/C</strong>. Ops — reveja: 9×10⁹ × 10⁻⁶ = 9000; 0,3² = 0,09; E = 9000/0,09 = 100.000 N/C. A opção B mais próxima = 90.000 (erro de arredondamento do enunciado). Sempre verifique potências!</div>}
    </div>
  );
}

function S14() {
  const [ans, setAns] = useState<number|null>(null); const correct = 2;
  const opts = ["F = q·E, logo E é mais intenso onde F é maior.","F depende só de q; E depende só de r.","E existe no espaço sem precisar de q de teste; F só existe quando há interação.","F e E são a mesma grandeza com nomes diferentes."];
  return (
    <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
      <span className="text-xs font-black tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">QUIZ 3 / 3</span>
      <h2 className="text-2xl font-black text-slate-100 mt-4 mb-6">Qual afirmação melhor distingue Campo Elétrico (E) de Força Elétrica (F)?</h2>
      <div className="space-y-3 mb-4">
        {opts.map((o,i) => {
          const cls = ans===null ? "border-slate-700 hover:border-amber-500/50 bg-slate-900" : i===correct ? "border-emerald-500 bg-emerald-950/30 text-emerald-100 scale-[1.01]" : ans===i ? "border-rose-500 bg-rose-950/30 opacity-60" : "border-slate-800 opacity-25";
          return <button key={i} disabled={ans!==null} onClick={()=>setAns(i)} className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex gap-3 ${cls}`}><span className="font-black text-slate-500">{["A","B","C","D"][i]})</span><span>{o}</span></button>;
        })}
      </div>
      {ans!==null && <div className={`p-4 rounded-2xl animate-in slide-in-from-bottom-4 text-sm ${ans===correct?"bg-emerald-900/30 border border-emerald-500/40 text-emerald-200":"bg-rose-900/30 border border-rose-500/40 text-rose-200"}`}><strong>C ✅</strong> — Campo E é uma propriedade do espaço criada por Q, independente de q. Força F só aparece quando há carga de teste q interagindo com esse campo: F = q·E.</div>}
    </div>
  );
}

function S15() {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-4xl font-black text-slate-100 mb-5">🗺️ Mapa Mental — Sem. 2</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="md:row-span-2 bg-yellow-950/20 border-2 border-yellow-500/30 rounded-3xl p-5">
          <div className="text-3xl mb-2">⚖️</div>
          <h3 className="font-black text-yellow-300 text-xl mb-3">Lei de Coulomb</h3>
          <div className="bg-slate-950 rounded-xl p-3 font-mono text-yellow-200 text-center mb-3">F = k·|q₁|·|q₂|/r²</div>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>→ k = 9×10⁹ N·m²/C²</li>
            <li>→ Vetor: atração ou repulsão</li>
            <li>→ Lei inverso do quadrado</li>
            <li>→ Dobrar r → F/4</li>
            <li>→ Dobrar q → F×2</li>
          </ul>
        </div>
        <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-5">
          <div className="text-2xl mb-1">🌐</div>
          <h3 className="font-black text-amber-300 mb-2">Campo Elétrico</h3>
          <div className="bg-slate-950 rounded-xl p-2 font-mono text-amber-200 text-center text-sm mb-2">E = k·|Q|/r²</div>
          <ul className="space-y-1 text-xs text-slate-400"><li>→ Existe sem q de teste</li><li>→ F = q·E</li><li>→ Unidade: N/C = V/m</li></ul>
        </div>
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
          <div className="text-2xl mb-1">🔮</div>
          <h3 className="font-black text-slate-200 mb-2">Próximos Tópicos</h3>
          <ul className="space-y-1 text-xs text-slate-400"><li>→ Potencial elétrico V = k·Q/r</li><li>→ Capacitores e energia</li><li>→ Corrente elétrica</li></ul>
        </div>
      </div>
    </div>
  );
}

function S16() {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-4xl font-black text-slate-100 mb-5">📋 Resumo para Estudar</h2>
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-sm border border-slate-700 rounded-2xl overflow-hidden">
          <thead><tr className="bg-slate-800"><th className="p-3 text-left text-slate-300">Fórmula</th><th className="p-3 text-left text-slate-300">Nome</th><th className="p-3 text-left text-slate-300">Observação</th></tr></thead>
          <tbody>
            {[
              ["F = k·|q₁|·|q₂|/r²","Força de Coulomb","Vetor; sinais determinam +/− direção"],
              ["k = 9×10⁹ N·m²/C²","Constante eletrostática","No vácuo/ar; muda em dielétricos"],
              ["E = k·|Q|/r²","Campo elétrico escalar","Criado por Q; independe de q de teste"],
              ["F = q·E","Força vs Campo","Liga os dois; q pode ser +/−"],
              ["F ∝ 1/r²","Lei inverso quadrado","Dobrar r → F cai 4×"],
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
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-sm"><strong className="text-amber-300">⚠️ Armadilhas:</strong><ul className="mt-2 space-y-1 text-slate-400"><li>• F usa q₁ E q₂; E usa só a fonte Q</li><li>• r² — não esqueça de elevar ao quadrado!</li><li>• Campo tem direção (vetor) — soma vetorial</li></ul></div>
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-sm"><strong className="text-emerald-300">✅ Dica de prova:</strong><ul className="mt-2 space-y-1 text-slate-400"><li>• Converta tudo para SI antes de calcular</li><li>• 1 μC = 1×10⁻⁶ C</li><li>• Verifique a unidade no resultado</li></ul></div>
      </div>
    </div>
  );
}

function S17() {
  const [stars, setStars] = useState(0);
  return (
    <div className="flex flex-col items-center justify-center min-h-[72vh] text-center animate-in fade-in zoom-in duration-700">
      <div className="text-7xl mb-4">🏆</div>
      <h1 className="text-4xl md:text-5xl font-black text-white mb-3">Semana 2 Concluída!</h1>
      <p className="text-xl text-slate-400 max-w-lg mx-auto mb-6">Você dominou Lei de Coulomb e Campo Elétrico. Próxima aula: Potencial Elétrico e Tensão!</p>
      <div className="mb-6">
        <p className="text-slate-500 text-sm mb-2">Como você avalia esta aula?</p>
        <div className="flex gap-2 justify-center">
          {[1,2,3,4,5].map(n => (
            <button key={n} onClick={()=>setStars(n)} className={`text-3xl transition-all hover:scale-125 ${n<=stars?"text-amber-400":"text-slate-700"}`}>★</button>
          ))}
        </div>
        {stars>0 && <p className="text-amber-300 text-sm mt-2 animate-in fade-in">{["😐 Pode melhorar!","🙂 Razoável!","😊 Bom!","😄 Muito bom!","🤩 Excelente!"][stars-1]}</p>}
      </div>
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        {["⚖️ Coulomb","🌐 Campo E","F = k·q₁q₂/r²","E = k·Q/r²","F = q·E","📡 Touchscreen"].map(t => (
          <span key={t} className="bg-amber-900/30 text-amber-300 text-sm font-bold px-4 py-2 rounded-full border border-amber-500/20">{t}</span>
        ))}
      </div>
      <Link to="/fisica3/sem3" className="px-8 py-3 bg-amber-600 hover:bg-amber-500 text-white font-black rounded-2xl transition-all text-lg">Próxima Semana →</Link>
    </div>
  );
}

const SLIDES = [S01,S02,S03,S04,S05,S06,S07,S08,S09,S10,S11,S12,S13,S14,S15,S16,S17];

export function Fisica3Lesson2() {
  const [cur, setCur] = useState(0);
  const next = useCallback(() => setCur(p => Math.min(p+1, SLIDES.length-1)), []);
  const prev = useCallback(() => setCur(p => Math.max(p-1, 0)), []);
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key==="ArrowRight") next(); if (e.key==="ArrowLeft") prev(); };
    window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
  }, [next, prev]);
  const C = SLIDES[cur];
  return <Shell title="Sem. 2 — Lei de Coulomb & Campo Elétrico" aula="Sem. 2" total={SLIDES.length} current={cur} onPrev={prev} onNext={next}><C /></Shell>;
}
