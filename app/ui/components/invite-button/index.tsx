"use client";
import { useCallback } from "react";
import { useResources } from "../../hooks/use-resources";
import styles from "./invite-button.module.scss";
import { playerManager } from "@/lib/players/player-manager";
import { shareURL } from "@telegram-apps/sdk";

declare global {
    interface Window {
        Telegram?: {
            WebApp?: {
                shareUrl: (url: string) => void;
            };
        };
    }
}

export function InviteButton() {
    const r = useResources();

    const handleInvite = useCallback(async () => {
        const player = playerManager.getCurrentPlayer();
        if (!player) {
            console.error("Player data not found");
            return;
        }

        // Create the mini app URL with the referral code
        const miniAppUrl = `https://t.me/playsaba_bot/playsaba?start=ref_${player.id}`;

        try {
            // Use Telegram's native share functionality
            if (shareURL.isAvailable()) {
                await shareURL(miniAppUrl, "Join me on PlaySaba! 🎮");
            } else {
                // Fallback to direct URL open if share is not available
                window.open(miniAppUrl, "_blank");
            }
        } catch (error) {
            console.error("Failed to share URL:", error);
            // Fallback to direct URL open if share fails
            window.open(miniAppUrl, "_blank");
        }
    }, []);

    return (
        <button className={`btn btn-primary me-2 ${styles.inviteButton}`} onClick={handleInvite} type="button">
            {r.buttons.invite}
        </button>
    );
}

export default InviteButton;
