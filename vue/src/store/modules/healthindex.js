import axios from 'axios'
import { healthindex } from '../mutation-types'
import GlobalSetting from '../../config/GlobalSetting.js'
import  { forEach, append, splitEvery }  from 'ramda'
var R = { forEach, append, splitEvery } 
const state = {
    cityName:'',
    ad_list:{},
    top_scroll:[],
    center_menu:[],
    center_img:[],
    center_text:[],
    index_bottom_float:[],
    secondCategoryId:'',
    city_info:{},
    first_cate_info:{},//一级栏目信息
    article_cate_info:{},//文章栏目信息
    cate_list:[],
    categorygoods:[],
    beauty_top_scroll:[],
    beauty_center_img:[],
    beauty_bottom_float:{},
    beauty_center_img:[],
    beauty_ad_list:{},
    beauty_cate_list:[],
    showType:0,
    diaryList:[],
    baikeList:[],
    requestCategoryId:0,
    unitCate:[],
    unitBottomAd:{}
    // questionList:[]
}

const actions = {
    //获取城市相关的分类 /health/getcitycategory.html 参数 category_id
    getcitycategory :({ commit },params) => {
        return new Promise((resolve,reject)=>{
            axios.get('/health/getcitycategory.html',{params:params}).then((data)=>{
                var data = data.data.data;
                commit(healthindex.INITCATEGORYINFO,data);
                commit(healthindex.CHANGECITYNAME,data.city_info.area_name);  
                var shareImage =  data.cate_info.img ? 'http://images.91160.com/' +  data.cate_info.img : 'http://static.91160.com/wechat/img/common/logo.jpg'              
                var wxShareOption = {
                    title:data.cate_info.name,
                    description:'160健康好项目,只推荐给你',
                    image:shareImage
                }
                resolve(wxShareOption);
            }).catch((err)=>{
                console.log(err);
                reject();
            })    
        })        
         
    },
    getIndexAdds :({ commit },params) => {  
        let { category_id, location,city_id } = params;
        axios.get('/health/getcategoryad.html',{params:{category_id, location,city_id}}).then((data)=>{
            if(data.data.state === 1) {
                commit(healthindex.INITINDEXADD,{list:data.data.data,location:location});
            }
        }).catch((err)=>{
            console.log(err);
        })
    },
    getBeautyAdds :({ commit },params) => {  
        let { category_id, location } = params;
        axios.get('/health/getcategoryad.html',{params:{category_id, location,}}).then((data)=>{
            if(data.data.state === 1) {
                commit(healthindex.INITBEAUTYADD,{list:data.data.data,location:location});
            }
        }).catch((err)=>{
            console.log(err);
        })
    },
    getCategoryGoods:({ commit },params) => {
        let { category_id, city_id ,page } = params;
        return new Promise((resolve,reject)=>{
            axios.get('/health/citycategorygoods.html',{params:{category_id, city_id,page}}).then((data)=>{
                if(data.data.state === 1) {
                    commit(healthindex.GETCATEGORYGOODS,{list:data.data.data,newCate:params.newCate});
                    if(data.data.data.length < 10) {
                        resolve(0);
                    }else{
                        resolve(1);
                    }
                }else if(data.data.state === 0){//没有关联商品
                    commit(healthindex.GETCATEGORYGOODS,{list:[],newCate:params.newCate});
                    resolve(0);
                }
                
            }).catch((err)=>{
                console.log(err);
            })
        })
       
    },
    getarticlecategory: ({ commit },params) => { 
        return new Promise((resolve,reject)=>{
            axios.get('/health/getarticlecategory.html',{params:params}).then((data)=>{
                var data = data.data.data,
                    obj = {};
                obj.goods_category_id = data.goods_category_id;
                console.log(obj);
                commit(healthindex.INITARTICLECATEGORY,data);    
                if( data.cate_list) {
                    data.cate_list.forEach((item,index)=>{
                        if(item.showType == state.showType) { 
                            obj.articleCategoryId =  item.articleCategoryId;                            
                            resolve(obj)                          
                        }
                    })
                }        
            }).catch((err)=>{
                console.log(err);
                reject(err);
            })    
        })       
        
    },
    getArticle: ({ commit },params) => {    
        return new Promise((resolve,reject)=>{ 
            let { category_id, city_id, page, newCate } = params;
            axios.get('/health/getarticle.html',{params:{ category_id, city_id, page }}).then((data)=>{
                if(data.data.state === 1) {
                    if( parseInt(params.showType) === 1 ) {//整形日记       
                        commit(healthindex.GETDIARYLIST,{list:data.data.data,newCate:newCate});   
                    }else if(parseInt(params.showType) === 0){//百科                       
                        commit(healthindex.GETBAIKELIST,{list:data.data.data,newCate:newCate});                       
                    } 
                    if(data.data.data.length < 10) {
                        resolve(0);
                    }else{
                        resolve(1);
                    }    
                }else if (data.data.state === 0) {//没有数据
                    commit(healthindex.GETDIARYLIST,{list:[],newCate:newCate});
                    commit(healthindex.GETBAIKELIST,{list:[],newCate:newCate});      
                    resolve(0)
                }               
            }).catch((err)=>{
                console.log(err);
            })   
        })
    }, 
    getCategoryAndAdd : ({ commit },params) => {  
        axios.get('/health/getcategory.html',{params:{ form_rec:1, category_id:params.category_id}}).then((data)=>{
            commit(healthindex.INITUNITINFO,data.data.data);
        }).catch((err)=>{
            console.log(err);
        })
    }
}

