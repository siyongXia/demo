<template>
	<div>
		<NavigateBar :options="navigateBarOptions" v-if="isNotApp"></NavigateBar>	
		<audio preload="auto"  style="height:0;" ref="audio">           
            Your browser does not support the audio element.您的浏览器不支持 audio 标签。
        </audio>
        <div class="content_body clearfix fullheight">
        	
        	<div :class="isNotApp?'hasNavigateBar':''"  :style="{'padding-bottom': (isFunctionBoxShow ? '3.68rem' :'1.25333rem')} ">
				<div class="reply_tips textc typo_white bg_orange lhh38" :class="isNotApp ? 'top48':''" v-if="leftTime > 0" >您可以免费回复{{replyCount}}次</div>
				<div class="reply_tips textc typo_white bg_orange lhh38" :class="isNotApp ? 'top48':''"  v-else>本次病情回访已结束</div>
				<div class="lhh38"></div>	
				<!-- <div class="textc" v-if="showLoading">
		    		<img src="https://static.91160.com/wechat/img/healthmall/loading.gif" alt=""  class="loadmore_icon">数据加载中
				</div> -->
		    	<!-- 聊天窗内容 -->
		    	<scroller lock-x scrollbar-y use-pulldown :height="scrollHeight-10 + 'px'" @on-pulldown-loading="loadmore" ref="demo3" v-model="status2">
        			<div class="msg_wrap">			
						<!-- 就诊卡 -->
							<!-- <div class="msg mb15 clearfix1">
								<img :src="user.avatar" alt="" class="avatar fr">
								<div class="fr mr15 card typo_white">
									<div class="bg_green card_title fs16"><i class="iconfont pr5 fs18">&#xe6a7;</i>病情描述</div>
									<div class="bg_white card_content">
										<div class="lh20 mb15">
											<div class="typo_black0">疾病名称</div>
											<div class="typo_gray">balabala</div>
										</div>
										<div ref="disease_des"  :class="isSpeadBtnShow ? 'h40':''" class="clearfix">
											<div class="lh20 mb15">
												<div class="typo_black0">疾病状况</div>
												<div class="typo_gray  break-all overtwo"  >{{str}}</div>
											</div>
											<div>
												<div class="typo_black0">病历/检查单照片</div>
												<ul class="flex flex_wrap">
													<li v-for="item in 4" class="backgroundimg disease_img" style="background-image:url('http://photo.91160.com/ask/2017/08/1503477894690021/16/1503905010/64929a834b35fd8dcb13eb948994a2d4.jpg">1</li>
												</ul>
											</div>									
										</div>								
										<template v-if="isSpeadBtnShow">
											<div class="typo_gray textc" v-if="spreadBtn" @click="lookMore(1)">展开查看全部<i class="iconfont pl5">&#xe625;</i></div>
											<div class="typo_gray textc" v-else @click="lookMore(2)">收起<i class="iconfont pl5">&#xe626;</i></div>		
										</template>		
									</div>
								</div>
							</div> -->
						<template v-for="(item,index) in  list">
							<!-- 消息-时间 -->
							<div class="msg mb15 clearfix1 textc" v-if="item.isTimeShow">
								<div class="timestamp ">{{ item.server_time | timeFormat }}</div>
							</div>
							<!-- 普通文本 -->
							<div class="msg mb15 clearfix1" :id="'id'+item.send_time" v-if="item.content.type == 1 && item.sender_uid != 0">
								<!-- 自己 -->
								<template v-if="item.sender_uid == user.user_id">
									<img :src="user.avatar" alt="" class="avatar fr">
									<span class="fr msg_content mr15 self bg_green typo_white" v-html="item.content.text"></span>
									<img v-if="item.loading == 1" class="fr msg_loading" src="https://static.91160.com/wechat/img/healthmall/loading.gif" alt="">
								</template>
								<!-- 别人 -->
								<template v-else>
									<img :src="doctor.avatar" alt="" class="avatar fl">
									<span class="fl msg_content ml15 other bg_white typo_gray"  v-html="item.content.text"></span>
								</template>							
							</div>
							<!-- 消息-通知 系统文本 -->
							<div class="msg mb15 clearfix1 textc" :id="'id'+item.send_time" v-if="item.content.type == 1 && item.sender_uid == 0">
								<div class="notice typo_white  ">{{item.content.text}}</div>
							</div>
							<!-- 图片 -->
							<div class="msg mb15 clearfix1" :id="'id'+item.send_time" v-if="item.content.type == 2">
								<!-- 自己 -->
								<template v-if="item.sender_uid == user.user_id">
									<img :src="user.avatar"  alt="" class="avatar fr">
									<span class="fr pr msg_content mr15 self bg_green typo_white">
										<img class="previewer-demo-img lazyload" 
										:src="item.content.url"
										@click="preview($event)"
										alt="">
										<img v-if="item.loading == 1" class="fr img_loading" src="https://static.91160.com/wechat/img/healthmall/loading.gif" alt="">
									</span>
								</template>
								<!-- 别人 -->
								<template v-else>
									<img :src="doctor.avatar" alt="" class="avatar fl">
									<span class="fl msg_content ml15 other bg_white">
										<img class="previewer-demo-img lazyload"  
										:src="item.content.url"
										@click="preview($event)" alt="">
									</span>
								</template>							
							</div>
							<!-- 语音 -->
							<div class="msg mb15 clearfix1" :id="'id'+item.send_time"  v-if="item.content.type == 3" :data-messageId ='item.message_id'>
								<template v-if="item.sender_uid == user.user_id">
									<img :src="user.avatar"  alt="" class="avatar fr">
									<span class="fr pr msg_content mr15 self bg_green typo_white" @click="download_app()">您发了一条语音消息
									<div>下载 <i class="typo_red">健康160APP</i> 收听</div>
									</span>
								</template>
								<template v-else>
									<img :src="doctor.avatar"  alt="" class="avatar fl">
									<span class="fl msg_content ml15 other bg_white typo_gray" @click="download_app()">医生给你发了条语音消息,请下载
										<i class="typo_red">健康160APP</i> 收听
									</span>
									<!-- <div class="audio ml15 fl " 
										:style="{'width':(200/60*item.content.duration/37.5)+'rem','min-width':'1.33333rem'}" 
										:class="{'play':activeAudioid == item.message_id,'active':item.is_read == 0}"
										:id="'audio'+ item.message_id"
										@click="playVoice(item.message_id,index)">
										<div class="laba"></div>				
									</div>
									<div class="fl ml10 pt10">{{item.content.duration}}"</div> -->
								</template>
							</div>
							<!-- 处方签 -->
							<div class="msg mb15 clearfix1 "  :id="'id'+item.send_time" v-if="item.content.type == 8" >
								<img :src="doctor.avatar" alt="" class="avatar fl">
								<div class="fl msg_content ml15 other bg_white typo_gray w230 clearfix">
									<div class="mb10">
										<div class="typo_grey fs12">诊断结果</div>
										<div class="fs15 c333">{{item.content.diagnosis}}</div>
									</div>
									<div class="mb5" v-for="(r,v) in item.content.items">
										<div class="typo_grey fs12" >建议用药	</div>
										<div  class="fs15 c333 overtwo lh20">{{r.name}}</div>
										<div class="fs12 c666 ">
											<span>【{{r.drug_usage}}】</span>
											<span class="fr">&times;{{r.num}}</span>
										</div>
										
									</div>	
									<div class="textr fs14 bor pt5">
										<a :href="'/ask/prescription.html?prescription_id='+ item.content.prescription_id" class="c333">{{item.content.button}}<i class="iconfont typo_grey pl5 fs14">&#xe619;</i></a>
									</div>				
									
								</div>
							</div>
							<!-- 医生说 -->
							<div class="msg mb15 clearfix1 " :id="'id'+item.send_time" v-if="item.content.type == 7" >
								<a :href="item.content.link">
									<img :src="doctor.avatar" alt="" class="avatar fl">
									<div class="fl msg_content ml15 doc_say bg_white typo_gray w280 clearfix " >
					
										<img :src="item.content.cover"  alt="" class="fl mr10">
										<div class="clearfix ">
											<div class="elli fs16 typo_black0 lh20 mt5 mb15">{{item.content.title}}</div>
											<div >
												<div class="inblo w160 elli">{{item.content.summary}}</div>
												<i class="iconfont fr fs18">&#xe6ea;</i>
											</div>
										</div>
									</div>
								</a>						
							</div>	
							<!-- 消息-通知,更改可回复次数 -->
							<div class="msg mb15 clearfix1 textc" :id="'id'+item.send_time" v-if="item.content.type == 4  && item.content.link_type == -1">
								<div class="notice typo_white  ">{{item.content.text}}</div>
							</div>
							<!-- 系统消息-通知 引导用户送心意 -->
						<!-- 	<div class="msg mb15 clearfix1 textc" v-if="false">
								<div class="notice typo_white  ">如果您认可医生为您提供的服务，那就<a href="#" class="typo_red">送出一份心意</a>，感谢医生的付出吧!</div>
							</div> -->
						</template>
						<div class="clearfix1 mb15" v-if="leftTime > 0">
							<div class="inblo clock_tip  lhh40  fr">此病情回访将在{{leftTime | hourFormat }}后关闭<i class="iconfont pl5 fs16"></i></div>
						</div>	
					</div>	
	        		<div slot="pulldown" class="xs-plugin-pulldown-container xs-plugin-pulldown-down" style="position: absolute; width: 100%; height: 60px; line-height: 60px; top: -60px; text-align: center;">
	        			<span v-show="status2.pulldownStatus === 'default'"></span>
	        			<span class="pulldown-arrow" v-show="status2.pulldownStatus === 'down' || status2.pulldownStatus === 'up'" :class="{'rotate': status2.pulldownStatus === 'up'}">加载更多...</span>
	        			<span v-show="status2.pulldownStatus === 'loading'"><spinner type="ios-small"></spinner></span>
	        		</div>
	        	</scroller>

			
				<!-- 图片预览 -->
				<div v-transfer-dom>
			      <previewer :list="imgList" ref="previewer" :options="options"></previewer>
			    </div>
			    
				<MaskBox v-show="isMaskBoxShow" @click.native="hideFuncBox()"></MaskBox>
				<FooterBox ref="footer"></FooterBox>
			</div>	
		<!-- <div class="clearfix1 lefthour" v-if="leftHour > 0">
			<div class="inblo clock_tip  lhh40  fr">此病情回访将在{{leftHour | hourFormat }}小时后结束<i class="iconfont pl5 fs16"></i></div>
		</div>	 -->
		
        </div>
		
	</div>
