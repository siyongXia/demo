<template>
    <div class="networkBox">
        <head-nav>处方订单</head-nav>
        <div v-for="(preslist,index) in prescriptionList" class="mb10">
            <a :href="'/ask/prescription.html?prescription_id='+preslist.id" class="block pl20 pr20 pt15 bg_white layout" >
                <div class="layout">
                    <span v-if="preslist.prescription_type==1" class="backgroundimg singimg mr15" v-bind="{style:'background-image:url('+ preslist.image +'),url(http://static.91160.com/wechat/img/prescription/epredefault.jpg)'}"></span>
                    <span v-else class="backgroundimg singimg mr15" v-bind="{style:'background-image:url('+ preslist.image +'),url(http://static.91160.com/wechat/img/prescription/chinapredefault.jpg)'}"></span>
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
                        {{Math.floor(preslist.total_amount)}}.
                        <i class="fs10"><template v-if="preslist.total_amount.toString().split('.').length>1">{{preslist.total_amount.toString().split(".")[1]}}</template><template v-else>00</template></i>
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
    </div>
</template>
<script>
import Vue from 'vue' 
import HeadNav from '../../components/common/Head.vue'
import {WxOath,getAppToken,wxShare} from '../../utils/util.js'
import { Toast,ToastPlugin } from 'vux'
Vue.use(ToastPlugin)
export default {
    data: function () {  
        return {
            nothumb:'this.src="' + require('../../static/avatar.jpg') + '"'  ,
            prescriptionList:[],
        }
    },
    components: {
        HeadNav
    },
    mounted: function () {
        this.prescriptionlist()
    },
    methods:{  
        prescriptionlist:function(){ 
            console.log(0)  
            var that = this;
            var code = typeof(this.$route.query.code) != 'undefined' ? this.$route.query.code : 0;
            var cid = this.$route.query.cid;
            var ask_id = this.$route.query.ask_id;
            var vorder_id = this.$route.query.vorder_id;
            var urlid='';
            var id='';
            if(ask_id){
                urlid = 'ask_id';
                id = ask_id;
            }
            if(vorder_id){
                urlid = 'vorder_id';
                id = vorder_id;
            }
            console.log(id)
            this.$http({                
                method:'get',
                url: '/ask/getPrescriptionListByAskId.html?vorder_id=6312&'+urlid+'='+id
            }).then(                                        
                function(res){
                    if(res.data.state==1){
                        Vue.nextTick(function(){
                            that.prescriptionList = res.data.data;
                        });
                    }else{
                        that.$vux.toast.text(res.data.msg,'middle');
                    }
                }
            )               
        }
    }
    
}
</script>

<style scoped>
.networkBox{padding-top: 1.173333rem}
.singimg{ display: inline-block; float:left; width: 1.6rem; height: 1.6rem;}
.singrgt{ float:left; width:6.93333rem; }
</style>