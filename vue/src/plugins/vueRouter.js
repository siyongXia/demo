import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '../router/router'
import { routerMode, appId } from '../config/env.js'
import { getUrlParam, getAppToken,readCookie} from '../utils/util.js'
import axios from 'axios'
import common from '../router/modules/common.js';
routes[0].children = routes[0].children.concat(common);//保证404路由在最底部
Vue.use(VueRouter)
const router = new VueRouter({
    routes,
    mode: routerMode,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { x: 0, y: 0 };
        }
    },
    strict: process.env.NODE_ENV !== 'production'
})
router.beforeEach( (to, from, next) => { 
    if (to.meta.needLogin) {
        var origin = location.origin;
        var cid = to.query.cid;
        var isLogined = window.sessionStorage.getItem('isLogined'),
            isLoginOut = readCookie('is_logout');
        if(isLogined && isLoginOut !=1 ) {
            next();
            return;
        }else {
            axios.get('/user/islogined.html').then((data)=>{
                if(data.data.status === 0 ) { //登录失效                   
                    var ua = navigator.userAgent.toLowerCase();
        if(cid === '20' || cid === '24' || (typeof(mJavaScriptObject)=='object') ) { //如果是在APP里面验证jstoken
            var  jstoken = encodeURIComponent(getAppToken());        
            axios.get('/user/loginByAppToken.html?jstoken='+jstoken).then((data)=>{
                if(data.data.status == 1) {//已登录;
                    next();
                    return;
                }else {//未登录
                                window.sessionStorage.removeItem('isLogined');
                                location.href = '/user/login.html?redirect_url='+ encodeURIComponent(origin + to.fullPath)
                    return;
                }
            }).catch((err)=>{
                console.log(err);
            })
            return;
                    }else if(origin.indexOf('weixin') !== -1 && ua.match(/MicroMessenger/i)=="micromessenger"  ) {//如果是微信域名,
                        var code = getUrlParam('code') || 0;
                        if (!code) { //判断url是否携带微信返回的code,如果没有,跳转微信官方链接获取
                            window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appId + "&redirect_uri=" + encodeURIComponent(origin + to.fullPath) + "&response_type=code&scope=snsapi_base&state=91160#wechat_redirect"
                            return;
                        }
                        axios.get('/user/loginByCode.html?code='+code).then((data)=>{
                            if(data.data.status == 1) {//登录成功
                                window.sessionStorage.setItem('isLogined','1');
                                next();
                                return;
                            }else {
                                window.sessionStorage.removeItem('isLogined');
                                location.href = '/user/login.html?redirect_url='+ encodeURIComponent(origin + to.fullPath)
                            }
                        })
                    }else {//不是微信域名
                        window.sessionStorage.removeItem('isLogined');
                        location.href = '/user/login.html?redirect_url='+ encodeURIComponent(origin + to.fullPath)
                    }
                }else if( data.data.status === 1){//登录未失效
                    next();
                    window.sessionStorage.setItem('isLogined','1');
                    return;
                }
            })
        }
    }else {
        next();
    }
})

export default router;
