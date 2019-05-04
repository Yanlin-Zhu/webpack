const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');

module.exports = {
    entry: path.resolve(__dirname, './src/index.js'), //指定入口文件，程序从这里开始编译,__dirname当前所在目录, ../表示上一级目录, ./同级目录
    output: {
        path: path.resolve(__dirname, './dist'), // 输出的路径
        filename: 'bundle.js'  // 打包后文件
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    }
                },
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./index.html",
        filename: "./index.html"
      }),
      // 告诉 Webpack 使用了哪些动态链接库
      new DllReferencePlugin({
        // 描述 react 动态链接库的文件内容
        manifest: require('./dist/react.manifest.json'),
      }),
    //   new DllReferencePlugin({
    //     // 描述 polyfill 动态链接库的文件内容
    //     manifest: require('./dist/polyfill.manifest.json'),
    //   })
    ],
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      port: 9000
    }
}