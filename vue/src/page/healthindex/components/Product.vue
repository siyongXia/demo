<template>
	<div class=" bg_white  ">
		<SubTitle title="比价专区" ></SubTitle>
		<!-- <swiper :options="swiperOption" ref="mySwiper">
			<swiper-slide> -->
				<div class="tabtitle layout">
					<a :class="activeId == categoryId ? 'active':''" @click="select(categoryId)">全部</a>
					<a v-for="(item,index) in info" class="cate-item" :class="activeId == item.id ? 'active':''" @click="select(item.id)">{{item.name}}</a>
				</div>	
<!-- 			</swiper-slide>
		</swiper> -->
		<div v-if="categorygoods.length > 0">
			<ProductItem v-for="(item,index) in categorygoods" :info="item"></ProductItem>
		</div>
		<div v-else class=" pt15 typo_gray textc pb15 textc">
			<img src="../../../static/nodata1.png" alt="" class="health_nodata ">
			<div class="mt10">暂无数据</div>
		</div>	
		<div v-if="allLoaded && categorygoods.length > 0" class="bg_gray pt10 textc">没有更多数据啦~</div>
		<load-more  :tip="'正在加载'"  v-if="!allLoaded && categorygoods.length > 0"></load-more>
	</div>
</template>
<script>
	import { LoadMore} from 'vux'
	import { mapActions } from 'vuex'
	import SubTitle from '../../../components/common/SubTitle.vue'
	import ProductItem from '../../../components/common/ProductItem.vue'
	import { loadmore } from '../../../utils/util.js'
	export default {
		data(){
			return {
				activeId:1,
				city_id:'',
				page:1,
				allLoaded:false,
				list:[],
				swiperOption: {
					direction: 'horizontal',
					slidesPerView: 'auto',
					freeMode: true,
				    roundLengths : true, //防止文字模糊
				},
			}
		},	
		methods:{
			...mapActions('healthindex',[
				'getCategoryGoods'
			]),
			async select (id){
				this.page = 1;
				this.allLoaded = false;
				this.activeId = id;					
				let result =  await this.getCategoryGoods({category_id:id,city_id:this.city_id,newCate:1})	
				this.isAllLoaded(result);		
			},
			async loadMore () {
				if(this.allLoaded) {
					return;
				}
				this.page++;
				console.log({category_id:this.activeId,city_id:this.city_id,page:this.page});
				let result = await this.getCategoryGoods({category_id:this.activeId,city_id:this.city_id,page:this.page})
				this.isAllLoaded(result);		
			},
			isAllLoaded(result){
				if(result === 0) {
					this.allLoaded = true;
				}	
			},
			async getData() {				
				let result =  await  this.getCategoryGoods({category_id:this.category_id,city_id:this.city_id,newCate:1})
				this.isAllLoaded(result);
				loadmore(this.loadMore);
			}
		},
		 mounted(){
			this.category_id = this.$route.query.category_id;
			this.activeId = this.category_id;
			this.city_id = this.$route.query.city_id;			
		},
		components:{
			SubTitle,
			ProductItem,
			LoadMore
		},
		props:['info','categoryId','categorygoods','indexCateWidth']
	}
</script>

<style scoped lang="scss">		
	.tabtitle{width: 100%; padding:0.266667rem 0; white-space: nowrap; overflow-x:scroll;overflow-y:hidden; }
	.tabtitle a{ display:inline-block; padding:0.266667rem 0.4rem; font-size: 0.4rem; color: #9b9b9b;}
	.tabtitle a.active{color: #00d3c2}
</style>