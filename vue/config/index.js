// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
    test: {
        env: {
            NODE_ENV: '"test"'
        },
        index: path.resolve(__dirname, '../../public/vue/index.html'),
        assetsRoot: path.resolve('E:/www','91160-static/wechat/vue'),
        assetsSubDirectory: 'vuestatic',
        assetsPublicPath: 'https://static.91160.com/wechat/vue/',
        productionSourceMap: true,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        //appid:'wx4606443306ae82b9'//线上的appid
        appid:'wx0001f8ab87472985'//57的appid
    },
    build:{
        env: {
            NODE_ENV: '"production"'
        },
        
        index: path.resolve(__dirname, '../../public/vue/index.html'),
        assetsRoot: path.resolve('E:/www','91160-static/wechat/vue'),
        assetsSubDirectory: 'vuestatic',
        assetsPublicPath: 'https://static.91160.com/wechat/vue/',
        productionSourceMap: true,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        // appid:'wx4606443306ae82b9'//线上的appid
        appid:'wx0001f8ab87472985'//57的appid
    },
    dev: {
        env: {
            NODE_ENV: '"development"'
        },
        port: 8088,
        assetsSubDirectory: 'src',
        assetsPublicPath: '/',
        context: [ //代理路径
            'localhost:8088',
            '/doc',
            '/act',
            '/do',
            '/user',
            '/microsite',
            '/depart',
            '/health',
            '/wapnews',
            '/healthplan',
            '/unit',
            '/health',
            '/onlinehospital',
            '/unit',
            '/talk',
            '/sys',
            '/api',
            '/ask',
            '/networkhospital',
            '/main',
	    ],
        proxypath: 'http://wap.91160.com',
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false,
        appid:'wxf4a855d360c058d7'
    }
}