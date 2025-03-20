import React from "react";
import { useGame } from "../../contexts/game-context";

export const GameFrame: React.FC = () => {
    const { game } = useGame();

    if (!game?.redirectUrl) {
        return <div>No game URL available</div>;
    }

    window.location.href = game.redirectUrl;
}; 