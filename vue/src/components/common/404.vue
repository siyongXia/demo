<template>
	<div class="common_head  fs16">
		<x-header :left-options="{backText: ''}" v-if="!commonIsApp">健康160</x-header>
		<div class="container textc">
			<img src="../../static/404.png" alt="" class="img">
			<p class="lh24">您访问的链接错误</p>
			<p class="lh24">页面<i class="typo_green">{{backTime}}</i>s后自动<span @click="goBack()" class="typo_green">跳转</span></p>
		</div>
		
	</div>
</template>
<script>
	import { XHeader } from 'vux'
	import { mapGetters } from 'vuex'
	export default {
		data(){
			return {
				backTime:5,
				timer:null
			}
		},
		computed:{
			...mapGetters([
				'commonIsApp'
			])
		},
		methods:{
			goBack () {
				window.location = '/';
				clearInterval(this.timer);
			}
		},
		mounted(){
			this.timer = setInterval(()=>{
				this.backTime--;
				if( this.backTime === 0 ) {
					this.goBack();
				}
			}, 1000);
		},
		beforeDestroy () {
			clearInterval(this.timer);
		},
		components:{
			XHeader
		}
	}
</script>

<style scoped lang="scss">
	.vux-header {
		background-color: #00d2c3;
	}
	.container {
		position:absolute;
		width:100%;
		top:50%;
		transform:translateY(-50%);
	}
	.img {
		width:5.33333rem;
		margin-top: -0.8rem;
	}
</style>