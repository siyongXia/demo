<template>
	<a>
		<img :src="src" alt="">	
		<div>{{content}}</div>
	</a>
</template>
<script>
	export default {
		data(){
			return {

			}
		},
		props:['src','content','width','height']
	}
</script>
<style scoped>
	a {
		float: left;
		width: 25%;
		height: 100px;
		text-align: center;
		box-sizing: border-box;
		border-left: 1px solid #ccc;
		border-bottom: 1px solid #ccc;
	}
	a img {
		width: 22px;
		height: 22px;
		margin-top: 30px;
	}
	a div {
		text-align: center;
	}
</style>