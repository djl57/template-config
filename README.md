### 使用vue搭建后台管理页面

### 参考[花裤衩](https://github.com/PanJiaChen/vue-element-admin)的后台管理页面模板

|预计需要完成的功能|是否已经完成|
|----------------|:---------:|
|ssr             |否         |

### 问题解决
1. [vue的项目里面copy别人package.json  运行时出现了如下的错误（error chromedriver@2.33.2 install: `node install.js`）](https://www.cnblogs.com/sundjly/p/8039172.html)
2. [按需引入element时报：Module build failed: Error: Couldn't find preset "es2015" relative to directory](https://blog.csdn.net/you23hai45/article/details/83014145)
npm install --save-dev babel-preset-es2015
3. 

### 完成步骤
1. 建立目录结构
2. 安装scss
3. 引入normalize 和 全局css文件index.scss
4. 引入[element](http://element-cn.eleme.io/#/zh-CN/component/installation)，
此项目[按需引入](http://element-cn.eleme.io/#/zh-CN/component/quickstart)，
国际化
