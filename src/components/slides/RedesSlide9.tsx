import { Heart, Building2 } from "lucide-react";

export function RedesSlide9() {
    return (
        <div className="flex flex-col min-h-[100%] flex-1 animate-in fade-in duration-500 max-w-5xl mx-auto w-full py-4 relative overflow-hidden">

            {/* Pixel art city background */}
            <div
                className="absolute inset-0 opacity-10 z-0 rounded-3xl"
                style={{
                    backgroundImage: "url('/sprites/backgrounds/5/2304x1296.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center bottom",
                    imageRendering: "pixelated",
                }}
            />

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-2">
                    <Building2 className="w-8 h-8 text-blue-400" />
                    <h2 className="text-4xl font-black text-slate-100">QoS além da Sala de Aula</h2>
                </div>
                <p className="text-slate-400 text-xl mb-8">As tecnologias que aprendemos hoje são críticas para a infraestrutura das nossas cidades.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                    <div className="bg-slate-900/90 backdrop-blur border border-blue-500/40 rounded-3xl p-7 hover:border-blue-400 transition-all hover:scale-[1.01]">
                        <div className="text-4xl mb-4">🏙️</div>
                        <div className="text-xs font-black tracking-widest text-blue-400 mb-3 bg-blue-500/10 px-2 py-1 rounded-full inline-block border border-blue-500/20">ODS 11 — CIDADES SUSTENTÁVEIS</div>
                        <h3 className="text-2xl font-bold text-slate-100 mb-3">Infraestrutura de Emergência</h3>
                        <p className="text-slate-400 leading-relaxed">Redes metropolitanas partilhadas precisam de garantias de QoS para que o tráfego do número 112, das ambulâncias e da SAMU tenha prioridade sobre o download de vídeos dos moradores.</p>
                        <div className="mt-4 p-3 bg-blue-950/50 rounded-xl border border-blue-500/20">
                            <p className="text-blue-300 text-sm font-semibold">"Uma chamada para o SAMU não pode competir com um torrent de 4K."</p>
                        </div>
                    </div>

                    <div className="bg-slate-900/90 backdrop-blur border border-emerald-500/40 rounded-3xl p-7 hover:border-emerald-400 transition-all hover:scale-[1.01]">
                        <div className="text-4xl mb-4">⚙️</div>
                        <div className="text-xs font-black tracking-widest text-emerald-400 mb-3 bg-emerald-500/10 px-2 py-1 rounded-full inline-block border border-emerald-500/20">ODS 9 — INOVAÇÃO E INFRAESTRUTURA</div>
                        <h3 className="text-2xl font-bold text-slate-100 mb-3">Telemedicina e IoT</h3>
                        <p className="text-slate-400 leading-relaxed">Teleconsultas de cirurgiões remotos, monitoramento de pacientes via IoT e sistemas de controle industrial exigem DiffServ com DSCP EF para funcionar de forma confiável em redes compartilhadas.</p>
                        <div className="mt-4 p-3 bg-emerald-950/50 rounded-xl border border-emerald-500/20">
                            <p className="text-emerald-300 text-sm font-semibold">"O QoS é o que separa uma rede industrial de uma rede doméstica."</p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-center gap-2 text-slate-500 text-sm">
                    <Heart className="w-4 h-4 text-rose-400" />
                    <span>Cada conceito que você aprende aqui pode salvar vidas nas redes do futuro.</span>
                </div>
            </div>
        </div>
    );
}
