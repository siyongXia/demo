// microsite
const Hospitalinfo = r => require.ensure([], () => r(require('../../page/microsite/HospitalInfo')), 'hospitalinfo')
const HospitalGuide = r => require.ensure([], () => r(require('../../page/microsite/HospitalGuide')), 'hospitalinfo')
const HospitalColumn = r => require.ensure([], () => r(require('../../page/microsite/HospitalColumn')), 'hospitalinfo')
const Hospitaldes = r => require.ensure([], () => r(require('../../page/microsite/Hospitaldes')), 'hospitaldes')
const HospitalArticleList = r => require.ensure([], () => r(require('../../page/microsite/ArticleList')), 'hospitalArticleList')

export default [
	{
        path: 'hospitalinfo', component: Hospitalinfo, redirect: '/hospitalinfo/guide.html',
        children: [
            { path: 'guide.html', component: HospitalGuide },
            { path: 'column.html', component: HospitalColumn },
            { path: 'description.html', component: Hospitaldes },
            { path: 'articlelist.html', component: HospitalArticleList }
        ]
    }
]