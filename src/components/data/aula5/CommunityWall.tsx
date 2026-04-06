import { useState, useEffect } from "react";
import { StickyNote, Plus, Trash2, Heart, Award, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PostIt {
  id: string;
  text: string;
  color: string;
  rotation: number;
}

const COLORS = [
  "bg-yellow-200 border-yellow-400 text-yellow-900",
  "bg-blue-200 border-blue-400 text-blue-900",
  "bg-rose-200 border-rose-400 text-rose-900",
  "bg-emerald-200 border-emerald-400 text-emerald-900",
  "bg-purple-200 border-purple-400 text-purple-900",
];

export function CommunityWall() {
  const [notes, setNotes] = useState<PostIt[]>([]);
  const [inputText, setInputText] = useState("");

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("grafos_community_notes");
    if (saved) {
      setNotes(JSON.parse(saved));
    } else {
      // Default notes
      setNotes([
        { id: "1", text: "Eu me comprometo a ser gentil com meus colegas no chat.", color: COLORS[1], rotation: -2 },
        { id: "2", text: "Vou chegar no horário em todas as sessões virtuais.", color: COLORS[0], rotation: 3 },
      ]);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem("grafos_community_notes", JSON.stringify(notes));
    }
  }, [notes]);

  const addNote = () => {
    if (!inputText.trim()) return;
    const newNote: PostIt = {
      id: Math.random().toString(),
      text: inputText,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotation: Math.floor(Math.random() * 10) - 5,
    };
    setNotes([newNote, ...notes]);
    setInputText("");
  };

  const removeNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-12 font-sans py-10">
      {/* Input Area */}
      <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 p-8 opacity-5">
            <StickyNote className="w-32 h-32 text-white" />
         </div>
         
         <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-rose-500/20 rounded-xl flex items-center justify-center border border-rose-500/20">
                  <ShieldCheck className="w-6 h-6 text-rose-400" />
               </div>
               <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">O Meu Compromisso Digital</h3>
            </div>
            
            <div className="flex gap-4">
               <textarea
                 value={inputText}
                 onChange={(e) => setInputText(e.target.value)}
                 placeholder="Para ser um membro forte desta comunidade, eu me comprometo a..."
                 className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-300 text-sm focus:outline-none focus:border-rose-500/50 transition-all resize-none h-24"
               />
               <button
                 onClick={addNote}
                 disabled={!inputText.trim()}
                 className="px-6 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest disabled:opacity-30 transition-all flex flex-col items-center justify-center gap-2"
               >
                  <Plus className="w-5 h-5" />
                  Fixar
               </button>
            </div>
         </div>
      </div>

      {/* Wall Display */}
      <div className="relative min-h-[500px] bg-slate-950 border-4 border-slate-900 rounded-[4rem] p-12 shadow-inner overflow-hidden">
         {/* Cork Board Texture Shadow */}
         <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '15px 15px' }} />
         
         <div className="flex flex-wrap justify-center gap-8 relative z-10">
            <AnimatePresence>
               {notes.map((note) => (
                 <motion.div
                   key={note.id}
                   initial={{ scale: 0, opacity: 0, rotate: 0 }}
                   animate={{ scale: 1, opacity: 1, rotate: note.rotation }}
                   exit={{ scale: 0, opacity: 0 }}
                   whileHover={{ scale: 1.05, rotate: 0, zIndex: 50 }}
                   className={`w-64 h-64 p-6 shadow-2xl border-t-8 flex flex-col justify-between cursor-pointer transition-shadow hover:shadow-rose-900/20 ${note.color}`}
                 >
                    <p className="text-sm font-bold leading-relaxed italic">
                       "{note.text}"
                    </p>
                    
                    <div className="flex justify-between items-center pt-4 border-t border-black/5">
                       <div className="flex gap-2">
                          <Heart className="w-4 h-4 fill-black/10 text-black/20" />
                          <Award className="w-4 h-4 text-black/20" />
                       </div>
                       <button
                         onClick={(e) => { e.stopPropagation(); removeNote(note.id); }}
                         className="text-black/20 hover:text-rose-600 transition-colors"
                       >
                          <Trash2 className="w-4 h-4" />
                       </button>
                    </div>
                 </motion.div>
               ))}
            </AnimatePresence>
         </div>

         {notes.length === 0 && (
           <div className="absolute inset-0 flex items-center justify-center text-slate-800 font-black text-4xl uppercase tracking-[0.5em] opacity-30 select-none">
              Mural Vazio
           </div>
         )}
      </div>

      <div className="flex justify-center gap-8 text-slate-600">
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Salvamento Automático Ativo</span>
         </div>
      </div>
    </div>
  );
}
