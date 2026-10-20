import { useState, useEffect } from "react";
import { usePwaNotification } from "../hooks/usePwaNotification";

export function BotaoNotificar() {
  const { isGranted, requestPermission } = usePwaNotification();
  
  // Estado local para garantir o movimento instantâneo da animação
  const [ativoLocal, setAtivoLocal] = useState(isGranted);

  // Sincroniza caso o hook mude externamente
  useEffect(() => {
    setAtivoLocal(isGranted);
  }, [isGranted]);

  const handleToggle = async () => {
    if (ativoLocal) return;

    try {
      const aceitou = await requestPermission();
      
      if (aceitou) {
        // 1. Força o deslizamento da bolinha imediatamente no estado local
        setAtivoLocal(true);

        const payload = {
          body: "Você receberá notificações sobre atualizações importantes de obras.",
          icon: "/pwa-192.png",
          vibrate: [200, 100, 200],
        };

        if ("serviceWorker" in navigator) {
          const swPromise = navigator.serviceWorker.ready;
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Timeout SW")), 3000)
          );

          const reg = (await Promise.race([
            swPromise,
            timeoutPromise,
          ])) as ServiceWorkerRegistration;

          await reg.showNotification("Notificações ativadas!", payload as NotificationOptions);
        }
      }
    } catch (error) {
      console.error("Erro ao ativar notificação:", error);
    }
  };

  const estaAtivo = isGranted || ativoLocal;

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={estaAtivo}
      className={`w-full flex items-center justify-between p-3 border rounded-xl transition-all duration-300 select-none ${
        estaAtivo
          ? "bg-emerald-50 border-emerald-200 cursor-default"
          : "bg-gray-50 hover:bg-gray-100 border-gray-200 cursor-pointer active:scale-[0.98]"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-base">{estaAtivo ? "🔔" : "🔕"}</span>
        <div className="flex flex-col text-left">
          <span className="text-xs font-semibold text-gray-800">
            Alertas no Celular
          </span>
          <span className="text-[10px] text-gray-500">
            {estaAtivo ? "Notificações ativas" : "Receba avisos de obras e pendências"}
          </span>
        </div>
      </div>

      {/* Container do Toggle */}
      <div
        className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-300 ease-in-out ${
          estaAtivo ? "bg-emerald-500" : "bg-gray-300"
        }`}
      >
        {/* Bolinha branca com deslocamento via style direto para evitar falhas de compilação CSS */}
        <div
          className="w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out"
          style={{
            transform: estaAtivo ? "translateX(24px)" : "translateX(0px)",
          }}
        />
      </div>
    </button>
  );
}