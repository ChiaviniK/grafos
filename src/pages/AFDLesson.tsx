import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, BrainCircuit, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TransitionTableGame } from '../components/lfa/TransitionTableGame';
import { SlimeMinimizationGame } from '../components/lfa/SlimeMinimizationGame';
import { StringTesterGame } from '../components/lfa/StringTesterGame';

const SLIDES = [
  {
    id: '1',
    title: 'Aprofundamento AFD',
    subtitle: 'Dominando o Determinismo',
    tag: '01. INTRODUÇÃO',
    image: '/assets/lfa_aula6/intro_gates.png',
    accent: 'blue',
    content: (
      <div className="space-y-4">
        <p className="text-2xl font-light text-slate-300 leading-relaxed">
          Muito além do <span className="text-blue-400 font-bold">estado inicial</span>.
        </p>
        <div className="h-px w-full bg-gradient-to-r from-blue-500/50 to-transparent my-6" />
        <p className="text-slate-400 italic">
          "Aprender AFD é entender como as máquinas tomam decisões sem ambiguidade."
        </p>
      </div>
    )
  },
  {
    id: '2',
    title: 'O que é um AFD?',
    subtitle: 'Revisão: A Regra de Ouro',
    tag: 'REVISÃO',
    image: '/assets/lfa_aula6/gears_transition.png',
    accent: 'emerald',
    content: (
      <div className="space-y-6">
        <div className="bg-slate-800/40 p-6 rounded-2xl border border-emerald-500/20">
            <h4 className="text-emerald-400 font-bold mb-2">Sem Ambiguidade</h4>
            <p className="text-slate-300">
              Para cada estado atual e cada símbolo do alfabeto que é lido, existe <strong>exatamente uma</strong> transição possível.
            </p>
        </div>
        <p className="text-slate-400">Pense no AFD como um conjunto de engrenagens perfeitas. O estado atual dita a posição, e a entrada gira a manivela para exatamente uma nova posição previsível.</p>
      </div>
    )
  },
  {
    id: '3',
    title: 'A Quíntupla Mágica',
    subtitle: 'A Definição Formal',
    tag: '02. TEORIA',
    image: '/assets/lfa_aula6/intro_gates.png',
    accent: 'purple',
    content: (
      <div className="space-y-4">
        <div className="text-3xl font-black text-purple-400 mb-6 font-mono text-center bg-purple-900/20 py-4 rounded-xl border border-purple-500/30">
          M = (Q, Σ, δ, q0, F)
        </div>
        <ul className="space-y-3 text-slate-300">
           <li className="flex items-center gap-2"><span className="text-purple-400 font-bold w-6">Q:</span> Conjunto finito de estados (ex: Salas do castelo).</li>
           <li className="flex items-center gap-2"><span className="text-purple-400 font-bold w-6">Σ:</span> Alfabeto (ex: Chaves disponíveis a, b, c).</li>
           <li className="flex items-center gap-2"><span className="text-purple-400 font-bold w-6">δ:</span> Função de transição (O mapa de conexões).</li>
           <li className="flex items-center gap-2"><span className="text-purple-400 font-bold w-6">q0:</span> Estado inicial (A entrada).</li>
           <li className="flex items-center gap-2"><span className="text-purple-400 font-bold w-6">F:</span> Estados finais/aceitação (O tesouro).</li>
        </ul>
      </div>
    )
  },
  {
    id: '4',
    title: 'A Função de Transição (δ)',
    subtitle: 'Mapeando os Caminhos',
    tag: '02. TEORIA',
    image: '/assets/lfa_aula6/gears_transition.png',
    accent: 'amber',
    content: (
      <div className="space-y-6">
         <p className="text-slate-300">A função δ dita as regras do jogo. A sintaxe matemática é:</p>
         <div className="bg-slate-800 p-6 rounded-xl border border-amber-500/30 text-center text-2xl font-mono text-amber-300">
            δ(q, a) = p
         </div>
         <p className="text-sm text-slate-400 text-center">"Se estou no estado <strong>q</strong> e leio <strong>a</strong>, vou para o estado <strong>p</strong>."</p>
         <p className="text-slate-300">Isso pode ser representado de maneira tabular (Tabela de Transição) ou de maneira gráfica (Diagrama de Estados).</p>
      </div>
    )
  },
  {
    id: '5',
    title: 'Desafio 1: Início e Fim Iguais',
    subtitle: 'Construindo um AFD a partir de uma regra gramatical',
    tag: '03. CONSTRUÇÃO',
    image: '',
    accent: 'blue',
    content: (
      <div className="space-y-6">
          <div className="p-6 bg-blue-900/20 border border-blue-500/30 rounded-2xl">
             <h4 className="text-blue-400 font-bold mb-2">Desafio:</h4>
             <p className="text-xl text-white">Construa um AFD sobre Σ={'{a,b}'} que aceite palavras que começam e terminam com a mesma letra.</p>
          </div>
          <p className="text-slate-400">Exemplos aceitos: "a", "b", "aba", "bbba", "aaba".</p>
          <p className="text-slate-400">Exemplos rejeitados: "ab", "ba", "abb", "baaa".</p>
      </div>
    )
  },
  {
    id: '6',
    title: 'Memória Finita',
    subtitle: 'Por que Finita?',
    tag: 'CONCEITO CHAVE',
    image: '/assets/lfa_aula6/rpg_inventory.png',
    accent: 'emerald',
    content: (
      <div className="space-y-6">
         <p className="text-slate-300">Para resolver o Desafio 1, o AFD precisa "lembrar" com qual letra a palavra começou.</p>
         <div className="bg-slate-800 border border-emerald-500/20 p-6 rounded-xl">
             <p className="text-slate-300">Como a memória de um AFD é mapeada?</p>
             <p className="text-xl font-bold text-emerald-400 mt-2">Através de seus Estados (Q).</p>
         </div>
         <p className="text-slate-400">Cada estado é um "slot de memória limitadíssimo". Teremos um estado para "Começou com A" e outro para "Começou com B". Como temos 2 letras, a memória cabe tranquilamente. Se o dicionário fosse infinito, o AFD não daria conta.</p>
      </div>
    )
  },
  {
    id: '7',
    title: '[INTERAÇÃO] Monte a Tabela',
    subtitle: 'DFA que começa e termina com letras iguais',
    tag: 'DRAG & DROP',
    image: '',
    accent: 'orange',
    content: (
        <TransitionTableGame />
    )
  },

  {
    id: '8',
    title: 'Minimização de AFDs',
    subtitle: 'Fazendo mais com menos',
    tag: '04. OTIMIZAÇÃO',
    image: '/assets/lfa_aula6/machine_vs_chip.png',
    accent: 'rose',
    content: (
      <div className="space-y-6">
         <p className="text-slate-300">Muitas vezes, construímos AFDs com estados redundantes.</p>
         <p className="text-slate-300">A <span className="text-rose-400 font-bold">Minimização</span> é o processo de encontrar o AFD equivalente (com a mesma linguagem L) com o menor número possível de estados.</p>
         <div className="flex gap-4">
            <div className="flex-1 bg-slate-800 p-4 rounded-xl border border-slate-700">
               <h5 className="font-bold text-white text-sm mb-1">Por que minimizar?</h5>
               <p className="text-xs text-slate-400">Menos estados = Menos memória física (RAM/Registradores) alocada em hardware ou software.</p>
            </div>
         </div>
      </div>
    )
  },
  {
    id: '9',
    title: 'Estados Equivalentes',
    subtitle: 'Os "Irmãos Gêmeos"',
    tag: 'O SEGREDO',
    image: '/assets/lfa_aula6/slime_merge.png',
    accent: 'blue',
    content: (
      <div className="space-y-6">
         <h4 className="text-xl font-bold text-blue-400">O que torna dois estados equivalentes?</h4>
         <p className="text-slate-300">
            Dois estados <em>p</em> e <em>q</em> são equivalentes se, a partir deles, ao ler <strong>qualquer</strong> sequência de letras <em>w</em>, o AFD vai terminar em um estado final nos dois casos, ou em um estado não-final nos dois casos.
         </p>
         <div className="bg-blue-900/20 p-4 border-l-4 border-blue-500 rounded-r-xl">
             <p className="text-blue-200 text-sm italic">Se os caminhos e os destinos (Aceitação V/F) são idênticos pro resto da vida, pra que ter dois estados? Podemos fundi-los em um só!</p>
         </div>
      </div>
    )
  },
  {
    id: '10',
    title: 'Algoritmo de Moore',
    subtitle: 'Refinando as partições',
    tag: 'PROCESSO',
    image: '/assets/lfa_aula6/machine_vs_chip.png',
    accent: 'purple',
    content: (
        <div className="space-y-6">
            <h4 className="font-bold text-white">Como achar os estados equivalentes?</h4>
            <ol className="list-decimal pl-5 space-y-4 text-slate-300 text-sm">
                <li><strong className="text-purple-400">A Grande Divisão (Passo Base):</strong> Separe todos os estados em dois grandes grupos: Os Finais (Aceitação) e os Não-Finais (Rejeição). Porque um estado final NUNCA é equivalente a um estado não-final ao ler a string vazia (épsilon).</li>
                <li><strong className="text-purple-400">Refinamento Iterativo:</strong> Para cada grupo, tente ler 'a' ou 'b'. Se states da mesma partição vão para partições DISTINTAS ao ler a mesma letra, eles não são tão irmãos assim. Divida eles!</li>
                <li>Repita até não haver mais divisão.</li>
            </ol>
        </div>
    )
  },
  {
    id: '11',
    title: '[INTERAÇÃO] Junte os Equivalentes',
    subtitle: 'Aplique o Algoritmo Visualmente',
    tag: 'DRAG & DROP',
    image: '',
    accent: 'orange',
    content: (
        <SlimeMinimizationGame />
    )
  },
  {
    id: '12',
    title: 'Desafio 2: O "Boss" da Paridade',
    subtitle: 'Criando um labirinto matemático',
    tag: '05. HARD MODE',
    image: '/assets/lfa_aula6/dungeon_parity.png',
    accent: 'red',
    content: (
      <div className="space-y-6">
          <div className="p-6 bg-red-900/20 border border-red-500/30 rounded-2xl">
             <h4 className="text-red-400 font-bold mb-2">Desafio Avançado:</h4>
             <p className="text-xl text-white">Construa um AFD sobre Σ={'{0,1}'} que aceite cadeias com número <strong>PAR de zeros</strong> e número <strong>ÍMPAR de uns</strong>.</p>
          </div>
          <p className="text-slate-400">Exemplos aceitos: "1" (0 zeros/par, 1 um/ímpar), "001", "100111", "010".</p>
          <p className="text-slate-400">Dica: Um AFD só possui memória local. Onde você armazena o estado atual dessas paridades independentes?</p>
      </div>
    )
  },
  {
    id: '13',
    title: 'Resolvendo o Boss',
    subtitle: 'Combinatória de Estados',
    tag: 'O SEGREDO',
    image: '/assets/lfa_aula6/dungeon_parity.png',
    accent: 'emerald',
    content: (
      <div className="space-y-6">
          <p className="text-slate-300">Como são duas condições independentes (O zero e o um são booleanos de paridade), precisamos cruzar as possibilidades!</p>
          <div className="grid grid-cols-2 gap-4 text-center text-sm font-bold">
              <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 text-slate-400">q0: (PAR de 0, PAR de 1)</div>
              <div className="bg-slate-800 p-3 rounded-lg border border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">q1: (PAR de 0, ÍMPAR de 1) <br/> <span className="text-[10px] text-emerald-500">🏆 ACEITAÇÃO</span></div>
              <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 text-slate-400">q2: (ÍMPAR de 0, PAR de 1)</div>
              <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 text-slate-400">q3: (ÍMPAR de 0, ÍMPAR de 1)</div>
          </div>
          <p className="text-slate-400 text-sm italic text-center mt-4">Essas 4 informações garantem a solução exata do Desafio 2.</p>
      </div>
    )
  },
  {
    id: '14',
    title: 'AFDs no Mundo Real',
    subtitle: 'Protocolos de Rede e Compiladores',
    tag: '06. APLICAÇÕES',
    image: '',
    accent: 'blue',
    content: (
      <div className="space-y-6">
          <div className="flex gap-4 items-start bg-slate-800/50 p-4 rounded-xl border border-slate-700">
             <Activity className="w-8 h-8 text-blue-400 shrink-0" />
             <div>
                <h4 className="font-bold text-white mb-1">State Machines em Redes (TCP/IP)</h4>
                <p className="text-sm text-slate-400">Os firewalls e protocolos de rede usam máquinas de estados para lembrar em que fase a conexão está: SYN_SENT, ESTABLISHED, FIN_WAIT.</p>
             </div>
          </div>
          <div className="flex gap-4 items-start bg-slate-800/50 p-4 rounded-xl border border-slate-700">
             <BrainCircuit className="w-8 h-8 text-blue-400 shrink-0" />
             <div>
                <h4 className="font-bold text-white mb-1">Análise Léxica de Compiladores</h4>
                <p className="text-sm text-slate-400">Sabe quando você digita "while()" e o VSCode colore de azul rapidamente? Um AFD nos bastidores reconheceu que essas exatas 5 letras formam uma palavra reservada, e não o começo de uma variável!</p>
             </div>
          </div>
      </div>
    )
  },
  {
    id: '15',
    title: 'Limitações do AFD',
    subtitle: 'A Maldição de Não Saber Contar Infinito',
    tag: 'OS LIMITES',
    image: '/assets/lfa_aula6/rpg_inventory.png',
    accent: 'red',
    content: (
      <div className="space-y-6">
          <h4 className="text-xl font-bold text-red-400 text-center uppercase tracking-wider">A Maldição</h4>
          <p className="text-slate-300 text-center text-lg italic">
              "Construa um AFD que aceite cadeias do tipo a^n b^n." (Ex: aabb, aaabbb, aaaabbbb).
          </p>
          <div className="bg-red-900/20 p-6 rounded-xl border border-red-500/30">
              <p className="text-red-200 font-medium">Missão Impossível.</p>
              <p className="text-slate-400 text-sm mt-2">Um AFD não possui uma memória "infinita" que consiga lembrar quantos "a"s foram lidos se "n" tender ao infinito. Ele precisaria de infinitos estados, perdendo o "Finito" do nome. É nisso que uma Linguagem Context-Free vai nos salvar no futuro.</p>
          </div>
      </div>
    )
  },
  {
    id: '16',
    title: '[GAMES] Teste de Cadeias',
    subtitle: 'Input a string e veja a máquina funcionar!',
    tag: 'MINI GAME',
    image: '',
    accent: 'emerald',
    content: (
        <StringTesterGame />
    )
  },
  {
    id: '17',
    title: 'Conclusão & O Próximo Chefe',
    subtitle: 'Para onde vamos agora?',
    tag: '07. EPÍLOGO',
    image: '/assets/lfa_aula6/multiverse_portal.png',
    accent: 'purple',
    content: (
      <div className="space-y-8 flex flex-col items-center">
         <p className="text-lg text-slate-300 text-center">
             Parabéns, você dominou o Determinismo! Mas... e se o nosso herói do Mundo Finito pudesse existir em múltiplos lugares ao mesmo tempo, escolhendo vários caminhos simultâneos quando vê uma placa bifucada?
         </p>
         <div className="inline-block px-8 py-4 bg-purple-900/40 border border-purple-500 rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.3)]">
             <h3 className="text-2xl font-black text-white whitespace-nowrap">Bem-vindo ao AFN</h3>
             <p className="text-purple-300 text-sm mt-1">Autômatos Finitos Não Determinísticos</p>
         </div>
      </div>
    )
  }
];

