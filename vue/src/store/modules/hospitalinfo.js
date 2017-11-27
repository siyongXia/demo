import * as types from '../mutation-types'
import axios from 'axios'
const state = {
   focus_state:false,
   unit_id:'',
   bannerImageUrl:'',
   unit_name:''
}

const actions = {
    HOSPITALINFO_FOCUS_STATE:({commit})=>{
        axios.get('/do/isfocus.html')
            .then((response)=>{  
                var data = response.data.state;
                commit(types.HOSPITALINFO_FOCUS_STATE,data);
              })        
    },
    HOSPITALINFO_UNIT_ID:({commit},params)=>{
        commit(types.HOSPITALINFO_UNIT_ID,params)
    },
    HOSPITALINFO_BANNER:({commit},unit_id)=>{
        axios.get('/microsite/unitdetail.html?unit_id='+ unit_id)
            .then((response)=>{  
                var protocol = window.location.protocol,
                     unit_name = response.data.unit_name,
                     bannerImageUrl = protocol+'//images.91160.com/upload/'+response.data.image;
                var params = {
                    unit_name,bannerImageUrl
                };
                commit(types.HOSPITALINFO_BANNER,params)
            })    
    }   

}

const mutations = {
    [types.HOSPITALINFO_FOCUS_STATE] (state,data) {
        state.focus_state = data;
    },
    [types.HOSPITALINFO_UNIT_ID] (state,params) {
        state.unit_id = params;
    },
    [types.HOSPITALINFO_BANNER] (state,params) {
        state.unit_name = params.unit_name;
        state.bannerImageUrl = params.bannerImageUrl;
    }
}

const getters = {    
    unit_id(state){
        return state.unit_id;
    }
}


export default {
    state,
    actions,
    getters,
    mutations
}
