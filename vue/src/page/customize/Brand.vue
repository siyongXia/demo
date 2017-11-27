<template>
	<div>
		<NavigateBar :options="navigateBarOptions"></NavigateBar>
		<div class="banner mb10" v-if="ambientvideo.length > 0 || type_id ==1" chpid="hpambient_video">
			<SubTitle title="video" v-if="type_id ==1"></SubTitle>
			<swiper :options="bannerswiperOption" ref="mySwiper">
				<!-- slides -->
				<swiper-slide v-for="(item,index) in ambientvideo" class="fullwidth">
				<p style="text-align: center"><iframe class="video_iframe" style="z-index:1;" :src="'https://v.qq.com/iframe/player.html?vid='+item.vid+'&amp;width='+(375*ratio)+'&amp;height=200&amp;auto=0'" allowfullscreen="true" frameborder="0" height="200" width="100%"></iframe></p>					
				</swiper-slide>
				
				<!-- Optional controls -->
				<div class="swiper-pagination"  slot="pagination" v-show="ambientvideo && ambientvideo.length > 1"></div>
			</swiper>
		</div>
		<div v-if="imgList.length >= 3 || type_id ==1" chpid="hpambientimgs">
			<SubTitle title="环境" ></SubTitle>
			<div class="environment fs0 mb10 bg_white clearfix1 container relative" v-if="imgList.length > 0">
				<div class="img previewer-demo-img inblo backgroundimg" :style="'background-image:url('+item.src+')'" v-show="index < 3" v-for="(item, index) in imgList"  @click="show(index)"></div>
				<div class="more_pic" v-if="imgList.length > 3" @click="show(2)">{{imgList.length - 3}}+</div>
			</div>
		</div>
		<div v-transfer-dom>
	      <previewer :list="imgList" ref="previewer" :options="options"></previewer>
	    </div>
		
		<!-- 联系方式 -->
		<div class="contact bg_white mb10" >
			<div class="bg_white pb20">
				<div class="fs16 lh22 typo_dgray pb5"><i class="iconfont typo_green fs20 pr10">&#xe699;</i>电话</div>
				<div class="lh20 typo_gray fs15">{{unit.asktel}}</div>
			</div>
			<div class="bg_white pb20">
				<div class="fs16 lh22 typo_dgray pb5"><i class="iconfont typo_green fs20 pr10">&#xe69a;</i>地址</div>
				<div class="lh20 typo_gray fs15">{{unit.address}}</div>
			</div>
			<div class="bg_white pb20">
				<div class="fs16 lh22 typo_dgray pb5"><i class="iconfont typo_green fs20 pr10">&#xe6dc;</i>网址</div>
				<div class="lh20 typo_gray fs15">{{unit.url}}</div>
			</div>
		</div>
		<!-- 简介 -->
		<div class="container bg_white mb10" chpid="hpdetails">
			<div class="fs16 lh22 typo_dgray pb5"><i class="iconfont typo_green fs20 pr10">&#xe6a7;</i>简介</div>
			<div class="lh20 " :class="!isSpread?'overtwo h40':''" v-html="unit.detail"></div>
			<div class="textc typo_green mt5" @click="showMore()">{{isSpread ? '收起':'展开'}}<i class="iconfont pl5">{{isSpread ? '&#xe626;':'&#xe625;'}}</i></div>
		</div>
		<!-- 交通 -->
		<div class="container bg_white mb10">
			<div class="fs16 lh22 typo_dgray pb5" ><i class="iconfont typo_green fs20 pr10 bus">&#xe6de;</i>公共交通</div>
			<div class="pb5  lh20 " v-html="unit.bus_route"></div>
		</div>
	</div>
</template>
<script>
	import Vue from 'vue'
	import { Previewer, TransferDom } from 'vux'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import SubTitle from '../../components/common/SubTitle.vue';
	import { getRatio } from '../../utils/util.js'
	export default {
		directives: {
		    TransferDom
		},
		data(){
			return {				
				navigateBarOptions:{
					iconLeftCode:'&#xe60e;',
					title:'品牌主页',
					bgColor:'#00d2c3',
					color:'#fff',
					iconClass:"#fff"
				},
				ratio:getRatio(),
				options: {
			        getThumbBoundsFn (index) {
			        if(index >=2) {
			        	index = 2;
			        }
			          // find thumbnail element
			          let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
			          // get window scroll Y
			          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
			          // optionally get horizontal scroll
			          // get position of element relative to viewport
			          let rect = thumbnail.getBoundingClientRect()
			          // w = width
			          return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
			          // Good guide on how to get element coordinates:
			          // http://javascript.info/tutorial/coordinates
			        }
			    },
				unit:'',
				type_id:'',
				imgList:[],
				isSpread:false,				
				ambientvideo:[]
			}
		},
		computed:{
			bannerswiperOption () {
				var obj = {
					direction : 'horizontal',
					grabCursor : true,
					setWrapperSize :true,
					autoHeight: true,
					pagination : '.swiper-pagination',
					paginationClickable :true,
					observeParents:true,
					// autoplay:3000,
					loop:true,
					initialSlide:0
				};
				if(this.ambientvideo.length <= 1) {
					obj.autoplay = 0;
					obj.loop = false;
				}
				return obj;
			}
		},
		methods:{
			show (index) {
				if(this.type_id) {
					return;
				}
		        this.$refs.previewer.show(index)
		    },
		    showMore(){
		    	if(this.type_id) {
					return;
				}
		    	this.isSpread = !this.isSpread
		    }
		},
		mounted(){
			var unit_id = this.$route.query.unit_id;
			this.type_id = this.$route.query.type_id;
			this.$http.get('/api/unit/entry',{params:{id:unit_id,type_id:this.type_id}})
			.then((data)=>{
				var data = data.data.data;
				this.unit = data.unit;
				this.ambientvideo = data.ambientvideo;
				// this.navigateBarOptions.title = data.unit.unit_name;
				var tmpImgList = data.ambientimgs;
				tmpImgList.map((item,index)=>{
					item.src = item.image;
					item.w = item.imgWidth;
					item.h = item.imgHeight;

				})
				this.imgList = tmpImgList;
			})
			.catch((error)=>{
				console.log(error)
			})
		},
		components:{
			swiper, swiperSlide,SubTitle,Previewer
		}
	}
</script>

<style scoped lang="scss">
	.container {
		padding:0.53333rem 0.4rem;
	}
	.video {
		width:100%;
	}
	.h40 {
		height:1.06667rem;
	}
	.bus {
		font-size:0.8rem;
		vertical-align:middle;
	}
	.environment {
		.img:nth-child(1) {
			width:5.86667rem;
			height:6.53333rem;
			margin-right:0.13333rem;
		}
		.img:nth-child(3) {
			margin-top: 0.13333rem;
		}
		.img {
			width:3.2rem;
			height:3.2rem;
			float:left;
		}
	}
	.contact {
		padding:0.53333rem 0.4rem 0;
	}
	.more_pic {
		position:absolute;
		right:0.4rem;
		bottom: 0.53333rem;
		width:3.2rem;
		height:3.2rem;
		background-color: #000;
		opacity: .5;
		text-align:center;
		line-height:3.2rem;
		color:#fff;
		font-size:20px;
	}
</style>