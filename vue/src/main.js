import Vue from 'vue'
import "babel-polyfill";
import wx from 'weixin-js-sdk'
window.wx = wx;
import store from './store/store.js'
// 移动端自适应
import './config/rem'
import 'mint-ui/lib/style.css'
// 自定义指令
import './directives/'
//自定义过滤器
import './filters/'
//加快移动端点击速度
import './plugins/fastclick/'
//loading
import './plugins/loading.js'
//navigateBar
import './plugins/navigateBar.js'
//axios配置
import './plugins/axios.js'
//setToken,获取需要登录的接口数据
import './plugins/setToken.js'
//vue原型扩展
import './plugins/prototype.js'
//jquery
import $ from 'jquery'
//异常捕获
// import './plugins/error.js'
//router
import router from './plugins/vueRouter.js'
new Vue({
    router,
    store
}).$mount('#app')