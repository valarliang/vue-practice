const path = require('path')
const PurgeCSSPlugin = require('purgecss-webpack-plugin')
const glob = require('glob-all')

module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: 'async', // 选择哪些 chunk 进行优化
      minSize: 20000, // 生成 chunk 的最小体积，大于20k则分割
      minRemainingSize: 0, // 生产默认等于minSize
      minChunks: 1, // 
      maxAsyncRequests: 30, // 
      maxInitialRequests: 30, // 
      enforceSizeThreshold: 50000, // 
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
