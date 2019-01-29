### 使用vue搭建后台管理页面

### 参考[花裤衩](https://github.com/PanJiaChen/vue-element-admin)的后台管理页面模板

| 需要完成的功能 | 是否已经完成 |
|---------------|:-----------:|
| ssr           | 否          |

| 组件 | 作用 |
|:----:|:----:|
| layout    | 布局用，默认到/dashboard |
| - sidebar | 侧边栏，设置了背景色、文字颜色等 |
| - - sidebaritem | 侧边栏自动生成的逻辑 |
| - - link | 判断侧边栏是前端路由链接还是外链，然后跳转 |
| - - item | 生成侧边栏的图标和文字 |
| - navbar  | 导航栏 |
| - - hamburger  | 用于控制侧边栏的宽度 |
| - - breadcrumb | 自动生成顶部面包屑导航 |
| - appmain | 主要内容 |

什么是[dashboard](http://www.woshipm.com/data-analysis/691262.html)

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
6. 正式开始看代码

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
|:-------:|:--------:|:-------:|:-----------:|
| dev     | 开发     | dev:test | 开发测试环境 |
|         |          | dev:mock | 开发mock数据 |
|         |          | dev:prod | 开发正式环境 |
| build   | 打包     | build:mock | mock数据打包 |
|         |          | build:test | 测试环境打包 |
|         |          | build:prod | 正式环境打包 |

17. 到这里看完vuex部分的代码
18. 继续回去看layout
19. layout用到了mixins，又去看了一遍[vue混入文档](https://cn.vuejs.org/v2/guide/mixins.html),
结合vuex中app.js中的代码以及全局的css大致了解了它的代码
20. 因为项目打开的时候侧边栏默认是隐藏的，所以先看navbar的代码
21. navbar用到了组件*el-menu*、*el-dropdown*
22. navbar中引入了Hamburger组件和breadcrumb组件，先看hamburger组件，hamburger组件是用来切换侧边栏的宽度
23. 再看breadcrumb组件，它用来动态生成面包屑列表。用到了*el-breadcrumb*，其中有一个getBreadcrumb方法，了解[this.$route对象：在使用了 vue-router 的应用中，路由对象会被注入每个组件中，赋值为 this.$route ，并且当路由切换时，路由对象会被更新。](https://www.cnblogs.com/wangEddy/p/8310262.html)[官方api说明](https://router.vuejs.org/zh/api/#%E8%B7%AF%E7%94%B1%E5%AF%B9%E8%B1%A1%E5%B1%9E%E6%80%A7)
| 路由对象属性名称 | 数据类型 | 描述 |
|:---------------:|:-------:|:---:|
| $route.path     | 字符串  | 当前路由对象的路径，会被解析为绝对路径，如 "/home/news" |
| $route.params   | 对象    | 路由中的动态片段和全匹配片段的键值对 |
| $route.query    | 对象    | 路由中查询参数的键值对。例如，对于 /home/news/detail/01?favorite=yes ，会得到$route.query.favorite == 'yes' |
| $route.router   |         | 路由规则所属的路由器（以及其所属的组件）。 |
| $route.matched  | 数组    | 当前匹配的路径中所包含的所有片段所对应的配置参数对象 |
| $route.name     |         | 当前路径的名字，如果没有使用具名路径，则名字为空 |

24. [优先级](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)
25. breadcrumb 的逻辑梳理：
    页面created的时候，重新获取面包屑列表
    
    监听路由变化，当路由变化时也重新获取面包屑列表

    如何重新获取面包屑列表？
    1. 获取路由对象的配置参数对象（$route.matched）
    2. 判断第一个数组的路径名是不是dashboard，不是就把它加进去，并给它加上`meta: {title: 'Dashboard'}`，
    3. `this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)`这里的最后一个判断：`item.meta.breadcrumb !== false`的作用不明，去掉也没发现有什么影响，就先去掉了。把有item.meta和item.meta.title属性的数组添加到面包屑列表中。

    如何控制 面包屑的路径 是否可点击？
    `v-if="item.redirect === 'noredirect' || index === levelList.length-1"`
    如果redirect的属性值为'noredirect' 或者 索引 === 面包屑列表的长度-1，则不可点击。此处有一个疑问，item.redirect === 'noredirect'这个判断的作用何在？去掉没发现什么影响，就先去掉了

    关于 可点击路径 的路径获取方法？
    有redirect属性则直接转到redirect路径，没有则转到path路径，引入了一个pathToRegexp：是一个npm包，目前不需要使用这个包来处理 url 中地址与参数，所以先不引用。

26. breadcrumb逻辑梳理完，开始看样式，用到了过渡
27. 看完breadcrumb，看appmain组件
28. appmain就过渡里面一个router-view
29. 将整个的背景色 mainBg 设置了一下，设置成了微信公众号的背景色
30. 开始看sidebar，sidebar引入了*el-scrollbar*、*el-menu*组件和sidebarItem组件
31. el-scrollbar是element的一个隐藏组件，如果要用就要自己去看[element的源码](https://blog.csdn.net/zhouweihua138/article/details/80077311)，暂且先不用。
32. sidebar看完，开始看sidebaritem
33. sidebaritem的逻辑梳理：
    （1）sidebar套一个el-menu的壳，设置了背景色、文字颜色等，然后引入了sidebaritem，并且给sidebaritem传了item和basePath，因为sidebar不是nest，所以没传isNest这个参数，默认为false。
    （2）其中item为 new Router({ routes:[] })中设置的routes 循环得到的，basePath为routes中设置的path属性。
    （3）进入sidebaritem之后，首先会判断`v-if="!item.hidden && item.children"`，如果item的hidden属性为false并且item.children存在时才显示路由。因为router里设置的，只有首页是hidden为true，login和404页面是没有children的，只要是侧边栏的路由，都具有children。所以这个判断表明的意思是只要是侧边栏的路由，就给它显示出来。
    （4）接下来再给它进行一次判断：
    ```
    v-if="hasOneShowingChild(item.children, item)
      && (!onlyOneChild.children || onlyOneChild.noShowingChildren)
      && !item.alwaysShow"
    ```
    先看hasOneShowingChild这个方法传入item.children和item参数，
    children过滤一遍，children.hidden为true的过滤掉，不为true的赋给onlyOneChild，过滤得到showingChildren
    如果showingChildren的length = 1 则返回true
                              = 0 则将item赋给onlyOneChild，同时重设`path: '',
          noShowingChildren: true`。返回true
    其他情况，即showingChildren的length>1，则返回false

    刚进来的时候onlyOneChild为null，经过hasOneShowingChild这个方法children.length=0的时候onlyOneChild变成了{...item, path: '', noShowingChildren: true}，children.length=1的时候是{ children[0] }，children.length>1的时候不在这个v-if显示。

    再看(!onlyOneChild.children || onlyOneChild.noShowingChildren)，当onlyOneChild没有children属性或者onlyOneChild.noShowingChildren为true时，才为true，所以这个判断又筛选掉了item.children有children的路由

    再看!item.alwaysShow，item.alwaysShow为false时通过

    最后，通过这个判断的item为item.children.length=1或者item没有children的路由。
34. 开始看 link 组件，link 组件接收参数to，to为resolvePath(onlyOneChild.path)方法的返回值，分析resolvePath(onlyOneChild.path)方法:

    当传入的path是一个外链是，直接把外链传给link组件
    当传入的path不是外链时，引入node.js的path模块，使用`path.resolve(this.basePath, routePath)`将basePath和children.path结合起来。

    link组件会把外链进行a标签的方式处理[rel: 'noopener'的作用](https://juejin.im/post/5950f387f265da6c44072d6c)，把路由path进行router-link处理
35. 开始看item组件，首先，需要了解一下[函数式组件](https://cn.vuejs.org/v2/guide/render-function.html#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6)，函数式组件的意义？
36. 如果children.length>1，那就是以el-submenu来显示路由。又引入了item。在sidebaritem组件中引入了sidebaritem，即[引入了组件本身](https://blog.csdn.net/lhjuejiang/article/details/82116612)
37. sidebaritem 好了之后，item 报 Unknown custom element: <svg-icon>，开始看icon是怎么弄的。开始看[文档](https://panjiachen.github.io/vue-element-admin-site/zh/feature/component/svg-icon.html)
38. 在main.js中引入 @/icons ，在components中添加svgIcon组件，在icons中引入
39. [require.context是webpack中，用来创建自己的（模块）上下文](https://blog.csdn.net/viewyu12345/article/details/83012970)



    
    


    
