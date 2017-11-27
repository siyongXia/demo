<template>
    <div class="networkBox">
        <div class="fixed topnav bg_798f plr15 fullwidth fs16 typo_white">
            <router-link class="inblo dep typo_white" :to="'deplist.html?unit_id='+unit_id">
                <span class="inblo fl elli" style="max-width:1.813333333rem">{{filterDepName}}</span>
                <i class="inblo iconfont ml5">{{isDepShow ? '&#xe626' : '&#xe625'}}</i>
            </router-link>
            <router-link :to="'search.html?unit_id='+unit_id">
                <div class="search fs14 bg_white inblo typo_gray">
                    <i class="iconfont inblo ml10">&#xe609;</i>
                    <div class="insearch inblo" @click="gaSend('在线问诊-搜索')">输入医生名字在线问诊</div>
                </div>
            </router-link>
        </div>
        <div class="layout">
            <img :src="indexbanner" class="fleft w-100">
        </div>
        <div class="bg_white pt5 pb5 pl10 pr10 layout">
            <img :src="antis" class="fl" style="width:0.96rem;">
            <div class="fright pt5 lh20" style="width:8.26667rem">
                <marquee direction="left" scrollamount="5">温馨提示：网上医院暂不支持医疗报销，如需报销请前往医院就诊</marquee>
            </div>
        </div>
        <menu-title :links="recomdep+'?unit_id='+unit_id" :text="'全部科室'">推荐科室</menu-title>
        <div class="typelist pagn pt10 pb10 layout bg_white">
            <span v-for="(dep_list,index) in re_dep.slice(0, 8)">
                <router-link :to="'doclist.html?unit_id='+dep_list.unit_id+'&dep_id='+dep_list.dep_id">{{dep_list.dep_name}}</router-link>
            </span>
        </div>
        <menu-title :links="'doclist.html?unit_id='+unit_id" :text="'全部医生'">推荐医生</menu-title>

        <div class="bg_white">
            <div class="bg_white layout clearfix">
                <div class="tabtitle" @click='tabToggle($event);'>
                    <a  v-bind="{id:redoc.dep_id}" v-for="(redoc,index) in re_doc" :class="{ 'cur' : selectedep == redoc.dep_id}">
                    {{redoc.dep_name}}
                    </a>
                </div>        
            </div>
            <div class="fullwidth bg_white pb15 layout">
                <div class="pagn an-disease-doctor" v-for="(redoc,index) in re_doc" :class="{ 'hide' :selectedep != redoc.dep_id }">
                    <div class="doclist textc layout" @click="loadDocHomepage(subdoc.unit_id,subdoc.dep_id,subdoc.doctor_id)" v-for="(subdoc,index) in redoc.docList">
                        <span class="docimg backgroundimg" :style="{backgroundImage:'url('+subdoc.image+'),url('+noimg+')'}"></span>
                        <span class="fleft fullwidth lh20 typo_middle typo_black elli">{{subdoc.doctor_name}}</span>
                        <span class="fleft fullwidth lh18 typo_smaller typo_dgrey elli">{{subdoc.zc_name}}</span>
                        <span class="inquiryprice mt5">
                            问诊价<br>
                            <i>{{subdoc.net_price}}元</i>
                        </span>
                    </div>
                </div>
            </div> 
            <router-link :to="'deplist.html?unit_id='+unit_id" class="block pt10 pb10 textc typo_small typo_gray">查看更多科室<i class="iconfont typo_smaller">&#xe6ed;</i></router-link>
        </div>
        <a class="fleft fullwidth mt10 pt15 pb15 bg_white textc lh28 typo_middle c333" href="tel:400-1191-160">
            投诉热线：400-1191-160
        </a>
    </div>
