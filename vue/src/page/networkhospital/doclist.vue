<template>
    <div :class="{'networkBox':isApp==false}">
        <head-nav v-if="isApp==false">按科室找医生</head-nav>
        <div class="relative relbox">
            <div class="choosetit layout mb10">
                <span class="elli" @click='filterToggle($event);' id="dep" v-bind="{'data-class':selectbox}" :class="{'cur':selectbox=='dep'}">
                    {{depname}}
                </span>
                <span class="elli" @click='filterToggle($event);' id="sort" v-bind="{'data-class':selectbox}" :class="{'cur':selectbox=='sort'}">
                    {{sortname}}
                </span>
                <span class="elli" @click='filterToggle($event);' id="filter" v-bind="{'data-class':selectbox}" :class="{'cur':selectbox=='filter'}">
                    {{filtername}}
                </span>
            </div>
            <!-- 科室筛选 -->
            <template v-if="selectbox=='dep'">
                <div class="depbox">
                    <div class="onelist" @click='tabToggle($event);'>
                        <a :class="{'cur':cat_no == ''}" v-bind="{id:''}">不限科室</a>
                        <a v-for="(one,index) in depList" :class="{'cur':cat_no == one.cat_no}" v-bind="{id:one.cat_no}">{{one.cat_name}}</a>
                    </div>
                    <div class="second">
                        <div :class="{ 'hide' :cat_no != '' }">
                            <span :class="{'active':sub_dep==''}" v-bind="{'id':'','data-dep_name':'全部科室'}" @click="depchoose($event)">全部科室</span>
                        </div>
                        <div v-for="(second,index) in depList" :class="{ 'hide' :cat_no != second.cat_no }" >
                            <span v-for="(subsecond,index) in second.dep" :class="{'active':sub_dep==subsecond.dep_id}" v-bind="{'id':subsecond.dep_id,'data-dep_name':subsecond.dep_name}" @click="depchoose($event)">{{subsecond.dep_name}}</span>
                        </div>
                    </div>
                </div>
            </template>
            <!-- 科室筛选 -->
            <!-- 排序筛选 -->
            <template v-if="selectbox=='sort'">
                <div class="sortbox">
                    <span v-for="(sortlist,index) in sortList" v-bind="{'data-sort':sortlist.sort,'data-sort_name':sortlist.sort_name}" :class="{'active':sortlist.sort==chooseSort}" @click="sortchoose($event)">
                        {{sortlist.sort_name}}
                    </span> 
                </div>
            </template>
            <!-- 排序筛选 -->
            <!-- 综合筛选 -->
            <template v-if="selectbox=='filter'">
                <div class="filterbox">
                    <div class="pagn pt10 pb10 lh24 c333">医生服务：<em class="typo_green typo_smaller" v-if="asktype.length==0">所有服务</em></div>
                    <div class="pagn layout">
                        <checker v-model="asktype" default-item-class="classify-item" selected-item-class="classify-item-selected">
                            <checker-item v-for="(ask,index) in screening.ask" v-bind="{'value':ask.type}">{{ ask.type_name }}</checker-item>
                        </checker>
                    </div>
                    <div class="pagn pt10 pb10 lh24 c333">医生级别：<em class="typo_green typo_smaller" v-if="zcid.length==0">所有级别</em></div>
                    <div class="pagn layout">
                        <checker v-model="zcid" type="checkbox" default-item-class="classify-item" selected-item-class="classify-item-selected">
                            <checker-item v-for="(zc,index) in screening.zc" v-bind="{'value':zc.zcid}">{{ zc.zc_name }}</checker-item>
                        </checker>
                    </div>
                    <div class="filterbotbtn layout">
                        <span @click="resetbtn($event)">重置</span>
                        <span @click="filterbtn($event)">完成</span>
                    </div>
                </div>
            </template>
            <!-- 综合筛选 -->
        </div>
        <div class="pt50">
            <div v-for="doclist in doctorlist">
                <doctor-list :doclist="doclist"></doctor-list>
            </div>
        </div>
        <template v-if="page_count>1 && isNomore == 1">
            <load-more :tip="'正在加载'"></load-more>
        </template>
        <template v-if="isNoData==true">
            <no-data></no-data>
        </template>
        <div class="netshade" v-if="selectbox!=''" @click="hideselect($event);"></div>
        <scroll-top></scroll-top>
    </div>
</template>
<script>
var ret = '';
var shareimg,sharetitle,description,timeLineTitle,timeLineDetails,timeLineImg,shareurl; 
shareimg ='https://static.91160.com/wechat/img/common/logo.jpg'; 

