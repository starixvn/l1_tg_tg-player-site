import React from "react";
import { useGame } from "../../contexts/game-context";
import styles from "./game-frame.module.scss";

export const GameFrame: React.FC = () => {
    const { game } = useGame();

    if (!game?.redirectUrl) {
        return <div>No game URL available</div>;
    }

    return (
        <div className={styles.gameContainer}>
            <iframe
                src={game.redirectUrl}
                className={styles.gameFrame}
                allow="fullscreen"
                allowFullScreen
                title="Game Frame"
            />
        </div>
    );
}; 