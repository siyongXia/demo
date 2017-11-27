<template>
	<div class="bg_white hos_item mb10">
		<router-link class="bor_b pb10" :to="{path:'../productlist.html',query:{unit_id:info.unit_id}}">
			<h4 class="typo_normal fs16 c_333 lh22 clearfix1"><span class="inblo elli w300 fl">{{info.unit_name}}</span><span class="icon_label fl" v-if="info.unit_level === 'B'">三甲</span></h4>
			<div class="mt5">
				<span class="typo_gray lh20 pr15"><i class="iconfont pr5 vtt">&#xe684;</i>评分{{info.score}}</span>
				<span class="typo_gray lh20 pr15"><i class="iconfont pr5 fs16">&#xe61e;</i>{{info.level_name}}</span>
				<span class="typo_gray lh20 "><i class="iconfont pr5">&#xe61b;</i>{{info.class_name}}</span>
				<span class="typo_gray lh20 fr">{{distance}}</span>
			</div>
			<div class="mt10" v-if="info.report !== 0">
				<span class="hos_service fs12 ">检验检查报告</span>
			</div>
		</router-link>
		
		<div class="">
			<template  v-for="(item,index) in info.goods_list">
				<router-link v-if="item.buyWay === '1'" :to="{path:'../product.html',query:{goods_id:item.id}}" class="service_item c_333 block lh20">
					<i class="iconfont fs16 vtm">&#xe6ef;</i>
					<span class="inblo w210 clearfix">{{item.name && item.name.split(' ')[0]}}</span>	
					<span class="ml10 vtm">&yen;{{item.price}}</span>
				</router-link>
				<a :href="item.link" v-else  class="service_item c_333 block lh20">
					<i class="iconfont fs16 vtm">&#xe6ef;</i>
					<span class="inblo w210 clearfix">{{item.name && item.name.split(' ')[0]}}</span>	
					<span class="ml10 vtm">&yen;{{item.price}}</span>
				</a>
			</template>
			

		</div>
		<router-link :to="{path:'../productlist.html',query:{unit_id:info.unit_id}}" class="typo_gray block textc mt30">查看全部{{info.goods_count}}个服务</router-link>
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
		props:['info','distance']                              
	}
</script>

<style scoped lang="scss">
	.w300 {
		max-width:8.0rem;
	}
	.icon_label {

		background-color: #FFB753;
		font-size: 0.26667rem;
		color:#fff;
		margin-left: 0.13333rem;
		padding:0.05333rem 0.12rem;	
		border-radius:0.08rem;
	}
	.hos_item {
		padding:0.48rem 0.48rem 0.26667rem; 
	}
	.vtt {
		vertical-align: top;
	}
	.vtm {
		vertical-align: middle;
	}
	.w210 {
		max-width:5.6rem;
		vertical-align:middle;
		height:0.53333rem;
	}
	.hos_service {
		border: 1px solid #33B2EF;
		color: #33B2EF;
		padding:0 0.26667rem;
		height:0.48rem;
		line-height:0.42667rem;
	}
	.service_item {
		margin-top: 0.37333rem;	
		i {
			display:inline-block;
			width:0.64rem;
			height:0.64rem;
			border-radius:50%;
			background-color: #FEC6C6;
			text-align: center;
			line-height:0.64rem;
			color:#fff;
			margin-right: 0.21333rem;
		}
	}
</style>