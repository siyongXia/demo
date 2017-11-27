<template>
	<ul class="hospital-info">
		<!-- <Grid v-for="(item,index) in hospitalInfo" 
			:name="item.cate_name" 
			:imgUrl="item.ico_image" 
			:type="item.type"
			v-bind ="{url:item.type == 1 ? 
					'/hospitalinfo/description.html?category_id=' + item.cate_id : 
					
					'/hospitalinfo/articlelist.html?id=' + item.cate_id
				}"
			>
		</Grid> -->
		<li v-for="(item,index) in hospitalInfo" class="grid-item">			
			<a v-if="item.type == 4" :href="item.url" class="clearfix">
				<img :src="item.ico_image" alt="" class="icon">
				<div class="title elli">{{item.cate_name}}</div>
			</a>
			<router-link v-else v-bind="{to: item.type == 3 ? 'description.html?article_id='+item.article_id : 
											 item.type == 2 ? 'articlelist.html?category_id='+item.cate_id  :
											 'column.html?unit_id='+item.unit_id+'&cate_id=' + item.cate_id}">
				<img :src="item.ico_image" alt="" class="icon">
				<div class="title">{{item.cate_name}}</div>
			</router-link>	
		</li>

	<!-- 	<router-link :to="url" class="grid-item" >
			<img :src="imgUrl" alt="" class="icon">
			<div class="title">{{name}}</div>
		</router-link> -->
	</ul>
</template>

<script>
	import Grid from '../../components/common/Grid.vue'
	export default {
		data(){
			return {
				hospitalInfo:[
				]
			}
		},
		methods:{
			fetchHospitalInfo(){
				var unit_id = this.$route.query.unit_id;
				var cate_id = this.$route.query.cate_id;
				this.$http.get('/microsite/categorylist.html?unit_id='+unit_id+'&category_id='+cate_id)
					.then((response)=>{
						this.hospitalInfo = response.data.data;
						this.hospitalInfo.forEach((item,index)=>{
							item.ico_image = require('./images/icon_'+item.ico_image+'.png')
						});
					})
					.catch((err)=>{
						console.log(err);
					})
			}
		},
		components:{
			Grid
		},
		mounted(){
			this.fetchHospitalInfo();
		}
	}
</script>

<style scoped lang = 'scss'>
	.hospital-info {
		padding: 30px 0;
	}	
	.grid-item {
	    float: left;
	    width: 33%;
	    text-align: center;
	    padding:20px 0;
	    line-height: 0.8; 
	    >a {
	    	display: inline-block;
	    	width: 100%;
	    	height: 100%;
	    	overflow: hidden;
	    }
	    .icon {
	    	width: 50px;
	    	height: 50px;
	    }
	    .title {
	    	line-height: 40px;
		    font-size: 15px;
		    color: #333;
	    }
	}
</style>