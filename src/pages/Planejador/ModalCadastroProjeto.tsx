import { useState } from "react";
import type { FormEvent } from "react";
import { FolderPlus, X } from "lucide-react";
import type { Projeto } from "@/utils/painelPlanejadorConfig";

type ModalCadastroProjetoProps = {
  projeto: Projeto;
  salvando: boolean;
  onFechar: () => void;
  onConfirmar: (
    dados: Pick<Projeto, "installation_location" | "prazo_acordado_dias">,
  ) => Promise<void>;
};

export function ModalCadastroProjeto({
  projeto,
  salvando,
  onFechar,
  onConfirmar,
}: ModalCadastroProjetoProps) {
  const [localInstalacao, setLocalInstalacao] = useState(
    projeto.installation_location ?? "",
  );
  const [prazoAcordadoDias, setPrazoAcordadoDias] = useState(
    projeto.prazo_acordado_dias == null ? "" : String(projeto.prazo_acordado_dias),
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const installation_location = localInstalacao.trim();
    const prazo_acordado_dias = Number(prazoAcordadoDias);

    if (!installation_location || !Number.isInteger(prazo_acordado_dias) || prazo_acordado_dias <= 0) {
      alert("Informe um local de instalação e um prazo válido, em dias.");
      return;
    }

    await onConfirmar({ installation_location, prazo_acordado_dias });
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-2 text-gray-900 font-bold text-sm">
            <FolderPlus className="text-blue-600" size={18} />
            <span>Completar dados para iniciar a obra</span>
          </div>
          <button
            type="button"
            onClick={onFechar}
            disabled={salvando}
            className="text-gray-400 hover:text-gray-700 p-1 rounded-lg transition disabled:opacity-50"
            aria-label="Fechar modal"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-xs text-gray-600">
            Preencha os dados obrigatórios da obra {projeto.numero ? `#${projeto.numero}` : ""} para continuar.
          </p>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Prazo acordado (dias) *
            </label>
            <input
              type="number"
              min="1"
              step="1"
              value={prazoAcordadoDias}
              onChange={(event) => setPrazoAcordadoDias(event.target.value)}
              className="w-full border border-gray-300 rounded-xl p-2.5 text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Local de instalação *
            </label>
            <input
              type="text"
              placeholder="Ex: Av. Paulista, 1000 - São Paulo, SP"
              value={localInstalacao}
              onChange={(event) => setLocalInstalacao(event.target.value)}
              className="w-full border border-gray-300 rounded-xl p-2.5 text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={onFechar}
              disabled={salvando}
              className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={salvando}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition disabled:bg-gray-300 cursor-pointer"
            >
              {salvando ? "Iniciando..." : "Salvar e iniciar obra"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
