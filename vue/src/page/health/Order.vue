<template>
	<!-- 订单信息 -->
	<div class="">
		<div class="list_info  bg_white ">
			<div class="list_info_img fl mr15 backgroundimg" :style="{'background-image':'url('+order_info.imgUrl+')'}"></div>
			<!-- <img class="list_info_img fl mr15" :src="order_info.imgUrl" alt=""> -->
			<div class="list_info_content relative">
				<div class="typo_dgray lh20 typo_middle mb5 elli">{{order_info.title}}</div>
				<div class="c_999 typo_smaller standard">规格：{{order_info.standard}}</div>
				<div class="typo_smaller price lh20 " v-if="order_info.payment == 1">
					<div class="typo_gray mr12 ">预付定金<span class="typo_gray">￥</span>{{order_info.deposit }}</div>
					<div>
						<span class="typo_gray">到店付<span class="typo_gray">￥</span>{{order_info.price - order_info.deposit}}</span>
						<span class="fr typo_gray">&times;{{order_info.count}}</span>						
					</div>	

				</div>
				<div class="typo_smaller price table" v-else>
					<div class=" mr12 typo_middle lh22" :class="confirm == 1 ? 'typo_orange':'typo_gray'">￥{{order_info.price }}</div>
					<div class="typo_gray line_through lh18">￥{{order_info.orgPrice}}</div>
					<span class="typo_gray to_right_bottom">&times;{{order_info.count}}</span>
				</div>				
			</div>				
		</div>
		<slot></slot>	
	</div>
	
</template>
<script>
	import { mapActions, mapGetters } from 'vuex';
	export default {
		props:['order_info','confirm'],
		mounted(){
		}
	}
</script>
<style scoped lang="scss">
	.lh1_2{
		line-height:1.2;
	}
	.mr12 {
		margin-right: 0.32rem;
	}
	.table {display:table;}
	.to_right_bottom {
		display:table-cell;
		vertical-align:bottom;
		text-align:right;
	}
	.list_info {
		padding:0.53333rem 0.4rem;
		// border-bottom: 1px solid #F1F1F1 ;
		>.list_info_img {
			width:2.4rem;
			height:2.4rem;
		}
		>.list_info_content {
			height:2.4rem;
			overflow:hidden;
		}
		.standard {margin-bottom:0.32rem;}
		.price {bottom:0;position:absolute;width:100%;}
	}
</style>