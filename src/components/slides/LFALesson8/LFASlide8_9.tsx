export function LFASlide8_9() {
  return (
    <div className="flex flex-col min-h-[100%] flex-1 animate-in fade-in duration-500">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-amber-500/20 border border-amber-500/40 rounded-2xl flex items-center justify-center text-xl font-black text-amber-300">G3</div>
        <div>
          <p className="text-amber-400 font-black text-xs uppercase tracking-widest">Pesquisa — Grupo 3</p>
          <h2 className="text-2xl font-extrabold text-slate-100">Detecção de Wash Trading em Criptoativos com AFN</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        <div className="space-y-4">
          <div className="bg-slate-900 border border-amber-500/20 rounded-2xl p-5">
            <h3 className="text-amber-400 font-bold text-sm uppercase tracking-wider mb-3">Contexto e Motivação</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              <strong className="text-white">Wash Trading</strong> é uma forma de manipulação de mercado onde um ator compra
              e vende o mesmo ativo repetidamente para inflar o volume. Em blockchains públicas (Ethereum, Solana),
              as sequências de transações são públicas e podem ser codificadas como <strong className="text-white">strings sobre
              um alfabeto de ações</strong>, permitindo detecção via AFN.
            </p>
          </div>

          <div className="bg-slate-900 border border-amber-500/20 rounded-2xl p-5">
            <h3 className="text-amber-400 font-bold text-sm uppercase tracking-wider mb-3">Questão de Pesquisa</h3>
            <p className="text-slate-300 text-sm leading-relaxed italic">
              "É possível formalizar padrões de Wash Trading como linguagens regulares e construir um
              AFN-ε (via Thompson) que detecte esses padrões em streams de transações blockchain
              em tempo linear, com baixa taxa de falsos positivos?"
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
            <h3 className="text-slate-400 font-bold text-sm uppercase tracking-wider mb-3">Referências Sugeridas</h3>
            <ul className="text-slate-500 text-xs space-y-1">
              <li>• Cao et al. (2022). Market Manipulation of Bitcoin: Evidence from Mining the Mt. Gox Database. J. Finance.</li>
              <li>• Victoor et al. (2021). NFT Wash Trading: Quantifying Suspicious Behavior. arXiv:2202.03866.</li>
              <li>• Hopcroft &amp; Ullman (1979). Introduction to Automata Theory, Languages, and Computation.</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 flex-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              <span className="text-amber-400 text-xs font-black uppercase tracking-widest">Código de Exemplo (Python)</span>
            </div>
            <pre className="text-xs font-mono text-slate-300 leading-relaxed overflow-auto">{`import re

# Alfabeto de ações de trading:
# B = Buy, S = Sell, T = Transfer
# Um padrão de Wash Trade: (BS){2,} ou B+S+B+

# Sequência de transações de uma carteira (simulada)
tx_sequences = {
    "wallet_0x1A": "BSBSBST",   # Suspeito!
    "wallet_0x2B": "BBSSTBS",   # Normal
    "wallet_0x3C": "BSSBBBS",   # Normal
    "wallet_0x4D": "BSBSBS",    # Suspeito!
    "wallet_0x5E": "BTBTBTBT",  # Normal (só transfers)
}

# Padrões formalizados como Expressões Regulares
WASH_PATTERNS = {
    "Ciclo Simples (BS)^2+":    r'(BS){2,}',
    "Bomba e Despejo B+S+B+":   r'B+S+B+',
    "Micro-ciclos (BSB)^2+":    r'(BSB){2,}',
}

print("=" * 50)
print("ANÁLISE DE WASH TRADING")
print("=" * 50)

for wallet, seq in tx_sequences.items():
    print(f"\n📊 {wallet}: {seq}")
    is_suspicious = False
    for name, pattern in WASH_PATTERNS.items():
        if re.search(pattern, seq):
            print(f"  ⚠ PADRÃO: {name}")
            is_suspicious = True
    if is_suspicious:
        print(f"  🚨 RESULTADO: SUSPEITO DE WASH TRADING")
    else:
        print(f"  ✅ RESULTADO: Comportamento Normal")

# Complexidade: O(n) por transação via Thompson NFA`}</pre>
          </div>
          <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-4">
            <p className="text-amber-300 text-xs font-bold mb-1">📌 Entregável Esperado</p>
            <p className="text-slate-400 text-xs">Construir o AFN-ε correspondente a cada Regex via Thompson, implementar a detecção em dados reais de uma DEX
            (Uniswap, OpenSea) e medir precisão vs. detectores baseados em regras heurísticas.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
