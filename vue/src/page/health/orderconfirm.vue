<template>
	<div class="typo_small bg_gray"  v-title data-title="预约信息">	
        <loading v-show="isLoading"></loading>  
        <Order :order_info="order_info" :confirm="1" v-if="order_id != -1"></Order>
		<Order :order_info="order_info"  :confirm="1" v-else></Order>
		<div class="lhh44 bg_white mb10 container">
			<span class="fl c_333 typo_middle">联系手机</span>
			<span class="fr typo_small typo_gray">{{phone}}</span>
		</div>
		<div class="lhh44 bg_white mb10 relative container">
			<span class="fl c_333 typo_middle">购买数量</span>
            <span  class="fr" v-if="order_id != -1">{{count}}</span>
			<addCount class="add_count" v-on:count="getCount" :maxCount="parseInt(defaultCate.stock)" :minCount="count" v-else></addCount>
		</div>
		<div class="pay_method bg_white" v-if="payment != 2">
		<!-- <div class="pay_method bg_white" v-if="totalPrice > 0"> -->
			<div class="lh22 pb10 c_333 typo_middle">支付方式</div>
			<ul >
                <li class="pay_item lh1 clearfix"  @click="selectBalancePay()">
                    <img :src="balanceInfo.icon" height="90" width="90" alt="" class="mr10 pay_icon fl"> 	
                    <div class="fl">
                        <div class=" c_333 typo_middle">{{balanceInfo.name}}</div>
                         <div class="typo_xsmall pay_desc mt4" >剩余零钱<span class="typo_orange">￥{{balanceInfo.my_balance}}</span>元</div> 
                    </div>
                    <div class="fr pay_radio" >
                        <span class="iconfont typo_xlarge typo_green " v-if="isBalancePay && balanceInfo.my_balance > 0">&#xe63b;</span>
                        <span class="iconfont typo_xlarge c_d1d1d1" v-else>&#xe64e;</span>
                    </div>					
				</li>
				<li class="pay_item lh1 clearfix"  :class="index == pay_methods.length -1 ? 'bor_none':''" v-for="(item,index) in pay_methods" 
                    @click.stop="selectPayMethod(index)" :data-tips="tips" >
					<img :src="item.icon" height="90" width="90" alt="" class="mr10 pay_icon fl"> 	
					<div class="fl">
						<div class=" c_333 typo_middle">{{item.name}}</div>
                        <div class="typo_xsmall pay_desc mt4"  v-if="isTipsShow && payId == index">还需要支付<span class="typo_orange">{{totalPrice - balanceInfo.my_balance}}</span>元</div>
						<div class="typo_xsmall pay_desc mt4" v-html="item.desc" v-else></div>
                     
					</div>
					<div class="fr pay_radio" >
						<span class="iconfont typo_xlarge typo_green " v-if="payId == index">&#xe63b;</span>
						<span class="iconfont typo_xlarge c_d1d1d1" v-else>&#xe64e;</span>
					</div>					
				</li>
			</ul>	
		</div>	
		<div class="tips c_f5f5f5">订单预定成功后，客服将在1-3个工作日联系您。</div>
		<button class="bg_green typo_white save typo_middle" @click="addOrder()" v-if="totalPrice > 0">确定支付<span class="ml10 typo_large mr5">&yen;</span>{{totalPrice}}</button>	
        <button class="bg_green typo_white save typo_middle" @click="addOrder()" v-else>确定</button> 
	</div>
