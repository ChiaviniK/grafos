import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Presentation, Code, PenTool, Award, ExternalLink, ShieldCheck } from "lucide-react";

interface SyllabusItem {
  id: number;
  title: string;
  type: "teoria" | "pratica" | "prova" | "projeto" | "fechamento";
  status: "available" | "locked" | "external";
  link?: string;
  description?: string;
}

const SYLLABUS: SyllabusItem[] = [
  { id: 1, title: "Introdução e Conceitos", type: "teoria", status: "external", description: "O que são linguagens formais e sua aplicação na computação.", link: "#" },
  { id: 2, title: "Teoria dos Conjuntos", type: "teoria", status: "external", description: "Base matemática para linguagens formais.", link: "#" },
  { id: 3, title: "Conceitos de Gramáticas", type: "teoria", status: "external", description: "Alfabetos, cadeias e produções.", link: "#" },
  { id: 4, title: "Autômatos Finitos (AFD)", type: "pratica", status: "available", description: "Simulador interativo de Estados e Transições (Mini-jogos).", link: "/lfa/aula4" },
  { id: 5, title: "Avaliação P1", type: "prova", status: "locked" },
  { id: 6, title: "Aprofundamento AFD", type: "teoria", status: "available", link: "/lfa/aula6", description: "Definição formal, minimização e jogos interativos." },
  { id: 7, title: "Autômatos Não Det. (AFN)", type: "teoria", status: "locked" },
  { id: 8, title: "AFN-ε e Expressões Reg.", type: "teoria", status: "locked" },
  { id: 9, title: "Revisão e Lab Prático", type: "pratica", status: "locked" },
  { id: 10, title: "Avaliação P2", type: "prova", status: "locked" },
  { id: 11, title: "Autômato com Pilha", type: "teoria", status: "locked" },
  { id: 12, title: "Gramáticas Livres Contexto", type: "teoria", status: "locked" },
  { id: 13, title: "Máquina de Turing", type: "teoria", status: "locked" },
  { id: 14, title: "Hierarquia de Chomsky", type: "teoria", status: "locked" },
  { id: 15, title: "Prova Substitutiva", type: "prova", status: "locked" },
  { id: 16, title: "Apresentação APEX", type: "projeto", status: "locked" },
  { id: 17, title: "Reforço e Lab", type: "pratica", status: "locked" },
  { id: 18, title: "Fechamento de Médias", type: "fechamento", status: "locked" },
  { id: 19, title: "Encerramento", type: "fechamento", status: "locked" },
];

const getTypeIcon = (type: SyllabusItem["type"]) => {
  switch (type) {
    case "teoria": return <BookOpen className="w-5 h-5" />;
    case "pratica": return <Code className="w-5 h-5" />;
    case "prova": return <PenTool className="w-5 h-5" />;
    case "projeto": return <Presentation className="w-5 h-5" />;
    case "fechamento": return <Award className="w-5 h-5" />;
  }
};

const getTypeColor = (type: SyllabusItem["type"]) => {
  switch (type) {
    case "teoria": return "text-blue-400 bg-blue-500/10 border-blue-500/20";
    case "pratica": return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
    case "prova": return "text-rose-400 bg-rose-500/10 border-rose-500/20";
    case "projeto": return "text-amber-400 bg-amber-500/10 border-amber-500/20";
    case "fechamento": return "text-purple-400 bg-purple-500/10 border-purple-500/20";
  }
};

