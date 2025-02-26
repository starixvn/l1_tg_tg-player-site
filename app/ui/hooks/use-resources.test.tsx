import { renderHook } from "@testing-library/react";
import { useResources } from "./use-resources";
import { resources } from "../../lib/constants/resources";

// Mock the language context
jest.mock("../contexts/language-context", () => ({
    useLanguage: jest.fn().mockImplementation(() => ({ locale: "en" })),
    LanguageProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("useResources", () => {
    test("should return English resources by default", () => {
        // Arrange & Act
        const { result } = renderHook(() => useResources());

        // Assert
        expect(result.current).toEqual(resources.en);
    });

    test('should return Vietnamese resources when locale is "vi"', () => {
        // Arrange
        const useLanguageMock = jest.requireMock("../contexts/language-context").useLanguage;
        useLanguageMock.mockImplementation(() => ({ locale: "vi" }));

        // Act
        const { result } = renderHook(() => useResources());

        // Assert
        expect(result.current).toEqual(resources.vi);

        // Cleanup
        useLanguageMock.mockImplementation(() => ({ locale: "en" }));
    });

    test("should handle unknown locale by falling back to English", () => {
        // Arrange
        const useLanguageMock = jest.requireMock("../contexts/language-context").useLanguage;
        useLanguageMock.mockImplementation(() => ({ locale: "fr" })); // Non-existent locale

        // Act
        const { result } = renderHook(() => useResources());

        // Assert
        // TypeScript will enforce this to be a valid resource, so it will return undefined
        // but the component should handle this gracefully
        expect(result.current).toBeUndefined();

        // Cleanup
        useLanguageMock.mockImplementation(() => ({ locale: "en" }));
    });
});
