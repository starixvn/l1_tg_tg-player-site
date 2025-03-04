import { ExtendedTelegramWebAppData } from "../telegram/telegram-client";

export interface Player {
    id: string;
    languageCode?: string;
    balance: number;
    telegramInfo?: ExtendedTelegramWebAppData;
    walletType: string;
}

export interface IPlayerManager {
    getCurrentPlayer(): Player | null;
    updatePlayerData(player: Player): Promise<Player>;
    getPlayerBalance(): number;
    setPlayerBalance(amount: number): void;
    reset(): void;
}

export class PlayerManager implements IPlayerManager {
    private static instance: PlayerManager;
    private currentPlayer: Player | null = null;

    private constructor() {}

    public static getInstance(): PlayerManager {
        if (!PlayerManager.instance) {
            PlayerManager.instance = new PlayerManager();
        }
        return PlayerManager.instance;
    }

    public getCurrentPlayer(): Player | null {
        return this.currentPlayer;
    }

    public async updatePlayerData(player: Player): Promise<Player> {
        this.currentPlayer = {
            ...player,
            balance: this.currentPlayer?.balance || player.balance || 0,
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
