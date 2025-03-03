import { AuthenticationService, IAuthenticationConfig } from "./authentication-service";

describe("AuthenticationService", () => {
    // Test configuration
    const mockConfig: IAuthenticationConfig = {
        botToken: "test-bot-token",
        expiresIn: 3600,
    };

    let authService: AuthenticationService;

    beforeEach(() => {
        authService = new AuthenticationService(mockConfig);
    });

    describe("validateAuthHeader", () => {
        test("should return invalid result when auth header is null", async () => {
            // Arrange
            const authHeader = null;

            // Act
            const result = await authService.validateAuthHeader(authHeader);

            // Assert
            expect(result.isValid).toBe(false);
            expect(result.error).toBe("Unauthorized");
        });

        test("should return invalid result when auth type is not tma", async () => {
            // Arrange
            const authHeader = "bearer some-token";

            // Act
            const result = await authService.validateAuthHeader(authHeader);

            // Assert
            expect(result.isValid).toBe(false);
            expect(result.error).toBe("Invalid authorization type");
        });

        test("should return invalid result when validation fails", async () => {
            // Arrange
            const authHeader = "tma invalid-data";

            // Act
            const result = await authService.validateAuthHeader(authHeader);

            // Assert
            expect(result.isValid).toBe(false);
            expect(result.error).toBeDefined();
        });

        // Note: For a complete test suite, you would also want to test the successful case
        // However, this would require mocking the @telegram-apps/init-data-node functions
        // and providing valid test data that matches the expected format
    });
});
