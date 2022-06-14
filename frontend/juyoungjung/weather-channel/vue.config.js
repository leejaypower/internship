const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: ['vuetify'],
  devServer: {
    port: 8080,
    proxy: {
      '/map-reversegeocode': {
        target: 'https://naveropenapi.apigw.ntruss.com',
        changeOrigin: true,
      },
      '/map-geocode': {
        target: 'https://naveropenapi.apigw.ntruss.com',
        changeOrigin: true,
      },
    },
  },
})
