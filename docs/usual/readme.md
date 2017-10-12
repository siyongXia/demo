<h2 id="isApp">是否是APP</h2>

```
isApp(){
    var cid = this.$route.query.cid;
    if(cid==20||cid==24 || typeof(mJavaScriptObject) == 'object'){
        this.isNotApp = false;
    }
}
```
<h2 id="wxShare">微信分享</h2>
vue 前后端分离:
```
util.js
export const wxShare = (options, vueInstance) => {
    var protocal = window.location.protocol,
        hostName = window.location.hostname;
    var domain = protocal + '//' + hostName;
    var callback = options.callback || function() {},
        cancelCallback = options.cancelCallback || function() {};
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

***.vue
import { wxShare } from 'pathname/util.js';
var wxShareOptions = {
    timeLine: {                                 
        title:'XXX',
        link: 'XXX',
        imgUrl:'XXX',
    },
    appMessage: {
        title: 'XXX',
        desc: 'XXX', // 分享描述
        link: '',
        imgUrl: 'XXX',
    },
    callback: function() {
    },
    cancelCallback: function() {
    }
};
wxShare(wxShareOptions, this);
```
<h2 id="pullNative">拉取原生APP对应的页面</h2>
```
//app_native_tpl:调后台接口获取APP加密字符串
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
```
<div style="height: 1000px;"></div>