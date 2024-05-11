const fs = require('fs')

// const d3packages = fs.readdirSync('node_modules').filter((name) => name.startsWith('d3-'))
// const withTM = require('next-transpile-modules')(d3packages)
/**
 * @type {import('next').NextConfig}
 */
const nextConfig =  {
  distDir: 'build',
  images: {
    domains: ['localhost'],
    loader: 'custom',
  },
  assetPrefix: './',
  output: "export",
  distDir: 'standalone/out/',
}

module.exports = nextConfig
