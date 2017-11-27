import Vue from 'vue'
import Vuex from 'vuex'
import Common from './modules/common.js'
import apply from './modules/apply.js'
import hospitalinfo from './modules/hospitalinfo.js'
import health from './modules/health.js'
import IM from './modules/IM.js'
import customize from './modules/customize.js'
import healthindex from './modules/healthindex.js'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        Common,
        apply,
        hospitalinfo,
        health,
        IM,
        customize,
        healthindex,
    },
    strict: process.env.NODE_ENV !== 'production' // 线上环境关掉
})  