import { AxiosInstance } from "axios";
import { PlayerApiClient } from "../player-api-client";
import { SignInRequest, GetBalanceRequest } from "../player-api-client";

describe("PlayerApiClient", () => {
    let playerApiClient: PlayerApiClient;
    let mockAxiosInstance: jest.Mocked<AxiosInstance>;
    const baseUrl = "https://api.example.com";

    beforeEach(() => {
        mockAxiosInstance = {
            post: jest.fn(),
            get: jest.fn(),
        } as unknown as jest.Mocked<AxiosInstance>;

        playerApiClient = new PlayerApiClient(mockAxiosInstance, baseUrl);
    });

    describe("signIn", () => {
        it("should successfully sign in a user", async () => {
            // Arrange
            const authToken = "test-auth-token";
            const request: SignInRequest = {
                telegram: {
                    id: 123,
                    firstName: "John",
                    lastName: "Doe",
                    username: "johndoe",
                    languageCode: "en",
                    allowWriteToPm: true,
                    photoUrl: "https://example.com/photo.jpg",
                    isPremium: false,
                },
                walletType: "TON",
            };
            const mockResponse = {
                data: {
                    success: true,
                    data: {
                        token: "jwt-token",
                        user: {
                            id: "123",
                            username: "johndoe",
                        },
                        code: 200,
                    },
                },
            };
            mockAxiosInstance.post.mockResolvedValueOnce(mockResponse);

            // Act
            const result = await playerApiClient.signIn(authToken, request);

            // Assert
            expect(result.success).toBe(true);
            expect(result.data).toEqual(mockResponse.data.data);
            expect(mockAxiosInstance.post).toHaveBeenCalledWith(
                "https://api.example.com/api/player/signin",
                request,
                expect.objectContaining({
                    headers: {
                        Authorization: "tma test-auth-token",
                        "Content-Type": "application/json",
                    },
                })
            );
        });

        it("should handle sign in error", async () => {
            // Arrange
            const authToken = "test-auth-token";
            const request: SignInRequest = {
                telegram: {
                    id: 123,
                    firstName: "John",
                    lastName: "Doe",
                    username: "johndoe",
                    languageCode: "en",
                    allowWriteToPm: true,
                    photoUrl: "https://example.com/photo.jpg",
                    isPremium: false,
                },
                walletType: "TON",
            };
            mockAxiosInstance.post.mockRejectedValueOnce(new Error("Network error"));

            // Act
            const result = await playerApiClient.signIn(authToken, request);

            // Assert
            expect(result.success).toBe(false);
            expect(result.error).toBe("Network error");
            expect(result.code).toBe(500);
        });
    });

    describe("getBalance", () => {
        it("should successfully get player balance", async () => {
            // Arrange
            const authToken = "test-auth-token";
            const request: GetBalanceRequest = {
                playerId: "123",
                walletType: "TON",
            };
            const mockResponse = {
                data: {
                    success: true,
                    data: {
                        balance: 100,
                        currency: "TON",
                        code: 200,
                    },
                },
            };
            mockAxiosInstance.get.mockResolvedValueOnce(mockResponse);

            // Act
            const result = await playerApiClient.getBalance(authToken, request);

            // Assert
            expect(result.success).toBe(true);
            expect(result.data).toEqual(mockResponse.data.data);
            expect(mockAxiosInstance.get).toHaveBeenCalledWith(
                "https://api.example.com/api/player/123/balance",
                expect.objectContaining({
                    params: {
                        walletType: "TON",
                    },
                    headers: {
                        Authorization: "tma test-auth-token",
                        "Content-Type": "application/json",
                    },
                })
            );
        });

        it("should handle get balance error", async () => {
            // Arrange
            const authToken = "test-auth-token";
            const request: GetBalanceRequest = {
                playerId: "123",
                walletType: "TON",
            };
            mockAxiosInstance.get.mockRejectedValueOnce(new Error("Network error"));

            // Act
            const result = await playerApiClient.getBalance(authToken, request);

            // Assert
            expect(result.success).toBe(false);
            expect(result.error).toBe("Network error");
            expect(result.code).toBe(500);
        });
    });
});
