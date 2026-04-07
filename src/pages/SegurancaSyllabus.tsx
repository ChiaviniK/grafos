import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, PenTool, Award, Shield, Server, Lock, Eye, Cloud, Code } from "lucide-react";

interface SyllabusItem {
  id: number;
  date: string;
  title: string;
  type: "teoria" | "pratica" | "prova" | "projeto" | "fechamento";
  status: "available" | "locked" | "external";
  link?: string;
  description?: string;
}

const SYLLABUS: SyllabusItem[] = [
  { id: 1, date: "03/02", title: "Intro e Engenharia Social", type: "teoria", status: "locked" },
  { id: 2, date: "10/02", title: "Hashing e Integridade", type: "teoria", status: "locked" },
  { id: 3, date: "24/02", title: "Normas e Governança", type: "teoria", status: "locked" },
  { id: 4, date: "03/03", title: "Scanning de Redes", type: "pratica", status: "locked" },
  { id: 5, date: "10/03", title: "Agentes de IA e DevSec", type: "teoria", status: "available", link: "/seguranca/aula5", description: "Google Antigravity, Agentes na Prática e Human-in-the-Loop." },
  { id: 6, date: "17/03", title: "Avaliação AP1", type: "prova", status: "locked" },
  { id: 7, date: "24/03", title: "Criptografia Clássica", type: "teoria", status: "available", link: "/seguranca/aula7", description: "Cifras históricas, Análise de Frequência e a Máquina Enigma." },
  { id: 8, date: "31/03", title: "Força de Senhas", type: "pratica", status: "available", link: "/seguranca/aula8" },
  { id: 9, date: "07/04", title: "Segurança Web (SQLi)", type: "pratica", status: "available", link: "/seguranca/aula9", description: "Bypass de login e ataques de injeção em bancos de dados." },
  { id: 10, date: "14/04", title: "Cripto Assimétrica", type: "teoria", status: "locked" },
  { id: 11, date: "28/04", title: "Análise de Tráfego", type: "pratica", status: "locked" },
  { id: 12, date: "05/05", title: "Segurança em Nuvem", type: "teoria", status: "locked" },
  { id: 13, date: "12/05", title: "Malware e Defesa", type: "teoria", status: "locked" },
  { id: 14, date: "19/05", title: "Avaliação AP2", type: "prova", status: "locked" },
  { id: 15, date: "26/05", title: "Segurança de APIs", type: "pratica", status: "locked" },
  { id: 16, date: "02/06", title: "Auditoria e LGPD", type: "teoria", status: "locked" },
  { id: 17, date: "09/06", title: "Feedback e Devolutiva", type: "fechamento", status: "locked" },
  { id: 18, date: "16/06", title: "Prova Substitutiva", type: "prova", status: "locked" },
  { id: 19, date: "23/06", title: "Fechamento", type: "fechamento", status: "locked" },
];

const getTypeIcon = (type: SyllabusItem["type"], title: string) => {
  if (title.includes("SQLi") || title.includes("API")) return <Code className="w-5 h-5" />;
  if (title.includes("Nuvem")) return <Cloud className="w-5 h-5" />;
  if (title.includes("Rede") || title.includes("Tráfego")) return <Server className="w-5 h-5" />;
  if (title.includes("Cripto") || title.includes("Senha") || title.includes("Hashing")) return <Lock className="w-5 h-5" />;
  if (title.includes("Auditoria") || title.includes("Normas") || title.includes("Scanning")) return <Eye className="w-5 h-5" />;

  switch (type) {
    case "teoria": return <BookOpen className="w-5 h-5" />;
    case "pratica": return <Shield className="w-5 h-5" />;
    case "prova": return <PenTool className="w-5 h-5" />;
    case "projeto": return <Award className="w-5 h-5" />;
    case "fechamento": return <Award className="w-5 h-5" />;
  }
};

const getTypeColor = (type: SyllabusItem["type"]) => {
  switch (type) {
    case "teoria": return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
    case "pratica": return "text-blue-400 bg-blue-500/10 border-blue-500/20";
    case "prova": return "text-rose-400 bg-rose-500/10 border-rose-500/20";
    case "projeto": return "text-amber-400 bg-amber-500/10 border-amber-500/20";
    case "fechamento": return "text-purple-400 bg-purple-500/10 border-purple-500/20";
  }
};

export function SegurancaSyllabus() {
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
             <Shield className="w-48 h-48 text-emerald-500 transform rotate-12" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-emerald-600/20 flex flex-shrink-0 items-center justify-center border border-emerald-500/30">
               <Lock className="w-10 h-10 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                 <span className="bg-blue-500/20 text-blue-400 font-bold px-3 py-1 rounded-full text-xs tracking-wider border border-blue-500/30">UNIMAX</span>
                 <span className="text-slate-400 text-sm">Quintas-Feiras</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-100">
                Segurança da Informação
              </h1>
              <p className="text-slate-400 text-lg mt-2 font-medium">Cronograma Oficial (Fevereiro - Junho)</p>
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
                     item.status === 'locked' ? 'bg-slate-700' : 'bg-emerald-500'
                  }`}></div>
                </div>
                
                {/* Card */}
                {item.status === "available" ? (
                  <Link to={item.link!} className={`flex-1 bg-slate-900 border border-emerald-500/30 hover:border-emerald-400 rounded-2xl p-5 md:p-6 transition-all hover:shadow-[0_4px_20px_rgba(16,185,129,0.15)] flex flex-col md:flex-row md:items-center justify-between gap-4 group-hover:-translate-y-0.5`}>
                    <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${getTypeColor(item.type)}`}>
                            {getTypeIcon(item.type, item.title)}
                        </div>
                        <div>
                            <div className="text-sm font-bold text-emerald-400 mb-1">{item.date}</div>
                            <h3 className="text-xl font-bold text-slate-100 mb-1">{item.title}</h3>
                            {item.description && <p className="text-slate-400 text-sm">{item.description}</p>}
                        </div>
                    </div>
                    <div className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold border border-emerald-500 flex items-center gap-2 shrink-0">
                        Acessar Material
                    </div>
                  </Link>
                ) : (
                  <div className={`flex-1 bg-slate-900/40 border border-slate-800 rounded-2xl p-5 md:p-6 opacity-80 hover:opacity-100 transition-opacity flex flex-col md:flex-row md:items-center justify-between gap-4`}>
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-slate-800 bg-slate-800/50 text-slate-500`}>
                            {getTypeIcon(item.type, item.title)}
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                               <div className="text-sm font-bold text-slate-500">{item.date}</div>
                               <div className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 hidden sm:block">AULA {item.id}</div>
                            </div>
                            <h3 className={`text-lg font-bold ${item.type === 'prova' ? 'text-rose-400/80' : 'text-slate-300'} mb-1`}>{item.title}</h3>
                        </div>
                    </div>
                    <div className="text-slate-600 font-semibold px-4 flex items-center gap-2">
                        {item.type === 'prova' ? 'Agendado' : 'Em Breve'}
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
