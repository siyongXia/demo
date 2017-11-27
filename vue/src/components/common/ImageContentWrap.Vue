<template>
	<div>
		<slot></slot>
	</div>
</template>

<script>
	import ImageContentItem from './ImageContentItem.vue'
	export default {
		data(){
			return {
				ImageContentItem
			}
		},
		props:['imageContentList']
	}
</script>

<style>
	
</style>