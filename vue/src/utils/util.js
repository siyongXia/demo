import GlobalSetting from '../config/GlobalSetting.js'
//写cookies 
export const setCookie = (name, value,days) => {
    var days = days || 1;
    var exp = new Date();
    exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

export const getUrlParam = (pname) => {
    var params = location.search.substr(1); // 获取参数 平且去掉？
    var ArrParam = params.split('&');
    //多个参数参数的情况
    for (var i = 0; i < ArrParam.length; i++) {
        if (ArrParam[i].split('=')[0] == pname) {
            return ArrParam[i].split('=')[1];
        }
    }
}

export const getAppToken = (cid) => {
    var app_login_token;
    if ((typeof(mJavaScriptObject) == 'object')) {
        app_login_token = mJavaScriptObject.getCacheAccessToken();
        //ios老版本mJavaScriptObject.getCacheAccessToken() 无法获取到token，用老的方法重新获取一次
        if (cid == '24' && !app_login_token) {
            mJavaScriptObject.getCacheAccessToken(function(data) {
                app_login_token = data;
            });
        }
    }
    return (typeof(app_login_token) == 'string' && app_login_token.length > 32) ? app_login_token : '';
}

export const getDomain = () => {
    var protocal = window.location.protocol;
    var hostName = window.location.hostname;
    var domain = protocal + '//' + hostName;    
    return domain;
}

export const htmlspecialchars_decode = (str) => {
    str = str.replace(/&amp;/g, '&');
    str = str.replace(/&nbsp;/g, '');
    str = str.replace(/&lt;/g, '<');
    str = str.replace(/&gt;/g, '>');
    str = str.replace(/&quot;/g, "''");
    str = str.replace(/&#039;/g, "'");
    str = str.replace(/&#34;/g, '"');
    return str;
}

export const WxOath = (appId) => {
    if (!getUrlParam('code')) {
        window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appId + "&redirect_uri=" + encodeURIComponent(window.location.href) + "&response_type=code&scope=snsapi_base&state=91160#wechat_redirect"
    }
}

//读取cookies 
export const readCookie = (name) => {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        return decodeURIComponent(arr[2]);
    } else {
        return null;
    }
}



//删除cookies 
export const delCookie = (name) => {
    var cval = readCookie(name);
    if (cval != null) {
        document.cookie = name + "=" + cval + ";expires=" + (new Date(0)).toGMTString();
    }
}
export const getStyle = (element, attr, NumberMode = 'int') => {
    let target;
    // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
    if (attr === 'scrollTop') {
        target = element.scrollTop;
    } else if (element.currentStyle) {
        target = element.currentStyle[attr];
    } else {
        target = document.defaultView.getComputedStyle(element, null)[attr];
    }
    //在获取 opactiy 时需要获取小数 parseFloat
    return NumberMode == 'float' ? parseFloat(target) : parseInt(target);
}

export const loadmore = (callback) => {
    function getScrollTop() { 
        var scrollTop = 0; 
        if (document.documentElement && document.documentElement.scrollTop) { 
            scrollTop = document.documentElement.scrollTop; 
        } else if (document.body) { 
            scrollTop = document.body.scrollTop; 
                    }
        return scrollTop; 
                        }

    //获取当前可视范围的高度 
    function getClientHeight() { 
        var clientHeight = 0; 
        if (document.body.clientHeight && document.documentElement.clientHeight) { 
            clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight); 
                            } else {
            clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight); 
                            }
        return clientHeight; 
                    }

    //获取文档完整的高度 
    function getScrollHeight() { 
        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight); 
                        }
    window.addEventListener('scroll',function(){
        if (getScrollTop() + getClientHeight() == getScrollHeight()) { 
            callback && callback();
                    }
    })
                }

export const formateParams = (data) => {
    var value = [];
    for (var key in data) {
        value.push(key + '=' + data[key]);
    }
    return value.join('&');
}

