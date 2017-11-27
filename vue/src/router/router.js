import App from '../App'
import { rootRouter } from '../config/env.js'
//导入各 个模块
import apply from './modules/apply.js'
import departIndex from './modules/departIndex.js'
import doctorsay from './modules/doctorsay.js'
import healthproduct from './modules/healthproduct.js'
import healthtask from './modules/healthtask.js'
import microsite from './modules/microsite.js'
import onlinehospital from './modules/onlinehospital.js'
import famousdoctor from './modules/famousdoctor.js'
import insurance from './modules/insurance.js'
import fastguahao from './modules/fastguahao.js'
// import healthservices from './modules/healthservices.js'
import IM from './modules/IM.js'
import customdep from './modules/customdep.js'
import networkhospital from './modules/networkhospital.js'
import customize from './modules/customize.js'
import healthindex from './modules/healthindex.js'
export default [{
    path: rootRouter,
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
         ...apply,
         ...departIndex,
         ...doctorsay,
         ...healthproduct,
         ...healthtask,
         ...microsite,
         ...onlinehospital,
         ...famousdoctor,
         ...insurance,
         ...fastguahao,
         // ...healthservices,
         ...IM,
         ...customdep,
		 ...customize,
         ...healthindex,
         ...networkhospital,
    ]
}]    