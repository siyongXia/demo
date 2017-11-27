<template>
	<div class="fastask bg_white mb10 clearfix">
		<a href="/ask/bounty.html" class="block">
			<img :src="'https://static.91160.com/wechat/img/famousdoctor/'+infobox.type+'.png?v=160'">
			<span class="fright mt15 plr15 pt5 pb5 lh22 typo_small oval typo_white bg_green">{{infobox.button_name}}</span>
			<span class="fleft inblo w-50 ml10 pt10 lh22 typo_smaller typo_gray elli">
				<i class="block typo_middle typo_black">{{infobox.name}}</i>
				{{infobox.sub_title}}
			</span>
		</a>
	</div>
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
	.fastask{padding:0.21333rem 0.26667rem}
	.fastask img{float:left;width: 1.65333rem; height:1.65333rem;}
</style>