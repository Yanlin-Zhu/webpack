// webpack是node写出来的 node的写法
let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  optimization: { // 优化项
    minimizer: [
      new UglifyJsPlugin({ // 压缩js
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({}) // 压缩css
    ]
  },
  devServer: { // 开发服务器的配置（webpack-dev-server）
    port: 3000,
    progress: true
  },
  mode: 'production', // 模式默认有两种production development开发模式代码不压缩看的清晰
  entry: './src/index.js', // 入口文件
  output: {
    filename: 'bundle.[chunkhash].js', // 打包后文件名
    path: path.resolve(__dirname, 'dist'), //打包后路径必须是绝对路径resolve方法把相对路径解析成绝对路径，__dirname加不加都可以，它代表在当前目录下产生一个dist目录
  },
  plugins: [ // 数组，放着所有webpack插件
    new HtmlWebpackPlugin({ // 用于使用模板打包时生成index.html文件，并且在run dev时会将模板文件也打包到内存中
      template: './index.html', // 模板文件
      filename: 'index.html', // 打包后生成文件
      hash: true, // 添加hash值解决缓存问题
      minify: { // 对打包的html模板进行压缩
        removeAttributeQuotes: true, // 删除属性双引号
        collapseWhitespace: true // 折叠空行变成一行
      }
    }),
    new MiniCssExtractPlugin({ // 抽离css样式
      filename: 'main.[chunkhash].css'// 抽离出来的文件名
    })
  ],
  module: { // 模块
    // loader
    rules: [ // 规则 loader的特点-希望单一功能
      // css-loader-解析css文件包括css文件的引入（@import）语法等
      // style-loader-把css文件插入到head标签中
      {
        test: /\.css$/,
        // 字符串只用一个loader，多个loader用数组配置
        // loader的顺序默认从右向左执行，从下到上执行
        // 如果需要传参loader还可以配置成对象
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader, // 将css文件抽离出来，不再以style标签存放，而是创建link标签引入
          'css-loader',
          'postcss-loader'
        ]
      },
      // 可处理less文件除此之外还有sass、stylus
      // node-sass、sass-loader、stylus-loader
      {
        test: /\.less$/,
        use: [
          // 'style-loader', // 插入style标签
          MiniCssExtractPlugin.loader, // 将less文件抽离出来，不再以style标签存放，而是创建link标签引入
          'css-loader', // 解析路径
          'postcss-loader',
          'less-loader' // 把less转换成css
        ]
      }
    ]
  }
}