import * as types from '../mutation-types'
import axios from 'axios'
const state = {
   headShow:false,
   footShow:true,
   positionInfoList:[]
}

const actions = {
    // APPLY_HEADER_SHOW:({commit},isShow)=>{
    //     commit(types.APPLY_HEADER_SHOW,isShow);
    // },
    // APPLY_FOOTER_SHOW:({commit},isShow)=>{
    //     commit(types.APPLY_FOOTER_SHOW,isShow);
    // },
    APPLY_INFO_LIST:({commit},params)=>{
        return new Promise((resolve,reject)=>{
            axios.get('/act/joblist.html',params)
                .then((response)=>{  
                    var data = response.data.data;
                    commit(types.APPLY_INFO_LIST,data);
                    resolve(data);
                })
        })
        
    }
}

const mutations = {
    // [types.APPLY_HEADER_SHOW] (state, isShow) {
    //    state.headShow = isShow;
    // },
    // [types.APPLY_FOOTER_SHOW] (state, isShow) {
    //    state.footShow = isShow;
    // },
    [types.APPLY_INFO_LIST] (state,data) {
        state.positionInfoList = data;
    }
}

const getters = {
    headShow(state){
        return state.headShow;
    },
    // footShow(state){
    //     return state.footShow;
    // }
    positionInfoList(state) {
        return state.positionInfoList;
    }
}


export default {
    state,
    actions,
    getters,
    mutations
}
