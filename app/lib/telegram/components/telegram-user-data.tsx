"use client";

import { useState, useEffect } from "react";
import { PlayerData, playerManager } from "@/lib/players/player-manager";

/**
 * Component to display Telegram user data in the requested format
 */
export default function TelegramUserData() {
    const [playerData, setPlayerData] = useState<PlayerData | null>(null);

    useEffect(() => {
        setPlayerData(playerManager.getCurrentPlayer());
    }, []);

    if (!playerData) {
        return <div>Getting player data...</div>;
    }

    return (
        <div className="telegram-data-container">
            <h2>Telegram User Data</h2>
            <pre
                style={{
                    backgroundColor: "#f5f5f5",
                    padding: "15px",
                    borderRadius: "5px",
                    overflow: "auto",
                    maxHeight: "500px",
                    color: "black",
                }}
            >
                {JSON.stringify(playerData, null, 2)}
            </pre>
        </div>
    );
}
