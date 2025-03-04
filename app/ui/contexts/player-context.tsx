import React, { createContext, useContext, useState, useMemo } from "react";
import { Player, playerManager } from "../../lib/players/player-manager";

interface PlayerContextType {
    player: Player | null;
    updatePlayer: (player: Player) => Promise<void>;
    setPlayerBalance: (amount: number) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const usePlayer = () => {
    const context = useContext(PlayerContext);
    if (!context) {
        throw new Error("usePlayer must be used within a PlayerProvider");
    }
    return context;
};

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [player, setPlayer] = useState<Player | null>(playerManager.getCurrentPlayer());

    const updatePlayer = async (newPlayer: Player) => {
        const updatedPlayer = await playerManager.updatePlayerData(newPlayer);
        setPlayer(updatedPlayer);
    };

    const setPlayerBalance = (amount: number) => {
        playerManager.setPlayerBalance(amount);
        setPlayer(playerManager.getCurrentPlayer());
    };

    const value = useMemo(() => ({ player, updatePlayer, setPlayerBalance }), [player]);

    return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
};
