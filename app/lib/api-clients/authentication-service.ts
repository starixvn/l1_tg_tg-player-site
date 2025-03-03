import { validate, parse } from "@telegram-apps/init-data-node";
import type { InitData } from "@telegram-apps/init-data-node";

export interface IAuthenticationResult {
    isValid: boolean;
    data?: InitData;
    error?: string;
}

export interface IAuthenticationConfig {
    botToken: string;
    expiresIn: number;
}

export class AuthenticationService {
    private readonly config: IAuthenticationConfig;

    constructor(config: IAuthenticationConfig) {
        this.config = config;
    }

    public async validateAuthHeader(authHeader: string | null): Promise<IAuthenticationResult> {
        if (!authHeader) {
            return {
                isValid: false,
                error: "Unauthorized",
            };
        }

        const [authType, authData = ""] = authHeader.split(" ");

        if (authType !== "tma") {
            return {
                isValid: false,
                error: "Invalid authorization type",
            };
        }

        try {
            // Validate init data
            validate(authData, this.config.botToken, {
                expiresIn: this.config.expiresIn,
            });

            // Parse init data
            const initData: InitData = parse(authData);

            return {
                isValid: true,
                data: initData,
            };
        } catch (error) {
            return {
                isValid: false,
                error: error instanceof Error ? error.name : "Validation failed",
            };
        }
    }
}
