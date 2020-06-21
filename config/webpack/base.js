const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    entry: {
        polyfill: '@babel/polyfill',
        app: path.resolve(__dirname, '../../src/web/main.ts'),
    },
    output: {
        path: path.resolve(__dirname, './dist/assets'),
        publicPath: '/blog/',
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx', '.vue', '.json'],
        alias: {
            // this isn't technically needed, since the default `vue` entry for bundlers
            // is a simple `export * from '@vue/runtime-dom`. However having this
            // extra re-export somehow causes webpack to always invalidate the module
            // on the first HMR update and causes the page to reload.
            'vue': '@vue/runtime-dom',
            '@': path.resolve(__dirname, '../../src/web')
        }
    },
    performance: {
        hints: false
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: 'vue-style-loader!css-loader',
                    }
                }
            },
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                }
            }
        ]
    }, 
    plugins: [
        new VueLoaderPlugin()
    ],
}