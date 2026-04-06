export function LFASlide8_11() {
  return (
    <div className="flex flex-col min-h-[100%] flex-1 animate-in fade-in duration-500">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-orange-500/20 border border-orange-500/40 rounded-2xl flex items-center justify-center text-xl font-black text-orange-300">G5</div>
        <div>
          <p className="text-orange-400 font-black text-xs uppercase tracking-widest">Pesquisa — Grupo 5</p>
          <h2 className="text-2xl font-extrabold text-slate-100">Validação de Votação em DAOs com Autômatos de Estado</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        <div className="space-y-4">
          <div className="bg-slate-900 border border-orange-500/20 rounded-2xl p-5">
            <h3 className="text-orange-400 font-bold text-sm uppercase tracking-wider mb-3">Contexto e Motivação</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Organizações Autônomas Descentralizadas (<strong className="text-white">DAOs</strong>) como Compound e Uniswap
              gerenciam bilhões em ativos via votação on-chain. O ciclo de vida de uma proposta
              (Pendente → Ativa → Aprovada/Rejeitada → Executada/Cancelada) é um
              <strong className="text-white"> autômato de estados finito determinístico</strong>.
              Transições inválidas geram exploits — como o ataque à Beanstalk DAO ($182M, 2022).
            </p>
          </div>

          <div className="bg-slate-900 border border-orange-500/20 rounded-2xl p-5">
            <h3 className="text-orange-400 font-bold text-sm uppercase tracking-wider mb-3">Questão de Pesquisa</h3>
            <p className="text-slate-300 text-sm leading-relaxed italic">
              "Pode-se modelar formalmente o ciclo de vida de uma proposta em uma DAO como um AFD/AFN-ε,
              usar Teorema de Pumping para demonstrar que o protocolo é regular, e identificar
              sequências de transações inválidas que levam a estados de exploração?"
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
            <h3 className="text-slate-400 font-bold text-sm uppercase tracking-wider mb-3">Referências Sugeridas</h3>
            <ul className="text-slate-500 text-xs space-y-1">
              <li>• Buterin, V. (2014). A Next-Generation Smart Contract Platform. Ethereum Whitepaper.</li>
              <li>• Breidenbach et al. (2021). Flash Boys 2.0. IEEE S&amp;P (sobre exploits de protocolo).</li>
              <li>• OpenZeppelin (2023). Governor and TimelockController Documentation.</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 flex-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
              <span className="text-orange-400 text-xs font-black uppercase tracking-widest">Código de Exemplo (Python)</span>
            </div>
            <pre className="text-xs font-mono text-slate-300 leading-relaxed overflow-auto">{`# AFD para ciclo de vida de proposta DAO
# Baseado no Governor Bravo (Compound, Uniswap)

DAO_AFD = {
    'Pending': {
        'queue':    'Active',
        'cancel':   'Canceled',
        'epsilon':  set()       # Sem transições automáticas
    },
    'Active': {
        'vote_pass': 'Succeeded',
        'vote_fail': 'Defeated',
        'cancel':    'Canceled',
    },
    'Succeeded': {
        'queue':    'Queued',
        'cancel':   'Canceled',
    },
    'Queued': {
        'execute':  'Executed',
        'cancel':   'Canceled',
    },
    'Executed': {},   # Estado terminal
    'Defeated': {},   # Estado terminal
    'Canceled': {},   # Estado terminal
}

FINAL_STATES = {'Executed', 'Defeated', 'Canceled'}

def simulate_dao(transitions: list[str]) -> str:
    """Simula o ciclo de vida de uma proposta"""
    state = 'Pending'
    print(f"Início: {state}")
    for action in transitions:
        next_states = DAO_AFD.get(state, {})
        if action in next_states:
            state = next_states[action]
            print(f"  --({action})--> {state}")
        else:
            print(f"  ✗ TRANSIÇÃO INVÁLIDA: {action} em {state}")
            return f"EXPLOIT DETECTADO em {state}!"
    return f"Estado Final: {state}"

# Sequência de ataque (Beanstalk-like exploit)
attack = ['queue', 'vote_pass', 'execute']  # Pula 'Active'!
print("\n[ATAQUE]")
print(simulate_dao(attack))

# Sequência válida
valid = ['queue', 'vote_pass', 'queue', 'execute']
print("\n[VÁLIDA]")
print(simulate_dao(valid))`}</pre>
          </div>
          <div className="bg-orange-950/20 border border-orange-500/30 rounded-2xl p-4">
            <p className="text-orange-300 text-xs font-bold mb-1">📌 Entregável Esperado</p>
            <p className="text-slate-400 text-xs">Formalizar o AFD do protocolo Governor Bravo, identificar pelo menos 2 sequências de transição inválidas que representam vetores de ataque, e provar que a linguagem de sequências válidas é regular via Lema do Bombeamento.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
