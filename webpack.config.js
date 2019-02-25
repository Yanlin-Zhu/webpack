// webpack是node写出来的 node的写法
let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devServer: { // 开发服务器的配置（webpack-dev-server）
    port: 3000,
    progress: true
  },
  mode: 'development', // 模式默认有两种production development开发模式代码不压缩看的清晰
  entry: './src/index.js', // 入口文件
  output: {
    filename: 'bundle.[hash].js', // 打包后文件名
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
    })
  ]
}