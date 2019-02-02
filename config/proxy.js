module.exports = {
  proxy: {
    '/apis': {    //将www.exaple.com印射为/apis
      // 服务器提供的接口如果长这样https://www.exaple.com/server_new/login，
      // 我们把域名提取出来如https://www.exaple.com；
      target: 'https://www.exaple.com',
      secure: false,  // 如果是https接口，需要配置这个参数
      changeOrigin: true,  //是否跨域
      pathRewrite: {
        '^/apis': '' //需要rewrite的,
      }              
    }
  }
}