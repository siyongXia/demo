<template>
    <div class="docinfo layout p15 mb10 bg_white fs14" @click="loadDocHomepage(doclist.unit_id,doclist.dep_id,doclist.doctor_id)">
        <img class="avatar inblo" :src="doclist.image" :onerror="nothumb">
        <div class="rgtbox fs14 typo_gray">
            <div class="c2a2a2a fs18 docname-level">
                <span class="inblo docname elli">{{doclist.doctor_name}}</span>
                <span class="c848484 fs16 inblo zcname elli">{{doclist.zcname}}</span>
            </div>
            <div class="mt2 lh18 overtwo" v-if="doclist.stay_unit">坐诊医院：{{doclist.stay_unit}}</div>
            <div class="mt2 elli deplist lh22">
                <i>{{doclist.prev_work_unit?'曾就职于'+doclist.prev_work_unit:doclist.first_practice}}</i> 
                <span class="typo_grey" v-if="doclist.dep_name">[{{doclist.dep_name}}]</span>
            </div> 
            <div class="lh18 elli layout">
                擅长：{{doclist.expert ? doclist.expert:'暂无介绍'}} 
            </div>
            <div class="lh18 fs14">
                <template v-if="doclist.comment_score">评分 <i class="typo_lorange">{{doclist.comment_score}}</i>&nbsp;&nbsp;</template>
                <template v-if="doclist.register_total">预约量 <i class="typo_lorange">{{doclist.register_total >9999 ? Math.trunc(doclist.register_total/ 1000) / 10 + '万' : doclist.register_total}}</i>&nbsp;&nbsp;</template>
                <template v-if="doclist.ask_total">咨询量 <i class="typo_lorange">{{doclist.ask_total}}</i></template>
            </div>
            <div class="fs12 openservices-i mt4">
                <i v-for="support_service in doclist.support_service">{{support_service}}</i>
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
.expertbox{max-height: 1.54669rem; overflow: hidden;}
.docinfo {}

.avatar { float:left; width:1.06667rem; height:1.06667rem; margin-right: 0.26667rem; vertical-align: top; }
.rgtbox{float: left; width: 7.8rem;}
.docname-level{height:0.53333rem; line-height:0.53333rem;}
.deplist i{ line-height: 0.48rem; padding:0 0.13333rem;border-radius: 0.05333rem; font-size: 0.32rem;color: #fff;background: #ffb753;}
.docname{max-width:4.26667rem; }
.disname { float: left; height: 0.53333rem; line-height:0.48rem; padding: 0 0.16rem; border:1px solid #9B9B9B; border-radius: 0.106666667rem; margin: 0 0.26667rem 0.05333rem 0; font-size: 0.32rem; }  

.w-75{width: 75%}
.bg_f5{background: #f5f5f5;}
.bg_e8{background: #e8e8e8;}
.yuyue-btn{width:1.97333rem;height:0.82667rem; margin-top:0.05333rem; line-height:0.82667rem; border-radius: 1.06667rem;}
.service-hospital{}
.service-hospital li{float:left;display:block;width:100%;padding:0.34667rem 0; list-style-type: none;}
.openservices-i i{ display: inline-block;float: left;margin:0 0.26667rem 0 0;padding:0.05333rem 0.13333rem; border:solid 1px #33b2ef; border-radius: 0.05333rem; line-height:0.37333rem; text-align: center; color: #33b2ef; background:#fff;}
</style>

