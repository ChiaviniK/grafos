import { GraduationCap, Github, Linkedin, Mail } from "lucide-react";

export function LFASlide8_12() {
  return (
    <div className="flex flex-col min-h-[100%] flex-1 animate-in fade-in duration-500">
      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-fuchsia-600 to-sky-500 flex items-center justify-center mb-6 shadow-2xl shadow-fuchsia-500/20">
           <GraduationCap className="w-10 h-10 text-white" />
        </div>
        
        <h2 className="text-4xl font-black text-white mb-4 tracking-tight">
          Conclusão da <span className="text-fuchsia-400">Aula 8</span>
        </h2>
        
        <p className="text-slate-400 text-lg leading-relaxed mb-8">
          Dominamos o <strong className="text-white">AFN-ε</strong> e as <strong className="text-white">Expressões Regulares</strong>. 
          Agora é o momento de cada grupo aplicar esses conceitos poderosos nos temas disruptivos escolhidos.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
           <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-left">
              <p className="text-fuchsia-400 font-black text-[10px] uppercase tracking-widest mb-2">Próximos Passos</p>
              <ul className="text-sm text-slate-300 space-y-2">
                 <li>• Reunião de grupo para divisão de tarefas</li>
                 <li>• Pesquisa bibliográfica em fontes científicas</li>
                 <li>• Desenvolvimento do protótipo de busca via Regex</li>
              </ul>
           </div>
           <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-left">
              <p className="text-sky-400 font-black text-[10px] uppercase tracking-widest mb-2">Links de Apoio</p>
              <ul className="text-sm text-slate-300 space-y-2">
                 <li>• Thompson Algorithm (MIT OpenCourse)</li>
                 <li>• RegExr.com (Testes de Padrões)</li>
                 <li>• Python re Documentation</li>
              </ul>
           </div>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
           <img src="https://github.com/chiavinik.png" className="w-10 h-10 rounded-full border border-slate-700" alt="Luiz Chiavini" />
           <div className="text-left">
              <p className="text-white font-bold text-sm">Professor Luiz Chiavini</p>
              <p className="text-slate-500 text-xs">Mestre em Computação Aplicada</p>
           </div>
        </div>
        <div className="flex items-center gap-4">
           <a href="https://github.com/chiavinik" className="text-slate-500 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
           <a href="https://linkedin.com/in/luizchiavini" className="text-slate-500 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
           <a href="mailto:contato@chiavini.com" className="text-slate-500 hover:text-white transition-colors"><Mail className="w-5 h-5" /></a>
        </div>
      </div>
    </div>
  );
}
