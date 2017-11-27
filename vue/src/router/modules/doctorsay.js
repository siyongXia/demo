const DoctorSaid = r => require.ensure([], () => r(require('../../page/doctorsaid/Home')), 'DoctorSaid')
const DoctorDynamic = r => require.ensure([], () => r(require('../../page/doctorsaid/DoctorDynamic')), 'DoctorDynamic')

export default [
	{ path: 'doctorsaid/detail.html', component: DoctorSaid },
    { path: 'doctorsaid/list.html', component: DoctorDynamic }  
]