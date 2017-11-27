<template>
	<div class="famousdoctorbox layout bg_gray">
		<div v-if="loadover==true">
			<!-- topad 顶部广告wap端显示-->
			<template v-if="waptopad == true">
				<template v-if="appadshow==true">
					<top-ad></top-ad>
				</template>
			</template>
			<!-- topad 顶部广告wap端显示-->
			<div v-bind:class="{ appAdding: waptopad }">
				<!-- topsearch 顶部搜索 -->
				<top-search :infobox="area_name"></top-search>
				<!-- topsearch 顶部搜索 -->
				<div id="newboxshow"></div>
				<div id="boxContent">
					<!-- fast_ask -->
					<div id="fast_ask">
						<template v-if="if_fast_ask==true">			
							<fast-ask :infobox="fast_ask"></fast-ask>
						</template>
					</div>
					<!-- fast_ask -->
					<!-- find_ask -->
					<div id="find_ask">
						<template v-if="if_find_ask==true">			
							<find-ask :infobox="find_ask"></find-ask>
						</template>
					</div>
					<!-- find_ask -->
					<!-- services 顶部6大菜单-->
					<div id="services">	
						<template v-if="if_services==true">			
							<services-list :two="services.slice(0, 3)" :four="services.slice(3, 6)"></services-list>
						</template>
					</div>
					<!-- services 顶部6大菜单-->
					<!-- recommend_doctor -->
					<div id="recommend_doctor">
						<template v-if="if_recommend_doctor==true">
							<recommend-doctor :infobox="recommend_doctor"></recommend-doctor>
						</template>
					</div>
					<!-- recommend_doctor -->
					<!-- ad 广告-->
					<div id="ad_content">
						<template v-if="if_ad_content==true">
							<template v-if="bannerList.length>0">
								<scroll-ad :infobox="bannerList"></scroll-ad>		
							</template>
						</template>
					</div>
					<!-- ad 广告-->
					<!-- dep_doctor 按科室找医生-->
					<div id="dep_doctor">
						<template v-if="if_dep_doctor==true">
							<dep-doctor :infobox="dep_doctor" :hasRecommendDoctor="has_recommend_doctor"></dep-doctor>
						</template>
					</div>
					<!-- dep_doctor 按科室找医生-->
					<!-- vip_service 私人医生-->
					<div id="vip_service">
						<template v-if="if_vip_service==true">
							<vip-service :infobox="vip_service"></vip-service>	
						</template>			
					</div>
					<!-- vip_service 私人医生-->
					<!-- ill_doctor 按疾病找医生-->
					<div id="ill_doctor">
						<template v-if="if_ill_doctor==true">
							<ill-doctor :infobox="ill_doctor"></ill-doctor>
						</template>
					</div>
					<!-- ill_doctor	 按疾病找医生-->
					<!-- tel_doctor 电话咨询-->
					<div id="tel_doctor">
						<template v-if="if_tel_doctor==true">
							<tel-doctor :infobox="tel_doctor"></tel-doctor>
						</template>
					</div>
					<!-- tel_doctor 电话咨询-->
					<!-- hot_ask 热门咨询-->
					<div id="hot_ask">
						<template v-if="if_hot_ask==true">
							<hot-ask :infobox="hot_ask"></hot-ask>
						</template>
					</div>
					<!-- hot_ask 热门咨询-->
					<!-- recommend_class 微课堂推荐-->
					<div id="recommend_class">
						<template v-if="if_recommend_class==true">
							<recommend-class :infobox="recommend_class" :select="selected"></recommend-class>
						</template>
					</div>
					<!-- recommend_class 微课堂推荐-->
					<!-- doctor_article 文章 -->
					<div id="doctor_article">
						<template v-if="if_doctor_article==true">
							<menu-title :links="doctorslinks">医生文章</menu-title>
							<div class="bg_white layout clearfix">
								<div class="newstypetit" id="newstypetit" :class="{'hide' : doctor_article.length<=1}">
									<a @click='tabNewsToggle($event);' v-for="(doctorArticle,index) in doctor_article" :class="{ 'cur' : newtit == doctorArticle.code}" v-bind="{id:doctorArticle.code}">{{doctorArticle.name}}</a>	
								</div>
								<div class="bg_white layout newsboxs">
									<a class="newlist clearfix" v-for="(list,index) in newslist" @click="gaSend('名医主页_医生文章_推荐内容点击量')">
										<new-li :infobox='list'></new-li>
									</a>
									<template v-if="total>1 && isNomore == 1">
					                    <load-more :tip="'正在加载'"></load-more>
					                </template>	
								</div>				
							</div>
						</template>
					</div>
					<!-- doctor_article 文章 -->
				</div>		
			</div>	
			<!-- 弹出广告图 -->
			<div class="first-full-ad fullwidth fullheight" v-show="fullAd">
				<div class="block full-ad-box fixed" >
					<a href="javascript:;" class="full-ad-close" @click="fullAdClose">×</a>
					<a :href="pop_ad.url" @click="gaSend('咨询tab弹窗广告')" class="block fullwidth fullheight rsquare backgroundimg" v-bind="{style:'background-image:url(https://images.91160.com/'+pop_ad.image+')'}"></a>
				</div>
			</div>
			<!-- 弹出广告图 -->
		</div>	
	</div>
