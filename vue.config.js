const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack");
module.exports = defineConfig({
    lintOnSave: false,
    devServer: {
        client: {
            overlay: false
        },
        port: 4090, // 启动端口号
        open: true, // 启动后是否自动打开网页
    },
    configureWebpack: {
        //支持jquery
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "windows.jQuery": "jquery",
            }),
        ],
    },
});
