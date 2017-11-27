<template>
	<!-- <a  :href="'/doctor/detail.html?unit_id='+info.unit_id+'&dep_id='+info.dep_id+'&doc_id='+info.doc_id+'&type=askdoc'" class=" block container pb20  good_doctors"> -->
	<a  :href="'/doctor/detail.html?unit_id='+info.unit_id+'&dep_id='+info.dep_id+'&doc_id='+info.doctor_id+'&type=full'" class=" block container pb20  good_doctors">
		<div class="flex mb10">
			<div class="backgroundimg img" :style="'background-image:url('+info.image+')'"></div>
			<div class="flex-item">
				<div class="lh25 fs18 c2a2a2a h50">{{info.doctor_name}} <span class="c848484">{{info.doc_level_name}}</span></div>
				<div class="typo_black lh18 mb10"  v-if="info.unit_name">主执业点：{{info.unit_name}}</div>
				<!-- <div class="typo_black lh18 mb10" v-else>&nbsp;</div> -->
				<div>						
					<span class="lh18 fs12 typo_dgrey pr10">评分<i class="typo_orange pl5">{{info.overall_score?info.overall_score:'暂无'}}</i></span>
					<span  class="lh18 fs12 typo_dgrey">科室预约量<i class="typo_orange pl5">{{info.total_yuyue_num || 0}} </i></span>
				</div>
			</div>
			<div class="btn gray" v-if="info.y_state < '0' || !info.y_state">无号</div>
			<div class="btn gray" v-if="info.y_state === '0'">约满</div>
			<div class="btn green" v-if="info.y_state === '1'">预约</div>
		</div>
		<div class="mb10" v-if="info.docIllTags.length > 0">擅长: <span class="label_item" v-for="(item,index) in info.docIllTags">{{item}}</span></div>
		<div v-else-if="info.expert.length > 0" class="mb10 elli">擅长: {{info.expert}}</div>
		<div v-else class="mb10 elli">擅长: {{info.detail.trim()}}</div>
		<div class="fs0" v-if="info.support_service && info.support_service.length > 0">	
			<button class="consult_btn " v-for="(item,index) in info.support_service">{{item}}</button>		
		</div>
	</a>
</template>

<script>
	export default {
		props:['info']
	}
</script>

<style scoped lang = "scss">
	.h50 {
		height: 1.33333rem;
	}
	.container {
	    padding-left: 0.4rem;
	    padding-right: 0.4rem;
	}
	.good_doctors {
		.img {
			width: 1.86667rem;
			height: 1.86667rem;
			margin-right: 0.26667rem;
		}
		.btn {
			width: 1.2rem;
			height: 1.2rem;
			line-height: 1.14667rem;
			text-align: center;
			
			border-radius:50%;
			&.gray {
				color: #bebebe;
				border: 1px solid #bebebe;
			}
			&.green {
				color: #00d2c3;
				border: 1px solid #00d2c3;
			}
		}
		.label_item {
			display: inline-block;
			border: 1px solid #9B9B9B;
			border-radius: 4px;
			height: 0.58667rem;
			line-height: 0.58667rem;
			padding: 0 0.13333rem;
			color: #9B9B9B;
			margin-right: 0.26667rem;
			margin-bottom: 0.13333rem;
		}
		.consult_btn {
			font-size: 0.32rem;		
			border: 1px solid #33b2ef;
   			color: #33b2ef;	
   			background-color: #fff;
			/*border-radius: 0.08rem;*/
			overflow: hidden;
			padding: 0 0.10667rem;
			height: 0.48rem;
			line-height: 0.42667rem;
			margin-right: 0.13333rem;
		}
		
/*		.bg_orange {
			background-color: #FFC04F;
		}
		.bg_green {
			background-color: #00D2C3;
		}
		.bg_blue {
			background-color: #00A4EB;
		}
		.bg_lightgreen {
			background-color: #6BE300;;
		}*/
	}
</style>