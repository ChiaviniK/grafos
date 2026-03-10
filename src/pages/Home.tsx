import { Telescope, Shield, Network, BrainCircuit, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 border-b border-slate-800 pb-8 flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
             <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
              Portal do Professor
            </h1>
            <p className="text-slate-400 text-lg mt-1">Materiais e Ambientes Interativos de Luiz Chiavini</p>
          </div>
        </header>

        {/* ETEC Section */}
        <section className="mb-16">
           <div className="flex items-center gap-3 mb-6">
              <span className="bg-rose-500/20 text-rose-400 font-bold px-3 py-1 rounded-full text-sm border border-rose-500/30">ETEC</span>
              <h2 className="text-2xl font-semibold text-slate-200">Ensino Médio e Técnico</h2>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card Fisica 1 */}
              <div className="group relative bg-slate-900 border border-slate-800 hover:border-rose-500/50 rounded-2xl p-6 transition-all hover:shadow-[0_0_30px_rgba(244,63,94,0.15)] flex flex-col justify-between overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Telescope className="w-24 h-24 text-rose-500 transform rotate-12" />
                 </div>
                 <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-4 group-hover:bg-rose-500/20 transition-colors border border-slate-700 group-hover:border-rose-500/30">
                        <Telescope className="w-6 h-6 text-slate-400 group-hover:text-rose-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Física 1</h3>
                    <p className="text-slate-400 text-sm mb-4">Mecânica Clássica e Cinemática (INFO)</p>
                 </div>
                 <button disabled className="mt-4 bg-slate-800 text-slate-500 py-2 rounded-lg font-semibold w-full cursor-not-allowed">Em Breve</button>
              </div>

              {/* Card Fisica 2 */}
              <div className="group relative bg-slate-900 border border-slate-800 hover:border-rose-500/50 rounded-2xl p-6 transition-all hover:shadow-[0_0_30px_rgba(244,63,94,0.15)] flex flex-col justify-between overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Telescope className="w-24 h-24 text-rose-500 transform rotate-12" />
                 </div>
                 <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-4 group-hover:bg-rose-500/20 transition-colors border border-slate-700 group-hover:border-rose-500/30">
                        <Telescope className="w-6 h-6 text-slate-400 group-hover:text-rose-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Física 2</h3>
                    <p className="text-slate-400 text-sm mb-4">Termodinâmica e Óptica (AGRO/INFO)</p>
                 </div>
                 <button disabled className="mt-4 bg-slate-800 text-slate-500 py-2 rounded-lg font-semibold w-full cursor-not-allowed">Em Breve</button>
              </div>

              {/* Card Fisica 3 */}
              <div className="group relative bg-slate-900 border border-slate-800 hover:border-rose-500/50 rounded-2xl p-6 transition-all hover:shadow-[0_0_30px_rgba(244,63,94,0.15)] flex flex-col justify-between overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Telescope className="w-24 h-24 text-rose-500 transform rotate-12" />
                 </div>
                 <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-4 group-hover:bg-rose-500/20 transition-colors border border-slate-700 group-hover:border-rose-500/30">
                        <Telescope className="w-6 h-6 text-slate-400 group-hover:text-rose-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Física 3</h3>
                    <p className="text-slate-400 text-sm mb-4">Eletromagnetismo (AGRO)</p>
                 </div>
                 <button disabled className="mt-4 bg-slate-800 text-slate-500 py-2 rounded-lg font-semibold w-full cursor-not-allowed">Em Breve</button>
              </div>
           </div>
        </section>

        {/* UNIMAX Section */}
        <section>
           <div className="flex items-center gap-3 mb-6">
              <span className="bg-blue-500/20 text-blue-400 font-bold px-3 py-1 rounded-full text-sm border border-blue-500/30">UNIMAX</span>
              <h2 className="text-2xl font-semibold text-slate-200">Ensino Superior</h2>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* LFA (Active) */}
              <Link to="/lfa" className="group relative bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(59,130,246,0.2)] flex flex-col justify-between overflow-hidden cursor-pointer">
                 <div className="absolute top-0 right-[-20px] p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <BrainCircuit className="w-32 h-32 text-blue-500 transform -rotate-12" />
                 </div>
                 <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors border border-slate-700 group-hover:border-blue-500/30">
                        <BrainCircuit className="w-6 h-6 text-slate-400 group-hover:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 leading-tight">Linguagens Formais<br/>e Autômatos</h3>
                    <p className="text-slate-400 text-sm mb-4">AFD, AFN, Gramáticas Livres de Contexto e Máquina de Turing</p>
                 </div>
                 <button className="mt-4 bg-blue-600/20 text-blue-400 group-hover:bg-blue-600 group-hover:text-white py-2 rounded-lg font-bold w-full transition-colors flex items-center justify-center gap-2 border border-blue-500/30 group-hover:border-blue-500">
                     Acessar Ambiente
                 </button>
              </Link>

              {/* Seguranca */}
              <div className="group relative bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-6 transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] flex flex-col justify-between overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Shield className="w-24 h-24 text-blue-500 transform rotate-12" />
                 </div>
                 <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors border border-slate-700 group-hover:border-blue-500/30">
                        <Shield className="w-6 h-6 text-slate-500 group-hover:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Segurança da<br/>Informação</h3>
                    <p className="text-slate-500 text-sm mb-4">Criptografia e Proteção de Dados</p>
                 </div>
                 <button disabled className="mt-4 bg-slate-800 text-slate-500 py-2 rounded-lg font-semibold w-full cursor-not-allowed">Em Breve</button>
              </div>

              {/* Redes */}
              <div className="group relative bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-6 transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] flex flex-col justify-between overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Network className="w-24 h-24 text-blue-500 transform rotate-12" />
                 </div>
                 <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors border border-slate-700 group-hover:border-blue-500/30">
                        <Network className="w-6 h-6 text-slate-500 group-hover:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Redes<br/>Convergentes</h3>
                    <p className="text-slate-500 text-sm mb-4">Protocolos, Topologia e Infraestrutura</p>
                 </div>
                 <button disabled className="mt-4 bg-slate-800 text-slate-500 py-2 rounded-lg font-semibold w-full cursor-not-allowed">Em Breve</button>
              </div>

           </div>
        </section>

      </div>
    </div>
  );
}
