/*
    webpack.congig.js webpack的配置文件
    作用： 只是webpack干哪些活
*/

const {
    resolve
} = require('path');

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

    ],
    mode: 'development'
}