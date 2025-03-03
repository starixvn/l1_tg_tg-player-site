import { render, screen, fireEvent } from "@testing-library/react";
import { DepositButton } from "./index";
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

describe("DepositButton", () => {
    // Set up common test variables
    const mockPush = jest.fn();
    const mockResources = {
        buttons: {
            deposit: "Deposit Test",
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
        render(<DepositButton />);

        // Act - no action needed for this test

        // Assert
        expect(screen.getByRole("button")).toHaveTextContent("Deposit Test");
    });

    test("should navigate to deposit page when clicked", () => {
        // Arrange
        render(<DepositButton />);

        // Act
        fireEvent.click(screen.getByRole("button"));

        // Assert
        expect(mockPush).toHaveBeenCalledWith("/pages/deposit");
    });

    test("should have correct CSS classes", () => {
        // Arrange
        render(<DepositButton />);

        // Act - no action needed for this test

        // Assert
        const button = screen.getByRole("button");
        expect(button).toHaveClass("btn");
        expect(button).toHaveClass("btn-success");
    });
});
