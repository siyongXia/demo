<template>
    <div :class="{ 'zyguahao' : isNoApp==true}">
        <div class="header" v-if="isNoApp==true">
            <a href="/ask/askdoc.html?cat_id=49" @click="gaSend('中医医生页_搜索_点击量')" class="t-search typo_white typo_large iconfont fright">&#xe609;</a>
            <span class="iconfont typo_white goback" @click="goback">&#xe60e;</span>
            <span>问中医</span>
        </div>
        <template v-if="banner_ad_list">
            <div class="topbanners">
                <!-- 轮播图 -->
                <swiper :aspect-ratio="90/375" :loop="true" :auto="true">
                    <swiper-item class="swiper-demo-img backgroundimg" v-for="(infos,index) in banner_ad_list" :style="{backgroundImage:'url(http://images.91160.com/'+infos.image+')'}" :key="index" >
                        <a :href="infos.url?infos.url:'javascript:;'" class="block fullwidth fullheight" @click="gaSend('科室主页-广告图'+infos.ad_id)"></a>
                    </swiper-item>
                </swiper>         
                <!-- 轮播图 -->
            </div>
        </template>
        <ul class="no-lst typelist pt10 pb10 mb7 layout bg_white">
            <li v-for="(dep_list,index) in setCatgory">
                <button @click="filterDep(dep_list.cat_id,dep_list.cat_name)" :disabled="filterDepId == dep_list.cat_id">
                    <span><img :src="'https://static.91160.com/wechat/img/customdep/cat_'+dep_list.cat_id+'.png'"></span>{{dep_list.cat_name}}
                </button>
            </li>
            <li>
                <button @click="depShow">
                    <span><img :src="'https://static.91160.com/wechat/img/customdep/cat_more.png'"></span>更多
                </button>
            </li>
        </ul>
        <div class="pt5 pb10 bg_white fullwidth">
            <template v-show="doctorList && doctorList.length">
                <div class="pl10 pr10 pt5 pb5 bg_white fs14" v-for="doclist in doctorList">
                    <doc-list :doclist="doclist"></doc-list>
                </div>
                <template v-if="page_count>1 && isNomore == 1">
                    <load-more :tip="'正在加载'"></load-more>
                </template>
                <template v-if="isNoData==true">
                    <no-data></no-data>
                </template>
            </template>
        </div>
        <div class="masklayer-div" v-show="isDepShow" v-on:click="depShow"></div>
        <div class="depall bg_white fixed p15 fullwidth" v-show="isDepShow" :class="{'appdepall':isNoApp==false}">
            <span class="inblo depname mr10 mt10 typo_gray" :class="{'bg_927150 typo_white':filterDepId==0}" @click="filterDep(49,'全部科室')">全部</span>
            <template v-for="(dep_list,index) in categoryList">
                <span class="inblo depname mr10 mt10 typo_gray" :class="{'bg_927150 typo_white':filterDepId==dep_list.catid}" @click="filterDep(dep_list.catid,dep_list.catname)">{{dep_list.catname}}</span>
            </template>
        </div>
        <scroll-top></scroll-top>
    </div>
</template>
<script>
var ret = '';
var shareimg,sharetitle,description,timeLineTitle,timeLineDetails,timeLineImg,shareurl; 
shareimg ='https://static.91160.com/wechat/img/common/logo.jpg'; 
var protocal = 'https:';
var hostName = window.location.hostname;
var domain = protocal + '//' + hostName;
import Vue from 'vue' 
import $ from 'jquery' 
import DocList from './Doclist.vue'  
import NoData from '../../components/common/NoData.vue'
import ScrollTop from '../../components/common/scrollTop.vue'
import { Swiper,  SwiperItem ,Toast,ToastPlugin,LoadMore } from 'vux'
import {getUrlParam,WxOath,getDomain,getAppToken,wxShare} from '../../utils/util.js'
Vue.use(ToastPlugin)  

