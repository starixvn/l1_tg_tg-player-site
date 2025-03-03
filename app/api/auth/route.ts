import { NextRequest, NextResponse } from "next/server";
import { AuthenticationService } from "@/lib/api-clients/authentication-service";

// Your secret bot token - should be in environment variables
// @playsaba_bot
const BOT_TOKEN = process.env.BOT_TOKEN || "7748274701:AAFtLHxIy0-8bb8RkdLWxBo9eBcKJqzbj5U";

const authService = new AuthenticationService({
    botToken: BOT_TOKEN,
    expiresIn: 24 * 3600, // 24 hours expiration
});

export async function POST(request: NextRequest) {
    try {
        const authHeader = request.headers.get("authorization");
        const result = await authService.validateAuthHeader(authHeader);

        if (!result.isValid) {
            return NextResponse.json({ error: result.error }, { status: 401 });
        }

        return NextResponse.json(result.data);
    } catch (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : "Internal server error" }, { status: 500 });
    }
}
