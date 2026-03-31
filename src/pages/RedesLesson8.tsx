import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Shield, ShieldAlert, Crosshair, Search, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FirewallConfigurator } from '../components/redes/FirewallConfigurator';
import { IDSAnalyzer } from '../components/redes/IDSAnalyzer';

const SLIDES = [
  {
    id: '1',
    title: 'A Trincheira Digital',
    subtitle: 'Segurança de Borda',
    tag: '01. INTRODUÇÃO',
    image: '',
    accent: 'blue',
    content: (
      <div className="space-y-6">
        <p className="text-2xl font-light text-slate-300 leading-relaxed">
          A internet é uma zona de guerra constante. Redes corporativas não podem permanecer <span className="text-rose-400 font-bold">abertas e confiantes</span>.
        </p>
        <div className="h-px w-full bg-gradient-to-r from-blue-500/50 to-transparent my-6" />
        <p className="text-slate-400">
          Para proteger os servidores internos, as empresas criam um "Perímetro de Guarda" chamado <strong className="text-blue-400">DMZ (Demilitarized Zone)</strong>. Tudo que entra e sai da empresa precisa passar por verdadeiros "Seguranças de Boate" digitais: O Firewall e o IDS.
        </p>
      </div>
    )
  },
  {
    id: '2',
    title: 'O Guarda Costas: Firewall',
    subtitle: 'A Primeira Linha de Defesa',
    tag: 'ACL POLICIES',
    image: '/assets/redes_aula8/pixel_firewall_fortress.png',
    accent: 'amber',
    content: (
      <div className="space-y-6">
         <p className="text-slate-300">
            O Firewall é um dispositivo (hardware ou software) que atua filtrando todo o tráfego da rede. Ele julga pacotes com base em regras restritas (<strong className="text-amber-400">ACL - Access Control List</strong>).
         </p>
         <div className="bg-amber-900/10 p-4 border border-amber-500/20 rounded-xl">
             <h4 className="text-amber-400 font-bold mb-2">Critérios do Firewall:</h4>
             <ul className="text-sm text-slate-400 space-y-2 list-disc pl-4">
                 <li>Qual o <span className="text-white font-bold">IP de Origem</span>? (Dica: Se vier da Rússia para a contabilidade local, bloqueie).</li>
                 <li>Qual a <span className="text-white font-bold">Porta de Destino</span>? (Liberar Porta 80 para sites, Bloquear 3389 de fora).</li>
                 <li>Qual o Protocolo? TCP ou UDP?</li>
             </ul>
         </div>
      </div>
    )
  },
  {
    id: '3',
    title: '[SIMULAÇÃO] Configuração de ACL',
    subtitle: 'Controle de Acesso',
    tag: 'INTERAÇÃO',
    image: '',
    accent: 'amber',
    content: (
        <FirewallConfigurator />
    )
  },
  {
    id: '4',
    title: 'O Investigador: IDS e IPS',
    subtitle: 'Deep Packet Inspection (DPI)',
    tag: 'ASSINATURAS',
    image: '',
    accent: 'emerald',
    content: (
      <div className="space-y-6">
         <p className="text-slate-300">
            O Firewall só analisa o "envelope" (IP e Porta). Mas se o hacker entrar pela porta da frente (Porta 80 HTTP) e mandar um script malicioso oculto na carga útil da requisição? O Firewall deixa passar.
         </p>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="bg-emerald-900/10 p-4 border border-emerald-500/30 rounded-xl">
                 <h4 className="text-emerald-400 font-bold flex items-center gap-2 mb-2"><Search className="w-5 h-5"/> IDS (Detection)</h4>
                 <p className="text-xs text-slate-400">Intrusion Detection System: Lê o payload da mensagem. Se encontrar uma string como "DROP TABLE", ele emite alertas para a equipe de segurança, mas <strong className="text-rose-400">NÃO</strong> bloqueia o tráfego ativamente.</p>
             </div>
             <div className="bg-sky-900/10 p-4 border border-sky-500/30 rounded-xl">
                 <h4 className="text-sky-400 font-bold flex items-center gap-2 mb-2"><ShieldAlert className="w-5 h-5"/> IPS (Prevention)</h4>
                 <p className="text-xs text-slate-400">Intrusion Prevention System: Faz a mesma varredura, porém, se a "assinatura" maliciosa for reconhecida, ele corta a conexão do invasor imediatamente em tempo real.</p>
             </div>
         </div>
      </div>
    )
  },
  {
    id: '5',
    title: '[SIMULAÇÃO] Motor de Deep Inspection',
    subtitle: 'Definindo Assinaturas',
    tag: 'INTERAÇÃO',
    image: '/assets/redes_aula8/pixel_ids_radar.png',
    accent: 'emerald',
    content: (
        <IDSAnalyzer />
    )
  },
  {
    id: '6',
    title: 'Topologia: A DMZ',
    subtitle: 'Zonas Desmilitarizadas',
    tag: 'ARQUITETURA',
    image: '',
    accent: 'slate',
    content: (
      <div className="space-y-6">
         <p className="text-slate-300">
            A segurança da informação nasce na planta da rede. A <strong>DMZ</strong> é uma sub-rede contendo e expondo os serviços externos (como servidores Web e Email) a uma rede maior (Internet).
         </p>
         <div className="bg-slate-900/50 p-6 border-l-4 border-slate-500 rounded-xl">
             <h4 className="text-white font-bold mb-2">Por que Segmentar?</h4>
             <p className="text-sm text-slate-400">
                 Se um hacker explorar uma falha no seu site (exposto na Internet), ele não terá acesso direto ao Banco de Dados ou aos arquivos de RH, pois ambos ficam em uma LAN interna protegida por outro Firewall.
             </p>
         </div>
      </div>
    )
  },
  {
    id: '7',
    title: 'Stateless vs Stateful',
    subtitle: 'Evolução da Filtragem',
    tag: 'FUNDAMENTOS',
    image: '',
    accent: 'blue',
    content: (
      <div className="space-y-6">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="bg-slate-800/30 p-4 border border-blue-500/10 rounded-xl">
                 <h4 className="text-blue-400 font-bold mb-2">Filtro Stateless (Legado)</h4>
                 <p className="text-xs text-slate-400">Analisa cada pacote individualmente. Não sabe se aquele pacote pertence a uma conversa já estabelecida. É mais rápido, porém muito inflexível e "cego" ao contexto da conexão TCP (Handshake).</p>
             </div>
             <div className="bg-blue-900/20 p-4 border border-blue-500/30 rounded-xl">
                 <h4 className="text-sky-400 font-bold mb-2">Filtro Stateful (Moderno)</h4>
                 <p className="text-xs text-slate-400">Mantém uma "Tabela de Estados". Ele lembra que o PC1 iniciou um Handshake com o Server2, e portanto permite que o Server2 responda de volta sem precisar de uma regra explícita dupla.</p>
             </div>
         </div>
      </div>
    )
  },
  {
    id: '8',
    title: 'O Problema do HTTPS',
    subtitle: 'DPI e Inspeção SSL',
    tag: 'CROSS-MODULE',
    image: '',
    accent: 'emerald',
    content: (
      <div className="space-y-6">
         <p className="text-slate-300">
            Lembrando a aula de <strong>Criptografia Clássica</strong>: o tráfego moderno é cifrado de ponta-a-ponta (HTTPS/SSL). Como o IDS/IPS pode ler a carta se ela está codificada?
         </p>
         <div className="flex gap-4 p-4 bg-emerald-900/10 rounded-xl border border-emerald-500/30">
             <Lock className="w-8 h-8 text-emerald-400 shrink-0" />
             <p className="text-sm text-slate-300">Equipamentos modernos realizam <strong>SSL Inspection (Men-in-the-Middle Controlado)</strong>. A empresa instala um certificado corporativo nos PCs dos funcionários, permitindo que o Firewall decifre, leia (DPI), verifique vírus, recifre e envie à internet, quebrando a privacidade em prol da segurança.</p>
         </div>
      </div>
    )
  },
  {
    id: '9',
    title: 'Ameaças Internas',
    subtitle: 'Movimentação Lateral',
    tag: 'SOC/CYBER',
    image: '',
    accent: 'rose',
    content: (
      <div className="space-y-6">
         <p className="text-slate-300">
            Historicamente, o foco sempre foi criar um "Casca Grossa e Miolo Mole". E se o hacker mandar um Phishing por e-mail e <span className="text-rose-400 font-bold">o funcionário clicar?</span> O atacante agora está dentro da rede local.
         </p>
         <p className="text-slate-400 text-sm">
            Sem restrições internas, ocorre a <strong>Movimentação Lateral</strong>: O hacker pula do PC da Recepção até o Servidor de Nomes (AD) livremente. Por isso, Firewalls "East-West" (que separam departamentos internos) são tão essenciais quanto os "North-South" (Internet-LAN).
         </p>
      </div>
    )
  },
  {
    id: '10',
    title: 'Zero Trust Network',
    subtitle: 'Nunca Confie, Sempre Verifique',
    tag: 'FUTURO DA SEGURANÇA',
    image: '',
    accent: 'indigo',
    content: (
      <div className="space-y-6 flex flex-col items-center text-center">
         <ShieldAlert className="w-12 h-12 text-indigo-400 mb-2" />
         <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
            A evolução final do Firewall é a Morte do Perímetro. O paradigma moderno é o <strong>Zero Trust</strong>.
         </p>
         <p className="text-sm text-slate-400 max-w-xl">
             Não importa se você está plugado fisicamente no cabo azul dentro da sala do CEO. O sistema exige a verificação contínua de Identidade (MFA), Integridade do Dispositivo (Antivírus em dia) e Privilégio Mínimo (Você só acessa o que precisa para seu cargo).
         </p>
      </div>
    )
  },
  {
    id: '11',
    title: 'Honeypots',
    subtitle: 'Atraindo o Atacante',
    tag: 'BLUE TEAM',
    image: '',
    accent: 'fuchsia',
    content: (
      <div className="space-y-6">
         <p className="text-slate-300">
            Enquanto o Firewall repele e o IDS detecta, há uma terceira classe passiva: O Pote de Mel.
         </p>
         <div className="bg-fuchsia-900/10 p-6 rounded-xl border-l-4 border-fuchsia-500">
             <p className="text-sm text-slate-400">
                 Honeypots são servidores intencionalmente vulneráveis expostos na DMZ (ex: Com nomes chamativos como "Payroll_DB_Backup") que servem como alarme. Nenhum usuário legítimo tem motivos para acessar um Honeypot. Se o IDS alertar um scan nessa máquina, a equipe sabe com 100% de certeza que há um invasor testando o perímetro.
             </p>
         </div>
      </div>
    )
  },
  {
    id: '12',
    title: 'Arquitetura Defense-in-Depth',
    subtitle: 'As Camadas da Cebola',
    tag: 'CONCLUSÃO',
    image: '',
    accent: 'purple',
    content: (
      <div className="space-y-8 flex flex-col items-center justify-center text-center mt-6">
         <Shield className="w-16 h-16 text-purple-400 animate-pulse" />
         <h3 className="text-2xl font-black text-white">Segurança em Profundidade.</h3>
         <p className="text-slate-400 max-w-lg">
             Ataques cibernéticos nunca são frustrados por uma única barreira mágica. Uma rede corporativa saudável foca na sobreposição de camadas: Firewall filtrando o lixo genérico, IPS barrando exploits direcionados, Antivírus protegendo a máquina local, o MFA protegendo a credencial vazada e, por último, o Usuário treinado não clicando no phishing.
         </p>
      </div>
    )
  }
];

