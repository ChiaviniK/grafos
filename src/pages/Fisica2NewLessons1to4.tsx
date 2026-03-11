import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import { PixelQuiz } from "../components/PixelQuiz";
import { ENEMQuestion } from "../components/ENEMQuestion";
import { FormulaFlashcard } from "../components/FormulaFlashcard";
import { PhysicsRunner } from "../components/PhysicsRunner";

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

// ═════════ SEM 1 — Temperatura & Termômetros ═════════
const SEM1: React.FC[] = [
  () => (
    <div className="flex flex-col items-center justify-center min-h-[68vh] text-center animate-in fade-in zoom-in duration-700">
      <span className="bg-orange-500/20 text-orange-400 font-bold px-4 py-1.5 rounded-full text-xs tracking-widest border border-orange-500/30">FÍSICA 2 · SEMANA 1</span>
      <div className="text-8xl my-6">🌡️</div>
      <h1 className="text-5xl md:text-6xl font-black text-white leading-none mb-4">Temperatura &<br /><span className="text-orange-400">Termometria</span></h1>
      <p className="text-xl text-slate-400 mb-6 max-w-xl">O que é temperatura de verdade? Por que 0°C não é "sem calor"? Vamos desmistificar um dos conceitos mais cotidianos da Física.</p>
      <div className="flex gap-3 flex-wrap justify-center text-sm">
        {["🌡️ Temperatura vs Calor","⚛️ Energia cinética","🧊 Zero absoluto","📐 Escalas termométricas"].map(t => (
          <div key={t} className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-xl text-slate-300">{t}</div>
        ))}
      </div>
    </div>
  ),
  () => {
    const [rev, setRev] = useState(false);
    return (
      <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
        <span className="text-xs font-black tracking-widest text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">PROVOCAÇÃO</span>
        <h2 className="text-3xl font-black text-slate-100 mt-5 mb-5">Você sente "frio" ou ausência de calor? 🤔</h2>
        <div className="space-y-3 mb-5">
          {["Por que metal frio parece mais frio que madeira fria à mesma temperatura?","Por que sua temperatura corporal é 36,5°C e não 0°C?","Existe um limite máximo de temperatura? E mínimo?","Por que o espaço sideral é frio se tem radiação solar?"].map((s,i)=>(
            <div key={i} className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-slate-300 text-sm">{s}</div>
          ))}
        </div>
        <button onClick={()=>setRev(true)} className={`w-full py-4 rounded-2xl font-bold border-2 transition-all ${rev?"border-orange-500 bg-orange-950/20 text-orange-200":"border-slate-600 text-slate-400 hover:border-orange-500"}`}>
          {rev ? "✅ Temperatura mede agitação molecular — não calor!" : "👆 Qual a definição real de temperatura?"}
        </button>
        {rev && <div className="mt-4 bg-orange-950/20 border border-orange-500/30 rounded-2xl p-5 animate-in fade-in text-orange-200">Temperatura é a medida da energia cinética média das partículas. Maior agitação = maior temperatura. "Frio" não existe — é apenas baixa agitação. O mínimo possível é o zero absoluto: −273,15°C (0 K).</div>}
      </div>
    );
  },
  () => (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-4xl font-black text-slate-100 mb-5">⚛️ O que é Temperatura?</h2>
      <div className="bg-slate-950 border-2 border-orange-500/30 rounded-3xl p-6 text-center mb-5">
        <p className="text-lg text-slate-300">Temperatura = medida da <span className="text-orange-300 font-black">energia cinética média</span> das partículas de um sistema</p>
        <p className="text-slate-500 text-sm mt-2">Unidade SI: Kelvin (K). Na prática: Celsius (°C) ou Fahrenheit (°F)</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {[
          {i:"🔥",t:"Alta temperatura",d:"Moléculas se agitam muito, colidindo frequentemente e com alta energia. Ex: ferro fundido a 1538°C."},
          {i:"🧊",t:"Baixa temperatura",d:"Moléculas praticamente estacionárias. Em 0 K (−273,15°C) o movimento cessa completamente — zero absoluto."},
          {i:"⚖️",t:"Equilíbrio Térmico",d:"Dois corpos em contato trocam calor até igualarem suas temperaturas. Princípio do termômetro!"},
          {i:"🌡️",t:"Termômetro",d:"Instrumento que usa propriedades que variam com T (volume de líquido, resistência elétrica, cor de LED) para medir temperatura."},
        ].map((c,i)=>(
          <div key={i} className="bg-slate-900 border border-slate-700 rounded-2xl p-4 flex gap-3">
            <span className="text-2xl shrink-0">{c.i}</span>
            <div><p className="font-bold text-slate-100 text-sm">{c.t}</p><p className="text-slate-400 text-xs mt-1">{c.d}</p></div>
          </div>
        ))}
      </div>
    </div>
  ),
  () => {
    const [C, setC] = useState(100);
    const K = C + 273.15;
    const F = C * 9/5 + 32;
    return (
      <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
        <h2 className="text-4xl font-black text-slate-100 mb-4">🧮 Conversor de Escalas</h2>
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 mb-5">
          <label className="text-xs font-bold text-slate-400 block mb-1">Temperatura em °C: <span className="text-orange-300">{C} °C</span></label>
          <input type="range" min={-273} max={1000} value={C} onChange={e=>setC(+e.target.value)} className="w-full accent-orange-400" />
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-orange-950/30 border border-orange-500/30 rounded-2xl p-4 text-center">
            <div className="text-xs font-black text-orange-400 mb-1">CELSIUS</div>
            <div className="text-3xl font-black text-orange-300">{C}°C</div>
            <div className="text-xs text-slate-500 mt-1">Baseado na água</div>
          </div>
          <div className="bg-blue-950/30 border border-blue-500/30 rounded-2xl p-4 text-center">
            <div className="text-xs font-black text-blue-400 mb-1">KELVIN (SI)</div>
            <div className="text-3xl font-black text-blue-300">{K.toFixed(2)} K</div>
            <div className="text-xs text-slate-500 mt-1">K = °C + 273,15</div>
          </div>
          <div className="bg-rose-950/30 border border-rose-500/30 rounded-2xl p-4 text-center">
            <div className="text-xs font-black text-rose-400 mb-1">FAHRENHEIT</div>
            <div className="text-3xl font-black text-rose-300">{F.toFixed(1)}°F</div>
            <div className="text-xs text-slate-500 mt-1">°F = °C×9/5 + 32</div>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-slate-400">
          📌 Referências: Água congela a 0°C / 273K / 32°F. Água ferve a 100°C / 373K / 212°F. Corpo humano ≈ 36,5°C / 309,65K / 97,7°F.
        </div>
      </div>
    );
  },
  () => (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <span className="text-xs font-black tracking-widest text-violet-400 bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20">ANALOGIA</span>
      <h2 className="text-4xl font-black text-slate-100 mt-4 mb-5">🎭 Temperatura = Velocidade de Dança das Moléculas</h2>
      <div className="grid md:grid-cols-3 gap-4 mb-5">
        {[
          {emoji:"🧊",label:"Gelo (0°C)",desc:"Moléculas dançam super devagar, presas em posições fixas — cristal.",bg:"bg-blue-950/20 border-blue-500/30"},
          {emoji:"💧",label:"Água (50°C)",desc:"Dançam mais rápido! Conseguem se mover — viraram líquido.",bg:"bg-sky-950/20 border-sky-500/30"},
          {emoji:"💨",label:"Vapor (120°C)",desc:"Dançam desenfreadamente em todas as direções — viraram gás.",bg:"bg-orange-950/20 border-orange-500/30"},
        ].map((c,i)=>(
          <div key={i} className={`border rounded-2xl p-5 text-center ${c.bg}`}>
            <div className="text-5xl mb-2">{c.emoji}</div>
            <div className="font-black text-slate-100 mb-2">{c.label}</div>
            <p className="text-slate-400 text-sm">{c.desc}</p>
          </div>
        ))}
      </div>
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-sm text-slate-400">
        💡 O termômetro de mercúrio funciona porque o mercúrio se expande conforme as moléculas "dançam mais rápido" com o aumento da temperatura — e o volume aumenta de forma previsível e linear.
      </div>
    </div>
  ),
  () => <Quiz n={1} total={2} q="A temperatura do zero absoluto (0 K) equivale a:" opts={["0°C","−100°C","−273,15°C","−373,15°C"]} correct={2} exp="✅ C — 0 K = −273,15°C. É o ponto em que as moléculas param de se mover. Nenhuma temperatura pode ser menor!" />,
  () => <Quiz n={2} total={2} q="Qual conversão está CORRETA para 37°C (temperatura do corpo)?" opts={["310,15 K e 98,6°F","273,15 K e 98,6°F","310,15 K e 68°F","300 K e 100°F"]} correct={0} exp="✅ A — K = 37 + 273,15 = 310,15 K. °F = 37×9/5 + 32 = 66,6 + 32 = 98,6°F. Fórmulas: K = °C+273,15 e °F = °C×9/5+32." />,
  () => (
    <PixelQuiz character={2} title="🎮 Dinâmica: Temperatura!" subtitle="Responda e veja o Dude Monster reagir!"
      questions={[
        {q:"O que a temperatura mede, de fato?",opts:["Volume de calor armazenado","Energia cinética média das partículas","Pressão do gás","Massa do objeto"],correct:1,explanation:"Temperatura = agitação molecular média. Calor é energia em trânsito — são conceitos diferentes!"},
        {q:"Qual escala tem o zero absoluto como ponto de referência zero?",opts:["Celsius","Fahrenheit","Kelvin","Rankine (não estudada)"],correct:2,explanation:"Kelvin: 0 K = zero absoluto. Por isso K nunca é negativo. Na ciência, usamos Kelvin para cálculos termodinâmicos!"},
        {q:"Por que metal parece mais frio que madeira à mesma temperatura ambiente?",opts:["Metal tem temperatura menor","Madeira é melhor isolante — conduz menos calor para/da sua mão","Metal é mais denso","É ilusão óptica"],correct:1,explanation:"A sensação de 'frio' é sobre CONDUÇÃO de calor. Metal conduz bem → retira calor da sua mão rapidamente → você sente frio. Madeira conduz mal → mão mantém calor."},
      ]}
    />
  ),
  // ENEM — Temperatura
  () => (
    <ENEMQuestion
      year={2019} subject="Ciências da Natureza — Física"
      difficulty="médio"
      context="Uma solução supersaturada de acetato de sódio pode ser rapidamente cristalizada. Ao tocar no fundo do recipiente ou adicionar um cristal de soluto, ocorre a solidificação em cadeia, que libera calor. A temperatura da solução sobe de ~24°C para ~54°C durante o processo."
      question="O fenômeno descrito é um exemplo de qual tipo de mudança e qual grandeza física permanece constante durante o processo de cristalização?"
      options={[
        {letter:"A", text:"Mudança de estado de gasoso para líquido; temperatura constante."},
        {letter:"B", text:"Mudança de estado de líquido para sólido; volume constante."},
        {letter:"C", text:"Mudança de estado de líquido para sólido. O calor liberado aquece o sistema, não havendo patamar de temperatura."},
        {letter:"D", text:"Mudança de estado de sólido para líquido; temperatura constante."},
        {letter:"E", text:"Mudança de estado de gasoso para sólido; pressão constante."},
      ]}
      correct="C"
      resolution="A cristalização do acetato de sódio supersaturado é uma solidificação (líquido→sólido) exotérmica. Em soluções supersaturadas, a cristalização libera calor latente de solidificação, aquecendo o sistema de ~24°C para ~54°C. Não há patamar isotérmico como em substâncias puras — a temperatura SOBE com o calor liberado. Gabarito: C."
    />
  ),
  // FLASHCARD — Temperatura
  () => (
    <FormulaFlashcard
      title="🃏 Fórmulas — Temperatura & Escalas"
      color="orange"
      cards={[
        {front:"K = °C + 273,15", back:"Converte Celsius para Kelvin", example:"37°C = 310,15 K (temperatura corporal)", unit:"K (Kelvin)"},
        {front:"°F = °C × 9/5 + 32", back:"Converte Celsius para Fahrenheit", example:"100°C = 212°F (ebulição da água)", unit:"°F"},
        {front:"°C = (°F − 32) × 5/9", back:"Converte Fahrenheit para Celsius", example:"98,6°F = 37°C", unit:"°C"},
        {front:"0 K = −273,15°C", back:"Zero absoluto — temperatura mínima do universo", example:"Hélio líquido: ~4 K = −269°C", unit:""},
        {front:"T_eq = (T₁+T₂)/2", back:"Temperatura de equilíbrio (massas iguais, mesmo c)", example:"80°C + 20°C → equilíbrio em 50°C", unit:"°C ou K"},
      ]}
    />
  ),
  // RUNNER — Temperatura
  () => (
    <PhysicsRunner
      character={2}
      title="🏃 Física Runner — Temperatura!"
      questions={[
        {question:"O zero absoluto equivale a:", correct:"-273,15°C", wrongs:["0°C","-100°C"]},
        {question:"K = °C +", correct:"273,15", wrongs:["100","32"]},
        {question:"100°C em Fahrenheit é:", correct:"212°F", wrongs:["100°F","373°F"]},
        {question:"Temperatura mede:", correct:"Energia cinética média das partículas", wrongs:["Quantidade de calor","Massa do objeto"]},
      ]}
    />
  ),
  // ERROS COMUNS
  () => (
    <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
      <span className="text-xs font-black tracking-widest text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">⚠️ ERROS COMUNS NO ENEM</span>
      <h2 className="text-3xl font-black text-slate-100 mt-4 mb-5">Armadilhas de Temperatura</h2>
      <div className="space-y-4">
        {[
          {trap:"Confundir calor e temperatura", wrong:"'200°C tem mais calor que 100°C' — ERRADO!", right:"Uma piscina a 30°C tem MAIS energia total que uma xícara a 100°C. Temperatura ≠ quantidade de calor."},
          {trap:"Usar Celsius em fórmulas termodinâmicas", wrong:"Boyle: P₁V₁=P₂V₂ com T em °C — ERRADO!", right:"Leis dos gases e termodinâmica EXIGEM T em Kelvin. Sempre converta: K = °C + 273,15."},
          {trap:"Achar que zero absoluto é 0°C", wrong:"'A geladeira está no zero absoluto a 0°C' — ERRADO!", right:"Zero absoluto = 0 K = −273,15°C. 0°C é apenas o ponto de fusão da água."},
        ].map((e,i) => (
          <div key={i} className="bg-slate-900 border border-rose-500/20 rounded-2xl p-5">
            <div className="font-black text-rose-300 text-sm mb-2">🪤 {e.trap}</div>
            <div className="bg-rose-950/30 rounded-xl p-3 text-xs text-rose-400 mb-2">❌ {e.wrong}</div>
            <div className="bg-emerald-950/30 rounded-xl p-3 text-xs text-emerald-300">✅ {e.right}</div>
          </div>
        ))}
      </div>
    </div>
  ),
  () => {
    const [stars, setStars] = useState(0);
    return (
      <div className="flex flex-col items-center justify-center min-h-[68vh] text-center animate-in fade-in zoom-in">
        <div className="text-7xl mb-4">🏆</div>
        <h1 className="text-4xl font-black text-white mb-3">Semana 1 Concluída!</h1>
        <p className="text-xl text-slate-400 max-w-lg mx-auto mb-5">Temperatura dominada! Próxima semana: Escalas e conversões na prática.</p>
        <div className="flex gap-2 justify-center mb-5">{[1,2,3,4,5].map(n=><button key={n} onClick={()=>setStars(n)} className={`text-3xl hover:scale-125 transition-all ${n<=stars?"text-amber-400":"text-slate-700"}`}>★</button>)}</div>
        <Link to="/fisica2/sem2" className="px-8 py-3 bg-orange-600 hover:bg-orange-500 text-white font-black rounded-2xl transition-all text-lg">Próxima Semana →</Link>
      </div>
    );
  },
];

