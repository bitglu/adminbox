/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "i.pinimg.com",
      "softr-prod.imgix.net",
      "latercera.com",
      "revistainteriores.es",
    ],
  },
};

module.exports = nextConfig;
