// webpack是node写出来的 node的写法
let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
let webpack = require('webpack')
let CleanWebpackPlugin = require("clean-webpack-plugin")
let CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = {
  entry: './src/index.js', // 入口文件
  output: {
    filename: './js/bundle.[chunkhash].js', // 打包后文件名
    path: path.resolve(__dirname, 'dist'), //打包后路径必须是绝对路径resolve方法把相对路径解析成绝对路径，__dirname加不加都可以，它代表在当前目录下产生一个dist目录
    // publicPath: '/' // 给所有打包文件引入时加前缀，包括css，js，img，如果只想处理图片可以单独在url-loader配置中加publicPath（上传七牛云等cdn加速时可用）
  },
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
  resolve: { // 解析优先路径等配置
    alias: {} // 别名
  },
  devServer: { // 开发服务器的配置（webpack-dev-server）
    // contentBase: path.join(__dirname, "dist"),
    port: 3001,
    progress: true,
    proxy:{
      "/fe": {
          target: "http://127.0.0.1:3000",
          changeOrigin: true,
          ws: true,
          pathRewrite: {
            "^/fe": ""
          }
        }
      }
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
      filename: '/css/main.[chunkhash].css'// 抽离出来的文件名
    }),
    new CleanWebpackPlugin,
    new CopyWebpackPlugin([
      {from: './src/doc', to: './'}
    ]),
    new webpack.IgnorePlugin(/\.\/local/, /moment/),
    new webpack.BannerPlugin('make 2019 by zhuyanlin'),
    new webpack.DefinePlugin({
      DEV: JSON.stringify('dev'),
      AAA: 'true'
    })
    // new webpack.ProvidePlugin({ // 在每个模块中都注入$
    //   $: 'jquery'
    // })
  ],
  externals: {
    jquery: "$"
  },
  module: { // 模块
    noParse: /jquery/, // 不去解析jquery中的依赖库
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
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: { // 用babel-loader吧es6转换成es5
              presets: [ // 预设规则
                '@babel/preset-env'
              ],
              plugins: [ // 此处配置有顺序
                ["@babel/plugin-proposal-decorators", { "legacy": true }],
                ["@babel/plugin-proposal-class-properties", { "loose" : true }]
                // "@babel/plugin-transform-runtime"
              ]
            }
          }
        ],
        // exculde: /node_modules/
        // inculde: path.resolve(__dirname, 'src')
      },
      {
        test: /\.(png|jpg|jpge|gif)$/,
        use: {
          loader: 'url-loader',
          // 做一个限制，当图片小于多少k时用base64转化，否则用file-loader将图片产出
          options: {
            limit: 2*1024,
            // dist打包文件中的输出路径
            outputPath: '/img/'
          }
        }
      }
    ]
  }
}