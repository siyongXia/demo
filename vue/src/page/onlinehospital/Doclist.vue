<template>
    <div>
        <div class="docinfo" >
            <div @click="loadDocHomepage(doclist.unit_id,doclist.dep_id,doclist.doctor_id,2)">
                <img class="fleft avatar inblo" :src="doclist.image" :onerror="nothumb">
                <div class="fleft inblo fullheight fs14 typo_gray ml10 centerinfo">
                    <div class="c2a2a2a fs18 docname-level elli">
                        <span class="inblo">{{doclist.doctor_name}}</span>
                        <span class="c848484 fs16 inblo">{{doclist.doc_level_name}}</span>
                    </div>
                    <div class="elli deplist">
                        <template v-for="(dep_list,index) in doclist.dep_list">
                            <span v-if="index>0">、{{dep_list.dep_name}}</span>
                            <span v-else>{{dep_list.dep_name}}</span>
                        </template>
                    </div>  
                    <div class="fs12">
                        咨询量
                        <span class="ml5 mr15 typo_red">{{doclist.ask_num}}</span>
                        评分
                        <span class="ml5 typo_red">{{doclist.overall_score}}</span>
                    </div>
                </div>
            </div>
            <div class="fright rgtbtns">
                <span class="bg_33b typo_white fs12 onlineask inblo textc" @click="loadDocHomepage(doclist.unit_id,doclist.dep_id,doclist.doctor_id,2)">在线问诊</span>
                <span class="mt15 bg_green typo_white fs12 onlineask inblo textc" @click="loadDocHomepage(doclist.unit_id,doclist.dep_id,doclist.doctor_id,0)">预约挂号</span>
            </div>
        </div>
        <div class="mt10 typo_dgrey fs12" @click="loadDocHomepage(doclist.unit_id,doclist.dep_id,doclist.doctor_id,2)">
            <span class="inblo fs14 c333 disname-label" :style="doclist.disease_list.length ? 'vertical-align:top;' : ''">擅长：</span>
            <div class="inblo disname-wrap" v-if="doclist.disease_list.length">
                <span class="inblo disname" v-for="disease_list in doclist.disease_list">{{disease_list.ill_name}}</span>
            </div>
            <span v-else-if="doclist.expert">{{doclist.expert}}</span>  
            <span v-else>暂无介绍</span>
        </div>
        <div class="mt10 typo_dgray">执业点：</div>
        <div class="mt10 typo_dgray fs15 elli" v-for="unit_list in doclist.unit_list" @click="loadUnitHomepage(unit_list.unit_id)">
            <img class="unitlogo inblo" :src="unit_list.image">
            <span class="ml10">{{unit_list.unit_name}}</span>  
        </div>
    </div>
</template>  

<script>
export default {
    data:function(){
        return {
             nothumb:'this.src="' + require('./images/avatar.jpg') + '"'  
        }
    },
    props: ['doclist'],
    methods: {
        loadDocHomepage: function (unit_id,dep_id,doctor_id,type) {
            // var map = { 'full': 0, 'order': 0, 'add': 1, 'askdoc': 2, 'private': 3 };
            this.gaStaticClick('云杉网上医院在线问诊-医生ID-'+doctor_id);

            if ((typeof (mJavaScriptObject) == 'object')) {                
                mJavaScriptObject.funGotoDocHomepageActivity(unit_id,dep_id,doctor_id,type);
            } else {
                var urltype = (type==0)?'full':'askdoc';
                window.location.href = "/doctor/detail.html?unit_id="+unit_id+"&dep_id="+dep_id+"&doc_id="+doctor_id+"&type="+urltype;
            }            
        },
        loadUnitHomepage:function(unit_id){
            if ((typeof (mJavaScriptObject) == 'object')) {                
                mJavaScriptObject.funGotoHospitalHomePage(unit_id,'','')
            } else {
                window.location.href = '/unit/dep.html?unit_id='+unit_id;
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
.disname-wrap{
    width:7.733333333rem;
}
.docinfo {  
    height: 1.866666667rem;
    line-height: 0.666666667rem;
}

.avatar {
    width: 1.866666667rem;
    height: 1.866666667rem;
    vertical-align: top;
}

.onlineask {
    width: 2.133333333rem;
    height: 0.64rem;
    border-radius: 0.853333333rem;
}
.docname-level{
    height:0.666666667rem;
    line-height:0.666666667rem;
    width:100%;
}
.deplist{
    width:100%;
}
.disname {
    height: 0.586666667rem;
    line-height: 0.533333333rem;
    padding: 0 0.16rem;   
    border: 1px solid #9B9B9B;
    border-radius: 0.106666667rem;
    margin: 0 0.266666667rem 0.266666667rem 0;   
}

.unitlogo {
    width: 1.04rem;
    height: 1.04rem;
    vertical-align: text-bottom;
}


.rgtbtns{width: 2.13333rem;}
.centerinfo{width: 4.53333rem}
.bg_33b{background: #33b2ef;}
</style>

