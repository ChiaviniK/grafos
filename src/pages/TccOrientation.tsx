import { 
  FileText, 
  Calendar, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  ListChecks, 
  Lightbulb,
  ArrowRight,
  Clock
} from 'lucide-react';

export function TccOrientation() {
  const schedule = [
    { week: 'Semana 2', activity: 'Definição do Título, Problema de Pesquisa e Objetivos.', icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" /> },
    { week: 'Semana 4', activity: 'Introdução completa (incluindo a base da Revisão Bibliográfica).', icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" /> },
    { week: 'Semana 6', activity: 'Desenvolvimento: Metodologia aplicada e Resultados Preliminares.', icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" /> },
    { week: 'Semana 7', activity: 'Versão Completa: Resultados Finais, Considerações Finais e Referências.', icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" /> },
    { week: 'Semana 8', activity: 'Entrega Final: Artigo formatado com Resumo, Abstract e Keywords.', icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" /> },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 font-sans pb-20">
      <div className="max-w-5xl mx-auto px-6 pt-12">
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-blue-500/10 text-blue-400 font-black px-3 py-1 rounded-full text-xs border border-blue-500/20 uppercase tracking-widest">UNIMAX</span>
            <span className="text-slate-500 font-mono text-xs">Graduação e Pós</span>
          </div>
          <h1 className="text-5xl font-black text-white mb-4 tracking-tight">Orientação de <span className="text-blue-500">TCC</span></h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            Guia completo para o desenvolvimento do seu artigo científico. Siga os prazos e utilize o template oficial para garantir sua aprovação.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content (Left) */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* 1. Roteiro de Orientação */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <BookOpen className="w-5 h-5 text-blue-400" />
                <h2 className="text-xl font-bold text-slate-100">Script de Orientação</h2>
              </div>
              
              <div className="grid gap-4">
                <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl hover:border-blue-500/30 transition-all">
                  <h3 className="font-bold text-blue-400 flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-4 h-4" /> 1. Planejamento e Estrutura Inicial
                  </h3>
                  <div className="space-y-3 text-sm text-slate-400">
                    <p><strong className="text-slate-200">Título:</strong> Deve ser claro e refletir o objetivo central.</p>
                    <p><strong className="text-slate-200">Introdução:</strong> Não deve ser uma "enciclopédia". Parta do geral para o específico, culminando nos objetivos.</p>
                    <div className="flex gap-2 items-start bg-amber-500/5 p-3 rounded-lg border border-amber-500/20 mt-4">
                      <Lightbulb className="w-4 h-4 text-amber-400 mt-1 shrink-0" />
                      <p className="text-xs text-amber-200/70">Reserve no máximo 2 a 3 páginas para a Introdução (incluindo a fundamentação teórica).</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl hover:border-blue-500/30 transition-all">
                  <h3 className="font-bold text-emerald-400 flex items-center gap-2 mb-3">
                    <FileText className="w-4 h-4" /> 2. Desenvolvimento (O Coração)
                  </h3>
                  <div className="space-y-3 text-sm text-slate-400">
                    <p><strong className="text-slate-200">Metodologia:</strong> Descrição clara de como o trabalho foi realizado.</p>
                    <p><strong className="text-slate-200">Resultados e Discussão:</strong> O que foi alcançado vs. o que diz a bibliografia.</p>
                    <p><strong className="text-slate-200">Gestão de Espaço:</strong> Use subtítulos estrategicamente para organizar o texto dentro de 12 páginas.</p>
                  </div>
                </div>

                <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl hover:border-blue-500/30 transition-all">
                  <h3 className="font-bold text-violet-400 flex items-center gap-2 mb-3">
                    <AlertCircle className="w-4 h-4" /> 3. Finalização
                  </h3>
                  <div className="space-y-3 text-sm text-slate-400">
                    <p><strong className="text-slate-200">Considerações Finais:</strong> Retome resultados e síntese da contribuição científica.</p>
                    <p><strong className="text-slate-200">Resumo/Abstract:</strong> 200 a 250 palavras em parágrafo único.</p>
                    <p><strong className="text-slate-200">Referências:</strong> Siga rigorosamente o padrão ABNT (Livros, artigos, internet).</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Dieta de Páginas */}
            <section className="bg-gradient-to-br from-slate-900 to-slate-950 border border-blue-500/20 p-8 rounded-3xl">
              <div className="flex items-center gap-2 mb-6">
                <ListChecks className="w-5 h-5 text-blue-400" />
                <h2 className="text-xl font-bold text-slate-100">A "Dieta" de 12 Páginas</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {[
                  { label: 'Título/Resumos', pages: '1 pg' },
                  { label: 'Introdução', pages: '2-3 pgs' },
                  { label: 'Metodologia', pages: '5-6 pgs' },
                  { label: 'Considerações', pages: '1 pg' },
                  { label: 'Referências', pages: '1-2 pgs' },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-500 font-bold mb-1 uppercase tracking-tighter">{item.label}</span>
                    <span className="text-lg font-black text-blue-400">{item.pages}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl flex gap-3 text-xs text-emerald-300">
                <AlertCircle className="w-4 h-4 shrink-0" />
                Dica: Evite citações diretas longas. Use paráfrases para manter o texto fluido e economizar espaço.
              </div>
            </section>
          </div>

          {/* Sidebar (Right) */}
          <div className="space-y-8">
            
            {/* Download Template */}
            <div className="bg-blue-600 p-8 rounded-3xl shadow-[0_20px_50px_rgba(37,99,235,0.3)] group relative overflow-hidden">
               <div className="relative z-10">
                  <h3 className="text-2xl font-black text-white mb-2">Template Oficial</h3>
                  <p className="text-blue-100 text-sm mb-6 opacity-80">Baixe o arquivo padrão da revista com todas as formatações ABNT prontas.</p>
                  <a 
                    href="/src/assets/tcc_template/Template (1)-OTH.doc" 
                    download 
                    className="w-full bg-white text-blue-600 py-3 rounded-xl font-bold flex items-center justify-center gap-2 group-hover:scale-[1.02] transition-transform"
                  >
                    <Download className="w-4 h-4" /> Download .DOC
                  </a>
               </div>
               <FileText className="absolute bottom-[-10px] right-[-10px] w-32 h-32 text-white/10 rotate-12" />
            </div>

            {/* Calendário 2 meses */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-slate-100 uppercase tracking-widest text-xs">Cronograma (8 Semanas)</h3>
              </div>
              <div className="space-y-6 relative ml-2">
                <div className="absolute left-[7px] top-1 bottom-1 w-px bg-slate-800" />
                {schedule.map((step, i) => (
                  <div key={i} className="relative flex gap-4 items-start pl-6 group">
                    <div className="absolute left-0 top-1 w-4 h-4 bg-slate-900 border-2 border-emerald-500 rounded-full z-10 group-hover:bg-emerald-500 transition-colors" />
                    <div>
                      <span className="text-[10px] font-black text-emerald-400 uppercase tracking-tighter">{step.week}</span>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{step.activity}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between opacity-50">
                  <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-2">
                    <Clock className="w-3 h-3" /> Prazo Total: 60 dias
                  </span>
                  <ArrowRight className="w-3 h-3 text-slate-700" />
              </div>
            </div>

          </div>
        </div>

        {/* Footer info */}
        <footer className="mt-20 text-center border-t border-slate-800 pt-10">
            <p className="text-slate-600 text-xs font-mono uppercase tracking-widest">Bom trabalho e ótima pesquisa!</p>
        </footer>
      </div>
    </div>
  );
}
