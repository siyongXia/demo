<template>
    <div id="OnlineHospital" class="online-hospital fs16 fullheight">
        <div class="fixed topnav bg_green plr15 fullwidth fs16 typo_white">
            <div class="inblo dep" v-on:click="depShow">
                <span class="inblo fl elli" style="width:1.813333333rem">{{filterDepName}}</span>
                <i class="inblo iconfont ml5">{{isDepShow ? '&#xe626' : '&#xe625'}}
                    <!--&#xe626;-->
                </i>
            </div>
            <router-link to="search.html">
                <div class="search fs14 bg_white inblo typo_gray">
                    <i class="iconfont inblo ml10">&#xe609;</i>
                    <div class="insearch inblo">输入医生名字在线问诊</div>
                </div>
            </router-link>
        </div>
        <!--end .topnav-->
        <div class="banner" v-show="isBannerShow">
            <img src="./images/banner2x.png" class="fullwidth">
        </div>
        <!--end .banner-->
        <div class="guide fullwidth mt10 fs15" v-show="isBannerShow">
            <div class="label relative plr15 bg_white">
                <span class="ml10">网上医院看病方式</span>
            </div>
            <div class="mt1 fullwidth p15 bg_white fs14 typo_dgray relative">
                <img src="./images/guide.png" class="fullwidth">
                <div class="inblo" style="width:3.2rem;">
                    <div class="fullwidth">
                        在线与医生<br>交流、咨询
                    </div>
                </div>
                <div class="inblo textc" style="width:2.666666667rem;margin:0 auto;">
                    <div class="fullwidth">
                        医生问诊<br>开处方
                    </div>
                </div>
                <div class="inblo textr fr" style="width:2.666666667rem;">
                    <div class="fullwidth textr">
                        在线购药<br>快递到家
                    </div>
                </div>
            </div>
        </div>
        <!--end .guide-->
    
        <template v-show="doctorList && doctorList.length">
            <div class="p15 bg_white mt10 fs14" v-for="doclist in doctorList">
                <doc-list :doclist="doclist"></doc-list>
            </div>
            <template v-if="pageNum>1 && isNomore == 1">
                <load-more :tip="'正在加载'"></load-more>
            </template>
        </template>
        <template v-if="isNoData==true">
            <no-data></no-data>
        </template>
        <div class="masklayer-div" v-show="isDepShow" v-on:click="depShow"></div>
        <!--end .masklayer-div-->
        <div class="depall bg_white fixed p15 fullwidth" v-show="isDepShow">
            <span class="inblo depname mr10 mt10 c-00c1ae" v-bind:class="{'bg_00c1ae c-fff':filterDepId==0}" v-on:click="filterDep(0,'全部科室')">全部</span>
            <template v-for="dep_list in item.dep_list">
                <span class="inblo depname mr10 mt10 c-00c1ae" v-bind:class="{'bg_00c1ae c-fff':filterDepId==dep_list.id}" v-on:click="filterDep(dep_list.id,dep_list.dep_name)">{{dep_list.dep_name}}</span>
            </template>
        </div>
        <!--end .depall-->
        <scroll-top></scroll-top>
    </div>
</template>
<script>
var ret = '';
var sharetitle, description, shareurl, shareimg;
sharetitle = '云杉网上医院在线问诊';
description = '云杉网上医院，随时随地在线问医生、开药，赶紧收藏起来吧！';
shareurl = 'https://weixin.91160.com/vue/onlinehospital/index.html';
shareimg = 'https://static.91160.com/wechat/img/common/logo.jpg';

