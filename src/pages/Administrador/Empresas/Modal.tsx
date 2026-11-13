import React, { useEffect, useState } from 'react';
import { FolderPlus, X, Info } from 'lucide-react';
import type { Empresa_Usuario, UsuarioAssociado, UsuarioElegivel } from '../../../types/admin.types';
import { carregarUsuariosDaEmpresa, carregarUsuariosDisponiveis } from '../useDados';

interface ModalEditarEmpresaProps {
  empresa: Empresa_Usuario;
  isOpen: boolean;
  onClose: () => void;
  onSave: (empresaAtualizada: Empresa_Usuario) => Promise<void>;
  onAdicionarUsuario: (usuarioId: string, codigoHetmo: number) => Promise<void>;
  onRemoverUsuario: (usuarioId: string, nomeUsuario: string, codigoHetmo: number) => Promise<void>;
}

export const ModalEditarEmpresa: React.FC<ModalEditarEmpresaProps> = ({
  empresa,
  isOpen,
  onClose,
  onSave,
  onAdicionarUsuario,
  onRemoverUsuario,
}) => {
  const [nome, setNome] = useState(empresa.nome);
  const [cnpj, setCnpj] = useState(empresa.cnpj || '');
  const [cidade, setCidade] = useState(empresa.cidade || '');
  const [ativa, setAtiva] = useState<boolean>(empresa.ativa);
  const [selectedUserToAdd, setSelectedUserToAdd] = useState('');
  const [usuariosDisponiveis, setUsuariosDisponiveis] = useState<UsuarioElegivel[]>([]);
  const [usuariosAssociados, setUsuariosAssociados] = useState<UsuarioAssociado[]>([]);
  const [saving, setSaving] = useState(false);
  const [associationsLoading, setAssociationsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setNome(empresa.nome);
    setCnpj(empresa.cnpj || '');
    setCidade(empresa.cidade || '');
    setAtiva(empresa.ativa);
    setSelectedUserToAdd('');
    setErrorMessage(null);

    let active = true;
    const carregarAssociacoes = async () => {
      setAssociationsLoading(true);
      try {
        const [disponiveis, associados] = await Promise.all([
          carregarUsuariosDisponiveis(empresa.codigo_hetmo),
          carregarUsuariosDaEmpresa(empresa.codigo_hetmo),
        ]);
        if (active) {
          setUsuariosDisponiveis(disponiveis);
          setUsuariosAssociados(associados);
        }
      } catch (error) {
        if (active) setErrorMessage(error instanceof Error ? error.message : 'Não foi possível carregar as associações.');
      } finally {
        if (active) setAssociationsLoading(false);
      }
    }
    void carregarAssociacoes();
    return () => { active = false; };
  }, [empresa, isOpen]);

  if (!isOpen) return null;

  const recarregarAssociacoes = async () => {
    setAssociationsLoading(true);
    try {
      const [disponiveis, associados] = await Promise.all([
        carregarUsuariosDisponiveis(empresa.codigo_hetmo),
        carregarUsuariosDaEmpresa(empresa.codigo_hetmo),
      ]);
      setUsuariosDisponiveis(disponiveis);
      setUsuariosAssociados(associados);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Não foi possível atualizar as associações.');
    } finally {
      setAssociationsLoading(false);
    }
  };

  const handleAddUser = async () => {
    if (!selectedUserToAdd) return;
    setErrorMessage(null);
    try {
      await onAdicionarUsuario(selectedUserToAdd, empresa.codigo_hetmo);
      setSelectedUserToAdd('');
      await recarregarAssociacoes();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Não foi possível associar o usuário.');
    }
  };

  const handleRemoveUser = async (usuario: UsuarioAssociado) => {
    setErrorMessage(null);
    try {
      await onRemoverUsuario(usuario.id, usuario.nome, empresa.codigo_hetmo);
      await recarregarAssociacoes();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Não foi possível remover a associação.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMessage(null);
    try {
      await onSave({ ...empresa, nome, cnpj: cnpj || null, cidade: cidade || null, ativa });
      onClose();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Não foi possível salvar a empresa.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="flex items-center justify-between px-7 pt-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-[#0052cc]">
              <FolderPlus className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Empresa: {empresa.nome}</h2>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-xl transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-7 py-4 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Hetmo Code (Read-only) */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Código do Hetmo <span className="text-slate-400 font-normal">(não editável)</span>
            </label>
            <input
              type="text"
              value={empresa.codigo_hetmo}
              disabled
              className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-600 text-sm font-semibold cursor-not-allowed"
            />
            <div className="flex items-start gap-2 mt-1.5 text-xs text-slate-500 leading-relaxed">
              <Info className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
              <span>
                Vem do Hetmo pelo webhook e não muda (as obras recebidas apontam para esse código). Se o Hetmo alterar o nome depois, o que está aqui prevalece.
              </span>
            </div>
          </div>

          {/* Nome */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nome no Gestão Armony <span className="text-blue-600">*</span>
            </label>
            <input
              type="text"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          {/* CNPJ e Cidade */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">CNPJ (opcional)</label>
              <input
                type="text"
                placeholder="Ex: 00.000.000/0001-00"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Cidade (opcional)</label>
              <input
                type="text"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Situação */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Situação</label>
            <select
              value={String(ativa)}
              onChange={(e) => setAtiva(e.target.value === 'true')}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            >
              <option value="true">Ativa</option>
              <option value="false">Inativa</option>
            </select>
          </div>

          {/* Usuários Associados */}
          <div className="pt-2">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
              Usuários Associados ({usuariosAssociados.length})
            </label>

            {associationsLoading ? (
              <p className="text-xs text-slate-500 mb-2">Carregando associações...</p>
            ) : usuariosAssociados.length === 0 ? (
              <p className="text-xs text-slate-500 mb-2">Nenhum usuário associado.</p>
            ) : (
              <div className="flex flex-wrap gap-1.5 mb-2.5">
                {usuariosAssociados.map((usuario) => {
                  return (
                    <span key={usuario.id} className="inline-flex items-center gap-1.5 bg-blue-50 text-[#0052cc] px-2.5 py-1 rounded-lg text-xs font-semibold">
                      {usuario.nome}{!usuario.ativo && ' (inativo)'}
                      <button type="button" onClick={() => void handleRemoveUser(usuario)} title={`Remover ${usuario.nome}`} className="hover:text-rose-600">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  );
                })}
              </div>
            )}

            <div className="flex gap-2">
              <select
                value={selectedUserToAdd}
                onChange={(e) => setSelectedUserToAdd(e.target.value)}
                className="grow px-3 py-2 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              >
                <option value="">Escolha um usuário...</option>
                {usuariosDisponiveis.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.nome} ({u.perfis.join(', ')})
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => void handleAddUser()}
                disabled={!selectedUserToAdd || associationsLoading}
                className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
              >
                Adicionar
              </button>
            </div>
          </div>

          {errorMessage && <p role="alert" className="text-xs font-medium text-rose-600">{errorMessage}</p>}

          {/* Botões do Rodapé */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-800 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-[#0052cc] hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-md transition-all active:scale-95"
            >
              {saving ? 'Salvando...' : 'Confirmar e Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};