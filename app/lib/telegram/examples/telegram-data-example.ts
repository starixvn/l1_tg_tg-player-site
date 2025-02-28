/**
 * Example of how to use the Telegram data functions
 */
import { getFormattedTelegramData, getTelegramDataAsJson } from "../telegram-utils";
import { getTelegramUser, isTelegramWebApp } from "../telegram-client";

/**
 * Example function to demonstrate how to get and use Telegram user data
 */
export function telegramDataExample() {
    // Check if running in Telegram Web App
    if (!isTelegramWebApp()) {
        console.log("Not running in Telegram Web App");
        return;
    }

    // Get basic Telegram user data
    const user = getTelegramUser();
    console.log("Basic Telegram user data:", user);

    // Get formatted Telegram data in the requested format
    const formattedData = getFormattedTelegramData();
    console.log("Formatted Telegram data:", formattedData);

    // Get Telegram data as JSON string
    const jsonData = getTelegramDataAsJson();
    console.log("Telegram data as JSON:", jsonData);

    // Example of how to access specific properties
    if (formattedData) {
        const { tgWebAppData, tgWebAppPlatform, tgWebAppThemeParams } = formattedData;

        // Access user data
        if (tgWebAppData.user) {
            const { first_name, last_name, username } = tgWebAppData.user;
            console.log(`User: ${first_name} ${last_name || ""} (${username || "no username"})`);
        }

        // Access platform
        console.log(`Platform: ${tgWebAppPlatform}`);

        // Access theme colors
        console.log(`Theme background color: ${tgWebAppThemeParams.bg_color}`);
        console.log(`Theme text color: ${tgWebAppThemeParams.text_color}`);
    }
}
