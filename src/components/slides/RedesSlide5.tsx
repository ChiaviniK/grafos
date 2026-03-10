import { useState } from "react";
import { ArrowRight, Server } from "lucide-react";

const STEPS = [
    { label: "PATH", desc: "O telefone envia uma mensagem PATH ao longo de todo o percurso A→B, anunciando: 'Vou precisar de 64 kbps de banda contínua'.", color: "blue" },
    { label: "RESV", desc: "Cada roteador no caminho responde com uma mensagem RESV, confirmando que reservou os recursos solicitados na sua tabela de estado.", color: "emerald" },
    { label: "Sessão Ativa", desc: "Com todos os roteadores confirmados, o caminho está reservado. A chamada começa com banda garantida de ponta a ponta.", color: "purple" },
    { label: "Problema de Escala", desc: "Com 10.000 chamadas simultâneas, cada roteador precisa guardar 10.000 estados individuais. A memória esgota rapidamente — razão pela qual o IntServ não é usado na Internet pública.", color: "rose" },
];

const ROUTERS = ["R1", "R2", "R3"];

export function RedesSlide5() {
    const [step, setStep] = useState(-1);
    const started = step >= 0;

    return (
        <div className="flex flex-col min-h-[100%] flex-1 animate-in fade-in duration-500 max-w-5xl mx-auto w-full py-4">
            <div className="flex items-center gap-3 mb-2">
                <Server className="w-8 h-8 text-amber-400" />
                <h2 className="text-4xl font-black text-slate-100">IntServ — O Protocolo RSVP</h2>
            </div>
            <p className="text-slate-400 text-xl mb-8">Avance passo a passo para ver como o RSVP reserva recursos em <em>cada roteador</em> do caminho antes da chamada começar.</p>

            {/* Network diagram */}
            <div className="flex items-center justify-center gap-3 md:gap-6 mb-8 flex-wrap">
                <div className={`px-4 py-3 rounded-xl font-bold text-sm border-2 transition-all ${step >= 0 ? "border-blue-500 bg-blue-950/50 text-blue-300" : "border-slate-700 bg-slate-900 text-slate-400"}`}>
                    📞 Chamador
                </div>
                {ROUTERS.map((r, i) => (
                    <div key={r} className="flex items-center gap-2 md:gap-4">
                        <ArrowRight className={`w-5 h-5 transition-colors ${step >= i ? "text-blue-400" : "text-slate-700"}`} />
                        <div className={`px-4 py-3 rounded-xl font-bold text-sm border-2 transition-all ${step >= 1 ? "border-emerald-500 bg-emerald-950/50 text-emerald-300" : step >= i ? "border-blue-400 bg-blue-950/40 text-blue-300 animate-pulse" : "border-slate-700 bg-slate-900 text-slate-400"}`}>
                            🖧 {r}
                        </div>
                    </div>
                ))}
                <ArrowRight className={`w-5 h-5 transition-colors ${step >= 0 ? "text-blue-400" : "text-slate-700"}`} />
                <div className={`px-4 py-3 rounded-xl font-bold text-sm border-2 transition-all ${step >= 2 ? "border-purple-500 bg-purple-950/50 text-purple-300" : "border-slate-700 bg-slate-900 text-slate-400"}`}>
                    📞 Receptor
                </div>
            </div>

            {/* Step info panel */}
            <div className={`flex-1 rounded-2xl border-2 p-6 transition-all duration-500 ${step < 0 ? "border-dashed border-slate-700 bg-slate-900/30" :
                    step === 0 ? "border-blue-500/60 bg-blue-950/30" :
                        step === 1 ? "border-emerald-500/60 bg-emerald-950/30" :
                            step === 2 ? "border-purple-500/60 bg-purple-950/30" :
                                "border-rose-500/60 bg-rose-950/30"
                }`}>
                {step < 0 ? (
                    <p className="text-slate-500 text-center mt-8 text-lg">Clique em "Iniciar" para começar a simulação.</p>
                ) : (
                    <div className="animate-in fade-in duration-300">
                        <div className={`text-xs font-black tracking-widest mb-2 ${step === 0 ? "text-blue-400" : step === 1 ? "text-emerald-400" : step === 2 ? "text-purple-400" : "text-rose-400"}`}>
                            PASSO {step + 1} — {STEPS[step].label}
                        </div>
                        <p className="text-slate-200 text-xl leading-relaxed">{STEPS[step].desc}</p>
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between mt-6">
                <button onClick={() => setStep(-1)} disabled={!started} className="px-5 py-2 rounded-xl border border-slate-700 text-slate-400 hover:border-slate-500 disabled:opacity-30 transition-all font-semibold">
                    ↺ Reiniciar
                </button>
                <div className="flex gap-1">
                    {STEPS.map((_, i) => (
                        <div key={i} className={`w-3 h-3 rounded-full transition-all ${step === i ? "bg-white scale-125" : i < step ? "bg-slate-500" : "bg-slate-700"}`} />
                    ))}
                </div>
                <button
                    onClick={() => setStep((prev) => Math.min(prev + 1, STEPS.length - 1))}
                    disabled={step === STEPS.length - 1}
                    className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-30 text-white font-bold transition-all"
                >
                    {step < 0 ? "Iniciar ▶" : "Próximo →"}
                </button>
            </div>
        </div>
    );
}
