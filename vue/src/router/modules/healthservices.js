//健康服务-商品列表
const HealthList = r => require.ensure([], () => r(require('../../page/healthservices/healthlist')), 'healthservices')

export default [
	//健康服务-商品列表
    { path: 'healthservices/index.html', component: HealthList},
]

