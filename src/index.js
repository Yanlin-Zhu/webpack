import React, { Component } from 'react';
import { render } from 'react-dom';
import './style/index.css';
import str from './util.js';

console.log(str);

render(
    <div>Hello React!!!</div>,
    document.getElementById('app')
);