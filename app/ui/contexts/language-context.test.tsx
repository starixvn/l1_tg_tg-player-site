import { render, screen, fireEvent } from "@testing-library/react";
import { LanguageProvider, useLanguage } from "./language-context";

// Test component that uses the language context
function TestComponent() {
  const { locale, setLocale } = useLanguage();

  return (
    <div>
      <div data-testid="current-locale">{locale}</div>
      <button
        data-testid="change-locale-button"
        onClick={() => setLocale(locale === "en" ? "vi" : "en")}
      >
        Change Language
      </button>
    </div>
  );
}

describe("LanguageContext", () => {
  test('should provide default locale as "en"', () => {
    // Arrange
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    // Act - no action needed for default value test

    // Assert
    expect(screen.getByTestId("current-locale").textContent).toBe("en");
  });

  test("should allow changing the locale", () => {
    // Arrange
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    // Act
    fireEvent.click(screen.getByTestId("change-locale-button"));

    // Assert
    expect(screen.getByTestId("current-locale").textContent).toBe("vi");

    // Act again - toggle back
    fireEvent.click(screen.getByTestId("change-locale-button"));

    // Assert again
    expect(screen.getByTestId("current-locale").textContent).toBe("en");
  });

  test("should throw error when useLanguage is used outside of LanguageProvider", () => {
    // Arrange
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    // Act & Assert
    expect(() => {
      render(<TestComponent />);
    }).toThrow("useLanguage must be used within a LanguageProvider");

    // Cleanup
    consoleErrorSpy.mockRestore();
  });
});