import Vue from 'vue' 
import $ from 'jquery' 
import HeadNav from '../../components/common/Head.vue'
import NoData from '../../components/common/NoData.vue'
import ScrollTop from '../../components/common/scrollTop.vue'
import DoctorList from './doctorlist.vue'
import {WxOath,getAppToken,wxShare} from '../../utils/util.js'
import { Checker, CheckerItem,Toast,ToastPlugin,LoadMore } from 'vux'
Vue.use(ToastPlugin)
export default {
    data: function () {  
        return {
            isNoData:false,
            isApp:false,
            isNomore: 0,//没有更多
            selectbox:'',
            unit_id:'',
            dep_id:'',
            depname:'科室',
            sortname:'排序',
            filtername:'筛选',
            doctorlist:[],
            depList:[],//按科室
            sortList:[],//按排序
            screening:[],//按筛选
            chooseSort:'',//排序选中类型
            cat_no:'',
            sub_dep:'',//科室筛选二级科室选中
            asktype:'',//医生服务
            zcid:'',//医生级别
            page_count:'',
            p:1,
            tur:true,
        }
    },
    components: {
        HeadNav,LoadMore,NoData,
        DoctorList,Checker, CheckerItem,ScrollTop
    },
    mounted: function () {
        $(window).scrollTop(0);
        this.sub_dep = this.$route.query.dep_id?this.$route.query.dep_id:'';    
        this.getDocScreening();
    },
    destroyed:function(){
        window.onscroll=null;
    },
    methods:{
        filterToggle:function(e){//顶部筛选
            this.selectbox = e.target.id;
            if(e.currentTarget.dataset.class==this.selectbox){
                this.selectbox = '';
            }
        },
        tabToggle:function(e){//科室切换
            this.cat_no = e.target.id;
        },
        hideselect:function(e){//点击遮罩层隐藏弹层
            this.selectbox='';
        },
        depchoose:function(e){//科室筛选
            this.sub_dep = e.target.id;
            this.depname = e.currentTarget.dataset.dep_name;
            this.selectbox = '';
            this.doctorlist = [];
            this.Doctorlist(this.unit_id,this.sub_dep,this.asktype,this.zcid,this.chooseSort,1)
        },
        sortchoose:function(e){//排序筛选
            this.chooseSort = e.currentTarget.dataset.sort;
            this.sortname = e.currentTarget.dataset.sort_name;
            this.selectbox = '';
            this.doctorlist = [];
            this.Doctorlist(this.unit_id,this.sub_dep,this.asktype,this.zcid,this.chooseSort,1)
        },
        resetbtn:function(){//筛选重置
            this.asktype='';
            this.zcid=[];
        },
        filterbtn:function(e){//筛选完成
            var zcid = this.zcid.toString();
            this.selectbox = '';
            this.doctorlist = [];
            this.Doctorlist(this.unit_id,this.sub_dep,this.asktype,zcid,this.chooseSort,1)
        },
        Doctorlist:function(unit_id,sub_dep,type,zcid,sort,p){
            var that = this;
            that.isNomore = 0;
            var code = typeof(this.$route.query.code) != 'undefined' ? this.$route.query.code : 0;
            var cid = this.$route.query.cid;
            that.isNoData = false;
            this.$http({                
                method:'get',
                url: '/networkhospital/getDocList.html?code='+code+'&unit_id='+unit_id+'&dep_id='+sub_dep+'&type='+type+'&zcid='+zcid+'&sort='+sort+'&p='+p}).then(
                function(res){
                    if(res.data.state==1){
                        Vue.nextTick(function(){
                            that.doctorlist = that.doctorlist.concat(res.data.data.list);
                            that.page_count = Math.ceil(res.data.data.total/10);//向上取整 1.2 取2;
                            if (that.page_count >= 1) {
                                that.isNomore = 1;
                            }
                            if(that.page_count==0){//如果没数据显示暂无数据
                                that.isNoData = true;
                            }
                        });
                    }else{
                        that.doctorlist = [];
                        that.page_count = 0;
                    } 
                    that.tur = true;  
                }
            )               
        },
        scrollist:function(){
            //页面滑动加载数据
            var that = this;
            window.onscroll = function(){
                console.log('aaaaaaaaaaaaaaaaa')
                if(that.tur){
                    var totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
                    if($(document).height() <= totalheight ){
                        that.tur = false;
                        if(parseInt(that.p) < parseInt(that.page_count)){
                            that.p++;
                            that.Doctorlist(that.unit_id,that.sub_dep,that.asktype,that.zcid,that.chooseSort,that.p)
                        }
                        else{
                            that.$vux.toast.text('已经全部加载完','middle');
                            that.isNomore = 0;
                        }
                    }                       
                }         
            }             
        }, 
        getDocScreening:function(){
            var that = this;
            var cid = this.$route.query.cid;
            var dep_id = this.$route.query.dep_id;
            that.unit_id = this.$route.query.unit_id;
            if(cid==20 || cid ==24 || (typeof (mJavaScriptObject) == 'object')){
                that.isApp = true;
            }else{
                that.isApp = false;
            }
            this.$http({                
                method:'get',
                url: '/networkhospital/getDocScreening.html?unit_id='+that.unit_id+'&dep_id='+dep_id}).then(
                function(res){
                    if(res.data.state==1){
                        Vue.nextTick(function(){
                            that.depList = res.data.data.depList;
                            that.sortList = res.data.data.sortList;
                            that.screening = res.data.data.screening;
                            var newArrs = [];
                            that.depList.forEach(function(item,index){
                                item.dep.forEach(function(jtem,j){
                                    newArrs.push(jtem);
                                })
                            });
                            var result = newArrs.filter(function(a){
                                if(a.dep_id == dep_id){
                                    return a;
                                }
                            });
                            if(result.length>0){
                                that.depname = result[0].dep_name;
                                that.cat_no = result[0].cat_no.substring(0,1);
                            }
                            $(".second").css({'height':that.depList.length*40});
                        });
                    } 
                    that.Doctorlist(that.unit_id,dep_id,that.asktype,that.zcid,that.chooseSort,1);
                    that.scrollist();
                }
            )               
        },
    }
}
</script>

