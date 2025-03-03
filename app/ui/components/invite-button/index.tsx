"use client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useResources } from "../../hooks/use-resources";
import styles from "./invite-button.module.scss";

export function InviteButton() {
    const router = useRouter();
    const r = useResources();

    const handleInvite = useCallback(() => {
        router.push("/pages/invite");
    }, [router]);

    return (
        <button className={`btn btn-primary me-2 ${styles.inviteButton}`} onClick={handleInvite} type="button">
            {r.buttons.invite}
        </button>
    );
}

export default InviteButton;
