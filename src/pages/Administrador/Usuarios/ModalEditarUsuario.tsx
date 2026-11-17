import { CheckCircle2, LoaderCircle, X } from 'lucide-react';
import type {
  EditarUsuarioInput,
  Empresa_Usuario,
  ResultadoEditarUsuario,
  Usuario_Disponivel,
} from '../../../types/admin.types';
import { useEditarUsuarioForm } from '../../../hooks/Administrador/useEditarUsuarioForm';
import DadosUsuario from './ModalEditar/DadosUsuario';
import SelecaoEmpresas from './ModalEditar/SelecaoEmpresas';
import SelecaoPerfis from './ModalEditar/SelecaoPerfis';

interface ModalEditarUsuarioProps {
  isOpen: boolean;
  usuario: Usuario_Disponivel;
  empresas: Empresa_Usuario[];
  onClose: () => void;
  onSave: (input: EditarUsuarioInput) => Promise<ResultadoEditarUsuario>;
}

export const ModalEditarUsuario = (props: ModalEditarUsuarioProps) => {
  if (!props.isOpen) return null;
  return <ModalAberto key={props.usuario.id} {...props} />;
};

function ModalAberto({ usuario, empresas, onClose, onSave }: ModalEditarUsuarioProps) {
  const form = useEditarUsuarioForm({ usuario, empresas, onSave });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-editar-usuario-titulo"
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-slate-100"
      >
        {form.salvo ? (
          <Sucesso onClose={onClose} />
        ) : (
          <>
            <header className="flex items-center justify-between px-7 pt-6 pb-4 border-b border-slate-100">
              <div>
                <h2 id="modal-editar-usuario-titulo" className="text-xl font-bold text-slate-900">
                  Editar usuário
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Atualize os dados, perfis e empresas de acesso.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                disabled={form.salvando}
                aria-label="Fechar"
                className="p-2 text-slate-400 hover:text-slate-600 rounded-xl transition-colors disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </header>

            <form
              onSubmit={form.handleSubmit}
              className="px-7 py-5 space-y-5 max-h-[calc(90vh-90px)] overflow-y-auto"
            >
              <DadosUsuario
                nome={form.nome}
                setNome={form.setNome}
                email={form.email}
                setEmail={form.setEmail}
                telefone={form.telefone}
                setTelefone={form.setTelefone}
                situacao={form.situacao}
                setSituacao={form.setSituacao}
                salvando={form.salvando}
              />
              <SelecaoPerfis
                perfis={form.perfis}
                alternarPerfil={form.alternarPerfil}
                salvando={form.salvando}
              />
              <SelecaoEmpresas
                searchTerm={form.searchTerm}
                setSearchTerm={form.setSearchTerm}
                empresasDisponiveis={form.empresasDisponiveis}
                empresasSelecionadas={form.empresasSelecionadas}
                alternarEmpresa={form.alternarEmpresa}
                salvando={form.salvando}
              />
              {form.erro && (
                <p role="alert" className="text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-xl p-3">
                  {form.erro}
                </p>
              )}
              <footer className="flex justify-end gap-3 pt-1">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={form.salvando}
                  className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={form.salvando}
                  className="flex items-center justify-center gap-2 min-w-40 px-5 py-2.5 bg-[#0052cc] hover:bg-blue-700 text-white text-sm font-bold rounded-xl disabled:opacity-60"
                >
                  {form.salvando && <LoaderCircle className="w-4 h-4 animate-spin" />}
                  {form.salvando ? 'Salvando...' : 'Salvar alterações'}
                </button>
              </footer>
            </form>
          </>
        )}
      </section>
    </div>
  );
}

function Sucesso({ onClose }: { onClose: () => void }) {
  return (
    <div className="px-8 py-12 text-center">
      <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" aria-hidden="true" />
      <h2 id="modal-editar-usuario-titulo" className="text-2xl font-bold text-slate-900">
        Alterações salvas
      </h2>
      <p className="mt-2 text-sm text-slate-600">Os dados do usuário foram atualizados.</p>
      <button
        type="button"
        onClick={onClose}
        className="mt-7 px-6 py-2.5 bg-[#0052cc] hover:bg-blue-700 text-white text-sm font-bold rounded-xl"
      >
        Fechar
      </button>
    </div>
  );
}
