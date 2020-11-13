module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    disableHostCheck: true,
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 300,
      poll: 1000,
    },
  },
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
        .loader('vue-loader')
        .tap(options => {
          options.prettify = false
          return options
        })

  },
}