import Vue from 'vue'  
import $ from 'jquery'  
import DocList from './Doclist.vue'  
import ScrollTop from '../../components/common/scrollTop.vue'
import NoData from '../../components/common/NoData.vue'
import {Toast,ToastPlugin,LoadMore } from 'vux'
import {getUrlParam,WxOath,getAppToken,wxShare} from '../../utils/util.js'
Vue.use(ToastPlugin) 
export default {
    //name:'OnlineHospital',
    components: {
        DocList,
        ScrollTop,Toast,LoadMore,NoData
    },
    data: function () {  
        return {
            item: {},
            isBannerShow: 1,//是否显示banner图和指导
            isDepShow: 0,//是否显示科室分类
            filterDepName: '全部科室',  
            filterDepId: 0,
            doctorList: [],//医生列表 
            page: 1,//翻页 
            pageNum: 0,
            isLoadmore: false,//正在加载
            isNomore: 0,//没有更多
            isAllowScroll: 0,
            isNoData: false,
            cid:'',
            tur:true,
            js_app_login_token: '',
        }
    },
    beforeCreate: function () {
        var metas = document.getElementsByTagName("meta");
        if (typeof (mJavaScriptObject) == 'object') {
            document.title = '云杉网上医院';
        }
    },
    mounted: function () {
        var that = this;
        that.searchDoc(1);   
        window.getNyAppShareParam = this.getNyAppShare;		  
    },
    methods: {
        scrollist:function(){
            //页面滑动加载数据
            var that = this;
        window.addEventListener("scroll", function (event) {
                if(that.tur){
                    var totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
                    if($(document).height() <= totalheight ){
                        that.tur = false;
                        if(parseInt(that.page) < parseInt(that.pageNum)){
                            that.page++;
                            that.searchDoc(that.page)
                }
                        else{
                            that.$vux.toast.text('已经全部加载完','middle');
                            that.isNomore = 0;
            }
                    }                       
                }   
        })
    },
        filterDep: function (depId, depName) {//根据科室筛选
            var that = this;
            that.filterDepName = depName;
            that.filterDepId = depId;
            that.gaStaticClick('云杉网上医院在线问诊-分类科室-' + depName);
            window.scroll(0,0)
            that.page = 1;
            that.doctorList = [];
            that.searchDoc(that.page);

            that.isBannerShow = 0;
            that.isDepShow = 0;
            if (that.filterDepId == 0) {
                that.isBannerShow = 1;
            }
        },
        searchDoc: function (p) {
            var that = this;
            var cid = this.$route.query.cid;
            var code = typeof(this.$route.query.code) != 'undefined' ? this.$route.query.code : 0;
            that.isLoadmore = true;
            that.isNomore = 0;
            that.isNoData = false;

            that.$http.get("/onlinehospital/index.html?code="+code+"&dep_id=" + that.filterDepId + "&p=" + p).then((data) => {
                var data = data.data;
                if (data.status == 200) {
                    //第一次获取其他信息
                    if (p == 1) {
                        that.item = data;
                        var metas = document.getElementsByTagName("meta");
                        metas[0].content = data.keywords || '';
                        metas[1].content = data.description || '';
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
                    }
                    that.pageNum = data.p_num;
                    that.isLoadmore = false;
                    that.doctorList = that.doctorList.concat(data.doctor_list);
                    //获取医生列表
                    if (that.pageNum > 1) {
                            that.isNomore = 1;
                        that.isNoData = false;
                        }
                    if(that.pageNum==0){
                        that.isNoData = true;
                    }
                    that.scrollist();
                }else{
                    that.$vux.toast.text(res.data.msg,'middle');
                }
                that.tur = true;
            })
        },
        depShow: function () {//是否显示科室分类
            this.isDepShow ? this.isDepShow = 0 : this.isDepShow = 1;
        },
        gaStaticClick: function (msg) {
            var msg = msg || '';
            ga('send', 'event', msg, '点击');
        },
        getNyAppShare: function () {//app分享获取参数
            var that = this;
            that.cid = this.$route.query.cid
            that.js_app_login_token = getAppToken(that.cid);
            var code = this.$route.query.code;
            var data_v = {
                title: sharetitle,
                details: description,
                img: shareimg,
                timeLineTitle: sharetitle,
                timeLineDetails: description,
                timeLineImg: shareimg,
                shareurl: shareurl
            }            
            if (sharetitle && description && shareimg) {
                this.$http({
                    method: 'get',
                    async: false,
                    url: '/sys/appencrypt.html?cid=' + that.cid + '&jstoken=' + encodeURIComponent(that.js_app_login_token) + '&code=' + code + '&data=' + JSON.stringify(data_v)
                }).then(
                    function (res) {                        
                        ret = res.data.data;                      
                    }
                )
            }
            return ret;
        },
    }
}
</script>

<style>
html,body{
    background-color: #f5f5f5;
}
</style>
<style scoped>
.bg_00c1ae {
    background-color: #00c1ae;
}

.c-00c1ae {
    color: #00c1ae;
}

.c-fff {
    color: #fff;
}

.mt1 {
    margin-top: 1px;
}

.online-hospital { 
    padding-top: 1.28rem;
}

.topnav {
    top: 0;
    left: 0;
    z-index: 101;
    height: 1.28rem;
    line-height: 1.28rem;
}

.dep {
    width: 2.4rem;
}

.search {
    width: 6.453333rem;
    height: 0.746667rem;
    line-height: 0.746667rem;
    border-radius: 2.666667rem
}

.banner {
    height: 4.533333rem;
}


.guide .label {
    height: 1.066667rem;
    line-height: 1.066667rem
}

.guide .label:before {
    position: absolute;
    content: ' ';
    left: 4.8%;
    top: 0.373333rem;
    width: 0.08rem;
    height: 0.373333rem;
    background-color: #00d3c2;
}

.depall {
    top: 1.28rem;
    left: 0;
    z-index: 101;
    padding-top: 0.133333333rem;
}

.depname {
    height: 0.8rem;
    line-height: 0.746666667rem;
    padding: 0 0.266666667rem;
    border: 0.026666667rem solid #00c1ae;
    border-radius: 2.666666667rem;
}


</style>
