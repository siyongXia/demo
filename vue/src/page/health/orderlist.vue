<template>
	<div class="typo_small bg_gray" :class="{'orderBox':isNotApp==false,'orderBox2':isNotApp==true}">
		<head-nav v-if="isNotApp==false">我的服务订单</head-nav>
        <div class="pretopmenu" :class="{'protopmenutop':isNotApp==false}">
            <a class="cur">商品订单</a>
            <a href="/vue/network/preslist.html">处方订单</a>
        </div>
		
		<div v-for="(item,index) in orderList" class="mb10 ">
			<template v-if="item.is_exam != 1">
			<router-link v-bind="{to:'/vue/health/orderdetail.html?order_id=' +item.order_id}">
				<Order :order_info="item"></Order>	
				<div  class="typo_orange bg_white totalPrice lhh40 textr" v-if="item.payment == 1">合计预付定金 ¥{{item.order_price}}</div>	
				<div  class="typo_orange bg_white totalPrice lhh40 textr" v-else>合计 ¥{{item.order_price}}</div>	
			</router-link>	
			<div class="lhh44 bg_white container">
				<button class="fl pay_order mr10 typo_gray bor_gray"  v-if="item.use_state == 0 && (item.pay_state == 0 || item.pay_state == 0)" @click="cancelOrder(item)">取消订单</button>
				<button class="fl pay_order typo_gray bor_gray" v-if="item.use_state == 0 && item.pay_state == 1"  @click="refund()">申请退款</button>
				<router-link v-bind="{to:'/vue/health/orderconfirm.html?order_id=' +item.order_id}" class="fl pay_order typo_green bor_green" 
					v-if="item.pay_state == 0 && item.use_state !=-1 && item.pay_type !=2">去支付</router-link>
				<span class="fr" :class="order_state_config[item.use_state][item.pay_state] == '待支付' ? 'typo_green' :'typo_gray'">{{order_state_config[item.use_state][item.pay_state]}}</span> 
			</div>	
			</template>
			<template v-else>
				<a :href="item.url">
					<div class="list_info bor_b bg_white " v-for="(good,i) in item.goods">					
						<div class="list_info_img fl mr15 backgroundimg" :style="{'background-image':'url('+good.goods_thumb+')'}"></div>
						<div class="list_info_content relative">
							<div class="typo_dgray lh20 typo_middle mb5 elli">{{good.goods_name}}</div>
							<div class="typo_smaller price table" >
								<div class=" mr12 typo_middle lh22 typo_orange" >￥{{good.shop_price}}</div>
								<div class="typo_gray line_through lh18">￥{{good.market_price}}</div>
								<span class="typo_gray to_right_bottom">&times;{{good.goods_num}}</span>
							</div>
						</div>				
					</div>		
					<div  class="typo_orange bg_white totalPrice lhh40 textr">合计 ¥{{item.amount}}</div>	
				</a>		
				<div class="lhh44 bg_white container">
					<span class="fr typo_gray" >{{item.order_status}}</span> 
				</div>	
			</template>	
		</div>
		<template v-if="page_count>1 && isNomore == 1">
            <load-more :tip="'正在加载'"></load-more>
        </template>
        <template v-if="isNoData==true">
            <no-data></no-data>
        </template>
	
	</div>