</template>
<script>
	import MQTT from '../../plugins/mqttws31.js'
	import Vue from 'vue';
	import { Toast } from 'mint-ui';
	import * as api from './api/api.js'
	import { mapActions, mapGetters } from 'vuex';
	import {download_app} from '../../utils/util.js';
	import NavigateBar from '../../components/common/NavigateBar.vue';
	import FooterBox from './components/Footer.vue'
	import MaskBox from './components/Mask.vue';
	import { Previewer, TransferDom, Scroller, Spinner  } from 'vux'
	export default {
		directives: {
		    TransferDom
		},
		data(){
			return {	
				showLoading:false,
				navigateBarOptions:{
					iconLeftCode:'&#xe60e;',
					title:'随访咨询',
					color:'#fff',
					iconClass:'c_white',
					iconRightCode:''	
				}, 
				scrollHeight:'',//滚动高度
				listDemo:[10,11,12,14,15],
				audio:'',
				business_id:'',
				activeAudioid:-1,
				audioIndex:0,
				str:'你好,。balabalabalabala',
				isSpeadBtnShow:false,
				spreadBtn:true,
				socketState:false,
				defaultImgUrl:"http://static.91160.com/wechat/img/common/default_4X3.png",//懒加载默认图片
				list: [],
				imgList:[],
		        audioList:[],	
		        buffer:[],
		        dataLength:10,
		        ajaxFlag:true ,
		        leftTime:'' ,
		        timer:'' ,
		        isNotApp:true ,
		        options: {//图片预览
			        getThumbBoundsFn (index) {
			          let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
			          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
			          let rect = thumbnail.getBoundingClientRect()
			          return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
			        }
			    },
			    status2: {
			       pulldownStatus: 'default'
			    }
			}
		},
		computed:{
			...mapGetters('IM',[
				'isFunctionBoxShow',
				'isMaskBoxShow',
				'replyCount',
				'leftHour',
				'hideInput',
				'user',	
				'ask',
				'doctor',
				'sessionId'	
			])
		},
		beforeDestroy(){
			this.timer && clearInterval(this.timer);
		},
		watch:{
			replyCount(now){
				if(now == 0 ){
					this.hideInputBox();	
					this.scrollToBottom();													
				}
				this.getScrollHeight();		
			},
			imgList(now){
				// setTimeout(()=>{
				// 	LazyLoad(this.defaultImgUrl);
				// },100)
			},
		},
		methods:{	
			...mapActions('IM',[
				'hideFuncBox',
				'setReplyCount',
				'setLeftHour',
				'hideInputBox',
				'getToken',
				'getLeftNum',
				'getVisitInfo'
			]),	
			loadmore () {
				var business_id = this.$route.query.business_id,
					business_type = 9,
					message_id = (this.list[0] && this.list[0].message_id) || 0,
					session_id = this.sessionId,
					member_id = this.ask.member_id || 0;
				if(this.ajaxFlag) {
					this.ajaxFlag = false;
					api.getHisRecord({session_id, member_id, message_id},(data)=>{
						if( data.length == 0 ) { //当拉取历史数据结果为空,不准再调取接口
							this.ajaxFlag = false;
							this.$refs.demo3.donePulldown()	
							Toast({
							  	message: '没有更多数据了',
							 	position: 'middle',
							  	duration: 2000,
							  	classNmae:'c_white'
							});
							return;
						}
						var data = this.filterList(data);
						this.ajaxFlag = true;
						this.list = data.reverse().concat(this.list);	
						this.dataLength = data.length;				
						this.$refs.demo3.donePulldown()	
						setTimeout(()=>{
							this.initImgList(1);
							this.initAudioList();
						},100)				
						
					})
				}else{
					setTimeout(()=>{
						this.$refs.demo3.donePulldown()	
					},200)
				}
		    },	
			Countdown(data){
				this.leftTime = this.leftHour;
				this.timer = setInterval(()=>{
					this.leftTime -=  1000;
					if(this.leftTime <= 0) {//如果随访有效时间结束
						this.hideInputBox();
						this.setReplyCount(0);
						this.getScrollHeight(true);
						clearInterval(this.timer);
					}
				}, 1000);

			},
			download_app:download_app,
			isApp(){
				var cid = this.$route.query.cid;
				if(cid==20||cid==24 || typeof(mJavaScriptObject) == 'object'){
					this.isNotApp = false;
				}
			},
			filterList(data){
				for(let i = 0, len = data.length; i < len; i++) {
					data[i].content = JSON.parse( data[i].content );//content从数据库查出来是jsonString
					if( i > 0  ) { //判断时间是否显示
						var duration = Math.abs( data[ i ].send_time - data[ i - 1 ].send_time ),
							standard = 5 * 60 * 1000;
						if( duration > standard ) {
							data[i].isTimeShow = true;
						}else {
							data[i].isTimeShow = false;
						}
					}
				}
				return data;
			},			
			initImgList(loadmore){//初始化preview的数组
				var previewImgs = document.getElementsByClassName('previewer-demo-img');
				[].slice.apply(previewImgs).forEach((item,index)=>{
					item.index = index;
				});
				if(loadmore) {//上拉加载更多
					var tmp = [];
					this.list.forEach((item,index)=>{
						if(index >= this.dataLength) {//只循环最新加载的数据
							return;
						}
						if(item.content.type == 2 ) {
							tmp.push({
								src:item.content.url,
							})
						}
					});
					this.imgList = tmp.concat(this.imgList);
				}			
			},
			initAudioList(){				
				var tmp = [],
					readAudioLists = JSON.parse(window.localStorage.getItem('readAudioLists')) || [];
				this.list.forEach((item,index)=>{
					if(index >= this.dataLength) {//只循环最新加载的数据
						return;
					}
					if(item.content.type == 3) {						
						tmp.push({
							index:index,
							msgId:item.message_id,
							content:{
								src:item.content.url,
								duration:item.content.duration,
								state:item.is_read
							}
							
						})
						readAudioLists.forEach((v,i)=>{//如果本地缓存readAudioLists中有语音消息id,证明已经播放过
							if(v == item.message_id){
								item.is_read = 1;
								return;
							}
						})
					}
				});
				this.audioList = tmp.concat(this.audioList);
			},
			playVoice(msgId,index){		
				if(this.activeAudioid == msgId) {
					this.audio.pause();	
					this.activeAudioid = -1;	
				}else {
					this.activeAudioid = msgId;
					this.list[index].is_read = 1;
					// 语音播放记录本地缓存
					var readAudioLists = JSON.parse(window.localStorage.getItem('readAudioLists')) || [];
					readAudioLists.push(msgId);
					window.localStorage.setItem('readAudioLists',JSON.stringify(readAudioLists));
					this.audioList.forEach((item,index)=>{					
						if(item.msgId == msgId) {
							item.content.state = 1;
							this.audio.src = item.content.src;
							this.audioIndex = index;
							this.audio.play();
						}
					})
				}	
			},
			preview (event) {
				var current = event.currentTarget.index;
				try{
		        	this.$refs.previewer.show(current)
				}catch(err){
					console.log(err);
				}
		    },
			initDiseaseDes(){//初始化疾病卡片,判断是否显示展开按钮
				var height = this.$refs.disease_des.offsetHeight,
					ration = document.body.clientWidth / 375;//相对于iphone6
				if(height > 40 * ration) {
					this.isSpeadBtnShow = true;
				}	
			},
			lookMore(val){//查看更多
				if(val == 1) {
					this.$refs.disease_des.classList.remove('h40');
					this.spreadBtn = false;
				}else if(val == 2) {
					this.$refs.disease_des.classList.add('h40');
					this.spreadBtn = true;
				}
			},
			initAudio(){
				var that = this;
				this.audio = this.$refs.audio;
				this.audio.addEventListener('ended',function(event){
					if(++that.audioIndex == that.audioList.length ) {//播放到最后语音
						that.activeAudioid = -1;//去除正在播放的样式	
						return false;
					}
					that.playVoice(that.audioList[that.audioIndex].msgId,that.audioList[that.audioIndex].index);
				})
			},
			scrollToBottom () {
				this.$nextTick(()=>{					
					var offsetHeight =this.xsContainer.offsetHeight;
					this.xsContainer.style.transform = `translateY(-${offsetHeight - this.scrollHeight + 10}px)`;
					this.xsContainer.style['-webkit-transform'] = `translateY(-${offsetHeight - this.scrollHeight + 10}px)`;
				})
				
			},
			getScrollHeight (flag) {
				var clientHeight =document.body.clientHeight || document.documentElement.clientHeight,
					clientWidth =document.body.clientWidth || document.documentElement.clientWidth,
					ratio = clientWidth / 375;
				var navigateBarHeight = ratio * 48,
					footerHeight = ratio * 48,
					tipHeight =   ratio * 38,
					funBoxHeight = ratio * 90;
				if(this.isNotApp) {
					if( flag || this.replyCount <= 0 ) {
						this.scrollHeight = clientHeight - tipHeight - funBoxHeight - navigateBarHeight;
					}else{
						this.scrollHeight = clientHeight - tipHeight - footerHeight - navigateBarHeight;
					}
				}else {
					if( flag || this.replyCount <= 0 ) {
						this.scrollHeight = clientHeight - tipHeight - funBoxHeight;
					}else {
						this.scrollHeight = clientHeight - tipHeight - footerHeight;
					}
				}				
			},
			getHisRecord(params){
				var business_id = this.$route.query.business_id,
					business_type = 9,
					message_id = '';
				api.getHisRecord(params,(data)=>{
					var data = this.filterList(data);
					this.list = data.reverse().concat(this.list);
					this.dataLength = data.length;
					setTimeout(()=>{
						this.initImgList(1);
						this.initAudioList();
						this.scrollToBottom();
					},100)	
				},(error)=>{
					// console.log(error);
				})
				// this.initDiseaseDes();
				this.initAudio();
				this.setLeftHour(this.ask.end_time);	
			}
		},	

		mounted(){
			this.business_id = this.$route.query.business_id;
			this.getToken(()=>{
				this.$refs.footer.initWebsocket();
				this.getVisitInfo(this.business_id).then((data)=>{
					this.navigateBarOptions.title = data.doctor.doc_name || '随访咨询';
					var session_id = this.sessionId;
					var member_id = this.ask.member_id ;
					this.getHisRecord({ session_id, member_id });	
					this.Countdown();					
				});
			});			
			this.isApp();
			this.getLeftNum({business_type: 9,business_id:this.business_id});
			this.xsContainer =  document.getElementsByClassName('xs-container')[0];
			this.getScrollHeight();
			window.addEventListener('resize',()=>{
				this.getScrollHeight();
				this.scrollToBottom();
			})
			
		},
		components:{
			NavigateBar,
			FooterBox,
			MaskBox,
			Previewer,  
			Scroller,
		    Spinner
		}
	}
