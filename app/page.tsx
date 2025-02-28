"use client";
import { LanguageSwitcher, DepositButton, WithdrawButton } from "./ui/components";
import layoutStyles from "./layout.module.scss";
import TelegramUserData from "./lib/telegram/components/telegram-user-data";

export default function Home() {
    return (
        <div className="container py-4">
            <div className={layoutStyles.headerContainer}>
                <div className={layoutStyles.buttonContainer}>
                    <DepositButton />
                    <WithdrawButton />
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
