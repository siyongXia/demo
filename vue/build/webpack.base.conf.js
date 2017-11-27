var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')
var vueLoaderConfig = require('./vue-loader.conf')
var env = process.env.NODE_ENV
    // check env & config/index.js to decide weither to enable CSS Sourcemaps for the
    // various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd
process.noDeprecation = true

const vuxLoader = require('vux-loader')
let webpackConfig = {
    entry: {
        app: './src/main.js'
    },
    output: {
        path:  process.env.NODE_ENV === 'production' ? config.build.assetsRoot : config.test.assetsRoot,
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : process.env.NODE_ENV === 'test' ? config.test.assetsPublicPath : config.dev.assetsPublicPath,
        filename: '[name].[hash:5].js'
    },
    resolve: {
        extensions: ['*','.js', '.vue', '.less', '.css', '.scss'],
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            'src': path.resolve(__dirname, '../src'),
            '@': path.resolve(__dirname, '../static'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'components': path.resolve(__dirname, '../src/components'),
            'page': path.resolve(__dirname, '../src/page')
        }
    },
    // externals: {
    //   'vue': 'Vue',
    //   'vue-router': 'VueRouter',
    //   'vuex': 'Vuex',
    //   'axios': 'axios'
    // },
    // resolveLoader: {
    //     fallback: [path.join(__dirname, '../node_modules')]
    // },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: vueLoaderConfig
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            include: projectRoot,
            exclude: /node_modules/
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: utils.assetsPath('img/[name].[hash:7].[ext]')
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            }
        },{
            test: /vue-preview.src.*?js$/,
            loader: 'babel-loader'
        }]
    }
}

module.exports = vuxLoader.merge(webpackConfig, {
  plugins: ['vux-ui', 'progress-bar', 'duplicate-style']
})

