//网络医院
const Main = r => require.ensure([], () => r(require('../../page/networkhospital/main.vue')), 'networkmain')
const Index = r => require.ensure([], () => r(require('../../page/networkhospital/index.vue')), 'networkindex')
const Search = r => require.ensure([], () => r(require('../../page/networkhospital/search.vue')), 'networksearch')
const Deplist = r => require.ensure([], () => r(require('../../page/networkhospital/deplist.vue')), 'networkdeplist')
const Doclist = r => require.ensure([], () => r(require('../../page/networkhospital/doclist.vue')), 'networkdoclist')
const Singleprelist = r => require.ensure([], () => r(require('../../page/networkhospital/singleprelist.vue')), 'networksingleprelist')//单个问诊单的处方单列表 
const PresList = r => require.ensure([], () => r(require('../../page/networkhospital/preslist.vue')), 'networkpreslist')//我的处方订单列表

export default [
 	{path: 'network/main.html', component: Main},
    {path: 'network/index.html', component: Index},
    {path: 'network/search.html', component: Search},
    {path: 'network/deplist.html', component: Deplist},
    {path: 'network/doclist.html', component: Doclist},
    {path: 'network/singleprelist.html', component: Singleprelist,meta:{ needLogin:true}},//单个问诊单的处方单列表 
    {path: 'network/preslist.html', component: PresList,meta:{ needLogin:true}},//我的处方订单列表
]