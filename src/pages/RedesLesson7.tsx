import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Activity, ShieldAlert, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NatSimulator } from '../components/redes/NatSimulator';
import { CidrSlicer } from '../components/redes/CidrSlicer';

const SLIDES = [
  {
    id: '1',
    title: 'A Crise de 2011',
    subtitle: 'O Esgotamento do IPv4',
    tag: '01. DIA 0',
    image: '',
    accent: 'rose',
    content: (
      <div className="space-y-6">
        <p className="text-2xl font-light text-slate-300 leading-relaxed">
          O protocolo IPv4 possui endereços de 32 Bits. Isso significa <span className="text-rose-400 font-bold">4.3 Bilhões de IPs</span> no total.
        </p>
        <div className="h-px w-full bg-gradient-to-r from-rose-500/50 to-transparent my-6" />
        <p className="text-slate-400">
          Nos anos 80, isso parecia infinito. Em 2011, a IANA (entidade global) distribuiu <b>oficialmente o último lote</b> de IPs. Hoje temos mais de 20 bilhões de aparelhos conectados. Em teoria, a internet deveria ter quebrado.
        </p>
      </div>
    )
  },
  {
    id: '2',
    title: 'A Gambiarra que Salvou o Mundo',
    subtitle: 'Network Address Translation (NAT)',
    tag: 'ENGENHARIA',
    image: '/assets/redes_aula7/pixel_nat_hacker.png',
    accent: 'emerald',
    content: (
      <div className="space-y-6">
         <p className="text-slate-300">
            A solução de emergência foi criar blocos de IPs "Falsos" ou Privados (Ex: `192.168.x.x`). A sua televisão e o seu celular não existem de verdade na internet, publicamente.
         </p>
         <div className="bg-emerald-900/20 p-6 rounded-2xl border border-emerald-500/30">
            <h4 className="text-emerald-400 font-black text-xl mb-2">O Trabalho do Roteador</h4>
            <p className="text-sm text-slate-400">O seu roteador de casa pega os dados da sua geladeira e do seu celular, tira o IP Falso deles, bota o ÚNICO IP Público Real da sua rua, e envia pro Google fingindo que foi o Roteador quem pediu tudo. O NAT é um disfarce coletivo.</p>
         </div>
      </div>
    )
  },
  {
    id: '3',
    title: 'PAT: Port Address Translation',
    subtitle: 'O truque das Portas',
    tag: 'MECÂNICA',
    image: '',
    accent: 'blue',
    content: (
      <div className="space-y-6">
        <p className="text-slate-300">
           Se 5 PCs falsos da mesma casa tentam acessar o Globo.com, quando o Globo responde devolvendo os vídeos para aquele ÚNICO IP Público da rua, como o roteador sabe para qual PC ele deve distribuir o vídeo de volta?
        </p>
        <div className="flex gap-4 p-4 bg-slate-900 rounded-xl border border-slate-700">
             <Activity className="w-8 h-8 text-blue-400" />
             <p className="text-sm text-slate-300">Ele mapeia as **Portas TCP**. Ele anota numa caderneta: "A porta 5500 aberta no meu IP Público significa o celular 1. A porta 5501 é a geladeira 2." E ele faz isso dezenas de vezes por segundo no algoritmo chamado **NAT Table**.</p>
        </div>
      </div>
    )
  },
  {
    id: '4',
    title: '[GAME] Tabela NAT Dinâmica',
    subtitle: 'Simulador de Roteador de Borda',
    tag: 'INTERAÇÃO',
    image: '',
    accent: 'emerald',
    content: (
        <NatSimulator />
    )
  },
  {
    id: '5',
    title: 'Batalhando por Espaço',
    subtitle: 'O Desperdício de Escopo',
    tag: '02. SUBNETTING',
    image: '',
    accent: 'amber',
    content: (
      <div className="space-y-6">
         <p className="text-slate-300">
            O NAT salvou o Endereçamento em casa. Mas para servidores Cloud, Links P2P ou datacenters precisamos de IPs verdadeiros.
         </p>
         <div className="bg-amber-900/30 p-5 rounded-xl border-l-4 border-amber-500">
            <p className="text-sm text-slate-300">
              Antigamente as operadoras davam Redes /24 (256 endereços) inteiras para qualquer um. Se o cara ligasse 2 roteadores P2P (Que só consomem 2 IPs entre eles), o resto dos 254 endereços ficavam parados, invisíveis pra internet e sem uso. Era queimar dinheiro de bit a bit.
            </p>
         </div>
      </div>
    )
  },
  {
    id: '6',
    title: 'O Fatiamento (CIDR / VLSM)',
    subtitle: 'Sub-redes Inteligentes',
    tag: 'MECÂNICA',
    image: '/assets/redes_aula7/pixel_cidr_block.png',
    accent: 'sky',
    content: (
      <div className="space-y-6 flex flex-col justify-center">
         <p className="text-slate-300">
            A notação CIDR (Como /24, /26) diz para a máscara de rede exatamente **onde** a rede termina e onde começam os computadores (hosts). 
         </p>
         <div className="bg-slate-900 px-6 py-4 rounded-xl font-mono text-sm border border-sky-500/30 text-sky-300">
             <span className="text-sky-500">/24 = </span> 256 IPs. Oculta tudo que não precisa (Desperdício)<br/>
             <span className="text-sky-500">/26 = </span> 64 IPs. Um bloco contido.<br/>
             <span className="text-sky-500">/30 = </span> Apenas 4 IPs (Ideal para links P2P).<br/>
         </div>
         <p className="text-sm text-slate-400">Engenheiros modernos quebram blocos C em frações justas de potenciações de Base 2. E exigem precisão matemática para isso.</p>
      </div>
    )
  },
  {
    id: '7',
    title: '[GAME] The Slicer',
    subtitle: 'Subnetting prático em VLSM',
    tag: 'INTERAÇÃO',
    image: '',
    accent: 'emerald',
    content: (
        <CidrSlicer />
    )
  },
  {
    id: '8',
    title: 'O Futuro de 128 Bits',
    subtitle: 'IPv6',
    tag: '03. NOVA ERA',
    image: '/assets/redes_aula7/pixel_ipv6_multiverse.png',
    accent: 'purple',
    content: (
      <div className="space-y-6">
         <p className="text-slate-300">
            A verdadeira solução definitiva para a exaustão foi recriar a arquitetura inteira de IP do zero para abrigar cabeçalhos de 128 Bits operando em Hexadecimal.
         </p>
         <div className="bg-purple-900/10 border border-purple-500/20 rounded-2xl p-6 text-center">
             <div className="text-4xl font-black text-purple-400">340 Undecilhões</div>
             <div className="font-mono text-xs text-slate-500 mt-2">de Endereços Públicos Individuais Diretos.</div>
         </div>
         <p className="text-sm border-l-2 border-purple-500/50 pl-4 text-slate-400">
             Não precisamos mais do NAT ou IPs Privados Falsos! No IPv6, todos os átomos da terra podem receber IPs Públicos. Equipamentos falam direto (End to End Encryption Nativa IPsec). Você expõe o que quiser. O conceito de "Port Mappings caseiros" morrerá.
         </p>
      </div>
    )
  },
  {
    id: '9',
    title: 'Visão Detalhada: Header IPv6',
    subtitle: 'Simplicidade vs Tamanho',
    tag: 'TEORIA GERAL',
    image: '',
    accent: 'fuchsia',
    content: (
      <div className="space-y-6">
         <p className="text-slate-300">
            Surpreendentemente, apesar de ter endereços imensos (feios e compridos de se digitar pro ser humano), o "Header" (Painel elétrico frontal do pacote IPv6 na porta física do roteador) é incrivelmente **SIMPLES** comparado ao IPv4.
         </p>
         <div className="grid grid-cols-2 gap-4 text-sm mt-4">
             <div className="bg-slate-900 p-4 rounded-xl border border-slate-700">
                 <h4 className="text-fuchsia-400 font-bold">IPv6 Header Fixado:</h4>
                 <p className="text-slate-400">Apenas 40Bytes constantes. Sem checagem de erros desnecessários, roteamento por hardware ultra veloz (Switch Fabricing puro).</p>
             </div>
             <div className="bg-slate-900 p-4 rounded-xl border border-slate-700">
                 <h4 className="text-fuchsia-400 font-bold">Broadcast Morreu:</h4>
                 <p className="text-slate-400">Não há mais picos de Broadcast (`255.255.255.255`) na rede poluindo todas as placas ao mesmo tempo. Apenas Multicast (assinar canais lógicos específicos).</p>
             </div>
         </div>
      </div>
    )
  },
  {
    id: '10',
    title: 'Conclusão (E Evolução)',
    subtitle: 'IPv4 vs IPv6 e SD-WAN',
    tag: 'FUTURO',
    image: '',
    accent: 'cyan',
    content: (
      <div className="space-y-8 flex flex-col items-center justify-center text-center mt-6">
         <ShieldAlert className="w-16 h-16 text-cyan-400 animate-pulse" />
         <h3 className="text-2xl font-black text-white">The Great Carrier Grade NAT.</h3>
         <p className="text-slate-400 max-w-lg">
             A adoção do IPv6 passa de 40% global. Enquanto durar a transição, ISPs usam CGNATs monstruosos. Até redes privadas de casas (O 10.0.0.0 da sua rede) começam a ficar isoladas repetidamente, o NAT sobre o NAT ("Roteadores Russos").
         </p>
         <p className="text-cyan-300 font-bold bg-cyan-900/30 px-6 py-2 border border-cyan-500/20 rounded-full mt-4">
             Fim do Módulo Avançado de IPv4 / Subnet.
         </p>
      </div>
    )
  }
];

