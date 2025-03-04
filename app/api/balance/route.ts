import { NextRequest, NextResponse } from "next/server";
// import { PlayerApiClient, GetBalanceRequest } from "@/lib/api-clients/player-api-client";
import { AuthenticationService } from "@/lib/api-clients/authentication-service";
// import axios from "axios";
import { environment } from "@/lib/environment";

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
        const walletType = searchParams.get("walletType");

        if (!playerId) {
            return NextResponse.json({ success: false, error: "Player ID is required" }, { status: 400 });
        }

        if (!walletType) {
            return NextResponse.json({ success: false, error: "Wallet type is required" }, { status: 400 });
        }

        // Build get balance request
        // const getBalanceRequest: GetBalanceRequest = {
        //     playerId: playerId,
        //     walletType: walletType,
        // };

        // Initialize API client and forward the request
        // const apiClient = new PlayerApiClient(axios.create(), environment.playerSiteApi);
        // const authToken = authHeader.substring(4); // Remove 'tma ' prefix
        // const response = await apiClient.getBalance(authToken, getBalanceRequest);

        // if (response.code !== 200) {
        //     return NextResponse.json({ success: false, error: response.error ?? "Failed to get balance" }, { status: 400 });
        // }

        // Generate random balance between 0 and 10000
        const randomBalance = Math.floor(Math.random() * 10000);

        return NextResponse.json({
            balance: randomBalance,
        });
    } catch (error) {
        console.error("Get balance error:", error);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}
