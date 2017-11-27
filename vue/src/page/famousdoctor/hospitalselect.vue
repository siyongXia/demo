<template>
    <div class="hospitalselectbox">
    	<head-nav>选择医院</head-nav>
    	<div class="curcity clearfix">
    		<a class="inblo fright typo_gray typo_large pl10 pr5 iconfont" href="/vue/ask/hospitalselect.html" @click="gaSend('名医主页_选择医院_刷新')">&#xe6f8;</a>
    		<span class="fleft lh22">选择城市：{{city_name}}</span>
    		<router-link :to="{path:'../city/index.html',query:{redirect:'hospitalselect'}}" class="fleft ml10 oval bg_green typo_white typo_small inblo plr15 lh22" @click="gaSend('名医主页_选择医院_重置')">重置</router-link>
    	</div>
    	<div class="selectBox clearfix">
    		<div class="w-25 show-area fleft">
    			<button :class="{'cur':area_id == ''}" v-bind="{id:''}" @click='tabToggle($event);' :disabled="area_id == ''">热门医院</button>
    			<button class="elli" v-for="(show_area,index) in show_area" :class="{'cur':area_id == show_area.area_id}" :disabled="area_id == show_area.area_id" v-bind="{id:show_area.area_id}" @click='tabToggle($event);'>{{show_area.area_name}}</button>
    		</div>
    		<div class="w-75 fleft bg_white unit-list">
                <scroller lock-x height="-100" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="0">
                    <div>
                        <div class="pt20 pb20 textc typo_gray typo_small beforeloadimg alignc" v-if="toggleText==false"><img :src="loadimg" class="fleft">正在加载中</div>
            			<ul class="layout">
            				<li v-for="(list,index) in unit_list">
            					<a :href="'/vue/ask/doclist.html?unit_id='+list.unit_id+'&ask_city_id='+unit_city_id" @click="gaSend('名医主页_选择医院_点击医院总量')">
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
    </div>
</template>
<script>
var shareimg,sharetitle,description,timeLineTitle,timeLineDetails,timeLineImg,shareurl; 
shareimg ='https://static.91160.com/wechat/img/common/logo.jpg'; 

import Vue from 'vue' 
import $ from 'jquery' 
import HeadNav from '../../components/common/Head.vue'
import {WxOath,getAppToken,wxShare} from '../../utils/util.js'
import { Scroller,LoadMore,Toast,ToastPlugin } from 'vux'
Vue.use(ToastPlugin)
export default{
	data: function () {  
        return {
        	area_id:'',
            city_name:'',
            loadimg:require('../../static/bigloading.gif'), 
            toggleText:false,//切换区域的时候加载
            isNomore: 0,//没有更多
            isNoData:false,
        	citybox:false,
        	city_info:{},
            show_area:[],
            unit_list:[],
            page_count:'',
            p:1,
            tur:true,
            unit_city_id:'',
            onFetching: true,
            bottomCount:20,
        }
    },
    components: {
        HeadNav,
        Scroller,
        Toast,
    LoadMore
    },
    mounted: function () {  
        this.city_name = this.$route.query.city_name || '深圳';
        this.getList(1);
    },
    methods:{
        onScrollBottom () {
            if (this.onFetching) {
                this.onFetching = false;
                if(parseInt(this.p) < parseInt(this.page_count)){
                    console.log(this.p)
                    this.p++;
                    this.getList(this.p);
                }else{
                    console.log('a')
                    // this.$vux.toast.text('已经全部加载完','middle');
                    this.isNomore = 0;
                }
                // this.$nextTick(() => {
                //     this.$refs.scrollerBottom.reset();
                // })
            }
        },
    	tabToggle:function(e){
    		this.p = 1;
    		this.unit_list = [];
    		this.area_id = e.target.id;
            this.toggleText = false;
    		this.getList(1);
            this.$nextTick(() => {
                this.$refs.scrollerBottom.reset({top: 0})
            })
    	},
    	getList:function(p){
            var that = this;
            var code = typeof(this.$route.query.code) != 'undefined' ? this.$route.query.code : 0;
            var cid = this.$route.query.cid;
            that.isNomore = 0;
            that.unit_city_id = this.$route.query.city_id || 5;
            $(".selectBox,.show-area,.unit-list").css({'height':$(window).height()-100})
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
                            that.city_info = res.data.data.city_info;
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
                    that.onFetching = true;  
                }
            )               
        },
    }
}
</script>
<style scoped lang="scss">
	i,em,cite{font-style: normal;}
	.hospitalselectbox{padding-top: 1.173333rem}
	.curcity{ margin-bottom: 0.26667rem; padding:0.32rem 0.26667rem; line-height:0.53333rem;font-size: 0.42667rem; color: #333; background: #fff;}
	.w-25{width:25%;}
	.w-75{width: 75%;}
	.show-area button{display: block;width:100%; padding:0 0.32rem; line-height: 1.28rem;text-align: left; font-size: 0.42667rem; color: #707070; background: #f5f5f5}
	.show-area button.cur{color:#00d2c3;background: #fff;}
	.unit-list{padding:0;}
	.unit-list li{float:left;width: 100%;}
	.unit-list li a{display: block; padding:0.26667rem 0.4rem;}
	.unit-list li cite.max{max-width: 80%;}
	.unit-list li em{padding:0 0.13333rem;border-radius:0.05333rem;line-height: 0.48rem; font-size: 0.32rem;color:#fff;}
	.bgFFB753{background: #FFB753;}
	.bgffcb00{background: #ffcb00;}
	.show-area,.unit-list{overflow-y: scroll;}
    .beforeloadimg{width:2.66667rem;}
    .beforeloadimg img{width:0.53333rem;}
</style>