/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    i18n: {
        locales: ["en", "es"],
        defaultLocale: "en",
    },
    env: {
        BOT_TOKEN: process.env.BOT_TOKEN,
        PLAYER_SITE_API: process.env.PLAYER_SITE_API,
    },
};

module.exports = nextConfig;
