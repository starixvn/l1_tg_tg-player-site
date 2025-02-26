import { renderHook } from "@testing-library/react";
import { useTelegramUser } from "./use-telegram-user";
import * as telegramClient from "./telegram-client";
import { TelegramUser } from "./telegram-client";

// Mock the telegram-client module
jest.mock("./telegram-client", () => ({
    isTelegramWebApp: jest.fn(),
    getTelegramUser: jest.fn(),
    TelegramUser: {},
}));

describe("useTelegramUser Hook", () => {
    // Mock Telegram user data
    const mockUser: TelegramUser = {
        id: 12345678,
        is_bot: false,
        first_name: "John",
        last_name: "Doe",
        username: "johndoe",
        language_code: "en",
        is_premium: true,
        photo_url: "https://t.me/i/userpic/123/photo.jpg",
    };

    // Setup and teardown
    beforeEach(() => {
        // Reset all mocks before each test
        jest.clearAllMocks();
    });

    test("should handle not being in Telegram environment", () => {
        // Arrange
        (telegramClient.isTelegramWebApp as jest.Mock).mockReturnValue(false);

        // Act
        const { result } = renderHook(() => useTelegramUser());

        // Assert
        expect(result.current.isTelegramApp).toBe(false);
        expect(result.current.loading).toBe(false);
        expect(result.current.user).toBeNull();
    });

    test("should handle being in Telegram environment with user data", () => {
        // Arrange
        (telegramClient.isTelegramWebApp as jest.Mock).mockReturnValue(true);
        (telegramClient.getTelegramUser as jest.Mock).mockReturnValue(mockUser);

        // Act
        const { result } = renderHook(() => useTelegramUser());

        // Assert
        expect(result.current.isTelegramApp).toBe(true);
        expect(result.current.user).toEqual(mockUser);
    });

    test("should handle error when getTelegramUser throws", () => {
        // Arrange
        const mockError = new Error("Failed to get Telegram user");
        (telegramClient.isTelegramWebApp as jest.Mock).mockReturnValue(true);
        (telegramClient.getTelegramUser as jest.Mock).mockImplementation(() => {
            throw mockError;
        });

        // Act
        const { result } = renderHook(() => useTelegramUser());

        // Assert
        expect(result.current.user).toBeNull();
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toEqual(mockError);
        expect(result.current.isTelegramApp).toBe(true);
    });

    test("should return null user when getTelegramUser returns null", () => {
        // Arrange
        (telegramClient.isTelegramWebApp as jest.Mock).mockReturnValue(true);
        (telegramClient.getTelegramUser as jest.Mock).mockReturnValue(null);

        // Act
        const { result } = renderHook(() => useTelegramUser());

        // Assert
        expect(result.current.user).toBeNull();
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
        expect(result.current.isTelegramApp).toBe(true);
    });
});
