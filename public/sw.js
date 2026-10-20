self.addEventListener("notificationclick", (event) => {
  // 1. Fecha o banner de notificação da tela
  event.notification.close();

  // 2. Recupera a URL ou rota da obra passada no data do payload
  const targetUrl = event.notification.data?.url || "/";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      // Se a aba do app já estiver aberta, foca nela
      for (const client of clientList) {
        if (client.url.includes(targetUrl) && "focus" in client) {
          return client.focus();
        }
      }
      // Se o app estiver fechado no celular, abre o link
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});