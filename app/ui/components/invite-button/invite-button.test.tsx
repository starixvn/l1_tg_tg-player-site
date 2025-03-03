import { render, screen, fireEvent } from "@testing-library/react";
import { InviteButton } from "./index";
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

describe("InviteButton", () => {
    // Set up common test variables
    const mockPush = jest.fn();
    const mockResources = {
        buttons: {
            invite: "Invite Test",
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
        render(<InviteButton />);

        // Act - no action needed for this test

        // Assert
        expect(screen.getByRole("button")).toHaveTextContent("Invite Test");
    });

    test("should navigate to invite page when clicked", () => {
        // Arrange
        render(<InviteButton />);

        // Act
        fireEvent.click(screen.getByRole("button"));

        // Assert
        expect(mockPush).toHaveBeenCalledWith("/pages/invite");
    });

    test("should have correct CSS classes", () => {
        // Arrange
        render(<InviteButton />);

        // Act - no action needed for this test

        // Assert
        const button = screen.getByRole("button");
        expect(button).toHaveClass("btn");
        expect(button).toHaveClass("btn-primary");
    });
});
