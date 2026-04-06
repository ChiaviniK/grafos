import { Link } from "react-router-dom";
import { Award, ArrowRight, BookOpen } from "lucide-react";

export function LFASlide8_15() {
  return (
    <div className="flex flex-col min-h-[100%] flex-1 items-center justify-center animate-in fade-in duration-500">
      <div className="text-center space-y-8 max-w-3xl mx-auto">
        <div className="w-24 h-24 mx-auto bg-fuchsia-500/10 rounded-full border-2 border-fuchsia-500/30 flex items-center justify-center">
          <Award className="w-12 h-12 text-fuchsia-400" />
        </div>

        <div>
          <div className="inline-block mb-3 px-3 py-1 bg-fuchsia-500/10 text-fuchsia-400 text-xs font-black tracking-widest uppercase rounded-full border border-fuchsia-500/30">
            ENCERRAMENTO — AULA 8
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
            AUTÔMATOS ALÉM<br />DA TEORIA.
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Nesta aula, você viu como o AFN-ε e as Expressões Regulares não são apenas
            abstrações matemáticas — são a <strong className="text-white">infraestrutura invisível</strong> que
            alimenta compiladores, buscadores de genes, motores de segurança e sistemas de IA.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h4 className="text-fuchsia-400 font-bold text-sm uppercase tracking-wider mb-2">Conceitos Vistos</h4>
            <ul className="text-slate-400 text-sm space-y-1">
              <li>• Transições-ε e Fecho-ε</li>
              <li>• Conversão AFN-ε → AFD</li>
              <li>• Operações de Linguagens Regulares</li>
              <li>• Algoritmo de Thompson</li>
            </ul>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h4 className="text-sky-400 font-bold text-sm uppercase tracking-wider mb-2">Próximas Aulas</h4>
            <ul className="text-slate-400 text-sm space-y-1">
              <li>• Aula 9: Revisão e Lab Prático</li>
              <li>• Aula 10: Avaliação P2</li>
              <li>• Aula 11: Autômato com Pilha</li>
              <li>• Aula 13: Máquina de Turing</li>
            </ul>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h4 className="text-emerald-400 font-bold text-sm uppercase tracking-wider mb-2">Leitura Recomendada</h4>
            <ul className="text-slate-400 text-sm space-y-1">
              <li>• Sipser — "Introduction to the Theory of Computation", Cap. 1–2</li>
              <li>• Cox — "Regular Expression Matching" (artigo online, gratuito)</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            to="/lfa"
            className="inline-flex items-center gap-3 bg-slate-900 border border-slate-800 text-white px-8 py-4 rounded-2xl hover:bg-slate-800 transition-all font-bold"
          >
            <BookOpen className="w-5 h-5" />
            VOLTAR AO SYLLABUS
          </Link>
          <Link
            to="/lfa"
            className="inline-flex items-center gap-3 bg-fuchsia-600 text-white font-black px-10 py-4 rounded-2xl hover:scale-105 transition-transform shadow-2xl shadow-fuchsia-900/40 group"
          >
            PRÓXIMA AULA
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
