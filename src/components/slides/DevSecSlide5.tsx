import { useState } from "react";
import { AlertTriangle, Fingerprint, Bug, ShieldCheck } from "lucide-react";

export function DevSecSlide5() {
  const [foundVulnerability, setFoundVulnerability] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Vulnerability is precisely at line 12. Using 12 mapping directly.
  const handleLineClick = (lineNum: number) => {
     if (lineNum === 12) {
        setFoundVulnerability(true);
     }
  };

  const lines = [
   "from flask import Flask, request, jsonify",
   "import subprocess",
   "",
   "app = Flask(__name__)",
   "",
   "@app.route('/scan', methods=['POST'])",
   "def scan_target():",
   "    data = request.json",
   "    target_ip = data.get('ip', '127.0.0.1')",
   "    ",
   "    # A IA gerou esta chamada com o argumento shell em True",
   "    output = subprocess.check_output(f'python run_scan.py {target_ip}', shell=True)",
   "    ",
   "    return jsonify({'status': 'success', 'result': str(output)})",
   "",
   "if __name__ == '__main__':",
   "    app.run(port=5000)"
  ];

  return (
    <div className="flex flex-col  min-min-h-[100%] flex-1 flex-1  animate-in fade-in duration-500 max-w-5xl mx-auto w-full relative">
      <div className="flex items-center justify-between mb-4">
         <h2 className="text-4xl font-bold tracking-tight text-white flex items-center gap-3">
            O Validador: Human-in-the-Loop
         </h2>
         <div className="bg-rose-500/20 text-rose-400 px-4 py-2 rounded-xl font-bold flex items-center gap-2 border border-rose-500/30">
            <Bug className="w-5 h-5" /> Encontre a Vulnerabilidade
         </div>
      </div>
      
      <p className="text-slate-400 text-xl mb-8">
         Abaixo está um trecho de código Python (Flask) <strong>gerado por uma IA</strong> para o nosso scanner de portas. Clique na linha de código que contém uma falha crítica de <strong>Injection</strong> ou execução insegura.
      </p>

      {/* Code Editor Mockup */}
      <div className="flex-1 bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden flex flex-col shadow-2xl relative font-mono text-sm md:text-base">
         
         <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
               <div className="w-3 h-3 rounded-full bg-rose-500"></div>
               <div className="w-3 h-3 rounded-full bg-amber-500"></div>
               <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            </div>
            <div className="text-slate-500 font-medium">app.py (Gerado por IA)</div>
            <div></div>
         </div>

         <div className="p-4 overflow-y-auto flex-1 text-slate-300">
            {lines.map((line, idx) => {
               const lineNum = idx + 1;
               const isVulnerableLine = lineNum === 12;
               return (
                  <div 
                     key={lineNum}
                     onClick={() => handleLineClick(lineNum)}
                     className={`flex items-start hover:bg-slate-800/80 cursor-pointer rounded transition-colors group ${
                        foundVulnerability && isVulnerableLine ? 'bg-rose-900/40 border-y border-rose-500/50 -mx-4 px-4 py-1 relative z-20' : ''
                     }`}
                  >
                     <div className="w-10 text-right pr-4 shrink-0 text-slate-600 select-none group-hover:text-slate-400 py-0.5">
                        {lineNum}
                     </div>
                     <div className={`whitespace-pre flex-1 py-0.5 ${foundVulnerability && isVulnerableLine ? 'text-rose-200 font-bold' : ''}`}>
                        {line}
                     </div>
                     {foundVulnerability && isVulnerableLine && (
                        <div className="pr-4 animate-in fade-in slide-in-from-right-4 relative z-30 flex items-center h-full">
                           <AlertTriangle className="w-5 h-5 text-rose-500" />
                        </div>
                     )}
                  </div>
               )
            })}
         </div>

         {/* Overlay Feedback Full Screen on Success */}
         {foundVulnerability && (
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md z-10 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300 p-8">
               <div className="p-8 absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-900/20 via-slate-900/50 to-slate-950/90 mix-blend-overlay"></div>
               <div className="relative z-20 flex flex-col items-center max-w-4xl text-center">
                  <div className="w-24 h-24 rounded-full bg-rose-500/20 flex items-center justify-center border-4 border-rose-500/40 shadow-[0_0_80px_rgba(244,63,94,0.4)] mb-6 animate-pulse">
                      <Fingerprint className="w-12 h-12 text-rose-400" />
                  </div>
                  <h3 className="text-3xl md:text-5xl font-black text-rose-300 mb-6 drop-shadow-md">Command Injection Detectado!</h3>
                  <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl leading-relaxed">
                     A IA usou <code className="bg-slate-800 px-2 py-1 rounded text-rose-400">shell=True</code> concatenando diretamente o input arbitrário (<code className="bg-slate-800 px-2 py-1 rounded text-emerald-400">target_ip</code>). Se o atacante enviar: <br/><br/>
                     <span className="bg-slate-950 border border-rose-500/30 text-rose-300 px-4 py-3 rounded-xl font-mono block text-xl shadow-inner break-all">
                        127.0.0.1 ; rm -rf / ;
                     </span>
                  </p>
                  
                  <div className="bg-emerald-950/30 border border-emerald-500/40 rounded-2xl p-8 text-left w-full shadow-lg">
                     <h4 className="text-emerald-400 text-2xl font-bold mb-4 flex items-center gap-3">
                        <ShieldCheck className="w-7 h-7"/> A Correção ideal (Validada pelo Humano):
                     </h4>
                     <ul className="text-emerald-100/90 text-xl space-y-4 list-disc list-inside">
                        <li>Remover <code className="text-rose-400 font-bold">shell=True</code>.</li>
                        <li>Passar os argumentos num Array iterativo ao invés de string concatenada.</li>
                        <li>Sanitizar <code>target_ip</code> verificando estritamente via Pattern (Regex IPv4).</li>
                     </ul>
                  </div>
               </div>
            </div>
         )}
      </div>

      {(!foundVulnerability) && (
         <div className="mt-6 flex justify-end relative z-0">
            <button 
               onClick={() => setShowHint(true)}
               disabled={showHint}
               className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${showHint ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}
            >
               {showHint ? "Dica: Olhe a chamada do subprocess na linha 12..." : "Precisa de uma dica?"}
            </button>
         </div>
      )}

    </div>
  );
}