</template>
<script>
var ret = '';
var shareimg,sharetitle,description,timeLineTitle,timeLineDetails,timeLineImg,shareurl; 
import Vue from 'vue' 
import $ from 'jquery' 
import MenuTitle from './Menu.vue'
import { Toast,ToastPlugin } from 'vux'
import {WxOath,getAppToken,wxShare} from '../../utils/util.js'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
Vue.use(ToastPlugin)
export default {
    data: function () {  
        return {
            selectedep:'',
            indexbanner:require('./images/indexbanner.jpg'),
            antis:require('./images/antis.png'),
            noimg:require('../../static/avatar.jpg'), 
            unit_id:'',
            recomdep:'deplist.html',
            isBannerShow: 1,//是否显示banner图和指导
            isDepShow: 0,//是否显示科室分类
            isNoData:false,
            filterDepName: '全部科室',  
            filterDepId:'',
            doctorList: [],//医生列表 
            isAllowScroll: 0,
            cid:'',
            banner_ad_list:[],
            text_ad_list:[],
            fc_bg_img:[],
            js_app_login_token: '',
            tur:true,
            page_count:'',
            catedepShow:false,
            re_dep:[],  
            re_doc:[],
            defaultimg:require('./images/ad001.jpg'),
        }
    },
    components: {
        MenuTitle, Toast,
    },
    mounted: function () {
        this.recomcategorylist();
        window.getNyAppShareParam = this.getNyAppShare;
        var metas = document.getElementsByTagName("meta"); 
        document.title = '深圳市宝安中医院（集团）-网上医院';
        
    },
    methods:{
        tabToggle:function(e){
            this.selectedep = e.target.id;
        },
        recomcategorylist:function(){   
            var that = this;
            var code = typeof(this.$route.query.code) != 'undefined' ? this.$route.query.code : 0;
            var cid = this.$route.query.cid;
            that.unit_id = this.$route.query.unit_id;
            that.js_app_login_token = getAppToken(cid); 
            this.$http({                
                method:'get',
                url: '/networkhospital/unitIndex.html?unit_id='+that.unit_id+'&code='+code
            }).then(                                        
                function(res){
                    if(res.data.state==1){
                        Vue.nextTick(function(){
                            that.re_dep = res.data.data.re_dep;
                            that.re_doc = res.data.data.re_doc;
                            if(that.re_doc.length>0){
                                that.selectedep = that.re_doc[0].dep_id;
                            }

                            sharetitle = '深圳市宝安中医院网上医院';
                            description = '足不出户、网上问诊；在线开处方，药品送到家';
                            shareimg ='https://static.91160.com/wechat/img/common/logo.jpg'; 
                            var wxShareOptions={
                                timeLine: {                                 
                                    title: sharetitle,
                                    link: '',
                                    imgUrl: shareimg,
                                },
                                appMessage: {
                                    title: sharetitle,
                                    desc: description, // 分享描述
                                    link: '',
                                    imgUrl:shareimg,
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
                        });
                    }else{
                        that.$vux.toast.text(res.data.msg,'middle');
                    }
                }
            )               
        },
        getNyAppShare:function(){//app分享获取参数
            var that = this;
            var cid = this.$route.query.cid;        
            var code = this.$route.query.code;  
            var data_v ={
                title:sharetitle,
                details:description,
                img:shareimg,
                timeLineTitle:sharetitle,
                timeLineDetails:description,
                timeLineImg:shareimg,
                shareurl:encodeURIComponent('https://weixin.91160.com/vue/network/index.html?unit_id='+that.unit_id)
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
        loadDocHomepage: function (unit_id,dep_id,doctor_id) {
            // var map = { 'full': 0, 'order': 0, 'add': 1, 'askdoc': 2, 'private': 3 };
            this.gaStaticClick('网络医院-医生ID-'+doctor_id);

            if ((typeof (mJavaScriptObject) == 'object')) {                
                mJavaScriptObject.funGotoDocHomepageActivity(unit_id, dep_id, doctor_id, 0);
            } else {
                window.location.href = "/doctor/detail.html?unit_id="+unit_id+"&dep_id="+dep_id+"&doc_id="+doctor_id+"&type=full";;
            }            
        }, 
        gaStaticClick: function (msg) {
            var msg = msg || '';
            ga('send', 'event', msg, '点击');  
        },  
    }
    
}
</script>

<style scoped>
.bg_00c1ae {background-color: #00c1ae; }
.c-00c1ae {color: #00c1ae; }
.bg_ffb753{background-color:#ffb753;}
.bg_798f{background-image:-webkit-linear-gradient(left, #77A2FF, #7991ff); background-image:linear-gradient(left,#77A2FF,#7991ff);}
.typo_white{color:#fff;}
.w-90{width:90%;}
.networkBox {padding-top:1.22667rem; }
.topnav {top: 0; left: 0; z-index: 101; height: 1.28rem; line-height: 1.28rem; }
.dep {width: 2.4rem; }
.search {width: 6.453333rem; height: 0.746667rem; line-height: 0.746667rem; border-radius: 2.666667rem }
.banner {height: 4.533333rem; }
.depall {top: 1.28rem; left: 0; z-index: 101; padding-top: 0.133333333rem; }
.depname {height: 0.8rem; line-height: 0.746666667rem; padding: 0 0.266666667rem; border: 0.026666667rem solid #00c1ae; border-radius: 2.666666667rem; }


.typelist span{display: inline-block; margin: 0.16rem 0.186667rem 0.16rem 0;padding:0.133333rem 0.213333rem;border-radius:0.533333rem;line-height:0.48rem;border: 1px solid rgba(0,211,194,0.10);color: #00d3c2;background: rgba(0,211,194,0.04); }
.typelist span a{color: #00d3c2;}

/*热门医生*/
.tabtitle{width: 100%; padding:0.266667rem 0; white-space: nowrap; overflow-x: scroll; }
.tabtitle a{ display:inline-block; padding:0.266667rem 0.4rem; font-size: 0.4rem; color: #9b9b9b;}
.tabtitle a.cur{color: #00d2c3}
.tabtitle a:first-child{padding:0.266667rem 0.4rem 0.266667rem 0.8rem;}
.docimg{display: inline-block; width: 1.6rem;height: 1.6rem;border-radius: 100%;}
.doclist{float:left; display: inline-block; width: 1.6rem; margin:0 0.32rem;}
.inquiryprice{ display: inline-block;width:100%;padding:0.08rem 0; border-radius: 0.10667rem; font-size: 0.32rem; color:#fff; background: #FFB937;}
.inquiryprice i{ line-height:0.53333rem; font-size: 0.4rem;}


</style>