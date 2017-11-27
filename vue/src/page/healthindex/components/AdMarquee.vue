<template>
	<div>
		<marquee :interval="5000">
			<marquee-item v-for="(item,index) in info" :key="index" >
				<a  :href="item.url" class="add_item container block bg_white">					
					<!-- <img :src="item.imgUrl" alt="" class="fl"> -->
					<i class="iconfont typo_orange fl pr10 mt3">&#xe65f;</i>
					<div class="clearfix  typo_gray elli content">{{item.title}}</div>
				</a>
			</marquee-item>
		</marquee>
	</div>
</template>
<script>
	import {  Marquee, MarqueeItem } from 'vux'
	export default {
		data(){
			return {
			}
		},
		methods:{

		},
		mounted(){

		},
		components:{
			 Marquee, 
			 MarqueeItem 
		},
		props:['info']
	}
</script>

<style scoped lang="scss">
	.add_item {
		// height:1.17333rem;
		padding-top:0.21333rem;
		padding-bottom:0.21333rem;
		box-sizing:content-box;
		>img {
			width: 1.17333rem;
			height:1.17333rem;
			vertical-align: middle;
		}
		>.content {
			// height:1.17333rem;
			// line-height: 1.17333rem;
		}
		.dot {
			display: inline-block;
			width:0.13333rem;
			height:0.13333rem;
			border-radius:50%;
			background-color: #00d3c2; 
			margin-left: 0.26667rem;
			margin-right: 0.37333rem;	
		}
	}
</style>