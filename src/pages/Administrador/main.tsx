import React, { useState } from 'react';
import type{ Usuario_Disponivel, AdminTab, Empresa_Usuario } from '../../types/admin.types';
import AdminHeader from './AdminHeader';
import { AdminNavigation } from './AdminNavigation';
import { EmpresasTable } from './Empresas/EmpresasTable';
import { ModalEditarEmpresa } from './Empresas/Modal';
import { ModalUsuario } from './Usuarios/ModalUsuario';
import { ModalEditarUsuario } from './Usuarios/ModalEditarUsuario';
import { UsuariosTable } from './Usuarios/UsuariosTable';
import { usePainelAdm } from './usePainelAdm';
import { useAuth } from '@/hooks/useAuth';
import { associarUsuarioEmpresa, atualizarEmpresa, editarUsuario, removerUsuarioEmpresa, salvarNovoUsuario } from './useDados';
import type { EditarUsuarioInput, NovoUsuarioInput } from '../../types/admin.types';

export const AdministracaoPage: React.FC = () => {
  const hook = usePainelAdm();
  const [activeTab, setActiveTab] = useState<AdminTab>('empresas');
  const [empresaEmEdicao, setEmpresaEmEdicao] = useState<Empresa_Usuario | null>(null);
  const [modalNovoUsuarioAberto, setModalNovoUsuarioAberto] = useState(false);
  const [usuarioEmEdicao, setUsuarioEmEdicao] = useState<Usuario_Disponivel | null>(null);
  const { signOut, isLoggingOut } = useAuth();

  const handleSalvarNovoUsuario = async (usuario: NovoUsuarioInput) => {
    const resultado = await salvarNovoUsuario(usuario);
    await hook.carregarDados();
    return resultado;
  };

  const handleEditarUsuario = async (usuario: EditarUsuarioInput) => {
    const resultado = await editarUsuario(usuario);
    await hook.carregarDados();
    return resultado;
  };

  const handleAdicionarUsuario = async (usuarioId: string, codigoHetmo: number) => {
    await associarUsuarioEmpresa(usuarioId, codigoHetmo);
    await hook.carregarDados();
  };

  const handleRemoverUsuario = async (usuarioId: string, nomeUsuario: string, codigoHetmo: number) => {
    let resultado = await removerUsuarioEmpresa(usuarioId, codigoHetmo);
    if (resultado === 'removido' || 'nao_associado') return;
    if (resultado === 'ultima_empresa' || resultado === 'tem_visitas_agendadas') {
      const aviso = resultado === 'ultima_empresa'
        ? `${nomeUsuario} ficará sem empresa associada e poderá perder acesso às obras. Deseja remover mesmo assim?`
        : `${nomeUsuario} tem visitas de medição agendadas nesta empresa. As visitas permanecerão e precisarão ser reatribuídas. Deseja remover mesmo assim?`;
      if (!window.confirm(aviso)) return;
      resultado = await removerUsuarioEmpresa(usuarioId, codigoHetmo, true);
      if (resultado === 'ultima_empresa' || resultado === 'tem_visitas_agendadas') {
        throw new Error('A associação ainda não foi removida. A regra do banco continua impedindo a operação.');
      }
    }
    await hook.carregarDados();
  };

  const handleSaveEmpresa = async (empresaAtualizada: Empresa_Usuario) => {
    await atualizarEmpresa(empresaAtualizada);
    await hook.carregarDados();
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-slate-900 px-6 py-8 md:px-12 md:py-10">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho Fixo */}
        <AdminHeader/>

        {/* Barra de Abas Interativa */}
        <AdminNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          empresasCount={hook.empresas.length}
          usuariosCount={hook.usuarios.length}
          signOut={signOut}
          isLoggingOut={isLoggingOut}
        />

        {hook.error && <p role="alert" className="mb-4 text-sm text-rose-700">{hook.error}</p>}

        {hook.loading ? (
          <p className="py-10 text-center text-sm text-slate-500">Carregando dados administrativos...</p>
        ) : (
        /* Conteúdo Dinâmico por Aba */
        <main>
          {activeTab === 'empresas' && (
            <EmpresasTable
              empresas={hook.empresas}
              onEditarEmpresa={(emp) => setEmpresaEmEdicao(emp)}
            />
          )}

          {activeTab === 'usuarios' && (
            <UsuariosTable
              usuarios={hook.usuarios}
              empresas={hook.empresas}
              onNovoUsuario={() => setModalNovoUsuarioAberto(true)}
              onEditarUsuario={(user) => setUsuarioEmEdicao(user)}
            />
          )}
        </main>
        )}

        {/* Modal de Edição de Empresa */}
        {empresaEmEdicao && (
          <ModalEditarEmpresa
            isOpen={true}
            empresa={empresaEmEdicao}
            onClose={() => setEmpresaEmEdicao(null)}
            onSave={handleSaveEmpresa}
            onAdicionarUsuario={handleAdicionarUsuario}
            onRemoverUsuario={handleRemoverUsuario}
          />
        )}

        {modalNovoUsuarioAberto && (
          <ModalUsuario
            isOpen={modalNovoUsuarioAberto}
            empresas={hook.empresas}
            onClose={() => setModalNovoUsuarioAberto(false)}
            onSave={handleSalvarNovoUsuario}
          />
        )}

        {usuarioEmEdicao && (
          <ModalEditarUsuario
            key={usuarioEmEdicao.id}
            isOpen={Boolean(usuarioEmEdicao)}
            usuario={usuarioEmEdicao}
            empresas={hook.empresas}
            onClose={() => setUsuarioEmEdicao(null)}
            onSave={handleEditarUsuario}
          />
        )}
      </div>
    </div>
  );
};