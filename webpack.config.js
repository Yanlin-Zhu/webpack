const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');
const HappyPack = require('happypack');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// 构造出共享进程池，进程池中包含5个子进程
const happyThreadPool = HappyPack.ThreadPool({ size: 3 });

module.exports = {
    entry: path.resolve(__dirname, './src/index.js'), //指定入口文件，程序从这里开始编译,__dirname当前所在目录, ../表示上一级目录, ./同级目录
    output: {
        path: path.resolve(__dirname, './dist'), // 输出的路径
        filename: 'bundle.js'  // 打包后文件
    },
    module: {
        rules: [
            // {
            //     test: /\.(js|jsx)$/,
            //     use: {
            //         loader: 'babel-loader',
            //         options: {
            //             presets: ["@babel/preset-env", "@babel/preset-react"],
            //         }
            //     },
            //     exclude: /node_modules/
            // },
            {
                test: /\.(js|jsx)$/,
                // 把对 .js 文件的处理转交给 id 为 babel 的 HappyPack 实例
                use: ['happypack/loader?id=babel'],
                // 排除 node_modules 目录下的文件，node_modules 目录下的文件都是采用的 ES5 语法，没必要再通过 Babel 去转换
                exclude: path.resolve(__dirname, 'node_modules'),
            },
            // {
            //     // 把对 .css 文件的处理转交给 id 为 css 的 HappyPack 实例
            //     test: /\.css$/,
            //     use: ['happypack/loader?id=css']
            // }
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
      new HappyPack({
        // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
        id: 'babel',
        // 如何处理 .js 文件，用法和 Loader 配置中一样
        loaders: ['babel-loader'],
        // 使用共享进程池中的子进程去处理任务
        threadPool: happyThreadPool,
      }),
    //   new HappyPack({
    //     id: 'css',
    //     // 如何处理 .css 文件，用法和 Loader 配置中一样
    //     loaders: ['css-loader'],
    //     // 使用共享进程池中的子进程去处理任务
    //     threadPool: happyThreadPool,
    //   }),
    //   new ExtractTextPlugin({
    //     filename: `[name].css`,
    //   }),
    ],
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      port: 9000
    }
}