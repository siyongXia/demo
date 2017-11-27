<template>
    <div class=" pl20 pr20 mb26 relative">
        <router-link :to="linkUrl" class="flex typo_gray relative">
             <img class="w_60_60 mr15" :src="infos.thumb" alt="">
             <!-- <img src="./images/prize.png" height="54" width="54" alt="" class="prize" v-if="infos.activity_id > 0"> -->
            <div class="flex-item lh20 overthree">
                <div class=" c_333 fs14 mb2 w180 elli"><i class="inblo prize fs12 " v-if="infos.activity_id > 0">奖</i> {{infos.title}}</div>
                <div class="typo_gray fs12 w180 elli">{{ infos.description}}</div>
                <div class="progress typo_gray " v-if="state === 1">
                    <span :style="{width: (parseInt( infos.complete_num )  ) / parseInt(infos.total) * 100 + '%'}" class="inblo"></span>
                    <div class=" fs14 lh18 progress_number inblo w40" ><i :class="infos.complete_num == 0 ?'':  'typo_green'">{{ infos.complete_num}}</i>/{{infos.total}}</div>
                </div>
            </div>
        </router-link>       
        <router-link :to="linkUrl" class="btn btn_gray" v-if="infos.completed==1">已打卡</router-link>
        <router-link :to="'taskdetail.html?task_id='+ (infos.id || infos.mission_id) " class="btn btn_green" v-if="infos.completed==0">去打卡</router-link>
        <router-link to="taskdetail.html" class="btn btn_green" v-if="state==2">已完成</router-link>
        <button  class="btn btn_green add pad0" v-if="state==4" @click.stop="addTask(infos.id)">添加</button>
        <button  class="btn btn_blue addagin pad0" v-if="state==6" @click.stop="addTask(infos.id)">再添加</button>
        <router-link :to="'tasklist.html?task_id='+(this.infos.id || this.infos.mission_id)" class="btn btn_green added pad0" v-if="state==5">已添加</router-link>
    </div>
</template>

<script>
    import * as api from './api/api.js';
    import {Toast} from 'mint-ui';
    export default {
        data(){
            return {
                // state:1
                task_id:''
            }
        },
        computed:{
            linkUrl(){
                var isAdd = this.infos.every_title || this.infos.is_add ? 1 :0;
                this.task_id = this.infos.id || this.infos.mission_id
                return 'tasklist.html?task_id=' +  this.task_id 
            }
        },
        methods:{
            addTask(task_id){
               api.addTask({task_id},(data)=>{
                    if(data.state > 0) {
                         Toast({
                            message: data.msg,
                            position: 'middle',
                            duration: 1000,
                            className: 'c_white'
                        }); 
                        setTimeout(()=>{
                            this.$router.push({path:'tasklist.html',query:{task_id:this.task_id}});
                        },1000) 
                        // this.$parent.getTaskList();                              
                    }
                   
               },(error)=>{
                console.log(error);
               })
            }
        },
        mounted(){
            // this.state = this.type;
        },
        props:['infos','state']
    }
</script>

<style scoped lang = 'scss'>  
    .prize {
        width: 0.48rem;
        height: 0.48rem;
        line-height: 0.48rem;
        text-align: center;
        background: #FEA557;
        border-radius: 0.05333rem;
        color: #fff;
    }
    .w40 {
        width: 1.06667rem;
    }
    .c_333 {
        color: #333;
    }  
    .mr15 {
        margin-right: 0.4rem;
    }
    .pad0 {
        padding: 0 !important;
    }
    .w180 {
        width: 4.8rem;
    }
    .w_60_60 {
        width: 1.6rem;
        height: 1.6rem;
    }

    .mb2 {
        margin-bottom: .053333rem;
    }

    .mb26 {
        margin-bottom: .693333rem; 
    }

    .btn {
        height: 0.8rem;
        line-height: 0.74667rem;
        border-radius: .8rem;
        padding: 0 0.32rem;
        position: absolute;
        right: 0.53333rem;
        top: 0;
        font-size: 0.37333rem;  
        /*box-sizing: content-box;*/
    }
    .btn.add {
        width: 1.73333rem;
        text-align: center;
        background-color: #00D2C3;
        color:#fff;
    }
    .btn.addagin{
        width: 1.73333rem;
        text-align: center;
        color:#fff;
    }
    .btn.added {
        width: 1.73333rem;
        text-align: center;
        background-color: #FFF;
        border: 1px solid #E9E9E9;
        color: #bebebe;
    }

    .btn_green {
        color: #00D2C3;
        border: 1px solid #00D2C3;
    }
    .btn_blue {
        background-color: #33B2EF; 
        border: 1px solid #33B2EF;
    }

    .btn_green_fill {
        color: #FFF;
        background-color: #00D2C3;
    }

    .btn_gray {
        color: #BEBEBE;
        border: 1px solid #BEBEBE;
    }
    .progress_number {
        position: absolute;
        top: -0.21333rem;
        left: 130%;
        transform: translateX(-50%);
    }
    .progress {
        width: 2.66667rem;
        height: 0.16rem;
        background-color: #f5f5f5;
        border-radius: 0.16rem;
        margin-top:0.26667rem;
        margin-bottom: 0.13333rem;
        position: relative;
        span {
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            border-radius: 0.16rem;
            background-color: #00d2c3;
        }
    }
</style>