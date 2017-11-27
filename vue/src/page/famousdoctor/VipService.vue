<template>
	<div>
		<menu-title :links="nolink">{{infobox.name}}</menu-title>
		<div class="bg_white pagn pt10 pb10 private-doctor layout textc">
			<a :href="askListUrl+'?type=vip&vip_type='+vipService.type+'&title='+vipService.title" v-for="(vipService,index) in infobox.data" @click="gaSend('名医主页_私人医生推荐点击量-'+(index+1))">
				<span class="backgroundimg private-img" :style="{backgroundImage:'url(https://static.91160.com/wechat/img/famousdoctor/'+vipService.type+'.gif)'}"></span>
				<span class="block lh24 pt5 typo_smaller typo_gray">{{vipService.sub_title}}</span>
			</a>
		</div>		
	</div>
</template>
<script>	
	import MenuTitle from './Menu.vue'
	export default{
		data(){
			return {
				askListUrl:'/ask/askdoc.html',
				nolink:0,
				
			}
		},
		components:{
			MenuTitle
		},
		mounted: function(){},
		props:['infobox']		
	}
</script>
<style scoped lang="scss">
	/*私人医生*/
	.private-doctor{}
	.private-doctor a{ float: left; width:48%; margin:0.16rem 0;}
	.private-doctor a:nth-child(2n){float: right;}
	.private-doctor .private-img{display: block; width: 100%; height: 1.92rem; border-radius: 0.05333rem;}
	
</style>