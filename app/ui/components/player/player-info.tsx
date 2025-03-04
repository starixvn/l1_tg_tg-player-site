import React, { useEffect, useState } from "react";
import { usePlayer } from "../../contexts/player-context";
import { PlayerSiteClient } from "../../../lib/api-clients/player-site-client";

export const PlayerInfo: React.FC = () => {
    const { player } = usePlayer();
    const [balance, setBalance] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBalance = async () => {
            if (!player) return;

            try {
                setIsLoading(true);
                setError(null);
                const client = new PlayerSiteClient();
                const response = await client.getBalance({
                    playerId: player.id,
                    walletType: player.walletType,
                });
                setBalance(response.balance);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to fetch balance");
            } finally {
                setIsLoading(false);
            }
        };

        // Initial fetch
        fetchBalance();

        // Set up interval for periodic updates (10 seconds)
        const intervalId = setInterval(fetchBalance, 10000);

        // Cleanup function to clear interval when component unmounts or player changes
        return () => clearInterval(intervalId);
    }, [player]);

    if (!player) {
        return <div>Loading player data...</div>;
    }

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Player Information</h5>
                <div className="mb-4">
                    <div className="d-flex align-items-center">
                        <h6 className="mb-0 me-2">
                            Balance:
                            {isLoading ? (
                                <span className="badge bg-secondary ms-2">Loading...</span>
                            ) : error ? (
                                <span className="badge bg-danger ms-2">Error</span>
                            ) : (
                                <span className="badge bg-primary fs-5 ms-2">{balance}</span>
                            )}
                        </h6>
                    </div>
                </div>
                <div className="d-flex justify-content-between">
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
                        {JSON.stringify(player, null, 2)}
                    </pre>
                </div>
            </div>
        </div>
    );
};
