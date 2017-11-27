<template>
	<div v-title :data-title="article_cate_info.name || '健康160'">
		<!-- <scroller lock-x use-pullup  :height="scrollHeight + 'px'" @on-pullup-loading="loadMore" ref="scroller"> -->
			<div class="health_beauty healthindex">
				<x-header :left-options="{backText: ''}"  v-if="!commonIsApp">{{article_cate_info.name}}</x-header>
				<swiper :list="beauty_top_scroll" auto height="3.33333rem" 
					dots-class="health-custom-bottom" 
					dots-position="center" 
					:loop="true" 
					v-if="beauty_top_scroll.length > 0"
					class="mb10">
			 	</swiper>
			 	<div class="" >
			       <div class="health_beauty_title fs0 lh20 typo_dgrey bg_white" @click="select($event)"> 	 			
			 			<span :class="(sec == item.articleCategoryId || (!sec && index === 0)) ? 'active':''" 
			 					:data-showtype="item.showType" 
			 					:data-cate="item.articleCategoryId" 
			 					v-for="(item,index) in beauty_cate_list">{{item.name}}
						</span>
			 		</div> 
			 		<div class="health_beauty_container" >
			 			<!-- 整形日记 -->
			 			<div v-show="showType == 1">
			 				<Diary :cate="diaryCate" :cateWidth="diaryCateWidth" :list="diaryListAndAd" ref="diary"></Diary>		 	
			 			</div>
			 			<!-- 百科,对应列表 -->
			 			<div v-show="showType == 0">
			 				<Baike :cate="baikeCate" :cateWidth="baikeCateWidth"  :list="baikeList" ref="baike"></Baike>	 				
			 			</div>
			 			<!-- 问答,对应图文 -->
			 			<div v-show="showType == 2">
			 				<Ask ref="ask" :askCategoryId="askCategoryId" :sec="sec"></Ask>					
			 			</div>
			 		</div>	
			 		<div class="textc" v-if="isLoading">
			 			<img src="https://static.91160.com/wechat/img/common/bigloading.gif" alt="" class="w20">
			 		</div>	 		
			 		<div v-if="allLoaded && !isLoading" class="bg_gray pt10 pb10 textc">没有更多数据啦~</div>
			 	</div>
			 	 	
			</div>
			<!--pullup slot-->
			<!-- <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
				<span v-show="status.pullupStatus === 'default'"></span>
				<span class="pullup-arrow" v-show="status.pullupStatus === 'down' || status.pullupStatus === 'up'" :class="{'rotate': status.pullupStatus === 'up'}">↑</span>
				<span v-show="status.pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
			</div>	 -->
		<!-- </scroller> -->
		<!-- 底部广告,必须跟scroller不在一个容器 -->
		<BottomAd :info="beauty_bottom_float" v-show="beauty_bottom_float.image" cookieName="isHealthBeautyAddHide"></BottomAd>		
	</div>
	
	
