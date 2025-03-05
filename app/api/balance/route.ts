import { NextRequest, NextResponse } from "next/server";
// import { PlayerApiClient, GetBalanceRequest } from "@/lib/api-clients/player-api-client";
import { AuthenticationService } from "@/lib/api-clients/authentication-service";
// import axios from "axios";
import { environment } from "@/lib/environment";
import { GetBalanceRequest, PlayerApiClient } from "@/lib/api-clients/player-api-client";
import axios from "axios";

// Initialize authentication service with configuration
const authService = new AuthenticationService({
    botToken: environment.botToken ?? "",
    expiresIn: 24 * 3600, // 24 hours expiration
});

export async function GET(request: NextRequest) {
    try {
        // Get the auth token from the Authorization header
        const authHeader = request.headers.get("Authorization");
        if (!authHeader || !authHeader.startsWith("tma ")) {
            return NextResponse.json({ success: false, error: "Invalid or missing authorization header" }, { status: 401 });
        }

        // Validate the auth token using AuthenticationService
        const validationResult = await authService.validateAuthHeader(authHeader);
        if (!validationResult.isValid || !validationResult.data?.user) {
            return NextResponse.json({ success: false, error: validationResult.error || "Invalid user data" }, { status: 401 });
        }

        // Get parameters from URL query
        const searchParams = request.nextUrl.searchParams;
        const playerId = searchParams.get("playerId");

        if (!playerId) {
            return NextResponse.json({ success: false, error: "Player ID is required" }, { status: 400 });
        }

        const getBalanceRequest: GetBalanceRequest = {
            playerId: playerId,
        };

        const apiClient = new PlayerApiClient(axios.create(), environment.playerSiteApi);
        const authToken = authHeader.substring(4); // Remove 'tma ' prefix
        const response = await apiClient.getBalance(authToken, getBalanceRequest);
        console.log(response)
        if (response.code !== 200) {
            return NextResponse.json({ success: false, error: response.error ?? "Failed to get balance" }, { status: 400 });
        }
        
        return NextResponse.json({
            balance: response.data?.amount,
        });
    } catch (error) {
        console.error("Get balance error:", error);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}
