import { useEffect, useState, useRef } from 'react';

export function UpdatePrompt() {
  const [hasUpdate, setHasUpdate] = useState(false);
  const currentVersion = useRef(null);

  useEffect(() => {
    const checkVersion = async () => {
      try {
        // O parâmetro ?t= evita qualquer cache residual de rede
        const response = await fetch(`/version.json?t=${Date.now()}`, {
          cache: 'no-store',
        });
        
        if (!response.ok) return;
        const data = await response.json();

        // Salva a versão inicial quando o usuário abre o site
        if (!currentVersion.current) {
          currentVersion.current = data.version;
        } 
        // Se a versão no servidor mudou, ativa o aviso
        else if (currentVersion.current !== data.version) {
          setHasUpdate(true);
        }
      } catch (error) {
        console.error('Erro ao verificar atualização:', error);
      }
    };

    // Verifica assim que carrega
    checkVersion();

    // Verifica a cada 1 minuto (60000 ms)
    const interval = setInterval(checkVersion, 60000);

    // Verifica imediatamente quando o usuário volta para a aba
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkVersion();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handleReload = () => {
    // Recarrega a página forçando a busca dos novos arquivos
    window.location.reload();
  };

  if (!hasUpdate) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-4 rounded-xl bg-slate-900 px-5 py-4 text-white shadow-2xl border border-slate-700">
      <div className="flex flex-col">
        <span className="text-sm font-semibold">Nova versão disponível</span>
        <span className="text-xs text-slate-300">
          Atualize para carregar as melhorias mais recentes.
        </span>
      </div>
      
      <button
        onClick={handleReload}
        className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-500 active:scale-95 cursor-pointer"
      >
        Atualizar agora
      </button>
    </div>
  );
}