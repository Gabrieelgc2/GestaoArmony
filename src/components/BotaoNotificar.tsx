import { usePwaNotification } from "../hooks/usePwaNotification";

export function BotaoNotificar() {
    const { isGranted, requestPermission } = usePwaNotification();

    const handleToggle = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.checked || isGranted) return;
        
        const aceitou = await requestPermission();
        if (!aceitou) return;

        const payload = {
            body: "Você receberá notificações sobre atualizações importantes.",
            icon: "/pwa-192.png",
            vibrate: [200, 100, 200],
        };

        if ("serviceWorker" in navigator) {
            const reg = await navigator.serviceWorker.ready;
            reg.showNotification("Notificações ativadas!", payload as NotificationOptions);
        }
    };

    return (
        <label className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl cursor-pointer transition-all select-none">
            <div className="flex items-center gap-3">
                <span className="text-base">{isGranted ? "🔔" : "🔕"}</span>
                <div className="flex flex-col">
                    <span className="text-xs font-semibold text-gray-800">
                        Alertas no Celular
                    </span>
                    <span className="text-[10px] text-gray-500">
                        {isGranted ? "Notificações ativas" : "Receba avisos de obras e pendências"}
                    </span>
                </div>
            </div>

            <div className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    checked={isGranted}
                    onChange={handleToggle}
                    disabled={isGranted}
                    className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
            </div>
        </label>
    );
}