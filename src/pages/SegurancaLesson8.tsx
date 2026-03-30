import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Unlock, ShieldAlert, Fingerprint, Terminal, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PasswordCracker } from '../components/seginfo/PasswordCracker';
import { SaltShaker } from '../components/seginfo/SaltShaker';

const SLIDES = [
  {
    id: '1',
    title: 'A Chave e a Fechadura',
    subtitle: 'Nossa primeira, e pior, linha de defesa',
    tag: '01. INTRODUÇÃO',
    image: '/assets/seginfo_aula8/pixel_hacker_terminal.png',
    accent: 'emerald',
    content: (
      <div className="space-y-4">
        <p className="text-2xl font-light text-slate-300 leading-relaxed">
          O cérebro humano é péssimo em gerar entropia (aleatoriedade).
        </p>
        <div className="h-px w-full bg-gradient-to-r from-emerald-500/50 to-transparent my-6" />
        <p className="text-slate-400">
          Nós usamos datas de nascimento, nomes de animais de estimação, times de futebol e adicionamos "123" no final para cumprir a regra do sistema. Os invasores sabem disso.
        </p>
      </div>
    )
  },
  {
    id: '2',
    title: 'Anatomia de um Ataque',
    subtitle: 'Força Bruta vs Dicionário',
    tag: 'TÉCNICAS DE INVASÃO',
    image: '',
    accent: 'rose',
    content: (
      <div className="space-y-6">
         <p className="text-slate-300">
            Como um criminoso descobre a sua senha? Ele não "tenta adivinhar". Ele usa processamento em massa.
         </p>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
             <div className="bg-rose-900/20 p-6 rounded-2xl border border-rose-500/30">
                <Terminal className="w-10 h-10 text-rose-400 mb-4" />
                <h4 className="text-rose-400 font-black text-xl mb-2">Força Bruta (Brute Force)</h4>
                <p className="text-sm text-slate-400">Tenta todas as combinações matemáticas possíveis (a, b, c... aa, ab, ac...). É infalível se ele tiver tempo infinito. Fica inútil contra senhas muito longas.</p>
             </div>
             <div className="bg-emerald-900/20 p-6 rounded-2xl border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                <ShieldAlert className="w-10 h-10 text-emerald-400 mb-4" />
                <h4 className="text-emerald-400 font-black text-xl mb-2">Ataque de Dicionário</h4>
                <p className="text-sm text-slate-400">Cruza milhões de senhas que já vazaram na internet e combinações de palavras vulgares. É assim que 90% das contas reais são hackeadas instantaneamente.</p>
             </div>
         </div>
      </div>
    )
  },
  {
    id: '3',
    title: '[GAME] O Cracker de Entropia',
    subtitle: 'Descubra quanto tempo você sobrevive',
    tag: 'SIMULADOR DE ATAQUE',
    image: '',
    accent: 'emerald',
    content: (
        <PasswordCracker />
    )
  },
  {
    id: '4',
    title: 'Tamanho > Complexidade',
    subtitle: 'A Matemática Incontestável da Defesa',
    tag: 'O PRINCÍPIO XKCD 936',
    image: '/assets/seginfo_aula8/pixel_entropy_scale.png',
    accent: 'sky',
    content: (
      <div className="space-y-6">
        <p className="text-slate-300">
           Exigir "pelo menos 1 letra maiúscula, 1 número e 1 caractere especial" tornou nossas senhas impossíveis de lembrar, mas ainda fáceis de quebrar.
        </p>
        <div className="bg-slate-900 border border-sky-500/30 rounded-xl p-6 font-mono text-center">
            <span className="text-xl text-slate-400">Senha Complexa (Curta): </span>
            <span className="text-xl text-rose-400 font-bold tracking-widest">Tr0ub4&!</span>
            <div className="text-sm text-slate-500 mt-1 mb-4">Difícil de lembrar. Quebrada em 1 segundo.</div>
            
            <div className="h-px bg-slate-800 my-4" />
            
            <span className="text-xl text-slate-400">Frase-Senha (Longa): </span>
            <span className="text-xl text-sky-400 font-bold">cavalo-bateria-grampo-correto</span>
            <div className="text-sm text-sky-500 mt-1">Fácil de lembrar. Demoraria 3 trilhões de anos para quebrar.</div>
        </div>
      </div>
    )
  },
  {
    id: '5',
    title: 'O Paradoxo do Hash',
    subtitle: 'Rainbow Tables (Tabelas Arco-Íris)',
    tag: '02. SALVANDO O BANCO DE DADOS',
    image: '',
    accent: 'purple',
    content: (
      <div className="space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">
         <p className="text-slate-300">
            Nenhuma empresa séria salva sua senha em texto no banco de dados. Eles salvam um <b>Hash</b> (uma assinatura matemática de mão única, ex: MD5, SHA-256).
         </p>
         <div className="bg-slate-900 border border-purple-500/30 rounded-xl p-6 w-full text-center">
            <p className="text-slate-400 text-sm mb-2">A senha "123456" vira:</p>
            <p className="text-purple-400 font-mono text-sm break-all">e10adc3949ba59abbe56e057f20f883e</p>
         </div>
         <p className="text-sm text-slate-400 bg-rose-900/10 border-l-2 border-rose-500 p-4">
            <b>Mas os Hackers trapaceiam.</b> Eles calculam o Hash de todas as palavras possíveis do mundo ANTES de roubar o banco de dados. Essa agenda gigantesca é chamada de Rainbow Table. Com ela, a quebra é instantânea.
         </p>
      </div>
    )
  },
  {
    id: '6',
    title: '[GAME] A Cozinha do Hacker',
    subtitle: 'O Tempero (Salting) destrói as tabelas',
    tag: 'DEFESA ATIVA',
    image: '',
    accent: 'emerald',
    content: (
        <SaltShaker />
    )
  },
  {
    id: '7',
    title: 'MFA: A Blindagem Absoluta',
    subtitle: 'Algo que você sabe + Algo que você tem',
    tag: 'ARQUITETURA DE CONFIANÇA ZERO',
    image: '/assets/seginfo_aula8/pixel_mfa_shield.png',
    accent: 'amber',
    content: (
      <div className="space-y-6">
         <p className="text-slate-300">
            A verdade amarga: Não importa a força da senha e a pimenta no Hash. Você vai, eventualmente, cair em um Phishing e digitar sua senha num site falso.
         </p>
         <div className="bg-amber-900/20 border border-amber-500/20 rounded-xl p-6 flex flex-col items-center text-center">
            <Fingerprint className="w-16 h-16 text-amber-400 mb-4" />
            <h4 className="text-amber-400 font-black text-xl">Múltiplos Fatores de Autenticação</h4>
            <p className="text-slate-400 text-sm mt-3">
               A única defesa real moderna. Se o invasor roubar sua senha (algo que você sabe), ele ainda precisará roubar o seu celular, ou seu dedo (algo que você tem/é).
            </p>
         </div>
      </div>
    )
  },
  {
    id: '8',
    title: 'Bem-vindo ao Novo Mundo',
    subtitle: 'Passkeys e o o Ocaso das Senhas',
    tag: 'FUTURO DA SEGURANÇA',
    image: '',
    accent: 'emerald',
    content: (
      <div className="space-y-8 flex flex-col items-center justify-center text-center mt-10">
         <Unlock className="w-16 h-16 text-emerald-400 animate-pulse" />
         <h3 className="text-3xl font-black text-white">Senhas vão morrer.</h3>
         <p className="text-slate-400 max-w-lg">
             Tecnologias como FIDO2 (Passkeys) usam criptografia assimétrica sob o capô, gerando pares de chaves geridos pelo seu próprio HW (FaceID/Windows Hello). 
             Você nunca mais precisará tentar lembrar qual nome de animal de estimação usou.
         </p>
         <p className="text-emerald-300 font-bold bg-emerald-900/30 px-6 py-2 border border-emerald-500/20 rounded-full mt-4">
             Segurança Invisível.
         </p>
      </div>
    )
  }
];

