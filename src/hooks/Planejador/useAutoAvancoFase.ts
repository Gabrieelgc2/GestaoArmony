import { useEffect, useRef } from "react";
import type { Projeto } from "@/utils/painelPlanejadorConfig";
import { obterInspecaoAtual, projetoPodeAvancar } from "@/utils/projeto.utils";

export function useAutoAvancoFase(
  projetos: Projeto[],
  onAvancar: (projeto: Projeto) => Promise<void>,
) {
  const processando = useRef(new Set<string>());
  const onAvancarRef = useRef(onAvancar);

  useEffect(() => {
    onAvancarRef.current = onAvancar;
  }, [onAvancar]);

  useEffect(() => {
    for (const projeto of projetos) {
      const inspecaoAtual = obterInspecaoAtual(projeto);
      if (
        !processando.current.has(projeto.id) &&
        projeto.status !== "NOVO" &&
        projeto.status !== "PRODUCAO" &&
        projetoPodeAvancar(projeto, inspecaoAtual)
      ) {
        processando.current.add(projeto.id);
        void onAvancarRef.current(projeto).finally(() => {
        processando.current.delete(projeto.id);
        });
      }
    }
  }, [projetos]);
}