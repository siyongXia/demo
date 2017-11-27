<template>	
	<div v-if="isNavigateBarShow">
		<div class="flex lh1 navigatebar typo_xlarge" :style="{background:options.bgColor || '#000',color:options.color || '#fff'}">
			<span class="iconfont " :class="options.iconClass || 'typo_dgrey'" v-html="options.iconLeftCode" @click="goBack()"></span>
			<div class="center flex-item textc elli typo_middle">{{options.title}}</div>
			<span class="iconfont" :class="options.menuClass?options.menuClass:''" v-if="options.iconRightCode" v-html="options.iconRightCode"  @click="showMenuBox()"></span>			
		</div>
		<maskBox v-if="isMenuBoxShow" @click.native="hideMenuBox()"></maskBox>
		<div class="menu_box " v-if="isMenuBoxShow" :class="options.menuClass?options.menuClass:'default'">
			<a href="https://wap.91160.com/" >
				<span class="iconfont typo_large mr5">&#xe629;&nbsp;</span>预约挂号
			</a>
			<a href="https://wap.91160.com/ask/index.html" >
				<span class="iconfont typo_large mr5">&#xe62b;&nbsp;</span>咨询医生
			</a>
			<a href="https://wap.91160.com/news/index.html" >
				<span class="iconfont typo_large mr5">&#xe62c;&nbsp;</span>健康资讯
			</a>
			<a href="https://wap.91160.com/account/index.html" >
				<span class="iconfont typo_large mr5">&#xe62a;&nbsp;</span>个人中心
			</a>
		</div>
		<div class="h48"></div>
	</div>
</template>
<script>
	import maskBox from '../Mask.vue'
	import { mapGetters } from 'vuex'
	export default {
		data(){
			return {
				isMenuBoxShow:false,
				isShow:true
			}
		},
		computed:{
			...mapGetters([
				'isNavigateBarShow'
			])
		},
		methods:{
			goBack(){
				window.history.go(-1);
			},
			showMenuBox(){
				this.isMenuBoxShow = !this.isMenuBoxShow
			},
			hideMenuBox(){
				this.isMenuBoxShow = false;
			}
		},
		components:{
			maskBox
		},
		props:['options','isSpecial']
	}
</script>
<style scoped lang = 'scss'>
	.h48 {
		height: 1.28rem;
	}
	.menu_box {
		position: fixed;
		width: 4.26667rem;
		top: 1.28rem;
		right: 0;
		z-index: 11;
		transition: all 0.5s;
		/*transform:scaleY(0);*/
		>a {
			display: block;
			height: 1.44rem;
			line-height: 1.44rem;
			text-align: center;
			width: 100%;
			font-size: 0.42667rem;
		}
		&.default {
			>a{
				color: #fff;
			}
			>a:nth-child(2n-1) {
				background-color: #33b5c1;
			}
			>a:nth-child(2n) {
				background-color: #1cadba;
			}
		}
		&.typo_green {
			>a{
				color: #00d2c3;
				background-color: #fff;
				border-bottom:  1px solid #f1f1f1;
			}
		}
		
	}
	.navigatebar {
		height:1.28rem;
		line-height: 1.28rem;
		background-color: #000;
		color: #fff;
		padding: 0 0.32rem;
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 11;
	}
</style>