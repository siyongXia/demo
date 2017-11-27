<template>
	<a :href='section.url || "#"' class="mb10 section_item clearfix block">
		<div class="backgroundimg img" :style="'background-image:url('+section.image+')'"></div>
		<h5 class="typo_dgray lh20 w170 elli">{{section.dep_name}}</h5>
		<div class="typo_gray lh18 w170 elli">{{section.advantage}}</div>
	</a >
</template>
<script>
	export default {
		props:['section']
	}
</script>
<style scoped lang = 'scss'>	
	.img {
		width: 4.53333rem;
		height: 2.66667rem;
	}
	.w170 {
		width: 4.53333rem;
	}
</style>