export function AFDLesson() {
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
      // Basic key mapping for presentation
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') paginate(1);
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') paginate(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const slide = SLIDES[currentSlide];

  // If there's no image, use a darker generic aesthetic
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
        <BrainCircuit className={`w-32 h-32 text-${slide.accent}-500/30 animate-pulse`} />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-blue-500/30 overflow-hidden relative">
      {/* Background FX identical to previous lectures for unity */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(15,23,42,0)_0%,rgba(2,6,23,1)_100%)] opacity-80" />
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <motion.div 
            animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.15, 0.1]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className={`absolute top-1/4 -right-20 w-[600px] h-[600px] rounded-full blur-[120px] bg-${slide.accent}-500/20`}
        />
      </div>

      <header className="relative z-20 px-8 py-6 flex justify-between items-center border-b border-white/5 backdrop-blur-md bg-slate-950/40">
        <div className="flex items-center gap-4">
           <Link to="/lfa-syllabus" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors">
              <ChevronLeft className="w-5 h-5 text-white" />
           </Link>
           <div>
              <h1 className="text-sm font-black tracking-widest text-slate-400 uppercase">AULA <span className="text-white border-l border-white/20 pl-2 ml-1">LFA_M6</span></h1>
              <div className="h-0.5 w-full bg-blue-500/50 rounded-full mt-0.5" />
           </div>
        </div>
        
        <div className="flex items-center gap-6">
           <div className="flex space-x-1">
              {SLIDES.map((_, i) => (
                <div key={i} className={`h-2 rounded-full transition-all ${i === currentSlide ? `w-6 bg-${slide.accent}-500` : 'w-2 bg-slate-800'}`} />
              ))}
           </div>
           <div className="text-[10px] font-mono text-slate-500 font-bold tracking-tighter shadow-sm w-12 text-right">
             {currentSlide + 1} / {SLIDES.length}
           </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-6 py-6 md:py-12 flex items-center justify-center h-[calc(100vh-160px)]">
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
            {/* Left Box: Graphic/Visual Area */}
            <div className="order-2 lg:order-1 space-y-4">
              {visualContent}
            </div>

            {/* Right Box: Content/Theory Area */}
            <div className={`order-1 lg:order-2 space-y-6 ${slide.image === '' ? 'lg:col-span-2 text-center items-center flex flex-col justify-center' : ''}`}>
               <motion.div 
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="space-y-2"
               >
                  <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black tracking-[0.2em] bg-${slide.accent}-500/10 text-${slide.accent}-400 border border-${slide.accent}-500/20`}>
                    {slide.tag}
                  </span>
                  <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-xl text-slate-400 font-medium">
                    {slide.subtitle}
                  </p>
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
        <button
          onClick={() => paginate(-1)}
          disabled={currentSlide === 0}
          className="pointer-events-auto p-4 rounded-full bg-slate-900/80 border border-white/5 text-slate-400 hover:text-white hover:bg-slate-800 transition-all disabled:opacity-20 backdrop-blur-xl group"
        >
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
        </button>

        <button
          onClick={() => paginate(1)}
          disabled={currentSlide === SLIDES.length - 1}
          className={`pointer-events-auto p-4 rounded-full bg-${slide.accent}-600/90 border border-${slide.accent}-400/30 text-white hover:bg-${slide.accent}-500 shadow-[0_0_20px_rgba(var(--tw-colors-blue-500),0.3)] transition-all disabled:opacity-20 backdrop-blur-xl group`}
        >
          <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>
      </footer>
      
      {/* Scanline CRT FX */}
      <div className="fixed inset-0 pointer-events-none z-[60] opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,118,0.06))] bg-[length:100%_4px,3px_100%]" />
    </div>
  );
}
