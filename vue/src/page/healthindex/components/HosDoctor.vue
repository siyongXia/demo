<template>
	<div class="clearfix bg_white mb10 bb_gray">
		<a class="doc-item block typo_dgray " @click="pullUpNativeDoc(info.unit_id,info.dep_id,info.doctor_id)">
			<div class="avatar fleft">
				<!-- <img class="lazyload" :src="info.image"  > -->
				<img class="lazyload" :src="info.image" :onerror='nothumb' >
			</div>
			<div class="doc-item-main elli">
				<h2 class="doc-item-title typo_large typo_normal lh24 elli typo_gray">					
					<div class="consult-doctor-name typo_middle elli fleft" style="width: 5.30667rem;">
						<span class="typo_dgray typo_large mr5">{{info.doctor_name}}</span>{{info.zcname}}  
					 </div>
				</h2>
				<div class="lh20 typo_small typo_gray elli" v-if="info.stay_unit">坐诊医院：{{info.stay_unit}}</div>	
				<div class="doc-item-detail lh20 typo_gray typo_small ">
					<template  v-if="info.first_practice">						
						<i class="elli inblo ">{{info.first_practice}}</i><span v-if="info.dep_name" class="vtt">[{{info.dep_name}}]	</span>			
					</template>
					<div class="doc-item-abs lh20 typo_small typo_gray elli" v-if="info.expert">擅长：{{info.expert}}</div>
					<div class="lh20 typo_gray typo_small elli">
						<span v-if="parseInt(info.comment_score)  > 0">评分 <i class="typo_orange pr5">{{info.comment_score}}</i>  </span>  
						<span v-if="parseInt(info.register_total) > 0">预约量 <i class="typo_orange pr5">{{info.register_total}}</i>  </span>            
						<span v-if="parseInt(info.ask_total) > 0">咨询量 <i class="typo_orange pr5">{{info.ask_total}}</i></span>	          
					</div>
					<div class="mt5 layout tag typo_xsmall pb5" >
						<span class="cur mr5" v-for="(item,index) in info.support_service">{{item}}</span>
					</div>
				</div>
			</div>
		</a>
	</div>
</template>
<script>
	import { pullUpNativeDoc } from '../../../utils/util.js'
	export default {
		data(){
			return {
				nothumb:'this.src="' + require('../../../static/avatar.jpg') + '"'  
			}
		},
		methods:{
			pullUpNativeDoc:pullUpNativeDoc
		},
		mounted(){

		},
		props:['info']
	}
</script>

<style scoped lang="scss">
	.vtt {
		vertical-align:top;
	}
	.doc-item {
		padding: 0.4rem 0.48rem 0.26667rem;
	}
	.avatar {
		width:1.06667rem;
		height:1.06667rem;
		margin-right: 0.4rem;	
	}
	.doc-item-detail > i{
	    margin-right: 0.21333rem;
	    padding: 0 0.13333rem;
	    border-radius: 0.05333rem;
	    line-height: 0.48rem;
	    font-size: 0.32rem;
	    color: #fff;
	    background: #ffb753;
	    max-width: 5.06667rem;
	}
	.tag .cur {
		border: 0.02667rem solid #33b2ef;
		color: #33b2ef;
		padding: 0.05333rem 0.13333rem;
	}
</style>