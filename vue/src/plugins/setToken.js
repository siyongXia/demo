import { setCookie } from '../utils/util.js'

//盗取真实登录页token(token过期需要重新获取),请求的时候带上该参数就可以访问需要登录的接口
if(process.env.NODE_ENV == 'development') {//开发环境使用
    (function(){
        var token = decodeURIComponent('%7B%22key%22%3A%22b56c1353ccc844aecb49f6033e4dfd3e%22%2C%22val%22%3A%2277dd1325ff99a79e1b5d71ff5b6a05ef%22%2C%22tm%22%3A1510017807%7D');
        setCookie('SHADOWMAN',token);
        // axios.defaults.withCredentials = true;
    })()   
}