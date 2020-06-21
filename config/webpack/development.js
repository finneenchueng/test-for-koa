const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('./base');
const { isTest } = require('../enviroment');

function extraAction(appendOpt, config){
    if(isTest){
        config.module.rules.push(appendOpt)
    }
    return config;
}
module.exports = merge(baseWebpackConfig, extraAction({
    enforce: 'pre',
    test: /\.ts?$/,
    loader: 'tslint-loader',
    exclude: /node_modules/
},{
    output: {
        path: path.join(__dirname, '..'),
        publicPath: '/',
        filename: 'js/[name].bundle.js'
    },
    performance: {
        hints: false
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                }
            },
            {
                test: /\.css$/,
                loader: 'vue-style-loader!css-loader'
            },
            {
                test: /\.png$/,
                use: {
                  loader: 'url-loader',
                  options: { limit: 8192 }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Home Page',
            template: path.resolve(__dirname, '../../src/web/template/index.html'),
            filename: 'index.html',
            chunks: ['app', 'polyfill'],
        }),
        new webpack.HotModuleReplacementPlugin()

    ],
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        clientLogLevel: "none",
        port: 3101

    }


}));