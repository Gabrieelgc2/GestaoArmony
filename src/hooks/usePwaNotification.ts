import {useCallback, useEffect, useState} from 'react';

export function usePwaNotification (){
    const [permission, setPermission] = useState<NotificationPermission>("default");

    useEffect(() => {
        if("Notification" in window){
            setPermission(Notification.permission);
        }
    }, []);

    const requestPermission = useCallback(async () => {
        if(!("Notification" in window)) {
            console.warn("Este navegador não suporta notificações.");
            return false;
        }
        const res = await Notification.requestPermission();
        setPermission(res);
        return res === "granted";
    }, []);
    return {
        permission,
        isGranted: permission === "granted",
        requestPermission,
    };
}