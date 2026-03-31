import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ShieldAlert, CheckCircle, XCircle } from 'lucide-react';

interface Packet {
  id: string;
  sourceIp: string;
  port: number;
  protocol: string;
  description: string;
  isMalicious: boolean;
}

const INCOMING_PACKETS: Packet[] = [
  { id: 'pkt_1', sourceIp: '192.168.1.100', port: 80, protocol: 'HTTP', description: 'Tráfego Web Padrão', isMalicious: false },
  { id: 'pkt_2', sourceIp: '185.33.1.99', port: 22, protocol: 'SSH', description: 'Tentativa SSH Externa Susp.', isMalicious: true },
  { id: 'pkt_3', sourceIp: '192.168.1.150', port: 443, protocol: 'HTTPS', description: 'Tráfego SSL Criptografado', isMalicious: false },
  { id: 'pkt_4', sourceIp: '45.12.9.222', port: 3389, protocol: 'RDP', description: 'Acesso Remoto do Leste Euro', isMalicious: true },
];

export function FirewallConfigurator() {
  const [currentPacketIdx, setCurrentPacketIdx] = useState(0);
  const [hp, setHp] = useState(3);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [feedback, setFeedback] = useState<{show: boolean, isCorrect: boolean, text: string}>({show: false, isCorrect: false, text: ''});

  const packet = INCOMING_PACKETS[currentPacketIdx];

  const handleAction = (action: 'ALLOW' | 'DENY') => {
    if (gameState !== 'playing' || feedback.show) return;

    const shouldAllow = !packet.isMalicious;
    const isCorrect = (action === 'ALLOW' && shouldAllow) || (action === 'DENY' && !shouldAllow);

    setFeedback({
      show: true,
      isCorrect,
      text: isCorrect ? 'Regra de Borda Validada!' : 'Falha na ACL! Tráfego indevido.'
    });

    if (!isCorrect) {
      const newHp = hp - 1;
      setHp(newHp);
      if (newHp <= 0) {
        setTimeout(() => setGameState('lost'), 1500);
        return;
      }
    }

    setTimeout(() => {
      setFeedback(f => ({ ...f, show: false }));
      if (currentPacketIdx < INCOMING_PACKETS.length - 1) {
        setCurrentPacketIdx(c => c + 1);
      } else {
        setGameState('won');
      }
    }, 1500);
  };

  const resetGame = () => {
    setCurrentPacketIdx(0);
    setHp(3);
    setGameState('playing');
    setFeedback({show: false, isCorrect: false, text: ''});
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 font-mono relative">
      <div className="text-center mb-4">
         <h4 className="text-amber-400 font-bold flex items-center justify-center gap-2 text-xl">
            <Shield className="w-6 h-6" /> Tabela de Acesso do Firewall (ACL)
         </h4>
         <p className="text-slate-400 text-sm max-w-xl">
            Atue como o Firewall de Borda. Inspecione o Cabeçalho IP e determine uma regra <span className="text-emerald-400 font-bold">ALLOW</span> ou <span className="text-rose-400 font-bold">DENY</span>. Proteja os <span className="text-amber-400 font-bold">{hp} Servidores Internos</span>.
         </p>
      </div>

      <div className="w-full max-w-3xl bg-slate-900 border-2 border-slate-700/50 rounded-2xl p-6 shadow-2xl relative overflow-hidden transition-colors duration-1000">
          
          <div className="flex justify-between items-center mb-6 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center gap-4">
                  <ShieldAlert className={`w-8 h-8 ${gameState === 'lost' ? 'text-rose-500' : 'text-amber-500'} animate-pulse`} />
                  <div>
                      <div className="text-[10px] text-slate-500 font-black tracking-widest uppercase">Firewall Fortinet-X</div>
                      <div className="text-sm font-bold text-slate-300">Modo: Inspecão de Cabeçalhos</div>
                  </div>
              </div>
              <div className="flex gap-2">
                 {[...Array(3)].map((_, i) => (
                    <div key={i} className={`w-6 h-8 rounded shrink-0 transition-colors ${i < hp ? 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.6)]' : 'bg-slate-800'}`} />
                 ))}
              </div>
          </div>

          <div className="bg-[#0f172a] rounded-xl border border-slate-800 p-8 shadow-inner relative flex flex-col items-center min-h-[300px] justify-center">
             
             {gameState === 'playing' && (
                <AnimatePresence mode="wait">
                  {!feedback.show ? (
                    <motion.div 
                      key={`pkt-${packet.id}`}
                      initial={{ scale: 0.8, opacity: 0, y: 50 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 0.8, opacity: 0, y: -50 }}
                      className="bg-slate-800 border border-slate-600 rounded-xl w-full max-w-sm overflow-hidden shadow-2xl"
                    >
                       <div className="bg-slate-950 px-4 py-2 border-b border-slate-700 font-bold text-slate-400 text-xs tracking-widest">
                           INC. PACKET DETECTED
                       </div>
                       <div className="p-6 space-y-4 font-mono text-sm">
                           <div className="flex justify-between">
                              <span className="text-slate-500">SRC_IP:</span>
                              <span className="text-white font-bold">{packet.sourceIp}</span>
                           </div>
                           <div className="flex justify-between items-center">
                              <span className="text-slate-500">DST_PORT:</span>
                              <span className="bg-sky-500/20 text-sky-400 px-2 rounded border border-sky-500/30">{packet.port} / {packet.protocol}</span>
                           </div>
                           <div className="mt-4 pt-4 border-t border-slate-700/50">
                              <span className="text-slate-500 block text-xs mb-1">Assinatura de Tráfego:</span>
                              <span className="text-amber-200 text-xs">{packet.description}</span>
                           </div>
                       </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="feedback"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center"
                    >
                       {feedback.isCorrect ? <CheckCircle className="w-24 h-24 mx-auto text-emerald-500 mb-4" /> : <XCircle className="w-24 h-24 mx-auto text-rose-500 mb-4" />}
                       <h3 className={`font-black text-2xl ${feedback.isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {feedback.text}
                       </h3>
                    </motion.div>
                  )}
                </AnimatePresence>
             )}

             {gameState === 'won' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-4">
                   <Shield className="w-24 h-24 text-emerald-400 mx-auto" />
                   <h3 className="text-3xl font-black text-white">Perímetro Seguro</h3>
                   <p className="text-slate-400 max-w-sm">Todas as regras foram processadas corretamente. O tráfego hostil foi bloqueado e os clientes legítimos continuam acessando o sistema.</p>
                </motion.div>
             )}

             {gameState === 'lost' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-4">
                   <ShieldAlert className="w-24 h-24 text-rose-500 mx-auto" />
                   <h3 className="text-3xl font-black text-white">Servidor Comprometido</h3>
                   <p className="text-slate-400 max-w-sm">Políticas inseguras permitiram conexão maliciosa. Ransomware foi implantado na DMZ.</p>
                   <button onClick={resetGame} className="mt-4 bg-rose-600 hover:bg-rose-500 text-white px-6 py-2 rounded font-bold shadow-lg">Reiniciar Equipamento</button>
                </motion.div>
             )}
          </div>

          {gameState === 'playing' && !feedback.show && (
             <div className="flex justify-center gap-8 mt-6">
                <button 
                  onClick={() => handleAction('DENY')}
                  className="px-8 py-3 bg-rose-500/10 border-2 border-rose-500/50 rounded-xl text-rose-400 font-bold flex items-center gap-2 hover:bg-rose-500/20 hover:scale-105 transition-all shadow-[0_0_15px_rgba(244,63,94,0.3)]"
                >
                   <XCircle className="w-5 h-5"/> DROP / DENY
                </button>
                <button 
                  onClick={() => handleAction('ALLOW')}
                  className="px-8 py-3 bg-emerald-500/10 border-2 border-emerald-500/50 rounded-xl text-emerald-400 font-bold flex items-center gap-2 hover:bg-emerald-500/20 hover:scale-105 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                >
                   <CheckCircle className="w-5 h-5"/> ALLOW / PERMIT
                </button>
             </div>
          )}
      </div>
    </div>
  );
}
