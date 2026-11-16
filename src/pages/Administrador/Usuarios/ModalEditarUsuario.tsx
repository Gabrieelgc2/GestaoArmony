import React, { useState } from 'react';
import { CheckCircle2, LoaderCircle, Search, X } from 'lucide-react';
import type {
  EditarUsuarioInput,
  Empresa_Usuario,
  PerfilUsuario,
  ResultadoEditarUsuario,
  Usuario_Disponivel,
} from '../../../types/admin.types';

interface ModalEditarUsuarioProps {
  isOpen: boolean;
  usuario: Usuario_Disponivel;
  empresas: Empresa_Usuario[];
  onClose: () => void;
  onSave: (input: EditarUsuarioInput) => Promise<ResultadoEditarUsuario>;
}

const opcoesPerfil: { codigo: PerfilUsuario; nome: string }[] = [
  { codigo: 'master', nome: 'Master' },
  { codigo: 'planejador', nome: 'Planejador' },
  { codigo: 'engenheiro', nome: 'Engenheiro' },
];

const isPerfilUsuario = (perfil: string): perfil is PerfilUsuario =>
  perfil === 'master' || perfil === 'planejador' || perfil === 'engenheiro';

export const ModalEditarUsuario: React.FC<ModalEditarUsuarioProps> = ({
  isOpen,
  usuario,
  empresas,
  onClose,
  onSave,
}) => {
  const [nome, setNome] = useState(usuario.nome);
  const [searchTerm, setSearchTerm] = useState('')
  const [email, setEmail] = useState(usuario.email);
  const [telefone, setTelefone] = useState(usuario.telefone ?? '')
  const [situacao, setSituacao] = useState<'ativo' | 'inativo'>(usuario.ativo ? 'ativo' : 'inativo');
  const [perfis, setPerfis] = useState<PerfilUsuario[]>(() => usuario.perfis.filter(isPerfilUsuario));
  const [empresasSelecionadas, setEmpresasSelecionadas] = useState<number[]>(() =>
    empresas
      .filter((empresa) =>
        empresa.usuario_empresa.some((vinculo) => vinculo.usuario_id === usuario.id),
      )
      .map((empresa) => empresa.codigo_hetmo),
  );
  const filteredEmpresas = empresas.filter((u) => {
    const matchesSearch =
      u.nome.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  });
  const [salvando, setSalvando] = useState(false);
  const [salvo, setSalvo] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  if (!isOpen) return null;

  const alternarPerfil = (perfil: PerfilUsuario) => {
    setPerfis((atuais) => {
      if (atuais.includes(perfil)) return atuais.filter((item) => item !== perfil);
      if (perfil === 'master') return ['master'];
      return [...atuais.filter((item) => item !== 'master'), perfil];
    });
  };

  const alternarEmpresa = (codigoHetmo: number) => {
    setEmpresasSelecionadas((atuais) => atuais.includes(codigoHetmo)
      ? atuais.filter((codigo) => codigo !== codigoHetmo)
      : [...atuais, codigoHetmo]);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErro(null);

    if (perfis.length === 0) {
      setErro('Selecione pelo menos um perfil.');
      return;
    }

    const exigeEmpresa = perfis.includes('planejador') || perfis.includes('engenheiro');
    if (exigeEmpresa && empresasSelecionadas.length === 0) {
      setErro('Selecione pelo menos uma empresa para Planejador ou Engenheiro.');
      return;
    }

    setSalvando(true);
    try {
      await onSave({
        id: usuario.id,
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
        ativo: situacao === 'ativo',
        perfis,
        telefone: telefone.trim(),
        empresas: empresasSelecionadas,
      });
      setSalvo(true);
    } catch (cause) {
      setErro(cause instanceof Error ? cause.message : 'Não foi possível atualizar o usuário.');
    } finally {
      setSalvando(false);
    }
  };

  const empresasDisponiveis = filteredEmpresas.filter((empresa) =>
    empresa.ativa || empresasSelecionadas.includes(empresa.codigo_hetmo),
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-editar-usuario-titulo"
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-slate-100"
      >
        {salvo ? (
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
        ) : (
          <>
            <header className="flex items-center justify-between px-7 pt-6 pb-4 border-b border-slate-100">
              <div>
                <h2 id="modal-editar-usuario-titulo" className="text-xl font-bold text-slate-900">
                  Editar usuário
                </h2>
                <p className="text-sm text-slate-500 mt-1">Atualize os dados, perfis e empresas de acesso.</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                disabled={salvando}
                aria-label="Fechar"
                className="p-2 text-slate-400 hover:text-slate-600 rounded-xl transition-colors disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </header>

            <form onSubmit={handleSubmit} className="px-7 py-5 space-y-5 max-h-[calc(90vh-90px)] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block text-sm font-semibold text-slate-700">
                  Nome
                  <input
                    value={nome}
                    onChange={(event) => setNome(event.target.value)}
                    disabled={salvando}
                    autoComplete="name"
                    className="mt-1.5 w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-normal focus:outline-hidden focus:ring-2 focus:ring-[#0052cc]"
                  />
                </label>

                <label className="block text-sm font-semibold text-slate-700">
                  E-mail
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    disabled={salvando}
                    autoComplete="email"
                    className="mt-1.5 w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-normal focus:outline-hidden focus:ring-2 focus:ring-[#0052cc]"
                  />
                </label>

                <label className="block text-sm font-semibold text-slate-700">
                  Situação
                  <select
                    value={situacao}
                    onChange={(event) => setSituacao(event.target.value === 'ativo' ? 'ativo' : 'inativo')}
                    disabled={salvando}
                    className="mt-1.5 w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-normal focus:outline-hidden focus:ring-2 focus:ring-[#0052cc]"
                  >
                    <option value="ativo">Ativo</option>
                    <option value="inativo">Inativo</option>
                  </select>

                </label>

                <label className="block text-sm font-semibold text-slate-700">
                  Telefone
                  <input
                    value={telefone}
                    onChange={(event) => setTelefone(event.target.value)}
                    disabled={salvando}
                    autoComplete="telefone"
                    className="mt-1.5 w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-normal focus:outline-hidden focus:ring-2 focus:ring-[#0052cc]"
                  />
                </label>
              </div>

              <fieldset>
                <legend className="text-sm font-bold text-slate-800">
                  Perfis
                </legend>
                <p className="text-xs text-slate-500 mt-1 mb-3">
                  Master é exclusivo; Planejador e Engenheiro podem ser combinados.
                </p>
                <div className="flex flex-wrap gap-3">
                  {opcoesPerfil.map((opcao) => (
                    <label
                      key={opcao.codigo}
                      className="flex items-center gap-2 px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 cursor-pointer hover:bg-slate-50"
                    >
                      <input
                        type="checkbox"
                        checked={perfis.includes(opcao.codigo)}
                        onChange={() => alternarPerfil(opcao.codigo)}
                        disabled={salvando}
                        className="accent-[#0052cc]"
                      />
                      {opcao.nome}
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-sm font-bold text-slate-800">Empresas</legend>
                <p className="text-xs text-slate-500 mt-1 mb-3">
                  Empresas inativas já associadas também são exibidas para preservar os vínculos.
                </p>
                <div className="relative w-72 mb-3">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Pesquisar por nome"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5  border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0052cc]"
                  />
                </div>
                {empresasDisponiveis.length > 0 ? (
                  <div className="max-h-48 overflow-y-auto border border-slate-200 rounded-xl divide-y divide-slate-100">
                    {empresasDisponiveis.map((empresa) => (
                      <label
                        key={empresa.codigo_hetmo}
                        className="flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-slate-50"
                      >
                        <input
                          type="checkbox"
                          checked={empresasSelecionadas.includes(empresa.codigo_hetmo)}
                          onChange={() => alternarEmpresa(empresa.codigo_hetmo)}
                          disabled={salvando}
                          className="mt-1 accent-[#0052cc]"
                        />
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold text-slate-800">{empresa.nome}</span>
                          <span className="block text-xs text-slate-500">
                            Código {empresa.codigo_hetmo} · {empresa.cidade || 'Cidade não informada'}
                            {!empresa.ativa && ' · Inativa'}
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500 p-4 bg-slate-50 rounded-xl">
                    Não há empresas ativas disponíveis.
                  </p>
                )}
              </fieldset>

              {erro && (
                <p role="alert" className="text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-xl p-3">
                  {erro}
                </p>
              )}

              <footer className="flex justify-end gap-3 pt-1">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={salvando}
                  className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={salvando}
                  className="flex items-center justify-center gap-2 min-w-40 px-5 py-2.5 bg-[#0052cc] hover:bg-blue-700 text-white text-sm font-bold rounded-xl disabled:opacity-60"
                >
                  {salvando && <LoaderCircle className="w-4 h-4 animate-spin" />}
                  {salvando ? 'Salvando...' : 'Salvar alterações'}
                </button>
              </footer>
            </form>
          </>
        )}
      </section>
    </div>
  );
};