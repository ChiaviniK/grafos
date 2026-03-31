import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DownloadCloud, FileSpreadsheet, Sparkles, CheckCircle2 } from 'lucide-react';

export function CosmeticsDatasetExport() {
  const [downloaded, setDownloaded] = useState(false);

  const csvContent = `id_venda,data,produto,categoria,filial,estado,valor_rs
1001,2023-10-01,Batom Matte Red,Lábios,Centro,SP,49.90
1002,2023-10-01,Base Líquida 02,Rosto,Shopping Sul,RJ,89.90
1003,2023-10-02,Hidratante Facial,Skincare,Iguatemi,SP,65.00
1004,2023-10-02,Paleta de Sombras Nude,Olhos,Patio Savassi,MG,129.90
1005,2023-10-03,Delineador Caneta,Olhos,Centro,SP,35.50
1006,2023-10-03,Batom Matte Nude,Lábios,Barra Shopping,RJ,49.90
1007,2023-10-04,Sérum Vitamina C,Skincare,Iguatemi,SP,145.00
1008,2023-10-04,Base Líquida 05,Rosto,Centro,MG,89.90
1009,2023-10-05,Máscara de Cílios,Olhos,Shopping Sul,RJ,55.00
1010,2023-10-05,Pó Compacto Médio,Rosto,Iguatemi,SP,45.00`;

  const handleDownload = () => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'relatorio_vendas_cosmeticos.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloaded(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(csvContent);
    setDownloaded(true);
  };

  return (
    <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-6 md:p-10 relative overflow-hidden flex flex-col items-center">
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
        <Sparkles className="w-64 h-64 text-pink-500" />
      </div>

      <div className="text-center mb-8 relative z-10">
        <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
          Projeto Final: <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-500">BeautyData Co.</span>
        </h3>
        <p className="text-slate-300 max-w-xl text-lg leading-relaxed">
          Você foi contratado pela <strong>BeautyData Co.</strong>, uma gigante dos cosméticos. Sua primeira missão é exportar o banco de dados de vendas limpo e levá-lo para a sua ferramenta de escolha (Excel, PowerBI ou Tableau).
        </p>
      </div>

      <div className="w-full max-w-lg bg-slate-950 rounded-xl border border-pink-500/20 shadow-[0_0_30px_rgba(236,72,153,0.1)] p-6 mb-8 relative z-10 flex flex-col items-center">
         <FileSpreadsheet className="w-16 h-16 text-pink-400 mb-4 animate-bounce" />
         <h4 className="text-lg font-bold text-white mb-1">relatorio_vendas_cosmeticos.csv</h4>
         <p className="text-sm text-slate-500 font-mono mb-6">10 Linhas • 7 Colunas • 1 KB</p>
         
         <div className="flex gap-4 w-full">
            <button 
              onClick={handleCopy}
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-3 rounded-lg font-bold transition-all border border-slate-700"
            >
              Copiar Dados
            </button>
            <button 
              onClick={handleDownload}
              className="flex-1 bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-500 hover:to-rose-400 text-white py-3 rounded-lg font-bold transition-all shadow-lg flex items-center justify-center gap-2"
            >
               <DownloadCloud className="w-5 h-5" /> Baixar .CSV
            </button>
         </div>
      </div>

      <AnimatePresence>
        {downloaded && (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center gap-2">
            <div className="text-emerald-400 font-bold bg-emerald-900/20 px-6 py-3 rounded-full border border-emerald-500/30 flex items-center gap-2 text-lg">
              <CheckCircle2 className="w-6 h-6" /> Dados Exportados com Sucesso!
            </div>
            <p className="text-sm text-slate-400 mt-2 max-w-sm">
               Agora não é mais simulação. Abra seu Excel, crie Tabelas Dinâmicas, Gráficos de Vendas por Estado ou Produto. O dado é seu!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