export const wxShare = (options, vueInstance) => {
    var protocal = window.location.protocol,
        hostName = window.location.hostname;
    var domain = protocal + '//' + hostName;
    var callback = options.callback || function() {},
        cancelCallback = options.cancelCallback || function() {};
    console.log(options);
    vueInstance.$http.get("/sys/getjsconfig.html")
        .then((data) => {

            var data = data.data;
            if (data.status !== 0) {
                return;
            }
            wx.config({
                appId: data.appId, // 必填，公众号的唯一标识
                timestamp: data.timestamp, // 必填，生成签名的时间戳
                nonceStr: data.nonceStr, // 必填，生成签名的随机串
                signature: data.signature, // 必填，签名，见附录1
                jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            wx.ready(function() {
                wx.onMenuShareTimeline({
                    title: options.timeLine.title,
                    link: options.timeLine.link,
                    imgUrl: options.timeLine.imgUrl,
                    success: function() {
                        // 用户确认分享后执行的回调函数
                        callback();
                    },
                    cancel: function() {
                        // 用户取消分享后执行的回调函数
                        cancelCallback();

                    }
                });
                wx.onMenuShareAppMessage({
                    title: options.appMessage.title,
                    desc: options.appMessage.desc, // 分享描述
                    link: options.appMessage.link,
                    imgUrl:options.appMessage.imgUrl,
                    success: function() {
                        // 用户确认分享后执行的回调函数
                        callback();
                    },

                    cancel: function() {
                        // 用户取消分享后执行的回调函数
                        cancelCallback();
                    }
                });
            });
        })
}
export const getNyAppShare = (options, vueInstance) => { //app分享获取参数
    console.log(options)
    window.ret = '';
    var sharetitle = options.title;
    var description = options.details;
    var shareimg = options.img;
    var timeLineTitle = options.timeLineTitle;
    var timeLineDetails = options.timeLineDetails;
    var timeLineImg = options.timeLineImg;
    var shareurl = options.shareurl;
    var that = vueInstance;
    var cid = vueInstance.$route.query.cid;
    var code = vueInstance.$route.query.code || 0;
    var data_v = {
        title: sharetitle,
        details: description,
        img: shareimg,
        timeLineTitle: timeLineTitle,
        timeLineDetails: timeLineDetails,
        timeLineImg: timeLineImg,
        shareurl: shareurl
    }
    console.log(data_v);
    if (sharetitle && description && shareimg) {
        vueInstance.$http({
            method: 'get',
            async: false,
            url: '/sys/appencrypt.html?cid=' + cid + '&jstoken=' + encodeURIComponent(getAppToken(cid)) + '&code=' + code + '&data=' + JSON.stringify(data_v)
        }).then(
            function(res) {
                window.ret = res.data.data;
                return ret;
            }
        )
    } 
}

export const isAppOrWeixin = (vueInstance) => { //app分享获取参数
    var ua = navigator.userAgent.toLowerCase();
    var cid = vueInstance.$route.query.cid;
    if(ua.match(/MicroMessenger/i)=="micromessenger" || typeof(mJavaScriptObject) == 'object' || cid =="20" ||  cid =="24") {
        return true;
    }else {
        return false;
    }
}

export const commonIsApp = (vueInstance) => { //app分享获取参数
    var cid = vueInstance.$route.query.cid;
    if( typeof(mJavaScriptObject) == 'object' || cid =="20" ||  cid =="24") {
        return true;
    }else {
        return false;
    }
}


export const CoolWPDistance = (lat1,lng1,lng2,lat2) => {   
    function getRad(d) {   
        var PI = Math.PI;    
        return d*PI/180.0;    
    }  
    var lat1 = Number(lat1),
    lng1 = Number(lng1),
    lat2 = Number(lat2),
    lng2 = Number(lng2);
    var f = getRad((lat1 + lat2)/2);     
    var g = getRad((lat1 - lat2)/2);     
    var l = getRad((lng1 - lng2)/2);     
    var sg = Math.sin(g);     
    var sl = Math.sin(l);     
    var sf = Math.sin(f);     
    var s,c,w,r,d,h1,h2;     
    var a = 6378137.0;//The Radius of eath in meter.   
    var fl = 1/298.257;     
    sg = sg*sg;     
    sl = sl*sl;     
    sf = sf*sf;     
    s = sg*(1-sl) + (1-sf)*sl;     
    c = (1-sg)*(1-sl) + sf*sl;     
    w = Math.atan(Math.sqrt(s/c));     
    r = Math.sqrt(s*c)/w;     
    d = 2*w*a;     
    h1 = (3*r -1)/2/c;     
    h2 = (3*r +1)/2/s;     
    s = d*(1 + fl*(h1*sf*(1-sg) - h2*(1-sf)*sg));  
    if(s >= 1000 && s <= 99000){
        var kilometer = s/1000;
        s = kilometer.toFixed(1) + 'km';
    }else if(s > 99000){
        s = '>99km';
    }else{
        s = Math.round(s) + 'm';
    }  
    return s;   
}

export const isNotEmptyObject = (o) => { 
    if( typeof(o) !== 'object') return;
    let type = Object.prototype.toString.call(o),
        result = false;
    if( type === '[object Object]'){//对象
      for(var k in o) {
        return  result = true;
      }

    }else if(type === '[object Array]' ){//数组
        if( o.length > 0) {
            result = true;
        }
    }
    return result;
}

export const LazyLoad = (defaultImgUrl)=> {
    window.onscroll = null;
    let img = document.getElementsByClassName('lazyload');
    let num = img.length;
    let n = 0; //存储图片加载到的位置，避免每次都从第一张图片开始遍历
    lazyload(); //页面载入完毕加载可是区域内的图片
    function lazyload() { //监听页面滚动事件
        let seeHeight = document.documentElement.clientHeight; //可见区域高度
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop; 

        //滚动条距离顶部高度
        for (let i = n; i < num; i++) {
            // 图片未出现时距离顶部的距离大于滚动条距顶部的距离+可视区的高度
            if (img[i].offsetTop < seeHeight + scrollTop) {
                if (img[i].getAttribute("src") == defaultImgUrl) {
                    img[i].src = img[i].getAttribute("data-src");
                }
                n = i + 1;
            }
        }
    }
    //采用了节流函数
    function throttle(fun, delay, time) {
        let timeout,
        startTime = new Date();
        return function() {
            let context = this,
                args = arguments,
                curTime = new Date();
            clearTimeout(timeout);
            // 如果达到了规定的触发时间间隔，触发 handler
            if (curTime - startTime >= time) {
                fun.apply(context, args);
                startTime = curTime;
                // 没达到触发间隔，重新设定定时器
            } else {
                timeout = setTimeout(fun, delay);
            }
        };
    };
    window.addEventListener('scroll',throttle(lazyload,500,1000));
  }  

 export const download_app = ()=> {
    var loadDateTime = new Date();
    window.setTimeout(function() {
        var timeOutDateTime = new Date();
        if (timeOutDateTime - loadDateTime < 5000) {
            window.location.href = "/index.php?c=scan&a=index&code=dPhS3aD5q4R0%2BFLdoPmrhMG1v.hgq2fGRCOS7wVwqXCgYLhdNDaUnQ%3D%3D";//跳转的APP下载链接
        } else {
            window.close();
        }
    }, 2000);
    if (/android|Android/i.test(navigator.userAgent)) {
        window.location.href = "jiuyi160://www.91160.com";//安卓暴露的接口
    } else {
        window.location.href = "jiuyi160://www.91160.com";//IOS的暴露接口
    }
}   

export const getUuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    })
}

