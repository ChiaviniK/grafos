export function LFASlide8_7() {
  return (
    <div className="flex flex-col min-h-[100%] flex-1 animate-in fade-in duration-500">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-violet-500/20 border border-violet-500/40 rounded-2xl flex items-center justify-center text-xl font-black text-violet-300">G1</div>
        <div>
          <p className="text-violet-400 font-black text-xs uppercase tracking-widest">Pesquisa — Grupo 1</p>
          <h2 className="text-2xl font-extrabold text-slate-100">Detecção de Arritmias Cardíacas com AFN-ε em Dados de ECG</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        <div className="space-y-4">
          <div className="bg-slate-900 border border-violet-500/20 rounded-2xl p-5">
            <h3 className="text-violet-400 font-bold text-sm uppercase tracking-wider mb-3">Contexto e Motivação</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Eletrocardiogramas (ECG) capturam a atividade elétrica do coração como séries temporais
              contínuas. Ao <strong className="text-white">discretizar</strong> os intervalos entre batimentos (RR intervals)
              em categorias simbólicas (N=Normal, V=Ventricular, S=Supraventricular), obtemos uma
              <strong className="text-white"> string sobre um alfabeto finito</strong> — campo natural para AFN-ε.
              Padrões como taquicardia ventricular (VVV+) e fibrilação atrial (S{"{"}4,{"}"}) são linguagens
              regulares detectáveis em O(n).
            </p>
          </div>

          <div className="bg-slate-900 border border-violet-500/20 rounded-2xl p-5">
            <h3 className="text-violet-400 font-bold text-sm uppercase tracking-wider mb-3">Questão de Pesquisa</h3>
            <p className="text-slate-300 text-sm leading-relaxed italic">
              "É possível construir, via Algoritmo de Thompson, um AFN-ε que detecte em tempo linear
              arritmias clinicamente relevantes em streams de ECG, formalizando cada tipo de arritmia
              como uma Expressão Regular sobre o alfabeto de anotações do dataset MIT-BIH?"
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
            <h3 className="text-slate-400 font-bold text-sm uppercase tracking-wider mb-3">Referências Sugeridas</h3>
            <ul className="text-slate-500 text-xs space-y-1">
              <li>• Moody &amp; Mark (2001). The impact of the MIT-BIH Arrhythmia Database. IEEE EMB Magazine.</li>
              <li>• Goldberger et al. (2000). PhysioBank, PhysioToolkit, PhysioNet. Circulation.</li>
              <li>• Clifford et al. (2006). Advanced Methods and Tools for ECG Data Analysis. Artech House.</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 flex-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
              <span className="text-violet-400 text-xs font-black uppercase tracking-widest">Código de Exemplo (Python)</span>
            </div>
            <pre className="text-xs font-mono text-slate-300 leading-relaxed overflow-auto">{`import re

# Dataset MIT-BIH: anotacoes de batimentos cardiacos
# Alfabeto: N=Normal, V=Ventricular, S=Supraventricular,
#           F=Fusao, A=Atrial, Q=Desconhecido

# Trecho de ECG anotado (ex: registro 100 do MIT-BIH)
ecg_stream = "NNNNNVNNNNSSNNNNNVVVNNNSSSSSNNNNNVVVVNNN"

# Arritimias formalizadas como Expressoes Regulares
# (Cada regex e compilada via AFN-epsilon Thompson)
ARRHYTHMIAS = {
    "Taquicardia Ventricular (3+ V)": r'V{3,}',
    "Fibrilacao Atrial (4+ S)":        r'S{4,}',
    "Bigeminismo Ventricular":         r'(NV){3,}',
    "Ectopia Supraventricular":        r'N{2,}SN{2,}',
    "Batimento de Fusao isolado":      r'(?<![VF])F(?![VF])',
}

print("Analise de ECG - Deteccao de Arritmias")
print(f"Stream analisado: {ecg_stream}")
print(f"Total de batimentos: {len(ecg_stream)}\\n")

for name, pattern in ARRHYTHMIAS.items():
    matches = list(re.finditer(pattern, ecg_stream))
    if matches:
        positions = [(m.start(), m.group()) for m in matches]
        print(f"  ALERTA: {name}")
        for pos, seq in positions:
            print(f"    Posicao {pos}: '{seq}'")
    else:
        print(f"  OK: {name} nao detectada")

# Analise de severidade
vt_matches = re.findall(r'V{3,}', ecg_stream)
if any(len(m) >= 5 for m in vt_matches):
    print("\\nCRITICO: Taquicardia Ventricular Sustentada (5+ batimentos)!")
elif vt_matches:
    print("\\nATENCAO: Episodio de TV nao sustentada detectado.")`}</pre>
          </div>
          <div className="bg-violet-950/20 border border-violet-500/30 rounded-2xl p-4">
            <p className="text-violet-300 text-xs font-bold mb-1">📌 Entregável Esperado</p>
            <p className="text-slate-400 text-xs">Construir o AFN-ε via Thompson para 3+ tipos de arritmia usando o dataset MIT-BIH (PhysioNet, livre),
            medir sensibilidade e especificidade do detector, e demonstrar a complexidade O(n) vs detecção baseada em janela deslizante.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
