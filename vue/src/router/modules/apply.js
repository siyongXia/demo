// // JOB招聘
const Apply = r => require.ensure([], () => r(require('../../page/applyjob/Apply.vue')), 'apply')
const ApplyInfo = r => require.ensure([], () => r(require('../../page/applyjob/ApplyInfo.vue')), 'ApplyInfo')
const ApplyDetail = r => require.ensure([], () => r(require('../../page/applyjob/ApplyDetail.vue')), 'ApplyDetail')
const ApplyResume = r => require.ensure([], () => r(require('../../page/applyjob/Resume.vue')), 'ApplyResume')

export default [
 	{
        path: 'apply', component: Apply, redirect: '/apply/applyinfo.html',
        children: [
            { path: 'applyinfo.html', component: ApplyInfo },
            { path: 'applydetail.html', component: ApplyDetail },
        ]   
    },
    { path: 'apply/resume.html', component: ApplyResume }
]