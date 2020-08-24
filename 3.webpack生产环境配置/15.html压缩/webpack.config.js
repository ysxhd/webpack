const HtmlWebpackPlugin = require("html-webpack-plugin");
const {
    resolve
} = require('path');

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/build.js',
        path: resolve(__dirname, 'build')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minifu: {
                // 移除空格
                collaseWhitesapece: true,
                // 移除注释
                removeComments: true
            }
        })
    ],
    // 生产环境下会自动压缩
    mode: 'production'
}