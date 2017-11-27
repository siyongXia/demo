<template>
	<router-link :to="'index.html?unit_id='+info.unit_id+'&class_id='+info.class_id" class="hos_sections bg_white block">
		<h4 class="c333 typo_normal fs16 lh22">{{info.unit_name}}</h4>
		<div class="clearfix1 lh20 typo_gray mt7 mb3">
			<div class="fl elli w290">
				<span>评分{{info.score.overall_score}}</span><i>|</i>
				<span>{{info.level_label}}</span><i>|</i>
				<span>{{info.class_label}}</span>
			</div>
			<span class="fr">{{distance}}</span>					
		</div>
		<div class="typo_gray lh20 elli">{{info.address}}</div>
	</router-link>
</template>
<script>
	export default {
		data(){
			return {

			}
		},
		methods:{

		},
		mounted(){
		},
		props:['info','distance']
	}
</script>

<style scoped lang="scss">
	.w290 {
		width:7.73333rem;
	}
	.hos_sections {
		padding: 0.48rem;
		.mt7 {
			margin-top: 0.18667rem;
			margin-bottom: 0.08rem;
		}
		i {
			padding: 0 0.32rem;
		}
	}
</style>