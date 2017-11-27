<template>
	<div class="b_button lhh50 flex typo_middle">
		<div @click="show()" class="flex-item buttom-item">任务规则</div>
		<router-link :to="'taskdetail.html?task_id='+taskId" class="flex-item buttom-item active">查看今日任务</router-link>
	</div>
</template>
<script>
	export default {
		props:['taskId'],
		methods:{
			show () {
				this.$emit('show');
				this.$parent.navigateBarOptions.title = '任务规则'
			}
		}
	}
</script>
<style scoped lang = 'scss'>
	.lhh50 {
		line-height: 1.33333rem;
		height: 1.33333rem;
	}
	.b_button {
		position: fixed;
		width: 100%;
		text-align: center;
		bottom: 0;
		border: 1px solid #f1f1f1;
		>.buttom-item {
			background-color: #fff;
			color: #00d2c3;
			display: block;
			&.active {
				background-color: #00d2c3;
				color: #fff;
			}
		}
	}
</style>
