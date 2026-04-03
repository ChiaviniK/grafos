import { useState, useRef, useEffect } from "react";
import { Terminal, Globe, Github, CheckCircle2, CloudUpload, HardDrive, FileCode, History, GitBranch } from "lucide-react";

// --- Types ---
interface RepoState {
  isInitialized: boolean;
  staged: string[];
  committed: { message: string; date: string; files: string[] }[];
  isRemoteLinked: boolean;
  isPushed: boolean;
}

// --- GitTerminal Component ---
export function GitTerminal({ onCommand }: { state: RepoState; onCommand: (cmd: string) => string }) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{ type: 'cmd' | 'out'; text: string }[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const cmd = input.trim();
    const output = onCommand(cmd);
    
    setHistory(prev => [...prev, { type: 'cmd', text: cmd }, { type: 'out', text: output }]);
    setInput("");
  };

  return (
    <div className="flex flex-col bg-[#0d1117] border border-slate-700 rounded-2xl overflow-hidden h-[400px] font-mono text-xs shadow-2xl">
      <div className="bg-[#161b22] px-4 py-2 border-b border-slate-700 flex items-center gap-2">
        <Terminal className="w-4 h-4 text-slate-500" />
        <span className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">Bash - Local Repository</span>
      </div>
      
      <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-1 custom-scrollbar">
        <div className="text-slate-500 mb-4 italic"># Digite 'help' para ver os comandos disponíveis.</div>
        {history.map((line, i) => (
          <div key={i} className={line.type === 'cmd' ? "text-emerald-400" : "text-slate-300 pl-4 border-l border-slate-800"}>
            {line.type === 'cmd' && <span className="text-slate-600 mr-2">$</span>}
            {line.text}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-4 bg-[#161b22] border-t border-slate-700 flex items-center gap-2">
        <span className="text-emerald-500 font-bold">$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent outline-none flex-1 text-emerald-400 placeholder:text-slate-700"
          placeholder="Digite um comando git..."
          autoFocus
        />
      </form>
    </div>
  );
}

// --- GitHubMockup Component ---
export function GitHubMockup({ state }: { state: RepoState }) {
  return (
    <div className="flex flex-col bg-white rounded-2xl overflow-hidden h-[400px] shadow-2xl text-slate-900 border border-slate-200">
      {/* Header */}
      <div className="bg-[#f6f8fa] border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Github className="w-6 h-6" />
          <div className="flex items-center gap-1 text-sm font-semibold">
            <span className="text-blue-600">user-aluno</span>
            <span className="text-slate-400">/</span>
            <span>meu-primeiro-repo</span>
          </div>
        </div>
        <div className="flex gap-2">
           <div className="px-3 py-1 bg-white border border-slate-300 rounded text-[10px] font-bold">Public</div>
        </div>
      </div>

      {!state.isPushed ? (
        <div className="flex-1 flex flex-col items-center justify-center p-10 text-center space-y-4">
           <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
              <Globe className="w-8 h-8 text-slate-300" />
           </div>
           <h3 className="text-lg font-bold">Inicie este repositório</h3>
           <p className="text-xs text-slate-500">Dê um `git push` do seu computador para ver os arquivos aqui.</p>
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
           <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white">
              <div className="flex items-center gap-4 text-xs">
                 <div className="flex items-center gap-1"><History className="w-4 h-4" /> <b>{state.committed.length}</b> commits</div>
                 <div className="flex items-center gap-1 group cursor-pointer"><GitBranch className="w-4 h-4" /> <b>main</b></div>
              </div>
              <button className="bg-[#2da44e] hover:bg-[#2c974b] text-white px-3 py-1.5 rounded-md text-xs font-bold">Code</button>
           </div>
           
           <div className="flex-1 overflow-y-auto">
              <table className="w-full text-xs text-left">
                 <thead>
                    <tr className="bg-[#f6f8fa] text-slate-500 border-b border-slate-200">
                       <th className="p-3 font-medium">Nome</th>
                       <th className="p-3 font-medium">Mensagem de Commit</th>
                       <th className="p-3 font-medium text-right">Data</th>
                    </tr>
                 </thead>
                 <tbody>
                    {state.committed[state.committed.length - 1]?.files.map((file: string, i: number) => (
                       <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="p-3 flex items-center gap-2"><FileCode className="w-4 h-4 text-slate-400" /> {file}</td>
                          <td className="p-3 text-slate-500">{state.committed[state.committed.length - 1]?.message}</td>
                          <td className="p-3 text-right text-slate-400">{state.committed[state.committed.length - 1]?.date}</td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      )}
    </div>
  );
}

// --- Main Simulator ---
export function GitGithubSimulator() {
  const [state, setState] = useState<RepoState>({
    isInitialized: false,
    staged: [],
    committed: [],
    isRemoteLinked: false,
    isPushed: false
  });

  const handleCommand = (cmd: string): string => {
    const parts = cmd.toLowerCase().split(" ");
    
    if (parts[0] === "help") {
      return "Comandos: git init, git add <file>, git commit -m \"msg\", git remote add origin <url>, git push, git status, git log";
    }

    if (cmd === "git init") {
      setState(s => ({ ...s, isInitialized: true }));
      return "Initialized empty Git repository in /user/aluno/meu-primeiro-repo/.git/";
    }

    if (!state.isInitialized && parts[0] === "git") {
      return "fatal: not a git repository (run 'git init' first)";
    }

    if (cmd === "git status") {
      if (state.staged.length > 0) {
        return `On branch master\nChanges to be committed:\n  new file: ${state.staged.join(", ")}`;
      }
      return "On branch master\nnothing to commit, working tree clean";
    }

    if (cmd.startsWith("git add")) {
      const file = parts[2] || "README.md";
      setState(s => ({ ...s, staged: [...new Set([...s.staged, file])] }));
      return `add '${file}'`;
    }

    if (cmd.startsWith("git commit")) {
      if (state.staged.length === 0) return "nothing to commit, working tree clean";
      const match = cmd.match(/-m\s+"(.*?)"/);
      const msg = match ? match[1] : "commit";
      const newCommit = { message: msg, date: "hoje", files: [...state.staged] };
      setState(s => ({ ...s, committed: [...s.committed, newCommit], staged: [] }));
      return `[master (root-commit)] ${msg}\n 1 file changed, 1 insertion(+)`;
    }

    if (cmd.startsWith("git remote add origin")) {
      setState(s => ({ ...s, isRemoteLinked: true }));
      return "remote: origin added";
    }

    if (cmd === "git push" || cmd === "git push -u origin master") {
      if (!state.isRemoteLinked) return "fatal: 'origin' does not appear to be a git repository";
      if (state.committed.length === 0) return "Everything up-to-date";
      setState(s => ({ ...s, isPushed: true }));
      return "Enumerating objects: 3, done.\nWriting objects: 100% (3/3), 220 bytes, done.\nTo https://github.com/user-aluno/meu-primeiro-repo.git\n * [new branch]      master -> master";
    }

    if (cmd === "git log") {
       if (state.committed.length === 0) return "fatal: your current branch 'master' does not have any commits yet";
       return state.committed.map(c => `commit 7f3a2b1\nAuthor: Aluno <aluno@escola.com>\nDate: ${c.date}\n\n    ${c.message}`).join("\n\n");
    }

    return `command not found: ${cmd}`;
  };

  return (
    <div className="w-full space-y-8 animate-in zoom-in duration-500">
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
             <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl w-fit">
                <HardDrive className="w-4 h-4 text-emerald-400" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest">Seu Computador</span>
             </div>
             <GitTerminal state={state} onCommand={handleCommand} />
          </div>

          <div className="space-y-4">
             <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl w-fit">
                <CloudUpload className="w-4 h-4 text-blue-400" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest">Nuvem (GitHub)</span>
             </div>
             <GitHubMockup state={state} />
          </div>
       </div>

       {/* Guide / Success State */}
       <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-[2rem] flex flex-col items-center text-center">
          {!state.isInitialized ? (
             <p className="text-slate-400 text-sm italic">Comece inicializando o repositório com <code>git init</code></p>
          ) : !state.isPushed ? (
             <div className="space-y-2">
                <p className="text-emerald-400 text-sm font-bold uppercase tracking-widest">Próximos Passos:</p>
                <div className="flex flex-wrap gap-2 justify-center text-[10px]">
                   <span className={`px-2 py-1 rounded border ${state.staged.length > 0 ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>git add README.md</span>
                   <span className={`px-2 py-1 rounded border ${state.committed.length > 0 ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>git commit -m "msg"</span>
                   <span className={`px-2 py-1 rounded border ${state.isRemoteLinked ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>git remote add origin ...</span>
                   <span className={`px-2 py-1 rounded border ${state.isPushed ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>git push</span>
                </div>
             </div>
          ) : (
             <div className="flex items-center gap-4 animate-bounce">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                <span className="text-xl font-black text-white uppercase italic tracking-tighter">Missão Cumprida! Repositório Sincronizado.</span>
             </div>
          )}
       </div>
    </div>
  );
}