export default {
    data: function () {  
        return {
            item: {},
            isDepShow: 0,//是否显示科室分类
            filterDepId:'',
            doctorList: [],//医生列表 
            p: 1,//翻页 
            isLoadmore: false,//正在加载
            isNomore: 0,//没有更多
            isAllowScroll: 0,
            isNoData: false,
            isNoApp:true,
            cid:'',
            banner_ad_list:[],
            js_app_login_token: '',
            tur:true,
            page_count:'',
            categoryList:[], 
            setCatgory:[
                {'cat_id':'10275','cat_name':'中医内科'},
                {'cat_id':'10276','cat_name':'中医外科'},
                {'cat_id':'10278','cat_name':'中医妇产科'},
                {'cat_id':'10279','cat_name':'中医儿科'},
                {'cat_id':'10287','cat_name':'中医老年病科'},
                {'cat_id':'46','cat_name':'针灸科'},
                {'cat_id':'10288','cat_name':'推拿科'},
            ]
        }
    },
    components: {
        DocList, Swiper, SwiperItem,Toast,LoadMore,ScrollTop,NoData
    },
    watch:{
        $route(to){
            var that = this;
            var rout_id = parseInt(this.$route.query.cat_id);
            this.doctorList=[];
            if(this.categoryList.length<1){
                this.categorylist();
            }
            that.getDepId();
        }
    },
    mounted: function () {
        if(this.categoryList.length<1){
            this.categorylist();
        }
        this.getDepId();
        window.getNyAppShareParam = this.getNyAppShare;
        if((typeof(mJavaScriptObject)=='object')){                     
            mJavaScriptObject.funUpdateFeatureStatus('#ffffff', '#927150');
        }
    },
    methods:{
        depShow: function () {//是否显示科室分类
            this.isDepShow ? this.isDepShow = 0 : this.isDepShow = 1;
            this.gaStaticClick('中医医生页_“更多”二级科室_点击量');
        },
        goback:function(){
            history.back(-1)
        },
        AdBox:function(){ //广告  
            var that = this;
            var code = typeof(this.$route.query.code) != 'undefined' ? this.$route.query.code : 0;
            var cid = this.$route.query.cid;
            if(cid==20||cid==24){
                that.isNoApp = false;
            }else{
                that.isNoApp = true;
            }
            this.$http({                
                method:'get',
                url: '/ask/zydocad.html?code='+code}).then(                                        
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
        getDepId:function(){//如果连接地址上面有科室id：fc_id，那直接跳到当前科室列表页面
            var that = this;
            var catId = this.$route.query.cat_id;  
            var cid = this.$route.query.cid;  
            that.filterDepId = catId ? catId :49;

            timeLineTitle = sharetitle = '中医名医专家-健康160网';
            timeLineDetails = description = '轻松预约名医专家,就在健康160.';
            timeLineImg = shareimg;  
            var wxShareOptions={
                timeLine: {                                 
                    title: sharetitle,
                    link: '',
                    imgUrl: 'https://static.91160.com/wechat/img/common/logo.jpg',
                },
                appMessage: {
                    title: sharetitle,
                    desc: description, // 分享描述
                    link: '',
                    imgUrl:'https://static.91160.com/wechat/img/common/logo.jpg',
                },
                callback: function() {

                },
                cancelCallback: function() {

                }
            }
            wxShare(wxShareOptions, that);
            if(cid==20 || cid ==24 || (typeof (mJavaScriptObject) == 'object')){
                that.getNyAppShare();
            }

            this.getList(this.filterDepId,1);
            this.scrollist();
        },
        filterDep: function (depId, depName) {//根据科室筛选
            if((typeof(mJavaScriptObject)=='object')){  
                var getcid = 20;
            }else{
                var getcid = '';
            }
            this.$router.push({'path':'index.html?cat_id='+depId+'&cid='+getcid})
            window.scroll(0,0)
            var that = this;
            that.filterDepId = depId;

            that.p = 1;
            that.doctorList = [];
            that.isDepShow = 0;
            this.gaStaticClick('中医医生页_推荐二级科室_点击量'+depName);
        },
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
                            that.getList(that.filterDepId,that.p)
                        }
                        else{
                            that.$vux.toast.text('已经全部加载完','middle');
                        }
                    }                       
                }         
            }             
        }, 
        getNyAppShare:function(){//app分享获取参数
            var that = this;
            var cid = this.$route.query.cid;        
            var code = this.$route.query.code;  
            var data_v ={
                title:sharetitle,
                details:description,
                img:shareimg,
                timeLineTitle:timeLineTitle,
                timeLineDetails:timeLineDetails,
                timeLineImg:shareimg,
                shareurl:encodeURIComponent('https://weixin.91160.com/vue/customdep/index.html?cat_id='+that.filterDepId)
            }   
            if(sharetitle && description && shareimg){      
                this.$http({
                    method:'get',
                    async : false,
                    url: '/sys/appencrypt.html?cid='+cid+'&jstoken='+encodeURIComponent(that.js_app_login_token)+'&code='+code+'&data='+JSON.stringify(data_v)
                    }).then(
                    function(res){
                        ret = res.data.data;                
                    }
                )       
            }
            return ret;             
        },    
        categorylist:function(){   
            var that = this;
            var code = typeof(this.$route.query.code) != 'undefined' ? this.$route.query.code : 0;
            var cid = this.$route.query.cid;
            that.js_app_login_token = getAppToken(cid); 
            if(that.banner_ad_list.length<1){
                that.AdBox();
            }
            this.$http({                
                method:'get',
                url: '/ask/zydocdep.html?cat_id=49'}).then(                                        
                function(res){
                    if(res.data.state==1){
                        Vue.nextTick(function(){
                            that.categoryList = res.data.data;
                            // that.getDepId();
                        });
                    }else{
                        that.$vux.toast.text(res.data.msg,'middle');
                    }
                    // that.scrollist();
                }
            )               
        },
        gaStaticClick: function (msg) {
            var msg = msg || '';
            ga('send', 'event', msg, '点击');  
        }, 
        getList:function(type,p){   
            var that = this, type = type || 49;
            that.isLoadmore = true;
            that.isNomore = 0;
            var metas = document.getElementsByTagName("meta");
            var code = typeof(this.$route.query.code) != 'undefined' ? this.$route.query.code : 0;
            this.$http({                
                method:'get',
                url: '/ask/zydoc.html?refresh=0&cat_id='+type+'&p='+p}).then(                                        
                function(res){
                    if(res.data.state==1){
                        Vue.nextTick(function(){
                            document.title = '问中医';
                            metas[0].content = '中医科名医专家,名医专家,深圳挂号,预约名医专家';
                            metas[1].content= '中医科名医专家,轻松预约名医专家,就在健康160.';   

                            that.doctorList = that.doctorList.concat(res.data.data.rows);
                            that.page_count = res.data.data.total_pages;
                            that.isLoadmore = false;
                            if (that.page_count >= 1) {
                                that.isNomore = 1;
                                that.isNoData = false;
                            }else{
                                that.isNoData = true;
                            }
                        });
                    }else{
                        that.$vux.toast.text(res.data.msg,'middle');
                        that.isNoData = true;
                    }
                    that.tur = true;
                }
            )               
        },
    }
    
}
</script>