</template>
<script>
	import Vue from 'vue'
	import $ from 'jquery'
	import TopAd from './TopAd.vue'
	import TopSearch from './TopSearch.vue'
	import FastAsk from './FastAsk.vue'
	import FindAsk from './FindAsk.vue'
	import ServicesList from './ServicesList.vue'
	import RecommendDoctor from './RecommendDoctor.vue'
	import VipService from './VipService.vue'
	import RecommendClass from './RecommendClass.vue'
	import DepDoctor from './DepDoctor.vue'
	import IllDoctor from './IllDoctor.vue'
	import TelDoctor from './TelDoctor.vue'
	import HotAsk from './HotAsk.vue'
	import ScrollAd from './ScrollAd.vue'
	import NewLi from '../../components/common/Newli.vue'
	import MenuTitle from './Menu.vue'

	import {Toast,ToastPlugin,LoadMore} from 'vux'
	import {WxOath,wxShare} from '../../utils/util.js'
	Vue.use(ToastPlugin)
	export default {
		data () {
			return {
				loadover:true,
				fullAd:false,
				loadimg:require('../../static/bigloading.gif'),	
				askListUrl:'/ask/askdoc.html',
				waptopad:false,
				appadshow:true,
            	isNomore: 0,//没有更多
				newtit:'',
				total:'',//总页数
				page:1,//默认第一页
				size:10,//每页5条数据
				tur:false,
				doctorslinks:'',
				newslist:[],
				selected:'',
				datas:{},
				services:[],
				fast_ask:{},//极速问医生
				find_ask:[],//三大找医生
		        recommend_doctor:[],//推荐医生
				vip_service:[],//私人医生服务
				recommend_class:[],//微课堂推荐
				dep_doctor:[],//按科室找医生
				ill_doctor:[],//按疾病找医生
				tel_doctor:[],//电话咨询
				hot_ask:[],//热门咨询
				doctor_article:[],//医生文章
				sort:[],//排序
				secondSort:[],//第二屏开始排序
				bannerList:[],//轮播广告
				pop_ad:{},//弹窗广告
				has_recommend_doctor:true,
				area_name:'',
				if_fast_ask:false,
				if_find_ask:false,
				if_services:false,
				if_recommend_doctor:false,
				if_vip_service:false,
				if_recommend_class:false,
				if_dep_doctor:false,
				if_ad_content:false,
				if_ill_doctor:false,
				if_tel_doctor:false,
				if_hot_ask:false,
				if_doctor_article:false,
			}
		},
		components:{
			TopAd,TopSearch, FastAsk, FindAsk, ServicesList, RecommendDoctor, VipService, RecommendClass, DepDoctor, IllDoctor, TelDoctor, HotAsk, ScrollAd, NewLi, MenuTitle,Toast,LoadMore
		},
		mounted: function () {
			this.getContent();
			this.scrollist();
		},
		methods:{
			//关闭弹窗广告
			fullAdClose:function(){
				this.fullAd = false;
			},
			//切换新闻资讯tab
			tabNewsToggle:function(e){
				this.newtit = e.target.id;
				this.newslist = [];
				this.page = 1;
				this.docArticleList(this.newtit,1,this.size);
				var indexnewsTop = parseInt($('#doctor_article').offset().top-1);
				document.body.scrollTop = indexnewsTop;
			},
			//首屏
			getContent:function(){			
				var that = this;
				var metas = document.getElementsByTagName("meta");
				var code = typeof(this.$route.query.code) != 'undefined' ? this.$route.query.code : 0;
				this.$http({   				
					method:'get',
					url: '/ask/famousdoc.html?page=1&code='+code}).then(										
					function(res){
						if(res.data.state==1){
							var ua = navigator.userAgent.toLowerCase(); 
							if(ua.match(/MicroMessenger/i)=="micromessenger") { 
								that.waptopad = false;
							} else { 
								that.waptopad = true;
							}

							that.loadover = true;
							Vue.nextTick(function(){
								document.title = '在线问医生_医生在线咨询_快速问医生-健康160挂号网';
								metas[0].content = '医生在线咨询,在线问医生,快速问医生';
								metas[1].content= '健康160为您提供在线问医生服务,及时回答您的健康问题.';	

								that.sort = res.data.data.sort;//排序	
								that.sort.forEach((item,i)=>{
									that['if_'+item] = true;
									that[item] = res.data.data[item];
									var modelbox = document.getElementById(item);
									var newboxshow = document.getElementById("newboxshow");
								    newboxshow.appendChild(modelbox)
								});	
								if(res.data.data.ill_doctor){
									that.selected = res.data.data.ill_doctor.data[0].cat_name;	
								}
								that.bannerList = res.data.data.ad_content.bannerList;//轮播广告
								that.pop_ad = res.data.data.ad_content.pop_ad;//弹窗广告
								if(typeof(res.data.data.ad_content.pop_ad)=='object'){//如果接口返回pop_ad不为空，显示弹窗广告
									that.fullAd = true;
								}else{
									that.fullAd = false;
								}
								that.area_name = res.data.data.city_info.area_name;
								that.getSencondContent();

								// if(that.sort.indexOf('recommend_doctor')==-1){
								// 	that.has_recommend_doctor = false;
								// }else{
								// 	that.has_recommend_doctor = true;
								// }


								var wxShareOptions={
				                    timeLine: {                                 
				                        title: '在线问医生_医生在线咨询_快速问医生-健康160挂号网',
				                        link: '',
				                        imgUrl: 'https://static.91160.com/wechat/img/common/logo.jpg',
				                    },
				                    appMessage: {
				                        title: '在线问医生_医生在线咨询_快速问医生-健康160挂号网',
				                        desc: '健康160为您提供在线问医生服务,及时回答您的健康问题.', // 分享描述
				                        link: '',
				                        imgUrl:'https://static.91160.com/wechat/img/common/logo.jpg',
				                    },
				                    callback: function() {

				                    },
				                    cancelCallback: function() {

				                    }
				                }
								wxShare(wxShareOptions, that);
							});
						}else{
							that.$vux.toast.text(res.data.msg,'middle');
						}
					}
				)				
			},
			//第二屏开始
			getSencondContent:function(){		
				var that = this;
				this.$http({   				
					method:'get',
					url: '/ask/famousdoc.html?page=2'}).then(					
					function(res){
						if(res.data.state==1){
							Vue.nextTick(function(){
								that.secondSort = res.data.data.sort;//排序	
								that.secondSort.forEach((item,i)=>{
									that['if_'+item] = true;
									that[item] = res.data.data[item];
									var modelbox = document.getElementById(item);
									var newboxshow = document.getElementById("newboxshow");
								    newboxshow.appendChild(modelbox)
								});	
								if(res.data.data.ill_doctor){
									that.selected = res.data.data.ill_doctor.data[0].cat_name;	
								}
								that.newtit = res.data.data.doctor_article[0].code;
								that.docArticleList(that.newtit,1,that.size);
							});
						}else{
							that.$vux.toast.text(res.data.msg,'middle');
						}
					}
				)				
			},
			//页面滑动加载数据
			scrollist:function(){
				var that = this; 
				var m_po = 60;	
				window.onscroll = function(){
					var m_st = parseFloat(document.body.scrollTop) || parseFloat(document.documentElement.scrollTop);
					if(that.waptopad == true){
						if (m_st > m_po) {
					        that.appadshow = false;
					    }else{
						    that.appadshow = true;
					    }
					}

					if(that.tur){
						var totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
					    if($(document).height() <= totalheight){
					    	that.tur = false;
					        if(parseInt(that.page) < parseInt(that.total)){
								that.page++;
								that.docArticleList(that.newtit,that.page,that.size)
							}else{
								that.$vux.toast.text('已经全部加载完','middle');
								that.isNomore = 0;
							}
					    }				        
				    }
				    if($(".newstypetit").length>0){//资讯有多个分类时，导航固定顶部
						var	c = $(window).scrollTop();
						var b =  parseInt($("#doctor_article").offset().top);
						if(b<=c){
							$("#newstypetit").addClass('indexnewtop');
						}else{
							$("#newstypetit").removeClass('indexnewtop');
						}	
				    }				    
				}		
			},	
			//资讯列表数据
			docArticleList:function(newtit,page,size){
				var that = this;
				var cid = this.$route.query.cid;
            	that.isNomore = 0;
				this.$http({				
					method:'get',
					url: '/ask/docArticleList.html?code='+newtit+'&page='+page+'&size='+size}).then(					
					function(res){
						if(res.data.state==1){
							Vue.nextTick(function(){
								that.newslist = that.newslist.concat(res.data.data.rows);
								that.total = Math.ceil(res.data.data.total/size);//向上取整 1.2 取2
								if (that.total >= 1) {
	                                that.isNomore = 1;
	                            }
							});
						}else{
							that.$vux.toast.text(res.data.msg,'middle');
						}
						that.tur = true;
					}
				)								
			}						 
		}
	}
