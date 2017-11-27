<template>
	<div class="fullheight fullwidth">
		<NavigateBar :options="navigateBarOptions"></NavigateBar>		
		<div id="allmap" class="fullheight fullwidth"></div>		
	</div>
</template>
<script>
	import {MP} from '../../plugins/BMap.js'
	export default {
		data(){
			return {
				navigateBarOptions:{
					iconLeftCode:'&#xe60e;',
					title:'地图',
					bgColor:'#00d2c3',
					color:'#fff',
					iconClass:"#fff"
				},
			}
		},
		methods:{

		},
		mounted(){			
			this.$nextTick(function () {
		        MP().then( BMap => {
		        	var lat = Number(this.$route.query.lat),
				lng = Number(this.$route.query.lng);
		            var map = new BMap.Map("allmap");   // 创建Map实例
		            var point = new BMap.Point(lat, lng); // 创建点坐标
		            map.centerAndZoom(point,16);
		            map.enableScrollWheelZoom();
		        })
		    })
		}
	}
</script>

<style scoped lang="scss">
	
</style>