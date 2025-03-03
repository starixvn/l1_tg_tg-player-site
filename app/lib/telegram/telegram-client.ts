/**
 * Telegram Web App client library
 * Provides utilities for working with Telegram Web App data
 * https://github.com/Telegram-Mini-Apps
 */
import { retrieveLaunchParams, type LaunchParams, type User } from "@telegram-apps/sdk";
import { isTMA } from "@telegram-apps/bridge";

// Telegram User interface based on Telegram Bot API

// Telegram Web App init data interface
export interface TelegramWebAppInitData {
    query_id?: string;
    user?: User;
    auth_date?: number;
    hash?: string;
}

// Extended Telegram Web App data interface
export interface ExtendedTelegramWebAppData {
    tgWebAppData: {
        authDate: string;
        chatType?: string;
        chatInstance?: string;
        hash: string;
        signature?: string;
        user: User;
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

/**
 * Safely retrieve launch params with error handling
 * @returns Launch params or null if error occurs
 */
export function safeRetrieveLaunchParams(): LaunchParams | null {
    if (typeof window === "undefined") return null;

    try {
        return retrieveLaunchParams() as LaunchParams;
    } catch (error) {
        console.warn("Failed to retrieve Telegram launch params:", error);
        return null;
    }
}

/**
 * Check if the code is running in a Telegram Web App environment
 * @returns boolean indicating if Telegram Web App is available
 */
export async function isTelegramWebApp(): Promise<boolean> {
    if (typeof window === "undefined") return false;

    try {
        const isInTelegram = await isTMA();
        return isInTelegram;
    } catch (error) {
        console.warn("Failed to check Telegram environment:", error);
        return false;
    }
}

/**
 * Get extended Telegram Web App data including platform, theme params, and version
 * @returns ExtendedTelegramWebAppData object or null if not available
 */
export async function getExtendedTelegramData(): Promise<ExtendedTelegramWebAppData | null> {
    if (!(await isTelegramWebApp()) || typeof window === "undefined") {
        return null;
    }

    try {
        const launchParams = safeRetrieveLaunchParams();
        if (!launchParams?.initData) {
            return null;
        }

        // Access Telegram WebApp object directly for additional data
        const tgWebAppData = launchParams.initData;

        // Format auth_date as ISO string if available
        const authDate = tgWebAppData.authDate;

        if (!tgWebAppData.user) {
            return null;
        }

        return {
            tgWebAppData: {
                authDate: authDate.toISOString(),
                chatType: tgWebAppData.chatType,
                chatInstance: tgWebAppData.chatInstance,
                hash: tgWebAppData.hash,
                signature: tgWebAppData.signature,
                user: tgWebAppData.user,
            },
            tgWebAppPlatform: launchParams?.platform || undefined,
            tgWebAppThemeParams: launchParams?.themeParams || undefined,
            tgWebAppVersion: launchParams?.version || undefined,
        };
    } catch (error) {
        console.error("Failed to get extended Telegram data:", error);
        return null;
    }
}
