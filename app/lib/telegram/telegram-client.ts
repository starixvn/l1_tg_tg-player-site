/**
 * Telegram Web App client library
 * Provides utilities for working with Telegram Web App data
 */

// Telegram User interface based on Telegram Bot API
export interface TelegramUser {
    id: number;
    is_bot: boolean;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    is_premium?: boolean;
    photo_url?: string;
}

// Telegram Web App init data interface
export interface TelegramWebAppInitData {
    query_id?: string;
    user?: TelegramUser;
    auth_date?: number;
    hash?: string;
}

// Global window interface with Telegram Web App
declare global {
    interface Window {
        Telegram?: {
            WebApp?: {
                initData: string;
                initDataUnsafe: TelegramWebAppInitData;
            };
        };
    }
}

/**
 * Check if the code is running in a Telegram Web App environment
 * @returns boolean indicating if Telegram Web App is available
 */
export function isTelegramWebApp(): boolean {
    return typeof window !== "undefined" && !!window.Telegram?.WebApp;
}

/**
 * Get the Telegram user data from initDataUnsafe
 * @returns TelegramUser object or null if not available
 */
export function getTelegramUser(): TelegramUser | null {
    if (!isTelegramWebApp()) {
        return null;
    }

    return window.Telegram?.WebApp?.initDataUnsafe?.user || null;
}

/**
 * Get the full Telegram Web App init data
 * @returns TelegramWebAppInitData object or null if not available
 */
export function getTelegramInitData(): TelegramWebAppInitData | null {
    if (!isTelegramWebApp()) {
        return null;
    }

    return window.Telegram?.WebApp?.initDataUnsafe || null;
}

/**
 * Parse the raw initData string from Telegram Web App
 * @returns Parsed TelegramWebAppInitData object or null if parsing fails
 */
export function parseTelegramInitData(): TelegramWebAppInitData | null {
    if (!isTelegramWebApp() || !window.Telegram?.WebApp?.initData) {
        return null;
    }

    try {
        // The initData is a URL-encoded string of key=value pairs
        const urlParams = new URLSearchParams(window.Telegram.WebApp.initData);
        const user = urlParams.get("user");

        if (!user) {
            return null;
        }

        return {
            user: JSON.parse(user) as TelegramUser,
            auth_date: Number(urlParams.get("auth_date")),
            hash: urlParams.get("hash") || undefined,
            query_id: urlParams.get("query_id") || undefined,
        };
    } catch (error) {
        console.error("Failed to parse Telegram initData:", error);
        return null;
    }
}