export function RedesLesson7() {
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
    <div className={`relative aspect-video rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.1)] border border-${slide.accent}-500/20 bg-slate-950 flex flex-col items-center justify-center`}>
        <div className={`absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/micro-carbon.png')]`} />
        
        {/* Abstract IP Blocks visuals */}
        <motion.div 
           animate={{ y: [0, -10, 0] }} 
           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
           className={`absolute w-64 h-24 border border-${slide.accent}-500/20 bg-slate-900/50 rounded-xl flex items-center justify-center`}
        >
            <div className={`flex gap-2 opacity-50 text-${slide.accent}-500 font-mono tracking-widest text-[10px]`}>
               {[...Array(4)].map((_, i) => <span key={i} className="px-2 py-1 bg-black rounded">1101{i}</span>)}
            </div>
        </motion.div>
        
        <Cpu className={`w-16 h-16 text-${slide.accent}-500/50 absolute`} />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-emerald-500/30 overflow-x-hidden relative flex flex-col">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.05)_0%,rgba(2,6,23,1)_100%)] opacity-80" />
        <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')]" />
      </div>

      <header className="relative z-20 px-8 py-6 flex justify-between items-center border-b border-emerald-900/30 backdrop-blur-md bg-slate-950/40">
        <div className="flex items-center gap-4">
           <Link to="/redes" className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center transition-colors">
              <ChevronLeft className="w-5 h-5 text-white" />
           </Link>
           <div>
              <h1 className="text-sm font-black tracking-widest text-emerald-500 uppercase">Redes <span className="text-white border-l border-white/20 pl-2 ml-1">AULA_7__IPV6</span></h1>
              <div className="h-0.5 w-full bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full mt-0.5" />
           </div>
        </div>
        
        <div className="flex items-center gap-6">
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

      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12 flex items-center justify-center flex-1 min-h-[calc(100vh-160px)] pb-32">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 50 : -50, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: direction > 0 ? -50 : 50, filter: 'blur(10px)' }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          >
            <div className="order-2 lg:order-1 space-y-4">
              {visualContent}
            </div>

            <div className={`order-1 lg:order-2 space-y-6 ${slide.image === '' ? 'lg:col-span-2 text-center items-center flex flex-col justify-center' : ''}`}>
               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                  <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black tracking-[0.2em] bg-${slide.accent}-500/10 text-${slide.accent}-400 border border-${slide.accent}-500/30`}>
                    {slide.tag}
                  </span>
                  <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">{slide.title}</h2>
                  <p className="text-lg md:text-xl text-slate-400 font-medium">{slide.subtitle}</p>
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0, scale: 0.98 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: 0.1 }}
                 className={`bg-slate-900/60 backdrop-blur-xl border border-emerald-500/10 p-6 md:p-10 rounded-[2rem] shadow-[0_0_50px_rgba(16,185,129,0.05)] w-full ${slide.image === '' ? 'max-w-4xl text-left' : ''}`}
               >
                  {slide.content}
               </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="fixed bottom-0 left-0 w-full p-6 z-20 flex justify-between items-center pointer-events-none">
        <button onClick={() => paginate(-1)} disabled={currentSlide === 0} className="pointer-events-auto p-4 rounded-full bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900 transition-all disabled:opacity-20 backdrop-blur-xl group shadow-lg">
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
        </button>
        <button onClick={() => paginate(1)} disabled={currentSlide === SLIDES.length - 1} className={`pointer-events-auto p-4 rounded-full bg-${slide.accent}-600/90 border border-${slide.accent}-400/50 text-white hover:bg-${slide.accent}-500 shadow-[0_0_30px_rgba(var(--tw-colors-${slide.accent}-500),0.5)] transition-all disabled:opacity-20 backdrop-blur-xl group`}>
          <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>
      </footer>
    </div>
  );
}
