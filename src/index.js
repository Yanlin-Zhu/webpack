let str = require('./a.js')
import './index.css'
import './index.less'
import lion from './static/img/img/lion.jpg' // 把图片引入返回一个新的图片地址

console.log(str)
@log
class A{
  a = 1;
}
let a = new A()
console.log(a.a)

function log(target) {
  console.log(target, '23')
}

console.log($, 'aaa', window.$, 'bbb')
let image = new Image()
image.src = lion
document.body.appendChild(image)