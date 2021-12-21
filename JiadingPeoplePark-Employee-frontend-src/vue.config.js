module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  lintOnSave:false,
  // dbServer:{
  //   proxy: {
  //     "/api": { // 将域名映射到"/api"
  //       // target: "http://localhost:8101", // 目标服务器接口
  //       ws:true,
  //       target: "http://101.34.157.75:9020", // 目标服务器接口
  //       changeOrigin: true, // 设置是否允许跨域，默认false
  //       pathRewrite: {
  //         "^/api": '' // 重写路径运行后代理至相应地址
  //       } 
  //     },
  //   },
  // }
}
