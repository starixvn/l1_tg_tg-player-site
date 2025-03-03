import { useEffect, useState } from "react";
import styles from "./splash-screen.module.scss";
import { retrieveLaunchParams } from "@telegram-apps/sdk";
import { getExtendedTelegramData, ExtendedTelegramWebAppData } from "@/lib/telegram/telegram-client";
import { playerManager } from "@/lib/players/player-manager";
import SessionTimeout from "../session-timeout/session-timeout";

interface SplashScreenProps {
    onLoadComplete?: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onLoadComplete }) => {
    const [telegramData, setTelegramData] = useState<ExtendedTelegramWebAppData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchData(onLoadComplete);
    }, [onLoadComplete]);

    const signIn = async () => {
        const { initDataRaw } = retrieveLaunchParams();
        const authResponse = await fetch("/api/signin", {
            method: "POST",
            headers: {
                Authorization: `tma ${initDataRaw}`,
            },
        });

        const authData = await authResponse.json();

        return authData;
    };

    const fetchData = async (onLoadComplete?: () => void) => {
        try {
            const data = await getExtendedTelegramData();

            if (data?.tgWebAppData?.user) {
                setTelegramData(data);

                // Sign in the user
                await signIn();

                // Update player data with Telegram user information
                await playerManager.updatePlayerData(data);
                onLoadComplete?.();
            }
        } catch (err) {
            setError("Failed to get Telegram data");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (error) {
        return (
            <div className={styles.splashScreen}>
                <div className={styles.content}>
                    <div className={styles.error}>{error}</div>
                </div>
            </div>
        );
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
