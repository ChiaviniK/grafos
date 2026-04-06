export function LFASlide8_7() {
  return (
    <div className="flex flex-col min-h-[100%] flex-1 animate-in fade-in duration-500">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-violet-500/20 border border-violet-500/40 rounded-2xl flex items-center justify-center text-xl font-black text-violet-300">G1</div>
        <div>
          <p className="text-violet-400 font-black text-xs uppercase tracking-widest">Pesquisa — Grupo 1</p>
          <h2 className="text-2xl font-extrabold text-slate-100">NPCs de Jogos com Comportamento Não-Determinístico</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        <div className="space-y-4">
          <div className="bg-slate-900 border border-violet-500/20 rounded-2xl p-5">
            <h3 className="text-violet-400 font-bold text-sm uppercase tracking-wider mb-3">Contexto e Motivação</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Em RPGs modernos (ex: <em>Elden Ring</em>, <em>Baldur's Gate 3</em>), NPCs executam
              árvores de comportamento complexas. Um AFN-ε modela de forma elegante a
              <strong className="text-white"> transição implícita entre comportamentos</strong> (patrulhar → alertar → atacar)
              sem eventos explícitos — o NPC "percebe" o ambiente e muda de estado internamente.
            </p>
          </div>

          <div className="bg-slate-900 border border-violet-500/20 rounded-2xl p-5">
            <h3 className="text-violet-400 font-bold text-sm uppercase tracking-wider mb-3">Questão de Pesquisa</h3>
            <p className="text-slate-300 text-sm leading-relaxed italic">
              "É possível modelar o sistema de comportamento de um NPC de RPG como um AFN-ε,
              onde transições ε representam ativações internas de percepção, e demonstrar que
              o comportamento emergente equivale a uma linguagem regular reconhecível?"
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
            <h3 className="text-slate-400 font-bold text-sm uppercase tracking-wider mb-3">Referências Sugeridas</h3>
            <ul className="text-slate-500 text-xs space-y-1">
              <li>• Millington &amp; Funge (2009). <em>Artificial Intelligence for Games</em></li>
              <li>• Isla, D. (2005). Handling Complexity in the Halo 2 AI. GDC Proceedings.</li>
              <li>• Agre &amp; Chapman (1987). Pengi: An Implementation of a Theory of Activity.</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 flex-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-emerald-400 text-xs font-black uppercase tracking-widest">Código de Exemplo (Python)</span>
            </div>
            <pre className="text-xs font-mono text-slate-300 leading-relaxed overflow-auto">{`# AFN-ε para NPC de RPG
# Estados: patrol, aware, attack
# Transições ε = percepção interna

NPC_AFN = {
  'patrol': {
    'epsilon': {'aware'},    # Percebeu algo
    'time': {'patrol'}       # Loop patrulha
  },
  'aware': {
    'epsilon': {'attack'},   # Confirmou ameaça
    'lost': {'patrol'}       # Perdeu de vista
  },
  'attack': {
    'defeated': {'patrol'},  # Inimigo derrotado
    'epsilon': set()
  }
}

def epsilon_closure(state, automaton):
    """Calcula Fecho-epsilon de um estado"""
    closure = {state}
    stack = [state]
    while stack:
        s = stack.pop()
        eps_targets = automaton[s].get('epsilon', set())
        for t in eps_targets:
            if t not in closure:
                closure.add(t)
                stack.append(t)
    return closure

# Demonstração
print(epsilon_closure('patrol', NPC_AFN))
# → {'patrol', 'aware', 'attack'}
# NPC pode chegar ao ataque sem input externo!`}</pre>
          </div>
          <div className="bg-violet-950/20 border border-violet-500/30 rounded-2xl p-4">
            <p className="text-violet-300 text-xs font-bold mb-1">📌 Entregável Esperado</p>
            <p className="text-slate-400 text-xs">Implementar o AFN-ε do NPC em Python, calcular o Fecho-ε de cada estado e demonstrar
            que o comportamento é equivalente a uma linguagem regular via Teorema de Kleene.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
