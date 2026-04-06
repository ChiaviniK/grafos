export function LFASlide8_9() {
  return (
    <div className="flex flex-col min-h-[100%] flex-1 animate-in fade-in duration-500">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-amber-500/20 border border-amber-500/40 rounded-2xl flex items-center justify-center text-xl font-black text-amber-300">G3</div>
        <div>
          <p className="text-amber-400 font-black text-xs uppercase tracking-widest">Pesquisa — Grupo 3</p>
          <h2 className="text-2xl font-extrabold text-slate-100">Detecção de Bots em Redes Sociais via Padrões de Comportamento como Linguagem Regular</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        <div className="space-y-4">
          <div className="bg-slate-900 border border-amber-500/20 rounded-2xl p-5">
            <h3 className="text-amber-400 font-bold text-sm uppercase tracking-wider mb-3">Contexto e Motivação</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Bots no Twitter/X (agora X) executam sequências de ações altamente padronizadas:
              seguir → curtir → retuitar → postar — com intervalos regulares impossíveis para humanos.
              Ao codificar ações como símbolos (<strong className="text-white">F=follow, L=like, RT=retweet, P=post, U=unfollow</strong>),
              obtemos uma string comportamental por conta. Bots de astroturfing geram
              <strong className="text-white"> linguagens regulares detectáveis por AFN-ε</strong>, enquanto contas humanas
              produzem padrões irregulares e contextuais.
            </p>
          </div>

          <div className="bg-slate-900 border border-amber-500/20 rounded-2xl p-5">
            <h3 className="text-amber-400 font-bold text-sm uppercase tracking-wider mb-3">Questão de Pesquisa</h3>
            <p className="text-slate-300 text-sm leading-relaxed italic">
              "Padrões comportamentais de bots de desinformação podem ser formalizados como linguagens
              regulares e reconhecidos por AFN-ε construídos via Thompson? Como distinguir bots
              sofisticados (que simulam aleatoriedade) usando o Lema do Bombeamento como critério de regularidade?"
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
            <h3 className="text-slate-400 font-bold text-sm uppercase tracking-wider mb-3">Referências Sugeridas</h3>
            <ul className="text-slate-500 text-xs space-y-1">
              <li>• Varol et al. (2017). Online Human-Bot Interactions: Detection, Estimation, and Characterization. ICWSM.</li>
              <li>• Ferrara et al. (2016). The Rise of Social Bots. Communications of the ACM.</li>
              <li>• Sayyadiharikandeh et al. (2020). Detection of Novel Social Bots. WWW &apos;20.</li>
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
from collections import Counter

# Alfabeto de acoes de contas no Twitter/X:
# F=Follow, L=Like, R=Retweet, P=Post, U=Unfollow

# Sequencias comportamentais simuladas (janela de 24h)
accounts = {
    "@user_humano_1": "PLRFLPLRFLPRLP",        # Irregular
    "@bot_campanha_A": "FLRFLRFLRFLRFLR",       # Ciclo exato
    "@bot_seguidor":   "FFFUUUFFFU",             # Follow-Unfollow
    "@bot_spreader":   "RRRRRRRRRRRRRRRR",       # So retweets
    "@user_humano_2": "PPLRFPLPRRFLP",           # Irregular
    "@bot_astroturf":  "FLRPFLRPFLRPFLRP",      # Ciclo FLRP
}

# Padroes de bot como Expressoes Regulares
BOT_PATTERNS = {
    "Ciclo Follow-Unfollow":    r'(F{3,}U{3,}){2,}',
    "Ciclo de Engajamento":     r'(FLR){3,}|(FLRP){3,}',
    "Retweet Storm":            r'R{8,}',
    "Follow em massa":          r'F{10,}',
    "Automacao ritmica":        r'(.{2,4})\\1{3,}',  # Qualquer ciclo repetido
}

print("Bot Detection Engine - Analise Comportamental")
print("=" * 50)

for account, sequence in accounts.items():
    signals = []
    for pattern_name, pattern in BOT_PATTERNS.items():
        if re.search(pattern, sequence):
            signals.append(pattern_name)

    score = len(signals) / len(BOT_PATTERNS)
    verdict = "BOT" if score >= 0.4 else "HUMANO"
    print(f"\\n{account} ({len(sequence)} acoes)")
    print(f"  Sequencia: {sequence}")
    print(f"  Score:     {score:.0%}")
    print(f"  Veredicto: {verdict}")
    if signals:
        for s in signals:
            print(f"    Padrao: {s}")

# Frequencia de acoes (entropia comportamental)
for account, seq in accounts.items():
    counts = Counter(seq)
    total = len(seq)
    entropy = -sum((c/total)*__import__('math').log2(c/total)
                   for c in counts.values() if c > 0)
    print(f"{account}: entropia={entropy:.2f} bits")`}</pre>
          </div>
          <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-4">
            <p className="text-amber-300 text-xs font-bold mb-1">📌 Entregável Esperado</p>
            <p className="text-slate-400 text-xs">Construir o AFN-ε via Thompson para 4+ padrões de bot, testar em dataset real (ex: Botometer, TwiBot-20),
            calcular precisão/recall e discutir quais comportamentos de bot <em>não são</em> linguagens regulares (limites teóricos).</p>
          </div>
        </div>
      </div>
    </div>
  );
}
