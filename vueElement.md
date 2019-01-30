1. 先看路由，文档中有说，此项目的路由和侧边栏是绑定的，所以路由的编写需要遵循一些约定的规则：

      | 配置项        | 值                     | 说明      |
      |--------------|-----------------------|----------|
      | path         | '/icons'              | 路由路径 |
      | component    | ()=>import('组件路径') | 组件 |
      | redirect     | '/icons/index'        | 重定向地址，在面包屑导航栏中点击导航后会转到的地址，当设置为 'noredirect' 的时候该路由在面包屑导航中不可被点击 |
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

   （6）获取到用户权限 role 之后，根据用户的 role ，动态算出其对应有权限的路由，通过 router.addRoutes 动态挂载这些路由

   以上通过vuex全局管理控制。

4. 看 login 页面，先配置路由，login 是不需要鉴权的，所以写在 constantRouterMap 里。