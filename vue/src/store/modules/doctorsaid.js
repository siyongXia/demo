import * as types from '../mutation-types'
import axios from 'axios'
const state = {
    wxShareOption:{}
}

const actions = {
    // COMMON_LOADING_SHOW :({commit})=>{
    //     commit(types.COMMON_LOADING_SHOW);
    // }
    DOCTORSAID_WXSHARE:({commit},options)=>{
        commit(types.DOCTORSAID_WXSHARE,options);
    }
}
const getters = {
    options(state){
        return state.wxShareOption;
    }
}

const mutations = {
    [types.DOCTORSAID_WXSHARE] (state,options) {
    	console.log(options)
       state.wxShareOption = options;
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}
