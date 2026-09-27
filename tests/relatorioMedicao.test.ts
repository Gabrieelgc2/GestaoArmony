import { describe, it, expect } from "vitest";
import { itemMedicaoSchema } from "../src/utils/relatorioSchema"
describe("Testes de relatório de medição", () => {
  // Objeto base VÁLIDO para ser clonado/modificado em cada teste
  const itemValidoBase = {
    descricao_item: "Janela Sacada",
    quantidade: 2,
    largura: 1500,
    altura: 2100,
    peitoril: 1,
    giro: "Esquerda",
    tem_chave: false,
    nao_drenar: false,
    tem_pelicula: false,
    calhas: "UMA_CALHA",
    soleira_porta_giro: "SEM",
    acabamento: "EIXO_VAO",
    trilho_especial: "TRILHO_PRIME",
  };

  // 1. Descrição
  it("1 - Verificar caso a descrição não for preenchida retornar 'A descrição do item é obrigatória'", () => {
    const res = itemMedicaoSchema.safeParse({ ...itemValidoBase, descricao_item: "" });
    expect(res.success).toBe(false);
    if (!res.success) expect(res.error.issues[0].message).toBe("A descrição do item é obrigatória");
  });

  it("1.1 - Caso a descrição enviada não seja do tipo string/válida retornar erro de tipo", () => {
    const res = itemMedicaoSchema.safeParse({ ...itemValidoBase, descricao_item: 123 as any });
    expect(res.success).toBe(false);
    if (!res.success) expect(res.error.issues[0].message).toBe("Descrição inválida");
  });

  // 2. Quantidade
  it("2 - Caso a quantidade enviada não seja do tipo 'number' retornar 'Quantidade inválida'", () => {
    const res = itemMedicaoSchema.safeParse({ ...itemValidoBase, quantidade: "abc" });
    expect(res.success).toBe(false);
    if (!res.success) expect(res.error.issues[0].message).toBe("Quantidade inválida");
  });

  it("2.1 - Verificar caso a quantidade não for preenchida retornar 'A quantidade deve ser no mínimo 1'", () => {
    const res = itemMedicaoSchema.safeParse({ ...itemValidoBase, quantidade: 0 });
    expect(res.success).toBe(false);
    if (!res.success) expect(res.error.issues[0].message).toBe("A quantidade deve ser no mínimo 1");
  });

  // 3. Largura
  it("3 - Caso a largura não seja preenchida retornar 'Informe a largura'", () => {
    const res = itemMedicaoSchema.safeParse({ ...itemValidoBase, largura: "" });
    expect(res.success).toBe(false);
    if (!res.success) expect(res.error.issues[0].message).toBe("Informe a largura");
  });

  it("3.2 - Caso a largura não seja do tipo number retornar 'Largura inválida'", () => {
    const res = itemMedicaoSchema.safeParse({ ...itemValidoBase, largura: "abc" });
    expect(res.success).toBe(false);
    if (!res.success) expect(res.error.issues[0].message).toBe("Largura inválida");
  });

  // 4. Altura
  it("4 - Caso a altura não seja preenchida retornar 'Informe a altura'", () => {
    const res = itemMedicaoSchema.safeParse({ ...itemValidoBase, altura: "" });
    expect(res.success).toBe(false);
    if (!res.success) expect(res.error.issues[0].message).toBe("Informe a altura");
  });

  it("4.1 - Caso a altura não seja do tipo number retornar 'Altura inválida'", () => {
    const res = itemMedicaoSchema.safeParse({ ...itemValidoBase, altura: "abc" });
    expect(res.success).toBe(false);
    if (!res.success) expect(res.error.issues[0].message).toBe("Altura inválida");
  });

  // 5. Peitoril
  it("5 - Caso o peitoril não seja preenchido retornar 'Informe o peitoril'", () => {
    const res = itemMedicaoSchema.safeParse({ ...itemValidoBase, peitoril: "" });
    expect(res.success).toBe(false);
    if (!res.success) expect(res.error.issues[0].message).toBe("Informe o peitoril");
  });

  it("5.2 - Caso o peitoril não seja do tipo number retornar 'Peitoril inválido'", () => {
    const res = itemMedicaoSchema.safeParse({ ...itemValidoBase, peitoril: "abc" });
    expect(res.success).toBe(false);
    if (!res.success) expect(res.error.issues[0].message).toBe("Peitoril inválido");
  });

  // 6. Giro
  it("6 - Caso o giro não for preenchido retornar 'Informe o giro'", () => {
    const res = itemMedicaoSchema.safeParse({ ...itemValidoBase, giro: "" });
    expect(res.success).toBe(false);
    if (!res.success) expect(res.error.issues[0].message).toBe("Informe o giro");
  });

  it("6.1 - Caso o giro seja de um tipo diferente retornar 'Giro inválido'", () => {
    const res = itemMedicaoSchema.safeParse({ ...itemValidoBase, giro: 123 as any });
    expect(res.success).toBe(false);
    if (!res.success) expect(res.error.issues[0].message).toBe("Giro inválido");
  });

  it("6.2 - Caso o giro contenha números retornar 'O giro não pode conter números'", () => {
    const res = itemMedicaoSchema.safeParse({ ...itemValidoBase, giro: "Giro 50" });
    expect(res.success).toBe(false);
    if (!res.success) expect(res.error.issues[0].message).toBe("O giro não pode conter números");
  });

  // 7. Booleans / Defaults
  it("7.1 - Verificar se tem_chave é do tipo booleano default(false)", () => {
    const res = itemMedicaoSchema.parse({ ...itemValidoBase, tem_chave: undefined });
    expect(res.tem_chave).toBe(false);
  });

  it("7.2 - Verificar se nao_drenar é do tipo booleano default(false)", () => {
    const res = itemMedicaoSchema.parse({ ...itemValidoBase, nao_drenar: undefined });
    expect(res.nao_drenar).toBe(false);
  });

  it("7.3 - Verificar se tem_pelicula é do tipo booleano default(false)", () => {
    const res = itemMedicaoSchema.parse({ ...itemValidoBase, tem_pelicula: undefined });
    expect(res.tem_pelicula).toBe(false);
  });

  // 8. Calhas
  it("8 - Verificar se selecionar UMA_CALHA funciona", () => {
    const res = itemMedicaoSchema.safeParse({ ...itemValidoBase, calhas: "UMA_CALHA" });
    expect(res.success).toBe(true);
  });

  it("8.1 - Verificar se selecionar DUAS_CALHAS funciona", () => {
    const res = itemMedicaoSchema.safeParse({ ...itemValidoBase, calhas: "DUAS_CALHAS" });
    expect(res.success).toBe(true);
  });

  it("8.2 - Verificar se for null a calha dá erro 'Selecione a opção de calha'", () => {
    const res = itemMedicaoSchema.safeParse({ ...itemValidoBase, calhas: null });
    expect(res.success).toBe(false);
    if (!res.success) expect(res.error.issues[0].message).toBe("Selecione a opção de calha");
  });

  it("8.3 - Verificar se a calha enviada foi undefined ou fora dos tipos desejados dando o erro 'A calha é inválida!'", () => {
    const res = itemMedicaoSchema.safeParse({ ...itemValidoBase, calhas: "INVALIDA" as any });
    expect(res.success).toBe(false);
    if (!res.success) expect(res.error.issues[0].message).toBe("A calha é inválida!");
  });

  // 9. Soleira Porta Giro
  it('9 - Verificar se selecionar "SEM" de soleira_porta_giro funciona', () => {
    const res = itemMedicaoSchema.safeParse({ ...itemValidoBase, soleira_porta_giro: "SEM" });
    expect(res.success).toBe(true);
  });

  it('9.1 - Verificar se selecionar "COM" de soleira_porta_giro funciona', () => {
    const res = itemMedicaoSchema.safeParse({ ...itemValidoBase, soleira_porta_giro: "COM" });
    expect(res.success).toBe(true);
  });

  it("9.2 - Verificar se for null a soleira dá erro 'Selecione a soleira'", () => {
    const res = itemMedicaoSchema.safeParse({ ...itemValidoBase, soleira_porta_giro: null });
    expect(res.success).toBe(false);
    if (!res.success) expect(res.error.issues[0].message).toBe("Selecione a soleira");
  });

  it("9.3 - Verificar se a soleira enviada foi undefined ou fora dos tipos desejados dando o erro 'A soleira é inválida!'", () => {
    const res = itemMedicaoSchema.safeParse({ ...itemValidoBase, soleira_porta_giro: "INVALIDA" as any });
    expect(res.success).toBe(false);
    if (!res.success) expect(res.error.issues[0].message).toBe("A soleira é inválida!");
  });

  // 10. Acabamento
  it('10 - Verificar se selecionar "EIXO_VAO" de acabamento funciona', () => {
    const res = itemMedicaoSchema.safeParse({ ...itemValidoBase, acabamento: "EIXO_VAO" });
    expect(res.success).toBe(true);
  });

  it('10.1 - Verificar se selecionar "FACEADO_VAO" de acabamento funciona', () => {
    const res = itemMedicaoSchema.safeParse({ ...itemValidoBase, acabamento: "FACEADO_VAO" });
    expect(res.success).toBe(true);
  });

  it("10.2 - Verificar se for null o acabamento dá erro 'Selecione o acabamento'", () => {
    const res = itemMedicaoSchema.safeParse({ ...itemValidoBase, acabamento: null });
    expect(res.success).toBe(false);
    if (!res.success) expect(res.error.issues[0].message).toBe("Selecione o acabamento");
  });

  it("10.3 - Verificar se o acabamento enviado foi undefined ou fora dos tipos desejados dando o erro 'O acabamento é inválido!'", () => {
    const res = itemMedicaoSchema.safeParse({ ...itemValidoBase, acabamento: "INVALIDO" as any });
    expect(res.success).toBe(false);
    if (!res.success) expect(res.error.issues[0].message).toBe("O acabamento é inválido!");
  });

  // 11. Trilho Especial
  it('11 - Verificar se selecionar "TRILHO_PRIME" funciona', () => {
    const res = itemMedicaoSchema.safeParse({ ...itemValidoBase, trilho_especial: "TRILHO_PRIME" });
    expect(res.success).toBe(true);
  });

  it('11.1 - Verificar se selecionar "TRILHO_INVISIVEL" funciona', () => {
    const res = itemMedicaoSchema.safeParse({ ...itemValidoBase, trilho_especial: "TRILHO_INVISIVEL" });
    expect(res.success).toBe(true);
  });

  it("11.2 - Verificar se for null o trilho dá erro 'Selecione o trilho'", () => {
    const res = itemMedicaoSchema.safeParse({ ...itemValidoBase, trilho_especial: null });
    expect(res.success).toBe(false);
    if (!res.success) expect(res.error.issues[0].message).toBe("Selecione o trilho");
  });

  it("11.3 - Verificar se o trilho enviado foi undefined ou fora dos tipos desejados dando o erro 'O trilho é inválido!'", () => {
    const res = itemMedicaoSchema.safeParse({ ...itemValidoBase, trilho_especial: "INVALIDO" as any });
    expect(res.success).toBe(false);
    if (!res.success) expect(res.error.issues[0].message).toBe("O trilho é inválido!");
  });
});