<template>
	<router-link :to="url" class="grid-item" >
		<img :src="imgUrl" alt="" class="icon">
		<div class="title">{{name}}</div>
	</router-link>
</template>

<script>
	export default {
		props:['imgUrl','name','url'],
		mounted(){
			// console.log(this.name)
		}
	}
</script>

<style scoped lang = 'less'>
	.grid-item {
	    float: left;
	    width: 33%;
	    text-align: center;
	    padding:20px 0; 
	    >.icon {
	    	width: 50px;
	    	height: 50px;
	    }
	    >.title {
	    	line-height: 40px;
		    font-size: 15px;
		    color: #333;
	    }
	}
</style>