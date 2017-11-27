<template>
	<div class="healthindex fullwidth clearfix"  v-title :data-title="first_cate_info && first_cate_info.name || '健康160'">
		<x-header :left-options="{backText: ''}">{{first_cate_info && first_cate_info.name || '类目名称'}}
			<router-link :to="{path:'../city/index.html',query:{redirect:'healthIndex',category_id:category_id}}" slot="left" class="typo_green "><i class="iconfont fs18 pr5 ml20">&#xe69d;</i>{{cityName}}</router-link>
		</x-header>
	 	<swiper v-if="top_scroll && top_scroll.length > 0" :list="top_scroll" auto height="3.33333rem" dots-class="health-custom-bottom" dots-position="center" class="mb10" :loop='true'>
	 	</swiper>
	 	<MenuBox class="bg_white mb10"></MenuBox>
		<adMarquee class="bg_white mb10" :info="center_text" v-if="center_text && center_text.length > 0"></adMarquee>
		<adImg class="bg_white" :info="center_img" v-if="center_img.length > 0"></adImg>
		<product class="mt10 mb50" ref="product" :info="cate_list" :categoryId="category_id" :categorygoods="categorygoods" :indexCateWidth="indexCateWidth"></product>
		<BottomAd :info="index_bottom_float" v-if="index_bottom_float.image" cookieName="isHealthIndexAddHide"></BottomAd>
	</div>
	
</template>
<script>   
	var ret = '';
	var sharetitle, description, shareurl, shareimg;
	import { XHeader, Swiper} from 'vux'
	import MenuBox from './components/Menu.vue' 
	import adMarquee from './components/AdMarquee.vue'
	import adImg from './components/AdImg.vue'
	import product from './components/Product.vue'
	import BottomAd from './components/BottomAd.vue'
	import { mapGetters, mapActions, mapState } from 'vuex'	
	import { wxShare ,getAppToken } from '../../utils/util.js'
	export default {
		name:'healthIndex',
		data(){
			return {
				backUrl:encodeURIComponent(window.location.href),
				category_id:'',	
				cityName,			
				banners:[
					{
						img:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3802632424,2941016313&fm=200&gp=0.jpg',
						url:'#'
					},
					{
						img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1507256917&di=c5989d6f55aa7bfea498d14629c9d274&imgtype=jpg&er=1&src=http%3A%2F%2Ftupian.enterdesk.com%2F2013%2Fmxy%2F12%2F28%2F1%2F3.jpg',
						url:'#'
					},
					{
						img:'http://img1.qunarzz.com/sight/p0/1707/ba/bab25eea76b8889fa3.img.jpg_710x360_1ee04679.jpg',
						url:'#'
					}
				]
			}
		},
		computed:{
			...mapGetters('healthindex',[
				'top_scroll',
				'center_menu',
				'center_text',
				'center_img',
				'index_bottom_float',
				'indexCateWidth'
			]),
			...mapState('healthindex',[
				'cate_list',
				'categorygoods',
				'first_cate_info'
			])
		},
		methods:{
			...mapActions('healthindex',[
				'getcitycategory',	
				'getIndexAdds'			
			]),
			share (option) {				
				var shareUrl = 'https://weixin.91160.com/vue/health/index.html?category_id=' + this.category_id;
				if(this.city_id) {
					shareUrl += '&city_id=' + this.city_id;
				}
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
		async mounted(){	
			this.cityName =  this.$route.query.city_name	|| '深圳';	
			window.getNyAppShareParam = this.getNyAppShare;	
			this.category_id = this.$route.query.category_id;
			// window.sessionStorage.setItem('category_id',this.category_id);
			this.city_id = this.$route.query.city_id || 5;
			for( var i = 1 ; i <= 5; i++) {//获取广告
				this.getIndexAdds({category_id:this.category_id,location:i,city_id:this.city_id});		
			}		
			let wxShareOption = await this.getcitycategory({category_id:this.category_id,city_id:this.city_id});
			sharetitle = wxShareOption.title;
			description = wxShareOption.description;
			shareimg = wxShareOption.image;			
			shareurl = 'https://weixin.91160.com/vue/health/index.html?category_id=' + this.category_id;
			this.getNyAppShare();
			this.$refs.product.getData();
			this.share(wxShareOption);
			
		},
		components:{
			XHeader,
			Swiper,
			MenuBox,
			adMarquee,
			adImg,
			product,
			BottomAd,
		}
	}
</script>

<style scoped lang="scss">
	.mb50 {
		margin-bottom: 1.33333rem;
	}
	.custom-bottom {
		i {
			background-color:red !important;
		}
	}
	a.typo_green {
		color:#00d2c3 !important;
	}
</style>