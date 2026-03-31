import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ZoomIn, Eye, ShieldCheck, ClipboardList, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

import { SpotTheBug } from '../components/data/aula2-2/SpotTheBug';
import { DataDiffChallenge } from '../components/data/aula2-2/DataDiffChallenge';
import { VerificationChecklist } from '../components/data/aula2-2/VerificationChecklist';

const SLIDES = [
  {
    id: '1',
    title: 'Orientação ao Detalhe',
    subtitle: 'A Lente de Aumento do Analista',
    tag: 'INTRODUÇÃO',
    accent: 'blue',
    content: (
      <div className="space-y-6">
        <p className="text-2xl font-light text-slate-300 leading-relaxed text-center sm:text-left">
          Na Análise de Dados, <span className="text-blue-400 font-bold italic">"quase certo"</span> é o mesmo que <span className="text-rose-400 font-bold italic">"errado"</span>.
        </p>
        <div className="h-px w-full bg-gradient-to-r from-blue-500/50 to-transparent my-6" />
        <p className="text-slate-400">
          Orientação ao Detalhe (BSM-OD) é a habilidade de perceber as pequenas inconsistências que outros ignoram. Um zero a mais, uma vírgula no lugar errado ou uma data inexistente podem custar milhões a uma empresa e destruir a credibilidade de um profissional.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
           <div className="p-4 bg-slate-900/80 rounded-2xl border border-blue-500/20">
              <Eye className="w-6 h-6 text-blue-400 mb-2" />
              <div className="text-sm font-bold text-white uppercase tracking-tighter">Observação Ativa</div>
              <p className="text-xs text-slate-500 mt-1">Scanear dados em busca de padrões e anomalias antes de processar.</p>
           </div>
           <div className="p-4 bg-slate-900/80 rounded-2xl border border-blue-500/20">
              <ShieldCheck className="w-6 h-6 text-blue-400 mb-2" />
              <div className="text-sm font-bold text-white uppercase tracking-tighter">Foco na Precisão</div>
              <p className="text-xs text-slate-500 mt-1">Garantir que a transformação do dado não altere sua integridade original.</p>
           </div>
        </div>
      </div>
    )
  },
  {
    id: '2',
    title: 'O Caso de Jordana (Pt. I)',
    subtitle: 'O Email Invisível',
    tag: 'ESTUDO DE CASO',
    accent: 'amber',
    content: (
      <div className="flex flex-col md:flex-row gap-8 items-center">
         <div className="flex-1 space-y-6">
            <p className="text-slate-300 italic border-l-4 border-amber-500 pl-6 py-2 bg-amber-500/5 rounded-r-xl">
               "Jordana é uma excelente programadora, mas tem pressa. Ela recebeu um convite para uma reunião importante, mas leu apenas o título: 'Discussão de Projeto'. Ela presumiu que seria na sala de sempre, às 14h."
            </p>
            <p className="text-slate-400 text-sm">
               No corpo do email, estava escrito em negrito: <strong className="text-amber-400">"Local: Mezanino B. Horário: 13:30h (30 min antes do usual)."</strong>
            </p>
            <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-3">
               <div className="text-xs font-black text-rose-400 uppercase tracking-[0.2em]">O Resultado:</div>
               <p className="text-sm text-slate-200 font-medium">Jordana chegou ao local errado, 30 minutos atrasada. A decisão importante foi tomada sem a opinião técnica dela.</p>
            </div>
         </div>
         <div className="w-full md:w-64 aspect-square bg-amber-500/10 rounded-full border-4 border-amber-500/20 flex flex-col items-center justify-center relative group overflow-hidden">
             <ZoomIn className="w-20 h-20 text-amber-500/40 group-hover:scale-110 transition-transform duration-500" />
             <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 to-transparent" />
             <span className="mt-4 text-[10px] font-black tracking-widest text-amber-500 uppercase">FALTOU FOCO</span>
         </div>
      </div>
    )
  },
  {
    id: '3',
    title: 'Por que o Detalhe é Crítico?',
    subtitle: 'Impacto na Análise de Dados',
    tag: 'TEORIA 01',
    accent: 'indigo',
    content: (
      <div className="space-y-6">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3 p-4 bg-slate-900/60 rounded-2xl border border-indigo-500/10">
               <Zap className="w-8 h-8 text-indigo-400" />
               <h4 className="text-white font-bold leading-tight">Credibilidade Técnica</h4>
               <p className="text-xs text-slate-500">Se o seu Dashboard mostra "Vendas: R$ 1.500" mas o relatórios do financeiro diz "R$ 15.000", ninguém mais confiará nos seus dados.</p>
            </div>
            <div className="space-y-3 p-4 bg-slate-900/60 rounded-2xl border border-indigo-500/10">
               <ShieldCheck className="w-8 h-8 text-indigo-400" />
               <h4 className="text-white font-bold leading-tight">Decisões Seguras</h4>
               <p className="text-xs text-slate-500">Decisões de investimento são baseadas em tendências. Um erro de 1% pode significar uma perda de milhões em transações reais.</p>
            </div>
            <div className="space-y-3 p-4 bg-slate-900/60 rounded-2xl border border-indigo-500/10">
               <Eye className="w-8 h-8 text-indigo-400" />
               <h4 className="text-white font-bold leading-tight">Manutenabilidade</h4>
               <p className="text-xs text-slate-500">Código limpo e nomes de variáveis padronizados facilitam que outros analistas continuem seu trabalho sem erros de interpretação.</p>
            </div>
         </div>
         <div className="mt-8 p-6 bg-slate-950 rounded-2xl border border-slate-800 text-center">
            <p className="text-slate-400 text-sm italic italic">"A diferença entre ser um amador que gera gráficos bonitos e um Profissional de Dados está na verificação obsessiva."</p>
         </div>
      </div>
    )
  },
  {
    id: '4',
    title: 'Hora de Praticar',
    subtitle: 'Scan Mental em Base de Vendas',
    tag: 'INTERAÇÃO',
    accent: 'amber',
    content: <SpotTheBug />
  },
  {
    id: '5',
    title: 'Os 3 Pilares do Detalhe',
    subtitle: 'Metodologia de Precisão',
    tag: 'TEORIA 02',
    accent: 'emerald',
    content: (
      <div className="space-y-8">
         <div className="flex flex-col gap-4">
            <div className="flex items-start gap-6 group">
               <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center font-black text-emerald-400 text-xl border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all">01</div>
               <div className="flex-1 pt-1">
                  <h4 className="text-lg font-bold text-white mb-1">OBSERVAR: Escaneamento Ativo</h4>
                  <p className="text-sm text-slate-400">Ler o material completo (emails, documentação, CSVs) do início ao fim. Ignorar trechos é o caminho mais curto para o erro.</p>
               </div>
            </div>
            <div className="flex items-start gap-6 group">
               <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center font-black text-emerald-400 text-xl border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all">02</div>
               <div className="flex-1 pt-1">
                  <h4 className="text-lg font-bold text-white mb-1">EXECUTAR: Foco Total no Meio</h4>
                  <p className="text-sm text-slate-400">Realizar a tarefa sem distrações. Ao formatar uma coluna, verifique se o critério de inclusão não deixou ninguém de fora injustamente.</p>
               </div>
            </div>
            <div className="flex items-start gap-6 group">
               <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center font-black text-emerald-400 text-xl border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all">03</div>
               <div className="flex-1 pt-1">
                  <h4 className="text-lg font-bold text-white mb-1">VERIFICAR: O Filtro Final</h4>
                  <p className="text-sm text-slate-400">Ser o seu próprio crítico. Use um checklist. Compare a saída com a entrada. Se os números não batem, não prossiga.</p>
               </div>
            </div>
         </div>
      </div>
    )
  },
  {
    id: '6',
    title: 'Visão de Águia',
    subtitle: 'Conciliação de Sistemas',
    tag: 'INTERAÇÃO',
    accent: 'blue',
    content: <DataDiffChallenge />
  },
  {
    id: '7',
    title: 'Efeito Borboleta nos Dados',
    subtitle: 'Pequenos Erros, Grandes Consequências',
    tag: 'TEORIA 03',
    accent: 'rose',
    content: (
      <div className="space-y-6">
         <div className="bg-rose-950/20 border border-rose-500/30 p-8 rounded-[2.5rem] relative overflow-hidden">
            <div className="absolute -top-10 -right-10 opacity-5">
               <Zap className="w-64 h-64 text-rose-500" />
            </div>
            <div className="relative z-10 space-y-6">
               <div className="flex gap-4 items-center">
                  <div className="w-2 h-12 bg-rose-500 rounded-full" />
                  <h4 className="text-3xl font-black text-white">Transposição e Separadores</h4>
               </div>
               <p className="text-slate-300">
                  Um erro comum em importação de dados é o conflito entre o ponto decimal <span className="text-rose-400 font-mono font-bold">(1.500)</span> e a vírgula <span className="text-rose-400 font-mono font-bold">(1,500)</span>.
               </p>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-950/50 rounded-2xl border border-slate-800">
                     <span className="text-[10px] uppercase font-black text-slate-500 block mb-2">ERRO TIPO A</span>
                     <div className="text-2xl font-mono text-rose-400 line-through">R$ 1,500</div>
                     <p className="text-xs text-slate-500 mt-2">O sistema lê "Mil e Quinhentos" ao invés de "Um real e cinquenta centavos".</p>
                  </div>
                  <div className="p-4 bg-slate-950/50 rounded-2xl border border-slate-800">
                     <span className="text-[10px] uppercase font-black text-slate-500 block mb-2">SITUAÇÃO B</span>
                     <div className="text-2xl font-mono text-emerald-400 font-bold">R$ 1.500,00</div>
                     <p className="text-xs text-slate-500 mt-2">Padrão correto definido no protocolo de QA da empresa.</p>
                  </div>
               </div>
               <p className="text-xs text-slate-400 mt-4 italic">Imagine faturar uma venda de 1 milhão de reais como 1 mil reais... ou vice-versa.</p>
            </div>
         </div>
      </div>
    )
  },
  {
    id: '8',
    title: 'O Caso de Jordana (Pt. II)',
    subtitle: 'A Evolução da Senioridade',
    tag: 'ESTUDO DE CASO',
    accent: 'emerald',
    content: (
      <div className="flex flex-col md:flex-row gap-12 items-center">
         <div className="flex-1 space-y-6 order-2 md:order-1">
            <h4 className="text-2xl font-bold text-white leading-tight">O que aconteceu depois?</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
               Sentindo-se mal pelo erro, Jordana mudou sua abordagem. Ela criou um <span className="text-emerald-400 font-bold">Checklist de Recebimento de Demandas</span>. Agora, toda vez que recebe um email:
            </p>
            <ul className="space-y-2 text-slate-300 text-sm">
               <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Lê o email duas vezes (Início e Fim).
               </li>
               <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Confirma datas e locais via calendário.
               </li>
               <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Verifica destinatários e horários de fuso.
               </li>
            </ul>
            <p className="text-xs text-emerald-400 font-bold bg-emerald-500/10 p-3 rounded-lg inline-block italic">
               "Jordana tornou-se a referência do time em confiabilidade em menos de 3 meses."
            </p>
         </div>
         <div className="w-full md:w-72 aspect-[3/4] bg-slate-900 rounded-[3rem] border-2 border-emerald-500/30 overflow-hidden relative group order-1 md:order-2">
             <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 to-transparent z-10" />
             <div className="absolute inset-0 flex items-center justify-center">
                <ShieldCheck className="w-32 h-32 text-emerald-500/20 group-hover:scale-125 transition-transform duration-700" />
             </div>
             <div className="absolute bottom-10 left-10 right-10 z-20 space-y-2 text-center md:text-left">
                <span className="text-[10px] font-black text-emerald-400 tracking-[0.3em] uppercase">PERFIL SENIOR</span>
                <div className="text-xl font-bold text-white">Precisão Operacional</div>
             </div>
         </div>
      </div>
    )
  },
  {
    id: '9',
    title: 'Seu Protocolo de QA',
    subtitle: 'Criando sua Rede de Proteção',
    tag: 'INTERAÇÃO',
    accent: 'emerald',
    content: <VerificationChecklist />
  },
  {
    id: '10',
    title: 'Desafio Final: Reporte de QA',
    subtitle: 'Consolidando as Descobertas',
    tag: 'LABORATÓRIO',
    accent: 'purple',
    content: (
      <div className="space-y-8 max-w-2xl mx-auto">
         <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
            <h4 className="text-white font-bold text-lg flex items-center gap-2">
               <ClipboardList className="w-5 h-5 text-purple-400" /> Cenário de Conclusão:
            </h4>
            <p className="text-sm text-slate-400 leading-relaxed italic">
               "Você acaba de finalizar a limpeza de um dataset de 50.000 linhas de vendas de e-commerce. Você encontrou 200 IDs nulos e 50 preços negativos."
            </p>
            <div className="space-y-3 mt-6">
               <p className="text-sm font-bold text-slate-200 uppercase tracking-tighter">Qual a atitude profissional correta para o reporte?</p>
               <div className="grid grid-cols-1 gap-2">
                  <button className="w-full p-4 text-left text-xs bg-slate-950 border border-rose-500/20 hover:border-rose-500 text-slate-500 hover:text-rose-300 rounded-xl transition-all">
                     A) Ignorar os erros e gerar o gráfico. Afinal, 250 erros em 50.000 não mudam a média.
                  </button>
                  <button onClick={() => alert("Exato! Transparência técnica sobre a limpeza é o que separa um analista junior de um senior.")} className="w-full p-4 text-left text-xs bg-slate-950 border border-emerald-500/20 hover:border-emerald-400 text-slate-500 hover:text-emerald-300 rounded-xl transition-all">
                     B) Documentar os erros encontrados, o método de tratamento e então gerar o dashboard.
                  </button>
                  <button className="w-full p-4 text-left text-xs bg-slate-950 border border-blue-500/20 hover:border-blue-400 text-slate-500 hover:text-blue-300 rounded-xl transition-all">
                     C) Deletar tudo e pedir uma base nova sem explicar o porquê.
                  </button>
               </div>
            </div>
         </div>
      </div>
    )
  },
  {
    id: '11',
    title: 'Fim da Aula 2.2',
    subtitle: 'Detalhe não é Perfeccionismo',
    tag: 'ENCERRAMENTO',
    accent: 'blue',
    content: (
      <div className="text-center space-y-8 py-12">
         <div className="w-24 h-24 bg-blue-500/10 rounded-full border-2 border-blue-500/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-blue-400" />
         </div>
         <div className="space-y-4">
            <h3 className="text-3xl md:text-5xl font-black text-white">Missão Cumprida.</h3>
            <p className="text-lg text-slate-400 max-w-lg mx-auto">
               Você agora entende que a <span className="text-blue-400 font-bold">Orientação ao Detalhe</span> não é sobre ser lento, mas sobre ser certeiro. 
            </p>
         </div>
         <div className="pt-10">
            <Link to="/data" className="inline-flex items-center gap-3 bg-white text-slate-950 font-black px-10 py-5 rounded-2xl hover:scale-105 transition-transform shadow-2xl shadow-white/10 group">
               VOLTAR AO SYLLABUS
               <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
         </div>
      </div>
    )
  }
];

