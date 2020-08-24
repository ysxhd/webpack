const {
    resolve
} = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    output: {
        // 文件名称（指定名称+目录） 
        filename: 'js/[name].js',
        // 输出文件目录（将来所有资源输出的公共目录） 
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            // loader的配置 
            {
                test: /\.css/,
                // 多个loader用use 
                use: ['style-loader', 'css-loader']
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    mode: 'development',
    // 解析模块的规则 
    resolve: {
        // 配置路径别名
        alias: {}
    }
}