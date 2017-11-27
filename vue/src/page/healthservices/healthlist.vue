<template>
	<div class="typo_small bg_white" v-bind:class="{productbox: isNotapp}" v-title v-bind="{'data-title':titlename}">
		<template v-if='isNotapp==true'>
			<head-nav>{{titlename}}</head-nav>
		</template>
		<div class="layout bg_gray clearfix">
			<template v-if="banner_ad_list && banner_ad_list.length>0">
            	<!-- 轮播图 -->
	            <mt-swipe :auto="4000" class="mb10">
	                <mt-swipe-item class="backgroundimg" v-for="(infos,index) in banner_ad_list" :style="{backgroundImage:'url(https://images.91160.com/'+infos.image+')'}">
	                    <a :href="infos.url?infos.url:'javascript:;'" class="block fullwidth fullheight" @click="gaSend('名医极速挂号主页-广告图'+infos.ad_id)"></a>
	                </mt-swipe-item>
	            </mt-swipe>     
	            <!-- 轮播图 -->
	        </template>
	        <div class="bg_white" id="isfixed">
				<div class="typetit" id="fixedtypetit">
					<swiper :options="swiperOption" ref="mySwiper">
						<swiper-slide>
							<div @click='tabTypeToggle($event);'>
								<button :disabled="healthtit == category_id" v-bind="{id:category_id}" :class="{ 'cur' : healthtit == category_id}" data-isrec='1'>热门推荐</button>
								<button :disabled="healthtit == healthTit.id" v-for="(healthTit,index) in health_tit" :class="{ 'cur' : healthtit == healthTit.id}" data-isrec='0' v-bind="{id:healthTit.id}">{{healthTit.name}}</button>
							</div>	
						</swiper-slide>
					</swiper>	
				</div>
				<div class="fullwidth service-item" v-if="datalist && datalist.length>0">
					<a v-for="(datalist,index) in datalist"  class="block pagn pt15 pb15 clearfix" :href="datalist.link">
						<cite class="backgroundimg service-item-img relative" :style="{'background-image':'url(https://images.91160.com/'+datalist.img+')'}">
							<template v-if="datalist.tag==1">
								<em class="leftopicon"><img :src="hotsale"></em>
							</template>
							<template v-else-if="datalist.tag==2">
								<em class="leftopicon"><img :src="forsale"></em>
							</template>
						</cite>
						<div class="clearfix">
							<p>{{datalist.name}}</p>
							<div class="block elli mt5 lh20 typo_gray typo_small">{{datalist.subhead}}</div>
							<div class="service-price">
								<span class="price"><i class="typo_smaller">￥</i>{{datalist.price}}</span>
								<span class="orgprice">￥{{datalist.orgPrice}}</span>
							</div>
						</div>
					</a>
				</div>	
				<div class="weui-loadmore" v-show="isLoadmore"><i class="weui-loading"></i><span class="weui-loadmore__tips">正在加载</span></div> 	
		        <template v-if="isNoData==true">
		            <no-data></no-data>
		        </template>
	        </div>	
		</div>
        <scroll-top></scroll-top>
	</div>
</template>

