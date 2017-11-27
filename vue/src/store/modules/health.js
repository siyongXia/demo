import * as types from '../mutation-types';
import * as api from '../../page/health/api/api';
import { wxShare, getNyAppShare } from '../../utils/util';
const state = {
    infos: { appointmentParts: '', detailParts: '', goodsParts: '', goodsSpecialParts: '', serviceParts: '', docRelation: '' },
    defaultCate: {},
    count: 1,
    pay_method: 2,
    price_space: '',
    payment: -1
}

const actions = {
    getProductInfo: ({ commit }, options) => {
        api.getProductInfo(options,
            (data) => {
                commit(types.HEALTH_GETPRODUCTINFO_SUCESS, data);
            },
            (err) => {
                commit(types.HEALTH_GETPRODUCTINFO_FAIL);
            }
        )
    },
    selectCate: ({ commit, state }, options) => {
        const e = options.e,
            vueInstance = options.that;
        state.infos.goodsSpecialParts.forEach((item, index) => {
            if (item.specialId == e.target.dataset.cate_id) {
                commit(types.HEALTH_GETDEFAULTCATE, item);
                vueInstance.$refs.addCount.count = 1;
                return false;
            }
        })
    },
    getCount: ({ commit, state }, count) => {
        commit(types.HEALTH_GETCOUNT, count);
    }
}
const getters = {
    infos: (state) => state.infos,
    defaultCate: (state) => state.defaultCate,
    count: (state) => state.count,
    pay_method: (state) => state.pay_method,
    price_space: (state) => state.price_space,
    payment: (state) => state.payment
}

const mutations = {
    [types.HEALTH_GETPRODUCTINFO_SUCESS](state, options) {
        window.sessionStorage.setItem('infos', JSON.stringify(options)); //跳转到confirm页面的时候用
        state.infos = options;
        state.payment = options.goodsParts.payment;
        window.sessionStorage.setItem('payment', JSON.stringify(options.goodsParts.payment));
        var categories = options.goodsSpecialParts;

        categories.forEach((item, index) => {
            if (item.isDefault == '1') {
                state.defaultCate = item;
                window.sessionStorage.setItem('defaultCate', JSON.stringify(item));
                state.price_space = item.price_space;
            }
        });
        var goodsSpecialParts = options.goodsSpecialParts;
        goodsSpecialParts.forEach((item, index) => {
            if (item.price_space) {
                state.pay_method = 1;
            }
        });
        var wxShareOptions = {
            timeline: {
                title: this.infos.goodsParts.name,
                link: window.location.href,
                imgUrl: parseInt(this.infos.goodsParts.img)[0],
            },
            appMessage: {
                title: this.infos.goodsParts.name,
                desc: this.infos.goodsParts.subhead, // 分享描述
                link: window.location.href,
                imgUrl: parseInt(this.infos.goodsParts.img)[0],
            },
            callback: function() {

            },
            cancelCallback: function() {

            }
        }
        return;
        wxShare(wxShareOptions);
        getNyAppShare(this);

    },
    [types.HEALTH_GETPRODUCTINFO_FAIL](state) {
        state.infos = {};

    },
    [types.HEALTH_GETDEFAULTCATE](state, data) {
        state.defaultCate = data;
        window.sessionStorage.setItem('defaultCate', JSON.stringify(data));
    },
    [types.HEALTH_GETCOUNT](state, count) {
        state.count = count;
        window.sessionStorage.setItem('count', JSON.stringify(count));
    }
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}