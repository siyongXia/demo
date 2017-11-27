<template>
    <div :class="{'networkBox':isApp==false}">
        <head-nav v-if="isApp==false">互联网医院</head-nav>
        <template v-if="banner_ad_list.length==1">
            <a :href="infos.link?infos.link:'javascript:;'" v-for="(infos, index) in banner_ad_list" class="block backgroundimg h120" :style="{backgroundImage:'url('+infos.image+')'}"></a>
        </template>
        <template v-else>
            <swiper :aspect-ratio="120/375" :auto="true" :interval="5000" dots-position="center">
                <swiper-item class="swiper-demo-img backgroundimg" v-for="(infos, index) in banner_ad_list" :key="index" :style="{backgroundImage:'url('+infos.image+')'}">
                <a :href="infos.link?infos.link:'javascript:;'" class="block fullheight"></a>
                </swiper-item>
            </swiper>
        </template>
        <div class="layout mainbox">
            <img :src="processimg" class="fleft">
            <!-- <a href="/vue/network/index.html?unit_id=114&nyappshare=1"><img :src="ad001" class="fleft mt10"></a> -->
            <a href="/vue/onlinehospital/index.html"><img :src="ad002" class="fleft mt10"></a>
        </div>
        <a class="fixtobottom pt15 pb15 bg_white textc" href="tel:400-1191-160">
            <span class="block lh28 typo_middle c333">投诉热线：400-1191-160</span>
            <span class="block typo_smaller clbebe">更多网上医院入驻中，敬请期待！</span>
        </a>
    </div>
</template>
<script>
var shareimg,sharetitle,description,shareurl; 
shareimg ='https://static.91160.com/wechat/img/common/logo.jpg'; 
import Vue from 'vue' 
import HeadNav from '../../components/common/Head.vue'
import { Swiper,  SwiperItem } from 'vux'
import {getUrlParam,WxOath,getAppToken,wxShare} from '../../utils/util.js'

export default {
    data: function () {  
        return {
            isApp:false,
            banner_ad_list:[],//banner
            processimg:require('./images/process.gif'),
            ad001:require('./images/ad001.jpg'),
            ad002:require('./images/ad002.jpg'),
        }
    },
    components: {
        HeadNav,Swiper, SwiperItem,
    },
    mounted: function () {
        this.AdBox();
    },
    methods:{   
        AdBox:function(){ //广告  
            var that = this;
            var code = typeof(this.$route.query.code) != 'undefined' ? this.$route.query.code : 0;
            var cid = this.$route.query.cid;
            if(cid==20 || cid ==24 || (typeof (mJavaScriptObject) == 'object')){
                that.isApp = true;
            }else{
                that.isApp = false;
            }
            var metas = document.getElementsByTagName("meta"); 
            document.title = '互联网医院';
            this.$http({                
                method:'get',
                url: '/networkhospital/index.html?code='+code}).then(                                        
                function(res){
                    if(res.data.state==1){
                        Vue.nextTick(function(){
                            that.banner_ad_list = res.data.data;//图片广告
                        });
                    }else{
                        that.banner_ad_list = [];
                    }   
                }
            )               
        },
    }
}
</script>

<style scoped>
    .networkBox{padding-top: 1.173333rem}
    .h120{height: 3.2rem;}
    .mainbox{padding-bottom: 2.24rem}
</style>