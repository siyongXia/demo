<template>
	<div class="relative">		
		<div class="answer typo_dgrey overthree mb5" v-html="answer"></div>
		<i class="icon">答</i>
	</div>
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
		props:['answer']
	}
</script>

<style scoped lang="scss">
	.icon {	
		background-color: #FFB937;	
		position:absolute;
		width:0.53333rem;
		height:0.53333rem;
		line-height:0.53333rem;
		top: 0.05333rem;
		left:-0.72rem;		
		color:#fff;
		text-align: center;
		font-size:0.32rem;
	}
</style>