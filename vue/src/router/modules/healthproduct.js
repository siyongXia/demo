//健康页
import Health_Product from '../../page/health/product/';
const HealthProduct = r => require.ensure([], () => r(Health_Product), 'healthProduct')
const HealthProductList = r => require.ensure([], () => r(require('../../page/health/productlist')), 'HealthProductList')
const HealthOrderList = r => require.ensure([], () => r(require('../../page/health/orderlist')), 'HealthOrderList')
const HealthOrderDetail = r => require.ensure([], () => r(require('../../page/health/orderdetail')), 'HealthOrderDetail')
const HealthOrderConfirm = r => require.ensure([], () => r(require('../../page/health/orderconfirm')), 'HealthOrderConfirm')

export default [
	// 健康二期
    { path: 'health/product.html', component: HealthProduct },
    { path: 'health/productlist.html', component: HealthProductList },
    { path: 'health/orderlist.html', component: HealthOrderList },
    { path: 'health/orderdetail.html', component: HealthOrderDetail },
    { path: 'health/orderconfirm.html', component: HealthOrderConfirm,meta:{ needLogin:true}  }
]