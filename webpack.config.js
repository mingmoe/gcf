"use strict"
// webpack配置文件

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 设置开发模式
    mode: 'development',
    // 设置输入文件
    entry: {
        index: './src/index.js'
    },
    // 设置输出文件
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    // 设置服务器
    devServer: {
        contentBase: './dist',
    },
    devtool: 'inline-source-map',
    // 设置html插件
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Generate Clang Format',
            minify: true,
            template: 'src/index.html'
        }),
    ],
    module: {
        rules: [
            // 编译scss
            {
                test: /\.scss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: "sass-loader",
                        options: {
                            // 使用 `dart-sass`
                            implementation: require.resolve("sass")
                        },
                    }
                ],
            },
        ]
    }
};
