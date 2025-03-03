import React from "react";
import styles from "./session-timeout.module.scss";

interface SessionTimeoutProps {
    onRetry?: () => void;
}

const SessionTimeout: React.FC<SessionTimeoutProps> = ({ onRetry }) => {
    const handleRetry = () => {
        // First call the onRetry callback if provided
        onRetry?.();
        // Then reload the page
        window.location.reload();
    };

    return (
        <div className={styles.sessionTimeout}>
            <div className={styles.content}>
                <h2>Session Timeout</h2>
                <p>Your session has expired. Please try again.</p>
                {onRetry && (
                    <button className={styles.retryButton} onClick={handleRetry}>
                        Retry
                    </button>
                )}
            </div>
        </div>
    );
};

export default SessionTimeout;
