import { Network, Siren, Wifi } from "lucide-react";

export function RedesSlide1() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[100%] flex-1 text-center animate-in fade-in zoom-in duration-700 relative overflow-hidden py-8">

            {/* Pixel-art background layer */}
            <div className="absolute inset-0 z-0 opacity-10"
                style={{
                    backgroundImage: "url('/sprites/backgrounds/3/2304x1296.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    imageRendering: "pixelated",
                }}
            />

            {/* Animated packet lane */}
            <div className="absolute inset-x-0 bottom-16 z-10 flex flex-col gap-3 pointer-events-none">
                {/* VoIP packet — fast, green lane */}
                <div className="flex items-center gap-2 animate-[slide-in-from-left_3s_linear_infinite]">
                    <div className="h-6 w-24 rounded bg-emerald-500/80 border border-emerald-400 text-[10px] font-bold text-white flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.5)]">VoIP 🚑</div>
                </div>
                {/* Data packet — slow, gray lane */}
                <div className="flex items-center gap-2 animate-[slide-in-from-left_9s_linear_infinite] opacity-40">
                    <div className="h-6 w-24 rounded bg-slate-600 border border-slate-500 text-[10px] font-bold text-slate-300 flex items-center justify-center">DATA 📦</div>
                </div>
            </div>

            {/* Main content */}
            <div className="relative z-20 flex flex-col items-center">
                <div className="flex items-center gap-3 mb-6">
                    <span className="bg-blue-500/20 text-blue-400 font-bold px-3 py-1 rounded-full text-xs tracking-widest border border-blue-500/30">REDES CONVERGENTES</span>
                    <span className="text-slate-500 text-xs">Aula 05 · 10/03/2026</span>
                </div>

                <div className="flex items-center gap-4 mb-6">
                    <div className="w-20 h-20 bg-blue-500/20 rounded-3xl flex items-center justify-center border border-blue-500/30 shadow-2xl">
                        <Network className="w-10 h-10 text-blue-400" />
                    </div>
                    <Siren className="w-12 h-12 text-amber-400 animate-pulse" />
                    <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center border border-emerald-500/20">
                        <Wifi className="w-10 h-10 text-emerald-400" />
                    </div>
                </div>

                <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-4 drop-shadow-lg leading-none">
                    QoS
                </h1>
                <p className="text-2xl md:text-3xl font-light text-slate-300 mb-2">
                    IntServ, DiffServ e
                </p>
                <p className="text-2xl md:text-3xl font-bold text-blue-400 mb-10">
                    Gestão de Filas
                </p>

                <div className="grid grid-cols-2 gap-4 max-w-lg w-full text-left">
                    <div className="bg-slate-900/80 backdrop-blur border border-slate-700 rounded-2xl p-4">
                        <div className="text-xs text-slate-500 mb-1 font-mono">ODS</div>
                        <div className="text-slate-200 font-semibold text-sm">🏙️ ODS 11 — Cidades Sustentáveis<br />⚙️ ODS 9 — Inovação e Infraestrutura</div>
                    </div>
                    <div className="bg-slate-900/80 backdrop-blur border border-slate-700 rounded-2xl p-4">
                        <div className="text-xs text-slate-500 mb-1 font-mono">DURAÇÃO</div>
                        <div className="text-slate-200 font-semibold text-sm">⏱️ 2 horas<br />🔬 Metodologia Hands-on</div>
                    </div>
                </div>

                <p className="text-slate-600 text-xs mt-10 font-mono tracking-wider">
                    PROF. LUIZ CHIAVINI · UNIMAX · 2026
                </p>
            </div>
        </div>
    );
}
