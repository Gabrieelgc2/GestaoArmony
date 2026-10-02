import { z } from "zod";

export const itemMedicaoSchema = z.object({
    descricao_item: z.string({message: "Descrição inválida"}).min(1, "A descrição do item é obrigatória"),
    ambiente: z.string({message: "Ambiente inválido"}).min(1, "Informe o ambiente"),
    quantidade: z.coerce.number({message: "Quantidade inválida"}).min(1, "A quantidade deve ser no mínimo 1"),
    largura: z.coerce.number({ message: "Largura inválida" }).min(1, "Informe a largura"),
    altura: z.coerce.number({ message: "Altura inválida" }).min(1, "Informe a altura"),
    peitoril: z.coerce.number({ message: "Peitoril inválido" }).min(1, "Informe o peitoril"),
    giro: z
        .string({ message: "Giro inválido" })
        .min(1, "Informe o giro")
        .regex(/^[^0-9]+$/, "O giro não pode conter números"),
    tem_chave: z.boolean().default(false),
    nao_drenar: z.boolean().default(false),
    tem_pelicula: z.boolean().default(false),

        calhas: z
            .enum(["UMA_CALHA", "DUAS_CALHAS"], {
                message: "A calha é inválida!",
            })
        .nullable()
        .refine((val) => val !== null, {
            message: "Selecione a opção de calha",
        }),
    soleira_porta_giro: z
        .enum(["SEM", "COM"], {
            message: "A soleira é inválida!",
        })
        .nullable()
        .refine((val) => val !== null, {
            message: "Selecione a soleira",
        }),

    acabamento: z
        .enum(["EIXO_VAO", "FACEADO_VAO"], {
            message: "O acabamento é inválido!"
        })
        .nullable()
        .refine((val) => val !== null, {
            message: "Selecione o acabamento",
        }),

    trilho_especial: z
        .enum(["TRILHO_PRIME", "TRILHO_INVISIVEL"], {
            message: "O trilho é inválido!"
        })
        .nullable()
        .refine((val) => val !== null, {
            message: "Selecione o trilho"
        }),

    observacao_item: z.string().optional(),
});

export const relatorioMedicaoSchema = z.object({
    observacoesGerais: z.string().optional(),
    itens: z.array(itemMedicaoSchema).min(1, "É necessário ter pelo menos um item no relatório."),
});

export type RelatorioMedicaoFormData = z.infer<typeof relatorioMedicaoSchema>;