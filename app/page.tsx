"use client";
import { useState } from "react";
import { LanguageSwitcher, DepositButton, WithdrawButton, InviteButton } from "./ui/components";
import { SplashScreen } from "./ui/components/splash-screen";
import layoutStyles from "./layout.module.scss";
import TelegramUserData from "./lib/telegram/components/telegram-user-data";

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
                    {/* Display Telegram User Data */}
                    <div className="mt-4">
                        <TelegramUserData />
                    </div>
                </div>
            </div>
        </div>
    );
}
