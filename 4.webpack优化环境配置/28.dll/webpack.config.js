const {
    resolve
} = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
module.exports = {
    // 入口
    entry: './src/index.js',
    // 输出
    output: {
        filename: 'build.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            // 匹配哪些文件
            {
                test: /\.css$/,
                use: [
                    // use 数组中loader执行顺序： 从右到左，从下到上依次执行
                    // 创建style标签，将js中的样式资源插入进行添加到head中生效
                    'style-loader',
                    //将css文件变成commonjs模块加载到js中，里面内容是字符串
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    // use 数组中loader执行顺序： 从右到左，从下到上依次执行
                    // 创建style标签，将js中的样式资源插入进行添加到head中生效
                    'style-loader',
                    //将css文件变成commonjs模块加载到js中，里面内容是字符串
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
    },
    plugins: [
        // 功能 ：默认会创建一个空的HTML，自动引入打包输出的所有资源（js/css）
        // 需求： 需要有结构的html
        new htmlWebpackPlugin({
            // 复制'./src/index.html,自动引入打包输出的所有资源（js/css）'
            template: './src/index.html'
        }),
        // 告诉webpack哪些库不参与打包，同时使用时的名称也得变~
        new webpack.DllReferencePlugin({
            manifest: resolve(__dirname, 'dll/manifest.json')
        }),
        // 将某个文件打包输出去，并在html中自动引入该资源
        new AddAssetHtmlWebpackPlugin({
            filepath: resolve(__dirname, 'dll/jquery.js')
        })
    ],
    mode: 'development'
}