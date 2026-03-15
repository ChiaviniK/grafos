import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Clock,
  X,
  Target,
  Search,
  PenTool,
  ClipboardList,
  GraduationCap
} from 'lucide-react';

interface StageDetail {
  id: string;
  title: string;
  description: string;
  steps: string[];
  tip: string;
  icon: React.ReactNode;
}

const STAGE_DETAILS: Record<string, StageDetail> = {
  'planning': {
    id: 'planning',
    title: 'Título, Problema e Objetivos',
    icon: <Target className="w-6 h-6 text-blue-400" />,
    description: 'A base de todo TCC. Sem um problema bem definido, o trabalho perde o rumo.',
    steps: [
      'Título: Deve ser curto e conter a variável principal da sua pesquisa.',
      'Problema: Transforme sua dúvida em uma pergunta científica (Ex: "Como a IA impacta X?").',
      'Objetivo Geral: Comece sempre com um verbo de ação (Analisar, Avaliar, Identificar).',
      'Objetivos Específicos: São os degraus (3 a 4) para alcançar o objetivo geral.'
    ],
    tip: 'Se você não consegue explicar seu problema em uma frase, ele ainda está muito amplo.'
  },
  'intro': {
    id: 'intro',
    title: 'Introdução e Revisão',
    icon: <Search className="w-6 h-6 text-emerald-400" />,
    description: 'Aqui você contextualiza o leitor e mostra que domina a literatura sobre o tema.',
    steps: [
      'Técnica do Funil: Comece pelo contexto global, depois nacional, até chegar no seu objeto.',
      'Justificativa: Explique por que seu trabalho é relevante hoje.',
      'Citações: Não use "achismos". Cada afirmação deve ser embasada por um autor renomado.',
      'Volume: Use 2 a 3 páginas. Se passar disso, você está enrolando.'
    ],
    tip: 'Use o Google Acadêmico e o Scielo para encontrar fontes confiáveis. Fuja do Wikipédia!'
  },
  'dev': {
    id: 'dev',
    title: 'Metodologia e Resultados',
    icon: <ClipboardList className="w-6 h-6 text-violet-400" />,
    description: 'Onde você prova o que disse. É a parte mais importante para a banca.',
    steps: [
      'Metodologia: Diga SE o trabalho é qualitativo ou quantitativo e COMO os dados foram coletados.',
      'Resultados: Apresente gráficos e tabelas (conforme o template).',
      'Discussão: Cruza seus achados com o que os autores da revisão bibliográfica disseram.',
      'Ferramentas: Cite softwares ou legislações usadas no processo.'
    ],
    tip: 'Gráficos sem análise são apenas desenhos. Cada imagem deve ser explicada no texto.'
  },
  'v-completa': {
    id: 'v-completa',
    title: 'Versão Completa e Coerência',
    icon: <PenTool className="w-6 h-6 text-rose-400" />,
    description: 'Hora de dar "liga" ao trabalho e verificar se o começo conversa com o fim.',
    steps: [
      'Conclusão: Responda diretamente ao seu problema de pesquisa.',
      'Resumo: Escreva por último! Deve conter objetivo, método, resultado e conclusão.',
      'Abstract: Tradução técnica. Evite o Google Tradutor puro; use o DeepL para termos acadêmicos.',
      'Fluidez: Verifique se os parágrafos têm conectivos de transição.'
    ],
    tip: 'Leia seu trabalho em voz alta. Se você perder o fôlego em um parágrafo, ele está longo demais.'
  },
  'final': {
    id: 'final',
    title: 'Formatação e Entrega',
    icon: <GraduationCap className="w-6 h-6 text-amber-400" />,
    description: 'O "pente fino". Erros de ABNT podem tirar pontos preciosos.',
    steps: [
      'Referências: Devem estar em ordem alfabética.',
      'Margens: Verifique se seguiu o template (Superior/Esquerda: 3cm; Inferior/Direita: 2cm).',
      'Citações: Citações longas (mais de 3 linhas) devem ter recuo de 4cm.',
      'PDF: Sempre gere a versão final em PDF para evitar desconfigurações.'
    ],
    tip: 'Peça para um colega ler seu resumo. Se ele entender o que você fez, o texto está bom.'
  }
};

