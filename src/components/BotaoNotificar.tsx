import { usePwaNotification } from "../hooks/usePwaNotification";

export function BotaoNotificar() {
    const { isGranted, requestPermission } = usePwaNotification();

    const handleAtivar = async () => {
        const aceitou = await requestPermission();
        if (aceitou) {
            if ("serviceWorker" in navigator) {
                const registration = await navigator.serviceWorker.ready;
                registration.showNotification("Notificações ativadas!", {
                    body: "Você receberá notificações sobre atualizações importantes.",
                    icon: "/pwa-192.png",
                    vibrate: [200, 100, 200],
                } as NotificationOptions
                );
            } else {
                new Notification("Notificações ativadas!", {
                    body: "Você receberá notificações sobre atualizações importantes.",
                });
            }
        }
    };
    if (isGranted) {
        return <p className="text-green-600 text-xs">🔔 Notificações ativadas!</p>
    }

    return (
        <button
            onClick={handleAtivar}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
        >
            Ativar Notificações
        </button>
    );
};