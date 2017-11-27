<template>
	<div class="docinfo layout bg_f9">
		<head-nav>{{catitle}}</head-nav>
		<div class="fullwidth wrapbox">
			<template v-if="banner_ad_list.length>0">
			<!-- 轮播图 -->
			<div v-if="banner_ad_list.length>1">
				<swiper :aspect-ratio="125/375" :loop="true" :auto="true">
	                <swiper-item class="swiper-demo-img backgroundimg" v-for="(infos,index) in banner_ad_list" :style="{backgroundImage:'url('+infos.image+')'}">
	                    <a :href="infos.url?infos.url:'javascript:;'" class="block fullwidth fullheight" @click="gaSend('科室主页-广告图'+index)"></a>
	                </swiper-item>
	            </swiper>
            </div>
            <div v-else>
	            <a :href="infos.url?infos.url:'javascript:;'" v-for="(infos,index) in banner_ad_list" :style="{backgroundImage:'url('+infos.image+')'}" class="block fullwidth fullheight backgroundimg" @click="gaSend('科室主页-广告图'+index)" style="height:3.33333rem"></a>     	
            </div>
			<!-- 轮播图 -->
			</template>

			<div class="index-dep typo_small typo_lgray bg_white pb10">
				<div class="pagn lh20rem pt10 pb10 bt_gray">
					<h2 class="typo_normal typo_gray typo_middle layout">
						<a :href="'/disease/index.html'" class="fr inblo typo_gray lh16 mt3 typo_normal typo_small" @click="gaSend('常见疾病-全部')">
	    					<i class="fr iconfont typo_xsmall ml5 clbebe">&#xe619;</i> <i class="fr typo_gray">全部</i> 
					    </a>							
						<span class="fl index-line bg_green mt5 mr5"></span> <span class="fl typo_middle typo_grey">常见疾病</span>
					</h2>	
				</div>
				<div class="pagn pt5 layout oval-a blue3-btns-a typo_small clearfix" style="max-height:2.24rem;">
					<a :href="'/disease/detail.html?ill_id='+infos.ill_id"  v-bind="{'ga-statistics-click': '常见疾病-'+infos.ill_name }" class="fl inblo oval activelink lh28 typo_dgrey" v-for="(infos,index) in ill_list" @click="gaStaticClick('Department-disease')" id="Department-disease">
						{{infos.ill_name}}
					</a>
                </div>
			</div>	
			<div class="fl fullwidth bg_white mt10">
				<div class="tab-bar" @click='tabToggle($event);'>
					<button ga-statistics-click="科室主页-科室" data-p="1" id="unit" v-bind:class="{ 'cur' : selected == 'unit'}" :disabled="selected == 'unit'">医院及科室</button>
	                <button ga-statistics-click="科室主页-医生" data-p="1" id="doctor" v-bind:class="{ 'cur' : selected == 'doctor'}" :disabled="selected == 'doctor'">医生</button>
	                <button ga-statistics-click="科室主页-咨询" data-p="1" id="ask" v-bind:class="{ 'cur' : selected == 'ask'}" :disabled="selected == 'ask'">相关咨询</button>
				</div>
				<div class="fullwidth bg_white layout" style="min-height:8.0rem;">
					<div class="tab-item fullwidth fl" v-show="selected == 'unit'">
						<template v-if="datalist==true">
							<a :href="'/doctor/index.html?unit_id='+hospital.unit_id+'&dep_id='+hospital.dep_id" class="hospitallist bt_gray clearfix" v-for="(hospital,index) in list">
								<img :src="hospital.image" :onerror="default_hospital">
								<div class="hospital-item-info elli">
									<p class="clearfix">
										<!-- <i v-if="hospital.left_num>0">
											有号
										</i>
										<i v-else class="no">无号</i> -->
										<span class="fl fullwidth elli">{{hospital.dep_name}}</span>
									</p>
									<p class="elli">{{hospital.unit_name}}</p>
									<p class="elli">
										<em>评分{{hospital.overall_score}}</em>
										<em>
											<template v-if="hospital.unit_level==='A'||hospital.unit_level==='B'">三级甲等</template>
											<template v-else-if="hospital.unit_level==='C'||hospital.unit_level==='D'">三级</template>
											<template v-else-if="hospital.unit_level==='E'||hospital.unit_level==='F'||hospital.unit_level==='G'">二级</template>
											<template v-else="hospital.unit_level==='H'||hospital.unit_level==='I'||hospital.unit_level==='J'">一级</template>
										</em>
										<em>{{hospital.key_level_name}}</em>
									</p>
								</div>
							</a>
						</template>
						<template v-else>
							<div class="pt20 textc typo_small bg_white typo_gray">暂无数据</div>
						</template>
					</div>
					<div class="tab-item fullwidth fl" v-show="selected == 'doctor'">
						<template v-if="datadoctorlist==true">
							<a :href="'/doctor/detail.html?unit_id='+doclist.unit_id+'&dep_id='+doclist.dep_id+'&doc_id='+doclist.doctor_id+'&type=order'" class="doctorlist bt_gray clearfix" v-for="(doclist,index) in doctorlist">
								<div class="doctor-img">
									<div class="imgs docbackgroundimg" v-bind="{style:'background-image:url('+(doclist.image ? doclist.image : defaultimg)+')'}"></div>
								</div>
								<div class="doc-item-info elli">
									<p class="clearfix">
										<span class="fl max-80 elli typo_black typo_large">{{doclist.doctor_name}}</span>
										&nbsp;{{doclist.zcname}}
									</p>
									<p class="elli">
										<span class="firsticon">{{doclist.first_practice}}</span> 
										[{{doclist.dep_name}}]
									</p>
									<p class="elli">
										擅长：{{doclist.expert}}
									</p>
									<p class="elli">
				                        评分 <em class="typo_lorange">{{doclist.comment_score}}</em>&nbsp;&nbsp;
				                        预约量 <em class="typo_lorange">{{doclist.register_total}}</em>&nbsp;&nbsp;
				                        咨询量 <em class="typo_lorange">{{doclist.ask_total}}</em>
				                    </p>
									<p class="mt5">
										<i v-for="support_service in doclist.support_service">{{support_service}}</i>
									</p>
								</div>
							</a>
						</template>
						<template v-else>
							<div class="pt20 textc typo_small bg_white typo_gray">暂无数据</div>
						</template>
					</div>
					<div class="tab-item fullwidth fl bg_gray" v-show="selected == 'ask'">
						<template v-if="datarelateask==true">
							<a :href="'/ask/opendetail.html?ask_id='+reask.ask_id" class="asklist clearfix" v-for="(reask,index) in relateask">
								<h3>{{reask.ill}}</h3>
								<p class="lh20 overthree">
									<span class="typo_black">患者：</span>{{reask.content}}
								</p>
								<p class="lh20 overthree">
									<span class="typo_black">{{reask.doctor_name}}：</span>{{reask.reply}}
								</p>
								<div class="ask-doctor mt10 clearfix">
									<img :src="reask.image ? reask.image : defaultimg">
									<p class="elli">
										<em>{{reask.doctor_name}}</em>
										{{reask.zcname}}
										{{reask.unit_name}}
									</p>
								</div>
							</a>
						</template>
						<template v-else>
							<div class="pt20 textc typo_small bg_white typo_gray">暂无数据</div>
						</template>
					</div>
				</div>	
                <template v-if="page_count>1 && isNomore == 1">
                	<div class="pb10">
	                    <load-more :tip="'正在加载'"></load-more>
                    </div>
                </template>			
			</div>
		</div>
		<scroll-top></scroll-top>
	</div>