</template>
<script>
	var ret = '';
	var sharetitle, description, shareurl, shareimg;
	import { Swiper, XHeader, Scroller, Spinner} from 'vux'
	import { Toast } from 'mint-ui'
	import  Diary  from './components/Diary.vue'
	import Baike from './components/Baike.vue'
	import Ask from './components/Ask.vue'
	import Cate from './components/Cate.vue'	
	import BottomAd from './components/BottomAd.vue'
	import { mapGetters,mapActions,mapState } from 'vuex'	
	import { GlobalSetting } from '../../config/GlobalSetting.js'
	import { wxShare, getAppToken,loadmore } from '../../utils/util.js'
	export default {
		data(){
			return {
				page:1,
				sec:'',//二级栏目id
				allLoaded:false,
				scrollHeight:'',
				secondCategoryId:'',
				// showType:'',
				category_id:'',
				status: {
			       pullupStatus: 'default',
			       pulldownStatus: 'default'
			    },

			}
		},
		computed:{
			...mapState('healthindex',[
				'diaryList',
				'baikeList',
				'questionList',
				'requestCategoryId',
				'article_cate_info'
			]),
			...mapGetters([
				'isLoading',
				'commonIsApp'
			]),
			...mapGetters('healthindex',[
				'beauty_top_scroll',
				'beauty_cate_list',
				'beauty_bottom_float',
				'showType',//激活的二级分类showType
				'diaryCate',
				'baikeCate',
				'diaryListAndAd',
				'askCategoryId',
				'diaryCateWidth',
				'baikeCateWidth'
			]),
			
		},
		methods:{
			...mapActions('healthindex',[
				'getarticlecategory',
				'getBeautyAdds',
				'getArticle'
			]),
			share () {
				var shareImage =  this.article_cate_info.img ? 'http://images.91160.com/' +  data.cate_info.img 
							: 'http://static.91160.com/wechat/img/common/logo.jpg';
				// var option = {
				// 	title:this.article_cate_info.name,
				// 	description:'小六君为你推荐系列好文',
				// 	image: shareImage
				// };
				var shareUrl = 'https://weixin.91160.com/vue/health/beauty.html?category_id=' + this.category_id +'&sec=' + this.sec;
				var wxShareOptions = {
                        timeLine: {                                 
                            title: this.article_cate_info.name,
                            link: shareUrl,
                            imgUrl:shareImage,
                        },
                        appMessage: {
                            title: this.article_cate_info.name,
                            desc:'小六君为你推荐系列好文', // 分享描述
                            link:shareUrl,
                            imgUrl: shareImage,
                        },
                        callback: function() {

                        },
                        cancelCallback: function() {

                        }
                    }
                wxShare(wxShareOptions, this);
			},
			select (event) {
				this.allLoaded = false;
				var dataset = event.target.dataset;
				//showType == showType
				var showType = dataset.showtype;				
				var category_id  = dataset.cate;
				// this.category_id = category_id;
				this.sec = category_id;
				// this.secondCategoryId = category_id;
				this.$router.replace({path:'beauty.html?',query:{category_id:this.category_id,sec:this.sec }});
				if(showType === this.showType) { //防止多次点击相同tab发送请求
					return;
				}
				this.page = 1;				
				this.$store.commit('healthindex/CHANGEBEAUTYTAB',{showType,category_id});
				this.$store.commit('healthindex/CHANGECATEGORYID',category_id);
				this.init(category_id);
				this.share();//更新微信分享的链接
				this.getNyAppShare();
			},
			async loadMore () {
				if(this.allLoaded) {
					// this.$refs.scroller.donePullup();
					// this.status.pullupStatus= 'default';
					return;
				}
				this.page++;
				this.status.pullupStatus= 'loading';
				if(this.showType == 2) {
					var result = await this.$refs.ask.getQuestionList(this.sec);
					console.log(result);
				}else {
					var result = await this.getArticle({category_id:this.requestCategoryId,showType:this.showType,page:this.page})
				}
				if(result === 0) {
					this.allLoaded = true;    
				}
				// this.$refs.scroller.donePullup();
				// this.status.pullupStatus= 'default';
			},
			init (secondCategoryId) {
				if(this.showType == 0) {
					this.$refs.baike.getData(secondCategoryId);
				}else if(this.showType == 1){
					this.$refs.diary.getData(secondCategoryId);
				}else if(this.showType == 2) {
					this.$refs.ask.getQuestionList(secondCategoryId,1);
				}
			},
			getNyAppShare: function () {//app分享获取参数
	            var that = this;
	            that.cid = this.$route.query.cid
	            that.js_app_login_token = getAppToken(that.cid);
	            var code = this.$route.query.code;
	            sharetitle = this.article_cate_info.name;
	            description = '小六君为你推荐系列好文'
	            shareimg =  this.article_cate_info.img ? 'http://images.91160.com/' +  data.cate_info.img 
							: 'http://static.91160.com/wechat/img/common/logo.jpg';
				shareurl = 'https://weixin.91160.com/vue/health/beauty.html?category_id=' + this.category_id +'&sec=' + this.sec;			
	            var data_v = {
	                title: sharetitle,
	                details: description,
	                img: shareimg,
	                timeLineTitle: sharetitle,
	                timeLineDetails: description,
	                timeLineImg: shareimg,
	                shareurl: encodeURIComponent(shareurl) 
	            }        
	            console.log(JSON.stringify(data_v) ) ; 
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
			this.scrollHeight =  Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)	
			this.category_id = this.$route.query.category_id;
			if(!this.category_id) {
				this.$router.push({name:'404'});
			}
			this.page = this.$route.query.page || 1;
			this.sec = this.$route.query.sec;	
			
			var resultObj = await this.getarticlecategory({category_id:this.category_id,page:this.page});			
			this.secondCategoryId = resultObj.articleCategoryId;//二级栏目id
			var goods_category_id = resultObj.goods_category_id;//广告id
			for( var i = 6 ; i <= 8; i++) {//获取广告
				this.getBeautyAdds({category_id:goods_category_id,location:i});		
			}
			if(this.sec) {
				this.$store.commit('healthindex/INITSHOWTYPE',this.sec)
				this.init(this.sec);
			}else {
				this.init(this.secondCategoryId);
			}	
			loadmore(this.loadMore)
			setTimeout(()=>{
				this.share();
				window.getNyAppShareParam = this.getNyAppShare;	
			}, 500);	
		},
		components:{
			XHeader,
			Swiper,
			Scroller,
			Spinner,
			Diary,
			Baike,
			Ask,
			Cate,
			BottomAd
		}
	}
</script>

<style scoped lang="scss">
	.w20 {
		width:0.53333rem;
	}
	.health_beauty_title {
		height:1.01333rem;
		line-height:1.01333rem;
		border-bottom: 0.05333rem solid #F9F9F9;
		box-sizing:content-box;
		>span {
			display:inline-block;
			width:33.33%;
			text-align:center;
			font-size:15px;
			&.active {
				background-color: white;
				color:#00d2c3;
				position:relative;
			}
			&.active::after {
				position:absolute;
				content:'';
				width:0.8rem;
				height:0.05333rem;
				background-color: #00d2c3;
				bottom:-0.05333rem;
				left:50%;
				margin-left: -0.4rem;
			}
		}
	}
	
</style>