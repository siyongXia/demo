<template>
	<div class="clearfix1">
		<NavigateBar :options="navigateBarOptions"></NavigateBar>
		<scroller lock-x scrollbar-y use-pullup  :height="scrollHeight" @on-pullup-loading="loadMore" ref="scroller">	
			<div>
				<router-link :to="'article.html?article_id='+firstArticle.id" class="block">
					<div class="backgroundimg h200" :style="'background-image:url('+firstArticle.image +'),url('+default_img+')'"></div>
					<div class="container_20_15 bg_white mb10">
						<div class="lh20 typo_dgray fs16">{{firstArticle.title}}</div>
						<div class="lh20 typo_gray fs16 elli mt5">{{firstArticle.cate_name}}</div>
					</div>
				</router-link>
				<div class="bg_white pb20" v-if="articleList.length > 1">
					<NewsItem v-for="(item,index) in articleList" :class="index % 2 ?'bg_gray':''" :content="item"></NewsItem>
				</div>
				
			</div>	
			<!--pullup slot-->
			<div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
				<span v-show="status.pullupStatus === 'default'"></span>
				<span class="pullup-arrow" v-show="status.pullupStatus === 'down' || status.pullupStatus === 'up'" :class="{'rotate': status.pullupStatus === 'up'}">↑</span>
				<span v-show="status.pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
				<div  v-show="status.pullupStatus === 'done'" class="pt20 lh20 typo_gray textc mb10">没有更多啦～</div>	
			</div>			
		</scroller>	
	</div>
	
</template>
<script>
	import NewsItem from './components/NewsItem.vue'
	import Vue from 'vue';
	import { Scroller, Spinner, LoadingPlugin } from 'vux'
	Vue.use(LoadingPlugin)
	import { Toast } from 'mint-ui'
	import { getScrollHeight } from '../../utils/util.js'
	export default {
		data(){
			return {
				navigateBarOptions:{
					iconLeftCode:'&#xe60e;',
					title:'资讯动态',
					bgColor:'#00d2c3',
					color:'#fff',
					iconClass:"#fff"
				},
				unit_id:'',
				page:1,
				totalPage:'',
				firstArticle:{},
				articleList:[],
				allLoaded:false,
				status: {
			       pullupStatus: 'default',
			       pulldownStatus: 'default'
			    },
			    totalPage:1,
			    scrollHeight:'',
			    default_img:require('../../static/article_default.png')
			}
		},
		methods:{
			getData(id,page) {
				if( page === 1) {
					this.$vux.loading.show({
				        text: '加载中...'
				    })
				}
				this.$http.get('/api/unit/articles',{params:{id,page}})
				.then((data)=>{	
					try {
						this.$vux.loading.hide()
					}catch(e){
						console.log(e);
					}
					var items = data.data.data.items;
					if( items.length !== 0 ) {
						if( page == 1 ) {
							this.totalPage = data.data.data.total_page;
							this.firstArticle = items[0];
							this.articleList = this.articleList.concat(items.slice(1));
						}else {
							this.articleList = this.articleList.concat(items);
						}
						this.status.pullupStatus= 'default';
						this.$refs.scroller.donePullup()
					}
					
				})
				.catch((error)=>{
					console.log(error);
				})
			},
			loadMore () {
				this.status.pullupStatus= 'loading'
				this.page++;				
				if(this.page <= this.totalPage) {
					this.getData(this.unit_id,this.page);
				}else {
					this.status.pullupStatus= 'done';
					this.$refs.scroller.donePullup()
				}
			}
		},
		mounted(){
			this.scrollHeight = getScrollHeight(48);
			this.unit_id = this.$route.query.unit_id;
			this.getData(this.unit_id,this.page);			
		},
		components:{
			NewsItem,
			Scroller, 
			Spinner,
			Toast
		}
	}
</script>

<style scoped lang="scss">
	.h200 {
		height:5.33333rem;
	}
</style>