</template>
<script>
    import {
        mapActions,
        mapGetters
    } from 'vuex';
    import Order from './Order.vue';
    import addCount from 'components/common/addCount.vue';
    import * as api from './api/api.js';
    import { Toast } from 'mint-ui';   
    export default {
        data() {
            return {
                payId: -1,
                totalPrice:0,
                order_id:-1,
                phone:'',
                imageDomain:'http://images.91160.com/',
                tips:'',
                flag:true,
                infos:{},
                goods_info:{},
                defaultCate:{},
                goods_price:'',
                count:1,
                payment:-1,
                act_count:1,
                order_info: {},
                isBalancePay:true,
                isTipsShow:false,
                balanceInfo:{
                    name:'余额支付',
                    my_balance: 0,
                    icon: require('./images/wallet.png')
                },  
                pay_methods_config:{
                    13:{
                        name:'支付宝支付',
                        desc: '推荐支付宝用户使用',
                        icon: require('./images/alipay.png')
                    },
                    14:{
                        name:'微信支付',
                        desc: '推荐微信用户使用',
                        icon: require('./images/weixin.png')
                    },
                    17:{
                         name:'QQ支付',
                         desc: '推荐QQ用户使用',
                         icon: require('./images/QQpay.png')
                    }
                },         
                pay_methods: []
            }
        },
        computed: {
            ...mapGetters('health', [
                // 'count',
                // 'infos',
                // 'defaultCate',
                // 'payment'
            ]),
            ...mapGetters([
              'isLoading'
            ]),
        },
        methods: {
            getPayMethod(){
                api.getPayMethod(
                    (data)=>{
                        this.phone = data.phone;
                        var pay_methods = data.pay_methods,tmp = [];
                        for(var k in pay_methods) {
                            tmp.push({
                                pay_method:pay_methods[k].pay_method,
                                name:pay_methods[k].method_name,
                                desc:this.pay_methods_config[pay_methods[k].pay_method].desc,
                                icon:this.pay_methods_config[pay_methods[k].pay_method].icon,
                            })
                        }
                        this.pay_methods = tmp;
                        this.balanceInfo.my_balance = data.my_balance; 
                        this.phone = data.phone;
                    },
                    (err)=>{
                        console.log(err);
                    }
                );
            },
            getCount(count) {
                this.act_count = count;
                this.order_info.count = count;
                if(this.payment == 1) {
                   this.totalPrice = (count * this.infos.goodsParts.deposit).toFixed(2);
                   // this.order_info.deposit =(count * this.infos.goodsParts.deposit).toFixed(2); 
                }else if(this.payment == 0) {
                    this.totalPrice = (count * this.defaultCate.price).toFixed(2);
                    // this.order_info.price =(this.defaultCate.price *  count).toFixed(2); 
                    // this.order_info.orgPrice =(this.defaultCate.price * count).toFixed(2); 
                }
               
            },
            selectPayMethod(index) {//其他支付方式点击逻辑
                if (this.payId == index ) {//双击切换选中状态
                    this.payId = -1;
                    return;
                }
                if(this.balanceInfo.my_balance > this.totalPrice) {
                    this.isBalancePay = false;
                }
                this.payId = index; 
                if( this.totalPrice > this.balanceInfo.my_balance) {
                    this.isTipsShow = true;
                }else {
                    this.isTipsShow = false;
                }         

            },
            selectBalancePay(){//余额支付按钮点击逻辑
                if(this.balanceInfo.my_balance > this.totalPrice) {
                    this.payId = -1;//其他支付方式不选中
                    if( this.isBalancePay) {//防止用户说明都不选中
                        return;
                    }
                }
                this.isBalancePay = !this.isBalancePay;
                
            },
            addOrder() {
                var pay_method,has_balance_pay;
                var order_id = this.$route.query.order_id || '-1';
                if(this.payId !== -1) {
                    pay_method = this.pay_methods[this.payId].pay_method;
                }else {
                    pay_method = 0;
                }
                if( !!this.balanceInfo.my_balance && this.isBalancePay ) {
                    has_balance_pay = 1;
                }else {
                    has_balance_pay = 0;
                }
                if(order_id == -1) {
                    var data = {
                        goods_id: this.infos.goodsParts.id,
                        goods_audit_id: this.infos.goodsParts.goodsAuditId,
                        goods_name: this.infos.goodsParts.name,
                        goods_special_id: this.defaultCate.specialId,
                        goods_special_name: this.defaultCate.name,
                        unit_id:this.infos.docRelation.unit_id,
                        doctor_id:this.infos.docRelation.doctor_id,
                        buy_num: this.act_count,
                        goods_price:this.goods_price,
                        goods_org_price: this.defaultCate.price,
                        user_phone:this.phone,
                        order_price: this.totalPrice,
                        goods_cover: JSON.parse(this.infos.goodsParts.img)[0],
                        pay_method:pay_method,
                        has_balance_pay:has_balance_pay,
                        order_id:'',
                        payment:this.infos.goodsParts.payment
                    };
                }else {
                    var data = {
                        goods_id: this.goods_info.goods_id,
                        goods_audit_id: this.goods_info.goods_audit_id,
                        goods_name: this.goods_info.goods_name,
                        goods_special_id: this.goods_info.goods_special_id,
                        goods_special_name: this.goods_info.goods_special_name,
                        unit_id:this.goods_info.unit_id,
                        doctor_id:this.goods_info.doctor_id,
                        buy_num: this.goods_info.buy_num,
                        goods_price:this.goods_info.goods_price,
                        goods_org_price: this.goods_info.goods_org_price,
                        user_phone:this.goods_info.user_phone,
                        order_price: this.goods_info.order_price,
                        goods_cover: this.goods_info.goods_cover,
                        pay_method:pay_method,
                        has_balance_pay:has_balance_pay,
                        order_id:'',
                        payment:this.goods_info.pay_type
                    }
                }
                 
                if(this.flag) {
                    this.flag = false;
                    api.addOrder(data,
                        (data) => {
                            this.flag = true;
                            if(data.status == 200) {
                                var message = '';
                                pay_method == 0 ? message = data.message : message = '跳转到第三方支付';
                                Toast({
                                    message: message,
                                    position: 'middle',
                                    duration: 2000
                                });                               
                                setTimeout(function() {
                                    location.href = data.data.redirect;
                                }, 1000);
                                
                            }else if(data.status == 401) {
                                Toast({
                                    message: data.message,
                                    position: 'middle',
                                    duration: 2000
                                });
                                setTimeout(function() {
                                    location.href = data.url+'?url='+location.href;
                                }, 1000);
                            }else {
                                Toast({
                                    message: data.message,
                                    position: 'middle',
                                    duration: 2000
                                });
                            }
                        },
                        (err) => {
                            console.log(err);
                        }
                    )
                }
               
            },
            initOrderInfo() {
                this.order_info = {
                    imgUrl: this.imageDomain + (this.defaultCate.img || JSON.parse(this.infos.goodsParts.img)[0]),
                    title: this.infos.goodsParts.name,
                    standard: this.defaultCate.name,
                    payment:this.infos.goodsParts.payment,
                    deposit: this.infos.goodsParts.deposit,
                    price: this.defaultCate.price,
                    orgPrice: this.defaultCate.orgPrice,
                    count: this.count
                }                
            },
            getOrderInfos(order_id){
                api.getOrderDetail(order_id,(data)=>{
                    this.payment = data.pay_type;
                    this.order_info = {
                        imgUrl: this.imageDomain + (data.goods_cover || JSON.parse(this.infos.goodsParts.img)[0]),
                        title: data.goods_name,
                        standard: data.goods_special_name,
                        payment:data.pay_type,
                        deposit: data.deposit,
                        price: data.pay_type == 1 ?data.goods_org_price: data.goods_price,
                        orgPrice: data.goods_price,
                        count: data.buy_num
                    }
                    this.count =  data.buy_num;
                    this.goods_info = data;
                },(err)=>{
                    console.log(err);
                })
            }
        },
        mounted() {
            var order_id = this.$route.query.order_id || '-1';
            this.order_id = order_id;
            if(order_id != -1) {
                this.getOrderInfos(order_id);
            }else {
                 this.infos = JSON.parse(window.sessionStorage.getItem('infos'));
                 this.defaultCate =  JSON.parse(window.sessionStorage.getItem('defaultCate'));
                 this.count =  JSON.parse(window.sessionStorage.getItem('count')) || 1;
                 this.payment = JSON.parse(window.sessionStorage.getItem('payment')) || 1;
                 this.initOrderInfo();
            }          
            if(this.payment == 1) {
                this.totalPrice = (this.count * this.infos.goodsParts.deposit).toFixed(2);
                this.goods_price = this.infos.goodsParts.deposit;
            }else if(this.payment == 0) {
                this.totalPrice = (this.count * this.defaultCate.price).toFixed(2);
                this.goods_price = this.defaultCate.price;
            }
            this.getPayMethod();    
          
           
        },
        components: {
            addCount,
            Order
        }
    }
</script>

<style scoped lang="scss">
    @import './css/health_commom';
    .c_f5f5f5 {
        background-color: #f5f5f5;
    }
    .add_count {
        position: absolute;
        right: 0.4rem;
        top: 0.24rem;
    }
    
    .pay_method {
        padding: 0.45333rem 0 0 0.4rem;
        .pay_item {
            padding: 0.34667rem 0 0.32rem 0;
            border-bottom : .026667rem solid #f1f1f1;
        }
        .pay_icon {
           width:0.8rem;
           height: 0.8rem;
        }
        .pay_desc {
            color: #7C8084;
            line-height: 0.37333rem;
        }
        .pay_radio {
            margin-top: 0.37333rem;
            margin-right: 0.53333rem;
        }
    }
    
    .tips {
        padding: 0.53333rem 0 1.6rem;
        text-align: center;
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
</style>