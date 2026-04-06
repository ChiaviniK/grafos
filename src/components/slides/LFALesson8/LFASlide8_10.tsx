export function LFASlide8_10() {
  return (
    <div className="flex flex-col min-h-[100%] flex-1 animate-in fade-in duration-500">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl flex items-center justify-center text-xl font-black text-emerald-300">G4</div>
        <div>
          <p className="text-emerald-400 font-black text-xs uppercase tracking-widest">Pesquisa — Grupo 4</p>
          <h2 className="text-2xl font-extrabold text-slate-100">Descoberta de Motivos em DNA com Equivalência de Regex</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        <div className="space-y-4">
          <div className="bg-slate-900 border border-emerald-500/20 rounded-2xl p-5">
            <h3 className="text-emerald-400 font-bold text-sm uppercase tracking-wider mb-3">Contexto e Motivação</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              O DNA é literalmente uma string sobre um alfabeto de 4 símbolos: {'{'}<strong className="text-white">A, T, G, C</strong>{'}'}.
              Bioinformática usa extensivamente Expressões Regulares para encontrar <strong className="text-white">motivos</strong>
              — padrões funcionais como sítios de ligação de proteínas, promotores e sequências regulatórias.
              A equivalência de Regex via autômatos garante eficiência em genomas com bilhões de bases.
            </p>
          </div>

          <div className="bg-slate-900 border border-emerald-500/20 rounded-2xl p-5">
            <h3 className="text-emerald-400 font-bold text-sm uppercase tracking-wider mb-3">Questão de Pesquisa</h3>
            <p className="text-slate-300 text-sm leading-relaxed italic">
              "Dois motivos de DNA expressos como Expressões Regulares distintas são equivalentes se
              reconhecem a mesma linguagem. Como verificar essa equivalência via minimização de AFD
              e qual o impacto no custo computacional de varredura genômica?"
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
            <h3 className="text-slate-400 font-bold text-sm uppercase tracking-wider mb-3">Referências Sugeridas</h3>
            <ul className="text-slate-500 text-xs space-y-1">
              <li>• Stormo, G.D. (2000). DNA binding sites: representation and discovery. Bioinformatics.</li>
              <li>• Serafini et al. (2021). JASPAR 2022: the 9th release of the open-access database of TF binding profiles. NAR.</li>
              <li>• Aho &amp; Corasick (1975). Efficient String Matching. CACM (base do grep/BioPython).</li>
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

# Sequência genômica (fragmento simplificado)
dna = "ATGCATGCAAATTTGCGCATGCATTTAAAGCATGC" * 3

# Motivos biológicos como Expressões Regulares
# (Alfabeto: A, T, G, C)
MOTIFS = {
    "TATA-box (promotor)":   r'TATA[AT]A[AT]',
    "Palindromo EcoRI":      r'GAATTC',
    "Sítio ribossômico":     r'ATG[ATGC]{3,}',  # start codon + codons
    "Cauda poli-A":          r'A{6,}',            # polyadenylation signal
    "GC-rich region":        r'[GC]{8,}',
}

print("VARREDURA GENÔMICA — Detecção de Motivos")
print(f"Comprimento da sequência: {len(dna)} bp\n")

for name, pattern in MOTIFS.items():
    matches = list(re.finditer(pattern, dna, re.IGNORECASE))
    positions = [m.start() for m in matches]
    print(f"{name}")
    print(f"  Regex: {pattern}")
    print(f"  Ocorrências: {len(matches)}")
    if positions:
        print(f"  Posições: {positions[:5]}{'...' if len(positions) > 5 else ''}")
    print()

# Equivalência de dois motivos via minimização de AFD:
# r1 = r'ATG[ATGC]+TAA' (start+stop codon)
# r2 = r'ATG.+?TAA'
# São equivalentes? → Construir AFN-ε, converter, minimizar, comparar!`}</pre>
          </div>
          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-4">
            <p className="text-emerald-300 text-xs font-bold mb-1">📌 Entregável Esperado</p>
            <p className="text-slate-400 text-xs">Definir dois motivos como Regex distintas, provar ou refutar equivalência via minimização de AFD,
            e comparar o custo de varredura em um dataset real (NCBI GenBank).</p>
          </div>
        </div>
      </div>
    </div>
  );
}
