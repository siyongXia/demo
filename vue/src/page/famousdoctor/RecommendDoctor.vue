<template>
	<div>
		<h2 class="pagn lh20 mt10 pt10 pb10 typo_normal typo_smiddle layout bg_white" >						
			<div class="fr inblo lh16 typo_normal mt3 typo_small">
				<a href="/ask/askdoc.html?type=recommend" @click="gaSend('名医主页_推荐医生更多点击量')">
					<i class="fr iconfont ml5 clbebe">&#xe619;</i> 
					<i class="fr typo_lgray lh18 typo_smaller">更多</i> 
				</a>
		    </div>
			<span class="fl index-line bg_green mt3 mr5"></span> 
			<span class="fl lh20 typo_smiddle typo_dgrey">{{infobox.name}}</span>
		</h2>		
		<div class="bg_white layout clearfix">
			<div class="swiper-container" id="doctor-slide">
		        <div class="swiper-wrapper tj-doctor-list">
		            <a class="swiper-slide" v-for="(recommendDoctor,index) in infobox.data" :href="'/doctor/detail.html?doc_id='+recommendDoctor.doctor_id+'&unit_id='+recommendDoctor.unit_id+'&dep_id='+recommendDoctor.dep_id+'&type=askdoc'" @click="gaSend('名医主页_推荐医生点击量')">
		            	<span class="tj-docimg backgroundimg" :style="{backgroundImage:'url('+recommendDoctor.avatar+'),url('+noimg+')'}"></span>
		            	<span class="block pl5 pr5 lh20 mb5 fs14 typo_black elli">{{recommendDoctor.doctor_name}}</span>
		            	<span class="block textl lh16 pl5 pr5 mb5 fs12 firstzy overtwo">{{recommendDoctor.first_practice}}</span>
		            	<span class="block pl10 pr10 lh16 fs12 typo_gray elli textl">
		            		<i class="block fs14 lh18 typo_grey elli">{{recommendDoctor.dep_name}}</i>
		            		好评数:<i class="typo_blue">{{recommendDoctor.good_comment_total?recommendDoctor.good_comment_total:0}}</i><br>
		            		咨询量:<i class="typo_blue">{{recommendDoctor.history_ask_total?recommendDoctor.history_ask_total:0}}</i>
		            	</span>
		            </a>
				</div>		
			</div>
		</div>		
	</div>
</template>
<script>
    // import VueAwesomeSwiper from 'vue-awesome-swiper'
	export default{
		data(){
			return {
				nolink:0,
				noimg:require('../../static/avatar.jpg'),	
			}
		},
		mounted: function(){
            var mySwiper = new Swiper('#doctor-slide', {
                slidesPerView: 20,
                scrollbar: '',
                slidesPerView: 'auto',
        		scrollbarHide: true,
            })
        },	
		props:['infobox']
	}
</script>
<style scoped>
	.firstzy{ height:0.88rem; padding-top: 0.02667rem;padding-bottom:0.02667rem;color: #FFA805; background: rgba(255,210,0,0.05);white-space:normal; }
		/*推荐医生*/
	.tj-doctor-list{  width:100%;padding:0.133333rem 0 0 0; text-align: center; white-space: nowrap;}	
	.tj-doctor-list a{display:inline-block; width:2.66667rem;margin:0 0 0 0.26667rem;padding: 0.266667rem 0; border-radius: 0.08rem; border:solid 1px #f1f1f1;}
	.tj-doctor-list a:last-child{margin-right: 0.373333rem;}
	.tj-doctor-list a:first-child{margin-left: 0.373333rem;}
	.tj-docimg{ display: inline-block; width: 1.6rem; height: 1.6rem; border-radius: 1.6rem;}
	.swiper-container{position:relative;overflow:hidden;z-index:1}
	.swiper-wrapper{position:relative;width:100%;height:100%;z-index:1;display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex;-webkit-transition-property:-webkit-transform;-moz-transition-property:-moz-transform;-o-transition-property:-o-transform;-ms-transition-property:-ms-transform;transition-property:transform;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box}
	.swiper-slide{-webkit-flex-shrink:0;-ms-flex:0 0 auto;flex-shrink:0;width:100%;height:100%;position:relative}
</style>