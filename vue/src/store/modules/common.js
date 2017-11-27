import * as types from '../mutation-types'
import axios from 'axios'
const state = {
    isLoading: false,
    isLogin: 0,
    isNavigateBarShow:true,
    cityName:'',
    commonIsApp:false,
}

const actions = {
    COMMON_LOADING_SHOW: ({ commit }) => {
        commit(types.COMMON_LOADING_SHOW);
    },
    COMMON_LOADING_HIDE: ({ commit }) => {
        commit(types.COMMON_LOADING_HIDE);
    },
    isLogin: ({ commit }) => {
        axios.get('/user/islogined.html')
            .then((response) => {
                var status = response.data.status;
                if (status) {
                    commit(types.IS_LOGIN, status);
                }
            })
    },
}
const getters = {
    isLoading(state) {
        return state.isLoading;
    },
    isNavigateBarShow(){
        return state.isNavigateBarShow;
    },
    commonIsApp () {
        return state.commonIsApp;
    },
}
const mutations = {
    [types.COMMON_LOADING_SHOW](state) {
        state.isLoading = true;
    },
    [types.COMMON_LOADING_HIDE](state) {
        state.isLoading = false;
    },
    [types.IS_LOGIN](state, status) {
        state.isLogin = status;
    },
    [types.HIDENAVIGATEBAR] (state) {
        state.isNavigateBarShow = false;
    },
    [types.ISAPP] (state) {
        state.commonIsApp = true;
    }
}


export default {
    state,
    actions,
    getters,
    mutations
}