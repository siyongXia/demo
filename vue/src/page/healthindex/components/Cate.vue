<template>
	<!-- <scroller lock-y :scrollbar-x="false"> -->
		<div class="cate_title  fs0 lh20 container" >
			<span class="cate-item fs15" :class="(activeId == 0 || activeId == secondCategoryId) ? 'active':''" :data-cateid="secondCategoryId" @click="select(secondCategoryId)">全部</span>
			<span v-for="(item,index) in cate" class="cate-item fs15 pt15 pb15" 
			:class="activeId == item.articleCategoryId ? 'active':''" 
			:data-cateId="item.articleCategoryId" 
			@click="select(item.articleCategoryId)">{{item.name}}</span>			

		</div>
	<!-- </scroller> -->
</template>
<script>
	import { Scroller } from 'vux'
	import { mapState,mapActions } from 'vuex'
	export default {
		data(){
			return {
				activeId:0,
				ratio:1
			}
		},
		computed:{
			...mapState('healthindex',[
				'secondCategoryId'
			])
		},
		methods:{
			...mapActions('healthindex',[
				'getArticle'
			]),
			initRatio () {
				var screenWdith = document.body.clientWidth || document.documentElement.clientWidth;
				this.ratio = screenWdith / 375 ;
			},
			async select (id) {
				var category_id = id,
					showType = this.type;
				if(category_id == this.activeId) {
					return;
				}
				this.activeId = category_id;
				this.$store.commit('healthindex/CHANGECATEGORYID',category_id);
				this.$nextTick(()=>{
					this.$parent.$parent.page = 1;
					this.$parent.$parent.allLoaded = false;
					console.log(this.$parent.$parent.$parent.allLoaded);
				});
				
				let result = await this.getArticle({category_id,showType,newCate:1});
				// if(result === 0) {
				// 	if(this.type == 0) {
				// 		this.$parent.$parent.$parent.allLoaded = true;
				// 	}else if(this.type == 1) {
				// 		this.$parent.allLoaded = true;
				// 	}
				// }
			}
		},
		mounted(){
			this.initRatio();
		},
		components:{
			Scroller,
		},
		props:['cate','type']
	}
</script>

<style scoped lang="scss">
	.cate_title {
		// min-width: 100%;
		overflow-x:scroll;
		white-space:nowrap;
		padding:0 0.4rem 0 0.53333rem;
		.cate-item {
			padding: 0.4rem 0.4rem;
			display:inline-block;
			&.active {
				color: #00d3c2;
			}
			&:nth-child(1) {
				padding-left: 0.26667rem;
			}
		}
	}
</style>