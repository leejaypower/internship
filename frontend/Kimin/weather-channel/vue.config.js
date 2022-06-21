const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: ['vuetify'],
  devServer: {
    proxy: { // proxyTable 설정
      '/map-reversegeocode/v2/gc': {
        target: 'https://naveropenapi.apigw.ntruss.com',
        changeOrigin: true,
      },
      '/map-geocode/v2/geocode': {
        target: 'https://naveropenapi.apigw.ntruss.com',
        changeOrigin: true,
      },
    },
  },
})
