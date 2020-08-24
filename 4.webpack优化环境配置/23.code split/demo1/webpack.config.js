const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
    resolve
} = require('path');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 定义nodejs环境变量
process.env.NODE_ENV = 'production';


module.exports = {
    entry: {
        // 多入口： 有一个入口，最终输出就有一个bundle
        index: './src/js/index.js',
        test: './src/js/test.js'
    },
    output: {
        filename: 'js/built[name].[contenthash:10].js',
        path: resolve(__dirname, 'build')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        })
    ],
    mode: 'production'
}