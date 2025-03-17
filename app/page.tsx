"use client";
import { useState } from "react";
import { SplashScreen } from "./ui/components/splash-screen";
import { PlayerProvider } from "./ui/contexts/player-context";
import { GameProvider } from "./ui/contexts/game-context";
import { GameFrame } from "./ui/components/game/game-frame";

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);

    const handleLoadComplete = () => {
        setIsLoading(false);
    };

    if (isLoading) {
        return <SplashScreen onLoadComplete={handleLoadComplete} />;
    }

    return (
        <PlayerProvider>
            <GameProvider>
                <GameFrame />
            </GameProvider>
        </PlayerProvider>
    );
}
