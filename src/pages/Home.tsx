import { Telescope, Shield, Network, BrainCircuit, GraduationCap, FileText, Zap, Database } from "lucide-react";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <div 
      className="min-h-screen font-sans p-8 transition-colors duration-300"
      style={{ backgroundColor: "var(--bg-base)", color: "var(--text-primary)" }}
    >
      <div className="max-w-6xl mx-auto">
        <header 
          className="mb-12 border-b pb-8 flex items-center gap-4"
          style={{ borderColor: "var(--border-color)" }}
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
             <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
              Portal do Professor
            </h1>
            <p style={{ color: "var(--text-secondary)" }} className="text-lg mt-1">Materiais e Ambientes Interativos de Luiz Chiavini</p>
          </div>
        </header>

        {/* ETEC Section */}
        <section className="mb-16">
           <div className="flex items-center gap-3 mb-6">
              <span className="bg-rose-500/20 text-rose-400 font-bold px-3 py-1 rounded-full text-sm border border-rose-500/30">Ensino Médio</span>
              <h2 className="text-2xl font-semibold" style={{ color: "var(--text-primary)" }}>Ensino Médio e Técnico</h2>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                             {/* Card Fisica 1 */}
              <a href="/fisica1" 
                className="group relative border rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(244,63,94,0.2)] flex flex-col justify-between overflow-hidden cursor-pointer"
                style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(244,63,94,0.5)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border-color)")}
              >
                 <div className="absolute top-0 right-[-20px] p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Telescope className="w-32 h-32 text-rose-500 transform -rotate-12" />
                 </div>
                 <div className="relative z-10">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors border"
                      style={{ backgroundColor: "var(--bg-card-hover)", borderColor: "var(--border-color)" }}
                    >
                        <Telescope className="w-6 h-6 text-slate-400 group-hover:text-rose-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>Física 1</h3>
                    <p style={{ color: "var(--text-secondary)" }} className="text-sm mb-4">Mecânica Clássica e Cinemática (INFO)</p>
                 </div>
                 <div className="mt-4 bg-rose-600/10 text-rose-500 group-hover:bg-rose-600 group-hover:text-white py-2 rounded-lg font-bold w-full transition-colors flex items-center justify-center gap-2 border border-rose-500/30 group-hover:border-rose-500">
                     Ver Cronograma
                 </div>
              </a>

              {/* Card Fisica 2 */}
              <a href="/fisica2" 
                className="group relative border rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(249,115,22,0.2)] flex flex-col justify-between overflow-hidden cursor-pointer"
                style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(249,115,22,0.5)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border-color)")}
              >
                 <div className="absolute top-0 right-[-20px] p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Telescope className="w-32 h-32 text-orange-500 transform -rotate-12" />
                 </div>
                 <div className="relative z-10">
                    <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors border"
                        style={{ backgroundColor: "var(--bg-card-hover)", borderColor: "var(--border-color)" }}
                    >
                        <Telescope className="w-6 h-6 text-slate-400 group-hover:text-orange-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>Física 2</h3>
                    <p style={{ color: "var(--text-secondary)" }} className="text-sm mb-4">Termodinâmica e Eletricidade (AGRO/INFO)</p>
                 </div>
                 <div className="mt-4 bg-orange-600/10 text-orange-500 group-hover:bg-orange-600 group-hover:text-white py-2 rounded-lg font-bold w-full transition-colors flex items-center justify-center gap-2 border border-orange-500/30 group-hover:border-orange-500">
                     Ver Cronograma
                 </div>
              </a>

              {/* Card Fisica 3 */}
              <a href="/fisica3" 
                className="group relative border rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(245,158,11,0.2)] flex flex-col justify-between overflow-hidden cursor-pointer"
                style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(245,158,11,0.5)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border-color)")}
              >
                 <div className="absolute top-0 right-[-20px] p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Telescope className="w-32 h-32 text-amber-500 transform -rotate-12" />
                 </div>
                 <div className="relative z-10">
                    <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors border"
                        style={{ backgroundColor: "var(--bg-card-hover)", borderColor: "var(--border-color)" }}
                    >
                        <Telescope className="w-6 h-6 text-slate-400 group-hover:text-amber-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>Física 3</h3>
                    <p style={{ color: "var(--text-secondary)" }} className="text-sm mb-4">Eletromagnetismo e Física Quântica (AGRO)</p>
                 </div>
                 <div className="mt-4 bg-amber-600/10 text-amber-500 group-hover:bg-amber-600 group-hover:text-white py-2 rounded-lg font-bold w-full transition-colors flex items-center justify-center gap-2 border border-amber-500/30 group-hover:border-amber-500">
                     Ver Cronograma
                 </div>
              </a>
           </div>
        </section>

        {/* UNIMAX Section */}
        <section>
           <div className="flex items-center gap-3 mb-6">
              <span className="bg-blue-500/20 text-blue-400 font-bold px-3 py-1 rounded-full text-sm border border-blue-500/30">Graduação</span>
              <h2 className="text-2xl font-semibold" style={{ color: "var(--text-primary)" }}>Ensino Superior</h2>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* LFA (Active) */}
              <Link to="/lfa" 
                className="group relative border rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(59,130,246,0.2)] flex flex-col justify-between overflow-hidden cursor-pointer"
                style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(59,130,246,0.5)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border-color)")}
              >
                 <div className="absolute top-0 right-[-20px] p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <BrainCircuit className="w-32 h-32 text-blue-500 transform -rotate-12" />
                 </div>
                 <div className="relative z-10">
                    <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors border"
                        style={{ backgroundColor: "var(--bg-card-hover)", borderColor: "var(--border-color)" }}
                    >
                        <BrainCircuit className="w-6 h-6 text-slate-400 group-hover:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 leading-tight" style={{ color: "var(--text-primary)" }}>Linguagens Formais<br/>e Autômatos</h3>
                    <p style={{ color: "var(--text-secondary)" }} className="text-sm mb-4">AFD, AFN, Gramáticas Livres de Contexto e Máquina de Turing</p>
                 </div>
                 <button className="mt-4 bg-blue-600/20 text-blue-400 group-hover:bg-blue-600 group-hover:text-white py-2 rounded-lg font-bold w-full transition-colors flex items-center justify-center gap-2 border border-blue-500/30 group-hover:border-blue-500">
                     Acessar Ambiente
                 </button>
              </Link>

              {/* Seguranca */}
              <Link to="/seguranca" 
                className="group relative border rounded-2xl p-6 transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] flex flex-col justify-between overflow-hidden cursor-pointer"
                style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(16,185,129,0.5)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border-color)")}
              >
                 <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Shield className="w-24 h-24 text-emerald-500 transform rotate-12 group-hover:rotate-6 transition-transform" />
                 </div>
                 <div className="relative z-10">
                    <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors border"
                        style={{ backgroundColor: "var(--bg-card-hover)", borderColor: "var(--border-color)" }}
                    >
                        <Shield className="w-6 h-6 text-slate-500 group-hover:text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>Segurança da<br/>Informação</h3>
                    <p style={{ color: "var(--text-secondary)" }} className="text-sm mb-4">Criptografia, LGPD e Defesa Cibernética</p>
                 </div>
                 <button className="mt-4 bg-emerald-600/10 text-emerald-500 group-hover:bg-emerald-600 group-hover:text-white py-2 rounded-lg font-bold w-full transition-colors flex items-center justify-center gap-2 border border-emerald-500/30 group-hover:border-emerald-500">
                     Ver Cronograma
                 </button>
              </Link>

              {/* Redes */}
              <Link to="/redes" 
                className="group relative border rounded-2xl p-6 transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] flex flex-col justify-between overflow-hidden cursor-pointer"
                style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(59,130,246,0.5)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border-color)")}
              >
                 <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Network className="w-24 h-24 text-blue-500 transform rotate-12" />
                 </div>
                 <div className="relative z-10">
                    <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors border"
                        style={{ backgroundColor: "var(--bg-card-hover)", borderColor: "var(--border-color)" }}
                    >
                        <Network className="w-6 h-6 text-slate-500 group-hover:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>Redes<br/>Convergentes</h3>
                    <p style={{ color: "var(--text-secondary)" }} className="text-sm mb-4">Protocolos, Topologia e Infraestrutura</p>
                 </div>
                 <button className="mt-4 bg-blue-600/10 text-blue-500 group-hover:bg-blue-600 group-hover:text-white py-2 rounded-lg font-bold w-full transition-colors flex items-center justify-center gap-2 border border-blue-500/30 group-hover:border-blue-500">
                     Ver Cronograma
                 </button>
              </Link>

              {/* Analise de Dados */}
              <Link to="/data" 
                className="group relative border rounded-2xl p-6 transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] flex flex-col justify-between overflow-hidden cursor-pointer"
                style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(16,185,129,0.5)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border-color)")}
              >
                 <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Database className="w-24 h-24 text-emerald-500 transform rotate-12 group-hover:rotate-6 transition-transform" />
                 </div>
                 <div className="relative z-10">
                    <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors border"
                        style={{ backgroundColor: "var(--bg-card-hover)", borderColor: "var(--border-color)" }}
                    >
                        <Database className="w-6 h-6 text-slate-500 group-hover:text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>Análise de<br/>Dados</h3>
                    <p style={{ color: "var(--text-secondary)" }} className="text-sm mb-4">Métricas, Estatística e Tomada de Decisão</p>
                 </div>
                 <button className="mt-4 bg-emerald-600/10 text-emerald-500 group-hover:bg-emerald-600 group-hover:text-white py-2 rounded-lg font-bold w-full transition-colors flex items-center justify-center gap-2 border border-emerald-500/30 group-hover:border-emerald-500">
                     Ver Cronograma
                 </button>
              </Link>

              {/* UNIMAX IA Lecture V1 */}
              <Link to="/unimax-ia-energetica" 
                className="group relative border rounded-2xl p-6 transition-all hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] flex flex-col justify-between overflow-hidden cursor-pointer opacity-60 hover:opacity-100"
                style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}
              >
                 <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <BrainCircuit className="w-24 h-24 text-purple-500 transform rotate-12" />
                 </div>
                 <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors border border-slate-700 group-hover:border-purple-500/30">
                       <BrainCircuit className="w-6 h-6 text-slate-500 group-hover:text-purple-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 italic" style={{ color: "var(--text-primary)" }}>IA & Energia (V1)</h3>
                    <p style={{ color: "var(--text-secondary)" }} className="text-sm mb-4">Versão Interativa / Jogos</p>
                 </div>
                 <button className="mt-4 bg-purple-600/10 text-purple-500 group-hover:bg-purple-600 group-hover:text-white py-2 rounded-lg font-bold w-full transition-colors flex items-center justify-center gap-2 border border-purple-500/30 group-hover:border-purple-500">
                     Acessar V1
                 </button>
              </Link>

              {/* UNIMAX IA Lecture V2 (NEW) */}
              <Link to="/unimax-palestra-v2" 
                className="group relative border-2 rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(168,85,247,0.3)] flex flex-col justify-between overflow-hidden cursor-pointer"
                style={{ backgroundColor: "var(--bg-card)", borderColor: "rgba(168,85,247,0.3)" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(168,85,247,1)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(168,85,247,0.3)")}
              >
                 <div className="absolute -top-4 -right-4 bg-purple-600 text-white text-[10px] font-black px-4 py-3 rotate-45 z-20">NOVA</div>
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Zap className="w-24 h-24 text-purple-400 transform -rotate-12" />
                 </div>
                 <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/40">
                       <Zap className="w-6 h-6 text-white animate-pulse" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white">Palestra V2: Sustentabilidade</h3>
                    <p className="text-slate-300 text-sm mb-4">Novo roteiro fluído focado em Data Centers e impacto ambiental.</p>
                 </div>
                 <button className="mt-4 bg-purple-600 text-white py-2 rounded-lg font-black w-full transition-all group-hover:scale-[1.02] shadow-lg shadow-purple-900/40">
                     INICIAR APRESENTAÇÃO
                 </button>
              </Link>

              {/* TCC Orientation */}
              <Link to="/unimax-tcc" 
                className="group relative border rounded-2xl p-6 transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] flex flex-col justify-between overflow-hidden cursor-pointer"
                style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(16,185,129,0.5)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border-color)")}
              >
                 <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <FileText className="w-24 h-24 text-emerald-500 transform rotate-12" />
                 </div>
                 <div className="relative z-10">
                    <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors border"
                        style={{ backgroundColor: "var(--bg-card-hover)", borderColor: "var(--border-color)" }}
                    >
                        <FileText className="w-6 h-6 text-slate-500 group-hover:text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>Orientação<br/>de TCC</h3>
                    <p style={{ color: "var(--text-secondary)" }} className="text-sm mb-4">Cronograma de 8 semanas e Template Oficial</p>
                 </div>
                 <button className="mt-4 bg-emerald-600/10 text-emerald-500 group-hover:bg-emerald-600 group-hover:text-white py-2 rounded-lg font-bold w-full transition-colors flex items-center justify-center gap-2 border border-emerald-500/30 group-hover:border-emerald-500">
                     Ver Guia Completo
                 </button>
              </Link>

           </div>
        </section>

      </div>
    </div>
  );
}
