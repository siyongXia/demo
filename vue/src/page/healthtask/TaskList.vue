<template>
	<div class="bg_white list_wrap fullheight pb60" v-title :data-title="taskInfo.title">
		<loading v-if="isLoading"></loading>
		<NavigateBar :options="navigateBarOptions" v-if="!commonIsApp" ></NavigateBar>
		<template v-if="!showRegular">
			<img :src="taskInfo.cover" alt="" class="banner" :class="{'mt48':!commonIsApp}">		
			<div class="p20 typo_middle ">
				<div class="typo_dgrey lh24 mb10">{{taskInfo.mission_desc}}</div>
				<div class="desc">
					<div class="desc_item ">任务难度系数：
						<span class="iconfont orange mr5 vat lh28" v-for="item in parseInt(taskInfo.degree) ">&#xe628;</span>
					</div>
					<div class="desc_item"><span>使用人群：{{taskInfo.population}}</span></div>
					<div class="desc_item">任务周期：{{taskInfo.cycle}}天</div>
				</div>
				<div class="content mt20 ">
					<div class="mb10 c_333">内容：</div>
					<ul class="typo_dgrey typo_smiddle lh28">
						<li v-if="taskInfo.every_list" v-for="(item,index) in taskInfo.every_list ">
							<i class="iconfont fs20 align_middle" :class="index <= parseInt(taskInfo.complete_num) ? 'typo_green':'c_gray'">&#xea53;</i>	
							DAY{{index}} : {{item}}
						</li>
					</ul>					
				</div>
			</div>	
			<!-- <div style="height:1.33333rem;"></div> -->
			<template  v-if="isComplete == 1">			
				<FullButton :content="'再次挑战'" :bgColor="'#00D2C3'" :color="'#fff'" @click.native="challenge()"></FullButton>
			</template>
			<template v-else>
				<FullButton :content="'我要挑战'" :bgColor="'#00D2C3'" :color="'#fff'" v-if="isAdd == 0" @click.native="challenge()"></FullButton>
				<btnGroup v-else :taskId="task_id" @show="showRegularBox()"></btnGroup>
			</template>
		</template>
		<template v-else>
			<div :class="{'hasNavigateBar':!commonIsApp}"></div>
			<div class="illu_wrap bg_white mt10 " v-html="taskInfo.mission_rule"></div>
			<div class="b_button lhh50 flex typo_middle">
				<div @click="delTask()" class="flex-item buttom-item">删除任务</div>
				<div @click="iknow()" class="flex-item buttom-item active">知道了</div>
			</div>
		</template>
		
	
	</div>
</template>

