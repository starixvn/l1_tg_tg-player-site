/**
 * Telegram Web App utility functions
 */
import { getExtendedTelegramData } from "./telegram-client";

/**
 * Type definition for the formatted Telegram user data
 */
export interface FormattedTelegramData {
    tgWebAppData: {
        auth_date: string;
        chat_type: string;
        chat_instance: string;
        hash: string;
        signature: string;
        user: {
            allows_write_to_pm: boolean;
            first_name: string;
            id: number;
            last_name: string;
            language_code: string;
            photo_url: string;
            username: string;
        } | null;
    };
    tgWebAppPlatform: string;
    tgWebAppThemeParams: {
        accent_text_color: string;
        bg_color: string;
        bottom_bar_bg_color: string;
        button_color: string;
        button_text_color: string;
        destructive_text_color: string;
        header_bg_color: string;
        hint_color: string;
        link_color: string;
        secondary_bg_color: string;
        section_bg_color: string;
        section_header_text_color: string;
        section_separator_color: string;
        subtitle_text_color: string;
        text_color: string;
    };
    tgWebAppVersion: string;
}

/**
 * Get Telegram user data in the specific format requested
 * @returns Formatted Telegram user data object or null if not available
 */
export function getFormattedTelegramData(): FormattedTelegramData | null {
    try {
        const extendedData = getExtendedTelegramData();
        if (!extendedData) return null;

        // Format the data according to the requested structure
        return {
            tgWebAppData: {
                auth_date: extendedData.tgWebAppData.auth_date,
                chat_type: extendedData.tgWebAppData.chat_type || "private",
                chat_instance: extendedData.tgWebAppData.chat_instance || "",
                hash: extendedData.tgWebAppData.hash || "",
                signature: extendedData.tgWebAppData.signature || "",
                user: extendedData.tgWebAppData.user
                    ? {
                          allows_write_to_pm: extendedData.tgWebAppData.user.allows_write_to_pm || true,
                          first_name: extendedData.tgWebAppData.user.first_name,
                          id: extendedData.tgWebAppData.user.id,
                          last_name: extendedData.tgWebAppData.user.last_name || "",
                          language_code: extendedData.tgWebAppData.user.language_code || "en",
                          photo_url: extendedData.tgWebAppData.user.photo_url || "",
                          username: extendedData.tgWebAppData.user.username || "",
                      }
                    : null,
            },
            tgWebAppPlatform: extendedData.tgWebAppPlatform || "tdesktop",
            tgWebAppThemeParams: {
                accent_text_color: extendedData.tgWebAppThemeParams?.accent_text_color || "#6ab2f2",
                bg_color: extendedData.tgWebAppThemeParams?.bg_color || "#17212b",
                bottom_bar_bg_color: extendedData.tgWebAppThemeParams?.bottom_bar_bg_color || "#17212b",
                button_color: extendedData.tgWebAppThemeParams?.button_color || "#5288c1",
                button_text_color: extendedData.tgWebAppThemeParams?.button_text_color || "#ffffff",
                destructive_text_color: extendedData.tgWebAppThemeParams?.destructive_text_color || "#ec3942",
                header_bg_color: extendedData.tgWebAppThemeParams?.header_bg_color || "#17212b",
                hint_color: extendedData.tgWebAppThemeParams?.hint_color || "#708499",
                link_color: extendedData.tgWebAppThemeParams?.link_color || "#6ab3f3",
                secondary_bg_color: extendedData.tgWebAppThemeParams?.secondary_bg_color || "#232e3c",
                section_bg_color: extendedData.tgWebAppThemeParams?.section_bg_color || "#17212b",
                section_header_text_color: extendedData.tgWebAppThemeParams?.section_header_text_color || "#6ab3f3",
                section_separator_color: extendedData.tgWebAppThemeParams?.section_separator_color || "#111921",
                subtitle_text_color: extendedData.tgWebAppThemeParams?.subtitle_text_color || "#708499",
                text_color: extendedData.tgWebAppThemeParams?.text_color || "#f5f5f5",
            },
            tgWebAppVersion: extendedData.tgWebAppVersion || "8.0",
        };
    } catch (error) {
        console.error("Failed to format Telegram data:", error);
        return null;
    }
}

/**
 * Get Telegram user data as a JSON string
 * @returns JSON string of formatted Telegram user data or null if not available
 */
export function getTelegramDataAsJson(): string | null {
    try {
        const data = getFormattedTelegramData();
        if (!data) return null;

        return JSON.stringify(data, null, 2);
    } catch (error) {
        console.error("Failed to get Telegram data as JSON:", error);
        return null;
    }
}
