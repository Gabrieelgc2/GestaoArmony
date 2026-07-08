import { Download, Smartphone } from "lucide-react";
import Modal from "@/components/ui/Modal/Modal";
import { usePwaInstall } from "@/hooks/usePwaInstall";

export default function PwaInstallPrompt() {
  const { showPrompt, isIos, canInstall, installApp, dismissPrompt } =
  usePwaInstall();

  if (!showPrompt) return null;

  return (
    <Modal open={showPrompt} onClose={dismissPrompt}>
      <div className="space-y-6 pt-2">
        <div className="flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
            {isIos ? (
              <Smartphone className="h-7 w-7 text-[#003D9B]" />
            ) : (
              <Download className="h-7 w-7 text-[#003D9B]" />
            )}
          </div>
        </div>

        <div className="space-y-2 text-center">
          <h2 className="text-xl font-bold text-[#191C1E]">
            Instalar Gestão Armony
          </h2>

          {isIos ? (
            <p className="text-base text-[#434654]">
              Para instalar no iPhone ou iPad, toque em{" "}
              <span className="font-semibold">Compartilhar</span> e depois em{" "}
              <span className="font-semibold">Adicionar à Tela de Início</span>.
            </p>
          ) : (
            <p className="text-base text-[#434654]">
              Deseja baixar o app para acessar com mais rapidez e usar offline?
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={dismissPrompt}
            className="w-full rounded-xl bg-[#C3C6D6] py-3 font-semibold text-[#434654] transition hover:bg-[#BFC3D1]"
          >
            Continuar na web
          </button>

          {canInstall && (
            <button
              type="button"
              onClick={installApp}
              className="w-full rounded-xl bg-blue-800 py-3 font-semibold text-white transition hover:bg-blue-900"
            >
              {isIos ? "Entendi" : "Baixar app"}
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}
