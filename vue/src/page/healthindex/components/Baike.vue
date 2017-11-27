<template>
	<div class="fullwidth clearfix ">
		<Cate :cate="cate" ref="cate" class="bg_white" :type="0"></Cate>
		<div class="mt_15 bg_white">
			<BaikeItem v-for="(item,index) in list" :info="item"></BaikeItem>
		</div>
		<div v-if="list.length === 0" class=" pt15 typo_gray textc pb15 textc bg_white mt20">
			<img src="../../../static/nodata1.png" alt="" class="health_nodata">
			<div class="mt10">暂无数据</div>
		</div>	
	</div>	
</template>
<script>
	import	Cate from '../components/Cate.vue'
	import BaikeItem from '../components/BaikeItem.vue'
	import { mapActions, mapState } from 'vuex'
	export default {
		data(){
			return {
				activeId:1,
				showType:0,
				lists:[]
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
			getData(id){
				this.getArticle({category_id:id,showType:this.showType,page:this.page,newCate:1})
			}
		},		 
		mounted(){
			this.page = this.$route.query.page || 1;
		},
		components:{
			Cate,
			BaikeItem
		},
		props:['cate','list','cateWidth']
	}
</script>

<style scoped lang="scss">
	.cate_title {
		width: 120%;
		padding:0 0.4rem 0 0.53333rem;
		.cate-item {
			padding: 0 0.4rem;
			&.active {
				color: #00d3c2;
			}
			&:nth-child(1) {
				padding-left: 0.26667rem;
			}
		}
	}
	.mt_15 {
		margin-top: -0.4rem;
	}
</style>