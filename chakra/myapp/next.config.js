/** @type {import('next').NextConfig} */

require('dotenv').config()



const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['localhost'],
  },
  components: {
    Modal: {
      baseStyle: {
        dialogContainer: {
          "@supports(height: -webkit-fill-available)": {},
        },
      },
    },
  },
}

module.exports = nextConfig

