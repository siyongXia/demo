<template>
	<div class="fullheight healthindex clearfix">
		<x-header :left-options="{backText: ''}">推荐医院</x-header>  
		<div class="pl20 pr20 pt15 bg_white mt10 fullheight ">  
			<div class="project  mb10">
				<div class="mb20 c_333 fs16">分类</div>
				<Capsule :content="item.name" v-for="(item,index) in unitCate" @click.native="select(item.id)" 
						:class="cateId == item.id ? 'active':''"
						class="mr10 mb12"></Capsule>
				<div class="mb20 c_333 fs16">排序</div>
				<Capsule :content="item.content" v-for="(item,index) in orderBy" @click.native="selectOrderBy(item.ordering)" 
						:class="ordering == item.ordering ? 'active':''"
						class="mr10 mb12"></Capsule>
				<!-- <button class="submit fs18 " :class="cateId !== -1  && ordering !== -1 ? 'bg_green':'bg_gray'" @click="goHosPage()">确定</button> -->
			</div>
			<div class="btns flex textc fs18">
				<div class="reset flex-item bg_gray" @click="reset()">重置</div>
				<div class="submit flex-item bg_green"  @click="goHosPage()">确定</div>
			</div>
		</div>
	</div>
	
</template>
<script>
	import { XHeader } from 'vux'
	import { mapState } from 'vuex' 
	import Capsule from '../../components/common/Capsule.vue'
	import { readCookie } from '../../utils/util.js'
	export default {
		data(){
			return {
				cateId:0,
				ordering:-1,
				ordering:1,		
				orderBy:[//ordering //0:默认 1距离 2人气 3好评					
					{
						content:'离我最近',
						ordering:1
					},
					{
						content:'人气最高',
						ordering:2
					},
					{
						content:'好评优先',
						ordering:3
					}
				]
			}
		},
		computed:{
			...mapState('healthindex',[
				'unitCate'
			])
		},
		methods:{
			select (id) {
				if(this.cateId == id) {
					this.cateId = 0;
					this.canSubmit = false;
					return;
				}
				this.cateId = id;
				this.canSubmit = true;
			},
			reset () {
				this.cateId = 0;
				this.ordering = 0;
			},
			selectOrderBy (id) {
				if(this.ordering == id) {
					this.ordering = 0;
					return;
				}
				this.ordering = id;
			},
			goHosPage () {	
				if( this.category_id === this.cateId ) {
					this.$router.push({path:'hospital.html',query:{ordering:this.ordering,category_id:this.category_id}})		
				}else {
					this.$router.push({path:'hospital.html',query:{sec:this.cateId,ordering:this.ordering,category_id:this.category_id}})	
				}
			}
		},
		mounted(){
			if(!readCookie('currentLat')) {//如果没有获取到定位信息,默认排序是0
				this.ordering = 0;
			}
			this.ordering = this.$route.query.ordering;
			this.cateId =  this.$route.query.sec;
			this.category_id = this.$route.query.category_id;
		},
		components:{
			XHeader,
			Capsule
		}
	}
</script>

<style scoped lang="scss">
	.btns {
		position:fixed;
		left: 0;
		bottom:0;
		width:100%;
		height:1.17333rem;
		line-height:1.17333rem;
		color:#fff;
	}
	.active {
		border:  0.02667rem solid #00d2c3;
		color: #FFF;
		background-color: #00d2c3;
	}
	// .submit {
	// 	display:block;
	// 	margin-top: 5.65333rem;
	// 	height:1.17333rem;
	// 	line-height:1.17333rem;
	// 	text-align: center;
	// 	width:8.74667rem;
	// 	color:#fff;
	// 	border-radius:0.58667rem;
	// }
	.submit:active {
		opacity: 0.8;
	} 
	.bg_green {
		background-color: #00d2c3;
	}
	.bg_gray {
		background-color: #BEBEBE;
	}
</style>