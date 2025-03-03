import { AxiosInstance, AxiosError } from "axios";

export interface ApiResponse<T> {
    data: T | null;
    success: boolean;
    error?: string;
}

export interface TelegramUser {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    languageCode: string;
    allowWriteToPm: boolean;
    photoUrl: string;
    isPremium: boolean;
}

export interface SignInRequest {
    user: TelegramUser;
    walletType: string;
}

export interface AuthResponse {
    token: string;
    user: {
        id: string;
        username?: string;
    };
}

export interface IPlayerApiClient {
    signIn(authToken: string, request: SignInRequest): Promise<ApiResponse<AuthResponse>>;
}

export class PlayerApiClient implements IPlayerApiClient {
    private readonly baseUrl: string;
    private readonly httpClient: AxiosInstance;

    constructor(httpClient: AxiosInstance, baseUrl: string = "") {
        this.baseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
        this.httpClient = httpClient;
    }

    private getFullUrl(path: string): string {
        return `${this.baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
    }

    async signIn(authToken: string, request: SignInRequest): Promise<ApiResponse<AuthResponse>> {
        try {
            const response = await this.httpClient.post<ApiResponse<AuthResponse>>(this.getFullUrl("/api/player/signin"), request, {
                headers: {
                    Authorization: `tma ${authToken}`,
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            return {
                success: false,
                data: null,
                error: axiosError.message || "Failed to sign in",
            };
        }
    }
}
