export function LFASlide8_11() {
  return (
    <div className="flex flex-col min-h-[100%] flex-1 animate-in fade-in duration-500">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-orange-500/20 border border-orange-500/40 rounded-2xl flex items-center justify-center text-xl font-black text-orange-300">G5</div>
        <div>
          <p className="text-orange-400 font-black text-xs uppercase tracking-widest">Pesquisa — Grupo 5</p>
          <h2 className="text-2xl font-extrabold text-slate-100">Classificação de Pulsares e Trânsitos de Exoplanetas com Regex sobre Telemetria</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        <div className="space-y-4">
          <div className="bg-slate-900 border border-orange-500/20 rounded-2xl p-5">
            <h3 className="text-orange-400 font-bold text-sm uppercase tracking-wider mb-3">Contexto e Motivação</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Telescópios como <strong className="text-white">Kepler e TESS</strong> geram curvas de luz de estrelas —
              séries temporais de luminosidade. Ao discretizar quedas de brilho em símbolos
              (<strong className="text-white">H=High, M=Medium, D=Dip, L=Low</strong>), obtemos strings sobre um alfabeto finito.
              Trânsitos de exoplanetas produzem padrões periódicos (<code className="text-orange-300 text-xs">H*DH*DH*</code>)
              enquanto pulsares geram pulsos regulares. Ambos são <strong className="text-white">linguagens regulares</strong>
              reconhecíveis por AFN-ε — abrindo um caminho computacionalmente eficiente para triagem
              em catálogos com milhões de estrelas.
            </p>
          </div>

          <div className="bg-slate-900 border border-orange-500/20 rounded-2xl p-5">
            <h3 className="text-orange-400 font-bold text-sm uppercase tracking-wider mb-3">Questão de Pesquisa</h3>
            <p className="text-slate-300 text-sm leading-relaxed italic">
              "Padrões periódicos de queda de luminosidade de exoplanetas e pulsares podem ser
              formalizados como Expressões Regulares e detectados por AFN-ε construídos via Thompson?
              Qual a taxa de falsos positivos em relação a variáveis estelares intrínsecas (RR Lyrae, Cefeidas)?"
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
            <h3 className="text-slate-400 font-bold text-sm uppercase tracking-wider mb-3">Referências Sugeridas</h3>
            <ul className="text-slate-500 text-xs space-y-1">
              <li>• Borucki et al. (2010). Kepler Planet-Detection Mission: Introduction and First Results. Science.</li>
              <li>• Pearson et al. (2018). Searching for Exoplanets using Artificial Intelligence. MNRAS.</li>
              <li>• Dataset: NASA Exoplanet Archive / MAST (publico). Kaggle: Kepler Labelled Time Series.</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 flex-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
              <span className="text-orange-400 text-xs font-black uppercase tracking-widest">Código de Exemplo (Python)</span>
            </div>
            <pre className="text-xs font-mono text-slate-300 leading-relaxed overflow-auto">{`import re
import math

# Alfabeto de luminosidade estelar:
# H=High (>1.005), M=Medium (0.995-1.005),
# D=Dip (0.99-0.995), L=Low (<0.99)

def discretize_flux(flux_values, baseline=1.0):
    """Converte fluxo de luz em simbolos de estado"""
    symbols = []
    for f in flux_values:
        ratio = f / baseline
        if ratio > 1.005:
            symbols.append('H')
        elif ratio >= 0.995:
            symbols.append('M')
        elif ratio >= 0.990:
            symbols.append('D')
        else:
            symbols.append('L')
    return ''.join(symbols)

# Curvas de luz simuladas (simplificadas)
light_curves = {
    "Kepler-22b (exoplaneta)":
        "MMMHMMMDMMMMHMMMDMMMMHMMMD",    # Transito periodico
    "Sol variavel (estrela)":
        "MMHMMMHMMMHMMMHLMMHLMMHLMM",    # Pulsacao irregular
    "Pulsar PSR-sim":
        "MMMMMHMMMMMHMMMMMHMMMMMH",      # Picos periodicos
    "Cefeida (variavel)":
        "MHHHHHHMMMLLLLMMMMHHHHHHMM",    # Ciclo lento
    "Ruido cosmico":
        "MMHMMMLMMMHMLMMLMMHMMMMLMM",    # Sem padrao
}

# Expressoes Regulares para fenomenos astronomicos
ASTRO_PATTERNS = {
    "Transito de Exoplaneta": r'M*(D|L){1,3}M{4,}(D|L){1,3}M{4,}(D|L)',
    "Pulsar (pico regular)":  r'M{4,}H{1,2}M{4,}H{1,2}M{4,}H',
    "Estrela Variavel":       r'(H{3,}M{2,}L{2,}){2,}',
    "Microlente Gravitacional": r'M+H{5,}M+',  # Pico unico simetrico
}

print("Classificador Astronomico via AFN-epsilon")
print("=" * 50)

for star_name, curve in light_curves.items():
    print(f"\\nEstrela: {star_name}")
    print(f"Curva:   {curve}")
    found = []
    for phenomenon, pattern in ASTRO_PATTERNS.items():
        if re.search(pattern, curve):
            found.append(phenomenon)
    if found:
        for f in found:
            print(f"  CLASSIFICADO: {f}")
    else:
        print(f"  Inconclusivo / Ruido")`}</pre>
          </div>
          <div className="bg-orange-950/20 border border-orange-500/30 rounded-2xl p-4">
            <p className="text-orange-300 text-xs font-bold mb-1">📌 Entregável Esperado</p>
            <p className="text-slate-400 text-xs">Aplicar o pipeline no dataset Kepler (NASA, público no Kaggle), construir o AFN-ε via Thompson para
            pelo menos 2 fenômenos astronômicos, e comparar a taxa de detecção com o classificador baseline do paper de Pearson et al. (2018).</p>
          </div>
        </div>
      </div>
    </div>
  );
}
