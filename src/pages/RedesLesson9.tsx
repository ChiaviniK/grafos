import { useState, useEffect } from 'react';
import { Network, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

import { VlanSimulator } from '../components/redes/VlanSimulator';
import { IpSimulator } from '../components/redes/IpSimulator';
import { TcpHandshakeSimulator } from '../components/redes/TcpHandshakeSimulator';
import { RemoteAccessSimulator } from '../components/redes/RemoteAccessSimulator';
import { FirewallSimulator } from '../components/redes/FirewallSimulator';
import { NetworkInteractiveQuiz } from '../components/redes/NetworkInteractiveQuiz';
import { NetworkReportCard } from '../components/redes/NetworkReportCard';

export function RedesLesson9() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const [scores, setScores] = useState({
    ipLab: 0,
    tcpLab: 0,
    sshLab: 0,
    firewallLab: 0,
    vlanLab: 0,
    quiz: [] as number[],
  });

  const SLIDES = [
    {
      id: 'intro',
      title: 'VLANs e Segmentação Lógica',
      subtitle: 'O conceito de Virtual Local Area Networks',
      tag: 'INTRODUÇÃO',
      content: (
        <div className="space-y-6">
          <p className="text-slate-300 text-lg leading-relaxed">
            Em redes corporativas antigas, todos os computadores de diferentes departamentos (Vendas, RH, Engenharia) ficavam em um mesmo switch físico e formavam um único <strong>Domínio de Broadcast</strong>. 
          </p>
          <div className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full blur-2xl"></div>
             <p className="text-slate-200">
                Uma <strong>VLAN (802.1Q)</strong> permite criar divisões "lógicas" dentro de um hardware. É como pegar um switch de 24 portas e mentalmente (via software) quebrá-lo em vários switches menores de 8 portas, garantindo segurança, performance e organização sem precisar comprar equipamentos físicos extras.
             </p>
          </div>
        </div>
      )
    },
    {
      id: 'lab-ip',
      title: 'Diagnóstico L3',
      subtitle: 'Troubleshooting de IPv4 / Subnet',
      tag: 'LABORATÓRIO IP (20 pts)',
      content: (
        <IpSimulator onComplete={(s) => setScores(p => ({ ...p, ipLab: s }))} />
      )
    },
    {
      id: 'lab-tcp',
      title: 'Transmissão L4',
      subtitle: 'Validando Sockets com TCP 3-Way Handshake',
      tag: 'LABORATÓRIO TCP (20 pts)',
      content: (
        <TcpHandshakeSimulator onComplete={(s) => setScores(p => ({ ...p, tcpLab: s }))} />
      )
    },
    {
      id: 'lab-firewall',
      title: 'Defesa de Perímetro L4',
      subtitle: 'Tabela de Regras e Access Control Lists',
      tag: 'LABORATÓRIO FIREWALL (20 pts)',
      content: (
        <FirewallSimulator onComplete={(s) => setScores(p => ({ ...p, firewallLab: s }))} />
      )
    },
    {
      id: 'lab-vlan',
      title: 'Isolamento de Broadcast',
      subtitle: 'Segmentando o tráfego Layer 2',
      tag: 'LABORATÓRIO VLAN (20 pts)',
      content: (
        <VlanSimulator onComplete={(s) => setScores(p => ({ ...p, vlanLab: s }))} />
      )
    },
    {
      id: 'lab-ssh',
      title: 'Acesso Remoto L7',
      subtitle: 'Múltiplos protocolos de Gerenciamento',
      tag: 'LABORATÓRIO ADMIN (20 pts)',
      content: (
        <RemoteAccessSimulator onComplete={(s) => setScores(p => ({ ...p, sshLab: s }))} />
      )
    },
    {
      id: 'trunking',
      title: 'Topologias Trunk',
      subtitle: 'Carregando Múltiplas VLANs via um Cabo',
      tag: 'CONCEITO L2',
      content: (
        <div className="space-y-6">
          <p className="text-slate-300 text-lg leading-relaxed">
            Se temos 3 VLANs diferentes num prédio (andar 1) e queremos que elas falem com as mesmas 3 VLANs do prédio ao lado (andar 2), precisaríamos de 3 cabos conectando os switches? Não!
          </p>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
             <div className="flex gap-4 items-center">
                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border-2 border-slate-700">
                   <Network className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                   <h4 className="text-white font-bold text-lg">Modo Trunk (IEEE 802.1Q)</h4>
                   <p className="text-slate-400 text-sm mt-1">
                      A porta Trunk transporta tráfego de várias VLANs juntas pelo mesmo cabo. Ela faz isso "etiquetando" (Tagueando) cada pacote com o número da VLAN de onde ele veio. 
                   </p>
                </div>
             </div>
          </div>
        </div>
      )
    },
    {
      id: 'quiz',
      title: 'Verificador de Topologia',
      subtitle: 'Exame Final 802.1Q',
      tag: 'QUIZ INTERATIVO (50 pts)',
      content: (
        <NetworkInteractiveQuiz onComplete={(arr) => setScores(p => ({ ...p, quiz: arr }))} />
      )
    },
    {
      id: 'report',
      title: 'Transmissão Base',
      subtitle: 'Exportação Analítica do Tráfego L2',
      tag: 'ENCERRAMENTO',
      content: (
        <NetworkReportCard scores={scores} />
      )
    }
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentSlide]);

  const slide = SLIDES[currentSlide];
  const isWidthConstrainedList = ['LABORATÓRIO IP (20 pts)', 'LABORATÓRIO TCP (20 pts)', 'LABORATÓRIO FIREWALL (20 pts)', 'LABORATÓRIO VLAN (20 pts)', 'LABORATÓRIO ADMIN (20 pts)', 'QUIZ INTERATIVO (50 pts)', 'ENCERRAMENTO'];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-blue-500/30 overflow-x-hidden relative flex flex-col">
       
       <div className="absolute inset-0 max-w-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[150px] mix-blend-screen" />
          <div className="absolute top-[40%] -left-[10%] w-[40%] h-[40%] rounded-full bg-cyan-900/10 blur-[120px] mix-blend-screen" />
       </div>

       <div className="flex-1 w-full max-w-7xl mx-auto px-6 pt-16 pb-32 relative z-10 flex flex-col">
          <Link to="/redes" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors uppercase tracking-widest text-xs font-bold mb-12 w-fit">
             <ArrowLeft className="w-4 h-4" /> Syllabus Redes
          </Link>

          <header className="mb-16">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase mb-6">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                CONVERGÊNCIA AULA 09
             </div>
             
             <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="max-w-3xl">
                   <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-4 leading-tight">
                     {slide.title}
                   </h1>
                   <p className="text-xl text-slate-400 font-light tracking-wide">
                     {slide.subtitle}
                   </p>
                </div>

                <div className="flex items-center gap-2 bg-slate-900/50 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-800 shrink-0">
                   {SLIDES.map((_, i) => (
                      <div key={i} className={`h-2 rounded-full transition-all duration-500 ${
                         i === currentSlide ? 'w-8 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' 
                         : i < currentSlide ? 'w-2 bg-slate-600' 
                         : 'w-2 bg-slate-800'
                      }`} />
                   ))}
                </div>
             </div>
          </header>

          <div className="relative">
             <AnimatePresence mode="wait">
               <motion.div
                 key={currentSlide}
                 initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                 animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                 exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                 transition={{ duration: 0.4, ease: "easeOut" }}
                 className={`w-full ${isWidthConstrainedList.includes(slide.tag) ? 'max-w-5xl mx-auto' : 'max-w-3xl'}`}
               >
                 <div className="mb-8">
                   <span className="text-xs font-bold text-slate-500 tracking-widest uppercase">{slide.tag}</span>
                 </div>
                 
                 {slide.content}

                 <div className="h-12" />
               </motion.div>
             </AnimatePresence>
          </div>
       </div>

       {/* Footer Navigation */}
       <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4">
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 p-2 rounded-2xl shadow-2xl flex items-center justify-between">
             <button
                onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
                disabled={currentSlide === 0}
                className="p-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all disabled:opacity-30 disabled:hover:bg-transparent"
             >
                <ArrowLeft className="w-5 h-5" />
             </button>
             
             <div className="text-xs font-bold text-slate-400 tracking-widest uppercase">
                Passo {currentSlide + 1} de {SLIDES.length}
             </div>

             <button
                onClick={() => setCurrentSlide(prev => Math.min(SLIDES.length - 1, prev + 1))}
                disabled={currentSlide === SLIDES.length - 1}
                className="p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all disabled:opacity-30 disabled:hover:bg-blue-600 shadow-lg"
             >
                <ArrowRight className="w-5 h-5" />
             </button>
          </div>
       </div>

    </div>
  )
}
