import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Lock, Eye, Shield, Key } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CaesarSimulator } from '../components/seginfo/CaesarSimulator';
import { FrequencyCracker } from '../components/seginfo/FrequencyCracker';

const SLIDES = [
  {
    id: '1',
    title: 'A Arte de Ocultar',
    subtitle: 'Segredos na Linha do Tempo',
    tag: '01. INTRODUÇÃO',
    image: '/assets/seginfo_aula7/pixel_crypto_intro.png',
    accent: 'emerald',
    content: (
      <div className="space-y-4">
        <p className="text-2xl font-light text-slate-300 leading-relaxed">
          Ocultar a mensagem física vs Ocultar o <span className="text-emerald-400 font-bold">significado</span>.
        </p>
        <div className="h-px w-full bg-gradient-to-r from-emerald-500/50 to-transparent my-6" />
        <p className="text-slate-400">
          A Criptografia ("escrita oculta" do grego kryptós e gráphein) não tenta impedir que a mensagem seja interceptada. Ela assume que o inimigo tem a mensagem, mas garante que ele não consiga entendê-la.
        </p>
      </div>
    )
  },
  {
    id: '2',
    title: 'Os Pilares da Criptografia',
    subtitle: 'C.I.A. Triad',
    tag: 'FUNDAMENTOS',
    image: '',
    accent: 'blue',
    content: (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-blue-900/20 p-4 rounded-xl border border-blue-500/30 text-center shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                <Eye className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <h4 className="font-bold text-white text-sm">Confidencialidade</h4>
                <p className="text-xs text-slate-400 mt-1">Só os autorizados leem. (Foco de hoje)</p>
            </div>
            <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50 text-center">
                <Shield className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                <h4 className="font-bold text-slate-300 text-sm">Integridade</h4>
                <p className="text-xs text-slate-500 mt-1">Garante que não foi alterada.</p>
            </div>
            <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50 text-center">
                <Key className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                <h4 className="font-bold text-slate-300 text-sm">Autenticação</h4>
                <p className="text-xs text-slate-500 mt-1">Prova as identidades.</p>
            </div>
        </div>
      </div>
    )
  },
  {
    id: '3',
    title: 'Transposição vs Substituição',
    subtitle: 'Os Dois Mecanismos Básicos',
    tag: '02. MÉTODOS CLÁSSICOS',
    image: '',
    accent: 'purple',
    content: (
      <div className="space-y-6">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:border-purple-500 transition-colors">
                <h4 className="text-purple-400 font-bold mb-2">Transposição</h4>
                <p className="text-sm text-slate-300 mb-4">A identidade da letra é a mesma, mas embaralhamos a posição delas. (Anagramas)</p>
                <div className="font-mono bg-slate-900 p-3 rounded border border-slate-700 text-center tracking-widest text-slate-400">
                   ROMA ➔ AMOR
                </div>
             </div>
             <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:border-purple-500 transition-colors">
                <h4 className="text-purple-400 font-bold mb-2">Substituição</h4>
                <p className="text-sm text-slate-300 mb-4">A posição não muda, mas trocamos a letra por outra regra arbitrária. Foco da Aula!</p>
                <div className="font-mono bg-slate-900 p-3 rounded border border-slate-700 text-center tracking-widest text-emerald-400">
                   A ➔ Z
                </div>
             </div>
         </div>
      </div>
    )
  },
  {
    id: '4',
    title: 'Atbash: O Espelho',
    subtitle: 'A Cifra Hebraica (500 a.C)',
    tag: 'HISTÓRIA',
    image: '/assets/seginfo_aula7/pixel_atbash_mirror.png',
    accent: 'amber',
    content: (
      <div className="space-y-4">
        <p className="text-slate-300">
           Documentada no livro de Jeremias, o Atbash simplesmente inverte o alfabeto inteiro como num espelho milenar.
        </p>
        <div className="font-mono text-center my-6 space-y-2">
            <div className="text-amber-400 text-lg uppercase tracking-[0.3em]">A B C D E ... Z</div>
            <div className="h-8 border-l-2 border-r-2 border-slate-700 mx-auto w-48 relative">
               <div className="absolute inset-0 flex items-center justify-center text-xs text-slate-500">Espelho</div>
            </div>
            <div className="text-emerald-400 text-lg uppercase tracking-[0.3em]">Z Y X W V ... A</div>
        </div>
        <p className="text-slate-400 text-sm italic text-center">Simples de criptografar e decifrar. Mas sem variação, quem descobre o truque lê tudo instantaneamente.</p>
      </div>
    )
  },
  {
    id: '5',
    title: 'A Cifra de César',
    subtitle: 'O General Romano e o Fator K',
    tag: '03. REGRAS MATEMÁTICAS',
    image: '/assets/seginfo_aula7/pixel_caesar_wheel.png',
    accent: 'red',
    content: (
      <div className="space-y-6">
         <p className="text-slate-300">
            Júlio César precisava se comunicar com seus generais. Ele escolheu rotacionar o alfabeto em 3 posições à direita.
         </p>
         <div className="bg-red-900/20 p-6 rounded-xl border border-red-500/30 font-mono text-center">
             <span className="text-white text-3xl font-black">C = (P + K) mod 26</span>
         </div>
         <ul className="text-sm text-slate-400 space-y-2 list-disc pl-5">
            <li><strong className="text-red-400">C</strong>: Ciphertext (Letra Cifrada).</li>
            <li><strong className="text-red-400">P</strong>: Plaintext (Letra Pura).</li>
            <li><strong className="text-red-400">K</strong>: Key (Chave do deslocamento. Para César, K=3).</li>
            <li><strong className="text-red-400">mod 26</strong>: O relógio volta para A quando passa do Z.</li>
         </ul>
      </div>
    )
  },
  {
    id: '6',
    title: '[INTERAÇÃO] Constelação de César',
    subtitle: 'Rotacione o Dial para Forjar Mensagens',
    tag: 'SIMULADOR',
    image: '',
    accent: 'orange',
    content: (
        <CaesarSimulator />
    )
  },
  {
    id: '7',
    title: 'A Queda do Império',
    subtitle: 'Al-Kindi e a Análise de Frequência',
    tag: '04. CRIPTOANÁLISE',
    image: '/assets/seginfo_aula7/pixel_frequency_chart.png',
    accent: 'emerald',
    content: (
      <div className="space-y-4">
         <p className="text-slate-300">
            César permaneceu invicto por 800 anos. Até que matemáticos árabes notaram um padrão natural nos idiomas.
         </p>
         <div className="bg-slate-800/80 p-5 rounded-xl border-l-4 border-emerald-500">
            <h4 className="text-emerald-400 font-bold mb-2">O Truque:</h4>
            <p className="text-sm text-slate-300">Na língua portuguesa, as letras 'A' e 'E' somadas cobrem quase 30% de todo e qualquer texto. Se uma Cifra de César converteu 'A' em 'D', então o 'D' vai aparecer absurdamente mais do que as outras letras na mensagem interceptada!</p>
         </div>
         <p className="text-slate-400 text-sm italic">Como o deslocamento 'K' é idêntico para a carta toda (Monoalfabético), basta contar as repetições e o segredo cai por terra em minutos.</p>
      </div>
    )
  },
  {
    id: '8',
    title: '[GAMES] Quebre o Código!',
    subtitle: 'Aplique Estatística contra a Máquina',
    tag: 'DESAFIO',
    image: '',
    accent: 'orange',
    content: (
        <FrequencyCracker />
    )
  },
  {
    id: '9',
    title: 'O Retorno de Vigenère',
    subtitle: 'A Cifra Polialfabética',
    tag: '05. A EVOLUÇÃO',
    image: '',
    accent: 'purple',
    content: (
      <div className="space-y-6">
         <p className="text-slate-300">
            Para impedir a Análise de Frequência, a cifra teria que destruir a lógica das contagens.
         </p>
         <h3 className="text-2xl font-black text-purple-400 text-center uppercase tracking-widest break-all">VIGENÈRE</h3>
         <p className="text-slate-400 text-sm">
             Em vez de um deslocamento (K) estático, Vigenère obriga o exército a concordar com uma Palavra-Chave (ex: "LEON"). 
             A primeira letra rotaciona as engrenagens baseado em 'L'. A segunda baseado em 'E'. Um 'A' no começo da frase virará 'X', mas um 'A' logo à frente virará 'P'. 
             A análise de frequência vira cinzas!
         </p>
      </div>
    )
  },
  {
    id: '10',
    title: 'O Ápice e o Abismo',
    subtitle: 'A Máquina Enigma da Segunda Guerra Mundial',
    tag: 'CLÍMAX',
    image: '/assets/seginfo_aula7/pixel_enigma_machine.png',
    accent: 'rose',
    content: (
      <div className="space-y-6">
         <p className="text-slate-300">
            Na WW2, a Alemanha Nazista automatizou a substituição polialfabética.
         </p>
         <div className="flex bg-rose-900/10 border border-rose-500/20 p-5 rounded-2xl gap-4">
            <Lock className="w-12 h-12 text-rose-500 shrink-0 opacity-50" />
            <div>
               <h4 className="font-bold text-white mb-1">A Enigma</h4>
               <p className="text-sm text-slate-400">Três a Cinco Rotores de Fiação, um painel frontal e configurações que giravam a cada tecla encostada, gerando **158 Quintilhões** de chaves diferentes. Substituir letras parecia atingir a inviolabilidade divina.</p>
            </div>
         </div>
      </div>
    )
  },
  {
    id: '11',
    title: 'A Derrota da Criptografia Clássica',
    subtitle: 'Mecânica contra Eletrônica (Bletchley Park)',
    tag: 'CONCLUSÃO',
    image: '',
    accent: 'blue',
    content: (
      <div className="space-y-6">
         <p className="text-slate-300 font-medium text-lg text-center">
            A Criptografia Clássica foi soterrada pela <span className="text-blue-400 font-black">Força Bruta Computacional.</span>
         </p>
         <p className="text-slate-400">
             Alan Turing e sua equipe criaram a "Bombe", uma das primeiras aproximações para atacar um espaço de chaves gigantesco em horas, e não séculos. Quando o software começou a nascer nas universidades pós-guerra, algoritmos de substituição e deslocamento das letras perderam o sentido. 
         </p>
         <p className="text-slate-400 italic text-sm text-center">
             Tudo o que manipula letras isoladas falha contra TFLOPS. Era a hora de mudar para a Matemática Pura.
         </p>
      </div>
    )
  },
  {
    id: '12',
    title: 'O Problema Intratável',
    subtitle: 'E Se Trocássemos a Chave em Público?',
    tag: 'EPÍLOGO',
    image: '/assets/seginfo_aula7/pixel_crypto_intro.png',
    accent: 'emerald',
    content: (
      <div className="space-y-8 flex flex-col items-center">
         <p className="text-lg text-slate-300 text-center">
             Todas as Cifras Clássicas (César, Vigenère, Enigma) têm um defeito de design terrível: O General e o Espião precisam combinar a "Chave Especial" (ex: K=3 ou a configuração inicial dos rotores) MENSALMENTE ESCONDIDOS e nunca deixar que seja capturada!
         </p>
         <div className="inline-block px-8 py-4 bg-emerald-900/40 border border-emerald-500 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:scale-105 transition-transform cursor-pointer">
             <h3 className="text-2xl font-black text-white whitespace-nowrap text-center">Diffie-Hellman e RSA</h3>
             <p className="text-emerald-300 text-sm mt-1 text-center">Bem-vindo à Criptologia Moderna</p>
         </div>
         <p className="text-slate-500 text-xs italic">Isso fica para a Aula 10 - Criptografia Assimétrica.</p>
      </div>
    )
  }
];

export function CryptoClassicLesson() {
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
        {slide.accent === 'blue' && <Eye className={`w-32 h-32 text-blue-500/30 animate-pulse`} />}
        {slide.accent !== 'blue' && <Lock className={`w-32 h-32 text-${slide.accent}-500/30 animate-pulse`} />}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-emerald-500/30 overflow-x-hidden relative flex flex-col">
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
           <Link to="/seguranca" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors">
              <ChevronLeft className="w-5 h-5 text-white" />
           </Link>
           <div>
              <h1 className="text-sm font-black tracking-widest text-slate-400 uppercase">AULA <span className="text-white border-l border-white/20 pl-2 ml-1">SEGINFO_M7</span></h1>
              <div className="h-0.5 w-full bg-emerald-500/50 rounded-full mt-0.5" />
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
                 className={`bg-slate-900/40 backdrop-blur-xl border border-white/5 p-6 md:p-10 rounded-[2rem] shadow-inner-white w-full ${slide.image === '' ? 'max-w-3xl text-left' : ''}`}
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
