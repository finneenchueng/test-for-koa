const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const baseWebpackConfig = require('./base');

module.exports = merge(baseWebpackConfig, {
    output: {
        path: path.resolve(__dirname, '../../dist/assets'),
        publicPath: '/blog/',
        filename: 'js/[name].[hash:8].js',
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
                    options: { 
                        hmr: false,
                    }
                  },
                  'vue-style-loader',
                  'css-loader'
                  
                ]
            },
            // {
            //     test: /\.css$/,
            //     use: [
            //       {
            //         loader: MiniCssExtractPlugin.loader,
            //         options: { hmr: false }
            //       },
            //       'vue-style-loader!css-loader!postcss-loader'
            //     ]
            // },

            // {
            //     test: /\.css$/,
            //     use: ExtractTextPlugin.extract({
            //         fallback: 'style-loader',
            //         use: [
            //             { 
            //                 loader: 'css-loader', 
            //                 options: { 
            //                     importLoaders: 1 
            //                 } 
            //             },
            //             { 
            //                 loader: 'postcss-loader', 
            //                 options: { 
            //                     parser: 'sugarss', 
            //                     exec: true 
            //                 }
            //             }
            //         ]
            //     })
            // },
            {
                test: /\.(png|jpg|gif)([\?]?.*)$/,
                use: {
                    loader: 'url-loader',
                    options: { 
                        limit: 0,
                        name: 'images/[name].[ext]?hash',
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
            filename: '../../dist/assets/entry.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            chunks: ['runtime', 'polyfill', 'app', 'common'],
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency'
        }),

        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css',
            chunkFilename: 'css/[id].[hash:8].css',
        }),
        // copy custom static assets
        // new CopyWebpackPlugin([{
        //     from: path.resolve(__dirname, '../../src/web/assets/icons/*'),
        //     to: path.resolve(__dirname, '../../dist/assets/icons'),
        //     ignore: ['.*']
        // }])

    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            name: 'common',
        },
        runtimeChunk: {
            name: 'runtime',
        }

    },
    
})