<template>
	<div class="mask" ref="mask" @touchmove="prevent($event)" @click="close()"></div>
</template>	

<script>
	export default {
		props:['top'],
		mounted(){
			var top = this.top || 0;
			this.$refs.mask.style.top = this.top + 'px';
		},
		methods:{
			prevent(e){
				e.preventDefault();
			},
			close(){
				this.$emit('close',1);
			}
		}
	}
</script>
<style scoped>
	.mask {
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 100;
		position: fixed;
		left: 0;
		top: 0;
	}
</style>