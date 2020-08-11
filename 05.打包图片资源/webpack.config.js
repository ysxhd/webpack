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
            },
            // 处理不了html图片 
            {
                test: /\.(jpg|png|gif)$/,
                // 下载url-loader file-loader
                loader: 'url-loader',
                options: {
                    //图片小于8kb，就会处理成base64
                    // 减少请求数量（减轻服务气压力），缺点图片提及会更大（文件请求速度更慢）
                    limit: 1 * 1024,
                    // 因为 url-loader默认使用的是es6模块化解析，而html-loader引入图片是common.js
                    // 解析时会出现问题
                    // 关闭url-loader的es6模块化，使用commonjs解析
                    esModule: false,
                    // 给图片重命名
                    // [hash:10]取图片的hash值前十位
                    // [ext]取文件的原来的扩展名 
                    name: '[hash:10].[ext]'
                }
            },
            {
                test: /\.html$/,
                // 处理html文件的img图片（负责引入img，从而能被url-loader进行处理）
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            // 复制'./src/index.html,自动引入打包输出的所有资源（js/css）'
            template: './src/index.html'
        })
    ],
    mode: 'development'
}