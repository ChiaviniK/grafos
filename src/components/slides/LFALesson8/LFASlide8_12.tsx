export function LFASlide8_12() {
  return (
    <div className="flex flex-col min-h-[100%] flex-1 animate-in fade-in duration-500">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-cyan-500/20 border border-cyan-500/40 rounded-2xl flex items-center justify-center text-xl font-black text-cyan-300">G6</div>
        <div>
          <p className="text-cyan-400 font-black text-xs uppercase tracking-widest">Pesquisa — Grupo 6</p>
          <h2 className="text-2xl font-extrabold text-slate-100">Transições-ε em Redes de Petri para Controle de Tráfego Urbano</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        <div className="space-y-4">
          <div className="bg-slate-900 border border-cyan-500/20 rounded-2xl p-5">
            <h3 className="text-cyan-400 font-bold text-sm uppercase tracking-wider mb-3">Contexto e Motivação</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Semáforos inteligentes em cidades (ex: Curitiba, Amsterdam) operam como sistemas de
              eventos discretos. <strong className="text-white">Redes de Petri</strong> são uma extensão de autômatos que modela
              concorrência. As <strong className="text-white">transições silenciosas (τ)</strong> em Redes de Petri são
              formalmente equivalentes às transições-ε em AFN-ε, permitindo modelar mudanças de fase
              de sinal sem evento externo (ex: timeout automático).
            </p>
          </div>

          <div className="bg-slate-900 border border-cyan-500/20 rounded-2xl p-5">
            <h3 className="text-cyan-400 font-bold text-sm uppercase tracking-wider mb-3">Questão de Pesquisa</h3>
            <p className="text-slate-300 text-sm leading-relaxed italic">
              "As transições silenciosas (τ) em Redes de Petri que modelam semáforos adaptativos são
              formalmente equivalentes às transições-ε de um AFN-ε? Como essa equivalência pode ser
              usada para verificar formalmente a ausência de deadlock em cruzamentos inteligentes?"
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
            <h3 className="text-slate-400 font-bold text-sm uppercase tracking-wider mb-3">Referências Sugeridas</h3>
            <ul className="text-slate-500 text-xs space-y-1">
              <li>• Peterson, J.L. (1981). Petri Net Theory and the Modeling of Systems.</li>
              <li>• Cassandras &amp; Lafortune (2008). Introduction to Discrete Event Systems, 2nd Ed.</li>
              <li>• van der Aalst (1998). The Application of Petri Nets to Workflow Management. J. Circuits, Systems and Computers.</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 flex-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-cyan-400 text-xs font-black uppercase tracking-widest">Código de Exemplo (Python)</span>
            </div>
            <pre className="text-xs font-mono text-slate-300 leading-relaxed overflow-auto">{`# Simulação simplificada de semáforo adaptativo
# Equivalência entre transições τ e ε

class TrafficLightAFN_epsilon:
    """
    Modela um semáforo como AFN-ε.
    Transições ε = timeouts (sem evento externo).
    Transições normais = sensores de veículos.
    """
    def __init__(self):
        # (estado, símbolo) → conjunto de próximos estados
        # ε = transição automática por timeout
        self.delta = {
            ('RED',    'ε'):       {'RED_YELLOW'},   # Timeout automático
            ('RED',    'sensor'):  {'RED'},            # Sensor sem efeito no red
            ('RED_YELLOW', 'ε'):   {'GREEN'},          # Transição automática
            ('GREEN',  'ε'):       {'YELLOW'},         # Timeout automático
            ('GREEN',  'sensor'):  {'GREEN'},           # Veículo detectado → mantém
            ('GREEN',  'emergency'):{'RED'},            # Prioridade ambulância
            ('YELLOW', 'ε'):       {'RED'},             # Timeout → vermelho
        }
        self.state = {'RED'}  # Estado inicial (conjunto)

    def epsilon_closure(self, states):
        """Expansão automática por transições ε"""
        closure = set(states)
        stack = list(states)
        while stack:
            s = stack.pop()
            for target in self.delta.get((s, 'ε'), set()):
                if target not in closure:
                    closure.add(target)
                    stack.append(target)
        return closure

    def tick(self, event=None):
        """Avança o tempo (aplica ε) ou processa evento"""
        symbol = event if event else 'ε'
        next_states = set()
        for s in self.state:
            next_states |= self.delta.get((s, symbol), set())
        self.state = self.epsilon_closure(next_states) or self.state
        return self.state

# Simulação de um ciclo de semáforo
light = TrafficLightAFN_epsilon()
print(f"Estado inicial: {light.state}")

for step in ['ε', 'ε', 'ε', 'sensor', 'ε', 'ε', 'ε']:
    states = light.tick(step if step != 'ε' else None)
    print(f"  Evento [{step}] → {states}")`}</pre>
          </div>
          <div className="bg-cyan-950/20 border border-cyan-500/30 rounded-2xl p-4">
            <p className="text-cyan-300 text-xs font-bold mb-1">📌 Entregável Esperado</p>
            <p className="text-slate-400 text-xs">Modelar um cruzamento de 4 vias como AFN-ε, converter para AFD (detectar deadlock = estado inatingível),
            e comparar com a Rede de Petri equivalente, demonstrando a correspondência formal entre τ e ε.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
