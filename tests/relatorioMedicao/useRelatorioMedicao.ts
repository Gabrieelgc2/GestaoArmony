import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useRelatorioMedicao } from "../../src/pages/Inspetor/Medicao/FormsMedicao/useRelatorioMedicao";

describe("useRelatorioMedicao Hook", () => {
  const onSalvarMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Adição em Lote com Validação Zod", () => {
    it("deve iniciar com 1 item padrão na lista", () => {
      const { result } = renderHook(() => useRelatorioMedicao(onSalvarMock));
      expect(result.current.itens).toHaveLength(1);
      expect(result.current.itensVisiveis).toHaveLength(1);
    });

    it("deve adicionar N itens em lote com sucesso quando a quantidade for válida", () => {
      const { result } = renderHook(() => useRelatorioMedicao(onSalvarMock));

      // Define quantidade para 5
      act(() => {
        result.current.setQtdAdicionar("5");
      });

      // Executa adição em lote
      act(() => {
        result.current.adicionarItensEmLote();
      });

      // 1 inicial + 5 adicionados = 6 itens
      expect(result.current.itens).toHaveLength(6);
      expect(result.current.erroQtd).toBe("");
      expect(result.current.qtdAdicionar).toBe("1");
    });

    it("deve retornar erro Zod quando a quantidade estiver em branco/inválida", () => {
      const { result } = renderHook(() => useRelatorioMedicao(onSalvarMock));

      act(() => {
        result.current.setQtdAdicionar("");
      });

      act(() => {
        result.current.adicionarItensEmLote();
      });

      expect(result.current.itens).toHaveLength(1); // Não adiciona
      expect(result.current.erroQtd).toBe("Digite uma quantidade válida.");
    });

    it("deve retornar erro Zod quando a quantidade for menor que 1", () => {
      const { result } = renderHook(() => useRelatorioMedicao(onSalvarMock));

      act(() => {
        result.current.setQtdAdicionar("0");
      });

      act(() => {
        result.current.adicionarItensEmLote();
      });

      expect(result.current.itens).toHaveLength(1);
      expect(result.current.erroQtd).toBe("A quantidade deve ser pelo menos 1.");
    });

    it("deve retornar erro Zod quando a quantidade for maior que 50", () => {
      const { result } = renderHook(() => useRelatorioMedicao(onSalvarMock));

      act(() => {
        result.current.setQtdAdicionar("51");
      });

      act(() => {
        result.current.adicionarItensEmLote();
      });

      expect(result.current.itens).toHaveLength(1);
      expect(result.current.erroQtd).toBe("Máximo de 50 itens por vez.");
    });
  });

  describe("Paginação e Busca de Itens", () => {
    it("deve limitar a exibição visual a 20 itens por padrão", () => {
      const { result } = renderHook(() => useRelatorioMedicao(onSalvarMock));

      // Adiciona 50 itens na lista (em 2 lotes de 25)
      act(() => {
        result.current.setQtdAdicionar("25");
        result.current.adicionarItensEmLote();
      });
      act(() => {
        result.current.setQtdAdicionar("25");
        result.current.adicionarItensEmLote();
      });

      expect(result.current.itens.length).toBeGreaterThan(50);
      // itensVisiveis deve ter no máximo 20 no carregamento inicial
      expect(result.current.itensVisiveis).toHaveLength(20);
    });

    it("deve carregar mais 20 itens ao chamar carregarMais()", () => {
      const { result } = renderHook(() => useRelatorioMedicao(onSalvarMock));

      // Adiciona 50 itens
      act(() => {
        result.current.setQtdAdicionar("50");
        result.current.adicionarItensEmLote();
      });

      expect(result.current.itensVisiveis).toHaveLength(20);

      // Clica em "Carregar Mais"
      act(() => {
        result.current.carregarMais();
      });

      expect(result.current.itensVisiveis).toHaveLength(40);
    });

    it("deve expandir o limite de exibição se a busca for por um item além do limite visível", () => {
      const { result } = renderHook(() => useRelatorioMedicao(onSalvarMock));

      // Adiciona 45 itens
      act(() => {
        result.current.setQtdAdicionar("45");
        result.current.adicionarItensEmLote();
      });

      expect(result.current.itensVisiveis).toHaveLength(20);

      // Simula a busca pelo Item #35
      act(() => {
        result.current.lidarComBusca(35);
      });

      // O limiteExibicao deve ser atualizado para 35 e os visíveis expandidos para 35
      expect(result.current.limiteExibicao).toBe(35);
      expect(result.current.itensVisiveis).toHaveLength(35);
    });
  });
});