import { NextResponse } from "next/server";

/**
 * Health check endpoint to verify the application is running properly
 * @returns JSON response with status information
 */
export async function GET() {
    // You can add more detailed health checks here if needed
    // For example, database connectivity, external service availability, etc.

    const healthStatus = {
        status: "ok1",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        version: process.env.npm_package_version || "unknown",
        environment: process.env.NODE_ENV || "development",
    };

    return NextResponse.json(healthStatus, { status: 200 });
}
