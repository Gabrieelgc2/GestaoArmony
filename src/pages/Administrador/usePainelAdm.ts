import { useCallback, useState, useEffect } from "react";
import { carregarDadosMaster } from "./useDados";
import type { Empresa_Usuario, Usuario_Disponivel } from "@/types/admin.types";

export function usePainelAdm() {
    const [empresas, setEmpresas] = useState<Empresa_Usuario[]>([]);
    const [usuarios, setUsuarios] = useState<Usuario_Disponivel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const carregarDados = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const dados = await carregarDadosMaster();
            setEmpresas(dados.empresas);
            setUsuarios(dados.usuarios);
        } catch (cause) {
            console.log(cause)
            setError(cause instanceof Error ? cause.message : "Não foi possível carregar os dados administrativos.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void carregarDados();
    }, [carregarDados]);

    return {
        empresas,
        usuarios,
        loading,
        error,
        carregarDados,
    };
}