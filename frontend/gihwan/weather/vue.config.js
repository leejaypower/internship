const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: [
    'vuetify',
  ],
  devServer: {
    proxy: 'https://naveropenapi.apigw.ntruss.com',
  },
})
