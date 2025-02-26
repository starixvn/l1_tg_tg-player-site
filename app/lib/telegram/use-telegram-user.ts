import { useState, useEffect } from "react";
import { TelegramUser, getTelegramUser, isTelegramWebApp } from "./telegram-client";

/**
 * React hook to access Telegram user data
 * @returns Object containing Telegram user data and loading state
 */
export function useTelegramUser() {
    const [user, setUser] = useState<TelegramUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [isTelegramApp, setIsTelegramApp] = useState<boolean>(false);

    useEffect(() => {
        // Check if running in Telegram Web App
        const isInTelegram = isTelegramWebApp();
        setIsTelegramApp(isInTelegram);

        if (!isInTelegram) {
            console.log("Not in Telegram");
            setLoading(false);
            return;
        }

        try {
            // Get user data from Telegram Web App
            const userData = getTelegramUser();
            console.log(userData);
            setUser(userData);
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Failed to get Telegram user data"));
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        user,
        loading,
        error,
        isTelegramApp,
    };
}
