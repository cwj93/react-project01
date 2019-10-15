/*
 * @Description: 
 * @Version: 1.0
 * @Autor: cwj
 * @Date: 2019-10-11 15:00:54
 * @LastEditors: cwj
 * @LastEditTime: 2019-10-11 16:53:27
 */
import React from 'react';
import ReactDom from 'react-dom';

import getRouter from './router/router';

//当模块更新的时候，通知index.js（模块热替换）
if (module.hot) {
    module.hot.accept();
}
ReactDom.render(
    getRouter(), document.getElementById('app'));