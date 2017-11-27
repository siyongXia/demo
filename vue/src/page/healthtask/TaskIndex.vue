<template>
	<div class="task_wrapper bg_gray clearfix" id="task_wrapper" v-title data-title="健康任务">
		<Guide v-if="showGuide"></Guide>
		<loading v-if="isLoading"></loading>
		<NavigateBar :options="navigateBarOptions" v-if="!commonIsApp"></NavigateBar>
		<!-- 头部 -->
		<TopPart :class="{'mt48':!commonIsApp}" :totalSigned="totalSigned" 
			:signTime="signTime" 
			:trueName="trueName"
			:avatar="avatar"
			:completeTotalCount="complete_total_count"></TopPart>	
			<!-- <Swiper auto height="3.33333rem" dots-position="center" :loop="true" :auto="true" v-if="addBanner.length > 0"> -->
		<Swiper auto height="3.33333rem" dots-position="center" :loop="true" :auto="true" >
			<Swiper-item class="black"  v-for="(item,index) in addBanner">
				<a :href="item.link" class="block fullwidth" >	      		
					<img :src="item.image" class="fullwidth">
				</a>
			</Swiper-item>
		</Swiper>		
	<!-- 	<div class="head_wave" :class="{'active':isSigned,'mt48':!commonIsApp}">
			<div class=" typo_white head_box relative">
				<img src="./images/wave.png" alt="">
				<div class="textr">
					<span>打卡提醒</span>
					<mt-switch v-model="notice_switch" class="fr ml10 mt2" @click.native="switchNotice()">开关</mt-switch>
				</div>
				<div class="sign_btn relative" v-if="!isSigned" @click="sign()" >
					<span>签到</span><br><span>打卡</span>
				</div>
				<div  class="relative flip-container pb20" :class="isSigned?'active':''">
					<div class="flipper">
						<div class="sign_btn relative front"  @click="sign()"  >
							<span>签到</span><br><span>打卡</span>
						</div>
						<div  class="sign_btn  relative signed back"  >
							<span>累计打卡</span><br><span><i class="totalSigned">{{totalSigned}}</i>天</span>
						</div>
					</div>	
				</div>
				<div class="tips typo_small  textc " v-html="signPaper"  v-if="isSigned"></div>	
				<img src="./images/signed.png" class="bang_img active" alt="" v-if="isSigned">	
				<div class="typo_small" v-if="notice_switch">当天{{tip_time}}提醒<span class="ml10 line_under"  @click="openPicker()">修改</span></div>
				<mt-datetime-picker
					ref="picker"
					type="time"
					@confirm="handleConfirm"
					v-model="pickerValue">
				</mt-datetime-picker>
			</div>			
		</div> -->
	<!-- 日历 -->
	<div class="sign_calender_box bg_white mb10 mt10">
		<div class="clearfix  c_333 mb20 lh20 typo_small" @click="showCalender()">
			<span class="fl">每日签到</span>
			<span class="fr">抽奖赢积分<span class="iconfont c_CFCFCF pl5">&#xe619;</span></span>
		</div>		
		<div class="calender ">
			<div class="flex calender_wrap typo_dgrey mb5 "  @click="sign($event)">
				<div v-for="(item,index) in weekSignRecord" class="relative"
					:data-today = 'item.date == today && !isSigned ? 1:0'
					:class="{'signed':item.isSigned,'today':item.date == today,'passed':(new Date(item.date).getTime()) < (new Date(today).getTime()),'todayIsSigned':item.date == today && isSigned}" >
					{{ item.date == today ? isSigned ? '已签' :'签到':item.weekday}}
					
					<div class="jyztip fs12 " :class="isSignedForClick ?'isSigned':''" v-if="item.date == today && isSigned && flag">+{{expValue}}<br>经验值</div>
				</div>
				<!-- <div>一</div>
				<div>二</div>
				<div>三</div>
				<div class="signed">四</div>
				<div>五</div>
				<div>六</div>
				<div>日</div> -->
			</div>
			<!-- <div class="flex calender_wrap">
				<div class="iconfont " v-for="(item,index) in weekRecord" :class="item ? 'typo_green':''">&#xea53;</div>	
			</div>	 -->			
		</div>
	</div>
	<Calender :record="recordStr" :exp="exp" :level="level" :luckyTimes="luckyTimes"></Calender>
	<!-- 每日任务 -->
	<div class="">
		<div class="bor_bottom pl20 pr20 lhh40 typo_smiddle typo_dgrey bg_white clearfix"><i class="line mr5"></i>健康任务
			<span @click="gotoTaskIllustrate()" to="" class="fr lhh40"><i class="dot mr10" v-if="isDotShow"></i>打卡规则<span class="iconfont c_CFCFCF pl5">&#xe619;</span></span>
		</div>
		<template  v-if="dayTask && dayTask.length > 0">
			<div class="c333 bg_white pt20 pl20">我的每日任务卡（{{dayTask.length}}）</div>
			<div class=" pb5 bg_white pt20 ">
				<SignTask v-for="(item,index) in dayTask" :infos="item" :state="1" ></SignTask>
			</div>	
		</template>							
	</div>
	<!-- 任务List -->
	<div class="bg_white overSwiper" >
		<div class="c333 bg_white pt20 pb10 ml20 mr20 bor_t">全部健康任务（{{health_task['0'] && health_task['0'].length}}）</div>
		<Swiper auto height="1.06667rem" :show-dots="false">
			<Swiper-item class="black">
				<ul class="flex task_tabs lhh40 pl20 pr20 typo_smiddle " @click="switchCate($event)">
					<li v-for="(item,index) in health_cate" style="flex-shrink:0"
						:data-index="index" :class="activeCateId == index ? 'active':''">{{item}}</li>
						<!-- 这个坑搞不定 -->
						<li v-for="item in 2"></li>
				</ul>
			</Swiper-item>
		</Swiper>
		<div class="mt20 pb20 bg_white" v-for="(tasks,i) in health_task" v-if="activeCateId == i">
			<SignTask v-for="(item,index) in health_task[i]" :infos="item" 
						:state="item.is_complete ? 6 : item.is_add ? 5:4"  
						:data-type="item.is_complete ? 6 : item.is_add ? 5:4"
						:id ="( index === 0) ? 'firstTask':''">
			</SignTask>
		</div>
	</div>
