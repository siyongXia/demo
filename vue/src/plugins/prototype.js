import Vue from 'vue'

Vue.prototype.gaSend = function(value){
   ga('send','event',value,'点击');
};

Vue.prototype.urlFormat = (path, params) => { //自动生成URL
    let origin = window.location.origin ,
        queryString = '';
    origin.indexOf('loacalhost') == -1 ? origin : 'https://wap.91160.com';
    if(params) {
        queryString += '?';
        for(let k in params ) {
            queryString += `${k}=${params[k]}&`
        }
    }    
    return origin + path + queryString.slice(0,-1);
}