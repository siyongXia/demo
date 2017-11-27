<template>
	<div class="function_box bor-t fs0">
		<div class="function-item inblo fs14" @click="recording()" v-if="replyCount != 0">
			<span class="iconfont  icon">&#xe6e0;</span>					
			<label class="block label_item">语音</label>				
		</div>
		<div class="function-item inblo fs14" v-if="replyCount != 0">
			<input type="file" @change="uploadImg($event)" ref="upload_img" hidden id="upload_img" accept="image/*">
			<span class="iconfont  icon">&#xe676;</span>					
			<label class="block label_item" for="upload_img">照片</label>				
		</div>
		<a class="function-item typo_gray inblo fs14" @click="consultDoc()">
			<span class="iconfont  icon">&#xe674;</span>					
			<label class="block label_item" >咨询医生</label>				
		</a>
		<div class="function-item inblo fs14" @click="sendHeart()" v-if="gift.weixin">
			<span class="iconfont  icon">&#xe673;</span>					
			<label class="block label_item" >送心意</label>				
		</div>
	</div>
</template>
<script>
	import { MessageBox,Toast } from 'mint-ui';
	import { download_app,autoPullApp,readCookie } from '../../../utils/util.js'
	import { mapActions, mapGetters } from 'vuex';
	import GlobalSetting from '../../../config/GlobalSetting.js'
	export default {
		data(){
			return {	
				isNotApp:false			
			}
		},
		computed:{
			...mapGetters('IM',[
				'isFunctionBoxShow',
				'replyCount',
				'doctor',
				'gift',
				'doctor_id'
			])
		},
		methods:{
			...mapActions('IM',[
				'hideFuncBox'
			]),
			isApp(){
				var cid = this.$route.query.cid;
				if(cid==20||cid==24 || typeof(mJavaScriptObject) == 'object'){
					this.isNotApp = false;
				}else{
					this.isNotApp = true;
				}
			},
			recording(){
				if(typeof(mJavaScriptObject) == 'object') {
					if(mJavaScriptObject.funGetVersion() <= '5.8.0') {
						MessageBox({
						  title: '温馨提示',
						  message: '升级新版本后才能使用语音功能',
						  showCancelButton: true,
						  cancelButtonText:'暂不升级',
						  confirmButtonText:'立即升级'
						}).then(action => {
							if(action == 'confirm') {
								download_app();
							}
						})						
					}
				}else{
					MessageBox({
					  title: '温馨提示',
					  message: '下载新版本160APP才能使用语音功能',
					  showCancelButton: true,
					  cancelButtonText:'暂不下载',
					  confirmButtonText:'立即下载'
					}).then(action => {
						if(action == 'confirm') {
							download_app();
						}
					})
				}
					
			},
			consultDoc(){
				if(this.doctor.ask != 1) {
					Toast({
                        message: '医生暂未开通咨询服务',
                        position: 'middle',
                        duration: 2000,
                        className: 'c_white'
                    });
				}else {
					if(this.isNotApp) {
						window.location.href = `/doctor/detail.html?unit_id=${this.doctor.unit_id}&dep_id=${this.doctor.dep_id}&doc_id=${this.doctor.doctor_id}&type=askdoc`;
						return;
					}
					var args = {
						unitid:this.doctor.unit_id,
						depid:this.doctor.dep_id,
						docid:this.doctor.doctor_id,
						docname:this.doctor.doc_name,
						cityid:readCookie('location_city_id'),
						radio:2
					};
					var url = `/app/callKey.html?template=doc-detail&args=${JSON.stringify(args)}&cid=${this.$route.query.cid}`;
					this.$http.get(url)
					.then((data)=>{
						if(data.data.message == 'OK') {
							autoPullApp(data.data.data)
						}
					})
				}
			},
			sendHeart(){
				if(this.isNotApp) {
					window.location.href = `/doctor/sendmind.html?doctor_id=${this.doctor.doctor_id}&ask_id=${this.$route.query.business_id}&backurl=${encodeURIComponent(window.location.href)}`;
					return;
				}
				var args = {
						docid:this.doctor.doctor_id,
						norOrderId:this.$route.query.business_id
					},
					url = `/app/callKey.html?template=doc-sendmind&args=${JSON.stringify(args)}&cid=${this.$route.query.cid}`;			
				this.$http.get(url)
				.then((data)=>{
					if(data.data.message == 'OK') {
						autoPullApp(data.data.data)
					}
				})
				
			},			
			uploadImg(e){
				var file = e.currentTarget.files[0];	
				e.currentTarget.value = '';	//重置file btn的值		
				var formdata = new FormData();
				formdata.append('file',file);				
				this.$http({
			        url:'/sys/uploadimg.html?uploadtype=ask',
			        method:'post',
			        data:formdata,
			        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			    })
			    .then((res)=>{
			    	var obj = {
		                business_type: 9,
		                message_id: '',
		                session_id: '',
		                guid:'0',
		                sender_uid: "",
		                receiver_uid: "",
		                member_id: 'null',
		                is_read: "0",
		                send_time: + new Date(),
		                content: JSON.stringify({
		                    type: 2,
		                    url: res.data.image_url,
		                    width:res.data.width,
		                    height:res.data.height,
		                    business_id:this.$route.query.business_id,
							business_type:9,
							networkProvider:'webIm',
							networkType:'-2',
							receiver_type:2
		                }) 
		            };
		            this.$parent.sendImg(obj);

			    })	
			},
		},		
		mounted(){
			this.isApp();
		}
	}
</script>

<style scoped lang="scss">

	.space_around {
		justify-content: space-around;
	}
	.space_between {
		justify-content: space-between;
	}
	.function_box {
	    text-align:center;
	    padding: 0;
	    height: 0;
	    -webkit-transition: all .3s linear;
	    transition: all .3s linear;
		&.active {
			height:2.4rem;
			padding-top: 0.26667rem;
			padding-bottom: 0.13333rem;
		}

		>.function-item {
			// flex: 1;
			text-align: center;
			min-width: 25%;
			.icon {
			    display: block;
			    width: 1.46667rem;
			    height: 1.46667rem;
			    margin: 0 auto;
			    border: solid 1px #ddd;
			    border-radius: 10px;
			    text-align: center;
			    line-height: 1.46667rem;
			    font-size: 28px;
			    color: #999;
			    background: #fff;
			}
			.label_item {
				padding-top: 1.46667rem;
				margin-top: -1.46667rem;
				position: relative;
			}
		}
	}

</style>