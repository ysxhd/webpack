const {
    resolve
} = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
/**
 * entry: 入口起点
 *      1. string --> './src/index.js'
 *          打包形成一个chunk。输出一个bundle。 
 *      2. array  --> ['./src/index.js', './src/add.js']  
 *          多入口
            所有入口文件最终只会形成一个chunk，输出出去只有一个bundle文件。
            用途只有一个--》只有在HMR功能中让html热更新生效~
 *      3. object
            多入口
            有几个入口文件就形成几个chunk，输出几个bundle
            此时chunk的名称是 key

            --> 特殊用法
            {
                // 所有入口文件最终只会形成一个chunk，输出出去只有一个bundle。
                index: ['./src/index.js','./src/count.js'],
                // 形成一个chunk，输出一个bundle文件。
                add: './src/add.js'
            }
 */
module.exports = {
    entry: './src/index.js',
    output: {
        // 文件名称（指定名称+目录）
        filename: 'js/[name].js',
        // 输出文件目录（将来所有资源输出的公共目录）
        path: resolve(__dirname, 'build'),
        // 所有资源引入的公共路径前缀 --> ‘imgs/a.jpg’ --> '/imgs/a.jpg'
        publicPath: '/', // 一般用于生产环境
        chunkFilename: '[name]_chunk.js', // 非入口chunk的名称
        library: '[name]', // 整个库向外暴漏的变量名
        libraryTarget: 'window' // 变量名添加到哪个browser
        // libraryTarget: 'global' // 变量名添加到哪个browser
        // libraryTarget: 'commonjs' // 变量名添加到哪个browser
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    mode: 'development'
}