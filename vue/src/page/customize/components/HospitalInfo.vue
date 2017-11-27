<template>
	<div class="hospital bg_white mb10">
		<h3 class="c_333 lh20 fs18 mb10 typo_normal">{{unitInfo.unit_name}}</h3>
		<div class="mb10" v-if="unitInfo.score">
			<span class="typo_dgray mr10">评分: <i class="typo_orange ml5">{{unitInfo.score.cure_score}}</i></span>
			<span class="typo_dgray mr10">医生态度: <i class="typo_orange ml5">{{unitInfo.score.attitude_score}}</i></span>
			<span class="typo_dgray mr10">就诊环境: <i class="typo_orange ml5">{{unitInfo.score.environment_score}}</i></span>			
		</div>
		<div>
			<span class="label_item inblo mb10" @click="showLabel()" v-for="(key ,value) in unitInfo.unit_tags">{{value}}</span>
		</div>
	</div>	
</template>

<script>
	export default {
		data () {
			return {
				type_id:''
			}
		},
		props:{
			unitInfo:Object
		},
		methods:{
			showLabel(){
				if(this.type_id) {
					return;
				}
				this.$parent.isLabelShow = true
			}
		},
		mounted () {
			this.type_id = this.$route.query.type_id;
		}
	}
</script>

<style scoped lang = "scss">
	.hospital {
		padding: 0.53333rem 0.4rem 0.4rem;
		.label_item {
			display:inline-block;
			height: 0.53333rem;
			line-height: 0.53333rem;
			border-radius: 0.53333rem;
			color: #fff;
			background-color: #00D2C3;
			text-align: center;
			font-size: 0.32rem;
			padding: 0 0.21333rem;
			margin-right: 0.13333rem;
		}
	}
</style>