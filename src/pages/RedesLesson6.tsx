import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Network, ShieldCheck, Gamepad2, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UdpCannon } from '../components/redes/UdpCannon';
import { TcpHandshake } from '../components/redes/TcpHandshake';

const SLIDES = [
  {
    id: '1',
    title: 'A Ponte de Comando',
    subtitle: 'Navegando da Camada 3 para a Camada 4',
    tag: '01. INTRODUÇÃO',
    image: '/assets/redes_aula6/pixel_router_bridge.png',
    accent: 'blue',
    content: (
      <div className="space-y-4">
        <p className="text-2xl font-light text-slate-300 leading-relaxed">
          O Protocolo IP acha as máquinas na Internet. A <span className="text-blue-400 font-bold">Camada de Transporte</span> acha a *Aplicação* certa.
        </p>
        <div className="h-px w-full bg-gradient-to-r from-blue-500/50 to-transparent my-6" />
        <p className="text-slate-400">
          Você tem milhares de abas abertas, jogos, Spotify e Discord rodando no mesmo computador, usando o mesmo endereço IP. Como o dado que chega sabe para qual janela ele deve ir? Bem-vindo à Camada 4.
        </p>
      </div>
    )
  },
  {
    id: '2',
    title: 'O Problema da Entrega',
    subtitle: 'Dois Caminhos, Duas Filosofias',
    tag: 'FUNDAMENTOS',
    image: '',
    accent: 'purple',
    content: (
      <div className="space-y-6">
         <p className="text-slate-300">A Camada de Transporte delega a missão tática final para dois agentes lendários com métodos diametralmente opostos.</p>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
             <div className="bg-orange-900/20 p-6 rounded-2xl border border-orange-500/30 hover:shadow-[0_0_20px_rgba(249,115,22,0.15)] transition-all">
                <Gamepad2 className="w-10 h-10 text-orange-400 mb-4" />
                <h4 className="text-orange-400 font-black text-xl mb-2">UDP</h4>
                <p className="text-sm text-slate-400">O velocista caótico. Atira pacotes sem olhar se chegaram. Ideal para Games e Streaming.</p>
             </div>
             <div className="bg-emerald-900/20 p-6 rounded-2xl border border-emerald-500/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all">
                <ShieldCheck className="w-10 h-10 text-emerald-400 mb-4" />
                <h4 className="text-emerald-400 font-black text-xl mb-2">TCP</h4>
                <p className="text-sm text-slate-400">O diplomata paranoico. Garante 100% de entrega na ordem perfeita, ou morre tentando.</p>
             </div>
         </div>
      </div>
    )
  },
  {
    id: '3',
    title: 'O Protocolo Sem Conexão',
    subtitle: 'User Datagram Protocol (UDP)',
    tag: '02. RÁPIDO E CEGO',
    image: '',
    accent: 'orange',
    content: (
      <div className="space-y-6">
        <h3 className="text-3xl font-black text-white tracking-widest uppercase">Caos Voluntário</h3>
        <p className="text-slate-300">
           Para o UDP, montar uma conexão formal é perda de tempo. Ele apenas pega a carga útil, estampa o endereço e "chuta" para a nuvem. Não há confirmação de recebimento (Ack), nem retransmissão de dados perdidos.
        </p>
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
           <p className="text-sm text-slate-400 italic">"Se um frame do vídeo travar ou uma bala do jogo não registrar, ignore e mostre o momento seguinte. Voltar no tempo para recuperar o frame perdido no FPS faz você levar um Headshot na vida real do jogo."</p>
        </div>
      </div>
    )
  },
  {
    id: '4',
    title: '[INTERAÇÃO] O Canhão UDP',
    subtitle: 'Dispare até o Alvo',
    tag: 'SIMULADOR',
    image: '',
    accent: 'rose',
    content: (
        <UdpCannon />
    )
  },
  {
    id: '5',
    title: 'O Aperto de Mãos',
    subtitle: 'Transmission Control Protocol (TCP)',
    tag: '03. CONFIANÇA',
    image: '/assets/redes_aula6/pixel_tcp_vault.png',
    accent: 'emerald',
    content: (
      <div className="space-y-6">
         <p className="text-slate-300">
            A Web não funciona com perda de dados. Perder um único pacote HTTP significa corromper um arquivo zip gigantesco ou quebrar um Javascript crítico.
         </p>
         <ul className="text-sm text-slate-400 space-y-3 list-none">
            <li className="flex gap-3"><ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0"/> <span><strong className="text-white">Confiável:</strong> Todo pacote exige recibo.</span></li>
            <li className="flex gap-3"><ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0"/> <span><strong className="text-white">Ordenado:</strong> Controle de números de sequência remontam arquivos gigantes na ordem exata.</span></li>
            <li className="flex gap-3"><ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0"/> <span><strong className="text-white">Orientado a Conexão:</strong> O famoso Three-Way Handshake.</span></li>
         </ul>
      </div>
    )
  },
  {
    id: '6',
    title: 'O Ritual do TCP',
    subtitle: 'O 3-Way Handshake (SYN / ACK)',
    tag: 'ANATOMIA',
    image: '/assets/redes_aula6/pixel_tcp_handshake.png',
    accent: 'blue',
    content: (
      <div className="space-y-6">
         <p className="text-slate-300">
            Antes do TCP enviar 1 byte de dados úteis, Cliente e Servidor devem jurar lealdade criando um túnel lógico pelas redes tempestuosas.
         </p>
         <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 font-mono text-sm space-y-4">
             <div className="flex items-center gap-4 text-emerald-400">
                <span className="bg-emerald-500/20 px-2 py-1 rounded">Passo 1</span>
                <span>Cliente ➔ <b>SYN</b> (Sincronizar? Posso falar?)</span>
             </div>
             <div className="flex items-center gap-4 text-blue-400">
                <span className="bg-blue-500/20 px-2 py-1 rounded">Passo 2</span>
                <span>Servidor ➔ <b>SYN-ACK</b> (Pode Falar. Eu também quero!)</span>
             </div>
             <div className="flex items-center gap-4 text-emerald-400">
                <span className="bg-emerald-500/20 px-2 py-1 rounded">Passo 3</span>
                <span>Cliente ➔ <b>ACK</b> (Fechado, começando a transmitir.)</span>
             </div>
         </div>
      </div>
    )
  },
  {
    id: '7',
    title: '[GAME] Conecte os Nós',
    subtitle: 'Handshake Simulator',
    tag: 'DESAFIO',
    image: '',
    accent: 'amber',
    content: (
        <TcpHandshake />
    )
  },
  {
    id: '8',
    title: 'A Janela Deslizante',
    subtitle: 'Controle de Congestionamento TCP',
    tag: 'ENGENHARIA AVANÇADA',
    image: '',
    accent: 'teal',
    content: (
      <div className="space-y-6">
         <p className="text-slate-300">
            O TCP não é apenas confiável, ele é Polido. Se o TCP notar que a Internet está caótica com roteadores dropando pacotes freneticamente, ele freia.
         </p>
         <h3 className="text-2xl font-black text-teal-400 uppercase">Slow Start</h3>
         <p className="text-slate-400 text-sm">
             A Janela TCP começa pequena. Manda 1 pacote. Se houver `ACK`, manda 2. Depois 4, 8, 16. O crescimento é exponencial, sondando a inteligência da rede até achar o limite geográfico de vazão, maximizando a conexão sem derrubar a infraestrutura global.
         </p>
      </div>
    )
  },
  {
    id: '9',
    title: 'Portas de Serviço',
    subtitle: 'Mapeando os Apartamentos Subnetários',
    tag: '04. VISÃO GERAL',
    image: '/assets/redes_aula6/pixel_port_mapping.png',
    accent: 'indigo',
    content: (
      <div className="space-y-6">
         <p className="text-slate-300">
            Como dito, o IP acha a máquina, a Porta identifica o Serviço interno. Os 65.535 "quartos" possíveis em cada computador:
         </p>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <div className="bg-indigo-900/30 border border-indigo-500/40 rounded-xl p-4 text-center">
                 <div className="text-2xl font-black text-indigo-400">80</div>
                 <div className="text-xs text-slate-400 font-bold mt-1">HTTP (TCP)</div>
             </div>
             <div className="bg-indigo-900/30 border border-indigo-500/40 rounded-xl p-4 text-center">
                 <div className="text-2xl font-black text-indigo-400">443</div>
                 <div className="text-xs text-slate-400 font-bold mt-1">HTTPS (TCP)</div>
             </div>
             <div className="bg-orange-900/30 border border-orange-500/40 rounded-xl p-4 text-center">
                 <div className="text-2xl font-black text-orange-400">53</div>
                 <div className="text-xs text-slate-400 font-bold mt-1">DNS (UDP)</div>
             </div>
             <div className="bg-emerald-900/30 border border-emerald-500/40 rounded-xl p-4 text-center">
                 <div className="text-2xl font-black text-emerald-400">22</div>
                 <div className="text-xs text-slate-400 font-bold mt-1">SSH (TCP)</div>
             </div>
         </div>
      </div>
    )
  },
  {
    id: '10',
    title: 'Missão Cumprida',
    subtitle: 'Navegação até a Camada de Aplicação',
    tag: 'CONCLUSÃO',
    image: '/assets/redes_aula6/pixel_router_bridge.png',
    accent: 'blue',
    content: (
      <div className="space-y-8 flex flex-col items-center">
         <p className="text-lg text-slate-300 text-center">
             Dominamos o alicerce físico (Link), superamos a logística de vizinhança na Nuvem (IPv4/Router), e agora entendemos a confiabilidade entre Terminais (TCP/UDP).
         </p>
         <div className="inline-block px-8 py-4 bg-blue-900/40 border border-blue-500 rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:scale-105 transition-transform cursor-pointer">
             <h3 className="text-2xl font-black text-white whitespace-nowrap text-center flex items-center gap-3">
                 <Globe className="w-8 h-8" /> Rumo à Web!
             </h3>
         </div>
         <p className="text-slate-500 text-xs italic">Isso fica para a Aula 7 - Camada de Aplicação (HTTP).</p>
      </div>
    )
  }
];

