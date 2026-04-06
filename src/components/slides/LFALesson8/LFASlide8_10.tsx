export function LFASlide8_10() {
  return (
    <div className="flex flex-col min-h-[100%] flex-1 animate-in fade-in duration-500">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl flex items-center justify-center text-xl font-black text-emerald-300">G4</div>
        <div>
          <p className="text-emerald-400 font-black text-xs uppercase tracking-widest">Pesquisa — Grupo 4</p>
          <h2 className="text-2xl font-extrabold text-slate-100">Manutenção Preditiva de Robôs Industriais com AFN-ε em Logs de Sensores</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        <div className="space-y-4">
          <div className="bg-slate-900 border border-emerald-500/20 rounded-2xl p-5">
            <h3 className="text-emerald-400 font-bold text-sm uppercase tracking-wider mb-3">Contexto e Motivação</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Robôs CNC e braços industriais (ex: KUKA, Fanuc) geram logs contínuos de sensores:
              temperatura, vibração, corrente e posição. Ao <strong className="text-white">discretizar</strong> esses sinais em
              estados simbólicos (<strong className="text-white">N=Normal, W=Warning, C=Critical, E=Error, R=Recovery</strong>),
              obtemos uma string de eventos de máquina. Padrões precursores de falha — como vibração
              crescente seguida de superaquecimento — são <strong className="text-white">linguagens regulares</strong>
              detectáveis antes da quebra (Predictive Maintenance).
            </p>
          </div>

          <div className="bg-slate-900 border border-emerald-500/20 rounded-2xl p-5">
            <h3 className="text-emerald-400 font-bold text-sm uppercase tracking-wider mb-3">Questão de Pesquisa</h3>
            <p className="text-slate-300 text-sm leading-relaxed italic">
              "É possível construir via Thompson um AFN-ε que reconheça, em O(n), sequências de
              eventos de sensor que precedem falhas conhecidas em robôs industriais, superando
              abordagens baseadas em janelas deslizantes de ML em latência e interpretabilidade?"
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
            <h3 className="text-slate-400 font-bold text-sm uppercase tracking-wider mb-3">Referências Sugeridas</h3>
            <ul className="text-slate-500 text-xs space-y-1">
              <li>• Lee et al. (2006). Intelligent prognostics tools and e-maintenance. Computers in Industry.</li>
              <li>• Jardine et al. (2006). A review on machinery diagnostics and prognostics implementing CBM. Mech. Systems.</li>
              <li>• Dataset: NASA CMAPSS Turbofan Engine Degradation (pubblico, Kaggle/NASA).</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 flex-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-emerald-400 text-xs font-black uppercase tracking-widest">Código de Exemplo (Python)</span>
            </div>
            <pre className="text-xs font-mono text-slate-300 leading-relaxed overflow-auto">{`import re
import random

# Alfabeto de estados do robo industrial:
# N=Normal, W=Warning, C=Critical, E=Error, R=Recovery

def discretize_sensor(temp, vibration, current):
    """Converte leituras de sensor em simbolo de estado"""
    if temp > 90 or vibration > 8.0:
        return 'C'   # Critical
    elif temp > 75 or vibration > 5.0 or current > 95:
        return 'W'   # Warning
    elif temp < 30 and vibration < 1.0:
        return 'R'   # Recovery / resfriamento
    else:
        return 'N'   # Normal

# Simular sequencia de leituras de sensor (10 horas)
random.seed(42)
readings = []
for hour in range(120):  # 1 leitura por meia hora
    # Degradacao gradual simulada
    t = 50 + hour * 0.4 + random.uniform(-5, 5)
    v = 1.0 + hour * 0.06 + random.uniform(-0.5, 1.5)
    c = 70 + hour * 0.2 + random.uniform(-3, 3)
    readings.append(discretize_sensor(t, v, c))

log = ''.join(readings)
print(f"Log de sensor: {log}")
print(f"Distribuicao: N={log.count('N')} W={log.count('W')} C={log.count('C')}\\n")

# Padroes precursores de falha como Expressoes Regulares
FAILURE_PATTERNS = {
    "Pre-falha termica":        r'W{3,}C{2,}',
    "Degradacao progressiva":   r'N*W{2,}C{2,}E',
    "Ciclo critico":            r'(WC){3,}',
    "Sobreaquecimento critico": r'C{5,}',
    "Recuperacao insuficiente": r'C{2,}R{1,2}C{2,}',
}

print("Analise de Manutencao Preditiva:")
alert_raised = False
for name, pattern in FAILURE_PATTERNS.items():
    match = re.search(pattern, log)
    if match:
        print(f"  ALERTA [{name}]")
        print(f"  Detectado na posicao {match.start()}: '{match.group()}'")
        print(f"  Acionar manutencao preventiva AGORA!")
        alert_raised = True

if not alert_raised:
    print("  Sistema operando normalmente.")
    remaining = len(re.findall(r'W', log))
    print(f"  Desgaste acumulado: {remaining} eventos de aviso")`}</pre>
          </div>
          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-4">
            <p className="text-emerald-300 text-xs font-bold mb-1">📌 Entregável Esperado</p>
            <p className="text-slate-400 text-xs">Aplicar o pipeline nos dados NASA CMAPSS (públicos), construir o AFN-ε via Thompson para 3+ padrões precursores,
            e comparar a antecedência de alerta (em ciclos) com métodos de ML como LSTM — demonstrando a vantagem de interpretabilidade.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
