<template>
	<div class="container bg_white pt10 pb10 flex typo_dgray bor_b lh12">
		<h5 class="typo_normal sub_title fs15 flex-item ">{{title}}</h5>
		<router-link :to="linkUrl" v-if="linkUrl">更多 <i class="iconfont">&#xe619;</i></router-link>
	</div>
</template>
<script>
	export default {
		data(){
			return {

			}
		},
		props:['title','linkUrl']
	}
</script>
<style scoped lang = "scss">
	.lh12 {
		line-height:0.32rem;
	}
	.bor_b {
		border-bottom: 0.02667rem solid #f5f5f5;
	}
	.container {
		padding-left: 0.4rem;
		padding-right: 0.4rem;
	}
	h5.sub_title {
		border-left: 0.08rem solid #00d2c3;
		padding-left: 0.13333rem;
	}
</style>