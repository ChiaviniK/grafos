import { useState } from "react";
import { Terminal, CheckCircle2, Copy } from "lucide-react";

const CLI_STEPS = [
    {
        label: "1. Classificação (ACL)",
        comment: "# Capturar o tráfego RTP (portas UDP de voz)",
        code: `Router(config)# access-list 100 permit udp any any range 16384 32767`,
        explanation: "Cria uma lista de acesso que identifica pacotes UDP nas portas 16384–32767 — o intervalo padrão do protocolo RTP (voz).",
    },
    {
        label: "2. Class-Map",
        comment: "# Nomear a classe de tráfego de voz",
        code: `Router(config)# class-map match-all VOZ_TRAFEGO\nRouter(config-cmap)# match access-group 100`,
        explanation: "O Class-Map associa a ACL 100 a uma classe chamada VOZ_TRAFEGO. Todos os pacotes RTP serão identificados por este nome.",
    },
    {
        label: "3. Policy-Map (LLQ)",
        comment: "# Dar 30% de banda exclusiva à voz e marcar DSCP EF",
        code: `Router(config)# policy-map QOS_POLICY\nRouter(config-pmap)# class VOZ_TRAFEGO\nRouter(config-pmap-c)# priority percent 30\nRouter(config-pmap-c)# set dscp ef`,
        explanation: `A diretiva 'priority percent 30' reserva 30% da banda de forma exclusiva para a voz (LLQ). O 'set dscp ef' pinta os pacotes com Expedited Forwarding para os próximos roteadores respeitarem a prioridade.`,
    },
    {
        label: "4. Aplicar à Interface",
        comment: "# Ativar a política de QoS na saída da interface",
        code: `Router(config)# interface GigabitEthernet0/0\nRouter(config-if)# service-policy output QOS_POLICY`,
        explanation: "Aplica o QOS_POLICY ao tráfego de saída da interface GigabitEthernet0/0. A partir deste momento, o router inspeciona e gerencia os pacotes conforme as classes definidas.",
    },
];

export function RedesSlide8() {
    const [activeStep, setActiveStep] = useState(0);
    const [copied, setCopied] = useState(false);
    const [revealed, setRevealed] = useState<Record<number, boolean>>({});

    const step = CLI_STEPS[activeStep];
    const toggleReveal = (i: number) => setRevealed((prev) => ({ ...prev, [i]: !prev[i] }));

    const copyCode = () => {
        navigator.clipboard.writeText(step.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col min-h-[100%] flex-1 animate-in fade-in duration-500 max-w-5xl mx-auto w-full py-4">
            <div className="flex items-center gap-3 mb-2">
                <Terminal className="w-8 h-8 text-emerald-400" />
                <h2 className="text-4xl font-black text-slate-100">CLI Cisco — Configurando QoS</h2>
            </div>
            <p className="text-slate-400 text-xl mb-6">O QoS no IOS da Cisco segue 4 etapas. Avance por cada uma e clique em "Explicação" para entender o que está acontecendo na camada de rede.</p>

            {/* Step tabs */}
            <div className="flex gap-2 mb-4 flex-wrap">
                {CLI_STEPS.map((s, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveStep(i)}
                        className={`px-4 py-2 text-sm font-bold rounded-xl transition-all border-2 ${activeStep === i ? "border-emerald-500 bg-emerald-950/50 text-emerald-300" : "border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-500"}`}
                    >
                        {s.label}
                    </button>
                ))}
            </div>

            {/* Code block */}
            <div className="bg-[#0d1117] border border-slate-700 rounded-2xl overflow-hidden flex-1 flex flex-col">
                <div className="flex items-center justify-between px-5 py-3 border-b border-slate-700 bg-slate-900/60">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-rose-500" />
                        <div className="w-3 h-3 rounded-full bg-amber-500" />
                        <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    </div>
                    <span className="text-xs text-slate-500 font-mono">IOS CLI — Cisco Router</span>
                    <button onClick={copyCode} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors font-medium">
                        {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        {copied ? "Copiado!" : "Copiar"}
                    </button>
                </div>
                <div className="p-6 flex-1 overflow-auto">
                    <div className="text-slate-500 text-sm font-mono mb-3">{step.comment}</div>
                    <pre className="text-sm text-emerald-300 font-mono leading-relaxed whitespace-pre-wrap">{step.code}</pre>
                </div>
            </div>

            {/* Explanation toggle */}
            <button
                onClick={() => toggleReveal(activeStep)}
                className="mt-3 flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors"
            >
                {revealed[activeStep] ? "▼ Ocultar" : "▶ Explicação — O que está acontecendo na rede?"}
            </button>
            {revealed[activeStep] && (
                <div className="mt-2 bg-blue-950/30 border border-blue-500/30 rounded-xl p-4 text-slate-300 text-base animate-in slide-in-from-top-2 duration-300 leading-relaxed">
                    {step.explanation}
                </div>
            )}
        </div>
    );
}
