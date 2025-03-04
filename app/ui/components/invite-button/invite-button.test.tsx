import { render, screen, fireEvent } from "@testing-library/react";
import { useResources } from "../../hooks/use-resources";
import { InviteButton } from "./index";
import { playerManager } from "@/lib/players/player-manager";
import type { Mock } from "jest-mock";

// Mock the modules
jest.mock("../../hooks/use-resources");
jest.mock("@/lib/players/player-manager", () => ({
    playerManager: {
        getCurrentPlayer: jest.fn(),
    },
}));

// Create mock functions with proper types
type ShareURLFunction = {
    (url: string, text?: string): Promise<void>;
    isAvailable: jest.Mock<boolean>;
} & jest.Mock;

const mockShareURL = Object.assign(jest.fn(), { isAvailable: jest.fn().mockReturnValue(true) }) as ShareURLFunction;

jest.mock("@telegram-apps/sdk", () => ({
    shareURL: mockShareURL,
}));

// Mock window.open
const mockOpen = jest.fn();
window.open = mockOpen;

describe("InviteButton", () => {
    // Set up common test variables
    const mockResources = {
        buttons: {
            invite: "Invite Test",
        },
    };

    const mockPlayer = {
        id: 12345,
        firstName: "Test",
        lastName: "User",
        balance: 0,
        lastActive: new Date(),
    };

    const expectedUrl = `https://t.me/playsaba_bot/playsaba?start=ref_${mockPlayer.id}`;

    beforeEach(() => {
        // Reset mocks before each test
        jest.clearAllMocks();

        // Set up default mock implementations
        (useResources as Mock).mockReturnValue(mockResources);
        (playerManager.getCurrentPlayer as Mock).mockReturnValue(mockPlayer);
        mockShareURL.isAvailable.mockReturnValue(true);
    });

    test("should render with correct text", () => {
        // Arrange
        render(<InviteButton />);

        // Assert
        expect(screen.getByRole("button")).toHaveTextContent("Invite Test");
    });

    test("should share URL using Telegram when clicked and sharing is available", async () => {
        // Arrange
        render(<InviteButton />);

        // Act
        fireEvent.click(screen.getByRole("button"));

        // Assert
        expect(mockShareURL.isAvailable).toHaveBeenCalled();
        expect(mockShareURL).toHaveBeenCalledWith(expectedUrl, "Join me on PlaySaba! 🎮");
        expect(mockOpen).not.toHaveBeenCalled();
    });

    test("should fallback to window.open when sharing is not available", async () => {
        // Arrange
        mockShareURL.isAvailable.mockReturnValue(false);
        render(<InviteButton />);

        // Act
        fireEvent.click(screen.getByRole("button"));

        // Assert
        expect(mockShareURL.isAvailable).toHaveBeenCalled();
        expect(mockShareURL).not.toHaveBeenCalled();
        expect(mockOpen).toHaveBeenCalledWith(expectedUrl, "_blank");
    });

    test("should fallback to window.open when sharing fails", async () => {
        // Arrange
        mockShareURL.mockRejectedValue(new Error("Share failed"));
        render(<InviteButton />);

        // Act
        fireEvent.click(screen.getByRole("button"));

        // Assert
        expect(mockShareURL.isAvailable).toHaveBeenCalled();
        expect(mockShareURL).toHaveBeenCalledWith(expectedUrl, "Join me on PlaySaba! 🎮");
        expect(mockOpen).toHaveBeenCalledWith(expectedUrl, "_blank");
    });

    test("should handle case when player data is not available", () => {
        // Arrange
        const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
        (playerManager.getCurrentPlayer as Mock).mockReturnValue(null);
        render(<InviteButton />);

        // Act
        fireEvent.click(screen.getByRole("button"));

        // Assert
        expect(consoleSpy).toHaveBeenCalledWith("Player data not found");
        expect(mockShareURL.isAvailable).not.toHaveBeenCalled();
        expect(mockShareURL).not.toHaveBeenCalled();
        expect(mockOpen).not.toHaveBeenCalled();

        // Cleanup
        consoleSpy.mockRestore();
    });

    test("should have correct CSS classes", () => {
        // Arrange
        render(<InviteButton />);

        // Assert
        const button = screen.getByRole("button");
        expect(button).toHaveClass("btn");
        expect(button).toHaveClass("btn-primary");
    });
});
