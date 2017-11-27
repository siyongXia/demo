<template>
	<div  v-title  :data-title="taskdetail.title || '每日任务'" class="pl20 pr20 bg_white fullheight">
		<NavigateBar :options="navigateBarOptions" v-if="!commonIsApp"></NavigateBar>
		<loading v-if="isLoading"></loading>
		<div class="scroll_y" :class="{'mt48':!commonIsApp}">
			<div v-html="taskdetail.content" class="content pt15"></div>
			<router-link :to="'tasklist.html?task_id='+taskdetail.mission_id" class=" flex task_box bg_gray mt20 block" >
				<img :src="taskdetail.task_thumb"  alt="">
				<div class="flex-item">
					<div class="typo_middle c_333 lh22 elli w150">{{taskdetail.task_title}}</div>
					<div class="typo_smaller typo_dgrey lh18 overtwo w150">{{taskdetail.task_description}}</div>
				</div>
				<span  class="btn mt10">查看</span >
			</router-link>
		</div>
		
		<FullButton  
			:content="content" :bgColor="btnBgColor" :color="'#fff'" @click.native="completeTask()" >
		</FullButton>
		<!-- <btnGroup  v-else :taskId="task_id"></btnGroup> -->
		<MaskBox v-if="isShow" @click.native="hideMask()"></MaskBox>
		<!-- <img src="./images/complete.png"  alt="" class="center_img" :class="isShow ? 'active':''"> -->
		<!-- 任务全部完成 -->
		<template v-if="(taskdetail.complete_num - 0 + 1) == taskdetail.count_num ">
			<!-- 完成所有任务有抽奖 -->
			<div  class="center_img fs0  relative" :class="isShow ? 'active':''"  v-if="taskdetail.activity_id > 0">
				<div class="close" @click="isShow = false">&times;</div>
				<img src="./images/all_completed.png"  alt="" class="block ">
				<div class="tips textc typo_white fullwidth">
					<div class="fs22 mb5">恭喜你完成任务</div>
					<div class="fs16">马上去抽奖吧</div>
				</div>
				<a class="textc bg_white mt_1 block " :href="urlFormat('/hd/cj.html',{'activity_id':taskdetail.activity_id,'token':js_app_login_token,'cid':cid,'type':'task'})">				
					<span class=" fs18 inblo lottery ">立即抽奖</span>
				</a>
			</div>
			<!-- 完成所有任务没有抽奖 -->
			<div  class="center_img fs0  relative" :class="isShow ? 'active':''" v-else>
				<div class="close" @click="isShow = false">&times;</div>
				<img src="./images/no_lottery.png"  alt="" class="block ">
				<div class="textc bg_white mt_1 fs16 typo_black0">		
					<div class="lh22">恭喜你完成任务</div>		
					<div class="lh22">好的习惯值得坚持，继续努力哦</div>		
					<router-link to="taskindex.html" class=" fs18 inblo lottery ">添加其它任务</router-link>
				</div>
			</div>
		</template>
		<!-- 任务还没有全部完成 -->
		<template v-else> 
			<div  class="center_img fs0 " :class="isShow ? 'active':''">
				<div class="close" @click="isShow = false">&times;</div>
				<img src="./images/completed.png"  alt="" class="block">
				<div class=" fs16 textc wrap bg_white mt_1">
					<div class="c_333 fs18 mb5">已完成今日任务</div>
					<div class="typo_dgrey fs14"  v-if="taskdetail.activity_id > 0">记得坚持挑战,完成挑战即可抽奖！</div>
					<div class="typo_dgrey fs14"  v-else>每天努力一点，好的习惯值得坚持！</div>
					<div class="progress">
						<span :style="{width: (parseInt( taskdetail.complete_num ) + 1 ) / taskdetail.count_num * 100 + '%'}"></span>
						<div class="c_333 fs12 lh18 progress_number" :style="{left:(parseInt( taskdetail.complete_num ) + 1 ) / taskdetail.count_num * 100 + '%'}">{{ parseInt( taskdetail.complete_num ) + 1}}/{{taskdetail.count_num}}</div>
					</div>
				</div>
			</div>
		</template>
		
		
	</div>
</template>

