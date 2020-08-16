const {
    resolve
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
                // css兼容性处理：postcss --》postcss-loader postcss-preset-env
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