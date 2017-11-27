<template>
	<span class="lh20">{{content}}</span>
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
		props:['content']
	}
</script>

<style scoped lang="scss">
	span {
		display: inline-block;
		border-radius: 0.8rem;
		height: 0.8rem;
		line-height:0.74667rem;
		text-align: center;
		padding:0 0.32rem;
		border: 0.02667rem solid #f9f9f9;
		background-color: #fff;
		font-size: 0.37333rem;

	}
</style>