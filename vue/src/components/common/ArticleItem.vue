<template>
	<router-link :to="{path:'consult.html',query:{article_id:info.id}}" class="article_item block">
		<div class="backgroundimg pic_80_60 fl mr15" :style="'background-image:url('+info.image+'),url(https://static.91160.com/wechat/img/common/logo.jpg)'"></div>
		<div class="clearfix1">
			<div class="c_333 fs16 lh20 h40 overtwo">{{info.title}}</div>
			<div class="fs12 typo_gray mt5">{{info.addTime}}</div>
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
	.h40 {
		height:1.06667rem;
		padding-bottom: 1px;
	}
	.article_item {
		padding: 0.4rem 0.4rem 0.4rem 0.53333rem;
	}
</style>