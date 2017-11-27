<template>
	<div class="guide typo_middle">
		<div class="banner">
			<img :src="bannerImageUrl" alt="">
			<div class="hospital-name typo_large">{{unit_name}}</div>
		</div>
		<div class="links flex">
			<a class="flex-item" :href="'/unit/dep.html?unit_id='+unit_id">
				<img src="./images/health.png"alt="">
				<p>预约挂号</p>
			</a>
			<a class="flex-item" :href="'/unit/detail.html?unit_id='+unit_id">
				<img src="./images/special.png" alt="">
				<p>科室专家</p>
			</a>
		</div>
		<ul class="guide-link bg_white" >
			<li  v-for="(item,index) in guideList" >
				<a v-if="item.type == 4" :href="item.url" class="typo_middle">
					<img :src="item.ico_image" class="icon" alt="">
					<span class="ml10 typo_middle">{{item.cate_name}}</span>
					<img src="./images/arrowright_v3.png" class="arrow fright" alt="">
				</a>
				<router-link v-else v-bind="{to: item.type == 3 ? 'description.html?article_id='+item.article_id : 
												 item.type == 2 ? 'articlelist.html?category_id='+item.cate_id  :'column.html?unit_id='+item.unit_id+'&cate_id=' + item.cate_id}" class="typo_middle">
					<img :src="item.ico_image" class="icon" alt="">
					<span class="ml10 typo_middle">{{item.cate_name}}</span>
					<img src="./images/arrowright_v3.png" class="arrow fright" alt="">
				</router-link>
			</li>			
		</ul>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import {getStyle} from '../../utils/util.js'
	import Vue from 'vue'
	export default {
		data(){
			return {
				guideList:[],
				bannerImageUrl:'',
				unit_name:'',
				unit_id:''
			}
		},
		methods:{
			getGuideList(){
				var unit_id = this.$route.query.unit_id;
				this.$http.get('/microsite/topcategorylist.html?unit_id=' + unit_id)
				.then((response)=>{
					this.guideList = response.data.data;
					this.guideList.forEach((item,index)=>{
						item.ico_image = require('./images/guide_img_'+item.ico_image+'.jpg')
					});
				})
				.catch((err)=>{
					console.log(err);
				});
			},
			getBanner(){
				var that = this;
				var unit_id = this.$route.query.unit_id;
				this.$http.get('/microsite/unitdetail.html?unit_id='+unit_id)
					.then((response)=>{
						var protocol = window.location.protocol;
						Vue.nextTick(function(){
							that.unit_name = response.data.unit_name;
							that.bannerImageUrl = protocol+'//images.91160.com/upload/'+response.data.image;
						});						
					})
					.catch((err)=>{
						console.log(err);
					})
			}
		},
		mounted(){			
			this.getGuideList();
			this.getBanner();
			this.unit_id = this.$route.query.unit_id;

		}
	}
</script>

<style scoped lang = 'scss'>
	.guide {
		padding-bottom: 1.33333rem;
	}
	.banner {
		max-height: 200px;
		overflow: hidden;
		position: relative;
		>img {
			width: 100%;
		}
		>.hospital-name {
			position: absolute;
			height: 40px;
			line-height: 40px;
			width: 100%;
			z-index: 5;
			bottom: 0;
			left: 0;
			color: #fff;
			padding-left: 0.26667rem;
		    background-color: #435669;
			opacity: 0.84;
		}
	}
	.links {
		>a {
		    background-color: #2e9aff;
		    padding: 0.26667rem 0;
		    text-align: center;
		    margin-right: 2px;
		    color: #fff;
		    line-height: 1.4;
		    >img {
		    	width: 0.8rem;
		    	height: 0.8rem;
		    }
		    >p {
		    	color: #fff;
		    }
		}
		>a:last-child{

			margin-right: 0;
		}
	}
	.guide-link {
		a {
			display: block;
			position: relative;
			width: 100%;
			height: 60px;
			line-height: 60px;
			overflow: hidden;
			padding-left: 50px;
			border-bottom: 1px solid #ccc;
			>img {
				position: absolute;
			}
			>.icon {
				left: 3%;
				width: 30px;
				top: 16px;
			}
			>.arrow {
				right: 3%;
				width: 12px;
				height: 25px;
				top: 17px;
			}
		}
	}
</style>