</script>
<style scoped lang = 'scss'>
	.famousdoctorbox{padding-bottom: 1.173333rem; word-break:break-all;}


	/*资讯分类*/
	.newstypetit{width: 100%; height:1.066667rem; padding:0; line-height:1.066667rem;  border-bottom:solid 0.026667rem #f9f9f9;white-space: nowrap; overflow-x: scroll;}
	.newstypetit a{ position: relative; display:inline-block; padding:0 0.4rem; font-size: 0.4rem; color: #707070;}
	.newstypetit a.cur{color: #00d3c2;}
	.newstypetit a.cur::after {content:''; position: absolute; left: 50%; bottom: 0px; z-index: 10; width: 0.8rem; height: 2px; background-color: #00d2c3;-webkit-transform: translateX(-50%);-moz-transform: translateX(-50%);-o-transform: translateX(-50%);-ms-transform: translateX(-50%);transform: translateX(-50%); }


	.appAdding{padding-top:1.76rem}

	.indexnewtop{position:fixed;top:0;left: 0; z-index: 99; background:#fff;}
	.newsboxs{ min-height:17.6rem;}

	/*弹窗广告*/
	.first-full-ad{position: fixed; top: 0; left: 0; z-index:100;background-color: rgba(0, 0, 0, 0.6);}
	.full-ad-box{left: 50%;top:50%;z-index: 999; width:8rem; height: 11rem; margin:-5.5rem 0 0 -4rem; border-radius:0.213333rem; background:#fff;}
	.full-ad-close{position: absolute;right: -0.32rem; top: -0.32rem; z-index: 9999; display: inline-block; width: 0.693333rem; height: 0.693333rem; border-radius: 100%; line-height: 0.64rem; text-align: center;font-size:0.64rem;color: #333; background: #fff; }
</style>