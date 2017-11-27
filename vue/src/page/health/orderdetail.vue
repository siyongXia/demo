<template>
	<div class="bg_gray typo_small lh1" v-title data-title="订单详情">
		 <loading v-show="isLoading"></loading>  
		<!-- <mt-loadmore :bottom-method="loadmore" :bottom-all-loaded="allLoaded" ref="loadmore" bottomPullText ="加载更多" @bottom-status-change="bottomStateChange()"> -->
		 <div class="result_card textc bg_white mb10">
		 	<!-- 未取消状态 -->
		 	<template v-if="use_state != -1">
		 		<span class="iconfont icon_state" :class="order_state_info[pay_state].color_class"  v-html="order_state_info[pay_state].icon"></span>
				<div class="mt15 lh24 typo_xlarge typo_dgray mb5">{{order_state_info[pay_state].desc}}</div>
				<div class="typo_gray lh20" v-html="order_state_info[pay_state].content"></div>
		 	</template>
			<!-- 已取消状态 -->
			<template  v-if="use_state == -1">
				<span class="iconfont icon_state typo_gray">&#xe605;</span>
				<div class="mt15 lh24 typo_xlarge typo_dgray mb5">订单已取消</div>
				<div class="typo_gray lh20" >如有疑问，可联系客服4001191160</div>
			</template>
			
		</div> 
		<div class="bg_white mb10">
			<div class="lhh44 ">
				<div class="bor_b clearfix container">
					<span class="fl c_333 typo_middle">联系手机</span>
					<span class="fr typo_small typo_gray ">{{user_phone}}</span>
				</div>				
			</div> 
			<div class="lhh44 clearfix  container" v-if="visit_time">
				<span class="fl c_333 typo_middle">意向时间</span>
				<span class="fr typo_small typo_gray ">{{visit_time}}</span>
			</div>
		</div>
		<!-- 服务流程 -->
		<div class="bg_white  pt20  mb10">
			<div class="container clearfix">
				<div class="c_333 typo_middle">服务流程</div>
				<div class="flex pt40 space_between" >
					<span class="c_333">下单预约</span>
					<span class="c_333">客服确认时间</span>
					<span class="c_333">到店使用</span>
				</div>
				<div class="mt10 service relative mb30">
					<div class="clearfix1">
						<div class="middle_bor"></div>
						<div class="middle-con"></div>
						<span class="circle_out"></span>
						<span class="circle_out ml78"></span>
						<span class="circle_out ml78"></span>
					</div>
					<div class="clearfix1">
						<div class="circle_in bg_green">
							<span class="iconfont typo_white typo_xxlarge">&#xe66b;</span>
						</div>
						<div class="line l50 bg_green"></div>
						<div class="circle_in l150 " :class="(visit_time || use_state == 2)  ? 'bor_green':'bor_gray'">
							<span class="iconfont typo_green fs30">&#xe6cf;</span>
						</div>
						<div class="line l193 " :class="(visit_time || use_state == 2) ? 'bg_green':'bg_gray'"></div>
						<div class="circle_in l292 " :class="use_state == 2 ? 'bg_green':'bg_gray'">
							<span class="iconfont typo_white typo_xxlarge">&#xe6d6;</span>
						</div>
					</div>				
				</div>
			</div>
		</div>
		
		<!-- 订单信息 -->
		<Order :order_info="order_info" @click.native="goGoodsDeatail()"></Order>	
		<div  class="typo_orange bg_white totalPrice lhh40 textr mb10" v-if="order_info.payment == 1">合计预付定金 ¥{{order_info.order_price}}</div>	
		<div  class="typo_orange bg_white totalPrice lhh40 textr mb10" v-else>合计 ¥{{order_info.order_price}}</div>	
		<div class="bg_white container pt18 pb20">
			<div class="typo_gray fs13 lh18" id="order_no">订单编号：{{order_info.order_id}}</div>
			<div class="typo_gray fs13 lh18" v-if="order_info.pay_number">支付编号：{{order_info.pay_number}}</div>
			<div class="typo_gray fs13 lh18">创建时间：{{order_info.add_time}}</div>
			<div class="typo_gray fs13 lh18" v-if="order_info.pay_time">付款时间：{{order_info.pay_time}}</div>
			<button class="consult mt20" v-if="false">在线咨询</button>
		</div>
		<div class=" bg_gray  textc " v-if="brandList && brandList.length>0">
			<span class="dividle typo_gray"><span class="iconfont typo_gray mr5">&#xe6d5;</span>推荐</span>		
		</div>	
		<template v-if="brandList && brandList.length >=2">
			<div class="pl15 bg_white clearfix">
		        <div class="sub_title typo_dgray">
		            <span>小六推荐</span>
		        </div>
		    </div>
			<ul class="bg_white rec_lists" clearfix>
			    <li v-for="(item,index) in brandList" class="list_item clearfix1">
			    	<router-link :to="'product.html?goods_id='+item.id">
			    		<img :src="imgDomain + JSON.parse(item.img)[0]" alt="" class="fl mr10">
				    	<div class="clearfix">
				    		<div class="desc typo_middle typo_dgray overtwo">{{item.name}}</div>
				    		<div class="typo_smaller price table mt5">
								<span class="typo_orange mr12 typo_middle">￥{{item.price}}</span>
								<span class="typo_gray line_through">￥{{item.orgPrice}}</span>
							</div>
				    	</div>
			    	</router-link>		    	
			    </li>
		    </ul>			
		</template>
		
	  <!--   <div slot="bottom" class="mint-loadmore-bottom textc lhh40">
	    	<span  v-if="showLoading === false">上拉加载更多...</span>
	    	<template v-else="showLoading">
	    		<img src="https://static.91160.com/wechat/img/healthmall/loading.gif" alt=""  class="loadmore_icon">数据加载中
	    	</template>	

	     	
	    </div> -->
		<!-- </mt-loadmore> -->
		<div style="height:50px;"  class="bg_white container pt18"></div>
		<div class="lhh40 bg_white container textr bor_t fix_bottom" v-if="true" >		
			<button class="btn bor_gray typo_gray mr10" @click="cancelOrder()" v-if="pay_state == 0 && use_state == 0">取消订单</button>
			<button class="btn bor_gray typo_gray mr10" @click="refund()" v-if="use_state == 0 && pay_state == 1" >申请退款</button>
			<router-link to="orderlist.html" class="btn bor_green typo_green mr10 textc" >我的订单</router-link>
			<button class="btn bor_green typo_green" @click="payMoney()" v-if="pay_state == 0 && use_state !=-1 && pay_type !=2">去支付</button>
		</div>

	</div>