export function SegurancaLesson8() {
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
        <div className={`absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80`} />
        
        {/* Hacker Matrix Overlay purely aesthetic on image */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay opacity-30" />
    </motion.div>
  ) : (
    <div className={`relative aspect-video rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.1)] border border-${slide.accent}-500/20 bg-slate-950 flex flex-col items-center justify-center`}>
        <div className={`absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/black-mamba.png')]`} />
        
        {/* Abstract Cyber Elements */}
        {slide.accent === 'emerald' && <Activity className="w-32 h-32 text-emerald-500/10 absolute animate-pulse" />}
        {slide.accent === 'rose' && <ShieldAlert className="w-32 h-32 text-rose-500/10 absolute animate-pulse" />}
        {slide.accent === 'sky' && <Terminal className="w-32 h-32 text-sky-500/10 absolute animate-pulse" />}
        
        {/* Animated Lines */}
        <motion.div 
           initial={{ top: '-10%' }}
           animate={{ top: '110%' }}
           transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
           className={`absolute w-full h-0.5 bg-${slide.accent}-500/50 shadow-[0_0_20px_rgba(var(--tw-colors-${slide.accent}-500),1)] blur-[1px]`}
        />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-emerald-500/30 overflow-x-hidden relative flex flex-col">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.05)_0%,rgba(2,6,23,1)_100%)] opacity-80" />
      </div>

      <header className="relative z-20 px-8 py-6 flex justify-between items-center border-b border-emerald-900/30 backdrop-blur-md bg-slate-950/40">
        <div className="flex items-center gap-4">
           <Link to="/seguranca" className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center transition-colors">
              <ChevronLeft className="w-5 h-5 text-white" />
           </Link>
           <div>
              <h1 className="text-sm font-black tracking-widest text-emerald-500 uppercase">SegInfo <span className="text-white border-l border-white/20 pl-2 ml-1">AULA_08__SENHAS</span></h1>
              <div className="h-0.5 w-full bg-gradient-to-r from-emerald-500 to-transparent rounded-full mt-0.5" />
           </div>
        </div>
        
        <div className="flex items-center gap-6">
           <div className="flex space-x-1">
              {SLIDES.map((_, i) => (
                <div key={i} className={`h-2 rounded-full transition-all ${i === currentSlide ? `w-6 bg-${slide.accent}-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]` : 'w-2 bg-slate-800'}`} />
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
            <div className={`order-2 lg:order-1 space-y-4 ${slide.image === '' ? 'hidden lg:flex' : ''}`}>
              {visualContent}
            </div>

            <div className={`order-1 lg:order-2 space-y-6 ${slide.image === '' ? 'lg:col-span-2 text-center items-center flex flex-col justify-center' : ''}`}>
               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                  <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black tracking-[0.2em] bg-${slide.accent}-500/10 text-${slide.accent}-400 border border-${slide.accent}-500/30 uppercase`}>
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
        <button onClick={() => paginate(1)} disabled={currentSlide === SLIDES.length - 1} className={`pointer-events-auto p-4 rounded-full bg-${slide.accent}-600/90 border border-${slide.accent}-400/50 text-white hover:bg-${slide.accent}-500 shadow-[0_0_30px_rgba(var(--tw-colors-${slide.accent}-500),0.3)] transition-all disabled:opacity-20 backdrop-blur-xl group`}>
          <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>
      </footer>
    </div>
  );
}