export function TccOrientation() {
  const [selectedStage, setSelectedStage] = useState<StageDetail | null>(null);

  const schedule = [
    { id: 'planning', week: 'Semana 2', activity: 'Definição do Título e Objetivos.', icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" /> },
    { id: 'intro', week: 'Semana 4', activity: 'Introdução e Revisão Bibliográfica.', icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" /> },
    { id: 'dev', week: 'Semana 6', activity: 'Metodologia e Resultados Preliminares.', icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" /> },
    { id: 'v-completa', week: 'Semana 7', activity: 'Versão Completa e Discussão.', icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" /> },
    { id: 'final', week: 'Semana 8', activity: 'Entrega Final e Formatação.', icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" /> },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 font-sans pb-20 relative">
      <div className="max-w-5xl mx-auto px-6 pt-12">
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-blue-500/10 text-blue-400 font-black px-3 py-1 rounded-full text-xs border border-blue-500/20 uppercase tracking-widest">UNIMAX</span>
            <span className="text-slate-500 font-mono text-xs">Orientador: Luiz Chiavini</span>
          </div>
          <h1 className="text-5xl font-black text-white mb-4 tracking-tight">Orientação de <span className="text-blue-500">TCC</span></h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            Clique nas etapas do cronograma ou nos cards abaixo para ver o guia detalhado de <span className="text-white font-bold italic">"Como Fazer"</span>.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content (Left) */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* 1. Roteiro de Orientação */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <BookOpen className="w-5 h-5 text-blue-400" />
                <h2 className="text-xl font-bold text-slate-100">Script de Escrita</h2>
              </div>
              
              <div className="grid gap-4">
                <button onClick={() => setSelectedStage(STAGE_DETAILS['planning'])} className="text-left bg-slate-900/50 border border-slate-800 p-6 rounded-2xl hover:border-blue-500/40 hover:bg-blue-500/5 transition-all group overflow-hidden relative">
                  <h3 className="font-bold text-blue-400 flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-4 h-4" /> 1. Planejamento Inicial
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">Foco no escopo: Título, problemas e objetivos. A base estratégica do seu artigo.</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-[10px] font-black uppercase text-blue-500 group-hover:gap-2 transition-all">Ver Detalhes <ArrowRight className="w-3 h-3" /></span>
                </button>

                <button onClick={() => setSelectedStage(STAGE_DETAILS['dev'])} className="text-left bg-slate-900/50 border border-slate-800 p-6 rounded-2xl hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all group overflow-hidden relative">
                  <h3 className="font-bold text-emerald-400 flex items-center gap-2 mb-3">
                    <FileText className="w-4 h-4" /> 2. Desenvolvimento e Coração
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">Metodologia aplicada, coleta de dados e discussão dos resultados alcançados.</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-[10px] font-black uppercase text-emerald-500 group-hover:gap-2 transition-all">Ver Detalhes <ArrowRight className="w-3 h-3" /></span>
                </button>

                <button onClick={() => setSelectedStage(STAGE_DETAILS['v-completa'])} className="text-left bg-slate-900/50 border border-slate-800 p-6 rounded-2xl hover:border-violet-500/40 hover:bg-violet-500/5 transition-all group overflow-hidden relative">
                  <h3 className="font-bold text-violet-400 flex items-center gap-2 mb-3">
                    <AlertCircle className="w-4 h-4" /> 3. Finalização Técnica
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">Considerações finais, Resumo/Abstract e as referências seguindo a ABNT.</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-[10px] font-black uppercase text-violet-500 group-hover:gap-2 transition-all">Ver Detalhes <ArrowRight className="w-3 h-3" /></span>
                </button>
              </div>
            </section>

            {/* 2. Dieta de Páginas */}
            <section className="bg-gradient-to-br from-slate-900 to-slate-950 border border-blue-500/20 p-8 rounded-3xl">
              <div className="flex items-center gap-2 mb-6">
                <ListChecks className="w-5 h-5 text-blue-400" />
                <h2 className="text-xl font-bold text-slate-100">Distribuição Sugerida (Max 12 pgs)</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {[
                  { label: 'Resumos', pages: '1 pg' },
                  { label: 'Introdução', pages: '2-3 pgs' },
                  { label: 'Desenvol.', pages: '5-6 pgs' },
                  { label: 'Conclusão', pages: '1 pg' },
                  { label: 'Referên.', pages: '1-2 pgs' },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 font-bold mb-1 uppercase tracking-tighter">{item.label}</span>
                    <span className="text-lg font-black text-blue-400">{item.pages}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar (Right) */}
          <div className="space-y-8">
            
            {/* Download Template */}
            <div className="bg-blue-600 p-8 rounded-3xl shadow-[0_20px_50px_rgba(37,99,235,0.3)] group relative overflow-hidden">
               <div className="relative z-10">
                  <h3 className="text-2xl font-black text-white mb-2">Template Oficial</h3>
                  <p className="text-blue-100 text-sm mb-6 opacity-80">Download do Word (.doc) com as margens e fontes configuradas.</p>
                  <a 
                    href="/src/assets/tcc_template/Template (1)-OTH.doc" 
                    download 
                    className="w-full bg-white text-blue-600 py-3 rounded-xl font-bold flex items-center justify-center gap-2 group-hover:scale-[1.02] transition-transform"
                  >
                    <Download className="w-4 h-4" /> Baixar Template
                  </a>
               </div>
               <FileText className="absolute bottom-[-10px] right-[-10px] w-32 h-32 text-white/10 rotate-12" />
            </div>

            {/* Calendário 2 meses */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-slate-100 uppercase tracking-widest text-xs">Cronograma (2 Meses)</h3>
              </div>
              <div className="space-y-4 relative ml-2">
                <div className="absolute left-[7px] top-1 bottom-1 w-px bg-slate-800" />
                {schedule.map((step, i) => (
                  <button 
                    key={i} 
                    onClick={() => setSelectedStage(STAGE_DETAILS[step.id])}
                    className="w-full text-left relative flex gap-4 items-start pl-6 group py-1"
                  >
                    <div className="absolute left-0 top-1 w-4 h-4 bg-slate-900 border-2 border-emerald-500 rounded-full z-10 group-hover:bg-emerald-500 transition-colors shadow-[0_0_10px_rgba(16,185,129,0.3)]" />
                    <div>
                      <span className="text-[10px] font-black text-emerald-400 uppercase tracking-tighter">{step.week}</span>
                      <p className="text-xs text-slate-400 mt-0.5 leading-snug group-hover:text-white transition-colors">{step.activity}</p>
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-8 pt-4 border-t border-slate-800">
                  <span className="text-[9px] font-bold text-slate-600 uppercase flex items-center gap-2">
                    <Clock className="w-3 h-3" /> Foco: 8 Semanas
                  </span>
              </div>
            </div>

          </div>
        </div>

        {/* Modal Overlay */}
        <AnimatePresence>
          {selectedStage && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 onClick={() => setSelectedStage(null)}
                 className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm"
               />
               <motion.div 
                 layoutId={selectedStage.id}
                 initial={{ opacity: 0, scale: 0.9, y: 20 }}
                 animate={{ opacity: 1, scale: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 0.9, y: 20 }}
                 className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-[2.5rem] shadow-2xl overflow-hidden"
               >
                  <div className="p-8 pb-0 flex justify-between items-start">
                      <div className="flex items-center gap-4">
                          <div className="p-3 bg-slate-800 rounded-2xl">{selectedStage.icon}</div>
                          <h2 className="text-2xl font-black text-white">{selectedStage.title}</h2>
                      </div>
                      <button onClick={() => setSelectedStage(null)} className="p-2 bg-slate-800 text-slate-400 rounded-full hover:bg-slate-700">
                          <X className="w-5 h-5" />
                      </button>
                  </div>

                  <div className="p-8 space-y-6">
                      <p className="text-slate-400 text-sm leading-relaxed">{selectedStage.description}</p>
                      
                      <div className="space-y-3">
                          <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Guia de "Como Fazer"</h4>
                          {selectedStage.steps.map((step, idx) => (
                              <div key={idx} className="flex gap-3 items-start p-3 bg-slate-950/50 rounded-xl border border-slate-800">
                                  <div className="w-5 h-5 bg-blue-500/10 text-blue-400 rounded-full flex items-center justify-center text-[10px] font-black shrink-0">{idx+1}</div>
                                  <p className="text-xs text-slate-300 leading-relaxed italic">{step}</p>
                              </div>
                          ))}
                      </div>

                      <div className="p-5 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex gap-3">
                          <Lightbulb className="w-5 h-5 text-amber-500 mt-1 shrink-0" />
                          <div>
                              <span className="text-[10px] font-black uppercase text-amber-500">Dica do Orientador</span>
                              <p className="text-xs text-amber-200/80 mt-1 font-medium italic">"{selectedStage.tip}"</p>
                          </div>
                      </div>

                      <button onClick={() => setSelectedStage(null)} className="w-full py-4 bg-slate-800 text-slate-300 rounded-2xl font-bold hover:bg-slate-700 transition-all text-sm">
                          Entendi, vamos lá!
                      </button>
                  </div>
               </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Footer info */}
        <footer className="mt-20 text-center border-t border-slate-800 pt-10">
            <p className="text-slate-600 text-xs font-mono uppercase tracking-widest text-center">Foco, persistência e rigor científico.</p>
        </footer>
      </div>
    </div>
  );
}