</template>
<script>
	import Order from './Order.vue';	
	import { Loadmore } from 'mint-ui';
	import Vue from 'vue';
	import { MessageBox } from 'mint-ui';
	import { mapGetters } from 'vuex';
	import { Toast } from 'mint-ui';
	Vue.component(Loadmore.name, Loadmore);
	import * as api from './api/api';
	export default {
		data(){
			return {
				order_id:'',
				goods_id:'',
				showLoading:false,
				pay_state:-1,//0待支付 1已支付 2退款中 3已退款',
				use_state:-1,//1已取消 0未使用 1使用中 2已用完',
				pay_type:-1,
				user_phone:'',
				visit_time:'',
				imgDomain:'http://images.91160.com/',
				brandList:{},
				order_state_info:{
					'0':{
						icon:'&#xe6d7;',
						desc:'订单等待付款',
						content:'',
						color_class:'c_ffb'
					},
					'1':{
						icon:'&#xe653;',
						desc:'您已成功预约该服务。',
						content:'客服将在1-3个工作日联系您<br/>如有疑问，可联系客服4001191160',
						color_class:'c_71d'
					},
					'2':{
						icon:'&#xe6d3;',
						desc:'订单退款中',
						content:'如有疑问，可联系客服4001191160',
						color_class:'c_71d'
					},
					'3':{ 
						icon:'&#xe6d2;',
						desc:'已退款',
						content:'如有疑问，可联系客服4001191160',
						color_class:'c_ffb'
					}				
				
				},
				order_info:{
				},
				allLoaded :false
			}
		},
		mounted(){
			this.order_id = this.$route.query.order_id ;
			this.getOrderDetail(this.order_id );
			
		},
		computed:{
			...mapGetters([
	          'isLoading'
	        ]),
		},
		methods:{	
			initBackTime(addTime){
				var d = new Date(addTime),
					endDate = new Date(d.getTime() + 24 *3600 *3*1000),
					now = new Date();
				var duration = endDate - now;
				var day = parseInt(duration/24/60/60/1000),
					hour = Math.ceil(duration%(24*60*60*1000)/3600000);
				var str = '剩'+day+'天'+hour+'小时自动关闭';
				this.order_state_info['0'].content =str; 

			},
			initDesc(){//针对已支付,已用完
				if(this.pay_state == 1 && this.use_state == 2) {//已支付,已用完
					this.order_state_info['1'].desc = '您的服务已使用';
					this.order_state_info['1'].content = '如有疑问，可联系客服4001191160';
				}

			},
			getOrderDetail(order_id){				
				api.getOrderDetail(order_id,(data)=>{
					this.order_info = {
						imgUrl:this.imgDomain + data.goods_cover,
						title:data.goods_name,
						standard:data.goods_special_name,
						deposit:data.goods_price,
						price: data.pay_type == 1 ?data.goods_org_price:data.goods_price,
						orgPrice:data.goods_org_price,
						count:data.buy_num,
						order_id:data.order_id,
						order_price:data.order_price,
						payment:data.pay_type,
						pay_number:data.pay_number,
						add_time:data.add_time,
						pay_time:data.pay_time			
					}
					this.pay_state = data.pay_type == 2 ? 1 : data.pay_state;//如果是免支付类型,默认等于1(已支付)
					this.use_state = data.use_state;
					this.pay_type = data.pay_type;
					this.user_phone = data.user_phone;
					this.visit_time = data.visit_time;
					this.goods_id = data.goods_id;
					this.getBrandList(this.goods_id);
					this.initBackTime(data.add_time);
					this.initDesc();
				},(err)=>{
					console.log(err);
				})
			},
			payMoney(){
				var order_id = this.$route.query.order_id ;
				this.$router.push({path:'orderconfirm.html?order_id='+order_id});
			},	
			getBrandList(goods_id){
				api.getRecommend(goods_id,(data)=>{
					this.brandList = data.brand;
				},(err)=>{
					console.log(err);
				})
			},
			refund(){//申请退款
				MessageBox({
				 title:' ',
				  message: '请拨打4001191160，申请退款',
				  cancelButtonText:'取消',
				  confirmButtonText:'确定',
				  showCancelButton: true
				})
			},
			goGoodsDeatail(){
				var order_id = this.order_id ,
					goods_id = this.goods_id ;
				this.$router.push({path:'product.html?order_id='+order_id+'&goods_id='+goods_id});
			},
			loadmore(id){
				this.showLoading = true;
				setTimeout(()=>{
					for(var i = 0 ; i < 5 ; i ++) {
						this.list.push(1);
					}										
					this.showLoading = false;
				}, 2000);

				this.allLoaded = true;// 若数据已全部获取完毕
				this.$refs.loadmore.onBottomLoaded(id);				
			},
			bottomStateChange(status){
				this.allLoaded = status;// 若数据已全部获取完毕
			},
			cancelOrder(){
				MessageBox({
				  title: '提示',
				  message: '您确定取消该订单吗?',
				  cancelButtonText:'不取消订单',
				  confirmButtonText:'取消订单',
				  showCancelButton: true
				}).then((action)=>{
					if(action == 'confirm') {
						var order_id = this.order_id;
						api.cancelOrder({order_id:order_id},(data)=>{
							if(data.status == 400) {
								Toast({
									message: data.message,
									position: 'middle',
									duration: 2000
								});
							}else {
								console.log(data);
							}								
						},(err)=>{
							console.log(err);
						});						
					}
				})
			}
		},
		components:{
			Order
		}
	}