export function DataLesson2_2() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number) => {
    const next = currentSlide + newDirection;
    if (next >= 0 && next < SLIDES.length) {
      setDirection(newDirection);
      setCurrentSlide(next);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') paginate(1);
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') paginate(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const slide = SLIDES[currentSlide];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-blue-500/30 overflow-x-hidden relative flex flex-col">
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div 
          animate={{ background: `radial-gradient(ellipse at top right, rgba(var(--tw-colors-${slide.accent}-500), 0.1) 0%, rgba(2,6,23,1) 100%)` }}
          transition={{ duration: 1 }}
          className="absolute inset-0 opacity-80" 
        />
      </div>

      <header className="relative z-20 px-8 py-6 flex justify-between items-center border-b border-slate-800 backdrop-blur-md bg-slate-950/40">
        <div className="flex items-center gap-4">
           <Link to="/data" className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center transition-colors">
              <ChevronLeft className="w-5 h-5 text-white" />
           </Link>
           <div>
              <h1 className="text-sm font-black tracking-widest text-slate-400 uppercase">Análise de Dados <span className={`text-${slide.accent}-400 border-l border-white/20 pl-2 ml-1`}>AULA 2.2 • PRECISION FOCUS</span></h1>
              <div className="flex gap-1 mt-1">
                 <div className="h-0.5 w-8 bg-blue-500 rounded-full" />
                 <div className="h-0.5 w-8 bg-amber-500 rounded-full" />
                 <div className="h-0.5 w-8 bg-emerald-500 rounded-full" />
                 <div className="h-0.5 w-8 bg-indigo-500 rounded-full" />
              </div>
           </div>
        </div>
        
        <div className="flex items-center gap-6 hidden sm:flex">
           <div className="flex space-x-1">
              {SLIDES.map((_, i) => (
                <div key={i} className={`h-2 rounded-full transition-all ${i === currentSlide ? `w-6 bg-${slide.accent}-500 shadow-[0_0_10px_rgba(var(--tw-colors-${slide.accent}-500),0.5)]` : 'w-2 bg-slate-800'}`} />
              ))}
           </div>
           <div className="text-[10px] font-mono text-slate-500 font-bold tracking-tighter w-12 text-right">
             {currentSlide + 1} / {SLIDES.length}
           </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12 flex items-center justify-center flex-1 pb-32">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 50 : -50, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: direction > 0 ? -50 : 50, filter: 'blur(10px)' }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className={`w-full max-w-7xl flex flex-col items-center justify-center`}
          >
            <div className={`space-y-6 w-full ${slide.tag === 'INTERAÇÃO' || slide.tag === 'LABORATÓRIO' ? 'max-w-5xl' : 'max-w-3xl'}`}>
               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-2">
                  <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black tracking-[0.2em] bg-${slide.accent}-500/10 text-${slide.accent}-400 border border-${slide.accent}-500/30`}>
                    {slide.tag}
                  </span>
                  <h2 className="text-4xl md:text-5xl font-black text-white leading-tight underline decoration-white/10 decoration-wavy underline-offset-8">{slide.title}</h2>
                  <p className="text-lg md:text-xl text-slate-400 font-medium">{slide.subtitle}</p>
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0, scale: 0.98 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: 0.1 }}
                 className={`w-full mx-auto mt-8 ${slide.tag.includes('TEORIA') || slide.tag.includes('INTRO') || slide.tag.includes('CASO') ? 'bg-slate-900/60 backdrop-blur-xl border border-slate-700 p-8 md:p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden' : ''}`}
               >
                  {slide.content}
               </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="fixed bottom-0 left-0 w-full p-6 z-20 flex justify-between items-center pointer-events-none">
        <button onClick={() => paginate(-1)} disabled={currentSlide === 0} className="pointer-events-auto p-4 rounded-3xl bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900 transition-all disabled:opacity-20 backdrop-blur-xl group shadow-lg">
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
        </button>
        <button onClick={() => paginate(1)} disabled={currentSlide === SLIDES.length - 1} className={`pointer-events-auto p-4 rounded-3xl bg-${slide.accent}-600/90 border border-${slide.accent}-400/50 text-white hover:bg-${slide.accent}-500 shadow-[0_0_30px_rgba(var(--tw-colors-${slide.accent}-500),0.5)] transition-all disabled:opacity-20 backdrop-blur-xl group`}>
          <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>
      </footer>
    </div>
  );
}
