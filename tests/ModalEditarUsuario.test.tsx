import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import type { Empresa_Usuario, Usuario_Disponivel } from '../src/types/admin.types';
import { ModalEditarUsuario } from '../src/pages/Administrador/Usuarios/ModalEditarUsuario';

const usuario: Usuario_Disponivel = {
  id: 'usuario-1',
  nome: 'Rita Souza',
  email: 'rita@armony.com.br',
  telefone: null,
  ativo: false,
  perfis: ['planejador'],
  sigla: 'RS',
  situacao: 'Inativo',
};

const empresas: Empresa_Usuario[] = [
  {
    codigo_hetmo: 1,
    nome: 'Empresa Ativa',
    cidade: 'Recife',
    cnpj: null,
    ativa: true,
    usuario_empresa: [],
  },
  {
    codigo_hetmo: 2,
    nome: 'Empresa Inativa',
    cidade: 'Olinda',
    cnpj: null,
    ativa: false,
    usuario_empresa: [
      {
        criado_em: '2026-01-01',
        empresa_codigo_hetmo: 2,
        usuario_id: usuario.id,
      },
    ],
  },
];

describe('ModalEditarUsuario', () => {
  it('preenche os dados recebidos e envia as alterações selecionadas', async () => {
    const user = userEvent.setup();
    const onSave = vi.fn().mockResolvedValue('atualizado');
    render(
      <ModalEditarUsuario
        isOpen
        usuario={usuario}
        empresas={empresas}
        onClose={vi.fn()}
        onSave={onSave}
      />,
    );

    expect(screen.getByLabelText(/Nome/)).toHaveValue('Rita Souza');
    expect(screen.getByLabelText(/E-mail/)).toHaveValue('rita@armony.com.br');
    expect(screen.getByLabelText(/Situação/)).toHaveValue('inativo');
    expect(screen.getByRole('checkbox', { name: 'Planejador' })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: /Empresa Inativa/ })).toBeChecked();

    await user.clear(screen.getByLabelText(/Nome/));
    await user.type(screen.getByLabelText(/Nome/), 'Rita A. Souza');
    await user.selectOptions(screen.getByLabelText(/Situação/), 'ativo');
    await user.click(screen.getByRole('checkbox', { name: 'Engenheiro' }));
    await user.click(screen.getByRole('checkbox', { name: /Empresa Ativa/ }));
    await user.click(screen.getByRole('button', { name: 'Salvar alterações' }));

    await waitFor(() => expect(onSave).toHaveBeenCalledWith({
      id: 'usuario-1',
      nome: 'Rita A. Souza',
      email: 'rita@armony.com.br',
      ativo: true,
      perfis: ['planejador', 'engenheiro'],
      empresas: [2, 1],
    }));
    expect(await screen.findByText('Alterações salvas')).toBeInTheDocument();
  });
});
