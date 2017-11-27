<template>
	<div class="task_wrapper bg_gray" v-title data-title="健康任务">
		<loading v-if="isLoading"></loading>
		<NavigateBar :options="navigateBarOptions"></NavigateBar>
		<!-- 头部 -->
		<div class="head_wave" :class="isSigned?'active':''">
			<div class=" typo_white head_box relative">
				<!-- <img src="./images/wave.png" alt=""> -->
				<div class="textr">
					<span>打卡提醒</span>
					<mt-switch v-model="notice_switch" class="fr ml10 mt2" @click.native="switchNotice()">开关</mt-switch>
				</div>
				<div class="sign_btn relative" v-if="!isSigned" @click="sign()" >
					<span>签到</span><br><span>打卡</span>
				</div>
				<div v-else >
					<div  class="sign_btn  relative signed">
						<span>累计打卡</span><br><span><i class="totalSigned">{{totalSigned}}</i>天</span>
					</div>
					<div class="tips typo_small  textc " v-html="signPaper"></div>	
					<img src="./images/signed.png" class="bang_img" alt="">			
				</div>
				
				<div class="typo_small" v-if="notice_switch">当天{{tip_time}}提醒<span class="ml10 line_under"  @click="openPicker()">修改</span></div>
				<mt-datetime-picker
				ref="picker"
				type="time"
				@confirm="handleConfirm"
				v-model="pickerValue">
			</mt-datetime-picker>
		</div>			
	</div>
	<!-- 日历 -->
	<div class="sign_calender_box bg_white mb10 ">
		<div class="clearfix  c_333 mb20 lh20 typo_small" @click="showCalender()">
			<span class="fl">签到统计</span>
			<span class="fr">已连续签到<span class="typo_green">{{signTime}}</span>天<span class="iconfont c_CFCFCF pl5">&#xe619;</span></span>
		</div>
		<div class="calender ">
			<div class="flex calender_wrap typo_dgrey mb5">
				<div>一</div>
				<div>二</div>
				<div>三</div>
				<div>四</div>
				<div>五</div>
				<div>六</div>
				<div>日</div>
			</div>
			<div class="flex calender_wrap">
				<div class="iconfont " v-for="(item,index) in weekRecord" :class="item ? 'typo_green':''">&#xea53;</div>	
			</div>				
		</div>
	</div>
	<Calender :record="recordStr"></Calender>
	<!-- 每日任务 -->
	<div class="  mb10" v-if="dayTask && dayTask.length > 0">
		<div class="bor_bottom pl20 pr20 lhh40 typo_smiddle typo_dgrey bg_white clearfix">每日打卡健康任务
			<span @click="gotoTaskIllustrate()" to="" class="fr lhh40"><i class="dot mr10" v-if="isDotShow"></i>打卡有礼<span class="iconfont c_CFCFCF pl5">&#xe619;</span></span>
		</div>
		<Spread :height="'7.73333rem'" :length="dayTask.length">					
			<div class=" mb40 bg_white mt20">
				<SignTask v-for="(item,index) in dayTask" :infos="item" :type="1" ></SignTask>
			</div>						
		</Spread>	
	</div>
		
	<!-- 任务List -->
	<div class="bg_white overSwiper" >
		<swiper :options="swiperOption" ref="mySwiper" class=" bor_bottom">
			<!-- slides -->
			<swiper-slide>
				<ul class="flex task_tabs lhh40 pl20 pr20 typo_smiddle " @click="switchCate($event)">
					<li v-for="(item,index) in health_cate" style="flex-shrink:0"
						:data-index="index" :class="activeCateId == index ? 'active':''">{{item}}</li>
						<!-- 这个坑搞不定 -->
						<li v-for="item in 2"></li>
				</ul>	
			</swiper-slide>
		</swiper>			
		<!-- tabs -->
		<div class="mt20 pb20 bg_white" v-for="(tasks,i) in health_task" v-if="activeCateId == i">
			<SignTask v-for="(item,index) in health_task[i]" :infos="item" :type="item.is_complete ? 6 : item.is_add ? 5:4"  @newTask="addTaskToDayTask"></SignTask>
		</div>
	</div>
</div>
</template>

