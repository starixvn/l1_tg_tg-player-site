export interface GameSession {
    redirectUrl: string;
    token: string;
    seq: string;
    errorCode?: number;
    errorMessage?: string;
}

export interface IGameManager {
    getCurrentGame(): GameSession | null;
    updateGameSession(session: GameSession): Promise<GameSession>;
    getGameUrl(): string | null;
    reset(): void;
}

export class GameManager implements IGameManager {
    private static instance: GameManager;
    private currentGame: GameSession | null = null;

    private constructor() {}

    public static getInstance(): GameManager {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager();
        }
        return GameManager.instance;
    }

    public getCurrentGame(): GameSession | null {
        return this.currentGame;
    }

    public async updateGameSession(session: GameSession): Promise<GameSession> {
        this.currentGame = {
            ...session
        };
        return this.currentGame;
    }

    public getGameUrl(): string | null {
        return this.currentGame?.redirectUrl || null;
    }

    public reset(): void {
        this.currentGame = null;
    }
}

// Export singleton instance
export const gameManager = GameManager.getInstance();
