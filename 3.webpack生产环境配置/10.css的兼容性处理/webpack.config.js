const {
    resolve
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 设置nodejs环境变量
// process.env.NODE_ENV = 'development';
module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/build.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                /* css兼容性处理：postcss --》postcss-loader postcss-preset-env
                   帮postcss找到package.json中的broswerslist ，通过配置加载指定的兼容性
                      "browerslist": {
                        //   开发环境 --》 设置node环境变量 process.env.NODE_ENV = development
                        "development": [
                        "last 1 chrome version",
                        "last 1 firefox version",
                        "last 1 safari version"
                        ],
                        // 生产环境
                        "production": [
                        ">0.2%",
                        "not dead",
                        "not op_mini all"
                        ]
                    }
                */

                //使用loader默认配置
                // 'postcss-loader'
                // 想要修改配置就用下面的写法
                {
                    loader: 'postcss-loader',
                    options: {
                        ident: 'postcss',
                        plugins: () => [
                            // postcss插件
                            require('postcss-preset-env')()
                        ]
                    }
                }
            ]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/build.css'
        })
    ],
    mode: 'development'
}