import Vue from 'vue'
import axios from 'axios'
import { WxOath } from '../utils/util.js'
import store from '../store/store.js'
import {appId} from '../config/env'
axios.interceptors.request.use(function(config) { //配置发送请求的信息     
    store.dispatch('COMMON_LOADING_SHOW')
    return config;
}, function(error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function(response) { //配置请求回来的信息
    if (response.data.login == -1) { //未登录       
        window.location.href="/user/login.html?redirect_url="+encodeURIComponent(location.href);
        return;
    }
    store.dispatch('COMMON_LOADING_HIDE')
    return response;
}, function(error) {
    return Promise.reject(error);
});
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// axios.defaults.baseURL = 'https://wap.91160.com/';
Vue.prototype.$http = axios;