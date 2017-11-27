<template>
	<div>
		<menu-title :links="infobox.more_url">{{infobox.name}}</menu-title>
		<div class="bg_white layout clearfix">
			<div class="swiper-container" id="line-slide">
		        <div class="swiper-wrapper find-wonderful-list">
		            <a class="swiper-slide" v-for="(recommendClass,index) in infobox.data" :href="recommendClass.url" @click="gaSend('名医主页_微课堂_推荐点击量'+recommendClass.title)">
		            	<span class="wonderful-img backgroundimg" :style="{backgroundImage:'url('+recommendClass.image+')'}"></span>
						<span class="block lh20 mt4 fs12 typo_grey elli">{{recommendClass.title}}</span>
		            </a>
		        </div>
		    </div>			
		</div>	
	</div>
</template>
<script>
	import MenuTitle from './Menu.vue'	
    // import VueAwesomeSwiper from 'vue-awesome-swiper'
	export default{
		data(){
			return {
				askListUrl:'/ask/askdoc.html',
				nolink:0,
			}
		},
        mounted() {
            var mySwiper = new Swiper('#line-slide', {
                slidesPerView: 20,
                scrollbar: '',
                slidesPerView: 'auto',
        		scrollbarHide: true,
            })
        },
		components:{
			MenuTitle
		},	
		props:['infobox']
	}
</script>
<style scoped>
	/*发现精彩*/
	.find-wonderful-list{  width:100%;padding:0.533333rem 0; text-align: center;white-space: nowrap;}
	.find-wonderful-list a{ display:inline-block;width: 3.2rem;margin:0 0.32rem 0 0;}
	.find-wonderful-list a .wonderful-img{ display: inline-block; width: 3.2rem; height: 2.4rem; border-radius:0.05333rem;}
	.find-wonderful-list a:first-child{margin-left: 0.373333rem;}
	.swiper-container{position:relative;overflow:hidden;z-index:1}
	.swiper-wrapper{position:relative;width:100%;height:100%;z-index:1;display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex;-webkit-transition-property:-webkit-transform;-moz-transition-property:-moz-transform;-o-transition-property:-o-transform;-ms-transition-property:-ms-transform;transition-property:transform;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box}
	.swiper-slide{-webkit-flex-shrink:0;-ms-flex:0 0 auto;flex-shrink:0;width:100%;height:100%;position:relative}

</style>