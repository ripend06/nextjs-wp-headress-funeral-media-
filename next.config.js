/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  staticPageGenerationTimeout: 3 * 60 * 1000, // タイムアウトを3分に設定
  // // Next.js プラグインの追加
  // plugins: [
  //   // サーバーレスモードを有効にするプラグイン
  //   ['@next/plugin-serverless'],
  //   // 他のプラグインがあればここに追加
  // ],
  env: {
    GOOGLE_MAPS_API_KEY: 'AIzaSyA6nerYNTNJUWNq4GdApIqY_y8o9vcdqZ0',
  },

}

module.exports = nextConfig
