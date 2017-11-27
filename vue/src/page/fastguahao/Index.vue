<template>
    <div class="fastguahao">
        <div class="fixed topnav bg_green plr15 fullwidth fs16 typo_white">
            <div class="inblo dep" @click="depShow">
                <span class="inblo fl elli" style="max-width:1.813333333rem">{{filterDepName}}</span>
                <i class="inblo iconfont ml5">{{isDepShow ? '&#xe626' : '&#xe625'}}</i>
            </div>
            <router-link to="search.html">
                <div class="search fs14 bg_white inblo typo_gray">
                    <i class="iconfont inblo ml10">&#xe609;</i>
                    <div class="insearch inblo" @click="gaSend('极速挂号-搜索')">输入医生名字极速挂号</div>
                </div>
            </router-link>
        </div>
        <template class="banners" v-if="catedepShow==true&&fc_bg_img">
            <!-- 轮播图 -->
            <swiper :aspect-ratio="90/375" :loop="true" :auto="true">
                <swiper-item class="swiper-demo-img backgroundimg" v-for="(infos,index) in fc_bg_img" :style="{backgroundImage:'url(http://images.91160.com/'+infos.image+')'}" :key="index" >
                    <a :href="infos.url?infos.url:'javascript:;'" class="block fullwidth fullheight" @click="gaSend('科室主页-广告图'+infos.ad_id)"></a>
                </swiper-item>
            </swiper>  
            <!-- 轮播图 -->
        </template>
        <template class="banners" v-if="alldepShow==true&&banner_ad_list.length>0">
            <!-- 轮播图 -->
            <swiper :aspect-ratio="90/375" :loop="true" :auto="true">
                <swiper-item class="swiper-demo-img backgroundimg" v-for="(infos,index) in banner_ad_list" :style="{backgroundImage:'url(http://images.91160.com/'+infos.image+')'}" :key="index" >
                    <a :href="infos.url?infos.url:'javascript:;'" class="block fullwidth fullheight" @click="gaSend('名医极速挂号主页-广告图'+infos.ad_id)"></a>
                </swiper-item>
            </swiper>      
            <!-- 轮播图 -->
        </template>
        <template v-if="alldepShow==true&&text_ad_list.length>0">
            <div class="typo_small textc bg_ffb753">
                <div class="typo_smaller typo_white textl pagn lh30 clearfix" style="height:0.8rem;">
                    <i class="iconfont fleft typo_white lh20 mt7 typo_middle">&#xe65f;</i>
                    <marquee class="w-90 fleft ml10" :interval="5000">
                        <marquee-item v-for="(textad,index) in text_ad_list" class="align-middle">
                            <a :href="textad.link ? textad.link : 'javascript:;'" class="block elli" @click="gaSend('极速挂号文字链广告'+textad.ad_id)">{{textad.title}}</a>
                        </marquee-item>
                    </marquee>
                </div>
            </div>
        </template>
        <template v-if="alldepShow">
            <div class="pagn pt10 pb10 mt7 bg_white bt_gray">
                <div class="pl10 index-news-title lh_small textl">
                    <h2 class="typo_bold typo_black typo_small">按科室选医生</h2>
                </div>
            </div>
            <ul class="no-lst typelist pt10 pb10 layout bg_white">
                <li v-for="(dep_list,index) in categoryList.slice(0, 8)">
                    <div @click="filterDep(dep_list.fc_id,dep_list.fc_name)">
                        <span><img :src="'https://images.91160.com/'+dep_list.fc_icon_img"></span>{{dep_list.fc_name}}
                    </div>
                </li>
            </ul>
        </template>
        <div class="mt7" style="min-height:16.0rem">
            <template v-show="doctorList && doctorList.length">
                <div class="p15 bg_white mt10 fs14" v-for="doclist in doctorList">
                    <doc-list :doclist="doclist"></doc-list>
                </div>
                <template v-if="page_count>1 && isNomore == 1">
                    <load-more :tip="'正在加载'"></load-more>
                </template>
            </template>
            <template v-if="isNoData==true">
                <no-data></no-data>
            </template>
        </div>
        <div class="masklayer-div" v-show="isDepShow" v-on:click="depShow"></div>
        <div class="depall bg_white fixed p15 fullwidth" v-show="isDepShow">
            <button class="inblo depname mr10 mt10 c-00c1ae bg_white typo_small" :class="{'bg_00c1ae typo_white':filterDepId==0}" @click="filterDep(0,'全部科室')" :disabled="filterDepId == 0">全部</button>
            <template v-for="(dep_list,index) in categoryList">
                <button class="inblo depname mr10 mt10 c-00c1ae bg_white typo_small" :class="{'bg_00c1ae typo_white':filterDepId==dep_list.fc_id}" @click="filterDep(dep_list.fc_id,dep_list.fc_name)" :disabled="filterDepId == dep_list.fc_id">{{dep_list.fc_name}}</button>
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
import { Swiper,  SwiperItem ,Marquee, MarqueeItem ,Toast,ToastPlugin,LoadMore } from 'vux'
import {getUrlParam,WxOath,getDomain,getAppToken,wxShare} from '../../utils/util.js'
Vue.use(ToastPlugin)
export default {
    data: function () {  
        return {
            item: {},
            isBannerShow: 1,//是否显示banner图和指导
            isDepShow: 0,//是否显示科室分类
            isNoData:false,
            filterDepName: '全部科室',  
            filterDepId:'',
            doctorList: [],//医生列表 
            p: 1,//翻页 
            isLoadmore: false,//正在加载
            isNomore: 0,//没有更多
            isAllowScroll: 0,
            cid:'',
            banner_ad_list:[],
            text_ad_list:[],
            fc_bg_img:[],
            js_app_login_token: '',
            tur:true,
            page_count:'',
            alldepShow:false,
            catedepShow:false,
            categoryList:[],  
        }
    },
    components: {
        DocList,Marquee, MarqueeItem,NoData,
        Swiper, SwiperItem,Toast,LoadMore,ScrollTop
    },
    watch:{
        $route(to){
            $(window).scrollTop(0);
            var that = this;
            var rout_id = parseInt(this.$route.query.fc_id);
            if(rout_id>0){
                that.alldepShow = false;
            }else{
                that.alldepShow = true;
            }
            this.doctorList=[];
            this.banner_ad_list=[];
            this.text_ad_list=[];
            this.fc_bg_img=[];
            this.catedepShow=false;
            this.alldepShow=false;
            if(this.categoryList.length<1){
                this.categorylist();
            }else{
                this.getDepId();
            }
        }
    },
    mounted: function () {
        $(window).scrollTop(0);
        if(this.categoryList.length<1){
            this.categorylist();
        }else{
            this.getDepId();
        }
        
        window.getNyAppShareParam = this.getNyAppShare;
    },
    methods:{
        AdBox:function(){ //广告  
            var that = this;
            var code = typeof(this.$route.query.code) != 'undefined' ? this.$route.query.code : 0;
            var cid = this.$route.query.cid;
            this.$http({                
                method:'get',
                url: '/doctor/linkdocad.html?code='+code}).then(                                        
                function(res){
                    if(res.data.status==1){
                        Vue.nextTick(function(){
                            that.banner_ad_list = res.data.data.banner_ad_list;//图片广告
                            that.text_ad_list = res.data.data.ad_list;//文字广告
                        });
                    }else{
                        that.banner_ad_list = [];
                        that.text_ad_list = [];
                    }   
                }
            )               
        },
        getDepId:function(){//如果连接地址上面有科室id：fc_id，那直接跳到当前科室列表页面
            var that = this;
            var fcId = this.$route.query.fc_id;
            var cid = this.$route.query.cid;
            that.filterDepId = fcId ? fcId :0;
            if(that.filterDepId==0){
                that.AdBox();
            }
            var catid = '';
            if(that.filterDepId>0){
                that.alldepShow = false;
                var catebox = that.categoryList;
                catebox.forEach((item, index) => {
                    if (item.fc_id == that.filterDepId) {
                        that.filterDepName = item.fc_name;
                        that.catedepShow = true;
                        catid = item.catid;
                    }
                })

                this.$http({                
                    method:'get',
                    url: '/doctor/getCategoryAd.html?category_id='+catid}).then(                                        
                    function(res){
                        if(res.data.status==200){
                            Vue.nextTick(function(){
                                that.fc_bg_img = res.data.data;
                            });
                        }else{
                            that.$vux.toast.text(res.data.msg,'middle');
                        }
                    }
                ) 
            }else{
                that.catedepShow = false;
                that.alldepShow = true;
                that.filterDepName = '全部科室';
            }


            timeLineTitle = sharetitle = (that.filterDepName=='全部科室' ? ' ':that.filterDepName) +'名医专家极速挂号-健康160网';
            timeLineDetails = description = '名医极速挂号,轻松预约名医专家,就在健康160.';
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
        },
        filterDep: function (depId, depName) {//根据科室筛选
            this.$router.push({'path':'index.html?fc_id='+depId})
            window.scroll(0,0)
            var that = this;
            that.filterDepName = depName;
            that.filterDepId = depId;

            that.p = 1;
            that.doctorList = [];
            if(that.filterDepId ==0){
                that.catedepShow = false;
            }else{
                that.catedepShow = true;
            }
            that.isBannerShow = 0;
            that.isDepShow = 0;
            if (that.filterDepId == 0) {
                that.isBannerShow = 1;
            }
            var catelist = that.categoryList;
            catelist.forEach((item, index) => {
                if (item.fc_id == that.filterDepId) {
                    that.catedepShow = true;
                }
            });
            
        },
        depShow: function () {//是否显示科室分类
            this.isDepShow ? this.isDepShow = 0 : this.isDepShow = 1;
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
                        }else{
                            that.$vux.toast.text('已经全部加载完','middle');
                            that.isNomore = 0;
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
                shareurl:encodeURIComponent('https://weixin.91160.com/vue/fastguahao/index.html?fc_id='+that.filterDepId)
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
            this.$http({                
                method:'get',
                url: '/doctor/categorylist.html'}).then(                                        
                function(res){
                    if(res.data.status==1){
                        Vue.nextTick(function(){
                            that.categoryList = res.data.data;

                            that.getDepId();
                        });
                    }else{
                        that.$vux.toast.text(res.data.msg,'middle');
                    }
                }
            )               
        },
        getList:function(type,p){   
            var that = this, type = type || 0;
            that.isLoadmore = true;
            that.isNomore = 0;
            that.isNoData = false;
            var metas = document.getElementsByTagName("meta");
            var code = typeof(this.$route.query.code) != 'undefined' ? this.$route.query.code : 0;
            var url = type==0 ? "/doctor/fastRecommendDoctor.html?size=10" : ("/doctor/fastCategoryDoctor.html?category_id="+type)
            this.$http({                
                method:'get',
                url: url+'&p='+p}).then(                                 
                function(res){
                    if(res.data.status==200){
                        Vue.nextTick(function(){
                            document.title = '名医专家极速挂号-健康160网';
                            metas[0].content = '极速挂号,名医专家,深圳挂号,预约名医专家';
                            metas[1].content= '名医极速挂号,轻松预约名医专家,就在健康160.';   

                            that.doctorList = that.doctorList.concat(res.data.data);
                            that.page_count = res.data.total_pages;
                            that.isLoadmore = false;
                            if (that.page_count > 1 && res.data.data.length>0) {
                                that.isNomore = 1;
                            }

                            if(that.p<that.page_count){//如果数据不足5条，自动加载至满5条
                                if(that.doctorList.length<5){
                                    that.p++;
                                    that.getList(that.filterDepId,that.p)
                                }
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
        },
    }
    
}
</script>

<style scoped>
.bg_00c1ae {background-color: #00c1ae; }
.c-00c1ae {color: #00c1ae; }
.bg_ffb753{background-color:#ffb753;}
.typo_white{color:#fff;}
.w-90{width:90%;}
.fastguahao {padding-top:1.22667rem; }
.topnav {top: 0; left: 0; z-index: 101; height: 1.28rem; line-height: 1.28rem; }
.dep {width: 2.4rem; }
.search {width: 6.453333rem; height: 0.746667rem; line-height: 0.746667rem; border-radius: 2.666667rem }
.banner {height: 4.533333rem; }
.guide .label {height: 1.066667rem; line-height: 1.066667rem }
.guide .label:before {position: absolute; content: ' '; left: 4.8%; top: 0.373333rem; width: 0.08rem; height: 0.373333rem; background-color: #00d3c2; }
.depall {top: 1.28rem; left: 0; z-index: 101; padding-top: 0.133333333rem; }
.depname {height: 0.8rem; line-height: 0.746666667rem; padding: 0 0.266666667rem; border: 0.026666667rem solid #00c1ae; border-radius: 2.666666667rem; }


.typelist{}
.typelist li{float: left; width: 25%; text-align: center; font-size:0.37333rem;}
.typelist li a{display:block;padding:0.10667rem 0; line-height: 0.74667rem; color: #666}
.typelist li span{display:block;width:0.8rem; height:0.8rem; margin:0 auto;}
.typelist li span img{float:left;width: 100%;height: 100%;}
.index-news-title {border-left:0.08rem solid #00d3c2; }

.mint-swipe {height:2.4rem; background:#fff; }
.mt-swipe-item,.mint-swipe-item{width: 100%;height:2.4rem;}

.vux-marquee-box li{float:left;width:100%;height:0.8rem; line-height:0.8rem; list-style-type: none;list-style: none;background: #ffb753; }
.vux-marquee-box li a{color: #fff;}

</style>