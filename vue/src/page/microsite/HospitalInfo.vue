<template>
	<div>
		<!-- <loading v-show="isLoading"></loading>  -->
		<router-view></router-view>
		<!-- <AppAd bottom ="49" @click.native="setAppAddCookie()" v-show="isAppAddShow"></AppAd> -->
		<!-- <MicroFooter ref="foot"></MicroFooter> -->
	</div>

</template>

<script>
	import Grid from '../../components/common/Grid.vue'
	// import MicroFooter from './Footer.vue'
	// import AppAd from './AppAd.vue'
	import Vue from 'vue'
	import {setCookie,readCookie} from '../../utils/util.js'
	import {mapGetters} from 'vuex'
	export default {
		data(){
			return {
				hospitalInfo:[
				],
				isAppAddShow:true,
				 wxShareOptions:{
		          timeLine:{
		            title:'',
		            link:window.location.href,
		            imgUrl:''
		          },
		          appMessage:{
		            title:'',
		            desc: '',
		            link:window.location.href,
		            imgUrl:''
		          }
		        }
			}
		},
		computed:{
	        ...mapGetters([
	          'isLoading'
	      ])
	    },
		methods:{
			handlerClick(event){
				if(event.target.innerText == '关注') {
					this.$refs.foot.focus()
				}else if(event.target.innerText == '分享') {
					this.$refs.foot.share()
				}
			},
			fetchData(){
				var unit_id = this.$route.query.unit_id;
				var that = this;
				if(this.$route.path.indexOf('description.html') !== -1) {//直接文章详情页不请求
					return;
				}
				this.$http.get('/microsite/unitdetail.html?unit_id='+ unit_id)
		            .then((response)=>{  
		                var protocol = window.location.protocol,
		                     unit_name = response.data.unit_name,
		                     bannerImageUrl = protocol+'//images.91160.com/upload/'+response.data.image;
		                 Vue.nextTick(function(argument) {
		                 	that.wxShareOptions.timeLine.title =  that.wxShareOptions.appMessage.title =  that.wxShareOptions.appMessage.desc =response.data.unit_name;
		               		that.wxShareOptions.timeLine.imgUrl =  that.wxShareOptions.appMessage.imgUrl = bannerImageUrl;	
		                 })
		                
		               this.wxShare();             
		            })    
			},
			appAddShow(){
				var isShow = readCookie('isAppAddShow');
				if(isShow) {
					this.isAppAddShow = false;
				}else {
					this.isAppAddShow = true;
				}
			},
			setAppAddCookie(){
				setCookie('isAppAddShow',1);
			},
			setUnitID(){
				var unitId = this.$route.query.unit_id;
				this.$store.dispatch('HOSPITALINFO_UNIT_ID',unitId);
			},
			wxShare(){
			    var protocal = window.location.protocol,
			        hostName = window.location.hostname;
			    var domain = protocal + '//' + hostName,
			    	options = this.options;
			    this.$http.get("/sys/getjsconfig.html")
			        .then(  (data)=> {
			            var data = data.data;
			            if (data.status !== 0) { return; }
			                wx.config({
			                    appId: data.appId, // 必填，公众号的唯一标识
			                    timestamp: data.timestamp, // 必填，生成签名的时间戳
			                    nonceStr: data.nonceStr, // 必填，生成签名的随机串
			                    signature: data.signature,// 必填，签名，见附录1
			                    jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			                });
			                wx.ready(function(){
			                    wx.onMenuShareTimeline({
			                        title: 'nihao',
			                        link:  options.timeLine.link,
			                        imgUrl: options.timeLine.imgUrl,
			                    });                        
			                    wx.onMenuShareAppMessage({
			                        title:options.appMessage.title,
			                        desc:options.appMessage.desc, // 分享描述
			                        link:options.appMessage.link,
			                        imgUrl:options.appMessage.imgUrl,
			                    });
			            });
			        })
			}
		},		
		mounted(){
			this.fetchData();
			this.appAddShow();
			this.setUnitID();
			document.body.style.backgroundColor = "#fff";
		},
		components:{
			Grid,
			// MicroFooter,
			// AppAd
		}
	}
</script>

<style scoped lang = 'less'>
	.hospital-info {
		padding: 30px 0;
	}	
</style>