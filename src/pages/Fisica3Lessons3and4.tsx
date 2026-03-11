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
// SEMANA 3 — Campo Elétrico Geométrico
// ═══════════════════════════════════════════════════════════════════════════════
const SEM3: React.FC[] = [
  // S1 Capa
  () => (
    <div className="flex flex-col items-center justify-center min-h-[72vh] text-center animate-in fade-in zoom-in duration-700 relative">
      <div className="absolute inset-0 opacity-10 rounded-3xl" style={{ backgroundImage:"url('/sprites/backgrounds/3/2304x1296.png')", backgroundSize:"cover", imageRendering:"pixelated" }} />
      <div className="relative z-10 max-w-2xl">
        <span className="bg-amber-500/20 text-amber-400 font-bold px-4 py-1.5 rounded-full text-xs tracking-widest border border-amber-500/30">FÍSICA 3 · SEMANA 3</span>
        <div className="text-8xl my-6">🌀</div>
        <h1 className="text-5xl md:text-6xl font-black text-white leading-none mb-4">Campo Elétrico<br /><span className="text-yellow-400">Geométrico</span></h1>
        <p className="text-xl text-slate-400 mb-6">Linhas de campo, condutores em equilíbrio e como visualizar o campo invisível ao redor de qualquer carga.</p>
        <div className="flex gap-3 flex-wrap justify-center text-sm">
          {["📐 Linhas de Campo","🛡️ Condutores","⊕⊖ Superposição","📱 Capacitor"].map(t => (
            <div key={t} className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-xl text-slate-300">{t}</div>
          ))}
        </div>
      </div>
    </div>
  ),
  // S2 Agenda
  () => {
    const [done, setDone] = useState<Record<number,boolean>>({});
    const items = ["📐 O que são linhas de campo","🔴 Campo de carga positiva","🔵 Campo de carga negativa","⊕⊖ Dipolo elétrico","📏 Campo uniforme (placas paralelas)","🛡️ Condutor em equilíbrio","💡 Blindagem eletrostática (gaiola Faraday)","🧩 Quizzes e resumo"];
    return (
      <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
        <h2 className="text-4xl font-black text-slate-100 mb-5">📋 O que vamos aprender hoje</h2>
        <div className="space-y-3">
          {items.map((t,i) => (
            <button key={i} onClick={()=>setDone(p=>({...p,[i]:!p[i]}))} className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${done[i]?"border-amber-500/60 bg-amber-950/20":"border-slate-700 bg-slate-900/60 hover:border-slate-500"}`}>
              <span className="font-semibold flex-1 text-sm text-slate-200">{t}</span>
              {done[i] ? <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" /> : <Circle className="w-5 h-5 text-slate-600 shrink-0" />}
            </button>
          ))}
        </div>
      </div>
    );
  },
  // S3 Gancho
  () => {
    const [rev, setRev] = useState(false);
    return (
      <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
        <span className="text-xs font-black tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">PROVOCAÇÃO</span>
        <h2 className="text-3xl font-black text-slate-100 mt-5 mb-5">Por que uma caixa metálica bloqueia sinal de celular? 📵</h2>
        <div className="space-y-3 mb-5">
          {["Microondas não cozinham quando a porta está fechada — por quê?","Por que técnicos de eletrônica guardam chips em sacos metálicos?","Como o celular funciona dentro de carro mas não num cofre de metal?","Qual a diferença entre um para-raios e uma cúpula metálica de iglu?"].map((s,i) => (
            <div key={i} className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-slate-300 text-sm">{s}</div>
          ))}
        </div>
        <button onClick={()=>setRev(true)} className={`w-full py-4 rounded-2xl font-bold border-2 transition-all ${rev?"border-yellow-500 bg-amber-950/20 text-amber-200":"border-slate-600 text-slate-400 hover:border-yellow-500"}`}>
          {rev ? "✅ A resposta é: Gaiola de Faraday + campo em condutores!" : "👆 Qual fenômeno eletrostático explica isso?"}
        </button>
        {rev && <div className="mt-4 bg-amber-950/20 border border-amber-500/30 rounded-2xl p-5 animate-in fade-in text-amber-200">Um condutor em equilíbrio tem campo interno = 0. As cargas livres se redistribuem na superfície para cancelar qualquer campo externo no interior. Isso é a Gaiola de Faraday!</div>}
      </div>
    );
  },
  // S4 Linhas de Campo
  () => {
    const [type, setType] = useState<"pos"|"neg"|"par">("pos");
    const info = {
      pos: { title:"Carga Positiva (+)", desc:"Linhas saem radialmente para fora. Quanto maior a carga, mais densas as linhas. Direção do campo: afastando-se da carga.", color:"text-red-300", border:"border-red-500/40", bg:"bg-red-950/20" },
      neg: { title:"Carga Negativa (−)", desc:"Linhas entram radialmente de fora para a carga. O campo aponta em direção à carga negativa.", color:"text-blue-300", border:"border-blue-500/40", bg:"bg-blue-950/20" },
      par: { title:"Campo Uniforme (Placas)", desc:"Entre placas opostas paralelas, as linhas são paralelas e equidistantes — campo uniforme. E = V/d. Usado em capacitores.", color:"text-amber-300", border:"border-amber-500/40", bg:"bg-amber-950/20" },
    };
    const d = info[type];
    return (
      <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
        <h2 className="text-4xl font-black text-slate-100 mb-4">📐 Linhas de Campo Elétrico</h2>
        <div className="flex gap-3 mb-5">
          {(["pos","neg","par"] as const).map(t => (
            <button key={t} onClick={()=>setType(t)} className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all ${type===t ? info[t].border+" "+info[t].bg+" "+info[t].color : "border-slate-700 text-slate-400 hover:border-slate-500"}`}>{t==="pos"?"⊕ Positiva":t==="neg"?"⊖ Negativa":"⊕⊖ Placas"}</button>
          ))}
        </div>
        <div className={`border-2 rounded-3xl p-6 mb-5 animate-in fade-in ${d.border} ${d.bg}`}>
          <h3 className={`text-2xl font-black mb-3 ${d.color}`}>{d.title}</h3>
          <p className="text-slate-300 text-lg">{d.desc}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-4"><strong className="text-amber-300">Regras das linhas de campo:</strong><ul className="mt-2 space-y-1 text-slate-400"><li>• Sempre saem de + e entram em −</li><li>• Nunca se cruzam</li><li>• Mais densas = campo mais intenso</li><li>• Perpendiculares à superfície de condutores</li></ul></div>
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-4"><strong className="text-amber-300">Número de linhas:</strong><ul className="mt-2 space-y-1 text-slate-400"><li>• Proporcional à carga |Q|</li><li>• Carga 2Q → dobro de linhas</li><li>• As linhas revelam magnitude e direção</li></ul></div>
        </div>
      </div>
    );
  },
  // S5 Dipolo e Superposição
  () => (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-4xl font-black text-slate-100 mb-4">⊕⊖ Dipolo Elétrico & Superposição</h2>
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 mb-5">
        <h3 className="font-black text-xl text-slate-100 mb-3">🔗 Dipolo Elétrico</h3>
        <p className="text-slate-400 mb-3">Duas cargas iguais e opostas (+Q e −Q) separadas por distância d. As linhas saem de + e <em>todas</em> chegam em −. O campo entre elas é intenso; longe, cai rapidamente como 1/r³.</p>
        <div className="grid md:grid-cols-2 gap-4">
          {[{t:"Moléculas polares",d:"Exemplo clássico: água (H₂O). O oxigênio puxa elétrons → lado O fica − e H fica +. Dipolo molecular que dissolve sais!",i:"💧"},{t:"Antenas RF",d:"Antenas dipolo: dois condutores opostos criam campo oscilante → irradiam ondas de rádio. A geometria do dipolo define a frequência de emissão.",i:"📡"}].map((c,i) => (
            <div key={i} className="bg-amber-950/20 border border-amber-500/20 rounded-xl p-4 flex gap-3"><span className="text-2xl">{c.i}</span><div><p className="font-bold text-amber-200 text-sm">{c.t}</p><p className="text-slate-400 text-xs mt-1">{c.d}</p></div></div>
          ))}
        </div>
      </div>
      <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-5">
        <h3 className="font-black text-xl text-emerald-200 mb-2">📐 Princípio da Superposição</h3>
        <p className="text-slate-400 text-sm">Com N cargas, o campo total em qualquer ponto P é a <strong className="text-slate-200">soma vetorial</strong> dos campos individuais: <code className="text-amber-300">E_total = E₁ + E₂ + ... + Eₙ</code>. Cada carga contribui independentemente!</p>
      </div>
    </div>
  ),
  // S6 Condutor em Equilíbrio
  () => (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-4xl font-black text-slate-100 mb-4">🛡️ Condutor em Equilíbrio Eletrostático</h2>
      <div className="grid md:grid-cols-2 gap-4 mb-5">
        {[
          {n:"1",t:"Campo interno = 0",d:"Qualquer campo externo reorganiza os elétrons livres do condutor até gerar campo interno igual e oposto. Equilíbrio → E interno = 0.",i:"⬛",c:"border-blue-500/30 bg-blue-950/20 text-blue-300"},
          {n:"2",t:"Cargas na superfície",d:"Como E interno = 0, não há força sobre cargas internas → elas migram para a superfície. Corpo maciço condutor: todas as cargas ficam na superfície.",i:"🔲",c:"border-amber-500/30 bg-amber-950/20 text-amber-300"},
          {n:"3",t:"E ⊥ à superfície",d:"Em equilíbrio, componente tangencial de E = 0 (senão haveria corrente). Logo E aponta perpendicular à superfície.",i:"📐",c:"border-violet-500/30 bg-violet-950/20 text-violet-300"},
          {n:"4",t:"Maior densidade em pontas",d:"Pontas e arestas concentram mais cargas → E mais intenso nas extremidades. Base do para-raios e do efeito corona.",i:"▲",c:"border-rose-500/30 bg-rose-950/20 text-rose-300"},
        ].map((c,i) => (
          <div key={i} className={`border rounded-2xl p-5 ${c.c}`}>
            <div className="flex items-center gap-2 mb-2"><span className="text-3xl">{c.i}</span><span className={`font-black text-xl ${c.c.split(" ")[2]}`}>{c.n}. {c.t}</span></div>
            <p className="text-slate-400 text-sm">{c.d}</p>
          </div>
        ))}
      </div>
    </div>
  ),
  // S7 Gaiola de Faraday
  () => {
    const [show, setShow] = useState(false);
    return (
      <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
        <span className="text-xs font-black tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">CASO DE USO REAL</span>
        <h2 className="text-4xl font-black text-slate-100 mt-4 mb-5">🛡️ Gaiola de Faraday</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
            <h3 className="font-black text-slate-100 mb-3">Como funciona?</h3>
            <p className="text-slate-400 text-sm mb-3">Uma cavidade condutora bloqueia campos externos. As cargas externas induzem distribuição na superfície que zera o campo interno.</p>
            <p className="text-slate-400 text-sm">Funciona para campos estáticos e também EM de baixa frequência — cage como filtro passa-baixa para campos!</p>
          </div>
          <div className="space-y-3">
            {[{i:"🚗",t:"Carro no raio",d:"Carro é uma gaiola — raio vai para a superfície metálica e passageiros ficam seguros."},
              {i:"🔌",t:"Cabo coaxial",d:"Malha metálica externa protege o sinal interno de interferências externas — WiFi, celular etc."},
              {i:"📡",t:"Microondas",d:"Porta com tela metálica: retém as micro-ondas dentro, mas você vê o prato girando pela tela de pontos."}].map((c,i) => (
              <div key={i} className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-3 flex gap-3"><span className="text-xl">{c.i}</span><div><p className="font-bold text-emerald-200 text-sm">{c.t}</p><p className="text-slate-400 text-xs">{c.d}</p></div></div>
            ))}
          </div>
        </div>
        <button onClick={()=>setShow(!show)} className={`w-full py-3 rounded-2xl font-bold border-2 transition-all ${show?"border-amber-500 bg-amber-950/20 text-amber-200":"border-slate-600 text-slate-400 hover:border-amber-500"}`}>
          {show ? "💡 Faraday demonstrou em 1836 ficando dentro de uma gaiola metálica durante raios!" : "👆 Curiosidade histórica"}
        </button>
      </div>
    );
  },
  // S8 Quiz 1
  () => <Quiz n={1} total={3} q="As linhas de campo de uma carga positiva isolada são:" opts={["Círculos concêntricos ao redor da carga.","Retas que entram na carga de fora para dentro.","Retas que saem da carga em todas as direções.","Paralelas, como num campo uniforme."]} correct={2} explanation="✅ C — Carga positiva: linhas saem radialmente para fora em todas as direções. Carga negativa: linhas entram." />,
  // S9 Quiz 2
  () => <Quiz n={2} total={3} q="Dentro de uma esfera metálica maciça, carregada externamente com 10 μC. Qual o campo elétrico no centro?" opts={["10.000 N/C, apontando para fora.","Depende do raio da esfera.","0 N/C — o campo interno de um condutor em equilíbrio é zero.","Igual ao campo externo na superfície."]} correct={2} explanation="✅ C — Condutor em equilíbrio → E interno = 0. As cargas se redistribuem na superfície para cancelar qualquer campo interno." />,
  // S10 Quiz 3
  () => <Quiz n={3} total={3} q="Um técnico manipula placas de circuito impresso num saco metálico laminado. A função do saco é:" opts={["Aumentar a condutividade das trilhas.","Impedir que campos externos induzam cargas nos componentes sensíveis (gaiola de Faraday).","Resfriar os chips durante o transporte.","Evitar que os chips soltem vapor de água."]} correct={1} explanation="✅ B — O saco age como gaiola de Faraday: blindagem eletrostática que protege componentes de descargas eletrostáticas (ESD) externas." />,
  // S11 Mapa Mental
  () => (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-4xl font-black text-slate-100 mb-5">🗺️ Mapa Mental — Sem. 3</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {t:"📐 Linhas de Campo",items:["Saem de + entram em −","Nunca se cruzam","Densidade ∝ intensidade","⊥ à superfície condutora"],c:"border-amber-500/30 bg-amber-950/10"},
          {t:"🛡️ Condutor em Equilíbrio",items:["E interno = 0","Cargas na superfície","E ⊥ superfície","Pontas: E mais intenso"],c:"border-blue-500/30 bg-blue-950/10"},
          {t:"🌐 Gaiola de Faraday",items:["Superfície condutora","Blinda campo externo","Carro, cabo coaxial","Bolsa ESD para chips"],c:"border-emerald-500/30 bg-emerald-950/10"},
          {t:"⊕⊖ Dipolo",items:["2 cargas opostas","Campo entre elas ↑","Moléculas polares (H₂O)","Antenas dipolo RF"],c:"border-violet-500/30 bg-violet-950/10"},
          {t:"📏 Campo Uniforme",items:["Entre placas paralelas","E = V/d","Linhas paralelas, equidist.","Capacitores e touchscreen"],c:"border-rose-500/30 bg-rose-950/10"},
          {t:"Σ Superposição",items:["E_total = ΣEᵢ (vetorial)","Cada carga contribui","Ponto de campo nulo","Sistema de múltiplas cargas"],c:"border-slate-500/30 bg-slate-900/60"},
        ].map((b,i) => (
          <div key={i} className={`rounded-2xl border p-4 ${b.c}`}>
            <h4 className="font-black text-slate-100 mb-2 text-sm">{b.t}</h4>
            <ul className="space-y-1">{b.items.map(s => <li key={s} className="text-slate-400 text-xs">→ {s}</li>)}</ul>
          </div>
        ))}
      </div>
    </div>
  ),
  // S12 Resumo
  () => (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-4xl font-black text-slate-100 mb-5">📋 Resumo — Sem. 3</h2>
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-sm border border-slate-700 rounded-2xl overflow-hidden">
          <thead><tr className="bg-slate-800"><th className="p-3 text-left text-slate-300">Conceito</th><th className="p-3 text-left text-slate-300">Descrição</th></tr></thead>
          <tbody>
            {[["Linha de campo","Representa direção e sentido de E. Nunca se cruzam."],["Densidade de linhas","∝ intensidade do campo. Mais linhas = campo mais forte."],["Condutor: E interno = 0","Cargas livres se redistribuem até zerar E interno."],["E ⊥ superfície","Componente tangencial seria corrente — não existe em equilíbrio."],["Gaiola de Faraday","Cavidade condutora: blinda interior de campos externos."],["Dipolo elétrico","Dois cargas iguais e opostas. Base de moléculas e antenas."],["Superposição","E_total = soma vetorial dos campos de cada carga separada."]].map((r,i) => (
              <tr key={i} className={i%2===0?"bg-slate-900/60":"bg-slate-900/30"}>
                <td className="p-3 border-t border-slate-800 font-bold text-amber-300 text-xs">{r[0]}</td>
                <td className="p-3 border-t border-slate-800 text-slate-400 text-xs">{r[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-center text-slate-500 text-sm">Próxima aula: Potencial Elétrico e Tensão ⚡</p>
    </div>
  ),
  // S13 Encerramento
  () => {
    const [stars, setStars] = useState(0);
    return (
      <div className="flex flex-col items-center justify-center min-h-[72vh] text-center animate-in fade-in zoom-in duration-700">
        <div className="text-7xl mb-4">🏆</div>
        <h1 className="text-4xl font-black text-white mb-3">Semana 3 Concluída!</h1>
        <p className="text-xl text-slate-400 max-w-lg mx-auto mb-6">Campo geométrico dominado! Próxima: Potencial Elétrico e Tensão.</p>
        <div className="mb-6">
          <p className="text-slate-500 text-sm mb-2">Como foi?</p>
          <div className="flex gap-2 justify-center">
            {[1,2,3,4,5].map(n => <button key={n} onClick={()=>setStars(n)} className={`text-3xl transition-all hover:scale-125 ${n<=stars?"text-amber-400":"text-slate-700"}`}>★</button>)}
          </div>
          {stars>0 && <p className="text-amber-300 text-sm mt-2">{["😐","🙂","😊","😄","🤩"][stars-1]} {["Pode melhorar!","Razoável!","Bom!","Muito bom!","Excelente!"][stars-1]}</p>}
        </div>
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          {["📐 Linhas","🛡️ Gaiola Faraday","⊕⊖ Dipolo","Σ Superposição","E=0 interno"].map(t => (
            <span key={t} className="bg-amber-900/30 text-amber-300 text-sm font-bold px-4 py-2 rounded-full border border-amber-500/20">{t}</span>
          ))}
        </div>
        <Link to="/fisica3/sem4" className="px-8 py-3 bg-amber-600 hover:bg-amber-500 text-white font-black rounded-2xl transition-all text-lg">Próxima Semana →</Link>
      </div>
    );
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// SEMANA 4 — Potencial Elétrico & Tensão
// ═══════════════════════════════════════════════════════════════════════════════
const SEM4: React.FC[] = [
  // S1 Capa
  () => (
    <div className="flex flex-col items-center justify-center min-h-[72vh] text-center animate-in fade-in zoom-in duration-700 relative">
      <div className="absolute inset-0 opacity-10 rounded-3xl" style={{ backgroundImage:"url('/sprites/backgrounds/4/2304x1296.png')", backgroundSize:"cover", imageRendering:"pixelated" }} />
      <div className="relative z-10 max-w-2xl">
        <span className="bg-amber-500/20 text-amber-400 font-bold px-4 py-1.5 rounded-full text-xs tracking-widest border border-amber-500/30">FÍSICA 3 · SEMANA 4</span>
        <div className="text-8xl my-6">⚡</div>
        <h1 className="text-5xl md:text-6xl font-black text-white leading-none mb-4">Potencial Elétrico<br /><span className="text-lime-400">& Tensão</span></h1>
        <p className="text-xl text-slate-400 mb-6">Potencial é a "altitude elétrica". Tensão é a diferença entre duas altitudes. O que move as cargas é sempre essa diferença — ΔV.</p>
        <div className="flex gap-3 flex-wrap justify-center text-sm">
          {["🔋 V = k·Q/r","⚡ ΔV = Tensão","💡 τ = q·ΔV","🌐 Equipotencial"].map(t => (
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
        <h2 className="text-3xl font-black text-slate-100 mt-5 mb-5">Por que 12 V da bateria de carro não te mata, mas 12 V estático pode? 🤔</h2>
        <div className="space-y-3 mb-5">
          {["Tomadas domésticas são 127 V ou 220 V — por que existem os dois padrões?","Por que um fio de terra (0 V) protege equipamentos?","Bateria de carro: 12 V. Tomada: 127 V. Raio: 300.000.000 V. O que muda?","Como um desfibrilador escolhe a tensão certa para parar o coração e reiniciá-lo?"].map((s,i)=>(
            <div key={i} className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-slate-300 text-sm">{s}</div>
          ))}
        </div>
        <button onClick={()=>setRev(true)} className={`w-full py-4 rounded-2xl font-bold border-2 transition-all ${rev?"border-lime-500 bg-lime-950/20 text-lime-200":"border-slate-600 text-slate-400 hover:border-lime-500"}`}>
          {rev ? "✅ É tudo Diferença de Potencial — a grandeza que move cargas!" : "👆 Qual grandeza comum liga tudo isso?"}
        </button>
        {rev && <div className="mt-4 bg-lime-950/20 border border-lime-500/30 rounded-2xl p-5 animate-in fade-in text-lime-200">A tensão (ΔV) entre dois pontos é o que importa — não o potencial absoluto. O corpo humano é atingido pela corrente que flui pela tensão aplicada. Em estática, há altíssima tensão mas corrente minúscula = desconforto, não morte.</div>}
      </div>
    );
  },
  // S3 Potencial Elétrico
  () => (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-4xl font-black text-slate-100 mb-5">🔋 Potencial Elétrico (V)</h2>
      <div className="bg-slate-950 border-2 border-lime-500/30 rounded-3xl p-6 text-center mb-5">
        <code className="text-3xl font-mono font-black text-lime-300">V = k · Q / r</code>
        <p className="text-slate-500 text-sm mt-2">Potencial em um ponto P a distância r de uma carga Q. Unidade: Volt (V = J/C)</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        {[
          {t:"É escalar!",d:"Ao contrário de E (vetor), V é escalar. Para múltiplas cargas: V_total = V₁ + V₂ + ... (soma algébrica, não vetorial!)",i:"🔢"},
          {t:"Referencial em ∞",d:"Por convenção, V = 0 no infinito. O potencial de uma carga Q diminui conforme r aumenta. Nunca é absoluto — só diferenças importam.",i:"∞"},
          {t:"Relação com E",d:"E = −dV/dr: o campo elétrico aponta na direção de decréscimo do potencial (de alto para baixo V), como água descendo morro.",i:"📉"},
          {t:"Trabalho da força elétrica",d:"τ_AB = q·(V_A − V_B) = q·ΔV. O trabalho realizado ao mover carga q de A para B depende só da ddp — não do caminho!",i:"💼"},
        ].map((c,i) => (
          <div key={i} className="bg-slate-900 border border-slate-700 rounded-2xl p-4 flex gap-3">
            <span className="text-2xl font-black text-lime-400 shrink-0">{c.i}</span>
            <div><p className="font-bold text-slate-100 text-sm">{c.t}</p><p className="text-slate-400 text-xs mt-1">{c.d}</p></div>
          </div>
        ))}
      </div>
    </div>
  ),
  // S4 Calculadora V
  () => {
    const [q, setQ] = useState(5); const [r, setR] = useState(1);
    const V = (9e9 * q * 1e-6 / r);
    const Vstr = Math.abs(V) >= 1000 ? (V/1000).toFixed(1)+" kV" : V.toFixed(0)+" V";
    return (
      <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
        <h2 className="text-4xl font-black text-slate-100 mb-4">🧮 Calculadora de Potencial</h2>
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 space-y-4 mb-4">
          <div><label className="text-xs font-bold text-slate-400 block mb-1">Carga Q: <span className="text-lime-300">{q} μC</span></label><input type="range" min={-20} max={20} step={0.5} value={q} onChange={e=>setQ(+e.target.value)} className="w-full accent-lime-400" /></div>
          <div><label className="text-xs font-bold text-slate-400 block mb-1">Distância r: <span className="text-amber-300">{r} m</span></label><input type="range" min={0.1} max={5} step={0.1} value={r} onChange={e=>setR(+e.target.value)} className="w-full accent-amber-400" /></div>
        </div>
        <div className={`rounded-2xl p-5 text-center mb-4 border-2 ${q>=0?"bg-lime-950/30 border-lime-500/40":"bg-rose-950/30 border-rose-500/40"}`}>
          <div className={`text-xs font-black mb-1 ${q>=0?"text-lime-400":"text-rose-400"}`}>POTENCIAL V</div>
          <div className={`text-5xl font-black ${q>=0?"text-lime-300":"text-rose-300"}`}>{Vstr}</div>
          <div className="text-slate-500 text-xs mt-2">{q>=0?"Carga positiva → V positivo → região de alta energia para cargas +":"Carga negativa → V negativo → região de baixa energia para cargas +"}</div>
        </div>
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-sm text-slate-400">
          💡 <strong className="text-slate-200">Na prática:</strong> Num capacitor de 100 μF a 12 V, energia armazenada = ½·C·V² = ½·100×10⁻⁶·144 = 7,2 mJ.
        </div>
      </div>
    );
  },
  // S5 ddp e Trabalho
  () => (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-4xl font-black text-slate-100 mb-5">⚡ Diferença de Potencial (ddp) e Trabalho</h2>
      <div className="bg-slate-950 border-2 border-amber-500/30 rounded-3xl p-5 text-center mb-5">
        <code className="text-2xl font-mono font-black text-amber-300">ΔV = V_A − V_B &nbsp;|&nbsp; τ = q · ΔV</code>
      </div>
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-5">
          <h3 className="font-black text-amber-200 mb-3">🏔️ Analogia da Altitude</h3>
          <p className="text-slate-400 text-sm mb-3">Potencial elétrico = altitude. Carga positiva é como uma bola que rola morro abaixo (de alto V para baixo V). Carga negativa rola morro acima (em direção ao V mais alto).</p>
          <p className="text-slate-400 text-sm">Trabalho = variação de energia potencial = q·ΔV. Como mover bolas em uma montanha: quem paga é a diferença de altura!</p>
        </div>
        <div className="space-y-3">
          {[{t:"Bateria 9V",d:"ΔV = 9V entre os pólos. 1 C de carga ganha 9 J de energia ao atravessar."},
            {t:"Tomada 220V",d:"ΔV = 220V rms. Aparelhos convertem essa ddp em calor, luz, movimento."},
            {t:"Neurônio (-70mV)",d:"Potencial de repouso da membrana celular: −70 mV. Impulso nervoso = variação dessa ddp!"},
          ].map((c,i) => (
            <div key={i} className="bg-slate-900 border border-slate-700 rounded-xl p-4 flex gap-3"><span className="text-lg">⚡</span><div><p className="font-bold text-slate-100 text-sm">{c.t}</p><p className="text-slate-400 text-xs mt-1">{c.d}</p></div></div>
          ))}
        </div>
      </div>
    </div>
  ),
  // S6 Equipotenciais
  () => (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-4xl font-black text-slate-100 mb-5">🌐 Superfícies Equipotenciais</h2>
      <div className="grid md:grid-cols-2 gap-5 mb-4">
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
          <h3 className="font-black text-slate-100 mb-3">O que são?</h3>
          <p className="text-slate-400 text-sm mb-3">Conjunto de pontos com o mesmo potencial V. Em 3D são superfícies; em 2D são curvas. Como as curvas de nível num mapa topográfico!</p>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>→ <strong className="text-slate-200">Sempre ⊥ às linhas de campo</strong></li>
            <li>→ Mover carga sobre equipotencial: τ = 0</li>
            <li>→ Para Q isolada: equipotenciais são esferas</li>
            <li>→ Campo uniforme: equipotenciais são planos</li>
          </ul>
        </div>
        <div className="space-y-3">
          <div className="bg-lime-950/20 border border-lime-500/30 rounded-2xl p-4">
            <p className="font-bold text-lime-200 mb-2">🗺️ Analogia do Mapa</p>
            <p className="text-slate-400 text-sm">Curvas de nível = equipotenciais. Gradiente topográfico = campo E. Água (ou carga positiva) flui perpendicular às curvas, sempre descendo a inclinação mais íngreme.</p>
          </div>
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4">
            <p className="font-bold text-slate-100 mb-2">🔋 Capacitor</p>
            <p className="text-slate-400 text-sm">Entre as placas: campo uniforme E = V/d. Equipotenciais são planos paralelos às placas. Cada plano tem V diferente, distribuído linearmente.</p>
          </div>
        </div>
      </div>
      <div className="bg-slate-900 border border-amber-500/30 rounded-xl p-4 text-sm text-slate-400">
        💡 <strong className="text-amber-300">Regra prática:</strong> E = −ΔV/Δr. Campo aponta de alto para baixo V, perpendicular às equipotenciais. Em condutores, toda a superfície é equipotencial!
      </div>
    </div>
  ),
  // S7 Quiz 1
  () => <Quiz n={1} total={3} q="Uma carga de +2 μC se move do ponto A (V_A = 100 V) para o ponto B (V_B = 40 V). O trabalho realizado pela força elétrica é:" opts={["−120 μJ","+120 μJ","−60 μJ","+60 μJ"]} correct={1} explanation="✅ B — τ = q·(V_A − V_B) = 2×10⁻⁶ × (100−40) = 2×10⁻⁶ × 60 = +120 μJ. Positivo: força favorável ao movimento (de alto para baixo V)." />,
  // S8 Quiz 2
  () => <Quiz n={2} total={3} q="O potencial elétrico é uma grandeza:" opts={["Vetorial, com direção e sentido.","Escalar — só tem magnitude e sinal.","Sempre positiva.","Igual ao campo elétrico dividido pela carga."]} correct={1} explanation="✅ B — Potencial V é escalar. Para soma de N cargas, V_total = ΣVᵢ (soma algébrica simples). Campo E é vetorial — muito mais trabalhoso de somar!" />,
  // S9 Quiz 3
  () => <Quiz n={3} total={3} q="Sobre superfícies equipotenciais, é CORRETO afirmar:" opts={["São sempre paralelas às linhas de campo.","O trabalho para mover carga sobre uma equipotencial é sempre zero.","Só existem perto de condutores.","Toda a superfície de uma esfera não condutora é equipotencial."]} correct={1} explanation="✅ B — Equipotencial → mesma V → ΔV = 0 → τ = q·ΔV = 0. Faz sentido: não há variação de energia potencial ao mover ao longo da mesma superfície de nível." />,
  // S10 Mapa Mental
  () => (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-4xl font-black text-slate-100 mb-5">🗺️ Mapa Mental — Sem. 4</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-lime-950/20 border-2 border-lime-500/30 rounded-3xl p-5">
          <h3 className="font-black text-lime-300 text-xl mb-3">🔋 Potencial V</h3>
          <div className="bg-slate-950 rounded-xl p-2 font-mono text-lime-200 text-center text-sm mb-3">V = k · Q / r</div>
          <ul className="space-y-1 text-xs text-slate-400"><li>→ Escalar (soma algébrica)</li><li>→ Unidade: Volt = J/C</li><li>→ Referência: V(∞) = 0</li><li>→ E = −dV/dr</li></ul>
        </div>
        <div className="bg-amber-950/20 border-2 border-amber-500/30 rounded-3xl p-5">
          <h3 className="font-black text-amber-300 text-xl mb-3">⚡ ddp (Tensão)</h3>
          <div className="bg-slate-950 rounded-xl p-2 font-mono text-amber-200 text-center text-sm mb-3">ΔV = V_A − V_B</div>
          <ul className="space-y-1 text-xs text-slate-400"><li>→ O que MOVE cargas</li><li>→ τ = q · ΔV (trabalho)</li><li>→ Base das pilhas e tomadas</li><li>→ Neurônios: −70 mV</li></ul>
        </div>
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4">
          <h3 className="font-black text-slate-200 mb-2">🌐 Equipotenciais</h3>
          <ul className="space-y-1 text-xs text-slate-400"><li>→ ⊥ às linhas de campo</li><li>→ τ = 0 ao mover sobre elas</li><li>→ Superfície condutora = 1 equipotencial</li></ul>
        </div>
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4">
          <h3 className="font-black text-slate-200 mb-2">🔮 Próximo Passo</h3>
          <ul className="space-y-1 text-xs text-slate-400"><li>→ Corrente elétrica (i = ΔQ/Δt)</li><li>→ Tensão move carga → corrente</li><li>→ Resistência (R = V/i)</li></ul>
        </div>
      </div>
    </div>
  ),
  // S11 Resumo + Encerramento
  () => {
    const [stars, setStars] = useState(0);
    return (
      <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
        <h2 className="text-4xl font-black text-slate-100 mb-5">📋 Resumo — Sem. 4</h2>
        <div className="overflow-x-auto mb-5">
          <table className="w-full text-sm border border-slate-700 rounded-2xl overflow-hidden">
            <thead><tr className="bg-slate-800"><th className="p-3 text-left text-slate-300">Fórmula</th><th className="p-3 text-left text-slate-300">Significado</th></tr></thead>
            <tbody>
              {[["V = k·Q/r","Potencial de carga Q no ponto P (escalar, Volt)"],["ΔV = V_A − V_B","Diferença de potencial (tensão) entre A e B"],["τ = q·ΔV","Trabalho da força elétrica ao mover carga q"],["E = −ΔV/Δr","Campo aponta no sentido de queda do potencial"],["E = V/d","Campo uniforme entre placas: V=tensão, d=dist."]].map((r,i)=>(
                <tr key={i} className={i%2===0?"bg-slate-900/60":"bg-slate-900/30"}>
                  <td className="p-3 border-t border-slate-800 font-mono text-lime-300 text-xs">{r[0]}</td>
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
          <Link to="/fisica3/sem5" className="px-8 py-3 bg-amber-600 hover:bg-amber-500 text-white font-black rounded-2xl transition-all text-lg">Próxima Semana →</Link>
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

export const Fisica3Lesson3 = makeLesson(SEM3, "Sem. 3 — Campo Elétrico Geométrico", "Sem. 3");
export const Fisica3Lesson4 = makeLesson(SEM4, "Sem. 4 — Potencial Elétrico & Tensão", "Sem. 4");
