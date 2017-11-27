<template>
    <div class="hospitalselectbox">
    	<head-nav>按医院找医生</head-nav>
        <div class="relative relbox">
            <div class="choosetit layout mb10">
                <span class="elli clearfix" @click='filterToggle($event);' id="unit" v-bind="{'data-class':selectbox}" :class="{'cur':selectbox=='unit'}">
                    <!-- <i class="fleft w-80 elli textc">{{unitname}}</i> -->
                    {{unitname}}
                </span>
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
            <!-- 医院筛选 -->
            <template v-if="selectbox=='unit'">
                <div class="unitbox layout">
                    <div class="w-25 show-area fleft">
                        <button :class="{'cur':area_id == ''}" v-bind="{id:''}" @click='areatabToggle($event);' :disabled="area_id == ''">热门医院</button>
                        <button class="elli" v-for="(show_area,index) in show_area" :class="{'cur':area_id == show_area.area_id}" :disabled="area_id == show_area.area_id" v-bind="{id:show_area.area_id}" @click='areatabToggle($event);'>{{show_area.area_name}}</button>
                    </div>
                    <div class="w-75 fleft bg_white unit-list">
                        <scroller lock-x height="-84" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="0">
                            <div>
                                <div class="pt20 pb20 textc typo_gray typo_small beforeloadimg alignc" v-if="toggleText==false"><img :src="loadimg" class="fleft">正在加载中</div>
                                <ul class="layout">
                                    <li v-for="(list,index) in unit_list">
                                        <a @click="unitselect" v-bind="{'data-unit_id':list.unit_id,'data-unitname':list.unit_name}" :class="{'active':unit_id==list.unit_id}">
                                            <span class="block typo_middle typo_black lh20 clearfix elli">
                                                <cite class="inblo elli" :class="{'max fleft':list.unit_level=='B'||list.unit_level=='C'||list.unit_level=='D'}">{{list.unit_name}}</cite>
                                                <template v-if="list.unit_level=='B'"><em class="fleft ml5 bgFFB753">三甲</em></template>
                                                <template v-else-if="list.unit_level=='C'||list.unit_level=='D'"><em class="fleft ml5 bgffcb00">三级</em></template>
                                            </span>
                                            <span class="block mt5 lh20 elli typo_small typo_gray">
                                                <template v-if="list.cure_score>0"><i class="typo_lorange">{{list.cure_score}}分</i>&nbsp;&nbsp;</template>
                                                {{list.level_name}}&nbsp;&nbsp;
                                                {{list.class_name}}
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                                <load-more tip="loading" v-if="page_count>1 && isNomore == 1"></load-more>
                                <div v-if="isNoData==true">暂无数据</div>
                            </div>
                        </scroller>
                    </div>
                </div>
            </template>
            <!-- 医院筛选 -->
            <!-- 科室筛选 -->
            <template v-if="selectbox=='dep'">
                <div class="depbox">
                    <div class="onelist" @click='tabToggle($event);'>
                        <scroller lock-x height="9.6rem">
                            <div>
                                <a :class="{'cur':dep_name == ''}" v-bind="{id:''}">不限科室</a>
                                <a v-for="(one,index) in depList" :class="{'cur':dep_name == one.dep_name}" v-bind="{id:one.dep_name}">{{one.dep_name}}</a>
                            </div>
                        </scroller>
                    </div>
                    <div class="second">
                        <scroller lock-x height="9.6rem">
                            <div>
                                <div :class="{ 'hide' :dep_name != '' }">
                                    <span :class="{'active':sub_dep==''}" v-bind="{'id':'','data-dep_name':'全部科室'}" @click="depchoose($event)">全部科室</span>
                                </div>
                                <div v-for="(second,index) in depList" :class="{ 'hide' :dep_name != second.dep_name }" >
                                    <template v-if="public==0">
                                        <span v-for="(subsecond,index) in second.child_list" :class="{'active':sub_dep==subsecond.dep_id}" v-bind="{'id':subsecond.dep_id,'data-dep_name':subsecond.shortName}" @click="depchoose($event)">{{subsecond.shortName}}</span>
                                    </template>
                                    <template v-else>
                                        <span v-for="(subsecond,index) in second.child_list" :class="{'active':sub_dep==subsecond.catid}" v-bind="{'id':subsecond.catid,'data-dep_name':subsecond.dep_name}" @click="depchoose($event)">{{subsecond.dep_name}}</span>
                                    </template>
                                </div>
                            </div>
                        </scroller>
                    </div>
                </div>
            </template>
            <!-- 科室筛选 -->
            <!-- 排序筛选 -->
            <template v-if="selectbox=='sort'">
                <div class="sortbox bg_white pb10">
                    <span v-for="(sortlist,index) in sortList" v-bind="{'data-sort':sortlist.sort,'data-sort_name':sortlist.sort_name}" :class="{'active':sortlist.sort==chooseSort}" @click="sortchoose($event)">
                        {{sortlist.sort_name}}
                    </span> 
                </div>
            </template>
            <!-- 排序筛选 -->
            <!-- 综合筛选 -->
            <template v-if="selectbox=='filter'">
                <div class="filterbox">
                    <div class="pagn pt10 pb10 layout lh24 c333"><span class="fleft">医生服务：</span><em class="fleft typo_green typo_small" v-if="asktype.length==0">所有服务</em></div>
                    <div class="pagn layout typo_small">
                        <checker v-model="asktype" default-item-class="classify-item" selected-item-class="classify-item-selected">
                            <checker-item v-for="(ask,index) in screening.ask" v-bind="{'value':ask.type}">{{ ask.type_name }}</checker-item>
                        </checker>
                    </div>
                    <div class="pagn pt10 pb10 layout lh24 c333"><span class="fleft">医生级别：</span><em class="fleft typo_green typo_small" v-if="zcid.length==0">所有级别</em></div>
                    <div class="pagn layout typo_small">
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
            <div class="fullwidth typo_gray mb10 search-bar bg_white typo_middle">
                <i class="fleft iconfont search-icon">&#xe609;</i>
                <form action="" onsubmit="return false;">
                    <input type="search" class="search-input ml5 typo_gray" placeholder="搜索医生" v-model="searchVal">
                </form>
            </div>
            <div class="pt20 pb20 textc typo_gray typo_small beforeloadimg alignc" v-if="doclistloading==true"><img :src="loadimg" class="fleft">正在加载中</div>
            <div v-for="doclist in doctorlist">
                <doctor-list :doclist="doclist"></doctor-list>
            </div>
        </div>
        <template v-if="doc_page_count>1 && doc_isNomore == 1">
            <load-more :tip="'正在加载'"></load-more>
        </template>
        <template v-if="dov_isNoData==true">
            <no-data></no-data>
        </template>
        <div class="netshade" v-if="selectbox!=''" @click="hideselect($event);"></div>
        <scroll-top></scroll-top>
    </div>
