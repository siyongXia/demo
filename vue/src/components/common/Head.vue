<template>
	<div>
		<div class="header">
			<a class="nav-inav typo_white typo_middle iconfont fright" @click="topRgtMenu" href="javascript:void(0);">&#xe62e;</a>
			<span class="iconfont typo_white goback" @click="goback">&#xe60e;</span>
			<slot></slot>
			<div class="fixed nav-menu textc fright" v-if="toprightm==true">
				<a class="block typo_white typo_middle nav-menu-item" href="/" ga-statistics-click="Tab-预约挂号">
					<span class="typo_white iconfont typo_large mr5">&#xe629;&nbsp;</span>预约挂号
				</a>
				<router-link class="block typo_white typo_middle nav-menu-item" v-bind="{to:'/vue/ask/index.html'}" ga-statistics-click="Tab-咨询医生">
					<span class="typo_white iconfont typo_large mr5">&#xe62b;&nbsp;</span>咨询医生
				</router-link>
				<a class="block typo_white typo_middle nav-menu-item" href="/news/" ga-statistics-click="Tab-健康资讯">
					<span class="typo_white iconfont typo_large mr5">&#xe62c;&nbsp;</span>健康资讯
				</a>
				<a class="block typo_white typo_middle nav-menu-item" href="/account/index.html" ga-statistics-click="Tab-个人中心">
					<span class="typo_white iconfont typo_large mr5">&#xe62a;&nbsp;</span>个人中心
				</a>
			</div>
		</div>
		<div class="shadbg" v-if="toprightm==true" @click="topRgtMenu"></div>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				toprightm:false,
				domain:'',
				protocal:''
			}
		},
		mounted: function(){
			this.linkurl()
        },		
		methods:{
			goback:function(){
				history.back(-1)
			},
			topRgtMenu:function(){
				this.toprightm=!this.toprightm;
			},
			linkurl:function(){
				var that = this;
				var nowdomain = document.domain;
				var nowprotocal = window.location.protocol;
				that.domain = nowdomain;
				that.protocal= nowprotocal;
			}
		}		
	}
</script>
<style scoped>
	.header{position:fixed;top:0;left:0;z-index:100;width:100%;height: 1.173333rem; line-height: 1.173333rem; text-align: center; font-size: 0.48rem; color:#fff; background: #00d3c2;}
	.shadbg{position:fixed;top:0;left:0;z-index: 99;width: 100%;height: 100%; background: rgba(0,0,0,0.6);}
	.goback{position: absolute;top:0;left: 0; padding:0 0.266667rem; line-height: 1.173333rem;}
	.nav-inav{position: absolute;top:0;right:0; z-index: 100; padding:0 0.266667rem;}
</style>