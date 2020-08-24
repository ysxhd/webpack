// HMR: hot moduile replacement 热模块替换 
// 一个模块发生变化,指挥重新打包这一个模块(而不是打包所有模块) 极大提升构建效率
/**
 * 样式文件: 可以使用HMR功能: 因为style-loader内部实现了~
 * js文件: 默认是不能使用HMR 功能,添加支持HMR文件代码
 *   注意: HMR功能对js的处理,只能处理非入口js文件的
 * html文件: 默认不能使用HMR功能,同时会导致问题: html文件不能热更新了~(不用做HMR)
 * 解决: 修改entry,将html文件引入
 */
const {
    resolve
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: ['./src/js/index.js', './src/index.html'],
    output: {
        filename: 'js/build.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            // 处理less
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
            // 处理css
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, {
                // 处理图片资源
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 1024,
                    name: '[hash:10].[ext]',
                    // 关闭es6模块化
                    esModule: false,
                    outputPath: 'imgs'
                }
            }, {
                // 处理html中img资源
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                // 处理其他资源
                exclude: /\.(html|js|css|less|png|gif|jpg)/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]',
                    outputPath: 'media'
                }
            }
        ]
    },
    plugins: [
        // plugins的配置
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        compress: true,
        port: 3000,
        hot: true,
        open: true
    },

    mode: 'development'
}