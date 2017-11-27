<template>
	<router-link :to="{path:'consult.html',query:{article_id:info.id}}" class="baike_item block" >
		<img :src="info.image" alt="" class="fl" onerror="this.src='http://static.91160.com/wechat/img/common/logo.jpg'">
		<div class="clearfix1">
			<div class="fs16 c_333 overtwo mt_3 mb5 h40">{{info.title}}</div>
			<div class="fs12 typo_gray"><i>{{info.addTime}}</i></div>
		</div>
	</router-link>
</template>
<script>
	export default {
		data(){
			return {
				// info:{
				// 	img:'http://img1.skqkw.cn:888/2014/11/12/18t/ix3fz4arday-49768.jpg'
				// }
			}
		},
		methods:{

		},
		mounted(){

		},
		props:['info']
	}
</script>

<style scoped lang="scss">
	.h40 {
		height:1.06667rem;
	}
	.mt_3{
		margin-top: -0.08rem;
		;
	}
	.baike_item {
		padding:0.4rem 0.4rem 0.4rem 0.53333rem;
	}
	img {
		width:2.13333rem;
		height:1.6rem;
		margin-right: 0.37333rem;
	}
</style>