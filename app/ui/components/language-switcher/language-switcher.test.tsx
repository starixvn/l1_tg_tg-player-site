import { render, screen, fireEvent } from "@testing-library/react";
import { LanguageSwitcher } from "./index";
import { useLanguage } from "../../contexts/language-context";
import { useResources } from "../../hooks/use-resources";

// Mock the language context
jest.mock("../../../ui/contexts/language-context", () => ({
    useLanguage: jest.fn(),
}));

// Mock the useResources hook
jest.mock("../../../ui/hooks/use-resources", () => ({
    useResources: jest.fn(),
}));

describe("LanguageSwitcher", () => {
    // Set up common test variables
    const mockSetLocale = jest.fn();
    const mockResources = {
        languages: {
            english: "English Test",
            vietnamese: "Vietnamese Test",
        },
    };

    beforeEach(() => {
        // Reset mocks before each test
        jest.clearAllMocks();

        // Set up default mock implementations
        (useLanguage as jest.Mock).mockReturnValue({
            locale: "en",
            setLocale: mockSetLocale,
        });
        (useResources as jest.Mock).mockReturnValue(mockResources);
    });

    test("should render with correct options", () => {
        // Arrange
        render(<LanguageSwitcher />);

        // Act - no action needed for this test

        // Assert
        const select = screen.getByRole("combobox");
        expect(select).toBeInTheDocument();

        const options = screen.getAllByRole("option");
        expect(options).toHaveLength(2);
        expect(options[0]).toHaveTextContent("English Test");
        expect(options[1]).toHaveTextContent("Vietnamese Test");
    });

    test("should have English selected by default", () => {
        // Arrange
        render(<LanguageSwitcher />);

        // Act - no action needed for this test

        // Assert
        const select = screen.getByRole("combobox");
        expect(select).toHaveValue("en");
    });

    test("should call setLocale when language is changed", () => {
        // Arrange
        render(<LanguageSwitcher />);

        // Act
        fireEvent.change(screen.getByRole("combobox"), { target: { value: "vi" } });

        // Assert
        expect(mockSetLocale).toHaveBeenCalledWith("vi");
    });

    test("should reflect current locale in select value", () => {
        // Arrange
        (useLanguage as jest.Mock).mockReturnValue({
            locale: "vi",
            setLocale: mockSetLocale,
        });

        // Act
        render(<LanguageSwitcher />);

        // Assert
        const select = screen.getByRole("combobox");
        expect(select).toHaveValue("vi");
    });
});
