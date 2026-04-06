import { Zap, GitBranch, Cpu } from "lucide-react";

export function LFASlide8_1() {
  return (
    <div className="flex flex-col min-h-[100%] flex-1 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="inline-block mb-4 px-3 py-1 bg-fuchsia-500/10 text-fuchsia-400 text-xs font-black tracking-widest uppercase rounded-full border border-fuchsia-500/30">
            Aula 8 — AFN-ε e Expressões Regulares
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight mb-4 text-slate-100">
            O Poder do <span className="text-fuchsia-400">Vazio</span>
          </h2>
          <p className="text-slate-300 text-lg mb-6 leading-relaxed">
            O <strong className="text-white">AFN com Transições-ε</strong> (AFN-ε) é uma extensão
            poderosa do autômato não-determinístico. A inovação central: uma máquina que pode{" "}
            <strong className="text-fuchsia-300">mudar de estado sem ler nenhum símbolo</strong> da entrada.
          </p>

          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
              <Zap className="w-5 h-5 text-fuchsia-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-bold text-sm">Transição-ε (Epsilon)</p>
                <p className="text-slate-400 text-sm mt-1">
                  Representada pelo símbolo ε, é uma "teletransportação" instantânea — o autômato
                  se move para outro estado gratuitamente, sem consumir input.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
              <GitBranch className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-bold text-sm">Poder Igual ao AFN</p>
                <p className="text-slate-400 text-sm mt-1">
                  Teoricamente, o AFN-ε reconhece a <strong>mesma classe de linguagens</strong> que
                  AFDs e AFNs — as linguagens regulares. O ganho é na expressividade e facilidade
                  de construção.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
              <Cpu className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-bold text-sm">Ponte para Expressões Regulares</p>
                <p className="text-slate-400 text-sm mt-1">
                  O AFN-ε é o bloco fundamental do <strong>Algoritmo de Thompson</strong> —
                  que converte qualquer Regex diretamente em um autômato executável.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold text-slate-100 border-b border-slate-700 pb-2">
            Comparação: AFN vs AFN-ε
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5">
              <h4 className="text-sky-400 font-bold text-sm mb-3 uppercase tracking-wider">AFN Clássico</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li className="flex items-start gap-2"><span className="text-slate-500 shrink-0">→</span>Transições por símbolo do alfabeto</li>
                <li className="flex items-start gap-2"><span className="text-slate-500 shrink-0">→</span>Pode ter múltiplos destinos por símbolo</li>
                <li className="flex items-start gap-2"><span className="text-slate-500 shrink-0">→</span>Estados "mortos" por ausência de transição</li>
              </ul>
            </div>
            <div className="bg-fuchsia-950/30 border border-fuchsia-500/40 rounded-2xl p-5">
              <h4 className="text-fuchsia-400 font-bold text-sm mb-3 uppercase tracking-wider">AFN-ε (Novo)</h4>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li className="flex items-start gap-2"><span className="text-fuchsia-400 shrink-0">→</span>Transições por símbolo <strong>ou por ε</strong></li>
                <li className="flex items-start gap-2"><span className="text-fuchsia-400 shrink-0">→</span>Teletransporta para múltiplos estados</li>
                <li className="flex items-start gap-2"><span className="text-fuchsia-400 shrink-0">→</span>Fundamental para compiladores (Regex)</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-br from-fuchsia-950/30 to-slate-900 border border-fuchsia-500/30 rounded-2xl p-6">
            <h4 className="text-fuchsia-300 font-bold mb-2 text-sm uppercase tracking-wider">Definição Formal</h4>
            <p className="text-slate-300 font-mono text-sm leading-loose">
              AFN-ε = (Q, Σ, δ, q₀, F)<br />
              onde: <span className="text-fuchsia-300">δ : Q × (Σ ∪ {'{'} ε {'}'}) → 𝒫(Q)</span>
            </p>
            <p className="text-slate-500 text-xs mt-2">
              A função δ agora aceita ε como entrada válida, retornando um conjunto de estados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
