<template>
	<div>
		<h2 class="pagn mt10 lh20 pt10 pb10 bt_gray typo_normal typo_smiddle layout bg_white">
			<div class="fr inblo lh16 typo_normal mt3 typo_small" v-bind:class="{ hide: links==0 }">
				<a :href="links">
					<i class="fr iconfont ml5 clbebe">&#xe619;</i> 
					<i class="fr typo_lgray lh18 typo_smaller">更多</i> 
				</a>
		    </div>							
			<span class="fl index-line bg_green mt3 mr5"></span> 
			<span class="fl lh20">
				<slot class="fl typo_smiddle typo_dgrey"></slot>
			</span>
		</h2>
	</div>	
</template>
<script>
	export default {
		data () {
			return {}
		},
		props:['links']	
	}	
</script>
<style></style>