import { render, screen } from "@testing-library/react";
import Home from "./page";
import { useResources } from "./ui/hooks/use-resources";

// Mock the components used in the Home page
jest.mock("./ui/components", () => ({
    LanguageSwitcher: () => <div data-testid="language-switcher-mock">Language Switcher</div>,
    DepositButton: () => <div data-testid="deposit-button-mock">Deposit Button</div>,
    WithdrawButton: () => <div data-testid="withdraw-button-mock">Withdraw Button</div>,
}));

// Mock the useResources hook
jest.mock("./lib/hooks/use-resources", () => ({
    useResources: jest.fn(),
}));

describe("Home", () => {
    beforeEach(() => {
        // Reset mocks before each test
        jest.clearAllMocks();

        // Set up default mock implementations
        (useResources as jest.Mock).mockReturnValue({
            home: "Home Test",
        });
    });

    test("should render the home page with correct title", () => {
        // Arrange
        render(<Home />);

        // Act - no action needed for this test

        // Assert
        expect(screen.getByText("Home Test")).toBeInTheDocument();
    });

    test("should render all required components", () => {
        // Arrange
        render(<Home />);

        // Act - no action needed for this test

        // Assert
        expect(screen.getByTestId("language-switcher-mock")).toBeInTheDocument();
        expect(screen.getByTestId("deposit-button-mock")).toBeInTheDocument();
        expect(screen.getByTestId("withdraw-button-mock")).toBeInTheDocument();
    });

    test("should use the correct layout structure", () => {
        // Arrange
        render(<Home />);

        // Act - no action needed for this test

        // Assert
        // Check for container class
        const container = screen.getByText("Home Test").closest(".container");
        expect(container).toBeInTheDocument();

        // Check for row and column structure
        const row = screen.getByText("Home Test").closest(".row");
        expect(row).toBeInTheDocument();

        const column = screen.getByText("Home Test").closest(".col-12");
        expect(column).toBeInTheDocument();
    });
});
