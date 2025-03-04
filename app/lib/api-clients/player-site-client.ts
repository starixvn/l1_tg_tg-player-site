import { retrieveLaunchParams } from "@telegram-apps/sdk";

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
}
