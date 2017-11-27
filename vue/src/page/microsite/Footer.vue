<template>
	<div>
		<div class="share" v-show="isGuideShow">	
			<img :src="guideImg" height="192" width="290" alt="" @click="hideGuide()">		
			<MaskBox zIndex="3" @click.native="hideGuide()"></MaskBox>
		</div>
		<footer>
			<div  @click="focus()">
				<img class="icon-focus mt5 pb5" :src="focusImg" /><br>
				<div class="typo_smaller">关注</div>
			</div>
			<div @click="share()">
				<img class="icon-focus mt5 pb5" :src="shareImg" /><br>
				<div class="typo_smaller" >分享</div>
			</div>
			<div @click="account()">
				<a >
					<img class="icon-focus mt5 pb5" :src="middleImg" /><br>
					<div class="typo_smaller">个人中心</div>
				</a>
			</div>
		</footer>
	</div>	
</template>

<script>
	import MaskBox from '../../components/common/Mask.vue' 
	import weui from '../../plugins/weui/js/weui.js'
	import  '../../plugins/weui/style/weui.min.scss'
	export default {
		data(){
			return {
				a:'111',
				unit_id:'',
				isLogin:-1,
				isGuideShow:false,
				guideImg:require('./images/guide.png'),
				focusImg:require('./images/icon-middle-focus.png'),
				shareImg:require('./images/icon-middle-share.png'),
				middleImg:require('./images/icon-middle-user.png')
			}
		},
		methods:{
			share(){
				this.$http.get('/user/islogined.html').then((response)=>{
					 if(response.data.status != 1) {
					 	location.href = '/user/login.html?redirect_url="+encodeURIComponent('+location.href+')'
					 }else {
					 	this.isGuideShow = true;
					 }
				})				
			},
			focus(){
				var unit_id = this.unit_id;
				this.$http.get('/user/islogined.html')
	            .then((response) => {

	               if(response.data.status == 1) {
	               		this.$http.get('/do/isfocus.html?type=3&focus_id='+unit_id)
			            .then((response)=>{  
			                var data = response.data.state;
			                if(!data) {
			                	this.$http({
									method:'post',
									url:'/do/focus.html',
									data:'type=3&focus_id='+unit_id
								})
								.then((response)=>{
									if(response.data.state == 1){
										weui.toast('关注成功', 1000);
									}
								})
			                }else {
			                	weui.toast('已关注', 1000);
			                }
			            })        
	               } else {
	               		weui.toast('请先登录!', 1000);
	               		setTimeout(function(){
							window.location.href="/user/login.html?redirect_url="+encodeURIComponent(location.href);
						}, 1000);
	               }             
	            })

				// var isLogin = this.$store.state.Common.isLogin,
				// 	isFocus = this.$store.state.hospitalinfo.focus_state,
				// 	unit_id = this.$store.state.hospitalinfo.unit_id,
				// 	that = this;
				// setTimeout(function(){
				// 	if(isLogin) {
				// 		if(!isFocus) {
				// 			that.$http({
				// 					method:'post',
				// 					url:'/do/isfocus.html',
				// 					data:'type=1&focus_id='+unit_id
				// 				})
				// 				.then((response)=>{
				// 					if(response.data.state == 1){
				// 						weui.toast('关注成功', 1000);
				// 					}
				// 				})
				// 			}
				// 		}else {
				// 		weui.toast('请先登录!', 1000);
				// 			setTimeout(function(){
				// 					window.location.href="/user/login.html?redirect_url="+encodeURIComponent(location.href);
				// 				}, 1000);
				// 		}
				// },0)
				
			},
			account(){
				window.location.href= '/account/index.html'
			},
			hideGuide(){
				this.isGuideShow = false;
			},
			isFocus(){
				// this.$store.dispatch('HOSPITALINFO_FOCUS_STATE');
			},
			isLogin(){
				// this.$store.dispatch('isLogin');
				
			}
		},
		components:{
			MaskBox
		},
		mounted(){
			this.unit_id = this.$route.query.unit_id;
		}
	}
</script>

<style scoped lang = 'less'>
	.share {
		position: relative;
		img {
			position: fixed;
			right: 18px;
			top:5px;
			z-index: 10;
			width: 200px;
		}
	}
	footer {
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: #e3e3e3;
	    padding: 0 0 5px;
	    border-top: 1px solid #d9d8e2;
	    overflow: hidden;
	    z-index: 2;
	    height: 50px;
	    font-size: 14px;
		>div {
			line-height: 0.9;
			float: left;
			width: 33.33%;
			text-align: center;
			img {
			    width: 21px;
			    height: 18px;
			    padding-top: 5px;
			    line-height: 1;
			}
			div {
				color: #7f7f7f;
			}
		}
	}
</style>