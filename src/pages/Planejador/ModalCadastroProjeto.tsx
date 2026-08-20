import { FolderPlus, X } from "lucide-react";

export function ModalCadastroProjeto({ hook }: { hook: any }) {
  const {
    modalCriarAberto,
    setModalCriarAberto,
    novoProjeto,
    salvandoNovoProjeto,
    handleCriarProjeto,
    atualizarCampoNovoProjeto,
  } = hook;

  if (!modalCriarAberto) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-2 text-gray-900 font-bold text-sm">
            <FolderPlus className="text-blue-600" size={18} />
            <span>Cadastrar Nova Obra</span>
          </div>
          <button
            onClick={() => setModalCriarAberto(false)}
            className="text-gray-400 hover:text-gray-700 p-1 rounded-lg transition"
            aria-label="Fechar modal"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleCriarProjeto} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Nome do Projeto / Obra *</label>
            <input
              type="text"
              placeholder="Ex: Edifício Aurora - Apto 502"
              value={novoProjeto.name_project}
              onChange={(e) => atualizarCampoNovoProjeto("name_project", e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-2.5 text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Número do Pedido *</label>
              <input
                type="text"
                placeholder="Ex: ORD-8842"
                value={novoProjeto.order_number}
                onChange={(e) => atualizarCampoNovoProjeto("order_number", e.target.value)}
                className="w-full border border-gray-300 rounded-xl p-2.5 text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Prazo Acordado (dias) *</label>
              <input
                type="number"
                min="1"
                placeholder="Ex: 45"
                value={novoProjeto.prazo_acordado_dias}
                onChange={(e) => atualizarCampoNovoProjeto("prazo_acordado_dias", e.target.value)}
                className="w-full border border-gray-300 rounded-xl p-2.5 text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Contato do Cliente *</label>
            <input
              type="text"
              placeholder="Ex: Carlos (11) 98765-4321 / carlos@email.com"
              value={novoProjeto.contato_client}
              onChange={(e) => atualizarCampoNovoProjeto("contato_client", e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-2.5 text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Local de Instalação *</label>
            <input
              type="text"
              placeholder="Ex: Av. Paulista, 1000 - São Paulo, SP"
              value={novoProjeto.installation_location}
              onChange={(e) => atualizarCampoNovoProjeto("installation_location", e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-2.5 text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setModalCriarAberto(false)}
              className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={salvandoNovoProjeto}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition disabled:bg-gray-300 cursor-pointer"
            >
              {salvandoNovoProjeto ? "Salvando..." : "Confirmar e Cadastrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}