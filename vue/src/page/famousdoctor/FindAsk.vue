<template>
	<ul class="find_ask mb10 clearfix">
		<li v-for="(list,index) in infobox" class="bg_white">
			<a :href="list.url" @click="gaSend('名医主页_'+list.name)">
				<span>{{list.name}}</span>
				<i v-bind="{'style':'background-color:#'+list.bg_color+';color:#'+list.text_color}">{{list.sub_title}}</i>
			</a>
		</li>	
	</ul>	
</template>
<script>
	export default{
		data(){
			return {
				
			}
		},
		components:{
		},
		mounted:function(){

		},
		props:['infobox']
	}	
</script>
<style scoped lang="scss">
	.find_ask{}
	.find_ask li{ position: relative; float: left; width: 33.33%; line-height:0.53333rem; text-align: center; font-size: 0.32rem;}
	.find_ask li:after{content:''; position:absolute; top:0.48rem; right: 0; width:1px;height:1.06667rem; background: #f5f5f5;}
	.find_ask li:last-child:after{background: #fff;}
	.find_ask li span{display: block; line-height: 0.53333rem; font-size: 0.37333rem; color: #333}
	.find_ask li a{display:block;padding:0.4rem 0}
	.find_ask li i{display:inline-block;width:2.50667rem; height:0.53333rem; margin-top: 0.13333rem; line-height:0.53333rem;border-radius: 2px;}
</style>