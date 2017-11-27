<template>
	<div>
		<NavigateBar :options="navigateBarOptions"></NavigateBar>
		<div class="pb20 bg_white">
			<ServiceItem></ServiceItem>		
			<ServiceItem></ServiceItem>		
			<ServiceItem></ServiceItem>		
			<ServiceItem></ServiceItem>	
		</div>
		<div class="pt20 lh20 typo_gray textc">没有更多啦～</div>	
	</div>
	
</template>
<script>
	import ServiceItem from './components/ServiceItem.vue'
	export default {
		data(){
			return {
				navigateBarOptions:{
					iconLeftCode:'&#xe60e;',
					title:'服务项目',
					bgColor:'#00d2c3',
					color:'#fff',
					iconClass:"#fff"
				},
			}
		},
		methods:{

		},
		mounted(){

		},
		components:{
			ServiceItem
		}
	}
</script>

<style scoped lang="scss">
	
</style>