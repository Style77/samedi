/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: i18n,

  images: {
    domains: ['localhost', '150.230.144.136'],
  },

  env: {
    APPWRITE_APP_ENDPOINT: process.env.APPWRITE_APP_ENDPOINT,
    APPWRITE_PROJECT_ID: process.env.APPWRITE_PROJECT_ID,
    APPWRITE_API_KEY_USERS_READ: process.env.APPWRITE_API_KEY_USERS_READ,
    APPWRITE_TEAMS_DATABASE_ID: process.env.APPWRITE_TEAMS_DATABASE_ID,
    APPWRITE_LAYOUTS_COLLECTION_ID: process.env.APPWRITE_LAYOUTS_COLLECTION_ID,
  }
}

module.exports = nextConfig
