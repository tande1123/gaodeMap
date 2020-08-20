const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const dllPath = path.resolve(__dirname, '../src/assets/dll') // dll文件存放的目录

process.env.NODE_ENV = 'production' // 将 NODE_ENV 设置为 production 可减少依赖的大小
module.exports = {
  entry: {
    // 把 vue 相关模块的放到一个单独的动态链接库
    vue: ['babel-polyfill', 'vue', 'vue-router', 'vuex', 'axios', 'element-ui']
  },
  output: {
    filename: '[name]-[hash].dll.js', // 生成vue.dll.js
    path: dllPath,
    library: '_dll_[name]'
  },
  plugins: [
    new CleanWebpackPlugin(['*.js'], { // 清除之前的dll文件
      root: dllPath
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.DllPlugin({
      name: '_dll_[name]',
      // manifest.json 描述动态链接库包含了哪些内容
      path: path.join(__dirname, './', '[name].dll.manifest.json')
    }),
    // 压缩代码
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        pure_funcs: ['console.log']
      },
      sourceMap: true
    })
  ]
}
