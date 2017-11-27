// IM随访
const ImFollow = r => require.ensure([], () => r(require('../../page/IM/Follow.vue')), 'IM')
export default [
    { path: 'im/follow.html', component: ImFollow },
]