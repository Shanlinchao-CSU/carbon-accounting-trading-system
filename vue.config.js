const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer:{
    port:4090, // 启动端口号
    open:true,  // 启动后是否自动打开网页
  }
})