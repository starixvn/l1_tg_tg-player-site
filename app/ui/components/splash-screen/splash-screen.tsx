import { useEffect, useState, useCallback } from "react";
import styles from "./splash-screen.module.scss";
import { getExtendedTelegramData, ExtendedTelegramWebAppData } from "@/lib/telegram/telegram-client";
// import { Player, playerManager } from "@/lib/players/player-manager";
import SessionTimeout from "../session-timeout/session-timeout";
// import { PlayerSiteClient } from "@/lib/api-clients/player-site-client";
// import { gameManager, GameSession } from "@/lib/game/game-manager";

interface SplashScreenProps {
    onLoadComplete?: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onLoadComplete }) => {
    const [telegramData, setTelegramData] = useState<ExtendedTelegramWebAppData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    // const playerSiteClient = new PlayerSiteClient();

    const fetchData = useCallback(async (onLoadComplete?: () => void) => {
        try {
            const data = await getExtendedTelegramData();

            if (data?.tgWebAppData?.user) {
                setTelegramData(data);

                // Sign in the user
                // const playerResponse = await playerSiteClient.signIn();
                // const gameResponse = await playerSiteClient.gameOpen();

                // Create player data from sign in response and telegram data
                // const player: Player = {
                //     id: playerResponse.playerId,
                //     languageCode: data.tgWebAppData.user.languageCode,
                //     balance: playerResponse.wallet.amount ?? 0, // Initial balance is 0
                //     telegramInfo: data,
                //     walletType: playerResponse.wallet.type,
                // };
                // console.log(playerResponse);
                // // Update player data with combined information
                // await playerManager.updatePlayerData(player);

                // // Convert gameResponse to GameSession
                // if (gameResponse?.result) {
                //     const gameSession: GameSession = {
                //         redirectUrl: gameResponse.result.redirectUrl,
                //         token: gameResponse.result.token,
                //         seq: gameResponse.result.seq,
                //         errorCode: gameResponse.result.errorCode,
                //         errorMessage: gameResponse.result.errorMessage
                //     };

                //     // Update game session
                //     await gameManager.updateGameSession(gameSession);
                // }

                onLoadComplete?.();
            }
        } catch (err) {
            setError("Failed to get Telegram data");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData(onLoadComplete);
    }, [fetchData, onLoadComplete]);

    if (error) {
        console.error("SplashScreen error:", error);
        return <SessionTimeout onRetry={() => fetchData(onLoadComplete)} />;
    }

    if (!loading && !telegramData) {
        return <SessionTimeout onRetry={() => fetchData(onLoadComplete)} />;
    }

    return (
        <div className={styles.splashScreen}>
            <div className={styles.content}>
                <div className={styles.logo}>{loading && <div className={styles.spinner}></div>}</div>
            </div>
        </div>
    );
};

export default SplashScreen;
