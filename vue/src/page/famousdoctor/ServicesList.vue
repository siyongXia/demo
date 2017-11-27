<template>
	<div>
		<div class="topmenu bg_white layout">
			<dl v-for="(two,index) in two">
				<a class="block layout" :href="two.url" @click="gaSend('名医主页_业务入口量'+two.name)">
					<dt><img :src="'https://static.91160.com/wechat/img/famousdoctor/'+two.type+'.png'"></dt>
					<dd>
						<span>{{two.name}}</span>
						{{two.sub_title}}
					</dd>
				</a>
			</dl>
		</div>
		<div class="topmenu2 bg_white layout">
			<dl v-for="(four,index) in four">
				<a class="block layout" :href="four.url" @click="gaSend('名医主页_业务入口量'+four.name)">
					<dt><img :src="'https://static.91160.com/wechat/img/famousdoctor/'+four.type+'.png'"></dt>
					<dd>
						{{four.name}}
						<span>{{four.sub_title}}</span>
					</dd>
				</a>
			</dl>
		</div>
		<foot-nav></foot-nav>	
	</div>	
</template>
<script>
	import MenuTitle from './Menu.vue'
	import FootNav from '../../components/common/FootNav.vue'
	export default{
		data(){
			return {
				askListUrl:'/ask/askdoc.html',
				
			}
		},
		components:{
			MenuTitle,
			FootNav
		},
		mounted:function(){

		},
		props:['two','four']
	}	
</script>
<style scoped lang="scss">
	.topmenu{border-bottom: solid 0.026667rem #f5f5f5;}
	.topmenu dl{position:relative;float: left; width: 33.33%;text-align: center;
		a{ padding:0.26667rem 0;}
		dt {display:inline-block; width:1.06667rem; height:1.06667rem;margin:0 auto; line-height:1.06667rem;
			img{width:1.06667rem;}
		}
		dd{padding-top:0.05333rem; line-height:0.42667rem; font-size:0.32rem;color: #9b9b9b;
			span{display: block; font-size: 0.37333rem; color: #333;}
		}
	}
	.topmenu2 dl{position:relative;float: left; width: 33.33%;  text-align: center;
		a{padding:0.26667rem 0 0.32rem 0;}
		dt { display: inline-block; width: 0.853333rem; height: 0.853333rem; margin:0 auto; line-height: 0.853333rem;
			img{ width: 0.853333rem;}
		}
		dd { line-height: 0.48rem; font-size: 0.373333rem; color: #333; }
	}
	.topmenu dl:not(:last-child):after,.topmenu2 dl:not(:last-child):after{content:'';position:absolute; right:0;top:0; width:1px;background:#f5f5f5;}
	.topmenu dl:after{height:3.04rem;}
	.topmenu2 dl:after{height:2.02667rem;}
</style>