<template>
	<div v-cloak class="bg_white allbox">
		<div v-if="allboxshow==true">
			<head-nav v-if="headshow==true">
				<span class="typo_white" v-if="doc_say.text_type=='article'">科普文章</span>
				<span class="typo_white" v-else-if="doc_say.text_type=='notice'">医生公告</span>
				<span class="typo_white" v-else-if="doc_say.text_type=='bit'">行医点滴</span>
			</head-nav>
			<div class="fullwidth" :class="{wrapbox:headshow==true}">
				<div v-if="deteleinfo==true" class="pt20 textc typo_middle typo_dgray bg_white" style="padding-bottom:2.666667rem;">
					<i class="block iconfont typo_gray pb10" style="margin-top:1.6rem;font-size:60px;">&#xe67d;</i>{{nodatatips}}	
				</div>
				<div v-else class="layout">
					<div v-if="shield==true" class="toptips">
						<span>您的文章由于{{shield_reason_desc}}，审核未通过。您可以在电脑上登录doctor.91160.com，修改后重新发布！</span>
					</div>
					<div class="fleft fullwidth">
						<div class="pagn">
							<div v-if="headtext=='科普文章'">	
								<h3 class="pt10 typo_xlarge typo_normal typo_black0" v-html='doc_say.title.replace(/br/g,"<br>")'></h3>
								<div v-if="doc_say.source">
									<div class="typo_small typo_grey mt4 pb5 elli">
										<span class="sourceinfo">{{doc_say.source}}</span>
										<template v-if="doc_say.source=='原创'">文章由{{doc_say.source_tips}}{{doc_say.source}}</template>
										<template v-else>文章转载自{{doc_say.source_tips}}</template>
									</div>
								</div>
								<dl class="docinfo layout" @click="docindexLink">
									<dt>
										<img :src="doc_info.avatar" v-cloak class="docimg">
									</dt>
									<dd class="typo_small typo_gray lh20">
										<p class="noti elli"><i class="typo_black">{{doc_info.doctor_name}}</i> &nbsp;<i class="typo_gray">{{doc_info.unit_name}}</i></p>
										<p class="typo_gray noti typo_smaller">
											<span class="fleft typo_gray">发布于{{doc_say.add_time}}&nbsp;&nbsp;</span>
											<i class="ml10 mt2 iconfont typo_large typo_gray h18 lh18 fleft">&#xe6a9;</i>
											<span class="fleft typo_gray">{{doc_say.view_num}}</span>
										</p>
									</dd>
								</dl>

								<div class="mt5 lh28 typo_middle typo_dgray ds-detail">
									<div v-if="contentsource=='app'">
										<div class="ds-detail-p" v-for="consection in doc_say.content">
											<div v-if="consection.type=='sub_title'" class="typo_black0 typo_bold" v-html='consection.content.replace(/br/g,"<br>")'>
											</div>
											<div v-else-if="consection.type=='section'" class="typo_dgray" v-html='consection.content.replace(/br/g,"<br>")'>
											</div>
											<div v-else>
												<img :src="consection.content">
											</div>
										</div>
									</div>
									<div v-else>
										<div class="ds-detail-p detail-img" v-html='doc_say.content.replace(/\n/g,"<br>")'></div>
									</div>
								</div>

								<div class="mt5 lh28 typo_small typo_dgray">
									<span v-for="illname in doc_say.ill_names" class="illname">{{illname}}</span>
								</div>

								<div class="mt20 layout typo_small bgf9">
									<img :src="doc_info.avatar" class="fleft doctor-img" @click="docindexLink">
									<p class="fleft w-53 ml10 lh22" @click="docindexLink">
										<span class="block typo_middle typo_gray lh28">
											<i class="fleft doc-nametit mr5 elli typo_black typo_large">{{doc_info.doctor_name}}</i> 
											<i class="typo_gray">{{doc_info.zcname}}</i>
										</span>
										<span class="block typo_gray lh22 elli">{{doc_info.dep_name}}</span>
										<span class="block typo_gray lh20 elli">{{doc_info.unit_name}}</span>
									</p>
									<div class="fright w-20 rgtbtns" v-if="doctorappshow == false">
										<span @click="attent('clickAttent')">
											<i v-if="doc_info.is_focus=='0'" id="clickAttent" ga-statistics-click="文章页面_关注_点击">关注</i>
											<i v-else class="attent" id="clickAttent" ga-statistics-click="文章页面_已关注_点击">已关注</i>
										</span>
										<span @click="askbox('clickAskli')">
											<i v-if="is_ask==1" id="clickAskli" ga-statistics-click="文章页面_咨询_点击" ga-statistics-show="文章页面_咨询_展示">咨询</i>
											<i v-else id="clickAskli" ga-statistics-click="文章页面_医生主页_点击" ga-statistics-show="文章页面_医生主页_展示">主页</i>
										</span>
									</div>
								</div>
							</div>
							<div v-else>
								<div class="mt20 layout typo_small">
									<img :src="doc_info.avatar" class="fleft doctor-img" @click="docindexLink">
									<p class="fleft w-53 ml10 lh22" @click="docindexLink">
										<span class="block typo_middle typo_gray lh28">
											<i class="fleft doc-nametit mr5 elli typo_black typo_large">{{doc_info.doctor_name}}</i> 
											<i class="typo_gray">{{doc_info.zcname}}</i>
										</span>
										<span class="block typo_gray lh22 elli">{{doc_info.dep_name}}</span>
										<span class="block typo_gray lh20 elli">{{doc_info.unit_name}}</span>
									</p>
									<div class="fright w-20 rgtbtns toprgtbtns" v-if="doctorappshow == false">
										<span @click="attent('clickAttent')">
											<i v-if="doc_info.is_focus=='0'" id="clickAttent" ga-statistics-click="文章页面_关注_点击">关注</i>
											<i v-else class="attent" id="clickAttent" ga-statistics-click="文章页面_已关注_点击">已关注</i>
										</span>
										<span @click="askbox('clickAskli')">
											<i v-if="is_ask==1" id="clickAskli" ga-statistics-click="文章页面_咨询_点击" ga-statistics-show="文章页面_咨询_展示">咨询</i>
											<i v-else-if="is_ask==0" id="clickAskli" ga-statistics-click="文章页面_医生主页_点击" ga-statistics-show="文章页面_医生主页_展示">主页</i>							
										</span>
									</div>
								</div>	
								<div class="mt20 typo_gray typo_smaller">
									发布于{{doc_say.add_time}}
								</div>	
								<div class="mt5 lh28 typo_middle typo_dgray ds-detail" v-if="doc_say.text_type=='bit'">
									<div v-html='doc_say.title.replace(/br/g,"<br>")'></div>
									<div class="ds-detail-p" v-for="imgs in doc_say.image">
										<img :src="imgs">
									</div>
								</div>	
								<div class="mt5 lh28 typo_middle typo_dgray ds-detail" v-if="doc_say.text_type=='notice'" v-html='doc_say.title.replace(/br/g, "<br>")'>
								</div>							
							</div>
							<div class="tc mt20 pb20 pt20 typo_smaller">
								<div v-if="doc_say.like_status==0">
									<span class="thumbsup iconfont" @click="thumbsup"  v-if="doctorappshow == false">
										&#xe6ad;
									</span>
									<p class="typo_small pt5">已有{{doc_say.like_num}}人点赞</p>
								</div>
								<div v-else>
									<span class="thumbsup overthumbsup iconfont"  v-if="doctorappshow == false">
										&#xe6ad;
										<transition name="fade">
											<i class="addone" v-show="showaddone">点赞+1</i>
										</transition>
									</span>
									<p class="typo_small pt5">已有{{doc_say.like_num}}人点赞</p>
								</div>
							</div>
							<div class="textc likelist layout">
								<dl v-for="(like_list,index) in like_list" v-bind:class="{fleft: likelistnum}">
									<dt>
										<template v-if="like_list.type==1&&like_list.sex==1">
											<img :src="like_list.avatar" :onerror="default_woman">
										</template>
										<template v-else-if="like_list.type==1&&like_list.sex==0">
											<img :src="like_list.avatar" :onerror="default_man">
										</template>
										<template v-else-if="like_list.type==2&&like_list.sex==1">
											<img :src="like_list.avatar" :onerror="default_doctor_woman">
										</template>
										<template v-else-if="like_list.type==2&&like_list.sex==0">
											<img :src="like_list.avatar" :onerror="default_doctor_man">
										</template>
										<template v-else>
											<img :src="like_list.avatar">
										</template>
									</dt>
									<dd>{{like_list.name}}</dd>
								</dl>
							</div>
							<div v-if="page_count>1" class="pt10 pb10 textc typo_small lh16 layout" id="loadmores"><img :src="loadimg" class="fleft" style="width:0.426667rem;">加载更多</div>
							<div class="pagn10 mt20 textc ">
								<div class="mt20 pt15 pb10 typo_lgray typo_smaller bb_gray">觉得赞的话记得随手分享哦！</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="textc loadimg" v-else-if="allboxshow==false">
			<span><img :src="loadimg"></span>
		</div>
	</div>
