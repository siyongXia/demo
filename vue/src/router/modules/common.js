//common
const City = r => require.ensure([], () => r(require('../../components/common/City.vue')), 'common')
const ErrorPage = r => require.ensure([], () => r(require('../../components/common/404.vue')), 'common')


export default [
	// 选择城市
    { path: 'city/index.html', component: City },
    { path: '*', component: ErrorPage,name:'404'},
]