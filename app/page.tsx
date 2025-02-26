"use client";
import { LanguageSwitcher, DepositButton, WithdrawButton } from "./ui/components";
import { useResources } from "./ui/hooks/use-resources";
import layoutStyles from "./layout.module.scss";
import { appSettings } from "./lib/app-settings";
import { useTelegramUser } from "./lib/telegram/use-telegram-user";

export default function Home() {
    const r = useResources();
    useTelegramUser();
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
                    <h1 className="display-4 mb-4">{r.home}</h1>
                    <p>{appSettings.sentry.environment}</p>
                </div>
            </div>
        </div>
    );
}
