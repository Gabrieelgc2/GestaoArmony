import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import type { Empresa_Usuario } from '../src/types/admin.types';
import { ModalUsuario } from '../src/pages/Administrador/ModalUsuario';

const empresas: Empresa_Usuario[] = [
  {
    codigo_hetmo: 5,
    nome: 'Empresa Ativa',
    cidade: 'Recife',
    cnpj: null,
    ativa: true,
    usuario_empresa: [],
  },
  {
    codigo_hetmo: 6,
    nome: 'Empresa Inativa',
    cidade: 'Olinda',
    cnpj: null,
    ativa: false,
    usuario_empresa: [],
  },
];

describe('ModalUsuario', () => {
  it('mantém Master exclusivo e permite combinar Planejador com Engenheiro', async () => {
    const user = userEvent.setup();
    render(<ModalUsuario isOpen empresas={empresas} onClose={vi.fn()} onSave={vi.fn()} />);

    const master = screen.getByRole('checkbox', { name: 'Master' });
    const planejador = screen.getByRole('checkbox', { name: 'Planejador' });
    const engenheiro = screen.getByRole('checkbox', { name: 'Engenheiro' });

    await user.click(planejador);
    await user.click(engenheiro);
    expect(planejador).toBeChecked();
    expect(engenheiro).toBeChecked();

    await user.click(master);
    expect(master).toBeChecked();
    expect(planejador).not.toBeChecked();
    expect(engenheiro).not.toBeChecked();
  });

  it('exige empresa para perfis operacionais e envia apenas empresas ativas selecionadas', async () => {
    const user = userEvent.setup();
    const onSave = vi.fn().mockResolvedValue('criado');
    render(<ModalUsuario isOpen empresas={empresas} onClose={vi.fn()} onSave={onSave} />);

    await user.type(screen.getByLabelText(/Nome/), 'Rita Albuquerque');
    await user.type(screen.getByLabelText(/E-mail/), ' RITA@armony.com.br ');
    await user.type(screen.getByLabelText(/Senha/), 'senha-segura');
    await user.selectOptions(screen.getByLabelText(/Situação/), 'ativo');
    await user.click(screen.getByRole('checkbox', { name: 'Planejador' }));
    await user.click(screen.getByRole('button', { name: 'Confirmar e salvar' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('Selecione pelo menos uma empresa');
    expect(onSave).not.toHaveBeenCalled();
    expect(screen.getByText('Empresa Ativa')).toBeInTheDocument();
    expect(screen.queryByText('Empresa Inativa')).not.toBeInTheDocument();

    await user.click(screen.getByRole('checkbox', { name: /Empresa Ativa/ }));
    await user.click(screen.getByRole('checkbox', { name: 'Engenheiro' }));
    await user.click(screen.getByRole('button', { name: 'Confirmar e salvar' }));

    await waitFor(() => expect(onSave).toHaveBeenCalledWith({
      nome: 'Rita Albuquerque',
      email: 'rita@armony.com.br',
      telefone: null,
      senha: 'senha-segura',
      ativo: true,
      perfis: ['planejador', 'engenheiro'],
      empresas: [5],
    }));
    expect(await screen.findByText('Tudo confirmado')).toBeInTheDocument();
  });
});
