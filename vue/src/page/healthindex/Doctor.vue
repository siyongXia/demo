<template>
	<div class="healthindex" v-title data-title="特邀名医">
		<x-header :left-options="{backText: ''}" v-if="!commonIsApp">特邀名医</x-header>  
		<div :class="commonIsApp ?'':'mt10'" >
			<HosDoctor v-for="(item,index) in docList" :info="item" ></HosDoctor>
			<div class="pt10 lh20 typo_gray textc pb10">没有更多啦～</div>
		</div>			
		<BottomAd :info="docBottomAdd" cookieName="docBottomAdd" v-if="docBottomAdd.image"></BottomAd>
	</div>
	
</template>
<script>
	var ret = '';
	var sharetitle, description, shareurl, shareimg;
	import { wxShare ,getAppToken } from '../../utils/util.js'
	import { XHeader } from 'vux'
	import BottomAd from './components/BottomAd.vue'
	import HosDoctor from './components/HosDoctor.vue'
	import { mapGetters } from 'vuex'
	export default {
		data(){
			return {
				docList:[],
				docBottomAdd:{}
			}
		},	
		computed:{
			...mapGetters([
				'commonIsApp'
			])
		},
		methods:{
			getData (params) {
				this.$http.get('/health/getrecdoctor.html',{params:params}).then((data)=>{
					if(data.data.state === 1) {
						this.docList = data.data.data;	
						if(data.data.ad[0]) {
							this.docBottomAdd = {
								url:data.data.ad[0].url,
								image:'https://images.91160.com/' + data.data.ad[0].image
							}
						}						
						if(data.data.cate_info && data.data.cate_info.img) {
							shareimg = 'http://images.91160.com/' + data.data.cate_info.img
							sharetitle  = data.data.cate_info.name + '特邀名医';
						}else {
							shareimg = 'http://static.91160.com/wechat/img/common/logo.jpg'
							sharetitle  = '特邀名医';
						}	
			            description ='小六君为你推荐好医生';
						shareurl = 'https://weixin.91160.com/vue/health/service/doctor.html?category_id=' + this.category_id;
						var wxShareOption = {
							title:sharetitle,
							description:description,
							image:shareimg,
							shareUrl:shareurl
						}
						this.share(wxShareOption);	
					}
				}).catch((err)=>{
					console.log(err);
				})
			},
			share (option) {	
				var wxShareOptions = {
                    timeLine: {                                 
                        title: option.title,
                        link: option.shareUrl,
                        imgUrl:option.image,
                    },
                    appMessage: {
                        title: option.title,
                        desc: option.description, // 分享描述
                        link:option.shareUrl,
                        imgUrl: option.image,
                    },
                    callback: function() {

                    },
                    cancelCallback: function() {

                    }
                }
                wxShare(wxShareOptions, this);
			},
			getNyAppShare: function () {//app分享获取参数
	            var that = this;
	            that.cid = this.$route.query.cid
	            that.js_app_login_token = getAppToken(that.cid);
	            var code = this.$route.query.code;	         		
	            var data_v = {
	                title: sharetitle,
	                details: description,
	                img: shareimg,
	                timeLineTitle: sharetitle,
	                timeLineDetails: description,
	                timeLineImg: shareimg,
	                shareurl: shareurl
	            }        
	            console.log(data_v); 
	            if (sharetitle && description && shareimg) {
	                this.$http({
	                    method: 'get',
	                    async: false,
	                    url: '/sys/appencrypt.html?cid=' + that.cid + '&jstoken=' + encodeURIComponent(that.js_app_login_token) + '&code=' + code + '&data=' + JSON.stringify(data_v)
	                }).then(
	                    function (res) {                        
	                        ret = res.data.data;                      
	                    }
	                )
	            }
	            return ret;
	        },
		},
		mounted(){
			this.category_id = this.$route.query.category_id;			
			this.getData({category_id:this.category_id});
			window.getNyAppShareParam = this.getNyAppShare;	
		},
		components:{
			XHeader,
			HosDoctor,
			BottomAd, 
		}
	}
</script>

<style scoped lang="scss">
	
</style>