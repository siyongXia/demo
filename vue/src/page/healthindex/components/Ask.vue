<template>
	<div class=" bg_white">
		<!-- <scroller lock-y :scrollbar-x="false">
			<div class="cate_title clearfix1 fs0 lh20 mt15 mb15 lh20 container">
				<span class="cate-item fs15" :class="activeId == 0 ? 'active':''" @click="select(0)">全部</span>
				<span v-for="(item,index) in cate" class="cate-item fs15" :class="activeId == item.articleCategoryId ? 'active':''" @click="select(item.articleCategoryId)">{{item.name}}</span>
			</div>
		</scroller> -->
		
		<div class="pl20 pr15 bg_white">
			<div class="ask_title clearfix1 bor_b mb10">
				<h4 class="fs18 typo_normal fl c_333">匿名免费向医生提问</h4>
				<router-link :to="{path:'question.html',query:{askCategoryId,firstCateId,nyappshare:1,sec:sec}}" class="fr ask_btn mt15">立即提问</router-link>
			</div>	
			<AskItem :class=" index === 0 ? 'mt0':''" v-for="(item,index) in questionList" :info="item"></AskItem>
		</div>
		<!-- <div v-if="allLoaded" class="bg_gray pt10 textc">没有更多数据啦~</div> -->
	</div>	
</template>
<script>	
	import AskItem from '../components/AskItem.vue'
	export default {
		data(){
			return {
				firstCateId:'',
				category_id:'',
				activeId:0,
				city_id:'',
				page:1,
				allLoaded:true,
				questionList:[],
			}
		},
		methods:{
			select (event) {
				var id  = event.target.dataset.cateid;
				console.log(id);
				this.$refs.cate.activeId = id;
				this.activeId = id;
			},
			getQuestionList (id,newCate) {
				return new Promise((resolve,reject)=>{
					if(!newCate) {
						this.page++;
					}
					var params = {category_id:id,city_id:this.city_id,page:this.page};
					this.$http.get('/health/getquestionlist.html',{params:params}).then((data)=>{
						if(data.data.state == 1) {
							if(newCate) {
								this.questionList = data.data.data;
							}else{
								this.questionList = this.questionList.concat(data.data.data);
							}
							resolve(1);
						}else {
							resolve(0);
						}
					
												
					}).catch((err)=>{
						console.log(err);
					})
				})
				
			}
		},
		mounted(){
			this.firstCateId = this.$route.query.category_id;
			this.city_id = this.$route.query.city_id || 5;
			// this.getQuestionList({category_id,page});
		},
		components:{
			
			AskItem
		},
		props:['askCategoryId','sec']
	}
</script>

<style scoped lang="scss">
	.bor_b {
		border-bottom: 0.02667rem solid #f5f5f5;
	}
	.mt_15 {
		margin-top: -0.4rem;
	}
	.mt0 {
		margin-top: 0;
	}
	.ask_title {
		height:1.6rem;
		line-height:1.6rem;
	}
	.ask_btn {
		width:2.13333rem;
		height:0.8rem;
		line-height:0.8rem;
		border-radius:0.4rem;
		background-color: #00d2c3;
		color:#fff;
		text-align: center;
	}
</style>