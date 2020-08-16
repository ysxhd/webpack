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
    module: {
        rules: [
            /**
             * 语法检查 eslint-loader eslint
             * 注意：只检查自己写的源代码
             * 设置检查规则：
             *  package.json中的eslintConfig中设置：
             *   "eslintConfig": {
                        "extends": "airbnb-base"
                  }
             *  airbnb --> eslint-config-airbnb-base eslint eslint-plugin-import
             */
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    // 自动修复eslint的错误
                    fix: true
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}