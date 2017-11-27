<template>
	<div class="mt10 bg_white">
		<swiper :aspect-ratio="94/375" :loop="true" :auto="true">
            <swiper-item class="swiper-demo-img backgroundimg" v-for="(infoBox,index) in infobox" :style="{backgroundImage:'url('+infoBox.image+')'}">
				<a :href='infoBox.url' @click="gaSend('名医主页_广告位点击量'+infoBox.ad_id)" target="_blank" class="block fullwidth"></a>
            </swiper-item>
        </swiper> 
	</div>
</template>
<script>	
	import { Swiper,  SwiperItem } from 'vux'
	export default{
		data(){
			return {
			}
		},
		components:{Swiper, SwiperItem, },
		mounted:function(){},
		props:['infobox']
	}
</script>