const mutations = {
    [healthindex.INITCATEGORYINFO] (state,data){
        state.ad_list = data.ad_list;
        state.city_info = data.city_info;
        state.cate_list = data.cate_list;
        state.first_cate_info = data.cate_info;
    },
    [healthindex.INITINDEXADD] (state,params){
        if( params.location === 1) {
            state.top_scroll = params.list || [];
        }else if( params.location === 2 ) {
            state.center_menu = params.list ||[];
        }else if( params.location === 3 ) {
            state.center_img = params.list || [];
        }else if( params.location === 4 ) {
            state.center_text = params.list ||[];
        }else if( params.location === 5 ) {
            state.index_bottom_float = params.list ||[];
        }
    },
    [healthindex.INITBEAUTYADD] (state,params){
        if( params.location === 6) {
            state.beauty_top_scroll = params.list || [];
        }else if( params.location === 7 ) {
            state.beauty_center_img = params.list ||[];
        }else if( params.location === 8 ) {
            state.beauty_bottom_float = params.list || [];
        }
    },

    [healthindex.CHANGECATEGORYID] (state,id){
        state.requestCategoryId = id;
    },
    [healthindex.INITSHOWTYPE] (state,sec){
        if(state.beauty_cate_list) {
            state.beauty_cate_list.forEach((item,index)=>{
                if(item.articleCategoryId === sec) {
                    state.showType = item.showType;
                    return false;
                }
            })
        }
        // console.log(state.beauty_cate_list);
        // state.showType = showType;
    },
    [healthindex.GETCATEGORYGOODS] (state,data){  
        var list = data.list;
        list.map((item,index)=>{
            item.img = GlobalSetting.IMAGESDOMAIN + item.img;
        });
        if(data.newCate) {
            state.categorygoods = list;           
        }else {
            state.categorygoods = state.categorygoods.concat(list);
        }
    },
    [healthindex.CHANGECITYNAME](state, cityName) {
        state.cityName = cityName;
    },
    [healthindex.INITARTICLECATEGORY](state, data) {
        state.beauty_ad_list = data.ad_list;
        state.beauty_cate_list = data.cate_list;       
        state.article_cate_info = data.cate_info;
        state.showType = data.cate_list[0].showType;
        state.secondCategoryId = data.cate_list[0].articleCategoryId;
    },
    [healthindex.CHANGEBEAUTYTAB](state, params) {
        state.showType = params.showType;
        state.secondCategoryId = params.category_id;
    },
    [healthindex.GETDIARYLIST](state, data) {
        if(data.newCate) {            
            state.diaryList =data.list;            
        }else { 
            state.diaryList = state.diaryList.concat(data.list);
        }
    },
    [healthindex.GETBAIKELIST](state, data) {
        var list = data.list;
        list.map((item,index)=>{
            item.image =  GlobalSetting.IMAGESDOMAIN + JSON.parse(item.videoImg)[0].img;
        })
        if(data.newCate) {
            state.baikeList = list;            
        }else {
            state.baikeList = state.baikeList.concat(list);
        }
    },
    [healthindex.INIYDAIRYANDADD](state, id) {
        state.diaryList.forEach((item,index)=>{
            if(item.unitId == id) {
                if(item.unit.isFocus === 1) {
                    item.unit.isFocus = 0;
                }else {
                    item.unit.isFocus = 1;
                }
            }
        })
        initDiaryListAndAd(state);
    },
    [healthindex.INITUNITINFO](state, data) {
        state.unitCate = data.cate_list;//筛选分类列表
        if(data.ad_list && data.ad_list.length >= 1) {
             state.unitBottomAd = {
                url:data.ad_list[0].url,
                image:GlobalSetting.IMAGESDOMAIN + data.ad_list[0].image
             }
        }
    }
}

