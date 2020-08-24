const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
    resolve
} = require('path');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 定义nodejs环境变量
process.env.NODE_ENV = 'production';
// 服用loader
/**
 * 缓存： 
 *    babel缓存：  cacheDirectory: true  -->让第二次打包构建速度更快
 *    文件资源缓存
 *          hash: 每次webpack构建时会生成一个唯一的hash值
 *              问题： 因为js和css同时使用一个hash值
 *                 如果重新打包，会导致所有缓存失效。（可能我却之改动一个文件）
*           chunkhash: 根据chunk生成的hash值。如果打包来源于同一个chunk，那么hash值就一样
*               问题： js和css的hash值还是一样的
*                      因为css是在js中被引入的，所以同属于一个chunk
*            contenthash：根据文件的内容生成hash值。不同文件hash值一定不一样
                --》让代码上线运行缓存更好使用
 */
const commonCssLoader = [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
        // 还需要在pachage.json中定义browerslist
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: () => [
                require('postcss-preset-env')()
            ]
        }
    }
]
/**
 * 正来讲，一个文件只能被一个loader处理。
 * 当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序
 * 先执行eslint 在执行babel
 */

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.[contenthash:10].js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
                    fix: true
                }
            },
            {
                oneOf: [{
                        test: /\.css$/,
                        use: [...commonCssLoader]
                    },
                    {
                        test: /\.less$/,
                        use: [...commonCssLoader, 'less-loader']
                    },
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env'],
                                // 开启babel缓存
                                // 第二次构建时，会读取之前的缓存
                                cacheDirectory: true
                            }
                        }
                    },
                    {
                        test: /\.(jpg|png|gif)/,
                        loader: 'url-loader',
                        options: {
                            limit: 8 * 1024,
                            name: '[hash:].[ext]',
                            outputPath: 'imgs',
                            esModule: false
                        }
                    },
                    {
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
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/build.[contenthash:10].css',
            chunkFilename: '[id].css',
        }),
        new OptimizeCssAssetsWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        })
    ],
    mode: 'development'
}