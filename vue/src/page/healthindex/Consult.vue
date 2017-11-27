<template>
	<div class="healthindex" v-title data-title="160资讯">
		<x-header :left-options="{backText: ''}"  v-if="!commonIsApp">160资讯</x-header>
		<div class="pl15 pr15 pt20 bg_white pb30 mb10 bor_t">
			<div class="fs18 lh24 typo_black0 mb5">{{articleInfo.title}}</div>
			<div class="fs12 typo_gray">
				<span class="pr10">原创</span><span class="pr10">作者：{{articleInfo.author}}</span>
				<span  class="pr10">发布于{{articleInfo.addTime}}</span>
				<span><i class="iconfont fs18 vtm">&#xe6a9;</i>{{articleInfo.viewCount}}</span>
			</div>
			<div class="mt20" v-html="articleInfo.content">
			</div>
		</div>
		<a :href="add.link" v-if="add">	 				
			<img :src="add.image" alt="" class=" mb10 h100">
		</a>
		<div class="mb10" v-if="articleList.length > 0">
			<subTitle title="相关阅读" ></subTitle>
			<div class="bg_white">				
				<articleItem v-for="(item,index) in articleList" :info="item"></articleItem>
			</div>
		</div>
		<div class="mb10" v-if="productList.id">
			<subTitle title="人气商品" ></subTitle>
			<div class="bg_white pt20">	
				<ProductItem :info="productList"></ProductItem>			
			</div>
		</div>
		
	</div>
</template>
<script>
	var ret = '';
	var sharetitle, description, shareurl, shareimg;
	import { XHeader } from 'vux'
	import subTitle from '../../components/common/SubTitle.vue'
	import articleItem from '../../components/common/articleItem.vue'
	import ProductItem from '../../components/common/ProductItem.vue'
	import GlobalSetting from '../../config/GlobalSetting.js'
	import { wxShare, getAppToken } from '../../utils/util.js'
	import { mapGetters } from 'vuex'
	
	export default {
		data(){
			return {	
				articleInfo:{},			
				articleList:[],
				productList:'',
				article_id:'',
				add:''
			}
		},
		computed:{
			...mapGetters([
				'commonIsApp'
			])
		},
		methods:{
			getArticleDetail (params) {
				this.$http.get('/health/getarticledetail.html',{params:params}).then((data)=>{
					if(data.data.state === 0 ) {
						this.$router.push({name:'404'});
						return;
					}
					this.articleInfo = data.data.data;
					var tmpList = data.data.article_list || [];
					if(tmpList.length > 0) {
						tmpList.map((item,index)=>{
							item.image =  GlobalSetting.IMAGESDOMAIN + JSON.parse(item.videoImg)[0].img;
						})
					}				
					this.articleList = tmpList;
					this.productList = data.data.goods;
					this.productList.img = GlobalSetting.IMAGESDOMAIN + this.productList.img;
					this.add = data.data.ad_list[0];
					if(this.add) {	
						this.add.image = GlobalSetting.IMAGESDOMAIN + this.add.image;
					}
					var shareImage = JSON.parse(this.articleInfo.videoImg)[0].img;
					shareImage = shareImage ?  'http://images.91160.com/' + shareImage :  'http://static.91160.com/wechat/img/common/logo.jpg'
					sharetitle  =this.articleInfo.title;
		            description = '小六君为你推荐好文'
		            shareimg =  shareImage;
		            shareurl = 'https://weixin.91160.com/vue/health/consult.html?article_id=' + this.article_id;
					var wxShareOption = {
						title:this.articleInfo.title,
						description:description,
						image: shareImage
					}
					this.share(wxShareOption);
				}).catch((err)=>{
					console.log(err);
				})
			},
			share (option) {
				var shareUrl = 'https://weixin.91160.com/vue/health/consult.html?article_id=' + this.article_id
				var wxShareOptions = {
	                    timeLine: {                                 
	                        title: option.title,
	                        link: shareUrl,
	                        imgUrl:option.image,
	                    },
	                    appMessage: {
	                        title: option.title,
	                        desc: option.description, // 分享描述
	                        link:shareUrl,
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
	            console.log(data_v) ; 
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
		
		watch: {
			$route () {
				window.scrollTo(0,0);
				this.article_id = this.$route.query.article_id;
				this.getArticleDetail({article_id:this.article_id});
			}
		},
		mounted(){	
			this.article_id = this.$route.query.article_id;		
			this.getArticleDetail({article_id:this.article_id});
			window.getNyAppShareParam = this.getNyAppShare;	
		},
		components:{
			XHeader,
			subTitle,
			articleItem,
			ProductItem
		}
	}
</script>

<style scoped lang="scss">
	
</style>