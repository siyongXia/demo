<template>
	<div class="docinfo layout bg_white">
		<head-nav>医生动态</head-nav>
		<div class="fullwidth wrapbox mt5">
	    	<dl v-for="(infos,index) in info" class="pl10 pr10 pt10 pb10">
				<dt>
					<img :src="infos.doctorimg" class="docimg">
				</dt>
				<dd>
					<h2 class="typo_large typo_black mb5 typo_normal lh18 h18">
						<span class="fleft elli doctornamewidth col576">{{infos.doctorname}} </span>
						<i class="fleft ml5 tipsgray">{{infos.newtips}}</i>
					</h2>
					<p class="pt5 pb5 typo_middle typo_dgray lh22">
					    <i v-if="infos.type==4">发起了微课堂</i>
						<i v-else-if="infos.type!=2" v-html='infos.content.replace(/br/g, "<br>")'></i>
						<i v-else>
							发表了科普文章
						</i>
					</p>
					<a :href="'/microclass/detail.html?course_id='+infos.text_id" class="block pb5 mb5 col576 typo_small lh20 bgf2" v-if="infos.type==4">
						<div class="wkt-img" :style="{backgroundImage:'url('+infos.wkt_class_images+')'}"></div>
						<div class="wkt-content">{{infos.content}}</div>
						<div>
							<span class="wkt-state" v-if="infos.class_status==1">报名中</span>
							<span class="wkt-state" v-else-if="infos.class_status==2">即将开始</span>
							<span class="wkt-state" v-else-if="infos.class_status==3" style="color:red;">讲课中</span>
							<span class="wkt-state" v-else-if="infos.class_status==4" style="color:#9b9b9b;">课堂回顾</span>
							<span class="wkt-state" v-else style="color:#9b9b9b;">已取消</span>
							<span class="wkt-num" v-if="infos.class_status<=2">{{infos.signNum}}人报名</span>
							<span class="wkt-num" v-else>{{infos.listen_num}}人收听</span>
						</div>
					</a>
					<router-link v-bind="{to:'/vue/doctorsaid/detail.html?id='+infos.text_id}" class="block pl10 pr10 pt5 pb5 mb5 col576 typo_small lh20 bgf2" v-if="infos.type==2">
						《{{infos.content}}》
					</router-link>
					<div v-if="infos.type==3">
						<div v-if="infos.showimg">
							<div v-if="infos.showimg.length==1" class="one-shareimg pt5 pb5 layout">
								<span class="one-showimg" v-for="(imgs , index) in infos.showimg">
									<img :src="imgs.src" :imgW="imgs.w" :imgH="imgs.h" class="preview-img" @click="$preview.open($event,index, infos.showimg)" v-oneimg>
								</span>						
							</div>
							<div v-else class="more-shareimg pt5 pb5 layout">
								<span v-for="(imgs , index) in infos.showimg" v-bind="{style:'background-image:url('+imgs.src+')'}" class="more-showimg backgroundimg preview-img" @click="$preview.open($event,index, infos.showimg)">
								</span>						
							</div>
						</div>
					</div>
					<p class="typo_smaller typo_gray lh20">
						{{infos.times}} &nbsp;&nbsp;
						<span v-if="infos.like_status==1" class="typo_green">
							<i class="iconfont ml10 typo_green">&#xe68f;</i> 赞{{infos.like_num == 0 ? '' : infos.like_num}}
						</span>	
						<span v-else @click="thumbsup(index)" class="typo_gray">
							<i class="iconfont ml10 typo_gray">&#xe68f;</i> 赞{{infos.like_num == 0 ? '' : infos.like_num }}
						</span>					
					</p>
				</dd>
			</dl>
			<div v-if="page_count>1" class="pt10 pb10 textc typo_small lh16 layout" id="loadmores"><img :src="loadimg" class="fleft">加载更多</div>
		</div>
	</div>
