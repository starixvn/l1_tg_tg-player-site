import { PlayerManager, playerManager, Player } from "./player-manager";
import { ExtendedTelegramWebAppData } from "../telegram/telegram-client";
import { User } from "@telegram-apps/sdk";

describe("PlayerManager", () => {
    // Reset the singleton instance before each test
    beforeEach(() => {
        playerManager.reset();
    });

    describe("getCurrentPlayer", () => {
        it("should return null when no player is set", () => {
            // Arrange
            const manager = PlayerManager.getInstance();

            // Act
            const result = manager.getCurrentPlayer();

            // Assert
            expect(result).toBeNull();
        });

        it("should return current player when set", () => {
            // Arrange
            const manager = PlayerManager.getInstance();
            const mockUser: User = {
                id: 123,
                firstName: "Test User",
                languageCode: "en",
                username: undefined,
                lastName: undefined,
                isPremium: undefined,
                isBot: undefined,
                isMiniAppUser: undefined,
                startParam: undefined,
            };
            const mockTelegramData: ExtendedTelegramWebAppData = {
                tgWebAppData: {
                    user: mockUser,
                    authDate: new Date().toISOString(),
                    hash: "test_hash",
                },
            };
            const mockPlayer: Player = {
                id: "123",
                languageCode: "en",
                balance: 0,
                telegramInfo: mockTelegramData,
                walletType: "main",
            };

            // Act
            manager.updatePlayerData(mockPlayer);
            const result = manager.getCurrentPlayer();

            // Assert
            expect(result).toEqual(mockPlayer);
        });
    });

    describe("updatePlayerData", () => {
        it("should update player data with new player info", async () => {
            // Arrange
            const manager = PlayerManager.getInstance();
            const mockUser: User = {
                id: 123,
                firstName: "Test User",
                languageCode: "en",
                username: undefined,
                lastName: undefined,
                isPremium: undefined,
                isBot: undefined,
                isMiniAppUser: undefined,
                startParam: undefined,
            };
            const mockTelegramData: ExtendedTelegramWebAppData = {
                tgWebAppData: {
                    user: mockUser,
                    authDate: new Date().toISOString(),
                    hash: "test_hash",
                },
            };
            const mockPlayer: Player = {
                id: "123",
                languageCode: "en",
                balance: 0,
                telegramInfo: mockTelegramData,
                walletType: "main",
            };

            // Act
            const result = await manager.updatePlayerData(mockPlayer);

            // Assert
            expect(result).toEqual(mockPlayer);
        });

        it("should preserve existing balance when updating player", async () => {
            // Arrange
            const manager = PlayerManager.getInstance();
            const mockUser: User = {
                id: 123,
                firstName: "Test User",
                languageCode: "en",
                username: undefined,
                lastName: undefined,
                isPremium: undefined,
                isBot: undefined,
                isMiniAppUser: undefined,
                startParam: undefined,
            };
            const initialPlayer: Player = {
                id: "123",
                languageCode: "en",
                balance: 100,
                telegramInfo: {
                    tgWebAppData: {
                        user: mockUser,
                        authDate: new Date().toISOString(),
                        hash: "test_hash",
                    },
                },
                walletType: "main",
            };
            const updatedPlayer: Player = {
                id: "123",
                languageCode: "fr",
                balance: 0,
                telegramInfo: {
                    tgWebAppData: {
                        user: { ...mockUser, languageCode: "fr" },
                        authDate: new Date().toISOString(),
                        hash: "test_hash",
                    },
                },
                walletType: "main",
            };

            // Act
            await manager.updatePlayerData(initialPlayer);
            const result = await manager.updatePlayerData(updatedPlayer);

            // Assert
            expect(result.balance).toBe(100); // Should preserve existing balance
            expect(result.languageCode).toBe("fr"); // Should update other fields
        });
    });

    describe("getPlayerBalance", () => {
        it("should return 0 when no player is set", () => {
            // Arrange
            const manager = PlayerManager.getInstance();

            // Act
            const result = manager.getPlayerBalance();

            // Assert
            expect(result).toBe(0);
        });

        it("should return current player balance", () => {
            // Arrange
            const manager = PlayerManager.getInstance();
            const mockUser: User = {
                id: 123,
                firstName: "Test User",
                languageCode: "en",
                username: undefined,
                lastName: undefined,
                isPremium: undefined,
                isBot: undefined,
                isMiniAppUser: undefined,
                startParam: undefined,
            };
            const mockTelegramData: ExtendedTelegramWebAppData = {
                tgWebAppData: {
                    user: mockUser,
                    authDate: new Date().toISOString(),
                    hash: "test_hash",
                },
            };
            const mockPlayer: Player = {
                id: "123",
                languageCode: "en",
                balance: 0,
                telegramInfo: mockTelegramData,
                walletType: "main",
            };

            // Act
            manager.updatePlayerData(mockPlayer);
            manager.setPlayerBalance(100);
            const result = manager.getPlayerBalance();

            // Assert
            expect(result).toBe(100);
        });
    });

    describe("setPlayerBalance", () => {
        it("should update player balance when player exists", () => {
            // Arrange
            const manager = PlayerManager.getInstance();
            const mockUser: User = {
                id: 123,
                firstName: "Test User",
                languageCode: "en",
                username: undefined,
                lastName: undefined,
                isPremium: undefined,
                isBot: undefined,
                isMiniAppUser: undefined,
                startParam: undefined,
            };
            const mockTelegramData: ExtendedTelegramWebAppData = {
                tgWebAppData: {
                    user: mockUser,
                    authDate: new Date().toISOString(),
                    hash: "test_hash",
                },
            };
            const mockPlayer: Player = {
                id: "123",
                languageCode: "en",
                balance: 0,
                telegramInfo: mockTelegramData,
                walletType: "main",
            };

            // Act
            manager.updatePlayerData(mockPlayer);
            manager.setPlayerBalance(100);

            // Assert
            expect(manager.getPlayerBalance()).toBe(100);
        });

        it("should not update balance when no player exists", () => {
            // Arrange
            const manager = PlayerManager.getInstance();

            // Act
            manager.setPlayerBalance(100);

            // Assert
            expect(manager.getPlayerBalance()).toBe(0);
        });
    });

    describe("reset", () => {
        it("should clear current player", () => {
            // Arrange
            const manager = PlayerManager.getInstance();
            const mockUser: User = {
                id: 123,
                firstName: "Test User",
                languageCode: "en",
                username: undefined,
                lastName: undefined,
                isPremium: undefined,
                isBot: undefined,
                isMiniAppUser: undefined,
                startParam: undefined,
            };
            const mockTelegramData: ExtendedTelegramWebAppData = {
                tgWebAppData: {
                    user: mockUser,
                    authDate: new Date().toISOString(),
                    hash: "test_hash",
                },
            };
            const mockPlayer: Player = {
                id: "123",
                languageCode: "en",
                balance: 0,
                telegramInfo: mockTelegramData,
                walletType: "main",
            };

            // Act
            manager.updatePlayerData(mockPlayer);
            manager.reset();

            // Assert
            expect(manager.getCurrentPlayer()).toBeNull();
        });
    });
});
