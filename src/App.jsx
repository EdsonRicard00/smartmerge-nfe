import React, { useState } from 'react';
import { Upload, FileText, Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [arquivos, setArquivos] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  // UX: Manipula a seleção de arquivos do colaborador de forma dinâmica
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setArquivos((prev) => [...prev, ...selectedFiles]);
    setSucesso(false);
  };

  // Conexão com o Motor (Backend) para fazer o Merge
  const handleSubmit = async () => {
    if (arquivos.length === 0) return;

    setCarregando(true);
    const formData = new FormData();
    arquivos.forEach((file) => formData.append('files', file));

    try {
      const response = await fetch('http://localhost:5000/api/merge', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Erro ao processar arquivos.');

      // Transforma o retorno binário do servidor em um arquivo de download para o usuário
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'nfe_e_anexos_unificados.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();

      setSucesso(true);
      setArquivos([]); // Limpa a lista após o sucesso para manter a interface limpa
    } catch (error) {
      console.error(error);
      alert('Houve um problema ao unificar os arquivos.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    // Fundo Premium: Gradiente profundo (Roxo/Azul) que transmite exclusividade, sofisticação e alta tecnologia
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 flex flex-col items-center justify-center p-4 text-white font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
      
      {/* Container Principal em Efeito Vidro Transparente (Glassmorphism) */}
      <div className="w-full max-w-xl bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] transition-all duration-500">
        
        {/* Header Minimalista e Chique */}
        <header className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-xs font-medium text-purple-300 mb-4 tracking-wide shadow-inner">
            <Sparkles size={12} className="text-purple-400 animate-pulse" /> Automatização Premium
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
            SmartMerge <span className="text-purple-400 font-light">NF-e</span>
          </h1>
          <p className="text-slate-400 text-sm mt-2 font-medium">Converta suas notas e unifique anexos em segundos.</p>
        </header>

        {/* Zona de Dropzone Estilo Vidro Transparente de Alta Interação */}
        <label className="relative border border-dashed border-white/20 hover:border-purple-400/50 rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group bg-white/[0.01] hover:bg-white/[0.03]">
          <input 
            type="file" 
            multiple 
            accept=".pdf,.xml" 
            className="hidden" 
            onChange={handleFileChange}
          />
          <div className="p-4 bg-white/5 border border-white/10 rounded-full group-hover:scale-110 group-hover:border-purple-500/30 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-all duration-300">
            <Upload size={24} className="text-slate-300 group-hover:text-purple-300 transition-colors" />
          </div>
          <p className="mt-4 text-slate-300 text-center font-semibold text-sm">
            Arraste ou clique para carregar
          </p>
          <span className="text-xs text-slate-500 mt-1 font-medium">Formatos suportados: XML (NF-e) e PDF</span>
        </label>

        {/* Lista de Arquivos Selecionados (Pílulas Flutuantes de Vidro) */}
        {arquivos.length > 0 && (
          <div className="mt-6 space-y-2 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
            {arquivos.map((file, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-white/5 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-slate-300 backdrop-blur-sm animate-fade-in">
                <FileText size={14} className="text-purple-400 shrink-0" />
                <span className="truncate font-medium">{file.name}</span>
              </div>
            ))}
          </div>
        )}

        {/* Feedback Visual Interativo de Sucesso */}
        {sucesso && (
          <div className="mt-6 flex items-center justify-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 py-3 rounded-xl text-xs font-semibold animate-bounce">
            <CheckCircle2 size={16} /> PDF Unificado e baixado com sucesso!
          </div>
        )}

        {/* BOTÃO DE ALTA CONVERSÃO: Verde Esmeralda Vibrante / Intenção de Compra e Clique */}
        <button 
          onClick={handleSubmit}
          disabled={arquivos.length === 0 || carregando}
          className={`w-full mt-8 py-4 font-bold rounded-xl transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-2 text-sm text-slate-950 shadow-[0_0_30px_rgba(52,211,153,0.25)] hover:shadow-[0_0_40px_rgba(52,211,153,0.45)]
            ${arquivos.length === 0 || carregando
              ? 'bg-slate-800 text-slate-500 shadow-none cursor-not-allowed opacity-50 border border-white/5'
              : 'bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 hover:-translate-y-0.5'
            }`}
        >
          {carregando ? (
            <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
          ) : (
            "Processar e Unificar Documentos"
          )}
        </button>
        
      </div>
    </div>
  );
}