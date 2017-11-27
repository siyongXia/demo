// 个性化医院
const CustomizeIndex = r => require.ensure([], () => r(require('../../page/customize/Index.vue')), 'CustomizeIndex')
const CustomizeService = r => require.ensure([], () => r(require('../../page/customize/Service.vue')), 'CustomizeService')
const CustomizeDoctor = r => require.ensure([], () => r(require('../../page/customize/Doctor.vue')), 'CustomizeDoctor')
const CustomizeSection = r => require.ensure([], () => r(require('../../page/customize/Section.vue')), 'CustomizeSection')
const CustomizeBrand = r => require.ensure([], () => r(require('../../page/customize/Brand.vue')), 'CustomizeBrand')
const CustomizeNews = r => require.ensure([], () => r(require('../../page/customize/News.vue')), 'CustomizeNews')
const CustomizeArticle = r => require.ensure([], () => r(require('../../page/customize/Article.vue')), 'CustomizeArticle')
const CustomizeComment = r => require.ensure([], () => r(require('../../page/customize/Comment.vue')), 'CustomizeComment')

export default [ 	
    { path: 'customize/index.html', component: CustomizeIndex,meta: {keepAlive: true} },
    { path: 'customize/service.html', component: CustomizeService,meta:{loading:true} },
    { path: 'customize/doctor.html', component: CustomizeDoctor,meta:{loading:true}},
    { path: 'customize/section.html', component: CustomizeSection,meta:{loading:true} },
    { path: 'customize/brand.html', component: CustomizeBrand,meta:{loading:true} },
    { path: 'customize/news.html', component: CustomizeNews},
    { path: 'customize/article.html', component: CustomizeArticle ,meta:{loading:true}},
    { path: 'customize/comment.html', component: CustomizeComment },
]