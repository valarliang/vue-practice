const path = require('path')
const port = 7070
const title = '最佳实践'

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/vue-demo',
  devServer: {
    port,
  },
  configureWebpack: {
    name: title
  },
  chainWebpack(config) {
    // 对config链式操作可修改loader、plugin，配置查看 vue inspect --rule svg
    config.module.rule('svg')
      .exclude.add(resolve('src/assets/icons'))

    config.module.rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons')).end()
      .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
          symbolId: 'icon-[name]'
        })
  }
}