<script>
	var ret = '';
	var shareimg,sharetitle,description,timeLineTitle,timeLineDetails,timeLineImg,shareurl; 
	sharetitle = timeLineTitle = '健康新产品-健康160网';
	description = timeLineDetails ='我在健康160发现了一系列健康新产品，推荐给你';
	shareimg = timeLineImg ='https://static.91160.com/wechat/img/common/logo.jpg'; 
	import Vue from 'vue'
	import HeadNav from '../../components/common/Head.vue'
	import NoData from '../../components/common/NoData.vue'
	import ScrollTop from '../../components/common/scrollTop.vue'
	import $ from 'jquery'	
	import { Toast,Swipe, SwipeItem } from 'mint-ui'
	import 'mint-ui/lib/style.min.css'
	import '../../plugins/weui/style/weui.min.scss'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import {getUrlParam,WxOath,getAppToken,wxShare} from '../../utils/util.js'
	Vue.component(Swipe.name, Swipe);
	Vue.component(SwipeItem.name, SwipeItem);  
	export default {
		data(){
			return {
				isNotapp:true,
				tur:true,
            	isNoData: false,
            	isLoadmore:false,//正在加载
				p:1,
				isrec:1,
				total_page:'',
				datalist:[],
				healthtit:33,
				category_id:33,
				size:10,
				forsale:'https://static.91160.com/wechat/img/health/forsale.png',
				hotsale:'https://static.91160.com/wechat/img/health/hotsale.png',
				swiperOption: {
					direction: 'horizontal',
					slidesPerView: 'auto',
					freeMode: true,
				    roundLengths : true, //防止文字模糊
				},
				health_tit:[],
				loadimg:require('../doctorsaid/images/bigloading.gif'),
				banner_ad_list:[],
				js_app_login_token:'',
				titlename:'',
				shareImgs:'',
			}
		},
		methods:{
			healthTit:function(){
            	var that = this;
	            var cid = this.$route.query.cid;
	            var code = typeof(this.$route.query.code) != 'undefined' ? this.$route.query.code : 0;
            	that.js_app_login_token = getAppToken(cid); 
				that.healthtit = this.$route.query.category_id;	
				that.category_id = this.$route.query.category_id;				
				that.p = 1;		
				this.$http({				
					method:'get',
					url: '/health/getcategory.html?cid='+cid+'&code='+code+'&jstoken='+that.js_app_login_token+'&category_id='+that.category_id}).then(					
					function(res){	
						if(res.data.status==200){
							that.health_tit = res.data.data.cate_list;	
	                        that.banner_ad_list = res.data.data.ad_list;//图片广告
							that.getList(that.healthtit,that.isrec,that.p);	
							that.scrollist();			
						}else{
							Toast(res.data.msg);
						}
					}
				)
			},
	        getNyAppShare:function(){//app分享获取参数
	            var that = this;
	            var cid = this.$route.query.cid;        
	            var code = typeof(this.$route.query.code) != 'undefined' ? this.$route.query.code : 0;
	            var data_v ={
	                title:sharetitle,
	                details:description,
	                img:that.shareImgs ? that.shareImgs:shareimg,
	                timeLineTitle:timeLineTitle,
	                timeLineDetails:timeLineDetails,
	                timeLineImg:that.shareImgs ? that.shareImgs:shareimg,
	                shareurl:encodeURIComponent('https://weixin.91160.com/vue/healthservices/index.html?category_id='+that.category_id)
	            }   
	            if(sharetitle && description && shareimg){      
	                this.$http({
	                    method:'get',
	                    async : false,
	                    url: '/sys/appencrypt.html?cid='+cid+'&jstoken='+encodeURIComponent(that.js_app_login_token)+'&code='+code+'&data='+JSON.stringify(data_v)
	                    }).then(
	                    function(res){
	                        ret = res.data.data;                
	                    }
	                )       
	            }
	            return ret;             
	        }, 
			//切换新闻资讯tab
			tabTypeToggle:function(e){
				this.healthtit = e.target.id;
				this.datalist = [];
				this.p = 1;
				this.isrec = e.target.dataset.isrec;
				this.getList(this.healthtit,this.isrec,this.p);
			},
			scrollist:function(){
				//页面滑动加载数据
				var that = this;
				window.addEventListener("scroll", function (event) {
					if(that.tur){
						var totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop())+2;
					    if($(document).height() <= totalheight ){
							that.tur = false;
					        if(parseInt(that.p) < parseInt(that.total_page)){
								that.p++;
								that.getList(that.healthtit,that.isrec,that.p)
							}else{
								Toast('已经全部加载完')
							}
					    } 				        
				    }			
				})		
			},			
			getList:function(healthtit,isrec,p){ 
				var that = this;	
            	that.isLoadmore = true;	
            	that.isNoData = false;
				this.$http({				
					method:'get',
					url: '/health/getallcategorygoods.html?category_id='+healthtit+'&is_rec='+isrec+'&page='+p}).then(			
					function(res){
            			that.isLoadmore = false;
						var datas = res.data.data;
						if(res.data.status==200){
							that.titlename = datas.cate.name;
							that.shareImgs = datas.cate.img ? 'https://images.91160.com/'+datas.cate.img :'';	
							if(datas.total){
								that.datalist = that.datalist.concat(datas.data);	
								that.total_page = datas.total;
								that.isNoData = false;
								that.tur = true;		
							}else{
								that.isNoData = true;
								that.tur = false;	
							}


				            var wxShareOptions={
			                    timeLine: {                                 
			                        title: '健康新产品-健康160网',
			                        link: '',
			                        imgUrl: that.shareImgs ? that.shareImgs:'https://static.91160.com/wechat/img/common/logo.jpg',
			                    },
			                    appMessage: {
			                        title: '健康新产品-健康160网',
			                        desc: '我在健康160发现了一系列健康新产品，推荐给你', // 分享描述
			                        link: '',
			                        imgUrl: that.shareImgs ? that.shareImgs:'https://static.91160.com/wechat/img/common/logo.jpg',
			                    },
			                    callback: function() {

			                    },
			                    cancelCallback: function() {

			                    }
			                }
			                shareurl = 'https://weixin.91160.com/vue/healthservices/index.html?category_id='+that.category_id
							wxShare(wxShareOptions, that);
				            that.getNyAppShare();	
						}else{
							Toast(res.data.msg)
						}
					}
				)				
			},				
		},
		mounted(){
			$("#isfixed").css({'min-height':$(window).height()-200});
			this.healthTit();
        	window.getNyAppShareParam = this.getNyAppShare;
			var cid = this.$route.query.cid;
			if(cid==20||cid==24){
				this.isNotapp = false;
			}
		},
		components: {
			HeadNav, swiper, swiperSlide,ScrollTop,NoData
		}
	}
