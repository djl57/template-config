### 使用 vue 搭建后台管理页面

### 参考[花裤衩](https://github.com/PanJiaChen/vue-element-admin)的后台管理页面模板

| 需要完成的功能 | 是否已经完成 |
|---------------|:-----------:|
| ssr           | 否          |

| 组件 | 作用 |
|------|------|
| layout    | 布局用，默认到/dashboard |
| - sidebar | 侧边栏，设置了背景色、文字颜色等 |
| - - sidebaritem | 侧边栏自动生成的逻辑 |
| - - link  | 判断侧边栏是前端路由链接还是外链，然后跳转 |
| - - item  | 生成侧边栏的图标和文字 |
| - navbar  | 导航栏 |
| - - hamburger   | 用于控制侧边栏的宽度 |
| - - breadcrumb  | 自动生成顶部面包屑导航 |
| - appmain | 主要内容 |
| svgicon   | icon组件，使用svg时调用此组件 |
| login     | 登陆页面 |

什么是[dashboard](http://www.woshipm.com/data-analysis/691262.html)

### 问题解决
1. [vue的项目里面copy别人package.json  运行时出现了如下的错误（error chromedriver@2.33.2 install: `node install.js`）](https://www.cnblogs.com/sundjly/p/8039172.html)
2. [按需引入element时报：Module build failed: Error: Couldn't find preset "es2015" relative to directory](https://blog.csdn.net/you23hai45/article/details/83014145)
npm install --save-dev babel-preset-es2015
3. 因为按需加载之后改了 babelrc 的内容，导致在 router 中使用按需加载事报语法错误，尝试将 babelrc 中的新内容插入到原内容中解决，为什么这么可以解决的原因待考究。
4. 作为一个新手想要通过一个简单 demo 深入研究 import 和 export 时浏览器报语法错误，需要[<script type="module"></script>](https://blog.csdn.net/qq_22046267/article/details/82228882)
5. [使用 svg-sprite-loader 遇到的问题](https://blog.csdn.net/github_35631540/article/details/78818919)
6. [跨域的解决](https://segmentfault.com/a/1190000011007043)

### 完成步骤
1. 建立目录结构
2. 安装 scss
3. 引入 normalize 和 全局 css 文件 index.scss
4. 引入 [element](http://element-cn.eleme.io/#/zh-CN/component/installation)，
此项目[按需引入](http://element-cn.eleme.io/#/zh-CN/component/quickstart)，
国际化
5. 引入 [vuex](https://vuex.vuejs.org/zh/installation.html)
引入 icons 和 权限控制
6. 正式开始看代码

### 看代码步骤
1. 先看 router 的'/'指向哪个文件
2. 看 layout 页面
3. 其中涉及到 import 和 export 的使用，去看了一下
4. 涉及到全局 css ，去看了一下，期间又总结了一遍两栏布局的样式编写方法（目前记录三种：flex、margin-left、float）
5. 继续看 layout 及其衍生 vue 组件，需要用到 store
6. 开始引入 vuex
7. 先看 index.js ，再看 app.js
8. 其中引入了 js-cookie ，[js-cookie 的用法](https://www.cnblogs.com/xuyan1/p/8421284.html)和[wimdow.localStorage 的用法](https://www.cnblogs.com/st-leslie/p/5617130.html)。
9. 尝试在项目中使用 localStorage （后面发现不能用 51 ）。~~在 main.js 中引入全局变量 $sto （所有的全局变量的定义都保存在 assets 的 global.js 中），以便在组件中通过 this.$sto 来使用，虽然可以直接用 window.localStorage来使用，但是此设置的目的就是为了看着顺眼，所有全局变量都保存在 global.js 中，并且变量名以 $ 开头。~~
10. 再看 user.js，其中引入了 api 中的 login 和 utils 中的 auth（此时搜了一下 auth 的意思，暂时把它解释为 认证 ），于是去看了 api 中的 login.js 和 utils 中的 auth.js
11. auth.js 中封装了三个方法，分别用来设置 token 缓存（setToken），获取 token 缓存（setToken），删除 token 缓存（removeToken）
12. login.js 中引入了 request，并且定义了三个 api 方法：login、getInfo、logout。
13. 看 utils 中的 request.js，其中封装了 axios 方法
14. 又看了一遍 axios 文档
15. 生产模式（build）和开发模式（dev）采用不同的 BASE_URL，而要在打包环境下区分开发、测试、生产三个环境，需要另外配置，网上教程都需要安装 cross-env，所以没搞。
16. 在查打包环境配置的时候查到[process.env.npm_lifecycle_event](https://www.jb51.net/article/137610.htm)，会根据 npm run 后面的内容变化，所以尝试在package.json 中添加其他命令

| 原有命令 | 表示环境 | 添加命令 | 表示环境 |
|:-------:|:--------:|:-------:|:-----------:|
| dev     | 开发     | dev:test | 开发测试环境 |
|         |          | dev:mock | 开发mock数据 |
|         |          | dev:prod | 开发正式环境 |
| build   | 打包     | build:mock | mock数据打包 |
|         |          | build:test | 测试环境打包 |
|         |          | build:prod | 正式环境打包 |

17. 到这里看完 vuex 部分的代码
18. 继续回去看 layout
19. layout 用到了 mixins ，又去看了一遍[vue混入文档](https://cn.vuejs.org/v2/guide/mixins.html),
结合 vuex 中 app.js 中的代码以及全局的 css 大致了解了它的代码
20. 因为项目打开的时候侧边栏默认是隐藏的，所以先看 navbar 的代码
21. navbar 用到了组件 *el-menu*、*el-dropdown*
22. navbar 中引入了 Hamburger 组件和 breadcrumb 组件，先看 hamburger 组件，hamburger 组件里面就一个 svg 图标，用来切换侧边栏的宽度
23. 再看 breadcrumb 组件，它用来动态生成面包屑列表。用到了 *el-breadcrumb*，其中有一个getBreadcrumb 方法，了解[this.$route 对象：在使用了 vue-router 的应用中，路由对象会被注入每个组件中，赋值为 this.$route ，并且当路由切换时，路由对象会被更新。](https://www.cnblogs.com/wangEddy/p/8310262.html)[官方api说明](https://router.vuejs.org/zh/api/#%E8%B7%AF%E7%94%B1%E5%AF%B9%E8%B1%A1%E5%B1%9E%E6%80%A7)

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
    页面 created 的时候，获取面包屑列表
    
    监听路由变化，当路由变化时也重新获取面包屑列表

    如何重新获取面包屑列表？
    1. 获取路由对象的配置参数对象（$route.matched）
    2. 判断第一个数组的路径名是不是dashboard，不是就把它加进去，并给它加上`meta: {title: 'Dashboard'}`，
    3. `this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)`这里的最后一个判断：`item.meta.breadcrumb !== false`的作用不明，去掉也没发现有什么影响，就先去掉了。把有 item.meta 和 item.meta.title 属性的数组添加到面包屑列表中。

    如何控制 面包屑的路径 是否可点击？
    `v-if="item.redirect === 'noredirect' || index === levelList.length-1"`
    如果 redirect 的属性值为 'noredirect' 或者 索引 === 面包屑列表的长度-1，则不可点击。此处有一个疑问，item.redirect === 'noredirect'这个判断的作用何在？去掉没发现什么影响，就先去掉了。（后面看路由配置项的时候知道了）

    关于 可点击路径 的路径获取方法？
    有 redirect 属性则直接转到 redirect 路径，没有则转到 path 路径，引入了一个 pathToRegexp：是一个npm包，目前不需要使用这个包来处理 url 中地址与参数，所以先不引用。

26. breadcrumb 逻辑梳理完，开始看样式，用到了过渡
27. 看完 breadcrumb ，看 appmain 组件
28. appmain 就过渡里面一个 router-view
29. 将整个的背景色 mainBg 设置了一下，设置成了微信公众号的背景色
30. 开始看 sidebar，sidebar 引入了 *el-scrollbar*、*el-menu* 组件和 sidebarItem 组件
31. el-scrollbar 是 element 的一个隐藏组件，如果要用就要自己去看[element 的源码](https://blog.csdn.net/zhouweihua138/article/details/80077311)，暂且先不用。
32. sidebar 看完，开始看 sidebaritem
33. sidebaritem 的逻辑梳理：
    （1）sidebar 套一个 el-menu 的壳，设置了背景色、文字颜色等，然后引入了 sidebaritem，并且给sidebaritem 传了 item 和 basePath，因为 sidebar 不是 nest，所以没传 isNest 这个参数，默认为false。

    （2）其中 item 为 new Router({ routes:[] })中设置的 routes 循环得到的，basePath 为 routes 中设置的 path 属性。

    （3）进入 sidebaritem 之后，首先会判断`v-if="!item.hidden && item.children"`，如果 item 的hidden 属性为 false 并且 item.children 存在时才显示路由。因为 router 里设置的，只有首页是hidden 为 true，login 和 404 页面是没有 children 的，只要是侧边栏的路由，都具有 children。所以这个判断表明的意思是只要是侧边栏的路由，就给它显示出来。

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

    刚进来的时候 onlyOneChild 为 null，经过 hasOneShowingChild 这个方法 children.length=0 的时候 onlyOneChild 变成了{...item, path: '', noShowingChildren: true}，children.length=1 的时候是{ children[0] }，children.length>1的时候不在这个v-if显示。

    再看(!onlyOneChild.children || onlyOneChild.noShowingChildren)，当 onlyOneChild 没有children属性或者 onlyOneChild.noShowingChildren 为 true 时，才为 true，所以这个判断又筛选掉了item.children 有 children 的路由

    再看 !item.alwaysShow，item.alwaysShow 为 false 时通过

    最后，通过这个判断的item为item.children.length=1或者item没有children的路由。
34. 开始看 link 组件，link 组件接收参数to，to为resolvePath(onlyOneChild.path)方法的返回值，分析resolvePath(onlyOneChild.path)方法:

    当传入的path是一个外链是，直接把外链传给link组件
    当传入的path不是外链时，引入node.js的path模块，使用`path.resolve(this.basePath, routePath)`将basePath和children.path结合起来。

    link组件会把外链进行a标签的方式处理，[rel: 'noopener'的作用](https://juejin.im/post/5950f387f265da6c44072d6c)，把路由path进行router-link处理
35. 开始看item组件，首先，需要了解一下[函数式组件](https://cn.vuejs.org/v2/guide/render-function.html#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6)，函数式组件的意义？
36. 如果children.length>1，那就是以el-submenu来显示路由。又引入了item。在sidebaritem组件中引入了sidebaritem，即[引入了组件本身](https://blog.csdn.net/lhjuejiang/article/details/82116612)
37. sidebaritem 好了之后，item 报 Unknown custom element: <svg-icon>，开始看icon是怎么弄的。开始看[文档](https://panjiachen.github.io/vue-element-admin-site/zh/feature/component/svg-icon.html)
38. 在main.js中引入 @/icons ，在components中添加svgIcon组件，在icons中引入
39. [require.context是webpack中，用来创建自己的（模块）上下文](https://blog.csdn.net/viewyu12345/article/details/83012970)
40. [aria-hidden="true"](http://www.imooc.com/qadetail/62014)
41. [CSS currentColor 变量的使用](https://www.cnblogs.com/Wayou/p/css-currentColor.html)
42. @/icons 和 svg-icon组件 代码写完，引入`npm i svg-sprite-loader`之后，还需要配置webpack.base.conf.js：
``` js
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('src/icons')],
        options: {
          symbolId: 'icon-[name]'
        }
      },
      // 上面整段添加
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        exclude: [resolve('src/icons')], // 添加
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
```
至此svg-icon组件完成，想要添加icon时只需要在@/icons的svg中添加svg，然后使用就可以了，关于如何使用，看花裤衩大佬的[另一个模板vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)

43. 接下来开始看 login 页面，先配置路由，然后看login组件，使用*el-form*组件。
44. login组件设置两个style，一个没有scoped，用来重置element样式，另一个有。
45. auto-complete="on" 的作用：当它开启（on）时，输入一次内容后，再次输入会自动提示上次输入的内容；当它关闭（off）时不提示
46. @keyup.enter.native="handleLogin" 按enter键登录
47. login代码差不多看完之后，自己尝试做一个注册页面。
    
    遇到了一个问题：当data中定义的数据过多时，就想对这些数据进行分类显示，本来是使用对象分类，换成了数组的显示方式
    ``` js
      loginInfo: [ '登录', '注册' ],
      loginType: 'login' // or register
    ```
    注册功能只做了点击按钮的时候字变化，其他都没做，等有接口来再做。
48. 要看完登录必需结合权限控制一起看，在main.js中引入@/permission

    [Vue:router的beforeEach与afterEach钩子函数](https://www.cnblogs.com/WQLong/p/8135553.html)

49. 这时候又要结合登录和权限一起理一遍登录代码的逻辑了。

    （1）点击登录之后，走 login 接口，成功返回之后，路由跳转到'/'，同时获得 token 
    （2）因为此时进行路由跳转了，所以全局路由钩子 beforeEach 生效，进入@/permission
    （3）此时的 getToken() 转换为布尔值为 true （如果转换的布尔值为 false ，即是 token 拿不到，则重定向到 `/login?redirect=${to.path}`）
    （4）此时的 to.path === '/'，所以走 else 那里（如果想跳转到 '/login' ，则会直接跳转到 '/'，同时又重新触发一遍 beforeEach ，进入到@/permission）
    （5）此时的 store.getters.roles.length === 0 ，所以走 GetInfo 接口，开始拉取用户信息，拉取成功后 next()（如果此时的length !== 0 ，则直接走 next）
    （6）如果拉取用户信息失败，则前端登出，（后端登出走 logout 接口，服务器成功返回后 token 改为'' ，roles 改为 []，并且移除 token。前端登出将 token 改为'' ，并且移除 token）

    因为项目的根目录不是 '/login'，所以使用一开始进来的时候是会先走一遍 @/permission

50. 到此登录功能基本看完。
51. 自己在 permission 中加了一段简单代码，用于前端判断 token 是否超时，这里最后应该用 MD5 加密一下。
    ``` js
      if (curTimeStamp() - getToken() > 60 * 1000) {
        removeToken()
      }
    ```
    这里的逻辑出现了问题，原项目使用 cookie 保存 token，关闭浏览器后 cookie 就会消失。因为我在项目中直接就用了 localStorage，当时没有多想，但是 localStorage 是不会在浏览器关闭后消失的，它是在同源的同窗口中，始终存在的数据，所以用它来存储 token 就有很大的问题。

    以前看过区别，但是没有实战就理解不透彻，现在再看一遍。
    [cookie、session和localStorage、以及sessionStorage之间的区别](https://www.cnblogs.com/zr123/p/8086525.html)
    [上面那个有点混乱](https://www.cnblogs.com/pengc/p/8714475.html)

    下面的总结待完善和更正

    |              | 属性    | 属性作用 |
    |--------------|---------|--|
    | cookie       | 名字    |  |
    |              | 值      ||
    |              | 过期时间 | 若不设置时间，则表示这个cookie的生命期为浏览器会话期间。 |
    |              || 关闭浏览器窗口，cookie就会消失。 |
    |              || 这种生命期为浏览器会话期的cookie被称为会话cookie。 |
    |              | 路径    | 构成cookie的作用范围 |
    |              || cookie中如果设置了路径参数，那么同一个网站中不同路径下的cookie互相是访问不到的 |
    |              | 域      | 构成cookie的作用范围。cookie 需要指定作用域，不可跨域调用 |
    |              |||
    | session      | 路径    | 不能区分路径，同一个用户在访问一个网站期间，所有的session在任何一个地方都可以访问到 |
    |              |||
    | web Storage  | 拥有setItem,getItem,removeItem,clear 等方法 ||
    |              | 包括sessionStorage、localStorage ||

    |              | 存储在  |
    |--------------|---------|
    | cookie       | 若设置了过期时间，浏览器就会把cookie保存到硬盘上，关闭后再打开浏览器这些cookie仍然有效直到超过设定的过期时间。 |
    || 若没设置过期时间，浏览器就会把cookie保存到内存里，不同的浏览器有不同的处理方式，暂时简单理解为关闭浏览器窗口，cookie就会消失。 |
    | session      | 服务器 |
    | web Storage  | 浏览器 |

    |              | 安全性  |
    |--------------|---------|
    | cookie       | 保存在浏览器，不是很安全，别人可以分析存放在本地的cookie并进行cookie欺骗，Cookie截获 |
    || 考虑到安全应当使用session，将登录信息等重要信息存放为session |
    | session      |  |
    | web Storage  ||

    |              | 有效性  |
    |--------------|---------|
    | cookie       | 只在设置的cookie过期时间之前有效，即使窗口关闭或浏览器关闭，没设置则只在当前浏览器窗口有效 |
    | session      | |
    | sessionStorage | 仅在当前浏览器窗口关闭之前有效 |
    | localStorage | 始终有效，窗口或浏览器关闭也一直保存，因此用作持久数据 |

    |              | 作用域  |
    |--------------|---------|
    | cookie       | 在所有同源窗口中都是共享的 |
    | session      | |
    | sessionStorage | 不在不同的浏览器窗口中共享，即使是同一个页面 |
    | localStorage | 在所有同源窗口中都是共享的 |

    |              | 服务器性能  |
    |--------------|---------|
    | cookie       |  |
    | session      | 会在一定时间内保存在服务器上，当访问增多，会比较占用你服务器的性能 |
    || 考虑到减轻服务器性能方面，应当使用cookie |
    | web Storage  ||

    |              | 存储空间大小  |
    |--------------|---------|
    | cookie       | 单个cookie保存的数据不能超过4K，很多浏览器都限制一个站点最多保存20个cookie |
    | session      |  |
    | web Storage  | 达到 5M 或更大 |
    |              ||

    |              | 保存的数据类型  | 方法 |
    |--------------|---------|------------|
    | cookie       | 字符串 | 需要前端开发者封装setCookie，getCookie |
    | session      | 对象   ||
    | web Storage  || 拥有setItem,getItem,removeItem,clear等方法 |

    |              | 作用 |
    |--------------|---------|
    | cookie       | 与服务器进行交互，cookie数据始终在同源的http请求中携带 |
    | session      |  |
    | web Storage  | 在本地“存储”数据，不会自动把数据发送给服务器，仅在本地保存 |

52. 所以还是改回使用 js-cookie，先用 npm 引入(npm i js-cookie)，然后全局搜 storage，把登录相关的替换成使用 cookie，其他地方还是用了 localStorage，并且把 localStorage 保存的名称都写到一起去了，在@utils/storage，以防多了之后产生名字混乱。
53. 看到这里，发现梳理了很多逻辑，偏偏忘记了梳理 hamburger 的逻辑
54. 现在开始梳理 hamburger 的逻辑
    
    （1）首先还是看 layout 组件，先看它的样式 .app-wrapper ，有一个 position: relative; 样式

    （2）然后它有一个遮罩层，当 device === 'mobile' 并且 sidebar.opened 为true时才显示

    （3）device 和 sidebar.opened 都在 store 的 app.js 和 getters 中有定义

    （4）device 初始是 'desktop'，sidebar.opened 的初始是 !+getSidebarStatus()，即看缓存中有没有SidebarStatus，一开始是没有，没有就是 true

    （5）classObj 有四种样式可能
         ``` 
            classObj() {
              return {
                hideSidebar: !this.sidebar.opened,
                openSidebar: this.sidebar.opened,
                withoutAnimation: this.sidebar.withoutAnimation,
                mobile: this.device === 'mobile'
              }
            }
         ```
         
        1. hideSidebar 隐藏侧边栏，由 opened 决定，此时侧边栏宽 36px

        2. openSidebar 打开侧边栏，由 opened 决定

        3. withoutAnimation 无动画
        
        4. mobile 启用 mobile 样式，此时 main-container 的 margin-left 为 0 ，侧边栏大小还是不变，它的hideSidebar 的 侧边栏在 x 轴的 -$sideBarWidth 点

    （6）app.js 一共三个方法。

        1. ToggleSideBar ：如果 sidebar.opened 为 true 就添加一个值为 1 的 sidebarStatus 缓存

                                              为 false 就添加一个值为 0 的 sidebarStatus 缓存

        2. CloseSideBar ：根据传入的 withoutAnimation 的值，关闭sidebar

        3. ToggleDevice ：根据传入的 device 的值，改变 device 

        action 提交的是 mutation，所以项目中的 mutation 都是通过 action 提交来触发的

    （7）看 layout 的 mixins，isMobile() 根据屏幕的宽度 和 1024 的大小比较来确定，如果是 mobile，就改变 device 为 'mobile' ，并且无动画地关闭侧边栏，并且在 beforeMount 之前添加一个方法，当屏幕大小改变时触发resize 方法，重新判断 isMobile()
    （8）看 hamburger 组件，两个参数：isActive 和 toggleClick ，isActive 控制图标方向，和 sidebar.opened 同值，toggleClick 改变 sidebar.opened 的值
 

55. 因为花裤衩大佬的项目出现跨域问题，[跨域的解决](https://segmentfault.com/a/1190000011007043)
