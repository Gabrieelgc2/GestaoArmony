import { Search } from 'lucide-react';
import type { Empresa_Usuario } from '@/types/admin.types';

interface SelecaoEmpresasProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  empresasDisponiveis: Empresa_Usuario[];
  empresasSelecionadas: number[];
  alternarEmpresa: (codigoHetmo: number) => void;
  salvando: boolean;
}

export default function SelecaoEmpresas({
  searchTerm,
  setSearchTerm,
  empresasDisponiveis,
  empresasSelecionadas,
  alternarEmpresa,
  salvando,
}: SelecaoEmpresasProps) {
  return (
    <fieldset>
      <legend className="text-sm font-bold text-slate-800">Empresas</legend>
      <p className="text-xs text-slate-500 mt-1 mb-3">
        Empresas inativas já associadas também são exibidas para preservar os vínculos.
      </p>
      <div className="relative w-72 mb-3">
        <Search
          className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
          aria-hidden="true"
        />
        <input
          type="search"
          placeholder="Pesquisar por nome"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          aria-label="Pesquisar empresas por nome"
          className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0052cc]"
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
  );
}
