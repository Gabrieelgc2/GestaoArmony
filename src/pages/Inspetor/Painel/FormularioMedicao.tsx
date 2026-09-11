import React, { useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { GUIA_CONFIG, type GuiaMedicaoForm } from "@/types/relatorioMedicao";

interface Props {
  onSalvar: (dados: GuiaMedicaoForm) => Promise<void>;
}

export function FormularioRelatorioMedicao({ onSalvar }: Props) {
  const [form, setForm] = useState<GuiaMedicaoForm>({
    calhas: null,
    soleira_porta_giro: null,
    acabamento: null,
    trilho_especial: null,
    observacoes: "",
  });
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const atualizarCampo = <K extends keyof GuiaMedicaoForm>(campo: K, valor: GuiaMedicaoForm[K]) => {
    setForm((prev) => ({ ...prev, [campo]: valor }));
    if (erro) setErro(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.calhas || !form.soleira_porta_giro || !form.acabamento || !form.trilho_especial || !form.observacoes) {
      setErro("Por favor, selecione todas as opções técnicas obrigatórias do guia.");
      return;
    }

    try {
      setSalvando(true);
      await onSalvar(form);
    } catch (err: any) {
      setErro(err.message || "Erro ao salvar relatório.");
    } finally {
      setSalvando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
      <div>
        <h2 className="text-lg font-black text-gray-900">Guia de Medição e Fabricação</h2>
        <p className="text-xs text-gray-500">Selecione as especificações técnicas encontradas na vistoria.</p>
      </div>

      {erro && (
        <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-semibold">
          <AlertCircle size={16} className="shrink-0" />
          <span>{erro}</span>
        </div>
      )}

      {/* 1. CALHAS */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-700">Calhas</label>
        <div className="grid grid-cols-2 gap-3">
          {GUIA_CONFIG.calhas.map((item) => {
            const ativo = form.calhas === item.valor;
            return (
              <button
                type="button"
                key={item.valor}
                onClick={() => atualizarCampo("calhas", item.valor)}
                className={`p-2.5 rounded-xl border flex flex-col items-center gap-2 transition text-left cursor-pointer ${
                  ativo ? "border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <img src={item.imagemUrl} alt={item.titulo} className="h-28 w-full object-cover rounded-lg bg-gray-100" />
                <div className="flex items-center justify-between w-full px-1">
                  <span className="text-xs font-semibold text-gray-800">{item.titulo}</span>
                  <input type="checkbox" checked={ativo} readOnly className="h-4 w-4 rounded text-blue-600 focus:ring-0 cursor-pointer" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. SOLEIRAS PORTA GIRO */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-700">Soleiras Porta Giro</label>
        <div className="grid grid-cols-2 gap-3">
          {GUIA_CONFIG.soleiras.map((item) => {
            const ativo = form.soleira_porta_giro === item.valor;
            return (
              <button
                type="button"
                key={item.valor}
                onClick={() => atualizarCampo("soleira_porta_giro", item.valor)}
                className={`p-2.5 rounded-xl border flex flex-col items-center gap-2 transition text-left cursor-pointer ${
                  ativo ? "border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <img src={item.imagemUrl} alt={item.titulo} className="h-28 w-full object-cover rounded-lg bg-gray-100" />
                <div className="flex items-center justify-between w-full px-1">
                  <span className="text-xs font-semibold text-gray-800">{item.titulo}</span>
                  <input type="checkbox" checked={ativo} readOnly className="h-4 w-4 rounded text-blue-600 focus:ring-0 cursor-pointer" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. ACABAMENTOS */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-700">Acabamentos</label>
        <div className="grid grid-cols-2 gap-3">
          {GUIA_CONFIG.acabamentos.map((item) => {
            const ativo = form.acabamento === item.valor;
            return (
              <button
                type="button"
                key={item.valor}
                onClick={() => atualizarCampo("acabamento", item.valor)}
                className={`p-2.5 rounded-xl border flex flex-col items-center gap-2 transition text-left cursor-pointer ${
                  ativo ? "border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <img src={item.imagemUrl} alt={item.titulo} className="h-28 w-full object-cover rounded-lg bg-gray-100" />
                <div className="flex items-center justify-between w-full px-1">
                  <span className="text-xs font-semibold text-gray-800">{item.titulo}</span>
                  <input type="checkbox" checked={ativo} readOnly className="h-4 w-4 rounded text-blue-600 focus:ring-0 cursor-pointer" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. TRILHOS ESPECIAIS */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-700">Trilhos Especiais</label>
        <div className="grid grid-cols-2 gap-3">
          {GUIA_CONFIG.trilhos.map((item) => {
            const ativo = form.trilho_especial === item.valor;
            return (
              <button
                type="button"
                key={item.valor}
                onClick={() => atualizarCampo("trilho_especial", item.valor)}
                className={`p-2.5 rounded-xl border flex flex-col items-center gap-2 transition text-left cursor-pointer ${
                  ativo ? "border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <img src={item.imagemUrl} alt={item.titulo} className="h-28 w-full object-cover rounded-lg bg-gray-100" />
                <div className="flex items-center justify-between w-full px-1">
                  <span className="text-xs font-semibold text-gray-800">{item.titulo}</span>
                  <input type="checkbox" checked={ativo} readOnly className="h-4 w-4 rounded text-blue-600 focus:ring-0 cursor-pointer" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. OBSERVAÇÕES */}
      <div className="space-y-1">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-700">Observações de Campo</label>
        <textarea
          rows={3}
          placeholder="Descreva detalhes específicos da obra ou restrições de fabricação..."
          value={form.observacoes}
          onChange={(e) => atualizarCampo("observacoes", e.target.value)}
          className="w-full border border-gray-200 rounded-xl p-3 text-xs bg-white outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={salvando}
        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition cursor-pointer disabled:bg-gray-300 flex items-center justify-center gap-2"
      >
        <CheckCircle2 size={16} />
        {salvando ? "Salvando dados..." : "Salvar Relatório de Medição"}
      </button>
    </form>
  );
}