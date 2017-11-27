//科室定制主页
const CustomdepIndex = r => require.ensure([], () => r(require('../../page/customdep/Index')), 'customdep')

export default [
	//科室定制主页
    { path: 'customdep/index.html', component: CustomdepIndex}
]