export function RedesLesson8() {
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
      className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group flex justify-center items-center bg-slate-900"
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
        <div className={`absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/black-mamba.png')]`} />
        
        {/* Abstract Network visuals */}
        <motion.div 
           animate={{ rotateZ: 360 }} 
           transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
           className={`absolute w-64 h-64 border-2 border-dashed border-${slide.accent}-500/20 rounded-full flex items-center justify-center`}
        >
            <div className={`w-48 h-48 border border-${slide.accent}-500/30 rounded-full`} />
        </motion.div>
        
        <Crosshair className={`w-24 h-24 text-${slide.accent}-500/50 absolute animate-pulse`} />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-emerald-500/30 overflow-x-hidden relative flex flex-col">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.05)_0%,rgba(2,6,23,1)_100%)] opacity-80" />
      </div>

      <header className="relative z-20 px-8 py-6 flex justify-between items-center border-b border-sky-900/30 backdrop-blur-md bg-slate-950/40">
        <div className="flex items-center gap-4">
           <Link to="/redes" className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center transition-colors">
              <ChevronLeft className="w-5 h-5 text-white" />
           </Link>
           <div>
              <h1 className="text-sm font-black tracking-widest text-emerald-400 uppercase">Segurança de Redes <span className="text-white border-l border-white/20 pl-2 ml-1">AULA_8__FIREWALL</span></h1>
              <div className="h-0.5 w-full bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full mt-0.5" />
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

      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12 flex items-center justify-center flex-1 pb-32">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 50 : -50, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: direction > 0 ? -50 : 50, filter: 'blur(10px)' }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className={`w-full max-w-7xl grid grid-cols-1 ${slide.tag === 'INTERAÇÃO' ? 'lg:grid-cols-1' : 'lg:grid-cols-2'} gap-8 lg:gap-12 items-center`}
          >
            {slide.tag !== 'INTERAÇÃO' && (
              <div className="order-2 lg:order-1 space-y-4">
                {visualContent}
              </div>
            )}

            <div className={`order-1 lg:order-2 space-y-6 ${slide.tag === 'INTERAÇÃO' || !slide.image ? 'w-full' : ''}`}>
               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`space-y-2 ${slide.tag === 'INTERAÇÃO' ? 'text-center' : ''}`}>
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
                 className={`bg-slate-900/60 backdrop-blur-xl border border-blue-500/10 p-6 md:p-10 rounded-[2rem] shadow-[0_0_50px_rgba(59,130,246,0.05)] w-full mx-auto ${slide.tag === 'INTERAÇÃO' ? 'max-w-4xl bg-transparent border-none shadow-none md:p-0' : ''}`}
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