</template>
<script>
	var ret = '';
    var sharetitle,shareimg,description,timeLineTitle,timeLineDetails,timeLineImg,shareurl;
	var protocal = 'https:';
    var hostName = window.location.hostname;
    var domain = protocal + '//' + hostName;

	import Vue from 'vue'
	import $ from 'jquery'
	import HeadNav from '../../components/common/Head.vue'
	import { Toast } from 'mint-ui';
	import {WxOath,htmlspecialchars_decode} from '../../utils/util.js'
	export default {
		data () {
			return {
				doc_say:{},
				doc_info:{},
				shield_reason_desc:'',
				shield:false,
				is_ask:1,  //是否咨询
				showaddone:false,
				pull_app_native:'',
				js_app_login_token:'',
				likelistnum:false,
				newcid:'',
				p:1,
				cur:true,
				doctorappshow:false,
				like_list:[],
				page_count:'',
				contentsource:'',//判断文章来自pc还是app
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
							this.$http({ 
								method:'post',
								url: '/doc/shareinc.html?cid='+that.newcid+'&jstoken='+encodeURIComponent(that.js_app_login_token),
								data:'text_id='+text_id}).then(
								function(res){
														
								}
							)							
						}						
					},
					appMessage:{
						title:'医生说',
						desc: '医生说',
						link:'',
						imgUrl:'',
						success: function () { 
							// 用户确认分享后执行的回调函数
							var that = this;
							var text_id = this.doc_say.text_id;
							var cid = this.$route.query.cid;																	
							this.$http({ 
								method:'post',
								url: '/doc/shareinc.html?cid='+that.newcid+'&jstoken='+encodeURIComponent(that.js_app_login_token),
								data:'text_id='+text_id}).then(
								function(res){
														
								}
							)							
						}							
					}
				},
				headshow:'',
				headtext:'',
				doctorapp:'',
				deteleinfo:'',
				nodatatips:'',
				allboxshow:false,
				loadimg:require('./images/bigloading.gif'),
				default_man: 'this.src="' + require('./images/avatar_user_0.jpg') + '"',
				default_woman: 'this.src="' + require('./images/avatar_user_1.jpg') + '"',
				default_doctor_man: 'this.src="' + require('./images/doctor_man.jpg') + '"',
				default_doctor_woman: 'this.src="' + require('./images/doctor_woman.jpg') + '"'
			}
		},
		components:{
			HeadNav
		},	
		beforeDestroy(){
			window.onscroll=null;
		},				
		mounted: function(){
            this.getContent(1);
            this.showhead();
			this.scrollist();
            window.getNyAppShareParam = this.getNyAppShare;
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
			getNyAppShare:function(){//app分享获取参数
				var that = this;
				var cid = this.$route.query.cid;				
				var text_id = this.$route.query.id;
				var code = this.$route.query.code;	
				var shareUrl = 'https://weixin.91160.com/vue/doctorsaid/detail.html?id='+text_id;
				var data_v ={
					title:htmlspecialchars_decode(sharetitle),
					details:htmlspecialchars_decode(description),
					img:shareimg,
					timeLineTitle:htmlspecialchars_decode(timeLineTitle),
					timeLineDetails:htmlspecialchars_decode(timeLineDetails),
					timeLineImg:shareimg,
					text_id:text_id,
					shareurl:shareUrl
				}
				console.log(data_v)	
		        if(sharetitle && description && shareimg){      
					this.$http({
						method:'get',
						async : false,
						url: '/sys/appencrypt.html?cid='+that.newcid+'&cid='+that.newcid+'&jstoken='+encodeURIComponent(that.js_app_login_token)+'&code='+code+'&data='+JSON.stringify(data_v)
						}).then(
						function(res){
							ret = res.data.data;				
						}
					)		
		        }
			    return ret;				
			},			
			showhead:function(){
				var cid = this.$route.query.cid;
				var that = this;
				if(that.newcid==24||that.newcid==20||that.newcid==100000001||that.newcid==100000002){
					that.headshow = false;
				}else{
					that.headshow=true;
				}
				if(that.newcid==100000001||that.newcid==100000002){
					that.doctorapp = true;
				}else{
					that.doctorapp = false;
				}
			},
			docindexLink:function(){
				if(this.doctorapp==false){
					var unit_id = this.doc_info.unit_id;
					var dep_id = this.doc_info.dep_id;
					var doc_id = this.doc_info.doctor_id;
					var app_native_tpl = this.pull_app_native;
					if(typeof(mJavaScriptObject) == 'object'){
				        if(app_native_tpl){
				            if(mJavaScriptObject.callbackNative(app_native_tpl)){
				                return false;
				            }
				        }
				    }else{
						window.location.href='/doctor/detail.html?unit_id='+unit_id+'&dep_id='+dep_id+'&doc_id='+doc_id+'&type=full'			            
			        }
				}				
			},
			askbox:function(el){
				if(this.doctorapp==false){
					var unit_id = this.doc_info.unit_id;
					var dep_id = this.doc_info.dep_id;
					var doc_id = this.doc_info.doctor_id;
					var app_native_tpl = this.pull_app_native;
					ga('send','event',document.getElementById(el).getAttribute('ga-statistics-click'),'点击');	
					ga('send','event',document.getElementById(el).getAttribute('ga-statistics-show'),'展示');
					if(typeof(mJavaScriptObject) == 'object'){
				        if(app_native_tpl){
				            if(mJavaScriptObject.callbackNative(app_native_tpl)){
				                return false;
				            }
				        }
				    }else{
						if(this.is_ask==0){
							window.location.href='/doctor/detail.html?unit_id='+unit_id+'&dep_id='+dep_id+'&doc_id='+doc_id+'&type=full'
						}else{
							window.location.href='/doctor/detail.html?unit_id='+unit_id+'&dep_id='+dep_id+'&doc_id='+doc_id+'&type=askdoc'
						}				            
			        }
				}
			},
			thumbsup:function(){
				if(this.doctorapp==false){
					var that = this;
					var text_id = this.$route.query.id;
					var cid = this.$route.query.cid;							
					var code = this.$route.query.code;
					that.js_app_login_token = that.getAppToken();
					this.$http({
						method:'post',
						url: '/do/likedocsay.html?cid='+that.newcid+'&jstoken='+encodeURIComponent(that.js_app_login_token)+'&code='+code,
						data:'text_id='+text_id}).then(
						function(res){
							if(!res){
								return false;
							}							
							if(res.data.login==-1){
								window.location.href="/user/login.html?redirect_url="+encodeURIComponent(location.href);
							}else{
								if(res.data.state==1){
									that.doc_say.like_num += 1;
									that.showaddone=true;
									that.doc_say.like_status=1;	
									var likelists= [];
									likelists[0]=res.data.data;
									that.like_list = likelists.concat(that.like_list);	
									if(that.like_list.length > 5){//判断点赞人数是否超过5个，如果超过就左对齐，没有就居中显示
										that.likelistnum = true;
									}else{
										that.likelistnum = false;
									}																		
								}else{
									Toast(res.data.msg);
									that.doc_say.like_status=1;								
								}						
							}					
						}
					)
				}
			},
			jsnewcid:function(){
				var cid = this.$route.query.cid;
				var newCid;
				var that = this;
				if(typeof(cid)=='object'){
					newCid=cid[0];
				}else{
					newCid=cid;
				}	
				if(that.js_app_login_token && typeof(cid)=='undefined'){
					newCid = 20;				
				}	
				return newCid;				
			},
			getAppToken:function(){
				var app_login_token;
				var that = this;
				var cid = this.$route.query.cid;					
				if ((typeof (mJavaScriptObject) == 'object')) {
					app_login_token = mJavaScriptObject.getCacheAccessToken();
					//ios老版本mJavaScriptObject.getCacheAccessToken() 无法获取到token，用老的方法重新获取一次
					if (that.newcid == '24' && !app_login_token) {
						mJavaScriptObject.getCacheAccessToken(function (data) {
							app_login_token = data;
						});
					}
				}
				return (typeof (app_login_token) == 'string' && app_login_token.length > 32) ? app_login_token : '';
			},
			attent:function(el){
				if(this.doctorapp==false){
					var that = this;
					var focus_id = this.doc_info.doctor_id;
					var cid = this.$route.query.cid;	
					var code = this.$route.query.code;	
					that.js_app_login_token = that.getAppToken();
					ga('send','event',document.getElementById(el).getAttribute('ga-statistics-click'),'点击');	
					ga('send','event',document.getElementById(el).getAttribute('ga-statistics-show'),'展示');	
					this.$http({ 
						method:'post',
						url: '/do/focus.html?cid='+that.newcid+'&jstoken='+encodeURIComponent(that.js_app_login_token)+'&code='+code,
						data:'focus_id='+focus_id}).then(
						function(res){
							if(!res){
								return false;
							}								
							if(res.data.login==-1){
								window.location.href="/user/login.html?redirect_url="+encodeURIComponent(location.href);
							}else{
								Vue.nextTick(function(){
									that.doc_info.is_focus=!that.doc_info.is_focus						
								})
							}					
						}
					)
				}	
			},
			getContent:function(p){
				var that = this;
				var id = this.$route.query.id;
				var cid = this.$route.query.cid;	
				that.js_app_login_token = that.getAppToken();
				that.newcid = that.jsnewcid();	
				var code = typeof(this.$route.query.code) != 'undefined' ? this.$route.query.code : 0;	
				var protocal = 'https:';
	            var hostName = window.location.hostname;
	            var domain = protocal + '//' + hostName;
				var metas = document.getElementsByTagName("meta"); 
				if(that.newcid==100000001||that.newcid==100000002){
					that.doctorappshow = true;
				}else{
					that.doctorappshow = false;
				}
				this.$http({
					method:'post',
					async : false,
					url:'/doc/docsaydetail.html?cid='+that.newcid+'&jstoken='+encodeURIComponent(that.js_app_login_token)+'&code='+code,
					data:'id='+id+'&p='+p
				}).then(
					function(res){
						if(res.data.needOauth && response.data.needOauth != undefined){
							WxOath(appId);
						}else{
							that.allboxshow = true;									
							if(res.data.state==1){
								if(res.data.data.state == -1){
									that.shield = true;
									that.shield_reason_desc = res.data.data.shield_reason_desc;
								}	
								that.like_list = that.like_list.concat(res.data.data.like_list);
								if(p==1){
									document.title = res.data.data.title;
									metas[0].content =res.data.data.keywords;
									metas[1].content=res.data.data.description;
									that.deteleinfo = false;
									that.is_ask = res.data.data.is_ask;
									that.doc_say = res.data.data.doc_say;
									that.doc_info = res.data.data.doc_info;
									that.page_count = res.data.data.page_count;
									if(res.data.data.like_list.length > 5){//判断点赞人数是否超过5个，如果超过就左对齐，没有就居中显示
										that.likelistnum = true;
									}else{
										that.likelistnum = false;
									}
									//判断文章来源
									if(typeof(that.doc_say.content)=='object'){
										that.contentsource = 'app';
									}else{
										that.contentsource = 'pc';
									}
									that.pull_app_native = res.data.data.pull_app_native;
									switch(res.data.data.doc_say.text_type){
										case 'article':
											that.headtext='科普文章';
											timeLineTitle = sharetitle = res.data.data.doc_say.title;
		    								timeLineDetails = description = res.data.data.doc_say.sharedesc.substring(0, 30);
		    								timeLineImg = shareimg = res.data.data.doc_info.avatar;	
											that.wxShareOptions.appMessage.title = that.wxShareOptions.timeLine.title=res.data.data.doc_say.title;	 
											that.wxShareOptions.appMessage.desc = res.data.data.doc_say.sharedesc.substring(0, 30);				
		    								break;
		    							case 'notice':
		    							case 'bit':
		    								that.headtext = res.data.data.doc_say.text_type == 'notice' ? '医生公告' : '行医点滴'
											timeLineTitle = sharetitle = res.data.data.doc_info.doctor_name+'医生发布了一则'+(res.data.data.doc_say.text_type == 'notice' ? '公告' : '行医点滴');
											timeLineTitle += res.data.data.doc_say.title ? (':'+res.data.data.doc_say.title) : '';
		    								timeLineDetails = description = res.data.data.doc_say.title ? (res.data.data.doc_say.title).replace(/br/g, '\r\n') : '快来看看'+res.data.data.doc_info.doctor_name+'医生说了什么吧';
		    								timeLineImg = shareimg = res.data.data.doc_info.avatar;	
											that.wxShareOptions.appMessage.title = that.wxShareOptions.timeLine.title = res.data.data.doc_info.doctor_name+'医生发布了一则'+(res.data.data.doc_say.text_type == 'notice' ? '公告' : '行医点滴');
											that.wxShareOptions.appMessage.desc = res.data.data.doc_say.title ? (res.data.data.doc_say.title).replace(/br/g, '\r\n') : '快来看看'+res.data.data.doc_info.doctor_name+'医生说了什么吧';   								
		    								break;   								

									}
									that.wxShareOptions.appMessage.link = that.wxShareOptions.timeLine.link = 'https://weixin.91160.com/vue/doctorsaid/detail.html?id='+res.data.data.doc_say.text_id;
									that.wxShareOptions.appMessage.imgUrl = that.wxShareOptions.timeLine.imgUrl=res.data.data.doc_info.avatar;
									that.wxShare();
									that.getNyAppShare();	
								
								}

							}else{
								that.deteleinfo = true;
								that.nodatatips = res.data.msg;
							}
						}
						that.cur = true;
					}
				)
			},
			scrollist:function(){
				//页面滑动加载数据
				var that = this;
				window.onscroll = function(){
					if(that.cur&&that.page_count>1){
						var totalheight = parseFloat(document.body.offsetHeight) + parseFloat(document.body.scrollTop)+20;
					    if(document.body.scrollHeight <= totalheight){
					    	that.cur = false;
					        if(that.p < that.page_count){
								that.p++;
								that.getContent(that.p)
							}else{
								Toast('已加载完成');
								$("#loadmores").hide();
							}
					    }						
					}
				}		
			},				
		}
	}
