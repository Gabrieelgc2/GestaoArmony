import { supabase } from "@/supabaseClient";
import { createClient } from "@supabase/supabase-js";
import type {
    Empresa_Usuario,
    EditarUsuarioInput,
    NovoUsuarioInput,
    ResultadoEditarUsuario,
    ResultadoSalvarUsuario,
    UsuarioAssociado,
    Usuario_Disponivel,
    UsuarioElegivel,
} from "@/types/admin.types";

const empresasUsuariosSelect = `
codigo_hetmo,
nome,
cnpj,
cidade,
ativa,
usuario_empresa (
usuario_id,
empresa_codigo_hetmo,
criado_em
)
`;

const usuariosSelect = `
id,
nome,
email,
telefone,
ativo,
usuario_perfil (
perfil_codigo
)
`

export async function carregarDadosMaster(): Promise<{
    empresas: Empresa_Usuario[];
    usuarios: Usuario_Disponivel[];
}> {

    const [empresasResult, usuariosResult] = await Promise.all([
        supabase.from("empresas").select(empresasUsuariosSelect).order("nome"),
        supabase.from("usuarios").select(usuariosSelect).order("nome"),
    ]);
    if (empresasResult.error) throw empresasResult.error;
    if (usuariosResult.error) throw usuariosResult.error;

    type UsuarioComPerfis = {
        id: string;
        nome: string;
        email: string;
        telefone: string | null;
        ativo: boolean;
        usuario_perfil: { perfil_codigo: string }[];
    };
    const usuarios = (usuariosResult.data ?? []) as unknown as UsuarioComPerfis[];

    return {
        empresas: (empresasResult.data ?? []) as unknown as Empresa_Usuario[],
        usuarios: usuarios.map((usuario) => {
            const perfis = usuario.usuario_perfil.map((perfil) => perfil.perfil_codigo);
            const sigla = usuario.nome
                .trim()
                .split(/\s+/)
                .slice(0, 2)
                .map((parte) => parte[0] ?? "")
                .join("")
                .toUpperCase();
            return {
                ...usuario,
                perfis,
                sigla,
                situacao: usuario.ativo ? "Ativo" as const : "Inativo" as const,
            };
        }) as Usuario_Disponivel[],
    };
}

export async function carregarUsuariosDisponiveis(codigoHetmo: number, busca?: string): Promise<UsuarioElegivel[]> {
    const { data, error } = await supabase.rpc("usuarios_disponiveis_para_empresa", {
        p_empresa: codigoHetmo,
        p_busca: busca ?? null,
    });
    if (error) throw error;
    return (data ?? []) as UsuarioElegivel[];
}

export async function carregarUsuariosDaEmpresa(codigoHetmo: number): Promise<UsuarioAssociado[]> {
    const { data, error } = await supabase.rpc("usuarios_da_empresa", {
        p_empresa: codigoHetmo,
    });
    if (error) throw error;
    return (data ?? []) as UsuarioAssociado[];
}

export async function associarUsuarioEmpresa(usuarioId: string, codigoHetmo: number) {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError) throw authError;
    const { data, error } = await supabase.rpc("associar_usuario_empresa", {
        p_usuario: usuarioId,
        p_empresa: codigoHetmo,
        p_por: user?.id ?? null,
    });
    if (error) throw error;
    return data as "associado" | "ja_associado";
}

export async function salvarNovoUsuario(input: NovoUsuarioInput): Promise<ResultadoSalvarUsuario> {
    const { data: { user: usuarioCriador }, error: erroAuthAtual } = await supabase.auth.getUser();
    if (erroAuthAtual) throw erroAuthAtual;
    if (!usuarioCriador) throw new Error("Sua sessão expirou. Entre novamente para cadastrar um usuário.");

    const clienteAuthIsolado = createClient(
        import.meta.env.VITE_SUPABASE_URL,
        import.meta.env.VITE_SUPABASE_ANON_KEY,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
                detectSessionInUrl: false,
            },
        },
    );
    const email = input.email.trim().toLowerCase();
    const { data: dadosAuth, error: erroCriacaoAuth } = await clienteAuthIsolado.auth.signUp({
        email,
        password: input.senha,
    });
    if (erroCriacaoAuth) {
        if (erroCriacaoAuth.code === "user_already_exists" || erroCriacaoAuth.code === "email_exists") {
            throw new Error("Já existe uma conta com este e-mail.");
        }
        throw erroCriacaoAuth;
    }

    const usuarioAuth = dadosAuth.user;
    if (!usuarioAuth) throw new Error("O Supabase Auth não retornou o usuário criado.");
    if (usuarioAuth.identities?.length === 0) throw new Error("Já existe uma conta com este e-mail.");

    const { data, error } = await supabase.rpc("criar_usuario", {
        p_id: usuarioAuth.id,
        p_nome: input.nome.trim(),
        p_email: email,
        p_telefone: input.telefone?.trim() || null,
        p_ativo: input.ativo,
        p_perfis: input.perfis,
        p_empresas: input.empresas,
        p_por: usuarioCriador.id,
    });
    if (error) {
        if (error.code === "23505") {
            throw new Error("Este e-mail já está sendo usado por outro usuário. A conta já foi criada no Auth, mas os dados administrativos não foram salvos.");
        }
        if (error.code === "23503") {
            throw new Error("O Supabase Auth não reconheceu o ID do usuário. A conta pode ter sido criada no Auth, mas os dados administrativos não foram salvos.");
        }
        throw new Error(
            `A conta foi criada no Auth, mas não foi possível salvar os dados administrativos${error.code ? ` (${error.code})` : ""}: ${error.message}`,
        );
    }
    if (data !== "criado" && data !== "atualizado") {
        throw new Error(`O RPC criar_usuario retornou um resultado inesperado: ${String(data)}.`);
    }
    return data;
}

export async function editarUsuario(input: EditarUsuarioInput): Promise<ResultadoEditarUsuario> {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError) throw authError;
    if (!user) throw new Error("Sua sessão expirou. Entre novamente para editar o usuário.");

    const { data, error } = await supabase.rpc("editar_usuario", {
        p_id: input.id,
        p_nome: input.nome.trim(),
        p_email: input.email.trim().toLowerCase(),
        p_telefone: input.telefone?.trim(),
        p_ativo: input.ativo,
        p_perfis: input.perfis,
        p_empresas: input.empresas,
        p_por: user.id,
    });
    if (error) {
        if (error.code === "23505") {
            throw new Error("Já existe outro usuário com este e-mail.");
        }
        throw error;
    }
    if (data !== "atualizado") {
        throw new Error(`O RPC editar_usuario retornou um resultado inesperado: ${String(data)}.`);
    }
    return data;
}

export async function removerUsuarioEmpresa(usuarioId: string, codigoHetmo: number, forcar = false) {
    const { data, error } = await supabase.rpc("remover_usuario_empresa", {
        p_usuario: usuarioId,
        p_empresa: codigoHetmo,
        p_forcar: forcar,
    });
    if (error) throw error;
    return data as "removido" | "nao_associado" | "ultima_empresa" | "tem_visitas_agendadas";
}

export async function atualizarEmpresa(empresa: Empresa_Usuario): Promise<void> {
    const { error } = await supabase
        .from("empresas")
        .update({
            nome: empresa.nome,
            cnpj: empresa.cnpj,
            cidade: empresa.cidade,
            ativa: empresa.ativa,
        })
        .eq("codigo_hetmo", empresa.codigo_hetmo);
    if (error) throw error;
}