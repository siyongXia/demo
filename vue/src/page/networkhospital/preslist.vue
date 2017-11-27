<template>
    <div :class="{'networkBox':isApp==false,'networks':isApp==true}">
        <head-nav v-if="isApp==false">我的服务订单</head-nav>
        <div class="pretopmenu" :class="{'protopmenutop':isApp==false}">
            <a href="/vue/health/orderlist.html">商品订单</a>
            <a class="cur">处方订单</a>
        </div>
        <div v-for="(preslist,index) in prescriptionList" class="mb10">
            <a :href="'/ask/prescription.html?prescription_id='+preslist.id" class="block pl20 pr20 pt15 bg_white layout" >
                <div class="layout">
                    <span v-if="preslist.prescription_type==1" class="backgroundimg singimg mr15" v-bind="{style:'background-image:url('+ preslist.image +'),url(https://static.91160.com/wechat/img/prescription/epredefault.jpg)'}"></span>
                    <span v-else class="backgroundimg singimg mr15" v-bind="{style:'background-image:url('+ preslist.image +'),url(https://static.91160.com/wechat/img/prescription/chinapredefault.jpg)'}"></span>
                    <div class="singrgt lh20">
                        <span class="lh20 pb5 typo_black typo_large block elli">{{preslist.title}}</span>
                        <span class="lh18 typo_gray typo_small">
                        处方订单号：{{preslist.prescription_no}}<br>
                        时间：{{preslist.add_time}}<br>
                        医生：{{preslist.doctor_name}}
                        </span>
                    </div>
                </div>
                <div class="textr lh20 pt10 pb10">
                    合计：
                    <span class="typo_large typo_lorange">
                        <i class="fs10">¥</i>
                        {{Math.floor(preslist.total_amount)}}.<i class="fs10"><template v-if="preslist.total_amount.toString().split('.').length>1">{{preslist.total_amount.toString().split(".")[1]}}</template><template v-else>00</template></i>
                    </span>
                </div>
            </a>
            <div class="pl20 pr20 bg_white">
                <a class="block bb_gray layout pt10 pb5 lh18" :href="'tel:'+preslist.tel">
                    <span class="fright typo_black">{{preslist.status_name}}</span>
                    <span class="fleft typo_gray">投诉热线：{{preslist.tel}}</span>
                </a>
            </div>
            <div class="lh18 bg_white pl20 pr20 pb5 typo_grey">{{preslist.status_text}}</div>
        </div>
        <template v-if="page_count>1 && isNomore == 1">
            <load-more :tip="'正在加载'"></load-more>
        </template>
        <template v-if="isNoData==true">
            <no-data></no-data>
        </template>
        <scroll-top></scroll-top>
    </div>
</template>
<script>
import Vue from 'vue' 
import $ from 'jquery' 
import HeadNav from '../../components/common/Head.vue'
import NoData from '../../components/common/NoData.vue'
import ScrollTop from '../../components/common/scrollTop.vue'
import {WxOath,getAppToken,wxShare} from '../../utils/util.js'
import {Toast,ToastPlugin,LoadMore } from 'vux'
Vue.use(ToastPlugin)
export default {
    data: function () {  
        return {
            isApp:false,
            nothumb:'this.src="' + require('../../static/avatar.jpg') + '"'  ,
            ask_id:'',
            prescriptionList:[],
            page_count:'',
            p:1,
            js_app_login_token:'',
            isNomore:0,
            isNoData:false,
            tur:true,

        }
    },
    components: {
        HeadNav,Toast,LoadMore,ScrollTop,NoData
    },
    mounted: function () {
        this.preslist(1);
        var metas = document.getElementsByTagName("meta"); 
        document.title = '我的服务订单';
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
                            that.preslist(that.p)
                        }
                        else{
                            that.$vux.toast.text('已经全部加载完','middle');
                            that.isNomore = 0;
                        }
                    }                       
                }         
            }             
        }, 
        preslist:function(p){ 
            var that = this;
            var code = typeof(this.$route.query.code) != 'undefined' ? this.$route.query.code : 0;
            var cid = this.$route.query.cid;
            that.js_app_login_token = getAppToken(cid); 
            if(cid==20 || cid ==24 || (typeof (mJavaScriptObject) == 'object')){
                that.isApp = true;
            }else{
                that.isApp = false;
            }
            this.$http({                
                method:'get',
                url: '/ask/getPrescriptionList.html?code='+code+'&jstoken='+that.js_app_login_token+'&p='+p
            }).then(                                        
                function(res){
                    if(res.data.state==1){
                        Vue.nextTick(function(){
                            that.prescriptionList = that.prescriptionList.concat(res.data.data.list);
                            that.page_count = Math.ceil(res.data.data.total/10);//向上取整 1.2 取2;
                            if (that.page_count >= 1) {
                                that.isNomore = 1;
                            }
                            if(that.page_count==0){//如果没数据显示暂无数据
                                that.isNoData = true;
                            }
                        });
                    }else{
                        that.$vux.toast.text(res.data.msg,'middle');
                    }
                    that.tur = true;  
                    that.scrollist();
                }
            )               
        }
    }
    
}
</script>

<style scoped>
.networkBox{padding-top:2.61333rem}
.networks{padding-top: 1.44rem;}
.singimg{ display: inline-block; float:left; width: 1.6rem; height: 1.6rem;}
.singrgt{ float:left; width:6.93333rem; }

.pretopmenu{position: fixed;top:0; left: 0; width: 100%;border-bottom: solid 1px #f9f9f9; background: #fff;}
.protopmenutop{top: 1.173333rem;}
.pretopmenu a{float:left; display: inline-block; width: 50%; line-height: 1.17333rem; text-align: center; font-size: 0.42667rem; color: #707070;}
.pretopmenu a.cur{color: #00d3c2;}
</style>