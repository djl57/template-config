### 使用vue搭建后台管理页面

### 参考[花裤衩](https://github.com/PanJiaChen/vue-element-admin)的后台管理页面模板

|预计需要完成的功能|是否已经完成|
|----------------|:---------:|
|ssr             |否         |

### 问题解决
1. [vue的项目里面copy别人package.json  运行时出现了如下的错误（error chromedriver@2.33.2 install: `node install.js`）](https://www.cnblogs.com/sundjly/p/8039172.html)
2. [按需引入element时报：Module build failed: Error: Couldn't find preset "es2015" relative to directory](https://blog.csdn.net/you23hai45/article/details/83014145)
npm install --save-dev babel-preset-es2015
3. 因为按需加载之后改了babelrc的内容，导致在router中使用按需加载事报语法错误，尝试将babelrc中的新内容插入到原内容中解决，为什么这么可以解决的原因待考究。
4. 作为一个新手想要通过一个简单demo深入研究import和export时浏览器报语法错误，需要[<script type="module"></script>](https://blog.csdn.net/qq_22046267/article/details/82228882)

### 完成步骤
1. 建立目录结构
2. 安装scss
3. 引入normalize 和 全局css文件index.scss
4. 引入[element](http://element-cn.eleme.io/#/zh-CN/component/installation)，
此项目[按需引入](http://element-cn.eleme.io/#/zh-CN/component/quickstart)，
国际化
5. 引入[vuex](https://vuex.vuejs.org/zh/installation.html)
引入icons 和 权限控制 暂时跳过
6. 正式开始

### 看代码步骤
1. 先看router的'/'指向哪个文件
2. 看layout页面
3. 其中涉及到import和export的使用，去看了一下
4. 涉及到全局css，去看了一下，期间又总结了一遍两栏布局的样式编写方法（目前记录三种：flex、margin-left、float）
5. 继续看layout及其衍生vue文件，需要用到store
6. 开始引入vuex
7. 先看index.js，再看app.js
8. 其中引入了js-cookie，[js-cookie的用法](https://www.cnblogs.com/xuyan1/p/8421284.html)和[wimdow.localStorage的用法](https://www.cnblogs.com/st-leslie/p/5617130.html)。
9. 因为不是很清楚使用cookie和localStorage有什么区别，所以尝试在项目中使用localStorage。在main.js中引入全局变量$storage（所有的全局变量的定义都保存在assets的global.js中），以便在组件中通过this.$storage来使用，虽然可以直接用window.localStorage来使用，但是此设置的目的就是为了看着顺眼，所有全局变量都保存在global.js中，并且变量名以$开头。
10. 再看user.js，其中引入了api中的login和utils中的auth（此时搜了一下auth的意思，暂时把它解释为认证），于是去看了api中的login.js和utils中的auth.js
11. auth.js中封装了三个方法，分别用来设置token缓存（setToken），获取token缓存（setToken），删除token缓存（removeToken）
12. login.js中引入了request，并且定义了三个api方法：login、getInfo、logout。
13. 看utils中的request.js，其中封装了axios方法
14. 又看了一遍axios文档
15. 生产模式（build）和开发模式（dev）采用不同的BASE_URL，而要在打包环境下区分开发、测试、生产三个环境，需要另外配置，网上教程都需要安装cross-env，所以没搞。
16. 在查打包环境配置的时候查到[process.env.npm_lifecycle_event](https://www.jb51.net/article/137610.htm)，会根据npm run 后面的内容变化，所以尝试在package.json中添加其他命令
| 原有命令 | 表示环境 | 添加命令 | 表示环境 |
|:--:|:--:|:--:|:--:|
| dev     | 开发     | dev:test | 开发测试环境 |
|         |          | dev:mock | 开发mock数据 |
|         |          | dev:prod | 开发正式环境 |
| build   | 打包     | build:mock | mock数据打包 |
|         |          | build:test | 测试环境打包 |
|         |          | build:prod | 正式环境打包 |
