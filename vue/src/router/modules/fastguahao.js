//名医极速挂号
const FastguahaoIndex = r => require.ensure([], () => r(require('../../page/fastguahao/Index')), 'fastguahaoIndex')
const FastguahaoSearch = r => require.ensure([], () => r(require('../../page/fastguahao/Search')), 'fastguahaoSearch')

export default [
	//名医极速挂号
    { path: 'fastguahao/index.html', component: FastguahaoIndex},
    { path: 'fastguahao/search.html', component: FastguahaoSearch}
]

