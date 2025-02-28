/**
 * Telegram Web App client library
 * Provides utilities for working with Telegram Web App data
 * https://github.com/Telegram-Mini-Apps
 */
import { retrieveLaunchParams } from "@telegram-apps/sdk";
import { isTMA } from "@telegram-apps/bridge";

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

// Extended Telegram Web App data interface
export interface ExtendedTelegramWebAppData {
    tgWebAppData: {
        auth_date: string;
        chat_type?: string;
        chat_instance?: string;
        hash?: string;
        signature?: string;
        user?: TelegramUser & {
            allows_write_to_pm?: boolean;
        };
    };
    tgWebAppPlatform?: string;
    tgWebAppThemeParams?: {
        accent_text_color?: string;
        bg_color?: string;
        bottom_bar_bg_color?: string;
        button_color?: string;
        button_text_color?: string;
        destructive_text_color?: string;
        header_bg_color?: string;
        hint_color?: string;
        link_color?: string;
        secondary_bg_color?: string;
        section_bg_color?: string;
        section_header_text_color?: string;
        section_separator_color?: string;
        subtitle_text_color?: string;
        text_color?: string;
    };
    tgWebAppVersion?: string;
}

// Add this interface at the top of the file with other interfaces
interface TelegramWebApp {
    platform?: string;
    themeParams?: ExtendedTelegramWebAppData['tgWebAppThemeParams'];
    version?: string;
    initData: string;
}

/**
 * Safely retrieve launch params with error handling
 * @returns Launch params or null if error occurs
 */
export function safeRetrieveLaunchParams() {
    if (typeof window === "undefined" || !isTMA()) return null;

    try {
        return retrieveLaunchParams();
    } catch (error) {
        console.warn("Failed to retrieve Telegram launch params:", error);
        return null;
    }
}

/**
 * Check if the code is running in a Telegram Web App environment
 * @returns boolean indicating if Telegram Web App is available
 */
export function isTelegramWebApp(): boolean {
    return typeof window !== "undefined" && isTMA() && !!safeRetrieveLaunchParams();
}

/**
 * Get the Telegram user data from WebApp
 * @returns TelegramUser object or null if not available
 */
export function getTelegramUser(): TelegramUser | null {
    if (!isTelegramWebApp()) {
        return null;
    }

    const launchParams = safeRetrieveLaunchParams();
    return (launchParams?.user as TelegramUser) || null;
}

/**
 * Get the full Telegram Web App init data
 * @returns TelegramWebAppInitData object or null if not available
 */
export function getTelegramInitData(): TelegramWebAppInitData | null {
    if (!isTelegramWebApp()) {
        return null;
    }

    const launchParams = safeRetrieveLaunchParams();
    return {
        user: launchParams?.user as TelegramUser | undefined,
        auth_date: launchParams?.auth_date as number | undefined,
        hash: launchParams?.hash as string | undefined,
        query_id: launchParams?.query_id as string | undefined,
    };
}

/**
 * Parse the raw initData string from Telegram Web App
 * @returns Parsed TelegramWebAppInitData object or null if parsing fails
 */
export function parseTelegramInitData(): TelegramWebAppInitData | null {
    if (!isTelegramWebApp()) {
        return null;
    }

    try {
        return getTelegramInitData();
    } catch (error) {
        console.error("Failed to parse Telegram initData:", error);
        return null;
    }
}

/**
 * Get extended Telegram Web App data including platform, theme params, and version
 * @returns ExtendedTelegramWebAppData object or null if not available
 */
export function getExtendedTelegramData(): ExtendedTelegramWebAppData | null {
    if (!isTelegramWebApp() || typeof window === "undefined") {
        return null;
    }

    try {
        const launchParams = safeRetrieveLaunchParams();
        if (!launchParams) return null;

        // Access Telegram WebApp object directly for additional data
        const tgWebApp = window.Telegram?.WebApp as TelegramWebApp;
        const tgWebAppData = launchParams.tgWebAppData;
        // Format auth_date as ISO string if available
        const authDate = tgWebAppData?.auth_date as number | undefined;
        const authDateString = authDate ? new Date(authDate * 1000).toISOString() : new Date().toISOString();

        return {
            tgWebAppData: {
                auth_date: authDateString,
                chat_type: tgWebAppData?.chat_type,
                chat_instance: tgWebAppData?.chat_instance as string | undefined,
                hash: tgWebAppData?.hash as string | undefined,
                signature: tgWebAppData?.signature as string | undefined,
                user: tgWebAppData?.user
                    ? {
                        ...(tgWebAppData.user as TelegramUser),
                        allows_write_to_pm: true,
                    }
                    : undefined,
            },
            tgWebAppPlatform: tgWebApp?.platform || undefined,
            tgWebAppThemeParams: tgWebApp?.themeParams || undefined,
            tgWebAppVersion: tgWebApp?.version || undefined,
        };
    } catch (error) {
        console.error("Failed to get extended Telegram data:", error);
        return null;
    }
}
