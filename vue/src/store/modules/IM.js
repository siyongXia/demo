import { IM } from '../mutation-types'
import axios from 'axios'
const state = {
    doctor:{
        avatar:'http://static.91160.com/wechat/img/common/doctor_man.jpg'
    },//医生信息
    ask:'',//咨询信息
    gift:'',//送心意信息
    client_id:'',
    broker:{},
    user:{
        avatar:'http://static.91160.com/wechat/img/common/avatar_user_0.jpg'
    },
    isFunctionBoxShow:false,
    isMaskBoxShow:false,
    replyCount:3,//剩余可回复次数
    leftHour:0,//剩余有效时间
    hideInput:false//是否隐藏输入框
}

const actions = {
    showFuncBox:({commit})=>{
        commit(IM.FUNCBOX_SHOW);
    },
    hideFuncBox:({commit})=>{
        commit(IM.FUNCBOX_HIDE);
    },
    setReplyCount:({commit},num)=>{
        commit(IM.SETREPLYCOUNT,num);
    },
    changeReplyCount:({commit})=>{
        commit(IM.CHANGEREPLYCOUNT);
    },
    setLeftHour:({commit},end)=>{
        let date = end.split(' ')[0].split('-'),
            time = end.split(' ')[1].split(':');
        let month = date[1] > 1 ? date[1] -1 : date[1];
        let endTime = new Date(date[0],month,date[2],time[0],time[1],time[2]).getTime(),
            now = new Date();
        let leftHour =Math.ceil(endTime - now);
        commit(IM.LEFTHOUR,leftHour);
    },
    hideInputBox:({commit})=>{
        commit(IM.HIDEINPUTBOX);
    },
    getToken:({commit},cb)=>{       
        axios.get('/talk/node.html')
        .then((res)=>{
            if(res.data.status == 200) {
                commit(IM.GETTOKEN,res.data.data);
                cb && cb();
            }
        })       
    },
    getLeftNum:({commit},params)=>{
        axios.get('/talk/leftNum.html',{params:params})
        .then((res)=>{
            if(res.data.status == 200) {
                commit(IM.GET_LEFTNUM,res.data.data.residue);
            }
        })   
    },
    getVisitInfo:({commit},business_id)=>{
        console.log(business_id);
        return new Promise(function(resolve, reject){
            axios.get('/talk/visit.html',{params:{id:business_id}})
            .then((res)=>{
                if(res.data.status == 200) {
                    commit(IM.GET_VISITINFO,res.data.data);
                    resolve(res.data.data)
                }
            })   
        })
        
    }
}

const mutations = {
    [IM.GETTOKEN] (state,data){
       state.client_id = data.client_id;
       state.broker = data.broker;
       state.user = data.user;
       
    },
    [IM.FUNCBOX_SHOW] (state) {
        state.isFunctionBoxShow = true;
    },
    [IM.FUNCBOX_HIDE] (state) {
        state.isFunctionBoxShow = false;
        state.isMaskBoxShow = false;
    },
    [IM.SETREPLYCOUNT] (state,num) {
    	state.replyCount = parseInt( num );
    },
    [IM.CHANGEREPLYCOUNT] (state) {
        state.replyCount--;
    },
    [IM.LEFTHOUR] (state,leftHour) {
       state.leftHour = leftHour;
    },
    [IM.HIDEINPUTBOX] (state){
        state.hideInput = true;
        state.isFunctionBoxShow =true;
    },
    [IM.SHOWINPUTBOX] (state){
        state.hideInput = false;
        state.isFunctionBoxShow =false;
    },
    [IM.GET_LEFTNUM] (state,replyCount) {
        state.replyCount = replyCount;
    },
    [IM.MASKBOX_SHOW] (state) {
        state.isMaskBoxShow = true;
    },
    [IM.GET_VISITINFO] (state,visitInfo) {
        state.doctor = visitInfo.doctor;
        state.ask = visitInfo.ask;
        state.gift = visitInfo.gift;
    }
}

const getters = {
    isFunctionBoxShow(state){
    	return state.isFunctionBoxShow;
    },
    replyCount(state){
        return state.replyCount;
    },
    leftHour(state) {
        return state.leftHour;
    },
    hideInput(state) {
        return state.hideInput;
    },
    client_id(state){
        return state.client_id;
    },
    broker(state){
        return state.broker;
    },
    user(state){
        return state.user;
    },
    isMaskBoxShow(state){
        return state.isMaskBoxShow;
    },
    user_id(state){
        return state.user.user_id;
    },
    ask () {
         return state.ask;
    },
    doctor (state) {
        return state.doctor;

    },
    gift (state) {
        return state.gift;
    },
    doctor_id(state){
        return state.doctor.user_id;
    },
    business_type(state){//业务类型
         return state.ask.ask_class;
    },
    sessionId (state) {
        var user_id = state.user.user_id,
            doctor_id = state.doctor.user_id,
            sessionId = '';
        sessionId = Number(user_id) >Number( doctor_id) ? `${doctor_id}_${user_id}` : `${user_id}_${doctor_id}`
        return sessionId;
    }
}


export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}
