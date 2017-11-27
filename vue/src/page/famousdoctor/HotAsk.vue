<template>
	<div>
		<menu-title :links="djlinks">{{infobox.name}}</menu-title>
		<div class="pt10 bg_white">
			<div class="top-info-ask pagn">
				<a @click="gaSend('名医主页_热门咨询科室推荐点击量'+catInfo.cat_id)" :href="askListUrl+'?type=ask&cat_id='+catInfo.cat_id" v-for="(catInfo,index) in infobox.cat_info">{{catInfo.cat_name}}</a>
			</div>
		</div>
		<div class="pagn pb10 bg_white layout">
			<a @click="gaSend('名医主页_热门咨询推荐内容点击量')" class="fullwidth block layout hotask" :href="askInfo.url" v-for="(askInfo,index) in infobox.ask_info">
				<dl class="askquestion">
					<dt><span>问</span></dt>
					<dd>
						{{askInfo.ask_content}}
					</dd>
				</dl>
				<dl class="askanswer">
					<dt><span>答</span></dt>
					<dd>
						<div class="askanswer-reply">{{askInfo.doctor_reply}}</div>
						<p class="elli typo_smaller typo_gray lh16 mt3">
							<img :src="askInfo.doctor_avatar" :onerror="noimg">
							<span class="typo_blue">{{askInfo.doctor_name}}</span> {{askInfo.zc_name}}  {{askInfo.unit_name}}  {{askInfo.dep_name}}
						</p>
						<p class="typo_smaller typo_gray lh20 mt3">
							{{askInfo.add_time}}
						</p>
					</dd>
				</dl>
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
				djlinks:'',
				noimg: 'this.src="' + require('../../static/avatar.jpg') + '"',
				
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
	.top-info-ask a{display: inline-block; margin: 0.16rem 0.186667rem 0.16rem 0;padding:0.133333rem 0.213333rem;border-radius:0.533333rem;line-height:0.48rem;border: 1px solid #e9e9e9; color: #707070;background:#fff;}
	.top-info-ask{max-height:2.24rem; overflow: hidden;}
		/*热门咨询问答*/
	.hotask{border-bottom:solid 0.026667rem #f9f9f9;}
	.askquestion,.askanswer{ float: left; width: 100%; margin-top: 0.533333rem;}
	.askquestion dt,.askanswer dt{ float: left; display: inline-block; width: 0.8rem;}
	.askquestion dt span,.askanswer dt span{ display: inline-block; width: 0.533333rem; height: 0.533333rem; border-radius: 0.053333rem; line-height: 0.533333rem; text-align: center; font-size: 0.373333rem; color: #fff; background: #00D2C3;}
	.askanswer{margin-top: 0.426667rem;padding-bottom:0.533333rem ;}
	.askanswer dt span{ background: #FFB937;}
	.askanswer dd img{float:left;width: 0.426667rem; height: 0.426667rem; margin-right: 0.133333rem; border-radius: 0.426667rem;}
	.hotask:last-child{border-bottom: none;}	

	.askquestion dd{max-height: 1.066667rem; line-height: 0.533333rem; font-size: 0.4rem; display: -webkit-box; overflow: hidden; text-overflow: ellipsis; -webkit-line-clamp: 2; -webkit-box-orient: vertical; -moz-line-clamp: 2; -moz-box-orient: vertical;}
	.askanswer dd{padding-left:0.8rem; line-height: 0.48rem;color: #333;font-size:0.373333rem; color: #707070}
	.askanswer-reply{max-height: 1.066667rem; word-break:break-all; line-height: 0.533333rem; display: -webkit-box; overflow: hidden; text-overflow: ellipsis; -webkit-line-clamp: 2; -webkit-box-orient: vertical; -moz-line-clamp: 2; -moz-box-orient: vertical;}
</style>