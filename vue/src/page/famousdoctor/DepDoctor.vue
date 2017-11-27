<template>
	<div class="bg_white an-dep-doctor pt10 pb10" :class="{'mt10':hasRecommendDoctor==false}">
		<a :href="depDoctor.cat_id == 49 ? '/vue/customdep/index.html': (askListUrl+'?cat_id='+depDoctor.cat_id)" v-for="(depDoctor,index) in infobox.data.slice(0,9)" @click="gaSend('名医主页_按科室找医生_推荐点击量'+depDoctor.cat_name)">
			<img :src="'https://static.91160.com/wechat/img/famousdoctor/cat_'+depDoctor.cat_id+'.png'">
			{{depDoctor.cat_name}}
		</a><a href="/depart/index.html?type=ask">
			<img :src="'https://static.91160.com/wechat/img/famousdoctor/cat_more.png'">
			更多
		</a>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				askListUrl:'/ask/askdoc.html',
			}
		},
		components:{
		},	
		mounted: function(){
        },	
		props:['infobox','hasRecommendDoctor']
	}
</script>
<style scoped lang="scss">
	.an-dep-doctor a{ display:inline-block; width:20%;padding:0.13333rem 0; text-align:center; font-size:0.37333rem; color:#666;}
	.an-dep-doctor img{display:block; width:0.96rem; margin:0 auto;}
</style>