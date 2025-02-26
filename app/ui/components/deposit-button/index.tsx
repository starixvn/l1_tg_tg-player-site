"use client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useResources } from "../../hooks/use-resources";
import styles from "./deposit-button.module.scss";

export function DepositButton() {
    const router = useRouter();
    const r = useResources();

    const handleDeposit = useCallback(() => {
        router.push("/pages/deposit");
    }, [router]);

    return (
        <button className={`btn btn-success me-2 ${styles.depositButton}`} onClick={handleDeposit} type="button">
            {r.buttons.deposit}
        </button>
    );
}

export default DepositButton;
