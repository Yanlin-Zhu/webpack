let {smart} = require('webpack-merge');
let base = require('./webpack.base.js')

module.exports = smart(base, {
  mode: 'development', // 模式默认有两种production development开发模式代码不压缩看的清晰
})