</div>
</template>

<script>	
	"use strict"
	import { wxShare ,getUrlParam, WxOath, getAppToken,getWeixinShareUrl} from '../../utils/util.js';
	import GlobalSetteing from '../../config/GlobalSetting.js'
	import TopPart from './components/TopPart.vue'
	var ret = '';
	var sharetitle, description, shareurl, shareimg,shareLinkUrl;
	sharetitle = '健康打卡 | 每一天的坚持，让我过上自律的生活！';
	description = '我已经开始了我的健康计划，你也来一起参加吧!';
	shareurl = '';
	shareimg = 'http://static.91160.com/wechat/img/common/healthtask.jpg';
	import SignTask from './SignTask.vue';	
	import Spread from '../../components/Spread.vue';
	import Vue from 'vue';
	import Calender from '../../components/Calender.vue'
	import { Swiper, SwiperItem } from 'vux'
	import { Switch ,DatetimePicker,Toast} from 'mint-ui';
	import NavigateBar from '../../components/common/NavigateBar.vue';
	import Guide from './components/Guide.vue'
	import {mapGetters} from 'vuex';
	import VueScrollTo from 'vue-scrollto';
	import * as api from './api/api.js';
	Vue.component(Switch.name, Switch);
	Vue.component(DatetimePicker.name, DatetimePicker);
	export default {
		data(){
			return {
				ajaxFlag:true,
				showGuide:false,
				today:'',
				trueName:'',
				avatar:'',
				exp:'',
				level:'',
				luckyTimes:0,
				addBanner:[],
				totalSigned:0,
				isDotShow:true,
				expValue:10,
				notice_switch:false,
				isSigned:false,
				flag:false,
				isSignedForClick:false,
				activeCateId:0,
				pickerValue:'09:10',
				signTime:0,
				tip_time:'8',
				signPaper:'',
				sign_notice:'',
				health_cate:{},
				health_task:{},
				record:[],
				signList:[],
				weekRecord:[false,false,false,false,false,false,false],
				isToday:'',
				weekSignRecord:[
					{ isSigned:false, weekday:'日',isToday:false},
					{ isSigned:false, weekday:'一',isToday:false},
					{ isSigned:false, weekday:'二',isToday:false},
					{ isSigned:false, weekday:'三',isToday:false},
					{ isSigned:false, weekday:'四',isToday:false},
					{ isSigned:false, weekday:'五',isToday:false},
					{ isSigned:false, weekday:'六',isToday:false},
				],
				recordStr:'',
				dayTask:[],
				taskList:[],
				navigateBarOptions:{
					iconLeftCode:'&#xe60e;',
					title:'早起打卡',
					bgColor:'#00d2c3',
					color:'#fff',
					iconClass:'c_white',
					iconRightCode:''
				},
				cid:'',
				complete_total_count:'',
				js_app_login_token:'',
			}
		},
		components:{
			SignTask,
			Spread,
			Calender,
			NavigateBar,
			TopPart,
			Swiper, 
			SwiperItem,
			Guide
		},
		computed:{
			...mapGetters([
				'isLoading',
				'commonIsApp'
			])
		},
		methods:{
			switchNotice(){
				setTimeout(()=>{
					var notice_switch = this.notice_switch == true ? 1: 0,
					type = 'sign-notice',
					tip_time = this.tip_time || '08:00';
					if(this.ajaxFlag) {
						this.ajaxFlag = false;
						api.saveNotive({notice_switch,type,tip_time},(data)=>{
							this.ajaxFlag = true;
							if(data.state == 1) {
								Toast({
									message: '设置成功',
									position: 'middle',
									duration: 1000,
									className: 'c_white'
								});
							}else {
								Toast({
									message: '修改失败',
									position: 'middle',
									duration: 1000,
									className: 'c_white'
								});
							}
						},(error)=>{	
							console.log(error);
						})
					}
				},300);
				return;				
				
			},
			scrollToPosition(id,offset){
   				VueScrollTo.scrollTo(id, 500,{offset:-offset,container: "body"})	;			
   			},
			gotoTaskIllustrate () {
				
				if(this.isDotShow) {
					window.localStorage.setItem('isDotShow','1');
				}
				window.location.href = 'http://u2769734.viewer.maka.im/k/3M07UIF9';
				// this.$router.push({path:'taskIllustrate.html'})
			},
			getDot () { //判断点击有礼按钮是否曾经点击过
				this.isDotShow = !(window.localStorage.getItem('isDotShow'));
			},
			showCalender(){//展示日历
				document.querySelector('#mobilemask').style.display = 'block';
			},
			switchCate(e){//切换任务种类
				this.activeCateId = e.target.dataset.index;
				// this.initTaskList();
			},
			openPicker() {//打开时间选择器
				this.$refs.picker.open();  
			},
			handleConfirm(value ){//选择时间
				this.tip_time = value;
				var notice_switch = this.notice_switch == true ? 1 : 0,
					type = 'sign-notice',
					tip_time = value;
				api.saveNotive({notice_switch,type,tip_time},(data)=>{
					if(data.state == 1) {
						Toast({
							message: '设置成功',
							position: 'middle',
							duration: 1000,
							className: 'c_white'
						});
						this.pickerValue = value;
					}else {
						Toast({
							message: '修改失败',
							position: 'middle',
							duration: 1000,
							className: 'c_white'
						});
					}
				},(error)=>{	
					console.log(error);
				})

			},
			initActiveCateId(){//初始化默认选中类别
				if(this.health_cate) {
					for(var k in this.health_cate) {//取对象的第一项
						this.activeCateId = k;
						return;
					}
				}
			},
			initTaskList(){//初始化默认选中类别中的任务
				this.taskList = this.health_task && this.health_task[this.activeCateId];
				setTimeout(()=>{
					window.scrollTo(0,0.1);
				},50)
			},
			initSignState(){//初始化签到状态
				if(this.record[0] == this.getToday()) {
					this.isSigned = true;
				}
			},
			getToday(){//获取当前的日期,格式2017-7-21
				var day = new Date();
				this.today = day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate();
				return this.today;
			},
			sign(e){//签到打卡	
				if(e.target.dataset.today !== '1') {
					return;
				}		
				api.signIn((data)=>{
					this.isSigned = true;
					this.flag = true;
					setTimeout(()=>{
						this.$nextTick(()=>{
							this.isSignedForClick = true;			
						})
					},20)
					this.signTime = data.signTime;
					this.record.push(this.getToday());//更新本周签到记录
					this.initSignList();
					this.recordStr =　this.getToday() +','+ this.recordStr;
					this.totalSigned +=1 ;
				},(err)=>{
					Toast({
                        message: err.msg,
                        position: 'middle',
                        duration: 1000,
                        className: 'c_white'
                    });
				})
			},
			getWeekStartDate() { //获取本周的第一天
				var now = new Date(); //当前日期 
				var nowDayOfWeek = now.getDay(); //今天本周的第几天 
				var nowDay = now.getDate(); //当前日 
				var nowMonth = now.getMonth(); //当前月 
				var nowYear = now.getFullYear(); //当前年 
				var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek); 
				return new Date(weekStartDate.getTime() +  24 * 60 * 60 * 1000); 
			},
			initSignList(){
				var arr = new Array(7);
				var record = this.record;
				// console.log(record);
				var day = this.getWeekStartDate();
				for(var i = 0 ; i < 7;i++) {
					var d = new Date( day.getTime() + 24 * 60 * 60 * 1000 * i);
					var recordStr = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
					record.forEach((item,index)=>{
						if( item == recordStr) {
							arr[i] = true;
							return false;
						}
					})
				}	
				this.weekRecord = arr;	
				for( var i = 0 ; i < 7;i++) {
					var d = new Date( day.getTime() + 24 * 60 * 60 * 1000 * (i-1));
					var recordStr = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
					this.weekSignRecord[i].date = recordStr;
					record.forEach((item,index)=>{												
						if( item == recordStr) {
							this.weekSignRecord[i].isSigned = true;
							return false;
						}
					})					
				}
				console.log(this.weekSignRecord);
				// this.weekSignRecord.unshift(this.weekSignRecord.pop());
			},
			share () {				
				var wxShareOptions = {
                        timeLine: {                                 
                            title: '健康打卡 | 每一天的坚持，让我过上自律的生活！',
                            link:shareLinkUrl,
                            imgUrl:'http://static.91160.com/wechat/img/common/healthtask.jpg',
                        },
                        appMessage: {
                            title: '健康打卡 | 每一天的坚持，让我过上自律的生活！',
                            desc: '我已经开始了我的健康计划，你也来一起参加吧!', // 分享描述
                            link: shareLinkUrl,
                            imgUrl: 'http://static.91160.com/wechat/img/common/healthtask.jpg',
                        },
                        callback: function() {

                        },
                        cancelCallback: function() {

                        }
                    }
                   
                // window.getNyAppShareParam = getNyAppShare; 
                // getNyAppShare(appShareOptions, this);
                wxShare(wxShareOptions, this);

			},
			getTaskList () {
				this.$http.get('/healthplan/tasklist.html').then((data)=>{
					var data = data.data.data;
					this.complete_total_count = data.complete_total_count;
					this.health_cate = data.health_cate;
					this.$nextTick(()=>{
						this.health_task = data.health_task;
					})
					this.dayTask = data.addTask || [];
					this.initActiveCateId();
					this.initTaskList();									
				
					setTimeout(()=>{//等待数据请求完毕之后,vue渲染需要时间
						this.initShowGuide();  
					},200)
				}).catch((err)=>{	
					console.log(err);
				})
			},
			getData(){//拉取用户信息
				api.getData((data)=>{
					this.recordStr = data.record;
					this.notice_switch = data.sign_notice && data.sign_notice.switch == 1 ? true:false;
					this.tip_time = (data.sign_notice && data.sign_notice.tip_time) || '08:00';					
					this.signPaper = data.signPaper;
					this.signTime = data.signTime;
					if(( this.signTime - 0 + 1 ) % 7 === 0) {//连续签到第七天经验值+20
						this.expValue = 20;
					}
					this.record = data.record.split(',');
					this.initSignState();
					this.initSignList();	
					if( data.record == '') {
						this.totalSigned = 0;
					}else {
						this.totalSigned =  data.record.split(',').length;
					}	
					this.addBanner = data.banner_ads
					this.exp = data.exp;
					this.level = data.level;
					this.trueName = data.trueName;
					this.avatar = data.avatar;
					this.luckyTimes = data.luckyTimes;
					this.addBanner.map((item,index)=>{
						item.image = GlobalSetteing.IMAGESDOMAIN + item.image;
					});					
				   
				},(error)=>{
					console.log(error);
				});
			},
			initShowGuide () {
				var isGuideShow = window.localStorage.getItem('isTaskGuideShow');
				if(!isGuideShow) {
					this.showGuide = true;
					this.flag = true;
					this.isSigned = true;
					if( this.dayTask.length === 0 ) {
						this.dayTask.push({
							id: "57",
							user_id: "27119322",
							mission_id: "57",
							e_mission_id: "59",
							create_date: "2017-11-01 10:47:23",
							complete_state: "0",
							complete_date: null,
							total: 2,
							test:1,
							complete_num: 0,
							title: "7天瘦身打卡计划",
							activity_id: "54",
							description: "7天改变，身轻如燕",
							thumb: "https://images.91160.com/integral/2017/09/092452650979.png",
							every_id: "58",
							every_title: "7天改变，身轻如燕",
							completed: 0
						})
					}
				}
			},
			getNyAppShare: function () {//app分享获取参数
	            var that = this;
	            that.cid = this.$route.query.cid
	            that.js_app_login_token = getAppToken(that.cid);
	            var code = this.$route.query.code;
	            var data_v = {
	                title: sharetitle,
	                details: description,
	                img: shareimg,
	                timeLineTitle: sharetitle,
	                timeLineDetails: description,
	                timeLineImg: shareimg,
	                shareurl: shareurl
	            }     
	            if (sharetitle && description && shareimg) {
	                this.$http({
	                    method: 'get',
	                    async: false,
	                    url: '/sys/appencrypt.html?cid=' + that.cid + '&jstoken=' + encodeURIComponent(that.js_app_login_token) + '&code=' + code + '&data=' + JSON.stringify(data_v)
	                }).then(
	                    function (res) {                        
	                        ret = res.data.data;                      
	                    }
	                )
	            }
	            return ret;
	        },
		},
		mounted(){	
			shareLinkUrl = getWeixinShareUrl(this);	
			shareurl = shareLinkUrl;
			this.getDot(); 			
			this.getData();	
			this.getTaskList();
			setTimeout(()=>{
				this.share();
				this.getNyAppShare();
			},500)					
        	window.getNyAppShareParam = this.getNyAppShare;		
		}
	}