<style scoped>
.header{position:fixed;top:0;left:0;z-index:101;width:100%;height: 1.173333rem; line-height: 1.173333rem; text-align: center; font-size: 0.48rem; color:#fff; background: #927150;}
.shadbg{position:fixed;top:0;left:0;z-index: 99;width: 100%;height: 100%; background: rgba(0,0,0,0.6);}
.goback{position: absolute;top:0;left: 0; padding:0 0.266667rem; line-height: 1.173333rem;}
.t-search{position: absolute;right:0.13333rem; top:0; padding:0 0.26667rem;}

.bg_927150 {background-color: #927150; }
.c-927150 {color: #927150; }

.typo_white{color:#fff;}
.w-90{width:90%;}
.mb7{margin-bottom:0.18667rem;}
.zyguahao {padding-top:1.14667rem; }
.topnav {top: 0; left: 0; z-index: 101; height: 1.28rem; line-height: 1.28rem; }
.dep {width: 2.4rem; }
.search {width: 6.453333rem; height: 0.746667rem; line-height: 0.746667rem; border-radius: 2.666667rem }
.banner {height: 4.533333rem; }
.guide .label {height: 1.066667rem; line-height: 1.066667rem }
.guide .label:before {position: absolute; content: ' '; left: 4.8%; top: 0.373333rem; width: 0.08rem; height: 0.373333rem; background-color: #00d3c2; }
.depall {top:1.17333rem; left: 0; z-index: 101; padding-top: 0.133333333rem; }
.appdepall{top:0;}
.depname {height: 0.8rem; line-height: 0.746666667rem; padding: 0 0.266666667rem; border: 0.026666667rem solid #E8E8E8; border-radius: 2.666666667rem; }

.typelist{}
.typelist li{float: left; width: 25%; text-align: center; font-size:0.37333rem;}
.typelist li button{display:block;width:100%;padding:0.13333rem 0;border:none; line-height: 0.74667rem; text-align: center; font-size: 0.37333rem; color: #707070;background:#fff;}
.typelist li span{display:block;width:0.74667rem; height:0.74667rem; margin:0 auto;}
.typelist li span img{float:left;width: 100%;height: 100%;}
.topbanners{width:100%;height: 2.45333rem; background: #fff;}
.topbanners .mint-swipe {height:2.4rem; background:#fff; }
.topbanners .mt-swipe-item,.topbanners .mint-swipe-item{width: 100%;height:2.4rem;}
.topbanners .mint-swipe-items-wrap{height: 2.4rem;overflow: hidden;}
.topbanners .mint-swipe-indicators{display: none;}

</style>