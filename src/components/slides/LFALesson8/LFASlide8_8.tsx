export function LFASlide8_8() {
  return (
    <div className="flex flex-col min-h-[100%] flex-1 animate-in fade-in duration-500">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-sky-500/20 border border-sky-500/40 rounded-2xl flex items-center justify-center text-xl font-black text-sky-300">G2</div>
        <div>
          <p className="text-sky-400 font-black text-xs uppercase tracking-widest">Pesquisa — Grupo 2</p>
          <h2 className="text-2xl font-extrabold text-slate-100">Detecção de Anomalias Climáticas via Expressões Regulares</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        <div className="space-y-4">
          <div className="bg-slate-900 border border-sky-500/20 rounded-2xl p-5">
            <h3 className="text-sky-400 font-bold text-sm uppercase tracking-wider mb-3">Contexto e Motivação</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Séries temporais de temperatura global (datasets do NOAA, ERA5) podem ser
              <strong className="text-white"> convertidas em sequências de símbolos discretos</strong> via discretização
              (ex: 'H'=hot, 'N'=normal, 'C'=cold). Expressões Regulares aplicadas a essas sequências
              permitem detectar padrões anômalos como ondas de calor persistentes em O(n).
            </p>
          </div>

          <div className="bg-slate-900 border border-sky-500/20 rounded-2xl p-5">
            <h3 className="text-sky-400 font-bold text-sm uppercase tracking-wider mb-3">Questão de Pesquisa</h3>
            <p className="text-slate-300 text-sm leading-relaxed italic">
              "Pode-se formalizar padrões de anomalia climática (ondas de calor, El Niño, La Niña)
              como linguagens regulares, e construir via Thompson um AFN-ε com complexidade linear
              para varredura em datasets de grande escala?"
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
            <h3 className="text-slate-400 font-bold text-sm uppercase tracking-wider mb-3">Referências Sugeridas</h3>
            <ul className="text-slate-500 text-xs space-y-1">
              <li>• IPCC AR6 (2021). Climate Change Report — Data Appendix.</li>
              <li>• Manber &amp; Myers (1993). Suffix Arrays: A New Method for On-Line String Searches.</li>
              <li>• Cox, R. (2007). Regular Expression Matching Can Be Simple And Fast.</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 flex-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse" />
              <span className="text-sky-400 text-xs font-black uppercase tracking-widest">Código de Exemplo (Python)</span>
            </div>
            <pre className="text-xs font-mono text-slate-300 leading-relaxed overflow-auto">{`import re
import numpy as np

# Dataset fictício de temperaturas mensais (°C anomaly)
temperatures = [0.2, 0.5, 1.2, 1.8, 2.1, 1.9, 0.8,
                -0.3, -0.8, -1.2, -0.5, 0.1, 0.3,
                1.5, 2.3, 2.8, 3.1, 2.9, 2.6]

def discretize(temps, hot_thresh=1.0, cold_thresh=-0.5):
    """Converte série temporal em alfabeto simbólico"""
    symbols = []
    for t in temps:
        if t >= hot_thresh:
            symbols.append('H')   # Hot anomaly
        elif t <= cold_thresh:
            symbols.append('C')   # Cold anomaly
        else:
            symbols.append('N')   # Normal
    return ''.join(symbols)

series = discretize(temperatures)
print(f"Série simbólica: {series}")

# Expressões Regulares para padrões climáticos
patterns = {
    'Onda de Calor (3+ meses)': r'H{3,}',
    'La Niña persistente':       r'C{3,}',
    'El Niño iniciando':         r'NH{2,}',
    'Transição brusca':          r'H{2,}C{2,}|C{2,}H{2,}',
}

for name, pattern in patterns.items():
    matches = list(re.finditer(pattern, series))
    status = f"{len(matches)} ocorrência(s)" if matches else "Não detectado"
    print(f"  {name:30s} → {status}")

# Usando AFN via Thompson (biblioteca interna do Python)
# re.compile() já usa Thompson internamente!
heatwave = re.compile(r'H{5,}')  # Onda extrema (5+ meses)
if heatwave.search(series):
    print("⚠ ALERTA: Onda de calor extrema detectada!")`}</pre>
          </div>
          <div className="bg-sky-950/20 border border-sky-500/30 rounded-2xl p-4">
            <p className="text-sky-300 text-xs font-bold mb-1">📌 Entregável Esperado</p>
            <p className="text-slate-400 text-xs">Aplicar o pipeline em dados reais do NOAA/ERA5, construir o AFN-ε via Thompson para um padrão de anomalia
            e medir a complexidade computacional em relação ao tamanho da série temporal.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
