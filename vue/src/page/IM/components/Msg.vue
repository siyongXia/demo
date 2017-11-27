<template>
	<div>
		<!-- type -3系统发起结束，-2医生发起结束,-1送心意系统提示 1代表文本 2代表图片 3代表语音 4代表主诉模板  5医生说文章 8处方签-->
		<template type="1">
			<!-- 自己-内容 -->
			<div class="msg mb15 clearfix1">
				<img src="./images/avatar_user_0.jpg" alt="" class="avatar fr">
				<span class="fr msg_content mr15 self bg_green typo_white">alabalabalabalabala.....</span>
			</div>
			<!-- 别人-内容 -->
			<div class="msg mb15 clearfix1">
				<img src="./images/avatar_user_1.jpg" alt="" class="avatar fl">
				<span class="fl msg_content ml15 other bg_white typo_dgray">asdasdasd</span>
			</div>
		</template>
		<template type="2">
			<!-- 自己-图片 -->
			<div class="msg mb15 clearfix1">
				<img src="./images/avatar_user_0.jpg"  alt="" class="avatar fr">
				<span class="fr msg_content mr15 self bg_green typo_white">
					<img class="preview-img lazyload" 
					data-src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502102010100&di=6d34ce55958ec405f17391f47966218d&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F13%2F87%2F72%2F73t58PICjpT_1024.jpg"
					:src="defaultImgUrl" 
					@click="$preview.open($event,i++, list)"
					alt="">
				</span>
			</div>
			<!-- 别人-图片 -->
			<div class="msg mb15 clearfix1">
				<img src="./images/avatar_user_1.jpg" alt="" class="avatar fl">
				<span class="fl msg_content ml15 other bg_white">
					<img class="preview-img lazyload"  
					data-src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502102010100&di=12936f7553c189c5d3dfb1544d0f6d32&imgtype=0&src=http%3A%2F%2Fpic9.nipic.com%2F20100818%2F5462876_150854046500_2.jpg"
					:src="defaultImgUrl" 
					@click="$preview.open($event,i++, list)" alt="">
				</span>
			</div>
		</template>
		<template type="3">
			<!-- 别人-语音 -->
			<div class="msg mb15 clearfix1">
				<img src="./images/avatar_user_1.jpg"  alt="" class="avatar fl">
				<div class="audioplay-box active fl ml15" @click="play($event)">
		            <div class="audioplay-play" ref="js_audio" data-src="/static/audio.mp3"></div>
		            <div class="audioplay-bar" :style="{'width':(2*18)+'px'}">
		                <div class="audioplay-progress"></div>
		                <div class="audioplay-playhead"></div>
		            </div>
		            <div class="audioplay-time-duration">18"</div>
		        </div>
			</div>
		</template>
		<!-- 自己-病情描述 -->	
		<template type="4">		
			<div class="msg mb15 clearfix1">
				<img src="./images/avatar_user_0.jpg" alt="" class="avatar fr">
				<div class="fr mr15 card typo_white">
					<div class="bg_green card_title fs16"><i class="iconfont pr5 fs18">&#xe6a7;</i>病情描述</div>
					<div class="bg_white card_content">
						<div class="lh20 mb15">
							<div class="typo_black0">疾病名称</div>
							<div class="typo_gray">balabala</div>
						</div>
						<div class="lh20 mb15">
							<div class="typo_black0">疾病状况</div>
							<div class="typo_gray  break-all"  ref="disease_des" :class="isSpeadBtnShow ? 'overtwo':''">{{str}}</div>
						</div>
						<template v-if="isSpeadBtnShow">
							<div class="typo_gray textc" v-if="spreadBtn" @click="lookMore(1)">展开查看全部<i class="iconfont pl5">&#xe625;</i></div>
							<div class="typo_gray textc" v-else @click="lookMore(2)">收起<i class="iconfont pl5">&#xe626;</i></div>		
						</template>
											
						
					</div>
				</div>
			</div>
		</template>		
	</div>
</template>
<script>
	export default {
		data(){
			return {

			}
		},
		methods:{

		},
		mounted(){

		},
		props:['type']
	}
</script>

<style scoped lang="scss">
	.msg {
		.avatar {
		    width: 1.06667rem;
	    	height: 1.06667rem;
	    	border-radius: 0.08rem;
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
	    	    width: 100%;
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
</style>