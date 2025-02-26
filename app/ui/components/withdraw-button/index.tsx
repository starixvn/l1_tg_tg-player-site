"use client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useResources } from "../../hooks/use-resources";
import styles from "./withdraw-button.module.scss";

export function WithdrawButton() {
    const router = useRouter();
    const r = useResources();

    const handleWithdraw = useCallback(() => {
        router.push("/pages/withdraw");
    }, [router]);

    return (
        <button className={`btn btn-danger ${styles.withdrawButton}`} onClick={handleWithdraw} type="button">
            {r.buttons.withdraw}
        </button>
    );
}

export default WithdrawButton;
