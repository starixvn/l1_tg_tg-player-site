import { validate, parse } from '@telegram-apps/init-data-node';
import type { InitData } from '@telegram-apps/init-data-node';
import { NextRequest, NextResponse } from 'next/server';

// Your secret bot token - should be in environment variables
// @playsaba_bot
const BOT_TOKEN = process.env.BOT_TOKEN || '7748274701:AAFtLHxIy0-8bb8RkdLWxBo9eBcKJqzbj5U';

export async function POST(request: NextRequest) {
    try {
        // Extract authorization header
        const authHeader = request.headers.get('authorization');
        if (!authHeader) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Split auth header into type and data
        const [authType, authData = ''] = authHeader.split(' ');

        if (authType !== 'tma') {
            return NextResponse.json(
                { error: 'Invalid authorization type' },
                { status: 401 }
            );
        }

        try {
            // Validate init data
            validate(authData, BOT_TOKEN, {
                expiresIn: 3600, // 1 hour expiration
            });

            // Parse init data
            const initData: InitData = parse(authData);

            // Return the init data
            return NextResponse.json(initData);

        } catch (error) {
            return NextResponse.json(
                { error: error instanceof Error ? error.message : 'Validation failed' },
                { status: 401 }
            );
        }

    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Internal server error' },
            { status: 500 }
        );
    }
}
