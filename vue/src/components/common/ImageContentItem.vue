<template>
	<router-link v-bind="{to:href}">
		<div class="left" ref="left">
			<slot name="left"></slot>	
		</div>

		<div class="right typo_small">
			<slot name="right"></slot>	
		</div>	
	</router-link>		
</template>

<script>
	export default {
		props:['imgWidth','href'],
		mounted(){
			var imgWidth = this.imgWidth || 70;
			this.$refs.left.style.width = imgWidth + 'px';
			this.$refs.left.style.height = imgWidth + 'px';
		}
	}
</script>

<style scoped lang = "scss">
	a {
		display: block;
		color: #333;
		>.left {
			float: left;
			width: 70px;
			margin-right:0.26667rem;
		}
		>.right {
			overflow: hidden;
			>div {
				line-height: 0.53333rem;
				font-size: 0.37333rem;
			}
		}
		
	}
</style>