// ═════════ SEM 2 — Escalas Termométricas ═════════
const SEM2: React.FC[] = [
  () => (
    <div className="flex flex-col items-center justify-center min-h-[68vh] text-center animate-in fade-in zoom-in duration-700">
      <span className="bg-orange-500/20 text-orange-400 font-bold px-4 py-1.5 rounded-full text-xs tracking-widest border border-orange-500/30">FÍSICA 2 · SEMANA 2</span>
      <div className="text-8xl my-6">📐</div>
      <h1 className="text-5xl md:text-6xl font-black text-white leading-none mb-4">Escalas<br /><span className="text-orange-400">Termométricas</span></h1>
      <p className="text-xl text-slate-400 mb-6 max-w-xl">Celsius, Fahrenheit, Kelvin e Rankine. Por que existem tantas? Como nasce uma escala termométrica do zero?</p>
      <div className="flex gap-3 flex-wrap justify-center text-sm">
        {["📐 Pontos fixos","🔄 Conversão °C↔K↔°F","📏 Escala Réaumur","🌡️ Construindo um termômetro"].map(t => (
          <div key={t} className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-xl text-slate-300">{t}</div>
        ))}
      </div>
    </div>
  ),
  () => {
    const [sel, setSel] = useState<"C"|"K"|"F">("C");
    const [val, setVal] = useState(100);
    const toC = sel==="C"?val:sel==="K"?val-273.15:(val-32)*5/9;
    const C=toC, K=toC+273.15, F=toC*9/5+32;
    return (
      <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
        <h2 className="text-4xl font-black text-slate-100 mb-4">🔄 Conversor Interativo</h2>
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 mb-4">
          <div className="flex gap-2 mb-4">{(["C","K","F"] as const).map(s=><button key={s} onClick={()=>setSel(s)} className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all ${sel===s?"border-orange-500 bg-orange-950/30 text-orange-300":"border-slate-700 text-slate-400"}`}>°{s}</button>)}</div>
          <label className="text-xs font-bold text-slate-400 block mb-1">Valor em °{sel}: <span className="text-orange-300">{val}</span></label>
          <input type="range" min={sel==="K"?0:sel==="C"?-273:sel==="F"?-460:-460} max={sel==="K"?1500:sel==="C"?1227:sel==="F"?2240:1500} value={val} onChange={e=>setVal(+e.target.value)} className="w-full accent-orange-400"/>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[[C.toFixed(2),"°C","Celsius","bg-orange-950/30 border-orange-500/30 text-orange-300"],[K.toFixed(2),"K","Kelvin","bg-blue-950/30 border-blue-500/30 text-blue-300"],[F.toFixed(2),"°F","Fahrenheit","bg-rose-950/30 border-rose-500/30 text-rose-300"]].map(([v,u,n,cls])=>(
            <div key={n} className={`border rounded-2xl p-3 text-center ${cls}`}><div className="text-xs font-black opacity-70 mb-1">{n}</div><div className="text-2xl font-black">{v}{u}</div></div>
          ))}
        </div>
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-slate-500 space-y-1">
          <p>• K = °C + 273,15</p><p>• °F = °C × 9/5 + 32</p><p>• °C = (°F − 32) × 5/9</p>
        </div>
      </div>
    );
  },
  () => (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-4xl font-black text-slate-100 mb-5">📏 Como se Constrói uma Escala?</h2>
      <div className="space-y-4 mb-5">
        {[
          {n:"1",t:"Escolher dois pontos fixos",d:"Celsius: fusão do gelo (0°C) e ebulição da água (100°C) a 1 atm. Referências reproduzíveis em qualquer laboratório do mundo.",c:"border-blue-500/30 bg-blue-950/10"},
          {n:"2",t:"Dividir em partes iguais",d:"Entre 0 e 100°C há 100 divisões iguais. Cada divisão = 1°C = 1K (Kelvin tem mesma amplitude de divisão que Celsius).",c:"border-orange-500/30 bg-orange-950/10"},
          {n:"3",t:"Escolher propriedade termométrica",d:"Expansão de mercúrio, resistência elétrica (termistor), pressão do gás, bimetálico. Deve variar linearmente (ou previsivelmente) com T.",c:"border-emerald-500/30 bg-emerald-950/10"},
          {n:"4",t:"Calibrar e validar",d:"Testar nos pontos fixos e em pontos intermediários conhecidos. Se consistente — a escala é válida e reprodutível.",c:"border-violet-500/30 bg-violet-950/10"},
        ].map((s,i)=>(
          <div key={i} className={`border rounded-2xl p-4 flex gap-4 ${s.c}`}>
            <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0 font-black text-orange-300">{s.n}</div>
            <div><p className="font-bold text-slate-100 text-sm">{s.t}</p><p className="text-slate-400 text-xs mt-1">{s.d}</p></div>
          </div>
        ))}
      </div>
    </div>
  ),
  () => <Quiz n={1} total={2} q="Converter 77°F para Celsius e Kelvin:" opts={["25°C e 298,15 K","45°C e 318,15 K","25°C e 248,15 K","32°C e 305 K"]} correct={0} exp="✅ A — °C = (77−32)×5/9 = 45×5/9 = 25°C. K = 25+273,15 = 298,15 K." />,
  () => <Quiz n={2} total={2} q="A escala Kelvin tem como ponto zero:" opts={["O congelamento da água","O zero absoluto, onde cessa o movimento molecular","A temperatura do ambiente padrão","O ponto de ebulição do nitrogênio líquido"]} correct={1} exp="✅ B — 0 K = zero absoluto = −273,15°C. É o limite inferior teórico de temperatura." />,
  () => (
    <PixelQuiz character={0} title="🎮 Desafio das Escalas" subtitle="Pink Monster quer saber se você converteu certo!"
      questions={[
        {q:"Qual escala NÃO tem valores negativos?",opts:["Celsius","Fahrenheit","Kelvin","Réaumur"],correct:2,explanation:"Kelvin começa em 0 K (zero absoluto) e só sobe. Celsius e Fahrenheit têm valores negativos abaixo dos pontos fixos!"},
        {q:"Se °C e K têm a mesma amplitude de grau, qual a diferença entre 100°C e 100 K?",opts:["Nenhuma","373,15 K é 100°C e 100 K é −173,15°C","São iguais só em Fahrenheit","Kelvin não mede as mesmas temperaturas"],correct:1,explanation:"100°C = 373,15 K. 100 K = −173,15°C. Mesma 'distância' entre graus, mas origens diferentes: Celsius começa em 0°C=273,15K."},
      ]}
    />
  ),
  () => (
    <ENEMQuestion year={2022} difficulty="médio"
      context="Uma geladeira padrão mantém o compartimento interno a −5°C. A temperatura ambiente exterior é de 30°C. Um físico afirma que essa geladeira opera como uma máquina térmica reversa, absorvendo calor do interior frio e liberando calor no exterior quente."
      question="Convertendo as temperaturas para Kelvin, qual é o rendimento máximo teórico (Carnot) de uma geladeira que opere entre essas temperaturas COMO máquina térmica (ignorando sua operação reversa)?"
      options={[
        {letter:"A", text:"η = 1 − 268/303 ≈ 11,6%"},
        {letter:"B", text:"η = 1 − 303/268 ≈ −13% (impossível — T_fria < T_quente)"},
        {letter:"C", text:"η = 1 − 30/(-5) = impossível"},
        {letter:"D", text:"η = (-5+30)/30 ≈ 83,3%"},
        {letter:"E", text:"η = 268/303 ≈ 88,4%"},
      ]}
      correct="A"
      resolution="Primeiro converta: T_fria = −5+273 = 268 K; T_quente = 30+273 = 303 K. Para uma máquina de Carnot entre essas temperaturas: η = 1 − T_fria/T_quente = 1 − 268/303 ≈ 0,116 = 11,6%. IMPORTANTE: sempre converter para Kelvin nas fórmulas termodinâmicas!"
    />
  ),
  () => (
    <FormulaFlashcard title="🃏 Fórmulas — Escalas" color="orange"
      cards={[
        {front:"K = °C + 273,15", back:"Celsius → Kelvin", example:"0°C = 273,15 K"},
        {front:"°F = °C×9/5 + 32", back:"Celsius → Fahrenheit", example:"0°C = 32°F"},
        {front:"°C = (°F−32)×5/9", back:"Fahrenheit → Celsius", example:"212°F = 100°C"},
      ]}
    />
  ),
  () => {
    const [stars, setStars] = useState(0);
    return (
      <div className="flex flex-col items-center justify-center min-h-[68vh] text-center animate-in fade-in zoom-in">
        <div className="text-7xl mb-4">🏆</div>
        <h1 className="text-4xl font-black text-white mb-3">Semana 2 Concluída!</h1>
        <p className="text-xl text-slate-400 max-w-lg mx-auto mb-5">Escalas dominadas! Próxima semana: Calor como energia em trânsito.</p>
        <div className="flex gap-2 justify-center mb-5">{[1,2,3,4,5].map(n=><button key={n} onClick={()=>setStars(n)} className={`text-3xl hover:scale-125 transition-all ${n<=stars?"text-amber-400":"text-slate-700"}`}>★</button>)}</div>
        <Link to="/fisica2/sem3" className="px-8 py-3 bg-orange-600 hover:bg-orange-500 text-white font-black rounded-2xl transition-all text-lg">Próxima Semana →</Link>
      </div>
    );
  },
];

// ═════════ SEM 3 — Calor & Propagação ═════════
const SEM3: React.FC[] = [
  () => (
    <div className="flex flex-col items-center justify-center min-h-[68vh] text-center animate-in fade-in zoom-in duration-700">
      <span className="bg-orange-500/20 text-orange-400 font-bold px-4 py-1.5 rounded-full text-xs tracking-widest border border-orange-500/30">FÍSICA 2 · SEMANA 3</span>
      <div className="text-8xl my-6">🔥</div>
      <h1 className="text-5xl md:text-6xl font-black text-white leading-none mb-4">Calor como<br /><span className="text-rose-400">Energia em Trânsito</span></h1>
      <p className="text-xl text-slate-400 mb-6 max-w-xl">Calor não é uma substância. É energia viajando de um lugar para o outro. Como funciona? Por que café esfria mais rápido em copo de metal?</p>
      <div className="flex gap-3 flex-wrap justify-center text-sm">
        {["🔥 Q = calor","🌊 Condução","💨 Convecção","☀️ Irradiação"].map(t => (
          <div key={t} className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-xl text-slate-300">{t}</div>
        ))}
      </div>
    </div>
  ),
  () => (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-4xl font-black text-slate-100 mb-5">🔥 Calor vs. Temperatura — A Diferença</h2>
      <div className="grid md:grid-cols-2 gap-5 mb-5">
        <div className="bg-rose-950/20 border-2 border-rose-500/30 rounded-3xl p-6">
          <h3 className="font-black text-rose-300 text-xl mb-3">🔥 Calor (Q)</h3>
          <p className="text-slate-300 text-sm mb-3">Energia em <strong>trânsito</strong> entre dois sistemas com temperaturas diferentes. Flui sempre do mais quente para o mais frio.</p>
          <p className="text-slate-500 text-xs">Unidade: Joule (J) ou caloria (cal). 1 cal = 4,186 J</p>
        </div>
        <div className="bg-orange-950/20 border-2 border-orange-500/30 rounded-3xl p-6">
          <h3 className="font-black text-orange-300 text-xl mb-3">🌡️ Temperatura (T)</h3>
          <p className="text-slate-300 text-sm mb-3">Medida da energia cinética <strong>média</strong> das partículas. É uma propriedade do estado do sistema.</p>
          <p className="text-slate-500 text-xs">Unidade: Kelvin (K), Celsius (°C)</p>
        </div>
      </div>
      <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-4 text-sm text-amber-200">
        🎯 <strong>Insight:</strong> Uma panela enorme de água a 60°C tem muito mais energia interna que uma gota d'água a 100°C — mas a gota está mais "quente". Calor e temperatura são conceitos diferentes!
      </div>
    </div>
  ),
  () => {
    const [active, setActive] = useState(0);
    const props = [
      {t:"🌊 Condução",d:"Transferência por contato direto. Partículas mais agitadas 'empurram' as vizinhas. Ex: pegar em colher metálica quente.",ex:"Ferro de solda, aquecimento de frio, ferro de passar roupa",c:"border-rose-500/30 bg-rose-950/10"},
      {t:"💨 Convecção",d:"Transferência por movimento de massa de fluido (líquido ou gás). Fluido mais quente sobe, mais frio desce — cria correntes.",ex:"Radiadores domésticos, circulação oceânica, brisa marinha",c:"border-sky-500/30 bg-sky-950/10"},
      {t:"☀️ Irradiação",d:"Emissão de ondas eletromagnéticas (infravermelho). Não precisa de meio — funciona no vácuo.",ex:"Calor solar, lâmpada incandescente, câmera térmica",c:"border-amber-500/30 bg-amber-950/10"},
    ];
    return (
      <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
        <h2 className="text-4xl font-black text-slate-100 mb-4">3 Formas de Propagação do Calor</h2>
        <div className="flex gap-3 mb-4">{props.map((p,i)=><button key={i} onClick={()=>setActive(i)} className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all ${active===i?p.c:"border-slate-700 text-slate-400"}`}>{p.t}</button>)}</div>
        <div className={`border-2 rounded-3xl p-6 mb-4 animate-in fade-in ${props[active].c}`}>
          <h3 className="text-2xl font-black text-slate-100 mb-3">{props[active].t}</h3>
          <p className="text-slate-300 mb-3">{props[active].d}</p>
          <div className="bg-slate-900/50 rounded-xl p-3"><p className="text-xs font-bold text-slate-400 mb-1">EXEMPLOS:</p><p className="text-slate-300 text-sm">{props[active].ex}</p></div>
        </div>
      </div>
    );
  },
  () => <Quiz n={1} total={2} q="Por que o Sol aquece a Terra mesmo com o vácuo do espaço entre eles?" opts={["Condução através das partículas do vácuo","Convecção de gases solares chegando à Terra","Irradiação — ondas eletromagnéticas (infravermelho e luz)","O espaço não é realmente vácuo"]} correct={2} exp="✅ C — Irradiação não precisa de meio material. O Sol emite ondas eletromagnéticas (incluindo infravermelho e luz visível) que viajam pelo vácuo e aquecem a Terra." />,
  () => <Quiz n={2} total={2} q="Ao misturar 100g de água a 80°C com 100g de água a 20°C, a temperatura final de equilíbrio será:" opts={["80°C","20°C","50°C","100°C"]} correct={2} exp="✅ C — Massas iguais do mesmo material: T_eq = (T1+T2)/2 = (80+20)/2 = 50°C. O calor flui do quente para o frio até equalizar." />,
  () => (
    <PixelQuiz character={1} title="🎮 Desafio: Calor!" subtitle="Owlet Monster quer testar seu conhecimento!"
      questions={[
        {q:"Qual mecanismo de propagação NÃO precisa de matéria?",opts:["Condução","Convecção","Irradiação","Todos precisam"],correct:2,explanation:"Irradiação usa ondas eletromagnéticas — funciona no vácuo. Condução e convecção PRECISAM de meio material."},
        {q:"Café esfria mais rápido em copo de metal que em copo de isopor. Por quê?",opts:["Metal conduz mais calor para fora","Isopor é mais pesado","Metal retém mais calor","O formato do copo importa mais"],correct:0,explanation:"Metal é ótimo condutor térmico — transfere calor do café para o ambiente rapidamente. Isopor é isolante — retém o calor dentro. Por isso caixas de isopor mantêm coisas geladas!"},
      ]}
    />
  ),
  () => (
    <ENEMQuestion year={2021} difficulty="fácil"
      context="Durante um incêndio florestal, a fumaça e os gases quentes sobem rapidamente para as camadas mais altas da atmosfera. Brigadistas em solo sentem calor intenso mesmo a certa distância das chamas, sem contato direto com o fogo."
      question="Considerando os mecanismos de propagação de calor, quais mecanismos estão presentes respectivamente na subida dos gases quentes e no calor sentido pelos brigadistas a distância?"
      options={[
        {letter:"A", text:"Condução e Irradiação"},
        {letter:"B", text:"Convecção e Condução"},
        {letter:"C", text:"Convecção e Irradiação"},
        {letter:"D", text:"Irradiação e Condução"},
        {letter:"E", text:"Condução e Convecção"},
      ]}
      correct="C"
      resolution="A subida de gases quentes é CONVECÇÃO — transferência por movimento de massa de fluido mais quente (menos denso) subindo. O calor sentido a distância sem contato é IRRADIAÇÃO — ondas eletromagnéticas (infravermelho) emitidas pelo fogo chegando aos brigadistas sem precisar de meio material. Gabarito: C."
    />
  ),
  () => (
    <FormulaFlashcard title="🃏 Calor & Propagação" color="rose"
      cards={[
        {front:"Q = m · c · ΔT", back:"Calor sensível — aquece sem mudar estado", example:"2kg água, ΔT=50°C → Q=418.600J", unit:"J ou cal"},
        {front:"1 cal = 4,186 J", back:"Conversão entre caloria e Joule", example:"Caloria nutricional = 1 kcal = 4186 J"},
        {front:"Q flui quente→frio", back:"2ª Lei da Termodinâmica (sentido espontâneo)", example:"Gelo em copo de água → absorve Q do ambiente"},
      ]}
    />
  ),
  () => {
    const [stars, setStars] = useState(0);
    return (
      <div className="flex flex-col items-center justify-center min-h-[68vh] text-center animate-in fade-in zoom-in">
        <div className="text-7xl mb-4">🏆</div>
        <h1 className="text-4xl font-black text-white mb-3">Semana 3 Concluída!</h1>
        <p className="text-xl text-slate-400 max-w-lg mx-auto mb-5">Propagação do calor dominada! Próxima: Calorimetria e calor específico.</p>
        <div className="flex gap-2 justify-center mb-5">{[1,2,3,4,5].map(n=><button key={n} onClick={()=>setStars(n)} className={`text-3xl hover:scale-125 transition-all ${n<=stars?"text-amber-400":"text-slate-700"}`}>★</button>)}</div>
        <Link to="/fisica2/sem4" className="px-8 py-3 bg-orange-600 hover:bg-orange-500 text-white font-black rounded-2xl transition-all text-lg">Próxima Semana →</Link>
      </div>
    );
  },
];

