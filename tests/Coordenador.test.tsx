import "@testing-library/jest-dom/vitest";
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { CentralAuditoria } from './CentralAuditoria';
import { PainelGeralObras } from './PainelGeralObras';

describe('Painel Geral do Coordenador Técnico (Macro)', () => {
    // Teste 1: Renderização do Componente
    it('1 - deve carregar o componente do painel geral com sucesso', () => {
        render(<PainelGeralObras />);
        expect(screen.getByText(/Painel do Coordenador/i)).toBeInTheDocument();
    });

    // Teste 2: Filtros de Categoria e Contagem
    it('2 - deve filtrar por categorias (Todos, Em Revisão, Recusado, Liberado) e exibir as contagens corretas', async () => {
        const obrasMock = [
            { id: 1, status: 'REVISAO' },
            { id: 2, status: 'REVISAO' },
            { id: 3, status: 'LIBERADO' },
            { id: 4, status: 'RECUSADO' },
        ];
        render(<PainelGeralObras obras={obrasMock} />);

        const btnTodos = screen.getByRole('button', { name: /Todos/i });
        const btnRevisao = screen.getByRole('button', { name: /Revisão/i });
        const btnRecusado = screen.getByRole('button', { name: /Recusados/i });
        const btnLiberado = screen.getByRole('button', { name: /Liberados/i });

        expect(btnTodos).toHaveTextContent('(4)');
        expect(btnRevisao).toHaveTextContent('(2)');
        expect(btnRecusado).toHaveTextContent('(1)');
        expect(btnLiberado).toHaveTextContent('(1)');

        // Simula o clique na categoria "Recusados"
        await userEvent.click(btnRecusado);
        expect(screen.getByText('Obra: 1010.1')).toBeInTheDocument();
        expect(screen.queryByText('Obra: 1020.1')).not.toBeInTheDocument();
    });

    // Teste 4: Botões de Ação do Card (Acompanhar)
    it('4 - deve acionar o botão Acompanhar específico de uma obra pelo seu id', async () => {
        const onAcompanharMock = vi.fn();

        render(<PainelGeralObras onAcompanharObra={onAcompanharMock} />);

        // Seleciona o botão específico usando o atributo data-testid (ou o ID configurado)
        const btnAcompanharObra1 = screen.getByTestId('button-id-1');

        await userEvent.click(btnAcompanharObra1);

        // Verifica se o callback foi disparado com o parâmetro/ID correto daquela obra
        expect(onAcompanharMock).toHaveBeenCalledWith('FortTREK'); // ou com o ID exato: 1
    });
});

describe('DateRangePickerPopOver (Essencial)', () => {
    const onApplyMock = vi.fn();
    const onCancelMock = vi.fn();
    const openPopover = async () => {
        const btnSetinha = screen.getByTestId('btn-toggle-date-picker');
        await userEvent.click(btnSetinha);
    };
    it('1 - deve selecionar um atalho e aplicar o filtro com sucesso', async () => {
        render(<DateRangerPickerPopOver onApply={onApplyMock} />);
        await openPopover();
        await userEvent.click(screen.getByRole('button', { name: /Hoje/i }));
        await userEvent.click(screen.getByRole('button', { name: /Aplicar Filtro/i }));

        expect(onApplyMock).toHaveBeenCalledTimes(1);
    })

    it('2 - deve fechar e não aplicar alterações ao clicar em Cancelar', async () => {
        render(<DateRangerPickerPopOver onApply={onApplyMock} onCancel={onCancelMock} />);
        await openPopover();
        await userEvent.click(screen.getByRole('button', { name: /Ontem/i }));
        await userEvent.click(screen.getByRole('button', { name: /Cancelаr/i }));
        expect(onApplyMock).not.toHaveBeenCalled();
        expect(onCancelMock).toHaveBeenCalledTimes(1);
    })

    it('3 - deve gerar o intervalo correto de datas para os atalhos', () => {
        const rangeHoje = getPresetRange('HOJE');
        expect(rangeHoje.from).toBeDefined();
        expect(rangeHoje.to).toBeDefined();
    });
});

