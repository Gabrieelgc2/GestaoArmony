import type { PerfilUsuario } from '@/types/admin.types';

interface SelecaoPerfisProps {
  perfis: PerfilUsuario[];
  alternarPerfil: (perfil: PerfilUsuario) => void;
  salvando: boolean;
}

const opcoesPerfil: { codigo: PerfilUsuario; nome: string }[] = [
  { codigo: 'master', nome: 'Master' },
  { codigo: 'planejador', nome: 'Planejador' },
  { codigo: 'engenheiro', nome: 'Engenheiro' },
];

export default function SelecaoPerfis({
  perfis,
  alternarPerfil,
  salvando,
}: SelecaoPerfisProps) {
  return (
    <fieldset>
      <legend className="text-sm font-bold text-slate-800">Perfis</legend>
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
  );
}
