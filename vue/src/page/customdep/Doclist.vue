<template>
    <div class="docinfo layout" @click="loadDocHomepage(doclist.unit_id,doclist.dep_id,doclist.doctor_id)">
        <div class="docinfobor layout">
            <div class="layout" style="padding:0.4rem;border-left: 1px solid #C39664;border-right: 1px solid #C39664;">
                <div class="rgtbox fs14 cl_927150">
                    <div class="firstd elli">{{doclist.first_practice}}</div>
                    <div class="fs12 lh16 overtwo" v-if="doclist.stay_unit">坐诊医院：{{doclist.stay_unit}}</div>
                    <div class=" fs12">
                        评分 <i class="typo_lorange">{{doclist.comment_score}}</i>&nbsp;|&nbsp;
                        预约量 <i class="typo_lorange">{{doclist.register_total}}</i>&nbsp;|&nbsp;
                        咨询量 <i class="typo_lorange">{{doclist.ask_total}}</i>
                    </div>
                    <div class="fs12 elli layout">
                        擅长：{{doclist.expert ? doclist.expert:'暂无介绍'}} 
                    </div>
                    <div class="fs12 openservices-i mt3">
                        <i v-for="support_service in doclist.support_service">{{support_service}}</i>
                    </div>
                </div>
                <div class="avatar">
                    <img class=" inblo" :src="doclist.image" :onerror="nothumb">
                    <span class="block docname elli">{{doclist.doctor_name}}</span>
                    <span class="block zcname elli">{{doclist.zcname}}</span>
                </div>
            </div>
        </div>
    </div>
</template>  

<script>
export default {
    data:function(){
        return {
            nothumb:'this.src="' + require('../../static/avatar.jpg') + '"'  
        }
    },
    props: ['doclist'],
    methods: {
        loadDocHomepage: function (unit_id,dep_id,doctor_id) {
            // var map = { 'full': 0, 'order': 0, 'add': 1, 'askdoc': 2, 'private': 3 };
            this.gaStaticClick('中医-医生ID-'+doctor_id);

            if ((typeof (mJavaScriptObject) == 'object')) {                
                mJavaScriptObject.funGotoDocHomepageActivity(unit_id,dep_id,doctor_id,2);
            } else {
                window.location.href = "/doctor/detail.html?unit_id="+unit_id+"&dep_id="+dep_id+"&doc_id="+doctor_id+"&type=askdoc";
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
.firstd{ display:inline-block;max-width: 100%; padding:0 0.13333rem; border-radius: 2px;font-size: 0.34667rem;color:#fff;background: #C5A178; }
.expertbox{max-height: 1.54669rem; overflow: hidden;}
.docinfo {  width:9.46667rem; background:#FFFCF8 url(images/docbot.gif) no-repeat bottom; background-size: contain;}
.docinfobor{float:left; width:9.46667rem; padding:0; background:url(images/doctop.gif) no-repeat top; background-size: contain;}


.avatar {display: inline-block; float:left; width:1.6rem;/*margin:0.4rem 0.26667rem 0.4rem 0.4rem;*/ text-align: center; }
.avatar img{ display: block; width:1.33333rem; height:1.33333rem; margin:0 0.13333rem; border-radius: 100%; vertical-align: top;}
.rgtbox{float: right; width:6.5rem;}

.cl_927150{color:#927150;}
.docname{font-size: 0.48rem; color: #927150; }
.zcname{font-size: 0.32rem; color: #927150;}
.disname { float: left; height: 0.53333rem; line-height:0.48rem; padding: 0 0.16rem; border:1px solid #9B9B9B; border-radius: 0.106666667rem; margin: 0 0.26667rem 0.05333rem 0; font-size: 0.32rem; }  

.w-75{width: 75%}
.bg_f5{background: #f5f5f5;}
.bg_e8{background: #e8e8e8;}
.yuyue-btn{width:1.97333rem;height:0.82667rem; margin-top:0.05333rem; line-height:0.82667rem; border-radius: 1.06667rem;}
.service-hospital{}
.service-hospital li{float:left;display:block;width:100%;padding:0.34667rem 0; list-style-type: none;}
.openservices-i i{ display: inline-block;float: left; width: 0.96rem;height: 0.53333rem; margin:0 0.26667rem 0.13333rem 0;border:solid 1px #C39664;border-radius: 0.05333rem; line-height: 0.53333rem; text-align: center; font-size:0.32rem; color: #927150; background:none;}
</style>

