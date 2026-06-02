import React, { useState } from 'react';
import { Upload, FileText, Sparkles, CheckCircle2 } from 'lucide-react';
import profilePhoto from './assets/profile-placeholder.svg';

const WHATSAPP_NUMBER = '5511999999999'; // atualize para seu número real
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Ol%C3%A1%20Edson%2C%20quero%20suporte%20SmartMerge%20NF-e`;

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.1-.47-.149-.67.15-.198.297-.767.966-.94 1.165-.173.198-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.148-.174.198-.298.298-.497.1-.198.05-.372-.025-.52-.075-.148-.67-1.611-.92-2.205-.242-.579-.487-.5-.67-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.71.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.075-.124-.272-.198-.57-.347z" />
    <path d="M12.004 2.003C6.48 2.003 2 6.483 2 12.006c0 2.104.69 4.05 1.844 5.681L2 22l4.4-1.154A9.974 9.974 0 0 0 12.004 22c5.523 0 10.003-4.48 10.003-9.994C22.007 6.48 17.528 2.003 12.004 2.003zM12.004 20c-1.944 0-3.758-.59-5.296-1.6l-.378-.229-2.613.685.697-2.551-.246-.414A7.979 7.979 0 0 1 4 12.006c0-4.413 3.59-8.004 8.004-8.004s8.003 3.591 8.003 8.004c0 4.414-3.59 8.004-8.003 8.004z" />
  </svg>
);

export default function App() {
  const [modo, setModo] = useState('convert');
  const [arquivos, setArquivos] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  const acceptedFiles = modo === 'convert' ? '.xml' : '.pdf';
  const actionLabel = modo === 'convert' ? 'Converter XML para PDF' : 'Juntar PDFs';
  const actionDescription = modo === 'convert'
    ? 'Envie arquivos XML para gerar um PDF com o conteúdo.'
    : 'Envie arquivos PDF para unificar em um único documento.';

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const filteredFiles = selectedFiles.filter((file) => {
      if (modo === 'convert') return file.name.toLowerCase().endsWith('.xml');
      return file.name.toLowerCase().endsWith('.pdf');
    });

    if (filteredFiles.length !== selectedFiles.length) {
      alert(`Por favor, envie apenas arquivos ${acceptedFiles}.`);
    }

    setArquivos((prev) => [...prev, ...filteredFiles]);
    setSucesso(false);
  };

  const handleSubmit = async () => {
    if (arquivos.length === 0) return;

    setCarregando(true);
    const formData = new FormData();
    arquivos.forEach((file) => formData.append('files', file));

    const endpoint = modo === 'convert' ? 'http://localhost:5000/api/convert-xml' : 'http://localhost:5000/api/merge';
    const downloadName = modo === 'convert' ? 'xml_convertido.pdf' : 'pdf_unificado.pdf';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error || 'Erro ao processar arquivos.');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = downloadName;
      document.body.appendChild(a);
      a.click();
      a.remove();

      setSucesso(true);
      setArquivos([]);
    } catch (error) {
      console.error(error);
      alert(error.message || 'Houve um problema ao processar os arquivos.');
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
          <p className="text-slate-400 text-sm mt-2 font-medium">Converta arquivos XML ou junte PDFs em um único fluxo claro.</p>
        </header>

        <div className="grid grid-cols-2 gap-3 mb-8 text-xs sm:text-sm">
          <button
            type="button"
            onClick={() => { setModo('convert'); setArquivos([]); setSucesso(false); }}
            className={`rounded-2xl py-3 font-semibold transition-all duration-250 ${modo === 'convert' ? 'bg-purple-400 text-slate-950 shadow-lg shadow-purple-500/20' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}
          >
            Apenas Converter XML
          </button>
          <button
            type="button"
            onClick={() => { setModo('merge'); setArquivos([]); setSucesso(false); }}
            className={`rounded-2xl py-3 font-semibold transition-all duration-250 ${modo === 'merge' ? 'bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}
          >
            Juntar PDFs
          </button>
        </div>

        <div className="mb-6 rounded-3xl border border-white/10 bg-slate-950/40 p-5 text-slate-300">
          <p className="font-semibold text-slate-100 mb-2">Modo ativo: <span className="text-slate-200">{modo === 'convert' ? 'Converter XML para PDF' : 'Unir arquivos PDF'}</span></p>
          <p>{actionDescription}</p>
        </div>

        {/* Zona de Dropzone Estilo Vidro Transparente de Alta Interação */}
        <label className="relative border border-dashed border-white/20 hover:border-purple-400/50 rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group bg-white/[0.01] hover:bg-white/[0.03]">
          <input 
            type="file" 
            multiple 
            accept={acceptedFiles} 
            className="hidden" 
            onChange={handleFileChange}
          />
          <div className="p-4 bg-white/5 border border-white/10 rounded-full group-hover:scale-110 group-hover:border-purple-500/30 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-all duration-300">
            <Upload size={24} className="text-slate-300 group-hover:text-purple-300 transition-colors" />
          </div>
          <p className="mt-4 text-slate-300 text-center font-semibold text-sm">
            Arraste ou clique para carregar
          </p>
          <span className="text-xs text-slate-500 mt-1 font-medium">Formatos suportados: {modo === 'convert' ? 'XML (NF-e)' : 'PDF'}</span>
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
              : modo === 'convert'
                ? 'bg-gradient-to-r from-fuchsia-400 to-violet-500 hover:from-fuchsia-300 hover:to-violet-400 hover:-translate-y-0.5'
                : 'bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 hover:-translate-y-0.5'
            }`}
        >
          {carregando ? (
            <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
          ) : (
            actionLabel
          )}
        </button>
        
      </div>

      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noreferrer"
        className="fixed right-5 bottom-5 z-50 flex items-center gap-3 rounded-full border border-emerald-400/20 bg-slate-950/95 px-4 py-3 shadow-[0_25px_50px_-15px_rgba(16,185,129,0.45)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-slate-900/95"
      >
        <img
          src={profilePhoto}
          alt="Foto do desenvolvedor"
          className="h-11 w-11 rounded-full border border-white/10 object-cover shadow-sm"
        />
        <div className="min-w-[170px] text-left">
          <p className="text-[10px] uppercase tracking-[0.24em] text-slate-400">Desenvolvido por</p>
          <p className="text-sm font-semibold text-white leading-tight">Engenheiro de Software Edson Ricardo</p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30">
          <WhatsAppIcon />
        </div>
      </a>
    </div>
  );
}