import React, { createContext, useContext, useState, useMemo } from "react";
import { GameSession, gameManager } from "../../lib/game/game-manager";

interface GameContextType {
    game: GameSession | null;
    updateGame: (game: GameSession) => Promise<void>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error("useGame must be used within a GameProvider");
    }
    return context;
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [game, setGame] = useState<GameSession | null>(gameManager.getCurrentGame());

    const updateGame = async (newGame: GameSession) => {
        const updatedGame = await gameManager.updateGameSession(newGame);
        setGame(updatedGame);
    };

    const value = useMemo(() => ({ game, updateGame }), [game]);

    return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}; 