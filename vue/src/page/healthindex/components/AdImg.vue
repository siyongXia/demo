<template>
	<div class="container clearfix1 pt15 pb15 ">
		<a :href="item.url" class="inblo fl img_item" v-for="(item,index) in info" :class="index%2===0?'fl':'fr'">
			<img :src="item.image" alt="" class="fullheight fullwidth">
		</a>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				list:[
					{
						img:'http://via.placeholder.com/163x70/00d2c3/fff',
						url:'#'
					},
					{
						img:'http://via.placeholder.com/163x70/00d2c3/fff',
						url:'#'
					},
					{
						img:'http://via.placeholder.com/163x70/00d2c3/fff',
						url:'#'
					},
					{
						img:'http://via.placeholder.com/163x70/00d2c3/fff',
						url:'#'
					}
				]
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
	.img_item {
		width:4.48rem;
		height:1.94667rem;
		&:nth-child(-n + 2){
			margin-bottom: 0.26667rem;		
		}
	}
</style>