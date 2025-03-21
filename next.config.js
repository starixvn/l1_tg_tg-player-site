const { withSentryConfig } = require('@sentry/nextjs');
const path = require('path');

// Sentry configuration options
const sentryOptions = {
    org: 'sentry',
    project: 'tg-player-site',
    sentryUrl: process.env.SENTRY_URL,
    silent: !process.env.CI,
    widenClientFileUpload: true,
    reactComponentAnnotation: { enabled: true },
    tunnelRoute: '/monitoring',
    hideSourceMaps: true,
    disableLogger: true,
    automaticVercelMonitors: true,
};

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    i18n: {
        locales: ["en", "es"],
        defaultLocale: "en",
        localeDetection: false,
    },
    env: {
        BOT_TOKEN: process.env.BOT_TOKEN,
        PLAYER_SITE_API: process.env.PLAYER_SITE_API,
        NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
        NEXT_PUBLIC_SENTRY_URL: process.env.NEXT_PUBLIC_SENTRY_URL,
    }
};

// Wrap nextConfig with Sentry
const configWithSentry = withSentryConfig(
    nextConfig,
    sentryOptions
);

module.exports = configWithSentry;
