<template>
	<div>
		<MaskBox @click.native="$parent.isLabelShow = false"></MaskBox>
		<div class=" bg_white fix_bottom pt20" >
		    <div class="fr fs30 typo_gray mt_10 mr10" @click="$parent.isLabelShow = false">&times;</div>
		    <div class="spe_service">
		        <div class="typo_large typo_dgray textc bold mb20">特色服务</div>
		        <ul class="max_height_300">
		            <li class="mb15" v-for="(key,value) in unitTags">
		                <div class="c_333 lh22 typo_middle mb5">{{value}}</div>
		                <div class="typo_gray">{{key ? key : '暂无'}}</div>
		            </li>
		        </ul>
		    </div>
		    <button class="lhh50 textc typo_white typo_middle bg_green fullwidth" @click="$parent.isLabelShow = false">确定</button>
		</div>
	</div>
	
</template>
<script>
	import MaskBox from '../../../components/common/Mask.vue'
	export default {
		data(){
			return {

			}
		},
		methods:{

		},
		mounted(){

		},
		components:{
			MaskBox
		},
		props:{
			unitTags:{
				type:Object,
				default:[]
			}
		}
	}
</script>

<style scoped lang="scss">
	.fs30 {
		font-size:0.8rem;
	}
	.mt_10 {
		margin-top: -0.26667rem;	
	}
	.spe_service {
    	padding: 0 0.42667rem 0.53333rem;
	}
	.fix_bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		z-index: 1000;
	}
</style>