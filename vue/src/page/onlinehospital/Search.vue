<template>
    <div id="OnlineHospital" class="fs14" :class="showHeader==true ? 'online-hospital' :' ' ">  
        <div class="fixed topnav bg_green fullwidth fs16 typo_white" v-if="showHeader==true">
            <i class="iconfont retrunback inblo textc " onclick="javascript:history.go(-1)">&#xe60e;</i>
            <div class="ml50 navname inblo textc">搜索</div>          
        </div>
        <!--end .topnav-->      
        <div class="search-bar bg_white">
            <form onsubmit="return false;">
                <div class="fullwidth typo_gray" v-show="isSearch">
                    <i class="iconfont ml15 search-icon">&#xe609;</i>
                    <input type="text" class="search-input ml5" placeholder="输入医生名字在线问诊" v-focus v-model="searchVal">
                    <i class="iconfont search-clear inblo textc fr" v-on:click="clearInput">&#xe606;</i>
                </div>
                <label class="fullwidth typo_gray textc block fullheight" v-show="!isSearch" v-on:click="inSearch">
                    <i class="iconfont search-icon">&#xe609;</i>
                    <span>搜索医生</span>
                </label>
            </form>
        </div>
    
        <template v-show="doctorList && doctorList.length">
            <div class="p15 bg_white mt10 fs14" v-for="doclist in doctorList" :key="doclist">
                <doc-list :doclist="doclist"></doc-list>
            </div>
            <div class="weui-loadmore" v-show="isLoadmore"><i class="weui-loading"></i><span class="weui-loadmore__tips">正在加载</span></div>           
        </template>
        <template v-if="isSearch==1 && isNoData==true">
            <no-data></no-data>
        </template>
         <scroll-top></scroll-top> 
    </div>
</template>

<script>
var interval,bfscrolltop;

import Vue from 'vue'  
import DocList from './Doclist.vue'
import NoData from '../../components/common/NoData.vue'
import ScrollTop from '../../components/common/scrollTop.vue'
import '../../plugins/weui/style/weui.min.scss'

export default {  
    components: {
        DocList,  
        ScrollTop,NoData
    },
    data: function () {  
        return {           
            searchVal: '',
            isSearch: 0,//是否搜索 
            isNoData: false,
            doctorList:[],
            isLoadmore:0,//正在加载
            isNomore:0,//没有更多 
            page:1,//
            pageNum:0,        
            isAllowScroll:0,  
            showHeader:false, 
            
        }
    },
    directives: {        
        focus: function (el) {
            el.focus(); 
        }
    },
    beforeCreate:function(){
        var metas = document.getElementsByTagName("meta");
        if(typeof(mJavaScriptObject)=='object'){
            document.title = '云杉网上医院';
        }        
    },
    mounted: function () {  
        var that = this;  
        var cid = this.$route.query.cid;
        if(cid == 20 || cid == 24 || (typeof (mJavaScriptObject) == 'object')){
            that.showHeader = false;
        }else{
            that.showHeader = true;
        }      
        document.onkeydown = function (event) { //筛选医生                      
            if (event.keyCode == 13 && that.isSearch && that.searchVal) {
                event.preventDefault();  
                that.gaStaticClick('云杉网上医院在线问诊-搜索关键词-'+that.searchVal);
                that.doctorList = [];
                that.page=1;
                that.searchDoc();
            }
        }        
        window.addEventListener("scroll", function (event) {           
            if(that.isAllowScroll && that.page<=that.pageNum){               
                var totalheight = parseFloat(document.body.offsetHeight) + parseFloat(document.body.scrollTop);
                if(document.body.scrollHeight <= totalheight){
                    that.isAllowScroll = 0;
                    that.searchDoc(1);                   
                }				        
            }		
        })	
    },
    methods: {
        inSearch: function () {
            this.isSearch = 1
        },
        clearInput: function () {
            this.searchVal = '';
        },
        searchDoc: function (type) {
            var that = this,type = type || 0;
            that.isLoadmore=1;
            that.isNoData=false;

            that.$http.get("/onlinehospital/index.html?doctor_name=" + that.searchVal+"&p="+that.page).then((data) => {               
                var data = data.data;
                if (data.status == 200) {
                    that.isLoadmore=0;       
                    that.pageNum = data.p_num;                  

                    if (data.doctor_list && data.doctor_list.length) {
                        if(type){
                            that.doctorList.push.apply(that.doctorList,data.doctor_list);                           
                        }else{
                            that.doctorList = data.doctor_list;
                        }   
                        
                        that.page++; 
                        that.isAllowScroll=1                    
                    } else {
                        if(that.page>1){
                           that.isNomore=1;
                        }else{
                            that.isNoData = true;
                            that.doctorList=[];
                        }
                    }      
                }
            })
        },
        gaStaticClick: function (msg) {
            var msg = msg || '';
            ga('send', 'event', msg, '点击');
        }
    }
}
</script>

<style>
html,body{
    background-color: #f5f5f5;
}
</style>
<style scoped>
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
.navname{
    width:8rem;
}
.retrunback{
    width:1.066666667rem;
    height:1.28rem;
}
.search-bar {
    height: 40px;
    line-height: 40px;
    padding: 0 !important;
}

.search-input {
    width: 7.466666667rem;
    height:40px;
}

.search-icon {
    color: #b1b1b1;
}

.search-clear {
    width:40px;
    height:40px;
    color: #8F8E94;
}

</style>

