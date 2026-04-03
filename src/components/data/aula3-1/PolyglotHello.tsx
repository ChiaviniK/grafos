import { useState } from "react";
import { Copy, Terminal, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Language {
  id: string;
  name: string;
  code: string;
  complexity: "Low" | "Medium" | "High";
  description: string;
  icon: string;
}

const LANGUAGES: Language[] = [
  {
    id: "python",
    name: "Python",
    code: 'print("Hello World")',
    complexity: "Low",
    description: "Referência absoluta em análise de dados. Gramática simples e direta.",
    icon: "🐍"
  },
  {
    id: "js",
    name: "JavaScript",
    code: 'console.log("Hello World");',
    complexity: "Low",
    description: "A linguagem da web. Onipresente, flexível e essencial para dashboards interativos.",
    icon: "🌐"
  },
  {
    id: "java",
    name: "Java",
    code: 'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello World");\n  }\n}',
    complexity: "High",
    description: "A robusta linguagem corporativa. Focada em orientação a objetos e sistemas de larga escala.",
    icon: "☕"
  },
  {
    id: "cpp",
    name: "C++",
    code: '#include <iostream>\n\nint main() {\n  std::cout << "Hello World" << std::endl;\n  return 0;\n}',
    complexity: "High",
    description: "Poderosa e performática. Usada em sistemas operacionais e motores gráficos.",
    icon: "🦾"
  },
  {
    id: "go",
    name: "Go",
    code: 'package main\nimport "fmt"\n\nfunc main() {\n  fmt.Println("Hello World")\n}',
    complexity: "Medium",
    description: "Criada pelo Google para ser eficiente e moderna. Ótima para concorrência.",
    icon: "🐹"
  },
  {
    id: "ruby",
    name: "Ruby",
    code: 'puts "Hello World"',
    complexity: "Low",
    description: "Focada na felicidade do programador. Elegante e fácil de ler.",
    icon: "💎"
  },
  {
    id: "csharp",
    name: "C#",
    code: 'using System;\n\nclass Program {\n  static void Main() {\n    Console.WriteLine("Hello World");\n  }\n}',
    complexity: "Medium",
    description: "Versátil e poderosa. Potencializada pelo ecossistema Microsoft e Unity.",
    icon: "💠"
  }
];

export function PolyglotHello() {
  const [selected, setSelected] = useState<Language>(LANGUAGES[0]);
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(selected.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-wrap gap-2 justify-center">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.id}
            onClick={() => setSelected(lang)}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              selected.id === lang.id
                ? "bg-blue-600 text-white shadow-lg shadow-blue-900/40 scale-105"
                : "bg-slate-900 border border-slate-800 text-slate-500 hover:text-slate-300 hover:border-slate-700"
            }`}
          >
            {lang.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* Left: Code Viewer */}
        <div className="bg-[#0d1117] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
             <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-blue-400" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{selected.name} Source Code</span>
             </div>
             <button
                onClick={copyCode}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-500 hover:text-blue-400"
                title="Copiar Código"
             >
                {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
             </button>
          </div>
          
          <div className="p-8 min-h-[220px] flex items-center justify-center font-mono text-sm overflow-x-auto">
             <AnimatePresence mode="wait">
                <motion.pre
                   key={selected.id}
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   className="text-blue-200 leading-relaxed text-center"
                >
                   {selected.code}
                </motion.pre>
             </AnimatePresence>
          </div>
        </div>

        {/* Right: Info Card */}
        <AnimatePresence mode="wait">
           <motion.div
              key={selected.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 flex flex-col justify-center space-y-6"
           >
              <div className="flex items-center gap-4">
                 <div className="text-5xl">{selected.icon}</div>
                 <div>
                    <h3 className="text-2xl font-black text-white">{selected.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                       <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Complexidade:</span>
                       <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                          selected.complexity === "Low" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                          selected.complexity === "Medium" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
                          "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                       }`}>
                          {selected.complexity}
                       </span>
                    </div>
                 </div>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed">
                 {selected.description}
              </p>

              <div className="pt-4 border-t border-slate-800">
                 <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2">Destaque Cultural:</div>
                 <p className="text-xs text-slate-500 italic">"Geralmente é o primeiro passo de quem está começando — um rito de passagem no mundo dev."</p>
              </div>
           </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
