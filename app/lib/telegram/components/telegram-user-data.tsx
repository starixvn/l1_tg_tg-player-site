"use client";

import { useState, useEffect } from "react";
import { getFormattedTelegramData, FormattedTelegramData } from "../telegram-utils";

declare global {
    interface Window {
        Telegram: {
            WebApp: {
                initData: string;
            }
        }
    }
}

/**
 * Component to display Telegram user data in the requested format
 */
export default function TelegramUserData() {
    const [telegramData, setTelegramData] = useState<FormattedTelegramData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // Get formatted Telegram data
            const data = getFormattedTelegramData();
            setTelegramData(data);

            if (data) {

                console.log(window.Telegram.WebApp.initData);
                const authResponse = await fetch('/api/auth', {
                    method: 'POST',
                    headers: {
                        Authorization: `tma ${window.Telegram.WebApp.initData}`
                    },
                });

                const authData = await authResponse.json();
                console.log(authData);
            }

        } catch (err) {
            setError("Failed to get Telegram data");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading Telegram data...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!telegramData) {
        return <div>No Telegram data available. Are you running this in a Telegram Web App?</div>;
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
                {JSON.stringify(telegramData, null, 2)}
            </pre>
        </div>
    );
}