</script>
<style scoped lang="scss">	
.productbox{padding-top: 1.17333rem;} 
.service-item{}
.service-item a{ position: relative;}
.service-item .service-item-img{ float: left; display: inline-block; width: 2.986667rem; height: 2.24rem; margin-right: 0.266667rem;}
.service-item p{ width: 100%; max-height: 1.066667rem; line-height:0.586667rem; font-size: 0.426667rem;color: #4a4a4a; text-indent: 0;display: -webkit-box; overflow: hidden; text-overflow: ellipsis; -webkit-line-clamp: 2; -webkit-box-orient: vertical; -moz-line-clamp: 2; -moz-box-orient: vertical;}
.service-price{ position: absolute;bottom:0.32rem ; display: inline-block;
	>.price{font-size: 0.426667rem; color: #F27B17;}
	>.orgprice{ margin-left: 0.133333rem; text-decoration:line-through; font-size: 0.32rem; color: #9b9b9b;}
}
.leftopicon{ display:inline-block; width: 2.986667rem; height: 2.24rem; overflow:hidden;}
.leftopicon img{height:100%;}

.h10{height:0.26667rem;}
/*资讯分类*/
.typetit{width: 100%; height:1.066667rem; padding:0; line-height:1.066667rem; white-space: nowrap; border-bottom:solid 0.026667rem #f1f1f1;}
.typetit button{ position: relative; display:inline-block; height:1.04rem; padding:0 0.4rem;  border:none; outline:none;line-height:1.04rem;font-size: 0.4rem; color: #707070; background:#fff;}
.typetit button.cur{color: #00d3c2;}
.typetit button.cur::after {content:''; position: absolute; left: 50%; bottom: 0px; z-index: 10; width: 0.8rem; height: 2px; background-color: #00d2c3;-webkit-transform: translateX(-50%);-moz-transform: translateX(-50%);-o-transform: translateX(-50%);-ms-transform: translateX(-50%);transform: translateX(-50%); }


.mint-swipe {height:3.73333rem; background:#fff; }
.mt-swipe-item,.mint-swipe-item{width: 100%;height:3.73333rem;}
.indexnewtop{position:fixed;top:1.17333rem;left: 0; z-index: 99; background:#fff;}
.indexappnewtop{position:fixed;top:0;left: 0; z-index: 99; background:#fff;}
</style>