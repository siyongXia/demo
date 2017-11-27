<template>
	<div class="msg_wrap">
		<Msg type='4'></Msg>
		<Msg type='1'></Msg>
		<Msg type='2'></Msg>
		<Msg type='3'></Msg>
		<!-- 消息-通知 -->
		<div class="msg mb15 clearfix1 textc">
			<div class="notice typo_white  ">10分钟没有医生回复将退回赏金</div>
		</div>
		<!-- 消息-时间 -->
		<div class="msg mb15 clearfix1 textc">
			<div class="typo_gray ">08/07 15:24</div>
		</div>
	</div>
</template>
<script>
	import Msg from './components/Msg.vue'
	export default {
		data(){
			return {
				
			}
		},
		methods:{

		},
		mounted(){

		},
		components:{
			Msg
		}
	}
</script>

<style scoped lang="scss">
	.msg_wrap {
		padding: 0.53333rem 0.48rem 0;
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
	}
</style>