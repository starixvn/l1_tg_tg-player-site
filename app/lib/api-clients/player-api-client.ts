import { AxiosInstance, AxiosError } from "axios";

export interface ApiResponse<T> {
    data: T | null;
    success: boolean;
    error?: string;
    code: number;
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
    telegram: TelegramUser;
    walletType: string;
}

export interface SignInResponse {
    token: string;
    user: {
        id: string;
        username?: string;
    };
    code: number;
}

export interface GetBalanceRequest {
    playerId: string;
    walletType: string;
}

export interface GetBalanceResponse {
    balance: number;
    currency: string;
    code: number;
}

export interface IPlayerApiClient {
    signIn(authToken: string, request: SignInRequest): Promise<ApiResponse<SignInResponse>>;
    getBalance(authToken: string, request: GetBalanceRequest): Promise<ApiResponse<GetBalanceResponse>>;
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

    private getAuthHeaders(authToken: string): Record<string, string> {
        return {
            Authorization: `tma ${authToken}`,
            "Content-Type": "application/json",
        };
    }

    private handleApiError(error: unknown): ApiResponse<never> {
        const axiosError = error as AxiosError;
        return {
            success: false,
            data: null,
            error: axiosError.message || "API request failed",
            code: axiosError.response?.status || 500,
        };
    }

    async signIn(authToken: string, request: SignInRequest): Promise<ApiResponse<SignInResponse>> {
        try {
            const response = await this.httpClient.post<ApiResponse<SignInResponse>>(this.getFullUrl("/api/player/signin"), request, {
                headers: this.getAuthHeaders(authToken),
            });
            return response.data;
        } catch (error) {
            return this.handleApiError(error);
        }
    }

    async getBalance(authToken: string, request: GetBalanceRequest): Promise<ApiResponse<GetBalanceResponse>> {
        try {
            const response = await this.httpClient.get<ApiResponse<GetBalanceResponse>>(this.getFullUrl(`/api/balance`), {
                params: {
                    walletType: request.walletType,
                },
                headers: this.getAuthHeaders(authToken),
            });
            return response.data;
        } catch (error) {
            return this.handleApiError(error);
        }
    }
}
