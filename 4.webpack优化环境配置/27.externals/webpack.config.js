/*
    webpack.congig.js webpack的配置文件
    作用： 只是webpack干哪些活
*/

const {
    resolve
} = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 入口
    entry: './src/index.js',
    // 输出
    output: {
        filename: 'build.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: []
    },
    plugins: [
        // 功能 ：默认会创建一个空的HTML，自动引入打包输出的所有资源（js/css）
        // 需求： 需要有结构的html
        new htmlWebpackPlugin({
            // 复制'./src/index.html,自动引入打包输出的所有资源（js/css）'
            template: './src/index.html'
        })
    ],
    mode: 'production',
    externals: {
        // 忽略库名 --npm包名
        // 拒绝jquery被打包进来
        jquery: 'jQuery'
    }
}