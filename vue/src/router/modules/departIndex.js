//科室列表
const DepartIndex = r => require.ensure([], () => r(require('../../page/departlist/List')), 'departlist')

export default [
	{ path: 'departlist/index.html', component: DepartIndex }
]