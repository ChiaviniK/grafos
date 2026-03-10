import { useState } from "react";
import { CheckSquare, Square, Target, Award, Brain } from "lucide-react";

export function DevSecSlide2() {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const toggleCheck = (id: number) => {
    if (checkedItems.includes(id)) {
       setCheckedItems(checkedItems.filter(i => i !== id));
    } else {
       setCheckedItems([...checkedItems, id]);
    }
  };

  const tasks = [
     { id: 1, icon: <Target className="w-6 h-6"/>, text: "Modelar sistemas computacionais, dados e suas estruturas baseadas em segurança." },
     { id: 2, icon: <Brain className="w-6 h-6"/>, text: "Desenvolver ou utilizar novas técnicas e ferramentas computacionais (IA Gerativa)." },
     { id: 3, icon: <Award className="w-6 h-6"/>, text: "Reconhecer a necessidade de atualização profissional constante no cenário Cyber." }
  ];

  return (
    <div className="flex flex-col  min-min-h-[100%] flex-1 flex-1  animate-in fade-in duration-500 max-w-4xl mx-auto w-full">
      <h2 className="text-4xl font-bold mb-4 tracking-tight text-white flex items-center gap-3">
         Competências desta Aula
      </h2>
      <p className="text-slate-400 text-xl mb-12">
         O que esperamos alcançar até o final deste laboratório (clique para marcar):
      </p>

      <div className="space-y-6">
         {tasks.map((task) => {
            const isChecked = checkedItems.includes(task.id);
            return (
               <div 
                  key={task.id}
                  onClick={() => toggleCheck(task.id)}
                  className={`flex items-start gap-6 p-6 rounded-2xl border-2 transition-all cursor-pointer select-none
                     ${isChecked 
                        ? 'bg-emerald-950/30 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.1)] translate-x-2' 
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                     }
                  `}
               >
                  <div className={`mt-1 shrink-0 transition-colors duration-300 ${isChecked ? 'text-emerald-400' : 'text-slate-500'}`}>
                     {isChecked ? <CheckSquare className="w-8 h-8" /> : <Square className="w-8 h-8" />}
                  </div>
                  
                  <div>
                     <div className={`mb-2 transition-colors duration-300 ${isChecked ? 'text-emerald-400' : 'text-slate-500'}`}>
                        {task.icon}
                     </div>
                     <p className={`text-2xl font-medium transition-colors duration-300 ${isChecked ? 'text-emerald-100' : 'text-slate-400'}`}>
                        {task.text}
                     </p>
                  </div>
               </div>
            )
         })}
      </div>

    </div>
  );
}