<script>	
	"use strict"
	import SignTask from './SignTask.vue';	
	import Spread from '../../components/Spread.vue';
	import Vue from 'vue';
	import Calender from '../../components/Calender.vue'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import { Switch ,DatetimePicker,Toast} from 'mint-ui';
	import NavigateBar from '../../components/common/NavigateBar.vue';
	import {mapGetters} from 'vuex';
	import * as api from './api/api.js';
	import { getNyAppShare, wxShare } from '../../utils/util.js';
	Vue.component(Switch.name, Switch);
	Vue.component(DatetimePicker.name, DatetimePicker);
	export default {
		data(){
			return {
				ajaxFlag:true,
				totalSigned:0,
				isDotShow:true,
				notice_switch:false,
				isSigned:false,
				activeCateId:'',
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
				recordStr:'',
				dayTask:[],
				taskList:[],
				swiperOption: {
					direction: 'horizontal',
					slidesPerView: 'auto',
					mousewheelControl: true,
					freeMode: true,
				    roundLengths : true, //防止文字模糊
				},
				navigateBarOptions:{
					iconLeftCode:'&#xe60e;',
					title:'早起打卡',
					bgColor:'#00d2c3',
					color:'#fff',
					iconClass:'c_white',
					iconRightCode:''
				},
			}
		},
		components:{
			SignTask,
			Spread,
			Calender,
			swiper,
			swiperSlide,
			NavigateBar
		},
		computed:{
			...mapGetters([
				'isLoading'
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
			gotoTaskIllustrate () {
				
				if(this.isDotShow) {
					window.localStorage.setItem('isDotShow','1');
				}
				this.$router.push({path:'taskIllustrate.html'})
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
			},
			initSignState(){//初始化签到状态
				console.log(this.record[0] == this.getToday())
				if(this.record[0] == this.getToday()) {
					this.isSigned = true;
				}
			},
			getToday(){//获取当前的日期,格式2017-7-21
				var day = new Date();
				return day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate();
			},
			sign(e){//签到打卡	
				api.signIn((data)=>{
					this.isSigned = true;
					this.signTime = data.signTime;
					this.record.push(this.getToday());//更新本周签到记录
					this.initSignList();
					this.recordStr =　this.getToday() +','+ this.recordStr;
					this.totalSigned +=1 ;
				    Toast({
                        message: '签到成功!',
                        position: 'middle',
                        duration: 1000,
                        className: 'c_white'
                    });
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
				

			},
			addTaskToDayTask(infos){
				var tmp = JSON.parse(JSON.stringify(infos));
				tmp.completed = 0;
				this.dayTask.unshift(tmp);
				var health_task = this.health_task;
				for(var k in health_task) {
					health_task[k].map((item,index)=>{
						if(item.id == tmp.id) {
							item.is_add = 1;
							return false;
						}
					})
				}
			},
			share () {
				var wxShareOptions = {
                        timeLine: {                                 
                            title: '健康打卡 | 每一天的坚持，让我过上自律的生活！',
                            link: '',
                            imgUrl:'http://static.91160.com/wechat/img/common/healthtask.jpg',
                        },
                        appMessage: {
                            title: '健康打卡 | 每一天的坚持，让我过上自律的生活！',
                            desc: '我已经开始了我的健康计划，你也来一起参加吧!', // 分享描述
                            link: '',
                            imgUrl: 'http://static.91160.com/wechat/img/common/healthtask.jpg',
                        },
                        callback: function() {

                        },
                        cancelCallback: function() {

                        }
                    },
                    appShareOptions = {
                        title: '健康打卡 | 每一天的坚持，让我过上自律的生活！',
                        details: '我已经开始了我的健康计划，你也来一起参加吧!',
                        img: 'https://static.91160.com/wechat/img/common/healthtask.jpg',
                        timeLineTitle: '健康打卡 | 每一天的坚持，让我过上自律的生活！',
                        timeLineDetails: '我已经开始了我的健康计划，你也来一起参加吧!',
                        timeLineImg: 'https://static.91160.com/wechat/img/common/healthtask.jpg',
                        shareurl: location.href
                    }
                wxShare(wxShareOptions, this);
                getNyAppShare(appShareOptions, this);
                window.getNyAppShareParam = getNyAppShare; 
			},
			getData(){//拉取用户信息
				api.getData((data)=>{
					this.recordStr = data.record;
					this.notice_switch = data.sign_notice && data.sign_notice.switch == 1 ? true:false;
					this.tip_time = (data.sign_notice && data.sign_notice.tip_time) || '08:00';
					this.health_cate = data.health_cate;
					this.signPaper = data.signPaper;
					this.signTime = data.signTime;
					this.record = data.record.split(',');
					if( data.record == '') {
						this.totalSigned = 0;
					}else {
						this.totalSigned =  data.record.split(',').length;
					}
					this.health_task = data.health_task;
					this.dayTask = (data.addTask && data.addTask.reverse() ) || [];
					this.initActiveCateId();
					this.initTaskList();
					this.initSignState();
					this.initSignList();
				   
				},(error)=>{
					console.log(error);
				});
			}
		},
		mounted(){		
			this.getDot();   
			this.getData();
			this.share();

		}
	}
</script>

<style scoped lang = 'scss'>
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
		margin-top: 1.28rem;
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
		border-bottom: 2px solid #F9F9F9 ;
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
		&.signed {
			font-size: 0.32rem;
			padding-top: 0.53333rem;
		}
	    /*background: -webkit-radial-gradient(center, circle #FFCC41 0px, #FFCC41 48px, #01bfaf 48px, #01bfaf 59px);*/
	}
	.sign_calender_box {
		padding: 0.4rem 0.53333rem;
		.calender_wrap {
			justify-content: space-between;
			>div {
				width: 0.64rem;
				text-align: center;
			}
			>div.iconfont {
				font-size: 0.64rem;
			}
		}
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
			&.active::after {
				content:'';
				position: absolute;
				width: 0.8rem;
				height: 2px;
				background-color: #00d2c3;
				left: 50%;
				transform: translateX(-50%);
				bottom: -2px;
				z-index: 10;
			}
		}
	}
</style>