</template>
<script>
	var shareimg,sharetitle,description,timeLineTitle,timeLineDetails,timeLineImg,shareurl; 
	shareimg ='https://static.91160.com/wechat/img/common/logo.jpg'; 
	import Vue from 'vue'
	import $ from 'jquery'
	import HeadNav from '../../components/common/Head.vue'
	import ScrollTop from '../../components/common/scrollTop.vue'
	import { Swiper,  SwiperItem ,Toast,ToastPlugin,LoadMore } from 'vux'
	import {WxOath,getAppToken,wxShare} from '../../utils/util.js'
	Vue.use(ToastPlugin)  
	export default {
		data () {
			return {
				selected:'unit',
				catitle:'',
				cat_id:'',
				info:[],
            	isNomore: 0,//没有更多
				cur:true,
				p:1,
				page_count:'',
				defaultimg:require('../../static/avatar.jpg'),
				defaultshareimg:require('../../static/logo.jpg'),
				loadimg:require('../../static/bigloading.gif'),	
				default_hospital: 'this.src="' + require('../../static/default_hospital.gif') + '"',
			    list:[
			    ],
			    ill_list:[
			    ],
			    app_ad:"bottom",
			    app_text:"医院检查报告手机在线看",
			    banner_ad_list:[
			    ],
			    doctorlist:[
				],
				relateask:[
				],
				datalist:true,
				datadoctorlist:true,
				datarelateask:true,				
			}
		},
		components:{
			HeadNav,Swiper,  SwiperItem ,Toast,LoadMore,ScrollTop
		},
		// beforeDestroy(){
  // 			window.onscroll=null;
  // 		},	
		mounted: function () {
			this.getIll();
			this.scrollist();
		},
		methods:{		
			loadurl:function(url){
				window.location.href=url;
			},		
			tabToggle:function(e){
				this.selected = e.target.id;
				this.p=1;
				this.list=[];
				this.doctorlist=[];
				this.relateask=[]; 
				// document.body.scrollTop = 0
				this.getList(this.selected,this.p);
				ga('send','event',e.target.getAttribute('ga-statistics-click'),'点击');
			},
			scrollist:function(){
				//页面滑动加载数据
				var that = this;
				window.onscroll = function(){
					if(that.cur){
						// var totalheight = parseFloat(document.body.offsetHeight) + parseFloat(document.body.scrollTop)+10;
						var totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
					    // if(document.body.scrollHeight <= totalheight){
					    if($(document).height() <= totalheight ){
							that.cur = false;
					        if(parseInt(that.p) < parseInt(that.page_count)){
								that.p++;
								that.getList(that.selected,that.p)
							}
							else{
								that.$vux.toast.text('已经全部加载完','middle');
								that.isNomore = 0;
							}
					    }				        
				    }				
				    
				}		
			},			
			getList:function(type,p){
				var that = this;
				var cat_id = this.$route.query.cat_id;
				var code = typeof(this.$route.query.code) != 'undefined' ? this.$route.query.code : 0;	
            	that.isNomore = 0;	
				this.$http({				
					method:'get',
					url: '/depart/list.html?code='+code+'&cat_id='+cat_id+'&type='+type+'&p='+p}).then(					
					function(res){
						if(res.data.state==1){
							Vue.nextTick(function(){
								if(type=='unit'){
									if(res.data.data == null){
										that.datalist = false;
									}else{
										that.datalist = true;
										that.list = that.list.concat(res.data.data);									
									}
								}else if(type=='doctor'){
									if(res.data.data == null){
										that.datadoctorlist = false;
									}else{
										that.datadoctorlist = true;										
										that.doctorlist = that.doctorlist.concat(res.data.data);
									}
								}else{
									if(res.data.data == null){
										that.datarelateask = false;
									}else{	
										that.datarelateask = true;									
										that.relateask = that.relateask.concat(res.data.data);
									}
								}
								that.page_count = res.data.page_count;	
								if (that.page_count >= 1) {
	                                that.isNomore = 1;
	                            }													
							})						
						}else{
							that.$vux.toast.text(res.data.msg,'middle');
						}
						that.cur = true;
					}
				)				
			},					
			getIll:function(){
				var that = this;
				var cat_id = this.$route.query.cat_id;
				var code = typeof(this.$route.query.code) != 'undefined' ? this.$route.query.code : 0;
				var metas = document.getElementsByTagName("meta"); 				
				this.$http({
					method:'get',
					url: '/depart/list.html?code='+code+'&cat_id='+cat_id+'&v='+(new Date().getTime())}).then(					
					function(res){
						that.getList(that.selected,1);
						if(res.data.state==1){
							metas[0].content =res.data.keywords;
							metas[1].content=res.data.description;	
							that.catitle = res.data.cat_name;
							that.ill_list = that.ill_list.concat(res.data.ill_list);
							that.banner_ad_list = that.banner_ad_list.concat(res.data.banner_ad_list);	
							that.cat_id = that.cat_id.concat(res.data.cat_id);								
							
							timeLineTitle = sharetitle = '健康160-预约挂号咨询平台';
				            timeLineDetails = description = '预约挂号，免费咨询。健康160力求为您提供最好的移动医疗服务'; 
				            var wxShareOptions={
				                timeLine: {                                 
				                    title: sharetitle,
				                    link: '',
				                    imgUrl: 'https://static.91160.com/wechat/img/common/logo.jpg',
				                },
				                appMessage: {
				                    title: sharetitle,
				                    desc: description, // 分享描述
				                    link: '',
				                    imgUrl:'https://static.91160.com/wechat/img/common/logo.jpg',
				                },
				                callback: function() {

				                },
				                cancelCallback: function() {

				                }
				            }
				            wxShare(wxShareOptions, that);					
						}else{
							that.$vux.toast.text(res.data.msg,'middle');
						}
					}
				)
			},
			gaStaticClick:function(el){
				ga('send','event',document.getElementById(el).getAttribute('ga-statistics-click'),'点击');
			}		
		}
	}
