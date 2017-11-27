<template>
	<div class="">
		<Cate :cate="cate" ref="cate" class="bg_white" :type="1" ></Cate>
		<div class="mt_15 bg_white mb10"  v-for="(item,index) in list" v-if="list.length > 0">
			<DiaryItem  v-if="!item.ad_id"  :info="item"></DiaryItem>
			<a :href="item.url" v-else>	
 				<img :src="imageDomain +'/'+ item.image" alt="" class="mt10 mb10 h100 fullwidth">
 			</a>	
		</div>
		<div v-if="list.length === 0" class=" pt15 typo_gray textc pb15 textc  bg_white mt10" >
			<img src="../../../static/nodata1.png" alt="" class="health_nodata">
			<div class="mt10">暂无数据</div>
		</div>	
		<div class="fullwidth fullheight iframe" v-if="vid" :class="vid?'active':''" :style="{height:clientHeight,top:topValue + 'px'}"   @click="close($event)">
			<div class="close fs18" :style="{top:parseInt(topValue) + 15 + 'px'}" >&times;</div>
			<iframe  class="video_iframe fr " 
				:style="{'top':topValue + 'px','z-index':1}" 
				data-pre="1"
				:src="'https://v.qq.com/iframe/player.html?vid='+vid+'&amp;width='+(375*ratio)+'&amp;height='+(400)+'&amp;auto=1'" 
				allowfullscreen="true" frameborder="0" height="100%" width="400">
			</iframe>
		</div>	
	</div>
</template>
<script>
	import Cate from '../components/Cate.vue'
	import DiaryItem from './DiaryItem.vue'
	import GlobalSetting from '../../../config/GlobalSetting.js'
	import {  getRatio  } from '../../../utils/util.js'
	import { mapActions, mapState } from 'vuex'
	export default {
		data(){
			return {
				ratio:getRatio(),
				vid:'',
				topValue:'',
				clientHeight:'667px',
				imageDomain:GlobalSetting.IMAGESDOMAIN,
				imgs:[
					'http://via.placeholder.com/160x100/00d2c3/fff',
					'http://via.placeholder.com/160x100/00d2c3/fff'
				],
				showType:1,
				allLoaded:false
				
			}
		},
		computed:{
			...mapState('healthindex',[
				'requestCategoryId'
			]),
		},
		methods:{			
			...mapActions('healthindex',[
				'getArticle'
			]),
			getData (id) {
				this.getArticle({category_id:id,showType:this.showType,page:this.page,newCate:1})
			},
			close (e) {
				if(e.target.dataset.pre !== '1') {
					this.vid = '';
				}
			}
		},
		mounted(){
			this.clientHeight = (document.body.clientHeight || document.documentElement.clientHeight)+'px',
			this.page = this.$route.query.page || 1;		
		},
		components:{
			Cate,
			DiaryItem
		},
		props:['cate','list','cateWidth']
	}
</script>

<style scoped lang="scss">
	.iframe {
		width:100%;
		height:100%;
		left:0;
		position:fixed;
		z-index: 1000;
		transition:all .5s;
		background-color: #000;
		.close {
			position:fixed;
			right:0.26667rem;
			top:0.26667rem;
			color:#fff;
		}
		iframe {
			width:100%;
			position:fixed;
			top: 0;
			left:0;
			height: 10.66667rem;
			margin-top: 2.66667rem;	
		}
	}
</style>
