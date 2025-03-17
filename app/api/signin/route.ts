import { NextRequest, NextResponse } from "next/server";
import { PlayerApiClient, SignInRequest } from "@/lib/api-clients/player-api-client";
import { AuthenticationService } from "@/lib/api-clients/authentication-service";
import axios from "axios";
import { environment } from "@/lib/environment";

// Initialize authentication service with configuration
const authService = new AuthenticationService({
    botToken: environment.botToken ?? "",
    expiresIn: 24 * 3600, // 24 hours expiration
});

export async function POST(request: NextRequest) {
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

        // Build sign in request from validation result data
        const signInRequest: SignInRequest = {
            telegram: {
                id: validationResult.data.user.id,
                firstName: validationResult.data.user.first_name,
                lastName: validationResult.data.user.last_name ?? "",
                username: validationResult.data.user.username ?? "",
                languageCode: validationResult.data.user.language_code ?? "",
                allowWriteToPm: validationResult.data.user.allows_write_to_pm ?? false,
                photoUrl: validationResult.data.user.photo_url ?? "",
                isPremium: validationResult.data.user.is_premium || false,
            },
            walletType: "main", // Default wallet type
        };

        //Initialize API client and forward the request
        const apiClient = new PlayerApiClient(axios.create(), environment.playerSiteApi);
        const authToken = authHeader.substring(4); // Remove 'tma ' prefix
        const response = await apiClient.signIn(authToken, signInRequest);

        return NextResponse.json({
            player: response.data
        });
    } catch (error) {
        console.error("Sign in error:", error);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}
