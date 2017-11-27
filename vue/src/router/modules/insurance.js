//保险
const InsuranceIndex = r => require.ensure([], () => r(require('../../page/insurance/Index')), 'insurance')

export default [
	//保险
    { path: 'insurance/index.html', component: InsuranceIndex}
]