<script>	
	import {  wxShare, getUrlParam, getAppToken,WxOath,getWeixinShareUrl} from '../../utils/util.js';
	var ret = '';
	var sharetitle, description, shareurl, shareimg,shareLinkUrl;
	import FullButton from 'components/common/FullBotton.vue'
	import NavigateBar from 'components/common/NavigateBar.vue';
	import MaskBox from 'components/common/Mask.vue'
	import * as api from './api/api.js'
	// import btnGroup from './ButtonBtnGroup.vue'
	import {mapGetters} from 'vuex';
	export default {
		data(){
			return {
				htmlTitle:'颈椎自测',
				isShow:false,
				content:'点击完成打卡',
				taskdetail:'',
				complete_state:0,
				task_id:'',
				cid:'',
				js_app_login_token:'',
				btnBgColor:'#00D2C3',
				navigateBarOptions:{
					iconLeftCode:'&#xe60e;',
					title:'任务详情',
					bgColor:'#fff',
					color:'#000'
				},
			}
		},
		methods:{
			completeTask(){
				if( this.complete_state === '0') {
					var every_id = this.taskdetail.id,
						task_id = this.task_id;
					api.completeTask({every_id,task_id},(data)=>{
						this.isShow = true;
						this.complete_state = 1;
						this.content = '已完成，查看其他任务';
						this.btnBgColor = '#FFB937';
					},(error)=>{
						console.log(error);
					})
				}else {
					this.$router.push({path:'taskindex.html'})
				}
				
				
			},
			hideMask(){
				this.isShow = false;
			},
			getTodayTask(task_id){
				api.getTodayTask({task_id},(data)=>{
					this.taskdetail = data.data;
					this.taskdetail.title = data.data.title;
					this.complete_state = data.data.complete_state;
					this.content = this.complete_state == 1 ? '已完成，查看其他任务' : '点击完成打卡';
					this.btnBgColor = this.complete_state == 1 ? '#FFB937' : '#00D2C3';
					this.navigateBarOptions.title = data.data.task_title;
					var wxShareOptions = {
                        timeLine: {                                 
                            title: `我开始了「${this.taskdetail.task_title}」，已完成${this.taskdetail.complete_num}天，你也来参加吧！`,
                            link: shareLinkUrl,
                            imgUrl:this.taskdetail.task_thumb,
                        },
                        appMessage: {
                            title: `我开始了「${this.taskdetail.task_title}」，已完成${this.taskdetail.complete_num}天，你也来参加吧！`,
                            desc: '我已经开始了我的健康计划，你也来一起参加吧!', // 分享描述
                            link: shareLinkUrl,
                            imgUrl: this.taskdetail.task_thumb,
                        },
                        callback: function() {

                        },
                        cancelCallback: function() {

                        }
                    };
	                wxShare(wxShareOptions, this);
                    sharetitle = `我开始了「${this.taskdetail.task_title}」，已完成${this.taskdetail.complete_num}天，你也来参加吧！`;
                    description = '我已经开始了我的健康计划，你也来一起参加吧!';
                    shareurl = shareLinkUrl;
                    shareimg = this.taskdetail.task_thumb;                   
	                this.getNyAppShare();
				},(err)=>{

				})
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
	                shareurl: 'https://weixin.91160.com/vue/health/taskindex.html'
	            }   
	            console.log(data_v);       
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
		computed:{
			...mapGetters([
				'isLoading',
				'commonIsApp'
			])
		},
		components:{
			FullButton,MaskBox,NavigateBar
		},
		mounted(){
			this.task_id = this.$route.query.task_id;
			shareLinkUrl = getWeixinShareUrl(this,'task_id='+this.task_id);
			this.getTodayTask(this.task_id);
			window.getNyAppShareParam = this.getNyAppShare;
		}
	}
</script>

<style scoped lang = 'scss'>
	.progress_number {
		position: absolute;
		top: 0.4rem;
		transform: translateX(-50%);
	}
	.mt_1 {
		margin-top: -0.02667rem;
		border-radius: 0 0 0.21333rem 0.21333rem;
	}
	.scroll_y {
		overflow: scroll;
		height: 100%;
		padding-bottom: 2.13333rem;
	}
	.w150 {
		width: 150px;
	}
	.banner {
		width: 100%;
		height: 3.33333rem;
	}
	.center_img {
		position: fixed;
		width: 8.0rem;
		/*height: 5.6rem;*/
		border-radius: 0.26667rem;
		transition: all 0.5s;
		top: 50%;
		left: 50%;
		z-index: 9999999999;
		transform: scale(0) translate(-50%,-50%);
		.close {
		    position: fixed;
		    right: -10px;
		    top: -10px;
		    color: #fff;
		    font-size: 0.53333rem;
		    /* padding: 5px; */
		    border: 1px solid #fff;
		    border-radius: 50%;
		    height: 0.53333rem;
		    line-height: 0.48rem;
		    width: 0.53333rem;
		    text-align: center;
		    z-index: 100014;
		}
		.wrap {
			padding: 0 0.8rem 0.8rem;
			border-radius: 0 0 0.21333rem 0.21333rem;
		}
		.progress {
			width: 100%;
			height: 0.26667rem;
			background-color: #f5f5f5;
			border-radius: 0.26667rem;
			margin-top:0.66667rem;
			margin-bottom: 0.13333rem;
			position: relative;
			span {
				position: absolute;
				left: 0;
				top: 0;
				height: 100%;
				border-radius: 0.26667rem;
				background-color: #62CD02;
			}
		}
		.tips {
			position: absolute;
			top: 1.01333rem;
			left: 0;
		}
		.lottery {
			height: 0.96rem;
			line-height: 0.96rem;
			border-radius: 0.96rem;
			padding: 0 1.01333rem;
			margin-top:0.8rem;
			margin-bottom: 0.96rem;
			color: #fff;
			background-color: #00d2c3;

		}
	}
	.center_img.active {
		transform: scale(1) translate(-50%,-50%);
	}	
	.task_box {
		padding: 0.21333rem 0.4rem;
		>img {
			width: 1.44rem;
			height: 1.44rem;
			border-radius: 50%;
			margin-right: 0.48rem;	
		}
		>.btn {
			width: 1.73333rem;
			height: 0.8rem;
			line-height: 0.8rem;
			text-align: center;
			color: #fff;
			background-color: #00d2c3;
			border-radius: 0.8rem;
		}
	}
</style>