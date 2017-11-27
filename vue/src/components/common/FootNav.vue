<template>
	<div class="footnav block textc typo_lgray">
		<a href="/">
			<span class="iconfont block typo_xxlarge lh22 pt5">&#xe6a4;</span>
			<span class="block lh20">首页</span>
		</a>
		<router-link class="active" v-bind="{to:'/vue/ask/index.html'}"> 
			<span class="iconfont block typo_xxlarge lh22 pt5">&#xe6e4;</span>
			<span class="block lh20">名医</span>
		</router-link>
		<a href="/health/index.html">
			<span class="iconfont block typo_xxlarge lh22 pt5">&#xe6c7;</span>
			<span class="block lh20">健康</span>
		</a>
		<a href="/notice/index.html">
			<span class="iconfont block typo_xxlarge lh22 pt5">&#xe6a5;</span>
			<span class="block lh20">消息</span>
	        <span class="bot-tips">{{msgNum}}</span>
		</a>
		<a href="/account/index.html">
			<span class="iconfont block typo_xxlarge lh22 pt5">&#xe6e7;</span>
			<span class="block lh20">我的</span>
			<span v-bind:class="{ bottipsno: notipsnum }"></span>
		</a>
	</div>
</template>
<script>
	import Vue from 'vue'
	export default {
		data () {
			return {
				domain:'',
				protocal:'',
				msgNum:'',
				notipsnum:false,
			}
		},
		mounted: function(){
			this.linkurl();
			this.getUnReadMsg();

        },		
		methods:{
			goback:function(){
				history.back(-1)
			},
			linkurl:function(){
				var that = this;
				var nowdomain = document.domain;
				var nowprotocal = window.location.protocol;
				that.domain = nowdomain;
				that.protocal= nowprotocal;
			},
			getUnReadMsg:function(){
				var that = this;
				var cid = this.$route.query.cid;
				var code = typeof(this.$route.query.code) != 'undefined' ? this.$route.query.code : 0;
				this.$http({				
					method:'get',
					url: '/sys/getUnReadMsg.html?code='+code}).then(					
					function(res){
						if(res.data.state==1){
							Vue.nextTick(function(){
								that.msgNum = res.data.data.unread_info.unread_desc;
								if(res.data.data.commentCount>0){
									that.notipsnum = true;
								}else{
									that.notipsnum = false;
								}
							});
						}
					}
				)								
			},
		}		
	}
</script>
<style scoped>
	.footnav{position: fixed;bottom: 0;left: 0;z-index: 2; width: 100%; border-top: solid 0.026667rem #e0e0e0; background: #fff;}
	.footnav a{ position: relative; float: left;width: 20%; font-size:0.32rem;color: #b7b7b7}
	.footnav a.active{color: #00d3c2}
	.bot-tips{position: absolute; top: 0; left: 50%; min-width: 6px; padding: 0 5px; margin-left: 2px; border-radius: 10px; line-height: 16px; text-align: center; font-size: 12px; color: #fff; background: #f00;}
	.bottipsno{    position: absolute; top: 1px; left: 50%; width: 8px; height: 8px; margin-left: 3px; border-radius: 100%; line-height: 16px; font-size: 12px; color: #fff; background: #f00;}
</style>