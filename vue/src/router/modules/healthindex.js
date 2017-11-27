//健康页
const HealthIndex = r => require.ensure([], () => r(require('../../page/healthindex/Index.vue')), 'healthindex')
const HealthBeauty= r => require.ensure([], () => r(require('../../page/healthindex/Beauty.vue')), 'HealthBeauty')
const HealthAskdetail= r => require.ensure([], () => r(require('../../page/healthindex/AskDetail.vue')), 'HealthAskdetail')
const HealthQuestion= r => require.ensure([], () => r(require('../../page/healthindex/Question.vue')), 'HealthQuestion')
const HealthConsult= r => require.ensure([], () => r(require('../../page/healthindex/Consult.vue')), 'HealthConsult')
const HealthSelect= r => require.ensure([], () => r(require('../../page/healthindex/Select.vue')), 'HealthSelect')
const HealthHospital= r => require.ensure([], () => r(require('../../page/healthindex/Hospital.vue')), 'HealthHospital')
const HealthDoctor= r => require.ensure([], () => r(require('../../page/healthindex/Doctor.vue')), 'HealthDoctor')

export default [
	// 健康二期
    { name:'healthIndex', path: 'health/index.html', component: HealthIndex },
    { name:'healthIndex2', path: 'healthservices/index.html', component: HealthIndex},
    { path: 'health/beauty.html', component: HealthBeauty },
    { path: 'health/askdetail.html', component: HealthAskdetail },
    { path: 'health/question.html', component: HealthQuestion },
    { path: 'health/consult.html', component: HealthConsult },
    { path: 'health/service/select.html', component: HealthSelect },
    { path: 'health/service/hospital.html', component: HealthHospital },
    { path: 'health/service/doctor.html', component: HealthDoctor },
]