<style scoped lang = 'scss'>
em,i{font-style: normal;}
.networkBox{padding-top: 1.173333rem}
.relbox{position: fixed;z-index: 10; width: 100%;}
.pt50{padding-top:1.33333rem;}
.choosetit{ width:100%; border-bottom: solid 1px #fafafa; text-align: center; background: #fff;}
.choosetit span{ float:left; display: inline-block; width: 33.33%; height: 1.06667rem; line-height: 1.06667rem; font-size: 0.37333rem; color: #797979; }
.choosetit span:after{content:'\e625'; font-family: iconfont;}
.choosetit .cur{color: #00d3c2;}

.depbox,.sortbox,.filterbox{position: absolute;top:1.09333rem;left: 0; width: 100%; background: #fff;}
.depbox{max-height:9.6rem;background:#fff url(./images/depbg.gif) repeat-y center; background-size:cover;}
.filterbox{height: 15.54667rem;}
.onelist{float:left;width: 40%;max-height:9.6rem; overflow-y: auto; font-size: 0.37333rem; background: #fafafa}
.onelist a.cur{color: #00d3c2; background: #fff;}
.second{float:left; width: 60%;max-height:9.6rem; overflow-y: auto;background: #fff;}
.onelist a,.second span{display:block;padding:0 0.8rem; line-height:1.12rem; font-size:0.37333rem; color: #333;}
.second span{position: relative; padding:0 0.66667rem;color: #333;}
.second span.active{color: #00d3c2;}
.second span.active:after{content: '\e603';font-family: 'iconfont';position: absolute;right:0.53333rem; top: 0; font-size:0.37333rem; color:#00d3c2;}

.sortbox span{position: relative; display: block;padding:0 0.53333rem; line-height: 1.12rem;font-size: 0.37333rem; color: #363636; background: #fff;}
.sortbox span:nth-child(2n){background: #f9f9f9}
.sortbox span.active{color: #00d3c2;}
.sortbox span.active:after{content: '\e603';font-family: 'iconfont';position: absolute;right:0.53333rem; top: 0; font-size:0.37333rem; color:#00d3c2;}

.classify-item {float: left; display: inline-block;padding:0.24rem 0.37333rem;margin:0 0.18667rem 0.26667rem 0;border:1px solid #bbb;line-height:1;color:#333;-webkit-border-radius:0.8rem; -moz-border-radius:0.8rem; border-radius:0.8rem;cursor: pointer;}
.classify-item-selected {border:1px solid #00D3C2;color:#00D3C2;}

.filterbotbtn{ position: fixed;bottom: 0;left: 0; width: 100%; height: 1.17333rem;}
.filterbotbtn span{float:left; display: inline-block; width: 50%; height: 1.17333rem; line-height: 1.17333rem; text-align: center;}
.filterbotbtn span:first-child{ color: #00b0b1;background-color: #e9f7f7;}
.filterbotbtn span:last-child{ color: #fff;background-color:#1cb1b3; }

.netshade{position: fixed; top: 0; left: 0; z-index: 9; width:100%;height: 100%; background-color: rgba(0, 0, 0, 0.6);}

</style>