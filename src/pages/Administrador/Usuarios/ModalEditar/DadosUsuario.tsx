import type { Dispatch, SetStateAction } from 'react';

interface DadosUsuarioProps {
  nome: string;
  setNome: Dispatch<SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  situacao: 'ativo' | 'inativo';
  setSituacao: Dispatch<SetStateAction<'ativo' | 'inativo'>>;
  telefone: string;
  setTelefone: Dispatch<SetStateAction<string>>;
  salvando: boolean;
}

export default function DadosUsuario({
  nome,
  setNome,
  email,
  setEmail,
  situacao,
  setSituacao,
  telefone,
  setTelefone,
  salvando,
}: DadosUsuarioProps) {
  return (
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
          autoComplete="tel"
          className="mt-1.5 w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-normal focus:outline-hidden focus:ring-2 focus:ring-[#0052cc]"
        />
      </label>
    </div>
  );
}