describe('Central de Auditoria de Medição (Micro View + Drawer)', () => {

    // Teste 5: Botão Detalhes e Abertura do Drawer
    it('5 - deve abrir o drawer de detalhes ao clicar no botão "Detalhes" de um item', async () => {
        render(<CentralAuditoria />);

        const btnDetalhes = screen.getAllByRole('button', { name: /Detalhes/i })[0];
        await userEvent.click(btnDetalhes);

        expect(screen.getByText(/Especificações Técnicas/i)).toBeInTheDocument();
        expect(screen.getByText(/Item #001/i)).toBeInTheDocument();
    });

    // Teste 6: Botão "Aprovar Todos"
    it('6 - deve aprovar todos os 500 itens da obra ao clicar em "Aprovar Todos"', async () => {
        render(<CentralAuditoria />);

        const btnAprovarTodos = screen.getByRole('button', { name: /Aprovar Todos/i });
        await userEvent.click(btnAprovarTodos);

        expect(screen.getByText(/Todas as 500 medições foram liberadas/i)).toBeInTheDocument();
    });

    // Teste 7: Botão "Recusar Todos"
    it('7 - deve solicitar motivo e recusar todas as medições ao clicar em "Recusar Todos"', async () => {
        render(<CentralAuditoria />);

        const btnRecusarTodos = screen.getByRole('button', { name: /Recusar Todos/i });
        await userEvent.click(btnRecusarTodos);

        expect(screen.getByText(/Informe o motivo para a recusa geral/i)).toBeInTheDocument();
    });

    // Teste 8: Checkboxes Individuais dos Itens
    it('8 - deve permitir marcar e desmarcar as caixas de seleção dos itens na tabela', async () => {
        render(<CentralAuditoria />);

        const checkboxes = screen.getAllByRole('checkbox');
        const firstItemCheckbox = checkboxes[1]; // Ignora o "Selecionar Todos" do header

        expect(firstItemCheckbox).not.toBeChecked();
        await userEvent.click(firstItemCheckbox);
        expect(firstItemCheckbox).toBeChecked();
    });

    // Teste 9: Barra Flutuante Dinâmica de Ações em Lote
    it('9 - deve exibir a barra flutuante com a quantidade exata de itens marcados (Aprovar / Recusar)', async () => {
        render(<CentralAuditoria />);

        const checkboxes = screen.getAllByRole('checkbox');

        // Seleciona 2 itens
        await userEvent.click(checkboxes[1]);
        await userEvent.click(checkboxes[2]);

        expect(screen.getByText('2 itens selecionados')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Aprovar 2 Itens/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Recusar 2 Itens/i })).toBeInTheDocument();
    });

    // Teste 10: Aprovar Item pelo Checkbox do Drawer
    it('10 - deve marcar o item para lote quando o checkbox dentro do Drawer for selecionado', async () => {
        render(<CentralAuditoria />);

        // Abrir o Drawer do Item #001
        await userEvent.click(screen.getAllByRole('button', { name: /Detalhes/i })[0]);

        // Marcar Checkbox dentro do Drawer
        const drawerCheckbox = screen.getByRole('checkbox', { name: /Selecionar este item/i });
        await userEvent.click(drawerCheckbox);

        expect(drawerCheckbox).toBeChecked();
        expect(screen.getByText('1 item selecionado')).toBeInTheDocument();
    });

    // Teste 11: Comportamento de Atualização no Drawer
    it('11 - deve refletir o estado de seleção do item dentro do Drawer se ele for marcado na tabela', async () => {
        render(<CentralAuditoria />);

        const tableCheckbox = screen.getAllByRole('checkbox')[1];
        await userEvent.click(tableCheckbox);

        // Abrir o Drawer do mesmo item
        await userEvent.click(screen.getAllByRole('button', { name: /Detalhes/i })[0]);

        const drawerCheckbox = screen.getByRole('checkbox', { name: /Item selecionado para ação em lote/i });
        expect(drawerCheckbox).toBeChecked();
    });

    // Teste 12: Botão Sair / Fechar no Drawer
    it('12 - deve fechar o drawer de detalhes ao clicar no botão de fechar (X)', async () => {
        render(<CentralAuditoria />);

        // Abrir
        await userEvent.click(screen.getAllByRole('button', { name: /Detalhes/i })[0]);
        expect(screen.getByText(/Especificações Técnicas/i)).toBeInTheDocument();

        // Fechar pelo botão X
        const btnFechar = screen.getByRole('button', { name: /Fechar/i }); // Ou aria-label="close"
        await userEvent.click(btnFechar);

        await waitFor(() => {
            expect(screen.queryByText(/Especificações Técnicas/i)).not.toBeInTheDocument();
        });
    });
});