</template>
<script>
	var sharetitle = '';
    var description = '';
    var shareimg = '';
    var timeLineTitle='';
    var timeLineDetails='';
    var timeLineImg='';	
	import Vue from 'vue'
	import VuePreview from '../../plugins/preview'
	import HeadNav from '../../components/common/Head.vue'
	import { Toast } from 'mint-ui';
	import {WxOath} from '../../utils/util.js'
	Vue.use(VuePreview)
	export default {
		data () {
			return {
				info:[],
				p:1,
				cur:true,
				page_count:'',
				loadimg:require('./images/loading.gif'),
				wxShareOptions:{
					timeLine:{
						title:'医生说',
						link:'',
						imgUrl:'',
						success: function () { 
							// 用户确认分享后执行的回调函数
							var that = this;
							var text_id = this.doc_say.text_id;
							var cid = this.$route.query.cid;
							var nyeat = encodeURIComponent(this.$route.query.nyeat);											
							this.$http({ 
								method:'post',
								url: '/doc/shareinc.html?cid='+cid+'&nyeat='+nyeat,
								data:'text_id='+text_id}).then(
								function(res){
														
								}
							)							
						}						
					},
					appMessage:{
						title:'医生说',
						desc: '',
						link:'',
						imgUrl:'',
						success: function () { 
							// 用户确认分享后执行的回调函数
							var that = this;
							var text_id = this.doc_say.text_id;
							var cid = this.$route.query.cid;
							var nyeat = encodeURIComponent(this.$route.query.nyeat);											
							this.$http({ 
								method:'post',
								url: '/doc/shareinc.html?cid='+cid+'&nyeat='+nyeat,
								data:'text_id='+text_id}).then(
								function(res){
														
								}
							)							
						}							
					}
				},				
			}
		},
		components:{
			HeadNav
		},
		mounted: function () {
			this.getList(1);
			this.scrollist();
		},
		beforeDestroy(){
			window.onscroll=null;
		},	
		directives:{
			oneimg:function(el){
				var imgW = parseInt(el.getAttribute('imgW'));//获取当前图片的宽
				var imgH = parseInt(el.getAttribute('imgH'));//获取当前图片的高
				var parentW = document.body.clientWidth/2;//屏幕宽度的1/2
				if(imgW < imgH){
					el.style.width = 'auto'
					if(imgH > parentW){
						el.style.height = '5rem'			
					}else{
						el.style.height = '100%'					
					}	
				}else{
					el.style.width = '5rem';
					el.style.height = 'auto';	
				}
			}
		},
		methods:{
			wxShare:function(){
				var protocal = window.location.protocol,
	                hostName = window.location.hostname,
	                options = this.wxShareOptions;
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
			                        link: options.timeLine.link,
			                        imgUrl: options.timeLine.imgUrl,
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
		                        link: options.appMessage.link,
		                        imgUrl: options.appMessage.imgUrl,
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
    		},
			scrollist:function(){
				//页面滑动加载数据
				var that = this;
				window.onscroll = function(){
					if(that.cur){
						var totalheight = parseFloat(document.body.offsetHeight) + parseFloat(document.body.scrollTop);
					    if(document.body.scrollHeight <= totalheight){
					    	that.cur = false;
					        if(that.p < that.page_count){
								that.p++;
								that.getList(that.p)
							}else{
								document.getElementById('loadmores').style.display='none';
							}
					    }						
					}
				}		
			},	
			getList:function(p){
				var that = this;
				var doctor_id = this.$route.query.doctor_id;
				var code = typeof(this.$route.query.code) != 'undefined' ? this.$route.query.code : 0;
				var protocal = 'https:';
	            var hostName = window.location.hostname;
	            var domain = protocal + '//' + hostName;				
				this.$http({
					method:'post',
					url: '/doc/docsaylist.html?&code='+code,
					data:'doctor_id='+doctor_id+'&p='+p}).then(
					function(res){
						if(res.data.state==1){
							Vue.nextTick(function(){						
								that.info = that.info.concat(res.data.data);
								that.page_count = res.data.page_count;

								timeLineTitle = sharetitle = res.data.data[0].doctorname+'医生的动态';
							    timeLineDetails = description = '快来看看'+res.data.data[0].doctorname+'医生说了什么吧';
							    timeLineImg = shareimg = res.data.data[0].doctorimg;									
								that.wxShareOptions.appMessage.title = that.wxShareOptions.timeLine.title=res.data.data[0].doctorname+'医生的动态';
								that.wxShareOptions.timeLine.link = 'https://weixin.91160.com/vue/doctorsaid/list.html?doctor_id='+doctor_id;
								that.wxShareOptions.appMessage.imgUrl=that.wxShareOptions.timeLine.imgUrl=res.data.data[0].doctorimg;
								that.wxShareOptions.appMessage.desc='快来看看'+res.data.data[0].doctorname+'医生说了什么吧';
								that.wxShare();						

							})							
						}else{
							Toast(res.data.msg);
						}
						that.cur = true;
					}
				)
			},	
			thumbsup:function(index){
				var that = this;
				var text_id = this.info[index].text_id;
				this.$http({
					method:'post',
					url: '/do/likedocsay.html',
					data:'text_id='+text_id}).then(
					function(res){
						if(res.data.login==-1){
							window.location.href="/user/login.html?redirect_url="+encodeURIComponent(location.href);
						}else{
							if(res.data.state==1){
								Toast('点赞成功');								
								that.info[index].like_num += 1;	
								that.info[index].like_status=1;	
							}
							else{
								Toast(res.data.msg);
							}					
						}					
					}
				)				
				
			}			
		}
	}
