const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')


module.exports = {
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    devServer: {
        open: true,
        port: 3000,
        hot: true,
        contentBase: './src',
        proxy: {
            '/api': {
                target: 'https://view.inews.qq.com/g2',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    plugins: [
        new webpack.NamedChunksPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html'
        }),
        new VueLoaderPlugin()
    ],
    module: {
        rules: [{
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            // {
            //     test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
            //     loader: 'file-loader',
            //     options: {
            //         name: '[name].[ext]?[hash:5]',
            //         outputPath: './source/images'
            //     }
            // },
            {
                test: /\.(png)|(jpg)|(gif)|(woff)|(svg)|(eot)|(ttf)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 8192, //小于50K的 都打包
                        outputPath: './source/images',
                        name: "[name].[hash:5].[ext]"
                    }
                }]
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    }
}