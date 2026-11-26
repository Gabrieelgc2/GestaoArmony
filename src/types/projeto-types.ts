import type { Dispatch, SetStateAction } from "react";
import type { FaseKey, Profile, Projeto } from "@/utils/painelPlanejadorConfig";

export type ProjetoCardActions = {
  inspetores: Profile[];
  datasPrevistas: Record<string, string>;
  setDatasPrevistas: Dispatch<SetStateAction<Record<string, string>>>;
  horariosPrevistos: Record<string, string>;
  setHorariosPrevistos: Dispatch<SetStateAction<Record<string, string>>>;
  engenheirosSelecionados: Record<string, string>;
  setEngenheirosSelecionados: Dispatch<SetStateAction<Record<string, string>>>;
  salvandoId: string | null;
  onAgendarInspecao: (projetoId: string, fase: FaseKey) => Promise<void>;
  onAvancarFase: (projeto: Projeto) => Promise<void>;
  verificarDisponibilidadeEngenheiro: (inspetorId: string, projetoId: string, fase: FaseKey) => boolean;
};

export type ProjetoCardProps = {
  projeto: Projeto;
  actions: ProjetoCardActions;
};