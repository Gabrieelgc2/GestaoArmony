import React, {useState} from "react";
import {Search, Filter, Pencil} from 'lucide-react';
import {PAGE_SIZE, type Empresa_Usuario} from "../../../types/admin.types";
import {StatusBadge} from "../StatusBadge"
import {Pagination} from "../Pagination";

interface EmpresasTableProps {
    empresas: Empresa_Usuario[];
    onEditarEmpresa: (empresa: Empresa_Usuario) => void;
}

export const EmpresasTable: React.FC<EmpresasTableProps> = ({empresas, onEditarEmpresa}) => 
  {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'TODAS' | 'Ativa' | 'Inativa'>('TODAS');
    const filteredEmpresas = empresas.filter((emp) => {
    const matchesSearch = emp.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
    emp.cidade?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'TODAS' 
    || (statusFilter === 'Ativa' && emp.ativa)
    || (statusFilter === 'Inativa' && !emp.ativa);
    return matchesSearch && matchesStatus
    });
    const pageItems = filteredEmpresas.slice(startIndex, startIndex + PAGE_SIZE);
    console.log(pageItems)
     return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
      {/* Barra de Filtros */}
      <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Pesquisar por nome ou cidade"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0052cc]"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-2 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-semibold text-slate-700 focus:outline-hidden"
            >
              <option value="TODAS">Todas as situações</option>
              <option value="Ativa">Ativa</option>
              <option value="Inativa">Inativa</option>
            </select>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            Exibindo {filteredEmpresas.length} empresas
          </span>
        </div>
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-slate-50/60 text-xs font-bold text-slate-600 uppercase tracking-wider border-b border-slate-100">
              <th className="py-4 px-6">Nome</th>
              <th className="py-4 px-6">Cidade</th>
              <th className="py-4 px-6 text-center">Usuários</th>
              <th className="py-4 px-6">Situação</th>
              <th className="py-4 px-6 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {pageItems.map((emp) => (
              <tr key={emp.codigo_hetmo} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-slate-900">{emp.nome}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-slate-600 text-xs font-semibold">{emp.cidade}</td>
                <td className="py-4 px-6 text-center font-bold text-slate-700 text-xs">
                {emp.usuario_empresa.length}
                </td>
                <td className="py-4 px-6">
                <StatusBadge status={emp.ativa} />
                </td>
                <td className="py-4 px-6 text-right">
                  <button
                    onClick={() => onEditarEmpresa(emp)}
                    title="Editar Empresa"
                    className="p-2 text-slate-400 hover:text-[#0052cc] hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination 
      currentPage={currentPage}
      currentCount={pageItems.length} 
      totalCount={empresas.length} 
      onPageChange={setCurrentPage}
      itemLabel="empresas" 
      />
    </div>
  );
}
