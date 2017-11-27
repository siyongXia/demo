<template>
	<router-link :to="info.url" class="flex service_item bg_white">
		<div class="backgroundimg img_100_75" :style="'background-image:url('+info.img+')'"></div>
		<div class="flex-item ml14">
			<h4 class="fs16 lh22 h44 typo_normal">{{info.name}}</h4>
			<div class="mt10">
				<span class="typo_orange fs16 pr5"><i>¥</i>{{info.price}}</span>
				<span class="clbebe lthrouth fs12">¥{{info.orgPrice}}</span>
			</div>
		</div>
	</router-link>
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
	.lthrouth {
		text-decoration: line-through;;
	}
	.service_item {
		padding: 0.64rem 0.4rem 0;
	}
	.ml14 {
		margin-left: 0.37333rem;
	}
	.img_100_75 {
		width: 2.66667rem;
		height: 2.0rem;
	}
	.h44 {
		height:1.17333rem;
	}
</style>