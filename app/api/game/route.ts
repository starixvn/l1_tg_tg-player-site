import { NextRequest, NextResponse } from "next/server";
import { PlayerApiClient, GameOpenRequest } from "@/lib/api-clients/player-api-client";
import { AuthenticationService } from "@/lib/api-clients/authentication-service";
import axios from "axios";
import { environment } from "@/lib/environment";

// Initialize authentication service
const authService = new AuthenticationService({
    botToken: environment.botToken ?? "",
    expiresIn: 24 * 3600,
});

export async function POST(request: NextRequest) {
    try {
        const authHeader = request.headers.get("Authorization");
        if (!authHeader || !authHeader.startsWith("tma ")) {
            return NextResponse.json({ success: false, error: "Invalid or missing authorization header" }, { status: 401 });
        }

        // Parse initData to get game info
        const initData = authHeader.slice(4);
        const urlParams = new URLSearchParams(decodeURIComponent(initData));
        const startParam = urlParams.get("start_param");
        if (!startParam) {
            return NextResponse.json({ success: false, error: "Missing game ID" }, { status: 400 });
        }
        let gameData = JSON.parse(atob(startParam));

        // Validate user
        const validationResult = await authService.validateAuthHeader(authHeader);
        if (!validationResult.isValid || !validationResult.data?.user) {
            return NextResponse.json({ success: false, error: validationResult.error || "Invalid user data" }, { status: 401 });
        }

        // Get user data from validation result
        const userData = validationResult.data.user;

        const gameRequest: GameOpenRequest = {
            TimeStamp: new Date().toISOString(),
            Seq: crypto.randomUUID(),
            PlayerId: userData.id.toString(),
            LangId: userData.language_code || "en-US",
            CurrencyId: "UUS",
            Inputs: {
                GameId: gameData.gameId,
                BrowserUserAgent: request.headers.get("user-agent") || "",
                Domain: request.headers.get("origin") || "",
                Location: request.headers.get("referer") || "",
                GameTypeId: "1",
                IP: request.headers.get("x-forwarded-for") || 
                    request.headers.get("x-real-ip") || 
                    "",
                ReturnUrl: `${request.headers.get("origin")}/game/return`
            }
        };

        //Initialize API client and forward the request
        const apiClient = new PlayerApiClient(axios.create(), environment.playerSiteApi);
        const authToken = authHeader.substring(4);
        const response = await apiClient.gameOpen(authToken, gameRequest);

        return NextResponse.json(response);
    } catch (error) {
        console.error("Game open error:", error);
        return NextResponse.json({ 
            success: false, 
            error: error instanceof Error ? error.message : "Internal server error",
            code: 500
        }, { status: 500 });
    }
} 
