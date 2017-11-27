<template>
	<router-link :to="'article.html?article_id='+content.id" class="block news_item">
		<div class="backgroundimg img_80_60 fl mr14" :style="'background-image:url('+content.image+'),url('+default_img+')'"></div>
		<div class="flex-item  clearfix1">
			<h4 class="fs16 lh20 h40 typo_normal c333 overtwo" >{{content.title}}</h4>
			<div class="c848484 fs12 lh18 mt6 flex" >
				<i class="iconfont pr10 fs12 lh18">&#xe602;</i><span class="pr10">{{content.cate_name}}</span>
				<span> <i class="pot"></i> {{content.pubdate}}</span>
			</div>
		</div>
	</router-link>
</template>
<script>
	export default {
		data(){
			return {
				default_img:require('../../../static/article_default.png')
			}
		},
		methods:{

		},
		mounted(){

		},
		props:['content']
	}
</script>

<style scoped lang="scss">
	.mt6 {
		margin-top: 0.16rem;				
	}
	.news_item {
		padding: 0.32rem 0.4rem;
		.img_80_60 {
			width: 2.13333rem;
			height: 1.6rem;
		}
		.mt8 {
			margin-top: 0.21333rem;
		}
		.mr14 {
			margin-right: 0.37333rem;
		}
		.pot {
			display: inline-block;
			width:0.10667rem;
			height:0.10667rem;
			border-radius: 50%;
			background-color: #B7B7B7 ;
			margin-bottom: 0.05333rem;
		}
	}
</style>
