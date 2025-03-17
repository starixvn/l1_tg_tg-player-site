import { retrieveLaunchParams } from "@telegram-apps/sdk";
import { GameOpenRequest } from "./player-api-client";

export interface SignInResponse {
    player: {
        playerId: string;
        balance?: number;
        wallet: {
            amount: number;
            type: string;
            currency: string;
        };
    };
}

export interface GetBalanceResponse {
    balance: number;
}

export interface GetBalanceParams {
    playerId: string;
    walletType: string;
}

export interface GameOpenResponse {
    timestamp: string;
    result: {
        redirectUrl: string;
        token: string;
        seq: string;
        errorCode: number;
        errorMessage: string;
        errorDescription: string;
    }
}

export class PlayerSiteClient {
    private readonly baseUrl: string;

    constructor(baseUrl: string = "") {
        this.baseUrl = baseUrl;
    }

    /**
     * Signs in a user using Telegram Mini App authentication
     * @returns Promise containing the player data from the sign-in response
     */
    public async signIn(): Promise<SignInResponse["player"]> {
        const { initDataRaw } = retrieveLaunchParams();
        const signInResponse = await fetch(`${this.baseUrl}/api/signin`, {
            method: "POST",
            headers: {
                Authorization: `tma ${initDataRaw}`,
            },
        });

        const signInData: SignInResponse = await signInResponse.json();
        return signInData.player;
    }

    /**
     * Gets the balance for a specific player and wallet type
     * @param params - Object containing playerId and walletType
     * @returns Promise containing the balance information
     */
    public async getBalance(params: GetBalanceParams): Promise<GetBalanceResponse> {
        const { initDataRaw } = retrieveLaunchParams();
        const queryParams = new URLSearchParams({
            playerId: params.playerId,
            walletType: params.walletType,
        });

        const response = await fetch(`${this.baseUrl}/api/balance?${queryParams}`, {
            method: "GET",
            headers: {
                Authorization: `tma ${initDataRaw}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to get balance: ${response.statusText}`);
        }

        return response.json();
    }
    /**
     * Opens a game session for the player
     * @param params - Game open request parameters
     * @returns Promise containing the game session data
     */
    public async gameOpen(): Promise<GameOpenResponse> {
        const { initDataRaw } = retrieveLaunchParams();
        const response = await fetch(`${this.baseUrl}/api/game`, {
            method: "POST",
            headers: {
                Authorization: `tma ${initDataRaw}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to open game: ${response.statusText}`);
        }

        return response.json();
    }
}
