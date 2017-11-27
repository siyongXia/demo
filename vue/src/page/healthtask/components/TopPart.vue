<template>
	<div class="flex wrap bg_white mb10 relative">
		<div class="pt10 pl25">
			<img :src="avatar" alt="" class="avatar">
			<p class="mt5 w50 elli textc">{{trueName}}</p>
		</div>
		<div class="line"></div>
		<div class="pt25 w74 textc ml10">
			<div class="fs16 c15"><i class="c_yellow">{{totalSigned}}</i>天</div>
			<div class="fs12 c333 mt5">累计签到</div>
		</div>
		<div class="pt25 w74 textc">
			<div class="fs16 c15"><i class="c_yellow">{{signTime}}</i>天</div>
			<div class="fs12 c333 mt5">连续签到</div>
		</div>
		<div class="pt25 w74 textc">
			<div class="fs16 c15"><i class="c_yellow">{{completeTotalCount}}</i>次</div>
			<div class="fs12 c333 mt5">完成任务</div>
		</div>
		<router-link to="tasksetting.html">			
			<i class="iconfont typo_green absolute tip fs18">&#xe6a3;</i>
		</router-link>
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
		props:['totalSigned','signTime','completeTotalCount','trueName','avatar']
	}
</script>

<style scoped lang="scss">
	.w50 {
		width:1.33333rem;
	}
	.tip {
		top:0.32rem;
		right:0.32rem;
	}
	.c_yellow {
		color:#F27B17 ;
	}
	.c15 {
		color:#151515;
	}
	.pt25 {
		padding-top: 0.66667rem;
	}
	.pl25 {
		padding-left: 0.66667rem;
	}
	.w74 {
		width:1.97333rem;
	}
	.line {
		width:1px;
		height:1.33333rem;
		background-color: #f5f5f5;
		margin-top: 0.58667rem;
		margin-left: 0.53333rem;	
	}
	.wrap {
		height:2.48rem;
	}
	.avatar {
		width:1.33333rem;
		height:1.33333rem;
		border-radius:50%;
		overflow:hidden;
	}
</style>