<script>	
	import {  wxShare, getUrlParam, getAppToken,WxOath,getWeixinShareUrl} from '../../utils/util.js';
	var ret = '';	
	var sharetitle, description, shareurl, shareimg,shareLinkUrl;
	import FullButton from '../../components/common/FullBotton.vue';
	import btnGroup from './ButtonBtnGroup.vue';
	import * as api from './api/api.js';
	import {Toast} from 'mint-ui';
	import NavigateBar from '../../components/common/NavigateBar.vue';
	import {mapGetters} from 'vuex';
	export default {
		data(){
			return {
				showRegular:false,
				task_id:'',
				taskInfo:{degree:1,every_list:[],title:'健康任务'},
				isAdd:0,
				isComplete:0,
				today_every_id:'',
				cid:'',
				js_app_login_token:'',
				navigateBarOptions:{
					iconLeftCode:'&#xe60e;',
					title:'早起打卡',
					bgColor:'#FFF',
					iconClass:'typo_green',
					color:'#000',
					iconRightCode:'',
					menuClass:'typo_green'
				}
			}
		},
		computed:{
			...mapGetters([
				'isLoading',
				'commonIsApp'
			])
		},
		methods:{
			challenge(){
				var task_id = this.task_id;
				api.addTask({task_id},(data)=>{					
                    if(data.state > 0) {
                    	Toast({
	                        message: '添加成功',
	                        position: 'middle',
	                        duration: 1000,
	                        className: 'c_white'
	                    }); 
                    	this.isAdd = 1;
                    	if(this.isComplete == 1) {
                    		this.isComplete = 0;
                    		this.taskInfo.complete_num  = 0;
                    	}
                       // this.$router.push({path:'taskdetail.html?task_id='+task_id});
                    }else {
                    	Toast({
	                        message: data.msg,
	                        position: 'middle',
	                        duration: 1000,
	                        className: 'c_white'
	                    }); 
                    }
               },(error)=>{
                console.log(error);
               })
				
			},
			showRegularBox () {
				this.showRegular = true;
			},
			iknow () {
				this.showRegular = false
				this.navigateBarOptions.title = this.taskInfo.title;
			},
			delTask(){
				var task_id = this.task_id;
				api.delTask({task_id},(data)=>{
					if(data.state == 1) {
						Toast({
							message: data.msg,
							position: 'middle',
							duration: 1000,
							className: 'c_white'
						});
						setTimeout(()=>{
							this.$router.push({path:'taskindex.html'});
						},1000)
					}
				},(error)=>{
					console.log(error);
				})
			},
			getHealthTask(task_id){
				api.getHealthTask({task_id},(data)=>{
					if(data.state == 1) {
						this.taskInfo = data.data;
						this.today_every_id = data.data.today_every_id;
						this.navigateBarOptions.title = data.data.title;
						this.isAdd = data.data.isAdd;
						this.isComplete = data.data.isComplete;	
						sharetitle = `我开始了「${this.taskInfo.title}」，已完成${this.taskInfo.complete_num}天，你也来参加吧！`;
						description = '我已经开始了我的健康计划，你也来一起参加吧!';
						shareurl = shareLinkUrl;
						shareimg = this.taskInfo.thumb;			
						this.share();
						this.getNyAppShare();
					}
				},(err)=>{
					console.log(err)
				})
			},
			share () {
				var wxShareOptions = {
                    timeLine: {                                 
                        title: `我开始了「${this.taskInfo.title}」，已完成${this.taskInfo.complete_num}天，你也来参加吧！`,
                        link: shareLinkUrl,
                        imgUrl:this.taskInfo.thumb,
                    },
                    appMessage: {
                        title: `我开始了「${this.taskInfo.title}」，已完成${this.taskInfo.complete_num}天，你也来参加吧！`,
                        desc: '我已经开始了我的健康计划，你也来一起参加吧!', // 分享描述
                        link: shareLinkUrl,
                        imgUrl: this.taskInfo.thumb,
                    },
                    callback: function() {

                    },
                    cancelCallback: function() {

                    }
                };
               
                wxShare(wxShareOptions, this);
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
	        }
		},
		mounted(){
			this.task_id = this.$route.query.task_id;
			shareLinkUrl = getWeixinShareUrl(this,'task_id='+this.task_id);
			this.getHealthTask(this.task_id);
			window.getNyAppShareParam = this.getNyAppShare;
		},
		components:{
			FullButton,
			btnGroup,
			NavigateBar
		}
	}
</script>

<style scoped lang = 'scss'>
	.fullheight {
		min-height: 100%;
	}
	.c_gray {
		color: #E8E8E8 ;
	}
	.lh28 {
		line-height:0.746666rem;
	}
	.pb60 {
		padding-bottom: 1.6rem !important;
	}
	.vat {
		vertical-align: top;
	}
	.orange {
		color: #FFCD35 ;
	}
	.list_wrap {
		height: 100%;
		overflow-x: hidden;
	}
	.lh28 {
		line-height: 0.74667rem;
	}
	.banner {
		/*margin-top: 1.28rem;*/
		width: 100%;
		height: 3.33333rem;
	}
	.p20 {
		padding: 0.53333rem;
	}
	.desc {		
		>.desc_item {
			font-size: 0.42667rem;
			line-height: 0.74667rem;
			color: #333;
		}
	}
	.red {
		color:red;
	}
	.illu_wrap {
		padding:0.72rem 0.53333rem 0.29333rem; 
		line-height:0.66667rem;
		min-height:14.93333rem;
		.section {
			margin-bottom:0.66667rem;
		}
	}
	.lhh50 {
		line-height: 1.33333rem;
		height: 1.33333rem;
	}
	.b_button {
		position: fixed;
		width: 100%;
		text-align: center;
		bottom: 0;
		border: 1px solid #f1f1f1;
		>.buttom-item {
			background-color: #fff;
			color: #00d2c3;
			display: block;
			&.active {
				background-color: #00d2c3;
				color: #fff;
			}
		}
	}
</style>