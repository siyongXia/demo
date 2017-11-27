<template>
    <div :class="{'networkBox':isApp==false}">
        <head-nav v-if="isApp==false">按科室找医生</head-nav>
        <div class="onelist" @click='tabToggle($event);'>
            <a v-for="(one,index) in categoryList" :class="{'cur':cat_no == one.cat_no}" v-bind="{id:one.cat_no}">{{one.cat_name}}</a>
        </div>
        <div class="second">
            <div v-for="(second,index) in categoryList" :class="{ 'hide' :cat_no != second.cat_no }">
                <span v-for="(subsecond,index) in second.dep"><router-link :to="'doclist.html?unit_id='+unit_id+'&dep_id='+subsecond.dep_id">{{subsecond.dep_name}}</router-link></span>
            </div>
        </div>
    </div>
</template>
<script>
var ret = '';
var shareimg,sharetitle,description,timeLineTitle,timeLineDetails,timeLineImg,shareurl; 
shareimg ='https://static.91160.com/wechat/img/common/logo.jpg'; 

import Vue from 'vue' 
import $ from 'jquery' 
import HeadNav from '../../components/common/Head.vue'
import {getUrlParam,WxOath,getDomain,getAppToken,wxShare} from '../../utils/util.js'
import { Toast,ToastPlugin } from 'vux'
Vue.use(ToastPlugin)
export default {
    data: function () {  
        return {
            isApp:false,
            unit_id:'',
            cat_no:'',
            categoryList:[],

        }
    },
    components: {
        HeadNav
    },
    // watch:{
    //     $route(to){
    //         $(window).scrollTop(0);
    //         var that = this;
    //         var rout_id = parseInt(this.$route.query.fc_id);
    //         if(rout_id>0){
    //             that.alldepShow = false;
    //         }else{
    //             that.alldepShow = true;
    //         }
    //         this.doctorList=[];
    //         this.banner_ad_list=[];
    //         this.text_ad_list=[];
    //         this.fc_bg_img=[];
    //         this.catedepShow=false;
    //         this.alldepShow=false;
    //         if(this.categoryList.length<1){
    //             this.categorylist();
    //         }else{
    //             this.getDepId();
    //         }
    //     }
    // },
    mounted: function () {
        $(window).scrollTop(0);
        this.categorylist();
        $(".onelist,.second").css({'height':$(window).height()})
    },
    methods:{  
        tabToggle:function(e){
            this.cat_no = e.target.id;
        },
        categorylist:function(){   
            var that = this;
            var code = typeof(this.$route.query.code) != 'undefined' ? this.$route.query.code : 0;
            var cid = this.$route.query.cid;
            if(cid==20 || cid ==24 || (typeof (mJavaScriptObject) == 'object')){
                that.isApp = true;
            }else{
                that.isApp = false;
            }
            that.unit_id = this.$route.query.unit_id;
            that.js_app_login_token = getAppToken(cid); 
            this.$http({                
                method:'get',
                url: '/networkhospital/getDepList.html?unit_id='+that.unit_id
            }).then(                                        
                function(res){
                    if(res.data.state==1){
                        Vue.nextTick(function(){
                            that.categoryList = res.data.data;
                            that.cat_no = that.categoryList[0].cat_no;
                        });
                    }else{
                        that.$vux.toast.text(res.data.msg,'middle');
                    }
                }
            )               
        }
    }
    
}
</script>

<style scoped>
.networkBox{padding-top: 1.173333rem}
.onelist{float:left;width: 40%;height: 100%;}
.onelist a.cur{color: #00d3c2; background: #fff;}
.second{float:left; width: 60%;height: 100%; background: #fff;}
.onelist a,.second span{display:block;padding:0 0.8rem; line-height:1.33333rem; font-size: 0.4rem; color: #333;}
.second span{padding:0 0.66667rem;color: #333;}
</style>