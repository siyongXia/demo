<template>
	<div>	   
	</div>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		props:['options'],
		methods:{
			wxShare(){
				var protocal = window.location.protocol,
	                hostName = window.location.hostname,
	                options = this.options;
	            var domain = protocal + '//' + hostName;

	            this.$http.get("/sys/getjsconfig.html")
	            	.then(	(data)=> {
	            		var data = data.data;
		                if (data.status !== 0) { 

		                	return; 
		                }
			                wx.config({
			                    appId: data.appId, // 必填，公众号的唯一标识
			                    timestamp: data.timestamp, // 必填，生成签名的时间戳
			                    nonceStr: data.nonceStr, // 必填，生成签名的随机串
			                    signature: data.signature,// 必填，签名，见附录1
			                    jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			                });
			                wx.ready(function(){
			                    wx.onMenuShareTimeline({
			                        title: options.timeLine.title,
			                        link: domain + options.timeLine.link,
			                        imgUrl: domain + options.timeLine.imgUrl,
			                        success: function (callback) { 
									// 用户确认分享后执行的回调函数
										callback&&callback();
								    },
								    cancel: function () { 
								    // 用户取消分享后执行的回调函数

								    }
			                    });
		                    wx.onMenuShareAppMessage({
		                        title: options.appMessage.title,
		                        desc: options.appMessage.desc, // 分享描述
		                        link: domain + options.appMessage.link,
		                        imgUrl: domain + options.appMessage.imgUrl,
		                        success: function (callback) { 
									// 用户确认分享后执行的回调函数
									callback&&callback();
							    },

							    cancel: function () { 
									// 用户取消分享后执行的回调函数

							    }
		                    });
		                });
	            	})
    		}
		},
		mounted(){
			this.wxShare();
		}
	}
</script>