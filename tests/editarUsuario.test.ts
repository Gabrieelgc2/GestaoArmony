import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { EditarUsuarioInput } from '../src/types/admin.types';

const { getUserMock, rpcMock } = vi.hoisted(() => ({
  getUserMock: vi.fn(),
  rpcMock: vi.fn(),
}));

vi.mock('@/supabaseClient', () => ({
  supabase: {
    auth: { getUser: getUserMock },
    rpc: rpcMock,
  },
}));

import { editarUsuario } from '../src/pages/Administrador/useDados';

describe('editarUsuario', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getUserMock.mockResolvedValue({
      data: { user: { id: 'master-1' } },
      error: null,
    });
    rpcMock.mockResolvedValue({ data: 'atualizado', error: null });
  });

  it('envia os campos do usuário e o master autenticado ao RPC', async () => {
    const input: EditarUsuarioInput = {
      id: 'usuario-1',
      nome: ' Rita A. Souza ',
      email: ' RITA@armony.com.br ',
      ativo: true,
      perfis: ['planejador'],
      empresas: [1],
    };

    await expect(editarUsuario(input)).resolves.toBe('atualizado');
    expect(rpcMock).toHaveBeenCalledWith('editar_usuario', {
      p_id: 'usuario-1',
      p_nome: 'Rita A. Souza',
      p_email: 'rita@armony.com.br',
      p_ativo: true,
      p_perfis: ['planejador'],
      p_empresas: [1],
      p_por: 'master-1',
    });
  });

  it('encaminha null para preservar perfis e empresas atuais', async () => {
    await editarUsuario({
      id: 'usuario-1',
      nome: 'Rita Souza',
      email: 'rita@armony.com.br',
      ativo: true,
      perfis: null,
      empresas: null,
    });

    expect(rpcMock).toHaveBeenCalledWith('editar_usuario', expect.objectContaining({
      p_perfis: null,
      p_empresas: null,
    }));
  });
});
