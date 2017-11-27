<template>
	<div>
		<div class="topsearch layout">
			<div class="pagn lh20 pt10 pb10">
				<a class="typo_middle typo_white fleft pt5 mr20" href="/main/city.html" ga-statistics-click="名医-选择城市">
					<span class="iconfont typo_large">&#xe607;&nbsp;</span>{{infobox}}
				</a>
				<a class="block typo_middle typo_gray clearfix pl10 pr10 pt5 pb5 bg_white oval" href="/search/index.html?from=ask-index&search_ad=">
	                <span class="iconfont typo_middle fleft">&#xe609;</span>
	                <div class="block typo_small">
	                	疾病/医生/科室/医院名称
	                </div>
	            </a>
            </div>
		</div>
	</div>
</template>
<script>
	import {getDomain} from '../../utils/util.js'
	export default{
		data(){
			return {
				domain:'',
			}
		},
		mounted: function(){
			this.domain = getDomain();
        },
		props:['infobox']
	}
</script>
<style scoped lang = 'scss'>
	.topsearch{float:left;width:100%;height:1.333333rem; background: -webkit-gradient(linear, left top, right top, from(#1db5a4), to(#1cabbf)); 
	background: -moz-linear-gradient(left, #1db5a4, #1cabbf);
	background: linear-gradient(to right, #1db5a4, #1cabbf);}
</style>