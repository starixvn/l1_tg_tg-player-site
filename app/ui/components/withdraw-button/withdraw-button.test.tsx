import { render, screen, fireEvent } from "@testing-library/react";
import { WithdrawButton } from "./index";
import { useRouter } from "next/navigation";
import { useResources } from "../../hooks/use-resources";

// Mock the next/navigation module
jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

// Mock the useResources hook
jest.mock("../../../ui/hooks/use-resources", () => ({
    useResources: jest.fn(),
}));

describe("WithdrawButton", () => {
    // Set up common test variables
    const mockPush = jest.fn();
    const mockResources = {
        buttons: {
            withdraw: "Withdraw Test",
        },
    };

    beforeEach(() => {
        // Reset mocks before each test
        jest.clearAllMocks();

        // Set up default mock implementations
        (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
        (useResources as jest.Mock).mockReturnValue(mockResources);
    });

    test("should render with correct text", () => {
        // Arrange
        render(<WithdrawButton />);

        // Act - no action needed for this test

        // Assert
        expect(screen.getByRole("button")).toHaveTextContent("Withdraw Test");
    });

    test("should navigate to withdraw page when clicked", () => {
        // Arrange
        render(<WithdrawButton />);

        // Act
        fireEvent.click(screen.getByRole("button"));

        // Assert
        expect(mockPush).toHaveBeenCalledWith("/pages/withdraw");
    });

    test("should have correct CSS classes", () => {
        // Arrange
        render(<WithdrawButton />);

        // Act - no action needed for this test

        // Assert
        const button = screen.getByRole("button");
        expect(button).toHaveClass("btn");
        expect(button).toHaveClass("btn-danger");
    });
});