export function LFASyllabus() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Navigation */}
        <div className="flex items-center gap-4 mb-8">
          <Link 
            to="/"
            className="flex items-center gap-2 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 px-4 py-2 rounded-xl border border-slate-800 transition-colors"
          >
             <ArrowLeft className="w-5 h-5" />
             Painel UNIMAX
          </Link>
        </div>

        {/* Hero Section */}
        <header className="mb-12 bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
             <ShieldCheck className="w-48 h-48 text-blue-500 transform rotate-12" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-blue-600/20 flex flex-shrink-0 items-center justify-center border border-blue-500/30">
               <BookOpen className="w-10 h-10 text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                 <span className="bg-blue-500/20 text-blue-400 font-bold px-3 py-1 rounded-full text-xs tracking-wider border border-blue-500/30">UNIMAX</span>
                 <span className="text-slate-400 text-sm">Carga Horária: 80h</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-100">
                Linguagens Formais e Autômatos
              </h1>
              <p className="text-slate-400 text-lg mt-2 font-medium">Cronograma Oficial de Aulas e Avaliações</p>
            </div>
          </div>
        </header>

        {/* Syllabus List */}
        <div className="space-y-4 relative">
           {/* Timeline Line */}
           <div className="absolute left-[23px] top-4 bottom-4 w-0.5 bg-slate-800 hidden md:block"></div>

           {SYLLABUS.map((item) => (
             <div key={item.id} className="relative flex items-start gap-6 group">
                {/* Timeline Node */}
                <div className="hidden md:flex flex-col items-center mt-4">
                  <div className={`w-3 h-3 rounded-full border-2 border-slate-950 shadow-[0_0_0_4px_theme(colors.slate.950)] z-10 ${
                     item.status === 'locked' ? 'bg-slate-700' : 'bg-blue-500'
                  }`}></div>
                </div>
                
                {/* Card */}
                {item.status === "available" ? (
                  <Link to={item.link!} className={`flex-1 bg-slate-900 border border-blue-500/30 hover:border-blue-400 rounded-2xl p-5 md:p-6 transition-all hover:shadow-[0_4px_20px_rgba(59,130,246,0.15)] flex flex-col md:flex-row md:items-center justify-between gap-4 group-hover:-translate-y-0.5`}>
                    <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${getTypeColor(item.type)}`}>
                            {getTypeIcon(item.type)}
                        </div>
                        <div>
                            <div className="text-sm font-bold text-blue-400 mb-1">AULA {item.id}</div>
                            <h3 className="text-xl font-bold text-slate-100 mb-1">{item.title}</h3>
                            {item.description && <p className="text-slate-400 text-sm">{item.description}</p>}
                        </div>
                    </div>
                    <div className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold border border-blue-500 flex items-center gap-2 shrink-0">
                        Acessar Aula Completa
                    </div>
                  </Link>
                ) : item.status === "external" ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className={`flex-1 bg-slate-900/80 border border-slate-700 hover:border-slate-500 rounded-2xl p-5 md:p-6 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4`}>
                    <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${getTypeColor(item.type)}`}>
                            {getTypeIcon(item.type)}
                        </div>
                        <div>
                            <div className="text-sm font-bold text-slate-500 mb-1">AULA {item.id}</div>
                            <h3 className="text-xl font-bold text-slate-100 mb-1">{item.title}</h3>
                            {item.description && <p className="text-slate-400 text-sm">{item.description}</p>}
                        </div>
                    </div>
                    <div className="bg-slate-800 text-slate-300 px-5 py-2.5 rounded-xl font-semibold border border-slate-700 flex items-center gap-2 shrink-0 hover:bg-slate-700 transition-colors">
                        Slides Externos <ExternalLink className="w-4 h-4" />
                    </div>
                  </a>
                ) : (
                  <div className={`flex-1 bg-slate-900/40 border border-slate-800 rounded-2xl p-5 md:p-6 opacity-60 flex flex-col md:flex-row md:items-center justify-between gap-4`}>
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-slate-800 bg-slate-800/50 text-slate-600`}>
                            {getTypeIcon(item.type)}
                        </div>
                        <div>
                            <div className="text-sm font-bold text-slate-600 mb-1">{item.type === 'prova' || item.type === 'fechamento' ? 'MÓDULO' : 'AULA'} {item.id}</div>
                            <h3 className="text-lg font-bold text-slate-400 mb-1">{item.title}</h3>
                        </div>
                    </div>
                    <div className="text-slate-600 font-semibold px-4 flex items-center gap-2">
                        Bloqueado
                    </div>
                  </div>
                )}
             </div>
           ))}
        </div>

      </div>
    </div>
  );
}
