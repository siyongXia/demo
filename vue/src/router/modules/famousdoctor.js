//科室列表
const FamousDoctor = r => require.ensure([], () => r(require('../../page/famousdoctor/Index')), 'famousdoctor')
const HospitalSelect = r => require.ensure([], () => r(require('../../page/famousdoctor/hospitalselect')), 'famoushospitalDoctor')
const FamousDoctorList = r => require.ensure([], () => r(require('../../page/famousdoctor/doctorlist')), 'famousdoctorList')

export default [
	{ path: 'ask/index.html', component: FamousDoctor },
	{name:'hospitalselect', path: 'ask/hospitalselect.html', component: HospitalSelect },
	{ path: 'ask/doclist.html', component: FamousDoctorList },
]