//云杉网上医院
const OnlinehospitalIndex = r => require.ensure([], () => r(require('../../page/onlinehospital/Index')), 'onlinehospital')
const OnlinehospitalSearch = r => require.ensure([], () => r(require('../../page/onlinehospital/Search')), 'onlinehospital')

export default [
	//云杉网上医院
    { path: 'onlinehospital/index.html', component: OnlinehospitalIndex},  
    { path: 'onlinehospital/search.html', component: OnlinehospitalSearch}
]