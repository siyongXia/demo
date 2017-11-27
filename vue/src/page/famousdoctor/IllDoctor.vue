<template>
	<div>
		<menu-title :links="djlinks">{{infobox.name}}</menu-title>
		<div class="bg_white clearfix">
			<div class="tabtitle bg_white" @click='tabToggle($event);'>
				<a @click="gaSend('名医主页_按疾病找医生_推荐点击量'+illDoctor.cat_name)" v-bind="{id:illDoctor.cat_name}" v-for="(illDoctor,index) in infobox.data" :class="{ 'cur' : selected == illDoctor.cat_name}" >{{illDoctor.cat_name}}</a>
			</div>					
			<div class="fullwidth bg_white pb15 layout">
				<div class="pagn an-disease-doctor" v-for="(illDoctor,index) in infobox.data" :class="{ 'hide' :selected != illDoctor.cat_name }">
					<a @click="gaSend('名医主页_按疾病找医生_推荐点击量'+subdiease.ill_name)" :href="askListUrl+'?ill_id='+subdiease.ill_id" v-for="(subdiease,index) in illDoctor.ills">{{subdiease.ill_name}}</a>
				</div>
			</div>					
		</div>		
	</div>
</template>
<script>
	import MenuTitle from './Menu.vue'
	export default{
		data(){
			return {
				selected:'',
				djlinks:'/disease/index.html?type=ask',
				askListUrl:'/ask/askdoc.html',
			}
		},
		mounted: function () {
			this.selected = this.infobox.data[0].cat_name;
		},
		methods:{
			tabToggle:function(e){
				this.selected = e.target.id;
			}
		},	
		components:{
			MenuTitle
		},
		props:['infobox']	
	}
</script>
<style scoped lang="scss">
	/*按疾病找医生*/
	.tabtitle{width: 100%; padding:0.266667rem 0 0.13333rem; white-space: nowrap; overflow-x: scroll; }
	.tabtitle a{ display:inline-block; padding:0.266667rem 0.4rem; font-size: 0.4rem; color: #9b9b9b;}
	.tabtitle a.cur{color: #33B2EF}
	.tabtitle a:first-child{padding:0.266667rem 0.4rem 0.266667rem 0.53333rem;}
	.an-disease-doctor a{display: inline-block; margin: 0.16rem 0.186667rem 0.16rem 0;padding:0.133333rem 0.213333rem;line-height:0.48rem;border-radius:0.533333rem;border: 1px solid rgba(0,159,236,0.10); color: #009FEC;background: rgba(0,159,236,0.04);}
	.an-disease-doctor{max-height:2.24rem; overflow: hidden;}
</style>