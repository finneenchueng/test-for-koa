const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const baseWebpackConfig = require('./base');

module.exports = merge(baseWebpackConfig, {
    output: {
        path: path.resolve(__dirname, '../../dist/assets'),
        publicPath: '/blog/',
        filename: 'js/[name].[hash].js',
    },
    // performance: {
    //     hints: true
    // },
    mode: 'production',
    module: {
        rules: [
            // {
            //     test: /.(ts|tsx)?$/,
            //     include: [path.resolve(__dirname, '../../node_modules'), path.resolve(__dirname, '../../src/web')],
            //     loader: 'babel-loader',
            //     options: {
            //         cacheDirectory: true
            //     }
            // },
            {
                test: /\.css$/,
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader,
                    options: { hmr: false }
                  },
                  'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif)([\?]?.*)$/,
                use: {
                    loader: 'url-loader',
                    options: { 
                        limit: 0,
                        name: 'images/[name].[hash].[ext]',
                    }
                }
            },
            {
                test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]?hash'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Home Page',
            template: path.resolve(__dirname, '../../src/web/template/index.html'),
            filename: '../../dist/views/entry.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            chunks: ['app', 'common'],
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'manual'
        }),

        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css',
            // chunkFilename: 'css/[id].[hash:8].css',
        })

    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            name: 'common',
        },

    },
    
})