<template>
	<div class="app-add" ref="appAd" v-show="isShow">
		<div class="icon" @click="hide()">
			<span class="cancel iconfont">&#xe605;</span>
		</div>		
		<img class="fleft logo" :src="imgLogo" alt="">
		<div class="slogan">
			<span class="mr15">手机预约 随时随地</span> <br>
			<span class="ml15">更轻盈的预约方式</span>
		</div>
		<a href="http://a.app.qq.com/o/simple.jsp?pkgname=cn.kidyn.qdmedical160">立即体验</a>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				isShow:true,
				imgLogo:require('./images/logo1.png')
			}
		},
		props:['bottom'],
		methods:{
			hide(){
				this.isShow = false;
			}
		},
		mounted(){
			this.$refs.appAd.style.bottom = this.bottom + 'px';
		}
	}
</script>

<style scoped lang = 'less'>
	.app-add {
		position: fixed;
		left: 0;
	    width: 100%;
	    height: auto;
	    min-width: 340px;
	    background-color: rgba(75,73,84,0.8);
	    max-height: 60px;
	    padding: 10px 15px 10px;
	    overflow:hidden; 
	    >.icon {
	    	border-radius: 50%;
	    	background:black;
	    	color: #fff;
	    	position: absolute;
	    	width: 36px;
	    	height: 36px;
	    	text-align: right;
	    	vertical-align: bottom;	    	
	    	left: -18px;
	    	top: -18px;
	    	>.cancel {
	    		font-size: 12px;
	    		position: absolute;
	    		bottom: 0.05333rem;
	    		right: 0.10667rem;
	    		transform: scale(0.7);
	    		color: #fff;
	    	}

	    }
	    >.logo {
	    		width: 50px;
	    		height: 50px;
	    }
	    >.slogan {
    	    float: left;
		    font-size: 14px;
		    height: 50px;
		    padding-top: 5px;
		    line-height: 13px;
		    margin-left: 20px;
		    text-align: center;
		    width: 50%;
		    font-weight: bold;
		    color: #fff;
		    >span {
		    	font-style: italic;
		    	color: #fff;
		    }
		    >.ml15 {
		    	margin-left: 15px;
		    }
		    >.mr15 {
		    	margin-right: 15px;
		    }
	    }
	    >a {
    	    float: right;
		    margin-top: 5px;
		    margin-right: 10px;
		    width: 23%;
		    height: 40px;
		    border-radius: 5px;
		    background-color: #e6e6e6;
		    line-height: 40px;
		    font-size: 14px;
		    color: #4b464c;
		    text-align: center;
	    }
	}
</style>