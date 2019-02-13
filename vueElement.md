1. 先看路由，文档中有说，此项目的路由和侧边栏是绑定的，所以路由的编写需要遵循一些约定的规则：

      | 配置项        | 值                     | 说明      |
      |--------------|-----------------------|----------|
      | path         | '/icons'              | 路由路径 |
      | component    | ()=>import('组件路径') | 组件 |
      | redirect     | '/icons/index'        | 重定向地址，在面包屑导航栏中点击导航后会转到的地址，当设置为 'noredirect' 的时候该路由在面包屑导航中不可被点击（当它需要有子路由时设置为不可点击） |
      | alwaysShow | true / false          | 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式 -- 如组件页面 |
      |              |                       | 只有一个时，会将那个子路由当做根路由显示在侧边栏 -- 如引导页面 |
      |              |                       | 若你想不管路由下面的 children 声明的个数都显示你的根路由，你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由（本来是只有 children 声明的路由为0个，或者没有声明 children 才显示根路由的 meta 中设置的title和icon） |
      | name         | 'router-name'         | 设定路由的名字，一定要填写不然使用keep-alive时会出现各种问题 |
      | meta         |||
      | - roles      | [ 'admin', 'editor' ] | 设置该路由进入的权限，支持多个权限叠加 |
      | - title      | '首页'                | 设置该路由在侧边栏和面包屑中展示的名字 |
      | - icon       | 'svg-name'            | 设置该路由的图标 |
      | - noCache    | true / false(默认)    | 如果设置为true，则不会被 <keep-alive> 缓存(默认 false) |
      | - breadcrumb | false                | 如果设置为false，则不会在breadcrumb面包屑中显示 |

示例：
``` js
{
  path: '/permission',
  component: Layout,
  redirect: '/permission/index', //重定向地址，在面包屑中点击会重定向去的地址
  hidden: true, // 不在侧边栏线上
  alwaysShow: true, //一直显示根路由
  meta: { roles: ['admin','editor'] }, //你可以在根路由设置权限，这样它下面所以的子路由都继承了这个权限
  children: [{
    path: 'index',
    component: ()=>import('permission/index'),
    name: 'permission',
    meta: {
      title: 'permission',
      icon: 'lock', //图标
      role: ['admin','editor'], //或者你可以给每一个子路由设置自己的权限
      noCache: true // 不会被 <keep-alive> 缓存
    }
  }]
}
``` 

2. 继续看路由，路由分类：constant(常量)

      | 路由              | 说明 ||
      |-------------------|-----|--|
      | constantRouterMap | 代表那些不需要动态判断权限的路由，如登录页、404、等通用页面。 ||
      | asyncRouterMap    | 代表那些需要动态判断权限并通过 addRouters 动态添加的页面。 ||

3. 看[文档 - 登陆逻辑](https://juejin.im/post/591aa14f570c35006961acac)：

   （1）用户填完用户名和密码，提交

   （2）向服务端验证是否正确

   （3）验证通过后，服务端返回一个 token

   （4）前端拿到 token 之后，存入缓存
   
   （5）再根据 token 去请求用户的详细信息（如用户权限、用户名等）

   （6）获取到用户权限 role 之后，根据用户的 role ，动态算出其对应有权限的路由，通过 [router.addRoutes](https://router.vuejs.org/zh/api/#router-addroutes) 动态挂载这些路由

   以上通过vuex全局管理控制。

4. 写一个验权页面，~~首先去 login 那里加了两个账号~~，没有必要，又不是走接口，把返回值改了一下。路由那里添加了'/permission'，views 那里添加了 permission 文件夹。跟着重新写了一下permission.js 里面的逻辑和 store 里的代码。
5. 理一遍逻辑：

   （1）登录成功获取用户信息后走 GenerateRoutes action，它返回一个 Promise，roles 为接口传回来的用户信息里的 roles，根据这个 roles 去删选所有的 asyncRouters ，其中 admin 这个角色可以查看所有。所以先进行一次是否 includes 'admin' 的判断，如果含有，则全显示，如果不含有，再进行筛选。

   （2）筛选函数 filterAsyncRouter 是一个递归函数。传入 routes：要筛选的路由列表，roles：角色的权限。

   （3）hasPermission 方法用来判断是否有权限。

   （4）有的话就把路由 push 进来，同时如果此路由有子路由，就再走一遍 filterAsyncRouter 函数，并且把此子路由定义为路由的children。

6. 开始看 permission 的 page 页面，引入了一个 SwitchRoles，可用来切换当前登录的账号的角色。

7. 看 switchRoles 组件时，[computed 的 get 和 set 用法](https://segmentfault.com/a/1190000012948175)

8. 开始梳理 switchRoles 的逻辑：
   （1）点击单选按钮切换角色，进到 ChangeRoles action

   （2）接下来的逻辑处理需要后端配合，[issue](https://github.com/PanJiaChen/vue-element-admin/issues/293)，前端为了显示才那么写

   （3）进到 ChangeRoles action 后，将传入的 role 当做 token 来重新获取 info，

   （4）根据获取的 roles 重新动态生成路由

   （5）用到了 vue 指令

9. 差不多自己实现了一下，bug ：以 djlun 权限登录后，切换到 admin 权限 page 页面不能访问。

10. 首页没有在侧边栏显示，现在要将它显示。因为原来 hidden 设为了 true。

11. 开始写 svgIcon 页面，展示了一些 svg ，点击可复制代码。

12. 展示样式很好理解，复制功能使用了[clipboard.js 英文文档](https://github.com/zenorocha/clipboard.js)，[中文翻译](https://www.cnblogs.com/yunser/p/7628031.html)

13. 照着大佬写好的 clipboard.js 过了一遍，svgIcon 页面大致就算好了。

14. [vscode快速新建vue模板](https://blog.csdn.net/x550392236/article/details/80771410)



