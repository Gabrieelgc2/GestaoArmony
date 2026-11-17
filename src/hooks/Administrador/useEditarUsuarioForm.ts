import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import type {
  EditarUsuarioInput,
  Empresa_Usuario,
  PerfilUsuario,
  ResultadoEditarUsuario,
  Usuario_Disponivel,
} from '../../types/admin.types';

interface UseEditarUsuarioFormProps {
  usuario: Usuario_Disponivel;
  empresas: Empresa_Usuario[];
  onSave: (input: EditarUsuarioInput) => Promise<ResultadoEditarUsuario>;
}

const isPerfilUsuario = (perfil: string): perfil is PerfilUsuario =>
  perfil === 'master' || perfil === 'planejador' || perfil === 'engenheiro';

export function useEditarUsuarioForm({ usuario, empresas, onSave }: UseEditarUsuarioFormProps) {
  const [nome, setNome] = useState(usuario.nome);
  const [email, setEmail] = useState(usuario.email);
  const [telefone, setTelefone] = useState(usuario.telefone ?? '');
  const [situacao, setSituacao] = useState<'ativo' | 'inativo'>(
    usuario.ativo ? 'ativo' : 'inativo',
  );
  const [perfis, setPerfis] = useState<PerfilUsuario[]>(() =>
    usuario.perfis.filter(isPerfilUsuario),
  );
  const [empresasSelecionadas, setEmpresasSelecionadas] = useState<number[]>(() =>
    empresas
      .filter((empresa) =>
        empresa.usuario_empresa.some((vinculo) => vinculo.usuario_id === usuario.id),
      )
      .map((empresa) => empresa.codigo_hetmo),
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [salvando, setSalvando] = useState(false);
  const [salvo, setSalvo] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const empresasDisponiveis = useMemo(() => {
    const termo = searchTerm.toLowerCase();
    return empresas.filter(
      (empresa) =>
        empresa.nome.toLowerCase().includes(termo) &&
        (empresa.ativa || empresasSelecionadas.includes(empresa.codigo_hetmo)),
    );
  }, [empresas, empresasSelecionadas, searchTerm]);

  const alternarPerfil = (perfil: PerfilUsuario) => {
    setPerfis((atuais) => {
      if (atuais.includes(perfil)) return atuais.filter((item) => item !== perfil);
      if (perfil === 'master') return ['master'];
      return [...atuais.filter((item) => item !== 'master'), perfil];
    });
  };

  const alternarEmpresa = (codigoHetmo: number) => {
    setEmpresasSelecionadas((atuais) =>
      atuais.includes(codigoHetmo)
        ? atuais.filter((codigo) => codigo !== codigoHetmo)
        : [...atuais, codigoHetmo],
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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

  return {
    nome,
    setNome,
    email,
    setEmail,
    telefone,
    setTelefone,
    situacao,
    setSituacao,
    perfis,
    alternarPerfil,
    empresasSelecionadas,
    alternarEmpresa,
    searchTerm,
    setSearchTerm,
    empresasDisponiveis,
    salvando,
    salvo,
    erro,
    handleSubmit,
  };
}