</template>
<script>
var shareimg,sharetitle,description,timeLineTitle,timeLineDetails,timeLineImg,shareurl; 
shareimg ='https://static.91160.com/wechat/img/common/logo.jpg'; 

import Vue from 'vue' 
import $ from 'jquery' 
import HeadNav from '../../components/common/Head.vue'
import ScrollTop from '../../components/common/scrollTop.vue'
import NoData from '../../components/common/NoData.vue'
import DoctorList from '../../components/common/doctorlist.vue'
import {WxOath,getAppToken,wxShare} from '../../utils/util.js'
import { Checker, CheckerItem,Toast,ToastPlugin,LoadMore,Scroller } from 'vux'
Vue.use(ToastPlugin)
export default{
	data: function () {  
        return {
            searchVal: '',
            public:0,
            isNoData:false,
            dov_isNoData:false,
            isApp:false,
            doclistloading:true,
            loadimg:require('../../static/bigloading.gif'), 
            isNomore: 0,//没有更多
            doc_isNomore:0,//医生列表没有更多
            toggleText:false,//切换区域的时候加载
            selectbox:'',
            unit_id:'',
            dep_id:'',
            area_id:'',
            unit_city_id:'',
            unitname:'全国',
            dep_name:'',
            depname:'科室',
            sortname:'排序',
            filtername:'筛选',
            doctorlist:[],
            show_area:[
            ],
            unit_list:[
            ],
            depList:[],//按科室
            sortList:[
                {
                    "sort":"",
                    "sort_name":"综合排序"
                },
                {
                    "sort":"ask_total",
                    "sort_name":"按咨询量从高到低"
                },
                {
                    "sort":"comment_score",
                    "sort_name":"按点评分数从高到低"
                },
                {
                    "sort":"price",
                    "sort_name":"按价格从低到高"
                }
            ],//按排序
            screening:{
                "ask":[
                    {
                        "type":"ask",
                        "type_name":"图文问诊"
                    },
                    {
                        "type":"ask_tel",
                        "type_name":"电话问诊"
                    },
                    {
                        "type":"ask_video",
                        "type_name":"视频问诊"
                    }
                ],
                "zc":[
                    {
                        "zcid":"1",
                        "zc_name":"主任医师"
                    },
                    {
                        "zcid":"2",
                        "zc_name":"副主任医师"
                    },
                    {
                        "zcid":"3",
                        "zc_name":"主治医师"
                    },
                    {
                        "zcid":"4",
                        "zc_name":"医师"
                    }
                ]
            },//按筛选
            chooseSort:'',//排序选中类型
            cat_no:'',
            sub_dep:'',//科室筛选二级科室选中
            asktype:'',//医生服务
            zcid:'',//医生级别
            page_count:'',
            p:1,
            tur:true,
            doc_page_count:'',
            doc_p:1,
            doc_tur:true,
            onFetching: true,
            bottomCount:20,
        }
    },
    components: {
        HeadNav,ScrollTop,Checker, CheckerItem,DoctorList,LoadMore,NoData, Scroller,
    },
    mounted: function () { 
        $(window).scrollTop(0);
        this.sub_dep = this.$route.query.dep_id || ''; 
        this.unit_id = this.$route.query.unit_id || '';
        this.Doctorlist(this.unit_id,this.sub_dep,'','','',1); 
    },
    destroyed:function(){
        window.onscroll=null;
    },
    methods:{
        searchList:function(unit_id,sub_dep,type,zcid,sort,p){
            var that = this;
            document.onkeydown = function (event) { //筛选医生                      
                if (event.keyCode == 13) {
                    event.preventDefault();  
                    that.doctorlist = [];
                    that.doc_p=1;
                    that.Doctorlist(unit_id,sub_dep,type,zcid,sort,p); 
                }
            } 
        },
        onScrollBottom () {
            if (this.onFetching) {
                this.onFetching = false;
                if(parseInt(this.p) < parseInt(this.page_count)){
                    this.p++;
                    this.getUnitList(this.p);
                }else{
                    this.isNomore = 0;
                }
            }
        },
        filterToggle:function(e){//顶部筛选
            this.selectbox = e.target.id;
            if(e.target.id=='unit' && this.unit_list.length==0){
                this.getUnitList(this.p);
            }else if(e.target.id=='dep'){
                this.getDepList(this.unit_id);
            }
            if(e.currentTarget.dataset.class==this.selectbox){
                this.selectbox = '';
            }
            
        },
        areatabToggle:function(e){
            this.toggleText = false;
            this.p = 1;
            this.unit_list = [];
            this.area_id = e.target.id;
            this.getUnitList(this.p);
            this.$nextTick(() => {
                this.$refs.scrollerBottom.reset({top: 0})
            });
            $(".unitbox,.show-area,.unit-list").css({'height':$(window).height()-84});
        },
        tabToggle:function(e){//科室切换
            this.cat_no = e.target.id;
            this.dep_name = e.target.id;
        },
        getUnitList:function(p){
            var that = this;
            that.isNomore = 0;
            var code = typeof(this.$route.query.code) != 'undefined' ? this.$route.query.code : 0;
            var cid = this.$route.query.cid;
            that.unit_city_id = this.$route.query.ask_city_id || '';
            this.$http({                
                method:'get',
                url: '/unit/getunitlist.html?code='+code+'&unit_city_id='+that.unit_city_id+'&area_id='+that.area_id+'&page='+p}).then(
                function(res){
                    that.toggleText = true;
                    if(res.data.state==1){
                        Vue.nextTick(function(){
                            that.show_area = res.data.data.show_area;
                            that.unit_list = that.unit_list.concat(res.data.data.unit_list);
                            that.page_count = res.data.data.total_page;
                            if (that.page_count >= 1) {
                                that.isNomore = 1;
                            }
                            if(that.page_count==0){//如果没数据显示暂无数据
                                that.isNoData = true;
                            }
                        });
                    }else{
                        that.unit_list = [];
                        that.page_count = 0;
                    } 
                    that.onFetching = true;  
                }
            )               
        },
        getDepList:function(unit_id){
            var that = this;
            var code = typeof(this.$route.query.code) != 'undefined' ? this.$route.query.code : 0;
            var cid = this.$route.query.cid;
            that.unit_city_id = this.$route.query.ask_city_id || '';
            this.$http({                
                method:'get',
                url: '/ask/getdeplist.html?code='+code+'&unit_id='+unit_id+'&ask_city_id='+that.unit_city_id}).then(
                function(res){
                    console.log(res)
                    if(res.data.state==1){
                        Vue.nextTick(function(){
                            that.depList = res.data.data;
                            that.public = res.data.public;
                        });
                    }else{
                        that.$vux.toast.text(res.data.msg,'middle');
                    }  
                }
            )               
        },
        hideselect:function(e){//点击遮罩层隐藏弹层
            this.selectbox='';
        },
        depchoose:function(e){//科室筛选
            this.sub_dep = e.target.id;
            this.depname = e.currentTarget.dataset.dep_name;
            this.selectbox = '';
            this.doctorlist = [];
            this.doclistloading = true;
            this.doc_p = 1;
            this.Doctorlist(this.unit_id,this.sub_dep,this.asktype,this.zcid,this.chooseSort,this.doc_p)
        },
        sortchoose:function(e){//排序筛选
            this.chooseSort = e.currentTarget.dataset.sort;
            this.sortname = e.currentTarget.dataset.sort_name;
            this.selectbox = '';
            this.doctorlist = [];
            this.doclistloading = true;
            this.doc_p = 1;
            this.Doctorlist(this.unit_id,this.sub_dep,this.asktype,this.zcid,this.chooseSort,this.doc_p)
        },
        resetbtn:function(){//筛选重置
            this.asktype='';
            this.zcid=[];
        },
        filterbtn:function(e){//筛选完成
            var zcid = this.zcid.toString();
            this.selectbox = '';
            this.doctorlist = [];
            this.doclistloading = true;
            this.doc_p = 1;
            this.Doctorlist(this.unit_id,this.sub_dep,this.asktype,zcid,this.chooseSort,this.doc_p)
        },
        unitselect:function(e){
            this.selectbox = '';
            this.doctorlist = [];
            this.doclistloading = true;
            this.unit_id = e.currentTarget.dataset.unit_id;
            this.unitname = e.currentTarget.dataset.unitname;
            this.sub_dep = 0;
            this.cat_no = '';
            this.dep_name = '';
            this.depname = '科室'
            this.depList=[];
            this.doc_p = 1;
            this.Doctorlist(this.unit_id,this.sub_dep,this.asktype,this.zcid,this.chooseSort,this.doc_p)
        },
        Doctorlist:function(unit_id,sub_dep,type,zcid,sort,p){
            var that = this;
            that.doc_isNomore = 0;
            var code = typeof(this.$route.query.code) != 'undefined' ? this.$route.query.code : 0;
            var cid = this.$route.query.cid;
            that.dov_isNoData = false;
            this.$http({                
                method:'get',
                url: '/ask/getdoclist.html?code='+code+'&unit_id='+unit_id+'&dep_id='+sub_dep+'&type='+type+'&zcid='+zcid+'&sort='+sort+'&doctor_name='+that.searchVal+'&p='+p}).then(
                function(res){
                    if(res.data.state==1){
                        that.doclistloading = false;
                        Vue.nextTick(function(){
                            that.doctorlist = that.doctorlist.concat(res.data.data.rows);
                            that.doc_page_count = res.data.data.total_pages;
                            that.unitname = res.data.data.unit_name || '全国';
                            if (that.doc_page_count >= 1) {
                                that.doc_isNomore = 1;
                            }
                            if(that.doc_page_count==0){//如果没数据显示暂无数据
                                that.dov_isNoData = true;
                            }
                        });
                        that.scrollist();
                    }else{
                        that.doctorlist = [];
                        that.doc_page_count = 0;
                    } 
                    that.doc_tur = true;  
                    that.searchList(unit_id,sub_dep,type,zcid,sort,1);
                }
            )               
        },
        scrollist:function(){
            //页面滑动加载数据
            var that = this;
            window.onscroll = function(){
                if(that.doc_tur){
                    var totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
                    if($(document).height() <= totalheight ){
                        that.doc_tur = false;
                        if(parseInt(that.doc_p) < parseInt(that.doc_page_count)){
                            that.doc_p++;
                            that.Doctorlist(that.unit_id,that.sub_dep,that.asktype,that.zcid,that.chooseSort,that.doc_p)
                        }
                        else{
                            that.$vux.toast.text('已经全部加载完','middle');
                            that.doc_isNomore = 0;
                        }
                    }                       
                }         
            }             
        }, 
    }
}
</script>
<style scoped lang="scss">
	i,em,cite{font-style: normal;}
    .pt50{padding-top:1.33333rem;}
    .hospitalselectbox{padding-top:1.17333rem;}
    .relbox{position: fixed;z-index: 10; width: 100%;}
    .choosetit{ width:100%; border-bottom: solid 1px #fafafa; text-align: center; background: #fff;}
    .choosetit span{ float:left; display: inline-block; width: 25%;height: 1.06667rem; line-height: 1.06667rem; font-size: 0.37333rem; color: #797979; }
    .choosetit span:after{content:'\e625'; font-family: iconfont;}
    .choosetit .cur{color: #00d3c2;}

    .unitbox,.depbox,.sortbox,.filterbox{position: absolute;top:1.09333rem;left: 0; width: 100%;}
    .depbox{max-height:9.6rem;background:#fff url(../../static/depbg40.gif) repeat-y center; background-size:contain; overflow-y:scroll;}
    .unitbox{background:url(./images/unitbg.gif) repeat-y center; background-size:contain; overflow-y:scroll;}
    .filterbox{height: 15.54667rem; font-size: 0.42667rem; background:#fff;}
    .onelist{float:left;width: 40%;max-height:9.6rem; overflow-y: auto; font-size:0.4rem; background: #fafafa}
    .onelist a.cur{color: #00d3c2; background: #fff;}
    .second{float:left; width: 60%;max-height:9.6rem; overflow-y: auto;background: #fff;}
    .onelist a,.second span{display:block;padding:0.32rem 0.4rem;line-height:0.48rem; font-size:0.42667rem; color: #333;}
    .second span{position: relative;  color: #333;}
    .second span.active{color: #00d3c2;}
    .second span.active:after{content: '\e603';font-family: 'iconfont';position: absolute;right:0.13333rem; top:0.32rem; font-size:0.37333rem; color:#00d3c2;}

    .sortbox span{position: relative; display: block;padding:0 0.53333rem; line-height: 1.12rem;font-size: 0.42667rem; color: #363636; background: #fff;}
    .sortbox span.active{color: #00d3c2;}
    .sortbox span.active:after{content: '\e603';font-family: 'iconfont';position: absolute;right:0.53333rem; top: 0; font-size:0.37333rem; color:#00d3c2;}

    .classify-item {float: left; display: inline-block;padding:0.24rem 0.37333rem;margin:0 0.18667rem 0.26667rem 0;border:1px solid #bbb;line-height:1;color:#333;-webkit-border-radius:0.8rem; -moz-border-radius:0.8rem; border-radius:0.8rem;cursor: pointer;}
    .classify-item-selected {border:1px solid #00D3C2;color:#00D3C2;}

    .filterbotbtn{ position: fixed;bottom: 0;left: 0; width: 100%; height: 1.17333rem;}
    .filterbotbtn span{float:left; display: inline-block; width: 50%; height: 1.17333rem; line-height: 1.17333rem; text-align: center;}
    .filterbotbtn span:first-child{ color: #00b0b1;background-color: #e9f7f7;}
    .filterbotbtn span:last-child{ color: #fff;background-color:#1cb1b3; }

    .netshade{position: fixed; top: 0; left: 0; z-index: 9; width:100%;height: 100%; background-color: rgba(0, 0, 0, 0.6);}


    .w-25{width:25%;}
    .w-75{width: 75%;}
    .show-area button{display: block;width:100%; padding:0 0.32rem; line-height: 1.28rem;text-align: left; font-size: 0.42667rem; color: #707070; background: #f5f5f5}
    .show-area button.cur{color:#00d2c3;background: #fff;}
    .unit-list{padding:0;}
    .unit-list li{float:left;width: 100%;}
    .unit-list li a{display: block; padding:0.26667rem 0.4rem;}
    .unit-list li cite.max{max-width: 80%;}
    .unit-list li a.active cite{color:#00d3c2;}
    .unit-list li em{padding:0 0.13333rem;border-radius:0.00356rem;line-height: 0.48rem; font-size: 0.32rem;color:#fff;}
    .bgFFB753{background: #FFB753;}
    .bgffcb00{background: #ffcb00;}
    .show-area,.unit-list{overflow-y: scroll;}

    .search-bar {height: 1.06667rem; line-height: 1.06667rem; padding: 0 !important; }
    .search-input {width: 7.466666667rem;line-height:0.48rem; padding:0.29333rem 0.13333rem 0.28rem; font-size: 0.4rem; color:#666; }
    .search-icon {position:relative; padding:0 0.26667rem 0 0.4rem;line-height:1.04rem; font-size: 0.48rem; color: #b1b1b1; }
    .search-icon:after{content:''; position:absolute;right:0;top:0.32rem;width:2px;height:0.42667rem; background:#ccc;}

    .beforeloadimg{width:2.66667rem;}
    .beforeloadimg img{width:0.53333rem;}
</style>