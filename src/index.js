import React, { Component } from 'react';
import { render } from 'react-dom';
import './style/index.css';
import {funcA} from './util.js';

funcA();

render(
    <div>Hello React!!!</div>,
    document.getElementById('app')
);