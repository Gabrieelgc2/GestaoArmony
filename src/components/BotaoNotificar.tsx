import { usePwaNotification } from "../hooks/usePwaNotification";

export function BotaoNotificar() {
  const { isGranted, requestPermission } = usePwaNotification();

  const handleToggle = async () => {
    // Se já estiver concedido, ignora a ação
    if (isGranted) return;

    try {
      // 1. Pede a permissão nativa PRIMEIRO (independente do SW)
      const aceitou = await requestPermission();
      if (!aceitou) return;

      const payload = {
        body: "Você receberá notificações sobre atualizações importantes de obras e prazos.",
        icon: "/pwa-192.png",
        vibrate: [200, 100, 200],
      };

      // 2. Proteção contra travamento do Service Worker
      if ("serviceWorker" in navigator) {
        const swPromise = navigator.serviceWorker.ready;
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout de resposta do SW")), 3000)
        );

        const reg = (await Promise.race([
          swPromise,
          timeoutPromise,
        ])) as ServiceWorkerRegistration;

        await reg.showNotification("Notificações ativadas!", payload as NotificationOptions);
      }
    } catch (error) {
      console.error("Erro ao ativar notificação:", error);
      alert(`Aviso: Notificação ativada no navegador, mas o Service Worker retornou: ${error}`);
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isGranted}
      className={`w-full flex items-center justify-between p-3 border rounded-xl transition-all select-none ${
        isGranted
          ? "bg-emerald-50/50 border-emerald-200 cursor-default"
          : "bg-gray-50 hover:bg-gray-100 border-gray-200 cursor-pointer active:scale-[0.98]"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-base">{isGranted ? "🔔" : "🔕"}</span>
        <div className="flex flex-col text-left">
          <span className="text-xs font-semibold text-gray-800">
            Alertas no Celular
          </span>
          <span className="text-[10px] text-gray-500">
            {isGranted ? "Notificações ativas" : "Receba avisos de obras e pendências"}
          </span>
        </div>
      </div>

      {/* Toggle visual direto sem depender de <input> escondido */}
      <div
        className={`w-11 h-6 rounded-full relative transition-colors duration-200 ease-in-out ${
          isGranted ? "bg-emerald-500" : "bg-gray-300"
        }`}
      >
        <div
          className={`w-5 h-5 bg-white rounded-full absolute top-[2px] transition-transform duration-200 ease-in-out shadow-sm ${
            isGranted ? "translate-x-[22px]" : "translate-x-[2px]"
          }`}
        />
      </div>
    </button>
  );
}