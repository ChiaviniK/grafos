import { motion } from 'framer-motion';
import { Database, Search, ChevronRight, Lock, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Lesson {
  id: string;
  number: number;
  title: string;
  description: string;
  isLocked: boolean;
  path: string;
  icon: any;
}

const LESSONS: Lesson[] = [
  {
    id: 'intro-data',
    number: 1,
    title: 'O Papel do Analista',
    description: 'Transformando lixo em ouro. Skillsets, Data Cleaning e o cotidiano da profissão.',
    isLocked: false,
    path: '/data/aula1',
    icon: Search
  },
  {
    id: 'mindset',
    number: 2,
    title: 'Mindset Analítico',
    description: 'Growth Mindset, Resolution Focus e Bug Hunting corporativo.',
    isLocked: false,
    path: '/data/aula2',
    icon: Database
  }
];

export function DataSyllabus() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-emerald-500/30 overflow-x-hidden relative">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.15)_0%,rgba(2,6,23,1)_100%)] opacity-80" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8">
            <span className="p-2 bg-white/5 rounded-lg border border-white/10">
              <ChevronRight className="w-4 h-4 rotate-180" />
            </span>
            Voltar ao Hub Central
          </Link>
          
          <div className="inline-block px-4 py-1.5 rounded-full text-xs font-black tracking-[0.2em] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mb-6">
            TRILHA PRINCIPAL
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Análise de <span className="text-emerald-500 border-b-4 border-emerald-500/30">Dados</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
             A ciência de refinar o caos. Aprenda a transformar terabytes de informações desorganizadas em insights cruciais que ditam o rumo de corporações bilionárias.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {LESSONS.map((lesson, idx) => {
            const isAvailable = !lesson.isLocked;
            
            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="relative group"
              >
                {isAvailable ? (
                  <Link to={lesson.path} className="block h-full">
                    <LessonCard lesson={lesson} isAvailable={isAvailable} />
                  </Link>
                ) : (
                  <LessonCard lesson={lesson} isAvailable={isAvailable} />
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

function LessonCard({ lesson, isAvailable }: { lesson: Lesson, isAvailable: boolean }) {
  return (
    <div className={`h-full bg-slate-900/40 backdrop-blur-xl border-2 rounded-3xl p-6 md:p-8 transition-all duration-500 overflow-hidden relative group-hover:-translate-y-2
      ${isAvailable ? 'border-emerald-500/30 hover:border-emerald-400/50 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.2)]' : 'border-white/5 opacity-60 grayscale'}`}>
      
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 
        ${isAvailable ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-white/5 text-slate-500'}`}>
        <lesson.icon className="w-7 h-7" />
      </div>

      <div className="space-y-3 relative z-10">
        <div className="flex items-center justify-between">
          <div className={`text-xs font-black tracking-widest uppercase ${isAvailable ? 'text-emerald-500' : 'text-slate-500'}`}>
            Aula {lesson.number.toString().padStart(2, '0')}
          </div>
          {!isAvailable && <Lock className="w-4 h-4 text-slate-600" />}
        </div>
        
        <h3 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">
          {lesson.title}
        </h3>
        
        <p className="text-slate-400 text-sm leading-relaxed">
          {lesson.description}
        </p>
      </div>

      {isAvailable && (
        <div className="mt-8 flex items-center gap-2 text-emerald-400 font-bold text-sm tracking-wide">
          <BookOpen className="w-4 h-4" /> 
          ENTRAR NO LABORATÓRIO 
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      )}
    </div>
  );
}
