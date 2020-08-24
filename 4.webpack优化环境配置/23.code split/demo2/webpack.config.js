const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
    resolve
} = require('path');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 定义nodejs环境变量
process.env.NODE_ENV = 'production';


/**
 * 正来讲，一个文件只能被一个loader处理。
 * 当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序
 * 先执行eslint 在执行babel
 */

module.exports = {
    entry: './src/js/index.js',
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
    // 1.可以将node_modules中代码单独打包成一个chunk最终输出
    // 2.自动分析多入口chunk中，有没有公共的依赖。如果有会打包成单独的chunk
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    mode: 'production'
}