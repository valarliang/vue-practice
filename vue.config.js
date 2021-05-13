const path = require('path')
const port = 7070
const { name } = require('./package');

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/',
  devServer: {
    port,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },
  configureWebpack: { // 基本配置
    name,
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd', // 把微应用打包成 umd 库格式
      jsonpFunction: `webpackJsonp_${name}`,
    },
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