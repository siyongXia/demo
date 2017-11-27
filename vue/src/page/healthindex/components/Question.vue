<template>
	<div class="relative">		
		<div class="ask c_333 fs16  mb15 pr15 " :class="type === 1 ? 'elli' : 'overthree'">{{question}}</div>
		<i class="icon">问</i>
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
		props:['question','type']
	}
</script>

<style scoped lang="scss">
	.icon {	
		background-color: #00d3c2;	
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