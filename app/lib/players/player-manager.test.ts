import { PlayerManager } from "./player-manager";
import { ExtendedTelegramWebAppData } from "../telegram/telegram-client";

describe("PlayerManager", () => {
    let playerManager: PlayerManager;

    beforeEach(() => {
        // Reset the singleton instance before each test
        playerManager = PlayerManager.getInstance();
        playerManager.reset();
    });

    describe("getCurrentPlayer", () => {
        it("should return null when no player is set", () => {
            // Arrange & Act
            const result = playerManager.getCurrentPlayer();

            // Assert
            expect(result).toBeNull();
        });
    });

    describe("updatePlayerData", () => {
        it("should update player data from telegram web app data", async () => {
            // Arrange
            const mockTelegramData: ExtendedTelegramWebAppData = {
                tgWebAppData: {
                    user: {
                        id: 123456,
                        firstName: "John",
                        lastName: "Doe",
                        username: "johndoe",
                        languageCode: "en",
                        isPremium: true,
                    },
                    hash: "test_hash",
                    authDate: new Date().toISOString(),
                    chatType: "private",
                    chatInstance: "test_instance",
                    signature: "test_signature",
                },
                tgWebAppPlatform: "ios",
                tgWebAppVersion: "6.0",
                tgWebAppThemeParams: {
                    accent_text_color: "#FF0000",
                    bg_color: "#FFFFFF",
                    button_color: "#0000FF",
                    button_text_color: "#FFFFFF",
                    header_bg_color: "#CCCCCC",
                    hint_color: "#999999",
                    link_color: "#0000FF",
                    secondary_bg_color: "#F0F0F0",
                    text_color: "#000000",
                },
            };

            // Act
            const result = await playerManager.updatePlayerData(mockTelegramData);

            // Assert
            expect(result).toMatchObject({
                id: mockTelegramData.tgWebAppData.user.id,
                firstName: mockTelegramData.tgWebAppData.user.firstName,
                lastName: mockTelegramData.tgWebAppData.user.lastName,
                username: mockTelegramData.tgWebAppData.user.username,
                languageCode: mockTelegramData.tgWebAppData.user.languageCode,
                isPremium: mockTelegramData.tgWebAppData.user.isPremium,
                balance: 0,
                telegramInfo: mockTelegramData,
            });
            expect(result.lastActive).toBeInstanceOf(Date);
        });

        it("should preserve existing balance when updating player data", async () => {
            // Arrange
            const mockTelegramData: ExtendedTelegramWebAppData = {
                tgWebAppData: {
                    user: {
                        id: 123456,
                        firstName: "John",
                    },
                    hash: "test_hash",
                    authDate: new Date().toISOString(),
                },
            };
            await playerManager.updatePlayerData(mockTelegramData);
            playerManager.setPlayerBalance(100);

            // Act
            const result = await playerManager.updatePlayerData(mockTelegramData);

            // Assert
            expect(result.balance).toBe(100);
        });
    });

    describe("balance operations", () => {
        it("should get and set player balance correctly", async () => {
            // Arrange
            const testAmount = 500;
            const mockTelegramData: ExtendedTelegramWebAppData = {
                tgWebAppData: {
                    user: {
                        id: 123456,
                        firstName: "John",
                    },
                    hash: "test_hash",
                    authDate: new Date().toISOString(),
                },
            };

            // Act
            await playerManager.updatePlayerData(mockTelegramData);
            playerManager.setPlayerBalance(testAmount);
            const balance = playerManager.getPlayerBalance();

            // Assert
            expect(balance).toBe(testAmount);
        });

        it("should return 0 balance when no player is set", () => {
            // Arrange & Act
            const balance = playerManager.getPlayerBalance();

            // Assert
            expect(balance).toBe(0);
        });
    });
});
