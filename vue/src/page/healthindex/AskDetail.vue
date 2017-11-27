<template>
		<div class="healthindex"  v-title data-title="匿名提问">
			<x-header :left-options="{backText: ''}"  v-if="!commonIsApp">匿名提问</x-header>
			<div class="sub_item ">匿名提问</div>
			<div class="pl15 pr20 bg_white pt15 pb15">
				<div class="clearfix1 mb5">				
					<img src="../../static/avatar_user_0.jpg" height="300" width="300" alt="" class="avatar fl mr5" v-if="askInfo.userSex == 0">
					<img src="../../static/avatar_user_1.jpg" height="300" width="300" alt="" class="avatar fl mr5" v-else>
					<span class="fs16 lh30 c_333">{{askInfo.userPhone}}</span>
				</div>	
				<div class="pl35"> 				
					<div class="c_333 fs16 lh20 mb5">{{askInfo.content}}</div>
					<div class="fs12 typo_gray">{{askInfo.addTime}}</div>
				</div>
			</div>
			<div class="sub_item">医生回答</div>
			<div>
				<div class="pl15 pr20 bg_white pt15 answer_item " v-for="(item,index) in answer_list">		
					<div class="clearfix1 mb5" >						
						<img :src="item.doctorId != '0' ? item.doctor.image : item.unit.image " alt="" class="avatar fl mr5">
						<div class="fl w200 ">
							<div class="c_333 fs16 lh20 ">{{  item.doctorId != '0' ? item.doctor.doctor_name : '医院客服'}}</div>
							<div class="typo_gray elli">{{ item.unit.unit_name }}</div>
						</div>
						<a :href="'/doctor/detail.html?unit_id='+item.unitId+'&dep_id='+item.doctor.dep_id+'&doc_id='+item.doctorId+'&type=askdoc'"
							v-if="item.doctorId != '0'"
							class="fr btn mt5">向TA提问</a>
					</div>	
					<div class="pl35 pb15" :class="index === (answer_list.length - 1) ?'':'bor_b' "> 				
						<div class="c_333 fs16 lh20 mb5" v-html="item.content"></div>
						<div class="fs12">
							<span class="bg_FEF mr10 pl5 pr5 c_333" v-if="item.isBest === '1'">最佳答案</span>
							<span>回答时间：{{item.addTime}}</span>
						</div>
					</div>
				</div>
			</div>				
			<subTitle title="更多相关问题" v-if="question_list && question_list.length > 0"></subTitle>
			<div class="bg_white questions" >
				<router-link :to="'./askdetail.html?id='+item.questionId" v-for="(item,index) in question_list" class="pl30 block">					
					<Question :question="item.content" :type="1"></Question>
				</router-link>
			</div>
		</div>		
</template>
<script>
	var ret = '';
	var sharetitle, description, shareurl, shareimg;
	import { XHeader } from 'vux'
	import subTitle from '../../components/common/SubTitle.vue'
	import Question from './components/Question.vue'
	import { wxShare,getAppToken } from '../../utils/util.js'
	import { mapGetters } from 'vuex'
	export default {
		data(){
			return {
				question_id:'',
				askInfo:{},
				question_list:[],
				answer_list:[]
			}
		},
		computed:{
			...mapGetters([
				'commonIsApp'
			])
		},
		watch: {
			$route () {
				window.scrollTo(0,0);
				this.getQuestionDetail()
			}
		},
		methods:{
			getQuestionDetail () {	
				this.question_id = this.$route.query.id;			
				this.$http.get('/health/getquestiondetail.html',{params:{question_id:this.question_id }}).then((data)=>{
					this.askInfo = data.data.data;
					this.question_list = data.data.question_list.data;
					this.answer_list = data.data.answer_list.data;
					shareimg = 'http://static.91160.com/wechat/img/common/logo.jpg';
					sharetitle  = '健康160-' + this.askInfo.content;
		            description ='健康问答,小六推荐';
		            var shareImage = shareimg;
		            shareurl = 'https://weixin.91160.com/vue/health/askdetail.html?id=' + this.question_id;
					var wxShareOption = {
						title:sharetitle,
						description:description,
						image:shareImage,
						shareUrl:shareurl
					}
					this.share(wxShareOption);
					this.getNyAppShare();
				}).catch((err)=>{
					console.log(err);
				})
			},
			share (option) {
				var wxShareOptions = {
	                    timeLine: {                                 
	                        title: option.title,
	                        link: option.shareUrl,
	                        imgUrl:option.image,
	                    },
	                    appMessage: {
	                        title: option.title,
	                        desc: option.description, // 分享描述
	                        link:option.shareUrl,
	                        imgUrl: option.image,
	                    },
	                    callback: function() {

	                    },
	                    cancelCallback: function() {

	                    }
	                }
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
	            console.log(data_v) ; 
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
			this.getQuestionDetail();
			window.getNyAppShareParam = this.getNyAppShare;	
		},
		components:{
			XHeader,
			subTitle,
			Question
		}
	}
</script>

<style scoped lang="scss">
	.w200 {width:5.33333rem;}
	.lh30 {
		line-height:0.8rem;
	}
	.sub_item {
		padding:0.37333rem 0 0.10667rem 0.4rem ;
		line-height:0.53333rem;
		color:#707070;
	}
	.avatar {
		width:0.8rem;
		height:0.8rem;
		border-radius:50%;
		overflow:hidden;
	}
	.pl35 {
		padding-left: 0.93333rem;
	}
	.btn {
		width:2.13333rem;
		height:0.8rem;
		line-height:0.8rem;
		text-align: center;
		color:#fff;
		background-color: #00d2c3;
		border-radius:0.4rem;
	}
	// .answer_item:last-child {
	// 	border: none;
	// }
	.questions {
		padding:0.4rem 0.4rem 0.53333rem 0.53333rem;
	}
</style>