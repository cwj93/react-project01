<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: cwj
 * @Date: 2019-10-11 14:45:27
 * @LastEditors: cwj
 * @LastEditTime: 2019-10-15 15:06:19
 -->
# 项目访问
## 开发坏境启动

1. `npm install`
2. `npm start`
3. 浏览器打开[http://localhost:8080](http://localhost:8080)

备注：如果要在局域网访问，请修改`package.json`-`start`命令，增加`--public 192.168.x.x`，后面为你的局域网`ip`。

## 生产坏境部署

1. `npm run build`

2. 拷贝打包文件夹（dist）至服务器即可

 
# react项目--从零开始搭建

1. 新建项目文件夹
2. 通过命令行进入项目文件夹，执行初始化命令 `cd 项目名称`，`npm init`。
3. 按照命令窗口提示，完成相应配置，生成package.json文件
4. 安装webpack，`npm install --save-dev webpack@3 -g`,此处用的是webpack3,webpack4与3具有较大的不同
5. 根据webpack文档编写基础的配置文件，新建webpack.dev.config.js文件，定义了项目的入口与出口
webpack.dev.config.js
```
    const path = require('path');
    module.exports = {
        /*入口*/
        entry: path.join(__dirname, 'src/index.js'),
        
        /*输出到dist文件夹，输出文件名字为bundle.js*/
        output: {
            path: path.join(__dirname, './dist'),
            filename: 'bundle.js'
        }
    };
```

6. 新建入口文件(新建src文件夹，在src文件夹下新建一个index.js文件)
index.js
`document.getElementById('app').innerHTML = "Webpack works"`
7. 执行打包命令`webpack --config webpack.dev.config.js`(webpack如果没有全局安装，这里会报错哦)(webpack把入口文件 index.js 经过处理之后，生成 bundle.js)
8. 安装babel（用来转换es6,es7语法为es5语法）(此处需要把babel-loader降到7.x版本，babel-core当前的6.x版本不兼容babel-loader8.x版本)
`npm install --save-dev babel-core babel-loader@7 babel-preset-es2015 babel-preset-react babel-preset-stage-0`
- babel-core 调用Babel的API进行转码
- babel-loader
- babel-preset-es2015 用于解析 ES6
- babel-preset-react 用于解析 JSX
- babel-preset-stage-0 用于解析 ES7 提案
9. 新建babel的配置文件.babelrc
.babelrc
```
    {
      "presets": [
        "es2015",
        "react",
        "stage-0"
      ],
      "plugins": []
    }
```
10. 修改webpack.dev.config.js，增加babel-loader！
```
    /*src文件夹下面的以.js结尾的文件，要使用babel解析*/
    /*cacheDirectory是用来缓存编译结果，下次编译加速*/
    module: {
        rules: [{
            test: /\.js$/,
            use: ['babel-loader?cacheDirectory=true'],
            include: path.join(__dirname, 'src')
        }]
    }
```

11. 修改src/index.js,测试是否能正确转义es6(浏览器打开index.html，能)
```
    /*使用es6的箭头函数*/
    var func = str => {
        document.getElementById('app').innerHTML = str;
    };
    func('我现在在使用Babel!');
```
12. 开始使用react
`npm install --save react react-dom`
13. 修改 src/index.js使用react
```
    import React from 'react';
    import ReactDom from 'react-dom';

    ReactDom.render(<div>Hello React!</div>, document.getElementById('app'));
```
14. src下新建components文件夹，新建一个Hello文件夹，新建Hello.js文件，把Hello React放到组件里面。体现组件化~
15. 按照React语法，写一个Hello组件
```
    import React, {Component} from 'react';

    export default class Hello extends Component {
        render() {
            return (
                <div>
                    Hello,React!
                </div>
            )
        }
    }
```

16. 修改src/index.js，引用Hello组件！
```
    import React from 'react';
    import ReactDom from 'react-dom';
    import Hello from './component/Hello/Hello';

    ReactDom.render(
        <Hello/>, document.getElementById('app'));
```
17. 命令优化,修改package.json里面的script，增加dev-build
```
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "dev-build": "webpack --config webpack.dev.config.js"
    }
```
18. 安装路由react-router
`npm install --save react-router-dom`
19. 新建router文件夹和router.js组件
20. 按照react-router文档编辑一个最基本的router.js。包含两个页面home和page1
```
    import React from 'react';

    import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

    import Home from '../pages/Home/Home';
    import Page1 from '../pages/Page1/Page1';


    const getRouter = () => (
        <Router>
            <div>
                <ul>
                    <li><Link to="/">首页</Link></li>
                    <li><Link to="/page1">Page1</Link></li>
                </ul>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/page1" component={Page1}/>
                </Switch>
            </div>
        </Router>
    );

    export default getRouter;
```
21. 新建页面文件夹pages,同时新建Home.js页面文件和Page1.js页面文件
src/pages/Home/Home.js
```
    import React, {Component} from 'react';

    export default class Home extends Component {
        render() {
            return (
                <div>
                    this is home~
                </div>
            )
        }
    }
```

Page1.js
```
    import React, {Component} from 'react';

    export default class Page1 extends Component {
        render() {
            return (
                <div>
                    this is Page1~
                </div>
            )
        }
    }
```

22. 在入口文件src/index.js引用Router。
修改src/index.js
```
    import React from 'react';
    import ReactDom from 'react-dom';

    import getRouter from './router/router';

    ReactDom.render(
        getRouter(), document.getElementById('app'));
```
23. 此时用浏览器打开index.html,发现点击‘首页’和‘Page1’没有反应, 我们之前一直用这个路径访问index.html，类似这样：file:///F:/react/react-family/dist/index.html。需要配置一个简单的WEB服务器，指向index.html
index.html~有下面两种方法来实现

- Nginx, Apache, IIS等配置启动一个简单的的WEB服务器。
- 使用webpack-dev-server来配置启动WEB服务器。

24. 配置webpack-dev-server启动web服务器
25. 安装webpack-dev-server
`npm install webpack-dev-server@2 --save-dev -g`(需要全局安装)
26. 修改webpack.dev.config.js,增加webpack-dev-server的配置。(webpack-dev-server编译后的文件，都存储在内存中，我们并不能看见的。你可以删除之前遗留的文件dist/bundle.js，
仍然能正常打开网站！)
```
    devServer: {
        contentBase: path.join(__dirname, './dist')
    }
```
27. 执行命令`webpack-dev-server --config webpack.dev.config.js`,浏览器打开http://localhost:8080，OK,现在我们可以点击首页,Page1了
28. 修改package.json，增加script->start
```
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "dev-build": "webpack --config webpack.dev.config.js",
        "start": "webpack-dev-server --config webpack.dev.config.js"
    }
```
29. webpack-dev-server的其他的配置项
- color（CLI only） console中打印彩色日志
- historyApiFallback 任意的404响应都被替代为index.html。有什么用呢？你现在运行npm start，然后打开浏览器，访问http://localhost:8080,然后点击Page1到链接http://localhost:8080/page1，然后刷新页面试试。是不是发现刷新后404了。为什么？dist文件夹里面并没有page1.html,当然会404了，所以我们需要配置historyApiFallback，让所有的404定位到index.html。
- host 指定一个host,默认是localhost。如果你希望服务器外部可以访问，指定如下：host: "0.0.0.0"。比如你用手机通过IP访问。
- hot 启用Webpack的模块热替换特性。关于热模块替换，我下一小节专门讲解一下。
- port 配置要监听的端口。默认就是我们现在使用的8080端口。
- proxy 代理。比如在 localhost:3000 上有后端服务的话，你可以这样启用代理：

30. 修改下我们的webpack-dev-server的配置~
```
    devServer: {
        port: 8080,
        contentBase: path.join(__dirname, './dist'),
        historyApiFallback: true,
        host: '0.0.0.0'
    }
```
31. 修改package.json,修改script->start,增加 --color --progress
`"start": "webpack-dev-server --config webpack.dev.config.js --color --progress"`

32. 模块热替换（Hot Module Replacement）我们在修改代码的时候，浏览器不会刷新，只会更新自己修改的那一块。我们也要实现这个效果
33. 修改package.json,修改script->start,增加 --hot
`"start": "webpack-dev-server --config webpack.dev.config.js --color --progress --hot"`
34. src/index.js 增加module.hot.accept().当模块更新的时候，通知index.js。
```
    import React from 'react';
    import ReactDom from 'react-dom';

    import getRouter from './router/router';

    if (module.hot) {
        module.hot.accept();
    }

    ReactDom.render(
        getRouter(), document.getElementById('app'));
```
35. webpack-dev-server的热刷新对react模块的支持不是很好，为了在react模块更新的同时，能保留state等页面中其他状态，我们需要引入react-hot-loader~

