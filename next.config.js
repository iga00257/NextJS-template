require('@babel/register')({
  configFile: './babel.config',
  extensions: ['.js', '.ts'], // 指定要轉換的檔案副檔名，例如 .js 或 .ts
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    additionalData: '@import "./src/styles/_variables.scss";@import "./src/styles/mixins/mixins.scss";',
  },
}

module.exports = nextConfig