</script>
<style scoped lang="scss">
	@import './css/health_commom';
	.totalPrice {
	    padding-left: 3.2rem;
	    border-top: 1px solid #f1f1f1;
	    font-size: 0.37333rem;
        padding-right: 0.4rem;
	}
	.sub_title {
	      border-left: 3px solid #00d3c2;
	      padding-left: 0.13333rem;
	      color: #4A4A4A;
	      font-size: 0.42667rem;
	      margin: 0.26667rem 0 0.32rem 0;
	      >span {
	          margin-right: 0.64rem;
	      }
	  }	
	.icon_img {
	    width: 0.64rem;
	    height: 0.58667rem;
	    margin-top: 0.26667rem;
	}	
	.loadmore_icon {
		width:0.42667rem;
		margin-right:0.26667rem;
		vertical-align: middle;
	}
	.btn {
		width:2.02667rem;
		height:0.69333rem;
		line-height:0.69333rem;
		border-radius:0.69333rem;	
		background-color: #fff;	
		display:inline-block;	
	}
	.c_ffb {
		color:#ffb937;
	}
	.c_71d{
		color:#71de68;
	}
	.result_card {
		padding:1.06667rem 0 0.96rem;
		.icon_state {
			font-size: 1.33333rem;
		}
	}
	.service {
		.middle_bor {
			height:9px;
			border-top:1px solid #f1f1f1;
			border-bottom:1px solid #f1f1f1;
			position:absolute;
			left:0;
			top:50%;
			transform:translateY(-50%);
			width:100%;
			z-index:1;
			
		}
		.middle-con{
			content:'';
			position:absolute;
			left:0.05333rem;
			top:50%;
			width:90%;
			height:9px;
			background: #fff;
			transform:translateY(-50%);
			z-index:3;
		}
		.circle_out {
			display:inline-block;
			width:1.6rem;
			height:1.6rem;
			border: 1px solid #f1f1f1;
			border-radius:50%;
			position:relative;
			z-index:2;
			background-color:#fff;
		}
		.circle_in {
			text-align: center;
			width:1.17333rem;
			height:1.17333rem;
			line-height:1.17333rem;
			display:inline-block;
			border-radius:50%;
			position:absolute;
			left:0.21333rem;
			top:50%;
			transform:translateY(-50%);
			z-index:4;
		}
		.l150 {
			left:4.0rem;
		}
		.l292 {
			left:7.78667rem;
		}
		.l50 {
			left:1.33333rem;
		}
		.l193 {
			left:5.14667rem;
		}
		.line {
			height:0.02667rem;
			position:absolute;
			width:2.66667rem;
			top:50%;			
			transform:translateY(-50%);
			z-index:5;
		}		
	}	
	.list_info {
		padding:0.53333rem 0.4rem;
		border-bottom:2px solid #f1f1f1;
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
	.rec_lists {
		>.list_item {
			padding:0.4rem 0.48rem;
			img {
				width:2.13333rem;
				height:1.6rem;
				border-radius:0.13333rem;
				overflow:hidden;
			}
			.desc {
			    line-height: 1.25;
    			height: 2.5em;
			}

		}
	}
	.consult {
		width:3.2rem;
		height:0.8rem;
		line-height:0.8rem;
		border: 0.02667rem solid #00D7C2;
		color:#00D7C2;
		text-align: center;
		background:#fff;
		border-radius:0.85333rem;
	}
		
</style>