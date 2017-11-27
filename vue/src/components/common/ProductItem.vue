<template>
	<router-link :to="'/vue/health/product.html?goods_id='+info.id" class="clearfix1 product_item block" v-if="info.buyWay == 1">
		<div class="backgroundimg fl pic_100_75 mr10" :style="'background-image:url('+info.img+'),url(https://static.91160.com/wechat/img/common/default_4X3.png)'"></div>
		<div class="clearfix">
			<div class="lh20 top_sec">
				<h4 class="overtwo typo_black fs16 typo_normal ">{{info.name}}</h4>
				<!-- <div class="fs12 typo_gray"><span class="mr10">{{info.docName}}</span>{{info.hosName}}</div> -->
			</div>
			<div class="lh16">
				<span class="c_orange fs18 pr3"><i class="fs10 pr3">&yen;</i>{{info.price}}</span>
				<span class="fs12 typo_gray line_through"><i>&yen;</i>{{info.orgPrice}}</span>
				<!-- <span class="fs12 typo_dgrey fr">250人预约</span> -->
			</div>
		</div>
	</router-link>
	<a :href="info.link" v-else  class="clearfix1 product_item block">
		<div class="backgroundimg fl pic_100_75 mr10" :style="'background-image:url('+info.img+'),url(https://static.91160.com/wechat/img/common/default_4X3.png)'"></div>
		<div class="clearfix">
			<div class="lh20 top_sec">
				<h4 class="overtwo typo_black fs16 typo_normal ">{{info.name}}</h4>
				<!-- <div class="fs12 typo_gray"><span class="mr10">{{info.docName}}</span>{{info.hosName}}</div> -->
			</div>
			<div class="lh16">
				<span class="c_orange fs18 pr3"><i class="fs10 pr3">&yen;</i>{{info.price}}</span>
				<span class="fs12 typo_gray line_through"><i>&yen;</i>{{info.orgPrice}}</span>
				<!-- <span class="fs12 typo_dgrey fr">250人预约</span> -->
			</div>
		</div>
	</a>

</template>
<script>
	
	export default {
		data(){
			return {

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
	.c_orange {
		color:#f55d3a;
	}
	.pr3 {
		padding-right:0.08rem;
	}
	.lh16 {
		line-height: 0.42667rem;
	}
	.product_item {
		padding:0 0.4rem 0 0.53333rem;
		padding-bottom:0.66667rem;
		.top_sec {
			height:1.6rem;
		}
	}
	img {
		width:2.66667rem;
		height:2.0rem;
		margin-right:0.4rem;
	}
</style>