</script>
<style scoped lang = 'scss'>
	em,i{font-style: normal;}
	.w-80{width: 80%;}
	.max-80{max-width: 80%;}
	.col576{color: #576b95;}
	.bgf2{background: #f2f2f2;}
	.backgroundimg{background-repeat: no-repeat; background-position: center;background-size: cover; }
	.docbackgroundimg{background-repeat: no-repeat; background-position:top center;background-size: cover; }
	.wrapbox{width:100%;padding-top:1.173333rem;word-break:break-all;}
	.blue3-btns-a a{border:1px solid rgba(155,155,155,0.40);background:rgba(255,255,255,0.04); }
	.oval-a a{margin:0.16rem 0.266667rem 0.16rem 0;padding-left: 0.3rem;padding-right: 0.3rem;}
	.tab-bar{float: left; width: 100%}
	.tab-bar button{ position: relative;  float: left; display: inline-block; width: 33.33%; height: 1.04rem; line-height: 1.04rem; border-bottom: solid 0.053333rem #f9f9f9; text-align: center; font-size: 0.4rem; color: #707070; background: #fff;}
	.tab-bar button.cur:before{ content: ""; position: absolute;bottom:-0.053333rem; left: 50%; width: 0.8rem; height: 0.053333rem; margin-left: -0.4rem; border-bottom: solid 0.053333rem #00d2c3; color: #00d2c3;}
	.hospitallist{display: block; width:10.0rem; padding:0.533333rem; background: #fff;}
	.hospitallist img{ float: left; width: 1.6rem; height: 1.6rem;}
	.hospital-item-info{ float: right; width: 7.066667rem;
		>p{text-indent: 0; font-size: 0.373333rem; line-height:0.56rem; color: #707070;
			>i{ float: right; display: inline-block; width: 0.8rem;height: 0.48rem; line-height: 0.48rem; text-align: center; font-size: 0.32rem; color: #fff; background:#5acf83}
			>i.no{background: #ccc}
			>em{position: relative;font-style:normal; padding-right:0.266667rem; margin-right: 0.133333rem}
			>em:after{content: ""; position: absolute;right:0;top:0.106667rem; width: 0.026667rem;height:0.373333rem; background: #d8d8d8;}
			>em:last-child:after{background: none;}
		}
		>p:first-child{ line-height: 0.586667rem; font-size: 0.426667rem;color: #333;}
		}
	.doctorlist{display: block; width:10.0rem; padding:0.533333rem; font-size: 0.373333rem;  background: #fff;}
	.doctorlist .doctor-img{float: left;width: 1.6rem;
		>.imgs{ display: inline-block; float: left; width: 1.6rem; height: 1.6rem;}
		>span{float:left;width: 100%;margin-top:0.08rem; line-height:0.48rem; text-align: center;color: #707070;}
	}
	.doc-item-info{ float: right; width: 7.066667rem;
		>p{text-indent: 0;line-height:0.533333rem;color: #707070;
			>i{display: inline-block;float: left; width: 0.96rem;height: 0.53333rem; margin:0 0.26667rem 0.13333rem 0;border:solid 1px #33b2ef;border-radius: 0.05333rem; line-height: 0.53333rem; text-align: center; font-size:0.32rem; color: #33b2ef; background:none;}
		}
		>p:first-child{padding-bottom: 0.133333rem; font-size: 0.426667rem;}
		}
	.asklist{display: block; width:10.0rem; padding:0.533333rem; margin-bottom: 0.266667rem; background: #fff;
		>h3{ padding:0 0 0.213333rem 0; line-height:0.533333rem; font-size: 0.426667rem;color: #00c6b2;}
		>p{padding:0.053333rem 0; line-height: 0.533333rem; font-size: 0.373333rem;color: #707070;}
	}
	.ask-doctor{
		>img{ float: left; width: 0.693333rem;height: 0.693333rem;border-radius: 100%;}
		>p{float: right; width:7.866667rem ; line-height: 0.693333rem; font-size: 0.373333rem;color: #707070;
			>em{font-size: 0.426667rem; color: #333;}
		}
	}	
	.firsticon{line-height: 0.48rem; padding:0 0.13333rem;border-radius: 0.05333rem; font-size: 0.32rem;color: #fff;background: #ffb753;}
</style>