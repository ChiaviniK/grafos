import { Users, FlaskConical, BookOpen } from "lucide-react";

const GROUPS = [
  { id: 1, title: "NPCs de Jogos (Game AI)", color: "violet", slide: "Slide 7" },
  { id: 2, title: "Mudanças Climáticas (Big Data)", color: "sky", slide: "Slide 8" },
  { id: 3, title: "Mercado Financeiro (Crypto)", color: "amber", slide: "Slide 9" },
  { id: 4, title: "Genômica / DNA", color: "emerald", slide: "Slide 10" },
  { id: 5, title: "Smart Contracts / DAO", color: "orange", slide: "Slide 11" },
  { id: 6, title: "Cidades Inteligentes", color: "cyan", slide: "Slide 12" },
  { id: 7, title: "Cibersegurança (DPI)", color: "rose", slide: "Slide 13" },
  { id: 8, title: "Ética em IA (LLMs)", color: "fuchsia", slide: "Slide 14" },
];

const colorMap: Record<string, string> = {
  violet: "bg-violet-500/10 border-violet-500/40 text-violet-400",
  sky: "bg-sky-500/10 border-sky-500/40 text-sky-400",
  amber: "bg-amber-500/10 border-amber-500/40 text-amber-400",
  emerald: "bg-emerald-500/10 border-emerald-500/40 text-emerald-400",
  orange: "bg-orange-500/10 border-orange-500/40 text-orange-400",
  cyan: "bg-cyan-500/10 border-cyan-500/40 text-cyan-400",
  rose: "bg-rose-500/10 border-rose-500/40 text-rose-400",
  fuchsia: "bg-fuchsia-500/10 border-fuchsia-500/40 text-fuchsia-400",
};

export function LFASlide8_6() {
  return (
    <div className="flex flex-col min-h-[100%] flex-1 animate-in fade-in duration-500">
      <div className="mb-6 text-center">
        <div className="inline-flex items-center gap-2 mb-3 px-4 py-2 bg-fuchsia-500/10 border border-fuchsia-500/30 rounded-full">
          <Users className="w-5 h-5 text-fuchsia-400" />
          <span className="text-fuchsia-400 font-black text-sm uppercase tracking-widest">Pesquisa em Grupo</span>
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight mb-3 text-slate-100">
          Atividade de <span className="text-fuchsia-400">Pesquisa Aplicada</span>
        </h2>
        <p className="text-slate-400 text-base max-w-3xl mx-auto leading-relaxed">
          Cada grupo irá pesquisar como os conceitos de <strong className="text-white">AFN-ε e Expressões Regulares</strong> se
          aplicam a um domínio real e disruptivo, produzindo um relatório científico com código explicativo.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {GROUPS.map(g => (
          <div key={g.id} className={`border-2 rounded-2xl p-4 flex flex-col gap-2 ${colorMap[g.color]}`}>
            <div className="flex items-center justify-between">
              <span className="font-black text-2xl opacity-30">G{g.id}</span>
              <span className="text-[10px] font-bold uppercase opacity-60">{g.slide}</span>
            </div>
            <p className="font-bold text-sm leading-tight">{g.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-start gap-3">
          <FlaskConical className="w-6 h-6 text-fuchsia-400 shrink-0 mt-1" />
          <div>
            <p className="font-bold text-white mb-1">Entregável</p>
            <p className="text-slate-500 text-sm">Relatório (2–4 páginas) com formalização matemática, código funcional e análise de resultados.</p>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-start gap-3">
          <BookOpen className="w-6 h-6 text-sky-400 shrink-0 mt-1" />
          <div>
            <p className="font-bold text-white mb-1">Referências Sugeridas</p>
            <p className="text-slate-500 text-sm">IEEE Xplore, arXiv, ACM DL. Pesquisas aceitas para publicação científica no contexto APEX.</p>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-start gap-3">
          <Users className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
          <div>
            <p className="font-bold text-white mb-1">Apresentação</p>
            <p className="text-slate-500 text-sm">10 minutos de apresentação + 5 de debates. Um membro apresenta o código ao vivo.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
