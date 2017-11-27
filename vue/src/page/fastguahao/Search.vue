<template>
    <div class="fs14" :class="showHeader==true ? 'fastguahao' :' ' ">  
        <div class="fixed topnav bg_green fullwidth fs16 typo_white" v-if="showHeader==true">
            <i class="iconfont retrunback inblo textc " onclick="javascript:history.go(-1)">&#xe60e;</i>
            <div class="ml50 navname inblo textc">搜索</div>          
        </div>    
        <div class="search-bar bg_white">
            <form onsubmit="return false;">
                <div class="fullwidth typo_gray" v-show="isSearch">
                    <i class="iconfont ml15 search-icon">&#xe609;</i>
                    <input type="text" class="search-input ml5 fs14" placeholder="输入医生名称搜索" v-focus v-model="searchVal">
                    <i class="iconfont search-clear inblo textc fr" v-on:click="clearInput">&#xe606;</i>
                </div>
                <label class="fullwidth typo_gray textc block fullheight fs14" v-show="!isSearch" v-on:click="inSearch">
                    <i class="iconfont search-icon">&#xe609;</i>
                    <span>搜索医生</span>
                </label>
            </form>
        </div>
    
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
</template>

<script>
import Vue from 'vue'  
import DocList from './Doclist.vue'
import NoData from '../../components/common/NoData.vue'
import {getUrlParam} from '../../utils/util.js'
import { Toast,ToastPlugin,LoadMore } from 'vux'
Vue.use(ToastPlugin)
export default {  
    components: {
        DocList,Toast,LoadMore,NoData
    },
    data: function () {  
        return {           
            searchVal: '',
            isSearch: false,//是否搜索 
            isNoData: false,
            doctorList:[],
            isLoadmore:false,//正在加载
            isNomore:0,//没有更多 
            p:1,//
            page_count:0,        
            isAllowScroll:0, 
            showHeader:false, 
        }
    },
    directives: {        
        focus: function (el) {
            el.focus(); 
        }
    },
    mounted: function () {  
        var that = this; 
        if(getUrlParam('cid') == 20 || getUrlParam('cid') == 24 || (typeof (mJavaScriptObject) == 'object')){
            that.showHeader = false;
        }else{
            that.showHeader = true;
        }
        document.onkeydown = function (event) { //筛选医生                      
            if (event.keyCode == 13 && that.isSearch && that.searchVal) {
                event.preventDefault();

                that.doctorList=[];
                that.p=1;
                that.getSearchList(1);
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
            var code = typeof(this.$route.query.code) != 'undefined' ? this.$route.query.code : 0;
            this.$http({                
                method:'get',
                url: '/doctor/fastRecommendDoctor.html?keyword='+that.searchVal+'&code='+code+'&search=1&p='+p}).then(                                        
                function(res){
                    console.log(res)
                    that.isLoadmore = false;
                    if(res.data.status==200){
                        Vue.nextTick(function(){ 
                            that.doctorList = that.doctorList.concat(res.data.data);
                            that.page_count = res.data.data.total_pages;
                            that.isNoData = false;
                            if (that.page_count > 1) {
                                that.isNomore = 1;
                            }
                        });
                    }else{
                        that.isNoData = true;
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
.fastguahao {padding-top:1.17333rem; }
.topnav {top: 0; left: 0; z-index: 101; height: 1.17333rem; line-height: 1.17333rem; }
.navname{width:8rem; }
.retrunback{width:1.066666667rem; height:1.17333rem; }
.search-bar {height: 1.06667rem; line-height: 1.06667rem; padding: 0 !important; }
.search-input {width: 7.466666667rem; height:1.06667rem; }
.search-icon {color: #b1b1b1; }
.search-clear {width:1.06667rem; height:1.06667rem; color: #8F8E94; }
</style>