const getters = {
    top_scroll (state) {//center_menu
        var arr = [];
        state.top_scroll.forEach((item,index)=>{
            var obj = {};
            obj.img = GlobalSetting.IMAGESDOMAIN + item.image;
            obj.url = item.url;
            arr.push(obj);
        })
    	return arr;
    },
    center_menu (state) {//首页轮播菜单
        var arr = [];
        state.center_menu.forEach((item,index)=>{
            let { url, title, image} = item;
            arr.push({ url, title, image:GlobalSetting.IMAGESDOMAIN + image })
        })
        if(arr.length >= 8) {
            arr = arr.splice(0,8);
        }else if(arr.length >= 4) {
             arr = arr.splice(0,4);
        }else {
            arr = [];
        }
        return arr;
    },
    indexCateWidth (state) {//动态计算首页cateBox的宽度
        return getCateWidth(state.cate_list);       
    },
    diaryCateWidth (state) {//动态整形日记cateBox的宽度
        return getCateWidth(getCate(state,'1'));       
    },
    baikeCateWidth (state) {//动态计算首页cateBox的宽度
        return getCateWidth(getCate(state,'0'));       
    },
    center_text (state) {//首页中间文字广告
        return state.center_text;
    },
    center_img (state) {//首页中间广告
        var  center_img = state.center_img;
        var arr = [];
        center_img.forEach((item,index)=>{
            arr.push({
                image:GlobalSetting.IMAGESDOMAIN + item.image,
                url:item.url
            })
        })
        if(arr.length >= 4) {
            arr = arr.slice(0,4);
        }else if(arr.length >= 2) {
            arr = arr.slice(0,2);
        }else {
            arr = [];
        }
        return arr;
    },
    index_bottom_float (state) {
        var bottom_float = state.index_bottom_float,
            obj = {};
        if(bottom_float.length > 0) {
            obj.image = GlobalSetting.IMAGESDOMAIN +  bottom_float[0].image;
            obj.url = bottom_float[0].url;
        }       
        return obj;        
    },
    beauty_top_scroll (state) {
        var arr = [],top_scroll = state.beauty_top_scroll;  
        if(top_scroll) {
            top_scroll.forEach((item,index)=>{
                var { url , image} = item;
                arr.push({ url, img:GlobalSetting.IMAGESDOMAIN + image })
            })
        }
        return arr;
        
    },
    beauty_bottom_float (state) {

        var bottom_float = state.beauty_bottom_float,
            obj = {};
        if(bottom_float.length > 0){
            obj.image = GlobalSetting.IMAGESDOMAIN +  bottom_float[0].image;
            obj.url = bottom_float[0].url;
        }
        return obj;        
    },
    beauty_cate_list (state) {
        return state.beauty_cate_list;
    },
    askCategoryId (state) {
        var id = '';
        if(state.beauty_cate_list) {
            state.beauty_cate_list.forEach((item,index)=>{
                if(item.showType === '2') {
                    id = item.articleCategoryId;
                    return false;
                }
            })
        }
        return id;
    },
    showType (state) {//二级分类激活的tab的categoryId
        return state.showType
    },
    diaryCate (state) {
        return getCate(state,'1');
    },
    baikeCate (state) {
        return getCate(state,'0');
    },
    diaryListAndAd (state) {
        return initDiaryListAndAd(state);
    },
}

function getCate(state,showType){
  var arr = [];
    state.beauty_cate_list && state.beauty_cate_list.forEach((item,index)=>{
        if(item.showType === showType) {
            arr = item.cateList;
            return false;
        }
    })
    return arr;
}
function getCateWidth (list) {
    if(list.length === 0) {
        return;
    }
    var count = 0;
    list.forEach((item,index)=>{
        count += item.name.length + 2;
    })
    const clientWidth = document.body.clientWidth || document.documentElement.clientWidth;
    const ratio =  clientWidth/375;
    let cateWidth = ( count * 15 + 90 ) * ratio;
    cateWidth = cateWidth < clientWidth ? clientWidth : cateWidth;
    return cateWidth;
}

function initDiaryListAndAd (state) {
    if( state.beauty_center_img && state.diaryList &&  state.diaryList.length > 0) {
        
        var diaryList = state.diaryList,
            center_img =  state.beauty_center_img,
            index = 0,arr = [];
        if(state.diaryList.length < 2) {//文章内容小于两条,不显示广告
            return state.diaryList;
        }
        var merge = (item)=> {
            if(index < center_img.length) {
                arr = arr.concat(R.append(center_img[index++],item));
            }else {
                arr = arr.concat(item);
            }
        }
        R.forEach(merge, R.splitEvery(2,diaryList));
        return arr;
    }else if(state.diaryList &&  state.diaryList.length > 0) {
        return state.diaryList;
    }else {
        return [];
    }    
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}