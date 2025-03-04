interface Environment {
    botToken: string;
    playerSiteApi: string;
}

export const environment: Environment = {
    botToken: process.env.BOT_TOKEN || "",
    playerSiteApi: process.env.PLAYER_SITE_API || "",
};

// Validate required environment variables
const validateEnvironment = () => {
    const requiredEnvVars: (keyof Environment)[] = ["botToken"];
    const missingEnvVars = requiredEnvVars.filter((key) => !environment[key]);

    if (missingEnvVars.length > 0) {
        throw new Error(
            `Missing required environment variables: ${missingEnvVars.join(", ")}\n` +
                "Please check your .env file and ensure all required variables are set."
        );
    }
};

// Call validation on app startup
validateEnvironment();
