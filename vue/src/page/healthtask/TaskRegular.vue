<template>
	<div class=" ">
		<NavigateBar :options="navigateBarOptions"  v-if="!commonIsApp"></NavigateBar>
		<div :class="{'hasNavigateBar':!commonIsApp}"></div>
		<div class="illu_wrap bg_white mt10 ">aasdasd</div>
		<div class="b_button lhh50 flex typo_middle">
			<router-link :to="'#'" class="flex-item buttom-item">删除任务</router-link>
			<router-link :to="'#'" class="flex-item buttom-item active">知道了</router-link>
		</div>
	</div>
</template>
<script>
	import NavigateBar from '../../components/common/NavigateBar.vue';
	import {mapGetters} from 'vuex';
	export default {
		data(){
			return {
				navigateBarOptions:{
					iconLeftCode:'&#xe60e;',
					title:'任务规则',
					bgColor:'#fff',
					color:'#000'
				}
			}
		},
		computed:{
			...mapGetters([
				'isLoading',
				'commonIsApp'
			])
		},
		methods:{

		},
		mounted(){

		},
		components:{
			NavigateBar
		},
	}
</script>

<style scoped lang="scss">
	.red {
		color:red;
	}
	.illu_wrap {
		padding:0.72rem 0.53333rem 0.29333rem; 
		line-height:0.66667rem;
		min-height:14.93333rem;
		.section {
			margin-bottom:0.66667rem;
		}
	}
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