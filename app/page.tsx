"use client";
import { useState } from "react";
import { LanguageSwitcher, DepositButton, WithdrawButton, InviteButton, PlayerInfo } from "./ui/components";
import { SplashScreen } from "./ui/components/splash-screen";
import layoutStyles from "./layout.module.scss";
import { PlayerProvider } from "./ui/contexts/player-context";

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);

    const handleLoadComplete = () => {
        setIsLoading(false);
    };

    if (isLoading) {
        return <SplashScreen onLoadComplete={handleLoadComplete} />;
    }

    return (
        <div className="container py-4">
            <div className={layoutStyles.headerContainer}>
                <div className={layoutStyles.buttonContainer}>
                    <DepositButton />
                    <WithdrawButton />
                    <InviteButton />
                </div>
                <LanguageSwitcher />
            </div>

            <div className="row mt-4">
                <div className="col-12">
                    <PlayerProvider>
                        <PlayerInfo />
                    </PlayerProvider>
                </div>
            </div>
        </div>
    );
}
