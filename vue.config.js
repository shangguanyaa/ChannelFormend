const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // proxy: {
    //   ['/dev-api']: {
    //     target: 'http://home.olbing.cn',
    //     changeOrigin: true,
    //     ws: true,
    //     pathRewrite: {
    //       '^/dev-api': ''
    //     }
    //   }
    // }
  }
})
