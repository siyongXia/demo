<template>
	<div>
		<menu-title :links="nolink">{{infobox.name}}</menu-title>
		<div class="bg_white layout telphone-doc">
			<a :href="askListUrl+'?type=ask_tel&cat_id='+tel_doctor.cat_id" class="backgroundimg" v-for="(tel_doctor,index) in infobox.data" :style="{backgroundImage:'url('+tel_doctor.image+')'}"  @click="gaSend('名医主页_电话咨询点击量'+tel_doctor.cat_id)"></a>
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
		mounted: function(){
        },	
		props:['infobox']
	}
</script>
<style scoped lang="scss">
	/*电话咨询医生*/
	.telphone-doc a{ position: relative; display: inline-block; float: left; width: 50%; height: 3.466667rem; border-bottom: solid 0.026667rem #f9f9f9;}
	.telphone-doc a:after{content: ''; position: absolute; right:0; top: 0; width: 0.026667rem; height: 100%; background: #f9f9f9;}

</style>