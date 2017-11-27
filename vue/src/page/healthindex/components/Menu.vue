<template>	
	<ul class="clearfix1 fullheight pb20 " v-if="center_menu && center_menu.length > 0">
		<li v-for="(item,index) in center_menu" class="fl textc">
			<a :href="item.url" >
				<img :src="item.image" alt="">
				<h5 class="typo_normal fs12 c_333 elli">{{item.title}}</h5>
			</a>
			
		</li>
	</ul>	
</template>
<script>
	import { mapGetters } from 'vuex'
	export default {
		data(){
			return {			
			}
		},
		computed:{
			...mapGetters('healthindex',[
				'center_menu'
			])
		},
		methods:{

		},
		mounted(){

		},
	}
</script>

<style scoped lang="scss">
	li {
		width:25%;
		height:50%;
		padding-top:0.48rem;
		img {
			width:0.8rem;
			// height:0.8rem;
		}
	}
</style>