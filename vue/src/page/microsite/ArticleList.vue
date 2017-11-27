<template>
	<div class="bg_white fullheight article">
		<mt-loadmore :bottom-method="loadmore" :bottom-all-loaded="allLoaded" ref="loadmore" :bottomDistance = '20' bottomPullText ="加载更多" @bottom-status-change="bottomStateChange()">
			<ul >
				<li class=" article-item clearfix" v-for="(item,index) in infoList">
					<!-- <router-link v-bind="{to:}"> -->
						<ImageContentItem :href="'description.html?article_id='+item.id">
							<img :src="item.image || defaultImage" alt="" slot="left">
							<div slot="right" class="content ">
								<div class="title elli">{{item.title}}</div>
								<p class="des">{{item.content}}</p>
							</div>
						</ImageContentItem>
					<!-- </router-link> -->
					
				</li>
			</ul>	
		</mt-loadmore>	
	</div>
</template>

<script>
	import ImageContentItem from '../../components/common/ImageContentItem.vue';
	import Vue from 'vue'
	import { Loadmore ,Toast} from 'mint-ui';
	Vue.component(Loadmore.name, Loadmore);
	export default {
		data(){
			return {
				infoList:[],
				defaultImage:require('./images/hospitalImg.jpg'),
				allLoaded:false,
				p:1,
				flag:true
			}
		},
		methods:{
			getInfoList(p,cb){
				if(this.flag) {
					var category_id = this.$route.query.category_id,
						p = p || this.p;
					// this.$http.get('/microsite/articlelist.html?category_id='+category_id)
					this.$http.get('/microsite/articlelist.html',{params:{category_id, p}})
					.then((response)=>{
						if( response.data.data.length !== 0 ) {
							this.infoList = this.infoList.concat( response.data.data );
							cb && cb();
						}else {
							this.flag = false;
							Toast({
							  message: '没有更多数据',
							  position: 'bottom',
							  duration: 2000,
							  position:'middle'
							});
							this.allLoaded = true;
							this.$refs.loadmore.onBottomLoaded()
							this.bottomStateChange = null;
						}
					})
					.catch((err)=>{
						console.log(err)
					})
				}		
			},
			loadmore(id) {
				this.getInfoList(this.p++,()=>{
					this.allLoaded = true;// 若数据已全部获取完毕
					this.$refs.loadmore.onBottomLoaded(id);
				});
			},
			bottomStateChange(status){
				this.allLoaded = status;// 若数据已全部获取完毕
			}
		},
		mounted(){
		},
		components:{
			ImageContentItem
		}
	}
</script>

<style scoped lang = 'scss'>
	.article {
		padding-left: 0.4rem;
	}
	.article-item {
		padding-top: 0.37333rem;
		padding-bottom: 0.37333rem;
	    border-bottom: 1px solid #dcdede;
		a {
			img {
				width: 100%;
			}
		}
		.content {
			padding:0 0.4rem 0 0.18667rem;
			>.title {
			    font-size: 0.42667rem;
			    color: #4a4a4a;
			    line-height: 1.5;
			    white-space: nowrap;
			    text-overflow: ellipsis;
			    overflow: hidden;
			}
			>.des {
			    margin-top: 0.13333rem;
			    font-size: 0.32rem;
			    color: #8e8e8e;
			    line-height: 0.53333rem;
			}
		}
	}
</style>