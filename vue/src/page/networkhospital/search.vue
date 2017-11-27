<template>
    <div class="fs14" :class="{'networkBox':isApp==false}"> 
        <head-nav v-if="isApp==false">搜索</head-nav>  
        <div class="search-bar bg_white mb10">
            <form action="" onsubmit="return false;">
                <div class="fullwidth typo_gray typo_middle" v-show="isSearch">
                    <i class="iconfont search-clear inblo textc fr" v-on:click="clearInput">&#xe606;</i>
                    <i class="iconfont ml15 pr10 search-icon fs18 searchleft">&#xe609;</i>
                    <input type="search" class="search-input ml5 fs16" placeholder="输入医生名称搜索" v-focus v-model="searchVal">
                </div>
                <label class="pl12 pr12 pt6 pb6 typo_gray textl block fs14" v-show="!isSearch" v-on:click="inSearch">
                    <div class="beforesearch pl10 pr10 typo_middle">
                        <i class="iconfont search-icon fs18">&#xe609;</i>
                        <span class="clbebe">搜索医生</span>
                    </div>
                </label>
            </form>
        </div>
    
        <template v-show="doctorList && doctorList.length">
            <div v-for="doclist in doctorList">
                <doctor-list :doclist="doclist"></doctor-list>
            </div>
            <template v-if="page_count>1 && isNomore == 1">
                <load-more :tip="'正在加载'"></load-more>
            </template>
        </template>
        <template v-if="isNoData==true">
            <no-data></no-data>
        </template>
    </div>
</template>

<script>
import Vue from 'vue'  
import HeadNav from '../../components/common/Head.vue'
import NoData from '../../components/common/NoData.vue'
import DoctorList from './doctorlist.vue'
import { Toast,ToastPlugin,LoadMore } from 'vux'
Vue.use(ToastPlugin)
export default {  
    data: function () {  
        return {           
            searchVal: '',
            isSearch: false,//是否搜索 
            isApp:false,
            isNoData: false,
            doctorList:[],
            isLoadmore:false,//正在加载
            isNomore:0,//没有更多 
            p:1,//
            tur:true,
            page_count:0,       
            unit_id:'',
        }
    },
    components: {
        HeadNav,
        DoctorList,NoData
    },
    directives: {        
        focus: function (el) {
            el.focus(); 
        }
    },
    mounted: function () {  
        var that = this; 
        var cid = that.$route.query.cid;
        if(cid==20 || cid ==24|| (typeof (mJavaScriptObject) == 'object')){
            that.isApp = true;
        }else{
            that.isApp = false;
        }
        document.onkeydown = function (event) { //筛选医生                      
            if (event.keyCode == 13 && that.isSearch && that.searchVal) {
                event.preventDefault();

                that.doctorList=[];
                that.p=1;
                if(that.tur){
                    that.tur = false;
                    that.getSearchList(1);
                }
            }
        }       
    },
    methods: {
        inSearch: function () {
            this.isSearch = true;
        },
        clearInput: function () {
            this.searchVal = '';
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
                            that.getSearchList(that.p)
                        }else{
                            that.$vux.toast.text('已经全部加载完','middle');
                            that.isNomore = 0;
                        }
                    }                       
                }          
            }         
        },  
        getSearchList:function(p){   
            var that = this;
            that.isLoadmore = true;
            that.isNomore = 0;
            that.isNoData = false;
            that.unit_id = that.$route.query.unit_id;
            var code = typeof(this.$route.query.code) != 'undefined' ? this.$route.query.code : 0;
            this.$http({                
                method:'get',
                url: '/networkhospital/getDocList.html?code='+code+'&unit_id='+that.unit_id+'&doctor_name='+that.searchVal+'&p='+p}).then(
                function(res){
                    that.isLoadmore = false;
                    if(res.data.state==1){
                        Vue.nextTick(function(){ 
                            that.doctorList = that.doctorList.concat(res.data.data.list);
                            that.page_count = Math.ceil(res.data.data.total/10);
                            if(that.page_count==0){
                                that.isNoData = true;
                            }
                            if (that.page_count > 1) {
                                that.isNomore = 1;
                            }
                        });
                    }else{
                        that.doctorList=[];
                    }
                    that.tur = true;
                }
            )               
        },
    }
}
</script>

<style>
html,body{background-color: #f5f5f5; }
</style>
<style scoped>
.pt6{padding-top: 0.16rem;}
.pb6{padding-bottom: 0.16rem}
.networkBox {padding-top:1.17333rem; }
.topnav {top: 0; left: 0; z-index: 101; height: 1.17333rem; line-height: 1.17333rem; }
.navname{width:8rem; }
.retrunback{width:1.066666667rem; height:1.17333rem; }
.search-bar {height:1.2rem; line-height: 1.2rem; padding: 0 !important; }
.search-input {width: 7.466666667rem; height:1.2rem; }
.search-icon {color: #b1b1b1; }
.searchleft{position: relative;}
.searchleft:after{content:''; position: absolute;right:0; top:0.08rem; width: 0.05333rem; height: 0.48rem; background: #9c9c9c;}
.search-clear {width:1.06667rem; height:1.06667rem; color: #8F8E94; }
.beforesearch{ line-height:0.85333rem; border-radius: 1.06667rem;border:solid 1px #f5f5f5;}
</style>

