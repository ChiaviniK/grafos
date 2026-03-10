import { useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";

const SKILLS = [
    {
        id: 1,
        title: "Supervisionar a operação e manutenção de sistemas",
        description: "Configurar políticas de QoS via CLI e monitorar o comportamento das filas de pacotes num roteador em tempo real.",
        color: "blue",
    },
    {
        id: 2,
        title: "Identificar técnicas e recursos para resolução de problemas",
        description: "Diagnosticar falhas de desempenho em redes VoIP (Jitter, Packet Loss) e escolher entre IntServ e DiffServ conforme a escala da rede.",
        color: "emerald",
    },
];

export function RedesSlide2() {
    const [checked, setChecked] = useState<Record<number, boolean>>({});

    const toggle = (id: number) => setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
    const allDone = SKILLS.every((s) => checked[s.id]);

    return (
        <div className="flex flex-col min-h-[100%] flex-1 animate-in fade-in duration-500 max-w-4xl mx-auto w-full py-4">
            <div className="mb-8">
                <span className="text-xs tracking-widest font-bold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">COMPETÊNCIAS DA AULA</span>
                <h2 className="text-4xl font-black mt-4 text-slate-100">O que vamos trabalhar hoje?</h2>
                <p className="text-slate-400 mt-2">Clique na competência à medida que ela for trabalhada durante a aula 👇</p>
            </div>

            <div className="space-y-5 flex-1">
                {SKILLS.map((skill) => {
                    const done = !!checked[skill.id];
                    const color = skill.color === "blue"
                        ? { ring: "border-blue-500", bg: "bg-blue-950/40", icon: "text-blue-400", badge: "bg-blue-500/20 text-blue-300" }
                        : { ring: "border-emerald-500", bg: "bg-emerald-950/40", icon: "text-emerald-400", badge: "bg-emerald-500/20 text-emerald-300" };

                    return (
                        <button
                            key={skill.id}
                            onClick={() => toggle(skill.id)}
                            className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-500 flex gap-5 items-start group ${done ? `${color.ring} ${color.bg} scale-[1.01]` : "border-slate-700 bg-slate-900/60 hover:border-slate-500"}`}
                        >
                            <div className={`mt-1 transition-all ${done ? color.icon : "text-slate-600 group-hover:text-slate-400"}`}>
                                {done ? <CheckCircle2 className="w-8 h-8" /> : <Circle className="w-8 h-8" />}
                            </div>
                            <div className="flex-1">
                                <div className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full mb-2 ${done ? color.badge : "bg-slate-800 text-slate-500"}`}>
                                    Competência {skill.id}
                                </div>
                                <p className={`font-bold text-xl leading-snug transition-colors ${done ? "text-slate-100" : "text-slate-400"}`}>
                                    {skill.title}
                                </p>
                                {done && (
                                    <p className="text-slate-400 text-sm mt-2 animate-in fade-in duration-300 leading-relaxed">
                                        {skill.description}
                                    </p>
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>

            {allDone && (
                <div className="mt-8 animate-in slide-in-from-bottom-4 duration-500">
                    <div className="p-5 rounded-2xl bg-emerald-900/30 border border-emerald-500/40 text-emerald-200 text-center text-xl font-bold">
                        🎯 Todas as competências mapeadas! Vamos ao conteúdo.
                    </div>
                </div>
            )}
        </div>
    );
}
