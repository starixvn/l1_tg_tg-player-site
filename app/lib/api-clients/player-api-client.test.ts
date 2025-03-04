import { AxiosInstance } from "axios";
import { PlayerApiClient, ApiResponse, SignInResponse, SignInRequest } from "./player-api-client";

describe("ApiClient", () => {
    let mockHttpClient: jest.Mocked<AxiosInstance>;
    let apiClient: PlayerApiClient;
    const baseUrl = "https://api.example.com";

    beforeEach(() => {
        // Arrange - Setup
        mockHttpClient = {
            post: jest.fn(),
        } as unknown as jest.Mocked<AxiosInstance>;
        apiClient = new PlayerApiClient(mockHttpClient, baseUrl);
    });

    describe("signIn", () => {
        const mockAuthToken = "mock-auth-token";
        const mockRequest: SignInRequest = {
            telegram: {
                id: 123456789,
                firstName: "John",
                lastName: "Doe",
                username: "johndoe",
                languageCode: "en",
                allowWriteToPm: true,
                photoUrl: "https://example.com/photo.jpg",
                isPremium: true,
            },
            walletType: "metamask",
        };
        const mockAuthResponse: ApiResponse<SignInResponse> = {
            success: true,
            data: {
                token: "mock-token",
                user: {
                    id: "mock-user-id",
                    username: "mock-username",
                },
            },
        };

        it("should successfully sign in with valid auth token and request data", async () => {
            // Arrange
            mockHttpClient.post.mockResolvedValueOnce({ data: mockAuthResponse });

            // Act
            const result = await apiClient.signIn(mockAuthToken, mockRequest);

            // Assert
            expect(result).toEqual(mockAuthResponse);
            expect(mockHttpClient.post).toHaveBeenCalledWith(`${baseUrl}/api/player/signin`, mockRequest, {
                headers: {
                    Authorization: `tma ${mockAuthToken}`,
                    "Content-Type": "application/json",
                },
            });
        });

        it("should handle sign in failure gracefully", async () => {
            // Arrange
            const errorMessage = "Network error";
            mockHttpClient.post.mockRejectedValueOnce(new Error(errorMessage));

            // Act
            const result = await apiClient.signIn(mockAuthToken, mockRequest);

            // Assert
            expect(result).toEqual({
                success: false,
                data: null,
                error: errorMessage,
            });
        });

        it("should handle baseUrl with trailing slash correctly", async () => {
            // Arrange
            const baseUrlWithSlash = "https://api.example.com/";
            const clientWithSlashUrl = new PlayerApiClient(mockHttpClient, baseUrlWithSlash);
            mockHttpClient.post.mockResolvedValueOnce({ data: mockAuthResponse });

            // Act
            await clientWithSlashUrl.signIn(mockAuthToken, mockRequest);

            // Assert
            expect(mockHttpClient.post).toHaveBeenCalledWith("https://api.example.com/api/player/signin", mockRequest, {
                headers: {
                    Authorization: `tma ${mockAuthToken}`,
                    "Content-Type": "application/json",
                },
            });
        });
    });
});
