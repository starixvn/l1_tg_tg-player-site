import { ExtendedTelegramWebAppData } from "../telegram/telegram-client";

export interface PlayerData {
    id: number;
    firstName: string;
    lastName?: string;
    username?: string;
    languageCode?: string;
    isPremium?: boolean;
    balance: number;
    lastActive: Date;
    telegramInfo?: ExtendedTelegramWebAppData;
}

export interface IPlayerManager {
    getCurrentPlayer(): PlayerData | null;
    updatePlayerData(telegramData: ExtendedTelegramWebAppData): Promise<PlayerData>;
    getPlayerBalance(): number;
    setPlayerBalance(amount: number): void;
    reset(): void;
}

export class PlayerManager implements IPlayerManager {
    private static instance: PlayerManager;
    private currentPlayer: PlayerData | null = null;

    private constructor() {}

    public static getInstance(): PlayerManager {
        if (!PlayerManager.instance) {
            PlayerManager.instance = new PlayerManager();
        }
        return PlayerManager.instance;
    }

    public getCurrentPlayer(): PlayerData | null {
        return this.currentPlayer;
    }

    public async updatePlayerData(telegramData: ExtendedTelegramWebAppData): Promise<PlayerData> {
        const user = telegramData.tgWebAppData.user;
        this.currentPlayer = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            languageCode: user.languageCode,
            isPremium: user.isPremium,
            balance: this.currentPlayer?.balance || 0,
            lastActive: new Date(),
            telegramInfo: telegramData,
        };
        return this.currentPlayer;
    }

    public getPlayerBalance(): number {
        return this.currentPlayer?.balance || 0;
    }

    public setPlayerBalance(amount: number): void {
        if (this.currentPlayer) {
            this.currentPlayer.balance = amount;
        }
    }

    public reset(): void {
        this.currentPlayer = null;
    }
}

// Export a singleton instance
export const playerManager = PlayerManager.getInstance();
