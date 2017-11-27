<template>
	<button :style="{background:bgColor,color:color}">{{content}}</button>
</template>
<script>
	export default {
		props:['content','bgColor','color']
	}
</script>

<style scoped lang = "scss">
	button {
		width: 100%;
		height: 50px;
		line-height: 50px;
		bottom: 0;
		position: fixed;
		z-index: 10;
		font-size: 0.42667rem;
		border: 1px solid #F1F1F1;
		left: 0;
		bottom: 0;
	}
</style>