</script>

<style scoped lang = "scss" >
	.lefthour {
		position: fixed;
		bottom: 1.6rem;
		right: 0.4rem;
	}
	.top48{
		top: 1.28rem;
	}
	.w230 {
		width: 6.13333rem !important;
		max-width: 6.13333rem !important;
	}
	.w280 {
		max-width: 7.46667rem !important;
		width: 7.46667rem !important;
	}
	.w160 {
		width: 4.26667rem;
	}
	.typo_grey {
		color:#666;
	}
	.timestamp {
		background-color: #bbb;
		display: inline-block;
		height: 0.69333rem;
		line-height: 0.69333rem;
		padding: 0 0.4rem;
		color: #fff;
		border-radius: 0.13333rem;
	}
	.bor {
		position: relative;
		&::before{
			content:'';
			position: absolute;
			height:1px;
			background:#dedfe0;
			width:200%;
			top: 0;
			left: -50%;
		}
	}
	.loadmore_icon {
		width: 0.53333rem;
		vertical-align: middle;
		margin-right: 0.26667rem;
	}
	.lhh38 {
		height: 1.01333rem;
		line-height: 1.01333rem;
	}
	.break-all {
		word-break:break-all;
	}
	.reply_tips {
		position: fixed;
		width: 100%;
		/*top: 1.28rem;*/
		left: 0;
		z-index: 2;
	}
	.audio {
		padding: 0.26667rem;
		background-color: #fff;
		border-radius: 0.21333rem;
		width: 5.33333rem;
		position: relative;
		.laba {
			width:0.53333rem;
			height:0.53333rem;
			background:url('./images/audio-off.png') no-repeat;
		}
		&.active::after{
			content: '';
			position: absolute;
			width: 0.26667rem;
			height: 0.26667rem;
			border-radius: 50%;
			overflow: hidden;
			background: red;
			top: -0.18667rem;
			right: -0.26667rem;
		}
		&.play {
			.laba {
				background:url('./images/audio-on.gif') no-repeat;
			}
		}
	}
	
	.msg_wrap {
		padding: 0.53333rem 0.48rem 0;
		.flex_wrap {
			flex-flow: wrap;
		}
		.disease_img {
			width: 33.3333%;
			height: 1.6rem;
			margin: 0.21333rem;
		}
		.h40 {
			height: 1.06667rem;
		}
		.doc_say {
			img {
				width: 1.65333rem !important;
				height: 1.65333rem !important;
			}
		}
		.msg {
			.avatar {
			    width: 1.06667rem;
		    	height: 1.06667rem;
		    	border-radius: 0.08rem;
			}
			.doctor_say_title {
				position: relative;
				&::before,&::after {
					content:'';
					position: absolute;
					width: 200%;
					left: -50%;
					height: 1px;
					background-color: #dedfe0;
				}
				&::before {
					top: 0;
				}
				&::after {
					bottom: 0;
				}
			}
			.card {
				border-radius: 0.13333rem;
			    overflow: hidden;
			    width: 6.4rem;
			    .card_title {
					padding: 0.4rem 0.53333rem;
				}
				.card_content {
					padding: 0.4rem 0.32rem;

				}
			}			
			.msg_content {
			    max-width: 60%;
			    padding: 0.21333rem 0.4rem;
			    line-height: 0.58667rem;
			    word-break: break-all;
			    border-radius: 0.13333rem;
			    position: relative;
			    img {
		    	    width: 1.33333rem;
				    height: auto;
				    max-width: 100%;
				    vertical-align: middle;
			    }
			    &::after {
		    	    position: absolute;
				    top: 0.13333rem;
				    content: ' ';
				    width: 0.18667rem;
				    height: 0.34667rem;
				    background-size: cover;
				  
			    }
			    &.self::after {
		    	    right: -0.18667rem;
				    background: url('./images/ans.gif') no-repeat right;
			    }
			    &.other::after {
		    	    left: -0.18667rem;
				    background: url('./images/anw.gif') no-repeat right;
			    }
			}
			.notice {
				display: inline-block;
				max-width: 100%;
				margin:0 auto;
			    padding: 0.26667rem 0.42667rem;
			    border-radius: 0.08rem;
			    line-height: 1.4;
			    font-size: 0.32rem;
			    color: #fff;
			    background: #bbb;
			}
		}		
	}
	.clock_tip {
		padding: 0 0.26667rem;
		background: #fff;
	    color: #ff9f4f;
	    border-radius: 1.06667rem;
	}
	.msg_loading {
		width: 0.53333rem;
	    margin-top: 0.26667rem;
	    margin-right: 0.26667rem;
	}
	.img_loading {
		width: 0.53333rem !important;
	    position: absolute;
	    top: 50%;
	    left: 50%;
	    transform: translate(-50%, -50%);
	}
	
</style>