export function RedesLesson6() {
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

  const visualContent = slide.image ? (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl group"
    >
        <img 
        src={slide.image} 
        alt={slide.title}
        className="w-full h-full object-cover pixelated transform group-hover:scale-105 transition-transform duration-1000"
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60`} />
    </motion.div>
  ) : (
    <div className={`relative aspect-video rounded-3xl overflow-hidden border border-${slide.accent}-500/20 shadow-2xl bg-${slide.accent}-950/20 flex items-center justify-center`}>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-10" />
        {slide.accent === 'orange' && <Gamepad2 className={`w-32 h-32 text-orange-500/30 animate-pulse`} />}
        {slide.accent === 'emerald' && <ShieldCheck className={`w-32 h-32 text-emerald-500/30 animate-pulse`} />}
        {slide.accent === 'teal' && <Network className={`w-32 h-32 text-teal-500/30 animate-pulse`} />}
        {slide.accent !== 'orange' && slide.accent !== 'emerald' && slide.accent !== 'teal' && <Network className={`w-32 h-32 text-${slide.accent}-500/30 animate-pulse`} />}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-blue-500/30 overflow-x-hidden relative flex flex-col">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(15,23,42,0)_0%,rgba(2,6,23,1)_100%)] opacity-80" />
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
            transition={{ duration: 10, repeat: Infinity }}
            className={`absolute top-1/4 -right-20 w-[600px] h-[600px] rounded-full blur-[120px] bg-${slide.accent}-500/20`}
        />
      </div>

      <header className="relative z-20 px-8 py-6 flex justify-between items-center border-b border-white/5 backdrop-blur-md bg-slate-950/40">
        <div className="flex items-center gap-4">
           <Link to="/redes" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors">
              <ChevronLeft className="w-5 h-5 text-white" />
           </Link>
           <div>
              <h1 className="text-sm font-black tracking-widest text-slate-400 uppercase">AULA <span className="text-white border-l border-white/20 pl-2 ml-1">REDES_A6</span></h1>
              <div className="h-0.5 w-full bg-blue-500/50 rounded-full mt-0.5" />
           </div>
        </div>
        
        <div className="flex items-center gap-6">
           <div className="flex space-x-1">
              {SLIDES.map((_, i) => (
                <div key={i} className={`h-2 rounded-full transition-all ${i === currentSlide ? `w-6 bg-${slide.accent}-500` : 'w-2 bg-slate-800'}`} />
              ))}
           </div>
           <div className="text-[10px] font-mono text-slate-500 font-bold tracking-tighter w-12 text-right">
             {currentSlide + 1} / {SLIDES.length}
           </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12 flex items-center justify-center flex-1 min-h-[calc(100vh-160px)] pb-32">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          >
            <div className="order-2 lg:order-1 space-y-4">
              {visualContent}
            </div>

            <div className={`order-1 lg:order-2 space-y-6 ${slide.image === '' ? 'lg:col-span-2 text-center items-center flex flex-col justify-center' : ''}`}>
               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                  <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black tracking-[0.2em] bg-${slide.accent}-500/10 text-${slide.accent}-400 border border-${slide.accent}-500/20`}>
                    {slide.tag}
                  </span>
                  <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">{slide.title}</h2>
                  <p className="text-lg md:text-xl text-slate-400 font-medium">{slide.subtitle}</p>
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0, scale: 0.98 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: 0.1 }}
                 className={`bg-slate-900/40 backdrop-blur-xl border border-white/5 p-6 md:p-10 rounded-[2rem] shadow-[0_0_30px_rgba(0,0,0,0.5)] w-full ${slide.image === '' ? 'max-w-3xl text-left' : ''}`}
               >
                  {slide.content}
               </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="fixed bottom-0 left-0 w-full p-6 z-20 flex justify-between items-center pointer-events-none">
        <button onClick={() => paginate(-1)} disabled={currentSlide === 0} className="pointer-events-auto p-4 rounded-full bg-slate-900/80 border border-white/5 text-slate-400 hover:text-white hover:bg-slate-800 transition-all disabled:opacity-20 backdrop-blur-xl group">
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
        </button>
        <button onClick={() => paginate(1)} disabled={currentSlide === SLIDES.length - 1} className={`pointer-events-auto p-4 rounded-full bg-${slide.accent}-600/90 border border-${slide.accent}-400/30 text-white hover:bg-${slide.accent}-500 shadow-[0_0_20px_rgba(var(--tw-colors-${slide.accent}-500),0.3)] transition-all disabled:opacity-20 backdrop-blur-xl group`}>
          <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>
      </footer>
    </div>
  );
}
