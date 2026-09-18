/*
TESTE 1 => NOME INVÁLIDO NÃO É ENCONTRADO
TESTE 2 => NÚMERO DA OBRA INVÁLIDO NÃO É ENCONTRADO
TESTE 3 => NOME VÁLIDO É ENCONTRADO
TESTE 4 => NÚMERO DA OBRA VÁLIDO É ENCONTRADO
TESTE 5 => NOME E NÚMERO DA OBRA VÁLIDOS SÃO ENCONTRADOS
TESTE 6 => NOME E NÚMERO DA OBRA INVÁLIDOS NÃO SÃO ENCONTRADOS
*/
import {filtrarProjetosPorBusca, Projeto} from "../src/types/filtrarProjeto"
import {describe, it, expect} from "vitest";
describe("Filtro de busca pela Lupa", () => {
const mockProjetos: Projeto[] = [
{id: 1, name_project: "Reforma Hospital Central", order_number: "102030", status: "planejamento"},
{id: 2, name_project: "Construção Edifício Plaza", order_number: "405060", status: "execucao"},
{id: 3, name_project: "Pintura Escola Municipal", order_number: "708090", status: "concluido"},
];

it("TESTE 1: não deve encontrar quando o nome é inválido", () => {
const resultado = filtrarProjetosPorBusca(mockProjetos, "Aeroporto Inexistentes")
expect(resultado).toHaveLength(0);
});
it("TESTE 2: não deve encontrar quando o número da obra é inválido", () => {
const resultado = filtrarProjetosPorBusca(mockProjetos, "999999");
expect(resultado).toHaveLength(0);
});
it("TESTE 3: deve encontrar o projeto quando o nome é válido", () => {
const resultado = filtrarProjetosPorBusca(mockProjetos, "Hospital");
expect(resultado).toHaveLength(1);
});
it("TESTE 4: deve encontrar o projeto quando o número da obra é válido", () => {
const resultado = filtrarProjetosPorBusca(mockProjetos, "405060");
expect(resultado).toHaveLength(1);
expect(resultado[0].id).toBe(2);
});
it("TESTE 5: deve encontrar quando busca por termo presente em nome ou número de obra", () => {
    const porNome = filtrarProjetosPorBusca(mockProjetos, "Hospital");
    const porNumero = filtrarProjetosPorBusca(mockProjetos, "102030");
    expect(porNome).toHaveLength(1);
    expect(porNumero).toHaveLength(1);
    expect(porNome[0].id).toBe(porNumero[0].id);
});
it("TESTE 6: não deve encontrar quando nome e número informados são totalmente inexistentes", () => {
    const resultado = filtrarProjetosPorBusca(mockProjetos, "Hotel Fantasma 000000")
    expect(resultado).toHaveLength(0);
});
});