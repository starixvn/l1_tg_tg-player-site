interface Environment {
    botToken: string;
    playerSiteApi: string;
    sentryDsn: string;
    sentryUrl: string;
}

export const environment: Environment = {
    botToken: process.env.BOT_TOKEN || "",
    playerSiteApi: process.env.PLAYER_SITE_API || "",
    sentryDsn: process.env.NEXT_PUBLIC_SENTRY_DSN || "",
    sentryUrl: process.env.NEXT_PUBLIC_SENTRY_URL || ""
};

// Validate required environment variables
const validateEnvironment = () => {
    const requiredEnvVars: (keyof Environment)[] = ["botToken", "sentryDsn"];
    const missingEnvVars = requiredEnvVars.filter((key) => !environment[key]);

    if (missingEnvVars.length > 0) {
        throw new Error(
            `Missing required environment variables: ${missingEnvVars.join(", ")}`
        );
    }
};

// Call validation on app startup
validateEnvironment();
