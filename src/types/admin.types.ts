export type AdminTab = 'empresas' | 'usuarios'
export type PerfilUsuario = 'master' | 'planejador' | 'engenheiro';

export interface UsuarioEmpresaVinculo {
    criado_em: string;
    empresa_codigo_hetmo: number;
    usuario_id: string;
}

export interface Empresa_Usuario {
    nome: string;
    cidade: string | null;
    codigo_hetmo: number;
    cnpj: string | null;
    ativa: boolean;
    usuario_empresa: UsuarioEmpresaVinculo[];
}

export interface Usuario_Disponivel extends UsuarioElegivel {
    telefone: string | null;
    ativo: boolean;
    sigla: string;
    situacao: 'Ativo' | 'Inativo';
}

export interface UsuarioElegivel {
    id: string;
    nome: string;
    email: string;
    perfis: string[];
}

export interface UsuarioAssociado extends UsuarioElegivel {
    ativo: boolean;
    associado_em: string;
}

export interface NovoUsuarioInput {
    nome: string;
    email: string;
    telefone: string | null;
    senha: string;
    ativo: boolean;
    perfis: PerfilUsuario[];
    empresas: number[];
}

export interface EditarUsuarioInput {
    id: string;
    nome: string;
    telefone: string | null;
    email: string;
    ativo: boolean;
    perfis: PerfilUsuario[] | null;
    empresas: number[] | null;
}

export type ResultadoSalvarUsuario = 'criado' | 'atualizado';
export type ResultadoEditarUsuario = 'atualizado';

export const PAGE_SIZE = 10