// ═════════ SEM 4 — Calorimetria ═════════
const SEM4: React.FC[] = [
  () => (
    <div className="flex flex-col items-center justify-center min-h-[68vh] text-center animate-in fade-in zoom-in duration-700">
      <span className="bg-orange-500/20 text-orange-400 font-bold px-4 py-1.5 rounded-full text-xs tracking-widest border border-orange-500/30">FÍSICA 2 · SEMANA 4</span>
      <div className="text-8xl my-6">⚗️</div>
      <h1 className="text-5xl md:text-6xl font-black text-white leading-none mb-4">Calorimetria:<br /><span className="text-yellow-400">Calor Sensível</span></h1>
      <p className="text-xl text-slate-400 mb-6 max-w-xl">Q = m·c·ΔT. Uma fórmula que explica por que o mar não esquenta tanto quanto a areia — e muito mais.</p>
      <div className="flex gap-3 flex-wrap justify-center text-sm">
        {["Q = m·c·ΔT","🏖️ Areia vs. Mar","⚗️ Calorímetro","🔥 Calor específico"].map(t => (
          <div key={t} className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-xl text-slate-300">{t}</div>
        ))}
      </div>
    </div>
  ),
  () => (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-4xl font-black text-slate-100 mb-5">⚗️ Calor Sensível</h2>
      <div className="bg-slate-950 border-2 border-yellow-500/30 rounded-3xl p-6 text-center mb-5">
        <code className="text-3xl font-mono font-black text-yellow-300">Q = m · c · ΔT</code>
        <p className="text-slate-500 text-sm mt-2">Q = calor (J) · m = massa (kg) · c = calor específico (J/kg·°C) · ΔT = variação de temperatura (°C ou K)</p>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {[{sym:"m",n:"Massa",u:"kg",d:"Quanto maior a massa, mais calor necessário para a mesma variação.",c:"text-amber-300 border-amber-500/30 bg-amber-950/20"},
          {sym:"c",n:"Calor específico",u:"J/(kg·°C)",d:"Propriedade do material. Água tem c = 4186 J/(kg·°C) — um dos maiores!",c:"text-orange-300 border-orange-500/30 bg-orange-950/20"},
          {sym:"ΔT",n:"Variação de T",u:"°C ou K",d:"ΔT = T_final − T_inicial. Se negativo, o corpo perdeu calor.",c:"text-rose-300 border-rose-500/30 bg-rose-950/20"}].map((t,i)=>(
          <div key={i} className={`border rounded-2xl p-5 text-center ${t.c}`}>
            <code className="text-4xl font-black">{t.sym}</code>
            <div className="font-bold my-1">{t.n}</div>
            <div className="text-xs opacity-70 mb-2">{t.u}</div>
            <p className="text-sm opacity-80 text-left">{t.d}</p>
          </div>
        ))}
      </div>
    </div>
  ),
  () => {
    const [m, setM] = useState(1); const [c_, setC_] = useState(4186); const [dT, setDT] = useState(20);
    const Q = m * c_ * dT;
    const commonC = [{n:"Água",v:4186},{n:"Alumínio",v:897},{n:"Ferro",v:450},{n:"Areia",v:840},{n:"Cobre",v:385}];
    return (
      <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
        <h2 className="text-4xl font-black text-slate-100 mb-4">🧮 Calculadora de Calor Sensível</h2>
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 mb-4 space-y-3">
          <div><label className="text-xs font-bold text-slate-400 block mb-1">Massa m: <span className="text-amber-300">{m} kg</span></label><input type="range" min={0.1} max={10} step={0.1} value={m} onChange={e=>setM(+e.target.value)} className="w-full accent-amber-400"/></div>
          <div><label className="text-xs font-bold text-slate-400 block mb-1">ΔT: <span className="text-rose-300">{dT} °C</span></label><input type="range" min={1} max={100} value={dT} onChange={e=>setDT(+e.target.value)} className="w-full accent-rose-400"/></div>
          <div><label className="text-xs font-bold text-slate-400 block mb-2">Material (c em J/kg·°C):</label><div className="flex gap-2 flex-wrap">{commonC.map(x=><button key={x.n} onClick={()=>setC_(x.v)} className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all ${c_===x.v?"border-orange-500 bg-orange-950/30 text-orange-300":"border-slate-700 text-slate-400"}`}>{x.n} ({x.v})</button>)}</div></div>
        </div>
        <div className="bg-yellow-950/30 border border-yellow-500/30 rounded-2xl p-5 text-center">
          <div className="text-xs font-black text-yellow-400 mb-1">CALOR NECESSÁRIO</div>
          <div className="text-4xl font-black text-yellow-300">{Q >= 1000 ? (Q/1000).toFixed(2)+" kJ" : Q.toFixed(0)+" J"}</div>
          <div className="text-slate-500 text-xs mt-2">{m}kg × {c_} × {dT}°C = {Q.toFixed(0)} J</div>
        </div>
      </div>
    );
  },
  () => (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <span className="text-xs font-black tracking-widest text-violet-400 bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20">ANALOGIA</span>
      <h2 className="text-4xl font-black text-slate-100 mt-4 mb-5">🏖️ Por que Areia Esquenta e Mar não?</h2>
      <div className="grid md:grid-cols-2 gap-5 mb-5">
        <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-5">
          <h3 className="font-black text-amber-300 text-xl mb-2">🏖️ Areia</h3>
          <p className="text-slate-300 text-sm mb-2">c ≈ 840 J/(kg·°C) — calor específico menor</p>
          <p className="text-slate-400 text-sm">Recebe a mesma quantidade de energia solar que a água mas esquenta <strong className="text-amber-200">muito mais</strong>. Por isso queima o pé na praia!</p>
        </div>
        <div className="bg-sky-950/20 border border-sky-500/30 rounded-2xl p-5">
          <h3 className="font-black text-sky-300 text-xl mb-2">🌊 Água do Mar</h3>
          <p className="text-slate-300 text-sm mb-2">c ≈ 3900 J/(kg·°C) — calor específico alto</p>
          <p className="text-slate-400 text-sm">Absorve <strong className="text-sky-200">muito mais energia</strong> para variar a mesma temperatura. Por isso o mar regula o clima costeiro!</p>
        </div>
      </div>
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-sm text-slate-400">
        🌍 <strong className="text-slate-200">Climatologia:</strong> O alto calor específico da água é responsável pelo clima marítimo mais ameno (verões frescos, invernos suaves) vs. o clima continental mais extremo (verões quentes, invernos frios).
      </div>
    </div>
  ),
  () => <Quiz n={1} total={2} q="Quantos Joules são necessários para aquecer 2 kg de água de 20°C a 70°C? (c_água = 4186 J/kg·°C)" opts={["41.860 J","418.600 J","83.720 J (incorreto — confundiu ΔT)","418.600 J ≈ 418,6 kJ"]} correct={3} exp="✅ D — Q = m·c·ΔT = 2 × 4186 × (70−20) = 2 × 4186 × 50 = 418.600 J = 418,6 kJ." />,
  () => <Quiz n={2} total={2} q="A água tem calor específico muito maior que o ferro. Isso significa que:" opts={["Água esquenta mais rápido","Água precisa de mais calor para a mesma variação de temperatura","Ferro é melhor condutor","Água é mais densa"]} correct={1} exp="✅ B — Q = m·c·ΔT. Maior 'c' → mais Q necessário para o mesmo ΔT. A água absorve mais calor por kg para cada grau de variação." />,
  () => (
    <PixelQuiz character={2} title="🎮 Desafio Calorimetria!" subtitle="Seu Dude Monster quer ver você calcular!"
      questions={[
        {q:"Um bloco de alumínio (c=900 J/kg·°C) de 0,5 kg esquenta de 25°C para 75°C. Quanto calor absorveu?",opts:["22.500 J","45.000 J","9.000 J","30.000 J"],correct:0,explanation:"Q = 0,5 × 900 × (75−25) = 0,5 × 900 × 50 = 22.500 J. Sempre: Q = m·c·ΔT!"},
        {q:"Se o calor específico da areia é ~840 J/kg·°C e o da água é ~4186 J/kg·°C, qual vai esquentar mais ao sol?",opts:["Água","Areia (menor c = mais ΔT p/ mesmo Q)","Os dois igual","Depende do volume"],correct:1,explanation:"ΔT = Q/(m·c). Menor 'c' → maior ΔT para o mesmo Q e m. Por isso a areia queima muito mais que a água sob o mesmo sol!"},
      ]}
    />
  ),
  () => (
    <ENEMQuestion year={2020} difficulty="difícil"
      context="Uma empresa de panelas alega que seu produto de alumínio aquece o alimento mais rapidamente que panelas de ferro. Dados: c_alumínio = 900 J/(kg·°C), c_ferro = 450 J/(kg·°C). Ambas as panelas têm massa de 1 kg e são aquecidas com a mesma potência de 500 W durante 2 minutos."
      question="Qual será a variação de temperatura ΔT de cada panela após os 2 minutos, e qual panela terá maior temperatura final?"
      options={[
        {letter:"A", text:"ΔT_Al = 67°C e ΔT_Fe = 133°C → Ferro aquece mais"},
        {letter:"B", text:"ΔT_Al = ΔT_Fe = 100°C → ambas iguais"},
        {letter:"C", text:"ΔT_Al = 133°C e ΔT_Fe = 67°C → Alumínio aquece mais"},
        {letter:"D", text:"ΔT_Al = 33°C e ΔT_Fe = 66°C → Ferro aquece mais"},
        {letter:"E", text:"ΔT_Al = 66°C e ΔT_Fe = 133°C → Ferro aquece mais"},
      ]}
      correct="A"
      resolution="Q total = P×t = 500W × 120s = 60.000 J. ΔT = Q/(m·c). ΔT_Al = 60.000/(1×900) ≈ 67°C. ΔT_Fe = 60.000/(1×450) = 133°C. O FERRO esquenta MAIS (maior ΔT) pois tem menor c — precisa de menos calor para a mesma variação. A afirmação da empresa está INCORRETA! Gabarito: A."
    />
  ),
  () => (
    <FormulaFlashcard title="🃏 Calorimetria" color="yellow"
      cards={[
        {front:"Q = m · c · ΔT", back:"Calor sensível (sem mudança de estado)", example:"1kg água, ΔT=10°C → Q=41.860J", unit:"J"},
        {front:"ΔT = Q / (m·c)", back:"Variação de temperatura", example:"c menor → ΔT maior para o mesmo Q", unit:"°C ou K"},
        {front:"c_água = 4186 J/(kg·°C)", back:"Maior calor específico dos líquidos comuns", example:"Por isso o mar regula o clima", unit:"J/(kg·°C)"},
        {front:"Q_perdido = Q_ganho", back:"Conservação de energia em trocas térmicas", example:"Calorímetro: m₁c₁ΔT₁ = m₂c₂ΔT₂", unit:""},
      ]}
    />
  ),
  () => (
    <PhysicsRunner character={0} title="🏃 Runner Calorimetria!"
      questions={[
        {question:"Q = m × c × ___ ", correct:"ΔT", wrongs:["P","V"]},
        {question:"c da Água (J/kg·°C):", correct:"4186", wrongs:["1000","450"]},
        {question:"Maior c = aquece:", correct:"Mais devagar", wrongs:["Mais rápido","Igual"]},
        {question:"Q em Joules (SI):", correct:"Joule (J)", wrongs:["Watt","Pascal"]},
      ]}
    />
  ),
  () => {
    const [stars, setStars] = useState(0);
    return (
      <div className="flex flex-col items-center justify-center min-h-[68vh] text-center animate-in fade-in zoom-in">
        <div className="text-7xl mb-4">🏆</div>
        <h1 className="text-4xl font-black text-white mb-3">Semana 4 Concluída!</h1>
        <p className="text-xl text-slate-400 max-w-lg mx-auto mb-5">Calorimetria dominada! Próxima semana: Calor Latente e mudanças de estado.</p>
        <div className="flex gap-2 justify-center mb-5">{[1,2,3,4,5].map(n=><button key={n} onClick={()=>setStars(n)} className={`text-3xl hover:scale-125 transition-all ${n<=stars?"text-amber-400":"text-slate-700"}`}>★</button>)}</div>
        <Link to="/fisica2/sem5" className="px-8 py-3 bg-orange-600 hover:bg-orange-500 text-white font-black rounded-2xl transition-all text-lg">Próxima Semana →</Link>
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

export const Fisica2NewLesson1 = makeLesson(SEM1, "Sem. 1 — Temperatura & Termometria", "Sem. 1");
export const Fisica2NewLesson2 = makeLesson(SEM2, "Sem. 2 — Escalas Termométricas", "Sem. 2");
export const Fisica2NewLesson3 = makeLesson(SEM3, "Sem. 3 — Calor como Energia", "Sem. 3");
export const Fisica2NewLesson4 = makeLesson(SEM4, "Sem. 4 — Calorimetria", "Sem. 4");