</script>
<style scoped lang = 'scss'>
	$width:5rem;/*屏幕一半宽*/
	$widthli:10rem-1.333333rem*2 - 0.133333rem*2;
	$wthree:10rem-1.333333rem*2-0.133333rem*2-0.266667rem*2;
	$docnamew:10rem-0.26667rem*2-1.333333rem-1.866667rem;
	.col576{color: #576b95;}
	.bgf2{background: #f2f2f2;}
	.doctornamewidth{max-width:$docnamew;}
	.backgroundimg{background-repeat: no-repeat; background-position: center;background-size: cover; }
	.docinfo dt{ float: left; width:1.066667rem;}
	.docinfo dd{margin-top:0.053333rem;margin-left:1.333333rem; padding-bottom:0.426667rem; border-bottom: solid 1px #e9e9e9;}	
	.docimg{float:left;display:inline-block;width: 1.066667rem; height: 1.066667rem; border-radius: 100%;}
	.topblue{ display:inline-block; padding:0 4px; line-height: 18px; font-size:12px;color: #fff;background: #009fec;}
	.tipsgray{padding:0 0.08rem;line-height:0.426667rem;border:solid 0.026667rem #d1d1d1;border-radius:0.026667rem;font-size:0.32rem; color:#9b9b9b; text-align:left;}
	.one-shareimg{ width: 100%}
	.one-showimg{float:left;display:inline-block;max-width:$width;max-height:$width;overflow:hidden;}
	.one-showimg img{ float: left;}
	.more-shareimg{width:$widthli;}
	.more-showimg{float:left;display:inline-block; width:$wthree/3; height: $wthree/3; margin:0 0.133333rem 0.133333rem 0;}
	.more-showimg:nth-child(3n){margin:0 0 0.133333rem 0;}
	.wrapbox{width:100%;padding-top:1.173333rem;background: #fff;word-break:break-all;}
	#loadmores{width:2.666667rem; margin:0 auto;}
	.wkt-img{width:100%;height:4.666666666666667rem;background-size:cover;}
	.wkt-content{margin:0.13333333333333333rem 0.26666666666666666rem;}
	.wkt-state{margin-left:0.26666666666666666rem; font-size:0.32rem;color:#009fec;}
	.wkt-num{margin-left:0.13333333333333333rem;font-size:0.32rem;color:#999;}
	.docinfo dd{padding-right: 0.26666666666666666rem;}
</style>