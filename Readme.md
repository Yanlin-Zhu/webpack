https://github.com/Yanlin-Zhu/webpack
###webpack安装
> 安装本地webpack
安装webpack和webpack-cli

```
//安装前先npm初始化
npm init -y
npm i webpack webpack-cli -D
```
###webpack可以进行0配置（默认只支持打包js文件）
- 打包工具 - 输出后的结果（js模块）
- 打包 - 支持js模块化
> 运行npx webpack会进入node_modules/bin/webpack.cmd文件执行
```
@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\webpack\bin\webpack.js" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\..\webpack\bin\webpack.js" %*
)
```
> 判断是否有node.exe没有则执行上一级webpack文件中的\bin\webpack.js文件
###手动配置webpack
- 默认配置文件名字webpack.config.js
```
// webpack是node写出来的 node的写法
let path = require('path')

module.exports = {
  mode: 'development', // 模式默认有两种production development开发模式代码不压缩看的清晰
  entry: './src/index.js', // 入口文件
  output: {
    filename: '/js/bundle.[hash].js', // 打包后文件名
    path: path.resolve(__dirname, 'dist'), //打包后路径必须是绝对路径resolve方法把相对路径解析成绝对路径，__dirname加不加都可以，它代表在当前目录下产生一个dist目录
    publicPath: 'http://www.weilongyun.com' // 给所有打包文件引入时加前缀，包括css，js，img，如果只想处理图片可以单独在url-loader配置中加publicPath（上传七牛云等cdn加速时可用）
  },
}
```
> 三种hash值区别如下
https://www.cnblogs.com/giggle/p/9583940.html
###打包后文件分析（可略过）
```
 (function(modules) { // webpackBootstrap
 	// The module cache 先定义一个缓存
 	var installedModules = {};

 	// The require function 配置实现了require函数
 	function __webpack_require__(moduleId) { // 参数"./src/index.js"

 		// Check if module is in cache 模块是否在缓存中
 		if(installedModules[moduleId]) {
 			return installedModules[moduleId].exports;
 		}
 		// Create a new module (and put it into the cache)
 		var module = installedModules[moduleId] = {
 			i: moduleId,
 			l: false,
 			exports: {}
 		};

 		// Execute the module function 执行传入this指向，模块，模块的空对象exports: {}，require方法
 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

 		// Flag the module as loaded
 		module.l = true;

 		// Return the exports of the module
 		return module.exports;
 	}


 	// expose the modules object (__webpack_modules__)
 	__webpack_require__.m = modules;

 	// expose the module cache
 	__webpack_require__.c = installedModules;

 	// define getter function for harmony exports
 	__webpack_require__.d = function(exports, name, getter) {
 		if(!__webpack_require__.o(exports, name)) {
 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
 		}
 	};

 	// define __esModule on exports
 	__webpack_require__.r = function(exports) {
 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
 		}
 		Object.defineProperty(exports, '__esModule', { value: true });
 	};

 	// create a fake namespace object
 	// mode & 1: value is a module id, require it
 	// mode & 2: merge all properties of value into the ns
 	// mode & 4: return value when already ns object
 	// mode & 8|1: behave like require
 	__webpack_require__.t = function(value, mode) {
 		if(mode & 1) value = __webpack_require__(value);
 		if(mode & 8) return value;
 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
 		var ns = Object.create(null);
 		__webpack_require__.r(ns);
 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
 		return ns;
 	};

 	// getDefaultExport function for compatibility with non-harmony modules
 	__webpack_require__.n = function(module) {
 		var getter = module && module.__esModule ?
 			function getDefault() { return module['default']; } :
 			function getModuleExports() { return module; };
 		__webpack_require__.d(getter, 'a', getter);
 		return getter;
 	};

 	// Object.prototype.hasOwnProperty.call
 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

 	// __webpack_public_path__
 	__webpack_require__.p = "";


 	// Load entry module and return exports
 	return __webpack_require__(__webpack_require__.s = "./src/index.js"); // 传入入口模块
 })
//  自执行函数传入一个对象即modules
 ({
 "./src/a.js": // key
 (function(module, exports) { // value
  eval("module.exports = 'a_moudle'\n\n//# sourceURL=webpack:///./src/a.js?");
  }),
 "./src/index.js":
 (function(module, exports, __webpack_require__) {
  eval("let str = __webpack_require__(/*! ./a.js */ \"./src/a.js\")\r\n\r\nconsole.log(str)\n\n//# sourceURL=webpack:///./src/index.js?");
 })
});
```
###在package.json中配置运行脚本
```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --config webpack.config.js"
  },
```
###webpack-dev-server起本地服务
```
安装
npm i webpack-dev-server -D
```
 ```
devServer: { // 开发服务器的配置（webpack-dev-server）
    port: 3000,
    progress: true,
    contentBase: './dist' // 执行时执行打包后文件，可以不配置
  },
```
###html-webpack-plugin（安装插件打包html）
```
安装
npm i html-webpack-plugin -D
```
```
let HtmlWebpackPlugin = require('html-webpack-plugin')

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
```
###css-loader style-loader(使用loader打包css文件)
```
安装
npm i css-loader style-loader -D
```
```
配置
module: { // 模块
    // loader
    rules: [ // 规则 loader的特点-希望单一功能
      // css-loader-解析css文件包括css文件的引入（@import）语法等
      // style-loader-把css文件插入到head标签中
      {
        test: /\.css/,
        // 字符串只用一个loader，多个loader用数组配置
        // loader的顺序默认从右向左执行，从下到上执行
        // 如果需要传参loader还可以配置成对象
        use: ['style-loader', 'css-loader']
      }
    ]
  }
```
####解析less文件配置
```
安装
npm i less-loader -D
配置
// 可处理less文件除此之外还有sass、stylus
// node-sass、sass-loader、stylus-loader
{
  test: /\.less$/,
  use: [
    'style-loader', // 插入style标签
    'css-loader', // 解析路径
    'less-loader' // 把less转换成css
  ]
}
```
> 在只安装了less-loader、css-loader、style-loader时引入less文件报错Cannot find module 'less'，此时安装less就好了
```
npm i less -D
```
####mini-css-extract-plugin（抽离css插件）
```
安装
npm i mini-css-extract-plugin -D
配置
let MiniCssExtractPlugin = require('mini-css-extract-plugin')

new MiniCssExtractPlugin({ // 抽离css样式
  filename: '/css/main.css'// 抽离出来的文件名
})

{
  test: /\.css$/,
  // 字符串只用一个loader，多个loader用数组配置
  // loader的顺序默认从右向左执行，从下到上执行
  // 如果需要传参loader还可以配置成对象
  use: [
    // 'style-loader',
    MiniCssExtractPlugin.loader, // 将css文件抽离出来，不再以style标签存放，而是创建link标签引入
    'css-loader'
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
    'less-loader' // 把less转换成css
  ]
}
```
> 使用mini-css-extract-plugin抽离css插件文件时可使用optimize-css-assets-webpack-plugin优化压缩css以及js文件
####optimize-css-assets-webpack-plugin
> 使用optimize-css-assets-webpack-plugin压缩css文件就必须使用uglifyjs-webpack-plugin压缩js文件
虽然webpack 5可能带有一个内置的CSS最小化器，但对于webpack 4，您需要自带一个CSS最小化器。为了缩小输出，可以使用像optimize-css-assets-webpack-plugin这样的插件。设置优化。最小化器覆盖webpack提供的默认值，所以请确保还指定了JS最小化器:
```
安装
npm i optimize-css-assets-webpack-plugin uglifyjs-webpack-plugin -D
配置
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

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
```
####autoprefixer包（自动给css样式添前缀）该包需要通过postcss-loader处理
```
安装
npm i postcss-loader autoprefixer -D
webpack.config.js中配置
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
新建postcss.config.js配置文件
module.exports = {
  plugins: [require('autoprefixer')]
}
```
###js处理
####使用babel将ES6或更高级的语法转换成ES5
```
安装
npm i babel-loader @babel/core  @babel/preset-env -D
配置
{
  test: /\.js$/,
  use: [
    {
        loader: 'babel-loader',
        options: { // 用babel-loader吧es6转换成es5
        presets: [ // 预设规则
          '@babel/preset-env'
        ]
      }
    }
  ]
}
```
未使用babel前使用es6语法会报错
```
ERROR in bundle.d92a2720a0d7daf51415.js from UglifyJs
Unexpected token: name (str) [./src/index.js:1,0][bundle.d92a2720a0d7daf51415.js:91,4]
```
此时写类和装饰器（es7）还是会报错
```
ERROR in ./src/index.js
Module build failed (from ./node_modules/babel-loader/lib/index.js):
SyntaxError: D:\zhuyanlin\webpack\src\index.js: Support for the experimental syntax 'classProperties' isn't currently enabled (8:5):
```
```
安装
npm i @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties -D
配置
{
  test: /\.js$/,
  use: [
    {
        loader: 'babel-loader',
        options: { // 用babel-loader吧es6转换成es5
        presets: [ // 预设规则
          '@babel/preset-env'
        ]，
        plugins: [ // 此处配置有顺序
          ["@babel/plugin-proposal-decorators", { "legacy": true }],
          ["@babel/plugin-proposal-class-properties", { "loose" : true }]
        ]
      }
    }
  ]
}
```
> 如果您手动包含插件并使用@babel/plugin-proposal-class属性，请确保@babel/plugin-proposal-class装饰器位于@babel/plugin-proposal-class属性之前。
####全局变量的引入（jQuery、Lodash...）
```
安装
npm i jquery -S

配置
let webpack = require('webpack')

new webpack.ProvidePlugin({ // 在每个模块中都注入$
  $: 'jquery'
})
```
```
当使用cdn在模板中引入时<script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.js"></script>可通过配置
externals: {
  jquery: "$"
},
此时可以通过$或window.$调用，再在文件中写import $ from 'jquery'时依然采用外部引入jQuery就不会被打包，打包文件不会增大。
```
###打包图片
- 在js中创建图片引入
```
import lion from './static/img/img/lion' // 把图片引入返回一个新的图片地址

let image = new Image()
image.src = lion
document.body.appendChild(image)
```
- 在css背景图片中引入
```
background: url('./static/img/img/ABC.png')
```
- 在html中通过标签引入
####file-loader（适用于前两种情况引入图片，貌似可以不用也没报错）
> file-loader默认会生成一张图片到dist目录下，把生成图片的名字返回回来
```
安装
npm i file-loader -D
配置
{
  test: /\.(png|jpg|gif)$/,
  use: 'file-loader'
}
 ```
####html-withimg-loader（适用于html标签引入图片）
```
安装
npm i html-withimg-loader -D
配置
{
  test: /\.html$/,
  use: 'html-withimg-loader'
}
```
####url-loader（可取代file-loader包含file-loader的功能）
```
安装
npm i url-loader -D
配置
{
  test: /\.(png|jpg|gif)$/,
  use: {
    loader: 'url-loader',
    // 做一个限制，当图片小于多少k时用base64转化，否则用file-loader将图片产出
    options: {
      limit: 200*1024,
      // dist打包文件中的输出路径
      outputPath: '/img/'
    }
  }
}
```
##打包多页面应用
```
代码在git上的morepage分支npx webpack运行打包
let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  // 多入口
  entry: {
    home: './src/index.js',
    other: './src/other.js'
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'home.html',
      chunks: ['home'] // 模板引入homejs模块
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'other.html',
      chunks: ['other'] // 模板引入otherjs模块
    })
  ]
}
```










。。。未完待续