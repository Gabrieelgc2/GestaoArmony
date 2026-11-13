import React, { useState } from 'react';
import { Search, Plus, Pencil } from 'lucide-react';
import { PAGE_SIZE, type Empresa_Usuario, type Usuario_Disponivel } from '../../../types/admin.types';
import { StatusBadge} from '../StatusBadge';
import { Pagination } from '../Pagination';

interface UsuariosTableProps {
  usuarios: Usuario_Disponivel[];
  empresas: Empresa_Usuario[];
  onNovoUsuario?: () => void;
  onEditarUsuario?: (usuario: Usuario_Disponivel) => void;
}

export const UsuariosTable: React.FC<UsuariosTableProps> = ({
  usuarios,
  empresas,
  onNovoUsuario,
  onEditarUsuario,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const [searchTerm, setSearchTerm] = useState('');
  const [perfilFilter, setPerfilFilter] = useState<string>('TODOS');
  const [situacaoFilter, setSituacaoFilter] = useState<string>('TODAS');

  const filteredUsuarios = usuarios.filter((u) => {
    const matchesSearch =
      u.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPerfil = perfilFilter === 'TODOS' || u.perfis.some((perfil) => perfil.toUpperCase() === perfilFilter);
    const matchesSituacao = situacaoFilter === 'TODAS' || u.situacao === situacaoFilter;
    return matchesSearch && matchesPerfil && matchesSituacao;
  });

  const pageItems = filteredUsuarios.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
      {/* Barra de Ações & Filtros */}
      <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Pesquisar por nome ou e-mail"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0052cc]"
            />
          </div>

          <select
            value={perfilFilter}
            onChange={(e) => setPerfilFilter(e.target.value)}
            className="px-3 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-semibold text-slate-700"
          >
            <option value="TODOS">Todos os perfis</option>
            <option value="MASTER">MASTER</option>
            <option value="PLANEJADOR">PLANEJADOR</option>
            <option value="ENGENHEIRO">ENGENHEIRO</option>
          </select>

          <select
            value={situacaoFilter}
            onChange={(e) => setSituacaoFilter(e.target.value)}
            className="px-3 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-semibold text-slate-700"
          >
            <option value="TODAS">Todas as situações</option>
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
          </select>
        </div>

        <button
          onClick={onNovoUsuario}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#0052cc] hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Cadastrar Novo Usuário</span>
        </button>
      </div>

      {/* Tabela de Usuários */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-slate-50/60 text-xs font-bold text-slate-600 uppercase tracking-wider border-b border-slate-100">
              <th className="py-4 px-6">Nome</th>
              <th className="py-4 px-6">E-mail</th>
              <th className="py-4 px-6">Perfis</th>
              <th className="py-4 px-6 text-center">Empresas</th>
              <th className="py-4 px-6">Situação</th>
              <th className="py-4 px-6 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {pageItems.map((user) => {
              const empresasAssociadasCount = empresas.filter((emp) =>
                emp.usuario_empresa.some((vinculo) => vinculo.usuario_id === user.id)
              ).length;

              return (
                <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs">
                        {user.sigla}
                      </div>
                      <span className="font-semibold text-slate-900">{user.nome}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-500 text-xs font-medium">{user.email}</td>
                  <td className="py-4 px-6">
                    <div className="flex flex-wrap gap-1">
                      {user.perfis.map((p) => (
                        <span key={p} className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700">
                          {p}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center font-bold text-slate-700 text-xs">
                    {empresasAssociadasCount}
                  </td>
                  <td className="py-4 px-6">
                    <StatusBadge status={user.situacao} />
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => onEditarUsuario?.(user)}
                      className="p-2 text-slate-400 hover:text-[#0052cc] hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Pagination 
      currentPage={currentPage}
      currentCount={pageItems.length} 
      totalCount={usuarios.length}
      onPageChange={setCurrentPage}
      itemLabel="usuarios"
      />

    </div>
  );
};