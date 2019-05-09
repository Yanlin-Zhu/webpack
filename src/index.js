import React, { Component } from 'react';
import { render } from 'react-dom';
import './style/index.css';
import str from './util.js';

console.log(str);

window.document.getElementById('btn').addEventListener('click', function () {
    // 当按钮被点击后才去加载 show.js 文件，文件加载成功后执行文件导出的函数
    import(/* webpackChunkName: "show" */ './show.js').then((show) => {
        show.default('Webpack');
    })
});

render(
    <div>Hello React!!!</div>,
    document.getElementById('app')
);