</template>	
<script>
	import Vue from 'vue' 
	import $ from 'jquery' 
	import Order from './Order.vue';
	import HeadNav from '../../components/common/Head.vue'
	import NoData from '../../components/common/NoData.vue'
	import ScrollTop from '../../components/common/scrollTop.vue'
	import * as api from './api/api';
	import { MessageBox } from 'mint-ui';
	import { mapGetters } from 'vuex';
	import {Toast,ToastPlugin,LoadMore } from 'vux'
	Vue.use(ToastPlugin)
	export default {
		data(){
			return {
				isNotApp:false,
            	isNoData:false,
				orderList:[],
				imgDomain:'https://images.91160.com/',
				p:1,
				page_count:'',
				tur:true,
				order_info:{
					imgUrl:'',
					title:'',
					standard:'',
					order_price:'',
					arrive_price:'',
					count:1					
				},
				order_state_config:{//pay_state:10代表无  使用状态:-1已取消 0未使用 1使用中 2已用完','支付状态 0待支付 1已支付 2退款中 3已退款',
					'-1':{
						'3':'已退款',
						'0':'已取消',
					},
					'0':{
						'0':'未使用',
						'1':'未使用',
						'2':'退款中',
						'3':'已退款',
						'10':'未使用'
					},
					'2':{
						'1':'已使用',
						'2':'退款中',
						'3':'已退款'
					}
				}
			}
		},
		computed:{
			...mapGetters([
	          'isLoading'
	        ]),
		},
		methods:{
	        scrollist:function(){
	            //页面滑动加载数据
	            var that = this;
	            window.onscroll = function(){
	                if(that.tur){
	                    var totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
	                    if($(document).height() <= totalheight ){
	                        that.tur = false;
	                        if(parseInt(that.p) < parseInt(that.page_count)){
	                            that.p++;
	                            that.getOrderList(that.p)
	                        }
	                        else{
	                            that.$vux.toast.text('已经全部加载完','middle');
                            	that.isNomore = 0;
	                        }
	                    }                       
	                }         
	            }             
	        }, 
			getOrderList(p){
				api.getOrderList(p,(data)=>{
					var tmp = [];
					if(data.data){
						data && data.data.forEach((item,index)=>{
						if( item.is_exam === 1) {
							tmp.push(item);
						}else {
							tmp.push({
								imgUrl:this.imgDomain + item.goods_cover,
								title:item.goods_name || '',
								standard:item.goods_special_name || '',
								deposit:item.deposit || 0,
								price:item.pay_type == 1 ?item.goods_org_price: item.goods_price,
								orgPrice:item.goods_org_price || 0,
								payment:item.pay_type || '',
								count:item.buy_num || '',
								order_price:item.order_price || '',
								use_state:item.use_state || 0,
								pay_state:item.pay_state || 10,
								pay_type:item.pay_type || 1,
								order_id:item.order_id|| ''
							})
						}
						})
						this.orderList = this.orderList.concat(tmp);
						this.page_count = data.total;
						if (this.page_count >= 1) {
	                        this.isNomore = 1;
	                    }
						this.tur = true;
						this.scrollist();
					}else{
						this.isNoData = true;
					}
				},(err)=>{
					console.log(err);
				})
			},
			cancelOrder(item){
				var order_id = item.order_id;
				MessageBox({
				  title: '提示',
				  message: '您确定取消该订单吗?',
				  cancelButtonText:'不取消订单',
				  confirmButtonText:'取消订单',
				  showCancelButton: true
				}).then((action)=>{
					if(action == 'confirm') {
						api.cancelOrder({order_id:order_id},(data)=>{
							if(data.status == 200) {
								item.use_state = '-1';
							}
							Toast({
								message: data.message,
								position: 'middle',
								duration: 2000
							});							
						},(err)=>{
							console.log(err);
						});						
					}
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
			isApp () {
				var cid = this.$route.query.cid;
				if(cid == 20 || cid == 24 || (typeof (mJavaScriptObject) == 'object')) {
					this.isNotApp = true;
				}else {
					this.isNotApp = false;
				}
			}
		},
		mounted(){
			this.isApp();
			this.getOrderList(1);
	        var metas = document.getElementsByTagName("meta"); 
	        document.title = '我的服务订单';
		},
		components:{
			Order,HeadNav,Toast,LoadMore,ScrollTop,NoData
		}
	}
</script>
<style scoped lang="scss">
	@import './css/health_commom';
	.orderBox{padding-top:2.61333rem}
	.orderBox2{padding-top: 1.44rem;}
	.pretopmenu{position: fixed;top:0; left: 0; z-index:9; width: 100%;border-bottom: solid 1px #f9f9f9; background: #fff;}
	.protopmenutop{top: 1.173333rem;}
	.pretopmenu a{float:left; display: inline-block; width: 50%; line-height: 1.17333rem; text-align: center; font-size: 0.42667rem; color: #707070;}
	.pretopmenu a.cur{color: #00d3c2;}
	.pt48 {
		padding-top: 1.28rem;
	}
	.save {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        text-align: center;
        height: 1.33333rem;
        line-height: 1.33333rem;
    }
	.totalPrice {
        padding-right: 0.4rem;
	    border-bottom: 1px solid #f1f1f1;
	    font-size: 0.37333rem;
	    margin-top: -0.53333rem;
	}
	.pay_order {
		height:0.58667rem;
		line-height:0.58667rem;
		// border: 1px solid #00D3C2;
		line-height:0.53333rem;
		// color:#00D3C2 ;
		padding:0 0.45333rem;
		background-color: #fff;
		border-radius:0.58667rem;
		margin-top: 0.29333rem;
	}
	.bor_green {
		border: 1px solid #00D3C2;
	}
	.bor_gray {
		border: 1px solid #9b9b9b;
	}
	.typo_gray {
		color:  #9b9b9b;
	}
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