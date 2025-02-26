interface SentryOptions {
    dsn: string;
    environment: string;
}

export interface IAppSettings {
    sentry: SentryOptions;
    system: string;
    env: string;
    playerApi: string;
}

declare global {
    interface Window {
        envConfig: IAppSettings;
    }
}

// Default settings for server-side rendering
const defaultSettings: IAppSettings = {
    sentry: {
        dsn: "",
        environment: "",
    },
    system: "player-site",
    env: "",
    playerApi: "",
};

const getAppSettings = (): IAppSettings => {
    // Check if window is defined (client-side)
    if (typeof window !== "undefined" && window.envConfig) {
        return window.envConfig;
    }

    // Return default settings for server-side
    return defaultSettings;
};

export const appSettings: IAppSettings = getAppSettings();
