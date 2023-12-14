
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: false,
  env: { 
    BASE_URL: "https://eurasiaglobal.net",
    WEBSITE_NAME: "Eurasia B2B Global DMC Pvt Ltd",
    SMTP_AUTH_USER: "support@eurasiaglobal.net",
    SMTP_AUTH_PASS: "Support@8090551004",
    GOOGLE_SITE_KEY: "6LewAx4pAAAAAOylwQGWQMax6y7hquJAzbNtLXsS",
    GA_MEASUREMENT_ID: "G-CCBLH4ESQZ",
    MICROSOFT_CLARITY_ID: "jxjqdymgub",
  },
  rewrites: async () => [
    {
      source: "/public/lp/test.html",
      destination: "/pages/api/htmlApi.js",
    },
    {
      source: '/blog',
      destination: 'http://blog.eurasiaglobal.net/',
    },
  ]
};

module.exports = nextConfig;
