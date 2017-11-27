import { customize }  from '../mutation-types';
import axios from 'axios'
import { wxShare, getNyAppShare } from '../../utils/util';
const state = {
	unitInfo:{},
    commentList:{},
    banner:'',
    ambient:'',
    todiscount:'',
    ghdep:'',
    basicssrv:'',
    hospitalsrv:'',
    hotdeps:'',
    hotdoctor:'',
    centreimgs:'',
    hotservice:'',
    hotnews:'',
    hpbranch:'',
    notice:{},
    activeDepId:-1,
    ordering:[],
    isVideoIConShow:false
    // selectDepList:[]

}

const actions = {
    getData: ({ commit }, options) => {
		axios.get('/api/unit/index',{params:{ id:options.id, page:options.page, class_id:options.class_id, limit:options.limit,type_id:options.type_id} })
        .then((data)=>{
        	if( data.status == 200 ) {
                var blocks = data.data.data.blocks,
                    items = {};
                for(var k in blocks) {//筛选出不包含api字段(通过其他接口找数据)
                    if(!blocks[k].api) {
                        items[ k ] = blocks[k];
                    }
                }
                let datas = data.data.data;
                if(datas.ordering) {//医院信息
                    items.ordering = datas.ordering.split(',');
                }
                if(datas.unit) {//医院信息
                    items.unit = datas.unit;
                }
                if(datas.notice) {//医院公告
                    items.notice = datas.notice;
                }
                if(blocks.ambientvideo && blocks.ambientvideo == 1) {//首页视频按钮是否显示

                    commit(customize.SHOWVIDEOICON);
                }
        		options.callback(data.data);
        		commit(customize.GETDATA,items);
        	}
        })
        .catch((error)=>{
        	console.log(error);
        })
    },
    getGhDep: ({ commit }, url) => {
        axios.get(url)
        .then((data)=>{
            var ghdep = data.data.data;
            commit(customize.GETGHDEP,ghdep);
        })
        .catch((error)=>{
            console.log(error);
        })
    },
    getHpbranch: ({ commit }, url) => {
        axios.get(url)
        .then((data)=>{
            var hpbranch = data.data.data;
            commit(customize.GETHPBRANCH,hpbranch);
        })
        .catch((error)=>{
            console.log(error);
        })
    },
    // getSectionList: ({ commit }, options) => {
    //     axios.get('/unit/getAjaxDepList.html',{params:options})
    //     .then((data)=>{
    //         // console.log(data);
    //     })
    //     .catch((error)=>{
    //         console.log(error);
    //     })
    // },
    getCommentList: ({ commit }, options) => {
        axios.get('/api/unit/comments',{params:options})
        .then((data)=>{
            if(data.status == 200) {
                commit(customize.GETCOMMENTLIST,data.data.data.items);
            }
        })
        .catch((error)=>{
            console.log(error);
        })
    }    
}
const getters = {
    ordering: (state) => {
        // state.ordering;
        var order = {length:0};
        state.ordering.forEach((item,index)=>{
            order[ item ] = index;
            order.length += 1;
        })
        return order;
    },
    banner: (state) => state.banner,
    ambient: (state) => state.ambient,
    todiscount: (state) => state.todiscount,
    ghdep: (state) => state.ghdep,
    basicssrv: (state) => state.basicssrv,
    hotdeps: (state) => state.hotdeps,
    basicssrv: (state) => state.basicssrv,
    hospitalsrv: (state) => state.hospitalsrv,
    hotdoctor: (state) => state.hotdoctor,
    centreimgs: (state) => state.centreimgs,
    hotservice: (state) => state.hotservice,
    hotnews: (state) => state.hotnews,
    hpbranch: (state) => state.hpbranch,
    unitInfo: (state) => state.unitInfo,
    commentList: (state) => state.commentList,
    notice: (state) => state.notice,
    isVideoIConShow: (state) => state.isVideoIConShow,
    activeDepId: (state) => {
        if( state.activeDepId == -1) {
            for( let k in state.ghdep ) {
                return k;
            }
        }else {
            return state.activeDepId;
        }
        
    },

}

const mutations = {
    [customize.GETDATA]( state, info ) {
    	if(info.unit) {
       		state.unitInfo = info.unit;
    	}
        if(info.notice) {
            state.notice = info.notice;
        }
        if(info.ordering) {
            state.ordering = info.ordering;
        }
    	for(let item in info) {
    		state[ item ] = info[ item ]
    	}
    },
    [customize.GETCOMMENTLIST] ( state, commentList ) {
        state.commentList = commentList;
    },
    [customize.GETGHDEP] ( state, ghdep ) {
        state.ghdep = ghdep;
    },
    [customize.GETHPBRANCH] ( state, hpbranch ) {
        state.hpbranch = hpbranch;
    },
    [customize.CHANGEACTIVEDEPID] ( state, activeDepId ) {
        state.activeDepId = activeDepId;
    },
    [customize.SHOWVIDEOICON] (state) {
        state.isVideoIConShow = true;
    }
    
   
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}