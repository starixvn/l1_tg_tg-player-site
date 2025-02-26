import { isTelegramWebApp, getTelegramUser, parseTelegramInitData, TelegramUser } from "./telegram-client";

describe("Telegram Client Library", () => {
    // Store original window object
    const originalWindow = global.window;

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
        // Reset window object before each test
        global.window = originalWindow;

        // Mock console.error to prevent test output noise
        jest.spyOn(console, "error").mockImplementation(() => {});
    });

    afterEach(() => {
        // Restore console.error
        jest.restoreAllMocks();
    });

    afterAll(() => {
        // Restore original window
        global.window = originalWindow;
    });

    // Tests
    test("isTelegramWebApp should return false when not in Telegram environment", () => {
        // Arrange
        // No Telegram object in window

        // Act
        const result = isTelegramWebApp();

        // Assert
        expect(result).toBe(false);
    });

    test("isTelegramWebApp should return true when in Telegram environment", () => {
        // Arrange
        // Use type assertion to avoid TypeScript errors with window object
        Object.defineProperty(global.window, "Telegram", {
            value: {
                WebApp: {
                    initData: "",
                    initDataUnsafe: {},
                },
            },
            configurable: true,
        });

        // Act
        const result = isTelegramWebApp();

        // Assert
        expect(result).toBe(true);
    });

    test("getTelegramUser should return null when not in Telegram environment", () => {
        // Arrange
        // No Telegram object in window

        // Act
        const result = getTelegramUser();

        // Assert
        expect(result).toBeNull();
    });

    test("getTelegramUser should return user data when available", () => {
        // Arrange
        Object.defineProperty(global.window, "Telegram", {
            value: {
                WebApp: {
                    initData: "",
                    initDataUnsafe: {
                        user: mockUser,
                    },
                },
            },
            configurable: true,
        });

        // Act
        const result = getTelegramUser();

        // Assert
        expect(result).toEqual(mockUser);
    });

    test("parseTelegramInitData should parse initData correctly", () => {
        // Arrange
        const mockInitData = `query_id=AAHdF6IQAAAAAN0XohDhrOrc&user=${encodeURIComponent(
            JSON.stringify(mockUser)
        )}&auth_date=1625097433&hash=abc123def456`;

        Object.defineProperty(global.window, "Telegram", {
            value: {
                WebApp: {
                    initData: mockInitData,
                    initDataUnsafe: {},
                },
            },
            configurable: true,
        });

        // Act
        const result = parseTelegramInitData();

        // Assert
        expect(result).toEqual({
            query_id: "AAHdF6IQAAAAAN0XohDhrOrc",
            user: mockUser,
            auth_date: 1625097433,
            hash: "abc123def456",
        });
    });
});
