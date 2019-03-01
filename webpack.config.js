let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    home: './src/index.js'
  },
  // 源码映射，打包时会在dist中单独生成一个source-map(.map)文件，出错时会标识打包前文件当前出错的类和行
  // devtool: 'source-map', // 增加的映射文件可以帮我们调试源代码，特点：大和全
  // devtool: 'eval-source-map', // 不会产生单独的映射文件会直接打包到打包文件中，可以产生报错行和列
  // devtool: 'cheap-module-source-map', // 不会产生列，会产生一个单独的映射文件
  devtool: 'cheap-module-eval-source-map', // 不会产生文件，也不会产生列 
  performance: {
    hints:false
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      chunks: ['home'] // 模板引入homejs模块
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}