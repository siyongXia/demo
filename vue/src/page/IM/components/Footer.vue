<template>
	<div class="footer fixtobottom bg_lgray">
		<div class="send_box bor-t fs0" v-if="!hideInput">
			<textarea name="" ref="content"  class=" typo_small typo_dgray content_input inblo vtt fs14"  v-model="content" @focus="hideFuncBox()"></textarea>
			<span class="show_function typo_gray bg_white inblo vtt fs14 ml5 mr5"  @click="upFuncBox()">+</span>
			<button class="btn inblo vtt fs14" :class="canSend ? 'green' : 'gray'" id="send" @click="sendMessage()">发送</button>
		</div>
		<FunctionBox :class="isFunctionBoxShow ? 'active':''"></FunctionBox>
	</div>
</template>
<script>
	import PahoMQTT from 'paho.mqtt.js'
	import Message_pb from '../protobuf/MessageFormat_pb.js'
	import FunctionBox from './Functionbox.vue'
	import scrollIntoView from 'scroll-into-view';
	import autosize from '../../../plugins/autosize.min.js'
	import { Toast } from 'mint-ui'
	import { mapActions, mapGetters } from 'vuex';
	import { getUuid } from '../../../utils/util.js'
	import GlobalSetting from '../../../config/GlobalSetting.js'
	import { LazyLoad} from '../../../utils/util.js';
	export default {
		name:'footer',
		data(){
			return {
				canSend:false,
				content:'',
				message:'',
				clientSocket:'',
				defaultImgUrl:"http://static.91160.com/wechat/img/common/default_4X3.png",//懒加载默认图片
			}
		},
		computed:{
			...mapGetters('IM',[
				'isFunctionBoxShow',
				'hideInput',
				'replyCount',
				'client_id',
				'broker',
				'user',
				'sessionId',
				'user_id',
				'doctor_id',
				'business_type',
				'ask'
			])
		},	
		methods:{
			...mapActions('IM',[
				'showFuncBox',
				'hideFuncBox',
				'changeReplyCount',
				'setReplyCount'

			]),
			sendImg(obj){
				obj.message_id = getUuid();
				obj.session_id = this.sessionId;
				obj.sender_uid = this.user_id.toString();
				obj.receiver_uid = this.doctor_id.toString();
				obj.member_id = this.ask.member_id;
	            var buffer = this.serializeBinary(obj);
	            this.clientSocket.send('PTP',buffer,2);
	            obj.loading = 1;
	            obj.content = JSON.parse(obj.content)
		    	this.$parent.list.push(obj);
				this.hideFuncBox();
				setTimeout(()=>{
		    		this.$parent.scrollToBottom();
				},100)
			},
			filterList(message_id) {
				let len = this.$parent.list.length;
				for(let i = len - 1;i >= 0; i--) {
					if(message_id ==  this.$parent.list[i].message_id) {
						return false;
					}
				}
				return true;
			},
			initWebsocket(){
				var that = this;
			    var options = {
			      useSSL:true,
			      // cleanSession:true,
			      userName:this.user.user_id,
			      password:this.user.access_token,
			      timeout: 10,
			      onSuccess: function () {
			        console.log("mqtt connected");
			        // Connection succeeded; subscribe to our topic, you can add multile lines of these
			        that.clientSocket.subscribe('PTP', {
			        	qos: 2,
			        	onSuccess:function(){
			        		console.log('subscribe success')
			        	},
			        	onFailure:function(){
			        		console.log('subscribe Failure')
			        	}
			        });		
			      },
			      onFailure: function (message) {
			        console.log("Connection failed: " + message.errorMessage);
			      }
			    };
			    this.clientSocket = new PahoMQTT.Client('wss://msgwss.91160.com/mqtt', 
			    // this.clientSocket = new PahoMQTT.Client(wsbroker, wsport,
			        this.client_id);
			    this.clientSocket.onConnectionLost = function (responseObject) {
			    	var options = {
			    		  useSSL:true,
				      // cleanSession:true,
					      userName:that.user.user_id,
					      password:that.user.access_token,
					      timeout: 10,
					      onSuccess: function () {
					      	console.log("mqtt connected");
					        // Connection succeeded; subscribe to our topic, you can add multile lines of these
					        that.clientSocket.subscribe('PTP', {
					        	qos: 2,
					        	onSuccess:function(){
					        		console.log('subscribe success')
					        	},
					        	onFailure:function(){
					        		console.log('subscribe Failure')
					        	}
					        });		
					    },
					    onFailure: function (message) {
					    	console.log("Connection failed: " + message.errorMessage);
					    }
					};
					that.clientSocket.connect(options);
					console.log("connection lost: " + responseObject.errorMessage);
				};
			    this.clientSocket.onMessageDelivered = function(message){//消息送达的回调
			    	console.log('message Delivered');
			    	var msg = that.message.toObject(message.payloadBytes),
			    		list = that.$parent.list,
			    		len = list.length;
			    	console.log(msg);
			    	that.$parent.getLeftNum({business_type: 9,business_id:that.$parent.business_id});
			    	// that.changeReplyCount();
			    	msg.content = JSON.parse(msg.content); 
			    	for(let i = len -1;i>=0;i--) {
			    		if(list[i].message_id == msg.messageId) {
			    			list[i].loading = 0;
			    			if(msg.content.type == 2) {
			    				that.$parent.imgList.push({
			    					src:msg.content.url,
									w:msg.content.width,
									h:msg.content.height
			    				})
			    				that.$parent.initImgList();
			    			}
			    			return;
			    		}			    		
			    	}
			    };
			    this.clientSocket.onMessageArrived = function (message) {
			    	var array = that.message.deserializeBinary(message.payloadBytes).array,
			    		obj = {};
			    	obj.content = JSON.parse( array[0] );
			    	obj.send_time = array[1];
			    	obj.receiver_uid = array[2];
			    	obj.sender_uid = array[3];
			    	obj.member_id = array[4];
			    	obj.message_id = array[5];
			    	obj.guid = array[6];
			    	obj.session_id = array[7];
			    	obj.business_type = array[8];
			    	obj.is_read = 0;
			    	if(!that.filterList(obj.message_id)){//broker有可能重复推送消息
			    		return;
			    	}			    	
			    	that.$parent.list.push(obj);
			    	if(obj.sender_uid == that.user_id) {//如果是同一个账号其他端发送的消息
			    		that.$parent.getLeftNum({business_type: 9,business_id:that.$parent.business_id});
			    	}
			    	console.log(obj);
			    	that.$parent.scrollToBottom();
			    	// that.$parent.getScrollHeight();
		            // that.scrollToBottom();
		            var type = obj.content.type;
		            switch ( type ) {
		            	case 2://如果是图片信息,则需要更新图片预览的列表
		            	console.log(obj.content.width != 0);
		            		setTimeout(() => {
					        	that.$parent.initImgList();
					        	that.$parent.imgList.push({
			    					src:obj.content.url
			    				});
			            	},100)
		            		break;
		            	case 3://如果是图片信息,则需要更新语音列表以便循环播放
			            	setTimeout(()=>{
				        		var audioItem = {
									index:that.$parent.list.length-1,
									msgId:obj.message_id,
									content:{
										src:obj.content.url,
										duration:obj.content.duration,
										state:obj.is_read
									}							
								}
					        	that.$parent.audioList.push(audioItem);			        	
			            	},100)
		            		break;
		            	case 4://系统消息,
		            		if(obj.content.link_type == -1) {//改变可回复次数
		            			clearInterval(that.$parent.timer);
		            			that.$parent.Countdown();
		            			that.setReplyCount(parseInt(obj.content.highlight));
		            			that.$store.commit('IM/SHOWINPUTBOX');
		            		}
		            		break;
		            }
			    
			    };	
			    this.clientSocket.connect(options);
			},
			serializeBinary(obj){
				this.message.setContent(obj.content);
				this.message.setSendTime(obj.send_time);
				this.message.setReceiverUid(obj.receiver_uid);
				this.message.setMemberId(obj.member_id);
				this.message.setMessageId(obj.message_id);
				this.message.setGuid(obj.guid);
				this.message.setSenderUid(obj.sender_uid);
				this.message.setSessionId(obj.session_id);
				this.message.setBusinessType(obj.business_type);
				return this.message.serializeBinary();
			},
			upFuncBox(){
				this.showFuncBox();
				this.$store.commit('IM/MASKBOX_SHOW');
				this.$parent.scrollToBottom();
			},
			initTextarea() {//Textarea高度自增长
				autosize(document.querySelectorAll('textarea'));
			},
			scrollToBottom(){
				scrollIntoView(document.querySelector('#bottom'));					
			},
			initSessionId(userID,reciveId){
				return `${userID}_${reciveId}`
			},
			sendMessage(){
				if(this.canSend) {
					var obj = {
						content:JSON.stringify({
							type:1,
							text:this.content,
							business_id:this.$route.query.business_id,
							business_type:9,
							receiver_type:2, //2代表医生,1代表患者
							networkProvider:'webIm',
							networkType:'-2'
						}),
						send_time:+ new Date(),
						sender_uid:this.user_id.toString(),
						receiver_uid:this.doctor_id.toString(),
						member_id:this.ask.member_id,
						// member_id:'102668',
						message_id:getUuid(),
						guid:'',
						session_id:this.sessionId,
						business_type:9 
					};	
					console.log(obj);
					var buffer = this.serializeBinary(obj);
					obj.loading = 1;//添加loading效果
					obj.content = JSON.parse(obj.content);
					this.$parent.list.push(obj);
					this.$parent.scrollToBottom();
					this.content = '';
					this.$refs.content.style.height = '0.8rem';	//让文本框恢复到最初的高度		
					try {//socket有可能会断开
						// client.send(topic,payload,qos);
						this.clientSocket.send('PTP',buffer,2);
					}catch(e) {
						Toast({
	                        message: '网络异常',
	                        position: 'middle',
	                        duration: 1000,
	                        className: 'c_white'
	                    });
						return;
					}
					
						
				}else {
				    Toast({
                        message: '回复不能为空',
                        position: 'middle',
                        duration: 1000,
                        className: 'c_white'
                    });
				}
			}
		},
		mounted(){
			this.$parent.scrollToBottom();
			this.initTextarea();//初始化textarea,高度自适应
			this.message = new Message_pb.Message();		
		},
		watch:{
			content(now,before){
				if(now.trim() !== '') {
					this.canSend = true;
				}else {
					this.canSend = false;
				}
			}
		},
		components:{
			FunctionBox
		}
	}
</script>

<style scoped lang="scss">
	.vtt {
		vertical-align: top;
	}
	.footer {
		.bor-t {
			 border-top: 1px solid #E0E0E0;
		}
		.send_box {			
			min-height: 1.22667rem;
			padding: 0.21333rem 0.26667rem;
		   
		}
		.content_input {
			width:7.06667rem;
			resize: none;
			line-height: 0.48rem;
			height: 0.74667rem;
			min-height: 0.74667rem;
			padding: 0.13333rem;
		    border: solid 1px #e0e0e0;
		    border-radius: 0.08rem;
		    max-height: 1.70667rem;	        
		}
		.show_function {
			border: 0.02667rem solid #ccc;
			border-radius: 50%;
			height: 0.74667rem;
			width: 0.74667rem;
			text-align: center;
			line-height: 0.58667rem;
			font-size: 0.8rem;
		}
		.btn {
			height: 0.74667rem;
			line-height: 0.74667rem;
			padding: 0 0.26667rem;
			border-radius:0.74667rem;
			background-color: #fff;
			&.green {
				border: 1px solid #00d2c3;
				color: #00d2c3;
			}
			&.gray {
				border: 1px solid #9B9B9B;
				color: #9B9B9B;
			}
		}		
	}
</style>