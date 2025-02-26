/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
  },
};

module.exports = nextConfig;
