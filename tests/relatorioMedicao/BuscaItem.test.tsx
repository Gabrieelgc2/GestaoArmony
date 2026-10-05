import {render, screen, fireEvent, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import {describe, it, expect, vi} from "vitest";
import {FormularioRelatorioMedicao} from "../../src/pages/Inspetor/Medicao/FormsMedicao/FormularioMedicao"

describe("Exclusão de item com confirmação de Modal", () => {
    it("deve abrir o modal ao solicitar remoção e remover o item após confirmar", async () => {
        const onSalvarMock = vi.fn();
        const user = userEvent.setup();
        render(<FormularioRelatorioMedicao onSalvar={onSalvarMock} />);

        const botaoAdicionar = screen.getByRole("button", {name: /adicionar/i});
        await user.click(botaoAdicionar);
        expect(screen.getByTestId("contador-itens")).toHaveTextContent("Exibindo 2 de 2 itens");

        const inputBusca = screen.getByPlaceholderText(/Nº do item/i);
        await user.type(inputBusca, "2");

        const botaoLixeiraBusca = screen.getByTitle(/remover este item pelo número/i);
        await user.click(botaoLixeiraBusca);

        expect(screen.getByText(/remover item #2\?/i)).toBeInTheDocument();
        expect(screen.getByText(/esta ação não poderá ser desfeita/i)).toBeInTheDocument();

        const botaoConfirmarModal = screen.getByRole("button", {name: /Sim, remover item/i});
        await user.click(botaoConfirmarModal);

        await waitFor(() => {
        expect(screen.queryByText(/remover item #2\?/i)).not.toBeInTheDocument();
        });
        expect(screen.getByTestId("contador-itens")).toHaveTextContent("Exibindo 1 de 1 itens");
        });

        it("não deve remover o item se o usuário clicar em Cancelar no Modal", async () => {
            const user = userEvent.setup();
            render(<FormularioRelatorioMedicao onSalvar={vi.fn()} />);

            const botaoAdicionar = screen.getByRole("button", {name: /adicionar/i});
            await user.click(botaoAdicionar);
            expect(screen.getByTestId("contador-itens")).toHaveTextContent("Exibindo 2 de 2 itens");

            const inputRemover = screen.getByPlaceholderText(/Nº do item/i);
            await user.type(inputRemover, "2");

            const removerLixeira = screen.getByTitle(/remover este item pelo número/i);
            await user.click(removerLixeira);
            
            const botaoCancelar = screen.getByRole("button", {name: /cancelar/i});
            await user.click(botaoCancelar);

            await waitFor(() => {
            expect(screen.queryByText(/remover item #2\?/i)).not.toBeInTheDocument();
            });
            expect(screen.getByTestId("contador-itens")).toHaveTextContent("Exibindo 2 de 2 itens");
        });

        it("verificar se o botão X funciona para sair do Modal", async () => {
            const user = userEvent.setup();
            render(<FormularioRelatorioMedicao onSalvar={vi.fn()} />);

            const botaoAdicionar = screen.getByRole("button", {name: /adicionar/i});
            await user.click(botaoAdicionar);
            expect(screen.getByTestId("contador-itens")).toHaveTextContent("Exibindo 2 de 2 itens");

            const inputRemover = screen.getByPlaceholderText(/Nº do item/i);
            await user.type(inputRemover, "2");

            const removerLixeira = screen.getByTitle(/remover este item pelo número/i);
            await user.click(removerLixeira);

            const botaoCancelar = screen.getByRole("button", {name: /fechar/i});
            await user.click(botaoCancelar);

            await waitFor(() => {
            expect(screen.queryByText(/remover item #2\?/i)).not.toBeInTheDocument();
            });
            expect(screen.getByTestId("contador-itens")).toHaveTextContent("Exibindo 2 de 2 itens");
        });
});