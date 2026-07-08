import { useCallback, useEffect, useState } from "react";
import type { BeforeInstallPromptEvent } from "@/types/pwa";

const DISMISS_KEY = "pwa-install-dismissed";

function isStandaloneMode() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in navigator &&
      (navigator as Navigator & { standalone?: boolean }).standalone === true)
  );
}

function isIosDevice() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

export function usePwaInstall() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    if (isStandaloneMode() || localStorage.getItem(DISMISS_KEY) === "true") {
      return;
    }

    const ios = isIosDevice();
    setIsIos(ios);

    if (ios) {
      setShowPrompt(true);
      return;
    }

    const handleBeforeInstallPrompt = (event: BeforeInstallPromptEvent) => {
      event.preventDefault();
      setDeferredPrompt(event);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const dismissPrompt = useCallback(() => {
    localStorage.setItem(DISMISS_KEY, "true");
    setShowPrompt(false);
    setDeferredPrompt(null);
  }, []);

  const installApp = useCallback(async () => {
    if (isIos) {
      dismissPrompt();
      return;
    }

    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    setDeferredPrompt(null);
    setShowPrompt(false);

    if (outcome === "dismissed") {
      localStorage.setItem(DISMISS_KEY, "true");
    }
  }, [deferredPrompt, dismissPrompt, isIos]);

  return {
    showPrompt,
    isIos,
    canInstall: isIos || Boolean(deferredPrompt),
    installApp,
    dismissPrompt,
  };
}