</script>
<style scoped>
	.allbox{min-height: 100%;}
	.pagn10{padding-left: 10%;padding-right: 10%; }
	.mt2{margin-top: 0.053333rem;}
	.w-53{width: 53%;}
	.bgf9{padding:0.48rem 0.266667rem 0.4rem;background: #f9f9f9}
	.loadimg{float:left;width: 100%;height:17rem;/*background:url(images/loadimgbg.gif) no-repeat top center;*/ background-size: contain;animation:shows 1s;opacity:1;}
	.loadimg span{position: absolute;top: 50%;left:50%; width: 1.866667rem; height: 1.866667rem; margin:-0.933333rem 0 0 -0.933333rem; text-align: center; line-height: 1.866667rem;}
	.docinfo{padding:0.266667rem 0 0.266667rem 0;}
	.docinfo dt{ float: left; width: 0.8rem;margin-top: 0.106667rem}
	.docinfo dd{margin-left:1.066667rem;}
	.docimg{float:left;width: 0.8rem; height: 0.8rem; border-radius: 100%;}
	.doctor-img{ width: 1.866667rem; height: 1.866667rem; border-radius: 100%;}
	.rgtbtns span{ float: right; display: block; padding:0.08rem 0 0.186667rem 0;}
	.rgtbtns span i{display:inline-block;width:1.733333rem; height:0.746667rem;  line-height:0.746667rem;border-radius:0.746667rem; text-align: center; color:#fff; background: #00d3c2;}
	.rgtbtns span i.attent{background: #d1d1d1;color:#fff;}
	.toprgtbtns span i{display:inline-block;width: 1.6rem; height: 0.693333rem;  line-height: 0.693333rem; border:solid 1px #00d3c2; border-radius: 0.106667rem; text-align: center; color:#00d3c2; background: #fff;}
	.toprgtbtns span i.attent{border:solid 1px #b8b8b8;color:#9b9b9b; background: #fff;}
	.thumbsup{ position: relative; display: inline-block; width:2.346667rem; height:2.346667rem; line-height:2.346667rem; border-radius: 100%; font-size:1.173333rem; color:#fff; background: #ffb753;}
	.overthumbsup{ background: #d1d1d1}
	.addone{position: absolute;bottom:0.266667rem;left:50%; margin-left: -1.28rem; animation:addone 2s; width:2.56rem; height: 1.066667rem; line-height: 1.066667rem; text-align: center;border-radius: 0.266667rem; opacity: 0; font-size:0.426667rem; color: #fff;background: #ff9a37}
	.wrapbox{width:100%;padding-top:1.173333rem;background: #fff;}
	.illname{ display: inline-block;margin:0.16rem 0.16rem 0 0; padding:0 0.266667rem; height: 0.8rem; line-height: 0.8rem; border-radius: 0.133333rem; font-size: 0.373333rem; color: #4a4a4a; background: #f1f1f1;}
	.sourceinfo{ display: inline-block; width: 1.013333rem; height: 0.48rem; margin-right: 0.133333rem; line-height:0.426667rem; border-radius: 0.533333rem; border: solid 1px #9b9b9b; text-align: center; font-size: 0.32rem; color: #9b9b9b;}
	.likelist dl{display: inline-block; width: 1.6rem; height:1.6rem; margin:0.213333rem 0.08rem;}
	.likelist dt img{width: 1.066667rem; height: 1.066667rem; border-radius: 0.053333rem;}	
	.likelist dd{font-size: 0.266667rem; overflow: hidden;}
	@keyframes addone{
		0% { opacity: 0;bottom:0.266667rem;}
		50%{ opacity: 1;bottom:2.666667rem;}
		100%{ opacity:0;bottom:2.666667rem;}
	}
	@keyframes shows{
		0% { opacity: 1;}
		100%{ opacity:0;}
	}
	#loadmores{width:2.666667rem; margin:0 auto;}
	.toptips{width: 100%; margin-bottom: 0.266667rem}
	.toptips span{display: block;padding:0.133333rem 0.266667rem; text-align: center; color: #ff9f4f; background:#fff7e9;}
</style>