export const autoPullApp = (app_native_tpl) => {
    if(typeof(mJavaScriptObject) == 'object'){
        if(app_native_tpl){
            if(mJavaScriptObject.callbackNative(app_native_tpl)){
                return false;
            }
        }
        return true;
    }
}

export const getScrollHeight = (except) => {
    const clientWidth = document.body.clientWidth || document.documentElement.clientWidth,
        clientHeight = document.body.clientHeight || document.documentElement.clientHeight,
        ratio = clientWidth / 375;
    return clientHeight - except * ratio + 'px';
}

export const getClientInfo = () => {
    var clientHeight =document.body.clientHeight || document.documentElement.clientHeight,
        clientWidth =document.body.clientWidth || document.documentElement.clientWidth;
    return {
        clientHeight,clientWidth
    }
}

export const getRatio = (except) => {
    const clientWidth = document.body.clientWidth || document.documentElement.clientWidth;
    return clientWidth/375;
}

export const getWeixinShareUrl = (vueInstance,query) => {
    var url = GlobalSetting.WEIXIN + vueInstance.$route.path;
    if(query) {
        return url + '?' + query ;
    }
    return url;
}

export const pullUpNativeHos = (unit_id) => { //拉取原生医院主页
    if ((typeof (mJavaScriptObject) == 'object')) {         
        mJavaScriptObject.funGotoHospitalHomePage(unit_id,0)
    } else {
        window.location.href = '/unit/dep.html?unit_id='+unit_id ;
    }     
} 

export const pullUpNativeDoc = (unit_id,dep_id,doctor_id,type = 'full') => { //拉取原生医院主页
   if ((typeof (mJavaScriptObject) == 'object')) {                
        mJavaScriptObject.funGotoDocHomepageActivity(unit_id, dep_id, doctor_id, 0);
    } else {
        window.location.href = "/doctor/detail.html?unit_id="+unit_id+"&dep_id="+dep_id+"&doc_id="+doctor_id+"&type="+type;;
    }     
} 
          