</script>

<style scoped lang = 'scss'>
	.bor_t {
		border-top: 1px solid #f5f5f5;
	}
	.jyztip {
		position: absolute;
		width: 1.33333rem;
		height: 1.01333rem;
		text-align: center;
		background-color: #FFB937 ;
		color: #fff;
		bottom: 1.33333rem;
		left: -0.13333rem;
		border-radius: 0.10667rem;
		line-height: 0.48rem;
		transition: all 2s;
		opacity: 1;
		&.isSigned{
			bottom:2.13333rem;
			opacity: 0;
		}
		&::after {
			content:'';
			position: absolute;
		    width: 0;
		    height: 0;
		    top: 1.01333rem;
		    left: 0.58667rem;
		    border-left: 0.13333rem solid transparent;
		    border-right: 0.13333rem solid transparent;
		    border-top: 0.21333rem solid #FFB937;
		   
		}

	}
	.flip-container {
		perspective: 1000;
		/* flip the pane when hovered */
		&.active .flipper, &.active .flipper {
			transform: rotateY(180deg);
		}

		.flipper {
			width: 3.2rem;
			height: 3.2rem;
			margin: 0 auto;
		}
		/* flip speed goes here */
		.flipper {
			transition: 0.6s;
			transform-style: preserve-3d;

			position: relative;
		}

		/* hide back of pane during swap */
		.front, .back {
			backface-visibility: hidden;

			position: absolute;
			top: 0;
			left: 0;
		}

		/* front pane, placed above back */
		.front {
			z-index: 2;
		}

		/* back, initially hidden pane */
		.back {
			transform: rotateY(180deg);
		}
		.circle {
			width: 200px;
			height: 200px;
			border-radius: 50%;
		}
	}
	.mb40 {
		margin-bottom: 1.06667rem;
	}
	.dot {
		width: 0.16rem;
		height: 0.16rem;
		display: inline-block;
		border-radius: 50%;
		background-color: red;
		margin-bottom: 0.05333rem;
	}
	.totalSigned {
		font-size: 0.8rem;
		line-height: 1.12rem;
		color: #957EF4;
		padding-right: 0.05333rem;
	}
	.bang_img {
	    width: 0;
	    height:0;
	    position: absolute;
	    top: 0.53333rem;
	    left: 50%;
	    transform: translateX(-50%);
	    transition: all .5s;
	    transform-origin: center center; 
	}
	.bang_img.active {
	    width: 5.6rem;
	    height:4.0rem;
	    position: absolute;
	    top: 0.53333rem;
	    left: 50%;
	    transform: translateX(-50%);
	}
	.lhh40 {
		height: 1.06667rem;
		line-height: 1.06667rem;
	}
	.head_wave {
		background: url(./images/wave.png) 0 3.41333rem no-repeat, #00D3C0;
		background-size: 101% 72%;
		/*animation:move 1s infinite;*/
	}
	.head_wave.active{
	    background: url('./images/wave.png') 0 4.26667rem no-repeat, #00D3C0;
    	background-size: 102% 50%;
	}
	.mt2 {
		margin-top: 0.05333rem;
	}
	.pb40 {
		padding-bottom: 1.06667rem;
	}
	/*@keyframes move{
		from  {
			background: url(./images/wave.png) 0 176px no-repeat, #00D3C0;
		}
		to {
			background: url(./images/wave.png) 100% 176px no-repeat, #00D3C0;
		}
	}*/
	.swiper-container {
		width: 100%;
		overflow: visible;
	}
	.swiper-slide {
		width: auto;
	}
	.bor_bottom {
		border-bottom: 1px solid #F9F9F9 ;
	}
	.task_wrapper {
		width: 100%;
		overflow: hidden;
	}
	.pl5 {
		
		padding-left: 5px;
	}
	.pt40 {
		padding-top: 1.06667rem !important;
	}
	.c_CFCFCF {
		color: #CFCFCF;
	}
	.head_box {
		padding: 0.37333rem 0.53333rem;
		.tips {
			margin: 0 auto 0.53333rem;
			width: 7.86667rem;
			height: 4.0rem;
			background: rgba(1,200,184,.6);
			border-radius: 0.26667rem;
			padding-top: 2.0rem;
			margin-top: -2.13333rem;
		}
	}
	.line_under {
		text-decoration: underline;
	}
	.sign_btn {
		margin: 0 auto 20px;
		width: 3.2rem;
		height: 3.2rem;
		border-radius: 50%;
		padding-top: 0.66667rem;
		font-size: 0.48rem;
		line-height: 0.66667rem;
		text-align: center;	
		background-color: #FFCC41;
		border: 0.26667rem solid #01bfaf;
		transform:rotateY(0deg);
		transform:  all 1s;
		&.signed {
			font-size: 0.32rem;
			padding-top: 0.53333rem;			
		}
	}
	.sign_calender_box {
		padding: 0.4rem 0.53333rem;
		.calender_wrap {
			justify-content: space-between;
			>div {
				width: 0.64rem;
				height: 0.64rem;
				border-radius: 50%;
				line-height: 0.58667rem;
				text-align: center;
				background-color: #fff;
				border: 0.02667rem solid #E8E8E8;
				&.signed {
					background-color: #00d2c3 !important;
					color: #fff;
				}
				&.todayIsSigned {
					background-color: #FFD200 ;
					color: #fff;
				}
				&.passed {
					background-color: #E8E8E8 ;
					color: #fff;
				}
				&.today {
					width: 1.06667rem;
					height: 1.06667rem;
					line-height: 1.06667rem;
					margin-top: -10px;
					background-color: #FFD200 ;
					color: #fff;
					border: none;
				}
			}
			>div.iconfont {
				font-size: 0.64rem;
			}
		}
	}
	.line {
		display: inline-block;
		width: 0.08rem;
		height: 0.32rem;
		background-color: #00D3C2;		
	}
	.task_tabs {
		width: 200%;
		margin-left: -0.42667rem;		
		>li {
			padding: 0 0.42667rem;
			position: relative;
			&.active {
				color: #00d2c3;
			}
			/*&.active::after {
				content:'';
				position: absolute;
				width: 0.8rem;
				height: 2px;
				background-color: #00d2c3;
				left: 50%;
				transform: translateX(-50%);
				bottom: -2px;
				z-index: 10;
			}*/
		}
	}
</style>