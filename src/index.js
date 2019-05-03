import React from 'react';
import { render } from 'react-dom';

const App = (
  <div><h1>jsx</h1></div>
)
render(App, window.root);







// let str = require('./a.js')
// import './index.css'
// import './index.less'
// import lion from './static/img/img/ABC.png' // 把图片引入返回一个新的图片地址
// import moment from 'moment';
// 手动引入所需要的语言包
// import 'moment/locale/zh-cn';

// console.log(str)
// @log
// class A{
//   a = 1;
// }
// let a = new A()
// moment.locale('zh-cn')
// console.log(moment().endOf('day').fromNow())
// console.log('kkk')

// function log(target) {
//   console.log(target, '23')
// }

// console.log($, 'aaa', window.$, 'bbb')
// console.log(lion)
// let image = new Image()
// image.src = lion
// document.body.appendChild(image)